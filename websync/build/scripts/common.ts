/*  --------------------
 *  Common components - Web Sync - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  common.ts
 *  Description  Common components.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

require("quark/scripts/index.min.js");
if ((window as any).require.cssSuport) {    // This is only for script text searching.
    require("../css/common.min.css");
}

export var moduleName: string = "AliHub.WebSync";
export var templates = AliHub.Res.templates(moduleName, true);

function _init() {
    var lp_en = {
        start: "Start",
        stop: "Stop",
        renew: "Renew",
        leave: "Leave",
        name: "WebSync"
    };
    templates.strings.reg("ww", lp_en);
    templates.strings.reg("en", lp_en);

    var lp_zh_Hans = {
        start: "开始",
        stop: "停止",
        renew: "新建",
        leave: "离开",
        name: "WebSync"
    };
    templates.strings.reg("zh-Hans", lp_zh_Hans);
    templates.strings.reg("zh-CN", lp_zh_Hans);
    templates.strings.reg("zh-SG", lp_zh_Hans);
}

_init();

/**
  * Gets SVG source string.
  * @param key  The key. 
  */
export function svg(key: string): string {
    if (!key) return null;
    return AliHub.Res.svg(moduleName, key);
}

/**
  * Gets HTML source string.
  * @param key  The key. 
  */
export function html(key: string) {
    if (!key) return null;
    return AliHub.Res.html(moduleName, key);
}

/**
  * Gets local string.
  * @param key  The key. 
  */
export function strings(key: string, lang?: string) {
    if (!key) return null;
    return arguments.length > 1 ? AliHub.Res.strings(moduleName, key, lang) : AliHub.Res.strings(moduleName, key);
}

/**
  * Sets strings of specific market code.
  * @param lang  The market code. 
  * @param value  The strings. 
  */
export function local(lang: string, value: AliHub.Collection.DictionaryContract<string> | Object) {
    if (!lang || !value) return null;
    return AliHub.Res.templates(moduleName).strings.reg(lang, value);
}

/**
  * Gets data package resolver.
  * @param key  The key. 
  */
export function webResolver<T>(key: string, value?: string | AliHub.Web.WebResolverInfoContract<T>): AliHub.Web.BaseDataPackageResolver<T> {
    if (!key) return null;
    return arguments.length > 1 ? AliHub.Web.resolver<T>(moduleName, key, value) : AliHub.Web.resolver<T>(moduleName, key);
}

/**
  * Gets screenshot for an element.
  * @param element  The element.
  */
export function screenshot(element: HTMLElement) {
    var deffered = AliHub.Common.deferred<AliHub.Graph.ImageContract>();
    html2canvas(element, {
        onrendered: (canvas) => {
            var dataUrl = canvas.toDataURL();
            deffered.resolve({
                name: AliHub.Common.DateTime.toFullLocaleString(new Date()),
                type: "url",
                url: dataUrl
            });
        }
    });

    return deffered.promise();
}

export function copySvg(element: SVGElement, width?: number) {
    var ele = element.cloneNode(true) as SVGElement;
    if (AliHub.Common.Maths.validNumber(width) && width > 0 && !!(element as any).style) {
        var eleWidth = ele.scrollWidth;
        if (eleWidth <= 0) eleWidth = 1;
        var rate = width * 100 / eleWidth;
        (element as any as SVGStylable).style.zoom = rate.toString() + "%";
    }

    return ele;
}

export class RequestInterval<TRequest, TResponse> {

    private _enabled = false;

    public id = AliHub.Common.bindingObj<string>();

    public commitResolver = new AliHub.Web.PostDataPackageResolver<AliHub.Common.IdentifiedContract, TResponse>();

    public idResolver = new AliHub.Web.IdentifiedDataPackageResolver<string>();

    public interval = 400;

    public enable = AliHub.Common.bindingObj(false);

    public constructor() {
        this.enable.subscribe((newValue) => {
            this._enabled = newValue === true;
            this._loop();
        });
    }

    public renewId(): AliHub.Web.ResponseTask<string> {
        var promise = this.idResolver.resolve(this.id());
        promise.then((r) => {
            this.id(r.result);
        });
        return promise;
    }

    public commit(): PromiseLike<TResponse> {
        var deferred = AliHub.Common.deferred<TResponse>();
        if (!this.commitResolver || !this.commitResolver.pathTemplate || !this.id()) return deferred.reject().promise();
        var task = this.getInfo();
        if (!task) return deferred.reject().promise();
        task.then((info) => {
            this.commitResolver.resolve({ id: this.id() }, info).then((r) => {
                this.process(r.result);
                deferred.resolve(r.result);
            }, () => {
                deferred.reject();
            });
        }, () => {
            deferred.reject();
        });

        return deferred.promise();
    }

