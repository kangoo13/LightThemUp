using System;
using System.IO;
using System.Collections.Generic;
using System.Drawing;
using System.Text;
using System.Text.RegularExpressions;
using System.Windows.Forms;
using Sanford.Multimedia.Midi;
using PSAMControlLibrary;
using net.sf.jni4net;
using System.Threading;
using System.Net.Http;
using System.Net;
using System.Net.Http.Headers;
using System.Json;

namespace LTP
{
    public partial class MainForm : Form
    {

        public static string eipUrl = "http://lightthemup.fr.nf:3000";

        private Sequencer sequencer = new Sequencer();

        private Controller ctrl = new Controller();
        private Button SelectedSymbolButton = null;
        private MusicalSymbolDuration SelectedDuration = MusicalSymbolDuration.Quarter;
        private MusicalSymbolType SelectedSymbol = MusicalSymbolType.Note;
        private Color SelectedColor = Color.Black;

        private ToolStripMenuItem ArmureSelect = null;
        private Key armure = null;

        private Button SelectedModeButton = null;
        private Controller.EditeurMode SelectedMode = Controller.EditeurMode.Add;

        private Button SelectedSecondaryModeButton = null;
        private Controller.EditeurMode SelectedSecondaryMode = Controller.EditeurMode.None;

        private Clef clef = new Clef(ClefType.GClef, 2);
        private TimeSignature TimeSign = new TimeSignature(TimeSignatureType.Numbers, 4, 4);

        private Size sizeOffset;

        private static Random random = new Random((int)DateTime.Now.Ticks);

        private UserForm login;
        private UserDownload download;

        private string RandNote()
        {
            StringBuilder builder = new StringBuilder();

            builder.Append(Convert.ToChar(Convert.ToInt32(Math.Floor(7 * random.NextDouble() + 65))));
            return builder.ToString();
        }

        public MainForm()
        {
            InitializeComponent();

            login = new UserForm();

            sizeOffset = new Size(this.Size.Width - ControlPanel.Size.Width - MainContainer.Size.Width, this.Size.Height - MainContainer.Size.Height);

            viewer.AddMusicalSymbol(clef);
            viewer.AddMusicalSymbol(TimeSign);

            sequencer.Sequence = new Sequence();

            ChangeSymbolSelection(QuarterNoteSelect, MusicalSymbolDuration.Quarter, MusicalSymbolType.Note);
            ChangeModeSelection(AddMode, Controller.EditeurMode.Add);
            ChangeSecondaryModeSelection(SetNote, Controller.EditeurMode.Note);

            Display();
        }

        #region Panel Button

        private void ChangeSymbolSelection(Button ActiveButton, MusicalSymbolDuration Duration, MusicalSymbolType Symbol)
        {
            if (SelectedSymbolButton != null)
                SelectedSymbolButton.BackColor = Color.FromName("Control");
            SelectedDuration = Duration;
            SelectedSymbolButton = ActiveButton;
            SelectedSymbol = Symbol;
            SelectedSymbolButton.BackColor = Color.FromName("ActiveCaption");
        }

        #region Select Note Type

        private void WholeNoteSelect_Click(object sender, EventArgs e)
        {
            ChangeSymbolSelection(WholeNoteSelect, MusicalSymbolDuration.Whole, MusicalSymbolType.Note);
        }

        private void HalfNoteSelect_Click(object sender, EventArgs e)
        {
            ChangeSymbolSelection(HalfNoteSelect, MusicalSymbolDuration.Half, MusicalSymbolType.Note);
        }

        private void QuarterNoteSelect_Click(object sender, EventArgs e)
        {
            ChangeSymbolSelection(QuarterNoteSelect, MusicalSymbolDuration.Quarter, MusicalSymbolType.Note);
        }

        private void EighthNoteSelect_Click(object sender, EventArgs e)
        {
            ChangeSymbolSelection(EighthNoteSelect, MusicalSymbolDuration.Eighth, MusicalSymbolType.Note);
        }

        private void SixteenthNoteSelect_Click(object sender, EventArgs e)
        {
            ChangeSymbolSelection(SixteenthNoteSelect, MusicalSymbolDuration.Sixteenth, MusicalSymbolType.Note);
        }

        private void d32ndNoteSelect_Click(object sender, EventArgs e)
        {
            ChangeSymbolSelection(d32ndNoteSelect, MusicalSymbolDuration.d32nd, MusicalSymbolType.Note);
        }

        private void d64ndNoteSelect_Click(object sender, EventArgs e)
        {
            ChangeSymbolSelection(d64ndNoteSelect, MusicalSymbolDuration.d64th, MusicalSymbolType.Note);
        }

        private void d128ndNoteSelect_Click(object sender, EventArgs e)
        {
            ChangeSymbolSelection(d128ndNoteSelect, MusicalSymbolDuration.d128th, MusicalSymbolType.Note);
        }

        #endregion

        #region Select Rest

        private void WholeRest_Click(object sender, EventArgs e)
        {
            ChangeSymbolSelection(WholeRest, MusicalSymbolDuration.Whole, MusicalSymbolType.Rest);
        }

        private void HalfRest_Click(object sender, EventArgs e)
        {
            ChangeSymbolSelection(HalfRest, MusicalSymbolDuration.Half, MusicalSymbolType.Rest);
        }

