package kilomat.keylit.model;

/**
 * Created by BAHA on 04/04/2016.
 */

public class ShopData {

    private int year, download;
    private double rating;
    private String title, thumbnailUrl, artist;
    private String genre, idSong;

    public ShopData() {
    }

    public ShopData(String name, String thumbnailUrl, int year, double rating,
                    String genre, String artist, int download, String idSong) {
        this.title = name;
        this.thumbnailUrl = thumbnailUrl;
        this.year = year;
        this.rating = rating;
        this.genre = genre;
        this.artist = artist;
        this.download = download;
        this.idSong = idSong;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String name) {
        this.title = name;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artistName) {
        this.artist = artistName;
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getDownload() {
        return download;
    }

    public void setDownload(int nbDownload) {
        this.download = nbDownload;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getIdSong() {
        return idSong;
    }

    public void setIdSong(String idSong) {
        this.idSong = idSong;
    }
}
