package kilomat.keylit.activity;

/**
 * Created by BAHA on 06/10/2016.
 */

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.NavigationView;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.ParseError;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.HttpHeaderParser;
import com.android.volley.toolbox.Volley;
import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import kilomat.keylit.CircleTransform;
import kilomat.keylit.R;
import kilomat.keylit.controller.SessionManager;
import kilomat.keylit.fragments.AchievFragment;
import kilomat.keylit.fragments.HomeFragment;
import kilomat.keylit.fragments.LogoutFragment;
import kilomat.keylit.fragments.PlaylistFragment;
import kilomat.keylit.fragments.ProfileFragment;
import kilomat.keylit.fragments.ScanFragment;
import kilomat.keylit.fragments.ShopFragment;
import kilomat.keylit.fragments.SongsFragment;
import kilomat.keylit.fragments.SyncFragment;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MaintActivity";
    // tags used to attach the fragments
    private static final String TAG_HOME = "home";
    private static final String TAG_PROFILE = "profile";
    private static final String TAG_SCAN = "scan";
    private static final String TAG_PLAYLIST = "playlist";
    private static final String TAG_SONGS = "songs";
    private static final String TAG_SHOP = "shop";
    private static final String TAG_ACHIEV = "achievements";
    private static final String TAG_SETTINGS = "settings";
    private static final String TAG_LOGOUT = "logout";
    private static final String TAG_ABOUT_US = "about";
    private static final String TAG_PRIVACY_POLICY = "privacy";
<<<<<<< HEAD

=======
    private static final String TAG_SYNC = "sync";