        private void QuarterRest_Click(object sender, EventArgs e)
        {
            ChangeSymbolSelection(QuarterRest, MusicalSymbolDuration.Quarter, MusicalSymbolType.Rest);
        }

        private void EighthRest_Click(object sender, EventArgs e)
        {
            ChangeSymbolSelection(EighthRest, MusicalSymbolDuration.Eighth, MusicalSymbolType.Rest);
        }

        private void SixteenthRest_Click(object sender, EventArgs e)
        {
            ChangeSymbolSelection(SixteenthRest, MusicalSymbolDuration.Sixteenth, MusicalSymbolType.Rest);
        }

        private void d32ndRest_Click(object sender, EventArgs e)
        {
            ChangeSymbolSelection(d32ndRest, MusicalSymbolDuration.d32nd, MusicalSymbolType.Rest);
        }

        private void d64thRest_Click(object sender, EventArgs e)
        {
            ChangeSymbolSelection(d64thRest, MusicalSymbolDuration.d64th, MusicalSymbolType.Rest);
        }

        private void d128thRest_Click(object sender, EventArgs e)
        {
            ChangeSymbolSelection(d128thRest, MusicalSymbolDuration.d128th, MusicalSymbolType.Rest);
        }

        #endregion

        #region Select Note Color

        private void ColorBlack_Click(object sender, EventArgs e)
        {
            SelectedColor = Color.Black;
        }

        private void ColorRed_Click(object sender, EventArgs e)
        {
            SelectedColor = Color.Red;
        }

        private void ColorGreen_Click(object sender, EventArgs e)
        {
            SelectedColor = Color.Green;
        }

        private void ColorYellow_Click(object sender, EventArgs e)
        {
            SelectedColor = Color.Yellow;
        }

        private void ColorBlue_Click(object sender, EventArgs e)
        {
            SelectedColor = Color.Blue;
        }

        private void ColorMagenta_Click(object sender, EventArgs e)
        {
            SelectedColor = Color.Magenta;
        }

        #endregion

        private void ChangeModeSelection(Button ActiveButton, Controller.EditeurMode Mode)
        {
            if (SelectedModeButton != null)
                SelectedModeButton.BackColor = Color.FromName("Control");
            SelectedMode = Mode;
            SelectedModeButton = ActiveButton;
            SelectedModeButton.BackColor = Color.FromName("ActiveCaption");
        }

        #region Select Mode
        private void AddMode_Click(object sender, EventArgs e)
        {
            ChangeModeSelection((Button)sender, Controller.EditeurMode.Add);
        }

        private void EditMode_Click(object sender, EventArgs e)
        {
            ChangeModeSelection((Button)sender, Controller.EditeurMode.Edit);
        }

        private void DeleteMode_Click(object sender, EventArgs e)
        {
            ChangeModeSelection((Button)sender, Controller.EditeurMode.Delete);
        }
        #endregion

        private void ChangeSecondaryModeSelection(Button ActiveButton, Controller.EditeurMode Mode)
        {
            if (ctrl.startslur != -1)
                viewer.IncipitElement(ctrl.startslur).MusicalCharacterColor = Color.Black;
            ctrl.startslur = -1;

            if (SelectedSecondaryModeButton != null)
                SelectedSecondaryModeButton.BackColor = Color.FromName("Control");
            SelectedSecondaryMode = Mode;
            SelectedSecondaryModeButton = ActiveButton;
            SelectedSecondaryModeButton.BackColor = Color.FromName("ActiveCaption");
        }

        #region Select Secondary Mode
        private void SetSlur_Click(object sender, EventArgs e)
        {
            ChangeSecondaryModeSelection((Button)sender, Controller.EditeurMode.Slur);
        }

        private void SetNote_Click(object sender, EventArgs e)
        {
            ChangeSecondaryModeSelection((Button)sender, Controller.EditeurMode.Note);
        }

        private void SetBeam_Click(object sender, EventArgs e)
        {
            ChangeSecondaryModeSelection((Button)sender, Controller.EditeurMode.Beam);
        }

        private void SetTie_Click(object sender, EventArgs e)
        {
            ChangeSecondaryModeSelection((Button)sender, Controller.EditeurMode.Tie);
        }
        #endregion

