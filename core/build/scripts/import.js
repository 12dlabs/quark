/*  --------------------
 *  The enter point - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  import.ts
 *  Description  Sets up the necessary libraries.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

(function () {

    var bag = {};

    // For asynchronous modules loader.
    if (typeof define === 'function') {
        if (define['amd'] || typeof __webpack_require__ !== "undefined") {    // AMD or Webpack
            define(["require", "exports"], function (require, exports) {
                var jQueryLoaded = typeof jQuery !== "undefined";
                if (jQueryLoaded && !!jQuery.fn && !!jQuery.fn.jquery) {
                    var jQueryVersion = jQuery.fn.jquery.toString();
                    var jQueryMajorVersionPosition = jQueryVersion.indexOf(".");
                    if (jQueryMajorVersionPosition <= 0 || jQueryVersion.substring(0, jQueryMajorVersionPosition) === "1")
                        jQueryLoaded = false;
                } else {
                    jQueryLoaded = false;
                }

                require("quark/scripts/index.min.js");
                try {
                    if (!jQueryLoaded)
                        require("jquery");
                    AliHub.Diagnostics.debugInfo("Detected jQuery.", jQuery.fn);
                } catch (ex) {
                    AliHub.Diagnostics.debugInfo("Failed to load jQuery.", ex);
                }

                if (false) {
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
                return AliHub;
            });
        } else if (typeof modulex !== "undefined" || typeof KISSY !== "undefined") {    // KISSY
            define(function (require, e, m) {
                var jQueryLoaded = typeof jQuery !== "undefined";
                if (jQueryLoaded && !!jQuery.fn && !!jQuery.fn.jquery) {
                    var jQueryVersion = jQuery.fn.jquery.toString();
                    var jQueryMajorVersionPosition = jQueryVersion.indexOf(".");
                    if (jQueryMajorVersionPosition <= 0 || jQueryVersion.substring(0, jQueryMajorVersionPosition) === "1")
                        jQueryLoaded = false;
                } else {
                    jQueryLoaded = false;
                }

                require("quark/scripts/index.min.js");
                try {
                    if (!jQueryLoaded)
                        require("jquery");
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
                return AliHub;
            });
        }
    } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {    // CommonJS
        var jQueryLoaded = typeof jQuery !== "undefined";
        if (jQueryLoaded && !!jQuery.fn && !!jQuery.fn.jquery) {
            var jQueryVersion = jQuery.fn.jquery.toString();
            var jQueryMajorVersionPosition = jQueryVersion.indexOf(".");
            if (jQueryMajorVersionPosition <= 0 || jQueryVersion.substring(0, jQueryMajorVersionPosition) === "1")
                jQueryLoaded = false;
        } else {
            jQueryLoaded = false;
        }

        require("quark/scripts/index.min.js");
        try {
            if (!jQueryLoaded)
                require("jquery");
            AliHub.Diagnostics.debugInfo("Detected jQuery.", jQuery.fn);
        } catch (ex) {
            AliHub.Diagnostics.debugInfo("Failed to load jQuery.", ex);
        }

        if (false) {
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
        module['exports'] = AliHub;
    } else if (typeof KISSY !== "undefined") {  // KISSY 1.x
        KISSY.add(function (S) {
            var jQueryLoaded = typeof jQuery !== "undefined";
            if (jQueryLoaded && !!jQuery.fn && !!jQuery.fn.jquery) {
                var jQueryVersion = jQuery.fn.jquery.toString();
                var jQueryMajorVersionPosition = jQueryVersion.indexOf(".");
                if (jQueryMajorVersionPosition <= 0 || jQueryVersion.substring(0, jQueryMajorVersionPosition) === "1")
                    jQueryLoaded = false;
            } else {
                jQueryLoaded = false;
            }

            require("quark/scripts/index.min.js");
            try {
                if (!jQueryLoaded)
                    require("jquery");
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
            return AliHub;
        }, { requires: [] });
    } else {    // None
        AliHub.Bindings.setup();
    }

})();