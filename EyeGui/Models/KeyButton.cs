using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EyeGui.Models
{
    public class KeyButton
    {
        #region Display Section
        public string FirstDisplayed { get; set; }

        public string SecendDisplayed { get; set; }

        public bool DoubleDisplay { get; set; }
        #endregion

        #region Type of Button
        public bool FunctionButton { get; set; }

        public bool Letter { get; set; }

        public bool Number { get; set; }

        public bool Other { get; set; }
        #endregion

        #region Place and size
        public int Row { get; set; }

        public int ColSpam { get; set; }
        #endregion

        public KeyButton()
        {

        }
        public KeyButton(string firstD, string secendD, bool doubleD, bool fun,bool letter, bool nr, bool other, int row, int colspam)
        {
            this.FirstDisplayed = firstD;
            this.SecendDisplayed = secendD;
            this.DoubleDisplay = doubleD;
            this.FunctionButton = fun;
            this.Letter = letter;
            this.Number = nr;
            this.Other = other;
            this.Row = row;
            this.ColSpam = colspam;
        }
     
        public KeyButton FunctionKey(string firstD, int colspam, int row)
        {
            return new KeyButton(firstD, string.Empty, false, true, false, false, false, row, colspam);
        }

        public KeyButton NumberKey(string firstD, string secendD, int row)
        {
            return new KeyButton(firstD, secendD, true, false, false, true, false, row, 0);
        }

        public KeyButton LetterKey(string firstD, int row)
        {
            return new KeyButton(firstD, firstD.ToUpper(), false, false, true, false, false, row, 0);
        }

        public KeyButton OtherKey(string firstD, string secendD, int row)
        {
            return new KeyButton(firstD, secendD, true, false, false, false, true, row, 0);
        }
    }
}