        private void button1_Click(object sender, EventArgs e)
        {
            /*
            switch (SelectedSymbol)
            {
                case MusicalSymbolType.Note:
                    //viewer.AddMusicalSymbol(new NoteSymb(RandNote(), 0, 4, SelectedDuration, SelectedColor).getSymb());
                    //Notes.Add(new NoteSymb(RandNote(), 0, 4, SelectedDuration, SelectedColor));
                    viewer.AddMusicalSymbol(new NoteSymb("C", 0, 4, SelectedDuration, SelectedColor).getSymb());
                    viewer.AddMusicalSymbol(new NoteSymb("D", 0, 4, SelectedDuration, SelectedColor).getSymb());
                    viewer.AddMusicalSymbol(new NoteSymb("E", 0, 4, SelectedDuration, SelectedColor).getSymb());
                    viewer.AddMusicalSymbol(new NoteSymb("F", 0, 4, SelectedDuration, SelectedColor).getSymb());
                    viewer.AddMusicalSymbol(new NoteSymb("G", 0, 4, SelectedDuration, Color.Black).getSymb());
                    viewer.AddMusicalSymbol(new NoteSymb("A", 0, 4, SelectedDuration, Color.Black).getSymb());
                    viewer.AddMusicalSymbol(new NoteSymb("B", 0, 4, SelectedDuration, Color.Black).getSymb());
                    viewer.AddMusicalSymbol(new NoteSymb("C", 0, 5, SelectedDuration, Color.Black).getSymb());
                    viewer.AddMusicalSymbol(new NoteSymb("B", 0, 4, SelectedDuration, Color.Black).getSymb());
                    viewer.AddMusicalSymbol(new NoteSymb("A", 0, 4, SelectedDuration, Color.Black).getSymb());
                    viewer.AddMusicalSymbol(new NoteSymb("G", 0, 4, SelectedDuration, Color.Black).getSymb());
                    viewer.AddMusicalSymbol(new NoteSymb("F", 0, 4, SelectedDuration, Color.Black).getSymb());
                    viewer.AddMusicalSymbol(new NoteSymb("E", 0, 4, SelectedDuration, Color.Black).getSymb());
                    viewer.AddMusicalSymbol(new NoteSymb("D", 0, 4, SelectedDuration, Color.Black).getSymb());
                    viewer.AddMusicalSymbol(new NoteSymb("C", 0, 4, SelectedDuration, Color.Black).getSymb());

                    break;

                case MusicalSymbolType.Rest:
                    viewer.AddMusicalSymbol(new RestSymb(SelectedDuration, SelectedColor).getSymb());
                    //Notes.Add(new RestSymb(SelectedDuration, SelectedColor));
                    break;

                default:
                    //viewer.AddMusicalSymbol(new Direction());
                    break;
            }
            */
            viewer.SetAutoBeams();

            Display();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            viewer.RemoveLastMusicalSymbol();
            Display();
        }

        #endregion

        public void Display()
        {
            Refresh();
        }


        private int X;
        private int Y;

        private void viewer_MouseDown(object sender, MouseEventArgs e)
        {
            X = e.X;
            Y = e.Y;
        }

        private void viewer_Click(object sender, EventArgs e)
        {
            List<int[]> line = viewer.linesCoord;
            int linenb = 0;
            bool foundY = false;

            #region Get Line
            for (int i = 0; i < line.Count; i++)
                if (line[i][0] <= Y && Y <= line[i][1])
                {
                    Y -= line[i][0];
                    line = viewer.noteCoord[i];
                    foundY = true;
                    break;
                }
                else
                    linenb += viewer.noteCoord[i].Count - 1;

            if (!foundY)
                return;
            #endregion

            #region Get Colone
            int col = -1;
            for (int i = 0; i < line.Count; i++)
                if (line[i][0] <= X && X <= line[i][1])
                {
                    // 1  - 2  - 3  - 4  - 5  - 6  - 7
                    // A  - B  - C  - D  - E  - F  - G
                    // La - Si - Do - Re - Mi - Fa - Sol

                    /* 
                    MessageBox.Show(string.Format("Num: {0} Note: {1} Octave: {2} #Note Found",
                         ((Y + 2) / 4),
                         Convert.ToChar((40 - ((Y + 2) / 4)) % 7 + 65), 
                         (38 - ((Y + 2) / 4)) / 7));
                     /* */

                    col = i;
                    break;
                }

            if (col == -1)
                col = line.Count;

            for (int count = 0; count < col + linenb; count++)
            {
                if (viewer.IncipitElement(count) != null)
                {
                    MusicalSymbolType tmp = viewer.IncipitElement(count).Type;
                    if (tmp != MusicalSymbolType.Note && tmp != MusicalSymbolType.Rest)
                        col++;
                }
            }
            #endregion

            int index = col + linenb - 1;
            if (index < 0)
                index = 0;

            if (viewer.CountMusicalSymbols() > index || (SelectedSecondaryMode == Controller.EditeurMode.Note && SelectedMode == Controller.EditeurMode.Add))
            {
                if (SelectedSecondaryMode == Controller.EditeurMode.Slur)
                    ctrl.ManageModeSlur(viewer, index, SelectedMode);
                else if (SelectedSecondaryMode == Controller.EditeurMode.Note)
                    ctrl.ManageModeNote(viewer, index, SelectedMode, X, Y, SelectedSymbol, SelectedDuration, SelectedColor);
                else if (SelectedSecondaryMode == Controller.EditeurMode.Tie)
                    ctrl.ManageModeTie(viewer, index, SelectedMode);
                else if (SelectedSecondaryMode == Controller.EditeurMode.Beam)
                    ctrl.ManageModeBeam(viewer, index, SelectedMode);
            }

            Display();
        }

        #region Resize
        private void Form1_ResizeEnd(Object sender, EventArgs e)
        {
            Resize_Incipit();
            //MessageBox.Show("You are in the Form.ResizeEnd event.");
        }

        protected override void OnSizeChanged(EventArgs e)
        {
            if (sizeOffset.Height == 0 && sizeOffset.Width == 0)
                return;
            if (this.WindowState == FormWindowState.Maximized || WindowState == FormWindowState.Normal)
                Resize_Incipit();
            base.OnSizeChanged(e);
        }

