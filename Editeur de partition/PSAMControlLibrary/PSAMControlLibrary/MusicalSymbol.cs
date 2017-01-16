/*
Polish System for Archivising Music Control Library (PSAM Control Library)
http://www.archiwistykamuzyczna.pl/index.php?article=download&lang=en#psamcontrollibrary

Copyright (c) 2010, Jacek Salamon
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, 
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list
  of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list
  of conditions and the following disclaimer in the documentation and/or other
  materials provided with the distribution.
* Neither the name of Jacek Salamon nor the names of contributors may be used to
  endorse or promote products derived from this software without specific prior
  written permission.
 
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT
OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 

============================================================================================
Fugue Icons
Copyright (C) 2009 Yusuke Kamiyamane. All rights reserved.
The icons are licensed under a Creative Commons Attribution 3.0 license.
*/


using System;
using System.Collections.Generic;
using System.Drawing;

namespace PSAMControlLibrary
{
    #region Public enumeration types

    public enum MusicalSymbolType { Unknown, Clef, Note, Rest, Barline, Key, TimeSignature, Direction };
    public enum MusicalSymbolDuration : int { Whole = 1, Half = 2, Quarter = 4, Eighth = 8, Sixteenth = 16,
        d32nd = 32, d64th=64, d128th = 128, Unknown = 6};
    public enum ClefType { GClef, CClef, FClef };
    public enum NoteStemDirection { Up, Down };
    public enum NoteBeamType { Single, Start, Continue, End, ForwardHook, BackwardHook };
    public enum NoteTieType { None, Start, Stop, StopAndStartAnother };
    public enum TupletType { None, Start, Stop };
    public enum LyricsType { None, Begin, Middle, End , Single};
    public enum ArticulationType { None, Staccato, Accent };
    public enum ArticulationPlacementType { Above, Below };
    public enum DirectionPlacementType { Above, Below, Custom };
    public enum TimeSignatureType { Common, Cut, Numbers };
    public enum NoteTrillMark { None, Above, Below };
    public enum NoteSlurType { None, Start, Stop };
    public enum RepeatSignType { None, Forward, Backward };

    #endregion

    #region MusicalCharacters static class

    public static class MusicalCharacters
    {
        public const string Staff5Lines = "=";
        public const string Staff4Lines = "_";
        public const string GClef = "G";
        public const string FClef = "?";
        public const string CClef = "K";
        public const string Sharp = "X";
        public const string Flat = "b";
        public const string Natural = "k";
        public const string DoubleSharp = "x";
        public const string DoubleFlat = "B";
        public const string WholeNote = "w";
        public const string HalfNote = "h";
        public const string QuarterNote = "q";
        public const string EighthNote = "e";
        public const string SixteenthNote = "s";
        public const string WholeRest = "W";
        public const string HalfRest = "H";
        public const string QuarterRest = "Q";
        public const string EighthRest = "E";
        public const string SixteenthRest = "S";
        public const string WhiteNoteHead = "9";
        public const string BlackNoteHead = "0";
        public const string NoteFlagEighth = "1";
        public const string NoteFlagSixteenth = "2";
        public const string NoteFlag32nd = "3";
        public const string NoteFlag64th = "4";
        public const string NoteFlag128th = "5";
        public const string NoteFlagEighthRev = "!";
        public const string NoteFlagSixteenthRev = "@";
        public const string NoteFlag32ndRev = "#";
        public const string NoteFlag64thRev = "$";
        public const string NoteFlag128thRev = "%";
        public const string Dot = ".";
        public const string CommonTime = "c";
        public const string CutTime = "C";
        public const string RepeatForward = @"\";
        public const string RepeatBackward = @"l";

    }

    #endregion

    #region Base class: MusicalSymbol

    public class MusicalSymbol
    {
        #region Protected fields

        public MusicalSymbolType type;
        protected string musicalCharacter = " ";
        protected Color musicalCharacterColor = Color.Black;

        #endregion

        #region Properties

        public MusicalSymbolType Type { get { return type; } }
        public string MusicalCharacter { get { return musicalCharacter; } }
        public Color MusicalCharacterColor { get { return musicalCharacterColor; } set { musicalCharacterColor = value; } }

        #endregion

        #region Constructor

        public MusicalSymbol()
        {
            type = MusicalSymbolType.Unknown;
        }

        #endregion

        #region Public static functions

