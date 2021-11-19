/*  --------------------
 *  Common library - Witness - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  common.ts
 *  Description  Business common library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

require("jquery");
require("quark/scripts/index.min.js");
import ql = AliHub;
if ((window as any).require.cssSuport) {    // This is only for script text searching.
    require("quark/css/common.min.css");
    require("../css/index.min.css");
}

/* ------- Name ------- */

ql.Bindings.setup();
var moduleName = "Ali.Witness";
export var name = moduleName;

export var templates = ql.Res.templates(moduleName, true);
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
    templates.strings.reg("ww", lp);
    templates.strings.reg("en", lp);

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
    templates.strings.reg("zh-Hans", lp);
    templates.strings.reg("zh-CN", lp);
    templates.strings.reg("zh-SG", lp);
})();

/* ------- Resources ------- */

/**
  * Gets SVG source string.
  * @param key  The key. 
  */
export function svg(key: string): string {
    if (!key) return null;
    return ql.Res.svg(moduleName, key);
}

/**
  * Gets HTML source string.
  * @param key  The key. 
  */
export function html(key: string) {
    if (!key) return null;
    return ql.Res.html(moduleName, key);
}

/**
  * Gets local string.
  * @param key  The key. 
  */
export function strings(key: string, lang?: string) {
    if (!key) return null;
    return arguments.length > 1 ? ql.Res.strings(moduleName, key, lang) : ql.Res.strings(moduleName, key);
}

/**
  * Sets strings of specific market code.
  * @param lang  The market code. 
  * @param value  The strings. 
  */
export function local(lang: string, value: ql.Collection.DictionaryContract<string> | Object) {
    if (!lang || !value) return null;
    return ql.Res.templates(moduleName).strings.reg(lang, value);
}

/**
  * Gets data package resolver.
  * @param key  The key. 
  */
export function webResolver<T>(key: string, value?: string | ql.Web.WebResolverInfoContract<T>): ql.Web.BaseDataPackageResolver<T> {
    if (!key) return null;
    return arguments.length > 1 ? ql.Web.resolver<T>(moduleName, key, value) : ql.Web.resolver<T>(moduleName, key);
}

/**
  * Batch sets URL templates.
  * @param key  The key. 
  */
export function setUrlTemplates(urls: ql.Common.ClassicObject): string[] {
    return ql.Web.setUrlTemplates(moduleName, urls);
}

/* ------- Inner ------- */

interface ItemContract {
    next: ({
        target: string;
        count: number;
        averageDuration: number;
    })[];
    element: Element;
    info: ql.Diagnostics.ElementHitAnalysisContract;
}

interface StepContract {
    target: string;
    timestamp: Date;
    note?: string;
}

var _set = {
    hit: (value?: ql.Diagnostics.IdentityHitStateContract, subject?: string | HTMLElement | ql.Common.VisualControl) => {
        ql.Web.resolve(subject || moduleName, "hitcollect", value);
    },
    hitInit: null as ql.Collection.EventHandlers<Client>,
    targetResolver: (element: Element) => {
        var target = element.getAttribute("data-witness-t") || element.getAttribute("witness-t");
        if (!target && _set.useSpm) target = element.getAttribute("data-spm");
        return !!target && target.length > 1 ? target : null;
    },
    useSpm: true
};

/* ------- Business ------- */

/**
  * Sets or gets the implementation for hit collector.
  * @param value  The hit collector implementation instance.
  */
export function hitCollector(value?: ql.Common.Action1<ql.Diagnostics.IdentityHitStateContract>) {
    if (arguments.length > 0) {
        _set.hit = value;
    }

    return _set.hit as ql.Common.Action1<ql.Diagnostics.IdentityHitStateContract>;
}

/**
  * Sets or gets the implementation for target resolver.
  * @param value  The target resolver implementation instance.
  */
export function targetResolver(value?: (element: Element) => string) {
    if (arguments.length > 0) {
        _set.targetResolver = value;
    }

    return _set.targetResolver;
}

/**
  * Sets or gets whether use SPM attributes.
  * @param value  true if use SPM attributes; otherwise, false. 
  */
export function useSpm(value?: boolean) {
    if (arguments.length > 0) {
        _set.useSpm = value;
    }

    return _set.useSpm;
}

/**
  * The client. 
  */
export class Client {

    private _tracking: string;
    private _rela = {} as any;
    private _path: StepContract[] = [];
    private _properties = {};

    /**
      * Gets or sets the app identifier. 
      */
    public appId = ql.Common.listenedObj<string>();

    /**
      * Gets or sets the page identifier.
      */
    public pageId = ql.Common.listenedObj<string>();

