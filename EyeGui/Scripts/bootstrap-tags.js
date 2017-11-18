/*! ========================================================================
 * Bootstrap Tags: bootstrap-tags.js v1.0.0

 * ========================================================================
 * Copyright 2016 Grzegorz Cebulak, grzegorz.cebulak@gmail.com
 * Licensed under MIT
 * ======================================================================== */


 +function ($) {
 	'use strict';

	// Tags PUBLIC CLASS DEFINITION
	// ==============================

	var Tags = function (element, options) {
		this.$element  = $(element)
		this.options = $.extend({}, this.defaults(), options)
		this.tagsOptions = {
		    data: this.options.data,
		}

		this.initialize();
		//this.render()
	}

	Tags.VERSION  = '1.0.0'

	Tags.DEFAULTS = {
	    ttl:86400000, //one day
	    tagClass: undefined,
	    tagClassFunction: undefined,
	    itemValue: undefined,
	    itemText: undefined,
	    confirmKeys: [13, 188],
	    maxTags: undefined,
	    maxChars: undefined,
	    trimValue: false,
	    allowDuplicates: false,
	    focusClass: undefined,
	    freeInput: true,
	    cancelConfirmKeysOnEmpty: false,
	    onTagExists: function (item, $tag) {
	        $tag.hide().fadeIn();
	    },
	    typeaheadjs: undefined,
	    typeaheadConfig: { highlight: true, hint: true, minLength: 1 },
	}

	Tags.prototype.defaults = function() {
		return {
		    tagClass: this.$element.attr('data-tag-class') || Tags.DEFAULTS.tagClass,
		    tagClassFunction: this.$element.attr('data-tag-class-function') || Tags.DEFAULTS.tagClassFunction,
		    itemValue: this.$element.attr('data-item-value') || Tags.DEFAULTS.itemValue,
		    itemText: this.$element.attr('data-item-text') || Tags.DEFAULTS.itemText,
		    confirmKeys: this.$element.attr('data-confirm-keys') || Tags.DEFAULTS.confirmKeys,
		    maxTags: this.$element.attr('data-max-tags') || Tags.DEFAULTS.maxTags,
		    maxChars: this.$element.attr('data-max-chars') || Tags.DEFAULTS.maxChars,
		    trimValue: this.$element.attr('data-trim-value') || Tags.DEFAULTS.trimValue,
		    allowDuplicates: this.$element.data('allow-duplicates') || Tags.DEFAULTS.allowDuplicates,
		    focusClass: this.$element.attr('data-focus-class') || Tags.DEFAULTS.focusClass,
		    freeInput: this.$element.attr('data-free-input') || Tags.DEFAULTS.freeInput,
		    cancelConfirmKeysOnEmpty: this.$element.attr('data-cancel-confirm-keys-on-empty') || Tags.DEFAULTS.cancelConfirmKeysOnEmpty,
		    onTagExists: this.$element.attr('data-on-tag-exists') || Tags.DEFAULTS.onTagExists,
		    typeaheadjs: Tags.DEFAULTS.typeaheadjs,
		    typeaheadConfig: {
		        highlight: this.$element.attr('data-highlight') || Tags.DEFAULTS.typeaheadConfig.highlight,
		        hint: this.$element.attr('data-hint') || Tags.DEFAULTS.typeaheadConfig.hint,
		        minLength: this.$element.attr('data-min-length') || Tags.DEFAULTS.typeaheadConfig.minLength,
		    },
		}
	}

	Tags.prototype.initialize=function() {
	    var ds = this.$element.data('data-sources');
	    var opt = this.options;
        
	    if (ds && ds.length > 0) {
	        var src = [];
	        ds.forEach(function (s, i) {
	            var ttl = ds.ttl > 0 ? ds.ttl : opt.ttl;
	            //var s = ds[0];//only one source!!!!!!!!!!!!!!!!!!!!!!!TODO
	            var b = new Bloodhound({
	                datumTokenizer: function (datum) {
	                    if (opt.itemValue)
	                        return Bloodhound.tokenizers.whitespace(datum[opt.itemText]);
	                    else
	                        Bloodhound.tokenizers.whitespace;
	                },
	                queryTokenizer: Bloodhound.tokenizers.whitespace,
	                prefetch: {
	                    url: s.url,
	                    cache: s.cache,
                        ttl:ttl
	                }

	            });
	            b.initialize();
	            src.push(
                {
                    name: 'tagsdatasource' + i,
                    display: opt.itemText,
                    source: b,
                    templates: s.templates
                }
                    );
	        });
	        opt.typeaheadjs = [opt.typeaheadConfig, src];
	        if (opt.tagClassFunction != undefined)
	            opt.tagClass = function (item) { return _ExecFunction(opt.tagClassFunction, window, item); };
            else
	            opt.tagClass = opt.tagClass;
	    }
	    this.$element.tagsinput(opt);
	}

	function _ExecFunction(functionName, context /*, args */) {
	    var args = Array.prototype.slice.call(arguments, 2);
	    var namespaces = functionName.split(".");
	    var func = namespaces.pop();
	    for (var i = 0; i < namespaces.length; i++) {
	        context = context[namespaces[i]];
	    }
	    return context[func].apply(context, args);
	}
	// Tags PLUGIN DEFINITION
	// ========================

	function Plugin(option) {
		return this.each(function () {
			var $this   = $(this)
			var data    = $this.data('bs.tags')
			var options = typeof option == 'object' && option

			if (!data)
			{
			    $this.data('bs.tags', (data = new Tags(this, options)))
			    //var f = $this.data('tags')
			    //var ev = $this.data('tags-event')
			    //$this.on(ev, function (e) {
			    //    $this.bootstrapTags(f)
			    //    e.preventDefault()
			    //})
			}
			if (typeof option == 'string' && data[option]) data[option]()
		})
	}

	//var old = $.fn.bootstrapTags

	$.fn.bootstrapTags = Plugin
	$.fn.bootstrapTags.Constructor = Tags

	$(function () {
	    $('[data-tags^=tags]').bootstrapTags()})
}(jQuery);
