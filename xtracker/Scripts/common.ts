/*  --------------------
 *  Premium library - XTracker - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  common.ts
 *  Description  Common library of XTracker client SDK.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

export namespace XTrackerInterfaces {
    export interface RecordData {
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

declare var XTracker: {

    init(config?: {
        appname: string,
        sampling?: number;
        key?: "alikf.1.1" | string;
        checksum?: "H46717801" | string;
        [property: string]: any;
    }),

    bhr: {
        initConfig(config?: {
            appname: string,
            [property: string]: any;
        });
        getConfig(): any;
        getTokens(): any;
        startSession(config?: {
            sessionType?: string
            [property: string]: any;
        }): string;
        startSessionWithToken(config?: {
            token?: string,
            sessionType?: string
            [property: string]: any;
        }),
        endSession(token: string);
        record(token: string, data: XTrackerInterfaces.RecordData);
        [property: string]: any;
    },

    qty: {
        init(config);
        error(msg, subtype, extraData);
        warn(msg, subtype, extraData);
        log(msg, subtype, extraData);
        [property: string]: any;
    },

    [property: string]: any;
};

export type ScreenshotImageContract = AliHub.Graph.UrlImageContract & {
    upload?: any,
    ref: {
        created: Date,
        rendered: Date,
        tagName?: string,
        elementId?: string,
        source: "screenshot",
        x?: number,
        y?: number,
        scrollX?: number,
        scrollY?: number,
        model?: any
    }
};

export type ScreenshotBlobImageContract = AliHub.Graph.ImageContract & {
    type: "blob",
    blob: Blob,
    name?: string,
    upload?: any,
    ref: {
        created: Date,
        rendered: Date,
        tagName?: string,
        elementId?: string,
        source: "screenshot",
        x?: number,
        y?: number,
        scrollX?: number,
        scrollY?: number,
        model?: any
    }
};

export interface UrlTemplatesContract {
    uploadScreen?: string;
    resolveTrace?: string;
}

var _set = {
    instance: null as Client
};

var moduleName = "Ali.XTracker";
export var templates = AliHub.Res.templates(moduleName, true);

export var urlTemplates: UrlTemplatesContract = null;

(function () {
    // Language pack "en" (default).
    var lp = {
        diagnostic: "Diagnostic",
        problem: "Problem?",
        back: "Back",
        previous: "Previous",
        next: "Next",
        refresh: "Refresh",
        close: "Close"
    };
    templates.strings.reg("ww", lp);
    templates.strings.reg("en", lp);

    // Language pack "zh-Hans".
    var lp = {
        diagnostic: "诊断",
        problem: "哎呀，遇到问题了？",
        back: "后退",
        previous: "向前",
        next: "向后",
        refresh: "刷新",
        close: "关闭"
    };
    templates.strings.reg("zh-Hans", lp);
    templates.strings.reg("zh-CN", lp);
    templates.strings.reg("zh-SG", lp);

    // Language pack "zh-Hant".
    var lp = {
        diagnostic: "診斷",
        problem: "哎呀，遇到問題了？",
        back: "後退",
        previous: "向前",
        next: "向後",
        refresh: "刷新",
        close: "關閉"
    };
    templates.strings.reg("zh-Hant", lp);
    templates.strings.reg("zh-TW", lp);
    templates.strings.reg("zh-HK", lp);
    templates.strings.reg("zh-MO", lp);

    // SVGs.
    templates.svg("bug", `<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-7.000000, 1.000000)">
                <path d="M29.3443709,12.4205298 L27.3774834,12.4205298 C27.3046358,11.1821192 26.9403974,9.98013245 26.3576159,8.92384106 C27.705298,8.59602649 28.6887417,7.50331126 28.6887417,6.22847682 C28.6887417,5.90066225 28.397351,5.64569536 28.0331126,5.64569536 C27.6688742,5.64569536 27.3774834,5.90066225 27.3774834,6.22847682 C27.3774834,7.10264901 26.6490066,7.79470199 25.7019868,7.90397351 C25.4834437,7.61258278 25.2284768,7.32119205 24.9735099,7.02980132 C24.8278146,6.88410596 24.6821192,6.7384106 24.5364238,6.62913907 C24.718543,6.1192053 24.7913907,5.60927152 24.7913907,5.09933775 C24.7913907,2.29470199 22.1688742,0 18.9635762,0 C15.7582781,0 13.1357616,2.29470199 13.1357616,5.09933775 C13.1357616,5.60927152 13.2450331,6.15562914 13.3907285,6.62913907 C13.2450331,6.77483444 13.0993377,6.88410596 12.9536424,7.02980132 C12.6986755,7.28476821 12.4437086,7.57615894 12.2251656,7.90397351 C11.2781457,7.79470199 10.5496689,7.06622517 10.5496689,6.22847682 C10.5496689,5.90066225 10.2582781,5.64569536 9.89403974,5.64569536 C9.52980132,5.64569536 9.2384106,5.90066225 9.2384106,6.22847682 C9.2384106,7.50331126 10.2218543,8.59602649 11.5695364,8.92384106 C10.986755,9.98013245 10.6589404,11.1821192 10.5496689,12.4205298 L8.65562914,12.4205298 C8.29139073,12.4205298 8,12.6754967 8,13.0033113 C8,13.3311258 8.29139073,13.5860927 8.65562914,13.5860927 L10.6225166,13.5860927 C10.6953642,14.8245033 11.0596026,16.0264901 11.6423841,17.0827815 C10.294702,17.410596 9.31125828,18.5033113 9.31125828,19.7781457 C9.31125828,20.1059603 9.60264901,20.3609272 9.96688742,20.3609272 C10.3311258,20.3609272 10.6225166,20.1059603 10.6225166,19.7781457 C10.6225166,18.9039735 11.3509934,18.2119205 12.2980132,18.102649 C12.5165563,18.3940397 12.7715232,18.6854305 13.0264901,18.9768212 C14.6291391,20.615894 16.7417219,21.4900662 19,21.4900662 C21.2582781,21.4900662 23.3708609,20.5794702 24.9735099,18.9768212 C25.2284768,18.7218543 25.4834437,18.4304636 25.7019868,18.102649 C26.6490066,18.2119205 27.3774834,18.9403974 27.3774834,19.7781457 C27.3774834,20.1059603 27.6688742,20.3609272 28.0331126,20.3609272 C28.397351,20.3609272 28.6887417,20.1059603 28.6887417,19.7781457 C28.6887417,18.5033113 27.705298,17.410596 26.3576159,17.0827815 C26.9403974,16.0264901 27.2682119,14.8245033 27.3774834,13.5860927 L29.3443709,13.5860927 C29.7086093,13.5860927 30,13.3311258 30,13.0033113 C30,12.6754967 29.6721854,12.4205298 29.3443709,12.4205298 L29.3443709,12.4205298 Z M19,1.27483444 C21.3311258,1.27483444 23.1887417,2.91390728 23.1887417,4.95364238 C23.1887417,5.17218543 23.1523179,5.39072848 23.115894,5.60927152 C21.8774834,4.84437086 20.4569536,4.40728477 19,4.40728477 C17.5066225,4.40728477 16.0860927,4.80794702 14.884106,5.60927152 C14.8476821,5.39072848 14.8112583,5.17218543 14.8112583,4.95364238 C14.8112583,2.91390728 16.6688742,1.27483444 19,1.27483444 L19,1.27483444 Z M12.0066225,12.9668874 C12.0066225,9.28807947 14.7384106,6.22847682 18.2350993,5.90066225 L18.2350993,20.0331126 C14.7384106,19.705298 12.0066225,16.6821192 12.0066225,12.9668874 L12.0066225,12.9668874 Z M19.7649007,20.0331126 L19.7649007,5.93708609 C23.2615894,6.26490066 25.9933775,9.28807947 25.9933775,12.9668874 C25.9933775,16.6456954 23.2615894,19.705298 19.7649007,20.0331126 L19.7649007,20.0331126 Z"></path>
            </g>
        </g>
    </svg>`);
    templates.svg("close", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
        <g id="XMLID_321_">
            <path id="XMLID_328_" d="M17.4,16L27.7,5.7c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L16,14.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4
                L14.6,16L4.3,26.3c-0.4,0.4-0.4,1,0,1.4C4.5,27.9,4.7,28,5,28s0.5-0.1,0.7-0.3L16,17.4l10.3,10.3c0.2,0.2,0.5,0.3,0.7,0.3
                s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L17.4,16z"/>
        </g>
    </svg>`);
    templates.svg("right", `<svg version="1.1" id="SVG_Right" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
        <g id="XMLID_1753_">
            <g id="XMLID_2713_">
                <path id="XMLID_14_" d="M10,30c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4L21.6,16L9.3,3.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0
                    l13,13c0.4,0.4,0.4,1,0,1.4l-13,13C10.5,29.9,10.3,30,10,30z"/>
            </g>
        </g>
    </svg>`);
    templates.svg("left", `<svg version="1.1" id="SVG_Left" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
        <g id="XMLID_1752_">
            <g id="XMLID_2020_">
                <path id="XMLID_15_" d="M23,30c-0.3,0-0.5-0.1-0.7-0.3l-13-13c-0.4-0.4-0.4-1,0-1.4l13-13c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4
                    L11.4,16l12.3,12.3c0.4,0.4,0.4,1,0,1.4C23.5,29.9,23.3,30,23,30z"/>
            </g>
        </g>
    </svg>`);

})();

export function resolveUrlTemplate(key: keyof UrlTemplatesContract, url?: string): string {
    return url || urlTemplates[key] || (AliHub.Web.resolver(moduleName, key) || { pathTemplate: () => { return undefined as string; } }).pathTemplate();
}

export function instance() {
    return XTracker;
}

export function clientInstance(): Client {
    if (!_set.instance) _set.instance = new Client();
    return _set.instance;
}

export function enableClient(forceToRegister = false) {
    if (typeof XTracker === "undefined" && !forceToRegister) return undefined;
    var client = AliHub.Diagnostics.pageAnalyticsClient(clientInstance());
    (XTracker as any).client = client;
    (XTracker as any).Diagnostic = Diagnostic;
    return client;
}

export function record(token: string | (() => string), data: XTrackerInterfaces.RecordData | (() => XTrackerInterfaces.RecordData)) {
    if (typeof XTracker === "undefined") return;
    if (!XTracker || !XTracker.bhr || !XTracker.bhr.record) return;
    try {
        XTracker.bhr.record((typeof token === "function" ? token() : token) as any, (typeof data === "function" ? data() : data) as any);
    } catch (ex) { }
}

/**
  * Gets screenshot for an element.
  * @param element  The element.
  */
