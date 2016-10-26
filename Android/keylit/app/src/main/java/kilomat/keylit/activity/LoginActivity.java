package kilomat.keylit.activity;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
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
import kilomat.keylit.controller.SessionManager;
import kilomat.keylit.controller.ToastMessage;

public class LoginActivity extends AppCompatActivity {
    public static final String MyPREFERENCES = "MyPrefs";
    public static final String Token = "TokenKey";
    public static final String IdUser = "IdUser";
    private static final String TAG = "LoginActivity";
    private static final int REQUEST_SIGNUP = 0;
    public static String PREF_EMAIL = "email";
    public static String PREF_PASSWORD = "password";
    public static SharedPreferences sharedPreferences;
    CheckBox ch;
    @InjectView(R.id.input_email)
    EditText _emailText;
    @InjectView(R.id.input_password)
    EditText _passwordText;
    @InjectView(R.id.btn_login)
    Button _loginButton;
    @InjectView(R.id.link_signup)
    TextView _signupLink;
    SessionManager manager;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);
        ButterKnife.inject(this);
        sharedPreferences = getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE);
        manager = new SessionManager();
        _loginButton.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                try {
                    login(v);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });

        ch=(CheckBox)findViewById(R.id.ch_rememberme);

        _signupLink.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                // Start the Signup activity
                Intent intent = new Intent(getApplicationContext(), SignupActivity.class);
                startActivityForResult(intent, REQUEST_SIGNUP);
            }
        });
    }


    public void login(final View v) throws IOException {
        Log.d(TAG, "Login");

        if (!validate()) {
            onLoginFailed(v);
            return;
        }

        _loginButton.setEnabled(false);

        final ProgressDialog progressDialog = new ProgressDialog(LoginActivity.this);
        progressDialog.setIndeterminate(true);
        progressDialog.setMessage("Authenticating...");
        progressDialog.show();

        String email = _emailText.getText().toString();
        String password = _passwordText.getText().toString();


        String address = "http://95.85.2.100:3000/users/authenticate";
        HttpClient client = new DefaultHttpClient();
        HttpPost post = new HttpPost(address);
        List<NameValuePair> pairs = new ArrayList<NameValuePair>();
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
                if (successStatus.equals("true")) {
                    loginStatus = true;
                    if(ch.isChecked())
                    {
                            manager.setPreferences(LoginActivity.this, "status", "1");
                            String status = manager.getPreferences(LoginActivity.this, "status");
                    }
                    String MyToken = jsonObj.getString("token");
                    String MyId = jsonObj.getString("id");
                    manager.setPreferences(this, Token, MyToken);
                    manager.setPreferences(this, IdUser, MyId);
                    manager.setPreferences(this, PREF_EMAIL, email);
                    manager.setPreferences(this, PREF_PASSWORD, password);
                    //SharedPreferences.Editor editor = sharedPreferences.edit();
                    //editor.putString(Token, MyToken);
                    //editor.putString(IdUser, MyId);
                    //editor.putString(PREF_EMAIL, email);
                    //editor.putString(PREF_PASSWORD, password);
                    //editor.commit();
                } else
                    loginStatus = false;
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        final boolean finalLoginStatus = loginStatus;
        new android.os.Handler().postDelayed(
                new Runnable() {
                    public void run() {
                        // On complete call either onLoginSuccess or onLoginFailed
                        if (finalLoginStatus)
                            onLoginSuccess(v);
                        else
                            onLoginFailed(v);
                        progressDialog.dismiss();
                    }
                }, 3000);
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_SIGNUP) {
            if (resultCode == RESULT_OK) {

                // TODO: Implement successful signup logic here
                // By default we just finish the Activity and log them in automatically
                this.finish();
            }
        }
    }

    @Override
    public void onBackPressed() {
        // disable going back to the MainActivity
        moveTaskToBack(true);
    }

    public void onLoginSuccess(View v) {
        _loginButton.setEnabled(true);
        ToastMessage.bar_message_success(v, "Authentication", "Success");
        Intent mainActivity = new Intent(this, MainActivity.class);
        mainActivity.putExtra("activity", "SignIn");
        startActivity(mainActivity);
        finish();
    }

    public void onLoginFailed(View v) {
        ToastMessage.bar_message_fail(v, "Authentication", "Fail");
        _loginButton.setEnabled(true);
    }

    public boolean validate() {
        boolean valid = true;

        String email = _emailText.getText().toString();
        String password = _passwordText.getText().toString();

        if (email.isEmpty() || !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            _emailText.setError("enter a valid email address");
            valid = false;
        } else {
            _emailText.setError(null);
        }

        if (password.isEmpty() || password.length() < 4 || password.length() > 10) {
            _passwordText.setError("between 4 and 10 alphanumeric characters");
            valid = false;
        } else {
            _passwordText.setError(null);
        }

        return valid;
    }
}