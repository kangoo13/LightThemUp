package kilomat.keylit.adapter;

import android.app.DownloadManager;
import android.content.Context;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Environment;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

import kilomat.keylit.R;
import kilomat.keylit.controller.AppController;
import kilomat.keylit.controller.SessionManager;
import kilomat.keylit.controller.ToastMessage;
import kilomat.keylit.fragments.SongsFragment;
import kilomat.keylit.model.SongData;

public class ListAdapterSong extends RecyclerView.Adapter<ListAdapterSong.MusicViewHolder> {

    public String downloadFileUrl = "";
    public String midiFile;
    protected LinkedList<Integer> drawableLinkedList;
    MediaPlayer mediaPlayer;
    private List<SongData> mMovieList;
    private Context mContext;

    public ListAdapterSong(Context context, List<SongData> followerList, LinkedList<Integer> drawableLinkedList) {
        this.mContext = context;
        this.mMovieList = followerList;
        this.drawableLinkedList = drawableLinkedList;
    }

    @Override
    public void onBindViewHolder(final MusicViewHolder holder, final int position) {


        SongData movie = mMovieList.get(position);
        final int actionDrawableId = this.drawableLinkedList.get(position);
        holder.title.setText(movie.getTitle());
        holder.rating.setText(movie.getArtist());

        //Use Glide to load the Image
        Glide.with(mContext).load("http://95.85.2.100/" + movie.getThumbnailUrl()).centerCrop().into(holder.thumbNail);

        downloadFileUrl = movie.getGenre();

        holder.imageViewAddMovie.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.d("Test", "imageViewAddMovie.setOnClickListener");
                SendFileByBluetoothClick(position);
            }
        });

        holder.imageViewPlaymusic.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.d("Test", "imageViewPlaymusic.setOnClickListener");
                AppController.getInstance().getBtControler().SendFile(Environment.getExternalStorageDirectory().getPath() + "/Download/Keylit/" + mMovieList.get(position).getGenre().split("/")[3]);
                //onMidiPlayClick(holder, position);
            }
        });

        holder.imageViewStopmusic.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.d("Test", "imageViewStopmusic.setOnClickListener");
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
                inflate(R.layout.item_layout_song, viewGroup, false);

        return new MusicViewHolder(itemView);
    }

    public void DownloadMidiFileFromServer(int position) {
        SongData myData = mMovieList.get(position);
        downloadFileUrl = myData.getGenre();
        Uri uri = Uri.parse("http://95.85.2.100/" + downloadFileUrl);
        DownloadManager.Request request = new DownloadManager.Request(uri);
        String CurrentString = downloadFileUrl;
        Log.d("TestDownLoad" , "downloadFileUrl:"+downloadFileUrl);
        String[] separated = CurrentString.split("/");
        midiFile = "/keylit/" + separated[3];
        Log.d("TestDownLoad" , "midiFile:"+midiFile);

        request.setDescription(myData.getTitle())
                .setTitle(myData.getTitle());
        request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS + "/Keylit/", separated[3]);
        midiFile = Environment.getExternalStorageDirectory().getPath() + "/Download" + midiFile;
        Log.d("TestDownLoad" , "midiFile:"+midiFile);
        request.setVisibleInDownloadsUi(true);

        request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI
                | DownloadManager.Request.NETWORK_MOBILE);

        SongsFragment.myDownloadReference = SongsFragment.downloadManager.enqueue(request);
    }

    protected void onMidiPlayClick(MusicViewHolder holder, int position) {
        DownloadMidiFileFromServer(position);

        mediaPlayer = MediaPlayer.create(mContext, Uri.parse(midiFile));
        if (!mediaPlayer.isPlaying()) {
            mediaPlayer.start();
            holder.imageViewPlaymusic.setVisibility(View.GONE);
            holder.imageViewStopmusic.setVisibility(View.VISIBLE);
            //Set the Image Resource
            holder.imageViewPlaymusic.setImageResource(R.drawable.media_pause);
            ToastMessage toastMessage = new ToastMessage();
            toastMessage.message_success(mContext,"MediaPlayer start");
        }
    }

    protected void onMidiStopClick(MusicViewHolder holder) {
        if (mediaPlayer.isPlaying()) {
            mediaPlayer.pause();
            holder.imageViewPlaymusic.setVisibility(View.VISIBLE);
            holder.imageViewStopmusic.setVisibility(View.GONE);
            //Set the Image Resource
            holder.imageViewPlaymusic.setImageResource(R.drawable.media_play);
            ToastMessage toastMessage = new ToastMessage();
            toastMessage.message_success(mContext, "MediaPlayer stop");
        }
    }

    protected void SendFileByBluetoothClick(final int position) {

        String result = "";

        try {
            String response = DeleteMusicToUser(position);
            if (response.equals("true")) {
                result = "Complete";
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        if (result.equals("Complete")) {
            Toast.makeText(mContext, "Song Deleted !", Toast.LENGTH_SHORT).show();
            drawableLinkedList.remove(position);
            drawableLinkedList.add(position, R.drawable.movie_error_touch);
            notifyDataSetChanged();
        } else {
            drawableLinkedList.remove(position);
            drawableLinkedList.add(position, R.drawable.movie_error_touch);
            Toast.makeText(mContext, mContext.getString(R.string.text_something_went_wrong),
                    Toast.LENGTH_SHORT).show();
            Toast.makeText(mContext, "Error Shop : Delete song failed", Toast.LENGTH_SHORT).show();
        }
    }


    protected String DeleteMusicToUser(int position) throws IOException, JSONException {

        SongData myDataSong = mMovieList.get(position);
        String idMySong = myDataSong.getIdSong();
        SessionManager manager = new SessionManager();
        String mytoken = manager.getPreferences(mContext, "TokenKey");
        //String mytoken = LoginActivity.sharedPreferences.getString("TokenKey", null);
        String address = "http://95.85.2.100:3000/users/songs/" + idMySong;

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

    public static class MusicViewHolder extends RecyclerView.ViewHolder {
        ImageView thumbNail;
        ImageView imageViewAddMovie;
        ImageView imageViewPlaymusic;
        ImageView imageViewStopmusic;
        TextView title;
        TextView rating;
        
        public MusicViewHolder(View itemView) {
            super(itemView);

            thumbNail = (ImageView) itemView.findViewById(R.id.thumbnail);
            title = (TextView) itemView.findViewById(R.id.title);
            rating = (TextView) itemView.findViewById(R.id.rating);
            imageViewAddMovie = (ImageView) itemView.findViewById(R.id.btnDeletSong);
            imageViewPlaymusic = (ImageView) itemView.findViewById(R.id.btnPlayMidi);
            imageViewStopmusic = (ImageView) itemView.findViewById(R.id.btnStopMidi);

        }
    }
}