        public static int ToMidiPitch(string step, int alter, int octave)
        {
            int pitch;
            if (step == "A") pitch = 21;
            else if (step == "B") pitch = 23;
            else if (step == "C") pitch = 24;
            else if (step == "D") pitch = 26;
            else if (step == "E") pitch = 28;
            else if (step == "F") pitch = 29;
            else if (step == "G") pitch = 31;
            else return 0;
            //Dźwięki A i B(H) są w standardzie MIDI w oktawie 0:
            //Notes A0 and B0 are in octave 0 in MIDI standard:
            if ((step == "A") || (step == "B")) pitch = pitch + octave * 12;
            else pitch = pitch + (octave - 1)* 12;  //The other are in octave 1 / A pozostałe w pierwszej oktawie
            pitch = pitch + alter;
            return pitch;
        }

        public static int FrequencyToMidiPitch(double freq)
        {
            double i=0;
            //27,5 Hz to częstotliwość dźwięku A subkontra (najniższego w standardzie MIDI)
            //27,5 Hz is the frequency of note A subcontra (A0) (the lowest in MIDI standard)
            while (true)
            {
                if ((freq < 27.5f * Math.Pow(2, 1.0f / 36) * Math.Pow(2, i / 12)) &&
                    (freq >= 27.5f * Math.Pow(2, -1.0f / 18) * Math.Pow(2, i / 12)))
                    break;
                i++;
                if (i > 100) break;
            }
            return (int)i + 21;
        }



        public static int ToClefMidiPitch(ClefType type)
        {
            if (type == ClefType.CClef) return 60;
            else if (type == ClefType.FClef) return 53;
            else if (type == ClefType.GClef) return 67;
            else return 0;
        }
        public static int StepDifference(Clef a, Note b)
        {
            int step1int = 0, step2int = 0;
            string step1 = a.Step;
            string step2 = b.Step;
            if (step1 == "C") step1int = 0;
            else if (step1 == "D") step1int = 1;
            else if (step1 == "E") step1int = 2;
            else if (step1 == "F") step1int = 3;
            else if (step1 == "G") step1int = 4;
            else if (step1 == "A") step1int = 5;
            else if (step1 == "B") step1int = 6;

            step1int += a.Octave * 7;

            if (step2 == "C") step2int = 0;
            else if (step2 == "D") step2int = 1;
            else if (step2 == "E") step2int = 2;
            else if (step2 == "F") step2int = 3;
            else if (step2 == "G") step2int = 4;
            else if (step2 == "A") step2int = 5;
            else if (step2 == "B") step2int = 6;

            step2int += b.Octave * 7;

            return step1int - step2int;
        }

        #endregion

    }

    #endregion

    #region Classes inheriting from MusicalSymbol class

    public class Note : MusicalSymbol
    {
        #region Protected fields

        protected int midiPitch;
        protected int numberOfDots;
        protected MusicalSymbolDuration duration;
        protected string step;
        protected int octave;
        protected int alter;
        protected float stemDefaultY;
        protected bool customStemEndPosition = false;
        protected string noteFlagCharacter = " ";
        protected string noteFlagCharacterRev = " ";
        protected NoteStemDirection stemDirection = NoteStemDirection.Up;
        protected NoteTieType tieType = NoteTieType.None;
        protected List<NoteBeamType> beamList = new List<NoteBeamType>();
        protected TupletType tuplet = TupletType.None;
        protected List<LyricsType> lyrics = new List<LyricsType>();
        protected ArticulationType articulation = ArticulationType.None;
        protected ArticulationPlacementType articulationPlacement = ArticulationPlacementType.Below;
        protected List<string> lyricTexts = new List<string>();
        protected bool hasNatural = false;
        protected bool isGraceNote = false;
        protected bool isChordElement = false;
        protected int currentTempo = 120;
        protected NoteTrillMark trillMark = NoteTrillMark.None;
        protected NoteSlurType slur = NoteSlurType.None;
        protected bool hasFermataSign = false;
        protected int tremoloLevel = 0; //1 - eights (quavers), 2 - sixteenths (semiquavers), etc. / 1 - ósemki, 2 - szesnastki, itp.
        protected int voice = 1;
        protected int dynamics = 80;
        protected PointF location = new PointF();
        protected PointF stemEndLocation = new PointF();

        #endregion

        #region Properties

