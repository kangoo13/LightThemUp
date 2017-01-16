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
*/

namespace PSAMControlLibrary
{
    partial class Test
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

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
            this.buttonFromXml = new System.Windows.Forms.Button();
            this.textBox1 = new System.Windows.Forms.TextBox();
            this.buttonFromText = new System.Windows.Forms.Button();
            this.checkBox1 = new System.Windows.Forms.CheckBox();
            this.button1 = new System.Windows.Forms.Button();
            this.button2 = new System.Windows.Forms.Button();
            this.button3 = new System.Windows.Forms.Button();
            this.printDocument1 = new System.Drawing.Printing.PrintDocument();
            this.buttonToContour = new System.Windows.Forms.Button();
            this.buttonToRhythm = new System.Windows.Forms.Button();
            this.panel1 = new System.Windows.Forms.Panel();
            this.buttonQBHTest = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.psamRuler1 = new PSAMControlLibrary.PSAMRuler();
            this.incipitViewer1 = new PSAMControlLibrary.IncipitViewer();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // buttonFromXml
            // 
            this.buttonFromXml.Location = new System.Drawing.Point(360, 168);
            this.buttonFromXml.Name = "buttonFromXml";
            this.buttonFromXml.Size = new System.Drawing.Size(133, 23);
            this.buttonFromXml.TabIndex = 1;
            this.buttonFromXml.Text = "From Xml... / Z Xml...";
            this.buttonFromXml.UseVisualStyleBackColor = true;
            this.buttonFromXml.Click += new System.EventHandler(this.buttonFromXml_Click);
            // 
            // textBox1
            // 
            this.textBox1.Location = new System.Drawing.Point(138, 126);
            this.textBox1.Name = "textBox1";
            this.textBox1.Size = new System.Drawing.Size(216, 20);
            this.textBox1.TabIndex = 3;
            // 
            // buttonFromText
            // 
            this.buttonFromText.Location = new System.Drawing.Point(360, 126);
            this.buttonFromText.Name = "buttonFromText";
            this.buttonFromText.Size = new System.Drawing.Size(133, 36);
            this.buttonFromText.TabIndex = 4;
            this.buttonFromText.Text = "From searchtring / Z searchstringa";
            this.buttonFromText.UseVisualStyleBackColor = true;
            this.buttonFromText.Click += new System.EventHandler(this.buttonFromText_Click);
            // 
            // checkBox1
            // 
            this.checkBox1.Location = new System.Drawing.Point(53, 152);
            this.checkBox1.Name = "checkBox1";
            this.checkBox1.Size = new System.Drawing.Size(113, 70);
            this.checkBox1.TabIndex = 5;
            this.checkBox1.Text = "Select / Zaznacz";
            this.checkBox1.UseVisualStyleBackColor = true;
            this.checkBox1.CheckedChanged += new System.EventHandler(this.checkBox1_CheckedChanged);
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(499, 126);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(124, 36);
            this.button1.TabIndex = 6;
            this.button1.Text = "To searchstring / Na searchstring";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // button2
            // 
            this.button2.Location = new System.Drawing.Point(499, 168);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(124, 23);
            this.button2.TabIndex = 7;
            this.button2.Text = "Lyrics / Tekst";
            this.button2.UseVisualStyleBackColor = true;
            this.button2.Click += new System.EventHandler(this.button2_Click);
            // 
            // button3
            // 
            this.button3.Location = new System.Drawing.Point(172, 152);
            this.button3.Name = "button3";
            this.button3.Size = new System.Drawing.Size(46, 70);
            this.button3.TabIndex = 8;
            this.button3.Text = "Print / Drukuj";
            this.button3.UseVisualStyleBackColor = true;
            this.button3.Click += new System.EventHandler(this.button3_Click);
            // 
            // printDocument1
            // 
            this.printDocument1.PrintPage += new System.Drawing.Printing.PrintPageEventHandler(this.printDocument1_PrintPage);
            // 
            // buttonToContour
            // 
            this.buttonToContour.Location = new System.Drawing.Point(294, 153);
            this.buttonToContour.Name = "buttonToContour";
            this.buttonToContour.Size = new System.Drawing.Size(60, 70);
            this.buttonToContour.TabIndex = 9;
            this.buttonToContour.Text = "To contour / Na kontur";
            this.buttonToContour.UseVisualStyleBackColor = true;
            this.buttonToContour.Click += new System.EventHandler(this.buttonToContour_Click);
            // 
            // buttonToRhythm
            // 
            this.buttonToRhythm.Location = new System.Drawing.Point(224, 153);
            this.buttonToRhythm.Name = "buttonToRhythm";
            this.buttonToRhythm.Size = new System.Drawing.Size(64, 70);
            this.buttonToRhythm.TabIndex = 10;
            this.buttonToRhythm.Text = "To rhythm / Na rytm";
            this.buttonToRhythm.UseVisualStyleBackColor = true;
            this.buttonToRhythm.Click += new System.EventHandler(this.buttonToRhythm_Click);
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.incipitViewer1);
            this.panel1.Location = new System.Drawing.Point(53, 13);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(570, 107);
            this.panel1.TabIndex = 13;
            // 
            // buttonQBHTest
            // 
            this.buttonQBHTest.Location = new System.Drawing.Point(360, 199);
            this.buttonQBHTest.Name = "buttonQBHTest";
            this.buttonQBHTest.Size = new System.Drawing.Size(263, 23);
            this.buttonQBHTest.TabIndex = 14;
            this.buttonQBHTest.Text = "Test QBH bounds / Testuj przedziały QBH";
            this.buttonQBHTest.UseVisualStyleBackColor = true;
            this.buttonQBHTest.Click += new System.EventHandler(this.buttonQBHTest_Click);
            // 
            // label1
            // 
            this.label1.Location = new System.Drawing.Point(54, 129);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(78, 23);
            this.label1.TabIndex = 16;
            this.label1.Text = "Searchstring";
            // 
            // psamRuler1
            // 
            this.psamRuler1.BackColor = System.Drawing.Color.Transparent;
            this.psamRuler1.Dpi = 75;
            this.psamRuler1.Location = new System.Drawing.Point(4, 5);
            this.psamRuler1.Name = "psamRuler1";
            this.psamRuler1.OrientationType = PSAMControlLibrary.PSAMRuler.OrientationTypeEnum.TopToBottom;
            this.psamRuler1.Proportion = 1F;
            this.psamRuler1.RightToLeft = System.Windows.Forms.RightToLeft.No;
            this.psamRuler1.Size = new System.Drawing.Size(43, 217);
            this.psamRuler1.TabIndex = 15;
            this.psamRuler1.Units = PSAMControlLibrary.PSAMRuler.UnitsTypeEnum.Centimeters;
            // 
            // incipitViewer1
            // 
            this.incipitViewer1.BackColor = System.Drawing.Color.Transparent;
            this.incipitViewer1.DrawOnlySelectionAndButtons = false;
            this.incipitViewer1.DrawOnParentControl = false;
            this.incipitViewer1.IncipitID = 0;
            this.incipitViewer1.IsSelected = false;
            this.incipitViewer1.Location = new System.Drawing.Point(4, 4);
            this.incipitViewer1.Name = "incipitViewer1";
            this.incipitViewer1.ShortIncipit = null;
            this.incipitViewer1.Size = new System.Drawing.Size(558, 103);
            this.incipitViewer1.TabIndex = 0;
            // 
            // Test
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(627, 235);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.psamRuler1);
            this.Controls.Add(this.buttonQBHTest);
            this.Controls.Add(this.panel1);
            this.Controls.Add(this.buttonToRhythm);
            this.Controls.Add(this.buttonToContour);
            this.Controls.Add(this.button3);
            this.Controls.Add(this.button2);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.checkBox1);
            this.Controls.Add(this.buttonFromText);
            this.Controls.Add(this.textBox1);
            this.Controls.Add(this.buttonFromXml);
            this.Name = "Test";
            this.Text = "Test window / Okno testowe biblioteki PSAMControlLibrary";
            this.panel1.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion


        private System.Windows.Forms.Button buttonFromXml;
        private System.Windows.Forms.TextBox textBox1;
        private System.Windows.Forms.Button buttonFromText;
        private System.Windows.Forms.CheckBox checkBox1;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.Button button2;
        private System.Windows.Forms.Button button3;
        private System.Drawing.Printing.PrintDocument printDocument1;
        private System.Windows.Forms.Button buttonToContour;
        private System.Windows.Forms.Button buttonToRhythm;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Button buttonQBHTest;
        private IncipitViewer incipitViewer1;
        private PSAMRuler psamRuler1;
        private System.Windows.Forms.Label label1;
    }
}