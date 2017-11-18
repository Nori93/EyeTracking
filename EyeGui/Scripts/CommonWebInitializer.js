
function ShowBusy() {
    $('#loader_img').attr('src', $(location).attr('protocol') + '//' + $(location).attr('host') + '/Content/img/loading.gif');
    $('#ajaxBusyFade').css('display', 'block');
    $('#ajaxBusy').css('display', 'block');
}
function HideBusy() {
    $('#ajaxBusy').css('display', 'none');
    $('#ajaxBusyFade').css('display', 'none');
}
$(document).ajaxSend(function (event, request, settings) {
    ShowBusy();
});

$(document).ready(function () {
    CommonWebInit();
});
var ajaxEnd=true;
$(document).ajaxComplete(function (event, request, settings) {
    CommonWebInit();
    var d = $('table[data-table=ajaxTable]');
    if (d != null) {
        d.ajaxDataTable(d.data('table'));
    }
    $('[data-ajax^=ajax]').bootstrapAjax();
    if (ajaxEnd) {
       AjaxCompletFunction();
        ajaxEnd = false;
    }
    $('[data-toggle="toggle"]').each(function () {
        var t = $(this);
        //alert(t.data('bs.toggle'))
        if (!t.is(':visible')) {
            // plugin is not initialized
            t.bootstrapToggle();
        }
    });
    $('[data-editor="quill-editor"]').quillEditorPlugin()
    HideBusy();
});

function CommonWebInit() {
    $('[data-tooltip="tooltip"]').tooltip();
    $('[data-popover="popover"]').popover();
    
    $('div[data-picker="DateTimePicker"]').datetimepicker();
    $('input[data-provide="datepicker"]').datepicker().on("change", function () {
        $('form[data-fv-formId="formValidation"]').formValidation('revalidateField', $(this));
        $(this).datepicker('hide');
    });

    $('.selectpicker').selectpicker();


    //$("input[type='checkbox']").on('click', function () {       
    //    $(this).val(this.checked ? "true" : "false");
    //});
   
    $("input[type='checkbox']").bootstrapToggle({
        on: 'Tak',
        off: 'Nie',
        size: 'mini'
    });

    //$("input[type='checkbox']").on('change', function () {
    //    if ($(this).attr("id").length > 0) {
    //        $(this).val(this.checked ? "true" : "false");
    //    }
    //});    
    
    //$('[data-combobox="false"]').combobox();
    //$('[data-auto-numeric="auto-numeric"]').autoNumeric();
    //$('form').submit(function () {
    //    var form = $(this);
    //    form.find('[data-auto-numeric="auto-numeric"]').each(function () {
    //        var self = $(this);
    //        var v = self.autoNumeric('get');
    //        //self.autoNumeric('destroy');
    //        self.val(v);
    //    });
    //});
 
    // ciekawy przykład na podpinanie walidacji nie po nazwie pola a podpinając szablon walidacji: http://formvalidation.io/examples/bootstrap-select/

        $('form[data-fv-formId="formValidation"]').formValidation({

            fields: {

                NIP: {
                    validators: {
                        callback: {
                            message: 'Niepoprawny nr NIP',
                            callback: function (value, validator, $field) {
                                var num = value.split('');
                                if (num.length != 10) {
                                    return false;
                                }
                                else {
                                    var weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
                                    var resoult = 0;
                                    for (i = 0 ; i < weight.length; i++) {
                                        resoult += (num[i] * weight[i]);
                                    }
                                    return resoult % 11 == num[9];
                                }
                            }
                        }
                    }
                },
                PESEL: {
                    validators: {
                        callback: {
                            message: 'Niepoprawny nr PESEL',
                            callback: function (value, validator, $field) {

                                var num = value.split('');
                                if (num.length != 11) {
                                    return false;
                                }
                                else {
                                    var weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
                                    var resoult = 0;
                                    for (i = 0 ; i < weight.length; i++) {
                                        resoult += (num[i] * weight[i]);
                                    }
                                    resoult = resoult % 10;
                                    resoult = 10 - resoult;
                                    return resoult == num[10];
                                }
                            }
                        }
                    }
                },
                REGON: {
                    validators: {
                        callback: {
                            message: 'Niepoprawny nr REGON',
                            callback: function (value, validator, $field) {

                                var num = value.split('');
                                if (num.length != 9) {
                                    return false;
                                }
                                else {
                                    var weight = [8, 9, 2, 3, 4, 5, 6, 7];
                                    var resoult = 0;
                                    for (i = 0 ; i < weight.length; i++) {
                                        resoult += (num[i] * weight[i]);
                                    }
                                    resoult = resoult % 11;
                                    return resoult == num[8];
                                }
                            }
                        }
                    }
                },
                IBAN: {
                    validators: {
                        IBAN: {
                            message: 'The value is not valid IBAN'
                        }
                    }
                }
            }

        }).on('err.field.fv', function (e, data) {
            data.fv.disableSubmitButtons(false);
        }).on('success.field.fv', function (e, data) {
            data.fv.disableSubmitButtons(false);
        });
    

    $('input[data-slider-init="true"]').bootstrapSlider({
        ticks: [0, 50, 100],
        ticks_labels: ['0%', '50%', '100%'],
        ticks_snap_bounds: 50,
        formatter: function (value) {
            return value + ' %';
        }
    });

}