export function screenshot(element?: AliHub.Elements.AnyElementReference, model?: any) {
    var deffered = AliHub.Common.deferred<ScreenshotImageContract>();
    if (!(window as any).html2canvas) {
        deffered.reject("not implemented");
        return deffered.promise();
    }

    var ele = element ? AliHub.Elements.getById(element) : document.body;
    if (!ele) {
        deffered.reject("cannot find the element");
        return deffered.promise();
    }

    var currentTime = new Date();
    (window as any).html2canvas(ele, {
        onrendered: (canvas: HTMLCanvasElement) => {
            var dataUrl = canvas.toDataURL();
            var renderedTime = new Date();
            deffered.resolve({
                name: "Element screenshot " + AliHub.Common.DateTime.toFullLocaleString(currentTime),
                type: "url",
                url: dataUrl,
                ref: {
                    created: currentTime,
                    rendered: renderedTime,
                    tagName: ele.tagName,
                    elementId: ele.id,
                    source: "screenshot",
                    model: model
                }
            });
        }
    });

    return deffered.promise();
}

export function screenshotBlob(element?: AliHub.Elements.AnyElementReference, model?: any) {
    var deffered = AliHub.Common.deferred<ScreenshotBlobImageContract>();
    if (!(window as any).html2canvas) {
        deffered.reject("not implemented");
        return deffered.promise();
    }

    var ele = element ? AliHub.Elements.getById(element) : document.body;
    if (!ele) {
        deffered.reject("cannot find the element");
        return deffered.promise();
    }

    var currentTime = new Date();
    var position = AliHub.Elements.getSize(ele, true);
    (window as any).html2canvas(ele, {
        onrendered: (canvas: HTMLCanvasElement) => {
            var blob = canvas.toBlob((r) => {
                if (!r) {
                    deffered.reject("Cannot generate blob.");
                    return;
                }

                var renderedTime = new Date();
                var url: string;
                deffered.resolve({
                    name: "Element screenshot " + AliHub.Common.DateTime.toFullLocaleString(currentTime),
                    type: "blob",
                    blob: r,
                    ref: {
                        created: currentTime,
                        rendered: renderedTime,
                        tagName: ele.tagName,
                        elementId: ele.id,
                        source: "screenshot",
                        x: position.x,
                        y: position.y,
                        scrollX: window.scrollX,
                        scrollY: window.scrollY,
                        model: model
                    },
                    toUrl: () => {
                        if (!url) url = URL.createObjectURL(r);
                        return url;
                    }
                });
            });
        }
    });

    return deffered.promise();
}

