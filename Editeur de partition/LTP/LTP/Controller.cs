using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;
using PSAMControlLibrary;
using System.Windows.Forms;

namespace LTP
{
    class Controller
    {
        public enum EditeurMode
        {
            None,
            Add,
            Edit,
            Delete,
            Slur,
            Note,
            Beam,
            Tie
        };
        private int StartSlur = -1;

        public int startslur { get { return StartSlur; } set { StartSlur = value; } }

        public void DeleteSlur(IncipitViewer viewer, int index)
        {
            if (viewer.IncipitElement(index).Type != MusicalSymbolType.Note || ((Note)viewer.IncipitElement(index)).Slur == NoteSlurType.None)
                return;

            int dir = ((Note)viewer.IncipitElement(index)).Slur == NoteSlurType.Stop ? -1 : 1;

            for (int i = index + dir; i >= 0 && viewer.IncipitElement(i) != null; i += dir)
                if (viewer.IncipitElement(i).Type == MusicalSymbolType.Note && ((Note)viewer.IncipitElement(i)).Slur != NoteSlurType.None)
                {
                    ((Note)viewer.IncipitElement(i)).Slur = NoteSlurType.None;
                    break;
                }
            ((Note)viewer.IncipitElement(index)).Slur = NoteSlurType.None;
        }

        public void ManageModeNote(IncipitViewer viewer, int index, EditeurMode SelectedMode, int X, int Y, MusicalSymbolType SelectedSymbol, MusicalSymbolDuration SelectedDuration, Color SelectedColor)
        {
            string noteName = new StringBuilder().Append(Convert.ToChar((29 - ((Y + 2) / 4)) % 7 + 65)).ToString(); // E = B
            int noteOctave = (48 - ((Y + 2) / 4)) / 7;

            //MessageBox.Show("X = "+X+", Y = "+Y+" / "+noteName+" "+noteOctave);

            if (SelectedMode == EditeurMode.Delete)
            {
                DeleteSlur(viewer, index);
                viewer.RemoveMusicalSymbolAt(index);
            }

            if (SelectedMode == EditeurMode.Edit)
            {
                Note tmp = new Note(noteName, 0, noteOctave, 
                    SelectedDuration, SelectedColor, NoteStemDirection.Up, NoteTieType.None,
                    (SelectedDuration > MusicalSymbolDuration.Quarter ? ((Note)viewer.IncipitElement(index)).BeamList : new List<NoteBeamType>() { NoteBeamType.Single }));

                if (SelectedDuration <= MusicalSymbolDuration.Quarter)
                    ManageModeBeam(viewer, index, EditeurMode.Delete);

                if (tmp.Step == ((Note)viewer.IncipitElement(index)).Step && tmp.Octave == ((Note)viewer.IncipitElement(index)).Octave)
                    tmp.TieType = ((Note)viewer.IncipitElement(index)).TieType;
                else
                    ManageModeTie(viewer, index, EditeurMode.Delete);

                tmp.Slur = ((Note)viewer.IncipitElement(index)).Slur;

                viewer.RemoveMusicalSymbolAt(index);
                viewer.InciptInsert(index, tmp);
            }

            if (SelectedMode == EditeurMode.Add)
            {
                if (SelectedSymbol == MusicalSymbolType.Note)
                {
                    viewer.InciptInsert(
                        index,
                        new Note(noteName, 0, noteOctave, SelectedDuration, SelectedColor, 
                            NoteStemDirection.Up, NoteTieType.StopAndStartAnother, new List<NoteBeamType>() { NoteBeamType.Continue })
                    );
                    ManageModeTie(viewer, index, EditeurMode.Delete);
                    ManageModeBeam(viewer, index, EditeurMode.Delete);
                }
                else if (SelectedSymbol == MusicalSymbolType.Rest)
                    viewer.InciptInsert(
                        index,
                        new Rest(SelectedDuration, SelectedColor)
                    );

                // Notes.Insert(i * linenb, new NoteSymb(new StringBuilder().Append(Convert.ToChar((40 - ((Y + 2) / 4)) % 7 + 65)).ToString(), 0, (38 - ((Y + 2) / 4)) / 7, SelectedDuration, SelectedColor));
            }
        }

