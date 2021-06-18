/*  --------------------
 *  Web - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  web.ts
 *  Description  Web library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

/// <reference path="text.ts" />

namespace AliHub.Web {

    /**
      * Response task with result.
      */
    export interface ResponseTask<T> extends PromiseLike<Web.ResponseContract<T>> {
    }

    /**
      * Response task without result.
      */
    export interface EmptyResponseTask extends PromiseLike<Web.EmptyResponseContract> {
    }

    /**
      * Package contract with entry or raw data.
      */
    export interface PackageContract<T> {
        success: boolean;
        message: string;
        timestamp: Date;
        data?: T;
        result?: T;
        sent: Date;
        received: Date;
        info?: any;
    }

    /**
      * Package contract with entry or raw data. This is obsolete.
      */
    export interface ObsoletePackageContract<T> {
        isSuccess: boolean;
        errMsg: string;
        data: T;
    }

    /**
      * Web response information.
      */
    export interface EmptyResponseContract {
        /**
          * Timestamp.
          */
        timestamp: Date;

        [property: string]: any;
    }

    /**
      * Web response information.
      */
    export interface ResponseContract<T> extends EmptyResponseContract {
        /**
          * Result.
          */
        result?: T;
    }

    /**
      * Route rule.
      */
    interface RouteContract {
        /**
          * Condition.
          */
        condition: string | any;

        /**
          * Result.
          */
        result: string | any;

        /**
          * Additional property.
          */
        [property: string]: any;
    }

    /**
      * Web response with user online status information.
      */
    export interface HeartbeatResponseContract {
        /**
          * User online status.
          */
        online: Web.OnlineStatusContract;

        /**
          * Notification list.
          */
        notification: NotificationItemContract[];

    }

    /**
      * Heart beat request.
      */
    export interface HeartbeatRequestContract {
        /**
          * Ignore list of notification identifiers.
          */
        ignore: Collection.KeyValuePairContract<string, Date>[];

        /**
          * true if it is a initialized notification request to get further items; otherwise, false.
          */
        init: boolean;

    }

    /**
      * Notification item.
      */
    export interface NotificationItemContract {
        /**
          * Notification identifier.
          */
        id: string;

        /**
          * Notification type.
          */
        type: string;

        /**
          * Notification time stamp.
          */
        timestamp: Date;

    }

    /**
      * Active notification item.
      * Property "type" is "active".
      */
    export interface ActiveNotificationItemContract extends NotificationItemContract {
        sender: Common.ReferenceItemContract | Common.SenderItemContract;
        subject: string;
        target: Common.ReferenceItemContract | Common.SenderItemContract;
        content: string;
        published: Date;
        template: string;
        isRead: boolean;
    }

    /**
      * Online status information.
      */
    export interface OnlineStatusContract {

        /**
          * Status code.
          */
        status: number;

        /**
          * Status description message.
          */
        message: string;
    }

    /**
      * Web resolver information contract.
      */
    export interface WebResolverInfoContract<T> {

        /**
          * The URL template.
          */
        template?: string;

        /**
          * The convertor.
          */
        convertor?: Common.Func1<T, T>;

        /**
          * The property bag for URL formatting.
          */
        preBag?: string[];

        /**
          * A value indicating whether the result can be empty.
          */
        canBeEmpty?: boolean;

        /**
          * Mock handler.
          */
        mock?: Common.Func3<any, WebResolverInfoContract<T>, any, Web.ResponseTask<T>>;
    }

    /**
      * Web resolver binding information contract.
      */
    export interface WebResolverBindingContract {

        /**
          * The subject.
          */
        subject: string;

        /**
          * The key.
          */
        key: string;

        /**
          * The information.
          */
        info?: WebResolverInfoContract<any>;
    }

    /**
     * REST job contract.
     */
    export interface RestJobContract {

        /**
          * Sends by POST.
          */
        postInfo<T>(template: string, parameters: any, data: any, canBeEmpty: boolean, validation: (value: T) => boolean): PromiseLike<T>;

        /**
          * Sends by POST.
          */
        postEmpty(template: string, parameters: any, data: any): PromiseLike<boolean>;

        /**
          * Sends by GET.
          */
        getInfo<T>(template: string, parameters: any, canBeEmpty: boolean, validation: (value: T) => boolean): PromiseLike<T>;

        /**
          * Sends by GET.
          */
        getEmpty(template: string, parameters: any): PromiseLike<boolean>;

        /**
          * Sends by GET to resolve a string.
          */
        getString(template: string, parameters: any, canBeEmpty: boolean): PromiseLike<string>;

    }

    /**
      * Data package accessing job contract.
      */
    export interface DataPackageJobContract {

        /**
          * Sends by POST.
          */
        postInfo<T>(template: string, parameters: any, data: any, canBeEmpty: boolean, convertor: Common.Func1<T, T>): Web.ResponseTask<T>;

        /**
          * Sends by POST.
          */
        postEmpty<T>(template: string, parameters: any, data: any): Web.EmptyResponseTask;

        /**
          * Sends by GET.
          */
        getInfo<T>(template: string, parameters: any, canBeEmpty: boolean, convertor: Common.Func1<T, T>): Web.ResponseTask<T>;

        /**
          * Sends by GET.
          */
        getEmpty(template: string, parameters: any): Web.EmptyResponseTask;

        /**
          * Sets static data.
          */
        staticInfo<T>(data: T): Web.ResponseTask<T>;

        /**
          * Sets empty data.
          */
        staticEmpty(): Web.EmptyResponseTask;
    }

    /**
     * REST job.
     */
    export class RestJob implements Web.RestJobContract {

        private static _instance: RestJobContract;

        /**
          * Gets or sets default instance.
          */
        public static instance(value?: RestJobContract) {
            if (arguments.length > 0) {
                RestJob._instance = value;
            }

            if (!RestJob._instance) RestJob._instance = new RestJob();
            return RestJob._instance;
        }

        /**
          * Sends by POST.
          */
        public static postInfo<T>(template: string, parameters: any, data: any, canBeEmpty: boolean = true, validation: (value: T) => boolean = null): PromiseLike<T> {
            return RestJob.instance() ? RestJob.instance().postInfo(template, parameters, data, canBeEmpty, validation) : null;
        }

        /**
          * Sends by POST.
          */
        public static postEmpty(template: string, parameters: any, data: any): PromiseLike<boolean> {
            return RestJob.instance() ? RestJob.instance().postEmpty(template, parameters, data) : null;
        }

        /**
          * Sends by GET.
          */
        public static getInfo<T>(template: string, parameters: any, canBeEmpty: boolean = true, validation: (value: T) => boolean = null): PromiseLike<T> {
            return RestJob.instance() ? RestJob.instance().getInfo(template, parameters, canBeEmpty, validation) : null;
        }

        /**
          * Sends by GET.
          */
        public static getEmpty(template: string, parameters: any): PromiseLike<boolean> {
            return RestJob.instance() ? RestJob.instance().getEmpty(template, parameters) : null;
        }

        /**
          * Sends by GET to resolve a string.
          */
        public static getString(template: string, parameters: any, canBeEmpty: boolean = true): PromiseLike<string> {
            return RestJob.instance() ? RestJob.instance().getString(template, parameters, canBeEmpty) : null;
        }

        public static fetch = (window as any).fetch;

        /**
          * Sends by POST to resolve response JSON.
          */
        public postInfo<T>(template: string, parameters: any, data: any, canBeEmpty: boolean = true, validation: (value: T) => boolean = null, convertor?: (value: T) => T): PromiseLike<T> {
            var deferred = Common.deferred<T>();
            if (!deferred) return null;
            var path = Common.Text.format(template, parameters, true);
            if (!path) {
                Common.rejectDeferred(deferred, "empty path", path);
                return deferred.promise();
            }

            var callbackQ = Web.callbackQuery(path);
            if (callbackQ && (path.indexOf("&callbacktype=message") > 0 || path.indexOf("?callbacktype=message") > 0)) {
                var form = Elements.hiddenForm(path);
                form.addSet(data);
                form.submit<T>().then((r) => {
                    deferred.resolve(r.result);
                    form.dispose();
                }, (reason) => {
                    deferred.reject(reason);
                    form.dispose();
                });
            } else if (path.indexOf("&enablecors=true") > 0 || path.indexOf("?enablecors=true") > 0) {
                if (this._jQueryAjax(deferred, path, "POST", data, true, canBeEmpty, null, null)
                    || this._fetchResp(deferred, path, "POST", data, true, canBeEmpty, validation, convertor)) return deferred.promise();
                else Common.rejectDeferred(deferred, "cannot send cors request", path);
                return deferred.promise();
            }

            if (typeof jQuery !== "undefined") {
                if (jQuery && jQuery.post) {
                    jQuery.post(path, data, (actionResult) => {
                        if (!canBeEmpty && actionResult == null) {
                            Common.rejectDeferred(deferred, "empty response", path);
                            return deferred.promise();
                        }

                        if (validation && !validation(actionResult)) {
                            Common.rejectDeferred(deferred, "failed to validate", path);
                            return deferred.promise();
                        }

                        deferred.resolve(convertor ? convertor(actionResult) : actionResult);
                    }, "json").fail((ei) => { Common.rejectDeferred(deferred, "network error", ei); });
                    return deferred.promise();
                }
            }

            if (path.indexOf("&callback=") > 0 || path.indexOf("?callback=") >= 0) Common.rejectDeferred(deferred, "jsonp is not implemented", path);
            else if (this._fetchResp(deferred, path, "POST", data, false, canBeEmpty, validation, convertor)) return deferred.promise();
            else Common.rejectDeferred(deferred, "fetch api is not supported", path);
            return deferred.promise();
        }

        /**
          * Sends by POST without response.
          */
        public postEmpty(template: string, parameters: any, data: any): PromiseLike<boolean> {
            var deferred = Common.deferred<boolean>();
            if (!deferred) return null;
            var path = Common.Text.format(template, parameters, true);
            if (!path) {
                Common.rejectDeferred(deferred, "empty path", path);
                return deferred.promise();
            }

            var callbackQ = Web.callbackQuery(path);
            if (callbackQ && (path.indexOf("&callbacktype=message") > 0 || path.indexOf("?callbacktype=message") > 0)) {
                var form = Elements.hiddenForm(path);
                form.addSet(data);
                form.submit(true);
                setTimeout(() => {
                    form.dispose();
                }, 30000);
            } else if (path.indexOf("&enablecors=true") > 0 || path.indexOf("?enablecors=true") > 0) {
                if (this._jQueryAjax(deferred, path, "POST", data, true, "avoid", null, null)
                    || this._fetchResp(deferred, path, "POST", data, true, "avoid", null, null)) return deferred.promise();
                else Common.rejectDeferred(deferred, "cannot send cors request", path);
                return deferred.promise();
            }

            if (typeof jQuery !== "undefined") {
                if (jQuery && jQuery.post) {
                    jQuery.post(path, data, (actionResult) => {
                        deferred.resolve(true);
                    }, "json").fail((ei) => { Common.rejectDeferred(deferred, "network error", ei); });
                    return deferred.promise();
                }
            }

            if (path.indexOf("&callback=") > 0 || path.indexOf("?callback=") >= 0) Common.rejectDeferred(deferred, "jsonp is not implemented", path);
            else if (path.indexOf("callback=") < 0 && this._fetchResp(deferred, path, "POST", data, false, "avoid", null, null)) return deferred.promise();
            else Common.rejectDeferred(deferred, "fetch api is not supported", path);
            return deferred.promise();
        }

        /**
          * Sends by GET to resolve response JSON.
          */
        public getInfo<T>(template: string, parameters: any, canBeEmpty: boolean = true, validation: (value: T) => boolean = null, convertor?: (value: T) => T): PromiseLike<T> {
            var deferred = Common.deferred<T>();
            var path = Common.Text.format(template, parameters, true);
            if (!path) {
                Common.rejectDeferred(deferred, "empty path", path);
                return deferred.promise();
            }

            if (path.indexOf("&enablecors=true") > 0 || path.indexOf("?enablecors=true") > 0) {
                if (this._jQueryAjax(deferred, path, "GET", null, true, canBeEmpty, validation, convertor)
                    || this._fetchResp(deferred, path, "GET", null, true, canBeEmpty, validation, convertor)) return deferred.promise();
                else Common.rejectDeferred(deferred, "cannot send cors request", path);
                return deferred.promise();
            }

            if (typeof jQuery !== "undefined") {
                if (jQuery && jQuery.getJSON) {
                    jQuery.getJSON(path, (actionResult) => {
                        if (!canBeEmpty && actionResult == null) {
                            Common.rejectDeferred(deferred, "empty response", path);
                            return deferred.promise();
                        }

                        if (validation && !validation(actionResult)) {
                            Common.rejectDeferred(deferred, "failed to validate", path);
                            return deferred.promise();
                        }

                        deferred.resolve(convertor ? convertor(actionResult) : actionResult);
                    }).fail((ei) => { Common.rejectDeferred(deferred, "network error", ei); });
                    return deferred.promise();
                }
            }

            if (path.indexOf("&callback=") > 0 || path.indexOf("?callback=") >= 0) Common.rejectDeferred(deferred, "jsonp is not implemented", path);
            else if (this._fetchResp(deferred, path, "GET", null, false, canBeEmpty, validation, convertor)) return deferred.promise();
            else Common.rejectDeferred(deferred, "fetch api is not supported", path);
            return deferred.promise();
        }

        /**
          * Sends by GET without response.
          */
        public getEmpty(template: string, parameters: any): PromiseLike<boolean> {
            var deferred = Common.deferred<boolean>();
            var path = Common.Text.format(template, parameters, true);
            if (!path) {
                Common.rejectDeferred(deferred, "empty path", path);
                return deferred.promise();
            }

            if (path.indexOf("&enablecors=true") > 0 || path.indexOf("?enablecors=true") > 0) {
                if (this._jQueryAjax(deferred, path, "GET", null, true, "avoid", null, null)
                    || this._fetchResp(deferred, path, "GET", null, true, "avoid", null, null)) return deferred.promise();
                else Common.rejectDeferred(deferred, "cannot send cors request", path);
                return deferred.promise();
            }

            if (typeof jQuery !== "undefined") {
                if (jQuery && jQuery.get) {
                    jQuery.get(path, (actionResult) => {
                        deferred.resolve(true);
                    }).fail((ei) => { Common.rejectDeferred(deferred, "network error", ei); });;
                    return deferred.promise();
                }
            }

            if (path.indexOf("&callback=") > 0 || path.indexOf("?callback=") >= 0) Common.rejectDeferred(deferred, "jsonp is not implemented", path);
            else if (this._fetchResp(deferred, path, "GET", null, false, "avoid", null, null)) return deferred.promise();
            else Common.rejectDeferred(deferred, "fetch api is not supported", path);
            return deferred.promise();
        }

        /**
          * Sends by GET to resolve a string.
          */
        public getString(template: string, parameters: any, canBeEmpty: boolean = true): PromiseLike<string> {
            var deferred = Common.deferred<string>();
            if (!deferred) return null;
            var path = Common.Text.format(template, parameters, true);
            if (!path) {
                Common.rejectDeferred(deferred, "empty path", path);
                return deferred.promise();
            }

            if (path.indexOf("&enablecors=true") > 0 || path.indexOf("?enablecors=true") > 0) {
                if (this._jQueryAjax(deferred, path, "GET", null, true, canBeEmpty, null, null)
                    || this._fetchResp(deferred, path, "GET", null, true, canBeEmpty, null, null)) return deferred.promise();
                else Common.rejectDeferred(deferred, "cannot send cors request", path);
                return deferred.promise();
            }

            if (typeof jQuery !== "undefined") {
                if (jQuery && jQuery.get) {
                    jQuery.get(path, (actionResult) => {
                        if (!canBeEmpty && actionResult == null) {
                            deferred.reject();
                        }

                        deferred.resolve(actionResult);
                    }).fail((ei) => { Common.rejectDeferred(deferred, "network error", ei); });
                    return deferred.promise();
                }
            }

            if (path.indexOf("&callback=") > 0 || path.indexOf("?callback=") >= 0) Common.rejectDeferred(deferred, "jsonp is not implemented", path);
            else if (this._fetchResp(deferred, path, "GET", null, false, canBeEmpty, null, null)) return deferred.promise();
            else Common.rejectDeferred(deferred, "fetch api is not supported", path);
            return deferred.promise();
        }

        private _jQueryAjax<T>(deferred: Common.DeferredContract<T>, path: string, method: string, data: any, cors: boolean, canBeEmpty: boolean | "avoid", validation: (value: T) => boolean = null, convertor: (value: T) => T) {
            if (typeof jQuery === "undefined") return false;
            if (!jQuery || !jQuery.ajax) return false;
            var options: JQueryAjaxSettings = {
                type: method,
                url: path,
                data: data,
                dataType: "json",
                success: function (actionResult) {
                    if (canBeEmpty === "avoid") {
                        deferred.resolve(true as any);
                    } else {
                        if (!canBeEmpty && actionResult == null) {
                            deferred.reject();
                        }

                        if (validation && !validation(actionResult)) {
                            deferred.reject();
                        }

                        deferred.resolve(convertor ? convertor(actionResult) : actionResult);
                    }
                }
            };
            if (cors) {
                options.crossDomain = true;
                options.xhrFields = { withCredentials: true };
            }

            try {
                jQuery.ajax(options).fail((ei) => { Common.rejectDeferred(deferred, "network error", ei); });
                return true;
            } catch (ex) {
                return false;
            }
        }

        private _fetchResp<T>(deferred: Common.DeferredContract<T>, path: string, method: string, data: any, cors: boolean, canBeEmpty: boolean | "avoid", validation: (value: T) => boolean = null, convertor: (value: T) => T) {
            if (typeof RestJob.fetch !== "function")
                return false;
            var options = {
                method: method
            } as any;
            if (cors) options.mode = "cors";
            if (data) {
                try {
                    if (typeof data.append === "function" || data instanceof ArrayBuffer || data instanceof Blob || data instanceof File) {
                        if (!data.needSerialize) options.body = data;
                    }
                } catch (ex) { }

                if (!options.body) options.body = Web.buildParaString(data);
            }

            try {
                RestJob.fetch(path, options).then(
                    (response) => {
                        if (!response.ok) {
                            Common.rejectDeferred(deferred, "response status error");
                            return;
                        }

                        if (canBeEmpty === "avoid") deferred.resolve(true as any);
                        else response.text().then(
                            (respJson) => {
                                if (!canBeEmpty && respJson == null) {
                                    Common.rejectDeferred(deferred, "empty response", path);
                                    return;
                                }

                                if (validation && !validation(respJson)) {
                                    Common.rejectDeferred(deferred, "failed to validate", path);
                                    return;
                                }

                                deferred.resolve(convertor ? convertor(respJson) : respJson);
                            },
                            (exJson) => {
                                Common.rejectDeferred(deferred, "parse error", exJson);
                            }
                        );
                    },
                    (exResp) => {
                        Common.rejectDeferred(deferred, "fetch error", exResp);
                    }
                );
                return true;
            } catch (ex) {
                return false;
            }
        }

    }

    /**
      * Data package accessing job.
      */
    export class DataPackageJob implements Web.DataPackageJobContract {

        private static _instance: DataPackageJobContract;

        /**
          * Gets or sets default instance.
          */
        public static instance(value?: DataPackageJob) {
            if (arguments.length > 0) {
                DataPackageJob._instance = value;
            }

            if (!DataPackageJob._instance) DataPackageJob._instance = new DataPackageJob();
            return DataPackageJob._instance;
        }

        /**
          * Sends by POST.
          */
        public static postInfo<T>(template: string, parameters: any, data: any, canBeEmpty: boolean = true, convertor?: (value: T) => T): Web.ResponseTask<T> {
            if (typeof data === "function") data = data();
            return DataPackageJob.instance() ? DataPackageJob.instance().postInfo(template, parameters, data, canBeEmpty, convertor) : null;
        }

        /**
          * Sends by POST.
          */
        public static postEmpty<T>(template: string, parameters: any, data: any): Web.EmptyResponseTask {
            if (typeof data === "function") data = data();
            return DataPackageJob.instance() ? DataPackageJob.instance().postEmpty(template, parameters, data) : null;
        }

        /**
          * Sends by GET.
          */
        public static getInfo<T>(template: string, parameters: any, canBeEmpty: boolean = true, convertor?: (value: T) => T): Web.ResponseTask<T> {
            return DataPackageJob.instance() ? DataPackageJob.instance().getInfo(template, parameters, canBeEmpty, convertor) : null;
        }

        /**
          * Sends by GET.
          */
        public static getEmpty(template: string, parameters: any): Web.EmptyResponseTask {
            return DataPackageJob.instance() ? DataPackageJob.instance().getEmpty(template, parameters) : null;
        }

        /**
          * Sets static data.
          */
        public static staticInfo<T>(data: T): Web.ResponseTask<T> {
            return DataPackageJob.instance() ? DataPackageJob.instance().staticInfo(data) : null;
        }

        /**
          * Sets empty data.
          */
        public static staticEmpty(): Web.EmptyResponseTask {
            return DataPackageJob.instance() ? DataPackageJob.instance().staticEmpty() : null;
        }

        /**
          * Updgrade package.
          */
        public static upgradePackage<T>(value: Web.PackageContract<T> | Web.ObsoletePackageContract<Web.ResponseContract<T>> | Web.ObsoletePackageContract<Web.EmptyResponseContract>, sent?: Date): Web.PackageContract<T> {
            var copied = {};
            try {
                copied = Common.Reflection.copy(value);
            } catch (ex) { }
            var originalValue = value as any;
            sent = Common.DateTime.parse(sent);
            if (originalValue == null || typeof originalValue === "string" || typeof originalValue === "number" || typeof originalValue === "boolean" || originalValue instanceof Array) {
                return {
                    data: originalValue,
                    result: originalValue,
                    success: true,
                    timestamp: new Date(),
                    message: null,
                    sent: sent,
                    received: new Date(),
                    info: copied
                };
            }

            if (originalValue.success != null) {
                if (originalValue.data == null) originalValue.data = originalValue.content || originalValue.result || originalValue.resultData;
                if (originalValue.message == null && originalValue.errorMsg != null) originalValue.message = originalValue.errorMsg || originalValue.errMsg || originalValue.exMsg;
                originalValue.sent = sent;
                originalValue.received = new Date();
                originalValue.result = originalValue.data;
                originalValue.info = copied;
                return originalValue;
            }

            var opc = originalValue as Web.ObsoletePackageContract<Web.ResponseContract<T>>;
            if (opc.isSuccess == null && (value as any).result != null) {
                return {
                    data: originalValue.data,
                    success: originalValue.result === "true" || originalValue.result === true,
                    timestamp: originalValue.timestamp != null ? originalValue.timestamp : new Date(),
                    message: opc.errMsg != null ? opc.errMsg : originalValue.message,
                    sent: sent,
                    received: new Date(),
                    info: copied
                };
            }

            if (opc.isSuccess == null && (value as any).status != null) {
                return {
                    data: originalValue.data || originalValue.result || originalValue.resultData,
                    result: originalValue.data || originalValue.result || originalValue.resultData,
                    success: originalValue.status === 1 || originalValue.status === true || originalValue.status === "ok" || originalValue.status === "Ok" || originalValue.status === "OK",
                    timestamp: originalValue.timestamp != null ? originalValue.timestamp : new Date(),
                    message: opc.errMsg != null ? opc.errMsg : originalValue.message,
                    sent: sent,
                    received: new Date(),
                    info: copied
                };
            }

            if (opc.isSuccess == null) {
                return {
                    data: opc as any,
                    result: opc as any,
                    success: true,
                    timestamp: new Date(),
                    message: null,
                    sent: sent,
                    received: new Date(),
                    info: copied
                };
            }

            var result: Web.PackageContract<T> = {
                data: null,
                message: opc.errMsg,
                success: opc.isSuccess,
                timestamp: new Date(),
                sent: sent,
                received: new Date(),
                info: copied
            };
            if (opc.data) {
                result.data = opc.data.result;
                if (opc.data.timestamp != null) result.timestamp = opc.data.timestamp;
            }

            result.result = result.data;
            return result;
        }

        /**
          * Sends by POST.
          */
        public postInfo<T>(template: string, parameters: any, data: any, canBeEmpty: boolean = true, convertor?: (value: T) => T): Web.ResponseTask<T> {
            var deferred = Common.deferred<Web.ResponseContract<T>>();
            if (!deferred) return null;
            var sent = new Date();
            var postData = {};
            var templateLower = template ? template.toString().toLowerCase() : null;
            if (data == null) {
                postData = null;
            } else if (typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
                postData = data;
            } else if (templateLower && (templateLower.indexOf("&requestencode=form") > 0 || templateLower.indexOf("?requestencode=form") > 0)) {
                postData = data;
            } else {
                var serialize: Common.Func1<string, string> = null;
                var onlyJson = "full";
                if (templateLower) {
                    if (templateLower.indexOf("&requestencode=base64") > 0 || templateLower.indexOf("?requestencode=base64") > 0) serialize = Common.Text.base64encode;
                    else if (templateLower.indexOf("&requestencode=uri") > 0 || templateLower.indexOf("?requestencode=uri") > 0) serialize = encodeURIComponent;
                    if (templateLower.indexOf("&requestfield=simple") > 0 || templateLower.indexOf("?requestfield=simple") > 0) onlyJson = "simple";
                    else if (templateLower.indexOf("&requestfield=string") > 0 || templateLower.indexOf("?requestfield=string") > 0) onlyJson = "string";
                }

                for (var key in data) {
                    if (key == null || (typeof key !== "string" && typeof key !== "number")) continue;
                    var fieldStr = Common.Text.serialize(data[key], onlyJson as any);
                    if (serialize) fieldStr = serialize(fieldStr);
                    postData[key] = fieldStr;
                }
            }

            Web.RestJob.postInfo<Web.PackageContract<T>>(template, parameters, postData, canBeEmpty).then((actionResult) => {
                actionResult = DataPackageJob.upgradePackage(actionResult, sent);
                actionResult.timestamp = Common.DateTime.parse(actionResult.timestamp);
                if (!actionResult.success) {
                    Common.rejectDeferred(deferred, "failed result", actionResult);
                    return;
                }

                if (!canBeEmpty && actionResult.data == null) {
                    Common.rejectDeferred(deferred, "empty result", actionResult);
                    return;
                }

                if (convertor) actionResult.data = convertor(actionResult.data);
                deferred.resolve(actionResult);
            }, (ei) => { deferred.reject(ei); });
            return deferred.promise();
        }

        /**
          * Sends by POST.
          */
        public postEmpty<T>(template: string, parameters: any, data: any): Web.EmptyResponseTask {
            var deferred = Common.deferred<Web.EmptyResponseContract>();
            if (!deferred) return null;
            var sent = new Date();
            var postData = {};
            var templateLower = template ? template.toString().toLowerCase() : null;
            if (data == null) {
                postData = null;
            } else if (typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
                postData = data;
            } else if (templateLower && (templateLower.indexOf("&requestencode=form") > 0 || templateLower.indexOf("?requestencode=form") > 0)) {
                postData = data;
            } else {
                var serialize: Common.Func1<string, string> = null;
                if (template) {
                    if (templateLower.indexOf("&requestencode=base64") > 0 || templateLower.indexOf("?requestencode=base64") > 0) serialize = Common.Text.base64encode;
                    else if (templateLower.indexOf("&requestencode=uri") > 0 || templateLower.indexOf("?requestencode=uri") > 0) serialize = encodeURIComponent;
                }

                for (var key in data) {
                    if (key == null || (typeof key !== "string" && typeof key !== "number")) continue;
                    var fieldStr = Common.Text.serialize(data[key]);
                    if (serialize) fieldStr = serialize(fieldStr);
                    postData[key] = fieldStr;
                }
            }

            Web.RestJob.postInfo<Web.PackageContract<void>>(template, parameters, postData, true).then((actionResult) => {
                actionResult = DataPackageJob.upgradePackage(actionResult, sent);
                actionResult.timestamp = Common.DateTime.parse(actionResult.timestamp);
                if (!actionResult.success) Common.rejectDeferred(deferred, "failed result", actionResult);
                else deferred.resolve({ success: true, timestamp: Common.DateTime.parse(actionResult.timestamp) });
            }, (ei) => { deferred.reject(ei); });
            return deferred.promise();
        }

        /**
          * Sends by GET.
          */
        public getInfo<T>(template: string, parameters: any, canBeEmpty: boolean = true, convertor?: (value: T) => T): Web.ResponseTask<T> {
            var deferred = Common.deferred<Web.ResponseContract<T>>();
            if (!deferred) return null;
            var sent = new Date();
            Web.RestJob.getInfo<Web.PackageContract<T>>(template, parameters, canBeEmpty).then((actionResult) => {
                actionResult = DataPackageJob.upgradePackage(actionResult, sent);
                actionResult.timestamp = Common.DateTime.parse(actionResult.timestamp);
                if (!actionResult.success) {
                    Common.rejectDeferred(deferred, "failed result", actionResult);
                    return;
                }

                if (!canBeEmpty && actionResult.data == null) {
                    Common.rejectDeferred(deferred, "empty result", actionResult);
                    return;
                }

                if (convertor) actionResult.data = convertor(actionResult.data);
                deferred.resolve(actionResult);
            }, (ei) => { deferred.reject(ei); });
            return deferred.promise();
        }

        /**
          * Sends by GET.
          */
        public getEmpty(template: string, parameters: any): Web.EmptyResponseTask {
            var deferred = Common.deferred<Web.EmptyResponseContract>();
            if (!deferred) return null;
            var sent = new Date();
            Web.RestJob.getInfo<Web.PackageContract<Web.EmptyResponseContract>>(template, parameters, true).then((actionResult) => {
                actionResult = DataPackageJob.upgradePackage(actionResult, sent);
                actionResult.timestamp = Common.DateTime.parse(actionResult.timestamp);
                if (!actionResult.success) Common.rejectDeferred(deferred, "failed result", actionResult);
                else deferred.resolve({ success: true, timestamp: Common.DateTime.parse(actionResult.timestamp) });
            }, (ei) => { deferred.reject(ei); });
            return deferred.promise();
        }

        /**
          * Sets static data.
          */
        public staticInfo<T>(data: T): Web.ResponseTask<T> {
            var deferred = Common.deferred<Web.ResponseContract<T>>();
            if (!deferred) return null;
            var sent = new Date();
            deferred.resolve({
                success: true,
                data: data,
                result: data,
                timestamp: new Date(),
                sent: sent,
                received: new Date()
            });
            return deferred.promise();
        }

        /**
          * Sets empty data.
          */
        public staticEmpty(): Web.EmptyResponseTask {
            var deferred = Common.deferred<Web.EmptyResponseContract>();
            if (!deferred) return null;
            var sent = new Date();
            deferred.resolve({
                success: true,
                timestamp: new Date(),
                sent: sent,
                received: new Date()
            });
            return deferred.promise();
        }

    }

    export class StaticDataPackageResolver<T> {

        private _data: T;

        public data(value?: T): T {
            if (arguments.length > 0) {
                this._data = value;
            }

            return this._data;
        }

        public resolve(): Web.ResponseTask<T> {
            return DataPackageJob.staticInfo(this._data);
        }

    }

    export abstract class BaseDataPackageResolver<T> {

        public info: WebResolverInfoContract<T>;

        public constructor(info?: WebResolverInfoContract<T>, subject?: string, key?: string) {
            this.info = info || { template: null };
            if (subject && key) resolver(subject, key, this.info);
        }

        public pathTemplate(value?: string): string {
            if (arguments.length > 0) this.info.template = value;
            return this.info.template;
        }

    }

    export class DataPackageResolver<T> extends BaseDataPackageResolver<T> {

        public constructor(info?: WebResolverInfoContract<T>, subject?: string, key?: string) {
            super(info, subject, key);
        }

        public resolve(model: any = null): Web.ResponseTask<T> {
            var info = this.info;
            if (info.mock) return info.mock(model, info, null);
            var url = Common.Text.format(info.template, null, true, info.preBag);
            return DataPackageJob.getInfo<T>(url, model, info.canBeEmpty, info.convertor);
        }
    }

    export class RequestDataPackageResolver<TRequest, TResponse> extends BaseDataPackageResolver<TResponse> {

        public constructor(info?: WebResolverInfoContract<TResponse>, subject?: string, key?: string) {
            super(info, subject, key);
        }

        public resolve(model: TRequest): Web.ResponseTask<TResponse> {
            var info = this.info;
            if (info.mock) return info.mock(model, info, null);
            var url = Common.Text.format(info.template, model, true, info.preBag);
            return DataPackageJob.getInfo<TResponse>(url, info, info.canBeEmpty, info.convertor);
        }
    }

    export class IdentifiedDataPackageResolver<T> extends BaseDataPackageResolver<T> {

        public constructor(info?: WebResolverInfoContract<T>, subject?: string, key?: string) {
            super(info, subject, key);
        }

        public resolve(id: string, model?: any): Web.ResponseTask<T> {
            if (!model) model = {};
            model.id = id;
            var info = this.info;
            if (info.mock) return info.mock(model, info, null);
            var url = Common.Text.format(info.template, model, true, info.preBag);
            return DataPackageJob.getInfo<T>(url, info, info.canBeEmpty, info.convertor);
        }
    }

    export class NamedDataPackageResolver<T> extends BaseDataPackageResolver<T> {

        public constructor(info?: WebResolverInfoContract<T>, subject?: string, key?: string) {
            super(info, subject, key);
        }

        public resolve(name: string, model?: any): Web.ResponseTask<T> {
            if (!model) model = {};
            model.name = name;
            var info = this.info;
            if (info.mock) return info.mock(model, info, null);
            var url = Common.Text.format(info.template, model, true, info.preBag);
            return DataPackageJob.getInfo<T>(url, info, info.canBeEmpty, info.convertor);
        }
    }

    export class PostDataPackageResolver<TRequest, TResponse> extends BaseDataPackageResolver<TResponse> {

        public constructor(info?: WebResolverInfoContract<TResponse>, subject?: string, key?: string) {
            super(info, subject, key);
        }

        public resolve(model: TRequest, data: any): Web.ResponseTask<TResponse> {
            var info = this.info;
            if (info.mock) return info.mock(model, info, data);
            var url = Common.Text.format(info.template, model, true, info.preBag);
            return DataPackageJob.postInfo<TResponse>(url, info, data, info.canBeEmpty, info.convertor);
        }
    }

    /**
      * Heartbeat.
      */
    export class Heartbeat {

        private static _ignore: Collection.KeyValuePairContract<string, Date>[];

        private static _enabled = false;

        public static interval = 5000;

        public static instance = new Heartbeat();

        public pathTemplate: string;

        public ping(input: Web.HeartbeatRequestContract): Web.ResponseTask<Web.HeartbeatResponseContract> {
            return DataPackageJob.postInfo<Web.HeartbeatResponseContract>(this.pathTemplate, null, input);
        }

        /**
          * Enables heartbeat.
          */
        public static enable() {
            Heartbeat._check();
            Heartbeat._enabled = true;
        }

        /**
          * Registers handler.
          */
        public static addHandler(type: string, h: Common.Action2<NotificationItemContract, NotificationItemContract>): void {
            Web.NotificationCache.instance.addHandler(type, h);
        }

        private static _check() {
            var p: Web.HeartbeatRequestContract = {
                init: false,
                ignore: Heartbeat._ignore
            };
            Heartbeat._ignore = null;
            Heartbeat.instance.ping(p).then((actionData) => {
                if (!actionData || !actionData.result) return;
                var resp = actionData.result;
                if (!resp.notification) return;
                var nList: Collection.KeyValuePairContract<string, Date>[] = [];
                var col = Web.NotificationCache.instance.pushRange(resp.notification);
                col.forEach((nV, nI, nA) => {
                    if (!nV) return;
                    nList.push({ key: nV.id, value: nV.timestamp });
                });
                Heartbeat._ignore = nList;
                var interval = Heartbeat.interval;
                if (interval == null || typeof interval !== "number") return;
                setTimeout(() => {
                    Heartbeat._check();
                }, interval);
            }, () => {
                var interval = Heartbeat.interval;
                if (interval == null || typeof interval !== "number") return;
                setTimeout(() => {
                    Heartbeat._check();
                }, interval);
            });
        }

    }

    export class NotificationCache {

        private _h: Collection.DictionaryContract<Common.Action2<NotificationItemContract, NotificationItemContract>> = {};

        private _list: NotificationItemContract[] = [];

        public static instance = new NotificationCache();

        /**
          * Pushes notification.
          */
        public push(value: NotificationItemContract): boolean {
            if (!value || !value.id || value.id === "" || value.timestamp == null || !value.type) return false;
            value.timestamp = Common.DateTime.parse(value.timestamp);
            var index = -1;
            var oldValue: NotificationItemContract = null;
            if (this._list.some((ele, i, arr) => {
                if (ele.id !== value.id) return false;
                if (ele.timestamp <= value.timestamp) index = i;
                oldValue = ele;
                return true;
            })) {
                if (index < 0) return false;
                this._list[index] = value;
            } else {
                this._list.push(value);
                index = this._list.length;
            }

            this._raiseHandler(value, oldValue);
            return true;
        }

        /**
          * Pushes a collection of notification.
          */
        public pushRange(col: NotificationItemContract[]): NotificationItemContract[] {
            if (!col) return [];
            var list = [];
            col.forEach((ele, i, arr) => {
                if (!this.push(ele)) return false;
                list.push(ele);
            });
            return list;
        }

        /**
          * Registers handler.
          */
        public addHandler(type: string, h: Common.Action2<NotificationItemContract, NotificationItemContract>): void {
            if (!type || type === "" || !h) return;
            this._h[type] = h;
        }

        private _raiseHandler(value: Web.NotificationItemContract, oldValue: Web.NotificationItemContract): void {
            if (!value) return;
            var h = this._h[value.type];
            if (!h) return;
            h(value, oldValue);
        }

    }

    export function callbackQuery(url: string): string {
        if (!url || url.length < 10) return null;
        var mark = "&";
        var callbackIndex = url.indexOf("&callback=?");
        if (callbackIndex < 0) {
            callbackIndex = url.indexOf("?callback=?");
            mark = "?";
        }

        if (callbackIndex < 0) return null;
        if (callbackIndex + 11 < url.length) {
            if (url.indexOf("&", callbackIndex + 1) < 0 && url.indexOf("#", callbackIndex + 1) < 0) return null;
        }

        return mark + "callaback=?";
    }

    /**
      * Gets or sets the resolver.
      */
    export function resolver<T>(subject: string | HTMLElement | Common.VisualControl, key: string, value?: string | WebResolverInfoContract<T>): RequestDataPackageResolver<any, T> {
        var info: WebResolverInfoContract<T>;
        if (!subject) return null;
        if (typeof subject === "string") {
            info = Res.settingsProp(subject, "urls", key);
            if (!info) {
                info = {} as any;
                Res.settingsProp(subject, "urls", key, info);
            }
        } else if ((subject as HTMLElement).tagName || (subject as Common.VisualControl).getElement) {
            var ele = (subject as Common.VisualControl).getElement && typeof (subject as Common.VisualControl).getElement === "function" ? (subject as Common.VisualControl).getElement() : subject as HTMLElement;
            if (ele && ele.tagName) {
                var eleAttr = Elements.parseAttr(subject, "urls", true);
                info = eleAttr && eleAttr[key] && typeof eleAttr[key] === "string" ? info = {
                    template: eleAttr[key]
                } : null;
            }
        }

        if (arguments.length > 2) {
            if (value == null) info = null;
            else if (typeof value === "string") info.template = value;
            else info = value;
            if (!subject) {
            } else if (typeof subject === "string") {
                Res.settingsProp(subject, "urls", key, info);
            }
        }

        if (info.canBeEmpty == null) info.canBeEmpty = true;
        var resolver = new RequestDataPackageResolver<any, T>(info);
        return resolver;
    }

    /**
      * Creates resolvers.
      */
    export function createResolvers(col: WebResolverBindingContract[]) {
        if (!col) return;
        col.forEach((ele, i, arr) => {
            if (!ele || !ele.subject || !ele.key) return;
            resolver(ele.subject, ele.key, ele.info);
        });
    }

    /**
      * Batch adds URL templates.
      */
    export function setUrlTemplates(subject: string, urls: Common.ClassicObject): string[] {
        if (!urls) return;
        var keys = [];
        for (var ele in urls) {
            if (!ele || typeof ele !== "string") continue;
            var prop = urls[ele];
            if (!prop || (typeof prop !== "string" && !prop.template)) continue;
            resolver(subject, ele, prop);
            keys.push(ele);
        }

        return keys;
    }

    /**
      * Serializes a data to a URL format string.
      * @param link  the base URL string.
      * @param data  the data model.
      */
    export function mergeLink(link: string, data: any, justAppend = false) {
        var url: string = (link || "").toString();
        if (data) {
            var urlSplit = justAppend || url.indexOf("?") >= 0 ? "&" : "?";
            for (var prop in data) {
                if (!prop || typeof prop !== "string") continue;
                url += urlSplit + encodeURIComponent(prop) + "=" + encodeURIComponent((data[prop] || "").toString());
                urlSplit = "&";
            }
        }

        return url;
    }

    function _getResolverInfo<T>(subject: string | HTMLElement | Common.VisualControl, key: string | Web.BaseDataPackageResolver<T>): WebResolverInfoContract<T> {
        if (!key) {
            return subject && typeof subject === "string" ? { template: subject } : null;
        }

        if (subject && typeof subject === "string" && typeof key === "string") {
            return resolver<T>(subject, key).info;
        }

        if (subject && typeof subject !== "string" && typeof key === "string") {
            var prop = null;
            if ((subject as any).urls) {
                prop = (subject as any).urls;
                if (prop && typeof prop === "function") prop = (prop as Function).call(subject);
            } else if (((subject as any as HTMLElement).tagName && (subject as any as HTMLElement).getAttribute) || ((subject as any as Common.VisualControl).getId && !!(subject as any as Common.VisualControl).getElement)) {
                prop = Elements.parseAttr(subject, "urls", true);
                if (prop === undefined) prop = Elements.parseAttr(subject, "config-urls", true);
            }

            if (prop && prop[key]) return typeof prop[key] === "string" ? { template: prop[key] } : prop[key];
            else return null;
        }

        if (!subject) {
            return typeof key !== "string" ? key.info : { template: key };
        }

        return null;
    }

    /**
      * Resolves data by GET.
      */
    export function resolve<T>(subject: string | HTMLElement | Common.VisualControl, key: string | Web.BaseDataPackageResolver<T>, parameters?: any): Web.ResponseTask<T> {
        var info = _getResolverInfo<T>(subject, key);
        if (!info) return Common.rejectDeferred(null, "web resolver does not exist");
        if (info.mock) return info.mock(parameters, info, null);
        var url = Common.Text.format(info.template, parameters, true, info.preBag);
        return DataPackageJob.getInfo<T>(url, null, info.canBeEmpty, info.convertor);
    }

    /**
      * Resolves empty by GET.
      */
    export function resolveEmpty(subject: string | HTMLElement | Common.VisualControl, key: string | Web.BaseDataPackageResolver<any>, parameters?: any): Web.EmptyResponseTask {
        var info = _getResolverInfo<any>(subject, key);
        if (!info) return Common.rejectDeferred(null, "web resolver does not exist");
        if (info.mock) return info.mock(parameters, info, null);
        var url = Common.Text.format(info.template, parameters, true, info.preBag);
        return DataPackageJob.getEmpty(url, null);
    }

    /**
      * Resolves data by POST.
      */
    export function resolveByPost<T>(subject: string | HTMLElement | Common.VisualControl, key: string | Web.BaseDataPackageResolver<T>, parameters?: any, data?: any): Web.ResponseTask<T> {
        var info = _getResolverInfo<T>(subject, key);
        if (!info) return Common.rejectDeferred(null, "web resolver does not exist");
        if (info.mock) return info.mock(parameters, info, data);
        var url = Common.Text.format(info.template, parameters, true, info.preBag);
        return DataPackageJob.postInfo<T>(url, null, data, info.canBeEmpty, info.convertor);
    }

    /**
      * Resolves empty by POST.
      */
    export function resolveEmptyByPost(subject: string | HTMLElement | Common.VisualControl, key: string | Web.BaseDataPackageResolver<any>, parameters?: any, data?: any): Web.EmptyResponseTask {
        var info = _getResolverInfo<any>(subject, key);
        if (!info) return Common.rejectDeferred(null, "web resolver does not exist");
        if (info.mock) return info.mock(parameters, info, data);
        var url = Common.Text.format(info.template, parameters, true, info.preBag);
        return DataPackageJob.postEmpty(url, null, data);
    }

    /**
      * Builds a parameter string.
      */
    export function buildParaString(parameters: any, onlySimple = false): string {
        if (!parameters) return "";
        var str = "";
        var step = 0;
        for (var ele in parameters) {
            if (!ele || (typeof ele !== "string" && typeof ele !== "number")) continue;
            ele = ele.toString()
            var prop = parameters[ele];
            if (prop == null) prop = "";
            if (onlySimple && typeof prop !== "string" && typeof prop !== "number") continue;
            prop = Common.Text.serialize(prop, "string");
            if (step > 0) str += "&";
            str += encodeURIComponent(ele) + "=" + encodeURIComponent(prop);
            step++;
        }

        return str;
    }

}
