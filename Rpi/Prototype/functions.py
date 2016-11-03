import midi
import sys
import time
import RPi.GPIO as GPIOO
from MCP230xx import MCP23017
import pygame

tCobblerPorts = [4, 5, 6, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]

def setupLeds(pygame):
    print "Initialisetion du setup des leds"
    pygame.init()
    GPIOO.setmode(GPIOO.BCM)
    for led in tCobblerPorts:
        GPIOO.setup(led, GPIOO.OUT)
    for x in range(0, 16):
        mcp20.setup(x, GPIO.OUT)
    for x in range(0, 16):
        mcp27.setup(x, GPIO.OUT)

def readSong():
    pattern = midi.read_midifile(sys.argv[2])
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
                note = notes[num - octave*12]
                tab.append([octave,note,pattern[i][j].tick+off])
            off = 0
            if type(pattern[i][j]) == midi.events.NoteOffEvent:
                off = pattern[i][j].tick
            j = j+1
        i = i+1
    return tab

def setAllLedsValue(value):
    print "Mise des leds sur valeur "+ value
    for led in tCobblerPorts:
        GPIOO.output(led, value)
    for x in range(0, 16):
        mcp20.output(x, value)
    for x in range(0, 16):
        mcp27.output(x, value)

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

def initMatrixNotes():
    print "Initialisation du son des notes a jouer"
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

def initMatrixLedsCorresp():
    print "Initialisation de la matrice de correspondance des leds"
    oct = int(sys.argv[1])
    Matrix[oct][0] = "GPIOO 4"
    Matrix[oct][1] = "GPIOO 5"
    Matrix[oct][2] = "GPIOO 6"
    Matrix[oct][3] = "GPIOO 12"
    Matrix[oct][4] = "GPIOO 13"
    Matrix[oct][5] = "GPIOO 16"
    Matrix[oct][6] = "GPIOO 17"
    Matrix[oct][7] = "GPIOO 18"
    Matrix[oct][8] = "GPIOO 19"
    Matrix[oct][9] = "GPIOO 20"
    Matrix[oct][10] = "GPIOO 21"
    Matrix[oct][11] = "GPIOO 22"
    Matrix[oct+1][0] = "GPIOO 23"
    Matrix[oct+1][1] = "GPIOO 24"
    Matrix[oct+1][2] = "GPIOO 25"
    Matrix[oct+1][3] = "GPIOO 26"
    Matrix[oct+1][4] = "GPIOO 27"
    Matrix[oct+1][5] = "mcp20 0"
    Matrix[oct+1][6] = "mcp20 1"
    Matrix[oct+1][7] = "mcp20 2"
    Matrix[oct+1][8] = "mcp20 3"
    Matrix[oct+1][9] = "mcp20 4"
    Matrix[oct+1][10] = "mcp20 5"
    Matrix[oct+1][11] = "mcp20 6"
    Matrix[oct+2][0] = "mcp20 7"
    Matrix[oct+2][1] = "mcp20 8"
    Matrix[oct+2][2] = "mcp20 9"
    Matrix[oct+2][3] = "mcp20 10"
    Matrix[oct+2][4] = "mcp20 11"
    Matrix[oct+2][5] = "mcp20 12"
    Matrix[oct+2][6] = "mcp20 13"
    Matrix[oct+2][7] = "mcp20 14"
    Matrix[oct+2][8] = "mcp20 15"
    Matrix[oct+2][9] = "mcp20 16"
    Matrix[oct+2][10] = "mcp27 0"
    Matrix[oct+2][11] = "mcp27 1"

def playIt(splitted, ticks, any):
    any.output(int(splitted[1]), 1)
    if ticks != 0 and ticks is not "0":
        time.sleep(ticks / 1000.0)
    any.output(int(splitted[1]), 0)

def playNote(ticks, splitted):
    if splitted[0] == "GPIOO":
        playIt(splitted, ticks, GPIOO)
    elif splitted[0] == "mcp20":
        playIt(splitted, ticks, mcp20)
    elif splitted[0] == "mcp27":
        playIt(splitted, ticks, mcp27)