    /**
      * Resource subject. 
      */
    public subject: string | HTMLElement | ql.Common.VisualControl;

    /**
      * DOM element of hit targets container. 
      */
    public container: HTMLElement;

    /**
      * Gets or sets whether show analyzer report. 
      */
    public analyzerVisible = ql.Common.listenedObj<boolean>();

    /**
      * Gets or sets the additional property bag. 
      */
    public bag = ql.Common.listenedObj<any>();

    /**
      * Gets or sets the category string. 
      */
    public category = ql.Common.listenedObj<string>();

    /**
      * Gets or sets whether stop to send hit information. 
      */
    public silent = ql.Common.listenedObj(false);

    /**
      * Adds or removes an event occured when the property is changed. 
      */
    public propChanged = new ql.Collection.EventHandlers<ql.Collection.ValueChangedContract<any>>();

    /**
      * Gets or sets whether need remove duplicate hit information. 
      */
    public removeDuplicate = ql.Common.listenedObj(true);

    /**
      * Initializes a new instance of the ElementsHitPool class.
      */
    public constructor(app: string, page: string) {
        this.appId(app);
        this.pageId(page);
        this._tracking = ql.Common.Maths.randomString("hit") + "r" + parseInt((Math.random() * 10000000).toString()).toString();
        if (!!_set.hitInit) _set.hitInit.raise(this, true);
    }

    /**
      * Batch registers the send events.
      */
    public registerSendEvents() {
        var getTarget = targetResolver();
        if (!getTarget) return;
        AliHub.Elements.processAll(this.container || document, (ele) => {
            this.registerSendEvent(ele, getTarget);
        });
    }

    /**
      * Registers the send event for a element.
      */
    public registerSendEvent(element: Element, getTarget?: (element: Element) => string) {
        getTarget = getTarget || targetResolver();
        if (!element || !element.tagName || !getTarget || !!(element as any)._xWitnessHit) return false;
        var target = getTarget(element);
        if (!target) return false;
        var eventDisposable = ql.Elements.listen(element, "click", (ev) => {
            var target = getTarget(element);
            if (!target) return;
            this.sendHitInfo(target);
        });
        (element as any)._xWitnessHit = {
            clickResp: eventDisposable
        };
        return true;
    }

    public all() {
        var list: ql.Diagnostics.ElementHitAnalysisContract[] = [];
        for (var prop in this._rela) {
            if (!prop || typeof prop !== "string") continue;
            var item = this._rela[prop] as ItemContract;
            if (!item || !item.info) continue;
            list.push(item.info);
        }

        return list;
    }

    public randomSilent(permillage: number) {
        var now = new Date();
        var num = parseInt((now.getTime() / 20).toString());
        num = num % 1000;
        this.silent(num < permillage);
    }

    /**
      * Sets the specific additional property. 
      * @param key  The property name.
      * @param value  The value of the property.
      */
    public prop(name: string, value?: any): any {
        if (!name) return undefined;
        if (arguments.length > 1) {
            var old = this._properties[name];
            if (old === value) return value;
            this._properties[name] = value;
            this.propChanged.raise({ key: name, value: this._properties[name], old: old });
        }

        return this._properties[name];
    }

    public maxiCount() {
        var value = -1;
        this.all().forEach((item, i, arr) => {
            if (!item || !item.count) return;
            var tempNum = item.count();
            if (!ql.Common.Maths.validNumber(tempNum)) return;
            if (tempNum > value) value = tempNum;
        });
        return value > 0 ? value : 0;
    }

    public miniCount() {
        var value = -1;
        this.all().forEach((item, i, arr) => {
            if (!item || !item.count) return;
            var tempNum = item.count();
            if (!ql.Common.Maths.validNumber(tempNum)) return;
            if (value < 0 || tempNum < value) value = tempNum;
        });
        return value > 0 ? value : 0;
    }

    public maxiDuration() {
        var value = -1;
        this.all().forEach((item, i, arr) => {
            if (!item || !item.next) return;
            item.next().forEach((nextItem, nextIndex, nextArray) => {
                if (!!nextItem && ql.Common.Maths.validNumber(nextItem.averageDuration) && nextItem.averageDuration > value)
                    value = nextItem.averageDuration;
            });
        });
        return value > 0 ? value : 0;
    }

    public miniDuration() {
        var value = 0;
        this.all().forEach((item, i, arr) => {
            if (!item || !item.next) return;
            item.next().forEach((nextItem, nextIndex, nextArray) => {
                if (!!nextItem && ql.Common.Maths.validNumber(nextItem.averageDuration) && (value < 0 || nextItem.averageDuration < value))
                    value = nextItem.averageDuration;
            });
        });
        return value > 0 ? value : 0;
    }

