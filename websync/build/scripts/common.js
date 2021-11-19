/*  --------------------
*  Common components - Web Sync - Alibaba
*  (c) Kingcean Tuan, 2014.
*
*  File  common.ts
*  Description  Common components.
*  Owner  Kingcean Tuan <kingcean@live.com>
*  --------------------  */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    require("quark/scripts/index.min.js");
    if (window.require.cssSuport) {
        require("../css/common.min.css");
    }
    exports.moduleName = "AliHub.WebSync";
    exports.templates = AliHub.Res.templates(exports.moduleName, true);
    function _init() {
        var lp_en = {
            start: "Start",
            stop: "Stop",
            renew: "Renew",
            leave: "Leave",
            name: "WebSync"
        };
        exports.templates.strings.reg("ww", lp_en);
        exports.templates.strings.reg("en", lp_en);
        var lp_zh_Hans = {
            start: "开始",
            stop: "停止",
            renew: "新建",
            leave: "离开",
            name: "WebSync"
        };
        exports.templates.strings.reg("zh-Hans", lp_zh_Hans);
        exports.templates.strings.reg("zh-CN", lp_zh_Hans);
        exports.templates.strings.reg("zh-SG", lp_zh_Hans);
    }
    _init();
    /**
      * Gets SVG source string.
      * @param key  The key.
      */
    function svg(key) {
        if (!key)
            return null;
        return AliHub.Res.svg(exports.moduleName, key);
    }
    exports.svg = svg;
    /**
      * Gets HTML source string.
      * @param key  The key.
      */
    function html(key) {
        if (!key)
            return null;
        return AliHub.Res.html(exports.moduleName, key);
    }
    exports.html = html;
    /**
      * Gets local string.
      * @param key  The key.
      */
    function strings(key, lang) {
        if (!key)
            return null;
        return arguments.length > 1 ? AliHub.Res.strings(exports.moduleName, key, lang) : AliHub.Res.strings(exports.moduleName, key);
    }
    exports.strings = strings;
    /**
      * Sets strings of specific market code.
      * @param lang  The market code.
      * @param value  The strings.
      */
    function local(lang, value) {
        if (!lang || !value)
            return null;
        return AliHub.Res.templates(exports.moduleName).strings.reg(lang, value);
    }
    exports.local = local;
    /**
      * Gets data package resolver.
      * @param key  The key.
      */
    function webResolver(key, value) {
        if (!key)
            return null;
        return arguments.length > 1 ? AliHub.Web.resolver(exports.moduleName, key, value) : AliHub.Web.resolver(exports.moduleName, key);
    }
    exports.webResolver = webResolver;
    /**
      * Gets screenshot for an element.
      * @param element  The element.
      */
    function screenshot(element) {
        var deffered = AliHub.Common.deferred();
        html2canvas(element, {
            onrendered: function (canvas) {
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
    exports.screenshot = screenshot;
    function copySvg(element, width) {
        var ele = element.cloneNode(true);
        if (AliHub.Common.Maths.validNumber(width) && width > 0 && !!element.style) {
            var eleWidth = ele.scrollWidth;
            if (eleWidth <= 0)
                eleWidth = 1;
            var rate = width * 100 / eleWidth;
            element.style.zoom = rate.toString() + "%";
        }
        return ele;
    }
    exports.copySvg = copySvg;
    var RequestInterval = (function () {
        function RequestInterval() {
            var _this = this;
            this._enabled = false;
            this.id = AliHub.Common.bindingObj();
            this.commitResolver = new AliHub.Web.PostDataPackageResolver();
            this.idResolver = new AliHub.Web.IdentifiedDataPackageResolver();
            this.interval = 400;
            this.enable = AliHub.Common.bindingObj(false);
            this.enable.subscribe(function (newValue) {
                _this._enabled = newValue === true;
                _this._loop();
            });
        }
        RequestInterval.prototype.renewId = function () {
            var _this = this;
            var promise = this.idResolver.resolve(this.id());
            promise.then(function (r) {
                _this.id(r.result);
            });
            return promise;
        };
        RequestInterval.prototype.commit = function () {
            var _this = this;
            var deferred = AliHub.Common.deferred();
            if (!this.commitResolver || !this.commitResolver.pathTemplate || !this.id())
                return deferred.reject().promise();
            var task = this.getInfo();
            if (!task)
                return deferred.reject().promise();
            task.then(function (info) {
                _this.commitResolver.resolve({ id: _this.id() }, info).then(function (r) {
                    _this.process(r.result);
                    deferred.resolve(r.result);
                }, function () {
                    deferred.reject();
                });
            }, function () {
                deferred.reject();
            });
            return deferred.promise();
        };
        RequestInterval.prototype.getInfo = function () {
            return null;
        };
        RequestInterval.prototype.process = function (r) {
        };
        RequestInterval.prototype._loop = function () {
            var _this = this;
            if (!this._enabled)
                return;
            var rh = this.commit();
            if (!rh) {
                setTimeout(function () { return _this._loop(); }, this.interval);
                return;
            }
            rh.then(function (r) {
                setTimeout(function () { return _this._loop(); }, _this.interval);
            }, function () {
                setTimeout(function () { return _this._loop(); }, _this.interval);
            });
        };
        return RequestInterval;
    }());
    exports.RequestInterval = RequestInterval;
    var AsyncLoop = (function () {
        function AsyncLoop() {
            this._enabled = false;
            this.interval = 1000;
            this.ignoreFailure = true;
            this.completed = new AliHub.Collection.EventHandlers();
        }
        AsyncLoop.prototype.enable = function (value) {
            if (arguments.length > 0) {
                this._enabled = value;
                if (this._enabled)
                    this._loop();
            }
            return this._enabled;
        };
        AsyncLoop.prototype._loop = function () {
            var _this = this;
            if (!this._enabled)
                return;
            setTimeout(function () {
                _this._process();
            }, this.interval);
        };
        AsyncLoop.prototype._process = function () {
            var _this = this;
            this.commit().then(function (r) {
                if (!!r && !_this.isCompleted(r.result))
                    _this._loop();
                else
                    _this.completed.raise(r.result);
            }, function () {
                if (_this.ignoreFailure)
                    _this._loop();
            });
        };
        return AsyncLoop;
    }());
    exports.AsyncLoop = AsyncLoop;
    var Client = (function (_super) {
        __extends(Client, _super);
        function Client() {
            var _this = this;
            _super.call(this);
            this._elements = new Array();
            this.position = AliHub.Common.bindingArray();
            this.message = AliHub.Common.bindingObj();
            this.response = AliHub.Common.bindingArray();
            this.availableListResolver = new AliHub.Web.DataPackageResolver();
            this.addAttendeeResolver = new AliHub.Web.RequestDataPackageResolver();
            this.addAttendeeByNameResolver = new AliHub.Web.RequestDataPackageResolver();
            this.leaveResolver = new AliHub.Web.IdentifiedDataPackageResolver();
            this.activityResolver = new AliHub.Web.RequestDataPackageResolver();
            this.pointerVisible = AliHub.Common.bindingObj(true);
            this.pointerTimeout = 1000;
            this.imagesVisible = AliHub.Common.bindingObj(false);
            this.creationVisible = AliHub.Common.bindingObj(true);
            this.leavingVisible = AliHub.Common.bindingObj(true);
            this.keepHide = true;
            this.enable.subscribe(function (newValue) {
                if (newValue === false && _this._elements.length > 0 && !!_this._elements[_this._elements.length - 1])
                    AliHub.Elements.changeStyleRef(_this._elements[_this._elements.length - 1].value, null, "ali-websync-page-shot-t");
                ;
            });
        }
        Client.prototype.addAttendee = function (id) {
            return this.addAttendeeResolver.resolve({ id: this.id(), user: id });
        };
        Client.prototype.addAttendeeByName = function (name) {
            return this.addAttendeeByNameResolver.resolve({ id: this.id(), userName: name });
        };
        Client.prototype.leave = function () {
            this.enable(false);
            return this.leaveResolver.resolve(this.id());
        };
        Client.prototype.availableList = function () {
            return this.availableListResolver.resolve();
        };
        Client.prototype.availableListMonitor = function () {
            var _this = this;
            var loop = new AsyncLoop();
            loop.commit = function () { return _this.availableList(); };
            loop.isCompleted = function (r) { return !!r && r.length > 0; };
            return loop;
        };
        Client.prototype.watchElement = function (id) {
            var _this = this;
            if (!id)
                return;
            var element = typeof id === "string" ? AliHub.Elements.getById(id) : id;
            if (!element)
                return;
            var info;
            this._elements.some(function (ele, i, arr) {
                if (ele.value !== element)
                    return false;
                info = ele;
                return true;
            });
            this.getActivityId("screenshot").then(function (r) {
                if (!element || !r.result)
                    return;
                if (!!info)
                    info.key = r.result;
                else
                    _this._elements.push({ key: r.result, value: element });
            });
        };
        Client.prototype.getActivityId = function (type) {
            return this.activityResolver.resolve({ type: type });
        };
        Client.prototype.getInfo = function () {
            var _this = this;
            var deferred = AliHub.Common.deferred();
            if (typeof html2canvas === "undefined")
                return deferred.reject().promise();
            if (!html2canvas)
                return deferred.reject().promise();
            var info = {
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
                onrendered: function (canvas) {
                    if (!_this.keepHide || !_this.enable())
                        AliHub.Elements.changeStyleRef(activity.value, null, "ali-websync-page-shot-t");
                    var dataUrl = canvas.toDataURL();
                    if (activity.cache === dataUrl) {
                        deferred.resolve(info);
                        return;
                    }
                    activity.cache = dataUrl;
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
        };
        Client.prototype.process = function (r) {
            this.response(r.list);
            this.showPointer();
        };
        Client.prototype.showPointer = function () {
            var _this = this;
            if (!this.pointerVisible())
                return;
            var list = this.response();
            if (!list)
                return;
            list.forEach(function (itemEle, itemIndex, itemArr) {
                if (!itemEle.focus)
                    return;
                itemEle.focus.forEach(function (focus, focusI, focusA) {
                    if (!focus.activity || focus.x == null || focus.y == null)
                        return;
                    var element;
                    _this._elements.some(function (ele, i, arr) {
                        if (ele.key !== focus.activity)
                            return false;
                        element = ele.value;
                        return true;
                    });
                    if (!element)
                        return;
                    _this._showPointer(focus.activity, element, focus.x, focus.y, itemEle.name, _this.pointerTimeout);
                });
            });
        };
        Client.prototype.getPosition = function (id, activity) {
            if (!id)
                return;
            var element = typeof id === "string" ? AliHub.Elements.getById(id) : id;
            if (!element)
                return;
            var focus = AliHub.Elements.getMousePosition(element);
            focus.activity = activity;
            this.position([focus]);
        };
        Client.prototype._showPointer = function (id, element, x, y, title, timeout) {
            var elementPosition = AliHub.Elements.getPosition(element);
            if (!elementPosition)
                return;
            var pointerEle = document.createElement("div");
            pointerEle.innerHTML = "&nbsp;";
            pointerEle.className = "ali-websync-pointer-remote-dot";
            pointerEle.title = title;
            pointerEle.style.position = "absolute";
            pointerEle.style.top = (y + elementPosition.y).toString() + "px";
            pointerEle.style.left = (x + elementPosition.x).toString() + "px";
            document.body.appendChild(pointerEle);
            setTimeout(function () {
                if (!!pointerEle)
                    pointerEle.outerHTML = "";
            }, this.pointerTimeout);
        };
        return Client;
    }(RequestInterval));
    exports.Client = Client;
});
//# sourceMappingURL=common.js.map