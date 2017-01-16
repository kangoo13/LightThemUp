using System;
using LTP;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Drawing;

namespace LTPTests
{
    [TestClass]
    public class MainFormTest
    {
        private MainForm mainform = new MainForm();

        [TestMethod]
        public void CheckTest()
        {
            Assert.AreEqual(1, 1);
        }
    }
}