/**
  * XTracker.
  * http://gitlab.alibaba-inc.com/xtracker/logger
  */
export class Client implements AliHub.Diagnostics.PageAnalyticsClientContract {

    public mapping = new AliHub.Collection.Mapping<XTrackerInterfaces.RecordData | (() => XTrackerInterfaces.RecordData)>();

    public token = AliHub.Common.listenedObj<string>();

    public autoMapping = false;

    public recorded = new AliHub.Collection.EventHandlers<{ key: string, message: string, parameter: any }>();

    /**
      * Records a stamp.
      */
    public record(key: string, parameter?: any) {
        var data = this.mapping.get(key);
        var msg = (parameter ? (parameter.message || parameter.description || parameter.desc) : null) || key;
        if (this.autoMapping && !data && parameter) {
            data = {
                actionType: key,
                actionDescription: msg,
                extraData: parameter
            };
        }

        this.recordDirectly(data);
        this.recorded.raise({ key: key, message: msg, parameter: parameter });
    }

    /**
      * Records directly.
      */
    public recordDirectly(data: XTrackerInterfaces.RecordData | (() => XTrackerInterfaces.RecordData)) {
        record(this.token, data);
    }

    /**
      * Checks whether the instance is alive.
      */
    public alive(): boolean {
        if (typeof XTracker === "undefined") return false;
        return !!XTracker && !!XTracker.bhr && !!XTracker.bhr.record;
    }

}

