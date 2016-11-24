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
			print "Go Go Go"
			tps1 = time.clock()
			tp1 = time.time()
			name, size, hash = pckg.blob.split("/")
			if lol.receve_file(downloadMidi, pckg):
				print "Succeffuly get file:", name
			else:
				print "Fail to get file:", name
			print("Temps Ecoule : "+str(time.time() - tp1)+", Temps d'execution : "+str(time.clock() - tps1))

	else:
		time.sleep(0.01)
