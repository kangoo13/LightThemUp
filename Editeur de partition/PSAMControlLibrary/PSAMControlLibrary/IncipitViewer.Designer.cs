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
    partial class IncipitViewer
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

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(IncipitViewer));
            this.buttonSaveXml = new System.Windows.Forms.Button();
            this.buttonPlay = new System.Windows.Forms.Button();
            this.buttonParseError = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // buttonSaveXml
            // 
            this.buttonSaveXml.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.buttonSaveXml.FlatAppearance.BorderColor = System.Drawing.SystemColors.GradientInactiveCaption;
            this.buttonSaveXml.FlatAppearance.BorderSize = 0;
            this.buttonSaveXml.FlatAppearance.MouseDownBackColor = System.Drawing.Color.Transparent;
            this.buttonSaveXml.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Transparent;
            this.buttonSaveXml.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.buttonSaveXml.Image = ((System.Drawing.Image)(resources.GetObject("buttonSaveXml.Image")));
            this.buttonSaveXml.Location = new System.Drawing.Point(97, 3);
            this.buttonSaveXml.Name = "buttonSaveXml";
            this.buttonSaveXml.Size = new System.Drawing.Size(27, 27);
            this.buttonSaveXml.TabIndex = 0;
            this.buttonSaveXml.UseVisualStyleBackColor = false;
            this.buttonSaveXml.Visible = false;
            this.buttonSaveXml.MouseLeave += new System.EventHandler(this.buttonSaveXml_MouseLeave);
            this.buttonSaveXml.MouseMove += new System.Windows.Forms.MouseEventHandler(this.buttonSaveXml_MouseMove);
            this.buttonSaveXml.Click += new System.EventHandler(this.buttonSaveXml_Click);
            this.buttonSaveXml.MouseHover += new System.EventHandler(this.buttonSaveXml_MouseHover);
            this.buttonSaveXml.MouseEnter += new System.EventHandler(this.buttonSaveXml_MouseEnter);
            // 
            // buttonPlay
            // 
            this.buttonPlay.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.buttonPlay.FlatAppearance.BorderColor = System.Drawing.SystemColors.GradientInactiveCaption;
            this.buttonPlay.FlatAppearance.BorderSize = 0;
            this.buttonPlay.FlatAppearance.MouseDownBackColor = System.Drawing.Color.Transparent;
            this.buttonPlay.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Transparent;
            this.buttonPlay.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.buttonPlay.Image = ((System.Drawing.Image)(resources.GetObject("buttonPlay.Image")));
            this.buttonPlay.Location = new System.Drawing.Point(120, 3);
            this.buttonPlay.Name = "buttonPlay";
            this.buttonPlay.Size = new System.Drawing.Size(27, 27);
            this.buttonPlay.TabIndex = 1;
            this.buttonPlay.UseVisualStyleBackColor = false;
            this.buttonPlay.Visible = false;
            this.buttonPlay.Click += new System.EventHandler(this.buttonPlay_Click);
            // 
            // buttonParseError
            // 
            this.buttonParseError.FlatAppearance.BorderColor = System.Drawing.SystemColors.GradientInactiveCaption;
            this.buttonParseError.FlatAppearance.BorderSize = 0;
            this.buttonParseError.FlatAppearance.MouseDownBackColor = System.Drawing.Color.Transparent;
            this.buttonParseError.FlatAppearance.MouseOverBackColor = System.Drawing.Color.Transparent;
            this.buttonParseError.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.buttonParseError.Image = ((System.Drawing.Image)(resources.GetObject("buttonParseError.Image")));
            this.buttonParseError.Location = new System.Drawing.Point(3, 3);
            this.buttonParseError.Name = "buttonParseError";
            this.buttonParseError.Size = new System.Drawing.Size(27, 27);
            this.buttonParseError.TabIndex = 2;
            this.buttonParseError.UseVisualStyleBackColor = false;
            this.buttonParseError.Visible = false;
            // 
            // IncipitViewer
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Transparent;
            this.Controls.Add(this.buttonParseError);
            this.Controls.Add(this.buttonPlay);
            this.Controls.Add(this.buttonSaveXml);
            this.DoubleBuffered = true;
            this.Name = "IncipitViewer";
            this.MouseLeave += new System.EventHandler(this.IncipitViewer_MouseLeave);
            this.MouseMove += new System.Windows.Forms.MouseEventHandler(this.IncipitViewer_MouseMove);
            this.Resize += new System.EventHandler(this.IncipitViewer_Resize);
            this.MouseEnter += new System.EventHandler(this.IncipitViewer_MouseEnter);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button buttonSaveXml;
        private System.Windows.Forms.Button buttonPlay;
        private System.Windows.Forms.Button buttonParseError;
    }
}
