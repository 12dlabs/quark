/*  --------------------
 *  Binding of implementation - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  plugins.ts
 *  Description  Lots of useful functionalities.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

/// <reference path="pages.ts" />
/// <reference path="resources.ts" />
/// <reference path="elements.ts" />
/// <reference path="users.ts" />
/// <reference path="web.ts" />

namespace AliHub.Bindings {

    /**
      * Options contract for binding.
      */
    export interface OptionsContract {
        ko?: KnockoutClientContract | boolean,
        override?: boolean
    }

    export interface AngularClientContract {
        module: Function;
    }

    export interface KnockoutClientContract {

        virtualElements: any;
        extenders: any;

        applyBindings(viewModelOrBindingContext?: any, rootNode?: any): void;
        applyBindingsToDescendants(viewModelOrBindingContext: any, rootNode: any): void;
        applyBindingsToNode(node: Node, bindings: any, viewModelOrBindingContext?: any): any;

        subscribable: any;
        observable: any;

        computed: any;
        pureComputed<T>(evaluatorFunction: () => T, context?: any): any;
        pureComputed<T>(options: any, context?: any): any;

        observableArray: any;

        isSubscribable(instance: any): boolean;
        toJSON(viewModel: any, replacer?: Function, space?: any): string;
        toJS(viewModel: any): any;
        isObservable(instance: any): boolean;
        isWriteableObservable(instance: any): boolean;
        isComputed(instance: any): boolean;
        dataFor(node: any): any;
        removeNode(node: Element): void;
        cleanNode(node: Element): Element;
        renderTemplate(template: Function, viewModel: any, options?: any, target?: any, renderMode?: any): any;
        renderTemplate(template: string, viewModel: any, options?: any, target?: any, renderMode?: any): any;
        unwrap<T>(value: Common.BindingObjectContract<T> | T): T;
        bindingHandlers: any;
        computedContext: any;

        components: any;
        [property: string]: any;
    }

    var _bindingProvider: KnockoutClientContract = typeof ko !== "undefined" ? ko : null;

    /**
      * Sets up the bindings.
      */
    export function setup(options?: OptionsContract) {
        if (!options) options = {};
        if (!!options.ko && (options.ko as any) !== true) _bindingProvider = options.ko as any;
        else if (options.ko === true && !(window as any).ko) (window as any).ko = options.ko;
        AliHub.Common.bindingFactory(KnockoutBindingFactory.instance(), options.override);
        registerAngularJsModule();
        AliHub.Common.setTemplateEngine("angularjs", bindAngularJs);
        AliHub.Common.setTemplateEngine("vuejs", bindVueJs);
        if (typeof JSTracker !== "undefined" && (options.override || AliHub.Diagnostics.tracker() === AliHub.Diagnostics.emptyTracker())) AliHub.Diagnostics.tracker(taobaoJsTracker());
        if (typeof goldlog !== "undefined" && (options.override || (AliHub.Diagnostics.pageAnalyticsClient() as any).basic === true)) AliHub.Diagnostics.pageAnalyticsClient(GoldlogTracker.instance());
        var controlInit = AliHub.Common.ControlManager.initializers();
        HighChartsFactory.setup(options.override);
        jQueryControlsSetup();
        AliHub.Common.PageController.init();
        AliHub.Diagnostics.debugInfo("Quark bindings has initialized.");
    }

    /**
      * Enables jQuery.
      * http://jquery.com/
      */
    export function jQueryControlsSetup() {
        try {
            if (typeof jQuery !== "undefined") {
                if (jQuery && jQuery.fn) jQuery.fn.getControls = function () {
                    var arr = [];
                    if (this.each) this.each(function () {
                        var c = AliHub.Common.getControl(this);
                        if (c) arr.push(c);
                    });
                    return arr;
                }
            }
        } catch (ex) { }
    }

    /**
      * Creates binding provider.
      */
    export function bindingProvider(value?: KnockoutClientContract): any {
        if (arguments.length > 0) _bindingProvider = value;
        return _bindingProvider;
    }

    /**
      * KnockoutJs binding factory.
      * http://knockoutjs.com/
      */
    export class KnockoutBindingFactory implements AliHub.Common.BindingFactoryContract {

        private static _instance: KnockoutBindingFactory;

        /**
          * Singleton instance.
          */
        public static instance(): KnockoutBindingFactory {
            if (!KnockoutBindingFactory._instance) {
                var instance = new KnockoutBindingFactory();
                var koi = instance.provider;
                if (!koi) return null;
                KnockoutBindingFactory._instance = instance;
                AliHub.Common.setTemplateEngine("knockout", instance.applyBindings);
                AliHub.Common.setTemplateEngine("ko", instance.applyBindings);
                koi.bindingHandlers["image"] = {
                    update: function (element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: any, bindingContext: KnockoutBindingContext) {
                        element.innerHTML = "";
                        var imgValue = koi.unwrap(valueAccessor());
                        if (!imgValue) return;
                        var imgEle = Graph.imageElement(imgValue);
                        if (!imgEle) return;
                        element.appendChild(imgEle);
                    }
                };
                koi.bindingHandlers["control"] = {
                    update: function (element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: any, bindingContext: KnockoutBindingContext) {
                        var controlValue = koi.unwrap(valueAccessor());
                        if (!controlValue) return;
                        var options = allBindingsAccessor.get('controlOptions');
                        if (!!options) koi.unwrap(options);
                        Common.fillControl(element, controlValue, !!options ? options : null);
                    }
                };
                koi.bindingHandlers["datetime"] = {
                    update: function (element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: any, bindingContext: KnockoutBindingContext) {
                        var dtValue = koi.unwrap(valueAccessor());
                        if (!dtValue) return;
                        var options = allBindingsAccessor.get('datetimeFormat');
                        if (!!options) koi.unwrap(options);
                        element.innerHTML = Common.DateTime.toCustomizedString(dtValue, options);
                    }
                };
                koi.bindingHandlers["file"] = {
                    init: function (element: HTMLInputElement, valueAccessor: () => any, allBindings: any) {
                        if (typeof FileReader === "undefined") return;
                        var reader = new FileReader();
                        AliHub.Elements.listen(element, "change", () => {
                            if (!element.files || element.files.length < 1 || !element.files[0]) return;
                            var fi = element.files[0];
                            if (reader.readyState === 1) reader.abort();
                            var dataType = allBindings.get('fileDataType') || "dataUrl";
                            reader.onload = (ev) => {
                                valueAccessor()({
                                    name: fi.name,
                                    fileType: fi.type,
                                    modified: fi.lastModifiedDate,
                                    size: fi.size,
                                    dataType: dataType.toString(),
                                    data: reader.result
                                });
                            }
                            switch (dataType.toString().toLowerCase()) {
                                case "text":
                                    reader.readAsText(fi);
                                    break;
                                case "array":
                                case "arraybuffer":
                                    reader.readAsArrayBuffer(fi);
                                    break;
                                case "binary":
                                case "binarystring":
                                    reader.readAsBinaryString(fi);
                                    break;
                                case "dataurl":
                                    reader.readAsDataURL(fi);
                                    break;
                                default:
                                    valueAccessor()(fi);
                                    break;
                            }
                        });
                    }
                };
            }

            return this._instance;
        }

        /**
          * The binding provider which is the Knockout instance.
          */
        public provider = _bindingProvider;

        /**
          * Checks whether the instance is alive.
          */
        public alive(): boolean {
            return !!this.provider;
        }

        /**
          * Creates an observable object.
          */
        public create<T>(value?: T): AliHub.Common.BindingObjectContract<T> {
            if (!this.provider) return null;
            if (arguments.length > 0) return this.provider.observable(value);
            return this.provider.observable();
        }

        /**
          * Creates an observable array.
          */
        public createArray<T>(col?: T[]): AliHub.Collection.BindingArrayContract<T> {
            if (!this.provider) return null;
            if (arguments.length > 0) return this.provider.observableArray(col);
            return this.provider.observableArray();
        }

        /**
          * Creates a computed instance.
          */
        public createComputed<T>(h: AliHub.Common.Func<T>, context?: any) {
            return !!this.provider ? this.provider.computed(h, context) : null;
        }

        /**
          * Checks whether the instance is observable.
          */
        public isObservable(instance: any): boolean {
            return !!this.provider ? this.provider.isObservable(instance) : null;
        }

        /**
          * Checks whether the instance is computed.
          */
        public isComputed(instance: any): boolean {
            return !!this.provider ? this.provider.isComputed(instance) : null;
        }

        /**
          * Converts to JSON.
          */
        public toJson(viewModel: any): any {
            return !!this.provider ? this.provider.toJSON(viewModel) : null;
        }

        public applyBindings(control: Common.VisualControl & Common.BindingContainerContract<any>) {
            if (!this.provider) return;
            var model = Common.bindingObj(control.viewModel());
            control.viewModelChanged.add((ev) => {
                model(ev.value);
            });
            var converted = Common.bindingObj(control.converted());
            control.convertedChanged.add((ev) => {
                converted(ev.value);
            });
            var info = Common.bindingObj(control.info());
            control.infoChanged.add((ev) => {
                info(ev.value);
            });
            this.provider.applyBindings({
                id: control.getId(),
                model: model,
                info: info,
                converted: converted,
                res: AliHub.Res.factory(),
                templates: AliHub.Res.templates,
                control: this,
                hub: (key) => {
                    return !!key ? AliHub[key.toString()] : AliHub
                },
                extenders: (name: string, emptyObj: boolean = false) => {
                    return control.procExtender(name, emptyObj);
                }
            }, control.getElement());
        }

        /**
          * Unwraps.
          */
        public unwrap(value: any): any {
            return !!this.provider ? this.provider.unwrap(value) : AliHub.Common.Reflection.unwrapObject(value);
        }
    }

    /**
      * Binds for Flipper.
      * http://gitlab.alibaba-inc.com/crm/flipper
      */
    export function bindFlipper<T extends Common.VisualControl>(instance: any, reload = false): T {
        if (!instance) return null;
        if (!!instance.getId && !!instance.getElement && !!instance.loadOptions && (instance instanceof AliHub.Common.VisualControl)) return instance as T;
        var controlType = instance.controlType as typeof Common.VisualControl;
        if (!controlType) controlType = AliHub.Common.VisualControl;
        if (!reload && !!instance.getControl && typeof instance.getControl === "function") {
            return instance.getControl();
        }

        var c = new controlType(instance) as T
        var id = c.getId();
        if (!!id && !Elements.getById(id)) return null;
        if (!!instance.options) c.loadOptions(instance.options);
        instance.getControl = () => {
            return c;
        };
        return c;
    }

    /**
      * Binds AngularJs 1.x for a control.
      * https://angularjs.org/
      */
    export function bindAngularJs(control: Common.VisualControl & Common.BindingContainerContract<any>) {
        if (!control) return;
        control.attr("ng-controller", "AliHubControlController");
    }

    /**
      * Register AngularJs controller for a binding control.
      * https://angularjs.org/
      */
    export function registerAngularJsModule(angularInstance?: AngularClientContract): any {
        if (!angularInstance || !angularInstance.module) {
            if (typeof angular === "undefined") return null;
            angularInstance = angular;
        }

        if (!angularInstance || !angularInstance.module) return null;
        try {
            var module = angularInstance.module("quark", []) as ng.IModule;
            module.controller("AliHubControlController", ["$scope", "$element", function ($scope, $element) {
                var c = Common.currentControl<Common.BindingControl<any>>($element);
                var disp = Common.listenBindingControl(c, $scope, (h) => {
                    $scope.$apply(h);
                }, true);
                $scope.control = c;
                $scope.dispose = disp;
            }]);
            module.filter("AliHubText", function () {
                return function (input, arg) {
                    if (!arg || !input) return input;
                    return !!Common.Text[arg] && typeof Common.Text[arg] === "function" ? Common.Text[arg](input) : input;
                }
            });
            return module;
        } catch (ex) {
            return null;
        }
    }

    export function angularScopeGet<T>($scope: any, key: string, parameter: any, done?: Common.Action1<T>, fail?: Common.Action1<any>, target?: any): Web.ResponseTask<T> {
        var task = Web.resolve<T>(null, $scope.urls[key], parameter);
        var succ = !!done && !!done.call ? function (r) {
            $scope.$apply(function () {
                return done.call(target || $scope, r);
            });
        } : null;
        var error = !!fail && !!fail.call ? function (r) {
            $scope.$apply(function () {
                return fail.call(target || $scope, r);
            });
        } : null;
        task.then(succ, error);
        return task;
    }

    export function angularScopePost<T>($scope: any, key: string, parameter: any, data: any, done?: Common.Action1<T>, fail?: Common.Action1<any>, target?: any): Web.ResponseTask<T> {
        var task = Web.resolveByPost<T>(null, $scope.urls[key], parameter, data);
        var succ = !!done && !!done.call ? function (r) {
            $scope.$apply(function () {
                return done.call(target || $scope, r);
            });
        } : null;
        var error = !!fail && !!fail.call ? function (r) {
            $scope.$apply(function () {
                return fail.call(target || $scope, r);
            });
        } : null;
        task.then(succ, error);
        return task;
    }

    /**
      * Vue.js binding function.
      * http://vuejs.org/
      */
    export function bindVueJs(control: Common.VisualControl & Common.BindingContainerContract<any>) {
        if (typeof Vue === "undefined" || !control) return;
        if (!Vue) return;
        try {
            var data = { control: control };
            var disp = Common.listenBindingControl(control, data);
            var vue = new Vue({
                el: "#" + control.getId(),
                data: data,
                destroyed: function () {
                    disp.dispose();
                }
            });
            control.prop("vuejs", vue);
        } catch (ex) { }
    }

    /**
      * Creates an instance of Taobao JsTracker.
      * http://jstracker.taobao.net
      */
    export function taobaoJsTracker(): AliHub.Diagnostics.TrackerContract {
        var tracker = new AliHub.Diagnostics.Tracker();
        var l = tracker.logger();
        tracker.logger = () => {
            if (typeof JSTracker === "undefined") return l;
            return JSTracker || l;
        };
        (tracker as any).config = (key: string, value: string) => {
            if (typeof JSTracker === "undefined") return;
            if (!JSTracker || !JSTracker.config) return;
            try {
                JSTracker.config(key, value);
            } catch (ex) { }
        };
        return tracker;
    }

    /**
      * Goldlog.
      * http://shuju.taobao.ali.com/main/adminIndex.htm
      */
    export class GoldlogTracker implements AliHub.Diagnostics.PageAnalyticsClientContract {

        private static _instance: GoldlogTracker;

        /**
          * Singleton instance.
          */
        public static instance(): GoldlogTracker {
            if (!GoldlogTracker._instance) GoldlogTracker._instance = new GoldlogTracker();
            return this._instance;
        }

        public mapping = new Collection.Mapping<string[]>();

        public ignoreCustomizedParameter = false;

        /**
          * Records a stamp.
          */
        public record(key: string, parameter?: any) {
            var arr = this.mapping.get(key);
            if (!goldlog || !arr || !arr.length || arr.length < 4) return;            
            goldlog.record(arr[0], arr[1], !parameter || this.ignoreCustomizedParameter ? arr[2] : Elements.toQueryString(parameter), arr[3]);
        }

        /**
          * Records directly.
          */
        public recordDirectly(a1, a2, a3, a4) {
            GoldlogTracker.request(a1, a2, a3, a4);
        }

        /**
          * Checks whether the instance is alive.
          */
        public alive(): boolean {
            if (typeof goldlog === "undefined") return false;
            return !!goldlog && !!goldlog.record;
        }

        /**
          * Sets up a mapping.
          */
        public map(dict: AliHub.Collection.DictionaryContract<string[]>) {
            this.mapping.map(dict);
        }

        public push(key: string, value: string[]) {
            this.push(key, value);
        }

        public remove(key: string) {
            this.remove(key);
        }

        public clear() {
            this.mapping.clear();
        }

        public static request(a1, a2, a3, a4) {
            if (typeof goldlog !== "undefined") {
                if (!!goldlog && !!goldlog.record) {
                    goldlog.record(a1, a2, a3, a4);
                    return;
                }
            }

            var img = new Image();
            var id = Common.Maths.randomString("hidden_image");
            var timestamp = new Date().getTime();
            var src = "//wgo.mmstat.com/" + a1.toString() + "." + a2.toString() + "." + a3.toString() + "." + a4.toString() + "?cache=" + timestamp.toString() + "&gmkey=&gokey=&logtype=2";
            window[id] = img;
            setTimeout(() => {
                img.onload = img.onerror = function () {
                    setTimeout(() => {
                        delete window[id];
                    }, 400);
                };
                img.src = src;
            }, 20);

        }

    }

    /**
      * High charts factory.
      * http://highcharts.com/
      */
    export class HighChartsFactory {

        public static setup(override = false) {
            if (typeof Highcharts === "undefined") return;
            if (override || !AliHub.Graph.Extensions.radar) AliHub.Graph.Extensions.radar = HighChartsFactory.radar;
            if (override || !AliHub.Graph.Extensions.line) AliHub.Graph.Extensions.line = HighChartsFactory.line;
        }

        public static radar(element: HTMLElement, title: string, data: AliHub.Collection.PropertiesContract<number>) {
            var gen = function () {
                var keys = [];
                var values = [];
                for (var i = 0; i < data.length; i++) {
                    keys.push(data[i].key);
                    values.push(data[i].value);
                }

                if (!!jQuery('#' + element.id)["highcharts"]) jQuery('#' + element.id)["highcharts"]({
                    title: {
                        text: !!title ? title : "",
                        x: -80
                    },
                    chart: {
                        polar: true,
                        type: 'line'
                    },
                    pane: {
                        size: '80%'
                    },
                    legend: {
                        enabled: false
                    },
                    xAxis: {
                        categories: keys,
                        tickmarkPlacement: 'on',
                        lineWidth: 0
                    },
                    yAxis: {
                        gridLineInterpolation: 'polygon',
                        lineWidth: 0,
                        min: 0,
                        max: 100
                    },
                    tooltip: {
                        shared: true,
                        pointFormat: '<span style="color:{series.color}"><b>{point.y:,.0f}</b>'
                    },
                    series: [{
                        name: 'Values',
                        data: values,
                        pointPlacement: 'on'
                    }]
                });
            }
            jQuery(gen);
        }

        public static line(element: HTMLElement, title: string, data: AliHub.Collection.PropertiesContract<number>, options?: Graph.LineOptionsContract) {
            var gen = function () {
                var keys = [];
                var values = [];
                var indexes = [];
                for (var i = 0; i < data.length; i++) {
                    keys.push(data[i].key);
                    values.push(data[i].value);
                    indexes.push(i);
                }

                if (!!options && options.highlight != null) {
                    var plotBands = [{
                        from: options.highlight - 0.4,
                        to: options.highlight + 0.4,
                        color: 'rgba(0, 0, 0, 0.2)'
                    }]
                }

                if (!!jQuery('#' + element.id)["highcharts"]) jQuery('#' + element.id)["highcharts"]({
                    chart: {
                        type: 'areaspline'
                    },
                    title: {
                        text: !!title ? title : ""
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        series: {
                            marker: {
                                enabled: false
                            },
                            fillColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')
                        }
                    },
                    xAxis: {
                        categories: keys,
                        labels: {
                            formatter: function () {
                                return "";
                            }
                        },
                        plotBands: plotBands
                    },
                    yAxis: {
                        min: !!options && options.min != null ? options.min : null,
                        max: !!options && options.max != null ? options.max : null
                    },
                    tooltip: {
                        shared: true,
                        pointFormat: '<span style="color:{series.color}"><b>{point.y:,.0f}</b>'
                    },
                    series: [{
                        name: 'Values',
                        data: values
                    }]
                });
            };
            jQuery(gen);
        }

        public static pie(element: HTMLElement, title: string, data: AliHub.Collection.PropertiesContract<number>, options?: Graph.PieOptionsContract) {
            var gen = function () {
                var arr = [];
                data.forEach((item, ii, ia) => {
                    arr.push({
                        name: item.key,
                        y: item.value
                    });
                });
                if (!!jQuery('#' + element.id)["highcharts"]) jQuery('#' + element.id)["highcharts"]({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: !!title ? title : ""
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        name: "Brands",
                        colorByPoint: true,
                        innerSize: !!options && !!options.innerSize ? options.innerSize : null,
                        data: arr
                    }]
                });
            };
            jQuery(gen);
        }

    }

}
