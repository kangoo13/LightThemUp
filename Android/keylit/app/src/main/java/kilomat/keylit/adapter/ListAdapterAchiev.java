package kilomat.keylit.adapter;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.bumptech.glide.Glide;

import java.util.LinkedList;
import java.util.List;

import kilomat.keylit.R;
import kilomat.keylit.model.AchievData;

public class ListAdapterAchiev extends RecyclerView.Adapter<ListAdapterAchiev.AchievDataViewHolder> {

    protected LinkedList<Integer> drawableLinkedList;
    private List<AchievData> mAchievDataList;
    private Context mContext;

    public ListAdapterAchiev(Context context, List<AchievData> followerList, LinkedList<Integer> drawableLinkedList) {
        this.mContext = context;
        this.mAchievDataList = followerList;
        this.drawableLinkedList = drawableLinkedList;
    }

    @Override
    public void onBindViewHolder(final AchievDataViewHolder holder, final int position) {

        AchievData data = mAchievDataList.get(position);

        holder.title.setText(data.getTitle());
        holder.details.setText(data.getDetails());
        holder.current_score.setText(String.valueOf(data.getCurrent_score()));
        holder.progress.setProgress((int) data.getProgress());
        holder.current_progress.setText((int) data.getProgress() + "/100");
        Glide.with(mContext).load("http://lightthemup.fr.nf/" + data.getThumbnailUrl()).centerCrop().into(holder.thumbNail);
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
                inflate(R.layout.item_layout_achiev, viewGroup, false);

        return new AchievDataViewHolder(itemView);
    }

    public static class AchievDataViewHolder extends RecyclerView.ViewHolder {
        ImageView thumbNail;
        TextView title;
        ProgressBar progress;
        TextView details;
        TextView current_score;
        TextView current_progress;

        public AchievDataViewHolder(View itemView) {
            super(itemView);

            thumbNail = (ImageView) itemView.findViewById(R.id.thumbnail);
            title = (TextView) itemView.findViewById(R.id.title);
            details = (TextView) itemView.findViewById(R.id.details);
            progress = (ProgressBar) itemView.findViewById(R.id.progress);
            current_score = (TextView) itemView.findViewById(R.id.current_score);
            current_progress = (TextView) itemView.findViewById(R.id.progress_text);
        }
    }

}
