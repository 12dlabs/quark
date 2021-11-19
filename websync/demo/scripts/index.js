/*  --------------------
*  Demo starter - Alibaba
*  (c) Kingcean Tuan, 2014.
*
*  File  index.ts
*  Description  Demo starter.
*  Owner  Kingcean Tuan <kingcean@live.com>
*  --------------------  */
define(["require", "exports", "./data", "../../src/scripts/common"], function (require, exports, mockdata, bizcommon) {
    "use strict";
    if (!false) {
        require("./data");
    }
    if (!bizcommon && !!console && !!console.error)
        console.error("Failed to load.");
    /**
        * Sets up the configuration.
        */
    function config() {
        // Set up mock data provider.
        mockdata.setup();
    }
    /**
      * Loads specific controller.
      */
    function load(id, controller) {
        config();
        if (!AliHub.Elements.getById(id))
            return;
        var task = new controller();
        task.container = new AliHub.Common.VisualControl(id);
        task.process();
    }
    exports.load = load;
    /**
      * The base controller.
      */
    var BaseController = (function () {
        function BaseController() {
        }
        /**
          * Processes by the business logic.
          */
        BaseController.prototype.process = function () {
        };
        return BaseController;
    }());
    exports.BaseController = BaseController;
});
//# sourceMappingURL=index.js.map