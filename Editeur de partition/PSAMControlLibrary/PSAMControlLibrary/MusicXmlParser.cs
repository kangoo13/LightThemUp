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
using System.Text;
using System.Xml;
using System.Globalization;
using System.Windows.Forms;

namespace PSAMControlLibrary
{
    public static class MusicXmlParser
    {
        public static int currentTempo;
        public static bool ParseXml(IIncipitViewer viewer) //Returns true if there are no errors
        {
            viewer.ClearMusicalIncipit();
            XmlNodeList measures = viewer.XmlIncipit.SelectNodes("/score-partwise/part/measure");
            int skipMeasures = 0;
            string partID = "";
            bool firstLoop = true;
            int currentDynamics = 80;
            currentTempo = 120;
            try
            {
                foreach (XmlNode measure in measures)
                {
                    bool barlineAlreadyAdded = false;
                    if (measure.ParentNode.Name == "part")  //Don't take the other voices than the upper into account / Nie uwzględniaj innych głosów niż górny
                    {
                        if (!firstLoop)
                        {
                            if (measure.ParentNode.Attributes["id"].Value != partID) break;
                        }
                        else
                        {
                            partID = measure.ParentNode.Attributes["id"].Value;
                        }
                    }
                    if (skipMeasures > 0) { skipMeasures--; continue; }
                    if (measure.HasChildNodes == false) continue;
                    foreach (XmlNode symbol in measure.ChildNodes)
                    {
                        if (symbol.HasChildNodes == false) continue;
                        if (symbol.Name == "attributes")
                        {
                            foreach (XmlNode attribute in symbol.ChildNodes)
                            {
                                if (attribute.Name == "clef")
                                {
                                    ClefType typeOfClef = ClefType.GClef;
                                    int line = 1;
                                    foreach (XmlNode clefAttribute in attribute.ChildNodes)
                                    {
                                        if (clefAttribute.Name == "sign")
                                        {
                                            if (clefAttribute.InnerText.ToUpper() == "G")
                                            {
                                                typeOfClef = ClefType.GClef;
                                            }
                                            else if (clefAttribute.InnerText.ToUpper() == "C")
                                            {
                                                typeOfClef = ClefType.CClef;
                                            }
                                            else if (clefAttribute.InnerText.ToUpper() == "F")
                                            {
                                                typeOfClef = ClefType.FClef;
                                            }
                                            else throw (new Exception("Unknown clef"));
                                        }
                                        if (clefAttribute.Name == "line")
                                        {
                                            line = Convert.ToInt16(clefAttribute.InnerText);
                                        }

                                    }
                                    viewer.AddMusicalSymbol(new Clef(typeOfClef, line));

                                }
                                if (attribute.Name == "time")
                                {
                                    uint numberOfBeats = 4;
                                    uint beatType = 4;
                                    TimeSignatureType sType = TimeSignatureType.Numbers;
                                    foreach (XmlNode timeAttribute in attribute.ChildNodes)
                                    {
                                        if (timeAttribute.Name == "beats")
                                            numberOfBeats = Convert.ToUInt32(timeAttribute.InnerText);
                                        if (timeAttribute.Name == "beat-type")
                                            beatType = Convert.ToUInt32(timeAttribute.InnerText);
                                    }
                                    if (attribute.Attributes.Count > 0)
                                    {
                                        foreach (XmlAttribute a in attribute.Attributes)
                                        {
                                            if (a.Name == "symbol")
                                            {
                                                if (a.Value == "common")
                                                    sType = TimeSignatureType.Common;
                                                else if (a.Value == "cut")
                                                    sType = TimeSignatureType.Cut;
                                            }
                                        }
                                    }
                                    viewer.AddMusicalSymbol(new TimeSignature(sType, numberOfBeats, beatType));

                                }
                                if (attribute.Name == "key")
                                {
                                    foreach (XmlNode keyAttribute in attribute.ChildNodes)
                                    {
                                        if (keyAttribute.Name == "fifths")
                                        {
                                            viewer.AddMusicalSymbol(new Key(Convert.ToInt16(keyAttribute.InnerText)));
                                        }
                                    }
                                }
                                if (attribute.Name == "measure-style")
                                {
                                    foreach (XmlNode measureStyleAttribute in attribute.ChildNodes)
                                    {
                                        if (measureStyleAttribute.Name == "multiple-rest")
                                        {
                                            skipMeasures = Convert.ToInt32(measureStyleAttribute.InnerText) - 1;
                                        }
                                    }
                                }

                            }
                        }
                        else if (symbol.Name == "sound")
                        {
                            if (((XmlElement)symbol).HasAttribute("tempo"))
                                currentTempo = Convert.ToInt32(symbol.Attributes["tempo"].Value);
                            if (((XmlElement)symbol).HasAttribute("dynamics"))
                                currentDynamics = Convert.ToInt32(symbol.Attributes["dynamics"].Value);
                        }
                        else if (symbol.Name == "direction")
                        {
                            foreach (XmlNode direction in symbol.ChildNodes)
                            {
                                if (direction.Name == "sound")
                                {
                                    if (((XmlElement)direction).HasAttribute("tempo"))
                                        currentTempo = Convert.ToInt32(direction.Attributes["tempo"].Value);
                                    if (((XmlElement)direction).HasAttribute("dynamics"))
                                        currentDynamics = Convert.ToInt32(direction.Attributes["dynamics"].Value);
                                }
                                if (direction.Name == "direction-type")
                                {
                                    foreach (XmlNode directionType in direction.ChildNodes)
                                    {
                                        if (directionType.Name == "dynamics")
                                        {
                                            DirectionPlacementType placement = DirectionPlacementType.Above;
                                            int defaultY = 0;
                                            string text = "";
                                            if (((XmlElement)directionType).HasAttribute("default-y"))
                                            {
                                                defaultY = Convert.ToInt32(directionType.Attributes["default-y"].Value);
                                                placement = DirectionPlacementType.Custom;
                                            }
                                            if (((XmlElement)directionType).HasAttribute("placement") &&
                                                placement != DirectionPlacementType.Custom)
                                            {
                                                if (directionType.Attributes["placement"].Value == "above")
                                                    placement = DirectionPlacementType.Above;
                                                else if (directionType.Attributes["placement"].Value == "below")
                                                    placement = DirectionPlacementType.Below;
                                            }
                                            foreach (XmlNode dynamicsType in directionType.ChildNodes)
                                            {
                                                text = dynamicsType.Name;
                                            }
                                            Direction dir = new Direction();
                                            dir.DefaultY = defaultY;
                                            dir.Placement = placement;
                                            dir.Text = text;
                                            viewer.AddMusicalSymbol(dir);
                                        }
                                    }
                                }
                            }
                        }
                        else if (symbol.Name == "note")
                        {
                            int octave = 0;
                            int alter = 0;
                            string step = "C";
                            bool isRest = false;
                            int numberOfDots = 0;
                            MusicalSymbolDuration duration = MusicalSymbolDuration.Whole;
                            NoteStemDirection stemDirection = NoteStemDirection.Up;
                            NoteTieType tieType = NoteTieType.None;
                            TupletType tuplet = TupletType.None;
                            List<NoteBeamType> beamList = new List<NoteBeamType>();
                            List<LyricsType> lyric = new List<LyricsType>();
                            List<string> lyricText = new List<string>();
                            ArticulationPlacementType articulationPlacement = ArticulationPlacementType.Below;
                            ArticulationType articulation = ArticulationType.None;
                            bool hasNatural = false;
                            bool isGraceNote = false;
                            bool isChordElement = false;
                            bool hasFermataSign = false;
                            float stemDefaultY = 28;
                            bool customStemEndPosition = false;
                            int tremoloLevel = 0;
                            NoteSlurType slur = NoteSlurType.None;
                            NoteTrillMark trillMark = NoteTrillMark.None;
                            int voice = 1;

                            foreach (XmlNode noteAttribute in symbol.ChildNodes)
                            {
                                if (noteAttribute.Name == "pitch")
                                {
                                    foreach (XmlNode pitchAttribute in noteAttribute.ChildNodes)
                                    {

                                        if (pitchAttribute.Name == "step")
                                        {
                                            step = pitchAttribute.InnerText;
                                        }
                                        else if (pitchAttribute.Name == "octave")
                                        {
                                            octave = Convert.ToInt16(pitchAttribute.InnerText);
                                        }
                                        else if (pitchAttribute.Name == "alter")
                                        {
                                            alter = Convert.ToInt16(pitchAttribute.InnerText);
                                        }
                                    }
                                }
                                else if (noteAttribute.Name == "voice")
                                {
                                    voice = Convert.ToInt32(noteAttribute.InnerText);
                                }
                                else if (noteAttribute.Name == "grace")
                                {
                                    isGraceNote = true;
                                }
                                else if (noteAttribute.Name == "chord")
                                {
                                    isChordElement = true;
                                }
                                else if (noteAttribute.Name == "type")
                                {
                                    if (noteAttribute.InnerText == "whole") duration = MusicalSymbolDuration.Whole;
                                    else if (noteAttribute.InnerText == "half") duration = MusicalSymbolDuration.Half;
                                    else if (noteAttribute.InnerText == "quarter") duration = MusicalSymbolDuration.Quarter;
                                    else if (noteAttribute.InnerText == "eighth") duration = MusicalSymbolDuration.Eighth;
                                    else if (noteAttribute.InnerText == "16th") duration = MusicalSymbolDuration.Sixteenth;
                                    else if (noteAttribute.InnerText == "32nd") duration = MusicalSymbolDuration.d32nd;
                                    else if (noteAttribute.InnerText == "64th") duration = MusicalSymbolDuration.d64th;
                                    else if (noteAttribute.InnerText == "128th") duration = MusicalSymbolDuration.d128th;
                                }
                                else if (noteAttribute.Name == "accidental")
                                {
                                    if (noteAttribute.InnerText == "natural") hasNatural = true;
                                }
                                else if (noteAttribute.Name == "tie")
                                {
                                    if (noteAttribute.Attributes["type"].Value == "start")
                                    {

                                        if (tieType == NoteTieType.Stop)
                                            tieType = NoteTieType.StopAndStartAnother;
                                        else tieType = NoteTieType.Start;
                                    }
                                    else
                                    {
                                        tieType = NoteTieType.Stop;
                                    }
                                }
                                else if (noteAttribute.Name == "rest")
                                {
                                    isRest = true;
                                }
                                else if (noteAttribute.Name == "dot")
                                {
                                    numberOfDots++;
                                }
                                else if (noteAttribute.Name == "stem")
                                {
                                    if (noteAttribute.InnerText == "down") stemDirection = NoteStemDirection.Down;
                                    else stemDirection = NoteStemDirection.Up;
                                    foreach (XmlAttribute xa in noteAttribute.Attributes)
                                    {
                                        if (xa.Name == "default-y")
                                        {
                                            stemDefaultY = float.Parse(xa.Value.Replace('.',
                                                Convert.ToChar(NumberFormatInfo.CurrentInfo.CurrencyDecimalSeparator)));
                                            customStemEndPosition = true;
                                        }
                                    }
                                }
                                else if (noteAttribute.Name == "beam")
                                {
                                    if (noteAttribute.InnerText == "begin") beamList.Add(NoteBeamType.Start);
                                    else if (noteAttribute.InnerText == "end") beamList.Add(NoteBeamType.End);
                                    else if (noteAttribute.InnerText == "continue") beamList.Add(NoteBeamType.Continue);
                                    else if (noteAttribute.InnerText == "forward hook") beamList.Add(NoteBeamType.ForwardHook);
                                    else if (noteAttribute.InnerText == "backward hook") beamList.Add(NoteBeamType.BackwardHook);
                                }
                                else if (noteAttribute.Name == "notations")
                                {
                                    foreach (XmlNode notationAttribute in noteAttribute.ChildNodes)
                                    {
                                        if (notationAttribute.Name == "tuplet")
                                        {
                                            if (notationAttribute.Attributes["type"].Value == "start")
                                            {
                                                tuplet = TupletType.Start;
                                            }
                                            else if (notationAttribute.Attributes["type"].Value == "stop")
                                            {
                                                tuplet = TupletType.Stop;
                                            }
                                        }
                                        if (notationAttribute.Name == "dynamics")
                                        {
                                            DirectionPlacementType placement = DirectionPlacementType.Above;
                                            int defaultY = 0;
                                            string text = "";
                                            if (((XmlElement)notationAttribute).HasAttribute("default-y"))
                                            {
                                                defaultY = Convert.ToInt32(notationAttribute.Attributes["default-y"].Value);
                                                placement = DirectionPlacementType.Custom;
                                            }
                                            if (((XmlElement)notationAttribute).HasAttribute("placement") &&
                                                placement != DirectionPlacementType.Custom)
                                            {
                                                if (notationAttribute.Attributes["placement"].Value == "above")
                                                    placement = DirectionPlacementType.Above;
                                                else if (notationAttribute.Attributes["placement"].Value == "below")
                                                    placement = DirectionPlacementType.Below;
                                            }
                                            foreach (XmlNode dynamicsType in notationAttribute.ChildNodes)
                                            {
                                                text = dynamicsType.Name;
                                            }
                                            Direction dir = new Direction();
                                            dir.DefaultY = defaultY;
                                            dir.Placement = placement;
                                            dir.Text = text;
                                            viewer.AddMusicalSymbol(dir);
                                        }
                                        else if (notationAttribute.Name == "articulations")
                                        {
                                            foreach (XmlNode articulationAttribute in notationAttribute.ChildNodes)
                                            {
                                                if (articulationAttribute.Name == "staccato")
                                                {
                                                    articulation = ArticulationType.Staccato;
                                                }
                                                else if (articulationAttribute.Name == "accent")
                                                {
                                                    articulation = ArticulationType.Accent;
                                                }

                                                if (articulationAttribute.Attributes["placement"].Value == "above")
                                                    articulationPlacement = ArticulationPlacementType.Above;
                                                else if (articulationAttribute.Attributes["placement"].Value == "below")
                                                    articulationPlacement = ArticulationPlacementType.Below;

                                            }
                                        }
                                        else if (notationAttribute.Name == "ornaments")
                                        {
                                            foreach (XmlNode ornamentAttribute in notationAttribute.ChildNodes)
                                            {
                                                if (ornamentAttribute.Name == "trill-mark")
                                                {
                                                    if (ornamentAttribute.Attributes["placement"].Value == "above")
                                                        trillMark = NoteTrillMark.Above;
                                                    else if (ornamentAttribute.Attributes["placement"].Value == "below")
                                                        trillMark = NoteTrillMark.Below;
                                                }
                                                else if (ornamentAttribute.Name == "tremolo")
                                                {
                                                    tremoloLevel = Convert.ToInt32(ornamentAttribute.InnerText);
                                                }
                                            }

                                        }
                                        else if (notationAttribute.Name == "slur")
                                        {
                                            if ((Convert.ToInt32(notationAttribute.Attributes["number"].Value)) != 1)
                                                continue;
                                            if (notationAttribute.Attributes["type"].Value == "start")
                                                slur = NoteSlurType.Start;
                                            else if (notationAttribute.Attributes["type"].Value == "stop")
                                                slur = NoteSlurType.Stop;

                                        }
                                        else if (notationAttribute.Name == "fermata")
                                        {
                                            hasFermataSign = true;
                                        }
                                        else if (notationAttribute.Name == "sound")
                                        {
                                            if (((XmlElement)notationAttribute).HasAttribute("dynamics"))
                                                currentDynamics = Convert.ToInt32(notationAttribute.Attributes["dynamics"].Value);
                                        }
                                    }
                                }
                                else if (noteAttribute.Name == "lyric")
                                {
                                    foreach (XmlNode lyricAttribute in noteAttribute.ChildNodes)
                                    {
                                        if (lyricAttribute.Name == "syllabic")
                                        {
                                            if (lyricAttribute.InnerText == "begin")
                                            {
                                                lyric.Add(LyricsType.Begin);
                                            }
                                            else if (lyricAttribute.InnerText == "middle")
                                            {
                                                lyric.Add(LyricsType.Middle);
                                            }
                                            else if (lyricAttribute.InnerText == "end")
                                            {
                                                lyric.Add(LyricsType.End);
                                            }
                                            else if (lyricAttribute.InnerText == "single")
                                            {
                                                lyric.Add(LyricsType.Single);
                                            }
                                        }
                                        else if (lyricAttribute.Name == "text")
                                        {
                                            lyricText.Add(lyricAttribute.InnerText);
                                        }
                                    }
                                }

                            }
                            if (beamList.Count == 0) beamList.Add(NoteBeamType.Single);
                            if (!isRest)
                            {
                                Note nt = new Note(step, alter, octave, duration, stemDirection, tieType, beamList);
                                nt.NumberOfDots = numberOfDots;
                                nt.Tuplet = tuplet;
                                nt.Lyrics = lyric;
                                nt.LyricTexts = lyricText;
                                nt.Articulation = articulation;
                                nt.ArticulationPlacement = articulationPlacement;
                                nt.HasNatural = hasNatural;
                                nt.IsGraceNote = isGraceNote;
                                nt.IsChordElement = isChordElement;
                                nt.StemDefaultY = stemDefaultY;
                                nt.CustomStemEndPosition = customStemEndPosition;
                                nt.CurrentTempo = currentTempo;
                                nt.TrillMark = trillMark;
                                nt.Slur = slur;
                                nt.HasFermataSign = hasFermataSign;
                                nt.TremoloLevel = tremoloLevel;
                                nt.Voice = voice;
                                nt.Dynamics = currentDynamics;
                                viewer.AddMusicalSymbol(nt);
                            }
                            else
                            {
                                Rest rt = new Rest(duration);
                                rt.NumberOfDots = numberOfDots;
                                rt.Tuplet = tuplet;
                                rt.MultiMeasure = skipMeasures + 1;
                                rt.CurrentTempo = currentTempo;
                                rt.HasFermataSign = hasFermataSign;
                                rt.Voice = voice;
                                viewer.AddMusicalSymbol(rt);
                            }


                        }
                        else if (symbol.Name == "barline")
                        {
                            Barline b = new Barline();
                            foreach (XmlNode barlineAttribute in symbol.ChildNodes)
                            {
                                if (barlineAttribute.Name == "repeat")
                                {
                                    if (((XmlElement)barlineAttribute).HasAttribute("direction"))
                                    {
                                        if (barlineAttribute.Attributes["direction"].Value == "forward")
                                            b.RepeatSign = RepeatSignType.Forward;
                                        else if (barlineAttribute.Attributes["direction"].Value == "backward")
                                            b.RepeatSign = RepeatSignType.Backward;

                                        viewer.AddMusicalSymbol(b);
                                        barlineAlreadyAdded = true;
                                    }

                                }
                            }
                        }


                    }
                    if (!barlineAlreadyAdded)
                        viewer.AddMusicalSymbol(new Barline());
                    firstLoop = false;
                }
            }
            catch
            {
                return false;
            }
            return true;

        }
    }
}
