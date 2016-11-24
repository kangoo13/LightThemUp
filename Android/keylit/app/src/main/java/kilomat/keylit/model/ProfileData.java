package kilomat.keylit.model;

/**
 * Created by BAHA on 04/04/2016.
 */

public class ProfileData {

    private String xprofileUserView, xprofileUserName, xprofileDateModified, xprofileEmail;
    private String xprofileDescription, xprofileAddress, xprofileCity, xprofileCountry;

    public ProfileData() {
    }

    public ProfileData(String profileUserView, String profileUserName, String profileDateModified,
                       String profileEmail, String profileDescription,
                       String profileAddress, String profileCity, String profileCountry) {
        this.xprofileUserView = profileUserView;
        this.xprofileUserName = profileUserName;
        this.xprofileDateModified = profileDateModified;
        this.xprofileEmail = profileEmail;
        this.xprofileDescription = profileDescription;
        this.xprofileAddress = profileAddress;
        this.xprofileCity = profileCity;
        this.xprofileCountry = profileCountry;
    }

    public String getProfileUserView() {
        return xprofileUserView;
    }

    public void setProfileUserView(String profileUserView) {
        this.xprofileUserView = profileUserView;
    }

    public String getProfileUserName() {
        return xprofileUserName;
    }

    public void setProfileUserName(String profileUserName) {
        this.xprofileUserName = profileUserName;
    }

    public String getProfileDateModified() {
        return xprofileDateModified;
    }

    public void setProfileDateModified(String profileDateModified) {
        this.xprofileDateModified = profileDateModified;
    }

    public String getProfileEmail() {
        return xprofileEmail;
    }

    public void setProfileEmail(String profileEmail) {
        this.xprofileEmail = profileEmail;
    }

    public String getProfileCountry() {
        return xprofileCountry;
    }

    public void setProfileCountry(String profileCountry) {
        this.xprofileCountry = profileCountry;
    }

    public String getProfileDescription() {
        return xprofileDescription;
    }

    public void setProfileDescription(String profileDescription) {
        this.xprofileDescription = profileDescription;
    }

    public String getProfileAddress() {
        return xprofileAddress;
    }

    public void setProfileAddress(String profileAddress) {
        this.xprofileAddress = profileAddress;
    }

    public String getProfileCity() {
        return xprofileCity;
    }

    public void setProfileCity(String name) {
        this.xprofileCity = name;
    }


}
