/*  --------------------
 *  Mock data - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  data.ts
 *  Description  Mock data provider and definitions.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

import bizcommon = require("../../src/scripts/common");

require("websync/scripts/panels");
if ((window as any).require.cssSuport) {    // This is only for script text searching.
    require("../css/demo.css");
}

/**
    * Sets up the mock data.
    */
export function setup() {
}

/**
    * Constant information.
    */
export class Constant {

}

export class HandlerUtility {

    private static _imageCache: string;

    public static generateId(path: string, id: string): AliHub.Web.ResponseTask<string> {
        AliHub.Diagnostics.debugInfo(AliHub.Common.Text.format(path, { id: id }));
        return AliHub.Web.DataPackageJob.staticInfo("testing");
    }

    public static getActivityId(path: string, parameter: any): AliHub.Web.ResponseTask<string> {
        AliHub.Diagnostics.debugInfo(AliHub.Common.Text.format(path, parameter));
        return AliHub.Web.DataPackageJob.staticInfo(parameter.type + "-default");
    }

    public static leave(path: string, id: string): AliHub.Web.ResponseTask<Date> {
        AliHub.Diagnostics.debugInfo(AliHub.Common.Text.format(path, { id: id }));
        return AliHub.Web.DataPackageJob.staticInfo(new Date());
    }

    public static addAttendee(path: string, model: any): AliHub.Web.ResponseTask<bizcommon.Interfaces.UserBindingContract> {
        if (!model.user) model.user = "Kingcean";
        if (!model.userName) model.userName = "001";
        AliHub.Diagnostics.debugInfo(AliHub.Common.Text.format(path, model));
        return AliHub.Web.DataPackageJob.staticInfo({ id: model.user, name: model.name, state: "accepted" });
    }

    public static availableRooms(path: string): AliHub.Web.ResponseTask<bizcommon.Interfaces.RoomBindingContract[]> {
        AliHub.Diagnostics.debugInfo(AliHub.Common.Text.format(path, {}));
        return AliHub.Web.DataPackageJob.staticInfo([{ id: "testing", state: "accepted" }]);
    }

    public static clientRequest(path: string, parameter: any, data: bizcommon.Interfaces.MessageRequestContract): AliHub.Web.ResponseTask<bizcommon.Interfaces.MessageRequestContract> {
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
            try { HandlerUtility._imageCache = data.activities[0].image.url; } catch (ex) { }
        }

        var info: bizcommon.Interfaces.MessageResponseContract = {
            id: "001",
            name: "Kingcean Tuan",
            state: "pending",
            focus: [focus],
            message: "Test...",
            activities: [{ activity: "screenshot-default", type: "screenshot", image: { type: "url", url: !!HandlerUtility._imageCache ? HandlerUtility._imageCache : "../../demo/images/taobao_avatar.jpg" } }]
        };
        return AliHub.Web.DataPackageJob.staticInfo({ list: [info] });
    }

    public static mockHandler(value: bizcommon.Client) {
        value.idResolver.resolve = (id) => {
            return HandlerUtility.generateId(value.idResolver.pathTemplate(), id);
        };
        value.activityResolver.resolve = (model) => {
            return HandlerUtility.getActivityId(value.activityResolver.pathTemplate(), model);
        };
        value.commitResolver.resolve = (model, data) => {
            return HandlerUtility.clientRequest(value.commitResolver.pathTemplate(), model, data);
        };
        value.addAttendeeResolver.resolve = (model) => {
            return HandlerUtility.addAttendee(value.addAttendeeResolver.pathTemplate(), model);
        };
        value.addAttendeeByNameResolver.resolve = (model) => {
            return HandlerUtility.addAttendee(value.addAttendeeByNameResolver.pathTemplate(), model);
        };
        value.leaveResolver.resolve = (id) => {
            return HandlerUtility.leave(value.leaveResolver.pathTemplate(), id);
        };
        value.availableListResolver.resolve = () => {
            return HandlerUtility.availableRooms(value.availableListResolver.pathTemplate());
        };
    }

}
