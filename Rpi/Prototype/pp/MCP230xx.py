# Copyright (c) 2014 Adafruit Industries
# Author: Tony DiCola
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
import math

import Adafruit_GPIO as GPIO
import RPi.GPIO as GPIOO
import time
import Adafruit_GPIO.I2C as I2C


class MCP230xxBase(GPIO.BaseGPIO):
    """Base class to represent an MCP230xx series GPIO extender.  Is compatible
    with the Adafruit_GPIO BaseGPIO class so it can be used as a custom GPIO
    class for interacting with device.
    """

    def __init__(self, address, i2c=None, **kwargs):
        """Initialize MCP230xx at specified I2C address and bus number.  If bus
        is not specified it will default to the appropriate platform detected bus.
        """
        # Create I2C device.
        if i2c is None:
            import Adafruit_GPIO.I2C as I2C
            i2c = I2C
        self._device = i2c.get_i2c_device(address, **kwargs)
        # Assume starting in ICON.BANK = 0 mode (sequential access).
        # Compute how many bytes are needed to store count of GPIO.
        self.gpio_bytes = int(math.ceil(self.NUM_GPIO/8.0))
        # Buffer register values so they can be changed without reading.
        self.iodir = [0x00]*self.gpio_bytes  # Default direction to all inputs.
        self.gppu = [0x00]*self.gpio_bytes  # Default to pullups disabled.
        self.gpio = [0x00]*self.gpio_bytes
        # Write current direction and pullup buffer state.
        self.write_iodir()
        self.write_gppu()


    def setup(self, pin, value):
        """Set the input or output mode for a specified pin.  Mode should be
        either GPIO.OUT or GPIO.IN.
        """
        self._validate_pin(pin)
        # Set bit to 1 for input or 0 for output.
        if value == GPIO.IN:
            self.iodir[int(pin/8)] |= 1 << (int(pin%8))
        elif value == GPIO.OUT:
            self.iodir[int(pin/8)] &= ~(1 << (int(pin%8)))
        else:
            raise ValueError('Unexpected value.  Must be GPIO.IN or GPIO.OUT.')
        self.write_iodir()


    def output(self, pin, value):
        """Set the specified pin the provided high/low value.  Value should be
        either GPIO.HIGH/GPIO.LOW or a boolean (True = HIGH).
        """
        self.output_pins({pin: value})

    def output_pins(self, pins):
        """Set multiple pins high or low at once.  Pins should be a dict of pin
        name to pin value (HIGH/True for 1, LOW/False for 0).  All provided pins
        will be set to the given values.
        """
        [self._validate_pin(pin) for pin in pins.keys()]
        # Set each changed pin's bit.
        for pin, value in iter(pins.items()):
            if value:
                self.gpio[int(pin/8)] |= 1 << (int(pin%8))
            else:
                self.gpio[int(pin/8)] &= ~(1 << (int(pin%8)))
        # Write GPIO state.
        self.write_gpio()


    def input(self, pin):
        """Read the specified pin and return GPIO.HIGH/True if the pin is pulled
        high, or GPIO.LOW/False if pulled low.
        """
        return self.input_pins([pin])[0]

    def input_pins(self, pins):
        """Read multiple pins specified in the given list and return list of pin values
        GPIO.HIGH/True if the pin is pulled high, or GPIO.LOW/False if pulled low.
        """
        [self._validate_pin(pin) for pin in pins]
        # Get GPIO state.
        gpio = self._device.readList(self.GPIO, self.gpio_bytes)
        # Return True if pin's bit is set.
        return [(gpio[int(pin/8)] & 1 << (int(pin%8))) > 0 for pin in pins]


    def pullup(self, pin, enabled):
        """Turn on the pull-up resistor for the specified pin if enabled is True,
        otherwise turn off the pull-up resistor.
        """
        self._validate_pin(pin)
        if enabled:
            self.gppu[int(pin/8)] |= 1 << (int(pin%8))
        else:
            self.gppu[int(pin/8)] &= ~(1 << (int(pin%8)))
        self.write_gppu()

    def write_gpio(self, gpio=None):
        """Write the specified byte value to the GPIO registor.  If no value
        specified the current buffered value will be written.
        """
        if gpio is not None:
            self.gpio = gpio
        self._device.writeList(self.GPIO, self.gpio)

    def write_iodir(self, iodir=None):
        """Write the specified byte value to the IODIR registor.  If no value
        specified the current buffered value will be written.
        """
        if iodir is not None:
            self.iodir = iodir
        self._device.writeList(self.IODIR, self.iodir)

    def write_gppu(self, gppu=None):
        """Write the specified byte value to the GPPU registor.  If no value
        specified the current buffered value will be written.
        """
        if gppu is not None:
            self.gppu = gppu
        self._device.writeList(self.GPPU, self.gppu)