        public void ManageModeSlur(IncipitViewer viewer, int index, EditeurMode SelectedMode)
        {
            if (viewer.IncipitElement(index).Type != MusicalSymbolType.Note)
                return;

            if (SelectedMode == EditeurMode.Add || (SelectedMode == EditeurMode.Edit && StartSlur != -1))
            {
                if (((Note)viewer.IncipitElement(index)).Slur != NoteSlurType.None)
                    return;

                if (StartSlur == -1)
                {
                    StartSlur = index;
                    viewer.IncipitElement(StartSlur).MusicalCharacterColor = Color.Red;
                }
                else if (StartSlur == index)
                {
                    viewer.IncipitElement(StartSlur).MusicalCharacterColor = Color.Black;
                    StartSlur = -1;
                }
                else
                {
                    int start = (StartSlur < index ? StartSlur : index), stop = (StartSlur < index ? index : StartSlur);

                    for (int i = start; i <= stop; i++)
                        if (viewer.IncipitElement(i).Type == MusicalSymbolType.Note && ((Note)viewer.IncipitElement(i)).Slur != NoteSlurType.None)
                            return;
                    for (int i = stop + 1; viewer.IncipitElement(i) != null; i++)
                        if (viewer.IncipitElement(i).Type == MusicalSymbolType.Note)
                        {
                            if (((Note)viewer.IncipitElement(i)).Slur == NoteSlurType.Stop)
                                return;
                            else if (((Note)viewer.IncipitElement(i)).Slur == NoteSlurType.Start)
                                break;
                        }

                    viewer.IncipitElement(StartSlur).MusicalCharacterColor = Color.Black;
                    ((Note)viewer.IncipitElement(start)).Slur = NoteSlurType.Start;
                    ((Note)viewer.IncipitElement(stop)).Slur = NoteSlurType.Stop;
                    StartSlur = -1;
                }
            }
            else if (SelectedMode == EditeurMode.Delete)
            {
                DeleteSlur(viewer, index);
            }
            else if (SelectedMode == EditeurMode.Edit)
            {
                if (StartSlur == -1)
                {
                    if (((Note)viewer.IncipitElement(index)).Slur == NoteSlurType.None)
                        return;

                    int dir = ((Note)viewer.IncipitElement(index)).Slur == NoteSlurType.Stop ? -1 : 1;

                    for (int i = index + dir; i >= 0 && viewer.IncipitElement(i) != null; i += dir)
                        if (viewer.IncipitElement(i).Type == MusicalSymbolType.Note && ((Note)viewer.IncipitElement(i)).Slur != NoteSlurType.None)
                        {
                            StartSlur = i;
                            viewer.IncipitElement(StartSlur).MusicalCharacterColor = Color.Red;
                            ((Note)viewer.IncipitElement(StartSlur)).Slur = NoteSlurType.None;
                            break;
                        }
                    ((Note)viewer.IncipitElement(index)).Slur = NoteSlurType.None;
                }
            }
        }

