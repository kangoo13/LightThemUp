package kilomat.keylit.controller;

import android.content.Context;
import android.graphics.Color;
import android.support.design.widget.Snackbar;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import kilomat.keylit.R;

/**
 * Created by BAHA on 17/10/2016.
 */
public class ToastMessage {

    public void message_error(Context context, String message) {
        Toast toast = Toast.makeText(context, message, Toast.LENGTH_LONG);
        View toastView = toast.getView();
        toastView.setBackgroundResource(R.drawable.toast_custom_error);
        toast.show();
    }

    public void message_success(Context context, String message) {
        Toast toast = Toast.makeText(context, message, Toast.LENGTH_LONG);
        View toastView = toast.getView();
        toastView.setBackgroundResource(R.drawable.toast_custom_success);
        toast.show();
    }

    public static void bar_message_warning(View v, String message) {
        Snackbar snackbar = Snackbar
                .make(v, message, Snackbar.LENGTH_LONG);
        View sbView = snackbar.getView();
        TextView textView = (TextView) sbView.findViewById(android.support.design.R.id.snackbar_text);
        textView.setTextColor(Color.YELLOW);
        textView.setTextSize(20);
        snackbar.show();
    }

    public static void bar_message_success(View v, String message, String status) {
        Snackbar snackbar = Snackbar
                .make(v, message, Snackbar.LENGTH_LONG)
                .setAction(status, new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                    }
                });

        snackbar.setActionTextColor(Color.GREEN);
        View sbView = snackbar.getView();
        TextView textView = (TextView) sbView.findViewById(android.support.design.R.id.snackbar_text);
        textView.setTextColor(Color.WHITE);
        textView.setTextSize(20);
        snackbar.show();
    }

    public static void bar_message_fail(View v, String message, String status) {
        Snackbar snackbar = Snackbar
                .make(v, message, Snackbar.LENGTH_LONG)
                .setAction(status, new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                    }
                });

        snackbar.setActionTextColor(Color.RED);
        View sbView = snackbar.getView();
        TextView textView = (TextView) sbView.findViewById(android.support.design.R.id.snackbar_text);
        textView.setTextColor(Color.WHITE);
        textView.setTextSize(20);
        snackbar.show();
    }
}
