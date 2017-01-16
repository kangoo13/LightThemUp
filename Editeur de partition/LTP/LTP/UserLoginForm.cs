using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Windows.Forms;
using System.Json;

namespace LTP
{
    public partial class UserForm : Form
    {
        private HttpClient client;
        public string clientId { get; set; }
        public string name { get; set; }
        public string token { get; set; }

        public UserForm()
        {
            InitializeComponent();

            client = new HttpClient();
        }

        public void LogoutUser()
        {
            this.username.Text = "";
            this.password.Text = "";
            this.clientId = "";
            this.name = "";
            this.token = "";
        }

        private void confirm_Click(object sender, EventArgs e)
        {
            confirmation();
        }

        private async void confirmation()
        {
            if (this.username.Text == "" || this.password.Text == "")
            {
                MessageBox.Show("Please provide Email and Password");
                return;
            }
            else
            {
                try
                {
                    this.UseWaitCursor = true;
                    HttpContent content = new FormUrlEncodedContent(new[]
                    {
                        new KeyValuePair<string, string>("email", this.username.Text),
                        new KeyValuePair<string, string>("password", this.password.Text)
                    });
                    HttpResponseMessage response = await client.PostAsync(MainForm.eipUrl + "/users/authenticate", content);

                    response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                    string json = await response.Content.ReadAsStringAsync();
                    dynamic responseObj = JsonValue.Parse(json);
                    JsonObject result = responseObj as JsonObject;
                    this.UseWaitCursor = false;
                    if (response.IsSuccessStatusCode)
                    {
                        clientId = (string)result["id"];
                        token = (string)result["token"];
                        response = await client.GetAsync(MainForm.eipUrl + "/users/" + clientId);
                        if (response.IsSuccessStatusCode)
                        {
                            json = await response.Content.ReadAsStringAsync();
                            responseObj = JsonValue.Parse(json);
                            result = responseObj as JsonObject;
                            name = (string)result["name"];
                            MessageBox.Show("Login successful:" + name);
                            this.DialogResult = DialogResult.OK;
                            this.Close();
                        }
                        else
                        {
                            MessageBox.Show("Login fail");
                            this.DialogResult = DialogResult.No;
                            this.Close();
                        }
                    }
                    else
                    {
                        MessageBox.Show((string)result["message"]);
                        this.password.Text = "";
                    }
                }
                catch
                {
                    this.DialogResult = DialogResult.No;
                    MessageBox.Show("Unable to Join Network Failure");
                    this.Close();
                }
            }
        }
    }
}
