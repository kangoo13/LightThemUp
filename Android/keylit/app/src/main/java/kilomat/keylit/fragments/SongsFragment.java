package kilomat.keylit.fragments;

/**
 * Created by BAHA on 29/09/2016.
 */

import android.Manifest;
import android.app.DownloadManager;
import android.app.ProgressDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.os.Bundle;
import android.os.StrictMode;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.Fragment;
import android.support.v4.content.ContextCompat;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.ParseError;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.HttpHeaderParser;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import kilomat.keylit.R;
import kilomat.keylit.adapter.ListAdapterSong;
import kilomat.keylit.controller.SessionManager;
import kilomat.keylit.model.SongData;

public class SongsFragment extends Fragment {

    private static final int MY_SOCKET_TIMEOUT_MS = 50000;
    private static final int MY_PERMISSIONS_REQUEST_READ_EXTERNAL_STORAGE = 1;
    public static DownloadManager downloadManager;
    public static long myDownloadReference;
    public String TAG = "download";
    private ProgressDialog mProgressDialog;
    private List<SongData> mSongsList = new ArrayList<>();
    private RecyclerView mRecyclerView;
    private BroadcastReceiver receiverDownloadComplete;
    private BroadcastReceiver receiverNotificationClicked;
    SessionManager manager;
    String idUser;
    String mytoken;

    public SongsFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mProgressDialog = new ProgressDialog(getActivity());
        // Showing progress dialog before making http request
        mProgressDialog.setMessage("Loading...");
        mProgressDialog.setCancelable(false);
        mProgressDialog.show();

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

       manager = new SessionManager();
       mytoken = manager.getPreferences(getActivity(), "TokenKey");
       idUser = manager.getPreferences(getActivity(), "IdUser");
        Songs();
        downloadManager = (DownloadManager) getActivity().getSystemService(Context.DOWNLOAD_SERVICE);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View layout = inflater.inflate(R.layout.activity_song, container, false);
        // Inflate the layout for this fragment
        mRecyclerView = (RecyclerView) layout.findViewById(R.id.recyclerView2);
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(getContext());
        linearLayoutManager.setOrientation(LinearLayoutManager.VERTICAL);
        mRecyclerView.setLayoutManager(linearLayoutManager);
        if (ContextCompat.checkSelfPermission(getActivity(),
                Manifest.permission.READ_EXTERNAL_STORAGE)
                != PackageManager.PERMISSION_GRANTED) {

            // Should we show an explanation?
            if (ActivityCompat.shouldShowRequestPermissionRationale(getActivity(),
                    Manifest.permission.READ_EXTERNAL_STORAGE)) {

                // Show an expanation to the user *asynchronously* -- don't block
                // this thread waiting for the user's response! After the user
                // sees the explanation, try again to request the permission.

            } else {

                // No explanation needed, we can request the permission.

                ActivityCompat.requestPermissions(getActivity(),
                        new String[]{Manifest.permission.READ_EXTERNAL_STORAGE},
                        MY_PERMISSIONS_REQUEST_READ_EXTERNAL_STORAGE);

                // MY_PERMISSIONS_REQUEST_READ_CONTACTS is an
                // app-defined int constant. The callback method gets the
                // result of the request.
            }
        }
        //mRecyclerView.setAdapter(adapter);

        return layout;
    }

    private void Songs() {

        //String mytoken = LoginActivity.sharedPreferences.getString("TokenKey", null);
        final HashMap<String, String> params = new HashMap<String, String>();
        params.put("idUser", mytoken);

        final JSONObject jsonObject = new JSONObject(params);
        //String idUser = LoginActivity.sharedPreferences.getString("IdUser", null);
        String URL_PROFILE = "http://95.85.2.100:3000/users/" + idUser;

        Volley.newRequestQueue(getContext()).add(
                new CustomJsonRequest(Request.Method.GET, URL_PROFILE, null,
                        new Response.Listener<JSONObject>() {
                            @Override
                            public void onResponse(JSONObject response) {
                                {
                                    hidePDialog();
                                    JSONArray arrJson = null;
                                    try {
                                        arrJson = response.getJSONArray("songs");
                                    } catch (JSONException e) {
                                        e.printStackTrace();
                                    }
                                    // Parsing json
                                    for (int i = 0; i < arrJson.length(); i++) {
                                        try {
                                            JSONObject obj = arrJson.getJSONObject(i);
                                            SongData Songs = new SongData();
                                            Songs.setTitle(obj.getString("slug"));
                                            Songs.setThumbnailUrl(obj.getString("picture"));
                                            Songs.setRating(((Number) obj.get("difficulty")).doubleValue());
                                            Songs.setYear(obj.getInt("price"));
                                            Songs.setGenre(obj.getString("file"));
                                            Songs.setArtist(obj.getString("artist"));
                                            Songs.setDownload(obj.getInt("bought"));
                                            Songs.setIdSong(obj.getString("_id"));

                                            // adding song to songs array
                                            mSongsList.add(Songs);
                                            if (mSongsList != null) {
                                                mRecyclerView.setAdapter(new ListAdapterSong(getContext(), mSongsList,
                                                        new LinkedList<>(Collections.nCopies(mSongsList.size(),
                                                                R.drawable.movie_error_touch))));
                                            } else {
                                                Log.e(TAG, "@shop Error: Adapter is null");
                                            }

                                        } catch (JSONException jsonException) {
                                            Log.e(TAG, "@shop JsonException Error: " + jsonException.getMessage());
                                        }
                                    }
                                }
                            }
                        }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        VolleyLog.d("Profile Error: " + error.getMessage());
                        hidePDialog();
                    }
                }) {


                    @Override
                    protected Response<JSONObject> parseNetworkResponse(
                            NetworkResponse response) {
                        try {
                            String jsonString = new String(response.data,
                                    HttpHeaderParser
                                            .parseCharset(response.headers));
                            return Response.success(new JSONObject(jsonString),
                                    HttpHeaderParser
                                            .parseCacheHeaders(response));
                        } catch (UnsupportedEncodingException e) {
                            return Response.error(new ParseError(e));
                        } catch (JSONException je) {
                            return Response.error(new ParseError(je));
                        }
                    }
                });
    }


    /////////////
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

                    DownloadManager.Query query = new DownloadManager.Query();
                    query.setFilterById(reference);
                    Cursor cursor = downloadManager.query(query);

                    cursor.moveToFirst();
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

    public class CustomJsonRequest extends Request {

        Map<String, String> params;
        private Response.Listener listener;

        public CustomJsonRequest(int requestMethod, String url, Map<String, String> params,
                                 Response.Listener responseListener, Response.ErrorListener errorListener) {

            super(requestMethod, url, errorListener);


            params = new HashMap<String, String>();
            //String mytoken = LoginActivity.sharedPreferences.getString("TokenKey", null);
            params.put("idUser", mytoken);
            this.params = params;
            this.listener = responseListener;
        }

        @Override
        protected void deliverResponse(Object response) {
            listener.onResponse(response);

        }

        @Override
        public Map<String, String> getParams() throws AuthFailureError {

            return params;
        }

        @Override
        protected Response parseNetworkResponse(NetworkResponse response) {
            try {
                String jsonString = new String(response.data, HttpHeaderParser.parseCharset(response.headers));
                return Response.success(new JSONObject(jsonString), HttpHeaderParser.parseCacheHeaders(response));
            } catch (UnsupportedEncodingException e) {
                return Response.error(new ParseError(e));
            } catch (JSONException je) {
                return Response.error(new ParseError(je));
            }
        }
    }
}