        public bool CustomStemEndPosition {get {return customStemEndPosition;}set{customStemEndPosition = value;}}
        public bool HasFermataSign { get { return hasFermataSign; } set { hasFermataSign = value; } }
        public NoteSlurType Slur { get { return slur; } set { slur = value; } }
        public NoteTrillMark TrillMark { get { return trillMark; } set { trillMark = value; } }
        public int CurrentTempo { get { return currentTempo; } set { currentTempo = value; } }
        public float StemDefaultY { get { return stemDefaultY; } set { stemDefaultY = value; } }
        public TupletType Tuplet { get { return tuplet; } set { tuplet = value; } }
        public List<LyricsType> Lyrics { get { return lyrics; } set { lyrics = value; } }
        public ArticulationType Articulation { get { return articulation; } set { articulation = value; } }
        public ArticulationPlacementType ArticulationPlacement { get { return articulationPlacement; }
            set { articulationPlacement = value; } }
        public List<string> LyricTexts { get { return lyricTexts; } set { lyricTexts = value; } }
        public bool HasNatural { get { return hasNatural; } set { hasNatural = value; } }
        public bool IsGraceNote { get { return isGraceNote; } set { isGraceNote = value; } }
        public bool IsChordElement { get { return isChordElement; } set { isChordElement = value; } }
        public int TremoloLevel { get { return tremoloLevel; } set { tremoloLevel = value; } }
        public string NoteFlagCharacter { get { return noteFlagCharacter; } }
        public string NoteFlagCharacterRev { get { return noteFlagCharacterRev; } }
        public PointF Location { get { return location; } set { location = value; } }
        public PointF StemEndLocation { get { return stemEndLocation; } set { stemEndLocation = value; } }

        public int NumberOfDots { get { return numberOfDots; } set { numberOfDots = value; } }
        public NoteStemDirection StemDirection { get { return stemDirection; } }
        public NoteTieType TieType { get { return tieType; } set { tieType = value; } }
        public List<NoteBeamType> BeamList { get { return beamList; } }
        public MusicalSymbolDuration Duration { get { return duration; } }
        public string Step { get { return step; } }
        public int Octave { get { return octave; } }
        public int Alter { get { return alter; } }
        public int MidiPitch { get { return midiPitch; } }
        public int Voice { get { return voice; } set { voice = value; } }
        public int Dynamics { get { return dynamics; } set { dynamics = value; } }

        #endregion

        #region Constructor

        public Note(string noteStep, int noteAlter, int noteOctave, MusicalSymbolDuration noteDuration,
            NoteStemDirection noteStemDirection, NoteTieType noteTieType, List<NoteBeamType> noteBeamList)
        {
            type = MusicalSymbolType.Note;
            duration = noteDuration;
            step = noteStep;
            octave = noteOctave;
            alter = noteAlter;
            stemDirection = noteStemDirection;
            beamList = noteBeamList;
            tieType = noteTieType;
            midiPitch = MusicalSymbol.ToMidiPitch(step, alter, octave);
            DetermineMusicalCharacter();
        }

        public Note(string noteStep, int noteAlter, int noteOctave, MusicalSymbolDuration noteDuration, Color c,
            NoteStemDirection noteStemDirection, NoteTieType noteTieType, List<NoteBeamType> noteBeamList)
        {
            type = MusicalSymbolType.Note;
            duration = noteDuration;
            step = noteStep;
            octave = noteOctave;
            alter = noteAlter;
            stemDirection = noteStemDirection;
            beamList = noteBeamList;
            tieType = noteTieType;
            midiPitch = MusicalSymbol.ToMidiPitch(step, alter, octave);
            DetermineMusicalCharacter();
            musicalCharacterColor = c;
        }

        
        #endregion

        #region Private methods

