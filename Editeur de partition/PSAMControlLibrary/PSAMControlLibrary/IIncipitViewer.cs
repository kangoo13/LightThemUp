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
using System.Text;
using System.ComponentModel;
using System.Xml;

namespace PSAMControlLibrary
{
    public interface IIncipitViewer
    {
        [Category("Incipit viewer properties")]
        [Description("InnerXml of the MusicXml incipit which is loaded into the control.")]
        string XmlIncipitString { get; }
        string ShortIncipit { get; set; }
        [Category("Incipit viewer properties")]
        [Description("Database ID of currently displayed incipit.")]
        int IncipitID { get; set; }
        [Category("Incipit viewer properties")]
        [Description("If true the selection box is displayed over the control.")]
        bool IsSelected { get; set; }
        [Category("Incipit viewer properties")]
        [Description("If true staff and musical symbols are not drawn. Only buttons and selection box is drawn.")]
        bool DrawOnlySelectionAndButtons { get; set; }
        [Category("Incipit viewer properties")]
        [Description("If true the control will be drawn on its container's surface to avoid clipping. Parent control must be created without WS_CLIPCHILDREN parameter.")]
        bool DrawOnParentControl { get; set; }
        int CountIncipitElements { get; }
        XmlDocument XmlIncipit { get; }

        MusicalSymbol IncipitElement(int i);
        void LoadFromXmlFile(string fileName);
        void LoadFromXmlString(string xml);
        void AddMusicalSymbol(MusicalSymbol symbol);
        void RemoveLastMusicalSymbol();
        void ClearMusicalIncipit();
        int CountMusicalSymbols();
        Clef GetCurrentClef();

    }
}