        public void ManageModeTie(IncipitViewer viewer, int index, EditeurMode SelectedMode)
        {
            if (viewer.IncipitElement(index).Type != MusicalSymbolType.Note)
                return;

            if (SelectedMode == EditeurMode.Add || SelectedMode == EditeurMode.Edit)
            {
                if (StartSlur == -1)
                {
                    StartSlur = index;
                    viewer.IncipitElement(StartSlur).MusicalCharacterColor = Color.Red;
                }
                else if (StartSlur == index)
                {
                    viewer.IncipitElement(StartSlur).MusicalCharacterColor = Color.Black;
                    StartSlur = -1;
                }
                else
                {
                    int start = (StartSlur < index ? StartSlur : index), stop = (StartSlur < index ? index : StartSlur);

                    for (int i = start + 1; i <= stop; i++)
                        if (viewer.IncipitElement(i).Type == MusicalSymbolType.Note &&
                            (((Note)viewer.IncipitElement(i)).Step != ((Note)viewer.IncipitElement(start)).Step ||
                            ((Note)viewer.IncipitElement(i)).Octave != ((Note)viewer.IncipitElement(start)).Octave))
                            return;

                    // Set Middle Note
                    for (int i = start + 1; i < stop; i++)
                        if (viewer.IncipitElement(i).Type == MusicalSymbolType.Note)
                            ((Note)viewer.IncipitElement(i)).TieType = NoteTieType.StopAndStartAnother;

                    viewer.IncipitElement(StartSlur).MusicalCharacterColor = Color.Black;

                    bool found = false;
                    // Set Start Note && Check Note Before
                    for (int i = start - 1; i >= 0 && viewer.IncipitElement(i) != null; i--)
                        if (viewer.IncipitElement(i).Type == MusicalSymbolType.Note)
                        {
                            if (((Note)viewer.IncipitElement(i)).TieType == NoteTieType.StopAndStartAnother)
                            {
                                ((Note)viewer.IncipitElement(i)).TieType = NoteTieType.StopAndStartAnother;
                                ((Note)viewer.IncipitElement(start)).TieType = NoteTieType.StopAndStartAnother;
                            }
                            else if (((Note)viewer.IncipitElement(i)).TieType == NoteTieType.Start)
                                ((Note)viewer.IncipitElement(start)).TieType = NoteTieType.StopAndStartAnother;
                            else
                                ((Note)viewer.IncipitElement(start)).TieType = NoteTieType.Start;
                            found = true;
                            break;
                        }
                    if (!found)
                        ((Note)viewer.IncipitElement(start)).TieType = NoteTieType.Start;

                    found = false;
                    // Set Start Note && Check Note Before
                    for (int i = stop + 1; viewer.IncipitElement(i) != null; i++)
                        if (viewer.IncipitElement(i).Type == MusicalSymbolType.Note)
                        {
                            if (((Note)viewer.IncipitElement(i)).TieType == NoteTieType.StopAndStartAnother)
                            {
                                ((Note)viewer.IncipitElement(i)).TieType = NoteTieType.StopAndStartAnother;
                                ((Note)viewer.IncipitElement(stop)).TieType = NoteTieType.StopAndStartAnother;
                            }
                            else if (((Note)viewer.IncipitElement(i)).TieType == NoteTieType.StopAndStartAnother)
                                ((Note)viewer.IncipitElement(stop)).TieType = NoteTieType.StopAndStartAnother;
                            else
                                ((Note)viewer.IncipitElement(stop)).TieType = NoteTieType.Stop;
                            found = true;
                            break;
                        }
                    if (!found)
                        ((Note)viewer.IncipitElement(stop)).TieType = NoteTieType.Stop;

                    StartSlur = -1;
                }
            }
            else if (SelectedMode == EditeurMode.Delete)
            {
                if (((Note)viewer.IncipitElement(index)).TieType == NoteTieType.None)
                    return;

                if (((Note)viewer.IncipitElement(index)).TieType != NoteTieType.Start)
                    for (int i = index - 1; i >= 0 && viewer.IncipitElement(i) != null; i--)
                        if (viewer.IncipitElement(i).Type == MusicalSymbolType.Note)
                        {
                            if (((Note)viewer.IncipitElement(i)).TieType == NoteTieType.Start)
                                ((Note)viewer.IncipitElement(i)).TieType = NoteTieType.None;
                            else if (((Note)viewer.IncipitElement(i)).TieType == NoteTieType.StopAndStartAnother)
                                ((Note)viewer.IncipitElement(i)).TieType = NoteTieType.Stop;
                            break;
                        }

                if (((Note)viewer.IncipitElement(index)).TieType != NoteTieType.Stop)
                    for (int i = index + 1; viewer.IncipitElement(i) != null; i++)
                        if (viewer.IncipitElement(i).Type == MusicalSymbolType.Note)
                        {
                            if (((Note)viewer.IncipitElement(i)).TieType == NoteTieType.Stop)
                                ((Note)viewer.IncipitElement(i)).TieType = NoteTieType.None;
                            else if (((Note)viewer.IncipitElement(i)).TieType == NoteTieType.StopAndStartAnother)
                                ((Note)viewer.IncipitElement(i)).TieType = NoteTieType.Start;
                            break;
                        }

                ((Note)viewer.IncipitElement(index)).TieType = NoteTieType.None;
            }
        }

