import bizcommon = require("../../src/scripts/common");
/**
    * Sets up the mock data.
    */
export declare function setup(): void;
/**
    * Constant information.
    */
export declare class Constant {
}
export declare class HandlerUtility {
    private static _imageCache;
    static generateId(path: string, id: string): AliHub.Web.ResponseTask<string>;
    static getActivityId(path: string, parameter: any): AliHub.Web.ResponseTask<string>;
    static leave(path: string, id: string): AliHub.Web.ResponseTask<Date>;
    static addAttendee(path: string, model: any): AliHub.Web.ResponseTask<bizcommon.Interfaces.UserBindingContract>;
    static availableRooms(path: string): AliHub.Web.ResponseTask<bizcommon.Interfaces.RoomBindingContract[]>;
    static clientRequest(path: string, parameter: any, data: bizcommon.Interfaces.MessageRequestContract): AliHub.Web.ResponseTask<bizcommon.Interfaces.MessageRequestContract>;
    static mockHandler(value: bizcommon.Client): void;
}
