/*  --------------------
*  Basic controllers - FM 102 - Alibaba
*  (c) Kingcean Tuan, 2015.
*
*  File  controllers.ts
*  Description  The main portal and configuration script.
*  Owner  Kingcean Tuan <kingcean@live.com>
*  --------------------  */
define(["require", "exports"], function (require, exports) {
    var Main;
    (function (Main) {
        require("common");
        function start(id) {
            var control = new AliHub.Common.ActivityControl(id);
            var panel = control.add();
            return control;
        }
        Main.start = start;
    })(Main || (Main = {}));
    return Main;
});
//# sourceMappingURL=controllers.js.map