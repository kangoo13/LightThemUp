package kilomat.keylit.fragments;

/**
 * Created by BAHA on 06/10/2016.
 */

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.StrictMode;
import android.provider.MediaStore;
import android.support.v4.app.Fragment;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.app.AlertDialog;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.ParseError;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.HttpHeaderParser;
import com.android.volley.toolbox.Volley;
import com.bumptech.glide.Glide;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import kilomat.keylit.R;
import kilomat.keylit.controller.SessionManager;
import kilomat.keylit.model.ProfileData;


public class ProfileFragment extends Fragment implements SwipeRefreshLayout.OnRefreshListener {

    private static final String TAG = "ProfileFragment";
    protected LinkedList<Integer> drawableLinkedList;
    ImageView profileuserview;
    TextView profileusername;
    TextView profiledatemodified;
    EditText profileemail;
    EditText profilepassword;
    EditText profilename;
    EditText profiledescription;
    EditText profileaddress;
    EditText profilecity;
    EditText profilecountry;
    Bitmap thumbnail;
    String picturePath;
    Button fab;
    Button DeleteMyAccount;
    String mytoken;
    String idUser;
    SessionManager manager;
    private SwipeRefreshLayout swiprefreshview;

    private List<ProfileData> mProfileList = new ArrayList<>();
    private List<ProfileData> mProfileDataList;
    private ProgressDialog mProgressDialog;

    public ProfileFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        progressDialog();

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        manager = new SessionManager();
        mytoken = manager.getPreferences(getActivity(), "TokenKey");
        idUser = manager.getPreferences(getActivity(), "IdUser");

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View layout = inflater.inflate(R.layout.item_layout_profile, container, false);


        profileuserview = (ImageView) layout.findViewById(R.id.user_profile_photo);
        profileusername = (TextView) layout.findViewById(R.id.user_profile_name);
        profiledatemodified = (TextView) layout.findViewById(R.id.profile_date_modified);
        profileemail = (EditText) layout.findViewById(R.id.profile_email);
        profilepassword = (EditText) layout.findViewById(R.id.profile_password);
        profilename = (EditText) layout.findViewById(R.id.profile_name);
        profiledescription = (EditText) layout.findViewById(R.id.profile_description);
        profileaddress = (EditText) layout.findViewById(R.id.profile_address);
        profilecity = (EditText) layout.findViewById(R.id.profile_city);
        profilecountry = (EditText) layout.findViewById(R.id.profile_country);
        fab = (Button) layout.findViewById(R.id.fab);
        DeleteMyAccount = (Button) layout.findViewById(R.id.btn_delete_profile);
        // Inflate the layout for this fragment

        swiprefreshview = (SwipeRefreshLayout) layout.findViewById(R.id.swipe_refresh_layout);

        swiprefreshview.setOnRefreshListener(this);
        swiprefreshview.post(new Runnable() {
                                 @Override
                                 public void run() {
                                     swiprefreshview.setRefreshing(true);
                                     fetchMovies();
                                 }
                             }
        );