export namespace Diagnostic {
    var _innerSettings = {
        screens: [] as ScreenshotImageContract[],
        inputs: [] as InputContract[],
        list: [],
        ignoreClose: true,
        c: null as AliHub.Elements.PeripheralPopupControl,
        recording: null as AliHub.Collection.DisposableArray,
        recorded: null as Date,
        handlers: {
            url: (c: AliHub.Common.ActivityControl, item: ItemContract) => {
                if (!item.id) return;
                Diagnostic.next({
                    id: item.id,
                    name: item.name
                });
            },
            action: (c: AliHub.Common.ActivityControl, item: ItemContract) => {
                if (item.actionData && typeof item.actionData === "function") {
                    if (item.actionData(c, item)) Diagnostic.visible(false, true);
                }
            },
            open: (c: AliHub.Common.ActivityControl, item: ItemContract) => {
                AliHub.Elements.openPage(item.actionData, "_blank", item);
                Diagnostic.visible(false, true);
            }
        } as any
    };

    export type DialogControl = AliHub.Common.ActivityControl & { next(config: PageContract): AliHub.Common.ControlInfoContract };

    export interface SetContract {
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

    export interface InputContract
    {
        type: "click" | "type" | "speak" | "move" | string;
        x?: number;
        y?: number;
        value?: string;
        info?: any;
        created: Date;
    }

    export interface ItemContract {
        id?: string;
        icon?: AliHub.Graph.ImageContract;
        name: string;
        actionType?: string,
        actionData?: any,
        actionHandler?: AliHub.Common.Action1<AliHub.Common.ActivityControl>;
        hidden?: boolean | AliHub.Common.Func<boolean>;
    }

    export interface PageContract {
        id?: string;
        name: string;
        links?: ItemContract[];
        description?: string | string[];
        bannerUrl?: string;
        render?: (ele: HTMLElement) => void;
        last?: boolean;
    }

    export var maxScreenshots = 100;

    export var enableScreenshot = false;

    export function inputHistory() {
        return AliHub.Collection.copy(_innerSettings.inputs);
    }

    export function links() {
        return {
            refresh: {
                name: templates.localString("refresh"),
                actionType: "action",
                actionData: () => {
                    window.location.reload();
                }
            },
            back: {
                name: templates.localString("back"),
                actionType: "action",
                actionData: () => {
                    window.history.back();
                }
            }
        }
    }

    export function push(...items) {
        AliHub.Collection.pushRange(_innerSettings.list, items, true, true);
    }

