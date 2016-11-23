import serial
import sys
from threading import Thread
import time
import Queue
import os
import hashlib

import binascii


# paquet

# +-------+------------+--------+------+------+---------+
# | magic | num paquet | opcode | size | data | checsum |
# +-------+------------+--------+------+------+---------+
# | char  | uint       | char   | uint | blob | short   |
# +-------+------------+--------+------+------+---------+

def build(var):
	res = 0
	for x in var:
		res = res << 8
		res += ord(x)
	return res

def buildRev(var, octect):
	res = ""
	for x in range(octect):
		res += chr(var & 0b11111111)
		var = var >> 8
	return res[::-1]

def calc_checksum(var):
	mask8 = 0b11111111
	mask16 = 0b1111111111111111

	res = 0
	for x in var:
		res = mask16 & (res + (ord(x) & mask8))

	if ord(var[0]) & 0b10000000:
		res -= pow(2, len(var)*8)

	return res;

NUM_PACKAGE = 0

class BTRecvThread(Thread):

	def __init__(self, btsock):
		Thread.__init__(self)
		self.btsock = btsock;
		self.is_running = True

	def run(self):
		pckgState = False;
		req = '';
		while self.is_running:
			req += self.btsock.read()

			while len(req) >= 12: # while there is enough byte to make a package
				magic = ord(req[0])
				if magic != Package.MAGIC:
					req = req[1:]
					continue

				num = build(req[1:5])
				op = ord(req[5])
				size = build(req[6:10])
				if len(req) < 12+size:
					break # wait to recev the whole package

				blob = None
				if (size > 0):
					blob = req[10:10+size]
				checsum = build(req[10+size:12+size])
				checkchecksum = calc_checksum(req[:10+size])
				print "Package rcv : "+str(magic)+", "+str(num)+", "+str(op)+", "+str(size)+", "+str(checsum)+"="+str(calc_checksum(req[:10+size]))
				save = req[:10+size]
				req = req[12+size:] # erase read data

				if checkchecksum != checsum: # if corrupt package
					# f = open('./tmp/pckg'+str(num), "w")
					# f.write(save)
					# f.close()
					print "exit"
					continue # send back corrupt packadge ?

				pckg = Package(op, size, blob, num, checsum)
				pckgState = True;

				# print type(req)
				# req = binascii.hexlify(req[:12+size])
				# req = " ".join(binascii.hexlify(req[:12+size])[i:i+2] for i in range(0, len(binascii.hexlify(req[:12+size])), 2))



			#if (len(req) > 0):
			if pckgState:
				pckgState = False
				self.btsock.put_message(pckg)
			else:
				time.sleep(0.01)

	def stop(self):
		self.is_running = False


