package kilomat.keylit.adapter;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
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

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import kilomat.keylit.R;
import kilomat.keylit.controller.SessionManager;
import kilomat.keylit.controller.ToastMessage;
import kilomat.keylit.model.SongData;

public class ListAdapterPlaylistSongAdd extends RecyclerView.Adapter<ListAdapterPlaylistSongAdd.MusicViewHolder> {

    protected LinkedList<Integer> drawableLinkedList;
    private List<SongData> mMovieList;
    private Context mContext;

    public ListAdapterPlaylistSongAdd(Context context, List<SongData> followerList, LinkedList<Integer> drawableLinkedList) {
        this.mContext = context;
        this.mMovieList = followerList;
        this.drawableLinkedList = drawableLinkedList;
    }

    @Override
    public void onBindViewHolder(final MusicViewHolder holder, final int position) {


        SongData movie = mMovieList.get(position);
        holder.title.setText(movie.getTitle());
        holder.rating.setText(movie.getArtist());
        //Use Glide to load the Image
<<<<<<< HEAD:Android/keylit/app/src/main/java/kilomat/keylit/adapter/ListAdapterPlaylistSongAdd.java
        Glide.with(mContext).load("http://lightthemup.fr.nf/" + movie.getThumbnailUrl()).centerCrop().into(holder.thumbNail);
=======
        Glide.with(mContext).load(mContext.getString(R.string.api_url)+ movie.getThumbnailUrl()).centerCrop().into(holder.thumbNail);
>>>>>>> c400bcd8c18430a08839b1f6f3f08354b1ce5998:Android_dev/keylit/app/src/main/java/kilomat/keylit/adapter/ListAdapterPlaylistSongAdd.java

        holder.imageViewAddMovie.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                AddMusic(v, position);
            }
        });
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
                inflate(R.layout.item_layout_playlist_add_song, viewGroup, false);

        return new MusicViewHolder(itemView);
    }

    protected void AddMusic(View v, final int position) {

        String result = "";

        try {
            String response = AddMusicToPlaylist(position);
            if (response.equals("true")) {
                result = "Complete";
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        if (result.equals("Complete")) {
            ToastMessage.bar_message_success(v, mContext.getString(R.string.playlist_add_song),
                    mContext.getString(R.string.toast_message_success));
        } else {

            ToastMessage.bar_message_fail(v, mContext.getString(R.string.playlist_add_song),
                    mContext.getString(R.string.toast_message_fail));
        }
    }


    protected String AddMusicToPlaylist(int position) throws IOException, JSONException {

        SongData myDataSong = mMovieList.get(position);
        String idMySong = myDataSong.getIdSong();
        SessionManager manager = new SessionManager();
        String mytoken = manager.getPreferences(mContext, "TokenKey");
        String PlaylistName = manager.getPreferences(mContext, "PlaylistName");
<<<<<<< HEAD:Android/keylit/app/src/main/java/kilomat/keylit/adapter/ListAdapterPlaylistSongAdd.java
        String address = "http://lightthemup.fr.nf:3000/playlists/" + PlaylistName;
        //String mytoken = LoginActivity.sharedPreferences.getString("TokenKey", null);
=======
        String address = mContext.getString(R.string.api_url_playlist) + PlaylistName;
>>>>>>> c400bcd8c18430a08839b1f6f3f08354b1ce5998:Android_dev/keylit/app/src/main/java/kilomat/keylit/adapter/ListAdapterPlaylistSongAdd.java


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

    public static class MusicViewHolder extends RecyclerView.ViewHolder {
        ImageView thumbNail;
        ImageView imageViewAddMovie;
        TextView title;
        TextView rating;


        public MusicViewHolder(View itemView) {
            super(itemView);

            thumbNail = (ImageView) itemView.findViewById(R.id.thumbnail);
            title = (TextView) itemView.findViewById(R.id.title);
            rating = (TextView) itemView.findViewById(R.id.rating);
            imageViewAddMovie = (ImageView) itemView.findViewById(R.id.btnDeletSong);

        }
    }
}
