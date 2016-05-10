package kilomat.keylit;

import android.content.Context;
import android.media.MediaPlayer;
import android.os.AsyncTask;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;

import java.util.LinkedList;
import java.util.List;

public class ListAdapterShop extends RecyclerView.Adapter<ListAdapterShop.MusicViewHolder> {

    private List<ShopData> mMovieList;
    protected LinkedList<Integer> drawableLinkedList;
    private Context mContext;
    private Boolean MidiPlayer = false;
    MediaPlayer mediaPlayer;

    /**
     * Default Constructor
     *
     * @param context      Application context
     * @param followerList Follower List objects
     * @param drawableLinkedList      Drawable item .
     */
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
        Glide.with(mContext).load(movie.getThumbnailUrl()).centerCrop().into(holder.thumbNail);

        // genre
        String genreStr = "";
        for (String str : movie.getGenre()) {
            genreStr += str + ", ";
        }
        genreStr = genreStr.length() > 0 ? genreStr.substring(0,
                genreStr.length() - 2) : genreStr;
        // holder.genre.setText(genreStr);
        holder.genre.setText("Download : " + String.valueOf(movie.getDownload()));
        holder.year.setText(String.valueOf(movie.getYear()) + " €");
        /**
         * Set OnClickListener on the Button.
         * We pass in 3 parameters:
         * @param position :Position of the object on the List
         * @param mMusicList ShopData Object
         * @param actionDrawableId Drawable ID
         */
        holder.imageViewAddMovie.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onMemberClick(position, mMovieList, actionDrawableId);
            }
        });

        holder.imageViewPlaymusic.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onMidiPlayClick(holder);
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
        TextView genre;
        TextView year;

        public MusicViewHolder(View itemView) {
            super(itemView);

            thumbNail = (ImageView) itemView.findViewById(R.id.thumbnail);
            title = (TextView) itemView.findViewById(R.id.title);
            ratingbar = (RatingBar) itemView.findViewById(R.id.ratingbar);
            rating = (TextView) itemView.findViewById(R.id.rating);
            genre = (TextView) itemView.findViewById(R.id.genre);
            year = (TextView) itemView.findViewById(R.id.releaseYear);
            imageViewAddMovie = (ImageView) itemView.findViewById(R.id.btnAddMovie);
            imageViewPlaymusic = (ImageView) itemView.findViewById(R.id.btnPlayMidi);
            imageViewStopmusic = (ImageView) itemView.findViewById(R.id.btnStopMidi);
        }
    }

    protected void onMidiPlayClick(MusicViewHolder holder)
    {
        mediaPlayer = MediaPlayer.create(mContext, R.raw.aria);
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

    /**
     *
     * Once the AsyncTask is complete {@see onPostExecute}, we remove the drawable/image on the list
     * and add the another image mapping it to the position of the object.
     *
     *
     * We Use a Switch case to get the Drawable ID which will determine what action to perform.
     *
     * R.drawable.music_add_touch: Add the selected movie to the DB
     * R.drawable.music_added_touch: Remove the ShopData from the DB
     * R.drawable.music_error_touch: An error occurred performing your request. Retry.
     *
     *
     * @param position         clicked object position
     * @param followerList     Object List
     * @param actionDrawableId Drawable Id
     */
    protected void onMemberClick(final int position, final List<ShopData> followerList,int actionDrawableId) {
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
    }
}
