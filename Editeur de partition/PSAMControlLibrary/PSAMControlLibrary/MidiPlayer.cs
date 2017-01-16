using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sanford.Multimedia.Midi;

namespace MusicaPatriaControlLibrary
{
    public class MidiPlayer
    {
        private OutputDevice outDev;
        public MidiPlayer()
        {
            outDev = new OutputDevice(0);
        }
        public void Play()
        {
        }
    }
}
