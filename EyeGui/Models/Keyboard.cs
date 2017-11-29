using CommonWeb.Html;
using CommonWeb.Html.Bootstrap;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EyeGui.Models
{
    public class Keyboard : TableField
    {
        public string[] FirstRow =
            new string[] { "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "<- Backspace" };
        public string[] SecendRow =
            new string[] { "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\" };
        public string[] ThridRow =
            new string[] { "Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter" };
        public string[] FourthRow =
            new string[] { "Shift", "Z", "X", "C", "V", "B", "N","M",",",".","/","","^" ,""};
        public string[] FifthRow =
            new string[] { "Ctrl", "Alr", "Space", "Alt", "Ctrl", "<-", "v", "->" };
        public Keyboard()
            :base()
        {
            var thead = new THeadField();
            this.AddInnerField(thead);
            var head = new THeadField.TRField();
            head.AddAttr("align", "center");
            var title = new THeadField.TRField.THField();
            thead.AddInnerField(title);
            title.AddId("Keyboard-Troggle");
            title.AddAttr("colspan","15");
            

            var tbody = new TBodyField();
            tbody.AddId("Keyboard-Body");
            this.AddInnerField(tbody);
            this.AddStyle("table-layout: fixed;");

            var firstrow = new TBodyField.TRField();
            firstrow.AddAttr("align", "center");
            foreach (var r1 in FirstRow)
            {
                if (r1 != "")
                {
                    var r = new TBodyField.TRField.TDField().AddId("keyboard" + r1).AddInnerField(
                        new BButtonField(r1)
                        .AddId("button_" + r1)
                        .AddStyle("width: 100%; height: 100%")
                        .AddDataAttribute("keyboard", "keys")
                        .AddDataAttribute("keyboard-value", r1));
                    if (r1 == "<- Backspace") { r.AddAttr("colspan", "2"); }
                    firstrow.AddInnerField(r);
                }
                else
                {
                    firstrow.AddInnerField(new TBodyField.TRField.TDField());
                }
            }
            tbody.AddInnerField(firstrow);

            var secendrow = new TBodyField.TRField();
            secendrow.AddAttr("align", "center");
            foreach (var r2 in SecendRow)
            {
                if (r2 != "")
                {
                    var r = new TBodyField.TRField.TDField().AddId("keyboard" + r2).AddInnerField(
                    new BButtonField(r2)
                    .AddId("button_" + r2)
                    .AddStyle("width: 100%; height: 100%")
                    .AddDataAttribute("keyboard", "keys")
                    .AddDataAttribute("keyboard-value", r2));
                    if (r2 == "Tab") { r.AddAttr("colspan", "2"); }
                    secendrow.AddInnerField(r);
                }
                else
                {
                    secendrow.AddInnerField(new TBodyField.TRField.TDField());
                }
            }
            tbody.AddInnerField(secendrow);

            var thridrow = new TBodyField.TRField();
            thridrow.AddAttr("align", "center"); 
            foreach (var r3 in ThridRow)
            {
                if(r3 != "")
                {
                    var r = new TBodyField.TRField.TDField().AddId("keyboard" + r3).AddInnerField(
                    new BButtonField(r3)
                    .AddId("button_" + r3)
                    .AddStyle("width: 100%; height: 100%")
                    .AddDataAttribute("keyboard", "keys")
                    .AddDataAttribute("keyboard-value", r3));
                    if (r3 == "Caps Lock") { r.AddAttr("colspan", "2"); }
                    if (r3 == "Enter") { r.AddAttr("colspan", "2"); }
                    thridrow.AddInnerField(r);
                }
                else
                {
                    thridrow.AddInnerField(new TBodyField.TRField.TDField());
                }
            }
            tbody.AddInnerField(thridrow);

            var fourthrow = new TBodyField.TRField();
            fourthrow.AddAttr("align", "center");
            foreach (var r4 in FourthRow)
            {
                if (r4 != "")
                {
                    var r = new TBodyField.TRField.TDField().AddId("keyboard" + r4).AddInnerField(
                    new BButtonField(r4)
                    .AddId("button_" + r4)
                    .AddStyle("width: 100%; height: 100%")
                    .AddDataAttribute("keyboard", "keys")
                    .AddDataAttribute("keyboard-value", r4));
                    if (r4 == "Shift") { r.AddAttr("colspan", "2"); }
                    fourthrow.AddInnerField(r);
                }
                else
                {
                    fourthrow.AddInnerField(new TBodyField.TRField.TDField());
                }
            }               
            tbody.AddInnerField(fourthrow);

            var fifthrow = new TBodyField.TRField();
            fifthrow.AddAttr("align", "center");
            foreach (var r5 in FifthRow)
            {
                if (r5 != "")
                {
                    var r = new TBodyField.TRField.TDField().AddId("keyboard" + r5).AddInnerField(
                    new BButtonField(r5)
                    .AddId("button_" + r5)
                    .AddStyle("width: 100%; height: 100%")
                    .AddDataAttribute("keyboard", "keys")
                    .AddDataAttribute("keyboard-value", r5));
                    if (r5 == "Ctrl") { r.AddAttr("colspan", "2"); }
                    if (r5 == "Alr") { r.AddAttr("colspan", "2"); }
                    if (r5 == "Space") { r.AddAttr("colspan", "5"); }
                    fifthrow.AddInnerField(r);
                }
                else
                {
                    fourthrow.AddInnerField(new TBodyField.TRField.TDField());
                }
            }
            tbody.AddInnerField(fifthrow);

        }


    }
}