using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EyeGui.Models
{
    public partial class Keyboard
    {

        public HashSet<KeyButton> Keys = new HashSet<KeyButton>()
        {
            ////First Row
            new KeyButton().OtherKey("`", "~", 0),
            new KeyButton().NumberKey("1", "!", 0),
            new KeyButton().NumberKey("2", "@", 0),
            new KeyButton().NumberKey("3", "#", 0),
            new KeyButton().NumberKey("4", "$", 0),
            new KeyButton().NumberKey("5", "%", 0),
            new KeyButton().NumberKey("6", "^", 0),
            new KeyButton().NumberKey("7", "&", 0),
            new KeyButton().NumberKey("8", "*", 0),
            new KeyButton().NumberKey("9", "(", 0),
            new KeyButton().NumberKey("0", ")", 0),
            new KeyButton().OtherKey("-", "_", 0),
            new KeyButton().OtherKey("=", "+", 0),
            new KeyButton().FunctionKey("<- Backspace",2,0),
            ////Secend Row
            new KeyButton().FunctionKey("Tab",2,1),
            new KeyButton().LetterKey("q",1),
            new KeyButton().LetterKey("w",1),
            new KeyButton().LetterKey("e",1),
            new KeyButton().LetterKey("r",1),
            new KeyButton().LetterKey("t",1),
            new KeyButton().LetterKey("y",1),
            new KeyButton().LetterKey("u",1),
            new KeyButton().LetterKey("i",1),
            new KeyButton().LetterKey("o",1),
            new KeyButton().LetterKey("p",1),
            new KeyButton().OtherKey("[","{",1),
            new KeyButton().OtherKey("]","}",1),
            new KeyButton().OtherKey("\\","|",1),
            ////Thrid Row
            new KeyButton().FunctionKey("Caps Lock",2,2),
            new KeyButton().LetterKey("a",2),
            new KeyButton().LetterKey("s",2),
            new KeyButton().LetterKey("d",2),
            new KeyButton().LetterKey("f",2),
            new KeyButton().LetterKey("g",2),
            new KeyButton().LetterKey("h",2),
            new KeyButton().LetterKey("j",2),
            new KeyButton().LetterKey("k",2),
            new KeyButton().LetterKey("l",2),
            new KeyButton().OtherKey(";",":",2),
            new KeyButton().OtherKey("'",'"'+"",2),
            new KeyButton().FunctionKey("Enter",2,2),
            ////Fourth Row
            new KeyButton().FunctionKey("Shift",2,3),
            new KeyButton().LetterKey("z",3),
            new KeyButton().LetterKey("x",3),
            new KeyButton().LetterKey("c",3),
            new KeyButton().LetterKey("v",3),
            new KeyButton().LetterKey("b",3),
            new KeyButton().LetterKey("n",3),
            new KeyButton().LetterKey("m",3),
            new KeyButton().OtherKey(",","<",3),
            new KeyButton().OtherKey(".",">",3),
            new KeyButton().OtherKey("/","?",3),
            new KeyButton().FunctionKey("<>",1,3),
            new KeyButton().FunctionKey("arrow_up",0,3),
            new KeyButton().FunctionKey("<>",1,3),
            ////Fift Row
            new KeyButton().FunctionKey("Ctrl",2,4),
            new KeyButton().FunctionKey("Alt",2,4),
            new KeyButton().FunctionKey("Space",4,4),
            new KeyButton().FunctionKey("Alt",2,4),
            new KeyButton().FunctionKey("Ctrl",2,4),
            new KeyButton().FunctionKey("arrow_left",0,4),
            new KeyButton().FunctionKey("arrow_down",0,4),
            new KeyButton().FunctionKey("arrow_right",0,4)        
        };



    }
}