    public loadFromWeb() {
        var promise = ql.Web.resolve<ql.Diagnostics.ElementHitSummaryContract>(this.subject || moduleName, "hitanalyze", {
            app: this.appId(),
            page: this.pageId()
        });
        promise.then((r) => {
            if (!r.result) return;
            var summary = r.result.summary;
            if (!summary && r.result instanceof Array) summary = r.result as any;
            if (!!summary) this.push(...summary);
        });
        return promise;
    }

    public sendHitInfo(target: string, note?: string) {
        var impl = hitCollector();
        if (!impl || this.silent()) return;
        var currentT = new Date();
        var previous = null;
        var prevT: Date;
        if (this._path.length > 0 && !!this._path[this._path.length - 1]) {
            var last = this._path[this._path.length - 1];
            previous = last.target;
            prevT = ql.Common.DateTime.parse(last.timestamp);
        }

        if (this.removeDuplicate() && previous === target) return;
        if (!prevT) prevT = ql.Common.DateTime.parse("init");
        var span = currentT.getTime() - prevT.getTime();
        if (span < 0) span = 0;
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
    }

    public push(...value: ql.Diagnostics.ElementHitFlowContract[]) {
        if (!value) return;
        value.forEach((model, modelI, modelArr) => {
            this._add(model);
            this._add({
                fromTarget: model.toTarget,
                toTarget: null,
                averageDuration: null,
                count: null
            });
        });
    }

    public get(target: string): ql.Diagnostics.ElementHitAnalysisContract {
        var record: ItemContract = this._rela[target];
        return !!record ? record.info : null;
    }

    public static pushInit(...value: ((pool: Client) => boolean)[]) {
        if (!_set.hitInit) _set.hitInit = new ql.Collection.EventHandlers();
        if (!!value) value.forEach((item, i, arr) => {
            _set.hitInit.add(item);
        });
    }

    private _add(model: ql.Diagnostics.ElementHitFlowContract) {
        if (!model || !model.fromTarget) return null;
        var target = model.fromTarget;
        var record: ItemContract = this._rela[target];
        if (!record) {
            record = {} as any;
            this._rela[target] = record;
            this._getElement(target, record);
        }

        if (!record.next) record.next = [];
        if (!!model.toTarget) record.next.push({
            target: model.toTarget,
            count: ql.Common.Maths.validNumber(model.count) ? model.count : 0,
            averageDuration: model.averageDuration
        });
        if (!!record.info) return record.info;
        record.info = {} as any;
        record.info.target = () => {
            return target;
        };
        record.info.count = () => {
            var n = 0;
            if (!record.next) return n;
            record.next.forEach((item, i, arr) => {
                n += item.count;
            });
            return n;
        };
        record.info.element = () => {
            return this._getElement(target, record);
        };
        record.info.position = () => {
            return ql.Elements.getPosition(record.element as HTMLElement);
        };
        record.info.size = () => {
            return ql.Elements.getSize(record.element as HTMLElement);
        };
        record.info.next = () => {
            if (!record.next) return [];
            var clients: ql.Diagnostics.ElementHitLinkContract[] = [];
            record.next.forEach((item, i, arr) => {
                if (!item) return;
                clients.push({
                    count: item.count,
                    averageDuration: item.averageDuration,
                    fromTarget: record.info,
                    toTarget: this.get(item.target)
                });
            });
            return clients;
        };
        record.info.previous = () => {
            var clients: ql.Diagnostics.ElementHitLinkContract[] = [];
            for (var prop in this._rela) {
                if (!prop || typeof prop !== "string") continue;
                var testInfo = this._rela[prop] as ItemContract;
                if (!testInfo || !testInfo.element || !testInfo.next || !(testInfo.next instanceof Array)) continue;
                testInfo.next.some((item, i, arr) => {
                    if (item.target !== target) return false;
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
        record.info.text = () => {
            return !!record.element ? ql.Common.Text.parseHTML(record.element.innerHTML) : null;
        };
        return record.info;
    }

    private _getElement(target: string, info: ItemContract) {
        if (!!info.element) return info.element;
        var getTarget = targetResolver();
        if (!getTarget) return null;
        var allEles = !!this.container ? this.container.children : document.all;
        for (var i = 0; i < allEles.length; i++) {
            var testEle = allEles[i];
            if (getTarget(testEle) !== target) continue;
            info.element = testEle;
            break;
        }

        return info.element;
    }
}
