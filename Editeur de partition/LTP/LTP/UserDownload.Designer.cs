namespace LTP
{
    partial class UserDownload
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
            this.panel1 = new System.Windows.Forms.Panel();
            this.songinfo = new System.Windows.Forms.DataGridView();
            this.Songname = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.Artist = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.Price = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.Difficulty = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.DownloadFile = new System.Windows.Forms.DataGridViewButtonColumn();
            this.panel1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.songinfo)).BeginInit();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.Anchor = System.Windows.Forms.AnchorStyles.None;
            this.panel1.BackColor = System.Drawing.Color.Transparent;
            this.panel1.Controls.Add(this.songinfo);
            this.panel1.Location = new System.Drawing.Point(12, 12);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(710, 437);
            this.panel1.TabIndex = 0;
            // 
            // songinfo
            // 
            this.songinfo.AllowUserToAddRows = false;
            this.songinfo.AllowUserToDeleteRows = false;
            this.songinfo.AllowUserToOrderColumns = true;
            this.songinfo.AllowUserToResizeRows = false;
            this.songinfo.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.songinfo.BackgroundColor = System.Drawing.SystemColors.Control;
            this.songinfo.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
            this.songinfo.CellBorderStyle = System.Windows.Forms.DataGridViewCellBorderStyle.Raised;
            this.songinfo.ColumnHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.Single;
            this.songinfo.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.songinfo.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.Songname,
            this.Artist,
            this.Price,
            this.Difficulty,
            this.DownloadFile});
            this.songinfo.Dock = System.Windows.Forms.DockStyle.Top;
            this.songinfo.Location = new System.Drawing.Point(0, 0);
            this.songinfo.Name = "songinfo";
            this.songinfo.ReadOnly = true;
            this.songinfo.Size = new System.Drawing.Size(710, 434);
            this.songinfo.TabIndex = 0;
            this.songinfo.CellContentClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.songinfo_CellContentClick);
            // 
            // Songname
            // 
            this.Songname.HeaderText = "Name";
            this.Songname.Name = "Songname";
            this.Songname.ReadOnly = true;
            // 
            // Artist
            // 
            this.Artist.HeaderText = "Artist";
            this.Artist.Name = "Artist";
            this.Artist.ReadOnly = true;
            // 
            // Price
            // 
            this.Price.HeaderText = "Price";
            this.Price.Name = "Price";
            this.Price.ReadOnly = true;
            // 
            // Difficulty
            // 
            this.Difficulty.HeaderText = "Difficulty";
            this.Difficulty.Name = "Difficulty";
            this.Difficulty.ReadOnly = true;
            this.Difficulty.Resizable = System.Windows.Forms.DataGridViewTriState.True;
            // 
            // DownloadFile
            // 
            this.DownloadFile.HeaderText = "Download";
            this.DownloadFile.Name = "DownloadFile";
            this.DownloadFile.ReadOnly = true;
            this.DownloadFile.Resizable = System.Windows.Forms.DataGridViewTriState.True;
            this.DownloadFile.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.Automatic;
            // 
            // UserDownload
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.Control;
            this.BackgroundImage = global::LTP.Properties.Resources.piano;
            this.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.ClientSize = new System.Drawing.Size(734, 461);
            this.Controls.Add(this.panel1);
            this.Name = "UserDownload";
            this.Text = "User download";
            this.panel1.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.songinfo)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.DataGridView songinfo;
        private System.Windows.Forms.DataGridViewTextBoxColumn Songname;
        private System.Windows.Forms.DataGridViewTextBoxColumn Artist;
        private System.Windows.Forms.DataGridViewTextBoxColumn Price;
        private System.Windows.Forms.DataGridViewTextBoxColumn Difficulty;
        private System.Windows.Forms.DataGridViewButtonColumn DownloadFile;
    }
}