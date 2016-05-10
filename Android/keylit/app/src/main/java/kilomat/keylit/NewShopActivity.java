package kilomat.keylit;

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


public class NewShopActivity extends AppCompatActivity {
    /**
     * Used for logging purposes.
     */
    private static final String TAG = NewShopActivity.class.getSimpleName();
    private static final int MY_SOCKET_TIMEOUT_MS = 50000;

    private ProgressDialog mProgressDialog;
    private List<Music> mMovieList = new ArrayList<>();
    private RecyclerView mRecyclerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.new_activity_shop);

        mRecyclerView = (RecyclerView) findViewById(R.id.recyclerView);

        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(NewShopActivity.this);
        linearLayoutManager.setOrientation(LinearLayoutManager.VERTICAL);
        mRecyclerView.setLayoutManager(linearLayoutManager);

        mProgressDialog = new ProgressDialog(this);
        // Showing progress dialog before making http request
        mProgressDialog.setMessage("Loading...");
        mProgressDialog.setCancelable(false);
        mProgressDialog.show();

        fetchMovies();

    }

    /**
     * This method fetches data from the provided URL using volley library. We then parse the json,
     * store all the json data into an ArrayList as Music objects.
     */

    private void fetchMovies() {
        Toast.makeText(NewShopActivity.this, "Executing Task", Toast.LENGTH_SHORT).show();
        // Creating volley request obj
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Constants.URL,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        hidePDialog();
                        // Parsing json
                        for (int i = 0; i < response.length(); i++) {
                            try {
                                JSONObject obj = response.getJSONObject(i);
                                Music movie = new Music();
                                movie.setTitle(obj.getString("title"));
                                movie.setThumbnailUrl(obj.getString("picture"));
                                movie.setRating(((Number) obj.get("difficulty")).doubleValue());
                                movie.setYear(obj.getInt("price"));

                                // Genre is json array
                                JSONArray genreArray = obj.getJSONArray("genre");
                                ArrayList<String> genre = new ArrayList<>();
                                for (int j = 0; j < genreArray.length(); j++) {
                                    genre.add((String) genreArray.get(j));
                                }
                                movie.setGenre(genre);
                                movie.setArtist(obj.getString("artist"));
                                movie.setDownload(obj.getInt("downloaded"));

                                // adding movie to movies array
                                mMovieList.add(movie);

                                if (mMovieList != null) {
                                    mRecyclerView.setAdapter(new ListAdapter(getApplicationContext(), mMovieList,
                                            new LinkedList<>(Collections.nCopies(mMovieList.size(),
                                                    R.drawable.movie_add_touch))));
                                } else {
                                    Log.e(TAG, "@fetchMovies Error: Adapter is null");
                                }

                            } catch (JSONException jsonException) {
                                Log.e(TAG, "@fetchMovies JsonException Error: " + jsonException.getMessage());
                            }
                        }

                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        VolleyLog.e(TAG, "@fetchMovies Error: " + error.getMessage());
                        Log.e(TAG, "@fetchMovies Error: " + error.getMessage());
                        hidePDialog();

                    }
                });

        /**
         *   Set a retry policy in case of SocketTimeout & ConnectionTimeout.
         *   Exceptions Volley does retry for you if you have specified the policy.
         */

        jsonArrayRequest.setRetryPolicy(new DefaultRetryPolicy(
                MY_SOCKET_TIMEOUT_MS,
                DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
                DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));

        // Adding request to request queue
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
