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
    import android.widget.ProgressBar;
    import android.widget.TextView;
    import android.widget.Toast;

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

    public class SignupActivity extends AppCompatActivity {
        private static final String TAG = "SignupActivity";
        private ProgressBar pb;
        private AsyncTask<String, String, String> asyncTask;
        public String Xresponse;

        @InjectView(R.id.input_name) EditText _nameText;
        @InjectView(R.id.input_email) EditText _emailText;
        @InjectView(R.id.input_password) EditText _passwordText;
        @InjectView(R.id.btn_signup) Button _signupButton;
        @InjectView(R.id.link_login) TextView _loginLink;
        @InjectView(R.id.input_confirmpassword) EditText _confirmpasswordText;

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
                        signup();
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

        public void signup() throws IOException {
            Log.d(TAG, "Signup");

            if (!validate()) {
                onSignupFailed();
                return;
            }

            _signupButton.setEnabled(false);

            final ProgressDialog progressDialog = new ProgressDialog(SignupActivity.this,
                    R.style.AppTheme_Dark_Dialog);
            progressDialog.setIndeterminate(true);
            progressDialog.setMessage("Creating Account...");
            progressDialog.show();

            final String name = _nameText.getText().toString();
            final String email = _emailText.getText().toString();
            final String password = _passwordText.getText().toString();

            // TODO: Implement your own signup logic here.

            // Validation Completed
            String address = "http://95.85.2.100:3000/users";
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
            if (response.getStatusLine().getStatusCode() == 200)
            {
                System.out.println("--------------[OK]--------------");
                HttpEntity entity = response.getEntity();
                String resp = EntityUtils.toString(entity);
                System.out.println("--------------(" + resp + ")--------------");
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
                                onSignupSuccess();
                            else
                                onSignupFailed();
                            progressDialog.dismiss();
                        }
                    }, 3000);
        }


        public void onSignupSuccess() {
            _signupButton.setEnabled(true);
            setResult(RESULT_OK, null);
            Toast.makeText(getBaseContext(), Xresponse, Toast.LENGTH_LONG).show();
            Intent mainActivity = new Intent(this, HomeActivity.class);
            mainActivity.putExtra("activity", "SignUp");
            startActivity(mainActivity);
            finish();
        }

        public void onSignupFailed() {
            Toast.makeText(getBaseContext(), Xresponse, Toast.LENGTH_LONG).show();
            _signupButton.setEnabled(true);
        }

        public boolean checkPassWordAndConfirmPassword(String password,String confirmPassword)
        {
            boolean pstatus = false;
            if (confirmPassword != null && password != null)
            {
                if (password.equals(confirmPassword))
                {
                    pstatus = true;
                }
            }
            return pstatus;
        }

        public boolean validate() {

            boolean valid = true;
            boolean checkpass = false;
            String name = _nameText.getText().toString();
            String email = _emailText.getText().toString();
            String password = _passwordText.getText().toString();
            String confirmpassword = _confirmpasswordText.getText().toString();

            if (name.isEmpty() || password.length() < 4 || password.length() > 20)
            {
                _nameText.setError("please enter your nickname");
                valid = false;
            } else {
                _nameText.setError(null);
            }

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

            checkpass = checkPassWordAndConfirmPassword(password,confirmpassword);

            if (!checkpass)
            {
                if (confirmpassword.isEmpty())
                _confirmpasswordText.setError("Confirm Password required");
                else
                    _confirmpasswordText.setError("Password doesn't match.");
                valid = false;
            }
            else {
                _passwordText.setError(null);
            }

            return valid;
        }

    }