class MCP23017(MCP230xxBase):
    """MCP23017-based GPIO class with 16 GPIO pins."""
    # Define number of pins and registor addresses.
    NUM_GPIO = 16
    IODIR    = 0x00
    GPIO     = 0x12
    GPPU     = 0x0C

    def __init__(self, address=0x20, **kwargs):
        super(MCP23017, self).__init__(address, **kwargs)


class MCP23008(MCP230xxBase):
    """MCP23008-based GPIO class with 8 GPIO pins."""
    # Define number of pins and registor addresses.
    NUM_GPIO = 8
    IODIR    = 0x00
    GPIO     = 0x09
    GPPU     = 0x06

    def __init__(self, address=0x20, **kwargs):
        super(MCP23008, self).__init__(address, **kwargs)

import pygame
pygame.init()
print "Lancement ! Merci de verifier que toutes les leds marchent afin de continuer"
tab = [4, 5, 6, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]
GPIOO.setmode(GPIOO.BCM)
for s in tab:
        GPIOO.setup(tab, GPIOO.OUT)
	GPIOO.output(s, 1)

mcp20 = MCP23017(busnum = 1, address = 0x20)
mcp27 = MCP23017(busnum = 1, address = 0x27)
for x in range(0, 16):
	mcp20.setup(x, GPIO.OUT)
	mcp20.output(x, 1)
for x in range(0, 16):
	mcp27.setup(x, GPIO.OUT)
	mcp27.output(x, 1)
raw_input("Appuyez sur entree, pour continuer...")
print "C est parti!"
for s in tab:
        GPIOO.output(s, 0)
for x in range(0, 16):
        mcp20.output(x, 0)
for x in range(0, 16):
        mcp27.output(x, 0)
#while True:
#        print "test"
 #       time.sleep(0.05)
  #      for s in tab:
   #             GPIOO.output(s, 1)
    #            time.sleep(0.05)
     #   time.sleep(0.05)
#	for x in range(0, 16):
#		mcp20.output(x, 1)
#		time.sleep(0.05)
#	time.sleep(0.05)
#	for x in range(0,3):
#		mcp27.output(x, 1)
#		time.sleep(0.05)
#	time.sleep(0.05)
 #       for s in tab:
  #              GPIOO.output(s, 0)
    #            time.sleep(0.05)
   #    time.sleep(0.05)
    #    for x in range(0, 16):
     #           mcp20.output(x, 0)
      #          time.sleep(0.05)
       # time.sleep(0.05)
        #for x in range(0,3):
         #       mcp27.output(x, 0)
          #      time.sleep(0.05)
       # time.sleep(0.05)

