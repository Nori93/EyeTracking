using CommonWeb.Html;
using System.Collections.Generic;

namespace EyeGui.Models
{
    public partial class Keyboard : TableField
    {
        public List<TableField.TBodyField.TRField> Rows; 

        public Keyboard() 
            :base()
        {
            //Table Head
            var thead = new THeadField();
            this.AddInnerField(thead);
            var head = new THeadField.TRField();
            head.AddAttr("align", "center");
            var title = new THeadField.TRField.THField();
            var div = new DivField();
            div.AddStyle("width:100%; height:100%;");
            title.AddInnerField(div);
            thead.AddInnerField(title);
            title.AddId("Keyboard-Troggle");
            title.AddAttr("colspan", "15");

            //Table body
            var tbody = new TBodyField();
            tbody.AddId("Keyboard-Body");
            this.AddInnerField(tbody);
            this.AddStyle("table-layout: fixed;");

            Rows = new List<TBodyField.TRField>();
            int row_nr = 0;
            var tr = new TBodyField.TRField();
            foreach (var key in Keys)
            {
                if (key.Row != row_nr)
                {
                    row_nr++;
                    Rows.Add(tr);
                    tr = new TBodyField.TRField();
                }
                var td = new TBodyField.TRField.TDField();
                var button = new ButtonField();
                button.AddClass("btn");
                button.AddId("id_"+key.FirstDisplayed);

                if (key.FunctionButton)
                {
                    button.AddAttr("data-display-first", key.FirstDisplayed);
                    button.AddAttr("data-function", "true");
                    button.AddAttr("data-function-type", key.FirstDisplayed);
                    td.AddAttr("colspan", key.ColSpam.ToString());
                }
                if (key.Letter)
                {
                    button.AddAttr("data-display-first", key.FirstDisplayed);
                    button.AddAttr("data-display-secend", key.SecendDisplayed);
                    button.AddAttr("data-letter", "true");
                    button.AddAttr("data-key-value", key.FirstDisplayed);
                    button.AddAttr("data-double-display", "true");
                    button.AddAttr("data-double-value", "true");
                }
                if (key.Number)
                {
                    button.AddAttr("data-display-first", key.FirstDisplayed);
                    button.AddAttr("data-display-secend", key.SecendDisplayed);
                    button.AddAttr("data-number", "true");
                    button.AddAttr("data-key-value", key.FirstDisplayed);
                    button.AddAttr("data-double-display", "true");
                    button.AddAttr("data-double-value", "true");
                }
                if (key.Other)
                {
                    button.AddAttr("data-display-first", key.FirstDisplayed);
                    button.AddAttr("data-display-secend", key.SecendDisplayed);
                    button.AddAttr("data-other", "true");
                    button.AddAttr("data-other-type", key.FirstDisplayed);
                    button.AddAttr("data-key-value", key.FirstDisplayed);
                    button.AddAttr("data-double-display", "true");
                    button.AddAttr("data-double-value", "true");
                }
                button.AddStyle("width: 100%; height: 100%;");
                button.AddInnerField(key.FirstDisplayed);
                td.AddInnerField(button);
                tr.AddInnerField(td);
                Rows.Add(tr);
            }

            foreach (var row in Rows)
            {
                tbody.AddInnerField(row);
            }
        }

        //public Keyboard()
        //    :base()
        //{
        //    var thead = new THeadField();
        //    this.AddInnerField(thead);
        //    var head = new THeadField.TRField();
        //    head.AddAttr("align", "center");
        //    var title = new THeadField.TRField.THField();
        //    thead.AddInnerField(title);
        //    title.AddId("Keyboard-Troggle");
        //    title.AddAttr("colspan","15");


        //    var tbody = new TBodyField();
        //    tbody.AddId("Keyboard-Body");
        //    this.AddInnerField(tbody);
        //    this.AddStyle("table-layout: fixed;");

        //    var row = new TBodyField.TRField();
        //    row.AddAttr("align", "center");
        //    int r = 0;
        //    foreach (var k in Keys)
        //    {
        //        if (r != k.Row) { r++; }
        //    }
        //    tbody.AddInnerField(firstrow);

        //    var secendrow = new TBodyField.TRField();
        //    secendrow.AddAttr("align", "center");
        //    foreach (var r2 in SecendRow)
        //    {
        //        if (r2 != "")
        //        {
        //            var r = new TBodyField.TRField.TDField().AddId("keyboard" + r2).AddInnerField(
        //            new BButtonField(r2)
        //            .AddId("button_" + r2)
        //            .AddStyle("width: 100%; height: 100%")
        //            .AddDataAttribute("keyboard", "keys")
        //            .AddDataAttribute("keyboard-value", r2));
        //            if (r2 == "Tab") { r.AddAttr("colspan", "2"); }
        //            secendrow.AddInnerField(r);
        //        }
        //        else
        //        {
        //            secendrow.AddInnerField(new TBodyField.TRField.TDField());
        //        }
        //    }
        //    tbody.AddInnerField(secendrow);



        //}


    }
}