        private void Resize_Incipit()
        {
            int x = this.Size.Width - sizeOffset.Width - ControlPanel.Size.Width;
            int y = this.Size.Height - sizeOffset.Height;

            //if (x == MainContainer.Size.Width && y == MainContainer.Size.Height)
            //    return;
            MainContainer.Size = new Size(x, y);
            viewer.Size = new Size(x - 30, viewer.Size.Height);
            ControlPanel.Size = new Size(ControlPanel.Size.Width, y);
            Refresh();
        }
        #endregion

        private void openToolStripMenuItem_Click(object sender, EventArgs e)
        {
            //Ouverture du fichier a charger
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.Filter = "MusicMIDI(*.mid) | *.mid";
            if (openFileDialog.ShowDialog() == System.Windows.Forms.DialogResult.OK)
            {
                //Load du fichier dans sequence
                try
                {
                    sequencer.Sequence.Load(openFileDialog.FileName);
                }
                catch (Exception exception)
                {
                    MessageBox.Show("File is incorrect: " + exception.Message);
                }

                convertSequenceToIncipit();

                //Rafraichissement de l'affichage
                Display();
            }
        }

        // Clear and fill viewer.incipit
        #region old
        private void convertSequenceToIncipit()
        {
            bool tempoSet = false;
            //Suppression des elements de l'incipit
            viewer.ClearMusicalIncipit();
            viewer.AddMusicalSymbol(clef);
            viewer.AddMusicalSymbol(TimeSign);

            //Parcourt des différentes tracks

            musicProgressBar.Show();
            musicProgressBar.Value = 0;
            musicProgressBar.PerformStep();
            foreach (Track track in sequencer.Sequence)
            {
                //Parcourt des messages de la track
                foreach (MidiEvent notes in track.Iterator())
                {
                    musicProgressBar.Increment((int) (notes.AbsoluteTicks / track.Length * 100));
                    //Si c'est un channel message
                    if (notes.MidiMessage.MessageType == MessageType.Channel)
                    {
                        //cast dans le bon format
                        ChannelMessage message = (ChannelMessage)(notes.MidiMessage);
                        List<NoteBeamType> noteBeamList = new List<NoteBeamType> { NoteBeamType.Single };
                        byte[] intBytes = message.GetBytes();

                        if ((message.Command == ChannelCommand.NoteOn || message.Command == ChannelCommand.NoteOff) && notes.DeltaTicks != 0)
                        {
                            //Note - velocité
                            //Récupérartion octave+note
                            string[] tab = { "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" };
                            int pitch = intBytes[1];
                            int octave = pitch / 12 - 1;
                            int note = pitch % 12;

                            viewer.AddMusicalSymbol((new NoteSymb(tab[note], 0, octave, getDurationFromTick(notes.DeltaTicks, sequencer.Sequence.Division), Color.Black).getSymb()));
                        }
                    }
                    else if (notes.MidiMessage.MessageType == MessageType.Meta)
                    {
                        MetaMessage message = (MetaMessage)(notes.MidiMessage);

                        switch (message.MetaType)
                        {
                            case (MetaType.TrackName):
                                string content = "";
                                foreach (byte b in message.GetBytes())
                                    content += (Char)b;
                                this.title.Text = content;
                                break;
                            case (MetaType.Tempo):
                                byte[] bytes = { 0, (message.GetBytes())[0], (message.GetBytes())[1], (message.GetBytes())[2]};

                                if (BitConverter.IsLittleEndian)
                                    Array.Reverse(bytes);

                                int tempo = BitConverter.ToInt32(bytes, 0);
                                if (!tempoSet)
                                {
                                    tempoSet = true;
                                    this.TempoValue = (int)(60000.0 / ((Double)tempo / 1000.0));
                                    this.Tempo.Text = ((int)(60000.0 / ((Double)tempo / 1000.0))).ToString();
                                }
                                break;
                            case (MetaType.TimeSignature):
                                TimeSignature newTimeSign = new TimeSignature(TimeSignatureType.Numbers, (message.GetBytes())[0], Convert.ToUInt32(1 << (message.GetBytes())[1]));
                                viewer.ChangeMusicalSymbol(TimeSign, newTimeSign);
                                TimeSign = newTimeSign;
                                break;
                            case (MetaType.KeySignature):
                                if ((message.GetBytes())[0] != 0)
                                {
                                    int key = (message.GetBytes())[0];
                                    if (key > 7)
                                        key = key - 256;
                                    ArmureSelect = MenuArmure_Default;
                                    ToolStripMenuItem newArmure = getArmureItemFromKey(key);
                                    changeArmure(newArmure, new Key(key));
                                }
                                break;
                        }
                    }
                }
            }
            musicProgressBar.Hide();
        }
        #endregion

