/*  --------------------
*  Mock data - Alibaba
*  (c) Kingcean Tuan, 2014.
*
*  File  data.ts
*  Description  Mock data provider and definitions.
*  Owner  Kingcean Tuan <kingcean@live.com>
*  --------------------  */
define(["require", "exports"], function (require, exports) {
    "use strict";
    require("websync/scripts/panels");
    if (window.require.cssSuport) {
        require("../css/demo.css");
    }
    /**
        * Sets up the mock data.
        */
    function setup() {
    }
    exports.setup = setup;
    /**
        * Constant information.
        */
    var Constant = (function () {
        function Constant() {
        }
        return Constant;
    }());
    exports.Constant = Constant;
    var HandlerUtility = (function () {
        function HandlerUtility() {
        }
        HandlerUtility.generateId = function (path, id) {
            AliHub.Diagnostics.debugInfo(AliHub.Common.Text.format(path, { id: id }));
            return AliHub.Web.DataPackageJob.staticInfo("testing");
        };
        HandlerUtility.getActivityId = function (path, parameter) {
            AliHub.Diagnostics.debugInfo(AliHub.Common.Text.format(path, parameter));
            return AliHub.Web.DataPackageJob.staticInfo(parameter.type + "-default");
        };
        HandlerUtility.leave = function (path, id) {
            AliHub.Diagnostics.debugInfo(AliHub.Common.Text.format(path, { id: id }));
            return AliHub.Web.DataPackageJob.staticInfo(new Date());
        };
        HandlerUtility.addAttendee = function (path, model) {
            if (!model.user)
                model.user = "Kingcean";
            if (!model.userName)
                model.userName = "001";
            AliHub.Diagnostics.debugInfo(AliHub.Common.Text.format(path, model));
            return AliHub.Web.DataPackageJob.staticInfo({ id: model.user, name: model.name, state: "accepted" });
        };
        HandlerUtility.availableRooms = function (path) {
            AliHub.Diagnostics.debugInfo(AliHub.Common.Text.format(path, {}));
            return AliHub.Web.DataPackageJob.staticInfo([{ id: "testing", state: "accepted" }]);
        };
        HandlerUtility.clientRequest = function (path, parameter, data) {
            AliHub.Diagnostics.debugInfo(AliHub.Common.Text.format(path, parameter), data);
            if (parameter.id !== "testing") {
                return AliHub.Web.DataPackageJob.staticInfo({ list: [] });
            }
            var focus = { activity: "screenshot-default", x: null, y: null };
            if (!!data.focus && data.focus.length > 0) {
                focus.x = data.focus[0].x;
                focus.y = data.focus[0].y;
            }
            if (!!data.activities && data.activities.length > 0) {
                try {
                    HandlerUtility._imageCache = data.activities[0].image.url;
                }
                catch (ex) { }
            }
            var info = {
                id: "001",
                name: "Kingcean Tuan",
                state: "pending",
                focus: [focus],
                message: "Test...",
                activities: [{ activity: "screenshot-default", type: "screenshot", image: { type: "url", url: !!HandlerUtility._imageCache ? HandlerUtility._imageCache : "../../demo/images/taobao_avatar.jpg" } }]
            };
            return AliHub.Web.DataPackageJob.staticInfo({ list: [info] });
        };
        HandlerUtility.mockHandler = function (value) {
            value.idResolver.resolve = function (id) {
                return HandlerUtility.generateId(value.idResolver.pathTemplate(), id);
            };
            value.activityResolver.resolve = function (model) {
                return HandlerUtility.getActivityId(value.activityResolver.pathTemplate(), model);
            };
            value.commitResolver.resolve = function (model, data) {
                return HandlerUtility.clientRequest(value.commitResolver.pathTemplate(), model, data);
            };
            value.addAttendeeResolver.resolve = function (model) {
                return HandlerUtility.addAttendee(value.addAttendeeResolver.pathTemplate(), model);
            };
            value.addAttendeeByNameResolver.resolve = function (model) {
                return HandlerUtility.addAttendee(value.addAttendeeByNameResolver.pathTemplate(), model);
            };
            value.leaveResolver.resolve = function (id) {
                return HandlerUtility.leave(value.leaveResolver.pathTemplate(), id);
            };
            value.availableListResolver.resolve = function () {
                return HandlerUtility.availableRooms(value.availableListResolver.pathTemplate());
            };
        };
        return HandlerUtility;
    }());
    exports.HandlerUtility = HandlerUtility;
});
//# sourceMappingURL=data.js.map