        private void DetermineMusicalCharacter()
        {
            if (duration == MusicalSymbolDuration.Whole) musicalCharacter = MusicalCharacters.WholeNote;
            else if (duration == MusicalSymbolDuration.Half) musicalCharacter = MusicalCharacters.WhiteNoteHead;
            else if (duration == MusicalSymbolDuration.Quarter) musicalCharacter = MusicalCharacters.BlackNoteHead;
            else if (duration == MusicalSymbolDuration.Eighth) musicalCharacter = MusicalCharacters.BlackNoteHead;
            else if (duration == MusicalSymbolDuration.Sixteenth) musicalCharacter = MusicalCharacters.BlackNoteHead;
            else if (duration == MusicalSymbolDuration.d32nd) musicalCharacter = MusicalCharacters.BlackNoteHead;
            else if (duration == MusicalSymbolDuration.d64th) musicalCharacter = MusicalCharacters.BlackNoteHead;
            else if (duration == MusicalSymbolDuration.d128th) musicalCharacter = MusicalCharacters.BlackNoteHead;
            else if (duration == MusicalSymbolDuration.Unknown) musicalCharacter = MusicalCharacters.BlackNoteHead;

            if (duration == MusicalSymbolDuration.Eighth)
            {
                noteFlagCharacter = MusicalCharacters.NoteFlagEighth;
                noteFlagCharacterRev = MusicalCharacters.NoteFlagEighthRev;
            }
            else if (duration == MusicalSymbolDuration.Sixteenth)
            {
                noteFlagCharacter = MusicalCharacters.NoteFlagSixteenth;
                noteFlagCharacterRev = MusicalCharacters.NoteFlagSixteenthRev;
            }
            else if (duration == MusicalSymbolDuration.d32nd)
            {
                noteFlagCharacter = MusicalCharacters.NoteFlag32nd;
                noteFlagCharacterRev = MusicalCharacters.NoteFlag32ndRev;
            }
            else if (duration == MusicalSymbolDuration.d64th)
            {
                noteFlagCharacter = MusicalCharacters.NoteFlag64th;
                noteFlagCharacterRev = MusicalCharacters.NoteFlag64thRev;
            }
            else if (duration == MusicalSymbolDuration.d128th)
            {
                noteFlagCharacter = MusicalCharacters.NoteFlag128th;
                noteFlagCharacterRev = MusicalCharacters.NoteFlag128thRev;
            }
        }

        #endregion

        #region Public methods

        public int StepToStepNumber()
        {
            if (step == "C") return 0;
            else if (step == "D") return 1;
            else if (step == "E") return 2;
            else if (step == "F") return 3;
            else if (step == "G") return 4;
            else if (step == "A") return 5;
            else if (step == "B") return 6;
            else return 0;
        }

        #endregion

        #region Public static functions

        public static Note CreateNoteFromMidiPitch(int midiPitch)
        {
            int midiPitchInLowestOctave = midiPitch;
            string step = "A";
            int alter = 0;
            int octave = 0;
            while (midiPitchInLowestOctave > 32) midiPitchInLowestOctave -= 12;
            if (midiPitchInLowestOctave == 21) { step = "A"; alter = 0; }
            else if (midiPitchInLowestOctave == 22) { step = "B"; alter = -1; }
            else if (midiPitchInLowestOctave == 23) { step = "B"; alter = 0; }
            else if (midiPitchInLowestOctave == 24) { step = "C"; alter = 0; }
            else if (midiPitchInLowestOctave == 25) { step = "C"; alter = 1; }
            else if (midiPitchInLowestOctave == 26) { step = "D"; alter = 0; }
            else if (midiPitchInLowestOctave == 27) { step = "E"; alter = -1; }
            else if (midiPitchInLowestOctave == 28) { step = "E"; alter = 0; }
            else if (midiPitchInLowestOctave == 29) { step = "F"; alter = 0; }
            else if (midiPitchInLowestOctave == 30) { step = "F"; alter = 1; }
            else if (midiPitchInLowestOctave == 31) { step = "G"; alter = 0; }
            else if (midiPitchInLowestOctave == 32) { step = "G"; alter = 1; }

            if (midiPitch < 24) octave = 0;
            else if (midiPitch < 36) octave = 1;
            else if (midiPitch < 48) octave = 2;
            else if (midiPitch < 60) octave = 3;
            else if (midiPitch < 72) octave = 4;
            else if (midiPitch < 84) octave = 5;
            else if (midiPitch < 96) octave = 6;
            else if (midiPitch < 108) octave = 7;
            else if (midiPitch < 120) octave = 8;

            return new Note(step, alter, octave, MusicalSymbolDuration.Unknown, NoteStemDirection.Up, 
                NoteTieType.None,
                new List<NoteBeamType>());
        }

        #endregion

    }

    public class Rest : MusicalSymbol
    {
        #region Protected fields

        protected MusicalSymbolDuration duration;
        protected int numberOfDots;
        protected TupletType tuplet = TupletType.None;
        protected int multiMeasure = 0;
        protected int currentTempo = 120;
        protected bool hasFermataSign = false;
        protected int voice = 1;

