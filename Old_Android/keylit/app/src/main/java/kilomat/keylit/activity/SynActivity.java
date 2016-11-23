package kilomat.keylit.activity;

/**
 * Created by BAHA on 09/04/2016.
 */

import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.Set;

import kilomat.keylit.R;

public class SynActivity extends Activity {
    Button b1,b2,b3,b4;
    private BluetoothAdapter BA;
    private Set<BluetoothDevice>pairedDevices;
    private Set<BluetoothDevice>listDevices;
    private ArrayAdapter<String>mNewDevicesArrayAdapter;
    private BluetoothAdapter mBtAdapter;
    ListView lv, newDevicesListView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sync);

        b1 = (Button) findViewById(R.id.button);
        b2=(Button)findViewById(R.id.button2);
        b3=(Button)findViewById(R.id.button3);
        b4=(Button)findViewById(R.id.button4);

        newDevicesListView = (ListView)findViewById(R.id.listView2);
        ArrayList list = new ArrayList();
        mNewDevicesArrayAdapter = new ArrayAdapter(this,android.R.layout.simple_list_item_1, list);
        newDevicesListView.setAdapter(mNewDevicesArrayAdapter);

        BA = BluetoothAdapter.getDefaultAdapter();
        lv = (ListView)findViewById(R.id.listView);

        //newDevicesListView.setOnClickListener(mDeviceClickListener);

        IntentFilter filter = new IntentFilter(BluetoothDevice.ACTION_FOUND);
        this.registerReceiver(mReceiver, filter);
        filter = new IntentFilter(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);
        this.registerReceiver(mReceiver, filter);
        mBtAdapter = BluetoothAdapter.getDefaultAdapter();


    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mBtAdapter != null)
        {
            mBtAdapter.cancelDiscovery();
        }
        this.unregisterReceiver(mReceiver);
    }

    public void on(View v){
        if (BA != null) {
            if (!BA.isEnabled()) {
                Intent turnOn = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
                startActivityForResult(turnOn, 0);
                Toast.makeText(getApplicationContext(), "Turned on", Toast.LENGTH_LONG).show();
            }
        }
        else
        {
            Toast.makeText(getApplicationContext(),"Already on or unavailable", Toast.LENGTH_LONG).show();
        }
    }

    public void off(View v){
        if (BA != null)
        {
            BA.disable();
            Toast.makeText(getApplicationContext(), "Turned off", Toast.LENGTH_LONG).show();
        }
        else
        {
            Toast.makeText(getApplicationContext(), "Turned off unavailable", Toast.LENGTH_LONG).show();
        }
    }

    public  void visible(View v){
        Intent getVisible = new Intent(BluetoothAdapter.ACTION_REQUEST_DISCOVERABLE);
        if (getVisible != null) {
            startActivityForResult(getVisible, 0);
        }
        else
        {
            Toast.makeText(getApplicationContext(), "Get visible is unavailable",Toast.LENGTH_LONG).show();
        }
    }

    public void list(View v){

        if (BA != null) {
            pairedDevices = BA.getBondedDevices();
            ArrayList list = new ArrayList();


            for (BluetoothDevice bt : pairedDevices)
                list.add(bt.getName());
            Toast.makeText(getApplicationContext(), "Showing Paired Devices", Toast.LENGTH_SHORT).show();

            final ArrayAdapter adapter = new ArrayAdapter(this, android.R.layout.simple_list_item_1, list);
            lv.setAdapter(adapter);

            if (mBtAdapter.isDiscovering()) {
                mBtAdapter.cancelDiscovery();
                onDestroy();
            }

            mBtAdapter.startDiscovery();
        }
        else
            Toast.makeText(getApplicationContext(), "Showing Paired Devices is unavailable", Toast.LENGTH_SHORT).show();

    }

    private AdapterView.OnItemClickListener mDeviceClickListener = new AdapterView.OnItemClickListener() {
        public void onItemClick(AdapterView<?>av,View v,int i, long l) {
            mBtAdapter.cancelDiscovery();
            String info = ((TextView)v).getText().toString();
            String address = info.substring(info.length() -17);
        }
    };


    private final BroadcastReceiver mReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            if (BluetoothDevice.ACTION_FOUND.equals(action)) {

                BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
                if (device.getBondState() != BluetoothDevice.BOND_BONDED) {
                    mNewDevicesArrayAdapter.add(device.getName() + "\n" + device.getAddress());
                }
            }
            else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action))
            {
                setProgressBarIndeterminateVisibility(false);
                if (mNewDevicesArrayAdapter.getCount() == 0)
                {
                    String noDevices = "rien";
                    mNewDevicesArrayAdapter.add(noDevices);
                }
            }
        }
    };
}