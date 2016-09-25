package kilomat.keylit.activity;

/**
 * Created by BAHA on 20/03/2016.
 */

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.CompoundButton.OnCheckedChangeListener;
import android.widget.Switch;

import java.io.IOException;

import butterknife.InjectView;
import kilomat.keylit.R;


public class HomeActivity extends ActionBarActivity {

    @InjectView(R.id.btn_achiev) Button _achievButton;
    @InjectView(R.id.btn_playlist) Button _playlistButton;
    @InjectView(R.id.btn_scan) Button _scanButton;
    @InjectView(R.id.btn_shop) Button _shopButton;
    @InjectView(R.id.btn_logout) Button _logoutButton;
    @InjectView(R.id.switch_sync) Switch _syncSwitch;


    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        _achievButton = (Button) findViewById(R.id.btn_achiev);
        _playlistButton = (Button) findViewById(R.id.btn_playlist);
        _scanButton = (Button) findViewById(R.id.btn_scan);
        _shopButton = (Button) findViewById(R.id.btn_shop);
        _logoutButton = (Button) findViewById(R.id.btn_logout);
        _syncSwitch = (Switch) findViewById(R.id.switch_sync);

        _achievButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    achiev();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });

        _playlistButton.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                try {
                    playlist();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });

        _scanButton.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                try {
                    scan();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });

        _shopButton.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                try {
                    shop();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });

        _logoutButton.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                logout();
            }
        });

        //set the switch to ON
        _syncSwitch.setChecked(false);
        //attach a listener to check for changes in state
        _syncSwitch.setOnCheckedChangeListener(new OnCheckedChangeListener() {

            @Override
            public void onCheckedChanged(CompoundButton buttonView,
                                         boolean isChecked) {

                if (isChecked) {
                    Intent intent = new Intent(getApplicationContext(), SynActivity.class);
                    startActivity(intent);
                }

            }
        });

    }

    public void achiev() throws IOException
    {
        Intent intent = new Intent(getApplicationContext(), AchievActivity.class);
        startActivity(intent);
    }

    public void logout()
    {
        final CharSequence[] options = { "Yes","Cancel" };

        AlertDialog.Builder builder = new AlertDialog.Builder(HomeActivity.this);
        builder.setTitle("Logout");
        builder.setItems(options, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int item) {
                if (options[item].equals("Yes")) {
                    finish();
                } else if (options[item].equals("Cancel")) {
                    dialog.dismiss();
                }
            }
        });
        builder.show();
    }

    public void playlist() throws IOException
    {
        Intent intent = new Intent(getApplicationContext(), PlaylistActivity.class);
        startActivity(intent);
    }

    public void scan() throws IOException
    {
        Intent intent = new Intent(getApplicationContext(), ScanActivity.class);
        startActivity(intent);
    }

    public void shop() throws IOException
    {
        Intent intent = new Intent(getApplicationContext(),ShopActivity.class);
        startActivity(intent);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        // if (id == R.id.action_settings) {
        //    return true;
        // }

        return super.onOptionsItemSelected(item);
    }
}