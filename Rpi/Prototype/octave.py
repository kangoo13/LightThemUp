from MCP230xx import MCP23017
import Adafruit_GPIO as GPIO
import pygame
import sys
import midi
import time
from math import *
import RPi.GPIO as GPIOO

def readSongDoubleNote():
    pattern = midi.read_midifile(sys.argv[1])
    notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]
    tab = []
    i=1
    end = len(pattern)
    off = 0
    while i<end:
        j=0
        fin = len(pattern[i])
        while j < fin:
            if type(pattern[i][j]) == midi.events.NoteOnEvent:
                num = pattern[i][j].data[0]
                octave = int(floor(num/12))
                #print type(octave)
                note = notes[num - octave*12]
                if pattern[i][j].tick+off != 0 or len(tab) == 0:
                    tab.append([octave,note,pattern[i][j].tick+off])
                else :
                    tab[-1].append([octave,note,0])
            off = 0
            if type(pattern[i][j]) == midi.events.NoteOffEvent:
                off = pattern[i][j].tick
            j = j+1
        i = i+1
    return tab

print readSongDoubleNote()