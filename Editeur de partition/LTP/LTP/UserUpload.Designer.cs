namespace LTP
{
    partial class UserUpload
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
            this.panel = new System.Windows.Forms.Panel();
            this.browse = new System.Windows.Forms.Button();
            this.picture = new System.Windows.Forms.TextBox();
            this.pictureLabel = new System.Windows.Forms.Label();
            this.difficulty = new System.Windows.Forms.TextBox();
            this.difficultyLabel = new System.Windows.Forms.Label();
            this.price = new System.Windows.Forms.TextBox();
            this.priceLabel = new System.Windows.Forms.Label();
            this.submitButton = new System.Windows.Forms.Button();
            this.autorname = new System.Windows.Forms.TextBox();
            this.autor = new System.Windows.Forms.Label();
            this.songname = new System.Windows.Forms.TextBox();
            this.songnameLabel = new System.Windows.Forms.Label();
            this.panel.SuspendLayout();
            this.SuspendLayout();
            // 
            // panel
            // 
            this.panel.BackgroundImage = global::LTP.Properties.Resources.piano;
            this.panel.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.panel.Controls.Add(this.browse);
            this.panel.Controls.Add(this.picture);
            this.panel.Controls.Add(this.pictureLabel);
            this.panel.Controls.Add(this.difficulty);
            this.panel.Controls.Add(this.difficultyLabel);
            this.panel.Controls.Add(this.price);
            this.panel.Controls.Add(this.priceLabel);
            this.panel.Controls.Add(this.submitButton);
            this.panel.Controls.Add(this.autorname);
            this.panel.Controls.Add(this.autor);
            this.panel.Controls.Add(this.songname);
            this.panel.Controls.Add(this.songnameLabel);
            this.panel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel.Location = new System.Drawing.Point(0, 0);
            this.panel.Name = "panel";
            this.panel.Size = new System.Drawing.Size(338, 420);
            this.panel.TabIndex = 0;
            // 
            // browse
            // 
            this.browse.Font = new System.Drawing.Font("Arial", 9F);
            this.browse.Location = new System.Drawing.Point(237, 280);
            this.browse.Name = "browse";
            this.browse.Size = new System.Drawing.Size(75, 24);
            this.browse.TabIndex = 10;
            this.browse.Text = "Browse ...";
            this.browse.UseVisualStyleBackColor = true;
            this.browse.Click += new System.EventHandler(this.browse_Click);
            // 
            // picture
            // 
            this.picture.Font = new System.Drawing.Font("Arial", 11F);
            this.picture.Location = new System.Drawing.Point(40, 280);
            this.picture.Name = "picture";
            this.picture.Size = new System.Drawing.Size(200, 24);
            this.picture.TabIndex = 9;
            // 
            // pictureLabel
            // 
            this.pictureLabel.AutoSize = true;
            this.pictureLabel.BackColor = System.Drawing.Color.Transparent;
            this.pictureLabel.Font = new System.Drawing.Font("Arial", 11F);
            this.pictureLabel.ForeColor = System.Drawing.Color.White;
            this.pictureLabel.Location = new System.Drawing.Point(40, 260);
            this.pictureLabel.Name = "pictureLabel";
            this.pictureLabel.Size = new System.Drawing.Size(76, 17);
            this.pictureLabel.TabIndex = 8;
            this.pictureLabel.Text = "Thumbnail";
            // 
            // difficulty
            // 
            this.difficulty.Font = new System.Drawing.Font("Arial", 11F);
            this.difficulty.Location = new System.Drawing.Point(40, 220);
            this.difficulty.Name = "difficulty";
            this.difficulty.Size = new System.Drawing.Size(200, 24);
            this.difficulty.TabIndex = 7;
            // 
            // difficultyLabel
            // 
            this.difficultyLabel.AutoSize = true;
            this.difficultyLabel.BackColor = System.Drawing.Color.Transparent;
            this.difficultyLabel.Font = new System.Drawing.Font("Arial", 11F);
            this.difficultyLabel.ForeColor = System.Drawing.Color.White;
            this.difficultyLabel.Location = new System.Drawing.Point(40, 200);
            this.difficultyLabel.Name = "difficultyLabel";
            this.difficultyLabel.Size = new System.Drawing.Size(63, 17);
            this.difficultyLabel.TabIndex = 6;
            this.difficultyLabel.Text = "Difficulty";
            // 
            // price
            // 
            this.price.Font = new System.Drawing.Font("Arial", 11F);
            this.price.Location = new System.Drawing.Point(40, 160);
            this.price.Name = "price";
            this.price.Size = new System.Drawing.Size(200, 24);
            this.price.TabIndex = 5;
            // 
            // priceLabel
            // 
            this.priceLabel.AutoSize = true;
            this.priceLabel.BackColor = System.Drawing.Color.Transparent;
            this.priceLabel.Font = new System.Drawing.Font("Arial", 11F);
            this.priceLabel.ForeColor = System.Drawing.Color.White;
            this.priceLabel.Location = new System.Drawing.Point(40, 140);
            this.priceLabel.Name = "priceLabel";
            this.priceLabel.Size = new System.Drawing.Size(42, 17);
            this.priceLabel.TabIndex = 4;
            this.priceLabel.Text = "Price";
            // 
            // submitButton
            // 
            this.submitButton.Font = new System.Drawing.Font("Arial", 14F);
            this.submitButton.Location = new System.Drawing.Point(110, 370);
            this.submitButton.Name = "submitButton";
            this.submitButton.Size = new System.Drawing.Size(120, 40);
            this.submitButton.TabIndex = 11;
            this.submitButton.Text = "Submit";
            this.submitButton.UseVisualStyleBackColor = true;
            this.submitButton.Click += new System.EventHandler(this.submit_Click);
            // 
            // autorname
            // 
            this.autorname.Font = new System.Drawing.Font("Arial", 11F);
            this.autorname.Location = new System.Drawing.Point(40, 100);
            this.autorname.Name = "autorname";
            this.autorname.Size = new System.Drawing.Size(200, 24);
            this.autorname.TabIndex = 3;
            // 
            // autor
            // 
            this.autor.AutoSize = true;
            this.autor.BackColor = System.Drawing.Color.Transparent;
            this.autor.Font = new System.Drawing.Font("Arial", 11F);
            this.autor.ForeColor = System.Drawing.Color.White;
            this.autor.Location = new System.Drawing.Point(40, 80);
            this.autor.Name = "autor";
            this.autor.Size = new System.Drawing.Size(41, 17);
            this.autor.TabIndex = 2;
            this.autor.Text = "Artist";
            // 
            // songname
            // 
            this.songname.Font = new System.Drawing.Font("Arial", 11F);
            this.songname.Location = new System.Drawing.Point(40, 40);
            this.songname.Name = "songname";
            this.songname.Size = new System.Drawing.Size(200, 24);
            this.songname.TabIndex = 1;
            // 
            // songnameLabel
            // 
            this.songnameLabel.AutoSize = true;
            this.songnameLabel.BackColor = System.Drawing.Color.Transparent;
            this.songnameLabel.Font = new System.Drawing.Font("Arial", 11F);
            this.songnameLabel.ForeColor = System.Drawing.Color.White;
            this.songnameLabel.Location = new System.Drawing.Point(40, 20);
            this.songnameLabel.Name = "songnameLabel";
            this.songnameLabel.Size = new System.Drawing.Size(83, 17);
            this.songnameLabel.TabIndex = 0;
            this.songnameLabel.Text = "Song name";
            // 
            // UserUpload
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(338, 420);
            this.Controls.Add(this.panel);
            this.Name = "UserUpload";
            this.Text = "Partition Upload";
            this.panel.ResumeLayout(false);
            this.panel.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panel;
        private System.Windows.Forms.Button submitButton;
        private System.Windows.Forms.TextBox autorname;
        private System.Windows.Forms.Label autor;
        private System.Windows.Forms.TextBox songname;
        private System.Windows.Forms.Label songnameLabel;
        private System.Windows.Forms.TextBox price;
        private System.Windows.Forms.Label priceLabel;
        private System.Windows.Forms.TextBox picture;
        private System.Windows.Forms.Label pictureLabel;
        private System.Windows.Forms.TextBox difficulty;
        private System.Windows.Forms.Label difficultyLabel;
        private System.Windows.Forms.Button browse;
    }
}