        private ToolStripMenuItem getArmureItemFromKey(int key)
        {
            switch (key)
            {
                case (-7):
                    return MenuArmure_7b;
                case (-6):
                    return MenuArmure_6b;
                case (-5):
                    return MenuArmure_5b;
                case (-4):
                    return MenuArmure_4b;
                case (-3):
                    return MenuArmure_3b;
                case (-2):
                    return MenuArmure_2b;
                case (-1):
                    return MenuArmure_1b;
                case (1):
                    return MenuArmure_1d;
                case (2):
                    return MenuArmure_2d;
                case (3):
                    return MenuArmure_3d;
                case (4):
                    return MenuArmure_4d;
                case (5):
                    return MenuArmure_5d;
                case (6):
                    return MenuArmure_6d;
                case (7):
                    return MenuArmure_7d;
                default:
                    return MenuArmure_Default;
            }

        }

        private MusicalSymbolDuration getDurationFromTick(int ticks, int division)
        {
            if (ticks > division * 4 - (division / 2))
                return MusicalSymbolDuration.Whole;
            if (ticks > division * 2 - (division / 4))
                return MusicalSymbolDuration.Half;
            if (ticks > division - (division / 8))
                return MusicalSymbolDuration.Quarter;
            if (ticks > division / 2 - (division / 16))
                return MusicalSymbolDuration.Eighth;
            if (ticks > division / 4 - (division / 32))
                return MusicalSymbolDuration.Sixteenth;
            if (ticks > division / 8 - (division / 64))
                return MusicalSymbolDuration.d32nd;
            if (ticks > division / 16 - (division / 128))
                return MusicalSymbolDuration.d64th;
            return MusicalSymbolDuration.d128th;
        }

        private void saveToolStripMenuItem_Click(object sender, EventArgs e)
        {
            //viewer.save();
            SaveFileDialog saveFileDialog = new SaveFileDialog();
            saveFileDialog.Filter = "MusicMIDI(*.mid) | *.mid";
            if (saveFileDialog.ShowDialog(this) == DialogResult.OK)
            {
                saveIncipitToTrack();

                sequencer.Sequence.Save(saveFileDialog.FileName);
            }
        }

        public void saveIncipitToTrack()
        {
            int nbSymbols = viewer.CountMusicalSymbols();
            
            if (sequencer.Sequence.Count > 0)
                sequencer.Sequence.Clear();

            sequencer.Sequence.Division = 64;

            Track incipitTrack = new Track();

            if (this.title.Text != null && this.title.Text != "")
            {
                int i = 0;
                byte[] message = new byte[this.title.Text.Length];
                foreach (Char c in this.title.Text)
                    message[i++] = (Byte) c;
                incipitTrack.Insert(0, new MetaMessage(MetaType.TrackName, message));
            }
            if (this.Tempo.Text != null && this.Tempo.Text != "" && this.TempoValue != 0)
            {
                int tempoBit = (int)(60000.0 / (this.TempoValue)) * 1000;
                byte[] intBytes = BitConverter.GetBytes(tempoBit);
                if (BitConverter.IsLittleEndian)
                    Array.Reverse(intBytes);
                byte[] message = { intBytes[1], intBytes[2], intBytes[3] };

                incipitTrack.Insert(0, new MetaMessage(MetaType.Tempo, message));
            }
            int typeOfBeats = 0;
            TimeSignature timeSignature = viewer.GetTimeSignature();
            while (timeSignature.TypeOfBeats != Math.Pow(2, typeOfBeats))
                typeOfBeats++;
            incipitTrack.Insert(0, new MetaMessage(MetaType.TimeSignature, new byte[] { (byte) timeSignature.NumberOfBeats, (byte) typeOfBeats, 24, 8 }));
            incipitTrack.Insert(0, new MetaMessage(MetaType.KeySignature, new byte[] { (byte) viewer.GetCurrentKey().Fifths, 0 }));

            //Parcourt de tout les Symboles de musique
            for (int i = 0, ticks = 0; i < nbSymbols; i++)
            {
                MusicalSymbol symbol = viewer.IncipitElement(i);
                if (symbol.Type == MusicalSymbolType.Note)
                {
                    Note note = (Note) symbol;
                    ChannelMessage noteOn = new ChannelMessage(ChannelCommand.NoteOn, 0, note.MidiPitch, 60);
                    ChannelMessage noteOff = new ChannelMessage(ChannelCommand.NoteOff, 0, note.MidiPitch, 60);
                    //insertion des messages dans la track
                    incipitTrack.Insert(ticks, noteOn);
                    ticks += getNoteDuration(note.Duration);
                    incipitTrack.Insert(ticks, noteOff);
                }
            }
            sequencer.Sequence.Add(incipitTrack);
        }

        private int getNoteDuration(MusicalSymbolDuration duration)
        {
            if (duration == MusicalSymbolDuration.Whole)
                return 256;
            if (duration == MusicalSymbolDuration.Half)
                return 128;
            if (duration == MusicalSymbolDuration.Quarter)
                return 64;
            if (duration == MusicalSymbolDuration.Eighth)
                return 32;
            if (duration == MusicalSymbolDuration.Sixteenth)
                return 16;
            if (duration == MusicalSymbolDuration.d32nd)
                return 8;
            if (duration == MusicalSymbolDuration.d64th)
                return 4;
            return 2;
        }

        private void exitToolStripMenuItem_Click(object sender, EventArgs e)
        {
            // Display a message box asking users if they
            // want to exit the application.
            if (MessageBox.Show("Do you want to exit?", "Light Them Up",
                    MessageBoxButtons.YesNo, MessageBoxIcon.Question)
                    == DialogResult.Yes)
            {
                Application.Exit();
            }
        }

