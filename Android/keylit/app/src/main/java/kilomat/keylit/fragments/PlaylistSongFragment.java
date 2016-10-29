package kilomat.keylit.fragments;

/**
 * Created by BAHA on 29/09/2016.
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
import android.support.v4.app.FragmentManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

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
import kilomat.keylit.adapter.ListAdapterPlaylistSong;
import kilomat.keylit.controller.SessionManager;
import kilomat.keylit.model.SongData;


public class PlaylistSongFragment extends Fragment {

    private static final int MY_SOCKET_TIMEOUT_MS = 50000;
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

    public PlaylistSongFragment() {
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

        View layout = inflater.inflate(R.layout.activity_playlist_song, container, false);
        // Inflate the layout for this fragment
        mRecyclerView = (RecyclerView) layout.findViewById(R.id.recyclerView2);
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(getContext());
        linearLayoutManager.setOrientation(LinearLayoutManager.VERTICAL);
        mRecyclerView.setLayoutManager(linearLayoutManager);
        String PlaylistName = manager.getPreferences(getActivity(), "PlaylistName");

        TextView playlistname = (TextView) layout.findViewById(R.id.playlist_song_name);

        playlistname.setText(PlaylistName);
        //mRecyclerView.setAdapter(adapter);
        Button fab = (Button) layout.findViewById(R.id.fab);

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(final View view) {
                FragmentManager fm = getActivity().getSupportFragmentManager();
                PlaylistSongAddFragment yfObj = new PlaylistSongAddFragment();
                fm.beginTransaction().replace(R.id.frame, yfObj).commit();
            }
        });
        return layout;
    }

    private void Songs() {

        //String mytoken = LoginActivity.sharedPreferences.getString("TokenKey", null);

        String PlaylistID = manager.getPreferences(getActivity(), "PlaylistID");

        String URL_PROFILE = "http://95.85.2.100:3000/playlists/" + PlaylistID;

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
                                                mRecyclerView.setAdapter(new ListAdapterPlaylistSong(getContext(), mSongsList,
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
                        VolleyLog.d("PlaylistSongFragment Error: " + error.getMessage());
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

        private Response.Listener listener;

        public CustomJsonRequest(int requestMethod, String url, Map<String, String> params,
                                 Response.Listener responseListener, Response.ErrorListener errorListener) {

            super(requestMethod, url, errorListener);

            this.listener = responseListener;
        }

        @Override
        protected void deliverResponse(Object response) {
            listener.onResponse(response);

        }
        @Override
        public Map<String, String> getHeaders() throws AuthFailureError {
            Map<String, String> params;
            params = new HashMap<>();

            params.put("x-access-token", mytoken);
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