import struct
import sys
print("Lecture fichier MIDI")
#ouvetrure fichier
k, p = 12, 8
MatrixNote = [["notofund" for x in range(k)] for y in range(p)]
MatrixNote[3][0] = "./note/16_piano-med-c3.ogg"
MatrixNote[3][1] = "./note/16_piano-med-db3.ogg"
MatrixNote[3][2] = "./note/16_piano-med-d3.ogg"
MatrixNote[3][3] = "./note/16_piano-med-eb3.ogg"
MatrixNote[3][4] = "./note/16_piano-med-e3.ogg"
MatrixNote[3][5] = "./note/16_piano-med-f3.ogg"
MatrixNote[3][6] = "./note/16_piano-med-gb3.ogg"
MatrixNote[3][7] = "./note/16_piano-med-g3.ogg"
MatrixNote[3][8] = "./note/16_piano-med-ab3.ogg"
MatrixNote[3][9] = "./note/16_piano-med-a3.ogg"
MatrixNote[3][10] = "./note/16_piano-med-bb3.ogg"
MatrixNote[3][11] = "./note/16_piano-med-b3.ogg"

MatrixNote[4][0] = "./note/16_piano-med-c4.ogg"
MatrixNote[4][1] = "./note/16_piano-med-db4.ogg"
MatrixNote[4][2] = "./note/16_piano-med-d4.ogg"
MatrixNote[4][3] = "./note/16_piano-med-eb4.ogg"
MatrixNote[4][4] = "./note/16_piano-med-e4.ogg"
MatrixNote[4][5] = "./note/16_piano-med-f4.ogg"
MatrixNote[4][6] = "./note/16_piano-med-gb4.ogg"
MatrixNote[4][7] = "./note/16_piano-med-g4.ogg"
MatrixNote[4][8] = "./note/16_piano-med-ab4.ogg"
MatrixNote[4][9] = "./note/16_piano-med-a4.ogg"
MatrixNote[4][10] = "./note/16_piano-med-bb4.ogg"
MatrixNote[4][11] = "./note/16_piano-med-b4.ogg"

MatrixNote[5][0] = "./note/16_piano-med-c5.ogg"
MatrixNote[5][1] = "./note/16_piano-med-db5.ogg"
MatrixNote[5][2] = "./note/16_piano-med-d5.ogg"
MatrixNote[5][3] = "./note/16_piano-med-eb5.ogg"
MatrixNote[5][4] = "./note/16_piano-med-e5.ogg"
MatrixNote[5][5] = "./note/16_piano-med-f5.ogg"
MatrixNote[5][6] = "./note/16_piano-med-gb5.ogg"
MatrixNote[5][7] = "./note/16_piano-med-g5.ogg"
MatrixNote[5][8] = "./note/16_piano-med-ab5.ogg"
MatrixNote[5][9] = "./note/16_piano-med-a5.ogg"
MatrixNote[5][10] = "./note/16_piano-med-bb5.ogg"
MatrixNote[5][11] = "./note/16_piano-med-b5.ogg"
MatrixNote[6][0] = "./note/c6.ogg"
MatrixNote[6][1] = "./note/c#6.ogg"
MatrixNote[6][2] = "./note/d6.ogg"
MatrixNote[6][3] = "./note/d#6.ogg"
MatrixNote[6][4] = "./note/e6.ogg"
MatrixNote[6][5] = "./note/f6.ogg"
MatrixNote[6][6] = "./note/f#6.ogg"
MatrixNote[6][7] = "./note/g6.ogg"
MatrixNote[6][8] = "./note/g#6.ogg"
MatrixNote[6][9] = "./note/a6.ogg"
MatrixNote[6][10] = "./note/a#6.ogg"
MatrixNote[6][11] = "./note/b6.ogg"

