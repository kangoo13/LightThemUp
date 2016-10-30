import BluetoothLib
import time

lol = BluetoothLib.BluetoothSock("/dev/ttyAMA0")
lol.startRecevThread();

while True:
	if lol.count_message() != 0:
		print "Message get : '"+lol.get_message()+"'"
	time.sleep(0.01)