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
    public partial class PSAMRuler : UserControl
    {
        #region Public enumeration types

        public enum UnitsTypeEnum { Inches, Centimeters };
        public enum OrientationTypeEnum { LeftToRight, TopToBottom };

        #endregion

        #region Private fields

        private int dpi = 75;
        private float pointsPerUnit;
        private UnitsTypeEnum units = UnitsTypeEnum.Centimeters;
        private float proportion = 1.0f;
        private OrientationTypeEnum orientationType = OrientationTypeEnum.LeftToRight;

        #endregion

        #region Properties

        [Category("Ruler properties")]
        [Description("Resolution in dots per inch (dpi).")]
        public int Dpi { get { return dpi; } set { dpi = value; CalculatePointsPerUnit(); } }
        [Category("Ruler properties")]
        [Description("Scale ratio of the ruler.")]
        public float Proportion { get { return proportion; } set { proportion = value; CalculatePointsPerUnit(); } }

        [Category("Ruler properties")]
        [Description("Determines if the control is displayed left to right or top to bottom")]
        public OrientationTypeEnum OrientationType { get { return orientationType; } set { orientationType = value; } }

        [Category("Ruler properties")]
        [Description("Measurement units: centimetres or inches.")]
        public UnitsTypeEnum Units { get { return units; } set { units = value; } }

        #endregion

        #region Constructor

        public PSAMRuler()
        {
            InitializeComponent();
        }

        #endregion

        #region Private methods

        private void CalculatePointsPerUnit()
        {
            float dpu = 300.0f;
            if (units == UnitsTypeEnum.Inches) dpu = dpi;
            else if (units == UnitsTypeEnum.Centimeters) dpu = (float)dpi / 2.54f;
            pointsPerUnit = dpu * proportion;

        }

        #endregion

        #region Overridden methods

        protected override void OnPaint(PaintEventArgs e)
        {
            base.OnPaint(e);
            Graphics g = e.Graphics;

            CalculatePointsPerUnit();

            float dist = 0;
            int length = 0;
            if (orientationType == OrientationTypeEnum.LeftToRight) length = Width;
            else if (orientationType == OrientationTypeEnum.TopToBottom) length = Height;

            bool smallLine = false;

            Pen p = new Pen(Color.Black);
            int valueInUnits = 0;
            Font f = new Font(FontFamily.GenericSansSerif, 7.0f);
            Brush b = new SolidBrush(Color.Black);
            while (dist < length)
            {
                if (orientationType == OrientationTypeEnum.LeftToRight)
                {
                    if (smallLine)
                        g.DrawLine(p, new PointF(dist, this.Height), new PointF(dist, this.Height * 0.75f + 1));
                    else
                    {
                        g.DrawLine(p, new PointF(dist, this.Height), new PointF(dist, this.Height * 0.5f + 1));
                        if ((valueInUnits != 0) && Convert.ToString(valueInUnits).Length >= 2)
                            g.DrawString(Convert.ToString(valueInUnits), f, b,
                                new PointF(dist - (pointsPerUnit / 4.0f) , 0));
                        else if ((valueInUnits != 0) && Convert.ToString(valueInUnits).Length < 2)
                            g.DrawString(Convert.ToString(valueInUnits), f, b,
                                new PointF(dist - (pointsPerUnit / 4.0f) + 4, 0));
                    }
                }
                else if (orientationType == OrientationTypeEnum.TopToBottom)
                {
                    if (smallLine)
                        g.DrawLine(p, new PointF(this.Width, dist), new PointF(this.Width * 0.75f + 1, dist));
                    else
                    {
                        g.DrawLine(p, new PointF(this.Width, dist), new PointF(this.Width * 0.5f + 1, dist));
                        if ((valueInUnits != 0) && Convert.ToString(valueInUnits).Length >= 2)
                            g.DrawString(Convert.ToString(valueInUnits), f, b, 
                                new PointF(0, dist - (pointsPerUnit / 4.0f)));
                        else if ((valueInUnits != 0) && Convert.ToString(valueInUnits).Length < 2)
                            g.DrawString(Convert.ToString(valueInUnits), f, b,
                                 new PointF(0, dist - (pointsPerUnit / 4.0f) + 4));
                    }
                }

                if (!smallLine) valueInUnits++;
                dist += (pointsPerUnit / 2.0f);
                smallLine = !smallLine;

                if (dist > 2048) return;
                
            }
        }

        #endregion
    }




}
