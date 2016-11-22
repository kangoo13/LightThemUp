package kilomat.keylit.fragments;

import android.app.AlertDialog;
import android.support.v4.app.Fragment;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.v4.app.FragmentManager;

import kilomat.keylit.R;
import kilomat.keylit.controller.SessionManager;

/**
 * Created by BAHA on 25/10/2016.
 */
public class LogoutFragment extends Fragment{

    SessionManager manager;

    public LogoutFragment() {

    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        logout();
    }

    public void logout() {
        final CharSequence[] options = {getString(R.string.action_yes), getString(R.string.action_cancel)};

        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        builder.setTitle(getString(R.string.action_logout));
        builder.setItems(options, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int item) {
                if (options[item].equals(getString(R.string.action_yes))) {
                    manager = new SessionManager();

                    manager.setPreferences(getActivity(), "status", "0");

                    getActivity().finish();
                } else if (options[item].equals(getString(R.string.action_cancel))) {
                    dialog.dismiss();
                    FragmentManager fm = getActivity().getSupportFragmentManager();
                    HomeFragment yfObj = new HomeFragment();
                    fm.beginTransaction().replace(R.id.frame, yfObj).commit();
                }
            }
        });
        builder.show();
    }
}