        public void ManageModeBeam(IncipitViewer viewer, int index, EditeurMode SelectedMode)
        {
            if (viewer.IncipitElement(index).Type != MusicalSymbolType.Note)
                return;

            if (SelectedMode == EditeurMode.Add || SelectedMode == EditeurMode.Edit)
            {
                #region Add Beam
                if (StartSlur == -1)
                {
                    StartSlur = index;
                    viewer.IncipitElement(StartSlur).MusicalCharacterColor = Color.Red;
                }
                else if (StartSlur == index)
                {
                    viewer.IncipitElement(StartSlur).MusicalCharacterColor = Color.Black;
                    StartSlur = -1;
                }
                else
                {
                    int start = (StartSlur < index ? StartSlur : index), stop = (StartSlur < index ? index : StartSlur);

                    for (int i = start; i <= stop; i++)
                        if (viewer.IncipitElement(i).Type == MusicalSymbolType.Note &&
                            ((Note)viewer.IncipitElement(i)).Duration < MusicalSymbolDuration.Eighth)
                            return;

                    // Set Middle Note
                    for (int i = start + 1; i < stop; i++)
                        if (viewer.IncipitElement(i).Type == MusicalSymbolType.Note)
                        {
                            ((Note)viewer.IncipitElement(i)).BeamList.Clear();
                            ((Note)viewer.IncipitElement(i)).BeamList.Add(NoteBeamType.Continue);
                            //((Note)viewer.IncipitElement(i)).beamList = NoteTieType.StopAndStartAnother;
                        }

                    viewer.IncipitElement(StartSlur).MusicalCharacterColor = Color.Black;

                    // Set Start Note && Check Note Before
                    for (int i = start - 1; i >= 0 && viewer.IncipitElement(i) != null; i--)
                        if (viewer.IncipitElement(i).Type == MusicalSymbolType.Note)
                        {
                            if (((Note)viewer.IncipitElement(i)).BeamList.Count == 0)
                                break;

                            if (((Note)viewer.IncipitElement(i)).BeamList.Contains(NoteBeamType.Start))
                            {
                                ((Note)viewer.IncipitElement(i)).BeamList.Clear();
                                ((Note)viewer.IncipitElement(i)).BeamList.Add(NoteBeamType.Single);
                            }
                            else if (((Note)viewer.IncipitElement(i)).BeamList.Contains(NoteBeamType.Continue))
                                ((Note)viewer.IncipitElement(i)).BeamList[((Note)viewer.IncipitElement(i)).BeamList.IndexOf(NoteBeamType.Continue)] = NoteBeamType.End;

                            break;
                        }

                    ((Note)viewer.IncipitElement(start)).BeamList.Clear();
                    ((Note)viewer.IncipitElement(start)).BeamList.Add(NoteBeamType.Start);

                    // Set Start Note && Check Note Before
                    for (int i = stop + 1; viewer.IncipitElement(i) != null; i++)
                        if (viewer.IncipitElement(i).Type == MusicalSymbolType.Note)
                        {
                            if (((Note)viewer.IncipitElement(i)).BeamList.Count == 0)
                                break;

                            if (((Note)viewer.IncipitElement(i)).BeamList.Contains(NoteBeamType.End))
                            {
                                ((Note)viewer.IncipitElement(i)).BeamList.Clear();
                                ((Note)viewer.IncipitElement(i)).BeamList.Add(NoteBeamType.Single);
                            }
                            else if (((Note)viewer.IncipitElement(i)).BeamList.Contains(NoteBeamType.Continue))
                                ((Note)viewer.IncipitElement(i)).BeamList[((Note)viewer.IncipitElement(i)).BeamList.IndexOf(NoteBeamType.Continue)] = NoteBeamType.Start;

                            break;
                        }

                    ((Note)viewer.IncipitElement(stop)).BeamList.Clear();
                    ((Note)viewer.IncipitElement(stop)).BeamList.Add(NoteBeamType.End);

                    StartSlur = -1;
                }
                #endregion
            }
            else if (SelectedMode == EditeurMode.Delete)
            {
                if (!(((Note)viewer.IncipitElement(index)).BeamList.Contains(NoteBeamType.Start) || 
                      ((Note)viewer.IncipitElement(index)).BeamList.Contains(NoteBeamType.End) || 
                      ((Note)viewer.IncipitElement(index)).BeamList.Contains(NoteBeamType.Continue)))
                    return;

                // Si End ou Continue
                if (!((Note)viewer.IncipitElement(index)).BeamList.Contains(NoteBeamType.Start))
                    for (int i = index - 1; i >= 0 && viewer.IncipitElement(i) != null; i--)
                        if (viewer.IncipitElement(i).Type == MusicalSymbolType.Note)
                        {
                            if (((Note)viewer.IncipitElement(i)).BeamList.Contains(NoteBeamType.Start))
                            {
                                ((Note)viewer.IncipitElement(i)).BeamList.Clear();
                                ((Note)viewer.IncipitElement(i)).BeamList.Add(NoteBeamType.Single);
                            }
                            else if (((Note)viewer.IncipitElement(i)).BeamList.Contains(NoteBeamType.Continue))
                                ((Note)viewer.IncipitElement(i)).BeamList[((Note)viewer.IncipitElement(i)).BeamList.IndexOf(NoteBeamType.Continue)] = NoteBeamType.End;
                            break;
                        }

                // Si Start ou Continue
                if (!((Note)viewer.IncipitElement(index)).BeamList.Contains(NoteBeamType.End))
                    for (int i = index + 1; viewer.IncipitElement(i) != null; i++)
                        if (viewer.IncipitElement(i).Type == MusicalSymbolType.Note)
                        {
                            if (((Note)viewer.IncipitElement(i)).BeamList.Contains(NoteBeamType.End))
                            {
                                ((Note)viewer.IncipitElement(i)).BeamList.Clear();
                                ((Note)viewer.IncipitElement(i)).BeamList.Add(NoteBeamType.Single);
                            }
                            else if (((Note)viewer.IncipitElement(i)).BeamList.Contains(NoteBeamType.Continue))
                                ((Note)viewer.IncipitElement(i)).BeamList[((Note)viewer.IncipitElement(i)).BeamList.IndexOf(NoteBeamType.Continue)] = NoteBeamType.Start;
                            break;
                        }

                ((Note)viewer.IncipitElement(index)).BeamList.Clear();
                ((Note)viewer.IncipitElement(index)).BeamList.Add(NoteBeamType.Single);
            }
        }
    }
}
