import BluetoothLib
import time
import os
import hashlib

lol = BluetoothLib.BluetoothSock("/dev/ttyAMA0")
lol.startRecevThread();

downloadMidi = "./tmp/"

if not os.path.exists(downloadMidi):
    os.makedirs(downloadMidi)

while True:
	if lol.count_message() != 0:
		pckg = lol.get_message()
		print pckg

		if pckg.opcode == 4:
			name, size, hash = pckg.blob.split("/")
			if lol.receve_file(downloadMidi, pckg):
				print "Succeffuly get file:", name
			else:
				print "Fail to get file:", name

	else:
		time.sleep(0.01)