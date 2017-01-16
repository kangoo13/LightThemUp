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
using System.Drawing;
using System.Data;
using System.Text;
using System.Windows.Forms;

namespace PSAMControlLibrary
{
    public partial class PSAMChart : UserControl
    {
        #region Protected fields

        protected List<double> samples = new List<double>();
        protected double maxYValue = 100;
        protected double maxXValue = 100;
        protected bool centerXAxis = true;
        protected bool isBeingDrawn = false;

        #endregion

        #region Properties

        public bool IsBeingDrawn { get { return isBeingDrawn; } }

        [Category("Chart properties")]
        [Description("Maximum Y value")]
        public double MaxYValue { get { return maxYValue; } set { maxYValue = value; } }

        [Category("Chart properties")]
        [Description("Maximum X value")]
        public double MaxXValue { get { return maxXValue; } set { maxXValue = value; } }

        [Category("Chart properties")]
        [Description("Center X Axis")]
        public bool CenterXAxis { get { return centerXAxis; } set { centerXAxis = value; } }

        public List<double> Samples { get { return samples; } set { samples = value; } }

        #endregion

        #region Constructor

        public PSAMChart()
        {
            InitializeComponent();
        }

        #endregion

        #region Overridden methods

        protected override void OnPaint(PaintEventArgs e)
        {
            base.OnPaint(e);
        }

        #endregion

        #region Public methods

        public void DrawSamples ()
        {
            this.Refresh();

            if (samples == null) return;
            if (samples.Count < 1) return;

            isBeingDrawn = true;

            Graphics g = this.CreateGraphics();

            float OY;
            if (centerXAxis)
                OY = this.Height / 2;
            else
                OY = this.Height;
            long countSamples = samples.Count;
            int pointsPerPixel = (int)(countSamples / this.Width);
            if (pointsPerPixel == 0) { isBeingDrawn = false;  return; }

            long j = -1;
            int i = 0;
            PointF lastPoint = new PointF(0, OY);
            foreach (double s in samples)
            {
                j++;
                if ((j % pointsPerPixel) != 0) continue;
                double normalizedSampleValue = (s * (Height / 2)) / maxYValue;
                PointF currentPoint = new PointF(i, OY - (float)normalizedSampleValue);
                using (Pen p = new Pen(Color.Black))
                {
                    try
                    {
                        g.DrawLine(p, lastPoint, currentPoint);
                    }
                    catch
                    {
                        i++;
                        continue;
                    }
                }
                lastPoint = currentPoint;
                i++;
            }
            isBeingDrawn = false;
        }

        public void AddSample(double sample)
        {
            samples.Add(sample);
        }
        public void Clear()
        {
            samples.Clear();
        }

        #endregion

    }
}
