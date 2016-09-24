package kilomat.keylit.activity;

import android.app.ProgressDialog;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonArrayRequest;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

import kilomat.keylit.model.AchievData;
import kilomat.keylit.controller.AppController;
import kilomat.keylit.model.Constants;
import kilomat.keylit.adapter.ListAdapterAchiev;
import kilomat.keylit.R;

public class AchievActivity extends AppCompatActivity {

    private static final String TAG = AchievActivity.class.getSimpleName();
    private static final int MY_SOCKET_TIMEOUT_MS = 50000;

    private ProgressDialog mProgressDialog;
    private List<AchievData> mAchievList = new ArrayList<>();
    private RecyclerView mRecyclerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_achiev);

        mRecyclerView = (RecyclerView) findViewById(R.id.recyclerView);

        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(AchievActivity.this);
        linearLayoutManager.setOrientation(LinearLayoutManager.VERTICAL);
        mRecyclerView.setLayoutManager(linearLayoutManager);

        mProgressDialog = new ProgressDialog(this);
        // Showing progress dialog before making http request
        mProgressDialog.setMessage("Loading...");
        mProgressDialog.setCancelable(false);
        mProgressDialog.show();

        fetchMovies();

    }

    private void fetchMovies() {
        Toast.makeText(AchievActivity.this, "Loading...", Toast.LENGTH_SHORT).show();
        // Creating volley request obj
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Constants.URL_ACHIEV,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        hidePDialog();
                        // Parsing json
                        for (int i = 0; i < response.length(); i++) {
                            try {
                                JSONObject obj = response.getJSONObject(i);
                                AchievData achiev = new AchievData();
                                achiev.setTitle(obj.getString("name"));
                                achiev.setDetails(obj.getString("description"));
                                achiev.setThumbnailUrl(obj.getString("picture"));
                                achiev.setProgress(((Number) obj.get("__v")).doubleValue());

                                // Disabled for the moment
                                //achiev.setCurrent_score(((Number) obj.get("current_score")).doubleValue());
                                //achiev.setState_success(obj.getString("state_success"));

                                mAchievList.add(achiev);

                                if (mAchievList != null) {
                                    mRecyclerView.setAdapter(new ListAdapterAchiev(getApplicationContext(), mAchievList,
                                            new LinkedList<>(Collections.nCopies(mAchievList.size(), R.drawable.movie_add_touch))));
                                } else {
                                    Log.e(TAG, "@Achiev Error: Adapter is null");
                                }

                            } catch (JSONException jsonException) {
                                Log.e(TAG, "@Achiev JsonException Error: " + jsonException.getMessage());
                            }
                        }

                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(getApplicationContext(), "You are offline or Cannot have access to server", Toast.LENGTH_LONG).show();
                        VolleyLog.e(TAG, "@AchievError: " + error.getMessage());
                        Log.e(TAG, "@Achiev Error: " + error.getMessage());
                        hidePDialog();

                    }
                });

        jsonArrayRequest.setRetryPolicy(new DefaultRetryPolicy(
                MY_SOCKET_TIMEOUT_MS,
                DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
                DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));

        AppController.getInstance().addToRequestQueue(jsonArrayRequest);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        hidePDialog();
    }

    private void hidePDialog() {
        if (mProgressDialog != null) {
            mProgressDialog.dismiss();
            mProgressDialog = null;
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (id == R.id.action_refresh) {
            fetchMovies();
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
