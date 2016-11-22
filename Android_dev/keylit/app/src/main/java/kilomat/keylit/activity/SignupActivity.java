package kilomat.keylit.activity;

/**
 * Created by BAHA on 20/03/2016.
 */

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import butterknife.ButterKnife;
import butterknife.InjectView;
import kilomat.keylit.R;
import kilomat.keylit.controller.ToastMessage;

public class SignupActivity extends AppCompatActivity {

    private static final String TAG = "SignupActivity";
    public String Xresponse;

    @InjectView(R.id.input_name)
    EditText _nameText;
    @InjectView(R.id.input_email)
    EditText _emailText;
    @InjectView(R.id.input_password)
    EditText _passwordText;
    @InjectView(R.id.btn_signup)
    Button _signupButton;
    @InjectView(R.id.link_login)
    TextView _loginLink;
    @InjectView(R.id.input_confirmpassword)
    EditText _confirmpasswordText;

    private AsyncTask<String, String, String> asyncTask;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);
        ButterKnife.inject(this);

        _signupButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    signup(v);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });

        _loginLink.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                finish();
            }
        });
    }

    public void signup(final View v) throws IOException {
        Log.d(TAG, "Signup");

        if (!checkFormBeforeValidation()) {
            onSignupFailed(v);
            return;
        }

        _signupButton.setEnabled(false);

        final ProgressDialog progressDialog = new ProgressDialog(SignupActivity.this,
                R.style.AppTheme_Dark_Dialog);
        progressDialog.setIndeterminate(true);
        progressDialog.setMessage(getString(R.string.signup_activity_creating_account));
        progressDialog.show();

        final String name = _nameText.getText().toString();
        final String email = _emailText.getText().toString();
        final String password = _passwordText.getText().toString();

        // TODO: Implement your own signup logic here.

        // Validation Completed
        String address = getString(R.string.api_url_users);

        HttpClient client = new DefaultHttpClient();
        HttpPost post = new HttpPost(address);
        List<NameValuePair> pairs = new ArrayList<NameValuePair>();
        pairs.add(new BasicNameValuePair("name", name));
        pairs.add(new BasicNameValuePair("email", email));
        pairs.add(new BasicNameValuePair("password", password));

        try {
            post.setEntity(new UrlEncodedFormEntity(pairs));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        boolean loginStatus = false;
        HttpResponse response = client.execute(post);
        if (response.getStatusLine().getStatusCode() == 200) {
            HttpEntity entity = response.getEntity();
            String resp = EntityUtils.toString(entity);
            try {
                JSONObject jsonObj = new JSONObject(resp);
                String successStatus = jsonObj.getString("success");
                Xresponse = jsonObj.getString("message");
                if (successStatus.equals("true"))
                    loginStatus = true;
                else
                    loginStatus = false;
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        final boolean finalLoginStatus = loginStatus;
        new android.os.Handler().postDelayed(
                new Runnable() {
                    public void run() {

                        if (finalLoginStatus)
                            onSignupSuccess(v);
                        else
                            onSignupFailed(v);
                        progressDialog.dismiss();
                    }
                }, 3000);
    }


    public void onSignupSuccess(View v) {
        _signupButton.setEnabled(true);
        setResult(RESULT_OK, null);

        ToastMessage.bar_message_success(v, getString(R.string.signup_activity_create),
                getString(R.string.toast_message_success));

        Intent mainActivity = new Intent(this, LoginActivity.class);
        mainActivity.putExtra("activity", "SignUp");
        startActivity(mainActivity);
        finish();
    }

    public void onSignupFailed(View v) {
        ToastMessage.bar_message_fail(v, getString(R.string.signup_activity_create),
                getString(R.string.toast_message_fail));
        _signupButton.setEnabled(true);
    }

    public boolean checkPassWordAndConfirmPassword(String password, String confirmPassword) {
        boolean pstatus = false;
        if (confirmPassword != null && password != null) {
            if (password.equals(confirmPassword)) {
                pstatus = true;
            }
        }
        return pstatus;
    }

    public boolean checkFormBeforeValidation() {

        boolean valid = true;
        boolean checkpass = false;
        String name = _nameText.getText().toString();
        String email = _emailText.getText().toString();
        String password = _passwordText.getText().toString();
        String confirmpassword = _confirmpasswordText.getText().toString();

        if (name.isEmpty() || password.length() < 4 || password.length() > 20) {
            _nameText.setError(getString(R.string.signup_activity_error_name));
            valid = false;
        } else {
            _nameText.setError(null);
        }

        if (email.isEmpty() || !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            _emailText.setError(getString(R.string.signup_activity_error_email));
            valid = false;
        } else {
            _emailText.setError(null);
        }

        if (password.isEmpty() || password.length() < 4 || password.length() > 10) {
            _passwordText.setError(getString(R.string.signup_activity_error_password));
            valid = false;
        } else {
            _passwordText.setError(null);
        }

        checkpass = checkPassWordAndConfirmPassword(password, confirmpassword);

        if (!checkpass) {
            if (confirmpassword.isEmpty())
                _confirmpasswordText.setError(getString(R.string.signup_activity_error_password_required));
            else
                _confirmpasswordText.setError(getString(R.string.signup_activity_error_password_match));
            valid = false;
        } else {
            _passwordText.setError(null);
        }

        return valid;
    }

}