    export function handler(type: string, handler?: AliHub.Common.Action2<AliHub.Common.ActivityControl, ItemContract>, ignoreIfExist = false): AliHub.Common.Action2<AliHub.Common.ActivityControl, ItemContract> {
        if (!type) return undefined;
        var h = _innerSettings.handlers[type];
        if (arguments.length > 1 && (!ignoreIfExist || !h)) {
            if (handler) _innerSettings.handlers[type] = handler;
            else delete _innerSettings.handlers[type];
            h = _innerSettings.handlers[type];
        }

        return h;
    }

    export function visible(value: boolean, backToHome = false) {
        var c = getControl(!value);
        var cc = c.currentControl() as PageControl;
        if (backToHome || (cc && cc.last)) c.turnTo(0);
        c.styleProp("display", value ? "" : "none");
        if (value) _innerSettings.ignoreClose = true;
    }

    export function next(config: PageContract) {
        if (!config) return null;
        var c = getControl();
        var page = c.add((cid) => {
            var pc = new PageControl(cid);
            pc.itemHandler = (itemModel) => {
                var h = Diagnostic.handler(itemModel.actionType || (c as any).defaultActionType || "url");
                if (h) h(c, itemModel);
                if (itemModel.actionHandler) itemModel.actionHandler(c);
                return false;
            };
            pc.bizId(config.id);
            pc.name(config.name);
            pc.pushDescription(config.description);
            pc.pushLink(config.links);
            pc.last = config.last;
            if (config.render) {
                var cSection = pc.addSection();
                config.render(cSection.getElement());
            }
        }, config);
        return page;
    }

    function getControl(returnNullIfNonExist = false) {
        var c = AliHub.Common.getControl<DialogControl>("ali_pop_diagnostic");
        var refreshHomepage = () => {
            var curItem = c.current();
            if (curItem && curItem.index > 0) {
                c.removeStyleRef("ali-x-state-level-first");
                return;
            }

            if (!curItem) return;
            c.addStyleRef("ali-x-state-level-first");
            var list: ItemContract[] = [];
            var removing = [];
            _innerSettings.list.forEach((item) => {
                if (!item || !item.diagnosticMenu) {
                    removing.push(item);
                    return;
                }

                if (item.getElement && !item.getElement()) {
                    removing.push(item);
                    return;
                }

                var menu: ItemContract[] = typeof item.diagnosticMenu === "function" ? item.diagnosticMenu() : item.diagnosticMenu;
                if (menu) list.push(...AliHub.Collection.toArray(menu));
            });
            AliHub.Collection.remove(_innerSettings.list, removing, true);

            var homeControl = c.getItem(0).control as PageControl;
            homeControl.clearLinks();
            homeControl.pushLink(list);
        };
        if (!c && !returnNullIfNonExist) {
            var ele = AliHub.Elements.getById("ali_pop_diagnostic") || document.createElement("div");
            ele.id = "ali_pop_diagnostic";
            document.body.appendChild(ele);
            c = new AliHub.Common.ActivityControl(ele) as any;
            c.addStyleRef("ali-diagnostics-menu");
            var home = Diagnostic.next({
                name: templates.localString("problem")
            });
            c.changed.add((ev) => {
                refreshHomepage();
            });

            var closeButton = c.createControl("close", AliHub.Elements.ButtonControl) as AliHub.Elements.ButtonControl;
            closeButton.styleRef("ali-x-action-close");
            closeButton.name(templates.localString("close"));
            closeButton.icon({ type: "svg", source: templates.svg("close") });
            closeButton.attr("title", templates.localString("close"));
            closeButton.clicked.add((ev) => {
                visible(false, true);
            });

            var backButton = c.createControl("back", AliHub.Elements.ButtonControl) as AliHub.Elements.ButtonControl;
            backButton.styleRef("ali-x-action-back");
            backButton.name(templates.localString("back"));
            backButton.icon({ type: "svg", source: templates.svg("left") });
            backButton.attr("title", templates.localString("back"));
            backButton.clicked.add((ev) => {
                var cur = c.current();
                if (cur && cur.index > 0) c.back();
                else visible(false, true);
            });

            c.listen("click", (ev) => {
                _innerSettings.ignoreClose = true;
            });
            var autoClose = new AliHub.Collection.DisposableArray();
            autoClose.push(AliHub.Elements.listen(document.body, "click", (ev: MouseEvent) => {
                if (!c || !c.getElement()) {
                    autoClose.dispose();
                    return;
                }

                if (_innerSettings.ignoreClose) {
                    _innerSettings.ignoreClose = false;
                    return;
                }

                Diagnostic.visible(false);
            }));
        }

        if (c) {
            c.next = Diagnostic.next;
            refreshHomepage();
        }

        return c;
    }

