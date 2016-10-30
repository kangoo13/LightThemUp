import serial
import sys
from threading import Thread
import time
import Queue

class BTRecvThread(Thread):
	def __init__(self, btsock):
		Thread.__init__(self)
		self.btsock = btsock;
		self.is_running = True

	def run(self):
		while self.is_running:
			req = self.btsock.read()
			#print "rcv : '", req, "'"
			if (len(req) > 0):
				self.btsock.put_message(req)
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
		self.serial = serial.Serial(port=term, baudrate=baudrate, parity=serial.PARITY_NONE, stopbits=serial.STOPBITS_ONE, bytesize=serial.EIGHTBITS, timeout=0.2)#term, baudrate, timeout=1)
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

			#if not(self.serial.is_open()):
			#	break

		try:
			if self.serial.is_open():
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

	def write(self, str):
		try:
			self.serial.write(str)
			return True
		except:
			self.if_except_catch_reco()
			return False

	def read(self):
		try:
			return self.serial.readline().rstrip()
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