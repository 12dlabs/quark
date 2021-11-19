export declare namespace XTrackerInterfaces {
    interface RecordData {
        actionType: string;
        actionDescription?: string;
        actionAttrValue?: string;
        actionAttrDescription?: string;
        userAttrValue?: string;
        userAttrDescription?: string;
        extraData?: any;
        [property: string]: any;
    }
}
export declare type ScreenshotImageContract = AliHub.Graph.UrlImageContract & {
    upload?: any;
    ref: {
        created: Date;
        rendered: Date;
        tagName?: string;
        elementId?: string;
        source: "screenshot";
        x?: number;
        y?: number;
        scrollX?: number;
        scrollY?: number;
        model?: any;
    };
};
export declare type ScreenshotBlobImageContract = AliHub.Graph.ImageContract & {
    type: "blob";
    blob: Blob;
    name?: string;
    upload?: any;
    ref: {
        created: Date;
        rendered: Date;
        tagName?: string;
        elementId?: string;
        source: "screenshot";
        x?: number;
        y?: number;
        scrollX?: number;
        scrollY?: number;
        model?: any;
    };
};
export interface UrlTemplatesContract {
    uploadScreen?: string;
    resolveTrace?: string;
}
export declare var templates: AliHub.Res.Templates;
export declare var urlTemplates: UrlTemplatesContract;
export declare function resolveUrlTemplate(key: keyof UrlTemplatesContract, url?: string): string;
export declare function instance(): {
    [property: string]: any;
    init(config?: {
        [property: string]: any;
        appname: string;
        sampling?: number;
        key?: string;
        checksum?: string;
    }): any;
    bhr: {
        [property: string]: any;
        initConfig(config?: {
            [property: string]: any;
            appname: string;
        }): any;
        getConfig(): any;
        getTokens(): any;
        startSession(config?: {
            [property: string]: any;
            sessionType?: string;
        }): string;
        startSessionWithToken(config?: {
            [property: string]: any;
            token?: string;
            sessionType?: string;
        }): any;
        endSession(token: string): any;
        record(token: string, data: XTrackerInterfaces.RecordData): any;
    };
    qty: {
        [property: string]: any;
        init(config: any): any;
        error(msg: any, subtype: any, extraData: any): any;
        warn(msg: any, subtype: any, extraData: any): any;
        log(msg: any, subtype: any, extraData: any): any;
    };
};
export declare function clientInstance(): Client;
export declare function enableClient(forceToRegister?: boolean): AliHub.Diagnostics.PageAnalyticsClientContract;
export declare function record(token: string | (() => string), data: XTrackerInterfaces.RecordData | (() => XTrackerInterfaces.RecordData)): void;
/**
  * Gets screenshot for an element.
  * @param element  The element.
  */
export declare function screenshot(element?: AliHub.Elements.AnyElementReference, model?: any): PromiseLike<ScreenshotImageContract>;
export declare function screenshotBlob(element?: AliHub.Elements.AnyElementReference, model?: any): PromiseLike<ScreenshotBlobImageContract>;
/**
  * XTracker.
  * http://gitlab.alibaba-inc.com/xtracker/logger
  */
export declare class Client implements AliHub.Diagnostics.PageAnalyticsClientContract {
    mapping: AliHub.Collection.Mapping<XTrackerInterfaces.RecordData | (() => XTrackerInterfaces.RecordData)>;
    token: AliHub.Common.ListenedObjectContract<string>;
    autoMapping: boolean;
    recorded: AliHub.Collection.EventHandlers<{
        key: string;
        message: string;
        parameter: any;
    }>;
    /**
      * Records a stamp.
      */
    record(key: string, parameter?: any): void;
    /**
      * Records directly.
      */
    recordDirectly(data: XTrackerInterfaces.RecordData | (() => XTrackerInterfaces.RecordData)): void;
    /**
      * Checks whether the instance is alive.
      */
    alive(): boolean;
}
export declare namespace Diagnostic {
    type DialogControl = AliHub.Common.ActivityControl & {
        next(config: PageContract): AliHub.Common.ControlInfoContract;
    };
    interface SetContract {
        appName: string;
        subAppName: string;
        bizType: string;
        activityName: string;
        appParams: any;
        message: string;
        extraParams: any;
        imgInfo: any[];
        logInfo: AliHub.Diagnostics.LogRecordContract[];
        inputInfo: InputContract[];
    }
    interface InputContract {
        type: "click" | "type" | "speak" | "move" | string;
        x?: number;
        y?: number;
        value?: string;
        info?: any;
        created: Date;
    }
    interface ItemContract {
        id?: string;
        icon?: AliHub.Graph.ImageContract;
        name: string;
        actionType?: string;
        actionData?: any;
        actionHandler?: AliHub.Common.Action1<AliHub.Common.ActivityControl>;
        hidden?: boolean | AliHub.Common.Func<boolean>;
    }
    interface PageContract {
        id?: string;
        name: string;
        links?: ItemContract[];
        description?: string | string[];
        bannerUrl?: string;
        render?: (ele: HTMLElement) => void;
        last?: boolean;
    }
    var maxScreenshots: number;
    var enableScreenshot: boolean;
    function inputHistory(): InputContract[];
    function links(): {
        refresh: {
            name: string;
            actionType: string;
            actionData: () => void;
        };
        back: {
            name: string;
            actionType: string;
            actionData: () => void;
        };
    };
    function push(...items: any[]): void;
    function handler(type: string, handler?: AliHub.Common.Action2<AliHub.Common.ActivityControl, ItemContract>, ignoreIfExist?: boolean): AliHub.Common.Action2<AliHub.Common.ActivityControl, ItemContract>;
    function visible(value: boolean, backToHome?: boolean): void;
    function next(config: PageContract): AliHub.Common.ControlInfoContract;
    function screenCapture(element?: AliHub.Elements.AnyElementReference): PromiseLike<ScreenshotImageContract>;
    function resolveScreens(): any[];
    function isRecording(): boolean;
    function record(): void;
    function cancelRecord(): void;
    function uploadScreen(item: ScreenshotImageContract | ScreenshotBlobImageContract, urlTemplate: string, parameters: any): AliHub.Web.ResponseTask<{}>;
    function batchUploadScreens(start?: Date, urlTemplate?: string, tag?: string, id?: string, model?: any): void;
    function resolveTaskTrace(id: string): AliHub.Web.ResponseTask<{}>;
    class PageControl extends AliHub.Common.VisualControl {
        bizId: AliHub.Common.ListenedObjectContract<string>;
        name: AliHub.Common.ListenedObjectContract<string>;
        itemHandler: AliHub.Common.Action1<ItemContract>;
        last: boolean;
        /**
          * Initializes a new instance of the PageControl class.
          * @param id  The element to render.
          */
        constructor(id: AliHub.Common.VisualControlElementContract);
        pushDescription(...text: (string | string[])[]): any[];
        clearDescription(): void;
        pushLink(...link: (ItemContract | ItemContract[])[]): any[];
        clearLinks(): void;
        addSection(c?: (ele: HTMLElement) => void, idSuffix?: string): AliHub.Common.VisualControl;
    }
}