function DisableElement(element, target) {
    var e = $("[id ='" + element + "']");
    var t = $("[id ='" + target + "']");

    if (e.val() == "false") {
        t.prop('disabled', false);
    }
    else {
        t.prop('disabled', true);
    }

    e.on('change', function () {
        if (e.val() == "false") {
            t.prop('disabled', false);
        }
        else {
            t.prop('disabled', true);
        }
    })
}

function HideElement(element, target, bool) {
    var e = $("[id ='" + element + "']");
    var t = $("[id ='" + target + "']");
    var t_inp = $("[id ='" + target + "']").find("input");
    
    if (e.val() == "false") {
        t.hide();
        t.prop('disabled', true);
        t_inp.prop('disabled', true);
        t_inp.val('');
      
    }
    else {
        t.show();
        t.prop('disabled', false);
        t_inp.prop('disabled', false);
    }

    e.on('change', function () {
        if (e.val() == "false") {
            if (bool) {
                t.show();
                t.prop('disabled', false);
                t_inp.prop('disabled', false);
            }
            else {
                t.hide();
                t.prop('disabled', true);
                t_inp.prop('disabled', true);
                t_inp.val('');
            }
        }
        else {
            if (bool) {
                t.hide();
                t.prop('disabled', true);
                t_inp.prop('disabled', true);
                t_inp.val('');
            }
            else {
                t.show();
                t.prop('disabled', false);
                t_inp.prop('disabled', false);
            }
        }
        $('[data-slider-init="true"]').bootstrapSlider("refresh");
    })
}

function HideNow(element, bool) {
    var t = $("[id ='" + element + "']");


   
            if (!bool) {
                t.show();
                t.prop('disabled', false);
            }
            else {
                t.hide();
                t.prop('disabled', true);
            }
     
  
}

function HideElementOnSelect(element, target, number, bool) {
    var e = $("[id ='" + element + "']");
    var t = $("[id ='" + target + "']");

    if (e.val() == number) {
        if (bool) { t.show(); }
        else { t.hide(); }
    }
    else {
        if (bool) { t.hide(); }
        else { t.show(); }
    }

    e.on('change', function () {
        if (e.val() == number) {
            if (bool) { t.show(); }
            else { t.hide(); }
        }
        else {
            if (bool) { t.hide(); }
            else { t.show(); }
        }
    })
}

function HideOneElement(element) {
    var e = $("[id ='" + element + "']");
    e.hide();
    e.prop('disabled', true);
}
function ChkChange(element,bool) {
    var e = $("[id ='" + element + "']");
    if (!bool) {
        e.val('false');
        e.prop('checked', false);
    } else {
        e.val('true');
        e.prop('checked', true);
    }
}

function LoadModalAjax(event, field, url, target, id_parent) {
   
    $("[id ='" + field + "']").on(event, function () {
        var model = { id: $("[id ='" + field + "']").val() };
        $.ajax({
            type: "POST",
            data: JSON.stringify(model),
            url: url + "?parent=" + id_parent + "&number=" + $("[id ='" + field + "']").val(),
            contentType: "application/json"
        }).done(function (res) {
            var tar = $("[id='" + target + "']");
            tar.html(res);
        });
    });
}

