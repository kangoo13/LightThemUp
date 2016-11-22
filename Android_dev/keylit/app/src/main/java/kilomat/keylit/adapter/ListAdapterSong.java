package kilomat.keylit.adapter;

import android.app.DownloadManager;
import android.content.Context;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Environment;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

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
import kilomat.keylit.controller.SessionManager;
import kilomat.keylit.controller.ToastMessage;
import kilomat.keylit.fragments.SongsFragment;
import kilomat.keylit.model.SongData;

import static kilomat.keylit.controller.ToastMessage.bar_message_warning;

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
        Glide.with(mContext).load(mContext.getString(R.string.api_url)+
                movie.getThumbnailUrl()).centerCrop().into(holder.thumbNail);

        downloadFileUrl = movie.getGenre();

        holder.imageViewAddMovie.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                DeleteSongClick(v, position);
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
        Uri uri = Uri.parse("http://lightthemup.fr.nf/" + downloadFileUrl);
        DownloadManager.Request request = new DownloadManager.Request(uri);
        String CurrentString = downloadFileUrl;
        String[] separated = CurrentString.split("/");
        separated[3] = separated[3].replaceAll(" ", "_").toLowerCase();
        midiFile = "/keylit/" + separated[3];

        request.setDescription(myData.getTitle())
                .setTitle("Notification Title");
        request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS + "/Keylit/", separated[3]);
        midiFile = Environment.getExternalStorageDirectory().getPath() + "/Download" + midiFile;
        request.setVisibleInDownloadsUi(true);

        request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI
                | DownloadManager.Request.NETWORK_MOBILE);

        SongsFragment.myDownloadReference = SongsFragment.downloadManager.enqueue(request);
    }


    protected void onMidiPlayClick(View v, MusicViewHolder holder, int position) {
        DownloadMidiFileFromServer(position);

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
        }
        else
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

    protected void DeleteSongClick(View v, final int position) {

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
            ToastMessage.bar_message_success(v, mContext.getString(R.string.song_delete),
                    mContext.getString(R.string.toast_message_success));
            drawableLinkedList.remove(position);
            drawableLinkedList.add(position, R.drawable.movie_error_touch);
            notifyDataSetChanged();
        } else {
            drawableLinkedList.remove(position);
            drawableLinkedList.add(position, R.drawable.movie_error_touch);
            ToastMessage.bar_message_success(v, mContext.getString(R.string.song_delete),
                    mContext.getString(R.string.toast_message_fail));
        }
    }


    protected String DeleteMusicToUser(int position) throws IOException, JSONException {

        SongData myDataSong = mMovieList.get(position);
        String idMySong = myDataSong.getIdSong();
        SessionManager manager = new SessionManager();
        String mytoken = manager.getPreferences(mContext, "TokenKey");
        String address = mContext.getString(R.string.api_url_users_songs) + idMySong;

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
