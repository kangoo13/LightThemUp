package kilomat.keylit;

import android.content.Context;
import android.media.MediaPlayer;
import android.os.AsyncTask;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;

import java.util.LinkedList;
import java.util.List;

public class ListAdapterAchiev extends RecyclerView.Adapter<ListAdapterAchiev.AchievDataViewHolder> {

    private List<AchievData> mAchievDataList;
    protected LinkedList<Integer> drawableLinkedList;
    private Context mContext;

    /**
     * Default Constructor
     *
     * @param context      Application context
     * @param followerList Follower List objects
     * @param drawableLinkedList      Drawable item .
     */
    public ListAdapterAchiev(Context context, List<AchievData> followerList, LinkedList<Integer> drawableLinkedList) {
        this.mContext = context;
        this.mAchievDataList = followerList;
        this.drawableLinkedList = drawableLinkedList;
    }

    @Override
    public void onBindViewHolder(final AchievDataViewHolder holder, final int position) {

        AchievData data = mAchievDataList.get(position);
        final int actionDrawableId = this.drawableLinkedList.get(position);
        holder.title.setText(data.getTitle());
        holder.details.setText(data.getDetails());
        holder.current_score.setText(String.valueOf(data.getCurrent_score()));
        holder.progress.setProgress((int) data.getProgress());
        //holder.state_success.setText(data.getState_success());
        //Use Glide to load the Image
        Glide.with(mContext).load(data.getThumbnailUrl()).centerCrop().into(holder.thumbNail);


        /**
         * Set OnClickListener on the Button.
         * We pass in 3 parameters:
         * @param position :Position of the object on the List
         * @param mAchievDataList Music Object
         * @param actionDrawableId Drawable ID
         */
    }

    @Override
    public int getItemCount() {
        return mAchievDataList.size();
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public AchievDataViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View itemView = LayoutInflater.
                from(viewGroup.getContext()).
                inflate(R.layout.achiev_item_layout, viewGroup, false);

        return new AchievDataViewHolder(itemView);
    }

    public static class AchievDataViewHolder extends RecyclerView.ViewHolder {
        ImageView thumbNail;
        TextView title;
        ProgressBar progress;
        TextView details;
        TextView current_score;
        TextView state_success;

        public AchievDataViewHolder(View itemView) {
            super(itemView);

            thumbNail = (ImageView) itemView.findViewById(R.id.thumbnail);
            title = (TextView) itemView.findViewById(R.id.title);
            details = (TextView) itemView.findViewById(R.id.details);
            progress = (ProgressBar) itemView.findViewById(R.id.progress);
            current_score = (TextView) itemView.findViewById(R.id.current_score);
        }
    }

}
