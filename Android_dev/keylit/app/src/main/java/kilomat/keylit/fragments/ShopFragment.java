package kilomat.keylit.fragments;

/**
 * Created by BAHA on 06/10/2016.
 */

import android.app.DownloadManager;
import android.app.ProgressDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.database.Cursor;
import android.os.Bundle;
import android.os.StrictMode;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
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

import kilomat.keylit.R;
import kilomat.keylit.adapter.ListAdapterShop;
import kilomat.keylit.controller.AppController;
import kilomat.keylit.model.ShopData;

public class ShopFragment extends Fragment {

    private static final int MY_SOCKET_TIMEOUT_MS = 50000;
    public static DownloadManager downloadManager;
    public static long myDownloadReference;
    public String TAG = "download";
    private ProgressDialog mProgressDialog;
    private List<ShopData> mMovieList = new ArrayList<>();
    private RecyclerView mRecyclerView;
    private BroadcastReceiver receiverDownloadComplete;
    private BroadcastReceiver receiverNotificationClicked;

    public ShopFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mProgressDialog = new ProgressDialog(getActivity());

        mProgressDialog.setMessage(getString(R.string.action_load));
        mProgressDialog.setCancelable(false);
        mProgressDialog.show();

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        ShopRequest();
        downloadManager = (DownloadManager) getActivity().getSystemService(Context.DOWNLOAD_SERVICE);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View layout = inflater.inflate(R.layout.activity_shop, container, false);
        mRecyclerView = (RecyclerView) layout.findViewById(R.id.recyclerView);

        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(getActivity());
        linearLayoutManager.setOrientation(LinearLayoutManager.VERTICAL);
        mRecyclerView.setLayoutManager(linearLayoutManager);

        return layout;
    }

    public void ShopRequest() {

        // Creating volley request obj
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(getString(R.string.api_url_songs),
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        hidePDialog();
                        // Parsing json
                        for (int i = 0; i < response.length(); i++) {
                            try {
                                JSONObject obj = response.getJSONObject(i);
                                ShopData movie = new ShopData();
                                movie.setTitle(obj.getString("slug"));
                                movie.setThumbnailUrl(obj.getString("picture"));
                                movie.setRating(((Number) obj.get("difficulty")).doubleValue());
                                movie.setYear(obj.getInt("price"));
                                movie.setGenre(obj.getString("file"));
                                movie.setArtist(obj.getString("artist"));
                                movie.setDownload(obj.getInt("bought"));
                                movie.setIdSong(obj.getString("_id"));

                                // adding movie to movies array
                                mMovieList.add(movie);

                                if (mMovieList != null) {
                                    mRecyclerView.setAdapter(new ListAdapterShop(getActivity(), mMovieList,
                                            new LinkedList<>(Collections.nCopies(mMovieList.size(),
                                                    R.drawable.movie_add_touch))));
                                } else {
                                    Log.e(TAG, "@shop Error: Adapter is null");
                                }

                            } catch (JSONException jsonException) {
                                Log.e(TAG, "@shop JsonException Error: " + jsonException.getMessage());
                            }
                        }

                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        VolleyLog.e(TAG, "@shop Error: " + error.getMessage());
                        Log.e(TAG, "@shop Error: " + error.getMessage());
                        hidePDialog();

                    }
                });


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
    public void onResume() {
        super.onResume();

        IntentFilter filter = new IntentFilter(DownloadManager
                .ACTION_NOTIFICATION_CLICKED);

        receiverNotificationClicked = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                String extraId = DownloadManager
                        .EXTRA_NOTIFICATION_CLICK_DOWNLOAD_IDS;
                long[] references = intent.getLongArrayExtra(extraId);
                for (long reference : references) {
                    if (reference == myDownloadReference) {
                    }
                }
            }
        };
        getActivity().registerReceiver(receiverNotificationClicked, filter);

        IntentFilter intentFilter = new IntentFilter(DownloadManager
                .ACTION_DOWNLOAD_COMPLETE);

        receiverDownloadComplete = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                long reference = intent.getLongExtra(DownloadManager
                        .EXTRA_DOWNLOAD_ID, -1);
                if (myDownloadReference == reference) {
//                    do something with the download file
                    DownloadManager.Query query = new DownloadManager.Query();
                    query.setFilterById(reference);
                    Cursor cursor = downloadManager.query(query);

                    cursor.moveToFirst();
//                        get the status of the download
                    int columnIndex = cursor.getColumnIndex(DownloadManager
                            .COLUMN_STATUS);
                    int status = cursor.getInt(columnIndex);

                    int fileNameIndex = cursor.getColumnIndex(DownloadManager
                            .COLUMN_LOCAL_FILENAME);
                    String savedFilePath = cursor.getString(fileNameIndex);

//                        get the reason - more detail on the status
                    int columnReason = cursor.getColumnIndex(DownloadManager
                            .COLUMN_REASON);
                    int reason = cursor.getInt(columnReason);

                    switch (status) {
                        case DownloadManager.STATUS_SUCCESSFUL:

//                                start activity to display the downloaded image
                            Intent intentDisplay = new Intent(getActivity(),
                                    ListAdapterShop.class);
                            //intentDisplay.putExtra("uri", savedFilePath);
                            //startActivity(intentDisplay);

                            break;
                        case DownloadManager.STATUS_FAILED:
                            Toast.makeText(getActivity(),
                                    "FAILED: " + reason,
                                    Toast.LENGTH_LONG).show();
                            break;
                        case DownloadManager.STATUS_PAUSED:
                            Toast.makeText(getActivity(),
                                    "PAUSED: " + reason,
                                    Toast.LENGTH_LONG).show();
                            break;
                        case DownloadManager.STATUS_PENDING:
                            Toast.makeText(getActivity(),
                                    "PENDING!",
                                    Toast.LENGTH_LONG).show();
                            break;
                        case DownloadManager.STATUS_RUNNING:
                            Toast.makeText(getActivity(),
                                    "RUNNING!",
                                    Toast.LENGTH_LONG).show();
                            break;
                    }
                    cursor.close();
                }
            }
        };
        getActivity().registerReceiver(receiverDownloadComplete, intentFilter);
    }

    @Override
    public void onPause() {
        super.onPause();
        getActivity().unregisterReceiver(receiverDownloadComplete);
        getActivity().unregisterReceiver(receiverNotificationClicked);
    }

}