w, h = 16, 8
tab = [4, 5, 6, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]
Matrix = [["OK " for x in range(w)] for y in range(h)] 
i = 0
Matrix[4][0] = "GPIOO 4"
Matrix[4][1] = "GPIOO 5"
Matrix[4][2] = "GPIOO 6"
Matrix[4][3] = "GPIOO 12"
Matrix[4][4] = "GPIOO 13"
Matrix[4][5] = "GPIOO 16"
Matrix[4][6] = "GPIOO 17"
Matrix[4][7] = "GPIOO 18"
Matrix[4][8] = "GPIOO 19"
Matrix[4][9] = "GPIOO 20"
Matrix[4][10] = "GPIOO 21"
Matrix[4][11] = "GPIOO 22"
Matrix[5][0] = "GPIOO 23"
Matrix[5][1] = "GPIOO 24"
Matrix[5][2] = "GPIOO 25"
Matrix[5][3] = "GPIOO 26"
Matrix[5][4] = "GPIOO 27"
Matrix[5][5] = "mcp20 0"
Matrix[5][6] = "mcp20 1"
Matrix[5][7] = "mcp20 2"
Matrix[5][8] = "mcp20 3"
Matrix[5][9] = "mcp20 4"
Matrix[5][10] = "mcp20 5"
Matrix[5][11] = "mcp20 6"
Matrix[6][0] = "mcp20 7"
Matrix[6][1] = "mcp20 8"
Matrix[6][2] = "mcp20 9"
Matrix[6][3] = "mcp20 10"
Matrix[6][4] = "mcp20 11"
Matrix[6][5] = "mcp20 12"
Matrix[6][6] = "mcp20 13"
Matrix[6][7] = "mcp20 14"
Matrix[6][8] = "mcp20 15"
Matrix[6][9] = "mcp20 16"
Matrix[6][10] = "mcp27 0"
Matrix[6][11] = "mcp27 1"
fichier = open("for.mid", "rb")
def getNoteNumber(x):
    return {
        'C': 0,
        'C#': 1,
	'D': 2,
	'D#': 3,
	'E': 4,
	'F': 5,
	'F#': 6,
	'G': 7,
	'G#': 8,
	'A': 9,
	'A#': 10,
	'B': 11
    }[x]
try:
	notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]
	i = 0
	while True:
		bytes = fichier.read(1) # read the next /byte/
		if bytes == "":	#Condition de fin
			break;
		i = i + 1
		#convertion byte en char pour comparaison
		num = struct.unpack("c", bytes)
		if 	num[0] == '\x90':
			#recuperation note
			bytes = fichier.read(1)
			num = struct.unpack("c", bytes)
			#convertion byte en char puis en int pour calculs
			byte = ord(num[0])
			#calcule de la note
			octave = byte / 12
			j = byte - octave * 12
			note = notes[j];
			#ICI Le tuple octave/note a utiliser <-----------
			tuple = (octave, note)
                        print "note = ",note," number : ",getNoteNumber(note),"octave : ", octave
			splitted = Matrix[octave][getNoteNumber(note)].split()
			if splitted[0] == "GPIOO":
				if MatrixNote[octave][getNoteNumber(note)] != "notofund":
					pygame.mixer.Sound(MatrixNote[octave][getNoteNumber(note)]).play(0, 500, 0) 
				time.sleep(0.20)
        			GPIOO.output(int(splitted[1]), 1)
				time.sleep(0.10)
				GPIOO.output(int(splitted[1]), 0)
			elif splitted[0] == "mcp20":
				if MatrixNote[octave][getNoteNumber(note)] != "notofund":
                                        pygame.mixer.Sound(MatrixNote[octave][getNoteNumber(note)]).play(0, 500, 0)
				time.sleep(0.20)
				mcp20.output(int(splitted[1]), 1)
                                time.sleep(0.10)				
				mcp20.output(int(splitted[1]), 0)
			elif splitted[0] == "mcp27":
				if MatrixNote[octave][getNoteNumber(note)] != "notofund":
                                        pygame.mixer.Sound(MatrixNote[octave][getNoteNumber(note)]).play(0, 500, 0)
                                time.sleep(0.20)
                                mcp27.output(int(splitted[1]), 1)
                                time.sleep(0.10) 
                                mcp27.output(int(splitted[1]), 0)
except IOError:
	# error here
	print("Erreure dans la lecture du fichier MIDI")
	pass
finally:
    fichier.close()
#input("Appuyez sur ENTREE pour terminer le programme.")