        #endregion

        #region Properties

        public MusicalSymbolDuration Duration { get { return duration; } }
        public int NumberOfDots { get { return numberOfDots; } set { numberOfDots = value; } }
        public TupletType Tuplet { get { return tuplet; } set { tuplet = value; } }
        public int MultiMeasure { get { return multiMeasure; } set { multiMeasure = value; } }
        public int CurrentTempo { get { return currentTempo; } set { currentTempo = value; } }
        public bool HasFermataSign { get { return hasFermataSign; } set { hasFermataSign = value; } }
        public int Voice { get { return voice; } set { voice = value; } }

        #endregion

        #region Constructor

        public Rest(MusicalSymbolDuration restDuration)
        {
            type = MusicalSymbolType.Rest;
            duration = restDuration;
            DetermineMusicalCharacter();
        }

        public Rest(MusicalSymbolDuration restDuration, Color c)
        {
            type = MusicalSymbolType.Rest;
            duration = restDuration;
            musicalCharacterColor = c;
            DetermineMusicalCharacter();
        }

        #endregion

        #region Private methods

        private void DetermineMusicalCharacter()
        {
            if (duration == MusicalSymbolDuration.Whole) musicalCharacter = MusicalCharacters.WholeRest;
            else if (duration == MusicalSymbolDuration.Half) musicalCharacter = MusicalCharacters.HalfRest;
            else if (duration == MusicalSymbolDuration.Quarter) musicalCharacter = MusicalCharacters.QuarterRest;
            else if (duration == MusicalSymbolDuration.Eighth) musicalCharacter = MusicalCharacters.EighthRest;
            else if (duration == MusicalSymbolDuration.Sixteenth) musicalCharacter = MusicalCharacters.SixteenthRest;
        }

        #endregion

    }
    public class Key : MusicalSymbol
    {
        #region Private fields

        private int fifths;

        #endregion

        #region Properties

        public int Fifths { get { return fifths; } }

        #endregion

        #region Constructor

        public Key(int numberOfFifths)
        {
            type = MusicalSymbolType.Key;
            fifths = numberOfFifths;
            if (fifths > 0)
                musicalCharacter = MusicalCharacters.Sharp;
            else if (fifths < 0)
                musicalCharacter = MusicalCharacters.Flat;
            else
                musicalCharacter = " ";
        }

        #endregion

        #region Public methods

        public int StepToAlter (string step)
        {
            int [] alterTable = new int[7];
            int numberOfStepsToAlter = Math.Abs(fifths);
            for (int i = 0; i < numberOfStepsToAlter; i++)
            {
                alterTable[i] += 1;
                if (i == 6)
                {
                    i = -1;
                    numberOfStepsToAlter -= 6;
                }

            }
            if (fifths > 0)
            {
                if (step == "C") return alterTable[1];
                else if (step == "D") return alterTable[3];
                else if (step == "E") return alterTable[5];
                else if (step == "F") return alterTable[0];
                else if (step == "G") return alterTable[2];
                else if (step == "A") return alterTable[4];
                else if (step == "B") return alterTable[6];
            }
            else if (fifths < 0)
            {
                if (step == "C") return alterTable[5] * -1;
                else if (step == "D") return alterTable[3] * -1;
                else if (step == "E") return alterTable[1] * -1;
                else if (step == "F") return alterTable[6] * -1;
                else if (step == "G") return alterTable[4] * -1;
                else if (step == "A") return alterTable[2] * -1;
                else if (step == "B") return alterTable[0] * -1;
            }
            
            return 0;
        }

        #endregion

    }

    public class Clef : MusicalSymbol
    {
        #region Private fields

        private ClefType typeOfClef;
        private int clefPitch;
        private int line;
        private string step = "G";
        private int octave = 4;

        #endregion

        #region Properties

        public string Step { get { return step; } }
        public int Octave { get { return octave; } }
        public ClefType TypeOfClef { get { return typeOfClef; } }
        public int Line { get { return line; } }
        public int ClefPitch { get { return clefPitch; } }

        #endregion

        #region Constructor

