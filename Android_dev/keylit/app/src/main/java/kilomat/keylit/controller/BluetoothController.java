package kilomat.keylit.controller;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.BufferUnderflowException;
import java.nio.ByteBuffer;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Time;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * Created by Flanby on 07/10/2016.
 */

public class BluetoothController {
    // Blueatooth Vars
    protected BluetoothAdapter  myBluetooth = null;
    BluetoothSocket             btSocket = null;
    private boolean             isBtConnected = false;
    final UUID                  myUUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");

    static byte MAGIC = 42;
    static private int PACKAGE_NUM = 0;

    // Thread Vars
    private final String        BT_STRING_MSG="ReceivedMsg";
    private Handler             handler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            BtPackage data = (BtPackage) msg.getData().getSerializable(BT_STRING_MSG);
            Log.d("Btmsg", "I 1receive : '"+data.getNum()+"' "+data.getOpCode());
            /*WaitingMsg.add(data);*/

            int cnt = 5;

            do {
                try {
                    WaitingMsg.put(data);
                    cnt = -3;
                } catch (InterruptedException e) {
                    // e.printStackTrace();
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e1) {

                    }
                    cnt--;
                }
            } while (cnt >= 0);

            //if (cnt != -3)
            //    Problem
        }
    };
    AtomicBoolean               isRunning = new AtomicBoolean(false);
    AtomicBoolean               isPausing = new AtomicBoolean(false);
    private Thread              ReceiverThread = null;
    private volatile boolean    IsLastMsgFail = false;

    // Received Strings
    private BlockingQueue<BtPackage> WaitingMsg = new ArrayBlockingQueue<BtPackage>(50);

    // Sending Thread
    private SendBtMsgTask       SendingTask = null;
    private SendBtPackageTask   SendingTaskPckg = null;

    BluetoothController() {
        myBluetooth = BluetoothAdapter.getDefaultAdapter();
    }

    public boolean Connect(String address) {
        //Log.d("Bt", "kikoo");
        if(myBluetooth == null)
            myBluetooth = BluetoothAdapter.getDefaultAdapter();

        if (isBtConnected || btSocket != null)
            Disconnect();

        try
        {
            if (btSocket == null || !isBtConnected)
            {
                BluetoothDevice dispositivo = myBluetooth.getRemoteDevice(address);//connects to the device's address and checks if it's available
                btSocket = dispositivo.createInsecureRfcommSocketToServiceRecord(myUUID);//create a RFCOMM (SPP) connection
                BluetoothAdapter.getDefaultAdapter().cancelDiscovery();
                btSocket.connect();//start connection

                isBtConnected = true;

                InitReceiverThread();
                StartReceiverThread();

                /*int cnt = 50;
                do {
                    if (SendMsg("Hi")) {
                        String recv = waitNextMsg(10);
                        if (recv != null) {
                            return true;
                        }
                    }
                } while (cnt-- >= 0);*/
                //receiverThread.start();
                return true;
            }
        }
        catch (IOException e)
        {
            return false;
        }
        return false;
    }
    public boolean Disconnect() {
        isBtConnected = false;
        isRunning.set(false);

        if (ReceiverThread != null)// && ReceiverThread.getState() == Thread.State.RUNNABLE)
            try {
                ReceiverThread.join(100);
            } catch (InterruptedException e) {

            }

        if (btSocket != null) //If the btSocket is busy
        {
            try {
                btSocket.close(); //close connection
                btSocket= null;
            }
            catch (IOException e)
            {
                return false;
            }
        }
        return true;
    }
    public boolean IsConnected() {
        return isBtConnected;
    }
    public void InitReceiverThread() {
        if (ReceiverThread != null)
            return ;
        ReceiverThread = new Thread(new Runnable() {
            Bundle messageBundle = new Bundle();
            Message myMessage;
            final int BUFFER_SIZE = 100;

            @Override
            public void run() {
                try {
                    String read = "";
                    byte buffer[] = new byte[BUFFER_SIZE];
                    int cnt = 0;

                    //Log.d("Bt", "Starting Thread");
                    while (isRunning.get()) {
                        while (isPausing.get() && (isRunning.get())) {
                            Thread.sleep(200);
                        }
                        //"Bt", "Loop");

                        if(btSocket.getInputStream().available() > 0) {
                            //Log.d("Btmsg", "There is something to read !!");
                            //Log.d("Btmsg", btSocket.getInputStream().available()+" Bytes !");
                            cnt = 0;
                            do {
                                cnt = btSocket.getInputStream().read(buffer, 0, BUFFER_SIZE);
                                if (cnt > 0)
                                    read = read.concat(new String(buffer, 0, cnt));
                            } while (cnt >=  BUFFER_SIZE);

                            //Log.d("Btmsg", "I read : '"+read+"'");

                            try {
                                while (read.length() >= 12) {
                                    byte[] tmp = read.getBytes();
                                    ByteBuffer bb = ByteBuffer.wrap(tmp);

                                    if (bb.get() != MAGIC) {
                                        read = read.substring(1);
                                        //Log.d("Btmsg", "BadMagic");
                                        continue;
                                    }
                                    int num = bb.getInt();
                                    byte op = bb.get();
                                    int size = bb.getInt();

                                    byte[] blob = null;
                                    if (size != 0) {
                                        blob = new byte[size];
                                        bb.get(blob);
                                    }

                                    short checksum = bb.getShort();
                                    read = read.substring(12+size);
                                    BtPackage test = new BtPackage(num, op, size, blob, checksum);
                                    if (checksum != test.computeChecksum()) {
                                        //Log.d("Btmsg", "Bad ChecSum "+checksum+"="+test.computeChecksum());
                                        continue;
                                    }

                                    //Log.d("Btmsg", "Succes Message n°"+test.getNum());
                                    myMessage = handler.obtainMessage();
                                    //Ajouter des données à transmettre au Handler via le Bundle
                                    messageBundle.putSerializable(BT_STRING_MSG, test);
                                    //messageBundle.putString(BT_STRING_MSG, complete);
                                    //Ajouter le Bundle au message
                                    myMessage.setData(messageBundle);
                                    //Envoyer le message
                                    handler.sendMessage(myMessage);
                                    //Log.d("Btmsg", "I send : '"+complete+"'");
                                    //Log.d("Btmsg", "I still have : '"+read+"'");
                                }
                            }
                            catch (BufferUnderflowException t) {
                                Log.d("Btmsg", "Bad Size");
                                // wait to receve the end
                            }
                        }

                        Thread.sleep(10);
                    }
                } catch (Throwable t) {
                    // gérer l’exception et arrêter le traitement
                }
            }
        });
    }
    public void StartReceiverThread() {
        if (!IsConnected())
            return ;
        isRunning.set(true);
        isPausing.set(false);
        if (ReceiverThread.getState() != Thread.State.RUNNABLE)
            ReceiverThread.start();
    }
    public boolean SendMsg(String msg) {
        if (!IsConnected() || isSending())
            return false;
        SendingTask = new SendBtMsgTask();
        SendingTask.execute(msg);
        return true;
    }
    public boolean SendPackage(BtPackage msg) {
        if (!IsConnected() || isSending())
            return false;
        msg.setNum(PACKAGE_NUM);
        PACKAGE_NUM++;
        SendingTaskPckg = new SendBtPackageTask();
        SendingTaskPckg.execute(msg);
        return true;
    }
    public boolean isSending() {
        return (SendingTask != null && SendingTask.getStatus() == AsyncTask.Status.RUNNING) || (SendingTaskPckg != null && SendingTaskPckg.getStatus() == AsyncTask.Status.RUNNING);
    }
    public boolean getLastMsgStatus() {
        return !IsLastMsgFail;
    }
    public BtPackage getNextMsg() {
        return !IsConnected() ? null : WaitingMsg.poll();
    }
    public BtPackage waitNextMsg(long timeout) { // Timeout in MilliSeconds
        if (!IsConnected())
            return null;

        try {
            return WaitingMsg.poll(timeout, TimeUnit.MILLISECONDS);
        } catch (InterruptedException e) {
            return null;
        }
    }
    public boolean isBtEnabled() {
        return myBluetooth == null ? false : myBluetooth.isEnabled();
    }
    public Set<BluetoothDevice> GetPairedDeviceList() {
        return myBluetooth == null ? null : myBluetooth.getBondedDevices();
    }

    public static String getMD5EncryptedString(byte[] encTarget){
        MessageDigest mdEnc = null;
        try {
            mdEnc = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            System.out.println("Exception while encrypting to md5");
            e.printStackTrace();
        } // Encryption algorithm
        mdEnc.update(encTarget, 0, encTarget.length);
        String md5 = new BigInteger(1, mdEnc.digest()).toString(16);
        while ( md5.length() < 32 ) {
            md5 = "0"+md5;
        }
        return md5;
    }
    public static String stringfyByteArray(byte[] a) {
        if (a == null)
            return "NULL";
        String res = "length = "+a.length+" / data = ";
        for (int index = 0; index < a.length; index++)
            res = res.concat(String.format("0x%x ", a[index]));
        return res;
    }

    public boolean SendFile(String path) {
        Log.d("BtSendFile", path);
        int MAX_BLOB_SIZE = 200;

        try {
            File tosend = new File(path);
            Log.d("BtSendFile", "size:"+tosend.length());
            FileInputStream file = new FileInputStream(tosend);
            byte[] buff = new byte[(int)tosend.length()];
            file.read(buff);
            String data = tosend.getName()+"/"+tosend.length()+"/"+getMD5EncryptedString(buff);

            SendPackage(new BtPackage((byte)4, data.length(), data.getBytes())); // Send Request File

            Thread.sleep(10);
            BtPackage pckg = waitNextMsg(2000);// Thread.sleep(10); } while (pckg == null);
            Log.d("BtSendFile", "Out");
            if (pckg == null)
                Log.d("BtSendFile", "Première");

            //else if (pckg.getOpCode() == (byte)6){
            //    Log.d("BtSendFile", "Deuxieme");
            //    return true;
            //}
            Log.d("BtSendFile", "Here");

            BtPackage[] pckglist = new BtPackage[(int)Math.ceil((double)buff.length / (double)MAX_BLOB_SIZE)];
            for (int i = 0; i < pckglist.length; i++) {
                byte[] blob = Arrays.copyOfRange(buff, i*MAX_BLOB_SIZE, (i+1 == pckglist.length ? i*MAX_BLOB_SIZE + (buff.length % MAX_BLOB_SIZE) : (i+1)*MAX_BLOB_SIZE));
                Log.d("BtSendFile", "Package n°"+(PACKAGE_NUM+1)+" - "+stringfyByteArray(blob));
                pckglist[i] = new BtPackage(PACKAGE_NUM++, (byte)7, blob.length, blob.clone(), (short)0);
            }

            SendingTaskPckg = new SendBtPackageTask();
            SendingTaskPckg.execute(pckglist);


        } catch (Exception e) {
            e.printStackTrace();
            Log.d("BtSendFile", "Fail...");
        }
        return true;
    }

    private class SendBtMsgTask extends AsyncTask<String, Void, Boolean> {
        @Override
        protected Boolean doInBackground(String... msgs) {
            int count = msgs.length;
            for (int i = 0; i < count; i++) {
                try {
                    btSocket.getOutputStream().write(msgs[i].getBytes());
                } catch (IOException e) {
                    return false;
                }
            }

            return true;
        }

        @Override
        protected void onPostExecute(Boolean result) {
            IsLastMsgFail = !result;
        }
    }

    private class SendBtPackageTask extends AsyncTask<BtPackage, Void, Boolean> {
        @Override
        protected Boolean doInBackground(BtPackage... pcks) {
            int count = pcks.length;
            for (int i = 0; i < count; i++) {
                try {
                    Log.d("BtSendFile", "Package n°"+(pcks[i].getNum())+" - "+stringfyByteArray(pcks[i].getBlob()));
                    btSocket.getOutputStream().write(pcks[i].finalPacking());
                    Log.d("Checksum", pcks[i].getNum()+"/"+pcks[i].getChecksum());
                    Thread.sleep(1000);
                } catch (IOException e) {
                    return false;
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }

            return true;
        }

        @Override
        protected void onPostExecute(Boolean result) {
            IsLastMsgFail = !result;
        }
    }

    public static class BtPackage implements java.io.Serializable  {
        protected byte mOpCode;
        protected int mSize;
        protected byte[] mBlob;
        protected short mChecksum;
        protected int mNum;

        public BtPackage(byte opcode) {
            init(0, opcode, 0, null, (short)0);
        }

        public BtPackage(byte opcode, int size, byte[] blob) {
            init(0, opcode, size, blob, (short)0);
        }

        public BtPackage(int num, byte opcode, int size, byte[] blob, short checksum) {
            init(num, opcode, size, blob, checksum);
        }

        public void init(int num, byte opcode, int size, byte[] blob, short checksum) {
            mNum = num;
            mOpCode = opcode;
            mSize = size;
            mBlob = blob;
            mChecksum = checksum;
        }

        public byte[] computePackage() {
            byte[] header = new byte[10 + mSize];
            ByteBuffer buff = ByteBuffer.wrap(header);
            //buff.setOrder(ByteOrder.BIG_ENDIAN);
            buff.put(BluetoothController.MAGIC);
            buff.putInt(mNum);
            buff.put(mOpCode);
            buff.putInt(mSize);
            if (mSize != 0 && mBlob != null)
                buff.put(mBlob);

            return header;
        }

        public byte[] finalPacking() {
            byte[] header = computePackage();
            mChecksum = computeChecksum(header);
            byte[] pckg = new byte[header.length + 2];
            ByteBuffer buff = ByteBuffer.wrap(pckg);
            buff.put(header);
            buff.putShort(mChecksum);
            return pckg;
        }

        public static short computeChecksum(byte[] header) {
            short checksum = 0;

            for (int i = 0; i < header.length; i++)
                checksum += (short)(header[i] & 0xFF);

            return checksum;
        }

        public short computeChecksum() {
            return computeChecksum(computePackage());
        }

        public byte getOpCode() { return mOpCode; }
        public void setOpCode(byte OpCode) { mOpCode = OpCode; }
        public int getSize() { return mSize; }
        public void setSize(int Size) { mSize = Size; }
        public byte[] getBlob() { return mBlob; }
        public void setBlob(byte[] Blob) { mBlob = Blob; }
        public short getChecksum() { return mChecksum; }
        public void setChecksum(short Checksum) { mChecksum = Checksum; }
        public int getNum() { return mNum; }
        public void setNum(int Num) { mNum = Num; }

    }
}