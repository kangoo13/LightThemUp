package kilomat.keylit;

import java.util.ArrayList;

/**
 * Created by BAHA on 04/04/2016.
 */

public class AchievData {

    private double current_score, progress;
    private String title, thumbnailUrl, details, state_success;

    /**
     * Default Constructor
     */

    public AchievData() {
    }

    /**
     * Constructor with parameters
     *
     * @param name         Music Title
     * @param thumbnailUrl Thumbnail URL
     */
    public AchievData(String name, String thumbnailUrl, String mdetails,
                      String mstate_success,  double current_score, double progress) {
        this.title = name;
        this.thumbnailUrl = thumbnailUrl;
        this.details = mdetails;
        this.state_success = mstate_success;
        this.current_score = current_score;
        this.progress = progress;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String name) {
        this.title = name;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String mdetails) {
        this.details = mdetails;
    }

    public String getState_success() {
        return state_success;
    }

    public void setState_success(String mstate_success) {
        this.state_success = mstate_success;
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    public double getProgress() {
        return progress;
    }

    public void setProgress(double mprogress) {
        this.progress = mprogress;
    }

    public double getCurrent_score() {
        return current_score;
    }

    public void setCurrent_score(double mcurrent_score) {
        this.current_score = mcurrent_score;
    }


}