function FieldToTable(group_id, field_id) {
    var fe_g = $('[id="' + group_id + '"]');
    var div_ch = $('[id="' + group_id + '"] > div');
    var fe = $('[id="' + field_id + '"]');
    var f_table_id = field_id + "_table";
    var bool = false;
    var fe_val = null;
    var i = 0;
    fe.on("click", function () {
        fe.hide();

        var t = $("<table class='table table-bordered' id='" + f_table_id + "'></table>");

        if (fe.val().indexOf(";")) {
            fe_val = fe.val().split(";");
        } else {
            fe_val = [fe.val()];
        }
        fe_val.forEach(function (item) { console.log(item); i++; });

        var span_add = $("<span class='glyphicon glyphicon-plus' id='span_add'></span>");
        var span_ok = $("<span class='glyphicon glyphicon-ok'></span>");
        span_ok.on("click", function () {
            var input_coll = document.getElementById(f_table_id).getElementsByTagName("input");

            fe_val = "";
            for (var k = 0; k < input_coll.length; k++) {
                if (input_coll[k] != null) {
                    fe_val += input_coll[k].value;
                    if (k != input_coll.length - 1) {
                        fe_val += ";";
                    }
                }
            }
            i = 0;
            fe.val(fe_val);
            fe_val = null;
            t.remove();
            div_add.remove();
            div_ok.remove();
            fe.show();
            $('form[data-fv-formId="formValidation"]').formValidation('revalidateField', fe);
        });
        fe_val.forEach(function (item) {
            if (item != null && item != "") {
                var input = $("<input class='form-controle' data-fv-notempty='true' data-fv-notempty-message='Pole jest wymagane'" +
                         " data-fv-regexp='true' data-fv-regexp-message='Nie pridłowy format email.' pattern='^[A-Za-z0-9._%+-]+[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$' " +
                         " data-fv-field='test'   id='test' name='test' value='" + item + "'/>");
                var i = $("<i class='form-control-feedback' data-fv-icon-for='test' style='display: none;'></i>");
                var span_fv_ne = $("<small class='help-block' data-fv-validator='notEmpty' data-fv-for='test' data-fv-result='NOT_VALIDATED' style='display: none;'>Pole jest wymagane</small>");
                var span_fv_reg = $("<small class='help-block' data-fv-validator='regexp' data-fv-for='test' data-fv-result='NOT_VALIDATED' style='display: none;'>Nie prawidłowy format email.</small>");
                var span_minus = $("<span class='glyphicon glyphicon-minus'></span>");
                span_minus.on("click", function () {
                    tr_n.remove();
                });
                var tr_n = $("<tr></tr>");
                var td_n = $("<td></td>");
                td_n.append(input);
                td_n.append(i);
                td_n.append(span_fv_ne);
                td_n.append(span_fv_reg);
                td_n.append(span_minus);

                tr_n.append(td_n);
                t.append(tr_n);
            }
        });
        var bool = false;
        span_add.on("click", function () {
            if (!bool && i < 5) {
               
                var input = $("<input class='form-controle' data-fv-notempty='true' data-fv-notempty-message='Pole jest wymagane'" +
                    " data-fv-regexp='true' data-fv-regexp-message='Nie pridłowy format email.' pattern='^[A-Za-z0-9._%+-]+[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$' " +
                    " data-fv-field='test'   id='test' name='test'/>");               
                var span_minus = $("<span class='glyphicon glyphicon-minus'></span>");          
                span_minus.on("click", function () {
                    tr_n.remove();
                });
                var tr_n = $("<tr></tr>");
                var td_n = $("<td></td>");
                td_n.append(input);             
                td_n.append(span_minus);
                tr_n.append(td_n);
                t.append(tr_n);
                i++
                bool = false
            }

        });
        var div_add = $("<div class='col-xs-2'></div>");
        var div_ok = $("<div class='col-xs-2'></div>");
        div_add.append(span_add);
        div_ok.append(span_ok);
        div_ch.append(div_add);
        div_ch.append(div_ok);
        div_ch.append(t);
    });
}