    public getInfo(): PromiseLike<TRequest> {
        return null;
    }

    public process(r: TResponse) {
    }

    private _loop() {
        if (!this._enabled) return;
        var rh = this.commit();
        if (!rh) {
            setTimeout(() => this._loop(), this.interval);
            return;
        }

        rh.then((r) => {
            setTimeout(() => this._loop(), this.interval);
        }, () => {
            setTimeout(() => this._loop(), this.interval);
        });
    }

}

export class AsyncLoop<T> {

    private _enabled = false;

    public interval = 1000;

    public ignoreFailure = true;

    public commit: AliHub.Common.Func<AliHub.Web.ResponseTask<T>>;

    public isCompleted: AliHub.Common.Func1<T, boolean>;

    public completed = new AliHub.Collection.EventHandlers<T>();

    public enable(value?: boolean) {
        if (arguments.length > 0) {
            this._enabled = value;
            if (this._enabled) this._loop();
        }

        return this._enabled;
    }

    private _loop() {
        if (!this._enabled) return;
        setTimeout(() => {
            this._process();
        }, this.interval);
    }

    private _process() {
        this.commit().then((r) => {
            if (!!r && !this.isCompleted(r.result)) this._loop();
            else this.completed.raise(r.result);
        }, () => {
            if (this.ignoreFailure) this._loop();
        });
    }

}

export class Client extends RequestInterval<Interfaces.MessageRequestContract, Interfaces.MessagesContract> {

    private _elements = new Array<AliHub.Collection.KeyValuePairContract<string, HTMLElement>>();

    public position = AliHub.Common.bindingArray<Interfaces.ScreenCoordinate>();

    public message = AliHub.Common.bindingObj<string>();

    public response = AliHub.Common.bindingArray<Interfaces.MessageResponseContract>();

    public availableListResolver = new AliHub.Web.DataPackageResolver<Interfaces.RoomBindingContract[]>();

    public addAttendeeResolver = new AliHub.Web.RequestDataPackageResolver<any, Interfaces.UserBindingContract>();

    public addAttendeeByNameResolver = new AliHub.Web.RequestDataPackageResolver<any, Interfaces.UserBindingContract>();

    public leaveResolver = new AliHub.Web.IdentifiedDataPackageResolver<Date>();

    public activityResolver = new AliHub.Web.RequestDataPackageResolver<any, string>();

    public pointerVisible = AliHub.Common.bindingObj(true);

    public pointerTimeout = 1000;

    public imagesVisible = AliHub.Common.bindingObj(false);

    public creationVisible = AliHub.Common.bindingObj(true);

    public leavingVisible = AliHub.Common.bindingObj(true);

    public keepHide = true;

    public constructor() {
        super();
        this.enable.subscribe((newValue) => {
            if (newValue === false && this._elements.length > 0 && !!this._elements[this._elements.length - 1])
                AliHub.Elements.changeStyleRef(this._elements[this._elements.length - 1].value, null, "ali-websync-page-shot-t");;
        });
    }

    public addAttendee(id: string): AliHub.Web.ResponseTask<Interfaces.UserBindingContract> {
        return this.addAttendeeResolver.resolve({ id: this.id(), user: id });
    }

    public addAttendeeByName(name: string): AliHub.Web.ResponseTask<Interfaces.UserBindingContract> {
        return this.addAttendeeByNameResolver.resolve({ id: this.id(), userName: name });
    }

    public leave(): AliHub.Web.ResponseTask<Date> {
        this.enable(false);
        return this.leaveResolver.resolve(this.id());
    }

    public availableList(): AliHub.Web.ResponseTask<Interfaces.RoomBindingContract[]> {
        return this.availableListResolver.resolve();
    }

    public availableListMonitor(): AsyncLoop<Interfaces.RoomBindingContract[]> {
        var loop = new AsyncLoop<Interfaces.RoomBindingContract[]>();
        loop.commit = () => { return this.availableList(); };
        loop.isCompleted = (r) => !!r && r.length > 0;
        return loop;
    }

    public watchElement(id: HTMLElement | string) {
        if (!id) return;
        var element = typeof id === "string" ? AliHub.Elements.getById(id) : id;
        if (!element) return;
        var info: AliHub.Collection.KeyValuePairContract<string, HTMLElement>;
        this._elements.some((ele, i, arr) => {
            if (ele.value !== element) return false;
            info = ele;
            return true;
        });
        this.getActivityId("screenshot").then((r) => {
            if (!element || !r.result) return;
            if (!!info) info.key = r.result;
            else this._elements.push({ key: r.result, value: element });
        });
    }

