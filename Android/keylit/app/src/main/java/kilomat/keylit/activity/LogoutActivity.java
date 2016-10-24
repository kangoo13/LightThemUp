package kilomat.keylit.activity;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import kilomat.keylit.controller.SessionManager;

/**
 * Created by BAHA on 25/10/2016.
 */
public class LogoutActivity extends AppCompatActivity {
    SessionManager manager;


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        logout();
    }

    public void logout() {
        final CharSequence[] options = {"Yes", "Cancel"};

        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Logout");
        builder.setItems(options, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int item) {
                if (options[item].equals("Yes")) {
                    manager = new SessionManager();

                    manager.setPreferences(getApplicationContext(), "status", "0");

                    finish();
                } else if (options[item].equals("Cancel")) {
                    dialog.dismiss();
                }
            }
        });
        builder.show();
    }
}
