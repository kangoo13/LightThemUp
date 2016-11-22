package kilomat.keylit.adapter;

import android.Manifest;
import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.pm.PackageManager;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Environment;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;

import com.bumptech.glide.Glide;

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

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import kilomat.keylit.R;
import kilomat.keylit.controller.SessionManager;
import kilomat.keylit.controller.ToastMessage;
import kilomat.keylit.fragments.ShopFragment;
import kilomat.keylit.model.ShopData;

import static kilomat.keylit.controller.ToastMessage.bar_message_warning;

public class ListAdapterShop extends RecyclerView.Adapter<ListAdapterShop.MusicViewHolder> {

    public String downloadFileUrl = "";
    private static final int PERMISSION_REQUEST_CODE = 1;
    public String midiFile;
    public String file_name_download, file_title_download;
    protected LinkedList<Integer> drawableLinkedList;
    MediaPlayer mediaPlayer;
    private List<ShopData> mShopList;
    private Context mContext;
    SessionManager manager;
    private ProgressDialog mProgressDialog;

    public ListAdapterShop(Context context, List<ShopData> followerList, LinkedList<Integer> drawableLinkedList) {
        this.mContext = context;
        this.mShopList = followerList;
        this.drawableLinkedList = drawableLinkedList;
    }

    @Override
    public void onBindViewHolder(final MusicViewHolder holder, final int position) {

        ShopData movie = mShopList.get(position);
        final int actionDrawableId = this.drawableLinkedList.get(position);
        holder.title.setText(movie.getTitle());
        holder.rating.setText(movie.getArtist());
        float val = (float) movie.getRating();
        holder.ratingbar.setRating(val);
        //Use Glide to load the Image
        Glide.with(mContext).load(mContext.getString(R.string.api_url) +
                movie.getThumbnailUrl()).centerCrop().into(holder.thumbNail);

        downloadFileUrl = movie.getGenre();
        holder.download.setText("Download : " + String.valueOf(movie.getDownload()));
        holder.year.setText(String.valueOf(movie.getYear()) + " €");

        holder.imageViewAddMovie.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onMemberClick(v, position);
            }
        });

        holder.imageViewPlaymusic.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onMidiPlayClick(v, holder, position);
            }
        });

        holder.imageViewStopmusic.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onMidiStopClick(v, holder);
            }
        });

        //Set the Image Resource
        holder.imageViewAddMovie.setImageResource(actionDrawableId);
    }

    @Override
    public int getItemCount() {
        return mShopList.size();
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
        manager = new SessionManager();
        return new MusicViewHolder(itemView);
    }

    private boolean isFileExists(String filename) {

        File folder1 = new File(Environment.getExternalStorageDirectory().getAbsolutePath() + filename);
        return folder1.exists();
    }

    private boolean deleteFile(String filename) {

        File folder1 = new File(Environment.getExternalStorageDirectory().getAbsolutePath() + filename);
        return folder1.delete();
    }

    public String  startDownload()
    {
        String request = null;
        int result_write = ContextCompat.checkSelfPermission(mContext, Manifest.permission.WRITE_EXTERNAL_STORAGE);
        int result_read = ContextCompat.checkSelfPermission(mContext, Manifest.permission.READ_EXTERNAL_STORAGE);
        if (result_write == PackageManager.PERMISSION_GRANTED || result_read == PackageManager.PERMISSION_GRANTED){
            request = startDownloading();
        } else {
            requestForLocationPermission();
            //request = startDownloading();
        }
        return request;
    }

    private void requestForLocationPermission()
    {

        if (ActivityCompat.shouldShowRequestPermissionRationale((Activity) mContext,
                Manifest.permission.WRITE_EXTERNAL_STORAGE)
                || ActivityCompat.shouldShowRequestPermissionRationale((Activity) mContext,
                Manifest.permission.READ_EXTERNAL_STORAGE))
        {
        }
        else {
            ActivityCompat.requestPermissions((Activity) mContext,
                    new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},PERMISSION_REQUEST_CODE);
            ActivityCompat.requestPermissions((Activity) mContext,
                    new String[]{Manifest.permission.READ_EXTERNAL_STORAGE}, PERMISSION_REQUEST_CODE);
        }
    }
    
    public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults)
    {
        switch (requestCode) {
            case PERMISSION_REQUEST_CODE:
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED)
                {
                    startDownloading();
                }
                break;
        }
    }


    public String startDownloading()
    {

        Uri uri = Uri.parse("http://lightthemup.fr.nf/" + downloadFileUrl);
        android.app.DownloadManager.Request request = new android.app.DownloadManager.Request(uri);

        request.setDescription(file_title_download)
                .setTitle("Notification Title");
        request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, file_name_download);

        request.setVisibleInDownloadsUi(true);
        request.setAllowedNetworkTypes(android.app.DownloadManager.Request.NETWORK_WIFI
                | android.app.DownloadManager.Request.NETWORK_MOBILE);
        ShopFragment.myDownloadReference = ShopFragment.downloadManager.enqueue(request);

        // }
        midiFile = Environment.getExternalStorageDirectory().getPath()+ "/Download/" + file_name_download;

        return midiFile;
    }


    protected void onMidiPlayClick(final View v, MusicViewHolder holder, int position) {
        // test pour montrer le chargement
        final ShopData myData = mShopList.get(position);
        file_name_download = myData.getIdSong() + ".mid";
        downloadFileUrl = myData.getGenre();
        file_title_download = myData.getTitle();

        midiFile = startDownload();

        playingMidifile(v, holder);
    }

    void playingMidifile(View v, MusicViewHolder holder)
    {
        mediaPlayer = MediaPlayer.create(mContext, Uri.parse(midiFile));

        if (mediaPlayer != null) {
            if (!mediaPlayer.isPlaying()) {
                mediaPlayer.start();
                holder.imageViewPlaymusic.setVisibility(View.GONE);
                holder.imageViewStopmusic.setVisibility(View.VISIBLE);
                //Set the Image Resource
                holder.imageViewPlaymusic.setImageResource(R.drawable.ic_pause_circle_outline_white_24dp);
                bar_message_warning(v, mContext.getString(R.string.music_play));
            }
        } else
            bar_message_warning(v, mContext.getString(R.string.music_fail));
    }

    protected void onMidiStopClick(View v, MusicViewHolder holder) {
        if (mediaPlayer.isPlaying()) {
            mediaPlayer.pause();
            holder.imageViewPlaymusic.setVisibility(View.VISIBLE);
            holder.imageViewStopmusic.setVisibility(View.GONE);
            //Set the Image Resource
            holder.imageViewPlaymusic.setImageResource(R.drawable.ic_play_circle_outline_white_24dp);
            bar_message_warning(v, mContext.getString(R.string.music_stop));
        }
    }

    protected String AddMusicToUser(int position) throws IOException, JSONException {

        ShopData myDataSong = mShopList.get(position);
        String idMySong = myDataSong.getIdSong();
        SessionManager manager = new SessionManager();

        String mytoken = manager.getPreferences(mContext, "TokenKey");
        String address = mContext.getString(R.string.api_url_users_songs);

        HttpClient client = new DefaultHttpClient();
        HttpPost post = new HttpPost(address);
        List<NameValuePair> pairs = new ArrayList<NameValuePair>();

        post.setHeader(new BasicHeader("x-access-token", mytoken));
        pairs.add(new BasicNameValuePair("idSong", idMySong));
        post.setEntity(new UrlEncodedFormEntity(pairs));

        HttpResponse response = client.execute(post);

        HttpEntity entity = response.getEntity();
        String resp = EntityUtils.toString(entity);

        JSONObject jsonObj = new JSONObject(resp);
        String Xresponse = jsonObj.getString("success");

        return Xresponse;
    }

    protected void onMemberClick(View v, final int position) {
        String result = "NULL";

        try {
            String response = AddMusicToUser(position);
            if (response.equals("true")) {
                result = "Complete";
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        if (result.equals("Complete")) {
            ToastMessage.bar_message_success(v, mContext.getString(R.string.shop_add_music),
                    mContext.getString(R.string.toast_message_success));
            drawableLinkedList.remove(position);
            drawableLinkedList.add(position, R.drawable.movie_added_touch);
            notifyDataSetChanged();
        } else {
            drawableLinkedList.remove(position);
            drawableLinkedList.add(position, R.drawable.movie_error_touch);
            ToastMessage.bar_message_fail(v, mContext.getString(R.string.shop_add_music),
                    mContext.getString(R.string.toast_message_fail));
        }
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
}
