package kilomat.keylit;

import java.util.ArrayList;

/**
 * Created by BAHA on 04/04/2016.
 */

public class ShopData {

    private int year, download;
    private double rating;
    private String title, thumbnailUrl, artist;
    private ArrayList<String> genre;

    /**
     * Default Constructor
     */
    public ShopData() {
    }

    /**
     * Constructor with parameters
     *
     * @param name         ShopData Title
     * @param thumbnailUrl Thumbnail URL
     * @param year         Year Released
     * @param rating       ShopData Rating
     * @param genre        ShopData genre(s)
     */
    public ShopData(String name, String thumbnailUrl, int year, double rating,
                    ArrayList<String> genre, String artist, int download) {
        this.title = name;
        this.thumbnailUrl = thumbnailUrl;
        this.year = year;
        this.rating = rating;
        this.genre = genre;
        this.artist = artist;
        this.download = download;
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

    public int getDownload()
    {
        return download;
    }

    public void setDownload(int nbDownload)
    {
        this.download = nbDownload;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public ArrayList<String> getGenre() {
        return genre;
    }

    public void setGenre(ArrayList<String> genre) {
        this.genre = genre;
    }
}
