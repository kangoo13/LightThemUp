package kilomat.keylit.controller;

import android.Manifest;
import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Environment;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;

import kilomat.keylit.fragments.ShopFragment;

/**
 * Created by BAHA on 16/11/2016.
 */

public class DownloadFileFromServer {

    public static final int DIALOG_DOWNLOAD_PROGRESS = 0;
    private static final int PERMISSION_REQUEST_CODE = 1;
    private ProgressDialog mProgressDialog;
    private Context context;

    String _file_name;
    String _downloadFileUrl;
    String _file_title;
    String midiFile;
    SessionManager manager;

    public DownloadFileFromServer(Context context, String file_name, String downloadFileUrl, String file_title)
    {
        this.context = context;
        mProgressDialog = new ProgressDialog(context);
        mProgressDialog.setMessage("Downloading file..");
        mProgressDialog.setIndeterminate(false);
        mProgressDialog.setMax(100);
        mProgressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
        mProgressDialog.setCancelable(true);
        run(file_name, downloadFileUrl, file_title);

    }

    private  void run(String file_name, String downloadFileUrl, String file_title) {

        _file_name = file_name;
        _downloadFileUrl = downloadFileUrl;
        _file_title = file_title;
        midiFile = startDownload();
        manager.setPreferences(context, "DownloadFile", midiFile);
    }

    public String  startDownload()
    {
        String request = null;
        int result = ContextCompat.checkSelfPermission(context, Manifest.permission.WRITE_EXTERNAL_STORAGE);
        if (result == PackageManager.PERMISSION_GRANTED){

            request = startDownloading();

        } else {

            requestForLocationPermission();
        }
        return request;
    }


    private void requestForLocationPermission()
    {

        if (ActivityCompat.shouldShowRequestPermissionRationale((Activity) context, Manifest.permission.WRITE_EXTERNAL_STORAGE))
        {
        }
        else {
                    ActivityCompat.requestPermissions((Activity) context, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},
                            PERMISSION_REQUEST_CODE);
        }

    }


    public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults)
    {
        switch (requestCode) {
            case PERMISSION_REQUEST_CODE:
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED)
                {
                    startDownloading();
                }
                break;
        }
    }


    public String startDownloading()
    {

        Uri uri = Uri.parse("http://lightthemup.fr.nf/" + _downloadFileUrl);
        android.app.DownloadManager.Request request = new android.app.DownloadManager.Request(uri);

        request.setDescription(_file_title)
                .setTitle("Notification Title");
        request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, _file_name);

        request.setVisibleInDownloadsUi(true);
        request.setAllowedNetworkTypes(android.app.DownloadManager.Request.NETWORK_WIFI
                | android.app.DownloadManager.Request.NETWORK_MOBILE);
        ShopFragment.myDownloadReference = ShopFragment.downloadManager.enqueue(request);

        // }
        midiFile = Environment.getExternalStorageDirectory().getPath()+ "/Download/" + _file_name;

        return midiFile;
    }
}