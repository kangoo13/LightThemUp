import MCP230xx
import RPi.GPIO as GPIOO
import time

tab = [4, 5, 6, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]
GPIOO.setmode(GPIOO.BCM)
for s in tab:
	GPIOO.setup(tab, GPIOO.OUT)

mcp = MCP23017(busnum = 1, address = 0x20)
# Use busnum = 1 for new Raspberry Pi's (512MB with mounting holes)
# mcp = Adafruit_MCP230XX(busnum = 1, address = 0x20, num_gpios = 16)
 
# Set pins 0, 1 and 2 to output (you can set pins 0..15 this way)

mcp.setup(0, GPIO.OUT)
mcp.output(0, 1)
while True:
	print "test"
	time.sleep(0.05)
        for s in tab:
                GPIOO.output(s, 1)
		time.sleep(0.05)
	time.sleep(0.05)
	for s in tab:
        	GPIOO.output(s, 0)
		time.sleep(0.05)
	time.sleep(0.05)
