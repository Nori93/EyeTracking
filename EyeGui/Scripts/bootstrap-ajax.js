/*! ========================================================================
 * Bootstrap Ajax: bootstrap-ajax.js v1.0.0
 * http://www.bootstrapAjax.com
 * ========================================================================
 * Copyright 2016 Grzegorz Cebulak, grzegorz.cebulak@gmail.com
 * Licensed under MIT
 * ======================================================================== */
var AjaxCompletFunction = function () { console.log("AjaxCompletFunction")} ;

+function ($) {
    'use strict';

    // Ajax PUBLIC CLASS DEFINITION
    // ==============================

    var Ajax = function (element, options) {
        this.$element = $(element)
        this.options = $.extend({}, this.defaults(), options)
        this.ajaxOptions = {
            accept: "application/json, text/javascript, */*; q=0.01",
            acceptencoding: "gzip, deflate, br",
            acceptlanguage: "pl-Pl,pl;q=0.8,en-US;q=0.6,en;q=0.4",
            url: this.options.url,
            method: this.options.method,
            contentType: this.options.contentType,
            data: this.options.data,
            __RequestVerificationToken: null,
        }
        //this.render()
    }

    Ajax.VERSION = '1.0.0'

    Ajax.DEFAULTS = {
        ajax: 'ajax',
        method: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        __RequestVerificationToken: null,
        url: null,
        data: null,
        doneFunction: null,
        failFunction: null,

        modalTitle: '',
        modalWindowId: 'modalWindow',
        modalTitleId: 'modalTitle',
        modalBodyId: 'modalBody',
        modalButtonId: 'modalOkButton',
        modalFormId: 'modalFormId',

    }

    Ajax.prototype.defaults = function () {
        return {
            ajax: this.$element.attr('data-ajax') || Ajax.DEFAULTS.ajax,
            method: this.$element.attr('data-ajax-method') || Ajax.DEFAULTS.method,
            contentType: this.$element.attr('data-ajax-content-type') || Ajax.DEFAULTS.contentType,
            __RequestVerificationToken: null,
            url: this.$element.attr('data-ajax-url') || Ajax.DEFAULTS.url,
            data: this.$element.attr('data-ajax-data') || Ajax.DEFAULTS.data,
            doneFunction: this.$element.attr('data-ajax-done-function') || Ajax.DEFAULTS.doneFunction,
            failFunction: this.$element.attr('data-ajax-fail-function') || Ajax.DEFAULTS.failFunction,

            modalTitle: this.$element.attr('data-modal-title') || Ajax.DEFAULTS.modalTitle,
            modalWindowId: this.$element.attr('data-modal-window-id') || Ajax.DEFAULTS.modalWindowId,
            modalTitleId: this.$element.attr('data-modal-title-id') || Ajax.DEFAULTS.modalTitleId,
            modalBodyId: this.$element.attr('data-modal-body-id') || Ajax.DEFAULTS.modalBodyId,
            modalButtonId: this.$element.attr('data-modal-button-id') || Ajax.DEFAULTS.modalButtonId,
            modalFormId: this.$element.attr('data-modal-form-id') || Ajax.DEFAULTS.modalFormId,
        }
    }

    Ajax.prototype.ajaxLoadModalForm = function () {
        var opt = this.options;
        $.ajax(this.ajaxOptions)
            .always(function (data, status) {
                _ShowModal(opt, opt.modalTitle, status == 'error' ? data.responseText : data, false)
                $('#' + opt.modalBodyId).find('[data-ajax^=ajax]').bootstrapAjax()
            })
            .done(function (data, textStatus, jqXHR) {
                if (opt.doneFunction != null)
                    window[opt.doneFunction](data, textStatus, jqXHR);
                  
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                if (opt.failFunction != null)
                    window[opt.failFunction](jqXHR, textStatus, errorThrown);
            })
    }

    Ajax.prototype.ajaxSubmitModalForm = function () {
        var opt = this.options;
        var form = $("#" + opt.modalFormId);
        var formValidation = $(form).data('formValidation');
        if (formValidation)
            formValidation.validate();

        if ((formValidation && formValidation.isValid()) || !formValidation) {
            this.ajaxOptions.data = form.serialize();
            
            this.ajaxOptions.__RequestVerificationToken = form.find("input[name='__RequestVerificationToken']").val();
            $.ajax(this.ajaxOptions)
                .always(function (data, status) {
                    _ChangeModal(opt, opt.modalTitle, status == 'error' ? data.responseText : data, true)
                })
                .done(function (data, textStatus, jqXHR) {
                    if (opt.doneFunction != null)
                        window[opt.doneFunction](data, textStatus, jqXHR);
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    if (opt.failFunction != null)
                        window[opt.failFunction](jqXHR, textStatus, errorThrown);
                })
        }
    }


    Ajax.prototype.ajaxLoadDiv = function () {
        var opt = this.options;
        $.ajax(this.ajaxOptions)
            .always(function (data, status) {
                _ChangeDiv(opt, status == 'error' ? data.responseText : data)
                $('#' + opt.modalBodyId).find('[data-ajax^=ajax]').bootstrapAjax()
            })
            .done(function (data, textStatus, jqXHR) {
                if (opt.doneFunction != null)
                    window[opt.doneFunction](data, textStatus, jqXHR);
                

            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                if (opt.failFunction != null)
                    window[opt.failFunction](jqXHR, textStatus, errorThrown);
            })
    }

    Ajax.prototype.ajaxSubmitDivForm = function () {
        var opt = this.options;
        this.ajaxOptions.data = $('#' + opt.modalFormId).serialize();
        $.ajax(this.ajaxOptions)
            .always(function (data, status) {
                _ChangeModal(opt, opt.modalTitle, status == 'error' ? data.responseText : data)
            })
            .done(function (data, textStatus, jqXHR) {
                if (opt.doneFunction != null)
                    window[opt.doneFunction](data, textStatus, jqXHR);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                if (opt.failFunction != null)
                    window[opt.failFunction](jqXHR, textStatus, errorThrown);
            })
    }

    Ajax.prototype.ajaxEvent = function () {
        var opt = this.options;
        $.ajax(this.ajaxOptions)
            .done(function (data, textStatus, jqXHR) {
                if (opt.doneFunction != null)
                    window[opt.doneFunction](data, textStatus, jqXHR);
                AjaxCompletFunction();
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                if (opt.failFunction != null)
                    window[opt.failFunction](jqXHR, textStatus, errorThrown);
                  
            })
    }

    function _ChangeModal(options, title, body, showOk) {
        $('#' + options.modalTitleId).html(title);
        $('#' + options.modalBodyId).html(body);
        var b = $('#' + options.modalButtonId);
        if (showOk) b.show(); else b.hide();
    }



    function _ShowModal(options, title, body, showOk) {
        _ChangeModal(options, title, body, showOk);
        $('#' + options.modalWindowId).modal('show');
    }

    function _ChangeDiv(options, body) {
        $('#' + options.modalBodyId).html(body);
    }

    // Ajax PLUGIN DEFINITION
    // ========================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.ajax')
            var options = typeof option == 'object' && option

            if (!data) {
                $this.data('bs.ajax', (data = new Ajax(this, options)))
                var f = $this.data('ajax')
                var ev = $this.data('ajax-event')
                $this.on(ev, function (e) {
                    $this.bootstrapAjax(f)
                    e.preventDefault()
                })
            }
            if (typeof option == 'string' && data[option]) data[option]()
        })
    }

    //var old = $.fn.bootstrapAjax

    $.fn.bootstrapAjax = Plugin
    $.fn.bootstrapAjax.Constructor = Ajax

    // Ajax NO CONFLICT
    // ==================

    //$.fn.Ajax.noConflict = function () {
    //	$.fn.bootstrapAjax = old
    //	return this
    //}

    // Ajax DATA-API
    // ===============

    //$(function() {
    //	$('button[data-ajax^=ajax]').bootstrapAjax()
    //})

    //$(document).on('click', '[data-ajax^=ajax]', function (e) {
    //    var f = $(this).data('ajax')
    //    $(this).bootstrapAjax(f)
    //    e.preventDefault()
    //})
    $(function () {
        $('[data-ajax^=ajax]').bootstrapAjax()
       
    })
}(jQuery);