        #region TimeSignature Change Menu

        private void timeSignatureChange(TimeSignature newTimeSignature)
        {
            viewer.ChangeMusicalSymbol(TimeSign, newTimeSignature);
            TimeSign = newTimeSignature;
            Display();
        }

        private void toolStripMenuItem2_Click(object sender, EventArgs e)
        {
            timeSignatureChange(new TimeSignature(TimeSignatureType.Numbers, 2, 4));
        }

        private void toolStripMenuItem3_Click(object sender, EventArgs e)
        {
            timeSignatureChange(new TimeSignature(TimeSignatureType.Numbers, 3, 4));
        }

        private void toolStripMenuItem4_Click(object sender, EventArgs e)
        {
            timeSignatureChange(new TimeSignature(TimeSignatureType.Numbers, 4, 4));
        }

        private void toolStripMenuItem5_Click(object sender, EventArgs e)
        {
            timeSignatureChange(new TimeSignature(TimeSignatureType.Numbers, 3, 8));
        }

        private void toolStripMenuItem6_Click(object sender, EventArgs e)
        {
            timeSignatureChange(new TimeSignature(TimeSignatureType.Numbers, 6, 8));
        }

        private void toolStripMenuItem7_Click(object sender, EventArgs e)
        {
            timeSignatureChange(new TimeSignature(TimeSignatureType.Numbers, 9, 8));
        }

        private void toolStripMenuItem8_Click(object sender, EventArgs e)
        {
            timeSignatureChange(new TimeSignature(TimeSignatureType.Numbers, 12, 8));
        }

        private void timeSignatureToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            ((System.Windows.Forms.ToolStripTextBox)sender).Text = "";
        }

