package kilomat.keylit.adapter;

import android.app.DownloadManager;
import android.bluetooth.BluetoothAdapter;
import android.content.ContentValues;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.media.MediaPlayer;
import android.os.AsyncTask;
import android.os.Environment;
import android.preference.PreferenceManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

import android.app.Activity;
import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.os.ParcelFileDescriptor;
import android.preference.PreferenceManager;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

import com.bumptech.glide.Glide;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicHeader;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import kilomat.keylit.R;
import kilomat.keylit.activity.LoginActivity;
import kilomat.keylit.activity.PlaylistActivity;
import kilomat.keylit.activity.ShopActivity;

import kilomat.keylit.model.BluetoothShare;
import kilomat.keylit.model.ShopData;

public class ListAdapterShop extends RecyclerView.Adapter<ListAdapterShop.MusicViewHolder> {

    private List<ShopData> mMovieList;
    protected LinkedList<Integer> drawableLinkedList;
    private Context mContext;
    private Boolean MidiPlayer = false;
    MediaPlayer mediaPlayer;
    public  String downloadFileUrl = "";
    public String midiFile;
    private String Xresponse;
    private final static int REQUEST_ENABLE_BT = 1;
    ////////////
    // duration that the device is discoverable
    private static final int DISCOVER_DURATION = 300;

    // our request code (must be greater than zero)
    private static final int REQUEST_BLU = 1;
    BluetoothAdapter btAdapter = BluetoothAdapter.getDefaultAdapter();
    ///////////////////


    public ListAdapterShop(Context context, List<ShopData> followerList, LinkedList<Integer> drawableLinkedList) {
        this.mContext = context;
        this.mMovieList = followerList;
        this.drawableLinkedList = drawableLinkedList;
    }

