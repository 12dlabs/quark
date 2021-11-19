/*  --------------------
 *  Premium library - XTracker - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  common.ts
 *  Description  Common library of XTracker client SDK.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _set = {
        instance: null
    };
    var moduleName = "Ali.XTracker";
    exports.templates = AliHub.Res.templates(moduleName, true);
    exports.urlTemplates = null;
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
        exports.templates.strings.reg("ww", lp);
        exports.templates.strings.reg("en", lp);
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
        exports.templates.strings.reg("zh-Hans", lp);
        exports.templates.strings.reg("zh-CN", lp);
        exports.templates.strings.reg("zh-SG", lp);
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
        exports.templates.strings.reg("zh-Hant", lp);
        exports.templates.strings.reg("zh-TW", lp);
        exports.templates.strings.reg("zh-HK", lp);
        exports.templates.strings.reg("zh-MO", lp);
        // SVGs.
        exports.templates.svg("bug", "<svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n        <g id=\"Symbols\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n            <g transform=\"translate(-7.000000, 1.000000)\">\n                <path d=\"M29.3443709,12.4205298 L27.3774834,12.4205298 C27.3046358,11.1821192 26.9403974,9.98013245 26.3576159,8.92384106 C27.705298,8.59602649 28.6887417,7.50331126 28.6887417,6.22847682 C28.6887417,5.90066225 28.397351,5.64569536 28.0331126,5.64569536 C27.6688742,5.64569536 27.3774834,5.90066225 27.3774834,6.22847682 C27.3774834,7.10264901 26.6490066,7.79470199 25.7019868,7.90397351 C25.4834437,7.61258278 25.2284768,7.32119205 24.9735099,7.02980132 C24.8278146,6.88410596 24.6821192,6.7384106 24.5364238,6.62913907 C24.718543,6.1192053 24.7913907,5.60927152 24.7913907,5.09933775 C24.7913907,2.29470199 22.1688742,0 18.9635762,0 C15.7582781,0 13.1357616,2.29470199 13.1357616,5.09933775 C13.1357616,5.60927152 13.2450331,6.15562914 13.3907285,6.62913907 C13.2450331,6.77483444 13.0993377,6.88410596 12.9536424,7.02980132 C12.6986755,7.28476821 12.4437086,7.57615894 12.2251656,7.90397351 C11.2781457,7.79470199 10.5496689,7.06622517 10.5496689,6.22847682 C10.5496689,5.90066225 10.2582781,5.64569536 9.89403974,5.64569536 C9.52980132,5.64569536 9.2384106,5.90066225 9.2384106,6.22847682 C9.2384106,7.50331126 10.2218543,8.59602649 11.5695364,8.92384106 C10.986755,9.98013245 10.6589404,11.1821192 10.5496689,12.4205298 L8.65562914,12.4205298 C8.29139073,12.4205298 8,12.6754967 8,13.0033113 C8,13.3311258 8.29139073,13.5860927 8.65562914,13.5860927 L10.6225166,13.5860927 C10.6953642,14.8245033 11.0596026,16.0264901 11.6423841,17.0827815 C10.294702,17.410596 9.31125828,18.5033113 9.31125828,19.7781457 C9.31125828,20.1059603 9.60264901,20.3609272 9.96688742,20.3609272 C10.3311258,20.3609272 10.6225166,20.1059603 10.6225166,19.7781457 C10.6225166,18.9039735 11.3509934,18.2119205 12.2980132,18.102649 C12.5165563,18.3940397 12.7715232,18.6854305 13.0264901,18.9768212 C14.6291391,20.615894 16.7417219,21.4900662 19,21.4900662 C21.2582781,21.4900662 23.3708609,20.5794702 24.9735099,18.9768212 C25.2284768,18.7218543 25.4834437,18.4304636 25.7019868,18.102649 C26.6490066,18.2119205 27.3774834,18.9403974 27.3774834,19.7781457 C27.3774834,20.1059603 27.6688742,20.3609272 28.0331126,20.3609272 C28.397351,20.3609272 28.6887417,20.1059603 28.6887417,19.7781457 C28.6887417,18.5033113 27.705298,17.410596 26.3576159,17.0827815 C26.9403974,16.0264901 27.2682119,14.8245033 27.3774834,13.5860927 L29.3443709,13.5860927 C29.7086093,13.5860927 30,13.3311258 30,13.0033113 C30,12.6754967 29.6721854,12.4205298 29.3443709,12.4205298 L29.3443709,12.4205298 Z M19,1.27483444 C21.3311258,1.27483444 23.1887417,2.91390728 23.1887417,4.95364238 C23.1887417,5.17218543 23.1523179,5.39072848 23.115894,5.60927152 C21.8774834,4.84437086 20.4569536,4.40728477 19,4.40728477 C17.5066225,4.40728477 16.0860927,4.80794702 14.884106,5.60927152 C14.8476821,5.39072848 14.8112583,5.17218543 14.8112583,4.95364238 C14.8112583,2.91390728 16.6688742,1.27483444 19,1.27483444 L19,1.27483444 Z M12.0066225,12.9668874 C12.0066225,9.28807947 14.7384106,6.22847682 18.2350993,5.90066225 L18.2350993,20.0331126 C14.7384106,19.705298 12.0066225,16.6821192 12.0066225,12.9668874 L12.0066225,12.9668874 Z M19.7649007,20.0331126 L19.7649007,5.93708609 C23.2615894,6.26490066 25.9933775,9.28807947 25.9933775,12.9668874 C25.9933775,16.6456954 23.2615894,19.705298 19.7649007,20.0331126 L19.7649007,20.0331126 Z\"></path>\n            </g>\n        </g>\n    </svg>");
        exports.templates.svg("close", "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 32 32\" style=\"enable-background:new 0 0 32 32;\" xml:space=\"preserve\">\n        <g id=\"XMLID_321_\">\n            <path id=\"XMLID_328_\" d=\"M17.4,16L27.7,5.7c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L16,14.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4\n                L14.6,16L4.3,26.3c-0.4,0.4-0.4,1,0,1.4C4.5,27.9,4.7,28,5,28s0.5-0.1,0.7-0.3L16,17.4l10.3,10.3c0.2,0.2,0.5,0.3,0.7,0.3\n                s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L17.4,16z\"/>\n        </g>\n    </svg>");
        exports.templates.svg("right", "<svg version=\"1.1\" id=\"SVG_Right\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 32 32\" style=\"enable-background:new 0 0 32 32;\" xml:space=\"preserve\">\n        <g id=\"XMLID_1753_\">\n            <g id=\"XMLID_2713_\">\n                <path id=\"XMLID_14_\" d=\"M10,30c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4L21.6,16L9.3,3.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0\n                    l13,13c0.4,0.4,0.4,1,0,1.4l-13,13C10.5,29.9,10.3,30,10,30z\"/>\n            </g>\n        </g>\n    </svg>");
        exports.templates.svg("left", "<svg version=\"1.1\" id=\"SVG_Left\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 32 32\" style=\"enable-background:new 0 0 32 32;\" xml:space=\"preserve\">\n        <g id=\"XMLID_1752_\">\n            <g id=\"XMLID_2020_\">\n                <path id=\"XMLID_15_\" d=\"M23,30c-0.3,0-0.5-0.1-0.7-0.3l-13-13c-0.4-0.4-0.4-1,0-1.4l13-13c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4\n                    L11.4,16l12.3,12.3c0.4,0.4,0.4,1,0,1.4C23.5,29.9,23.3,30,23,30z\"/>\n            </g>\n        </g>\n    </svg>");
    })();
    function resolveUrlTemplate(key, url) {
        return url || exports.urlTemplates[key] || (AliHub.Web.resolver(moduleName, key) || { pathTemplate: function () { return undefined; } }).pathTemplate();
    }
    exports.resolveUrlTemplate = resolveUrlTemplate;
    function instance() {
        return XTracker;
    }
    exports.instance = instance;
    function clientInstance() {
        if (!_set.instance)
            _set.instance = new Client();
        return _set.instance;
    }
    exports.clientInstance = clientInstance;
    function enableClient(forceToRegister) {
        if (forceToRegister === void 0) { forceToRegister = false; }
        if (typeof XTracker === "undefined" && !forceToRegister)
            return undefined;
        var client = AliHub.Diagnostics.pageAnalyticsClient(clientInstance());
        XTracker.client = client;
        XTracker.Diagnostic = Diagnostic;
        return client;
    }
    exports.enableClient = enableClient;
    function record(token, data) {
        if (typeof XTracker === "undefined")
            return;
        if (!XTracker || !XTracker.bhr || !XTracker.bhr.record)
            return;
        try {
            XTracker.bhr.record((typeof token === "function" ? token() : token), (typeof data === "function" ? data() : data));
        }
        catch (ex) { }
    }
    exports.record = record;
    /**
      * Gets screenshot for an element.
      * @param element  The element.
      */
    function screenshot(element, model) {
        var deffered = AliHub.Common.deferred();
        if (!window.html2canvas) {
            deffered.reject("not implemented");
            return deffered.promise();
        }
        var ele = element ? AliHub.Elements.getById(element) : document.body;
        if (!ele) {
            deffered.reject("cannot find the element");
            return deffered.promise();
        }
        var currentTime = new Date();
        window.html2canvas(ele, {
            onrendered: function (canvas) {
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
    exports.screenshot = screenshot;
    function screenshotBlob(element, model) {
        var deffered = AliHub.Common.deferred();
        if (!window.html2canvas) {
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
        window.html2canvas(ele, {
            onrendered: function (canvas) {
                var blob = canvas.toBlob(function (r) {
                    if (!r) {
                        deffered.reject("Cannot generate blob.");
                        return;
                    }
                    var renderedTime = new Date();
                    var url;
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
                        toUrl: function () {
                            if (!url)
                                url = URL.createObjectURL(r);
                            return url;
                        }
                    });
                });
            }
        });
        return deffered.promise();
    }
    exports.screenshotBlob = screenshotBlob;
    /**
      * XTracker.
      * http://gitlab.alibaba-inc.com/xtracker/logger
      */
    var Client = (function () {
        function Client() {
            this.mapping = new AliHub.Collection.Mapping();
            this.token = AliHub.Common.listenedObj();
            this.autoMapping = false;
            this.recorded = new AliHub.Collection.EventHandlers();
        }
        /**
          * Records a stamp.
          */
        Client.prototype.record = function (key, parameter) {
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
        };
        /**
          * Records directly.
          */
        Client.prototype.recordDirectly = function (data) {
            record(this.token, data);
        };
        /**
          * Checks whether the instance is alive.
          */
        Client.prototype.alive = function () {
            if (typeof XTracker === "undefined")
                return false;
            return !!XTracker && !!XTracker.bhr && !!XTracker.bhr.record;
        };
        return Client;
    }());
    exports.Client = Client;
    var Diagnostic;
    (function (Diagnostic) {
        var _innerSettings = {
            screens: [],
            inputs: [],
            list: [],
            ignoreClose: true,
            c: null,
            recording: null,
            recorded: null,
            handlers: {
                url: function (c, item) {
                    if (!item.id)
                        return;
                    Diagnostic.next({
                        id: item.id,
                        name: item.name
                    });
                },
                action: function (c, item) {
                    if (item.actionData && typeof item.actionData === "function") {
                        if (item.actionData(c, item))
                            Diagnostic.visible(false, true);
                    }
                },
                open: function (c, item) {
                    AliHub.Elements.openPage(item.actionData, "_blank", item);
                    Diagnostic.visible(false, true);
                }
            }
        };
        Diagnostic.maxScreenshots = 100;
        Diagnostic.enableScreenshot = false;
        function inputHistory() {
            return AliHub.Collection.copy(_innerSettings.inputs);
        }
        Diagnostic.inputHistory = inputHistory;
        function links() {
            return {
                refresh: {
                    name: exports.templates.localString("refresh"),
                    actionType: "action",
                    actionData: function () {
                        window.location.reload();
                    }
                },
                back: {
                    name: exports.templates.localString("back"),
                    actionType: "action",
                    actionData: function () {
                        window.history.back();
                    }
                }
            };
        }
        Diagnostic.links = links;
        function push() {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            AliHub.Collection.pushRange(_innerSettings.list, items, true, true);
        }
        Diagnostic.push = push;
        function handler(type, handler, ignoreIfExist) {
            if (ignoreIfExist === void 0) { ignoreIfExist = false; }
            if (!type)
                return undefined;
            var h = _innerSettings.handlers[type];
            if (arguments.length > 1 && (!ignoreIfExist || !h)) {
                if (handler)
                    _innerSettings.handlers[type] = handler;
                else
                    delete _innerSettings.handlers[type];
                h = _innerSettings.handlers[type];
            }
            return h;
        }
        Diagnostic.handler = handler;
        function visible(value, backToHome) {
            if (backToHome === void 0) { backToHome = false; }
            var c = getControl(!value);
            var cc = c.currentControl();
            if (backToHome || (cc && cc.last))
                c.turnTo(0);
            c.styleProp("display", value ? "" : "none");
            if (value)
                _innerSettings.ignoreClose = true;
        }
        Diagnostic.visible = visible;
        function next(config) {
            if (!config)
                return null;
            var c = getControl();
            var page = c.add(function (cid) {
                var pc = new PageControl(cid);
                pc.itemHandler = function (itemModel) {
                    var h = Diagnostic.handler(itemModel.actionType || c.defaultActionType || "url");
                    if (h)
                        h(c, itemModel);
                    if (itemModel.actionHandler)
                        itemModel.actionHandler(c);
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
        Diagnostic.next = next;
        function getControl(returnNullIfNonExist) {
            if (returnNullIfNonExist === void 0) { returnNullIfNonExist = false; }
            var c = AliHub.Common.getControl("ali_pop_diagnostic");
            var refreshHomepage = function () {
                var curItem = c.current();
                if (curItem && curItem.index > 0) {
                    c.removeStyleRef("ali-x-state-level-first");
                    return;
                }
                if (!curItem)
                    return;
                c.addStyleRef("ali-x-state-level-first");
                var list = [];
                var removing = [];
                _innerSettings.list.forEach(function (item) {
                    if (!item || !item.diagnosticMenu) {
                        removing.push(item);
                        return;
                    }
                    if (item.getElement && !item.getElement()) {
                        removing.push(item);
                        return;
                    }
                    var menu = typeof item.diagnosticMenu === "function" ? item.diagnosticMenu() : item.diagnosticMenu;
                    if (menu)
                        list.push.apply(list, AliHub.Collection.toArray(menu));
                });
                AliHub.Collection.remove(_innerSettings.list, removing, true);
                var homeControl = c.getItem(0).control;
                homeControl.clearLinks();
                homeControl.pushLink(list);
            };
            if (!c && !returnNullIfNonExist) {
                var ele = AliHub.Elements.getById("ali_pop_diagnostic") || document.createElement("div");
                ele.id = "ali_pop_diagnostic";
                document.body.appendChild(ele);
                c = new AliHub.Common.ActivityControl(ele);
                c.addStyleRef("ali-diagnostics-menu");
                var home = Diagnostic.next({
                    name: exports.templates.localString("problem")
                });
                c.changed.add(function (ev) {
                    refreshHomepage();
                });
                var closeButton = c.createControl("close", AliHub.Elements.ButtonControl);
                closeButton.styleRef("ali-x-action-close");
                closeButton.name(exports.templates.localString("close"));
                closeButton.icon({ type: "svg", source: exports.templates.svg("close") });
                closeButton.attr("title", exports.templates.localString("close"));
                closeButton.clicked.add(function (ev) {
                    visible(false, true);
                });
                var backButton = c.createControl("back", AliHub.Elements.ButtonControl);
                backButton.styleRef("ali-x-action-back");
                backButton.name(exports.templates.localString("back"));
                backButton.icon({ type: "svg", source: exports.templates.svg("left") });
                backButton.attr("title", exports.templates.localString("back"));
                backButton.clicked.add(function (ev) {
                    var cur = c.current();
                    if (cur && cur.index > 0)
                        c.back();
                    else
                        visible(false, true);
                });
                c.listen("click", function (ev) {
                    _innerSettings.ignoreClose = true;
                });
                var autoClose = new AliHub.Collection.DisposableArray();
                autoClose.push(AliHub.Elements.listen(document.body, "click", function (ev) {
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
        function screenCapture(element) {
            var promise = screenshot(element);
            promise.then(function (r) {
                if (_innerSettings.screens.length > 0) {
                    var last = _innerSettings.screens[_innerSettings.screens.length - 1];
                    if (last && (!r.url || last.url === r.url))
                        return;
                }
                _innerSettings.screens.push(r);
                var delCount = _innerSettings.screens.length - Diagnostic.maxScreenshots;
                if (delCount > 0)
                    _innerSettings.screens.splice(0, delCount);
            });
            return promise;
        }
        Diagnostic.screenCapture = screenCapture;
        function resolveScreens() {
            var arr = [];
            _innerSettings.screens.forEach(function (item) {
                arr.push(AliHub.Common.Reflection.copy(item));
            });
            return arr;
        }
        Diagnostic.resolveScreens = resolveScreens;
        function isRecording() {
            return !!_innerSettings.recording;
        }
        Diagnostic.isRecording = isRecording;
        function record() {
            Diagnostic.cancelRecord();
            var rd = _innerSettings.recording;
            var recorded = null;
            rd.push(AliHub.Elements.listen(document.body, "click", function (ev) {
                if (!ev && typeof event !== "undefined")
                    ev = event;
                if (recorded >= _innerSettings.recorded || !ev)
                    return;
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
                if (Diagnostic.enableScreenshot)
                    setTimeout(function () {
                        recorded = new Date();
                        screenCapture().then(function (r) {
                            recorded = new Date();
                        });
                    }, 200);
            }), AliHub.Elements.listen(document.body, "DOMNodeInserted", function (ev) {
                _innerSettings.recorded = new Date();
            }));
        }
        Diagnostic.record = record;
        function cancelRecord() {
            if (_innerSettings.recording)
                _innerSettings.recording.dispose();
            _innerSettings.recording = new AliHub.Collection.DisposableArray();
        }
        Diagnostic.cancelRecord = cancelRecord;
        function uploadScreen(item, urlTemplate, parameters) {
            if (!item)
                return null;
            var urlTempl = resolveUrlTemplate("uploadScreen", urlTemplate);
            if (item.blob) {
                var form = new FormData();
                form.append("mime", "image/png");
                form.append("encode", "base64");
                form.append("file", item.blob, item.name);
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
                file: item.url,
                base64: item.url,
                created: (item.ref.created || new Date()).getTime(),
                captureName: item.name,
                tagName: item.ref.tagName,
                elementId: item.ref.elementId
            });
            promise.then(function (r) {
                item.upload = r.result;
            });
            return promise;
        }
        Diagnostic.uploadScreen = uploadScreen;
        function batchUploadScreens(start, urlTemplate, tag, id, model) {
            if (typeof XTracker === "undefined")
                return;
            var urlTempl = resolveUrlTemplate("uploadScreen", urlTemplate);
            if (!urlTempl)
                return;
            AliHub.Collection.copy(_innerSettings.screens).reverse().forEach(function (item, index) {
                if (!item || !item.url || !item.ref || item.upload)
                    return;
                Diagnostic.uploadScreen(item, urlTempl, { type: "screenshot", tag: tag, start: start ? start.getTime() : null, index: index, id: id, model: model });
            });
        }
        Diagnostic.batchUploadScreens = batchUploadScreens;
        function resolveTaskTrace(id) {
            return AliHub.Web.resolve(null, resolveUrlTemplate("resolveTrace"), { id: id });
        }
        Diagnostic.resolveTaskTrace = resolveTaskTrace;
        var PageControl = (function (_super) {
            __extends(PageControl, _super);
            /**
              * Initializes a new instance of the PageControl class.
              * @param id  The element to render.
              */
            function PageControl(id) {
                var _this = _super.call(this, id) || this;
                _this.bizId = AliHub.Common.listenedObj();
                _this.name = AliHub.Common.listenedObj();
                _this.last = false;
                _this.styleRef("ali-control-xtracker-page");
                _this.appendElementByDef({
                    idSuffix: "title",
                    tagName: "h5",
                    style: {
                        display: "none"
                    }
                }, {
                    idSuffix: "desc",
                    tagName: "div",
                    style: {
                        display: "none"
                    }
                }, {
                    idSuffix: "options",
                    tagName: "ul",
                    style: {
                        display: "none"
                    }
                });
                _this.name.subscribe(function (newValue) {
                    var ele = _this.getChildElement("title");
                    if (!ele)
                        return;
                    ele.innerHTML = AliHub.Common.Text.toHTML(newValue, true);
                    ele.style.display = newValue ? "" : "none";
                });
                return _this;
            }
            PageControl.prototype.pushDescription = function () {
                var _this = this;
                var text = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    text[_i] = arguments[_i];
                }
                var arr = [];
                text.forEach(function (lines) {
                    AliHub.Collection.toStringArray(lines, true).forEach(function (line) {
                        if (!line)
                            return;
                        arr.push(line);
                        _this.appendElementByDefToChild("desc", {
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
                    if (ele)
                        ele.style.display = "";
                }
                return arr;
            };
            PageControl.prototype.clearDescription = function () {
                var ele = this.getChildElement("desc");
                if (!ele)
                    return;
                ele.style.display = "none";
                ele.innerHTML = "";
            };
            PageControl.prototype.pushLink = function () {
                var _this = this;
                var link = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    link[_i] = arguments[_i];
                }
                var arr = [];
                link.forEach(function (items) {
                    AliHub.Collection.toArray(items, true).forEach(function (item) {
                        if (!item || item.hidden === true || (typeof item.hidden === "function" && item.hidden()))
                            return;
                        arr.push(item);
                        var icon = item.icon ? AliHub.Graph.imageElement(item.icon) : null;
                        var iconDef = icon
                            ? {
                                children: [
                                    {
                                        element: icon
                                    }
                                ]
                            }
                            : {
                                innerHTML: exports.templates.svg("right")
                            };
                        iconDef.tagName = "span";
                        iconDef.styleRef = "ali-x-section-icon";
                        _this.appendElementByDefToChild("options", {
                            tagName: "li",
                            children: [
                                {
                                    tagName: "a",
                                    events: {
                                        click: function (ev) {
                                            _this.itemHandler(item);
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
                            ready: function (dom) {
                                dom._xLinkItemModel = item;
                            }
                        });
                    });
                });
                if (arr.length > 0) {
                    var ele = this.getChildElement("options");
                    if (ele)
                        ele.style.display = "";
                }
                return arr;
            };
            PageControl.prototype.clearLinks = function () {
                var ele = this.getChildElement("options");
                if (!ele)
                    return;
                ele.style.display = "none";
                ele.innerHTML = "";
            };
            PageControl.prototype.addSection = function (c, idSuffix) {
                var ele = document.createElement("section");
                ele.id = AliHub.Elements.mergeId(this.getId(), [idSuffix || ("_ccc" + this.increaseNumber())]);
                this.getElement().insertBefore(ele, this.getChildElement("options"));
                if (!c)
                    return new AliHub.Common.VisualControl(ele);
                c(ele);
                return AliHub.Common.getControl(ele);
            };
            return PageControl;
        }(AliHub.Common.VisualControl));
        Diagnostic.PageControl = PageControl;
    })(Diagnostic = exports.Diagnostic || (exports.Diagnostic = {}));
    if (typeof XTracker !== "undefined") {
        XTracker.Client = Client;
        XTracker.registerToQuark = enableClient;
        XTracker.Diagnostic = Diagnostic;
    }
});
