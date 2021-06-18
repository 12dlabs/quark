/*  --------------------
 *  Diagnostics - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  diagnostics.ts
 *  Description  Diagnostics library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

/// <reference path="common.ts" />

namespace AliHub.Diagnostics {

    /**
      * Tracker client.
      */
    export interface TrackerContract {

        /**
          * Logs something.
          */
        log(type: LogTypes, category: string, message: string, ...optionalParams: any[]);

    }

    /**
      * Page anaytics client.
      */
    export interface PageAnalyticsClientContract {

        /**
          * Records a stamp.
          */
        record(id: string, parameter?: any);

    }

    export interface TrackerLoggerContract {
        info(message?: any, ...optionalParams: any[]): void;
        debug(message?: any, ...optionalParams: any[]): void;
        warn(message?: any, ...optionalParams: any[]): void;
        error(message?: any, ...optionalParams: any[]): void;
    }

    interface InstancesContract {
        tracker?: TrackerContract,
        consoleTracker?: Tracker,
        emptyTracker?: Tracker,
        pageAnalyticsClient?: PageAnalyticsClientContract
    }

    /**
      * The hit state.
      */
    export interface HitStateContract {

        /**
          * The application ID.
          */
        app?: string;

        /**
          * The page ID.
          */
        page?: string;

        /**
          * The user ID.
          */
        user?: string;

        /**
          * The hit index in current tracking activity.
          */
        step: number;

        /**
          * The tracking activity ID which is per user, page and session.
          */
        track: string;

        /**
          * The note of the hit event.
          */
        note?: string;

        /**
          * Hit event timestamp.
          */
        timestamp: Date;

        /**
          * Property.
          */
        [property: string]: any;
    }

    export interface LogRecordContract
    {
        level: number;
        category: string;
        message: string;
        parameters: any[];
        created: Date
    }

    var _instances: InstancesContract = {};

    /**
      * Log types.
      */
    export enum LogTypes {

        /**
          * Information.
          */
        info = 0,

        /**
          * Debug.
          */
        debug = 1,

        /**
          * Warn.
          */
        warn = 2,

        /**
          * Error.
          */
        error = 3,

        /**
          * Fatal.
          */
        fatal = 4,

    }

    /**
      * Tracker.
      */
    export class Tracker implements TrackerContract, PageAnalyticsClientContract {

        public static console = false;

        public history: LogRecordContract[] = [];
        public historyCount = 0;

        /**
          * Records with an identifier for mark.
          */
        public record(id: string, parameter?: any) {
            this.debug("ProcRec", id + " (AliHub.Diagnostics.Tracker.record)", parameter);
        }

        /**
          * Resolves a logger or console instance.
          */
        public logger(): TrackerLoggerContract {
            return null;
        }

        /**
          * Logs a message as specific level.
          */
        public log(type: LogTypes, category: string, message: string, ...optionalParams: any[]) {
            switch (type as LogTypes | string) {
                case LogTypes.info:
                case "info":
                    if (this.info) this.info(category, message);
                    break;
                case LogTypes.debug:
                case "debug":
                    if (this.debug) this.debug(category, message);
                    break;
                case LogTypes.warn:
                case "warn":
                    if (this.warn) this.warn(category, message);
                    break;
                case LogTypes.error:
                case "error":
                    if (this.error) this.error(category, message);
                    break;
                default:
                    break;
            }
        }

        /**
          * Logs a message as INFO level.
          */
        public info(category: string, message: string, ...optionalParams: any[]) {
            var l = this.logger();
            var createdDate = new Date
            if (l && l.info) l.info("[" + category + "] " + message, ...optionalParams);
            if (this.historyCount < 1) return;
            if (this.historyCount < this.history.length) this.history.splice(0, this.history.length - this.historyCount + 1);
            this.history.push({
                level: LogTypes.info,
                category: category,
                message: message,
                parameters: optionalParams,
                created: createdDate
            });
        }

        /**
          * Logs a message for debug.
          */
        public debug(category: string, message: string, ...optionalParams: any[]) {
            var l = this.logger();
            var createdDate = new Date
            if (l && l.debug) l.debug("[" + category + "] " + message, ...optionalParams);
            if (this.historyCount < 1) return;
            if (this.historyCount < this.history.length) this.history.splice(0, this.history.length - this.historyCount + 1);
            this.history.push({
                level: LogTypes.debug,
                category: category,
                message: message,
                parameters: optionalParams,
                created: createdDate
            });
        }

        /**
          * Logs a message as WARN level.
          */
        public warn(category: string, message: string, ...optionalParams: any[]) {
            var l = this.logger();
            var createdDate = new Date
            if (l && l.warn) l.warn("[" + category + "] " + message, ...optionalParams);
            if (this.historyCount < 1) return;
            if (this.historyCount < this.history.length) this.history.splice(0, this.history.length - this.historyCount + 1);
            this.history.push({
                level: LogTypes.warn,
                category: category,
                message: message,
                parameters: optionalParams,
                created: createdDate
            });
        }

        /**
          * Logs a message as ERROR level.
          */
        public error(category: string, message: string, ...optionalParams: any[]) {
            var l = this.logger();
            var createdDate = new Date
            if (l && l.error) l.error("[" + category + "] " + message, ...optionalParams);
            if (this.historyCount < 1) return;
            if (this.historyCount < this.history.length) this.history.splice(0, this.history.length - this.historyCount + 1);
            this.history.push({
                level: LogTypes.error,
                category: category,
                message: message,
                parameters: optionalParams,
                created: createdDate
            });
        }

    }

    export function tracker(value?: TrackerContract): TrackerContract {
        if (arguments.length > 0) {
            _instances.tracker = value;
        }

        if (!_instances.tracker) {
            _instances.tracker = consoleTracker();
        }

        return _instances.tracker;
    }

    export function pageAnalyticsClient(value?: PageAnalyticsClientContract): PageAnalyticsClientContract {
        if (arguments.length > 0) {
            _instances.pageAnalyticsClient = value;
        }

        if (!_instances.pageAnalyticsClient) {
            _instances.pageAnalyticsClient = consoleTracker();
        }

        return _instances.pageAnalyticsClient;
    }

    export function consoleTracker(): Tracker {
        if (!_instances.consoleTracker) _instances.consoleTracker = new Tracker();
        _instances.consoleTracker.logger = () => {
            if (typeof console !== "undefined") {
                return console;
            }

            return null;
        };
        (_instances as any).disableAdditionalConsole = true;
        return _instances.consoleTracker;
    }

    export function emptyTracker(): Tracker {
        if (!_instances.emptyTracker) _instances.emptyTracker = new Tracker();
        return _instances.emptyTracker;
    }

    export function logSwitch(instance: any, type: LogTypes, category: string, message: string) {
        if (!instance || !instance.log) return;
        instance.log(type, category, message);
    }

    /**
      * Logs a message as INFO level.
      */
    export function info(category: string, message: string, ...optionalParams: any[]) {
        Diagnostics.log(LogTypes.info, category, message, ...optionalParams);
    }

    /**
      * Logs a message for debug.
      */
    export function debug(category: string, message: string, ...optionalParams: any[]) {
        Diagnostics.log(LogTypes.debug, category, message, ...optionalParams);
    }

    /**
      * Logs a message as WARN level.
      */
    export function warn(category: string, message: string, ...optionalParams: any[]) {
        Diagnostics.log(LogTypes.warn, category, message, ...optionalParams);
    }

    /**
      * Logs a message as ERROR level.
      */
    export function error(category: string, message: string, ...optionalParams: any[]) {
        Diagnostics.log(LogTypes.error, category, message, ...optionalParams);
    }

    /**
      * Logs a message as a specific level.
      */
    export function log(type: LogTypes, category: string, message: string, ...optionalParams: any[]) {
        try {
            var ti = tracker();
            ti.log(type, category, message, ...optionalParams);
            if ((ti as any).disableAdditionalConsole === true) return;
        } catch (ex) { }
        if (Tracker.console) {
            var key = type.toString();
            switch (type as LogTypes | string) {
                case LogTypes.error:
                    key = "error";
                    break;
                case LogTypes.warn:
                    key = "warn";
                    break;
                case LogTypes.info:
                    key = "info";
                    break;
                case LogTypes.debug:
                    key = "debug";
                    break;
                case "error":
                case "warn":
                case "info":
                case "debug":
                    break;
                default:
                    return;
            }

            if (Tracker.console !== true && Tracker.console[key] && typeof Tracker.console[key] === "function") {
                try {
                    Tracker.console[key]("[" + category + "] " + message, ...optionalParams);
                    return;
                } catch (ex) { }
            }
            
            if (typeof console === "undefined") return;
            if (console && console[key] && typeof console[key] === "function") console[key]("[" + category + "] " + message, ...optionalParams);
        }
    }

    /**
      * Records with an identifier for mark.
      */
    export function record(id: string, parameter?: any) {
        try {
            pageAnalyticsClient().record(id, parameter);
        } catch (ex) { }
    }

    /**
      * Logs a message to console for debug with optional parameters.
      */
    export function debugInfo(message: string, ...optionalParams: any[]) {
        if (typeof console === "undefined") return;
        var args = [message];
        if (optionalParams) optionalParams.forEach((value, index, array) => {
            args.push(value);
        });

        if (console && console.debug) console.debug.apply(console, args);
    }

}