    @Override
    public void onBindViewHolder(final MusicViewHolder holder, final int position) {


        ShopData movie = mMovieList.get(position);
        final int actionDrawableId = this.drawableLinkedList.get(position);
        holder.title.setText(movie.getTitle());
        //holder.rating.setText("Rating: " + String.valueOf(movie.getRating()));
        holder.rating.setText(movie.getArtist());
        float val = (float) movie.getRating();
        holder.ratingbar.setRating(val / 2);
        //Use Glide to load the Image
        Glide.with(mContext).load("http://95.85.2.100/" + movie.getThumbnailUrl()).centerCrop().into(holder.thumbNail);

        downloadFileUrl = movie.getGenre();
        holder.download.setText("Download : " + String.valueOf(movie.getDownload()));
        holder.year.setText(String.valueOf(movie.getYear()) + " €");

        holder.imageViewAddMovie.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onMemberClick(position, mMovieList, actionDrawableId, holder);
            }
        });

        holder.imageViewPlaymusic.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onMidiPlayClick(holder, position);
            }
        });

        holder.imageViewStopmusic.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onMidiStopClick(holder);
            }
        });

        //Set the Image Resource
        holder.imageViewAddMovie.setImageResource(actionDrawableId);
    }

    @Override
    public int getItemCount() {
        return mMovieList.size();
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public MusicViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {

        View itemView = LayoutInflater.
                from(viewGroup.getContext()).
                inflate(R.layout.item_layout_shop, viewGroup, false);

        return new MusicViewHolder(itemView);
    }


    public static class MusicViewHolder extends RecyclerView.ViewHolder {
        ImageView thumbNail;
        ImageView imageViewAddMovie;
        ImageView imageViewPlaymusic;
        ImageView imageViewStopmusic;
        TextView title;
        RatingBar ratingbar;
        TextView rating;
        TextView download;
        TextView year;


        public MusicViewHolder(View itemView) {
            super(itemView);

            thumbNail = (ImageView) itemView.findViewById(R.id.thumbnail);
            title = (TextView) itemView.findViewById(R.id.title);
            ratingbar = (RatingBar) itemView.findViewById(R.id.ratingbar);
            rating = (TextView) itemView.findViewById(R.id.rating);
            download = (TextView) itemView.findViewById(R.id.genre);
            year = (TextView) itemView.findViewById(R.id.releaseYear);
            imageViewAddMovie = (ImageView) itemView.findViewById(R.id.btnAddMovie);
            imageViewPlaymusic = (ImageView) itemView.findViewById(R.id.btnPlayMidi);
            imageViewStopmusic = (ImageView) itemView.findViewById(R.id.btnStopMidi);

        }
    }


    public  void test(int position)
    {
        ShopData myData = mMovieList.get(position);
        downloadFileUrl = myData.getGenre();
        Uri uri = Uri.parse("http://95.85.2.100/" + downloadFileUrl);
        DownloadManager.Request request = new DownloadManager.Request(uri);
        String CurrentString = downloadFileUrl;
        String[] separated = CurrentString.split("/");
        midiFile = "/keylit/"+separated[3];

        request.setDescription(myData.getTitle())
                .setTitle("Notification Title");
        request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS + "/Keylit/", separated[3]);
        midiFile = Environment.getExternalStorageDirectory().getPath()+ "/Download" + midiFile;
        request.setVisibleInDownloadsUi(true);

        request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI
                | DownloadManager.Request.NETWORK_MOBILE);

        ShopActivity.myDownloadReference = ShopActivity.downloadManager.enqueue(request);
    }

    protected void onMidiPlayClick(MusicViewHolder holder, int position)
    {
        test(position);

        mediaPlayer = MediaPlayer.create(mContext, Uri.parse(midiFile));
        if(!mediaPlayer.isPlaying()){
            mediaPlayer.start();
            holder.imageViewPlaymusic.setVisibility(View.GONE);
            holder.imageViewStopmusic.setVisibility(View.VISIBLE);
            //Set the Image Resource
            holder.imageViewPlaymusic.setImageResource(R.drawable.media_pause);
            Toast.makeText(mContext,
                    "MediaPlayer start",
                    Toast.LENGTH_LONG).show();
        }
    }

    protected void onMidiStopClick(MusicViewHolder holder)
    {
    if (mediaPlayer.isPlaying()){
            mediaPlayer.pause();
        holder.imageViewPlaymusic.setVisibility(View.VISIBLE);
        holder.imageViewStopmusic.setVisibility(View.GONE);
            //Set the Image Resource
            holder.imageViewPlaymusic.setImageResource(R.drawable.media_play);
            Toast.makeText(mContext,
                    "MediaPlayer stop",
                    Toast.LENGTH_LONG).show();
        }

    }

    protected void sendbt(final MusicViewHolder holder, int position) throws IOException {

        ShopData myDataSong = mMovieList.get(position);
        String idMySong = myDataSong.getIdSong();

        // Validation Completed
        String address = "http://95.85.2.100:3000/songs/";
        HttpClient client = new DefaultHttpClient();
        HttpPost post = new HttpPost(address);
        List<NameValuePair> pairs = new ArrayList<NameValuePair>();
        SharedPreferences sharedPreferences = PreferenceManager
                .getDefaultSharedPreferences(mContext);
       // String name = sharedPreferences.getString(key, "default value");
        String mytoken = LoginActivity.sharedPreferences.getString("TokenKey", null);
        post.setHeader(new BasicHeader("x-access-token", mytoken));

        pairs.add(new BasicNameValuePair("idSong", idMySong));
        //pairs.add(new BasicNameValuePair("name", "coucou"));
        post.setEntity(new UrlEncodedFormEntity(pairs));

        HttpResponse response = null;
        response = client.execute(post);

        //if (response.getStatusLine().getStatusCode() == 200)
       // {
            System.out.println("--------------[OK]--------------");
            HttpEntity entity = response.getEntity();
            String resp = null;
            resp = EntityUtils.toString(entity);
            System.out.println("--------------(" + resp + ")--------------");

       // }
        //else
        //{
        //    Toast.makeText(mContext, "Error Shop : Add music failed", Toast.LENGTH_LONG).show();
       // }

       /* ContentValues values = new ContentValues();
        values.put(BluetoothShare.URI, Uri.fromFile(new File(midiFile)).toString());
        values.put(BluetoothShare.DESTINATION, "10:D5:42:67:A7:1A");
        values.put(BluetoothShare.DIRECTION, BluetoothShare.DIRECTION_OUTBOUND);
        Long ts = System.currentTimeMillis();
        values.put(BluetoothShare.TIMESTAMP, ts);*/
    }


    protected void onMemberClick(final int position, final List<ShopData> followerList,int actionDrawableId, final MusicViewHolder holder) {
        final ShopData follower = followerList.get(position);
        switch (actionDrawableId) {
            case R.drawable.movie_add_touch:
                //sendbt(holder, position);

                try {
                    sendbt(holder, position);
                } catch (IOException e) {
                    e.printStackTrace();
                }

                break;

            case R.drawable.movie_added_touch:
                new AsyncTask<String, Void, String>() {
                    @Override
                    protected String doInBackground(String... params) {
                        for (int i = 0; i < 1; i++) {
                            try {
                                Thread.sleep(1000);
                            } catch (InterruptedException e) {
                                Thread.interrupted();
                            }
                        }
                        return "Complete";
                    }

                    @Override
                    protected void onPostExecute(String result) {
                        super.onPostExecute(result);
                        if (result.equals("Complete")) {
                            drawableLinkedList.remove(position);
                            drawableLinkedList.add(position, R.drawable.movie_add_touch);
                            notifyDataSetChanged();
                        } else {
                            drawableLinkedList.remove(position);
                            drawableLinkedList.add(position, R.drawable.movie_error_touch);
                            Toast.makeText(mContext, "Something went wrong", Toast.LENGTH_SHORT).show();
                        }
                    }
                }.execute();
                break;

        }


    }



   /* protected void onMemberClick(final int position, final List<ShopData> followerList,int actionDrawableId) {
        final ShopData follower = followerList.get(position);
        switch (actionDrawableId) {
            case R.drawable.movie_add_touch:

                new AsyncTask<String, Void, String>() {
                    @Override
                    protected String doInBackground(String... params) {
                        for (int i = 0; i < 1; i++) {
                            try {
                                Thread.sleep(1000);
                            } catch (InterruptedException e) {
                                Thread.interrupted();
                            }
                        }
                        return "Complete";
                    }

                    @Override
                    protected void onPostExecute(String result) {
                        super.onPostExecute(result);
                        if (result.equals("Complete")) {
                            Toast.makeText(mContext, follower.getTitle(), Toast.LENGTH_SHORT).show();
                            drawableLinkedList.remove(position);
                            drawableLinkedList.add(position, R.drawable.movie_added_touch);
                            notifyDataSetChanged();
                        } else {
                            drawableLinkedList.remove(position);
                            drawableLinkedList.add(position, R.drawable.movie_error_touch);
                            Toast.makeText(mContext, mContext.getString(R.string.text_something_went_wrong),
                                    Toast.LENGTH_SHORT).show();
                        }
                    }
                }.execute();
                break;

            case R.drawable.movie_added_touch:
                new AsyncTask<String, Void, String>() {
                    @Override
                    protected String doInBackground(String... params) {
                        for (int i = 0; i < 1; i++) {
                            try {
                                Thread.sleep(1000);
                            } catch (InterruptedException e) {
                                Thread.interrupted();
                            }
                        }
                        return "Complete";
                    }

                    @Override
                    protected void onPostExecute(String result) {
                        super.onPostExecute(result);
                        if (result.equals("Complete")) {
                            drawableLinkedList.remove(position);
                            drawableLinkedList.add(position, R.drawable.movie_add_touch);
                            notifyDataSetChanged();
                        } else {
                            drawableLinkedList.remove(position);
                            drawableLinkedList.add(position, R.drawable.movie_error_touch);
                            Toast.makeText(mContext, "Something went wrong", Toast.LENGTH_SHORT).show();
                        }
                    }
                }.execute();
                break;
            case R.drawable.movie_error_touch:
                new AsyncTask<String, Void, String>() {
                    @Override
                    protected String doInBackground(String... params) {
                        for (int i = 0; i < 1; i++) {
                            try {
                                Thread.sleep(1000);
                            } catch (InterruptedException e) {
                                Thread.interrupted();
                            }
                        }
                        return "Complete";
                    }

                    @Override
                    protected void onPostExecute(String result) {
                        super.onPostExecute(result);
                        if (result.equals("Complete")) {
                            drawableLinkedList.remove(position);
                            drawableLinkedList.add(position, R.drawable.movie_added_touch);
                            notifyDataSetChanged();
                        } else {
                            drawableLinkedList.remove(position);
                            drawableLinkedList.add(position, R.drawable.movie_error_touch);
                            Toast.makeText(mContext, "Something went wrong", Toast.LENGTH_SHORT).show();
                        }
                    }
                }.execute();
                break;
        }


    }*/
}