class BluetoothSock:
	
	def __init__(self, term='/dev/ttyAMA0', baudrate=9600):
		self.recev = Queue.Queue()
		self.recevThread = BTRecvThread(self)
		if not self.connect(term, baudrate):
		#	raise IOError("could not connect")
			pass

	def connect(self, term='/dev/ttyAMA0', baudrate=9600):
		self.serial = serial.Serial(port=term, baudrate=baudrate, parity=serial.PARITY_NONE, stopbits=serial.STOPBITS_ONE, bytesize=serial.EIGHTBITS, timeout=0.01)#term, baudrate, timeout=1)
		try:
			return self.serial.is_open()
		except:
			return False

	def startRecevThread(self):
		self.recevThread.start()

	def stopRecevThread(self):
		self.recevThread.stop()

	def reconnect(self):
		for i in range(10) :
			try:
				self.serial.close()
			except:
				pass

			if not(self.serial.isOpen()):
				break

		try:
			if not self.serial.isOpen():
				return self.connect(self.serial.port, self.serial.baudrate)
		except:
			return False

		for i in range(10) :
			try:
				self.serial.open()
			except:	
				pass

			if self.serial.is_open():
				return True

		return False

	def if_except_catch_reco(self):
		print ("Unexpected error:", sys.exc_info()[0])
		if not self.reconnect():
			raise IOError("Fail to reconnect")

	def write(self, pckg):
		try:
			if isinstance(pckg, Package):
				print 'lol: ',pckg
				self.serial.write(pckg.finalBuild())
			else:
				print 'mdr: ',pckg
				self.serial.write(pckg)
			return True
		except:
			self.if_except_catch_reco()
			return False

	def read(self):
		try:
			return self.serial.read(100)
		except:
			self.if_except_catch_reco()
			return ""
	
	def count_message(self):
		return self.recev.qsize()

	def put_message(self, msg):
		self.recev.put(msg)

	def get_message(self):
		if not self.recev.empty():
			return self.recev.get()
		return ""

	def receve_file(self, downloadMidi, pckg):
		name, size, hash = pckg.blob.split("/")
		print "Starting leech of '", name, "'"
		size = int(size)
		if os.path.exists(downloadMidi+name):
			if os.path.getsize(downloadMidi+name) == size and hashlib.md5(open(downloadMidi+name, 'rb').read()).hexdigest() == hash:
				self.write(Package(6))
				return True
			else:
				os.remove(downloadMidi+name)
				#print os.path.getsize(downloadMidi+name), " == ", str(int(size)), " and ", hashlib.md5(open(downloadMidi+name, 'rb').read()).hexdigest(), " == ", hash
		if not os.path.exists(downloadMidi+name):
			self.write(Package(5))
			#print "size: ", size, ", md5: ", hash
			#Send Ready to receve

			filePckg = []
			filePckgnum = []
			otherPckg = []
			fileSize = 0

			while True:
				if self.count_message() != 0:
					pckgf = self.get_message()
					print "Here We Gow <3"

					if pckgf.opcode != 7:
						print ":'("
						otherPckg.append(pckgf)
						continue

					if pckgf.num in filePckgnum:
						print "*pan*"
						continue

					filePckg.append(pckgf) 
					filePckgnum.append(pckgf)
					fileSize += pckgf.size

					#print type(fileSize),":",fileSize,"/",type(size),":",size
					print fileSize,"/",size

					if (fileSize >= size):
						filePckg.sort(key=lambda x: x.num, reverse=False)
						fileData = "".join([str(x.blob) for x in filePckg])


						f = open(downloadMidi+name, "w")
						f.truncate()
						f.write(fileData)
						f.close()

						if hashlib.md5(fileData).hexdigest() == hash:
							print "Succes" #write fille
							for x in otherPckg:
								self.put_message(x)
							self.write(Package(8))
							return True
						else:
							print hash, "!=", hashlib.md5(fileData).hexdigest()
							print ", ".join([str(x.num) for x in filePckg])
						return False
				else:
					time.sleep(0.01)

#class OpCode(Enum):
#	Ping = 1
#	Pong = 2
#	LedTest = 3
#	FileMetaData = 4
#	FileReadyToRcv = 5
#	FileAlreadyInStock = 6
#	FileContent = 7
#	FileRecev = 8
#	FileResendRequest = 9

def printBlob(var):
	return " ".join(binascii.hexlify(var)[i:i+2] for i in range(0, len(binascii.hexlify(var)), 2))

class Package:
	MAGIC = 42

	def __init__(self, opcode, size=0, blob=None, num=0, checsum=0):
		self.num = num
		self.opcode = opcode
		self.size = size
		self.blob = blob
		self.checsum = checsum

	def __str__(self):
		return ""#"Package number "+str(self.num)+", code "+str(self.opcode)+", "+str(self.size)+" bytes de data"+(" ("+printBlob(self.blob)+")" if self.size > 0 else "")+". Pour une somme de "+str(self.checsum)

	def finalBuild(self):
		global NUM_PACKAGE
		self.num = NUM_PACKAGE
		NUM_PACKAGE += 1
		request = '' + chr(self.MAGIC) + buildRev(self.num, 4) + chr(self.opcode) + buildRev(self.size, 4) + ("" if self.size == 0 else self.blob)
		self.checsum = calc_checksum(request)
		return str(request + buildRev(self.checsum, 2))