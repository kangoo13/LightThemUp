using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Json;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace LTP
{
    public partial class UserDownload : Form
    {
        private dynamic songs;
        private HttpClient client;
        public string filename { get; set; }
        public dynamic song { get; set; }

        public UserDownload()
        {
            InitializeComponent();

            client = new HttpClient();
            getDataForGrid();
        }

        private async void getDataForGrid()
        {
            HttpResponseMessage response = await client.GetAsync(MainForm.eipUrl + "/songs");
            if (response.IsSuccessStatusCode)
            {
                string json = await response.Content.ReadAsStringAsync();
                dynamic responseObj = JsonValue.Parse(json);
                songs = responseObj;
                foreach (JsonObject song in responseObj)
                {
                    songinfo.Rows.Add(song["name"], song["artist"], song["price"], song["difficulty"], "Download");
                }
            }
        }

        private void songinfo_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            if (e.ColumnIndex == songinfo.Columns["DownloadFile"].Index && e.RowIndex >= 0)
            {
                filename = songs[e.RowIndex]["name"];
                song = songs[e.RowIndex];
                this.DialogResult = DialogResult.OK;
                this.Close();
            }
        }
    }
}
