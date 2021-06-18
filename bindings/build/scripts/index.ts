/*  --------------------
 *  Binding of implementation - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  index.ts
 *  Description  Lots of useful functionalities.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

// For asynchronous modules loader.
if (typeof define === 'function') {
    if (define['amd']) {
        define(["require", "exports"], function (require, exports) {    // AMD
            var jQueryLoaded = typeof jQuery !== "undefined";
            if (jQueryLoaded && !!jQuery.fn && !!jQuery.fn.jquery) {
                var jQueryVersion: string = jQuery.fn.jquery.toString();
                var jQueryMajorVersionPosition = jQueryVersion.indexOf(".");
                if (jQueryMajorVersionPosition <= 0 || jQueryVersion.substring(0, jQueryMajorVersionPosition) === "1")
                    jQueryLoaded = false;
            } else {
                jQueryLoaded = false;
            }

            require("quark/scripts/index.min.js");
            try {
                if (!jQueryLoaded) require("jquery");
                AliHub.Diagnostics.debugInfo("Detected jQuery.", jQuery.fn);
            } catch (ex) {
                AliHub.Diagnostics.debugInfo("Failed to load jQuery.", ex);
            }

            if (false) {    // This is only for script text searching.
                require("quark/css/common.min.css");
            }

            if (!AliHub.Bindings.bindingProvider()) {
                try {
                    AliHub.Bindings.bindingProvider(require("knockout"));
                    AliHub.Diagnostics.debugInfo("Enabled KnockoutJs for binding.", AliHub.Bindings.bindingProvider());
                } catch (ex) {
                    AliHub.Diagnostics.debugInfo("Failed to load KnockoutJs.", ex);
                }
            }

            AliHub.Bindings.setup();
            AliHub.Diagnostics.debugInfo("Quark bindings loads completed by AMD.");
            return AliHub.Bindings;
        });
    } else if (typeof modulex !== "undefined" || typeof KISSY !== "undefined") {    // KISSY
        define(function (require, e, m) {
            var jQueryLoaded = typeof jQuery !== "undefined";
            if (jQueryLoaded && !!jQuery.fn && !!jQuery.fn.jquery) {
                var jQueryVersion: string = jQuery.fn.jquery.toString();
                var jQueryMajorVersionPosition = jQueryVersion.indexOf(".");
                if (jQueryMajorVersionPosition <= 0 || jQueryVersion.substring(0, jQueryMajorVersionPosition) === "1")
                    jQueryLoaded = false;
            } else {
                jQueryLoaded = false;
            }

            require("quark/scripts/index.min.js");
            try {
                if (!jQueryLoaded) require("jquery");
                AliHub.Diagnostics.debugInfo("Detected jQuery.", jQuery.fn);
            } catch (ex) {
                AliHub.Diagnostics.debugInfo("Failed to load jQuery.", ex);
            }

            require("quark/css/common.min.css");

            if (!AliHub.Bindings.bindingProvider()) {
                try {
                    AliHub.Bindings.bindingProvider(require("knockout"));
                    AliHub.Diagnostics.debugInfo("Enabled KnockoutJs for binding.", AliHub.Bindings.bindingProvider());
                } catch (ex) {
                    AliHub.Diagnostics.debugInfo("Failed to load KnockoutJs.", ex);
                }
            }

            AliHub.Bindings.setup();
            AliHub.Diagnostics.debugInfo("Quark bindings loads completed by KISSY.", m);
            return AliHub.Bindings;
        });
    }
} else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {    // CommonJS
    var jQueryLoaded = typeof jQuery !== "undefined";
    if (jQueryLoaded && !!jQuery.fn && !!jQuery.fn.jquery) {
        var jQueryVersion: string = jQuery.fn.jquery.toString();
        var jQueryMajorVersionPosition = jQueryVersion.indexOf(".");
        if (jQueryMajorVersionPosition <= 0 || jQueryVersion.substring(0, jQueryMajorVersionPosition) === "1")
            jQueryLoaded = false;
    } else {
        jQueryLoaded = false;
    }

    require("quark/scripts/index.min.js");
    try {
        if (!jQueryLoaded) require("jquery");
        AliHub.Diagnostics.debugInfo("Detected jQuery.", jQuery.fn);
    } catch (ex) {
        AliHub.Diagnostics.debugInfo("Failed to load jQuery.", ex);
    }

    if (false) {    // This is only for script text searching.
        require("quark/css/common.css");
    }

    if (!AliHub.Bindings.bindingProvider()) {
        try {
            AliHub.Bindings.bindingProvider(require("knockout"));
            AliHub.Diagnostics.debugInfo("Enabled KnockoutJs for binding.", AliHub.Bindings.bindingProvider());
        } catch (ex) {
            AliHub.Diagnostics.debugInfo("Failed to load KnockoutJs.", ex);
        }
    }

    AliHub.Bindings.setup();
    AliHub.Diagnostics.debugInfo("Quark bindings loads completed by CommonJS.", module);
    module['exports'] = AliHub.Bindings;
} else if (typeof KISSY !== "undefined") {  // KISSY 1.x
    KISSY.add(function (S) {
        var jQueryLoaded = typeof jQuery !== "undefined";
        if (jQueryLoaded && !!jQuery.fn && !!jQuery.fn.jquery) {
            var jQueryVersion: string = jQuery.fn.jquery.toString();
            var jQueryMajorVersionPosition = jQueryVersion.indexOf(".");
            if (jQueryMajorVersionPosition <= 0 || jQueryVersion.substring(0, jQueryMajorVersionPosition) === "1")
                jQueryLoaded = false;
        } else {
            jQueryLoaded = false;
        }

        require("quark/scripts/index.min.js");
        try {
            if (!jQueryLoaded) require("jquery");
            AliHub.Diagnostics.debugInfo("Detected jQuery.", jQuery.fn);
        } catch (ex) {
            AliHub.Diagnostics.debugInfo("Failed to load jQuery.", ex);
        }

        require("quark/css/common.min.css");

        if (!AliHub.Bindings.bindingProvider()) {
            try {
                AliHub.Bindings.bindingProvider(require("knockout"));
                AliHub.Diagnostics.debugInfo("Enabled KnockoutJs for binding.", AliHub.Bindings.bindingProvider());
            } catch (ex) {
                AliHub.Diagnostics.debugInfo("Failed to load KnockoutJs.", ex);
            }
        }

        AliHub.Bindings.setup();
        AliHub.Diagnostics.debugInfo("Quark bindings loads completed by KISSY 1.x.", KISSY);
        return AliHub.Bindings;
    }, { requires: [] })
} else {    // Classic
    AliHub.Bindings.setup();
}
