package kilomat.keylit.fragments;

import android.app.AlertDialog;
import android.content.Intent;
import android.graphics.Color;
import android.support.v4.app.Fragment;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ListView;

import kilomat.keylit.R;
import kilomat.keylit.activity.LoginActivity;
import kilomat.keylit.activity.MainActivity;
import kilomat.keylit.controller.AppController;
import kilomat.keylit.controller.BluetoothController;
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
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View layout = inflater.inflate(R.layout.activity_logout, container, false);

        Button refreshButt = (Button) layout.findViewById(R.id.btn_logout);
        refreshButt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                manager = new SessionManager();

                manager.setPreferences(getActivity(), "status", "0");

                Intent intent = new Intent(getActivity(), LoginActivity.class);
                startActivity(intent);
                getActivity().finish();
            }
        });
        return layout;
    }
}
