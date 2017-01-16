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
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace PSAMControlLibrary
{
    public partial class Test : Form
    {
        #region Constructor

        public Test()
        {
            InitializeComponent();

        }

        #endregion

        #region Event subscribers

        private void buttonFromXml_Click(object sender, EventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.Personal);
            openFileDialog.Filter = "Pliki Xml (*.xml)|*.xml|Wszystkie pliki (*.*)|*.*";
            if (openFileDialog.ShowDialog(this) == DialogResult.OK)
            {
                string FileName = openFileDialog.FileName;
                incipitViewer1.LoadFromXmlFile(FileName);
            }
        }

        private void buttonFromText_Click(object sender, EventArgs e)
        {
            incipitViewer1.IncipitFromSearchStringValue(textBox1.Text);
        }

        private void incipitViewer1_Load(object sender, EventArgs e)
        {

        }

        private void incipitViewer1_Click(object sender, EventArgs e)
        {
            ((IncipitViewer)sender).IsSelected = !(((IncipitViewer)sender).IsSelected);
        }

        private void checkBox1_CheckedChanged(object sender, EventArgs e)
        {
            incipitViewer1.IsSelected = checkBox1.Checked;
            incipitViewer1.Refresh();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            textBox1.Text = incipitViewer1.SearchStringValueFromIncipit();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            textBox1.Text = incipitViewer1.LyricsFromIncipit();
        }

        private void button3_Click(object sender, EventArgs e)
        {
            PrintDialog dlg = new PrintDialog();
            dlg.Document = printDocument1;
            if (dlg.ShowDialog() == DialogResult.OK)
            {
                printDocument1.Print();
            }
        }

        private void printDocument1_PrintPage(object sender, System.Drawing.Printing.PrintPageEventArgs e)
        {
            Graphics g = e.Graphics;
            incipitViewer1.DrawViewer(g, true);
        }

        private void buttonToContour_Click(object sender, EventArgs e)
        {
            textBox1.Text = incipitViewer1.MellicContourFromIncipit();
        }

        private void buttonToRhythm_Click(object sender, EventArgs e)
        {
            textBox1.Text = incipitViewer1.RhythmFromIncipit();

        }

        private void buttonQBHTest_Click(object sender, EventArgs e)
        {
            double i = 0;
            StringBuilder sb = new StringBuilder();
            while (true)
            {
                sb.Append(String.Format("{0:0.00}", 27.5f * Math.Pow(2, -1.0f / 18) * Math.Pow(2, i / 12)));
                sb.Append("-");
                sb.Append(String.Format("{0:0.00}", 27.5f * Math.Pow(2, i / 12)));
                sb.Append("-");
                sb.Append(String.Format("{0:0.00}", 27.5f * Math.Pow(2, 1.0f / 36) * Math.Pow(2, i / 12)));
                sb.Append("\r\n ");
                i++;
                if (i > 100) break;
            }
            Clipboard.SetText(sb.ToString());
            MessageBox.Show("QBH bounds has been copied to clipboard / Skopiowano przedziały do schowka");

        }

        #endregion

    }
}
