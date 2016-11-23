package kilomat.keylit.model;

/**
 * Created by BAHA on 04/04/2016.
 */

public class PlaylistData {

    private String name, date, nbsongs, id;

    public PlaylistData() {
    }

    public PlaylistData(String name, String date, String nbsongs, String id) {
        this.name = name;
        this.date = date;
        this.id = id;
        this.nbsongs = nbsongs;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getNbsongs() {
        return nbsongs;
    }

    public void setNbsongs(String nbsongs) {
        this.nbsongs = nbsongs;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

}
