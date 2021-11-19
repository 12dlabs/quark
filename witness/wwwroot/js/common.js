/*  --------------------
 *  Common library - Witness - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  common.ts
 *  Description  Business common library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    } else if (typeof AliHub !== "undefined") {
        if (typeof witness === "undefined") witness = {}; if (!witness) witness = {};
        factory(function (name) { }, witness);
    }
})(function (require, exports) {
    "use strict";
    require("jquery");
    require("quark/scripts/index.min.js");
    var ql = AliHub;
    if (window.require.cssSuport) {
        require("quark/css/common.min.css");
        require("../css/index.min.css");
    }
    /* ------- Name ------- */
    ql.Bindings.setup();
    var moduleName = "Ali.Witness";
    exports.name = moduleName;
    exports.templates = ql.Res.templates(moduleName, true);
    ql.Diagnostics.debugInfo("Module " + moduleName + " loaded.");
    /* ------- Localization ------- */
    (function () {
        // Language pack "en" (default).
        var lp = {
            nextPage: "Next",
            previousPage: "Previous",
            duration: "Duration",
            tips: "Tips",
            hours: "hour(s)",
            days: "day(s)",
            ok: "OK",
            cancel: "Cancel",
            add: "Add",
            edit: "Edit",
            remove: "Remove",
            name: "Witness"
        };
        exports.templates.strings.reg("ww", lp);
        exports.templates.strings.reg("en", lp);
        // Language pack "zh-Hans".
        lp = {
            nextPage: "下一页",
            previousPage: "上一页",
            duration: "时长",
            tips: "备注",
            hours: "小时",
            days: "天",
            ok: "确定",
            cancel: "取消",
            add: "添加",
            edit: "编辑",
            remove: "删除",
            name: "Witness"
        };
        exports.templates.strings.reg("zh-Hans", lp);
        exports.templates.strings.reg("zh-CN", lp);
        exports.templates.strings.reg("zh-SG", lp);
    })();
    /* ------- Resources ------- */
    /**
      * Gets SVG source string.
      * @param key  The key.
      */
    function svg(key) {
        if (!key)
            return null;
        return ql.Res.svg(moduleName, key);
    }
    exports.svg = svg;
    /**
      * Gets HTML source string.
      * @param key  The key.
      */
    function html(key) {
        if (!key)
            return null;
        return ql.Res.html(moduleName, key);
    }
    exports.html = html;
    /**
      * Gets local string.
      * @param key  The key.
      */
    function strings(key, lang) {
        if (!key)
            return null;
        return arguments.length > 1 ? ql.Res.strings(moduleName, key, lang) : ql.Res.strings(moduleName, key);
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
        return ql.Res.templates(moduleName).strings.reg(lang, value);
    }
    exports.local = local;
    /**
      * Gets data package resolver.
      * @param key  The key.
      */
    function webResolver(key, value) {
        if (!key)
            return null;
        return arguments.length > 1 ? ql.Web.resolver(moduleName, key, value) : ql.Web.resolver(moduleName, key);
    }
    exports.webResolver = webResolver;
    /**
      * Batch sets URL templates.
      * @param key  The key.
      */
    function setUrlTemplates(urls) {
        return ql.Web.setUrlTemplates(moduleName, urls);
    }
    exports.setUrlTemplates = setUrlTemplates;
    var _set = {
        hit: function (value, subject) {
            ql.Web.resolve(subject || moduleName, "hitcollect", value);
        },
        hitInit: null,
        targetResolver: function (element) {
            var target = element.getAttribute("data-witness-t") || element.getAttribute("witness-t");
            if (!target && _set.useSpm)
                target = element.getAttribute("data-spm");
            return !!target && target.length > 1 ? target : null;
        },
        useSpm: true
    };
    /* ------- Business ------- */
    /**
      * Sets or gets the implementation for hit collector.
      * @param value  The hit collector implementation instance.
      */
    function hitCollector(value) {
        if (arguments.length > 0) {
            _set.hit = value;
        }
        return _set.hit;
    }
    exports.hitCollector = hitCollector;
    /**
      * Sets or gets the implementation for target resolver.
      * @param value  The target resolver implementation instance.
      */
    function targetResolver(value) {
        if (arguments.length > 0) {
            _set.targetResolver = value;
        }
        return _set.targetResolver;
    }
    exports.targetResolver = targetResolver;
    /**
      * Sets or gets whether use SPM attributes.
      * @param value  true if use SPM attributes; otherwise, false.
      */
    function useSpm(value) {
        if (arguments.length > 0) {
            _set.useSpm = value;
        }
        return _set.useSpm;
    }
    exports.useSpm = useSpm;
    /**
      * The client.
      */
    var Client = (function () {
        /**
          * Initializes a new instance of the ElementsHitPool class.
          */
        function Client(app, page) {
            this._rela = {};
            this._path = [];
            this._properties = {};
            /**
              * Gets or sets the app identifier.
              */
            this.appId = ql.Common.listenedObj();
            /**
              * Gets or sets the page identifier.
              */
            this.pageId = ql.Common.listenedObj();
            /**
              * Gets or sets whether show analyzer report.
              */
            this.analyzerVisible = ql.Common.listenedObj();
            /**
              * Gets or sets the additional property bag.
              */
            this.bag = ql.Common.listenedObj();
            /**
              * Gets or sets the category string.
              */
            this.category = ql.Common.listenedObj();
            /**
              * Gets or sets whether stop to send hit information.
              */
            this.silent = ql.Common.listenedObj(false);
            /**
              * Adds or removes an event occured when the property is changed.
              */
            this.propChanged = new ql.Collection.EventHandlers();
            /**
              * Gets or sets whether need remove duplicate hit information.
              */
            this.removeDuplicate = ql.Common.listenedObj(true);
            this.appId(app);
            this.pageId(page);
            this._tracking = ql.Common.Maths.randomString("hit") + "r" + parseInt((Math.random() * 10000000).toString()).toString();
            if (!!_set.hitInit)
                _set.hitInit.raise(this, true);
        }
        /**
          * Batch registers the send events.
          */
        Client.prototype.registerSendEvents = function () {
            var _this = this;
            var getTarget = targetResolver();
            if (!getTarget)
                return;
            AliHub.Elements.processAll(this.container || document, function (ele) {
                _this.registerSendEvent(ele, getTarget);
            });
        };
        /**
          * Registers the send event for a element.
          */
        Client.prototype.registerSendEvent = function (element, getTarget) {
            var _this = this;
            getTarget = getTarget || targetResolver();
            if (!element || !element.tagName || !getTarget || !!element._xWitnessHit)
                return false;
            var target = getTarget(element);
            if (!target)
                return false;
            var eventDisposable = ql.Elements.listen(element, "click", function (ev) {
                var target = getTarget(element);
                if (!target)
                    return;
                _this.sendHitInfo(target);
            });
            element._xWitnessHit = {
                clickResp: eventDisposable
            };
            return true;
        };
        Client.prototype.all = function () {
            var list = [];
            for (var prop in this._rela) {
                if (!prop || typeof prop !== "string")
                    continue;
                var item = this._rela[prop];
                if (!item || !item.info)
                    continue;
                list.push(item.info);
            }
            return list;
        };
        Client.prototype.randomSilent = function (permillage) {
            var now = new Date();
            var num = parseInt((now.getTime() / 20).toString());
            num = num % 1000;
            this.silent(num < permillage);
        };
        /**
          * Sets the specific additional property.
          * @param key  The property name.
          * @param value  The value of the property.
          */
        Client.prototype.prop = function (name, value) {
            if (!name)
                return undefined;
            if (arguments.length > 1) {
                var old = this._properties[name];
                if (old === value)
                    return value;
                this._properties[name] = value;
                this.propChanged.raise({ key: name, value: this._properties[name], old: old });
            }
            return this._properties[name];
        };
        Client.prototype.maxiCount = function () {
            var value = -1;
            this.all().forEach(function (item, i, arr) {
                if (!item || !item.count)
                    return;
                var tempNum = item.count();
                if (!ql.Common.Maths.validNumber(tempNum))
                    return;
                if (tempNum > value)
                    value = tempNum;
            });
            return value > 0 ? value : 0;
        };
        Client.prototype.miniCount = function () {
            var value = -1;
            this.all().forEach(function (item, i, arr) {
                if (!item || !item.count)
                    return;
                var tempNum = item.count();
                if (!ql.Common.Maths.validNumber(tempNum))
                    return;
                if (value < 0 || tempNum < value)
                    value = tempNum;
            });
            return value > 0 ? value : 0;
        };
        Client.prototype.maxiDuration = function () {
            var value = -1;
            this.all().forEach(function (item, i, arr) {
                if (!item || !item.next)
                    return;
                item.next().forEach(function (nextItem, nextIndex, nextArray) {
                    if (!!nextItem && ql.Common.Maths.validNumber(nextItem.averageDuration) && nextItem.averageDuration > value)
                        value = nextItem.averageDuration;
                });
            });
            return value > 0 ? value : 0;
        };
        Client.prototype.miniDuration = function () {
            var value = 0;
            this.all().forEach(function (item, i, arr) {
                if (!item || !item.next)
                    return;
                item.next().forEach(function (nextItem, nextIndex, nextArray) {
                    if (!!nextItem && ql.Common.Maths.validNumber(nextItem.averageDuration) && (value < 0 || nextItem.averageDuration < value))
                        value = nextItem.averageDuration;
                });
            });
            return value > 0 ? value : 0;
        };
        Client.prototype.loadFromWeb = function () {
            var _this = this;
            var promise = ql.Web.resolve(this.subject || moduleName, "hitanalyze", {
                app: this.appId(),
                page: this.pageId()
            });
            promise.then(function (r) {
                if (!r.result)
                    return;
                var summary = r.result.summary;
                if (!summary && r.result instanceof Array)
                    summary = r.result;
                if (!!summary)
                    _this.push.apply(_this, summary);
            });
            return promise;
        };
        Client.prototype.sendHitInfo = function (target, note) {
            var impl = hitCollector();
            if (!impl || this.silent())
                return;
            var currentT = new Date();
            var previous = null;
            var prevT;
            if (this._path.length > 0 && !!this._path[this._path.length - 1]) {
                var last = this._path[this._path.length - 1];
                previous = last.target;
                prevT = ql.Common.DateTime.parse(last.timestamp);
            }
            if (this.removeDuplicate() && previous === target)
                return;
            if (!prevT)
                prevT = ql.Common.DateTime.parse("init");
            var span = currentT.getTime() - prevT.getTime();
            if (span < 0)
                span = 0;
            this._path.push({
                target: target,
                note: note,
                timestamp: currentT
            });
            var user = ql.Users.profile();
            var bag = ql.Common.Text.serialize(this.bag());
            impl({
                app: this.appId(),
                page: this.pageId(),
                track: this._tracking,
                user: !!user ? user.id : null,
                target: target,
                note: note,
                step: this._path.length - 1,
                timestamp: new Date(),
                previous: previous,
                duration: span,
                url: window.location.href,
                referrer: document.referrer,
                category: this.category(),
                bag: bag
            });
        };
        Client.prototype.push = function () {
            var _this = this;
            var value = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                value[_i - 0] = arguments[_i];
            }
            if (!value)
                return;
            value.forEach(function (model, modelI, modelArr) {
                _this._add(model);
                _this._add({
                    fromTarget: model.toTarget,
                    toTarget: null,
                    averageDuration: null,
                    count: null
                });
            });
        };
        Client.prototype.get = function (target) {
            var record = this._rela[target];
            return !!record ? record.info : null;
        };
        Client.pushInit = function () {
            var value = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                value[_i - 0] = arguments[_i];
            }
            if (!_set.hitInit)
                _set.hitInit = new ql.Collection.EventHandlers();
            if (!!value)
                value.forEach(function (item, i, arr) {
                    _set.hitInit.add(item);
                });
        };
        Client.prototype._add = function (model) {
            var _this = this;
            if (!model || !model.fromTarget)
                return null;
            var target = model.fromTarget;
            var record = this._rela[target];
            if (!record) {
                record = {};
                this._rela[target] = record;
                this._getElement(target, record);
            }
            if (!record.next)
                record.next = [];
            if (!!model.toTarget)
                record.next.push({
                    target: model.toTarget,
                    count: ql.Common.Maths.validNumber(model.count) ? model.count : 0,
                    averageDuration: model.averageDuration
                });
            if (!!record.info)
                return record.info;
            record.info = {};
            record.info.target = function () {
                return target;
            };
            record.info.count = function () {
                var n = 0;
                if (!record.next)
                    return n;
                record.next.forEach(function (item, i, arr) {
                    n += item.count;
                });
                return n;
            };
            record.info.element = function () {
                return _this._getElement(target, record);
            };
            record.info.position = function () {
                return ql.Elements.getPosition(record.element);
            };
            record.info.size = function () {
                return ql.Elements.getSize(record.element);
            };
            record.info.next = function () {
                if (!record.next)
                    return [];
                var clients = [];
                record.next.forEach(function (item, i, arr) {
                    if (!item)
                        return;
                    clients.push({
                        count: item.count,
                        averageDuration: item.averageDuration,
                        fromTarget: record.info,
                        toTarget: _this.get(item.target)
                    });
                });
                return clients;
            };
            record.info.previous = function () {
                var clients = [];
                for (var prop in _this._rela) {
                    if (!prop || typeof prop !== "string")
                        continue;
                    var testInfo = _this._rela[prop];
                    if (!testInfo || !testInfo.element || !testInfo.next || !(testInfo.next instanceof Array))
                        continue;
                    testInfo.next.some(function (item, i, arr) {
                        if (item.target !== target)
                            return false;
                        clients.push({
                            averageDuration: item.averageDuration,
                            count: item.count,
                            fromTarget: testInfo.info,
                            toTarget: record.info
                        });
                        return true;
                    });
                }
                return clients;
            };
            record.info.text = function () {
                return !!record.element ? ql.Common.Text.parseHTML(record.element.innerHTML) : null;
            };
            return record.info;
        };
        Client.prototype._getElement = function (target, info) {
            if (!!info.element)
                return info.element;
            var getTarget = targetResolver();
            if (!getTarget)
                return null;
            var allEles = !!this.container ? this.container.children : document.all;
            for (var i = 0; i < allEles.length; i++) {
                var testEle = allEles[i];
                if (getTarget(testEle) !== target)
                    continue;
                info.element = testEle;
                break;
            }
            return info.element;
        };
        return Client;
    }());
    exports.Client = Client;
});
