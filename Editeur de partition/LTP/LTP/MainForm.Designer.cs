using System;
using System.Drawing;
using System.Drawing.Text;

namespace LTP
{
    partial class MainForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        [System.Runtime.InteropServices.DllImport("gdi32.dll")]
        private static extern IntPtr AddFontMemResourceEx(IntPtr pbFont, uint cbFont,
            IntPtr pdv, [System.Runtime.InteropServices.In] ref uint pcFonts);

        public PrivateFontCollection fonts = new PrivateFontCollection();
        private Font font;
        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            byte[] fontData = Properties.Resources.Polihymnia;
            IntPtr fontPtr = System.Runtime.InteropServices.Marshal.AllocCoTaskMem(fontData.Length);
            System.Runtime.InteropServices.Marshal.Copy(fontData, 0, fontPtr, fontData.Length);
            uint dummy = 0;
            fonts.AddMemoryFont(fontPtr, Properties.Resources.Polihymnia.Length);
            AddFontMemResourceEx(fontPtr, (uint)Properties.Resources.Polihymnia.Length, IntPtr.Zero, ref dummy);
            System.Runtime.InteropServices.Marshal.FreeCoTaskMem(fontPtr);

            font = new Font(fonts.Families[0], 14.0F);

            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(MainForm));
            this.panel1 = new System.Windows.Forms.Panel();
            this.EighthRest = new System.Windows.Forms.Button();
            this.EighthNoteSelect = new System.Windows.Forms.Button();
            this.d128thRest = new System.Windows.Forms.Button();
            this.d128ndNoteSelect = new System.Windows.Forms.Button();
            this.d64thRest = new System.Windows.Forms.Button();
            this.d64ndNoteSelect = new System.Windows.Forms.Button();
            this.SixteenthRest = new System.Windows.Forms.Button();
            this.SixteenthNoteSelect = new System.Windows.Forms.Button();
            this.d32ndRest = new System.Windows.Forms.Button();
            this.d32ndNoteSelect = new System.Windows.Forms.Button();
            this.HalfRest = new System.Windows.Forms.Button();
            this.HalfNoteSelect = new System.Windows.Forms.Button();
            this.WholeRest = new System.Windows.Forms.Button();
            this.QuarterRest = new System.Windows.Forms.Button();
            this.WholeNoteSelect = new System.Windows.Forms.Button();
            this.QuarterNoteSelect = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.button1 = new System.Windows.Forms.Button();
            this.panel3 = new System.Windows.Forms.Panel();
            this.ColorMagenta = new System.Windows.Forms.Button();
            this.ColorBlue = new System.Windows.Forms.Button();
            this.ColorYellow = new System.Windows.Forms.Button();
            this.ColorGreen = new System.Windows.Forms.Button();
            this.ColorRed = new System.Windows.Forms.Button();
            this.ColorBlack = new System.Windows.Forms.Button();
            this.label3 = new System.Windows.Forms.Label();
            this.button2 = new System.Windows.Forms.Button();
            this.MainContainer = new System.Windows.Forms.Panel();
            this.Tempo = new System.Windows.Forms.Label();
            this.title = new System.Windows.Forms.TextBox();
            this.viewer = new PSAMControlLibrary.IncipitViewer(fonts);
            this.ControlPanel = new System.Windows.Forms.Panel();
            this.label2 = new System.Windows.Forms.Label();
            this.panel2 = new System.Windows.Forms.Panel();
            this.SetTie = new System.Windows.Forms.Button();
            this.SetBeam = new System.Windows.Forms.Button();
            this.SetNote = new System.Windows.Forms.Button();
            this.SetSlur = new System.Windows.Forms.Button();
            this.DeleteMode = new System.Windows.Forms.Button();
            this.AddMode = new System.Windows.Forms.Button();
            this.EditMode = new System.Windows.Forms.Button();
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.fileToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.openToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.saveToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.loadFromImageToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.exitToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.settingToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.tempoToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.largoToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.lentoToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.adagioToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.andanteToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.moderatoToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.allegrettoToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.allegroToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.vivaceToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.prestoToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.prestissimoToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.timeSignatureToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripMenuItem2 = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripMenuItem3 = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripMenuItem4 = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripMenuItem5 = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripMenuItem6 = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripMenuItem7 = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripMenuItem8 = new System.Windows.Forms.ToolStripMenuItem();
            this.customToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.timeSignatureToolStripMenuItem1 = new System.Windows.Forms.ToolStripTextBox();
            this.okToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.clefToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.gToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.fToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.cToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.armureToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.MenuArmure_7b = new System.Windows.Forms.ToolStripMenuItem();
            this.MenuArmure_6b = new System.Windows.Forms.ToolStripMenuItem();
            this.MenuArmure_5b = new System.Windows.Forms.ToolStripMenuItem();
            this.MenuArmure_4b = new System.Windows.Forms.ToolStripMenuItem();
            this.MenuArmure_3b = new System.Windows.Forms.ToolStripMenuItem();
            this.MenuArmure_2b = new System.Windows.Forms.ToolStripMenuItem();
            this.MenuArmure_1b = new System.Windows.Forms.ToolStripMenuItem();
            this.MenuArmure_Default = new System.Windows.Forms.ToolStripMenuItem();
            this.MenuArmure_1d = new System.Windows.Forms.ToolStripMenuItem();
            this.MenuArmure_2d = new System.Windows.Forms.ToolStripMenuItem();
            this.MenuArmure_3d = new System.Windows.Forms.ToolStripMenuItem();
            this.MenuArmure_4d = new System.Windows.Forms.ToolStripMenuItem();
            this.MenuArmure_5d = new System.Windows.Forms.ToolStripMenuItem();
            this.MenuArmure_6d = new System.Windows.Forms.ToolStripMenuItem();
            this.MenuArmure_7d = new System.Windows.Forms.ToolStripMenuItem();
            this.UsertoolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.loginToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.uploadPartitionToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.downloadFromTheStoreToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.logoutToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.musicProgressBar = new System.Windows.Forms.ProgressBar();
            this.panel1.SuspendLayout();
            this.panel3.SuspendLayout();
            this.MainContainer.SuspendLayout();
            this.ControlPanel.SuspendLayout();
            this.panel2.SuspendLayout();
            this.menuStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.SystemColors.Control;
            this.panel1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.panel1.Controls.Add(this.EighthRest);
            this.panel1.Controls.Add(this.EighthNoteSelect);
            this.panel1.Controls.Add(this.d128thRest);
            this.panel1.Controls.Add(this.d128ndNoteSelect);
            this.panel1.Controls.Add(this.d64thRest);
            this.panel1.Controls.Add(this.d64ndNoteSelect);
            this.panel1.Controls.Add(this.SixteenthRest);
            this.panel1.Controls.Add(this.SixteenthNoteSelect);
            this.panel1.Controls.Add(this.d32ndRest);
            this.panel1.Controls.Add(this.d32ndNoteSelect);
            this.panel1.Controls.Add(this.HalfRest);
            this.panel1.Controls.Add(this.HalfNoteSelect);
            this.panel1.Controls.Add(this.WholeRest);
            this.panel1.Controls.Add(this.QuarterRest);
            this.panel1.Controls.Add(this.WholeNoteSelect);
            this.panel1.Controls.Add(this.QuarterNoteSelect);
            this.panel1.Location = new System.Drawing.Point(0, 145);
            this.panel1.Margin = new System.Windows.Forms.Padding(0);
            this.panel1.Name = "panel1";
            this.panel1.Padding = new System.Windows.Forms.Padding(5);
            this.panel1.Size = new System.Drawing.Size(194, 180);
            this.panel1.TabIndex = 1;
            // 
            // EighthRest
            // 
            this.EighthRest.BackColor = SystemColors.Control;
            this.EighthRest.Cursor = System.Windows.Forms.Cursors.Hand;
            this.EighthRest.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.EighthRest.Font = font;
            this.EighthRest.Location = new System.Drawing.Point(145, 90);
            this.EighthRest.Margin = new System.Windows.Forms.Padding(5, 3, 5, 3);
            this.EighthRest.Name = "EighthRest";
            this.EighthRest.Size = new System.Drawing.Size(35, 35);
            this.EighthRest.TabIndex = 11;
            this.EighthRest.Text = "E";
            this.EighthRest.UseVisualStyleBackColor = false;
            this.EighthRest.Click += new System.EventHandler(this.EighthRest_Click);
            // 
            // EighthNoteSelect
            // 
            this.EighthNoteSelect.BackColor = System.Drawing.SystemColors.Control;
            this.EighthNoteSelect.Cursor = System.Windows.Forms.Cursors.Hand;
            this.EighthNoteSelect.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.EighthNoteSelect.Font = font;
            this.EighthNoteSelect.Location = new System.Drawing.Point(145, 8);
            this.EighthNoteSelect.Margin = new System.Windows.Forms.Padding(5, 3, 5, 3);
            this.EighthNoteSelect.Name = "EighthNoteSelect";
            this.EighthNoteSelect.Size = new System.Drawing.Size(35, 35);
            this.EighthNoteSelect.TabIndex = 3;
            this.EighthNoteSelect.Text = "e";
            this.EighthNoteSelect.UseVisualStyleBackColor = false;
            this.EighthNoteSelect.Click += new System.EventHandler(this.EighthNoteSelect_Click);
            // 
            // d128thRest
            // 
            this.d128thRest.BackColor = System.Drawing.SystemColors.Control;
            this.d128thRest.Cursor = System.Windows.Forms.Cursors.Hand;
            this.d128thRest.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.d128thRest.Font = font;
            this.d128thRest.Location = new System.Drawing.Point(146, 131);
            this.d128thRest.Margin = new System.Windows.Forms.Padding(5, 3, 5, 3);
            this.d128thRest.Name = "d128thRest";
            this.d128thRest.Size = new System.Drawing.Size(35, 35);
            this.d128thRest.TabIndex = 15;
            this.d128thRest.Text = "V";
            this.d128thRest.UseVisualStyleBackColor = false;
            this.d128thRest.Click += new System.EventHandler(this.d128thRest_Click);
            // 
            // d128ndNoteSelect
            // 
            this.d128ndNoteSelect.BackColor = System.Drawing.SystemColors.Control;
            this.d128ndNoteSelect.Cursor = System.Windows.Forms.Cursors.Hand;
            this.d128ndNoteSelect.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.d128ndNoteSelect.Font = font;
            this.d128ndNoteSelect.Location = new System.Drawing.Point(144, 49);
            this.d128ndNoteSelect.Margin = new System.Windows.Forms.Padding(5, 3, 5, 3);
            this.d128ndNoteSelect.Name = "d128ndNoteSelect";
            this.d128ndNoteSelect.Size = new System.Drawing.Size(35, 35);
            this.d128ndNoteSelect.TabIndex = 7;
            this.d128ndNoteSelect.Text = "v";
            this.d128ndNoteSelect.UseVisualStyleBackColor = false;
            this.d128ndNoteSelect.Click += new System.EventHandler(this.d128ndNoteSelect_Click);
            // 
            // d64thRest
            // 
            this.d64thRest.BackColor = System.Drawing.SystemColors.Control;
            this.d64thRest.Cursor = System.Windows.Forms.Cursors.Hand;
            this.d64thRest.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.d64thRest.Font = font;
            this.d64thRest.Location = new System.Drawing.Point(100, 131);
            this.d64thRest.Margin = new System.Windows.Forms.Padding(5, 3, 5, 3);
            this.d64thRest.Name = "d64thRest";
            this.d64thRest.Size = new System.Drawing.Size(35, 35);
            this.d64thRest.TabIndex = 14;
            this.d64thRest.Text = "U";
            this.d64thRest.UseVisualStyleBackColor = false;
            this.d64thRest.Click += new System.EventHandler(this.d64thRest_Click);
            // 
            // d64ndNoteSelect
            // 
            this.d64ndNoteSelect.BackColor = System.Drawing.SystemColors.Control;
            this.d64ndNoteSelect.Cursor = System.Windows.Forms.Cursors.Hand;
            this.d64ndNoteSelect.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.d64ndNoteSelect.Font = font;
            this.d64ndNoteSelect.Location = new System.Drawing.Point(100, 49);
            this.d64ndNoteSelect.Margin = new System.Windows.Forms.Padding(5, 3, 5, 3);
            this.d64ndNoteSelect.Name = "d64ndNoteSelect";
            this.d64ndNoteSelect.Size = new System.Drawing.Size(35, 35);
            this.d64ndNoteSelect.TabIndex = 6;
            this.d64ndNoteSelect.Text = "u";
            this.d64ndNoteSelect.UseVisualStyleBackColor = false;
            this.d64ndNoteSelect.Click += new System.EventHandler(this.d64ndNoteSelect_Click);
            // 
            // SixteenthRest
            // 
            this.SixteenthRest.BackColor = System.Drawing.SystemColors.Control;
            this.SixteenthRest.Cursor = System.Windows.Forms.Cursors.Hand;
            this.SixteenthRest.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.SixteenthRest.Font = font;
            this.SixteenthRest.Location = new System.Drawing.Point(10, 131);
            this.SixteenthRest.Margin = new System.Windows.Forms.Padding(5, 3, 5, 3);
            this.SixteenthRest.Name = "SixteenthRest";
            this.SixteenthRest.Size = new System.Drawing.Size(35, 35);
            this.SixteenthRest.TabIndex = 12;
            this.SixteenthRest.Text = "S";
            this.SixteenthRest.UseVisualStyleBackColor = false;
            this.SixteenthRest.Click += new System.EventHandler(this.SixteenthRest_Click);
            // 
            // SixteenthNoteSelect
            // 
            this.SixteenthNoteSelect.BackColor = System.Drawing.SystemColors.Control;
            this.SixteenthNoteSelect.Cursor = System.Windows.Forms.Cursors.Hand;
            this.SixteenthNoteSelect.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.SixteenthNoteSelect.Font = font;
            this.SixteenthNoteSelect.Location = new System.Drawing.Point(10, 49);
            this.SixteenthNoteSelect.Margin = new System.Windows.Forms.Padding(5, 3, 5, 3);
            this.SixteenthNoteSelect.Name = "SixteenthNoteSelect";
            this.SixteenthNoteSelect.Size = new System.Drawing.Size(35, 35);
            this.SixteenthNoteSelect.TabIndex = 4;
            this.SixteenthNoteSelect.Text = "s";
            this.SixteenthNoteSelect.UseVisualStyleBackColor = false;
            this.SixteenthNoteSelect.Click += new System.EventHandler(this.SixteenthNoteSelect_Click);
            // 
            // d32ndRest
            // 
            this.d32ndRest.BackColor = System.Drawing.SystemColors.Control;
            this.d32ndRest.Cursor = System.Windows.Forms.Cursors.Hand;
            this.d32ndRest.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.d32ndRest.Font = font;
            this.d32ndRest.Location = new System.Drawing.Point(55, 131);
            this.d32ndRest.Margin = new System.Windows.Forms.Padding(5, 3, 5, 3);
            this.d32ndRest.Name = "d32ndRest";
            this.d32ndRest.Size = new System.Drawing.Size(35, 35);
            this.d32ndRest.TabIndex = 13;
            this.d32ndRest.Text = "T";
            this.d32ndRest.UseVisualStyleBackColor = false;
            this.d32ndRest.Click += new System.EventHandler(this.d32ndRest_Click);
            // 
            // d32ndNoteSelect
            // 
            this.d32ndNoteSelect.BackColor = System.Drawing.SystemColors.Control;
            this.d32ndNoteSelect.Cursor = System.Windows.Forms.Cursors.Hand;
            this.d32ndNoteSelect.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.d32ndNoteSelect.Font = font;
            this.d32ndNoteSelect.Location = new System.Drawing.Point(55, 49);
            this.d32ndNoteSelect.Margin = new System.Windows.Forms.Padding(5, 3, 5, 3);
            this.d32ndNoteSelect.Name = "d32ndNoteSelect";
            this.d32ndNoteSelect.Size = new System.Drawing.Size(35, 35);
            this.d32ndNoteSelect.TabIndex = 5;
            this.d32ndNoteSelect.Text = "t";
            this.d32ndNoteSelect.UseVisualStyleBackColor = false;
            this.d32ndNoteSelect.Click += new System.EventHandler(this.d32ndNoteSelect_Click);
            // 
            // HalfRest
            // 
            this.HalfRest.BackColor = System.Drawing.SystemColors.Control;
            this.HalfRest.Cursor = System.Windows.Forms.Cursors.Hand;
            this.HalfRest.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.HalfRest.Font = font;
            this.HalfRest.Location = new System.Drawing.Point(55, 90);
            this.HalfRest.Margin = new System.Windows.Forms.Padding(5, 3, 5, 3);
            this.HalfRest.Name = "HalfRest";
            this.HalfRest.Size = new System.Drawing.Size(35, 35);
            this.HalfRest.TabIndex = 9;
            this.HalfRest.Text = "H";
            this.HalfRest.UseVisualStyleBackColor = false;
            this.HalfRest.Click += new System.EventHandler(this.HalfRest_Click);
            // 
            // HalfNoteSelect
            // 
            this.HalfNoteSelect.BackColor = System.Drawing.SystemColors.Control;
            this.HalfNoteSelect.Cursor = System.Windows.Forms.Cursors.Hand;
            this.HalfNoteSelect.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.HalfNoteSelect.Font = font;
            this.HalfNoteSelect.Location = new System.Drawing.Point(55, 8);
            this.HalfNoteSelect.Margin = new System.Windows.Forms.Padding(5, 3, 5, 3);
            this.HalfNoteSelect.Name = "HalfNoteSelect";
            this.HalfNoteSelect.Size = new System.Drawing.Size(35, 35);
            this.HalfNoteSelect.TabIndex = 1;
            this.HalfNoteSelect.Text = "h";
            this.HalfNoteSelect.UseVisualStyleBackColor = false;
            this.HalfNoteSelect.Click += new System.EventHandler(this.HalfNoteSelect_Click);
            // 
            // WholeRest
            // 
            this.WholeRest.BackColor = System.Drawing.SystemColors.Control;
            this.WholeRest.Cursor = System.Windows.Forms.Cursors.Hand;
            this.WholeRest.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.WholeRest.Font = font;
            this.WholeRest.Location = new System.Drawing.Point(10, 90);
            this.WholeRest.Margin = new System.Windows.Forms.Padding(5, 3, 5, 3);
            this.WholeRest.Name = "WholeRest";
            this.WholeRest.Size = new System.Drawing.Size(35, 35);
            this.WholeRest.TabIndex = 8;
            this.WholeRest.Text = "W";
            this.WholeRest.UseVisualStyleBackColor = false;
            this.WholeRest.Click += new System.EventHandler(this.WholeRest_Click);
            // 
            // QuarterRest
            // 
            this.QuarterRest.BackColor = System.Drawing.SystemColors.Control;
            this.QuarterRest.Cursor = System.Windows.Forms.Cursors.Hand;
            this.QuarterRest.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.QuarterRest.Font = font;
            this.QuarterRest.Location = new System.Drawing.Point(100, 90);
            this.QuarterRest.Margin = new System.Windows.Forms.Padding(5, 3, 5, 3);
            this.QuarterRest.Name = "QuarterRest";
            this.QuarterRest.Size = new System.Drawing.Size(35, 35);
            this.QuarterRest.TabIndex = 10;
            this.QuarterRest.Text = "Q";
            this.QuarterRest.UseVisualStyleBackColor = false;
            this.QuarterRest.Click += new System.EventHandler(this.QuarterRest_Click);
            // 
            // WholeNoteSelect
            // 
            this.WholeNoteSelect.BackColor = System.Drawing.SystemColors.Control;
            this.WholeNoteSelect.Cursor = System.Windows.Forms.Cursors.Hand;
            this.WholeNoteSelect.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.WholeNoteSelect.Font = font;
            this.WholeNoteSelect.Location = new System.Drawing.Point(10, 8);
            this.WholeNoteSelect.Margin = new System.Windows.Forms.Padding(5, 3, 5, 3);
            this.WholeNoteSelect.Name = "WholeNoteSelect";
            this.WholeNoteSelect.Size = new System.Drawing.Size(35, 35);
            this.WholeNoteSelect.TabIndex = 0;
            this.WholeNoteSelect.Text = "w";
            this.WholeNoteSelect.UseVisualStyleBackColor = false;
            this.WholeNoteSelect.Click += new System.EventHandler(this.WholeNoteSelect_Click);
            // 
            // QuarterNoteSelect
            // 
            this.QuarterNoteSelect.BackColor = System.Drawing.SystemColors.Control;
            this.QuarterNoteSelect.Cursor = System.Windows.Forms.Cursors.Hand;
            this.QuarterNoteSelect.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.QuarterNoteSelect.Font = font;
            this.QuarterNoteSelect.Location = new System.Drawing.Point(100, 8);
            this.QuarterNoteSelect.Margin = new System.Windows.Forms.Padding(5, 3, 5, 3);
            this.QuarterNoteSelect.Name = "QuarterNoteSelect";
            this.QuarterNoteSelect.Size = new System.Drawing.Size(35, 35);
            this.QuarterNoteSelect.TabIndex = 2;
            this.QuarterNoteSelect.Text = "q";
            this.QuarterNoteSelect.UseVisualStyleBackColor = false;
            this.QuarterNoteSelect.Click += new System.EventHandler(this.QuarterNoteSelect_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.BackColor = System.Drawing.Color.Transparent;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(14, 116);
            this.label1.Margin = new System.Windows.Forms.Padding(5);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(84, 24);
            this.label1.TabIndex = 2;
            this.label1.Text = "Symbole";
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(3, 594);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(188, 23);
            this.button1.TabIndex = 5;
            this.button1.Text = "Add Notes";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // panel3
            // 
            this.panel3.BackColor = System.Drawing.SystemColors.Control;
            this.panel3.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.panel3.Controls.Add(this.ColorMagenta);
            this.panel3.Controls.Add(this.ColorBlue);
            this.panel3.Controls.Add(this.ColorYellow);
            this.panel3.Controls.Add(this.ColorGreen);
            this.panel3.Controls.Add(this.ColorRed);
            this.panel3.Controls.Add(this.ColorBlack);
            this.panel3.Location = new System.Drawing.Point(0, 362);
            this.panel3.Name = "panel3";
            this.panel3.Padding = new System.Windows.Forms.Padding(5);
            this.panel3.Size = new System.Drawing.Size(194, 94);
            this.panel3.TabIndex = 8;
            // 
            // ColorMagenta
            // 
            this.ColorMagenta.BackColor = System.Drawing.Color.Fuchsia;
            this.ColorMagenta.Cursor = System.Windows.Forms.Cursors.Hand;
            this.ColorMagenta.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.ColorMagenta.Font = font;
            this.ColorMagenta.Location = new System.Drawing.Point(122, 49);
            this.ColorMagenta.Margin = new System.Windows.Forms.Padding(5, 3, 5, 3);
            this.ColorMagenta.Name = "ColorMagenta";
            this.ColorMagenta.Size = new System.Drawing.Size(35, 35);
            this.ColorMagenta.TabIndex = 14;
            this.ColorMagenta.UseVisualStyleBackColor = false;
            this.ColorMagenta.Click += new System.EventHandler(this.ColorMagenta_Click);
            // 
            // ColorBlue
            // 
            this.ColorBlue.BackColor = System.Drawing.Color.Blue;
            this.ColorBlue.Cursor = System.Windows.Forms.Cursors.Hand;
            this.ColorBlue.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.ColorBlue.Font = font;
            this.ColorBlue.Location = new System.Drawing.Point(77, 49);
            this.ColorBlue.Margin = new System.Windows.Forms.Padding(5, 3, 5, 3);
            this.ColorBlue.Name = "ColorBlue";
            this.ColorBlue.Size = new System.Drawing.Size(35, 35);
            this.ColorBlue.TabIndex = 13;
            this.ColorBlue.UseVisualStyleBackColor = false;
            this.ColorBlue.Click += new System.EventHandler(this.ColorBlue_Click);
            // 
            // ColorYellow
            // 
            this.ColorYellow.BackColor = System.Drawing.Color.Yellow;
            this.ColorYellow.Cursor = System.Windows.Forms.Cursors.Hand;
            this.ColorYellow.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.ColorYellow.Font = font;
            this.ColorYellow.Location = new System.Drawing.Point(32, 49);
            this.ColorYellow.Margin = new System.Windows.Forms.Padding(5, 3, 5, 3);
            this.ColorYellow.Name = "ColorYellow";
            this.ColorYellow.Size = new System.Drawing.Size(35, 35);
            this.ColorYellow.TabIndex = 12;
            this.ColorYellow.UseVisualStyleBackColor = false;
            this.ColorYellow.Click += new System.EventHandler(this.ColorYellow_Click);
            // 
            // ColorGreen
            // 
            this.ColorGreen.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.ColorGreen.Cursor = System.Windows.Forms.Cursors.Hand;
            this.ColorGreen.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.ColorGreen.Font = font;
            this.ColorGreen.Location = new System.Drawing.Point(121, 8);
            this.ColorGreen.Margin = new System.Windows.Forms.Padding(5, 3, 5, 3);
            this.ColorGreen.Name = "ColorGreen";
            this.ColorGreen.Size = new System.Drawing.Size(35, 35);
            this.ColorGreen.TabIndex = 11;
            this.ColorGreen.UseVisualStyleBackColor = false;
            this.ColorGreen.Click += new System.EventHandler(this.ColorGreen_Click);
            // 
            // ColorRed
            // 
            this.ColorRed.BackColor = System.Drawing.Color.Red;
            this.ColorRed.Cursor = System.Windows.Forms.Cursors.Hand;
            this.ColorRed.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.ColorRed.Font = font;
            this.ColorRed.Location = new System.Drawing.Point(76, 8);
            this.ColorRed.Margin = new System.Windows.Forms.Padding(5, 3, 5, 3);
            this.ColorRed.Name = "ColorRed";
            this.ColorRed.Size = new System.Drawing.Size(35, 35);
            this.ColorRed.TabIndex = 10;
            this.ColorRed.UseVisualStyleBackColor = false;
            this.ColorRed.Click += new System.EventHandler(this.ColorRed_Click);
            // 
            // ColorBlack
            // 
            this.ColorBlack.BackColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.ColorBlack.Cursor = System.Windows.Forms.Cursors.Hand;
            this.ColorBlack.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.ColorBlack.Font = font;
            this.ColorBlack.Location = new System.Drawing.Point(32, 8);
            this.ColorBlack.Margin = new System.Windows.Forms.Padding(5, 3, 5, 3);
            this.ColorBlack.Name = "ColorBlack";
            this.ColorBlack.Size = new System.Drawing.Size(35, 35);
            this.ColorBlack.TabIndex = 9;
            this.ColorBlack.UseVisualStyleBackColor = false;
            this.ColorBlack.Click += new System.EventHandler(this.ColorBlack_Click);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label3.Location = new System.Drawing.Point(14, 330);
            this.label3.Margin = new System.Windows.Forms.Padding(5);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(55, 24);
            this.label3.TabIndex = 9;
            this.label3.Text = "Color";
            // 
            // button2
            // 
            this.button2.Location = new System.Drawing.Point(3, 568);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(188, 23);
            this.button2.TabIndex = 10;
            this.button2.Text = "Remove Notes";
            this.button2.UseVisualStyleBackColor = true;
            this.button2.Click += new System.EventHandler(this.button2_Click);
            // 
            // MainContainer
            // 
            this.MainContainer.AutoScroll = true;
            this.MainContainer.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
            this.MainContainer.BackColor = System.Drawing.SystemColors.ControlLightLight;
            this.MainContainer.Controls.Add(this.musicProgressBar);
            this.MainContainer.Controls.Add(this.Tempo);
            this.MainContainer.Controls.Add(this.title);
            this.MainContainer.Controls.Add(this.viewer);
            this.MainContainer.Location = new System.Drawing.Point(200, 24);
            this.MainContainer.Name = "MainContainer";
            this.MainContainer.Size = new System.Drawing.Size(752, 642);
            this.MainContainer.TabIndex = 11;
            // 
            // Tempo
            // 
            this.Tempo.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.Tempo.AutoSize = true;
            this.Tempo.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Tempo.Location = new System.Drawing.Point(663, 4);
            this.Tempo.Name = "Tempo";
            this.Tempo.Size = new System.Drawing.Size(39, 20);
            this.Tempo.TabIndex = 12;
            this.Tempo.Text = "120";
            this.Tempo.TextAlign = System.Drawing.ContentAlignment.TopRight;
            // 
            // title
            // 
            this.title.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.title.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.title.Location = new System.Drawing.Point(16, 5);
            this.title.Name = "title";
            this.title.Size = new System.Drawing.Size(321, 22);
            this.title.TabIndex = 11;
            this.title.Text = "Title";
            // 
            // viewer
            // 
            this.viewer.AutoScroll = true;
            this.viewer.AutoSize = true;
            this.viewer.BackColor = System.Drawing.Color.Transparent;
            this.viewer.DrawOnlySelectionAndButtons = false;
            this.viewer.DrawOnParentControl = false;
            this.viewer.IncipitID = 0;
            this.viewer.IsSelected = false;
            this.viewer.Location = new System.Drawing.Point(3, 31);
            this.viewer.Name = "viewer";
            this.viewer.ShortIncipit = null;
            this.viewer.Size = new System.Drawing.Size(722, 96);
            this.viewer.TabIndex = 0;
            this.viewer.Click += new System.EventHandler(this.viewer_Click);
            this.viewer.MouseDown += new System.Windows.Forms.MouseEventHandler(this.viewer_MouseDown);
            // 
            // ControlPanel
            // 
            this.ControlPanel.BackColor = System.Drawing.SystemColors.ControlLight;
            this.ControlPanel.Controls.Add(this.label2);
            this.ControlPanel.Controls.Add(this.panel2);
            this.ControlPanel.Controls.Add(this.label1);
            this.ControlPanel.Controls.Add(this.panel1);
            this.ControlPanel.Controls.Add(this.button2);
            this.ControlPanel.Controls.Add(this.panel3);
            this.ControlPanel.Controls.Add(this.button1);
            this.ControlPanel.Controls.Add(this.label3);
            this.ControlPanel.Location = new System.Drawing.Point(0, 24);
            this.ControlPanel.Margin = new System.Windows.Forms.Padding(0);
            this.ControlPanel.Name = "ControlPanel";
            this.ControlPanel.Size = new System.Drawing.Size(194, 642);
            this.ControlPanel.TabIndex = 12;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.BackColor = System.Drawing.Color.Transparent;
            this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.Location = new System.Drawing.Point(14, 5);
            this.label2.Margin = new System.Windows.Forms.Padding(5);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(63, 24);
            this.label2.TabIndex = 15;
            this.label2.Text = "Action";
            // 
            // panel2
            // 
            this.panel2.Controls.Add(this.SetTie);
            this.panel2.Controls.Add(this.SetBeam);
            this.panel2.Controls.Add(this.SetNote);
            this.panel2.Controls.Add(this.SetSlur);
            this.panel2.Controls.Add(this.DeleteMode);
            this.panel2.Controls.Add(this.AddMode);
            this.panel2.Controls.Add(this.EditMode);
            this.panel2.Location = new System.Drawing.Point(0, 37);
            this.panel2.Name = "panel2";
            this.panel2.Padding = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.panel2.Size = new System.Drawing.Size(194, 71);
            this.panel2.TabIndex = 14;
            // 
            // SetTie
            // 
            this.SetTie.BackColor = System.Drawing.SystemColors.Control;
            this.SetTie.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.SetTie.Location = new System.Drawing.Point(98, 43);
            this.SetTie.Margin = new System.Windows.Forms.Padding(0);
            this.SetTie.Name = "SetTie";
            this.SetTie.Size = new System.Drawing.Size(48, 25);
            this.SetTie.TabIndex = 17;
            this.SetTie.Text = "Tie";
            this.SetTie.UseVisualStyleBackColor = false;
            this.SetTie.Click += new System.EventHandler(this.SetTie_Click);
            // 
            // SetBeam
            // 
            this.SetBeam.BackColor = System.Drawing.SystemColors.Control;
            this.SetBeam.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.SetBeam.Location = new System.Drawing.Point(143, 43);
            this.SetBeam.Margin = new System.Windows.Forms.Padding(0);
            this.SetBeam.Name = "SetBeam";
            this.SetBeam.Size = new System.Drawing.Size(48, 25);
            this.SetBeam.TabIndex = 16;
            this.SetBeam.Text = "Beam";
            this.SetBeam.UseVisualStyleBackColor = false;
            this.SetBeam.Click += new System.EventHandler(this.SetBeam_Click);
            // 
            // SetNote
            // 
            this.SetNote.BackColor = System.Drawing.SystemColors.Control;
            this.SetNote.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.SetNote.Location = new System.Drawing.Point(2, 43);
            this.SetNote.Margin = new System.Windows.Forms.Padding(0);
            this.SetNote.Name = "SetNote";
            this.SetNote.Size = new System.Drawing.Size(49, 25);
            this.SetNote.TabIndex = 15;
            this.SetNote.Text = "Note";
            this.SetNote.UseVisualStyleBackColor = false;
            this.SetNote.Click += new System.EventHandler(this.SetNote_Click);
            // 
            // SetSlur
            // 
            this.SetSlur.BackColor = System.Drawing.SystemColors.Control;
            this.SetSlur.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.SetSlur.Location = new System.Drawing.Point(50, 43);
            this.SetSlur.Margin = new System.Windows.Forms.Padding(0);
            this.SetSlur.Name = "SetSlur";
            this.SetSlur.Size = new System.Drawing.Size(49, 25);
            this.SetSlur.TabIndex = 14;
            this.SetSlur.Text = "Slur";
            this.SetSlur.UseVisualStyleBackColor = false;
            this.SetSlur.Click += new System.EventHandler(this.SetSlur_Click);
            // 
            // DeleteMode
            // 
            this.DeleteMode.BackColor = System.Drawing.SystemColors.Control;
            this.DeleteMode.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.DeleteMode.Location = new System.Drawing.Point(128, 0);
            this.DeleteMode.Margin = new System.Windows.Forms.Padding(0);
            this.DeleteMode.Name = "DeleteMode";
            this.DeleteMode.Size = new System.Drawing.Size(64, 35);
            this.DeleteMode.TabIndex = 13;
            this.DeleteMode.Text = "Delete";
            this.DeleteMode.UseVisualStyleBackColor = false;
            this.DeleteMode.Click += new System.EventHandler(this.DeleteMode_Click);
            // 
            // AddMode
            // 
            this.AddMode.BackColor = System.Drawing.SystemColors.Control;
            this.AddMode.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.AddMode.Location = new System.Drawing.Point(2, 0);
            this.AddMode.Margin = new System.Windows.Forms.Padding(0);
            this.AddMode.Name = "AddMode";
            this.AddMode.Size = new System.Drawing.Size(64, 35);
            this.AddMode.TabIndex = 11;
            this.AddMode.Text = "Add";
            this.AddMode.UseVisualStyleBackColor = false;
            this.AddMode.Click += new System.EventHandler(this.AddMode_Click);
            // 
            // EditMode
            // 
            this.EditMode.BackColor = System.Drawing.SystemColors.Control;
            this.EditMode.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.EditMode.Location = new System.Drawing.Point(65, 0);
            this.EditMode.Margin = new System.Windows.Forms.Padding(0);
            this.EditMode.Name = "EditMode";
            this.EditMode.Size = new System.Drawing.Size(64, 35);
            this.EditMode.TabIndex = 12;
            this.EditMode.Text = "Edit";
            this.EditMode.UseVisualStyleBackColor = false;
            this.EditMode.Click += new System.EventHandler(this.EditMode_Click);
            // 
            // menuStrip1
            // 
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.fileToolStripMenuItem,
            this.settingToolStripMenuItem,
            this.UsertoolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(952, 24);
            this.menuStrip1.TabIndex = 13;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // fileToolStripMenuItem
            // 
            this.fileToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.openToolStripMenuItem,
            this.saveToolStripMenuItem,
            this.loadFromImageToolStripMenuItem,
            this.exitToolStripMenuItem});
            this.fileToolStripMenuItem.Name = "fileToolStripMenuItem";
            this.fileToolStripMenuItem.Size = new System.Drawing.Size(37, 20);
            this.fileToolStripMenuItem.Text = "File";
            // 
            // openToolStripMenuItem
            // 
            this.openToolStripMenuItem.Name = "openToolStripMenuItem";
            this.openToolStripMenuItem.Size = new System.Drawing.Size(174, 22);
            this.openToolStripMenuItem.Text = "Open...";
            this.openToolStripMenuItem.Click += new System.EventHandler(this.openToolStripMenuItem_Click);
            // 
            // saveToolStripMenuItem
            // 
            this.saveToolStripMenuItem.Name = "saveToolStripMenuItem";
            this.saveToolStripMenuItem.Size = new System.Drawing.Size(174, 22);
            this.saveToolStripMenuItem.Text = "Save";
            this.saveToolStripMenuItem.Click += new System.EventHandler(this.saveToolStripMenuItem_Click);
            // 
            // loadFromImageToolStripMenuItem
            // 
            this.loadFromImageToolStripMenuItem.Name = "loadFromImageToolStripMenuItem";
            this.loadFromImageToolStripMenuItem.Size = new System.Drawing.Size(174, 22);
            this.loadFromImageToolStripMenuItem.Text = "Load from image...";
            this.loadFromImageToolStripMenuItem.Click += new System.EventHandler(this.loadFromImageToolStripMenuItem_Click);
            // 
            // exitToolStripMenuItem
            // 
            this.exitToolStripMenuItem.Name = "exitToolStripMenuItem";
            this.exitToolStripMenuItem.Size = new System.Drawing.Size(174, 22);
            this.exitToolStripMenuItem.Text = "Exit";
            this.exitToolStripMenuItem.Click += new System.EventHandler(this.exitToolStripMenuItem_Click);
            // 
            // settingToolStripMenuItem
            // 
            this.settingToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.tempoToolStripMenuItem,
            this.timeSignatureToolStripMenuItem,
            this.clefToolStripMenuItem,
            this.armureToolStripMenuItem});
            this.settingToolStripMenuItem.Name = "settingToolStripMenuItem";
            this.settingToolStripMenuItem.Size = new System.Drawing.Size(56, 20);
            this.settingToolStripMenuItem.Text = "Setting";
            // 
            // tempoToolStripMenuItem
            // 
            this.tempoToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.largoToolStripMenuItem,
            this.lentoToolStripMenuItem,
            this.adagioToolStripMenuItem,
            this.andanteToolStripMenuItem,
            this.moderatoToolStripMenuItem,
            this.allegrettoToolStripMenuItem,
            this.allegroToolStripMenuItem,
            this.vivaceToolStripMenuItem,
            this.prestoToolStripMenuItem,
            this.prestissimoToolStripMenuItem});
            this.tempoToolStripMenuItem.Name = "tempoToolStripMenuItem";
            this.tempoToolStripMenuItem.Size = new System.Drawing.Size(154, 22);
            this.tempoToolStripMenuItem.Text = "Tempo";
            // 
            // largoToolStripMenuItem
            // 
            this.largoToolStripMenuItem.Name = "largoToolStripMenuItem";
            this.largoToolStripMenuItem.Size = new System.Drawing.Size(134, 22);
            this.largoToolStripMenuItem.Text = "Largo";
            this.largoToolStripMenuItem.Click += new System.EventHandler(this.largoToolStripMenuItem_Click);
            // 
            // lentoToolStripMenuItem
            // 
            this.lentoToolStripMenuItem.Name = "lentoToolStripMenuItem";
            this.lentoToolStripMenuItem.Size = new System.Drawing.Size(134, 22);
            this.lentoToolStripMenuItem.Text = "Lento";
            this.lentoToolStripMenuItem.Click += new System.EventHandler(this.lentoToolStripMenuItem_Click);
            // 
            // adagioToolStripMenuItem
            // 
            this.adagioToolStripMenuItem.Name = "adagioToolStripMenuItem";
            this.adagioToolStripMenuItem.Size = new System.Drawing.Size(134, 22);
            this.adagioToolStripMenuItem.Text = "Adagio";
            this.adagioToolStripMenuItem.Click += new System.EventHandler(this.adagioToolStripMenuItem_Click);
            // 
            // andanteToolStripMenuItem
            // 
            this.andanteToolStripMenuItem.Name = "andanteToolStripMenuItem";
            this.andanteToolStripMenuItem.Size = new System.Drawing.Size(134, 22);
            this.andanteToolStripMenuItem.Text = "Andante";
            this.andanteToolStripMenuItem.Click += new System.EventHandler(this.andanteToolStripMenuItem_Click);
            // 
            // moderatoToolStripMenuItem
            // 
            this.moderatoToolStripMenuItem.Name = "moderatoToolStripMenuItem";
            this.moderatoToolStripMenuItem.Size = new System.Drawing.Size(134, 22);
            this.moderatoToolStripMenuItem.Text = "Moderato";
            this.moderatoToolStripMenuItem.Click += new System.EventHandler(this.moderatoToolStripMenuItem_Click);
            // 
            // allegrettoToolStripMenuItem
            // 
            this.allegrettoToolStripMenuItem.Name = "allegrettoToolStripMenuItem";
            this.allegrettoToolStripMenuItem.Size = new System.Drawing.Size(134, 22);
            this.allegrettoToolStripMenuItem.Text = "Allegretto";
            this.allegrettoToolStripMenuItem.Click += new System.EventHandler(this.allegrettoToolStripMenuItem_Click);
            // 
            // allegroToolStripMenuItem
            // 
            this.allegroToolStripMenuItem.Name = "allegroToolStripMenuItem";
            this.allegroToolStripMenuItem.Size = new System.Drawing.Size(134, 22);
            this.allegroToolStripMenuItem.Text = "Allegro";
            this.allegroToolStripMenuItem.Click += new System.EventHandler(this.allegroToolStripMenuItem_Click);
            // 
            // vivaceToolStripMenuItem
            // 
            this.vivaceToolStripMenuItem.Name = "vivaceToolStripMenuItem";
            this.vivaceToolStripMenuItem.Size = new System.Drawing.Size(134, 22);
            this.vivaceToolStripMenuItem.Text = "Vivace";
            this.vivaceToolStripMenuItem.Click += new System.EventHandler(this.vivaceToolStripMenuItem_Click);
            // 
            // prestoToolStripMenuItem
            // 
            this.prestoToolStripMenuItem.Name = "prestoToolStripMenuItem";
            this.prestoToolStripMenuItem.Size = new System.Drawing.Size(134, 22);
            this.prestoToolStripMenuItem.Text = "Presto";
            this.prestoToolStripMenuItem.Click += new System.EventHandler(this.prestoToolStripMenuItem_Click);
            // 
            // prestissimoToolStripMenuItem
            // 
            this.prestissimoToolStripMenuItem.Name = "prestissimoToolStripMenuItem";
            this.prestissimoToolStripMenuItem.Size = new System.Drawing.Size(134, 22);
            this.prestissimoToolStripMenuItem.Text = "Prestissimo";
            this.prestissimoToolStripMenuItem.Click += new System.EventHandler(this.prestissimoToolStripMenuItem_Click);
            // 
            // timeSignatureToolStripMenuItem
            // 
            this.timeSignatureToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.toolStripMenuItem2,
            this.toolStripMenuItem3,
            this.toolStripMenuItem4,
            this.toolStripMenuItem5,
            this.toolStripMenuItem6,
            this.toolStripMenuItem7,
            this.toolStripMenuItem8,
            this.customToolStripMenuItem});
            this.timeSignatureToolStripMenuItem.Name = "timeSignatureToolStripMenuItem";
            this.timeSignatureToolStripMenuItem.Size = new System.Drawing.Size(154, 22);
            this.timeSignatureToolStripMenuItem.Text = "Time Signature";
            // 
            // toolStripMenuItem2
            // 
            this.toolStripMenuItem2.Name = "toolStripMenuItem2";
            this.toolStripMenuItem2.Size = new System.Drawing.Size(116, 22);
            this.toolStripMenuItem2.Text = "2/4";
            this.toolStripMenuItem2.Click += new System.EventHandler(this.toolStripMenuItem2_Click);
            // 
            // toolStripMenuItem3
            // 
            this.toolStripMenuItem3.Name = "toolStripMenuItem3";
            this.toolStripMenuItem3.Size = new System.Drawing.Size(116, 22);
            this.toolStripMenuItem3.Text = "3/4";
            this.toolStripMenuItem3.Click += new System.EventHandler(this.toolStripMenuItem3_Click);
            // 
            // toolStripMenuItem4
            // 
            this.toolStripMenuItem4.Name = "toolStripMenuItem4";
            this.toolStripMenuItem4.Size = new System.Drawing.Size(116, 22);
            this.toolStripMenuItem4.Text = "4/4";
            this.toolStripMenuItem4.Click += new System.EventHandler(this.toolStripMenuItem4_Click);
            // 
            // toolStripMenuItem5
            // 
            this.toolStripMenuItem5.Name = "toolStripMenuItem5";
            this.toolStripMenuItem5.Size = new System.Drawing.Size(116, 22);
            this.toolStripMenuItem5.Text = "3/8";
            this.toolStripMenuItem5.Click += new System.EventHandler(this.toolStripMenuItem5_Click);
            // 
            // toolStripMenuItem6
            // 
            this.toolStripMenuItem6.Name = "toolStripMenuItem6";
            this.toolStripMenuItem6.Size = new System.Drawing.Size(116, 22);
            this.toolStripMenuItem6.Text = "6/8";
            this.toolStripMenuItem6.Click += new System.EventHandler(this.toolStripMenuItem6_Click);
            // 
            // toolStripMenuItem7
            // 
            this.toolStripMenuItem7.Name = "toolStripMenuItem7";
            this.toolStripMenuItem7.Size = new System.Drawing.Size(116, 22);
            this.toolStripMenuItem7.Text = "9/8";
            this.toolStripMenuItem7.Click += new System.EventHandler(this.toolStripMenuItem7_Click);
            // 
            // toolStripMenuItem8
            // 
            this.toolStripMenuItem8.Name = "toolStripMenuItem8";
            this.toolStripMenuItem8.Size = new System.Drawing.Size(116, 22);
            this.toolStripMenuItem8.Text = "12/8";
            this.toolStripMenuItem8.Click += new System.EventHandler(this.toolStripMenuItem8_Click);
            // 
            // customToolStripMenuItem
            // 
            this.customToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.timeSignatureToolStripMenuItem1,
            this.okToolStripMenuItem});
            this.customToolStripMenuItem.Name = "customToolStripMenuItem";
            this.customToolStripMenuItem.Size = new System.Drawing.Size(116, 22);
            this.customToolStripMenuItem.Text = "Custom";
            // 
            // timeSignatureToolStripMenuItem1
            // 
            this.timeSignatureToolStripMenuItem1.Name = "timeSignatureToolStripMenuItem1";
            this.timeSignatureToolStripMenuItem1.Size = new System.Drawing.Size(152, 23);
            this.timeSignatureToolStripMenuItem1.Text = "Enter TimeSignature ...";
            this.timeSignatureToolStripMenuItem1.GotFocus += new System.EventHandler(this.timeSignatureToolStripMenuItem1_Click);
            // 
            // okToolStripMenuItem
            // 
            this.okToolStripMenuItem.Name = "okToolStripMenuItem";
            this.okToolStripMenuItem.Size = new System.Drawing.Size(212, 22);
            this.okToolStripMenuItem.Text = "Ok";
            this.okToolStripMenuItem.Click += new System.EventHandler(this.okToolStripMenuItem_Click);
            // 
            // clefToolStripMenuItem
            // 
            this.clefToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.gToolStripMenuItem,
            this.fToolStripMenuItem,
            this.cToolStripMenuItem});
            this.clefToolStripMenuItem.Name = "clefToolStripMenuItem";
            this.clefToolStripMenuItem.Size = new System.Drawing.Size(154, 22);
            this.clefToolStripMenuItem.Text = "Clef";
            // 
            // gToolStripMenuItem
            // 
            this.gToolStripMenuItem.Name = "gToolStripMenuItem";
            this.gToolStripMenuItem.Size = new System.Drawing.Size(82, 22);
            this.gToolStripMenuItem.Text = "G";
            this.gToolStripMenuItem.Click += new System.EventHandler(this.gToolStripMenuItem_Click);
            // 
            // fToolStripMenuItem
            // 
            this.fToolStripMenuItem.Name = "fToolStripMenuItem";
            this.fToolStripMenuItem.Size = new System.Drawing.Size(82, 22);
            this.fToolStripMenuItem.Text = "F";
            this.fToolStripMenuItem.Click += new System.EventHandler(this.fToolStripMenuItem_Click);
            // 
            // cToolStripMenuItem
            // 
            this.cToolStripMenuItem.Name = "cToolStripMenuItem";
            this.cToolStripMenuItem.Size = new System.Drawing.Size(82, 22);
            this.cToolStripMenuItem.Text = "C";
            this.cToolStripMenuItem.Click += new System.EventHandler(this.cToolStripMenuItem_Click);
            // 
            // armureToolStripMenuItem
            // 
            this.armureToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.MenuArmure_7b,
            this.MenuArmure_6b,
            this.MenuArmure_5b,
            this.MenuArmure_4b,
            this.MenuArmure_3b,
            this.MenuArmure_2b,
            this.MenuArmure_1b,
            this.MenuArmure_Default,
            this.MenuArmure_1d,
            this.MenuArmure_2d,
            this.MenuArmure_3d,
            this.MenuArmure_4d,
            this.MenuArmure_5d,
            this.MenuArmure_6d,
            this.MenuArmure_7d});
            this.armureToolStripMenuItem.Name = "armureToolStripMenuItem";
            this.armureToolStripMenuItem.Size = new System.Drawing.Size(154, 22);
            this.armureToolStripMenuItem.Text = "Armure";
            // 
            // MenuArmure_7b
            // 
            this.MenuArmure_7b.CheckOnClick = true;
            this.MenuArmure_7b.ForeColor = System.Drawing.Color.Transparent;
            this.MenuArmure_7b.Name = "MenuArmure_7b";
            this.MenuArmure_7b.Size = new System.Drawing.Size(175, 22);
            this.MenuArmure_7b.Text = "7bb - Dobb Majeur";
            this.MenuArmure_7b.Click += new System.EventHandler(this.MenuArmure_7b_Click);
            this.MenuArmure_7b.Paint += new System.Windows.Forms.PaintEventHandler(this.MenuArmure_Paint);
            // 
            // MenuArmure_6b
            // 
            this.MenuArmure_6b.CheckOnClick = true;
            this.MenuArmure_6b.ForeColor = System.Drawing.Color.Transparent;
            this.MenuArmure_6b.Name = "MenuArmure_6b";
            this.MenuArmure_6b.Size = new System.Drawing.Size(175, 22);
            this.MenuArmure_6b.Text = "6bb - Solbb Majeur";
            this.MenuArmure_6b.Click += new System.EventHandler(this.MenuArmure_6b_Click);
            this.MenuArmure_6b.Paint += new System.Windows.Forms.PaintEventHandler(this.MenuArmure_Paint);
            // 
            // MenuArmure_5b
            // 
            this.MenuArmure_5b.CheckOnClick = true;
            this.MenuArmure_5b.ForeColor = System.Drawing.Color.Transparent;
            this.MenuArmure_5b.Name = "MenuArmure_5b";
            this.MenuArmure_5b.Size = new System.Drawing.Size(175, 22);
            this.MenuArmure_5b.Text = "5bb - Rébb Majeur";
            this.MenuArmure_5b.Click += new System.EventHandler(this.MenuArmure_5b_Click);
            this.MenuArmure_5b.Paint += new System.Windows.Forms.PaintEventHandler(this.MenuArmure_Paint);
            // 
            // MenuArmure_4b
            // 
            this.MenuArmure_4b.CheckOnClick = true;
            this.MenuArmure_4b.ForeColor = System.Drawing.Color.Transparent;
            this.MenuArmure_4b.Name = "MenuArmure_4b";
            this.MenuArmure_4b.Size = new System.Drawing.Size(175, 22);
            this.MenuArmure_4b.Text = "4bb - Labb Majeur";
            this.MenuArmure_4b.Click += new System.EventHandler(this.MenuArmure_4b_Click);
            this.MenuArmure_4b.Paint += new System.Windows.Forms.PaintEventHandler(this.MenuArmure_Paint);
            // 
            // MenuArmure_3b
            // 
            this.MenuArmure_3b.CheckOnClick = true;
            this.MenuArmure_3b.ForeColor = System.Drawing.Color.Transparent;
            this.MenuArmure_3b.Name = "MenuArmure_3b";
            this.MenuArmure_3b.Size = new System.Drawing.Size(175, 22);
            this.MenuArmure_3b.Text = "3bb - Mibb Majeur";
            this.MenuArmure_3b.Click += new System.EventHandler(this.MenuArmure_3b_Click);
            this.MenuArmure_3b.Paint += new System.Windows.Forms.PaintEventHandler(this.MenuArmure_Paint);
            // 
            // MenuArmure_2b
            // 
            this.MenuArmure_2b.CheckOnClick = true;
            this.MenuArmure_2b.ForeColor = System.Drawing.Color.Transparent;
            this.MenuArmure_2b.Name = "MenuArmure_2b";
            this.MenuArmure_2b.Size = new System.Drawing.Size(175, 22);
            this.MenuArmure_2b.Text = "2bb - Sibb Majeur";
            this.MenuArmure_2b.Click += new System.EventHandler(this.MenuArmure_2b_Click);
            this.MenuArmure_2b.Paint += new System.Windows.Forms.PaintEventHandler(this.MenuArmure_Paint);
            // 
            // MenuArmure_1b
            // 
            this.MenuArmure_1b.CheckOnClick = true;
            this.MenuArmure_1b.ForeColor = System.Drawing.Color.Transparent;
            this.MenuArmure_1b.Name = "MenuArmure_1b";
            this.MenuArmure_1b.Size = new System.Drawing.Size(175, 22);
            this.MenuArmure_1b.Text = "1bb - Fa Majeur";
            this.MenuArmure_1b.Click += new System.EventHandler(this.MenuArmure_1b_Click);
            this.MenuArmure_1b.Paint += new System.Windows.Forms.PaintEventHandler(this.MenuArmure_Paint);
            // 
            // MenuArmure_Default
            // 
            this.MenuArmure_Default.Checked = true;
            this.MenuArmure_Default.CheckState = System.Windows.Forms.CheckState.Checked;
            this.MenuArmure_Default.ForeColor = System.Drawing.Color.Transparent;
            this.MenuArmure_Default.Name = "MenuArmure_Default";
            this.MenuArmure_Default.Size = new System.Drawing.Size(175, 22);
            this.MenuArmure_Default.Text = "0 - Do Majeur";
            this.MenuArmure_Default.Click += new System.EventHandler(this.MenuArmure_Default_Click);
            this.MenuArmure_Default.Paint += new System.Windows.Forms.PaintEventHandler(this.MenuArmure_Paint);
            // 
            // MenuArmure_1d
            // 
            this.MenuArmure_1d.CheckOnClick = true;
            this.MenuArmure_1d.ForeColor = System.Drawing.Color.Transparent;
            this.MenuArmure_1d.Name = "MenuArmure_1d";
            this.MenuArmure_1d.Size = new System.Drawing.Size(175, 22);
            this.MenuArmure_1d.Text = "1# - Sol Majeur";
            this.MenuArmure_1d.Click += new System.EventHandler(this.MenuArmure_1d_Click);
            this.MenuArmure_1d.Paint += new System.Windows.Forms.PaintEventHandler(this.MenuArmure_Paint);
            // 
            // MenuArmure_2d
            // 
            this.MenuArmure_2d.CheckOnClick = true;
            this.MenuArmure_2d.ForeColor = System.Drawing.Color.Transparent;
            this.MenuArmure_2d.Name = "MenuArmure_2d";
            this.MenuArmure_2d.Size = new System.Drawing.Size(175, 22);
            this.MenuArmure_2d.Text = "2# - Ré Majeur";
            this.MenuArmure_2d.Click += new System.EventHandler(this.MenuArmure_2d_Click);
            this.MenuArmure_2d.Paint += new System.Windows.Forms.PaintEventHandler(this.MenuArmure_Paint);
            // 
            // MenuArmure_3d
            // 
            this.MenuArmure_3d.CheckOnClick = true;
            this.MenuArmure_3d.ForeColor = System.Drawing.Color.Transparent;
            this.MenuArmure_3d.Name = "MenuArmure_3d";
            this.MenuArmure_3d.Size = new System.Drawing.Size(175, 22);
            this.MenuArmure_3d.Text = "3# - La Majeur";
            this.MenuArmure_3d.Click += new System.EventHandler(this.MenuArmure_3d_Click);
            this.MenuArmure_3d.Paint += new System.Windows.Forms.PaintEventHandler(this.MenuArmure_Paint);
            // 
            // MenuArmure_4d
            // 
            this.MenuArmure_4d.CheckOnClick = true;
            this.MenuArmure_4d.ForeColor = System.Drawing.Color.Transparent;
            this.MenuArmure_4d.Name = "MenuArmure_4d";
            this.MenuArmure_4d.Size = new System.Drawing.Size(175, 22);
            this.MenuArmure_4d.Text = "4# - Mi Majeur";
            this.MenuArmure_4d.Click += new System.EventHandler(this.MenuArmure_4d_Click);
            this.MenuArmure_4d.Paint += new System.Windows.Forms.PaintEventHandler(this.MenuArmure_Paint);
            // 
            // MenuArmure_5d
            // 
            this.MenuArmure_5d.CheckOnClick = true;
            this.MenuArmure_5d.ForeColor = System.Drawing.Color.Transparent;
            this.MenuArmure_5d.Name = "MenuArmure_5d";
            this.MenuArmure_5d.Size = new System.Drawing.Size(175, 22);
            this.MenuArmure_5d.Text = "5# - Si Majeur";
            this.MenuArmure_5d.Click += new System.EventHandler(this.MenuArmure_5d_Click);
            this.MenuArmure_5d.Paint += new System.Windows.Forms.PaintEventHandler(this.MenuArmure_Paint);
            // 
            // MenuArmure_6d
            // 
            this.MenuArmure_6d.CheckOnClick = true;
            this.MenuArmure_6d.ForeColor = System.Drawing.Color.Transparent;
            this.MenuArmure_6d.Name = "MenuArmure_6d";
            this.MenuArmure_6d.Size = new System.Drawing.Size(175, 22);
            this.MenuArmure_6d.Text = "6# - Fa# Majeur";
            this.MenuArmure_6d.Click += new System.EventHandler(this.MenuArmure_6d_Click);
            this.MenuArmure_6d.Paint += new System.Windows.Forms.PaintEventHandler(this.MenuArmure_Paint);
            // 
            // MenuArmure_7d
            // 
            this.MenuArmure_7d.CheckOnClick = true;
            this.MenuArmure_7d.ForeColor = System.Drawing.Color.Transparent;
            this.MenuArmure_7d.Name = "MenuArmure_7d";
            this.MenuArmure_7d.Size = new System.Drawing.Size(175, 22);
            this.MenuArmure_7d.Text = "7# - Do# Majeur";
            this.MenuArmure_7d.Click += new System.EventHandler(this.MenuArmure_7d_Click);
            this.MenuArmure_7d.Paint += new System.Windows.Forms.PaintEventHandler(this.MenuArmure_Paint);
            // 
            // UsertoolStripMenuItem
            // 
            this.UsertoolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.loginToolStripMenuItem,
            this.uploadPartitionToolStripMenuItem,
            this.downloadFromTheStoreToolStripMenuItem,
            this.logoutToolStripMenuItem});
            this.UsertoolStripMenuItem.Name = "UsertoolStripMenuItem";
            this.UsertoolStripMenuItem.Size = new System.Drawing.Size(42, 20);
            this.UsertoolStripMenuItem.Text = "User";
            // 
            // loginToolStripMenuItem
            // 
            this.loginToolStripMenuItem.Name = "loginToolStripMenuItem";
            this.loginToolStripMenuItem.Size = new System.Drawing.Size(206, 22);
            this.loginToolStripMenuItem.Text = "Login";
            this.loginToolStripMenuItem.Click += new System.EventHandler(this.loginToolStripMenuItem_Click);
            // 
            // uploadPartitionToolStripMenuItem
            // 
            this.uploadPartitionToolStripMenuItem.Name = "uploadPartitionToolStripMenuItem";
            this.uploadPartitionToolStripMenuItem.Size = new System.Drawing.Size(206, 22);
            this.uploadPartitionToolStripMenuItem.Text = "Upload partition";
            this.uploadPartitionToolStripMenuItem.Visible = false;
            this.uploadPartitionToolStripMenuItem.Click += new System.EventHandler(this.uploadPartitionToolStripMenuItem_Click);
            // 
            // downloadFromTheStoreToolStripMenuItem
            // 
            this.downloadFromTheStoreToolStripMenuItem.Name = "downloadFromTheStoreToolStripMenuItem";
            this.downloadFromTheStoreToolStripMenuItem.Size = new System.Drawing.Size(206, 22);
            this.downloadFromTheStoreToolStripMenuItem.Text = "Download from the store";
            this.downloadFromTheStoreToolStripMenuItem.Visible = false;
            this.downloadFromTheStoreToolStripMenuItem.Click += new System.EventHandler(this.downloadFromTheStoreToolStripMenuItem_Click);
            // 
            // logoutToolStripMenuItem
            // 
            this.logoutToolStripMenuItem.Name = "logoutToolStripMenuItem";
            this.logoutToolStripMenuItem.Size = new System.Drawing.Size(206, 22);
            this.logoutToolStripMenuItem.Text = "Logout";
            this.logoutToolStripMenuItem.Visible = false;
            this.logoutToolStripMenuItem.Click += new System.EventHandler(this.logoutToolStripMenuItem_Click);
            // 
            // musicProgressBar
            // 
            this.musicProgressBar.Enabled = false;
            this.musicProgressBar.Visible = false;
            this.musicProgressBar.Location = new System.Drawing.Point(214, 265);
            this.musicProgressBar.Name = "musicProgressBar";
            this.musicProgressBar.Size = new System.Drawing.Size(273, 23);
            this.musicProgressBar.TabIndex = 13;
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.ActiveBorder;
            this.ClientSize = new System.Drawing.Size(952, 667);
            this.Controls.Add(this.ControlPanel);
            this.Controls.Add(this.MainContainer);
            this.Controls.Add(this.menuStrip1);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MainMenuStrip = this.menuStrip1;
            this.Name = "MainForm";
            this.Text = "Light Them Up - Editeur de Partition";
            this.ResizeEnd += new System.EventHandler(this.Form1_ResizeEnd);
            this.panel1.ResumeLayout(false);
            this.panel3.ResumeLayout(false);
            this.MainContainer.ResumeLayout(false);
            this.MainContainer.PerformLayout();
            this.ControlPanel.ResumeLayout(false);
            this.ControlPanel.PerformLayout();
            this.panel2.ResumeLayout(false);
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private PSAMControlLibrary.IncipitViewer viewer;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Button QuarterNoteSelect;
        private System.Windows.Forms.Button EighthNoteSelect;
        private System.Windows.Forms.Button d128ndNoteSelect;
        private System.Windows.Forms.Button d64ndNoteSelect;
        private System.Windows.Forms.Button SixteenthNoteSelect;
        private System.Windows.Forms.Button d32ndNoteSelect;
        private System.Windows.Forms.Button HalfNoteSelect;
        private System.Windows.Forms.Button WholeNoteSelect;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.Button EighthRest;
        private System.Windows.Forms.Button d128thRest;
        private System.Windows.Forms.Button d64thRest;
        private System.Windows.Forms.Button SixteenthRest;
        private System.Windows.Forms.Button d32ndRest;
        private System.Windows.Forms.Button HalfRest;
        private System.Windows.Forms.Button WholeRest;
        private System.Windows.Forms.Button QuarterRest;
        private System.Windows.Forms.Panel panel3;
        private System.Windows.Forms.Button ColorMagenta;
        private System.Windows.Forms.Button ColorBlue;
        private System.Windows.Forms.Button ColorYellow;
        private System.Windows.Forms.Button ColorGreen;
        private System.Windows.Forms.Button ColorRed;
        private System.Windows.Forms.Button ColorBlack;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Button button2;
        private System.Windows.Forms.Panel MainContainer;
        private System.Windows.Forms.Panel ControlPanel;
        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem fileToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem openToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem saveToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem exitToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem settingToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem tempoToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem timeSignatureToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem toolStripMenuItem2;
        private System.Windows.Forms.ToolStripMenuItem toolStripMenuItem3;
        private System.Windows.Forms.ToolStripMenuItem toolStripMenuItem4;
        private System.Windows.Forms.ToolStripMenuItem toolStripMenuItem5;
        private System.Windows.Forms.ToolStripMenuItem toolStripMenuItem6;
        private System.Windows.Forms.ToolStripMenuItem toolStripMenuItem7;
        private System.Windows.Forms.ToolStripMenuItem toolStripMenuItem8;
        private System.Windows.Forms.ToolStripMenuItem customToolStripMenuItem;
        private System.Windows.Forms.ToolStripTextBox timeSignatureToolStripMenuItem1;
        private System.Windows.Forms.ToolStripMenuItem okToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem largoToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem lentoToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem adagioToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem andanteToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem moderatoToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem allegrettoToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem allegroToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem vivaceToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem prestoToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem prestissimoToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem loadFromImageToolStripMenuItem;
        private System.Windows.Forms.Label Tempo;
        private int TempoValue;
        private System.Windows.Forms.ToolStripMenuItem clefToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem gToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem fToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem cToolStripMenuItem;
        private System.Windows.Forms.Button DeleteMode;
        private System.Windows.Forms.Button EditMode;
        private System.Windows.Forms.Button AddMode;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Panel panel2;
        private System.Windows.Forms.Button SetSlur;
        private System.Windows.Forms.Button SetNote;
        private System.Windows.Forms.Button SetBeam;
        private System.Windows.Forms.Button SetTie;
        private System.Windows.Forms.ToolStripMenuItem UsertoolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem loginToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem uploadPartitionToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem downloadFromTheStoreToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem logoutToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem armureToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem MenuArmure_7b;
        private System.Windows.Forms.ToolStripMenuItem MenuArmure_6b;
        private System.Windows.Forms.ToolStripMenuItem MenuArmure_5b;
        private System.Windows.Forms.ToolStripMenuItem MenuArmure_4b;
        private System.Windows.Forms.ToolStripMenuItem MenuArmure_3b;
        private System.Windows.Forms.ToolStripMenuItem MenuArmure_2b;
        private System.Windows.Forms.ToolStripMenuItem MenuArmure_1b;
        private System.Windows.Forms.ToolStripMenuItem MenuArmure_Default;
        private System.Windows.Forms.ToolStripMenuItem MenuArmure_1d;
        private System.Windows.Forms.ToolStripMenuItem MenuArmure_2d;
        private System.Windows.Forms.ToolStripMenuItem MenuArmure_3d;
        private System.Windows.Forms.ToolStripMenuItem MenuArmure_4d;
        private System.Windows.Forms.ToolStripMenuItem MenuArmure_5d;
        private System.Windows.Forms.ToolStripMenuItem MenuArmure_6d;
        private System.Windows.Forms.ToolStripMenuItem MenuArmure_7d;
        private System.Windows.Forms.TextBox title;
        private System.Windows.Forms.ProgressBar musicProgressBar;
    }
}

