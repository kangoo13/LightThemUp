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

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import kilomat.keylit.R;
import kilomat.keylit.controller.SessionManager;
import kilomat.keylit.controller.ToastMessage;
import kilomat.keylit.fragments.ShopFragment;
import kilomat.keylit.model.ShopData;

public class ListAdapterShop extends RecyclerView.Adapter<ListAdapterShop.MusicViewHolder> {

    public String downloadFileUrl = "";
    public String midiFile;
    protected LinkedList<Integer> drawableLinkedList;
    MediaPlayer mediaPlayer;
    private List<ShopData> mMovieList;
    private Context mContext;

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
        holder.rating.setText(movie.getArtist());
        float val = (float) movie.getRating();
        holder.ratingbar.setRating(val);
        //Use Glide to load the Image
        Glide.with(mContext).load("http://95.85.2.100/" + movie.getThumbnailUrl()).centerCrop().into(holder.thumbNail);

        downloadFileUrl = movie.getGenre();
        holder.download.setText("Download : " + String.valueOf(movie.getDownload()));
        holder.year.setText(String.valueOf(movie.getYear()) + " €");

        holder.imageViewAddMovie.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onMemberClick(position);
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

    public void test(int position) {
        ShopData myData = mMovieList.get(position);
        downloadFileUrl = myData.getGenre();
        Uri uri = Uri.parse("http://95.85.2.100/" + downloadFileUrl);
        DownloadManager.Request request = new DownloadManager.Request(uri);
        String CurrentString = downloadFileUrl;
        String[] separated = CurrentString.split("/");
        midiFile = "/keylit/" + separated[3];

        request.setDescription(myData.getTitle())
                .setTitle("Notification Title");
        request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS + "/Keylit/", separated[3]);
        midiFile = Environment.getExternalStorageDirectory().getPath() + "/Download" + midiFile;
        request.setVisibleInDownloadsUi(true);

        request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI
                | DownloadManager.Request.NETWORK_MOBILE);

        ShopFragment.myDownloadReference = ShopFragment.downloadManager.enqueue(request);
    }

    protected void onMidiPlayClick(MusicViewHolder holder, int position) {
        test(position);

        mediaPlayer = MediaPlayer.create(mContext, Uri.parse(midiFile));
        if (!mediaPlayer.isPlaying()) {
            mediaPlayer.start();
            holder.imageViewPlaymusic.setVisibility(View.GONE);
            holder.imageViewStopmusic.setVisibility(View.VISIBLE);
            //Set the Image Resource
            holder.imageViewPlaymusic.setImageResource(R.drawable.media_pause);

            ToastMessage toastMessage = new ToastMessage();
            toastMessage.message_success(mContext, "MediaPlayer start");
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

    protected String AddMusicToUser(int position) throws IOException, JSONException {

        ShopData myDataSong = mMovieList.get(position);
        String idMySong = myDataSong.getIdSong();
        SessionManager manager = new SessionManager();

        String mytoken = manager.getPreferences(mContext, "TokenKey");
        //String mytoken = LoginActivity.sharedPreferences.getString("TokenKey", null);
        String address = "http://95.85.2.100:3000/users/songs/";

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

    protected void onMemberClick(final int position) {
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

        ToastMessage toastMessage = new ToastMessage();

        if (result.equals("Complete")) {
            toastMessage.message_success(mContext, "Musique ajouté à l'utilisateur !");
            drawableLinkedList.remove(position);
            drawableLinkedList.add(position, R.drawable.movie_added_touch);
            notifyDataSetChanged();
        } else {
            drawableLinkedList.remove(position);
            drawableLinkedList.add(position, R.drawable.movie_error_touch);
            toastMessage.message_error(mContext, mContext.getString(R.string.text_something_went_wrong));
            toastMessage.message_error(mContext, "Error Shop : Add music failed");
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
