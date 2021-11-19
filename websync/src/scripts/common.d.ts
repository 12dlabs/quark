export declare var moduleName: string;
export declare var templates: AliHub.Res.Templates;
/**
  * Gets SVG source string.
  * @param key  The key.
  */
export declare function svg(key: string): string;
/**
  * Gets HTML source string.
  * @param key  The key.
  */
export declare function html(key: string): string;
/**
  * Gets local string.
  * @param key  The key.
  */
export declare function strings(key: string, lang?: string): string;
/**
  * Sets strings of specific market code.
  * @param lang  The market code.
  * @param value  The strings.
  */
export declare function local(lang: string, value: AliHub.Collection.DictionaryContract<string> | Object): void;
/**
  * Gets data package resolver.
  * @param key  The key.
  */
export declare function webResolver<T>(key: string, value?: string | AliHub.Web.WebResolverInfoContract<T>): AliHub.Web.BaseDataPackageResolver<T>;
/**
  * Gets screenshot for an element.
  * @param element  The element.
  */
export declare function screenshot(element: HTMLElement): PromiseLike<AliHub.Graph.ImageContract>;
export declare function copySvg(element: SVGElement, width?: number): SVGElement;
export declare class RequestInterval<TRequest, TResponse> {
    private _enabled;
    id: AliHub.Common.BindingObjectContract<string>;
    commitResolver: AliHub.Web.PostDataPackageResolver<AliHub.Common.IdentifiedContract, TResponse>;
    idResolver: AliHub.Web.IdentifiedDataPackageResolver<string>;
    interval: number;
    enable: AliHub.Common.BindingObjectContract<boolean>;
    constructor();
    renewId(): AliHub.Web.ResponseTask<string>;
    commit(): PromiseLike<TResponse>;
    getInfo(): PromiseLike<TRequest>;
    process(r: TResponse): void;
    private _loop();
}
export declare class AsyncLoop<T> {
    private _enabled;
    interval: number;
    ignoreFailure: boolean;
    commit: AliHub.Common.Func<AliHub.Web.ResponseTask<T>>;
    isCompleted: AliHub.Common.Func1<T, boolean>;
    completed: AliHub.Collection.EventHandlers<T>;
    enable(value?: boolean): boolean;
    private _loop();
    private _process();
}
export declare class Client extends RequestInterval<Interfaces.MessageRequestContract, Interfaces.MessagesContract> {
    private _elements;
    position: AliHub.Collection.BindingArrayContract<Interfaces.ScreenCoordinate>;
    message: AliHub.Common.BindingObjectContract<string>;
    response: AliHub.Collection.BindingArrayContract<Interfaces.MessageResponseContract>;
    availableListResolver: AliHub.Web.DataPackageResolver<Interfaces.RoomBindingContract[]>;
    addAttendeeResolver: AliHub.Web.RequestDataPackageResolver<any, Interfaces.UserBindingContract>;
    addAttendeeByNameResolver: AliHub.Web.RequestDataPackageResolver<any, Interfaces.UserBindingContract>;
    leaveResolver: AliHub.Web.IdentifiedDataPackageResolver<Date>;
    activityResolver: AliHub.Web.RequestDataPackageResolver<any, string>;
    pointerVisible: AliHub.Common.BindingObjectContract<boolean>;
    pointerTimeout: number;
    imagesVisible: AliHub.Common.BindingObjectContract<boolean>;
    creationVisible: AliHub.Common.BindingObjectContract<boolean>;
    leavingVisible: AliHub.Common.BindingObjectContract<boolean>;
    keepHide: boolean;
    constructor();
    addAttendee(id: string): AliHub.Web.ResponseTask<Interfaces.UserBindingContract>;
    addAttendeeByName(name: string): AliHub.Web.ResponseTask<Interfaces.UserBindingContract>;
    leave(): AliHub.Web.ResponseTask<Date>;
    availableList(): AliHub.Web.ResponseTask<Interfaces.RoomBindingContract[]>;
    availableListMonitor(): AsyncLoop<Interfaces.RoomBindingContract[]>;
    watchElement(id: HTMLElement | string): void;
    getActivityId(type: string): AliHub.Web.ResponseTask<string>;
    getInfo(): PromiseLike<Interfaces.MessageRequestContract>;
    process(r: Interfaces.MessagesContract): void;
    showPointer(): void;
    getPosition(id: string | HTMLElement, activity: string): void;
    private _showPointer(id, element, x, y, title, timeout);
}
export declare module Interfaces {
    interface UserBindingContract extends AliHub.Common.SimpleEntryContract {
        state: string;
    }
    interface RoomBindingContract extends AliHub.Common.IdentifiedContract {
        state: string;
        invitor?: AliHub.Common.IdentifiedContract;
    }
    interface ScreenCoordinate extends AliHub.Common.PlaneCoordinate {
        activity: string;
        [property: string]: any;
    }
    interface ScreenshotActivityContract {
        type: string;
        activity: string;
        image: AliHub.Graph.UrlImageContract;
        [property: string]: any;
    }
    interface MessageRequestContract {
        focus?: ScreenCoordinate[];
        message?: string;
        activities?: ScreenshotActivityContract[];
        [property: string]: any;
    }
    interface MessageResponseContract extends MessageRequestContract, UserBindingContract {
    }
    interface MessagesContract {
        list: MessageResponseContract[];
    }
}