>>>>>>> origin/master
    // index to identify current nav menu item
    public static int navItemIndex = 0;
    public static String CURRENT_TAG = TAG_HOME;
    private NavigationView navigationView;
    private DrawerLayout drawer;
    private ImageView imgProfile;
    private TextView txtName, txtWebsite;
    private Toolbar toolbar;
    private FloatingActionButton fab;
    // toolbar titles respected to selected nav menu item
    private String[] activityTitles;

    // flag to load home fragment when user presses back key
    private boolean shouldLoadHomeFragOnBackPress = true;
    private Handler mHandler;
    SessionManager manager;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        manager = new SessionManager();
        mHandler = new Handler();

        drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        navigationView = (NavigationView) findViewById(R.id.nav_view);
        fab = (FloatingActionButton) findViewById(R.id.fab);

        // Navigation view header
        View navHeader = navigationView.getHeaderView(0);
        txtName = (TextView) navHeader.findViewById(R.id.name);
        txtWebsite = (TextView) navHeader.findViewById(R.id.website);
        imgProfile = (ImageView) navHeader.findViewById(R.id.img_profile);

        // load toolbar titles from string resources
        activityTitles = getResources().getStringArray(R.array.nav_item_activity_titles);

        // load nav menu header data
        loadNavHeader();

        // initializing navigation menu
        setUpNavigationView();

        if (savedInstanceState == null) {
            navItemIndex = 0;
            CURRENT_TAG = TAG_HOME;
            loadHomeFragment();
        }
    }

    private void loadNavHeader() {
        // name, website
        txtName.setText("Profile Name");
        txtWebsite.setText("Email@email.com");

        // Creating volley request obj
        String mytoken = manager.getPreferences(this, "TokenKey");
        String idUser = manager.getPreferences(this, "IdUser");

        final HashMap<String, String> params = new HashMap<String, String>();
        params.put("idUser", mytoken);

        final JSONObject jsonObject = new JSONObject(params);
        String URL_PROFILE = getString(R.string.api_url_users) + idUser;

        Volley.newRequestQueue(this).add(
                new CustomJsonRequest(Request.Method.GET, URL_PROFILE, null,
                        new Response.Listener<JSONObject>() {
                            @Override
                            public void onResponse(JSONObject response) {
                                {
                                    try {
                                        String url = getString(R.string.api_url) + response.getString("picture");
                                        Glide.with(getApplicationContext()).load(url)
                                                .crossFade()
                                                .thumbnail(0.5f)
                                                .bitmapTransform(new CircleTransform(getApplicationContext()))
                                                .diskCacheStrategy(DiskCacheStrategy.ALL)
                                                .into(imgProfile);

                                        txtName.setText(response.getString("name"));
                                        txtWebsite.setText(response.getString("email"));

                                    } catch (JSONException jsonException) {
                                        Log.e(TAG, "@MainActivity JsonException Error: " + jsonException.getMessage());
                                    }
                                }
                            }
                        }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        VolleyLog.d("MainActivity Error: " + error.getMessage());
                    }
                }) {


                    @Override
                    protected Response<JSONObject> parseNetworkResponse(
                            NetworkResponse response) {
                        try {
                            String jsonString = new String(response.data,
                                    HttpHeaderParser
                                            .parseCharset(response.headers));
                            return Response.success(new JSONObject(jsonString),
                                    HttpHeaderParser
                                            .parseCacheHeaders(response));
                        } catch (UnsupportedEncodingException e) {
                            return Response.error(new ParseError(e));
                        } catch (JSONException je) {
                            return Response.error(new ParseError(je));
                        }
                    }
                });
    }

    /***
     * Returns respected fragment that user
     * selected from navigation menu
     */
    private void loadHomeFragment() {
        // selecting appropriate nav menu item
        selectNavMenu();

        // set toolbar title
        setToolbarTitle();

        // if user select the current navigation menu again, don't do anything
        // just close the navigation drawer
        if (getSupportFragmentManager().findFragmentByTag(CURRENT_TAG) != null) {
            drawer.closeDrawers();

            // show or hide the fab button
            toggleFab();
            return;
        }

        Runnable mPendingRunnable = new Runnable() {
            @Override
            public void run() {
                // update the main content by replacing fragments
                Fragment fragment = getHomeFragment();
                FragmentTransaction fragmentTransaction = getSupportFragmentManager().beginTransaction();
                fragmentTransaction.setCustomAnimations(android.R.anim.fade_in,
                        android.R.anim.fade_out);
                fragmentTransaction.replace(R.id.frame, fragment, CURRENT_TAG);
                fragmentTransaction.commitAllowingStateLoss();
            }
        };

        // If mPendingRunnable is not null, then add to the message queue
        if (mPendingRunnable != null) {
            mHandler.post(mPendingRunnable);
        }

        // show or hide the fab button
        toggleFab();

        //Closing drawer on item click
        drawer.closeDrawers();

        // refresh toolbar menu
        invalidateOptionsMenu();
    }

    private Fragment getHomeFragment() {
        switch (navItemIndex) {
            case 0:
                // home
                HomeFragment homeFragment = new HomeFragment();
                return homeFragment;
            case 1:
                // profile
                ProfileFragment profileFragment = new ProfileFragment();
                return profileFragment;
            case 2:
                // Scan fragment
                ScanFragment scanFragment = new ScanFragment();
                return scanFragment;
            case 3:
                // playlist fragment
                PlaylistFragment playlistFragment = new PlaylistFragment();
                return playlistFragment;
            case 4:
                // songs fragment
                SongsFragment songsFragment = new SongsFragment();
                return songsFragment;
            case 5:
                // shop fragment
                ShopFragment shopFragment = new ShopFragment();
                return shopFragment;
            case 6:
                // achiev fragment
                AchievFragment achievFragment = new AchievFragment();
                return achievFragment;
            case 7:
<<<<<<< HEAD
=======
                // Sync fragment
                return new SyncFragment();
            case 9:
>>>>>>> origin/master
                LogoutFragment logoutFragment = new LogoutFragment();
                return logoutFragment;
            default:
                return new HomeFragment();
        }
    }

    private void setToolbarTitle() {
        getSupportActionBar().setTitle(activityTitles[navItemIndex]);
    }

    private void selectNavMenu() {
        navigationView.getMenu().getItem(navItemIndex).setChecked(true);
    }

    private void setUpNavigationView() {
        //Setting Navigation View Item Selected Listener to handle the item click of the navigation menu
        navigationView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {

            // This method will trigger on item Click of navigation menu
            @Override
            public boolean onNavigationItemSelected(MenuItem menuItem) {

                //Check to see which item was being clicked and perform appropriate action
                switch (menuItem.getItemId()) {
                    //Replacing the main content with ContentFragment Which is our Inbox View;
                    case R.id.nav_home:
                        navItemIndex = 0;
                        CURRENT_TAG = TAG_HOME;
                        break;
                    case R.id.nav_profile:
                        navItemIndex = 1;
                        CURRENT_TAG = TAG_PROFILE;
                        break;
                    case R.id.nav_scan:
                        navItemIndex = 2;
                        CURRENT_TAG = TAG_SCAN;
                        break;
                    case R.id.nav_playlist:
                        navItemIndex = 3;
                        CURRENT_TAG = TAG_PLAYLIST;
                        break;
                    case R.id.nav_songs:
                        navItemIndex = 4;
                        CURRENT_TAG = TAG_SONGS;
                        break;
                    case R.id.nav_shop:
                        navItemIndex = 5;
                        CURRENT_TAG = TAG_SHOP;
                        break;
                    case R.id.nav_achiev:
                        navItemIndex = 6;
                        CURRENT_TAG = TAG_ACHIEV;
                        break;
                    case R.id.nav_logout:
                        navItemIndex = 7;
                        CURRENT_TAG = TAG_LOGOUT;
                        break;
                    case R.id.nav_sync:
<<<<<<< HEAD
                        startActivity(new Intent(MainActivity.this, SynActivity.class));
                        drawer.closeDrawers();
                        return true;
=======
                        navItemIndex = 7;
                        CURRENT_TAG = TAG_SYNC;
                        break;
                        //startActivity(new Intent(MainActivity.this, SynActivity.class));
                        //drawer.closeDrawers();
                        //return true;
                    case R.id.nav_logout:
                        navItemIndex = 9;
                        CURRENT_TAG = TAG_LOGOUT;
                        break;
>>>>>>> origin/master
                    case R.id.nav_about_us:
                        // launch new intent instead of loading fragment
                        startActivity(new Intent(MainActivity.this, AboutUsActivity.class));
                        drawer.closeDrawers();
                        return true;
                    case R.id.nav_privacy_policy:
                        // launch new intent instead of loading fragment
                        startActivity(new Intent(MainActivity.this, PrivacyPoliceActivity.class));
                        drawer.closeDrawers();
                        return true;
                    default:
                        navItemIndex = 0;
                }

                //Checking if the item is in checked state or not, if not make it in checked state
                if (menuItem.isChecked()) {
                    menuItem.setChecked(false);
                } else {
                    menuItem.setChecked(true);
                }
                menuItem.setChecked(true);

                loadHomeFragment();

                return true;
            }
        });


        ActionBarDrawerToggle actionBarDrawerToggle = new ActionBarDrawerToggle(this, drawer, toolbar, R.string.openDrawer, R.string.closeDrawer) {

            @Override
            public void onDrawerClosed(View drawerView) {
                // Code here will be triggered once the drawer closes as we dont want anything to happen so we leave this blank
                super.onDrawerClosed(drawerView);
            }

            @Override
            public void onDrawerOpened(View drawerView) {
                // Code here will be triggered once the drawer open as we dont want anything to happen so we leave this blank
                super.onDrawerOpened(drawerView);
            }
        };

        //Setting the actionbarToggle to drawer layout
        drawer.setDrawerListener(actionBarDrawerToggle);

        //calling sync state is necessary or else your hamburger icon wont show up
        actionBarDrawerToggle.syncState();
    }

    @Override
    public void onBackPressed() {
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawers();
            return;
        }

        // This code loads home fragment when back key is pressed
        // when user is in other fragment than home
        if (shouldLoadHomeFragOnBackPress) {
            // checking if user is on other navigation menu
            // rather than home
            if (navItemIndex != 0) {
                if (navItemIndex == 3) {
                    navItemIndex = 3;
                    CURRENT_TAG = TAG_PLAYLIST;
                }
                else {
                    navItemIndex = 0;
                    CURRENT_TAG = TAG_HOME;
                }
                loadHomeFragment();
                return;
            }
        }

        super.onBackPressed();
    }


    // show or hide the fab
    private void toggleFab() {
            fab.hide();
    }

    public class CustomJsonRequest extends Request {

        Map<String, String> params;
        private Response.Listener listener;

        public CustomJsonRequest(int requestMethod, String url, Map<String, String> params,
                                 Response.Listener responseListener, Response.ErrorListener errorListener) {

            super(requestMethod, url, errorListener);


            params = new HashMap<String, String>();
            String mytoken = manager.getPreferences(getApplicationContext(), "TokenKey");
            params.put("idUser", mytoken);
            this.params = params;
            this.listener = responseListener;
        }

        @Override
        protected void deliverResponse(Object response) {
            listener.onResponse(response);

        }

        @Override
        public Map<String, String> getParams() throws AuthFailureError {

            return params;
        }

        @Override
        protected Response parseNetworkResponse(NetworkResponse response) {
            try {
                String jsonString = new String(response.data, HttpHeaderParser.parseCharset(response.headers));
                return Response.success(new JSONObject(jsonString), HttpHeaderParser.parseCacheHeaders(response));
            } catch (UnsupportedEncodingException e) {
                return Response.error(new ParseError(e));
            } catch (JSONException je) {
                return Response.error(new ParseError(je));
            }
        }
    }

}
