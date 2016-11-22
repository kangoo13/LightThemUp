package kilomat.keylit.activity;

/**
 * Created by BAHA on 16/10/2016.
 */

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;

import kilomat.keylit.R;
import kilomat.keylit.controller.SessionManager;

public class SplashActivity extends AppCompatActivity {
    SessionManager manager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        manager = new SessionManager();

        final String status = manager.getPreferences(SplashActivity.this, "status");

        /****** Create Thread that will sleep for 3 seconds *************/

        Thread background = new Thread() {
            public void run() {

                try {
                    // Thread will sleep for 3 seconds
                    sleep(3 * 1000);

                    Log.d("status", status);
                    if (status.equals("1")) {
                        Intent i = new Intent(SplashActivity.this, MainActivity.class);
                        startActivity(i);
                    } else {
                        Intent i = new Intent(SplashActivity.this, LoginActivity.class);
                        startActivity(i);
                    }

                    //Remove activity
                    finish();

                } catch (Exception e) {
                    System.out.println("Erro Splash : ["+e+']');

                }
            }
        };

        // start thread
        background.start();
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_HOME);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        startActivity(intent);
        finish();
        System.exit(0);
    }
}