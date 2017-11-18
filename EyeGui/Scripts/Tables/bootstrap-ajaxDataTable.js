/*! ========================================================================
 * Bootstrap AjaxDT: bootstrap-ajax.js v1.0.0
 * http://www.bootstrapAjax.com
 * ========================================================================
 * Copyright 2016 Grzegorz Cebulak, grzegorz.cebulak@gmail.com
 * Licensed under MIT
 * ======================================================================== */


+function ($) {
    'use strict';

    // AjaxDT PUBLIC CLASS DEFINITION
    // ==============================

    var AjaxDT = function (element, options) {
        this.$table = $(element)
        //this.$table  = this.$div.find('table')
        this.options = $.extend({}, this.defaults(), options)
		
        //this.ajaxOptions = {
        //    url: this.options.url,
        //    method: this.options.method,
        //    contentType: this.options.contentType,
        //    data: this.options.data,
        //}
        //this.render()
    }

    AjaxDT.VERSION  = '1.0.0'

    AjaxDT.DEFAULTS = {
        //processing: null,

    }

    AjaxDT.prototype.defaults = function() {
        return {
            //ajax: this.$table.attr('data-ajax') || AjaxDT.DEFAULTS.ajax,
        }
    }

    AjaxDT.prototype._ConstructTable=function () {
        //var $table = $('<table id="table_' + this.tableId + '" class="table table-bordered table-striped table-hover" />');

        this.$table.find('thead').remove();
        this.$table.find('tbody').remove();
        this.$table.find('tfoot').remove();

        this.$table.append('<thead><tr/></thead>');
        this.$table.append('<tfoot><tr/></tfoot>');
        var $th = this.$table.find('thead').find('tr');
        var $tf = this.$table.find('tfoot').find('tr');
        this.$table.append('<tbody/>');
        for (var i = 0; i < this.$table.data('columns').length; i++) {
            $th.append('<th  class="text-center"/>');
            $tf.append('<th  class="text-center"/>');
        }
    }

    //function _FormatDate(format,d) {
    //    switch (format) {
    //        case 'ISO':
    //            return d.toISOString();
    //        case 'ISODate':
    //            return d.toISOString().substring(0,10);
    //        case 'ISODateTimeHHMMSS':
    //            return d.toISOString().replace('T',' ').substring(0,19);
    //        case 'ISODateTimeHHMM':
    //            return d.toISOString().replace('T',' ').substring(0,16);
    //        case 'UTC':
    //            return d.toUTCString();
    //        case 'JSON':
    //            return d.toJSON();
    //        case 'FullDate':
    //            return d.toDateString();
    //        case 'FullTime':
    //            return d.toTimeString();
    //        case 'TimeHHMMSS':
    //            return d.toTimeString().substring(0,8);
    //        case 'TimeHHMM':
    //            return d.toTimeString().substring(0,5);
    //        default:
    //            return d.toISOString();
    //    }
    //}

    function _GetHtmlAttributes(ats) {
        var at = [];
        $.each(ats, function (j, a) {
            at[j] = a.name + '=\"' + a.value.replace(/"/g, '&quot;') + "\"";
        })
        return at;
    }

    AjaxDT.prototype._AddRenderCol = function (cols) {
        $.each(cols, function (i, c) {
            if (c.visible) {
                var att = _GetHtmlAttributes(c.htmlAttributes).join(' ');
                switch (c.type) {
                    case 'button':
                        var btns = [];
                        //$.each(c.buttons, function (j, b) {
                        //    btns[j] = '<' + b.htmlTag + ' ' + _GetHtmlAttributes(b.htmlAttributes).join(' ') + '>';
                        //    btns[j] = btns[j] + b.innerHtml + '</' + b.htmlTag + '>';
                        //})
                        //var bts = '<div class="no-wrap" style="display:inline;">' + btns.join(' ') + '</div>'

                        c.render = function (data, type, row, meta) {
                            return '<div style="display:flex;">' + c.buttons.join(' ').replace(/{data}/g, data) + '</div>';
                        }
                        break;
                    case 'checkbox':
                        c.render = function (data, type, row, meta) {
                            var ch='';
                            if (data) ch=' checked="checked"';
                            return '<div class="text-center"><input '+att+ch +' /></div>';
                        }
                        break;
                    //case 'datetime':
                    //    c.render = function (data, type, row, meta) {
                    //        var t = data;
                    //        if (data != null && data.match(/^\/Date\((\d+)(?:-(\d+))?\)\/$/g)){
                    //            var d = new Date(parseInt(data.substr(6)));
                    //            if (d != null && d.getMonth)
                    //                t = _FormatDate(c.dataTimeFormat, d);
                    //        }
                    //        return '<div ' + att + ' >'+t+'</div>';
                    //    }
                    //    break;


                    default:
                        c.render = function (data, type, row, meta) {
                            return '<div '+att+'>'+data+'</div>';
                        }
                }
            }
        });

    }

	AjaxDT.prototype.ajaxTable = function () {

	    this._ConstructTable();
	    var t = this.$table;
	    var cols = t.data('columns');
	    this._AddRenderCol(cols);
	    t.data('columns', cols);
	    var disableColumnSearching=t.data('disableColumnSearching');

	            var table = t.DataTable({
	                "language": TableLanguage(),
	                "jQueryUI": false,
	                "serverSide": true,
	                //"processing": true,
                    //"select": true,
	                //"columns": cols,
	                "order": [],
	                //"searchCols": filters,
	                "dom": "l<'row'<'pull-right'B>>rtip",//'T<l<t>ip>',
	                //buttons: [
                    //    'copy', 'csv', 'excel', 'pdf','print'
	                //],
	                "initComplete": function () {
	                    if (!disableColumnSearching) {
	                        var j = 1;
	                        $.each(cols, function (i, c) {
	                            if ((c.visible) && (c.searchable)) {
	                                if (c.columnType == 'DTCheckBoxColumn')
	                                    t.find('tfoot th:nth-child(' + j + ')')
                                            .html('<input type="checkbox" data-toggle="toggle" />');
	                                else
	                                    t.find('tfoot th:nth-child(' + j + ')')
                                            .html('<input type="text" class="form-control" style="width: 100%;" placeholder="Szukaj" />');
	                                j++;
	                            }
	                            else if (c.visible)
	                                j++;
	                        });

	                        var r = t.find('tfoot tr');
	                        r.find('th').each(function () {
	                            $(this).css('padding', 4);
	                        });
	                        t.find('thead').append(r);

	                        // Apply the search
	                        table.columns().eq(0).each(function (i) {
	                            $('input', table.column(i).footer())
                                    .bindWithDelay('keyup', function () {
                                        table
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                    }, 2000);
	                        });

	                    }

	                },
	            });

	            //if (buttonId != '') //zrobioü dodanie ajax eventu w c#??
	            //    $('#' + buttonId).click(function (e) {
	            //        table.ajax.reload();
	            //    });

	            table.on('draw', function () {
	                //t.find('tbody td [data-toggle="toggle"]').bootstrapToggle();
	                //t.find('tbody td [data-toggle="toggle"]').show();
	                //t.find('[data-ajax^=ajax]').bootstrapAjax();
	            });

	            //table.on( 'click', 'tr', function () {
	            //    $(this).toggleClass('active');
	            //} );
	        //});
	}

	// AjaxDT PLUGIN DEFINITION
	// ========================

	function Plugin(option) {
		return this.each(function () {
			var $this   = $(this)
			var data    = $this.data('bs.dataTable')
			var options = typeof option == 'object' && option

			if (!data) {
			    $this.data('bs.dataTable', (data = new AjaxDT(this, options)))
			    if (typeof option == 'string' && data[option]) data[option]()
			}
		})
	}

	//var old = $.fn.bootstrapAjax

	$.fn.ajaxDataTable             = Plugin
	$.fn.ajaxDataTable.Constructor = AjaxDT

	// AjaxDT NO CONFLICT
	// ==================

	//$.fn.AjaxDT.noConflict = function () {
	//	$.fn.bootstrapAjax = old
	//	return this
	//}

	// AjaxDT DATA-API
	// ===============

	$(function () {
	    var d = $('table[data-table=ajaxTable]')
	    d.ajaxDataTable(d.data('table'))
	})

	//$(document).on('click','[data-table=ajaxTable]', function (e) {
	//    var f = $(this).data('ajax')
	//    $(this).bootstrapAjax(f)
	//    e.preventDefault()
	//})

}(jQuery);
