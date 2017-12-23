using CommonWeb.Html;
using CommonWeb.Html.Bootstrap;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

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
            foreach (var key in Keys)
            {
                if (key.Row != row_nr)
                {
                    row_nr++;
                    Rows.Add(new TBodyField.TRField());
                }
                var facility = new TBodyField.TRField.TDField();
                var button = new ButtonField();
                button.AddClass("btn");

                if (key.FunctionButton)
                {
                    button.AddAttr("data-display-first", key.FirstDisplayed);
                    button.AddAttr("data-function", "true");
                    button.AddAttr("data-function-type", key.FirstDisplayed);
                }
                if (key.Letter)
                {
                    button.AddAttr("data-display-first", key.FirstDisplayed);
                    button.AddAttr("data-display-secend", key.SecendDisplayed);
                    button.AddAttr("data-letter", "true");
                }
                if (key.Number)
                {
                    button.AddAttr("data-display-first", key.FirstDisplayed);
                    button.AddAttr("data-display-secend", key.SecendDisplayed);
                    button.AddAttr("data-numbert", "true");

                }
                if (key.Other)
                {
                    button.AddAttr("data-display-first", key.FirstDisplayed);
                    button.AddAttr("data-display-secend", key.SecendDisplayed);
                    button.AddAttr("data-other", "true");
                }
               
                Rows[row_nr].AddInnerField(facility);
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