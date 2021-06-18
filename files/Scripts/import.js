(function () {
    var factory = function (require, exports) {
        require("jquery");
        require("quark/scripts/index.min");
        if (!!window.require && window.require.cssSuport) {    // This is only for script text searching.
            require("quark/css/common.min.css");
            require("../css/common.min.css");
        }

        exports = AliHub.Files;
        return AliHub.Files;
    }
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && (define.amd || typeof __webpack_require__ !== "undefined")) {
        define(["require", "exports", "jquery", "quark/scripts/index.min"], factory);
    } else if (typeof AliHub !== "undefined") {
        if (!AliHub) AliHub = {}; if (!AliHub.Files) AliHub.Files = {}; factory(function (name) { return undefined; }, AliHub.Files);
    }
})();