    export function screenCapture(element?: AliHub.Elements.AnyElementReference) {
        var promise = screenshot(element);
        promise.then((r: any) => {
            if (_innerSettings.screens.length > 0) {
                var last = _innerSettings.screens[_innerSettings.screens.length - 1];
                if (last && (!r.url || last.url === r.url)) return;
            }

            _innerSettings.screens.push(r);
            var delCount = _innerSettings.screens.length - Diagnostic.maxScreenshots;
            if (delCount > 0) _innerSettings.screens.splice(0, delCount);
        });
        return promise;
    }

    export function resolveScreens() {
        var arr = [];
        _innerSettings.screens.forEach((item) => {
            arr.push(AliHub.Common.Reflection.copy(item));
        });
        return arr;
    }

    export function isRecording() {
        return !!_innerSettings.recording;
    }

    export function record() {
        Diagnostic.cancelRecord();
        var rd = _innerSettings.recording;
        var recorded: Date = null;
        rd.push(
            AliHub.Elements.listen(document.body, "click", (ev: MouseEvent) => {
                if (!ev && typeof event !== "undefined") ev = event as MouseEvent;
                if (recorded >= _innerSettings.recorded || !ev) return;
                _innerSettings.inputs.push({
                    type: "click",
                    x: ev.x,
                    y: ev.y,
                    created: new Date(),
                    info: {
                        mouseButton: ev.button,
                        altKey: ev.altKey,
                        ctrlKey: ev.ctrlKey,
                        shiftKey: ev.shiftKey,
                        metaKey: ev.metaKey
                    }
                });
                if (Diagnostic.enableScreenshot) setTimeout(() => {
                    recorded = new Date();
                    screenCapture().then((r) => {
                        recorded = new Date();
                    });
                }, 200);
            }),
            AliHub.Elements.listen(document.body, "DOMNodeInserted", (ev) => {
                _innerSettings.recorded = new Date();
            })
        );
    }

    export function cancelRecord() {
        if (_innerSettings.recording) _innerSettings.recording.dispose();
        _innerSettings.recording = new AliHub.Collection.DisposableArray();
    }

    export function uploadScreen(item: ScreenshotImageContract | ScreenshotBlobImageContract, urlTemplate: string, parameters: any) {
        if (!item) return null;
        var urlTempl = resolveUrlTemplate("uploadScreen", urlTemplate);
        if ((item as ScreenshotBlobImageContract).blob) {
            var form = new FormData();
            form.append("mime", "image/png");
            form.append("encode", "base64");
            form.append("file", (item as ScreenshotBlobImageContract).blob, item.name);
            form.append("created", (item.ref.created || new Date()).getTime());
            form.append("captureName", item.name);
            form.append("tagName", item.ref.tagName);
            form.append("elementId", item.ref.elementId);
            var request = new XMLHttpRequest();
            request.open("POST", AliHub.Common.Text.format(urlTempl, parameters, true));
            request.send(form);
        }

        var promise = AliHub.Web.resolveByPost(null, urlTempl, parameters, {
            mime: "image/png",
            encode: "base64",
            file: (item as ScreenshotImageContract).url,
            base64: (item as ScreenshotImageContract).url,
            created: (item.ref.created || new Date()).getTime(),
            captureName: item.name,
            tagName: item.ref.tagName,
            elementId: item.ref.elementId
        });
        promise.then((r) => {
            item.upload = r.result;
        });
        return promise;
    }

    export function batchUploadScreens(start?: Date, urlTemplate?: string, tag?: string, id?: string, model?: any) {
        if (typeof XTracker === "undefined") return;
        var urlTempl = resolveUrlTemplate("uploadScreen", urlTemplate);
        if (!urlTempl) return;
        AliHub.Collection.copy(_innerSettings.screens).reverse().forEach((item, index) => {
            if (!item || !item.url || !item.ref || item.upload) return;
            Diagnostic.uploadScreen(item, urlTempl, { type: "screenshot", tag: tag, start: start ? start.getTime() : null, index: index, id: id, model: model });
        });
    }

