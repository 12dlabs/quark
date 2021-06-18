/*  --------------------
 *  Elements - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  elements.ts
 *  Description  Elements library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

/// <reference path="maths.ts" />

namespace AliHub.Elements {

    export type AnyElementReference = string | HTMLElement | Window | Document | Common.VisualControl | Common.Func<string> | Common.Func<HTMLElement> | Common.Func<Window> | Common.Func<Document> | Common.Func<Common.VisualControl>;

    export type EventElementReferences = string | Element | Window | Document | Worker | Common.VisualControl | Common.Func<string> | Common.Func<Element> | Common.Func<Window> | Common.Func<Document> | Common.Func<Worker> | Common.Func<Common.VisualControl>;

    export type PeripheralPopupControl = Common.VisualControl & {
        target(): HTMLElement,
        orientation(): PeripheralOrientations,
        getTargetSize(): Common.PlaneCoordinate | Common.InvalidContract,
        getTargetPosition(): Common.PlaneCoordinate | Common.InvalidContract,
        timeout(): number,
        isMenu(): boolean,
        avoidCloseMenuOnce(value?: boolean): boolean,
        close(): void
    };

    export interface SubElementDefinitionContract {
        tagName?: string;
        idSuffix?: string;
        controlType?: typeof Common.VisualControl,
        options?: boolean | Common.VisualControlOptionsContract<Common.VisualControl> | Common.Func<Common.VisualControlOptionsContract<Common.VisualControl>>;
        styleRef?: string | string[];
        attr?: any;
        attrObjs?: any;
        style?: any;
        events?: any | Common.Func1<Element, any>;
        onClick?: ClickOptionsContract;
        gesture?: GestureActionOptionsContract;
        element?: Element;
        children?: (SubElementDefinitionContract | string)[] | Common.Func1<Element, (SubElementDefinitionContract | string)[]>;
        innerHTML?: string | number | { encode?: boolean | Common.Func1<string, string>, value: string | Common.ListenedObjectContract<string>, template?: string };
        value?: string | Common.ListenedObjectContract<string>;
        prepared?: Common.Action1<Element>;
        ready?: Common.Action1<Element>;
    }

    export interface SimpleElementDefinitionContract {
        tagName?: string;
        styleRef?: string[];
        attr?: any;
        style?: any;
        events?: any | Common.Func1<Element, any>;
        element?: Element;
        children?: (SimpleElementDefinitionContract | string)[] | Common.Func1<Element, (SimpleElementDefinitionContract | string)[]>;
        innerHTML?: string;
        prepared?: Common.Action1<Element>;
        ready?: Common.Action1<Element>;
    }

    /**
      * Action to fill element.
      */
    export interface FillAction {

        /**
          * Fill something to an element.
          */
        (element: HTMLElement): void;
    }

    /**
      * Peripheral popup contract.
      */
    export interface PeripheralPopupContract {

        /**
          * The target element.
          */
        target?: HTMLElement;

        /**
          * The orientation.
          */
        orientation: PeripheralOrientations;

        /**
          * The handler to raise on rendering.
          */
        render: (info: PeripheralPopupControl) => void;

        /**
          * The handler to size adjusting.
          */
        adjust?: (info: PeripheralPopupControl) => void;

        /**
          * Timeout in millisecond.
          */
        timeout?: number;

        /**
          * true if close after another click or tap; otherwise, false.
          */
        isMenu?: boolean;

        /**
          * true if the position is fixed; otherwise, false, absolute, by default.
          */
        fixed?: boolean;
    }

    /**
      * Screen coordinate.
      */
    export interface ScreenCoordinate extends Common.PlaneCoordinate {

        /**
          * Activity identifier.
          */
        activity: string
    }

    /**
      * Collapse panel information.
      */
    export interface CollapseInfoContract {

        /**
          * The target element identifier suffix.
          */
        targetIdPart: string;

        /**
          * The collapse element identifier suffix.
          */
        collapseIdPart: string;

        /**
          * The expand element identifier suffix.
          */
        expandIdPart: string;

        /**
          * A value indicating whether the target is expanded by default.
          */
        isExpanded?: boolean;
    }

    /**
      * Collapse panel options.
      */
    export interface CollapseOptionsContract {

        /**
          * The target panel element.
          */
        target: HTMLElement | string;

        /**
          * The collapse button element.
          */
        collapseButton: HTMLElement | string;

        /**
          * The expand button element.
          */
        expandButton: HTMLElement | string;

        /**
          * A value indicating whether the target is expanded by default.
          */
        isExpanded?: boolean;
    }

    /**
      * Search bar information.
      */
    export interface SearchBarInfoContract {

        /**
          * The input element identifier suffix.
          */
        inputIdPart: string;

        /**
          * The button element identifier suffix.
          */
        buttonIdPart?: string;

        /**
          * Action to provide suggestion.
          */
        suggest?: Common.Func1<string, Web.ResponseTask<any>>;

        /**
          * Action to enter.
          */
        enter?: Common.Func1<string, Web.ResponseTask<any>>;

        /**
          * Time span in millisecond to process in lazy mode.
          */
        lazy?: number;

        /**
          * true if ignore to process suggest handler when enter is occured.
          */
        ignoreSuggestForEnter?: boolean;
    }

    /**
      * Search options.
      */
    export interface SearchOptionsContract {

        /**
          * The search box element identifier suffix.
          */
        target: HTMLInputElement | string;

        /**
          * The button element.
          */
        button?: HTMLElement | string;

        /**
          * Action to provide suggestion.
          */
        suggest?: Common.Func1<string, Web.ResponseTask<any>>;

        /**
          * Action to enter.
          */
        enter?: Common.Func1<string, Web.ResponseTask<any>>;

        /**
          * Time span in millisecond to process in lazy mode.
          */
        lazy?: number;

        /**
          * true if ignore to process suggest handler when enter is occured.
          */
        ignoreSuggestForEnter?: boolean;
    }

    /**
      * Gesture handlers options.
      */
    export interface GestureActionOptionsContract {

        /**
          * The mininum horizontal value to active related gesture handlers.
          */
        minX?: number | Common.BindingObjectContract<number>;

        /**
          * The mininum vertical value to active related gesture handlers.
          */
        minY?: number | Common.BindingObjectContract<number>;

        /**
          * The handler rasied on turning up. The element and distance will be provided.
          */
        turnUp?: Common.Action2<HTMLElement | Window | Document, number>;

        /**
          * The handler rasied on turning right. The element and distance will be provided.
          */
        turnRight?: Common.Action2<HTMLElement | Window | Document, number>;

        /**
          * The handler rasied on turning down. The element and distance will be provided.
          */
        turnDown?: Common.Action2<HTMLElement | Window | Document, number>;

        /**
          * The handler rasied on turning left. The element and distance will be provided.
          */
        turnLeft?: Common.Action2<HTMLElement | Window | Document, number>;

        /**
          * The handler rasied before moving. The element will be provided.
          */
        moveStart?: Common.Action1<HTMLElement | Window | Document>;

        /**
          * The handler rasied after moving. The element and distance will be provided.
          */
        moveEnd?: Common.Action2<HTMLElement | Window | Document, Common.PlaneCoordinate>;

        /**
          * The handler rasied on moving. The element and distance will be provided.
          */
        moving?: Common.Action2<HTMLElement | Window | Document, Common.PlaneCoordinate>;
    }

    /**
      * Scrolling down options.
      */
    export interface ScrollListenerOptionsContract {

        /**
          * Title owner.
          */
        titleOwner?: HTMLElement | string | Common.VisualControl | Common.Func<HTMLElement> | Common.Func<string> | Common.Func<Common.VisualControl>;

        /**
          * Full title bar.
          */
        titleBar?: HTMLElement | string | Common.VisualControl | Common.Func<HTMLElement> | Common.Func<string> | Common.Func<Common.VisualControl>;

        /**
          * Title bar after scrolling down.
          */
        titleShortBar?: HTMLElement | string | Common.VisualControl | Common.Func<HTMLElement> | Common.Func<string> | Common.Func<Common.VisualControl>;

        /**
          * Title height or additional title height if title bar is provided.
          */
        titleHeight?: number | Common.Func<number>;

        /**
          * The style references used for scrolling down.
          */
        hiddenStyleRef?: string | string[];

        /**
          * The rest height to add for computing.
          */
        restHeight?: number | Common.Func<number>;

        /**
          * The handler rasied on scrolling to end.
          */
        scrollEnd?: Common.Func<Web.ResponseTask<any>>;

        /**
          * A value indicating whether the scrolling is end.
          */
        isEnding?: boolean | Common.Func<boolean>;
    }

    /**
      * Options of clicking and tapping handler.
      */
    export interface ClickOptionsContract {

        /**
          * The handler to raise.
          */
        process: Common.Action3<MouseEvent, number, ClickOptionsContract>;

        /**
          * Start for hitting.
          */
        start?: number;

        /**
          * Hitting count.
          */
        count?: number;

        /**
          * The timespan in millisecond for hitting.
          */
        span?: number;
    }

    export interface QuickClicksContract {
        times: number;
        latest?: Date;
        current: Date;
        span: number;
        [property: string]: any;
    }

    export interface ButtonControlOptionsContract extends Common.VisualControlOptionsContract<ButtonControl> {
        name?: string;
        icon?: Graph.ImageContract;
        model?: any;
        span?: number;
        action?: Common.Action1<QuickClicksContract>;
    }

    export interface CheckboxControlOptionsContract extends AliHub.Common.VisualControlOptionsContract<CheckboxControl> {
        name?: string;
        model?: any;
        select?: boolean;
        selected?: (ev: AliHub.Common.ValueChangedArgsContract<boolean>) => void;
        unselectOthers?: boolean;
        checkboxIcon?: Graph.ImageContract;
        radioIcon?: Graph.ImageContract;
    }

    /**
      * Options of shortcut key.
      */
    export interface ShortcutKeyOptionsContract {

        /**
          * The handler to raise.
          */
        process: (ev: KeyboardEvent) => void;

        /**
          * The key pressed.
          */
        key?: string | number;

        /**
          * A flag indicating whether the CTRL key is pressed.
          */
        ctrl?: boolean;

        /**
          * A flag indicating whether the ALT key is pressed.
          */
        alt?: boolean;

        /**
          * A flag indicating whether the SHIFT key is pressed.
          */
        shift?: boolean;
    }

    export interface MessagePackageTokenContract extends Common.DisposableContract {
        track: string;
    }

    var _set = {
        webcomponents: [],
        regMsgHs: null
    };

    function messageHandlers(): MessagePackageInfoContract<any>[]  {
        if (_set.regMsgHs != null) return _set.regMsgHs;
        _set.regMsgHs = [];
        Elements.listen(window, "message", (ev: MessageEvent) => {
            if (ev.data.type != "AliHub.Elements.MessagePackageInfoContract" || !ev.data.track || !ev.data.data) return;
            var msg = ev.data as MessagePackageResultContract<any>;
            var info = Collection.getItem<MessagePackageInfoContract<any>, MessagePackageInfoContract<any>>(_set.regMsgHs, msg, (a, b) => {
                return a.track === b.track;
            });
            if (!info) return;
            info.process({
                timestamp: new Date(),
                data: msg.data,
                origin: ev.origin,
                success: msg.success,
                track: info.track,
                process: info.process
            });
        });

        return _set.regMsgHs;
    }

    export interface MessagePackageInfoContract<T> {
        track: string;
        process: Common.Action1<MessagePackageResultContract<T>>;
    }

    export interface MessagePackageResultContract<T> extends MessagePackageInfoContract<T> {
        success: boolean;
        data: T;
        origin: string;
        timestamp: Date;
    }

    export interface HiddenFormContract extends Common.DisposableContract {
        url(): string;
        method(value?: string): string;
        field(key: string, value?: string): string;
        jsonField<T>(key: string, value: T): T;
        fileField(key: string, change: boolean, mime?: string): PromiseLike<File>;
        getFileField(key: string): File;
        addSet(obj: any);
        remove(...key: string[]): number;
        clear();
        submit<T>(ignoreResult?: boolean): Web.ResponseTask<T>;
    }

    export function hiddenForm(url?: string): HiddenFormContract {
        var container = document.createElement("div");
        container.id = Common.Maths.randomString("page_hidden_r_container_sender");
        container.style.display = "none";
        document.body.appendChild(container);

        var frame = document.createElement("iframe");
        frame.id = container.id + "_iframe";
        frame.name = frame.id;
        container.appendChild(frame);
        var form = document.createElement("form");
        form.id = container.id + "_form";
        form.name = form.id;
        form.target = frame.id;
        form.method = "POST";
        form.action = url || "";
        container.appendChild(form);
        var submit = document.createElement("input");
        submit.type = "submit";
        form.appendChild(submit);

        var info = {} as HiddenFormContract;
        var sent: Date;
        var inputEle = function (key: string): HTMLInputElement {
            if (key == null) return;
            var eles = form.getElementsByTagName("input");
            if (!!eles) for (var i = 0; i < eles.length; i++) {
                var ele = eles[i];
                if (!ele || ele.name !== key) continue;
                return ele;
            }

            return null;
        };
        (info as any).formData = () => {
            var formData: FormData;
            if (typeof FormData !== "undefined") {
                try {
                    if (!!FormData) formData = new FormData(form);
                } catch (ex) { }
            }
            return formData;
        };
        info.url = function (value?: string) {
            if (arguments.length > 0) {
                form.action = value || "";
            }

            return form.action;
        };
        info.method = function (value?: string) {
            if (arguments.length > 0) {
                form.method = value || "";
            }

            return form.method;
        };
        info.field = function (key, value) {
            if (key == null) return;
            key = key.toString();
            var field = inputEle(key);
            if (arguments.length > 1) {
                if (value != null) {
                    if (!field) field = document.createElement("input");
                    field.name = key;
                    field.type = "text";
                    field.value = value.toString();
                    form.appendChild(field);
                } else if (!!field) {
                    field.remove();
                }
            }

            return !!field ? field.value : null;
        };
        info.jsonField = (key, value) => {
            var result = info.field(key, Common.Text.serialize(value));
            return !!result ? eval("(" + result + ")") : null;
        };
        var getFile = (input: HTMLInputElement) => {
            if (!input || !input.tagName || input.tagName.toString().toLowerCase() === "file" || !input.files || input.files.length < 1 || !input.files[0]) return null;
            var file = input.files[0];
            return file;
        };
        info.fileField = (key, change, mime?) => {
            if (!key) return null;
            key = key.toString();
            var deferred = Common.deferred<File>();
            if (key == null) return deferred.reject();
            var field = inputEle(key);
            if (!field) {
                if (!change) return deferred.reject();
                field = document.createElement("input");
                field.type = "file";
                if (!!mime) field.accept = mime;
                field.name = key;
                form.appendChild(field);
                form.enctype = "multipart/form-data";
            }

            if (!change) {
                var file = getFile(field);
                if (!!file) deferred.resolve(file);
                else deferred.reject();
            } else {
                Elements.listenOnce(field, "change", (ev) => {
                    var file = getFile(field);
                    if (!!file) deferred.resolve(file);
                    else deferred.reject();
                });
                field.click();
            }

            return deferred.promise();
        };
        info.getFileField = (key) => {
            var field = inputEle(key);
            return getFile(field);
        };
        info.addSet = (obj) => {
            if (!obj || typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") return;
            for (var prop in obj) {
                if (prop == null || (typeof prop !== "string" && typeof prop !== "number")) continue;
                info.jsonField(prop, obj[prop]);
            }
        };
        info.remove = function (...key: string[]) {
            if (!key) return 0;
            var fields: HTMLInputElement[] = [];
            var eles = form.getElementsByTagName("input");
            var count = eles.length;
            if (!!eles) for (var i = 0; i < eles.length; i++) {
                var ele = eles[i];
                if (!ele || !Collection.contains(key, ele)) continue;
                fields.push(ele);
            }

            var len = count - fields.length;
            fields.forEach((item, i, arr) => {
                item.remove();
            });

            return len;
        };
        info.clear = () => {
            form.innerHTML = "";
        };
        var clickAction = true;
        var listenResult = <T>() => {
            var postUrl = form.action;
            var mark = "&";
            var deferred = Common.deferred<Web.ResponseContract<T>>();
            if (!!postUrl && postUrl.length > 10) {
                var callbackIndex = postUrl.indexOf("&callback=?");
                if (callbackIndex < 0) {
                    callbackIndex = postUrl.indexOf("?callback=?");
                    mark = "?";
                }

                if (callbackIndex < 0) {
                    if (typeof FormData === "undefined") return Common.rejectDeferred(deferred, "Cannot find parameter callback.");
                    clickAction = false;
                    var formData = new FormData(form);
                    if (typeof jQuery !== "undefined") {
                        jQuery.ajax({
                            url: form.action,
                            type: form.method,
                            data: formData,
                            processData: false,
                            contentType: false
                        }).then((actionResult: Web.PackageContract<any>) => {
                            var actionResult = Web.DataPackageJob.upgradePackage(actionResult);
                            if (!actionResult.success) Common.rejectDeferred(deferred, "failed result", actionResult);
                            else deferred.resolve({ result: actionResult.data, timestamp: actionResult.timestamp });
                        }, (actionResult) => {
                            deferred.reject(actionResult);
                        });
                    } else {
                        var oReq = new XMLHttpRequest();
                        try {
                            oReq.onreadystatechange = (ev) => {
                                if (oReq.readyState === 4) {
                                    if (oReq.status == 200) {
                                        var actionResult: Web.PackageContract<any> = eval("(" + oReq.responseText + ")");
                                        var actionResult = Web.DataPackageJob.upgradePackage(actionResult);
                                        if (!actionResult.success) Common.rejectDeferred(deferred, "failed result", actionResult);
                                        else deferred.resolve({ result: actionResult.data, timestamp: actionResult.timestamp });
                                    } else {
                                        deferred.reject(ev);
                                    }
                                }
                            };
                            // oReq.addEventListener("error", (ev) => { deferred.reject(ev); }, false);
                            if (!(info as any).onprogress) (info as any).onprogress = new Collection.EventHandlers<Event>();
                            oReq.upload.addEventListener("progress", (ev) => { (info as any).onprogress.raise(ev); }, false);
                        } catch (ex) { }
                        oReq.open(form.method, form.action);
                        oReq.send(formData);
                    }

                    return deferred.promise();
                }

                if (callbackIndex + 11 < postUrl.length) {
                    if (postUrl.indexOf("&", callbackIndex + 1) < 0 && postUrl.indexOf("#", callbackIndex + 1) < 0) return Common.rejectDeferred(deferred, "Parameter callback is invalid.");
                }
            }

            var track = Common.Maths.randomString("AliHub.Elements.hiddenForm");
            postUrl = postUrl.replace(mark + "callback=?", mark + "callback=" + encodeURIComponent(track));
            form.action = postUrl + "&callbacktype=message";
            Elements.listenMessagePackage<T>((r) => {
                var result: Web.ResponseContract<T> = {
                    result: r.data,
                    timestamp: Common.DateTime.parse(r.timestamp)
                };
                if (r.success) {
                    deferred.resolve(result);
                } else {
                    deferred.reject(r.data);
                }
            }, track);
            return deferred.promise();
        };
        info.submit = <T>(ignoreResult?: boolean) => {
            sent = new Date();
            clickAction = true;
            var promise: PromiseLike<T>;
            var formData: FormData;
            if (!!(info as any).formDataConvert && !!(info as any).formData) formData = (info as any).formData();
            if (ignoreResult) {
                var deferred = Common.deferred<T>();
                promise = deferred.promise();
                deferred.resolve(null);
            } else if (!!formData) {
                var oReq = new XMLHttpRequest();
                oReq.withCredentials = true;
                oReq.open(form.method, form.action, true);
                var deferred = Common.deferred<T>();
                promise = deferred.promise();
                oReq.onload = (oEvent) => {
                    if (oReq.readyState === 4 && oReq.status === 200) {
                        if (oReq.status === 200) {
                            var respData = Web.DataPackageJob.upgradePackage<T>(JSON.parse(oReq.responseText));
                            if (respData.success) deferred.resolve(respData.data);
                            else deferred.reject(respData.message);
                        } else {
                            deferred.reject(oReq.statusText);
                        }
                    }
                };

                if (typeof (info as any).formDataConvert === "function") ((info as any).formDataConvert as Function)(formData, oReq);
                oReq.send(formData);
                clickAction = false;
            } else {
                promise = listenResult<T>();
            }

            if (clickAction) submit.click();
            return promise;
        };
        info.dispose = () => {
            try {
                container.remove();
            } catch (ex) {
                if (!!container.outerHTML) container.outerHTML = "";
            }
        };

        return info;
    }

    export function postMessagePackage(contentWindow: Window, track: string, success: boolean, data: any, targetOrigin: string) {
        if (!contentWindow) return;
        try {
            if (!!(contentWindow as any).AliHub && !!(contentWindow as any).AliHub.Elements) {
                (contentWindow as any).AliHub.Elements.manualReceiveMessagePackage(track, success, data);
                return;
            }
        } catch (ex) { }

        if (!contentWindow.postMessage) return;
        contentWindow.postMessage({
            type: "AliHub.Elements.MessagePackageInfoContract",
            track: track,
            success: success,
            data: data,
            timestamp: new Date()
        }, targetOrigin || "*");
    }

    export function manualReceiveMessagePackage(track: string, success: boolean, data: any): boolean {
        if (!track) return false;
        var mhs = messageHandlers();
        var existed = Collection.getItem(mhs, track, (a, b) => {
            return a.track === b;
        });
        if (!existed) return false;
        existed.process({
            timestamp: new Date(),
            data: data,
            process: existed.process,
            success: success,
            origin: null,
            track: track
        });
        Elements.unlistenPackageMessage(track);
        return true;
    }

    export function listenMessagePackage<T>(h: Common.Action1<MessagePackageResultContract<T>>, track?: string): MessagePackageTokenContract {
        if (!h) return Common.Reflection.emptyDisposable() as any;
        if (!track) track = Common.Maths.randomString("AliHub.Elements.listenMessagePackage");
        var info = { track: track, process: h };
        var mhs = messageHandlers();
        var existed = Collection.getItem(mhs, info, (a, b) => {
            return a.track === b.track;
        });

        if (!existed) {
            mhs.push(info);
            return;
        }

        existed.process = info.process;
        info = existed;
        return {
            track: track,
            dispose: () => {
                unlistenPackageMessage(info.track);
            }
        };
    }

    export function unlistenPackageMessage(track: string) {
        Collection.remove(messageHandlers(), [{ track: track }], true, (a, b) => {
            return a.track === b.track;
        });
    }

    export function getControlRegisteredForTag(name: string): typeof Common.VisualControl {
        var rec = Collection.getItem<any, string>(_set.webcomponents, name, "name");
        return !!rec && !!rec.control ? rec.control : undefined;
    }

    export function hasControlRegisteredForTag(): boolean {
        return !!_set.webcomponents && (_set.webcomponents as any[]).length > 0;
    }

    /**
      * Registers element for a specific control.
      * name  the name of tag to register.
      * control  the control name to register.
      */
    export function register(name: string, control: typeof Common.VisualControl) {
        if (!name || name.indexOf("-") < 1) return;
        name = name.toString().toLowerCase();
        if (_set.webcomponents == null) _set.webcomponents = [];
        if (!control) {
            delete _set.webcomponents[name];
            return;
        }

        var rec = Collection.getItem<any, string>(_set.webcomponents, name, "name");
        if (!!rec) {
            rec.control = control;
            return;
        }

        _set.webcomponents.push({
            name: name,
            control: control
        });

        var eleCol = document.getElementsByTagName(name);
        for (var step = 0; step < eleCol.length; step++) {
            try {
                Common.fillControl(eleCol[step] as any, control, true);
            } catch (ex) { }
        }
    }

    /**
      * Registers element for a specific control.
      * name  the name of tag to register.
      * control  the control name to register.
      */
    export function registerControlAsWebComponent(name: string, control: typeof Common.VisualControl, h?: Common.Action1<any>): any {
        if (!name || !control || name.indexOf("-") < 1) return null;
        if (!Object.create || !(document as any).registerElement) return null;
        try {
            var proto = Object.create(HTMLElement.prototype);
            var vct: Common.VisualControl;
            (proto as any).createdCallback = function () {
                var ele = this as HTMLElement;
                if (!ele) return;
                vct = new control(ele);
                vct.loadOptions(true);
            };
            (proto as any).getControl = function () {
                return vct;
            };
            if (!!h) h(proto);
            (document as any).registerElement(name, { prototype: proto });
            return proto;
        } catch (ex) {
            return null;
        }
    }

    export function openPage(url: string, target?: string, data?: any) {
        if (!url) return;
        if (data) url = AliHub.Web.mergeLink(url, data);
        else url = url.toString();
        var tempLink = document.createElement("a");
        tempLink.innerHTML = "Temp";
        tempLink.style.display = "none";
        tempLink.href = url;
        if (target) tempLink.target = target;
        document.body.appendChild(tempLink);
        tempLink.click();
        setTimeout(() => {
            if (!tempLink) return;
            try {
                tempLink.remove();
            } catch (ex) {
                if (tempLink.outerHTML) tempLink.outerHTML = "";
            }
        }, 3000);
    }

    /**
      * Gets top offset of specific element in document.
      * @param element  the element.
      */
    export function getTop(element: string | HTMLElement | Common.VisualControl | Common.Func<HTMLElement> | Common.Func<string> | Common.Func<Common.VisualControl>): number {
        var ele = getById(element);
        if (!ele) return null;
        var offset = ele.offsetTop;
        if (ele.offsetParent != null) offset += getTop(ele.offsetParent as HTMLElement);
        return offset;
    }

    /**
      * Gets left offset of specific element in document.
      * @param element  the element.
      */
    export function getLeft(element: string | HTMLElement | Common.VisualControl | Common.Func<HTMLElement> | Common.Func<string> | Common.Func<Common.VisualControl>): number {
        var ele = getById(element);
        if (!ele) return null;
        var offset = ele.offsetLeft;
        if (ele.offsetParent != null) offset += getLeft(ele.offsetParent as HTMLElement);
        return offset;
    }

    /**
      * Gets the position of the specific element in document.
      * @param element  the element.
      */
    export function getPosition(element: string | HTMLElement | Common.VisualControl | Common.Func<HTMLElement> | Common.Func<string> | Common.Func<Common.VisualControl>): Common.PlaneCoordinate & Common.InvalidContract {
        if (!element) return { invalid: true, message: "element should not be null" } as any;
        var left = getLeft(element);
        var top = getTop(element);
        var result = { x: left, y: top };
        if (left == null || top == null || isNaN(left) || isNaN(top)) (result as any).invalid = true;
        return result;
    }

    /**
      * Gets the position of the mouse in specific element or document.
      * @param element  the optional element as target.
      */
    export function getMousePosition(element?: string | HTMLElement | Common.VisualControl | Common.Func<HTMLElement> | Common.Func<string> | Common.Func<Common.VisualControl>, ev?: MouseEvent): Common.PlaneCoordinate & Common.InvalidContract {
        if (!ev) ev = event as any;
        if (!ev) return { invalid: true, message: "cannot get event" } as any;
        var x = ev.pageX || (ev.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
        var y = ev.pageY || (ev.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
        var evTouches: TouchList = (ev as any).touches;
        if (!!evTouches && !!evTouches.length && evTouches.length > 0 && !!evTouches[0]) {
            if (isNaN(x) || x == null) x = evTouches[0].pageX;
            if (isNaN(y) || y == null) y = evTouches[0].pageX;
        } else {
            evTouches = (ev as any).changedTouches;
            if (!!evTouches && !!evTouches.length && evTouches.length > 0 && !!evTouches[0]) {
                if (isNaN(x) || x == null) x = evTouches[0].pageX;
                if (isNaN(y) || y == null) y = evTouches[0].pageX;
            }
        }

        if (!!element) {
            if (!isNaN(x) && x != null) x -= getLeft(element);
            if (!isNaN(y) && y != null) y -= getTop(element);
        }

        return { x: x, y: y };
    }
    
    /**
      * Gets specific HTML element.
      * @param id  the element identifier or prefix.
      * @param appendingIdParts  the additional identifier parts.
      */
    export function getById<T extends HTMLElement>(element: AnyElementReference, ...appendingIdParts: string[]): T {
        if (!element) {
            if (!appendingIdParts || appendingIdParts.length === 0) return null;
            var mergeEleId = mergeId(null, appendingIdParts);
            return document.getElementById(mergeEleId) as T;
        }

        if (typeof element === "function") element = (element as Common.Func<any>)();
        if (!element) return null;
        if (!!(element as any).jquery && !!(element as any).length && (element as any as HTMLElement[]).length > 0) element = element[0];
        if (!!(element as Document).body || !!(element as Document).documentElement) return document as any;
        if (!!(element as Window).parent && !!(element as Window).scroll) return window as any;
        var id: string = null;
        if (typeof element === "string") {
            id = element;
        } else if (!!(element as Common.VisualControl).getId && !!(element as Common.VisualControl).getElement) {
            if (!appendingIdParts || appendingIdParts.length === 0) return (element as Common.VisualControl).getElement() as T;
            id = (element as Common.VisualControl).getId();
        } else if (!!(element as HTMLElement).tagName) {
            if (!appendingIdParts || appendingIdParts.length === 0) return element as any;
            id = (element as HTMLElement).id;
        }

        if (!id) return null;
        var elementId = mergeId(id, appendingIdParts);
        var ele = document.getElementById(elementId) as T;
        if (!!ele || (!!appendingIdParts && appendingIdParts.length > 0) || typeof element !== "string") return ele;
        if (!!document.querySelector) return document.querySelector(element as string) as T;
        if (typeof jQuery === "undefined") return null;
        if (!jQuery) return null;
        var jDom = jQuery(element as string);
        return !!jDom && jDom.length > 0 ? jDom[0] as T : null;
    }

    /**
      * Checks if an element is in another one.
      * @param test  the element to test.
      * @param container  the container element.
      */
    export function inElement(test: AnyElementReference, container: AnyElementReference): boolean {
        test = Elements.getById(test);
        container = Elements.getById(container);
        if (!test || !container) return false;
        if (test === container) return true;
        var ele: Node = test;
        while (ele.parentNode) {
            ele = ele.parentNode;
            if (ele === container) return true;
        }

        return false;
    }

    /**
      * Creates elements and appends into a container.
      * @param container  the container to append elements.
      * @param children  the elements to create.
      */
    export function createChildren(container: HTMLElement, ...children: (SimpleElementDefinitionContract | string)[]) {
        container = Elements.getById(container);
        if (!container) return [];
        var eles: Element[] = [];
        children.forEach((item) => {
            if (!item) return;
            if (typeof item === "string") {
                var tempEle = document.createElement("div");
                tempEle.innerHTML = item;
                if (tempEle.childNodes) for (var i = 0; i < tempEle.childNodes.length; i++) {
                    var nodeToPush = tempEle.childNodes[i];
                    if (!nodeToPush || !(nodeToPush as any as Element).tagName) continue;
                    container.appendChild(nodeToPush as any as Element);
                    eles.push(nodeToPush as any as Element);
                }

                tempEle.innerHTML = "";
                return;
            }

            var eleItem = item.element as HTMLElement || document.createElement(item.tagName || "div");
            Elements.changeStyleRef(eleItem, (item as any).className);
            Elements.changeStyleRef(eleItem, item.styleRef);
            if (item.style) {
                for (var prop in item.style) {
                    if (!prop || typeof prop !== "string" || !item.style[prop] || typeof item.style[prop] !== "string") continue;
                    eleItem.style[prop] = item.style[prop];
                }
            }

            container.appendChild(eleItem);
            eles.push(eleItem);
            
            if (item.attr) {
                for (var prop in item.attr) {
                    if (!prop || typeof prop !== "string" || !item.attr[prop] || typeof item.attr[prop] !== "string") continue;
                    eleItem.setAttribute(prop, item.attr[prop]);
                }
            }

            if (item.events) {
                var eventsInfo = item.events;
                if (typeof eventsInfo === "function") eventsInfo = eventsInfo(eleItem);
                for (var prop in eventsInfo) {
                    if (!prop || typeof prop !== "string" || !eventsInfo[prop] || typeof eventsInfo[prop] !== "function") continue;
                    Elements.listen(eleItem, prop, eventsInfo[prop]);
                }
            }

            if (item.prepared) item.prepared(eleItem);
            if (item.innerHTML) eleItem.innerHTML = item.innerHTML;
            if (item.children) {
                var childrenInfo = item.children;
                if (typeof childrenInfo === "function") childrenInfo = childrenInfo(eleItem);
                if (childrenInfo instanceof Array) {
                    Elements.createChildren(eleItem, ...childrenInfo);
                }
            }

            if (item.ready) item.ready(eleItem);
        });
        return eles;
    }

    /**
      * Lists child nodes from a specific element or more.
      * @param element  the container element(s).
      * @param tagName  the sub elements tag name array.
      */
    export function childNodes(element: Element | Element[], ...tagName: (string | string[])[]) {
        var eles = AliHub.Collection.toArray(element, true);
        tagName.forEach((tag) => {
            var parents = eles;
            eles = [];
            var tagNames = AliHub.Collection.toStringArray(tag, true);
            parents.forEach((container) => {
                for (var step = 0; step < container.children.length; step++) {
                    var ele = container.children[step];
                    if (!ele || !ele.tagName || tagNames.indexOf(ele.tagName.toString().toLowerCase()) < 0) continue;
                    eles.push(ele)
                }
            });
        });
        return eles;
    }

    /**
      * Changes style references and resolves the list all.
      * @param element  the element.
      * @param adding  the names to add.
      * @param removing  the names to remove.
      */
    export function changeStyleRef(element: HTMLElement | string, adding?: string | string[], removing?: string | string[], reverse = false): string[] {
        if (!element) return [];
        var ele = typeof element === "string" ? document.getElementById(element) : element;
        if (!ele) return null;
        if (reverse) {
            var tmp = adding;
            adding = removing;
            removing = tmp;
        }

        if (ele.className && typeof ele.className === "string") {
            ele.className = Common.Text.trim(Collection.addItem(ele.className, " ", adding, removing));
            return ele.className.split(" ");
        }

        if (!!ele.classList && !!ele.classList.add && !!ele.classList.remove) {
            var addingArr = Collection.toStringArray(adding);
            if (!!addingArr && addingArr.length > 0) {
                var tmpArr = [];
                addingArr.forEach((item, i, arr) => {
                    tmpArr.push(...item.replace("  ", " ").replace("  ", " ").split(" "));
                });
                ele.classList.add(...tmpArr);
            }

            var removingArr = Collection.toStringArray(removing);
            if (!!removingArr && removingArr.length > 0) {
                var tmpArr = [];
                addingArr.forEach((item, i, arr) => {
                    tmpArr.push(...item.replace("  ", " ").replace("  ", " ").split(" "));
                });
                ele.classList.remove(...tmpArr);
            }

            var arr: string[] = [];
            for (var i = 0; i < ele.classList.length; i++) {
                var item = ele.classList[i];
                if (!!item) arr.push(item);
            }

            return arr;
        }

        return [];
    }

    /**
      * Adds style references and resolves the list all.
      * @param element  the element.
      * @param adding  the names to add.
      */
    export function addStyleRef(element: HTMLElement | string, ...adding: string[]): string[] {
        return Elements.changeStyleRef(element, adding);
    }

    /**
      * Removes style references and resolves the list all.
      * @param element  the element.
      * @param removing  the names to remove.
      */
    export function removeStyleRef(element: HTMLElement | string, ...removing: string[]): string[] {
        return Elements.changeStyleRef(element, null, removing);
    }

    /**
      * Changes style references and resolves the list all.
      * @param element  the element.
      * @param adding  the names to add.
      * @param removing  the names to remove.
      */
    export function changeStyleClass(element: HTMLElement | string, adding?: string | string[], removing?: string | string[], reverse = false): string[] {
        return Elements.changeStyleRef(element, adding, removing, reverse);
    }

    /**
      * Adds style references and resolves the list all.
      * @param element  the element.
      * @param adding  the names to add.
      */
    export function addStyleClass(element: HTMLElement | string, ...adding: string[]): string[] {
        return Elements.changeStyleRef(element, adding);
    }

    /**
      * Removes style references and resolves the list all.
      * @param element  the element.
      * @param removing  the names to remove.
      */
    export function removeStyleClass(element: HTMLElement | string, ...removing: string[]): string[] {
        return Elements.changeStyleRef(element, null, removing);
    }

    /**
      * Sanitizes a specific HTML part to text string.
      * @param htmlString  the HTML string to sanitize.
      */
    export function sanitizeHTML(htmlString, emptyForNull = false): string {
        if (!htmlString) return emptyForNull ? "" : null;
        var tmp = document.createElement('div');
        tmp.appendChild(document.createTextNode(htmlString));
        return tmp.innerHTML;
    }

    /**
      * Merges an identifier.
      * @param prefix  the identifier prefix.
      * @param idParts  the additional identifier parts.
      */
    export function mergeId(prefix: HTMLElement | string, idParts: string[]): string {
        var elementId = !!prefix ? (typeof prefix === "string" ? prefix : prefix.id) : "";
        if (!elementId) elementId = "";
        if (!idParts) return elementId;
        idParts.forEach((ele, i, arr) => {
            if (!ele) return;
            if (elementId !== "") elementId += "_";
            elementId += ele;
        });

        return elementId;
    }

    /**
      * Gets query information collection from URL.
      */
    export function getQueryInfo(url?: string, emptyStringForNull = false, notToDecode = false): Collection.StringPropertiesContract {
        url = url || location.search;
        if (!url) return [];
        var questionMarkPosition = url.indexOf("?");
        if (questionMarkPosition > 0) url = url.substring(questionMarkPosition + 1);
        var query = url.split("&");
        var result: Collection.StringPropertiesContract = [];
        if (query) for (var step = 0; step < query.length; step ++) {
            var prop = query[step];
            if (!prop) return;
            var propArr = prop.split("=");
            var key = propArr[0];
            var iValue = (propArr.length > 1 ? propArr[1] : null) || (emptyStringForNull ? "" : null);
            if (!!iValue && !notToDecode) iValue = decodeURIComponent(iValue)
            result.push({ key: key, value: iValue });
        }

        return result;
    }

    /**
      * Gets query information object from URL.
      */
    export function getQueryObj(url?: string, emptyStringForNull = false, notToDecode = false): Collection.DictionaryContract<string> {
        url = url || location.search;
        if (!url) return {};
        var questionMarkPosition = url.indexOf("?");
        if (questionMarkPosition > 0) url = url.substring(questionMarkPosition + 1);
        var query = url.split("&");
        var result = {};
        if (query) for (var step = 0; step < query.length; step ++) {
            var prop = query[step];
            if (!prop) return;
            var propArr = prop.split("=");
            var key = propArr[0];
            var iValue = (propArr.length > 1 ? propArr[1] : null) || (emptyStringForNull ? "" : null);
            if (!!iValue && !notToDecode) iValue = decodeURIComponent(iValue)
            result[key] = iValue;
        }

        return result as any;
    }

    /**
      * Gets query property by given name from URL.
      * @param name  the property name.
      */
    export function getQuery(name: string | number, notToDecode = false): string {
        return Elements.getStringQuery(location.search, name, notToDecode);
    }

    /**
      * Gets query property by given name from URL.
      * @param name  the property name.
      */
    export function getStringQuery(url: string, name: string | number, notToDecode = false): string {
        url = url || location.search;
        if (name == null) return null;
        try {
            if (typeof name === "string") {
                var result = url.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
                if (result == null || result.length < 1) {
                    return "";
                }

                return notToDecode ? result[1] : decodeURIComponent(result[1]);
            } else if (typeof name === "number") {
                var result = url.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));
                if (result == null) {
                    return "";
                }

                return notToDecode ? result[name].substring(1) : decodeURIComponent(result[name].substring(1));
            }
        } catch (ex) { }

        return null;
    }

    export function queryField(key: string, value: any): string {
        if (!key) return null;
        if (value == null) value = "";
        if (typeof value === "function") value = value();
        if (value instanceof Date) value = Common.DateTime.toNumberString(value);
        if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") value = "";
        return encodeURIComponent(key) + "=" + (value != null ? encodeURIComponent(value.toString()) : "");
    }

    /**
      * Gets full query string for URL.
      * @param value  the query information collection.
      */
    export function toQueryString(value: any | Collection.StringPropertiesContract): string {
        if (!value || value.length < 1) return "";
        var str = "";
        if (typeof value === "function") value = value();
        if (Collection.isArray(value)) {
            value.forEach((iV, iI, iA) => {
                if (iV && iV.key) str += "&" + Elements.queryField(iV.key, iV.value);
            });
        } else {
            for (var ele in value) {
                if (ele == null) continue;
                if (typeof ele !== "string" && typeof ele !== "number") continue;
                ele = ele.toString();
                var eleValue = value[ele];
                var field = Elements.queryField(ele, value[ele]);
                if (!field) continue;
                str += "&" + Elements.queryField(ele, value[ele]);
            }
        }

        return str.length > 0 ? str.substring(1) : "";
    }

    /**
      * Gets page address without query and hash.
      */
    export function getPageAddress(includePort?: boolean): string {
        return window.location.protocol + "//" + window.location.host + (includePort ? (":" + window.location.port) : "") + window.location.pathname;
    }

    /**
      * Requests full screen.
      */
    export function fullScreen(element?: AnyElementReference): HTMLElement {
        if (arguments.length > 0) {
            var ele = Elements.getById(element);
            if (!ele) return;
            try {
                var requestMethod = (ele as any).requestFullScreen || ele.requestFullscreen || ele.webkitRequestFullScreen || ele.webkitRequestFullscreen || (ele as any).mozRequestFullScreen || (ele as any).msRequestFullScreen;
                if (!!requestMethod) {
                    requestMethod.call(ele);
                } else if (typeof (window as any).ActiveXObject !== "undefined") {
                    var wscript = new ActiveXObject("WScript.Shell");
                    if (!!wscript) wscript.SendKeys("{F11}");
                }
            } catch (ex) { }
        }

        return (document as any).fullScreenElement || document.fullscreenElement || (document as any).webkitFullScreenElement || document.webkitFullscreenElement || (document as any).mozFullScreenElement || (document as any).msFullScreenElement;
    }

    /**
      * Cancels full screen.
      */
    export function cancelFullScreen() {
        try {
            if (!!(document as any).cancelFullScreen) (document as any).cancelFullScreen();
            else if (!!(document as any).cancelFullscreen) (document as any).cancelFullscreen();
            else if (!!document.fullscreenElement) document.webkitCancelFullScreen();
            else if (!!(document as any).webkitCancelFullscreen) (document as any).webkitCancelFullscreen();
            else if (!!(document as any).mozCancelFullScreen) (document as any).mozCancelFullScreen();
            else if (!!(document as any).msCancelFullScreen) (document as any).msCancelFullScreen();
        } catch (ex) { }
    }

    /**
      * Adds an event listener to a target element.
      * @param element  the target element.
      * @param eventType  the type of event.
      * @param h  the event handler to add.
      */
    export function listen(element: EventElementReferences, eventType: string, h: (ev: Event) => void): Common.DisposableContract {
        if (!element || !h || !eventType || eventType.toString() == "") return Common.Reflection.emptyDisposable();
        if (typeof element === "function") element = (element as any)();
        if (!!(element as any).jquery && !!(element as any).length && (element as any as HTMLElement[]).length > 0) element = element[0];
        if (typeof element === "string") element = Elements.getById(element as string);
        if (!!(element as any).get_element) element = (element as any).getElement();
        eventType = eventType.toString();
        if (!!(element as Element).addEventListener) (element as Element).addEventListener(eventType, h, false);
        else if (!!(element as any).attachEvent) (element as any).attachEvent("on" + eventType, h);
        return {
            eventType: eventType,
            handler: h,
            dispose: () => {
                if (!!(element as Element).removeEventListener) (element as Element).removeEventListener(eventType, h, false);
                else if (!!(element as any).detachEvent) (element as any).detachEvent("on" + eventType, h);
            },
            process: (ev: Event) => {
                h(ev);
            }
        };
    }

    /**
      * Adds an event listener only once to a target element.
      * @param element  the target element.
      * @param eventType  the type of event.
      * @param h  the event handler to add.
      */
    export function listenOnce(element: EventElementReferences, eventType: string, ...h: ((ev: Event) => void)[]): Common.DisposableContract {
        if (!h || h.length < 1) return Common.Reflection.emptyDisposable();
        var list = [];
        var handler = (ev: Event) => {
            list.forEach((hi, hIndex, hA) => {
                hi(ev);
            });
        };
        list.push((ev) => {
            unlisten(element, eventType, handler);
        }, ...h);
        return listen(element, eventType, handler);
    }

    /**
      * Adds an event listener later and only once to a target element.
      * @param element  the target element.
      * @param eventType  the type of event.
      * @param h  the event handler to add.
      */
    export function listenOnceLater(element: EventElementReferences, eventType: string, ...h: ((ev: Event) => void)[]): PromiseLike<Common.DisposableContract> {
        var promise = Common.deferred<Common.DisposableContract>();
        setTimeout(() => {
            var result = Elements.listenOnce(element, eventType, ...h);
            if ((result as any).useless) promise.reject(result);
            else promise.resolve(result);
        }, 0);
        return promise.promise();
    }

    /**
      * Adds an event listener to a target element.
      * @param element  the target element.
      * @param eventType  the type of event.
      * @param h  the event handler to add.
      */
    export function addEvent(element: EventElementReferences, eventType: string, h: (ev: Event) => void): Common.DisposableContract {
        return listen(element, eventType, h);
    }

    /**
      * Removes an event listener from a target element.
      * @param element  the target element.
      * @param eventType  the type of event.
      * @param h  the event handler to add.
      */
    export function unlisten(element: EventElementReferences, eventType: string, h: (ev: Event) => void): void {
        if (!element || !h || !eventType || eventType.toString() == "") return;
        if (typeof element === "function") element = (element as any)();
        if (!!(element as any).jquery && !!(element as any).length && (element as any as HTMLElement[]).length > 0) element = element[0];
        if (typeof element === "string") element = Elements.getById(element as string);
        if (!!(element as any).get_element) element = (element as any).getElement();
        eventType = eventType.toString();
        if (!!(element as Element).removeEventListener) (element as Element).removeEventListener(eventType, h, false);
        else if (!!(element as any).detachEvent) (element as any).detachEvent("on" + eventType, h);
    }

    /**
      * Removes an event listener from a target element.
      * @param element  the target element.
      * @param eventType  the type of event.
      * @param h  the event handler to add.
      */
    export function removeEvent(element: EventElementReferences, eventType: string, h: (ev: Event) => void): void {
        unlisten(element, eventType, h);
    }

    /**
      * Processes for all elements.
      */
    export function processAll(container: HTMLElement, h: (element: Element) => void) {
        container = Elements.getById(container);
        if (!container) return;
        var allEles = container.children || document.all;
        for (var i = 0; i < allEles.length; i++) {
            h(allEles[i]);
        }

        Elements.listen(container, "DOMNodeInserted", (event) => {
            var ele = event.target as HTMLElement || event.srcElement;
            if (!ele || !ele.tagName) return;
            h(ele);
        });
    }

    export function parseCssRules(styleContent) {
        if (!styleContent || typeof styleContent !== "string") return [];
        var doc = document.implementation.createHTMLDocument("CSS Loader"),
        styleElement = document.createElement("style");
        styleElement.textContent = styleContent;
        doc.body.appendChild(styleElement);
        return (styleElement.sheet as any).cssRules;
    }

    /**
      * Adds gesture handlers.
      * @param element  the target element.
      * @param options  the options.
      */
    export function addGesture(element: AnyElementReference, options: GestureActionOptionsContract): Common.DisposableContract {
        if (!options) return Common.Reflection.emptyDisposable();
        var ele = Elements.getById(element);
        var minX: number = !!options.minX && typeof options.minX === "function" ? (options as any).minX() : options.minX;
        var minY: number = !!options.minY && typeof options.minY === "function" ? (options as any).minY() : options.minY;
        if (!minX || minX < 0) minX = 1;
        minX = Math.abs(minX);
        if (!minY || minY < 0) minY = 1;
        minY = Math.abs(minY);
        var start: Common.PlaneCoordinate = null;
        var moved = (changed: Common.PlaneCoordinate) => {
            var isX = !changed.y || (Math.abs(changed.x) / Math.abs(changed.y) > (minX + 0.01) / (minY + 0.01));
            if (isX) {
                if (changed.x > minX && !!options.turnLeft) options.turnLeft(ele, changed.x);
                else if (changed.x < -minX && !!options.turnRight) options.turnRight(ele, -changed.x);
            } else {
                if (changed.y > minY && !!options.turnUp) options.turnUp(ele, changed.y);
                else if (changed.y < -minY && !!options.turnDown) options.turnDown(ele, -changed.y);
            }
            if (!!options.moveEnd) options.moveEnd(ele, changed);
        };
        var event1 = Elements.listen(ele, "touchstart", (ev: TouchEvent) => {
            start = {
                x: ev.targetTouches[0].pageX,
                y: ev.targetTouches[0].pageY
            };
            if (!!options.moveStart) options.moveStart(ele);
        });
        var event2 = !!options.moving ? Elements.listen(ele, "touchmove", (ev: TouchEvent) => {
            var point = (ev.touches ? ev.touches[0] : ev) as Touch;
            if (!point) return;
            var coor = {
                x: point.pageX - start.x,
                y: point.pageY - start.y
            };
            options.moving(ele, coor);
        }) : null;
        var event3 = Elements.listen(ele, "touchend", (ev: TouchEvent) => {
            if (start == null) return;
            var changed = {
                x: ev.changedTouches[0].pageX - start.x,
                y: ev.changedTouches[0].pageY - start.y
            };
            start = null;
            moved(changed);
        });
        var event4 = Elements.listen(ele, "mousedown", (ev: MouseEvent) => {
            var mStartP = Elements.getMousePosition();
            var event4a = Elements.listen(document.body, "mousemove", (ev: MouseEvent) => {
                var mCurP = Elements.getMousePosition();
                var coor = {
                    x: mCurP.x - mStartP.x,
                    y: mCurP.y - mStartP.y
                };
                options.moving(ele, coor);
            });
            var event4b = Elements.listenOnce(document.body, "mouseup", (ev: MouseEvent) => {
                event4a.dispose();
                var mCurP = Elements.getMousePosition();
                var changed = {
                    x: mCurP.x - mStartP.x,
                    y: mCurP.y - mStartP.y
                };
                moved(changed);
            });
        });
        return {
            dispose: () => {
                if (!!event1) event1.dispose();
                if (!!event2) event2.dispose();
                if (!!event3) event3.dispose();
                if (!!event4) event4.dispose();
            }
        };
    }

    /**
      * Adds an event handler for clicking or tapping.
      * @param element  the target element.
      * @param options  The options.
      */
    export function onClick(element: string | Element | Window | Worker, options: ClickOptionsContract): Common.DisposableContract {
        if (!options || !options.process || options.count === 0 || options.span === 0) return Common.Reflection.emptyDisposable();
        if (!options.start && options.count == null) {
            return listen(element, "click", (ev) => options.process((ev || event) as any, 0, options));
        }

        var count = 0;
        var time: Date = null;
        return listen(element, "click", (ev) => {
            var timespan = time != null ? Common.DateTime.getSpan(time, new Date) : null;
            time = new Date();
            if (timespan == null || isNaN(timespan) || timespan > (!!options.span ? options.span : 1000)) {
                count = 1;
                return;
            }

            count++;
            var start = !!options.start ? options.start : 0;
            if (count >= start && (options.count == null || options.count > count - start)) options.process((ev || event) as any, count - 1, options);
        });
    }

    /**
      * Added event handler for listening element attribute changing.
      * @param element  the target element.
      * @param attrName  the attribute name to listen; or null for any attribute.
      * @param handler  the handler to raise after attribute changes.
      */
    export function attrChanged(element: AnyElementReference, attrName: string | string[], handler: Common.Action1<Event>) {
        var ele = Elements.getById(element);
        if (!ele || !handler) return Common.Reflection.emptyDisposable();
        if (attrName === null) {
            return Elements.listen(ele, "DOMAttrModified", (ev: any) => {
                handler(ev);
            });
        }

        var names = Collection.toStringArray(attrName);
        if (!names || names.length < 1) return Common.Reflection.emptyDisposable();
        return Elements.listen(ele, "DOMAttrModified", (ev: any) => {
            var attr = ev.attrName || ev.propertyName;
            if (!attr || !names || !names.some((name, ni, narr) => {
                return name === attr;
            })) return;
            handler(ev);
        });
    }

    /**
      * Gets the size of specific element.
      * @param element  the target element.
      */
    export function getSize(element?: AnyElementReference, emptyForNull = false): Common.PlaneCoordinate & Common.InvalidContract {
        if (!element) element = window;
        if (typeof element === "function") element = (element as any)();
        if (typeof element === "string") element = Elements.getById(element as string);
        if (element && (element as any).getElement) {
            element = (element as any as Common.VisualControl).getElement();
        }

        if (!element) return emptyForNull ? { invalid: true, message: "element does not exist." } as any : null;
        if (!!(element as Document).body || !!(element as Document).documentElement) {
            var bodyWidth = !!document.body ? document.body.scrollWidth : 0;
            var documentWidth = !!document.documentElement ? document.documentElement.scrollWidth : 0;
            var bodyHeight = !!document.body ? document.body.scrollHeight : 0;
            var documentHeight = !!document.documentElement ? document.documentElement.scrollHeight : 0;
            return {
                x: bodyWidth > documentWidth ? bodyWidth : documentWidth,
                y: bodyHeight > documentHeight ? bodyHeight : documentHeight
            }
        }

        if (!(element as Window).parent) return {
            x: (element as HTMLElement).offsetWidth,
            y: (element as HTMLElement).offsetHeight
        }

        return {
            x: document.compatMode == "CSS1Compat" ? document.documentElement.clientWidth : document.body.clientWidth,
            y: document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight
        };
    }

    /**
      * Adds a shortcut key for given element.
      * @param element  The target element.
      * @param options  The shortcut key options.
      */
    export function shortcutKey(element: EventElementReferences, options: ShortcutKeyOptionsContract) {
        if (!options || !options.process) return;
        listen(element, "keydown", (event: KeyboardEvent) => {
            if ((options.ctrl && !event.ctrlKey) || (options.alt && !event.altKey) || (options.shift && !event.shiftKey)) return;
            if (options.key != null && options.key != (typeof options.key === "string" ? event.key : event.keyCode)) return;
            options.process(event);
        });
    }

    /**
      * Adapts the height size of given element, window or static number. null for clear adaption.
      * @param element  The target element.
      * @param target  An optional element to compare.
      * @param compute  An optional computing handler.
      */
    export function adaptHeight(element: HTMLElement[] | HTMLElement, target?: HTMLElement | Window | number, compute?: Common.Func1<number, number>) {
        var col: HTMLElement[] = Collection.toArray(element);
        if (!col || col.length < 1) return;

        if (target == null) {
            col.forEach((ele, i, arr) => {
                ele.style.height = "";
            });
            return;
        }

        if (typeof target === "number") {
            if (isNaN(target)) return;
            var num = !!compute ? compute(target) : target;
            if (num != null) {
                var numStr = num + "px";
                col.forEach((ele, i, arr) => {
                    ele.style.height = numStr;
                });
            }

            return;
        }

        if (!(target as Window).parent) {
            adaptHeight(col, (target as HTMLElement).offsetHeight, compute);
            Elements.listen(target as HTMLElement, "resize", (ev) => {
                adaptHeight(col, (target as HTMLElement).offsetHeight, compute);
            });
            return;
        }

        adaptHeight(col, window.innerHeight ? window.innerHeight : document.body.clientHeight, compute);
        if (!!window.addEventListener) window.addEventListener("resize", (ev) => {
            adaptHeight(col, window.innerHeight ? window.innerHeight : document.body.clientHeight, compute);
        });
        else Common.PageController.addResizeEvent(() => {
            adaptHeight(col, window.innerHeight ? window.innerHeight : document.body.clientHeight, compute);
        });
    }

    /**
      * Adapts the width size of given element, window or static number. null for clear adaption.
      * @param element  The target.
      */
    export function adaptWidth(element: HTMLElement[] | HTMLElement, target?: HTMLElement | Window | number, compute?: Common.Func1<number, number>) {
        var col: HTMLElement[] = Collection.toArray(element);
        if (!col || col.length < 1) return;

        if (target == null) {
            col.forEach((ele, i, arr) => {
                ele.style.width = "";
            });
            return;
        }

        if (typeof target === "number") {
            if (isNaN(target)) return;
            var num = !!compute ? compute(num) : target;
            var numStr = num + "px";
            col.forEach((ele, i, arr) => {
                ele.style.width = numStr;
            });
            return;
        }

        if (!(target as Window).parent) {
            adaptWidth(col, (target as HTMLElement).offsetWidth, compute);
            Elements.listen(target as HTMLElement, "resize", (ev) => {
                adaptWidth(col, (target as HTMLElement).offsetWidth, compute);
            });
            return;
        }

        adaptWidth(col, window.innerWidth ? window.innerWidth : document.body.clientWidth, compute);
        if (!!window.addEventListener) window.addEventListener("resize", (ev) => {
            adaptWidth(col, window.innerWidth ? window.innerWidth : document.body.clientWidth, compute);
        });
        else Common.PageController.addResizeEvent(() => {
            adaptWidth(col, window.innerWidth ? window.innerWidth : document.body.clientWidth, compute);
        });
    }

    /**
      * Gets coordinate information for scrolling.
      */
    export function getScroll(): Common.PlaneCoordinate {
        var doc = document.documentElement;
        var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        return { x: left, y: top };
    }

    /**
      * Listens page scrolling down event.
      * This is very useful to implement the auto loading for a list by scrolling down.
      * @param options  the options.
      */
    export function listenScroll(options: ScrollListenerOptionsContract) {
        if (!options) return;
        var isLoadingScrollInfo = Common.Reflection.unwrapObject(options.isEnding) === true;
        var isHiddingHeader = false;
        Elements.listen(window, "scroll", (ev) => {
            try {
                var scrollInfo = Elements.getScroll();
                var windowSize = Elements.getSize(window);
                var docSize = Elements.getSize(document);
                if (!scrollInfo || !windowSize || !docSize) {
                    isLoadingScrollInfo = false;
                    return;
                }

                var hiddenOwner = getById(options.titleOwner);
                if (!!hiddenOwner) {
                    var titleBar = getById(options.titleBar);
                    var titleShortBar = getById(options.titleShortBar);
                    var titleHeight = !!titleBar && !!titleBar.offsetHeight ? titleBar.offsetHeight : 0;
                    if (!!titleShortBar && !!titleShortBar.offsetHeight) titleHeight -= titleShortBar.offsetHeight;
                    var titleHiddenStyleRef = !!options.hiddenStyleRef ? options.hiddenStyleRef.toString() : "ali-container-collapse-m";
                    if (!!options.titleHeight) {
                        var tHeight = Common.Reflection.unwrapObject(options.titleHeight);
                        if (typeof tHeight === "number") titleHeight += tHeight;
                    }

                    if (titleHeight <= 0) titleHeight = 1;
                    if (scrollInfo.y > titleHeight && !isHiddingHeader) {
                        Elements.changeStyleRef(hiddenOwner, titleHiddenStyleRef);
                        isHiddingHeader = !isHiddingHeader;
                    } else if (scrollInfo.y < titleHeight && !!isHiddingHeader) {
                        Elements.changeStyleRef(hiddenOwner, [], titleHiddenStyleRef);
                        isHiddingHeader = !isHiddingHeader;
                    }

                    var restHeight = Common.Reflection.unwrapObject(options.restHeight);
                    if (!restHeight || typeof restHeight !== "number") restHeight = 1;
                    if (scrollInfo.y + windowSize.y + restHeight < docSize.y) {
                        isLoadingScrollInfo = false;
                        return;
                    }
                }

                if (isLoadingScrollInfo) return;
                isLoadingScrollInfo = true;
                if (!options.scrollEnd) {
                    isLoadingScrollInfo = false;
                    return;
                }

                var prom = options.scrollEnd();
                if (!prom || !prom.then) {
                    isLoadingScrollInfo = false;
                    return;
                }

                prom.then(() => {
                    isLoadingScrollInfo = false;
                }, () => {
                    isLoadingScrollInfo = false;
                });
            } catch (ex) {
                isLoadingScrollInfo = false;
                throw ex;
            }
        });
    }

    /**
      * Gets the specific string object of an element.
      * @param element  the element to get attribute.
      * @param name  the attribute name to test one by one. Only the first one matched will be used if it is an array.
      */
    export function getAttr(element: AnyElementReference, name: string | string[]): string {
        var ele = getById(element);
        if (!ele || !name) return undefined;
        var keys = Collection.toStringArray(name);
        var result: string = null;
        keys.some((key, i, arr) => {
            if (!ele.hasAttribute(key)) {
                return false;
            }

            result = ele.getAttribute(key);
            return true;
        });

        return result;
    }

    /**
      * Sets the specific string object of an element.
      * @param element  the element to get attribute.
      * @param name  the attribute name to test one by one.
       * @param value  the value to set.
     */
    export function setAttr(element: AnyElementReference, name: string, value: any): string {
        var ele = getById(element);
        if (!ele || !name) return undefined;
        if (value == null) ele.removeAttribute(name);
        var result = Common.Text.serialize(value);
        ele.setAttribute(name, result);
        return result;
    }

    /**
      * Gets the specific attribute object of an element.
      * @param element  the element to get attribute.
      * @param name  the attribute name.
      * @param dataPrefix  a value indicating whether use "data-" prefix for optional.
      */
    export function parseAttr<T>(element: AnyElementReference, name: string, dataPrefix = false): T {
        if (!name) return undefined;
        var attrStr = Elements.getAttr(element, dataPrefix ? [name, "data-" + name] : name);
        if (attrStr == null) return undefined;
        attrStr = Common.Text.trim(attrStr);
        if (attrStr.indexOf("{{") === 0 && attrStr.length > 4) {
            return eval("(" + attrStr.substring(2, attrStr.length - 2) + ")");
        }

        var indexA = attrStr.indexOf(":");
        var indexB = attrStr.indexOf("{");
        if (indexA > 0 && (indexB < 0 || indexA < indexB)) return eval("({" + attrStr + "})");
        if (indexA < 0 && indexB < 0 && attrStr.indexOf("=") < 0 && attrStr.indexOf("'") < 0 && attrStr.indexOf("\"") < 0 && attrStr.indexOf("(") < 0 && attrStr.indexOf(")") < 0 && attrStr.indexOf(" ") > 0) {
            return attrStr.indexOf(";") >= 0 ? attrStr.split(";") : attrStr as any;
        }

        return eval("(" + attrStr + ")");
    }

    /**
      * Listens attributes changes of a specific element to an object.
      * @param element  the element to get attribute.
      * @param name  the attribute name.
      * @param obj  the object to bind.
      * @param ignoreUndefined  a value indicating whether need ignore undefined.
      * @param dataPrefix  a value indicating whether use "data-" prefix for optional.
      */
    export function listenAttr(element: AnyElementReference, name: string | string[], obj: any, ignoreUndefined = false, dataPrefix = false) {
        if (!element || !name || !obj) return Common.Reflection.emptyDisposable();
        var keys = Collection.toArray(name);
        keys.forEach(function (key, i, arr) {
            var attr = Elements.parseAttr(element, key, dataPrefix);
            if (!ignoreUndefined || attr !== undefined) obj[key] = attr;
        });
        var disp = Elements.attrChanged(element, keys, (ev: any) => {
            var key: string = ev.attrName || ev.propertyName;
            var attr = Elements.parseAttr(element, key);
            if (dataPrefix && key.indexOf("data-") === 0 && !Collection.contains(keys, key.substring(5))) key = key.substring(5);
            if (!ignoreUndefined || attr !== undefined) obj[key] = attr;
        });
        return disp;
    }

    /**
      * Pops up a dialog.
      * @param model  the popup dialog model.
      */
    export function popup(model: PeripheralPopupContract): PeripheralPopupControl {
        if (!model || !model.render) return null;
        var pageWidth = document.body.scrollWidth;
        var pageHeight = document.body.scrollHeight;
        var container = document.createElement("div");
        container.id = Common.Maths.randomString("page_hidden_tips_panel_i");
        container.className = "ali-popup-zone-block";
        var parentEle = Elements.getById("ali_hidden");
        if (parentEle) parentEle.appendChild(container);
        else document.body.appendChild(container);
        var c = new Common.VisualControl(container) as PeripheralPopupControl;
        var target = Elements.getById(model.target);
        var orientation = model.orientation == null ? PeripheralOrientations.Bottom : model.orientation;
        c.target = () => { return target; };
        c.orientation = () => { return orientation; };
        c.getTargetSize = () => { return Elements.getSize(model.target); };
        c.getTargetPosition = () => { return Elements.getPosition(model.target); };
        c.timeout = () => { return model.timeout; };
        c.isMenu = () => { return model.isMenu; };
        var avoidClose = false;
        c.avoidCloseMenuOnce = function (value?: boolean) {
            if (arguments.length > 0) {
                avoidClose = value;
            }

            return avoidClose;
        };
        c.close = () => { c.dispose(); };
        var size = { width: 0, height: 0 };
        var position = !!target ? Elements.getPosition(target) : Elements.getMousePosition(target);
        if (!!target) {
            size.width = target.offsetWidth;
            size.height = target.offsetHeight;
        }

        container.style.position = model.fixed ? "fixed" : "absolute";
        if (position.x < 0) position.x = 0;
        if (position.y < 0) position.y = 0;
        switch (orientation) {
            case PeripheralOrientations.Hidden:
                container.style.position = "hidden";
                break;
            case PeripheralOrientations.Top:
                container.style.bottom = position.y.toString() + "px";
                container.style.left = position.x.toString() + "px";
                break;
            case PeripheralOrientations.Right:
                container.style.top = position.y.toString() + "px";
                container.style.left = (position.x + size.width).toString() + "px";
                break;
            case PeripheralOrientations.Bottom:
                container.style.top = (position.y + size.height).toString() + "px";
                container.style.left = position.x.toString() + "px";
                break;
            case PeripheralOrientations.Left:
                container.style.top = position.y.toString() + "px";
                container.style.right = position.x.toString() + "px";
                break;
            case PeripheralOrientations.Cover:
                container.style.top = position.y.toString() + "px";
                container.style.left = position.x.toString() + "px";
                break;
        }

        model.render(c);
        var cPosition = Elements.getPosition(container);
        if (cPosition.y + container.offsetHeight > pageHeight) {
            if (container.style.top != null && container.style.top.length > 0 && (container.style.bottom == null || container.style.bottom.length < 1) && cPosition.y > container.offsetHeight) {
                container.style.top = "";
                container.style.bottom = "0px";
            } else {
                container.style.bottom = position.y.toString() + "px";
            }
        }

        //if (cPosition.y < 0) {
        //    if (container.style.bottom != null && container.style.bottom.length > 0 && (container.style.top == null || container.style.top.length < 1) && cPosition.y > container.offsetHeight) {
        //        container.style.bottom = "";
        //        container.style.top = (position.y + size.height).toString() + "px";
        //    } else {
        //        container.style.top = "0px";
        //    }
        //}

        if (cPosition.x + container.offsetWidth > pageWidth) {
            if (container.style.left != null && container.style.left.length > 0 && (container.style.right == null || container.style.right.length < 1) && cPosition.x > container.offsetWidth) {
                container.style.left = "";
                container.style.right = "0px";
            } else {
                container.style.right = position.x.toString() + "px";
            }
        }

        //if (cPosition.x < 0) {
        //    if (container.style.right != null && container.style.right.length > 0 && (container.style.left == null || container.style.left.length < 1) && cPosition.x > container.offsetWidth) {
        //        container.style.right = "";
        //        container.style.left = (position.x + size.width).toString() + "px";
        //    } else {
        //        container.style.left = "0px";
        //    }
        //}

        if (!!model.adjust) model.adjust(c);
        if (c.timeout != null && c.timeout() > 0) setTimeout(() => {
            c.close();
        }, c.timeout());
        if (model.isMenu) {
            var clickBody = {
                h: null as (ev: MouseEvent) => void,
                r: () => {
                    Elements.listenOnceLater(document, "click", clickBody.h);
                }
            };
            clickBody.h = (ev) => {
                if (!c.avoidCloseMenuOnce()) {
                    c.close();
                    return;
                }

                c.avoidCloseMenuOnce(false);
                clickBody.r();
            };
            clickBody.r();
        }
        return c;
    }

    export function url(element?: Node) {
        if (!element) return window.location.href;
        if (typeof Blob === "undefined" || typeof URL === "undefined") return null;
        if (!Blob || !URL) return null;
        var mime = "text/xml";
        var str = "";
        if (!!(element as HTMLElement).outerHTML) {
            mime = "text/html";
            str = (element as HTMLElement).outerHTML;
        } else {
            if (typeof XMLSerializer === "undefined") return null;
            if (!XMLSerializer) return null;
            if (!!(element as SVGElement).classList) mime = "image/svg+xml";
            var xs = new XMLSerializer();
            var str = xs.serializeToString(element);
        }

        var blob = new Blob([str], { type: mime });
        return URL.createObjectURL(blob);
    }

    /**
      * Adds lazy search.
      */
    export function lazySearch(options: SearchOptionsContract) {
        if (!options || !options.target) return Common.Reflection.emptyDisposable();;
        var qEle = Elements.getById<HTMLInputElement>(options.target);
        if (!qEle) return Common.Reflection.emptyDisposable();;
        var disp = new Collection.DisposableArray();
        var qStr = qEle.value != null ? qEle.value : qEle.innerHTML;
        var h = !options.suggest ? () => { } : () => {
            var text = qEle.value != null ? qEle.value : qEle.innerHTML;
            if (text == qStr) return;
            var lazy = 300;
            if (options.lazy != null && !isNaN(options.lazy)) lazy = options.lazy;
            setTimeout(() => {
                var newText = qEle.value != null ? qEle.value : qEle.innerHTML;
                if (qStr == newText || text != newText) return;
                qStr = newText;
                options.suggest(qStr);
            }, lazy);
        };
        disp.push(Elements.listen(qEle, "input", (ev) => {
            h();
        }));
        disp.push(Elements.listen(qEle, "paste", (ev) => {
            h();
        }));
        disp.push(Elements.listen(qEle, "cut", (ev) => {
            h();
        }));
        disp.push(Elements.listen(qEle, "blur", (ev) => {
            var text = qEle.value != null ? qEle.value : qEle.innerHTML;
            if (qStr == text || !options.suggest) return;
            qStr = text;
            options.suggest(qStr);
        }));
        disp.push(Elements.listen(qEle, "keydown", (ev: KeyboardEvent) => {
            if (!qEle) return;
            if (ev.keyCode === 13) {
                var text = qEle.value != null ? qEle.value : qEle.innerHTML;
                if (!!options.suggest && !options.ignoreSuggestForEnter) options.suggest(text);
                else qStr = qEle.value != null ? qEle.value : qEle.innerHTML;
                if (!!options.enter) options.enter(text);
                return;
            }

            if (ev.keyCode === 27) {
                if (!!qEle.value) qEle.value = "";
                h();
                return;
            }
        }));
        if (!!options.button) disp.push(Elements.listen(Elements.getById(options.button), "click", (ev) => {
            var text = qEle.value != null ? qEle.value : qEle.innerHTML;
            if (!!options.suggest && !options.ignoreSuggestForEnter) options.suggest(text);
            else qStr = qEle.value != null ? qEle.value : qEle.innerHTML;
            if (!!options.enter) options.enter(text);
        }));
        return disp;
    }

    /**
      * Collapses panel.
      */
    export function collapse(options: CollapseOptionsContract) {
        var targetPanel = Elements.getById(options.target);
        var expandButton = Elements.getById(options.expandButton);
        var collapseButton = Elements.getById(options.collapseButton);
        if (!targetPanel) return Common.Reflection.emptyDisposable();
        var disp = new Collection.DisposableArray();
        if (options.isExpanded) Elements.changeStyleRef(targetPanel, [], "ali-container-collapse-s");
        else Elements.changeStyleRef(targetPanel, "ali-container-collapse-s");
        disp.push(Elements.listen(expandButton, "click", (ev) => {
            Elements.changeStyleRef(targetPanel, [], "ali-container-collapse-s");
        }));
        disp.push(Elements.listen(collapseButton, "click", (ev) => {
            Elements.changeStyleRef(targetPanel, "ali-container-collapse-s");
        }));
        return disp;
    }

    export function bindText(obs: Common.BindingObjectContract<string>, element: Elements.AnyElementReference, ...appendingIdParts: string[]): Common.DisposableContract {
        if (!obs) return { dispose: () => { }, useless: true };
        var h = (newValue) => {
            var dom = Elements.getById(element, ...appendingIdParts);
            if (!!dom) dom.innerHTML = Common.Text.toHTML(!!newValue ? newValue.toString() : "");
        };
        h(obs());
        return obs.subscribe(h);
    }

    export function bindProp(obs: Common.BindingObjectContract<string>, prop: string, element: Elements.AnyElementReference, ...appendingIdParts: string[]): Common.DisposableContract {
        if (!obs) return { dispose: () => { }, useless: true };
        var h = (newValue) => {
            var dom = Elements.getById(element, ...appendingIdParts);
            if (!!dom) dom[prop] = !!newValue ? newValue.toString() : "";
        };
        h(obs());
        return obs.subscribe(h);
    }

    /**
      * Peripheral orientations.
      */
    export enum PeripheralOrientations {
        Hidden = 0,
        Top = 1,
        Right = 2,
        Bottom = 3,
        Left = 4,
        Cover = 5
    }

    /*
     * The button control.
     */
    export class ButtonControl extends Common.VisualControl {

        /**
          * Gets or sets the name of the button.
          */
        public name = Common.listenedObj<string>();

        /**
          * Gets or sets the icon of the button.
          */
        public icon = Common.listenedObj<Graph.ImageContract>();

        /**
          * Adds or removes the event handler after clicking.
          */
        public clicked = new Collection.EventHandlers<QuickClicksContract>();

        /**
          * Gets or sets the data model.
          */
        public model = Common.listenedObj<any>();

        /**
          * Gets or sets a value indicating whether enable name in HTML.
          */
        public enableNameHTML = false;

        /**
          * The timespan in millisecond for multiple hitting.
          */
        public span = 0;

        /**
          * Initializes a new instance of the ButtonControl class.
          * @param id  The element to render.
          */
        public constructor(id: Common.VisualControlElementContract) {
            super(id);
            this.addStyleRef("ali-controls-button");
            var iconContainer = this.appendElement("span", "icon", "ali-x-section-icon");
            var nameContainer = this.appendElement("span", "name", "ali-x-section-name");
            this.name.subscribe((newValue) => {
                nameContainer.innerHTML = this.enableNameHTML ? (newValue || "").toString() : Common.Text.toHTML(newValue, true);
            });
            this.icon.subscribe((newValue) => {
                iconContainer.innerHTML = "";
                if (!newValue) return;
                var iconEle = Graph.imageElement(newValue);
                if (!iconEle) return;
                iconContainer.appendChild(iconEle);
            });
            var latestClicked: Date = null;
            var clickingCount = 0;
            this.listen("click", (ev) => {
                var currentTime = new Date();
                var latestTime = latestClicked;
                try {
                    if (latestClicked != null && latestClicked.getTime) {
                        var diff = currentTime.getTime() - latestClicked.getTime();
                        if (diff >= 0 && diff <= this.span) clickingCount++;
                        else clickingCount = 0;
                    } else {
                        clickingCount = 0;
                    }
                } catch (ex) {
                    clickingCount = 0;
                }

                latestClicked = currentTime;
                this.clicked.raise({
                    times: clickingCount,
                    latest: latestTime,
                    current: currentTime,
                    span: this.span,
                    event: ev || event
                });
            });
        }

        /**
          * Loads specific options.
          * @param options  The options to load. 
          */
        public loadOptions(value: ButtonControlOptionsContract | boolean): any {
            var options: ButtonControlOptionsContract = super.loadOptions(value);
            if (!options) return options;
            if (!!options.name) this.name(options.name);
            if (!!options.icon) this.icon(options.icon);
            if (!!options.model) this.name(options.model);
            if (options.span != null) this.span = options.span;
            if (!!options.action && typeof options.action === "function") this.clicked.add((ev) => {
                options.action(ev);
            });
            return options;
        }
    }

    /**
      * Checkbox and radio control.
      */
    export class CheckboxControl extends Common.VisualControl {

        public name = Common.listenedObj<string>();

        public selected = Common.listenedObj(false);

        public nameIsHTML = Common.listenedObj(false);

        public model = Common.listenedObj<any>();

        public getGroup: Common.Func<(CheckboxControl | HTMLElement | string)[]>;

        public unselectOthers = Common.listenedObj(false);

        public disableSelectByUI = Common.listenedObj(false);

        public checkboxIcon = Common.listenedObj<Graph.ImageContract>();

        public radioIcon = Common.listenedObj<Graph.ImageContract>();

        /**
         * Initializes a new instance of the CheckboxControl class.
         * @param id  The element to render.
         */
        public constructor(id: Common.VisualControlElementContract) {
            super(id);
            this.addStyleRef("ali-controls-checkbox", "ali-x-state-selected-f");
            this.appendElementByDef(
                {
                    idSuffix: "main",
                    styleRef: "ali-container-main",
                    children: [
                        {
                            idSuffix: "select",
                            tagName: "span",
                            styleRef: "ali-x-field-select ali-x-field-select-checkbox",
                            children: [
                                {
                                    element: Graph.imageElement(this.checkboxIcon())
                                }
                            ]
                        },
                        {
                            idSuffix: "name",
                            tagName: "span",
                            styleRef: "ali-x-field-name"
                        }
                    ]
                }
            );
            this.name.subscribe((newValue) => {
                this.refreshName();
            });
            this.nameIsHTML.subscribe((newValue) => {
                this.refreshName();
            });
            this.selected.subscribe((newValue) => {
                this.styleRef(newValue ? "ali-x-state-selected-t" : "ali-x-state-selected-f", newValue ? "ali-x-state-selected-f" : "ali-x-state-selected-t");
                if (!newValue || !this.unselectOthers()) return;
                this.forEachControl((item) => {
                    if (item === this) return;
                    item.selected(false);
                });
            });
            this.listen("click", (ev) => {
                if (this.disableSelectByUI()) return;
                if (!this.unselectOthers() || !this.selected()) this.selected(!this.selected());
            }, "main");
            this.unselectOthers.subscribe((newValue) => {
                var ele = this.getChildElement("main", "select");
                if (!ele) return;
                ele.innerHTML = "";
                var imgEle = Graph.imageElement(newValue ? this.radioIcon() : this.checkboxIcon());
                ele.appendChild(imgEle);
                this.styleRef(newValue ? "ali-x-field-select-radio" : "ali-x-field-select-checkbox", newValue ? "ali-x-field-select-checkbox" : "ali-x-field-select-radio", "main", "select");
            });
            this.checkboxIcon.subscribe((newValue) => {
                var ele = this.getChildElement("main", "select");
                if (!ele || this.unselectOthers()) return;
                ele.innerHTML = "";
                var imgEle = Graph.imageElement(newValue);
                ele.appendChild(imgEle);
            });
            this.radioIcon.subscribe((newValue) => {
                var ele = this.getChildElement("main", "select");
                if (!ele || !this.unselectOthers()) return;
                ele.innerHTML = "";
                var imgEle = Graph.imageElement(newValue);
                ele.appendChild(imgEle);
            });
        }

        /**
          * Loads specific options.
          * @param options  The options to load.
          */
        public loadOptions(value: CheckboxControlOptionsContract | boolean | Common.Func<CheckboxControlOptionsContract>): any {
            var options = super.loadOptions(value) as CheckboxControlOptionsContract;
            if (options.name) this.name(options.name);
            if (options.model != null) this.model(options.model);
            if (options.select) this.selected(options.select);
            if (options.selected) this.selected.listen(options.selected);
            if (options.unselectOthers) this.unselectOthers(true);
            if (options.checkboxIcon) this.checkboxIcon(options.checkboxIcon);
            if (options.radioIcon) this.checkboxIcon(options.checkboxIcon);
            return options;
        }

        public refreshName() {
            var ele = this.getChildElement("main", "name");
            if (!ele) return null;
            var str = (this.nameIsHTML() ? this.name() : Common.Text.toHTML(this.name())) || "";
            ele.innerHTML = str;
            return str;
        }

        public forEachControl(callbackfn: (value: CheckboxControl, index: number, array: CheckboxControl[]) => void, thisArg?: any) {
            var arr: CheckboxControl[] = [];
            if (this.selected()) arr.push(this);
            if (this.getGroup && typeof this.getGroup === "function") {
                var cs = this.getGroup();
                if (cs && cs.forEach) cs.forEach((item) => {
                    var c = Common.getControl<CheckboxControl>(item);
                    if (!c || !c.selected || typeof c.selected !== "function" || Collection.contains(arr, c)) return;
                    arr.push(c);
                });
            }

            if (callbackfn) arr.forEach(callbackfn, thisArg);
            return arr.length;
        }

        public getSelectedModels() {
            var arr = [];
            this.forEachControl((item) => {
                if (!item.selected() || Collection.contains(arr, item.model())) return;
                arr.push(item.model());
            });
            return arr;
        }

        public getSelectedControls() {
            var arr: CheckboxControl[] = [];
            this.forEachControl((item) => {
                if (!item.selected() || Collection.contains(arr, item)) return;
                arr.push(item);
            });
            return arr;
        }

        public setGroupControls(...col: CheckboxControl[][]) {
            var arr: CheckboxControl[] = [this];
            this.unselectOthers(true);
            var groupResolver = () => { return arr; };
            this.getGroup = groupResolver;
            col.forEach((item) => {
                var list = Collection.toArray(item);
                list.forEach((item2) => {
                    var c = Common.getControl<CheckboxControl>(item2);
                    if (!c || !c.selected || typeof c.selected !== "function" || !c.unselectOthers || typeof c.unselectOthers !== "function" || Collection.contains(arr, c)) return;
                    c.unselectOthers(true);
                    c.getGroup = groupResolver;
                    arr.push(c);
                });
            });
            return arr.length;
        }
    }

    /**
      * Collapse panel extender.
      */
    export class CollapseExtender<T> implements Common.BindingControlExtender<T> {

        private _col: CollapseInfoContract[];

        /**
          * Extender name.
          */
        public name: string = "ali-hub-container-expand";

        /**
          * Initializes a new instance of the CollapseExtender class.
          * @param info  The collapse information.
          */
        public constructor(info: CollapseInfoContract[]) {
            this._col = info;
        }

        /**
          * Gets model.
          * @param control  The target control.
          */
        public model(control: Common.BindingControl<T>): any {
            return {
                info: this._col
            };
        }

        /**
          * Loads after done.
          * @param control  The target control.
          */
        public load(control: Common.BindingControl<T>): void {
            var hasSubscribed = false;
            control.subscribeViewModel((newValue) => {
                if (hasSubscribed) return;
                this._col.forEach((info, ii, ia) => {
                    var targetPanel = Elements.getById(control, info.targetIdPart);
                    var expandButton = Elements.getById(control, info.expandIdPart);
                    var collapseButton = Elements.getById(control, info.collapseIdPart);
                    Elements.collapse({
                        target: targetPanel,
                        expandButton: expandButton,
                        collapseButton: collapseButton,
                        isExpanded: info.isExpanded
                    });
                });
                hasSubscribed = true;
            });
        }

    }

    /**
      * Search bar extender.
      */
    export class SearchExtender implements Common.BindingControlExtender<any> {

        private _info: SearchBarInfoContract[] = [];

        /**
          * Extender name.
          */
        public name = "ali-nine-search";

        /**
          * Time span in millisecond to process in lazy mode.
          */
        public lazy = 300;

        /**
          * Auto focus if it contains only one.
          */
        public autoFocus = true;

        /**
          * Initializes a new instance of the SearchExtender class.
          * @param info  The search bar information.
          */
        public constructor(info: SearchBarInfoContract[] | SearchBarInfoContract) {
            this._info = Collection.toArray(info);
        }

        /**
          * Loads after done.
          * @param control  The target control.
          */
        public load(control: Common.BindingControl<any>) {
            if (!this._info) return;
            this._info.forEach((ele, i, arr) => {
                var searchbox = control.getChildElement<HTMLInputElement>(true, ele.inputIdPart);
                var button = !!ele.buttonIdPart ? control.getChildElement(true, ele.buttonIdPart) : null;
                var lazy = this.lazy;
                if (ele.lazy != null && !isNaN(ele.lazy)) lazy = ele.lazy;
                Elements.lazySearch({
                    target: searchbox,
                    button: button,
                    enter: ele.enter,
                    suggest: ele.suggest,
                    lazy: lazy,
                    ignoreSuggestForEnter: ele.ignoreSuggestForEnter
                });
            });

            if (this.autoFocus && this._info.length === 1 && !!this._info[0].inputIdPart) {
                var qEle = control.getChildElement(true, this._info[0].inputIdPart) as HTMLInputElement;
                if (!!qEle && qEle.focus) qEle.focus();
            }
        }

    }

}
