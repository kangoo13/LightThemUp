package kilomat.keylit.fragments;

/**
 * Created by BAHA on 29/09/2016.
 */

import android.app.DownloadManager;
import android.app.ProgressDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.database.Cursor;
import android.os.Bundle;
import android.os.Handler;
import android.os.StrictMode;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.app.AlertDialog;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;

import com.android.volley.AuthFailureError;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import kilomat.keylit.R;
import kilomat.keylit.adapter.ListAdapterPlaylist;
import kilomat.keylit.controller.AppController;
import kilomat.keylit.controller.RecyclerItemClickListener;
import kilomat.keylit.controller.SessionManager;
import kilomat.keylit.model.PlaylistData;

import static kilomat.keylit.controller.ToastMessage.bar_message_fail;
import static kilomat.keylit.controller.ToastMessage.bar_message_success;


public class PlaylistFragment extends Fragment implements SwipeRefreshLayout.OnRefreshListener {

    public static DownloadManager downloadManager;
    public static long myDownloadReference;
    public String TAG = "playlist";
    String idEdit = "";
    String nameEdit = "";
    private ProgressDialog mProgressDialog;
    private List<PlaylistData> mMovieList = new ArrayList<>();
    private RecyclerView mRecyclerView;
    private BroadcastReceiver receiverDownloadComplete;
    private BroadcastReceiver receiverNotificationClicked;
    private SwipeRefreshLayout swiprefreshview;
    SessionManager manager;
    String mytoken;
    String idUser;

    public PlaylistFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mProgressDialog = new ProgressDialog(getActivity());
        // Showing progress dialog before making http request
        mProgressDialog.setMessage(getString(R.string.action_load));
        mProgressDialog.setCancelable(false);
        mProgressDialog.show();

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        manager = new SessionManager();
        mytoken = manager.getPreferences(getActivity(), "TokenKey");
        idUser = manager.getPreferences(getActivity(), "IdUser");

        downloadManager = (DownloadManager) getActivity().getSystemService(Context.DOWNLOAD_SERVICE);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        final View layout = inflater.inflate(R.layout.activity_playlist, container, false);
        // Inflate the layout for this fragment
        mRecyclerView = (RecyclerView) layout.findViewById(R.id.recyclerView3);
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(getContext());
        linearLayoutManager.setOrientation(LinearLayoutManager.VERTICAL);
        mRecyclerView.setLayoutManager(linearLayoutManager);
        swiprefreshview = (SwipeRefreshLayout) layout.findViewById(R.id.swipe_refresh_layout);

        swiprefreshview.setOnRefreshListener(this);
        swiprefreshview.post(new Runnable() {
                                 @Override
                                 public void run() {
                                     swiprefreshview.setRefreshing(true);
                                     requestPlaylist();
                                 }
                             }
        );


        mRecyclerView.addOnItemTouchListener(
                new RecyclerItemClickListener(getContext(), mRecyclerView, new RecyclerItemClickListener.OnItemClickListener() {
                    @Override
                    public void onItemClick(View view, int position) {
                        // do whatever
                        PlaylistData playlist = mMovieList.get(position);
                        String PlaylistID = playlist.getId();
                        String PlaylistName = playlist.getName();
                        manager.setPreferences(getActivity(), "PlaylistID", PlaylistID);
                        manager.setPreferences(getActivity(), "PlaylistName", PlaylistName);
                        FragmentManager fm = getActivity().getSupportFragmentManager();// If you're already inside another fragment
                        PlaylistSongFragment yfObj = new PlaylistSongFragment();
                        fm.beginTransaction().replace(R.id.frame, yfObj).commit();
                    }

                    @Override
                    public void onLongItemClick(final View view, int position) {
                        LayoutInflater li = LayoutInflater.from(getContext());
                        View promptsView = li.inflate(R.layout.popup_playlist, null);

                        AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(
                                getContext());

                        PlaylistData playlist = mMovieList.get(position);
                        idEdit = playlist.getId();
                        nameEdit = playlist.getName();
                        alertDialogBuilder.setView(promptsView);

                        final EditText userInput = (EditText) promptsView
                                .findViewById(R.id.editTextDialogUserInput);

                        userInput.setText(nameEdit);

                        // set dialog message
                        alertDialogBuilder
                                .setCancelable(false)
                                .setPositiveButton(getString(R.string.action_ok),
                                        new DialogInterface.OnClickListener() {
                                            public void onClick(DialogInterface dialog, int id) {
                                                String name_new_playlist = String.valueOf(userInput.getText());
                                                callPopupModify(view, name_new_playlist, idEdit);
                                            }
                                        })
                                .setNeutralButton(getString(R.string.action_cancel),
                                        new DialogInterface.OnClickListener() {
                                            public void onClick(DialogInterface dialog, int id) {
                                                dialog.cancel();
                                            }
                                        })
                                .setNegativeButton(getString(R.string.action_delete),
                                        new DialogInterface.OnClickListener() {
                                            public void onClick(DialogInterface dialog, int id) {
                                                callPopupDelete(view, idEdit);
                                            }
                                        });

                        // create alert dialog
                        AlertDialog alertDialog = alertDialogBuilder.create();

                        // show it
                        alertDialog.show();
                    }
                })
        );

