/*! ========================================================================
 * Quill editor plugin: quill-editor-plugin.js v1.0.0
 * http://www.quilljs.com
 * ========================================================================
 * Copyright 2017 Grzegorz Cebulak, grzegorz.cebulak@gmail.com
 * Licensed under MIT
 * ======================================================================== */


+function ($) {
    'use strict';

    // QuillEditorPlugin PUBLIC CLASS DEFINITION
    // ==============================

    var QuillEditorPlugin = function (element, options) {
        this.$element = $(element)
        this.options = $.extend({}, this.defaults(), options)
        this.initialize();
    }

    QuillEditorPlugin.VERSION = '1.0.0'

    QuillEditorPlugin.DEFAULTS = {
        placeholder: '',
        readOnly: false,
        theme: 'snow',
        value: null,
    }

    QuillEditorPlugin.prototype.defaults = function () {
        return {
            placeholder: this.$element.attr('data-editor-placeholder') || QuillEditorPlugin.DEFAULTS.placeholder,
            readOnly: this.$element.attr('data-editor-readOnly') || QuillEditorPlugin.DEFAULTS.readOnly,
            theme: this.$element.attr('data-editor-theme') || QuillEditorPlugin.DEFAULTS.theme,
            value: this.$element.attr('data-editor-value') || QuillEditorPlugin.DEFAULTS.value,
        }
    }

    QuillEditorPlugin.prototype.initialize = function () {

        var opt = this.options;
        var id = this.$element.attr('id');
        this.$element.attr('id', 'qep-id');
        try {
            var quill = new Quill('#qep-id', opt);
            var input = this.$element.parent().children('input:hidden');
            if (input) {
                quill.on('text-change', function (delta, oldDelta, source) {
                    input.val(JSON.stringify(quill.getContents()));
                });
            }
            if(opt.value)
                quill.setContents(JSON.parse(opt.value));
        }
        catch (ex) { }
        if (id)
            this.$element.attr('id', id);
        else
            this.$element.removeAttr('id');
    }

    // QuillEditorPlugin PLUGIN DEFINITION
    // ========================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('qePlugin')
            var options = typeof option == 'object' && option

            if (!data) {
                $this.data('qePlugin', (data = new QuillEditorPlugin(this, options)))
                //var f = $this.data('ajax')
                //var ev = $this.data('ajax-event')
                //$this.on(ev, function (e) {
                //    $this.bootstrapAjax(f)
                //    e.preventDefault()
                //})
            }
            if (typeof option == 'string' && data[option]) data[option]()
        })
    }

    //var old = $.fn.bootstrapAjax

    $.fn.quillEditorPlugin = Plugin
    $.fn.quillEditorPlugin.Constructor = QuillEditorPlugin


    // QuillEditorPlugin DATA-API
    // ===============

    $(function () {
        $('[data-editor="quill-editor"]').quillEditorPlugin()
    })
}(jQuery);