        private void okToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Regex rgx = new Regex("([0-9]+)/([0-9]+)");
            MatchCollection matches = rgx.Matches(this.timeSignatureToolStripMenuItem1.Text.ToString());
            if (matches.Count < 1) return;
            foreach (Match match in matches)
            {
                GroupCollection groups = match.Groups;
                timeSignatureChange(new TimeSignature(TimeSignatureType.Numbers, Convert.ToUInt32(groups[1].Value, 10), Convert.ToUInt32(groups[2].Value, 10)));
            }
        }

        #endregion

        private void enterTitleToolStripMenuItem_Click(object sender, EventArgs e)
        {
            ((System.Windows.Forms.ToolStripTextBox)sender).Text = "";
        }

        #region Change Tempo Menu

        private void largoToolStripMenuItem_Click(object sender, EventArgs e)
        {
            // 50 bpm
            this.TempoValue = 50;
            this.Tempo.Text = "Largo";
        }

        private void lentoToolStripMenuItem_Click(object sender, EventArgs e)
        {
            // 55 bpm
            this.TempoValue = 55;
            this.Tempo.Text = "Lento";
        }

        private void adagioToolStripMenuItem_Click(object sender, EventArgs e)
        {
            // 70 bpm
            this.TempoValue = 70;
            this.Tempo.Text = "Adagio";
        }

        private void andanteToolStripMenuItem_Click(object sender, EventArgs e)
        {
            // 92 bpm
            this.TempoValue = 92;
            this.Tempo.Text = "Andante";
        }

        private void moderatoToolStripMenuItem_Click(object sender, EventArgs e)
        {
            // 114 bpm
            this.TempoValue = 114;
            this.Tempo.Text = "Moderato";
        }

        private void allegrettoToolStripMenuItem_Click(object sender, EventArgs e)
        {
            // 120 bpm
            this.TempoValue = 120;
            this.Tempo.Text = "Allegretto";
        }

        private void allegroToolStripMenuItem_Click(object sender, EventArgs e)
        {
            // 140 bpm
            this.TempoValue = 140;
            this.Tempo.Text = "Allegro";
        }

        private void vivaceToolStripMenuItem_Click(object sender, EventArgs e)
        {
            // 172 bpm
            this.TempoValue = 172;
            this.Tempo.Text = "Vivace";
        }

        private void prestoToolStripMenuItem_Click(object sender, EventArgs e)
        {
            // 184 bpm
            this.TempoValue = 184;
            this.Tempo.Text = "Presto";
        }

        private void prestissimoToolStripMenuItem_Click(object sender, EventArgs e)
        {
            // 200 bpm
            this.TempoValue = 200;
            this.Tempo.Text = "Prestissimo";
        }

        #endregion

        private void loadFromImageToolStripMenuItem_Click(object sender, EventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.Filter = "Image files (*.jpg, *.jpeg, *.jpe, *.jfif, *.png) | *.jpg; *.jpeg; *.jpe; *.jfif; *.png";
            if (openFileDialog.ShowDialog() == System.Windows.Forms.DialogResult.OK)
            {
                ThreadingLoading threadObj = new ThreadingLoading();
                Thread thread = new Thread(threadObj.DoWork);
                thread.Start(new Point(this.Left + this.Width / 2, this.Top + this.Height / 2));
                while (!thread.IsAlive) ;

                String file = openFileDialog.FileName;
                file.Replace("\\", "\\\\");

                try
                {
                    var setup = new BridgeSetup();
                    setup.Verbose = true;
                    setup.AddAllJarsClassPath("./");

                    Bridge.CreateJVM(setup);
                    Bridge.RegisterAssembly(typeof(openomr.openomr.SheetMusic).Assembly);
                }
                catch
                {
                    threadObj.RequestStop();
                    thread.Join();
                    MessageBox.Show("Java couldn't execute, load from image not available");
                    return;
                }

                viewer.ClearMusicalIncipit();
                //viewer.AddMusicalSymbol(key);
                //viewer.AddMusicalSymbol(TimeSign);
                //viewer.ChangeMusicalSymbol(null, armure);

                java.lang.String filename = file;
                byte[] byteArray = openomr.openomr.SheetMusic.convertImage(filename);

                //Suppression des elements de l'incipit
                Stream stream = new MemoryStream(byteArray);

                sequencer.Sequence = new Sequence();
                sequencer.Sequence.LoadfromStream(stream);
                convertSequenceToIncipit();

                threadObj.RequestStop();
                thread.Join();

                sequencer.Start();

                Display();
            }
        }


        #region Menu Clef 

        private void gToolStripMenuItem_Click(object sender, EventArgs e)
        {
            viewer.RemoveMusicalSymbol(clef);
            clef = new Clef(ClefType.GClef, 2);
            viewer.InciptInsert(0, clef);
            Display();
        }

        private void fToolStripMenuItem_Click(object sender, EventArgs e)
        {
            viewer.RemoveMusicalSymbol(clef);
            clef = new Clef(ClefType.FClef, 4);
            viewer.InciptInsert(0, clef);
            Display();
        }

        private void cToolStripMenuItem_Click(object sender, EventArgs e)
        {
            viewer.RemoveMusicalSymbol(clef);
            clef = new Clef(ClefType.CClef, 1);
            viewer.InciptInsert(0, clef);
            Display();
        }

        private void loginToolStripMenuItem_Click(object sender, EventArgs e)
        {
            login.StartPosition = FormStartPosition.CenterParent;
            var result = login.ShowDialog(this);
            if (result == DialogResult.OK)
            {
                this.loginToolStripMenuItem.Visible = false;
                this.uploadPartitionToolStripMenuItem.Visible = true;
                this.downloadFromTheStoreToolStripMenuItem.Visible = true;
                this.logoutToolStripMenuItem.Visible = true;
                this.UsertoolStripMenuItem.Text = login.name;
            }
        }

        private void uploadPartitionToolStripMenuItem_Click(object sender, EventArgs e)
        {
            UserUpload upload = new UserUpload();
            upload.StartPosition = FormStartPosition.CenterParent;
            var result = upload.ShowDialog(this);
            String filename = "temp.mid";
            try
            {
                saveIncipitToTrack();
                sequencer.Sequence.Save(filename);
                if (result == DialogResult.OK)
                {
                    uploadPartition(upload, filename);
                }
            }
            catch (Exception exception)
            {
                MessageBox.Show("Error during upload: " + exception.Message);
            }
        }

        private async void uploadPartition(UserUpload upload, String filename)
        {
            using (HttpClient client = new HttpClient())
            {
                MultipartFormDataContent form = new MultipartFormDataContent();

                form.Headers.ContentDisposition = new ContentDispositionHeaderValue("form-data");
                form.Add(new StringContent(upload.filename), "name");
                form.Add(new StringContent(upload.artist), "artist");
                form.Add(new StringContent(upload.priceValue), "price");
                form.Add(new StringContent(upload.difficultyValue), "difficulty");
                byte[] pictureByte = File.ReadAllBytes(upload.picturePath);
                StreamContent picture = new StreamContent(new MemoryStream(pictureByte));
                string mimeType = upload.picturePath.Substring(upload.picturePath.LastIndexOf(".") + 1);
                if (mimeType == "jpg")
                    mimeType = "jpeg";
                picture.Headers.ContentType = new MediaTypeHeaderValue("image/" + mimeType);
                form.Add(picture, "picture", upload.picturePath);
                byte[] fileByte = File.ReadAllBytes(filename);
                StreamContent file = new StreamContent(new MemoryStream(fileByte));
                file.Headers.ContentType = new MediaTypeHeaderValue("audio/mid");
                form.Add(file, "file", filename);
                StreamContent preview = new StreamContent(new MemoryStream(fileByte));
                preview.Headers.ContentType = new MediaTypeHeaderValue("audio/mid");
                form.Add(preview, "preview", filename);

                client.DefaultRequestHeaders.Add("x-access-token", login.token);
                HttpResponseMessage HtmlResponse = await client.PostAsync(eipUrl + "/songs", form);
                if (HtmlResponse.IsSuccessStatusCode)
                    MessageBox.Show("The song was uploaded");
                else
                {
                    string json = await HtmlResponse.Content.ReadAsStringAsync();
                    MessageBox.Show("Fail during upload: " + json);
                }
            }
        }

        private void downloadFromTheStoreToolStripMenuItem_Click(object sender, EventArgs e)
        {
            download = new UserDownload();
            download.StartPosition = FormStartPosition.CenterParent;
            var result = download.ShowDialog(this);
            if (result == DialogResult.OK)
            {
                using (WebClient client = new WebClient())
                {
                    string filepath = download.song["file"];
                    if (filepath == null || filepath.Length == 0)
                    {
                        MessageBox.Show("Invalid file from server.");
                        return;
                    }
                    var charsToRemove = new string[] { "\"", "\\"};
                    foreach (var c in charsToRemove)
                    {
                        filepath = filepath.Replace(c, string.Empty);
                    }
                    try
                    {
                        client.DownloadFile(new Uri(eipUrl + "/" + filepath), download.filename + ".mid");
                    }
                    catch (Exception excp)
                    {
                        MessageBox.Show("File is not accesible: " + excp.Message);
                        return;
                    }
                    MessageBox.Show("File Downloaded");
                    sequencer.Sequence = new Sequence();
                    sequencer.Sequence.Load(download.filename + ".mid");
                    this.title.Text = download.filename;
                    File.Delete(download.filename + ".mid");
                    convertSequenceToIncipit();
                }
            }
        }

        private void logoutToolStripMenuItem_Click(object sender, EventArgs e)
        {
            this.UsertoolStripMenuItem.Text = "User";
            login.LogoutUser();
            this.loginToolStripMenuItem.Visible = true;
            this.uploadPartitionToolStripMenuItem.Visible = false;
            this.downloadFromTheStoreToolStripMenuItem.Visible = false;
            this.logoutToolStripMenuItem.Visible = false;
        }

        #endregion

        #region Menu Armure

        private void MenuArmure_Paint(object sender, System.Windows.Forms.PaintEventArgs e)
        {
            // Create a local version of the graphics object for the PictureBox.
            Graphics g = e.Graphics;
            System.Windows.Forms.ToolStripMenuItem obj = (System.Windows.Forms.ToolStripMenuItem)sender;
            string[] separatingChars = { "bb", "#" };
            Font musicalFont = new Font(fonts.Families[0], 15);

            int pos = 0;
            int xpos = 33;

            string[] words = obj.Text.Split(separatingChars, System.StringSplitOptions.RemoveEmptyEntries);
            foreach (string s in words)
            {
                g.DrawString(s, obj.Font, System.Drawing.Brushes.Black, new Point(xpos, 2));
                xpos += g.MeasureString(s, obj.Font, 100).ToSize().Width - 5;
                pos += s.Length;

                if (pos >= obj.Text.Length)
                    break;
                if (obj.Text[pos] == 'b')
                {
                    pos += 2;
                    g.DrawString("b", musicalFont, System.Drawing.Brushes.Black, new Point(xpos, -5));
                    xpos += g.MeasureString("b", musicalFont, 100).ToSize().Width - 5;
                }
                else if (obj.Text[pos] == '#')
                {
                    pos += 1;
                    g.DrawString("X", musicalFont, System.Drawing.Brushes.Black, new Point(xpos, -5));
                    xpos += g.MeasureString("X", musicalFont, 100).ToSize().Width - 5;
                }
            }

        }

        private void changeArmure(object obj, Key newSymb)
        {
            if (ArmureSelect != null)
                ArmureSelect.Checked = false;
            ArmureSelect = (System.Windows.Forms.ToolStripMenuItem)obj;
            ArmureSelect.Checked = true;

            viewer.ChangeMusicalSymbol(armure, newSymb);
            armure = newSymb;

            Display();
        }

        private void MenuArmure_7b_Click(object sender, EventArgs e)
        {
            changeArmure(sender, new Key(-7));
        }

        private void MenuArmure_6b_Click(object sender, EventArgs e)
        {
            changeArmure(sender, new Key(-6));
        }

        private void MenuArmure_5b_Click(object sender, EventArgs e)
        {
            changeArmure(sender, new Key(-5));
        }

        private void MenuArmure_4b_Click(object sender, EventArgs e)
        {
            changeArmure(sender, new Key(-4));
        }

        private void MenuArmure_3b_Click(object sender, EventArgs e)
        {
            changeArmure(sender, new Key(-3));
        }

        private void MenuArmure_2b_Click(object sender, EventArgs e)
        {
            changeArmure(sender, new Key(-2));
        }

        private void MenuArmure_1b_Click(object sender, EventArgs e)
        {
            changeArmure(sender, new Key(-1));
        }

        private void MenuArmure_Default_Click(object sender, EventArgs e)
        {
            changeArmure(sender, null);
        }

        private void MenuArmure_1d_Click(object sender, EventArgs e)
        {
            changeArmure(sender, new Key(1));
        }

        private void MenuArmure_2d_Click(object sender, EventArgs e)
        {
            changeArmure(sender, new Key(2));
        }

        private void MenuArmure_3d_Click(object sender, EventArgs e)
        {
            changeArmure(sender, new Key(3));
        }

        private void MenuArmure_4d_Click(object sender, EventArgs e)
        {
            changeArmure(sender, new Key(4));
        }

        private void MenuArmure_5d_Click(object sender, EventArgs e)
        {
            changeArmure(sender, new Key(5));
        }

        private void MenuArmure_6d_Click(object sender, EventArgs e)
        {
            changeArmure(sender, new Key(6));
        }

        private void MenuArmure_7d_Click(object sender, EventArgs e)
        {
            changeArmure(sender, new Key(7));
        }

        #endregion
    }

}
