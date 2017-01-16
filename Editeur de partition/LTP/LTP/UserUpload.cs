using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace LTP
{
    public partial class UserUpload : Form
    {
        public string filename { get; set; }
        public string artist { get; set; }
        public string picturePath { get; set; }
        public string priceValue { get; set; }
        public string difficultyValue { get; set; }

        public UserUpload()
        {
            InitializeComponent();
        }

        private void submit_Click(object sender, EventArgs e)
        {
            if (songname.Text.Length == 0 || autorname.Text.Length == 0
                || difficulty.Text.Length == 0
                || picture.Text.Length == 0)
            {
                MessageBox.Show("Information incomplete.");
                return;
            }
            filename = songname.Text;
            artist = autorname.Text;
            if (price.Text.Length != 0)
                priceValue = price.Text;
            else
                priceValue = "0";
            int intDifficulty = -1;
            bool testParse = Int32.TryParse(difficulty.Text, out intDifficulty);
            if (testParse && intDifficulty >= 0 && intDifficulty <= 5)
                difficultyValue = difficulty.Text;
            else
            {
                MessageBox.Show("Difficulty is not valid: choose between 1 and 5");
                return;
            }
            picturePath = picture.Text;
            this.DialogResult = DialogResult.OK;
            this.Close();
        }

        private void browse_Click(object sender, EventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.Filter = "Image files (*.jpg, *.jpeg, *.jpe, *.jfif, *.png) | *.jpg; *.jpeg; *.jpe; *.jfif; *.png";
            if (openFileDialog.ShowDialog() == System.Windows.Forms.DialogResult.OK)
            {
                picture.Text = openFileDialog.FileName;
            }
        }
    }
}
