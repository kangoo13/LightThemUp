using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PSAMControlLibrary;
using System.Drawing;

namespace LTP
{
    public class MusicalSybols
    {
        protected MusicalSymbolDuration duration;
        protected MusicalSymbolType type;
        protected Color objectcolor;
        protected MusicalSymbol symb = null;

        public MusicalSymbolDuration    getDuration() { return duration; }
        public MusicalSymbolType        getType() { return type; }

        public MusicalSybols(MusicalSymbolType SymbType, MusicalSymbolDuration SymbDuration)
        {
            duration = SymbDuration;
            type = SymbType;
            objectcolor = Color.Black;
        }

        public MusicalSybols(MusicalSymbolType SymbType, MusicalSymbolDuration SymbDuration, Color SymbColor)
        {
            duration = SymbDuration;
            type = SymbType;
            objectcolor = SymbColor;
        }

        public MusicalSymbol getSymb()
        {
            return symb;
        }
    }

    public class NoteSymb : MusicalSybols
    {
        protected string note;
        protected int alteration = 0;
        protected int octave = 4;

        public NoteSymb(string noteStep, int noteAlter, int noteOctave, MusicalSymbolDuration noteDuration)
            : base(MusicalSymbolType.Note, noteDuration)
        {
            symb = new Note(noteStep, noteAlter, noteOctave, noteDuration, NoteStemDirection.Up, NoteTieType.None, new List<NoteBeamType>() { NoteBeamType.Single });
            note = noteStep;
            alteration = noteAlter;
            octave = noteOctave;
        }

        public NoteSymb(string noteStep, int noteAlter, int noteOctave, MusicalSymbolDuration noteDuration, Color SymbColor)
            : base(MusicalSymbolType.Note, noteDuration, SymbColor)
        {
            symb = new Note(noteStep, noteAlter, noteOctave, noteDuration, NoteStemDirection.Up, NoteTieType.None, new List<NoteBeamType>() { NoteBeamType.Single });
            symb.MusicalCharacterColor = SymbColor;
            note = noteStep;
            alteration = noteAlter;
            octave = noteOctave;
        }
    }

    public class RestSymb : MusicalSybols
    {
        public RestSymb(MusicalSymbolDuration SymbDuration)
            : base(MusicalSymbolType.Rest, SymbDuration)
        {
            symb = new Rest(SymbDuration);
        }

        public RestSymb(MusicalSymbolDuration SymbDuration, Color SymbColor)
            : base(MusicalSymbolType.Rest, SymbDuration, SymbColor)
        {
            symb = new Rest(SymbDuration);
            symb.MusicalCharacterColor = SymbColor;
        }
    }

}
