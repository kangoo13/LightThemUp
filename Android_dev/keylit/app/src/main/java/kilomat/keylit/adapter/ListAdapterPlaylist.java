package kilomat.keylit.adapter;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.LinkedList;
import java.util.List;

import kilomat.keylit.R;
import kilomat.keylit.model.PlaylistData;

public class ListAdapterPlaylist extends RecyclerView.Adapter<ListAdapterPlaylist.MusicViewHolder> {

    protected LinkedList<Integer> drawableLinkedList;
    private List<PlaylistData> mMovieList;

    public ListAdapterPlaylist(List<PlaylistData> followerList, LinkedList<Integer> drawableLinkedList) {
        this.mMovieList = followerList;
        this.drawableLinkedList = drawableLinkedList;
    }

    @Override
    public void onBindViewHolder(final MusicViewHolder holder, final int position) {

        PlaylistData playlist = mMovieList.get(position);

        holder.name.setText(playlist.getName());
        holder.date.setText(playlist.getDate());
        holder.nb.setText(playlist.getNbsongs());
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
                inflate(R.layout.item_layout_playlist, viewGroup, false);

        return new MusicViewHolder(itemView);
    }


    public static class MusicViewHolder extends RecyclerView.ViewHolder {
        TextView name;
        TextView date;
        TextView nb;

        public MusicViewHolder(View itemView) {
            super(itemView);

            name = (TextView) itemView.findViewById(R.id.name);
            date = (TextView) itemView.findViewById(R.id.date);
            nb = (TextView) itemView.findViewById(R.id.nbsongs);
        }
    }

}
