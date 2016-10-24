package kilomat.keylit.controller;

import android.content.Context;
import android.view.View;
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

}
