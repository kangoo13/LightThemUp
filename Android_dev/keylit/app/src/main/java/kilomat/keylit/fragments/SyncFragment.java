package kilomat.keylit.fragments;

import android.app.ProgressDialog;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.Set;

import kilomat.keylit.R;
import kilomat.keylit.controller.AppController;
import kilomat.keylit.controller.BluetoothController;
import kilomat.keylit.controller.ToastMessage;

import static android.app.Activity.RESULT_OK;


public class SyncFragment extends Fragment {
    private ProgressDialog progress;
    private BluetoothController mBtAdapt;

    public String TAG = "sync";
    final int BLUETOOTH_ACTIVATION = 12;

    private Button refreshButt = null, disconnectButt = null;
    private ListView pairedList, otherList = null;
    private Set<BluetoothDevice> pairedDevices = null;
    private Set<BluetoothDevice>listDevices;

    public SyncFragment() {
        // Required empty public constructor
    }

    /**
     *   // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
     *   private static final String ARG_PARAM1 = "param1";
     *   private static final String ARG_PARAM2 = "param2";
     *
     *   private String mParam1;
     *   private String mParam2;
     *
     *   public static SyncFragment newInstance(String param1, String param2) {
     *       SyncFragment fragment = new SyncFragment();
     *       Bundle args = new Bundle();
     *       args.putString(ARG_PARAM1, param1);
     *       args.putString(ARG_PARAM2, param2);
     *       fragment.setArguments(args);
     *       return fragment;
     *   }
     *
     *   @Override
     *   public void onCreate(Bundle savedInstanceState) {
     *       super.onCreate(savedInstanceState);
     *       if (getArguments() != null) {
     *           mParam1 = getArguments().getString(ARG_PARAM1);
     *           mParam2 = getArguments().getString(ARG_PARAM2);
     *       }
     *   }
     */

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mBtAdapt = AppController.getInstance().getBtControler();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View layout = inflater.inflate(R.layout.fragment_sync, container, false);

        refreshButt = (Button) layout.findViewById(R.id.btnRefreshBluetooth);
        refreshButt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (CheckBtEnable())
                    refreshList();
            }
        });
        disconnectButt = (Button) layout.findViewById(R.id.btnDisconnectBt);
        disconnectButt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mBtAdapt.Disconnect();
                v.setBackgroundColor(Color.parseColor(mBtAdapt.IsConnected() ? "#009999" : "#999b99"));
            }
        });
        disconnectButt.setBackgroundColor(Color.parseColor(mBtAdapt.IsConnected() ? "#009999" : "#999b99"));

        pairedList = (ListView) layout.findViewById(R.id.PairedDeviceList);
        otherList = (ListView) layout.findViewById(R.id.OtherAvailableDevicesList);

        ((Button) layout.findViewById(R.id.testButt)).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mBtAdapt.SendPackage(new BluetoothController.BtPackage(0, (byte)1, 0, null, (short)0));
            }
        });

        if (CheckBtEnable()) {
            enableButton(true);
            refreshList();
        }
        else
            enableButton(false);

        /*Log.d("InfoMoi", getContext().getFilesDir().getPath());
        Log.d("InfoMoi", getContext().getFilesDir().getAbsolutePath());
        String FILENAME = "hello_file";
        String string = "hello world! jfdkl";
        FileOutputStream fos = null;
        FileInputStream fis = null;
        try {
            //fos = getContext().openFileOutput(FILENAME, Context.MODE_PRIVATE);
            //fos.write(string.getBytes());
            //fos.close();
            fis = getContext().openFileInput(FILENAME);
            byte[] lol = new byte[50];
            Log.d("InfoMoi", "read : "+fis.read(lol));
            Log.d("InfoMoi", "read : '"+new String(lol)+"'");
            fis.close();
        } catch (Exception e) {
            e.printStackTrace();
        }*/

        return layout;
    }

    private boolean CheckBtEnable() {
        if (mBtAdapt == null) {
            //Toast.makeText(getContext(), "You need to have the Bluetooth", Toast.LENGTH_LONG).show();
            return false;
        }
        else if (!mBtAdapt.isBtEnabled()) {
            Intent turnOn = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
            startActivityForResult(turnOn, BLUETOOTH_ACTIVATION);
            return mBtAdapt.isBtEnabled();
        }
        return true;
    }

    private void enableButton(boolean toggle) {
        refreshButt.setBackgroundColor(Color.parseColor(toggle ? "#009999" : "#999b99"));
        refreshButt.setTextColor(toggle ? Color.WHITE : Color.GRAY);
    }

    private void refreshList() {
        if (CheckBtEnable()) {
            //if (pairedDevices != null)
            //    pairedDevices.clear();
            pairedDevices = mBtAdapt.GetPairedDeviceList();
            if (pairedDevices.isEmpty())
                return ;

            String[] values = new String[pairedDevices.size()];
            //for(int i = 0; i < pairedDevices.size(); i++)
            //    values[i] = ((BluetoothDevice[])pairedDevices.toArray())[i].getName();
            int i = 0;
            for (BluetoothDevice bt : pairedDevices)
                values[i++] = bt.getName();

            ArrayAdapter<String> adapter = new ArrayAdapter<String>(getContext(), R.layout.item_listview_bt, R.id.item_listview_bt_title, values);
            pairedList.setAdapter(adapter);
            pairedList.setOnItemClickListener(new AdapterView.OnItemClickListener() {

                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    BluetoothDevice bt = null;

                    int i = 0;
                    for (BluetoothDevice search : pairedDevices)
                        if (i == position) {
                            bt = search;
                            break;
                        }
                        else
                            i++;

                    if (i != position) {
                        ToastMessage.bar_message_fail(view, "Error", "Fail");
                        return;
                    }

                    progress = ProgressDialog.show(view.getContext(), "Connecting", "Try to connect to "+bt.getName(), true);
                    progress.setCancelable(false);
                    if (CheckBtEnable()) {
                        new Thread((new Runnable() {
                            private String maddr;
                            @Override
                            public void run() {
                                mBtAdapt.Connect(maddr);
                                //disconnectButt.setBackgroundColor(Color.parseColor(!mBtAdapt.IsConnected() ? "#009999" : "#999b99"));
                                progress.dismiss();
                                return;
                            }

                            public Runnable init(String addr) {
                                maddr = addr;
                                return this;
                            }
                        }.init(bt.getAddress()))).start(); // connect && dismiss dialog
                    }
                }

            });

        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == BLUETOOTH_ACTIVATION) {
            if (resultCode == RESULT_OK)
                enableButton(true);
            else {
                enableButton(false);
                Toast.makeText(getContext(), "Fail to enable Bluetooth", Toast.LENGTH_LONG).show();
            }
        }
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
    }

    @Override
    public void onDetach() {
        super.onDetach();
    }

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     * /
     * public interface OnFragmentInteractionListener {
     *    // TODO: Update argument type and name
     *    void onFragmentInteraction(Uri uri);
     * }
     */
}