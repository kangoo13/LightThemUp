using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Threading;

namespace LTP
{
    public partial class LoadingForm : Form
    {
        public LoadingForm()
        {
            InitializeComponent();
        }
    }

    public class ThreadingLoading
    {
        private volatile bool _shouldStop = false;

        public void DoWork(object pos)
        {
            LoadingForm loadWindow = new LoadingForm();
            loadWindow.StartPosition = FormStartPosition.Manual;
            loadWindow.Location = new Point(((Point)pos).X - loadWindow.Size.Width / 2, ((Point)pos).Y - loadWindow.Size.Height / 2);
            loadWindow.Show(); // ShowDialog = Créer un thread pour le dialogue et pause le thread principal = caca

            while (!_shouldStop)
                Thread.Sleep(100);

            loadWindow.Close();
            return;
        }

        public void RequestStop()
        {
            _shouldStop = true;
        }
    }
}
