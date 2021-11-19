(function () {
    var factory = function (require, exports) {
        require("jquery");
        require("quark/scripts/index.min.js");
        if (!!window.require && window.require.cssSuport) {    // This is only for script text searching.
            require("quark/css/common.min.css");
            require("../css/common.min.css");
        }

        exports = AliHub.Files;
        return AliHub.Files;
    }
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    } else if (typeof AliHub !== "undefined") {
        if (typeof witness === "undefined") witness = {}; if (!witness) witness = {};
        factory(function (name) { }, witness);
    }
})();