    export function resolveTaskTrace(id: string) {
        return AliHub.Web.resolve(null, resolveUrlTemplate("resolveTrace"), { id: id });
    }

    export class PageControl extends AliHub.Common.VisualControl {

        public bizId = AliHub.Common.listenedObj<string>();

        public name = AliHub.Common.listenedObj<string>();

        public itemHandler: AliHub.Common.Action1<ItemContract>;

        public last = false;

        /**
          * Initializes a new instance of the PageControl class.
          * @param id  The element to render.
          */
        public constructor(id: AliHub.Common.VisualControlElementContract) {
            super(id);
            this.styleRef("ali-control-xtracker-page");
            this.appendElementByDef(
                {
                    idSuffix: "title",
                    tagName: "h5",
                    style: {
                        display: "none"
                    }
                },
                {
                    idSuffix: "desc",
                    tagName: "div",
                    style: {
                        display: "none"
                    }
                },
                {
                    idSuffix: "options",
                    tagName: "ul",
                    style: {
                        display: "none"
                    }
                }
            );
            this.name.subscribe((newValue) => {
                var ele = this.getChildElement("title");
                if (!ele) return;
                ele.innerHTML = AliHub.Common.Text.toHTML(newValue, true);
                ele.style.display = newValue ? "" : "none";
            });
        }

        public pushDescription(...text: (string | string[])[]) {
            var arr = [];
            text.forEach((lines) => {
                AliHub.Collection.toStringArray(lines, true).forEach((line) => {
                    if (!line) return;
                    arr.push(line);
                    this.appendElementByDefToChild("desc", {
                        tagName: "p",
                        innerHTML: {
                            encode: true,
                            value: line
                        }
                    });
                });
            });
            if (arr.length > 0) {
                var ele = this.getChildElement("desc");
                if (ele) ele.style.display = "";
            }
            return arr;
        }

        public clearDescription() {
            var ele = this.getChildElement("desc");
            if (!ele) return;
            ele.style.display = "none";
            ele.innerHTML = "";
        }

        public pushLink(...link: (ItemContract | ItemContract[])[]) {
            var arr = [];
            link.forEach((items) => {
                AliHub.Collection.toArray(items, true).forEach((item) => {
                    if (!item || item.hidden === true || (typeof item.hidden === "function" && item.hidden())) return;
                    arr.push(item);
                    var icon = item.icon ? AliHub.Graph.imageElement(item.icon) : null;
                    var iconDef: AliHub.Elements.SubElementDefinitionContract = icon
                        ? {
                            children: [
                                {
                                    element: icon
                                }
                            ]
                        }
                        : {
                            innerHTML: templates.svg("right")
                        };
                    iconDef.tagName = "span";
                    iconDef.styleRef = "ali-x-section-icon";
                    this.appendElementByDefToChild("options", {
                        tagName: "li",
                        children: [
                            {
                                tagName: "a",
                                events: {
                                    click: (ev) => {
                                        this.itemHandler(item);
                                        return false;
                                    }
                                },
                                children: [
                                    iconDef,
                                    {
                                        tagName: "span",
                                        styleRef: "ali-x-section-name",
                                        innerHTML: {
                                            encode: true,
                                            value: item.name
                                        }
                                    }
                                ]
                            }
                        ],
                        ready: (dom: any) => {
                            dom._xLinkItemModel = item;
                        }
                    });
                });
            });
            if (arr.length > 0) {
                var ele = this.getChildElement("options");
                if (ele) ele.style.display = "";
            }

            return arr;
        }

        public clearLinks() {
            var ele = this.getChildElement("options");
            if (!ele) return;
            ele.style.display = "none";
            ele.innerHTML = "";
        }

        public addSection(c?: (ele: HTMLElement) => void, idSuffix?: string) {
            var ele = document.createElement("section");
            ele.id = AliHub.Elements.mergeId(this.getId(), [idSuffix || ("_ccc" + this.increaseNumber())]);
            this.getElement().insertBefore(ele, this.getChildElement("options"));
            if (!c) return new AliHub.Common.VisualControl(ele);
            c(ele);
            return AliHub.Common.getControl(ele);
        }

    }
}

if (typeof XTracker !== "undefined") {
    (XTracker as any).Client = Client;
    (XTracker as any).registerToQuark = enableClient;
    (XTracker as any).Diagnostic = Diagnostic;
}
