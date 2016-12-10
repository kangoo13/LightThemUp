package kilomat.keylit.fragments;

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
import android.provider.MediaStore;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;

import com.loopj.android.http.RequestParams;
import com.loopj.android.http.SyncHttpClient;
import com.loopj.android.http.TextHttpResponseHandler;

import org.json.JSONException;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Timer;
import java.util.TimerTask;

import cz.msebera.android.httpclient.Header;
import kilomat.keylit.R;
import kilomat.keylit.controller.SessionManager;
import kilomat.keylit.controller.ToastMessage;


/**
 * Created by BAHA on 06/10/2016.
 */
public class ScanFragment extends Fragment {
    ImageView scan;
    ImageView picture;
    EditText name;
    EditText price;
    EditText artist;
    EditText difficulty;
    Button b;
    Button send;
    String mytoken;
    String idUser;
    SessionManager manager;
    String scan_path;
    String picture_path;

    private ProgressDialog mProgressDialog;

    public ScanFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        manager = new SessionManager();
        mytoken = manager.getPreferences(getActivity(), "TokenKey");
        idUser = manager.getPreferences(getActivity(), "IdUser");
        selectImage();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View layout = inflater.inflate(R.layout.activity_scan, container, false);

        b = (Button) layout.findViewById(R.id.btnSelectPhoto);
        send = (Button) layout.findViewById(R.id.btnSendPhoto);
        scan = (ImageView) layout.findViewById(R.id.viewImage);
        picture = (ImageView) layout.findViewById(R.id.scan_picture);
        name = (EditText) layout.findViewById(R.id.scan_name_inputText);
        artist = (EditText) layout.findViewById(R.id.scan_artist_inputText);
        price = (EditText) layout.findViewById(R.id.scan_price_inputText);
        difficulty = (EditText) layout.findViewById(R.id.scan_difficulty_inputText);
        send.setVisibility(View.VISIBLE);
        b.setVisibility(View.VISIBLE);
        scan.setVisibility(View.VISIBLE);

        picture.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                selectImage();
            }
        });
        b.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                selectImage();
            }
        });

        send.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sendImage(v);
            }
        });

        return layout;
    }

    private void sendImage(final View v) {
        mProgressDialog = new ProgressDialog(getActivity());
        mProgressDialog.setMessage(getString(R.string.action_load));
        mProgressDialog.setCancelable(false);
        mProgressDialog.show();
        long delayInMillis = 5000;
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                try {
                    SendParition(v);
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                mProgressDialog.dismiss();
            }
        }, delayInMillis);
    }

    private void selectImage() {

        final CharSequence[] options = {getString(R.string.image_take),
                getString(R.string.image_choose), getString(R.string.action_cancel)};

        android.support.v7.app.AlertDialog.Builder builder = new android.support.v7.app.AlertDialog.Builder(getContext());
        builder.setTitle(getString(R.string.image_title));
        builder.setItems(options, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int item) {
                if (options[item].equals(getString(R.string.image_take))) {
                    Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                    File f = new File(android.os.Environment.getExternalStorageDirectory(), "temp.jpg");
                    intent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(f));
                    startActivityForResult(intent, 1);
                } else if (options[item].equals(getString(R.string.image_choose))) {
                    Intent intent = new Intent(Intent.ACTION_PICK, android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
                    startActivityForResult(intent, 2);

                } else if (options[item].equals(getString(R.string.action_cancel))) {
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

                    scan.setImageBitmap(bitmap);
                    picture.setImageBitmap(bitmap);
                    /////
                    send.setVisibility(View.VISIBLE);
                    b.setVisibility(View.VISIBLE);
                    scan.setVisibility(View.VISIBLE);
                    /////
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
                String picturePath = c.getString(columnIndex);
                c.close();

                picture_path = picturePath;
                scan_path = picturePath;
                BitmapFactory.Options options = new BitmapFactory.Options();
                options.inSampleSize = 2;
                Bitmap thumbnail = BitmapFactory.decodeFile(picturePath, options);

                //Bitmap thumbnail = (BitmapFactory.decodeFile(picturePath));
                scan.setImageBitmap(thumbnail);
                picture.setImageBitmap(thumbnail);
                send.setVisibility(View.VISIBLE);
                b.setVisibility(View.VISIBLE);
                scan.setVisibility(View.VISIBLE);
            }
        }
    }

    protected void SendParition(final View v) throws IOException, JSONException {

        String url_address = getString(R.string.api_url_songs);

        String my_name = name.getText().toString();
        String my_artist = artist.getText().toString();
        String my_price = price.getText().toString();
        String my_dif = difficulty.getText().toString();

        SyncHttpClient client = new SyncHttpClient();
        RequestParams params = new RequestParams();

        client.addHeader("x-access-token", mytoken);
        try {
            params.put("idUser", idUser);
            params.put("name", my_name);
            params.put("artist", my_artist);
            params.put("price", my_price);
            params.put("difficulty", my_dif);
            params.put("scan", new File(scan_path));
            params.put("picture", new File(picture_path));
        }
        catch(FileNotFoundException e) {
            e.printStackTrace();
        }

        client.post(url_address, params, new TextHttpResponseHandler() {
            @Override
            public void onFailure(int statusCode, Header[] headers, String responseString, Throwable throwable) {
                // error handling
                System.out.println(responseString);
                ToastMessage.bar_message_fail(v, getString(R.string.scan_send_image),
                        getString(R.string.toast_message_fail));
            }

            @Override
            public void onSuccess(int statusCode, Header[] headers, String responseString) {
                // success
                System.out.println(responseString);
                ToastMessage.bar_message_success(v, getString(R.string.scan_send_image),
                        getString(R.string.toast_message_success));
            }
        });
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

    void progressDialog() {
        mProgressDialog = new ProgressDialog(getContext());
        mProgressDialog.setMessage(getString(R.string.action_load));
        mProgressDialog.setCancelable(false);
        mProgressDialog.show();
    }
}