        return layout;
    }


    String getMyDate(String UtcDate) {
        SimpleDateFormat existingUTCFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
        SimpleDateFormat requiredFormat = new SimpleDateFormat("EEEE, d MMM yyyy HH:mm:ss");

        try {
            Date getDate = existingUTCFormat.parse(UtcDate);
            UtcDate = requiredFormat.format(getDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return UtcDate;
    }

    @Override
    public void onRefresh() {

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                mProfileDataList.clear();
                swiprefreshview.setRefreshing(false);
                fetchMovies();
            }
        }, 2000);
    }

    public void onBindViewHolder(List<ProfileData> followerList, LinkedList<Integer> drawableLinkedList) {

        this.mProfileDataList = followerList;
        this.drawableLinkedList = drawableLinkedList;

        ProfileData data = mProfileDataList.get(0);
        final int actionDrawableId = this.drawableLinkedList.get(0);

        String mydate = getMyDate(data.getProfileDateModified());

        profileusername.setText(String.valueOf(data.getProfileUserName()));
        profiledatemodified.setText("Modified : " + mydate);
        profileemail.setText(String.valueOf(data.getProfileEmail()));
        profilename.setText(String.valueOf(data.getProfileUserName()));
        profiledescription.setText(String.valueOf(data.getProfileDescription()));
        profileaddress.setText(String.valueOf(data.getProfileAddress()));
        profilecity.setText(String.valueOf(data.getProfileCity()));
        profilecountry.setText(String.valueOf(data.getProfileCountry()));

        Glide.with(this).load("http://lightthemup.fr.nf/" + data.getProfileUserView()).centerCrop().into(profileuserview);

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SaveClick();
            }
        });
        DeleteMyAccount.setOnClickListener(new View.OnClickListener(){
            @Override
        public void onClick(View v)
            {
                DeleteClick();
            }
        });

        profileuserview.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                selectImage();
            }
        });
    }

    private void DeleteClick() {
        new AlertDialog.Builder(getActivity())
                .setIcon(android.R.drawable.ic_dialog_alert)
                .setTitle("Confirmation")
                .setMessage("Are you sure you want to delete.")
                .setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        try {
                            DeleteAccount();
                        } catch (IOException e) {
                            e.printStackTrace();
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        getActivity().finish();
                    }
                })
                .setNegativeButton("Cancel", null)
                .show();
    }

    private void DeleteAccount() throws IOException, JSONException
    {
        progressDialog();

        //String mytoken = LoginActivity.sharedPreferences.getString("TokenKey", null);
        //String idUser = LoginActivity.sharedPreferences.getString("IdUser", null);
        String address = "http://lightthemup.fr.nf:3000/users/" + idUser;


        HttpClient client = new DefaultHttpClient();
        HttpDelete put = new HttpDelete(address);

        List<NameValuePair> pairs = new ArrayList<NameValuePair>();

        put.addHeader("x-access-token", mytoken);

        HttpResponse response = client.execute(put);

        HttpEntity entity2 = response.getEntity();
        String resp = EntityUtils.toString(entity2);
    }

    private void selectImage() {

        final CharSequence[] options = {"Take Photo", "Choose from Gallery", "Cancel"};

        AlertDialog.Builder builder = new AlertDialog.Builder(getContext());
        builder.setTitle("Add Photo!");
        builder.setItems(options, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int item) {
                if (options[item].equals("Take Photo")) {
                    Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                    File f = new File(android.os.Environment.getExternalStorageDirectory(), "temp.jpg");
                    intent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(f));
                    startActivityForResult(intent, 1);
                } else if (options[item].equals("Choose from Gallery")) {
                    Intent intent = new Intent(Intent.ACTION_PICK, android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
                    startActivityForResult(intent, 2);

                } else if (options[item].equals("Cancel")) {
                    dialog.dismiss();
                }
            }
        });
        builder.show();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == Activity.RESULT_OK) {
            if (requestCode == 1) {
                File f = new File(Environment.getExternalStorageDirectory().toString());
                for (File temp : f.listFiles()) {
                    if (temp.getName().equals("temp.jpg")) {
                        f = temp;
                        break;
                    }
                }
                try {
                    Bitmap bitmap;
                    BitmapFactory.Options bitmapOptions = new BitmapFactory.Options();
                    bitmapOptions.inSampleSize = 2;
                    /*bitmapOptions.inJustDecodeBounds = true;
                    BitmapFactory.decodeStream(new FileInputStream(f),null,bitmapOptions);*/
                    bitmap = BitmapFactory.decodeFile(f.getAbsolutePath(),
                            bitmapOptions);
                    profileuserview.setImageBitmap(bitmap);
                    String path = android.os.Environment
                            .getExternalStorageDirectory()
                            + File.separator
                            + "Phoenix" + File.separator + "default";
                    f.delete();
                    OutputStream outFile = null;
                    File file = new File(path, String.valueOf(System.currentTimeMillis()) + ".jpg");
                    try {
                        outFile = new FileOutputStream(file);
                        bitmap.compress(Bitmap.CompressFormat.JPEG, 85, outFile);
                        outFile.flush();
                        outFile.close();
                    } catch (FileNotFoundException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else if (requestCode == 2) {

                Uri selectedImage = data.getData();
                String[] filePath = {MediaStore.Images.Media.DATA};
                Cursor c = getContext().getContentResolver().query(selectedImage, filePath, null, null, null);
                c.moveToFirst();
                int columnIndex = c.getColumnIndex(filePath[0]);
                picturePath = c.getString(columnIndex);
                c.close();

                BitmapFactory.Options options = new BitmapFactory.Options();
                options.inSampleSize = 2;
                thumbnail = BitmapFactory.decodeFile(picturePath, options);

                //Bitmap thumbnail = (BitmapFactory.decodeFile(picturePath));
                profileuserview.setImageBitmap(thumbnail);
            }
        }
    }

    protected void SaveClick() {
        String result = "NULL";
        progressDialog();

        try {
            progressDialog();
            String response = UpdateDataUser();
            hidePDialog();
            if (response.equals("true")) {
                result = "Complete";
            }
        } catch (IOException e) {
            hidePDialog();
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        if (result.equals("Complete")) {
            toast_message_success("User updated !");
        } else {
            toast_message_error("Error Profile : Update User failed");
        }
    hidePDialog();
    }

    protected String UpdateDataUser() throws IOException, JSONException {

        ProfileData myDataProfile = mProfileDataList.get(0);
        progressDialog();

        //String mytoken = LoginActivity.sharedPreferences.getString("TokenKey", null);
        //String idUser = LoginActivity.sharedPreferences.getString("IdUser", null);
        String address = "http://lightthemup.fr.nf:3000/users/" + idUser;
        String xprofileemail = profileemail.getText().toString();
        String xprofilepassword = profilepassword.getText().toString();
        String xprofilename = profilename.getText().toString();
        String xprofiledescription = profiledescription.getText().toString();
        String xprofileaddress = profileaddress.getText().toString();
        String xprofilecity = profilecity.getText().toString();
        String xprofilecountry = profilecountry.getText().toString();


        HttpClient client = new DefaultHttpClient();
        HttpPut put = new HttpPut(address);

        List<NameValuePair> pairs = new ArrayList<NameValuePair>();

        put.addHeader("x-access-token", mytoken);
        pairs.add(new BasicNameValuePair("idUser", idUser));
        // pairs.add(new BasicNameValuePair("picture", ));
        pairs.add(new BasicNameValuePair("emailLocal", xprofileemail));
        pairs.add(new BasicNameValuePair("password", xprofilepassword));
        pairs.add(new BasicNameValuePair("name", xprofilename));
        pairs.add(new BasicNameValuePair("address", xprofileaddress));
        pairs.add(new BasicNameValuePair("description", xprofiledescription));
        pairs.add(new BasicNameValuePair("city", xprofilecity));
        pairs.add(new BasicNameValuePair("country", xprofilecountry));
        put.setEntity(new UrlEncodedFormEntity(pairs, HTTP.UTF_8));

        HttpResponse response = client.execute(put);

        HttpEntity entity2 = response.getEntity();
        String resp = EntityUtils.toString(entity2);

        JSONObject jsonObj = new JSONObject(resp);
        String Xresponse = jsonObj.getString("success");
        hidePDialog();
        return Xresponse;
    }


    private void fetchMovies() {

        //progressDialog();
        swiprefreshview.setRefreshing(true);

        // Creating volley request obj
        //String mytoken = LoginActivity.sharedPreferences.getString("TokenKey", null);
        final HashMap<String, String> params = new HashMap<String, String>();
        params.put("idUser", mytoken);

        final JSONObject jsonObject = new JSONObject(params);
        //String idUser = LoginActivity.sharedPreferences.getString("IdUser", null);
        String URL_PROFILE = "http://lightthemup.fr.nf:3000/users/" + idUser;

        Volley.newRequestQueue(getContext()).add(
                new CustomJsonRequest(Request.Method.GET, URL_PROFILE, null,
                        new Response.Listener<JSONObject>() {
                            @Override
                            public void onResponse(JSONObject response) {
                                {
                                    try {
                                        ProfileData profile = new ProfileData();

                                        profile.setProfileUserView(response.getString("picture"));
                                        profile.setProfileUserName(response.getString("name"));
                                        profile.setProfileDateModified(response.getString("updatedAt"));
                                        profile.setProfileEmail(response.getString("emailLocal"));
                                        profile.setProfileCountry(response.getString("country"));
                                        profile.setProfileDescription(response.getString("description"));
                                        profile.setProfileAddress(response.getString("address"));
                                        profile.setProfileCity(response.getString("city"));

                                        mProfileList.add(profile);
                                        hidePDialog();
                                        if (mProfileList != null) {
                                            onBindViewHolder(mProfileList,
                                                    new LinkedList<>(Collections.nCopies(mProfileList.size(), R.drawable.movie_add_touch)));
                                        } else {
                                            Log.e(TAG, "@Pro Error: Adapter is null");
                                            swiprefreshview.setRefreshing(false);
                                        }

                                    } catch (JSONException jsonException) {
                                        Log.e(TAG, "@Pro JsonException Error: " + jsonException.getMessage());
                                        swiprefreshview.setRefreshing(false);
                                    }
                                }
                            }
                        }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        VolleyLog.d("Profile Error: " + error.getMessage());
                        swiprefreshview.setRefreshing(false);
                        hidePDialog();
                    }
                }) {


                    @Override
                    protected Response<JSONObject> parseNetworkResponse(
                            NetworkResponse response) {
                        try {
                            String jsonString = new String(response.data,
                                    HttpHeaderParser
                                            .parseCharset(response.headers));
                            return Response.success(new JSONObject(jsonString),
                                    HttpHeaderParser
                                            .parseCacheHeaders(response));
                        } catch (UnsupportedEncodingException e) {
                            return Response.error(new ParseError(e));
                        } catch (JSONException je) {
                            return Response.error(new ParseError(je));
                        }
                    }
                });
        swiprefreshview.setRefreshing(false);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        hidePDialog();
    }

    private void hidePDialog() {
        if (mProgressDialog != null) {
            mProgressDialog.dismiss();
            mProgressDialog = null;
        }
    }

    void toast_message_error(String message) {
        Toast toast = Toast.makeText(getContext(), message, Toast.LENGTH_LONG);
        View toastView = toast.getView();
        toastView.setBackgroundResource(R.drawable.toast_custom_error);
        toast.show();
    }

    void toast_message_success(String message) {
        Toast toast = Toast.makeText(getContext(), message, Toast.LENGTH_LONG);
        View toastView = toast.getView();
        toastView.setBackgroundResource(R.drawable.toast_custom_success);
        toast.show();
    }

    void progressDialog() {
        mProgressDialog = new ProgressDialog(getContext());
        mProgressDialog.setMessage("Loading...");
        mProgressDialog.setCancelable(false);
        mProgressDialog.show();
    }

    public class CustomJsonRequest extends Request {

        Map<String, String> params;
        private Response.Listener listener;

        public CustomJsonRequest(int requestMethod, String url, Map<String, String> params,
                                 Response.Listener responseListener, Response.ErrorListener errorListener) {

            super(requestMethod, url, errorListener);


            params = new HashMap<String, String>();
            //String mytoken = LoginActivity.sharedPreferences.getString("TokenKey", null);
            params.put("idUser", mytoken);
            this.params = params;
            this.listener = responseListener;
        }

        @Override
        protected void deliverResponse(Object response) {
            listener.onResponse(response);

        }

        @Override
        public Map<String, String> getParams() throws AuthFailureError {

            return params;
        }

        @Override
        protected Response parseNetworkResponse(NetworkResponse response) {
            try {
                String jsonString = new String(response.data, HttpHeaderParser.parseCharset(response.headers));
                return Response.success(new JSONObject(jsonString), HttpHeaderParser.parseCacheHeaders(response));
            } catch (UnsupportedEncodingException e) {
                return Response.error(new ParseError(e));
            } catch (JSONException je) {
                return Response.error(new ParseError(je));
            }
        }
    }

    @Override
    public void onPause() {
        super.onPause();
        if (swiprefreshview != null) {
            swiprefreshview.setRefreshing(false);
            swiprefreshview.destroyDrawingCache();
            swiprefreshview.clearAnimation();
        }
    }
}