        Button fab = (Button) layout.findViewById(R.id.fab);

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(final View view) {

                LayoutInflater li = LayoutInflater.from(getContext());
                View promptsView = li.inflate(R.layout.popup_playlist, null);

                AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(
                        getContext());
                alertDialogBuilder.setView(promptsView);

                final EditText userInput = (EditText) promptsView
                        .findViewById(R.id.editTextDialogUserInput);

                // set dialog message
                alertDialogBuilder
                        .setCancelable(false)
                        .setPositiveButton(getString(R.string.action_ok),
                                new DialogInterface.OnClickListener() {
                                    public void onClick(DialogInterface dialog, int id) {
                                        String name_new_playlist = String.valueOf(userInput.getText());
                                        callPopup(view, name_new_playlist);
                                    }
                                })
                        .setNegativeButton(getString(R.string.action_cancel),
                                new DialogInterface.OnClickListener() {
                                    public void onClick(DialogInterface dialog, int id) {
                                        dialog.cancel();
                                    }
                                });

                // create alert dialog
                AlertDialog alertDialog = alertDialogBuilder.create();
                // show it
                alertDialog.show();
            }
        });

        return layout;
    }

    @Override
    public void onRefresh() {

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                mMovieList.clear();
                swiprefreshview.setRefreshing(false);
                requestPlaylist();
            }
        }, 2000);
    }


    protected String AddNewPlaylist(String name_playlist) throws IOException, JSONException {

<<<<<<< HEAD:Android/keylit/app/src/main/java/kilomat/keylit/fragments/PlaylistFragment.java
        //String mytoken = LoginActivity.sharedPreferences.getString("TokenKey", null);
        String address = "http://lightthemup.fr.nf:3000/playlists";
=======
        String address = getString(R.string.api_url_playlist);
>>>>>>> c400bcd8c18430a08839b1f6f3f08354b1ce5998:Android_dev/keylit/app/src/main/java/kilomat/keylit/fragments/PlaylistFragment.java

        HttpClient client = new DefaultHttpClient();
        HttpPost post = new HttpPost(address);
        List<NameValuePair> pairs = new ArrayList<NameValuePair>();

        pairs.add(new BasicNameValuePair("token", mytoken));
        pairs.add(new BasicNameValuePair("name", name_playlist));
        post.setEntity(new UrlEncodedFormEntity(pairs,HTTP.UTF_8));

        HttpResponse response = client.execute(post);

        HttpEntity entity = response.getEntity();
        String resp = EntityUtils.toString(entity);

        JSONObject jsonObj = new JSONObject(resp);
        String Xresponse = jsonObj.getString("success");

        return Xresponse;
    }

    protected void callPopup(View view, String name) {

        String result = "NULL";

        try {
            String response = AddNewPlaylist(name);
            if (response.equals("true")) {
                result = "Complete";
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }


        if (result.equals("Complete")) {
            bar_message_success(view, getString(R.string.playlist_add_new_playlist),
                    getString(R.string.toast_message_success));

        } else {
            bar_message_fail(view, getString(R.string.playlist_add_new_playlist),
                    getString(R.string.toast_message_fail));
        }
    }

    protected String ModifyPlaylist(String name_playlist, String id) throws IOException, JSONException {

<<<<<<< HEAD:Android/keylit/app/src/main/java/kilomat/keylit/fragments/PlaylistFragment.java
        //String mytoken = LoginActivity.sharedPreferences.getString("TokenKey", null);
        String address = "http://lightthemup.fr.nf:3000/playlists/" + id;
=======
        String address = getString(R.string.api_url_playlist) + id;
>>>>>>> c400bcd8c18430a08839b1f6f3f08354b1ce5998:Android_dev/keylit/app/src/main/java/kilomat/keylit/fragments/PlaylistFragment.java

        HttpClient client = new DefaultHttpClient();
        HttpPut post = new HttpPut(address);
        List<NameValuePair> pairs = new ArrayList<NameValuePair>();


        pairs.add(new BasicNameValuePair("token", mytoken));
        pairs.add(new BasicNameValuePair("idPlaylist", id));
        pairs.add(new BasicNameValuePair("name", name_playlist));
        post.setEntity(new UrlEncodedFormEntity(pairs, HTTP.UTF_8));

        HttpResponse response = client.execute(post);

        HttpEntity entity = response.getEntity();
        String resp = EntityUtils.toString(entity);

        JSONObject jsonObj = new JSONObject(resp);
        String Xresponse = jsonObj.getString("success");

        return Xresponse;
    }

    protected String DeleteMyPlaylist(String id) throws IOException, JSONException {

<<<<<<< HEAD:Android/keylit/app/src/main/java/kilomat/keylit/fragments/PlaylistFragment.java
        //String mytoken = LoginActivity.sharedPreferences.getString("TokenKey", null);
        String address = "http://lightthemup.fr.nf:3000/playlists/" + id;
=======
        String address = getString(R.string.api_url_playlist) + id;
>>>>>>> c400bcd8c18430a08839b1f6f3f08354b1ce5998:Android_dev/keylit/app/src/main/java/kilomat/keylit/fragments/PlaylistFragment.java

        HttpClient httpClient = new DefaultHttpClient();
        HttpDelete del = new HttpDelete(address);

        del.setHeader("x-access-token", mytoken);

        HttpResponse response = httpClient.execute(del);

        HttpEntity entity = response.getEntity();
        String resp = EntityUtils.toString(entity);

        JSONObject jsonObj = new JSONObject(resp);
        String Xresponse = jsonObj.getString("success");

        return Xresponse;
    }

    protected void callPopupDelete(View view, String id) {

        String result = "";

        try {
            String response = DeleteMyPlaylist(id);
            if (response.equals("true")) {
                result = "Complete";
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        if (result.equals("Complete")) {
            bar_message_success(view, getString(R.string.playlist_delete_playlist),
                    getString(R.string.toast_message_success));
        } else {
            bar_message_fail(view, getString(R.string.playlist_delete_playlist),
                    getString(R.string.toast_message_fail));
        }
    }

    protected void callPopupModify(View view, String name, String id) {

        String result = "";

        try {
            String response = ModifyPlaylist(name, id);
            if (response.equals("true")) {
                result = "Complete";
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }


        if (result.equals("Complete")) {
            bar_message_success(view, getString(R.string.playlist_modification_playlist),
                    getString(R.string.toast_message_success));

        } else {
            bar_message_fail(view, getString(R.string.playlist_modification_playlist),
                    getString(R.string.toast_message_fail));
        }

    }

    private void requestPlaylist() {

        swiprefreshview.setRefreshing(true);

<<<<<<< HEAD:Android/keylit/app/src/main/java/kilomat/keylit/fragments/PlaylistFragment.java
        String url = "http://lightthemup.fr.nf:3000/playlists/user";
=======
        String url = getString(R.string.api_url_playlist_users);
>>>>>>> c400bcd8c18430a08839b1f6f3f08354b1ce5998:Android_dev/keylit/app/src/main/java/kilomat/keylit/fragments/PlaylistFragment.java

        final JSONObject _jsonRequest = new JSONObject();

        JsonArrayRequest _stringRequest = new JsonArrayRequest(
                url, new Response.Listener<JSONArray>() {

            @Override
            public void onResponse(JSONArray response) {
                hidePDialog();
                // Parsing json
                for (int i = 0; i < response.length(); i++) {
                    try {
                        JSONObject obj = response.getJSONObject(i);
                        PlaylistData play = new PlaylistData();
                        play.setName(obj.getString("name"));
                        play.setDate(obj.getString("updatedAt"));
                        play.setId(obj.getString("_id"));
                        JSONArray arrJson = obj.getJSONArray("songs");

                        String nb = String.valueOf(arrJson.length());
                        play.setNbsongs(nb);

                        mMovieList.add(play);

                        if (mMovieList != null) {
                            mRecyclerView.setAdapter(new ListAdapterPlaylist(mMovieList,
                                    new LinkedList<>(Collections.nCopies(mMovieList.size(),
                                            R.drawable.movie_error_touch))));
                        } else {
                            swiprefreshview.setRefreshing(false);
                            Log.e(TAG, "@shop Error: Adapter is null");
                        }

                    } catch (JSONException jsonException) {
                        swiprefreshview.setRefreshing(false);
                        Log.e(TAG, "@shop JsonException Error: " + jsonException.getMessage());
                    }
                }
                swiprefreshview.setRefreshing(false);
            }

        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                swiprefreshview.setRefreshing(false);
                hidePDialog();
            }
        }) {

            @Override
            public byte[] getBody() {
                try {
                    return _jsonRequest.toString().getBytes(getParamsEncoding());
                } catch (UnsupportedEncodingException uee) {
                    return null;
                }
            }

            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {

                Map<String, String> _params = new HashMap<String, String>();
                _params.put("x-access-token", mytoken);

                return _params;
            }
        };
        swiprefreshview.setRefreshing(false);

        AppController.getInstance().addToRequestQueue(_stringRequest);
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
        if (swiprefreshview != null) {
            swiprefreshview.setRefreshing(false);
            swiprefreshview.destroyDrawingCache();
            swiprefreshview.clearAnimation();
        }
    }

}