        public Clef(ClefType clefType, int whichLine)
        {
            type = MusicalSymbolType.Clef;
            typeOfClef = clefType;
            line = whichLine;
            clefPitch = MusicalSymbol.ToClefMidiPitch(typeOfClef);
            if (typeOfClef == ClefType.GClef)
            {
                musicalCharacter = MusicalCharacters.GClef;
                step = "G";
                octave = 4;
            }
            else if (typeOfClef == ClefType.FClef)
            {
                musicalCharacter = MusicalCharacters.FClef;
                step = "F";
                octave = 3;
            }
            else if (typeOfClef == ClefType.CClef)
            {
                musicalCharacter = MusicalCharacters.CClef;
                step = "C";
                octave = 4;
            }
        }

        #endregion

        #region Public static functions

        public static Clef SuggestClefForANote(Note n)
        {
            if (n.MidiPitch < 55) return new Clef(ClefType.FClef, 4);
            else return new Clef(ClefType.GClef, 2);
        }
        public static Clef SuggestClefForANote(Note n, Clef currentClef)
        {
            if (currentClef.TypeOfClef == ClefType.GClef)
            {
                if ((currentClef.Line == 1) && (n.MidiPitch < 59)) return new Clef(ClefType.FClef, 4);
                else if ((currentClef.Line == 2) && (n.MidiPitch < 55)) return new Clef(ClefType.FClef, 4);
                else if ((currentClef.Line == 3) && (n.MidiPitch < 52)) return new Clef(ClefType.FClef, 4);
                else if ((currentClef.Line == 4) && (n.MidiPitch < 48)) return new Clef(ClefType.FClef, 4);
                else if ((currentClef.Line == 5) && (n.MidiPitch < 45)) return new Clef(ClefType.FClef, 4);
                else return currentClef;
            }
            else if (currentClef.TypeOfClef == ClefType.FClef)
            {
                if ((currentClef.Line == 1) && (n.MidiPitch > 74)) return new Clef(ClefType.GClef, 2);
                else if ((currentClef.Line == 2) && (n.MidiPitch > 71)) return new Clef(ClefType.GClef, 2);
                else if ((currentClef.Line == 3) && (n.MidiPitch > 67)) return new Clef(ClefType.GClef, 2);
                else if ((currentClef.Line == 4) && (n.MidiPitch > 64)) return new Clef(ClefType.GClef, 2);
                else if ((currentClef.Line == 5) && (n.MidiPitch > 60)) return new Clef(ClefType.GClef, 2);
                else return currentClef;
            }
            else return new Clef(ClefType.GClef, 2);
        }

        #endregion

    }

    public class Barline : MusicalSymbol
    {
        #region Private fields

        private RepeatSignType repeatSign;

        #endregion

        #region Properties

        public RepeatSignType RepeatSign { get { return repeatSign; } set { repeatSign = value; } }

        #endregion

        #region Constructor

        public Barline()
        {
            type = MusicalSymbolType.Barline;
            repeatSign = RepeatSignType.None;
        }

        #endregion
    }

    public class TimeSignature : MusicalSymbol
    {
        #region Protected fields

        protected TimeSignatureType signatureType;
        protected uint numberOfBeats;
        protected uint typeOfBeats;

        #endregion

        #region Properties

        public TimeSignatureType SignatureType { get { return signatureType; } set { signatureType = value; } }
        public uint NumberOfBeats { get { return numberOfBeats; } set { numberOfBeats = value; } }
        public uint TypeOfBeats { get { return typeOfBeats; } set { typeOfBeats = value; } }

        #endregion

        #region Constructor

        public TimeSignature(TimeSignatureType sType, uint beats, uint beatType)
        {
            type = MusicalSymbolType.TimeSignature;
            numberOfBeats = beats;
            typeOfBeats = beatType;
            signatureType = sType;
        }

        public float getMesure()
        {
            return (float) numberOfBeats * 4 / (float) typeOfBeats;
        }

        #endregion
    }

    public class Direction : MusicalSymbol
    {
        #region Protected fields

        protected string text = "";
        protected DirectionPlacementType placement = DirectionPlacementType.Above;
        protected int defaultY = 0;

        #endregion

        #region Properties

        public string Text { get { return text; } set { text = value; } }
        public DirectionPlacementType Placement { get { return placement; } set { placement = value; } }
        public int DefaultY { get { return defaultY; } set { defaultY = value; } }

        #endregion

        #region Constructor

        public Direction()
        {
            type = MusicalSymbolType.Direction;
        }

        #endregion
    }

    #endregion

}