    public getActivityId(type: string): AliHub.Web.ResponseTask<string> {
        return this.activityResolver.resolve({ type: type });
    }

    public getInfo(): PromiseLike<Interfaces.MessageRequestContract> {
        var deferred = AliHub.Common.deferred<Interfaces.MessageRequestContract>();
        if (typeof html2canvas === "undefined") return deferred.reject().promise();
        if (!html2canvas) return deferred.reject().promise();
        var info: Interfaces.MessageRequestContract = {
            focus: this.position(),
            message: this.message()
        };
        this.position(null);
        if (this._elements.length === 0) {
            return deferred.resolve(info).promise();
        }

        var activity = this._elements[this._elements.length - 1];
        AliHub.Elements.changeStyleRef(activity.value, "ali-websync-page-shot-t");
        html2canvas(activity.value, {
            onrendered: (canvas) => {
                if (!this.keepHide || !this.enable()) AliHub.Elements.changeStyleRef(activity.value, null, "ali-websync-page-shot-t");
                var dataUrl = canvas.toDataURL();
                if ((<any>activity).cache === dataUrl) {
                    deferred.resolve(info);
                    return;
                }

                (<any>activity).cache = dataUrl;
                info.activities = [{
                    type: "screenshot",
                    activity: activity.key,
                    image: {
                        name: AliHub.Common.DateTime.toFullLocaleString(new Date()),
                        type: "url",
                        url: dataUrl
                    }
                }];
                deferred.resolve(info);
            }
        });
        return deferred.promise();
    }

    public process(r: Interfaces.MessagesContract) {
        this.response(r.list);
        this.showPointer();
    }

    public showPointer() {
        if (!this.pointerVisible()) return;
        var list = this.response();
        if (!list) return;
        list.forEach((itemEle, itemIndex, itemArr) => {
            if (!itemEle.focus) return;
            itemEle.focus.forEach((focus, focusI, focusA) => {
                if (!focus.activity || focus.x == null || focus.y == null) return;
                var element: HTMLElement;
                this._elements.some((ele, i, arr) => {
                    if (ele.key !== focus.activity) return false;
                    element = ele.value;
                    return true;
                });

                if (!element) return;
                this._showPointer(focus.activity, element, focus.x, focus.y, itemEle.name, this.pointerTimeout);
            });
        });
    }

    public getPosition(id: string | HTMLElement, activity: string) {
        if (!id) return;
        var element = typeof id === "string" ? AliHub.Elements.getById(id) : id;
        if (!element) return;
        var focus = <Interfaces.ScreenCoordinate>AliHub.Elements.getMousePosition(element);
        focus.activity = activity;
        this.position([focus]);
    }

    private _showPointer(id: string, element: HTMLElement, x: number, y: number, title: string, timeout: number) {
        var elementPosition = AliHub.Elements.getPosition(element);
        if (!elementPosition) return;
        var pointerEle = document.createElement("div");
        pointerEle.innerHTML = "&nbsp;";
        pointerEle.className = "ali-websync-pointer-remote-dot";
        pointerEle.title = title;
        pointerEle.style.position = "absolute";
        pointerEle.style.top = (y + elementPosition.y).toString() + "px";
        pointerEle.style.left = (x + elementPosition.x).toString() + "px";
        document.body.appendChild(pointerEle);
        setTimeout(() => {
            if (!!pointerEle) pointerEle.outerHTML = "";
        }, this.pointerTimeout);
    }

}

export module Interfaces {

    export interface UserBindingContract extends AliHub.Common.SimpleEntryContract {
        state: string;
    }

    export interface RoomBindingContract extends AliHub.Common.IdentifiedContract {
        state: string;
        invitor?: AliHub.Common.IdentifiedContract;
    }

    export interface ScreenCoordinate extends AliHub.Common.PlaneCoordinate {
        activity: string
        [property: string]: any;
    }

    export interface ScreenshotActivityContract {
        type: string;   // type = "screenshot"
        activity: string;
        image: AliHub.Graph.UrlImageContract;
        [property: string]: any;
    }

    export interface MessageRequestContract {
        focus?: ScreenCoordinate[];
        message?: string;
        activities?: ScreenshotActivityContract[];
        [property: string]: any;
    }

    export interface MessageResponseContract extends MessageRequestContract, UserBindingContract {
    }

    export interface MessagesContract {
        list: MessageResponseContract[];
    }

}
