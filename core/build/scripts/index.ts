/*  --------------------
 *  Core Library - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  index.ts
 *  Description  Client core script library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */


declare module AliHub.Runtime {
    var loadModule: (name: string, path: string) => any;
}

module AliHub.Common {

    /**
      * Action without parameter.
      */
    export interface Action {
        (): void;
    }

    /**
      * Action with a parameter.
      */
    export interface Action1<T> {
        (arg: T): void;
    }

    /**
      * Action with 2 parameters.
      */
    export interface Action2<T1, T2> {
        (arg1: T1, arg2: T2): void;
    }

    /**
      * Action with 3 parameters.
      */
    export interface Action3<T1, T2, T3> {
        (arg1: T1, arg2: T2, arg3: T3): void;
    }

    /**
      * Action with 4 parameters.
      */
    export interface Action4<T1, T2, T3, T4> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4): void;
    }

    /**
      * Function without parameter.
      */
    export interface Func<T> {
        (): T;
    }

    /**
      * Function with a parameter.
      */
    export interface Func1<T, TResult> {
        (arg: T): TResult;
    }

    /**
      * Function with 2 parameters.
      */
    export interface Func2<T1, T2, TResult> {
        (arg1: T1, arg2: T2): TResult;
    }

    /**
      * Function with 3 parameters.
      */
    export interface Func3<T1, T2, T3, TResult> {
        (arg1: T1, arg2: T2, arg3: T3): TResult;
    }

    /**
      * Function with 4 parameters.
      */
    export interface Func4<T1, T2, T3, T4, TResult> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4): TResult;
    }

    /**
      * Action to raise event handler.
      */
    export interface EventHandler<T> {
        (ev: T): void;
    }

    /**
      * Processing task.
      */
    export interface ProcessingTask {
        process(): void;
    }

    /**
      * Cancellable task.
      */
    export interface CancelableTask extends ProcessingTask {
        cancel(): void;
    }

    /**
      * Value changed arguments.
      */
    export interface ValueChangedArgsContract<T> {

        oldValue: T;

        newValue: T;

        target: any;

        event: string;

    }

    /**
     * Interface for the task promise/deferred callbacks
     */
    export interface CallbackContract<T> {
        (value?: T, ...args: any[]): void;
    }

    export interface TaskOperationContract<T, R> {
        (callback: CallbackContract<T>, ...callbacks: CallbackContract<T>[]): TaskContract<R>;
        (callback: CallbackContract<T>[], ...callbacks: CallbackContract<T>[]): TaskContract<R>;
    }

    /**
     * Allows task Promises to interop with non-task promises
     */
    export interface TaskTokenContract<T> {
        /**
         * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
         * 
         * @param doneFilter A function that is called when the Deferred is resolved.
         * @param failFilter An optional function that is called when the Deferred is rejected.
         */
        then<U>(doneFilter: (value: T) => U, failFilter?: (reason: any) => U): TaskTokenContract<U>;
        /**
         * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
         * 
         * @param doneFilter A function that is called when the Deferred is resolved.
         * @param failFilter An optional function that is called when the Deferred is rejected.
         */
        then<U>(doneFilter: (value: T) => TaskTokenContract<U>, failFilter?: (reason: any) => U): TaskTokenContract<U>;
        /**
         * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
         * 
         * @param doneFilter A function that is called when the Deferred is resolved.
         * @param failFilter An optional function that is called when the Deferred is rejected.
         */
        then<U>(doneFilter: (value: T) => U, failFilter?: (reason: any) => TaskTokenContract<U>): TaskTokenContract<U>;
        /**
         * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
         * 
         * @param doneFilter A function that is called when the Deferred is resolved.
         * @param failFilter An optional function that is called when the Deferred is rejected.
         */
        then<U>(doneFilter: (value: T) => TaskTokenContract<U>, failFilter?: (reason: any) => TaskTokenContract<U>): TaskTokenContract<U>;
    }

    /**
     * Interface for the task, part of callbacks
     */
    export interface TaskContract<T> {
        /**
         * Add handlers to be called when the Deferred object is either resolved or rejected.
         * 
         * @param alwaysCallbacks1 A function, or array of functions, that is called when the Deferred is resolved or rejected.
         * @param alwaysCallbacks2 Optional additional functions, or arrays of functions, that are called when the Deferred is resolved or rejected.
         */
        always: TaskOperationContract<any, T>;
        /**
         * Add handlers to be called when the Deferred object is resolved.
         * 
         * @param doneCallbacks1 A function, or array of functions, that are called when the Deferred is resolved.
         * @param doneCallbacks2 Optional additional functions, or arrays of functions, that are called when the Deferred is resolved.
         */
        done: TaskOperationContract<T, T>;
        /**
         * Add handlers to be called when the Deferred object is rejected.
         * 
         * @param failCallbacks1 A function, or array of functions, that are called when the Deferred is rejected.
         * @param failCallbacks2 Optional additional functions, or arrays of functions, that are called when the Deferred is rejected.
         */
        fail: TaskOperationContract<any, T>;
        /**
         * Add handlers to be called when the Deferred object generates progress notifications.
         * 
         * @param progressCallbacks A function, or array of functions, to be called when the Deferred generates progress notifications.
         */
        progress(progressCallback: CallbackContract<T>): TaskContract<T>;
        progress(progressCallbacks: CallbackContract<T>[]): TaskContract<T>;

        /**
         * Determine the current state of a Deferred object.
         */
        state(): string;

        // Deprecated - given no typings
        pipe(doneFilter?: (x: any) => any, failFilter?: (x: any) => any, progressFilter?: (x: any) => any): TaskContract<any>;

        /**
         * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
         * 
         * @param doneFilter A function that is called when the Deferred is resolved.
         * @param failFilter An optional function that is called when the Deferred is rejected.
         * @param progressFilter An optional function that is called when progress notifications are sent to the Deferred.
         */
        then<U>(doneFilter: (value: T) => U, failFilter?: (...reasons: any[]) => U, progressFilter?: (...progression: any[]) => any): TaskContract<U>;
        /**
         * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
         * 
         * @param doneFilter A function that is called when the Deferred is resolved.
         * @param failFilter An optional function that is called when the Deferred is rejected.
         * @param progressFilter An optional function that is called when progress notifications are sent to the Deferred.
         */
        then<U>(doneFilter: (value: T) => TaskTokenContract<U>, failFilter?: (...reasons: any[]) => U, progressFilter?: (...progression: any[]) => any): TaskContract<U>;
        /**
         * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
         * 
         * @param doneFilter A function that is called when the Deferred is resolved.
         * @param failFilter An optional function that is called when the Deferred is rejected.
         * @param progressFilter An optional function that is called when progress notifications are sent to the Deferred.
         */
        then<U>(doneFilter: (value: T) => U, failFilter?: (...reasons: any[]) => TaskTokenContract<U>, progressFilter?: (...progression: any[]) => any): TaskContract<U>;
        /**
         * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
         * 
         * @param doneFilter A function that is called when the Deferred is resolved.
         * @param failFilter An optional function that is called when the Deferred is rejected.
         * @param progressFilter An optional function that is called when progress notifications are sent to the Deferred.
         */
        then<U>(doneFilter: (value: T) => TaskTokenContract<U>, failFilter?: (...reasons: any[]) => TaskTokenContract<U>, progressFilter?: (...progression: any[]) => any): TaskContract<U>;

        // Because task Promises Suck
        /**
         * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
         * 
         * @param doneFilter A function that is called when the Deferred is resolved.
         * @param failFilter An optional function that is called when the Deferred is rejected.
         * @param progressFilter An optional function that is called when progress notifications are sent to the Deferred.
         */
        then<U>(doneFilter: (...values: any[]) => U, failFilter?: (...reasons: any[]) => U, progressFilter?: (...progression: any[]) => any): TaskContract<U>;
        /**
         * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
         * 
         * @param doneFilter A function that is called when the Deferred is resolved.
         * @param failFilter An optional function that is called when the Deferred is rejected.
         * @param progressFilter An optional function that is called when progress notifications are sent to the Deferred.
         */
        then<U>(doneFilter: (...values: any[]) => TaskTokenContract<U>, failFilter?: (...reasons: any[]) => U, progressFilter?: (...progression: any[]) => any): TaskContract<U>;
        /**
         * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
         * 
         * @param doneFilter A function that is called when the Deferred is resolved.
         * @param failFilter An optional function that is called when the Deferred is rejected.
         * @param progressFilter An optional function that is called when progress notifications are sent to the Deferred.
         */
        then<U>(doneFilter: (...values: any[]) => U, failFilter?: (...reasons: any[]) => TaskTokenContract<U>, progressFilter?: (...progression: any[]) => any): TaskContract<U>;
        /**
         * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
         * 
         * @param doneFilter A function that is called when the Deferred is resolved.
         * @param failFilter An optional function that is called when the Deferred is rejected.
         * @param progressFilter An optional function that is called when progress notifications are sent to the Deferred.
         */
        then<U>(doneFilter: (...values: any[]) => TaskTokenContract<U>, failFilter?: (...reasons: any[]) => TaskTokenContract<U>, progressFilter?: (...progression: any[]) => any): TaskContract<U>;
    }


    /**
      * Horoscope information.
      */
    export interface SymboItemContract {
        
        /**
          * Display name.
          */
        name: string;

        /**
          * Display symbo.
          */
        symbo: string;
    }

    /**
      * Follow up information.
      */
    export interface FollowUpContract {

        /**
          * Identifier.
          */
        id: string;

        /**
          * Follow up type.
          */
        type: string;

        /**
          * Name.
          */
        name?: string;

        /**
          * Sender or operator.
          */
        sender: Users.ProfileContract;

        /**
          * Creation date and time.
          */
        creation: Date;

    }

    /**
      * Comment information.
      * Property type is "comment".
      */
    export interface CommentFollowUpContract extends FollowUpContract {

        /**
          * Message.
          */
        content: string;

        /**
          * The draft information if it is a draft; otherwise, null.
          */
        draftInfo?: any;

    }

    /**
      * Disposable.
      */
    export interface DisposableContract {
        dispose(): void;
    }

    /**
      * Binding object.
      */
    export interface BindingObjectContract<T> {
        (value?: T): T;
        subscribe(callback: (newValue: T) => void, target?: any, event?: string): DisposableContract;
    }

    /**
      * Binding parameters.
      */
    export interface BindingParamContract<T> {
        id: string;
        model: BindingObjectContract<T>;
        res: any;
    }

    /**
      * Model extender of binding control.
      */
    export interface BindingControlExtender<T> {

        /**
          * Extender name.
          */
        name: string;

        /**
          * Gets model.
          * @param control  The target control. 
          */
        model?(control: BindingControl<T>): any;

        /**
          * Loads after done.
          * @param control  The target control. 
          */
        load? (control: BindingControl<T>): void;

    }

    /**
      * Biographic coordinate.
      */
    export interface BioCoordinate {
        dimension: number;
        longitude: number;
        altitude?: number;
    }

    /**
      * 2D coordinate.
      */
    export interface PlaneCoordinate {
        x: number;
        y: number;
    }

    /**
      * 3D coordinate.
      */
    export interface StereoscopicCoordinate extends PlaneCoordinate {
        z: number;
    }

    /**
      * 4D coordinate.
      */
    export interface SpacetimeCoordinate extends StereoscopicCoordinate {
        t: number;
    }

    /**
      * Visual control.
      */
    export class VisualControl {

        private _containerId: string;

        private _properties: any = {};

        private _children: VisualControl[] = [];

        /**
          * Initializes a new instance of the VisualControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones. 
          */
        constructor(id: string) {
            this._containerId = id;
        }

        /**
          * Gets the identifier.
          */
        public get_id(): string {
            return this._containerId;
        }

        /**
          * Gets the control element.
          */
        public get_element(): HTMLElement {
            return Elements.getItem(this._containerId);
        }

        /**
          * Gets the specific additional property. 
          * @param key  The property name.
          */
        public get_prop(name: string): any {
            return this._properties[name];
        }

        /**
          * Sets the specific additional property. 
          * @param key  The property name.
          * @param value  The value of the property.
          */
        public set_prop(name: string, value: any): any {
            this._properties[name] = value;
            return this._properties[name];
        }

        /**
          * Adds class.
          * @param value  A list of class to add. 
          */
        public add_styleRef(value: string[]) {
            var ele = this.get_element();
            if (!ele) return;
            Elements.Utils.changeStyleRef(ele, value);
        }

        /**
          * Removes class.
          * @param value  A list of class to remove. 
          */
        public remove_styleRef(value: string[]) {
            var ele = this.get_element();
            if (!ele) return;
            Elements.Utils.changeStyleRef(ele, [], value);
        }

        /**
          * Modifies class.
          * @param adding  A list of class to add. 
          * @param removing  A list of class to remove. 
          */
        public modify_styleRef(adding: string[], removing: string[]) {
            var ele = this.get_element();
            if (!ele) return;
            Elements.Utils.changeStyleRef(ele, adding, removing);
        }

        /**
          * Appends an element as child.
          * @param child  An element to add; or tag name of element to add. 
          */
        public appendElement(child: HTMLElement | string): HTMLElement {
            var ele = this.get_element();
            if (!ele) return;
            var element = typeof child === "string" ? document.createElement(child) : child;
            ele.appendChild(element);
            return element;
        }

        /**
          * Clears the control.
          */
        public clear() {
            var ele = this.get_element();
            if (!ele) return;
            ele.innerHTML = "";
        }

        /**
          * Gets a child HTML element.
          * usePrefix  true if use current control identifier as prefix; otherwise, false.
          * appendingIdParts  the additional identifier parts.
          */
        public getChildElement(usePrefix: boolean, ...appendingIdParts: string[]): HTMLElement {
            var id = Elements.Utils.mergeId(usePrefix ? this._containerId : null, appendingIdParts);
            return Elements.getItem(id);
        }

        /**
          * Gets a child control.
          * usePrefix  true if use current control identifier as prefix; otherwise, false.
          * appendingIdParts  the additional identifier parts.
          */
        public getChildControl(usePrefix: boolean, ...appendingIdParts: string[]): VisualControl {
            var id = Elements.Utils.mergeId(usePrefix ? this._containerId : null, appendingIdParts);
            var control: VisualControl = null;
            this._children.some((ele, i, arr) => {
                if (!ele || ele.get_id() !== id) return false;
                control = ele;
                return true;
            });
            return control;
        }

        /**
          * Creates a control as child.
          * @param id  The identifier.
          * @param control  The type of the control to append.
          * @param tag  The tag name of element to fill the control.
          */
        public createControl(idSuffix: string, control: typeof VisualControl, tag?: string): VisualControl {
            if (!idSuffix || idSuffix.toString() === "" || !control) return;
            var id = idSuffix.toString().replace("__view_control_", this._containerId);
            if (id.indexOf(this._containerId) !== 0) {
                id = this._containerId + (id.indexOf("_") > 0 ? "_" : "") + id;
            }

            if (!tag || tag.toString() === "") tag = "div";
            var element = Elements.getById(id);
            if (!element) element = this.appendElement(tag);
            element.id = id;
            var c = new control(id);
            var index = -1;
            this._children.some((ele, i, arr) => {
                if (!ele || ele.get_id() !== id) return false;
                index = i;
                return true;
            });
            if (index > 0 && this._children.length > index) this._children[index] = c;
            else this._children.push(c);
            return c;
        }

        /**
          * Adds a control as child.
          * @param id  The identifier.
          * @param control  The control factory.
          * @param tag  The tag name of element to fill the control.
          */
        public addControl(idSuffix: string, control: Func2<string, VisualControl, VisualControl>, tag?: string): VisualControl {
            if (!idSuffix || idSuffix.toString() === "" || !control) return;
            var id = idSuffix.toString().replace("__view_control_", this._containerId);
            if (id.indexOf(this._containerId) !== 0) {
                id = this._containerId + (id.indexOf("_") > 0 ? "_" : "") + id;
            }

            if (!tag || tag.toString() === "") tag = "div";
            var element = Elements.getById(id);
            if (!element) element = this.appendElement(tag);
            element.id = id;
            var c = control(id, this);
            var index = -1;
            this._children.some((ele, i, arr) => {
                if (!ele || ele.get_id() !== id) return false;
                index = i;
                return true;
            });
            if (index > 0 && this._children.length > index) this._children[index] = c;
            else this._children.push(c);
            return c;
        }

    }

    /**
      * Mathematics utilities.
      */
    export class Math {

        /**
          * Adds prefix of a number to a string.
          * @param value  The number to format. 
          * @param len  The miximum length of the string to build. 
          */
        public static addPrefix(value: number, len: number): string {
            var str = value.toString();
            if (str.length >= len) return str;
            for (var step = 0; step < len - str.length; step++) {
                str = "0" + str;
            }

            return str;
        }

    }

    /**
      * Date time and related.
      */
    export class DateTime {

        /**
          * Converts to date.
          * @param value  The value to convert. 
          */
        public static parse(value: Date): Date;
        public static parse(value: number): Date;
        public static parse(value: string): Date;
        public static parse(value: any): Date {
            if (value == null) return null;
            switch (typeof value) {
                case "string":
                    return new Date(value);
                case "number":
                    return new Date(value);
                default:
                    return <Date>value;
            }
        }

        public static toLocaleTimeString(value: Date): string {
            var timeStr = value.toLocaleTimeString();
            if (timeStr.indexOf("GMT") > 5) {
                timeStr = timeStr.substring(0, timeStr.indexOf("GMT"));
            } else if (timeStr.indexOf("GMT") === 0) {
                timeStr = timeStr.substring(5);
            }

            return timeStr;
        }

        /**
          * Converts a specific date to locale string.
          * @param value  The date value. 
          */
        public static toLocaleString(value: Date, onlyDate: boolean = false): string {
            if (value == null) return "";
            value = DateTime.parse(value);
            var now = new Date();
            if (value.getFullYear() === now.getFullYear() && value.getMonth() === now.getMonth() && value.getDate() === now.getDate()) {
                return onlyDate ? AliHub.Res.hubTemplate().localString("today") : DateTime.toLocaleTimeString(value);
            }
            if (value > now) {
                return value.toLocaleDateString();
            }

            var diffDays = DateTime.getDaysDiff(now, value);
            if (diffDays === 1) return onlyDate ? AliHub.Res.hubTemplate().localString("yesterday") : AliHub.Res.hubTemplate().localString("yesterdayTime").replace("{0}", DateTime.toLocaleTimeString(value));
            if (value.getDay() + diffDays < 6) {
                switch (value.getDay()) {
                    case 4:
                        return onlyDate ? AliHub.Res.hubTemplate().localString("week4f") : AliHub.Res.hubTemplate().localString("week4t").replace("{0}", DateTime.toLocaleTimeString(value));
                    case 3:
                        return onlyDate ? AliHub.Res.hubTemplate().localString("week3f") : AliHub.Res.hubTemplate().localString("week3t").replace("{0}", DateTime.toLocaleTimeString(value));
                    case 2:
                        return onlyDate ? AliHub.Res.hubTemplate().localString("week2f") : AliHub.Res.hubTemplate().localString("week2t").replace("{0}", DateTime.toLocaleTimeString(value));
                    case 1:
                        return onlyDate ? AliHub.Res.hubTemplate().localString("week1f") : AliHub.Res.hubTemplate().localString("week1t").replace("{0}", DateTime.toLocaleTimeString(value));
                    default:
                        break;
                }
            }

            return value.toLocaleDateString();
        }

        /**
          * Converts a specific date to a full locale string.
          * @param value  The date value. 
          */
        public static toFullLocaleString(value: Date): string {
            if (value == null) return "";
            value = DateTime.parse(value);
            var now = new Date();
            return value.toLocaleString();
        }

        /**
          * Converts a specific date to simple string.
          * @param value  The date value. 
          */
        public static toSimpleString(value: Date): string {
            if (value == null) return "";
            value = DateTime.parse(value);
            return value.getFullYear().toString() + "-" + Math.addPrefix(value.getMonth() + 1, 2) + "-" + Math.addPrefix(value.getDate(), 2)
                + " " + Math.addPrefix(value.getHours(), 2) + ":" + Math.addPrefix(value.getMinutes(), 2) + ":" + Math.addPrefix(value.getSeconds(), 2);
        }

        /**
          * Converts a specific date to number string.
          * @param value  The date value. 
          */
        public static toNumberString(value: Date): string {
            if (value == null) return "";
            if (typeof value === "number") return value.toString();
            value = DateTime.parse(value);
            if (value == null) return "";
            return value.getTime().toString();
        }

        /**
          * Gets a value indicating whether a year is leap.
          * @param fullYear  The full year to test. 
          */
        public static isLeap(fullYear: number): boolean {
            if (fullYear == null) return null;
            return fullYear % 400 === 0 || (fullYear % 4 === 0 && fullYear % 100 !== 0);
        }

        /**
          * Gets the count of days in a specific month.
          * @param fullYear  The month. 
          */
        public static getDayCount(fullYear: number, month?: number): number {
            if (month === 2) {
                if (fullYear == null) return null;
                return DateTime.isLeap(fullYear) ? 29 : 28;
            }

            if (month == null) {
                return DateTime.isLeap(fullYear) ? 366 : 365;
            }

            switch (month) {
                case 0:
                case 2:
                case 4:
                case 6:
                case 7:
                case 9:
                case 11:
                    return 31;
                default:
                    return 30;
            }
        }

        /**
          * Gets days difference between two date.
          * @param begin  The begin date. 
          * @param end  The end date. 
          */
        public static getDaysDiff(begin: Date, end: Date): number {
            if (begin == null || end == null) return null;
            begin = DateTime.parse(begin);
            end = DateTime.parse(end);
            if (begin > end) {
                var temp = begin;
                begin = end;
                end = temp;
            }

            var endYear = end.getFullYear();
            var beginYear = begin.getFullYear();
            var endMonth = end.getMonth();
            var beginMonth = begin.getMonth();
            var endDay = end.getDate();
            var beginDay = begin.getDate();

            if (endYear === beginYear && endMonth === beginMonth) {
                return endDay - beginDay;
            }

            var delta = 0;
            delta += DateTime.getDayCount(beginYear, beginMonth) - beginDay;
            delta += end.getDate();
            if (endYear === beginYear) {
                if (endMonth - beginMonth > 1) {
                    for (var i = beginMonth + 1; i < endMonth; i++) {
                        delta += DateTime.getDayCount(beginYear, i);
                    }
                }

                return delta;
            }

            for (var i = beginMonth + 1; i < 12; i++) {
                delta += DateTime.getDayCount(beginYear, i);
            }

            for (var i = 0; i < endMonth; i++) {
                delta += DateTime.getDayCount(endYear, i);
            }

            if (endYear - beginYear > 1) {
                for (var i = beginYear + 1; i < endYear; i++) {
                    delta += DateTime.getDayCount(i);
                }
            }

            return delta;
        }

        /**
          * Gets years difference between two date.
          * @param begin  The begin date. 
          * @param end  The end date. 
          */
        public static getYearsDiff(begin: Date, end: Date): number {
            if (begin == null || end == null) return null;
            begin = DateTime.parse(begin);
            end = DateTime.parse(end);
            if (begin > end) {
                var temp = begin;
                begin = end;
                end = temp;
            }

            var delta = end.getFullYear() - begin.getFullYear();
            return delta;
        }

        /**
          * Gets age by given a birthday.
          * @param value  The birthday. 
          */
        public static getAge(value: Date): number {
            if (value == null) return null;
            value = DateTime.parse(value);
            var now = new Date();
            var delta = now.getFullYear() - value.getFullYear();
            return value.getMonth() >= now.getMonth() ? delta : delta - 1;
        }

        /**
          * Gets horoscopes list.
          */
        public static getHoroscopes(): SymboItemContract[]{
            return [
                {
                    name: AliHub.Res.hubTemplate().localString("capricorn"),
                    symbo: "♑"
                },
                {
                    name: AliHub.Res.hubTemplate().localString("aquarius"),
                    symbo: "♒"
                },
                {
                    name: AliHub.Res.hubTemplate().localString("pisces"),
                    symbo: "♓"
                },
                {
                    name: AliHub.Res.hubTemplate().localString("aries"),
                    symbo: "♈"
                },
                {
                    name: AliHub.Res.hubTemplate().localString("taurus"),
                    symbo: "♉"
                },
                {
                    name: AliHub.Res.hubTemplate().localString("gemini"),
                    symbo: "♊"
                },
                {
                    name: AliHub.Res.hubTemplate().localString("cancer"),
                    symbo: "♋"
                },
                {
                    name: AliHub.Res.hubTemplate().localString("leo"),
                    symbo: "♌"
                },
                {
                    name: AliHub.Res.hubTemplate().localString("virgo"),
                    symbo: "♍"
                },
                {
                    name: AliHub.Res.hubTemplate().localString("libra"),
                    symbo: "♎"
                },
                {
                    name: AliHub.Res.hubTemplate().localString("scorpio"),
                    symbo: "♏"
                },
                {
                    name: AliHub.Res.hubTemplate().localString("sagittarius"),
                    symbo: "♐"
                }
            ];
        }

        /**
          * Gets a horoscope info by specific date.
          * @param value  The date. 
          */
        public static getHoroscope(value: Date) {
            if (value == null) return null;
            value = DateTime.parse(value);
            var date = value.getDate();
            var month = value.getMonth();
            var list = DateTime.getHoroscopes();
            if ((month == 11 && date >= 22) || (month == 0 && date <= 20)) return list[0];
            else if ((month == 0 && date >= 21) || (month == 1 && date <= 19)) return list[1];
            else if ((month == 1 && date >= 20) || (month == 2 && date <= 20)) return list[2];
            else if ((month == 2 && date >= 21) || (month == 3 && date <= 20)) return list[3];
            else if ((month == 3 && date >= 21) || (month == 4 && date <= 21)) return list[4];
            else if ((month == 4 && date >= 22) || (month == 5 && date <= 21)) return list[5];
            else if ((month == 5 && date >= 22) || (month == 6 && date <= 22)) return list[6];
            else if ((month == 6 && date >= 23) || (month == 7 && date <= 23)) return list[7];
            else if ((month == 7 && date >= 24) || (month == 8 && date <= 23)) return list[8];
            else if ((month == 8 && date >= 24) || (month == 9 && date <= 23)) return list[9];
            else if ((month == 9 && date >= 24) || (month == 10 && date <= 22)) return list[10];
            else if ((month == 10 && date >= 23) || (month == 11 && date <= 21)) return list[11];
            else return null;
        }

        /**
          * Adds speicifc seconds to given date.
          * @param value  The date. 
          * @param adding  The timespan in second to add. 
          */
        public static addSeconds(value: Date, adding: number): Date {
            value = DateTime.parse(value);
            if (value == null) return null;
            var resultDate = new Date(value.getTime() + adding * 1000);
            return resultDate;
        }

        /**
          * Adds speicifc days to given date.
          * @param value  The date. 
          * @param adding  The timespan in day to add. 
          */
        public static addDays(value: Date, adding: number): Date {
            value = DateTime.parse(value);
            if (value == null) return null;
            var resultDate = new Date(value.getTime() + adding * 24 * 3600000);
            return resultDate;
        }

        /**
          * Gets timespan in milliseconds.
          * @param begin  The begin date. 
          * @param end  The end date. 
          */
        public static getSpan(begin: Date, end: Date): number {
            begin = DateTime.parse(begin);
            end = DateTime.parse(end);
            if (begin == null || end == null) return null;
            var span = end.getTime() - begin.getTime();
            return span;
        }

        /**
          * Gets timespan string.
          * @param begin  The begin date. 
          * @param end  The end date. 
          */
        public static getSpanString(begin: Date, end: Date): string {
            var span = DateTime.getSpan(begin, end);
            return DateTime.toSpanString(span);
        }

        /**
          * Gets timespan string to now.
          * @param target  The target date. 
          */
        public static getNowSpanString(target: Date): string {
            target = DateTime.parse(target);
            var now = new Date();
            var span = DateTime.getSpan(target, now);
            span = span / 10000;
            if (span < 0) {
                return AliHub.Res.hubTemplate().localString("future");
            } else if (span < 2) {
                return AliHub.Res.hubTemplate().localString("secondsAgo");
            } else if (span < 6) {
                return AliHub.Res.hubTemplate().localString("minuteAgo");
            } else if (span < 12) {
                return AliHub.Res.hubTemplate().localString("minutesTwoAgo");
            } else if (span < 360) {
                return AliHub.Res.hubTemplate().localString("minutesAgo").replace("{0}", (span / 6).toFixed());
            } else if (span < 720) {
                return AliHub.Res.hubTemplate().localString("hourAgo");
            } else if (span < 1080) {
                return AliHub.Res.hubTemplate().localString("hoursTwoAgo");
            } else if (span < 10000 && target.getDay() === now.getDay()) {
                return AliHub.Res.hubTemplate().localString("hoursAgo").replace("{0}", (span / 360).toFixed());
            } else {
                return DateTime.toLocaleString(target);
            }
        }

        /**
          * Gets timespan string.
          * @param span  The timespan in milliseconds. 
          */
        public static toSpanString(span: number, showMillisec: boolean = true): string {
            if (span == null) return "";
            var str = "";
            if (span < 0) {
                str += "-";
                span = -span;
            }

            var hours = parseInt((span / 3600000).toString());
            if (hours > 0) str += Math.addPrefix(hours, 2) + ":";
            var minutes = parseInt((span / 60000).toString());
            str += Math.addPrefix(minutes - hours * 60, 2) + ":";
            var seconds = parseInt((span / 1000).toString()) - minutes * 60;
            str += Math.addPrefix(seconds, 2);
            if (showMillisec) {
                var milliseconds = span % 1000;
                if (milliseconds > 0) str += "." + Math.addPrefix(milliseconds, 3);
            }

            return str;
        }

        public static toTimeString(value: Date, showSecond: boolean = true, force24?: boolean): string {
            value = DateTime.parse(value);
            var str = "";
            if (force24 === true) {
                str = value.getHours() > 10 ? "" : "0";
                str += value.getHours().toString() + ":";
                str += value.getMinutes() > 10 ? "" : "0";
                str += value.getMinutes().toString();
                if (showSecond === true) {
                    str += value.getSeconds() > 0 ? "" : "0";
                    str += value.getSeconds().toString();
                }

                return str;
            }

            if (showSecond !== true) return value.toLocaleTimeString();
            var testHour = value.getHours() >= 12 ? 23 : 11;
            var testTime = new Date(2000, 0, 1, testHour, 57, 46);
            var hours = value.getHours();
            var is24 = false;
            var strTemp = testTime.toLocaleTimeString();
            if (strTemp.indexOf("23") >= 0) is24 = true;
            if ((is24 !== true && strTemp.indexOf("11") < 0) || strTemp.indexOf("57") < 0 || strTemp.indexOf("46") < 0) return value.toLocaleTimeString();
            strTemp = strTemp.replace("23", "{{hour}}").replace("11", "{{hour}}").replace("57", "{{min}}").replace(":46", "").replace("46", "{{sec}}");
            if (is24 === true && hours >= 12) hours -= 12;
            var hoursStr = hours.toString();
            if (hours < 10) hoursStr = "0" + hoursStr;
            var minStr = value.getMinutes().toString();
            if (value.getMinutes() < 10) minStr = "0" + minStr;
            var secStr = value.getSeconds().toString();
            if (value.getSeconds() < 10) secStr = "0" + secStr;
            str = strTemp.replace("{{hour}}", hours.toString()).replace("{{min}}", minStr).replace("{{sec}}", secStr);
            return str;
        }

    }

    /**
      * Text and related.
      */
    export class Text {

        /**
          * Copies a string.
          * @param value  The value to copy. 
          */
        public static copy(value: string) {
            if (!value || value === "") return;
            window.clipboardData.setData("Text", value);
        }

        /**
          * Formats a string.
          * @param template  The source string. 
          * @param parameters  The object or array of parameters. 
          */
        public static format(template: string, parameters?: any): string {
            var path = template;
            if (!!path && !!parameters) {
                var array = <any[]>parameters;
                for (var ele in parameters) {
                    if (ele == null) continue;
                    if (ele instanceof Date) ele = DateTime.toNumberString(ele);
                    if (typeof ele !== "string" && typeof ele !== "number") continue;
                    ele = ele.toString()
                    var prop = parameters[ele];
                    if (prop == null) prop = "";
                    if (typeof prop !== "string" && typeof prop !== "number") continue;
                    prop = prop.toString();
                    path = path.replace("{" + ele + "}", prop).replace("{{" + ele + "}}", prop);
                }
            }

            return path;
        }

    }

    export class Reflection {

        public static copy<T>(obj: T): T {
            if (obj == null) return null;
            if (typeof obj === "string" || typeof obj === "number") return obj;
            if (obj instanceof Array) {
                var array = [];
                (<any[]><any>obj).forEach((item, i, arr) => {
                    array.push(item);
                });

                return <T><any>array;
            }

            var result = {};
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) result[prop] = obj[prop];
            }

            return <T>result;
        }

    }

    export interface BindingFactoryContract {
        create<T>(value?: T): BindingObjectContract<T>;
        createArray<T>(col?: T[]): Collection.BindingArrayContract<T>;
        applyBindings(viewModel: any, element: HTMLElement);
    }

    export class BindingFactory {

        private static _instance: BindingFactoryContract;

        public static set_instance(factory: BindingFactoryContract) {
            BindingFactory._instance = factory;
        }

        public static create<T>(value?: T): BindingObjectContract<T> {
            return !!BindingFactory._instance ? BindingFactory._instance.create(value) : null;
        }

        public static createArray<T>(col?: T[]): Collection.BindingArrayContract<T> {
            return !!BindingFactory._instance ? BindingFactory._instance.createArray(col) : null;
        }

        public static createControl<T>(id: string, viewModel: T, templateType, templateValue: string): BindingControl<T> {
            if (!id || !templateType || !templateValue) return;
            var control = new BindingControl<T>(id);
            control.viewModel(viewModel);
            control.set_template(templateType, templateValue);
            return control;
        }

        public static applyBindings(viewMode: any, element: HTMLElement) {
            if (!BindingFactory._instance) return;
            BindingFactory._instance.applyBindings(viewMode, element);
        }

        public static applyTemplate(id: string, valueType: string, value: string, bindings: any, onerror: Func1<string, boolean>) {
            if (!id || !valueType || !value || value === "") return;
            var str = null;
            var element = document.getElementById(id);
            if (!element) return;
            switch (valueType.toString().toLowerCase()) {
                case "html":
                case "htm":
                case "static":
                    str = value.toString();
                    break;
                case "element":
                    if (!document.getElementById(value)) return;
                    str = document.getElementById(value).innerHTML;
                    break;
                case "this":
                case "inner":
                    str = element.innerHTML;
                    break;
                case "ajax":
                    Web.RestJob.getInfo<string>(value, {}).done((str) => {
                        BindingFactory.applyTemplate(id, "static", str, bindings, onerror);
                    });
                    return;
                default:
                    return;
            }

            if (!!str) element.innerHTML = str.replace(/__view_control_/g, element.id + "_");
            try {
                BindingFactory.applyBindings(bindings, element);
            } catch (ex) {
                if (!onerror) return;
                var errMsg = AliHub.Res.hubTemplate().localString("bindingError");
                if (!!ex && !!ex.message) errMsg = ex.message;
                Diagnostics.Tracker.error("CoreLibrary", "[0x02090403] Failed to apply bindings. (" + errMsg + ")");
                if (!onerror(errMsg)) throw ex;
            }
        }

    }

    /**
      * Binding object.
      */
    export class BindingObject<T> {

        private _raw: T;

        public changed = new Collection.EventHandlers<ValueChangedArgsContract<T>>();

        public get_value() {
            return this._raw;
        }

        public set_value(value: T) {
            if (value === this._raw) return;
            var oldValue = this._raw;
            this._raw = value;
            this.changed.raise(this._getChangedArgs(oldValue, "changed"));
        }

        public toObservable(): BindingObjectContract<T> {
            var obs = (value?: T) => {
                if (arguments.length > 0) {
                    this._raw = value;
                }

                return this._raw;
            };
            (<any>obs).subscribe = (callback: (newValue: T) => void, target?: any, event?: string): DisposableContract => {
                return { dispose: function () { } };
            };
            return <BindingObjectContract<T>>obs;
        }

        private _getChangedArgs(oldValue: T, event: string): ValueChangedArgsContract<T> {
            return {
                oldValue: oldValue,
                newValue: this._raw,
                target: this,
                event: event
            };
        }

    }

    /**
      * Binding control.
      */
    export class BindingControl<T> extends VisualControl {

        private _bindings = BindingFactory.create<BindingParamContract<T>>();

        private _extenders: BindingControlExtender<T>[] = [];

        /**
          * Initializes a new instance of the BindingControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones. 
          */
        constructor(id: string) {
            super(id);
            this._bindings({
                id: this.get_id(),
                model: BindingFactory.create<T>(),
                res: AliHub.Res.factory(),
                image: (img: Graph.ImageContract) => {
                    var ele = Graph.ImageContainer.generateImage(img);
                    if (!ele) return null;
                    if (!!ele.outerHTML) return ele.outerHTML;
                    if (!ele.parentNode) {
                        var containerEle = document.createElement("div");
                        containerEle.appendChild(ele);
                    }

                    return (<HTMLElement>ele.parentNode).innerHTML;
                },
                extenders: (name: string, emptyObj: boolean = false) => {
                    return this.procExtender(name, emptyObj);
                }
            });
        }

        /**
          * Gets observable model. 
          */
        public get_observable(): BindingObjectContract<T> {
            return this._bindings().model;
        }

        /**
          * Raises on binding error. 
          * @param errorMessage  The error message.
          */
        public onBindingError(errorMessage: string): boolean {
            return !!this._bindings().model();
        }

        /**
          * Sets the template. 
          * @param valueType  The data source type for the value.
          * @param value  The data source value.
          */
        public set_template(valueType: string, value: string) {
            BindingFactory.applyTemplate(this.get_id(), valueType, value, this._bindings, (errMsg) => { return this.onBindingError(errMsg); });
            if (!!this._bindings().model()) {
                this._extenders.forEach((ele, i, arr) => {
                    if (!!ele && !!ele.load) ele.load(this);
                });
            }
        }

        /**
          * Gets or sets the view model. 
          * @param value  Model value to set; or null, if just to resolve model.
          */
        public viewModel(value?: T): T {
            if (arguments.length > 0) {
                this._bindings().model(value);
                var html = this.get_element().innerHTML;
                if (!!html && html !== "") {
                    this._extenders.forEach((ele, i, arr) => {
                        if (!!ele && !!ele.load) ele.load(this);
                    });
                }
            }

            return this._bindings().model();
        }

        /**
          * Sets view model as null. 
          */
        public clearViewModel(): void {
            this._bindings().model(null);
        }

        /**
          * Refreshes view. 
          */
        public refresh(): void {
            var model = this._bindings().model();
            this._bindings().model(null);
            this._bindings().model(model);
        }

        /**
          * Processes the extender to resolve additional model.
          * @param name  The extender name. 
          * @param emptyObj  true if want to return an empty object instead of null when the extender does not exist; otherwise, false. 
          */
        public procExtender(name: string, emptyObj: boolean = false): any {
            var extender = this.getExtender(name);
            if (!extender) return emptyObj === true ? {} : null;
            return extender.model(this);
        }

        /**
          * Gets a specific extender.
          * @param name  The extender name. 
          */
        public getExtender(name: string): BindingControlExtender<T> {
            if (!name) return null;
            var extender: BindingControlExtender<T> = null;
            this._extenders.some((ele, i, arr) => {
                if (ele.name !== name) return false;
                extender = ele;
                return true;
            });

            return extender;
        }

        /**
          * Adds an extender.
          * @param value  The extender instance. 
          */
        public addExtender(value: BindingControlExtender<T>): void {
            if (!value || !value.name) return;
            this.removeExtender(value.name);
            this._extenders.push(value);
        }

        /**
          * Removes a specific extender.
          * @param name  The extender name. 
          */
        public removeExtender(name: string): void {
            if (!name) return;
            var col: BindingControlExtender<T>[] = [];
            this._extenders.forEach((ele, i, arr) => {
                if (!ele || ele.name === name) return;
                col.push(ele);
            });
            this._extenders = col;
        }

        /**
          * Clears all extenders registered. 
          */
        public clearExtenders(): void {
            this._extenders = [];
        }

    }

    /**
      * Activity control.
      */
    export class ActivityControl extends VisualControl {

        private _activities: VisualControl[] = [];

        private _index = 0;

        private _count = 0;

        /**
          * Raised on changed. 
          */
        public changed = new Collection.EventHandlers<VisualControl>();

        /**
          * Initializes a new instance of the ActivityControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones. 
          */
        public constructor(id: string) {
            super(id);
        }

        /**
          * Gets the length of all including cached.
          */
        public length(): number {
            return this._activities.length;
        }

        /**
          * Gets current index.
          */
        public index(): number {
            return this._index;
        }

        /**
          * Gets current control.
          */
        public current(): VisualControl {
            if (this._activities.length === 0) {
                this._index = 0;
                return null;
            }

            if (this._index >= this._activities.length) this._index = this._activities.length - 1;
            if (this._index < 0) this._index = 0;
            var c = this._activities[this._index];
            return c;
        }

        /**
          * Adds a control by a factory.
          * @param control  The optional control factory. 
          */
        public add(control?: Func1<string, VisualControl>, h?: Action1<VisualControl>): VisualControl {
            this._count++;
            if (this._index < this._activities.length - 1) {
                var col: VisualControl[] = [];
                this._activities.forEach((acti, i, arr) => {
                    if (!acti) return;
                    if (i <= this._index) {
                        col.push(acti);
                    } else {
                        acti.get_element().outerHTML = "";
                    }
                });

                this._activities = col;
                this._index = this._activities.length - 1;
            }

            var element = this.appendElement("div");
            element.id = this.get_id() + "_c" + this._count.toString();
            var c = !!control ? control(element.id) : new VisualControl(element.id);
            if (!!h) h(c);
            this._activities.push(c);
            this._turnTo(this._index + 1);
            return c;
        }

        /**
          * Turns to a specific control.
          * @param control  The control factory. 
          */
        public turnTo(control: VisualControl | string | number): VisualControl {
            if (control == null) return null;
            if (typeof control === "number") {
                if (control > this._activities.length - 2) return null;
                if (control < 0) control = 0;
                this._turnTo(<number>control);
                return;
            }

            var c: VisualControl = null;
            var id = typeof control === "string" ? control : (<VisualControl>control).get_id();
            this._activities.some((ele, i, ar) => {
                if (ele.get_id() !== id) return false;
                c = ele;
                return true;
            });
            return c;
        }

        public back(step: number = 1) {
            var index = this._index - step;
            this.turnTo(index);
        }

        private _turnTo(index: number) {
            var cur = this.current();
            if (!!cur) cur.get_element().style.display = "none";
            this._index = index;
            cur = this.current();
            if (!cur) return;
            cur.get_element().style.display = "";
            this.changed.raise(cur);
        }

    }

    /**
      * Page controller.
      */
    export class PageController {

        private static _hasInited = false;

        private static _onresize: Common.Action[];

        private static _size: string;

        /**
          * The app center URL.
          */
        public static appCenterUrl: string;

        /**
          * The homepage URL.
          */
        public static homeUrl: string;

        /**
          * The element identifier of the page cover panel.
          */
        public static coverPanelId = "ali_cover";

        /**
          * The element identifier of the page header panel.
          */
        public static headerPanelId = "ali_head";

        /**
          * The element identifier of the page hidden panel.
          */
        public static hiddenPanelId = "ali_hidden";

        /**
          * The message center path URL.
          */
        public static messageUrl: string;

        /**
          * The feedback path URL.
          */
        public static feedbackUrl: string;

        /**
          * The user sign out path URL.
          */
        public static signOutUrl: string;

        /**
          * The menu in top bar.
          */
        public static menu: Collection.ButtonInfoContract[];

        /**
          * The breadcrumb of the page.
          */
        public static path: Collection.ButtonInfoContract[];

        /**
          * A value indicating whether this page is last node in the path.
          */
        public static isLastNodeInPath: boolean;

        /**
          * The search provider.
          */
        public static searchProvider: Common.Func1<string, Collection.ButtonInfoContract[]>;

        /**
          * The tips in search box.
          */
        public static searchTip: string;

        /**
          * The link target of search item.
          */
        public static searchTarget = "_self";

        /**
          * The mininum size of the page.
          */
        public static minSize: string;

        /**
          * The maxinum size of the page.
          */
        public static maxSize: string;

        /**
          * Gets window size level.
          * xxxl - 10000px
          * xxl - 3840px
          * xl - 1920px
          * l - 1440px
          * m - 1024px
          * s - 800px
          * xs - 640px
          * xxs - 480px
          * xxxs - 320px
          */
        public static getWindowSize(): string {
            return this._size;
        }

        /**
          * Refreshes page layout.
          */
        public static refreshLayout() {
            var sizeIndex = null;
            var sizes = ["ali-size-xxxl", "ali-size-xxl", "ali-size-xl", "ali-size-l", "ali-size-m", "ali-size-s", "ali-size-xs", "ali-size-xxs", "ali-size-xxxs"];
            if (window.innerWidth > 4000) {
                sizeIndex = 0;
            } else if (window.innerWidth > 2400) {
                sizeIndex = 1;
            } else if (window.innerWidth > 1600) {
                sizeIndex = 2;
            } else if (window.innerWidth > 1300) {
                sizeIndex = 3;
            } else if (window.innerWidth > 900) {
                sizeIndex = 4;
            } else if (window.innerWidth > 640) {
                sizeIndex = 5;
            } else if (window.innerWidth > 480) {
                sizeIndex = 6;
            } else if (window.innerWidth > 320) {
                sizeIndex = 7;
            } else {
                sizeIndex = 8;
            }

            if (!!PageController.minSize) {
                var sizeTest = Collection.ListHelper.indexOf(sizes, "ali-size-" + PageController.minSize);
                if (sizeTest < sizeIndex) sizeIndex = sizeTest;
            }

            if (!!PageController.maxSize) {
                var sizeTest = Collection.ListHelper.indexOf(sizes, "ali-size-" + PageController.maxSize);
                if (sizeTest > sizeIndex) sizeIndex = sizeTest;
            }

            document.body.parentElement.className = Collection.ListHelper.addItem(
                document.body.parentElement.className,
                " ",
                [sizes[sizeIndex]],
                sizes);
            var coverPanel = Elements.getItem(PageController.coverPanelId);
            if (!!coverPanel) coverPanel.style.height = window.innerHeight.toString() + "px";
        }

        /**
          * Initializes the page.
          */
        public static init() {
            if (PageController._hasInited === true) return;
            PageController._hasInited = true;
            PageController.refreshLayout();
            window.addEventListener("resize", (ev: UIEvent) => {
                PageController.refreshLayout();
            });
        }

        /**
          * Added resize handler.
          */
        public static addResizeEvent(h: Common.Action) {
            if (!PageController._onresize) {
                PageController._onresize = [];
                window.addEventListener("resize", (ev: UIEvent) => {
                    PageController._onresize.forEach((action, aI, aA) => {
                        action();
                    });
                });
            }

            if (PageController._onresize.some((handler, hI, hA) => {
                return handler === h;
            })) return;
            PageController._onresize.push(h);
        }

        /**
          * Opens an app by given URL.
          */
        public static openApp(url: string, timeout?: number) {
            if (!url || !PageController.hiddenPanelId) return;
            var hiddenEle = Elements.getItem(PageController.hiddenPanelId);
            if (!hiddenEle) return;
            var appStarterEle = Elements.getItem(hiddenEle.id + "_starter");
            if (!appStarterEle) {
                appStarterEle = document.createElement("div");
                hiddenEle.appendChild(appStarterEle);
                appStarterEle.id = hiddenEle.id + "_starter";
                appStarterEle = Elements.getItem(hiddenEle.id + "_starter");
            }

            var browserEle = document.createElement("iframe");
            browserEle.src = url;
            appStarterEle.appendChild(browserEle);
            browserEle.onload = (ev: Event) => {
                setTimeout(() => { browserEle.outerHTML = ""; }, 10000);
            }
        }

        /**
          * Loads client script.
          */
        public static loadScript(url: string) {
            var script = document.createElement('script');
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script); 
        }

        /**
          * Shows customized page cover.
          */
        public static showCustomizedCover(): HTMLDivElement {
            var coverPanel = Elements.getItem(Common.PageController.coverPanelId);
            coverPanel.style.display = "block";
            coverPanel.className = "ali-container-visible-t";
            PageController.refreshLayout();
            coverPanel.innerHTML = "<div id=\"" + Common.PageController.coverPanelId + "_panel\" ></div>";
            return Elements.getById<HTMLDivElement>(Common.PageController.coverPanelId + "_panel");
        }

        /**
          * Hides customized page cover.
          */
        public static hideCustomizedCover(): void {
            var coverPanel = Elements.getItem(Common.PageController.coverPanelId);
            coverPanel.className = "ali-container-visible-f";
            coverPanel.style.display = "none";
        }

        /**
          * Renders header.
          */
        public static renderHeader(branch?: string): void {
            var cElement = Elements.getItem(PageController.headerPanelId);
            if (!cElement) return;
            var containerEle = document.createElement("div");
            containerEle.className = "ali-container-main";
            var crumbEle = containerEle;
            var hEc = cElement.getElementsByTagName("h1");
            var isMemberPage = false;
            if (!!hEc && hEc.length > 0 && !!hEc[0]) {
                isMemberPage = true;
                var titleStr = null;
                if (!!hEc[0].title) {
                    titleStr = hEc[0].title;
                } else if (!!hEc[0].innerText) {
                    titleStr = hEc[0].innerText;
                } else {
                    titleStr = hEc[0].innerHTML;
                }

                if (!titleStr || titleStr == "") titleStr = AliHub.Res.hubTemplate().localString("page");
                containerEle.appendChild(hEc[0]);
                crumbEle = document.createElement("div");
                crumbEle.className = "ali-container-main";
                var pathArr: Collection.ButtonInfoContract[] = [{
                    id: "root",
                    name: "APASS CRM",
                    url: PageController.homeUrl
                }];
                if (!!PageController.path) {
                    PageController.path.forEach((tV, tI, tA) => {
                        if (!!tV) pathArr.push(tV);
                    });
                } else {
                    pathArr.push({
                        id: "apps",
                        name: AliHub.Res.hubTemplate().localString("appCenter"),
                        url: PageController.appCenterUrl
                    });
                }

                if (PageController.isLastNodeInPath !== true) pathArr.push({
                    id: "current",
                    name: titleStr,
                    url: "javascript:window.location.reload();"
                });
                var pathEle = document.createElement("ul");
                pathEle.id = PageController.headerPanelId + "_nav";
                PageController.renderMenu(pathEle, pathArr, pathArr[pathArr.length - 1].id, null, (splitEle: HTMLLIElement, leftIndex: number) => {
                    var splitInfoEle = document.createElement("div");
                    splitInfoEle.className = "ali-container-main";
                    if (leftIndex === pathArr.length - 2) splitInfoEle.className += " ali-state-active-t";
                    splitInfoEle.innerHTML = "<svg version=\"1.1\" id=\"" + splitEle.id + "_svg\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 20 40\" enable-background=\"new 0 0 20 40\" xml:space=\"preserve\">"
                    + "<polygon points=\"0,0 20,20 0,40 20,40 20,0 20,0\" /><polygon points=\"19,20 0,40 1,40 20,20 1,0 0,0\"/></svg>";
                    splitEle.appendChild(splitInfoEle);
                    return true;
                });
                crumbEle.appendChild(pathEle);
            } else {
                var titleEle = document.createElement("h1");
                titleEle.id = PageController.headerPanelId + "_title";
                containerEle.appendChild(titleEle);
                var titleLinkEle = document.createElement("a");
                titleLinkEle.href = "#";
                titleLinkEle.innerHTML = "APASS CRM";
                if (!!PageController.homeUrl) titleLinkEle.href = PageController.homeUrl;
                else titleLinkEle.onclick = (ev: MouseEvent) => {
                    return false;
                };
                titleEle.appendChild(titleLinkEle);
                containerEle.appendChild(titleEle);
            }

            cElement.innerHTML = "";
            var hcEle = document.createElement("div");
            hcEle.className = "ali-container-main";
            hcEle.appendChild(containerEle);
            if (crumbEle != containerEle) {
                var mcEle = document.createElement("div");
                mcEle.className = "ali-container-main ali-container-nav";
                cElement.appendChild(mcEle);
                mcEle.appendChild(crumbEle);
                cElement.appendChild(mcEle);
                hcEle.className += " ali-container-menu";
            }

            cElement.appendChild(hcEle);

            var menuEle = document.createElement("ul");
            menuEle.id = PageController.headerPanelId + "_menu";
            PageController.renderMenu(menuEle, PageController.menu, branch);
            containerEle.appendChild(menuEle);

            var userEle = document.createElement("ul");
            userEle.id = PageController.headerPanelId + "_user";
            var searchEle = document.createElement("li");
            searchEle.id = userEle.id + "_sear";
            PageController._renderSearchBar(searchEle);
            userEle.appendChild(searchEle);
            var principle = Users.Manager.get_principle();
            if (!!principle) {
                var msgUrl = Text.format(PageController.messageUrl, { "user": principle.profile.id });
                var signOutUrl = Text.format(PageController.signOutUrl, { "user": principle.profile.id });
                var userMenu: Collection.ButtonInfoContract[] = [
                    {
                        id: "me",
                        name: principle.profile.nickname,
                        avatar: {
                            type: "url",
                            name: principle.profile.nickname,
                            url: principle.profile.avatar
                        },
                        children: [
                            {
                                id: "me\logout",
                                name: AliHub.Res.hubTemplate().localString("logout"),
                                url: signOutUrl
                            }
                        ]
                    }, {
                        id: "message",
                        name: AliHub.Res.hubTemplate().localString("message"),
                        url: msgUrl,
                        avatar: {
                            type: "string",
                            value: AliHub.Res.tempIconfont.message,
                            styleRef: "ali-iconfont-main"
                        },
                        renderStyle: Collection.ButtonRenderStyles.image
                    }, {
                        id: "feedback",
                        name: AliHub.Res.hubTemplate().localString("feedback"),
                        url: PageController.feedbackUrl,
                        avatar: {
                            type: "string",
                            value: AliHub.Res.tempIconfont.feedback,
                            styleRef: "ali-iconfont-main"
                        },
                        renderStyle: Collection.ButtonRenderStyles.image
                    }
                ];
                PageController.renderMenu(userEle, userMenu);
            }

            crumbEle.appendChild(userEle);
        }

        public static changeBranch(path: string) {
            var menuEle = <HTMLUListElement>Elements.getById(PageController.headerPanelId + "_menu");
            if (!menuEle) return;
            PageController.selectMenuItem(menuEle, PageController.menu, path);
        }

        public static selectMenuItem(element: HTMLUListElement, menu: Collection.ButtonInfoContract[], path: string) {
            if (!element || !menu) return null;
            menu.forEach((item, index, arr) => {
                var itemEle = Elements.getById(element.id + "_i" + index.toString());
                if (!itemEle.tagName || itemEle.tagName.toString().toLowerCase() !== "li") return;
                if (!!path && path === item.id) Elements.Utils.changeStyleRef(itemEle, ["ali-state-active-t"], []);
                else Elements.Utils.changeStyleRef(itemEle, [], ["ali-state-active-t"]);
            });
        }

        /**
          * Renders menu.
          */
        public static renderMenu(element: HTMLUListElement, menu: Collection.ButtonInfoContract[], path?: string, h?: (item: Collection.ButtonInfoContract, itemElement: HTMLLIElement, index: number) => void, split?: (splitElement: HTMLLIElement, leftIndex: number) => boolean): HTMLLIElement[] {
            if (!element || !menu) return null;
            var col: HTMLLIElement[]= [];
            menu.forEach((item, index, arr) => {
                if (index > 0 && !!split) {
                    var splitEle = document.createElement("li");
                    splitEle.id = element.id + "_split" + index.toString();
                    splitEle.className = "ali-container-split";
                    element.appendChild(splitEle);
                    if (!split(splitEle, index - 1)) splitEle.style.display = "none";
                }

                var itemEle = document.createElement("li");
                col.push(itemEle);
                itemEle.id = element.id + "_i" + index.toString();
                itemEle.className = "ali-container-menu";
                if (!!path && path === item.id) itemEle.className = "ali-state-active-t";
                var infoEle = document.createElement("div");
                infoEle.id = itemEle.id + "_info";
                infoEle.className = "ali-container-main";
                var linkEle = document.createElement("a");
                linkEle.target = PageController.searchTarget;
                linkEle.id = infoEle.id + "_link";
                if (!!item.name) linkEle.title = item.name.replace("<em>", "\"").replace("</em>", "\"");
                if (!!item.avatar && item.renderStyle !== Collection.ButtonRenderStyles.text) {
                    var iconEle = Graph.ImageContainer.generateImage(item.avatar);
                    if (!!iconEle) linkEle.appendChild(iconEle);
                }

                if (!!item.name && item.renderStyle !== Collection.ButtonRenderStyles.image) {
                    var contentEle = document.createElement("span");
                    contentEle.innerHTML = item.name;
                    linkEle.appendChild(contentEle);
                }

                linkEle.href = "#";
                if (!!item.url) linkEle.href = item.url;
                else linkEle.onclick = (ev: MouseEvent) => { return false; };
                if (!!item.onclick) linkEle.onclick = (ev: MouseEvent) => { return item.onclick(); };
                infoEle.appendChild(linkEle);
                itemEle.appendChild(infoEle);
                element.appendChild(itemEle);
                if (!!h) h(item, itemEle, index);
                if (!item.children) return;
                var childrenEle = document.createElement("ul");
                childrenEle.id = itemEle.id + "_menu";
                itemEle.appendChild(childrenEle);
                PageController.renderMenu(childrenEle, item.children);
            });
            return col;
        }

        private static _menuElements: HTMLLIElement[];

        private static _menuItems: Collection.ButtonInfoContract[];

        private static _menuSelIndex: number;

        private static _q: string;

        private static _renderSearchBar(element: HTMLElement) {
            if (!element) return;
            Elements.Utils.changeStyleRef(element, ["ali-container-search"]);
            var infoEle = document.createElement("div");
            infoEle.id = element.id + "_info";
            infoEle.className = "ali-container-main";
            var iconEle = document.createElement("span");
            iconEle.className = "ali-iconfont-main";
            iconEle.innerHTML = AliHub.Res.tempIconfont.search;
            infoEle.appendChild(iconEle);
            var inputEle = document.createElement("input");
            inputEle.type = "search";
            inputEle.placeholder = !!PageController.searchTip && PageController.searchTip !== "" ? PageController.searchTip : AliHub.Res.hubTemplate().localString("typeKeywords");
            inputEle.value = "";
            inputEle.autocomplete = "off";
            inputEle.spellcheck = false;
            infoEle.appendChild(inputEle);
            element.appendChild(infoEle);
            var subMenuEle = document.createElement("ul");
            element.appendChild(subMenuEle);
            var selItem = (mIndex: number) => {
                if (!PageController._menuElements) return;
                if (PageController._menuSelIndex != null) {
                    var oldIndex = PageController._menuSelIndex;
                    if (oldIndex != null && oldIndex >= 0 && oldIndex < PageController._menuElements.length) {
                        var oldElement = PageController._menuElements[oldIndex];
                        if (!!oldElement) oldElement.className = "";
                    }
                }

                if (mIndex < 0 || mIndex >= PageController._menuElements.length) mIndex = 0;
                var mElement = PageController._menuElements[mIndex];
                if (!mElement) return;
                mElement.className = "ali-state-active-t";
                PageController._menuSelIndex = mIndex;
            };
            var showJump = (q: string, forceRefresh: boolean = false): HTMLLIElement[]=> {
                if (!PageController.searchProvider) {
                    subMenuEle.style.display = "none";
                    return;
                }

                if (!forceRefresh && PageController._q === q) return;
                PageController._q = q;
                PageController._menuSelIndex = -1;
                var subItems = PageController.searchProvider(q);
                if (!subItems || subItems.length === 0) return;
                subMenuEle.innerHTML = "";
                subMenuEle.style.display = "block";
                var emQ = "<em>" + q + "</em>";
                var qReplace = (str: string, em: boolean) => {
                    return !!str ? str.replace("{{q}}", em ? emQ : q).replace("{q}", em ? emQ : q) : "";
                };
                var col: Collection.ButtonInfoContract[] = [];
                subItems.forEach((ele, i, arr) => {
                    var item = Common.Reflection.copy(ele);
                    if (!item || !item.name) return;
                    item.name = qReplace(item.name, true);
                    if (!!item.url) item.url = qReplace(item.url, false);
                    col.push(item);
                });
                var eles = PageController.renderMenu(subMenuEle, col, null, (mItem, mElement, mIndex) => {
                    mElement.onmouseenter = (ev: MouseEvent) => {
                        selItem(mIndex);
                    };
                });
                PageController._menuElements = eles;
                PageController._menuItems = subItems;
                return eles;
            };
            inputEle.onblur = (ev: FocusEvent) => {
                if (!inputEle.value || inputEle.value === "" || inputEle.value === " " || !PageController.searchProvider) {
                    subMenuEle.style.display = "none";
                    PageController._q = null;
                }
            };
            inputEle.onkeydown = (ev: KeyboardEvent) => {
                var keyCode = event.keyCode;
                if (!inputEle.value || inputEle.value === "" || inputEle.value === " " || !PageController.searchProvider) {
                    subMenuEle.style.display = "none";
                    return;
                }

                if (keyCode === 27) {
                    subMenuEle.style.display = "none";
                    return;
                } else if (keyCode === 13) {
                    var menuItems = PageController._menuElements;
                    if (!menuItems) return;
                    var curIndex = PageController._menuSelIndex;
                    if (curIndex == null) curIndex = 0;
                    if (curIndex < 0 || curIndex >= menuItems.length) return;
                    var menuItem = menuItems[curIndex];
                    if (!menuItem) return;
                    var menuLinkItem = Elements.getItem(menuItem.id + "_info_link");
                    if (!menuLinkItem) return;
                    menuLinkItem.click();
                    return;
                } else if (keyCode !== 38 && keyCode !== 40) {
                    return;
                }

                var q = inputEle.value;
                showJump(q);
                var curIndex = PageController._menuSelIndex;
                if (!PageController._menuElements) return;
                if (keyCode === 40) {
                    if (curIndex == null) curIndex = -1;
                    if (curIndex < PageController._menuElements.length - 1) selItem(curIndex + 1);
                } else if (keyCode === 38) {
                    if (curIndex == null) curIndex = PageController._menuElements.length;
                    if (curIndex > 0) selItem(curIndex - 1);
                }
            };
            inputEle.onkeypress = (ev: KeyboardEvent) => {
                if (!inputEle.value || inputEle.value === "" || inputEle.value === " " || !PageController.searchProvider) {
                    subMenuEle.style.display = "none";
                    return;
                }

                setTimeout(() => {
                    var q = inputEle.value;
                    setTimeout(() => {
                        if (q !== inputEle.value) return;
                        showJump(q);
                        selItem(0);
                    }, 300);
                }, 200);
            };
            inputEle.onpaste = (ev: DragEvent) => {
                setTimeout(() => {
                    var q = inputEle.value;
                    showJump(q);
                    selItem(0);
                }, 200);
            };
        }

    }

    /**
      * Creates a control as child.
      * @param id  The identifier.
      * @param control  The type of the control to append.
      * @param parent  The parent control.
      */
    export function createControl(id: string, control: typeof VisualControl, parent?: VisualControl) {
        return !!parent ? parent.createControl(id, control) : new control(id);
    }

}

module AliHub.Collection {

    /**
      * Dictionary.
      */
    export interface HashTable {

        /**
          * Gets or sets value by key.
          */
        [key: string]: any;
    }

    /**
      * Dictionary.
      */
    export interface Dictionary<T> {

        /**
          * Gets or sets value by key.
          */
        [key: string]: T;
    }

    /**
      * Key value pair.
      */
    export interface ItemViewContract<T> {

        /**
          * Display name of the item.
          */
        name: string;

        /**
          * Item value.
          */
        value: T;

        /**
          * Item avatar.
          */
        avatar?: Graph.ImageContract;

    }

    /**
      * Changing list.
      */
    export interface ChangingContract<T> {

        /**
          * Source.
          */
        from?: T;

        /**
          * Target.
          */
        to?: T;

        /**
          * Count.
          */
        count: number;

    }

    /**
      * Current changing count infor.
      */
    export interface ChangingCountContract<T> {

        /**
          * The target object to mapping.
          */
        target: T;

        /**
          * Original count.
          */
        original: number;

        /**
          * Count of adding items.
          */
        adding?: number;

        /**
          * Count of removing items.
          */
        removing?: number;

        /**
          * Count of modifying items.
          */
        modifying?: number;

    }

    /**
      * Key value pair.
      */
    export interface KeyValuePairContract<TKey, TValue> {

        /**
          * Key of the item.
          */
        key: TKey;

        /**
          * Item value.
          */
        value: TValue;
    }

    /**
      * Interval.
      */
    export interface IntervalContract<T> {

        /**
          * Mininum value.
          */
        min: T;

        /**
          * Maxinum value.
          */
        max: T;

    }

    /**
      * Symbol description.
      */
    export interface SymbolDescriptionContract<T> {

        /**
          * Display name.
          */
        name: string;

        /**
          * Symbol.
          */
        symbol?: string;

        /**
          * Code or other type of raw.
          */
        value: T;

    }

    /**
      * Basic button item information contract.
      */
    export interface BasicButtonInfoContract {

        /**
          * Display name.
          */
        name: string;

        /**
          * Counting value, date, time, price, mentioned string, etc.
          */
        note?: string;

        /**
          * Link URL.
          */
        url?: string;

        /**
          * Onclick event.
          */
        onclick?: Common.Func<boolean>;

        /**
          * Icon.
          */
        avatar?: Graph.ImageContract;

    }

    /**
      * Button item information contract.
      */
    export interface ButtonInfoContract extends BasicButtonInfoContract {

        /**
          * Menu item identifier.
          */
        id?: string;

        /**
          * Sub-menu.
          */
        children?: ButtonInfoContract[];

        /**
          * The way to render.
          */
        renderStyle?: ButtonRenderStyles;

    }

    /**
      * List item information contract.
      */
    export interface ListItemContract extends BasicButtonInfoContract {

        /**
          * List item identifier.
          */
        id?: string;

        /**
          * Description.
          * Each item is a paragraph.
          */
        description?: string[];

        /**
          * Reference links list.
          */
        links?: BasicButtonInfoContract[];

        /**
          * Tags.
          */
        tags?: BasicButtonInfoContract[];

        /**
          * Properties list.
          */
        properties?: BasicButtonInfoContract[];

        /**
          * Flags list.
          */
        flags?: BasicButtonInfoContract[];

    }

    /**
      * Group item information contract..
      */
    export interface GroupItemInfoContract<T> {

        /**
          * The element of the group header.
          */
        element: HTMLElement;

        /**
          * First item in the group.
          */
        firstItem: ListItemInfo<T>;

        /**
          * Group title model.
          */
        model: any;

    }

    /**
      * Binding array.
      */
    export interface BindingArrayContract<T> extends Common.BindingObjectContract<T[]> {
        indexOf(searchElement: T, fromIndex?: number): number;
        slice(start: number, end?: number): T[];
        splice(start: number): T[];
        splice(start: number, deleteCount: number, ...items: T[]): T[];
        pop(): T;
        push(...items: T[]): void;
        shift(): T;
        unshift(...items: T[]): number;
        reverse(): T[];
        sort(): void;
        sort(compareFunction: (left: T, right: T) => number): void;
    }

    /**
      * Array binding parameters.
      */
    export interface ArrayBindingParamContract<T> {
        id: string;
        model: BindingArrayContract<T>;
        res: any;
    }

    /**
      * Grouped list contract.
      */
    export interface GroupedListContract<T> {
        name: string;
        list: Collection.KeyValuePairContract<string, T>[];
    }

    /**
      * View model for list control.
      */
    export interface ListViewModelContract<T> {

        /**
          * Tests whether one of entry should be displayed.
          * @param list  The list control which requests to process this method.
          * @param item  The item to test.
          */
        isVisible? (list: ListControl<T>, item: T): boolean;

        /**
          * Tests whether one of entry should be before another.
          * @param list  The list control which requests to process this method.
          * @param entryA  The entry to test.
          * @param entryB  The reference entry for comparing.
          */
        shouldBeBefore? (list: ListControl<T>, entryA: T, entryB: T): boolean;

        /**
          * Tests whether the entries are in same group.
          * @param list  The list control which requests to process this method.
          * @param entryA  The entry to test.
          * @param entryB  The reference entry for comparing.
          */
        areInSameGroup? (list: ListControl<T>, entryA: T, entryB: T): boolean;

        /**
          * Checks whether contains the given entry by searching key and returns the index.
          * @param list  The list control which requests to process this method.
          * @param entry  The entry to test.
          */
        containsItem? (list: ListControl<T>, entry: T): number;

        /**
          * Merges changing.
          * @param list  The list control which requests to process this method.
          * @param entry  The new entry or the one with changing.
          * @param oldItem  The original item.
          */
        mergeChanging? (list: ListControl<T>, entry: T, oldItem: ListItemInfo<T>): T;

        /**
          * Checks whether the given item means it has been deleted.
          * @param list  The list control which requests to process this method.
          * @param entry  The entry to test.
          */
        isDeleted? (list: ListControl<T>, entry: T): boolean;

        /**
          * Raises on pushing entries. 
          * @param list  The list control which requests to process this method.
          * @param col  The entries pushed.
          */
        onEntriesPushed? (list: ListControl<T>, col: T[]): void;

        /**
          * Raises on request update.
          * @param list  The list control which requests to process this method.
          */
        onUpdateRequested? (list: ListControl<T>): void;

        /**
          * Gets group item info model.
          * @param list  The list control which requests to process this method.
          * @param info  The group item information.
          */
        getGroupModel? (list: ListControl<T>, info: GroupItemInfoContract<T>): any;


        /**
          * Tests given entry is valid.
          * @param list  The list control which requests to process this method.
          * @param entry  The entry to test.
          */
        valid?(list: ListControl<T>, entry: T): boolean;
    }

    /**
      * Customized view model for list control.
      */
    export interface CustomizedListViewModelContract<T> extends ListViewModelContract<T> {

        /**
          * Renders the list item.
          * @param list  The list control which requests to process this method.
          * @param item  The item to render.
          */
        renderItem(list: ListControl<T>, item: ListItemInfo<T>): void;

        /**
          * Renders the group title.
          * @param list  The list control which requests to process this method.
          * @param info  The group item information argument.
          */
        renderGroupTitle?(list: ListControl<T>, info: GroupItemInfoContract<T>): void;

        /**
          * Occurs during an item has been changed.
          * @param list  The list control which requests to process this method.
          * @param newItem  The item with update.
          * @param oldItem  The original item.
          */
        onItemChanged? (list: ListControl<T>, newItem: ListItemInfo<T>, oldItem: ListItemInfo<T>): void;

        /**
          * Occurs during the index of an item has been changed.
          * @param list  The list control which requests to process this method.
          * @param item  The item of which index has been changed.
          * @param oldIndex  Original index.
          */
        onItemIndexChanged? (list: ListControl<T>, item: ListItemInfo<T>, oldIndex: number): void;

    }

    /**
      * Converted view model for list control.
      */
    export interface ConvertedListViewModelContract<TSource, TTarget> extends ListViewModelContract<TSource> {

        /**
          * Converts given entry to the one of target type.
          * @param list  The list control which requests to process this method.
          * @param entry  The entry to convert.
          */
        convert(list: ListControl<TSource>, entry: TSource): TTarget;

    }

    /**
      * Converted view model for common list.
      */
    export interface CommonListViewModelContract<T> extends ConvertedListViewModelContract<T, ListItemContract> {
    }

    /**
      * List control extender.
      */
    export interface ListExtender<T> {

        /**
          * Extender name.
          */
        name: string;

        /**
          * Gets model.
          * @param list  The list control which requests to process this method.
          * @param item  The target list item info. 
          */
        model?(list: ListControl<T>, item: ListItemInfo<T>): any;

        /**
          * Loads after done.
          * @param list  The list control which requests to process this method.
          * @param item  The target list item info. 
          */
        load? (list: ListControl<T>, item: ListItemInfo<T>): void;

    }

    /**
      * Model extender of binding control.
      */
    export interface ArrayBindingControlExtender<T> {

        /**
          * Extender name.
          */
        name: string;

        /**
          * Gets model.
          * @param control  The target control. 
          */
        model?(control: ArrayBindingControl<T>): any;

        /**
          * Loads after done.
          * @param control  The target control. 
          */
        load? (control: ArrayBindingControl<T>): void;

    }

    /**
      * Button render styles.
      */
    export enum ButtonRenderStyles {

        /**
          * Normal button.
          */
        normal = 0,

        /**
          * Textbox button.
          */
        text = 1,

        /**
          * Image button.
          */
        image = 2

    }

    /**
      * Array binding control.
      */
    export class ArrayBindingControl<T> extends Common.VisualControl {

        private _bindings = Common.BindingFactory.create<ArrayBindingParamContract<T>>();

        private _extenders: ArrayBindingControlExtender<T>[] = [];

        /**
          * Initializes a new instance of the ArrayBindingControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones. 
          */
        constructor(id: string) {
            super(id);
            this._bindings({
                id: this.get_id(),
                model: Common.BindingFactory.createArray<T>(),
                res: AliHub.Res.factory(),
                image: (img: Graph.ImageContract) => {
                    var ele = Graph.ImageContainer.generateImage(img);
                    if (!ele) return null;
                    if (!!ele.outerHTML) return ele.outerHTML;
                    if (!ele.parentNode) {
                        var containerEle = document.createElement("div");
                        containerEle.appendChild(ele);
                    }

                    return (<HTMLElement>ele.parentNode).innerHTML;
                },
                extenders: (name: string, emptyObj: boolean = false) => {
                    return this.procExtender(name, emptyObj);
                }
            });
        }

        /**
          * Gets observable model. 
          */
        public get_observable(): BindingArrayContract<T> {
            return this._bindings().model;
        }

        /**
          * Raises on binding error. 
          */
        public onBindingError(errorMessage: string): boolean {
            return !!this._bindings().model();
        }

        /**
          * Sets the template. 
          * @param valueType  The data source type for the value.
          * @param value  The data source value.
          */
        public set_template(valueType: string, value: string) {
            Common.BindingFactory.applyTemplate(this.get_id(), valueType, value, this._bindings, (errMsg) => { return this.onBindingError(errMsg); });
        }

        /**
          * Gets or sets the view model. 
          * @param value  Model value to set; or null, if just to resolve model.
          */
        public viewModel(value?: T[]): T[] {
            if (arguments.length > 0) {
                this._bindings().model(value);
            }

            return this._bindings().model();
        }

        /**
          * Sets view model as null. 
          */
        public clearViewModel(): void {
            this.viewModel(null);
        }

        /**
          * Refreshes view. 
          */
        public refresh(): void {
            var model = this._bindings().model();
            this._bindings().model();
            this._bindings().model(model);
        }
        /**
          * Processes the extender to resolve additional model.
          * @param name  The extender name. 
          * @param emptyObj  true if want to return an empty object instead of null when the extender does not exist; otherwise, false. 
          */
        public procExtender(name: string, emptyObj: boolean = false): any {
            var extender = this.getExtender(name);
            if (!extender) return emptyObj === true ? {} : null;
            return extender.model(this);
        }

        /**
          * Gets a specific extender.
          * @param name  The extender name. 
          */
        public getExtender(name: string): ArrayBindingControlExtender<T> {
            if (!name) return null;
            var extender: ArrayBindingControlExtender<T> = null;
            this._extenders.some((ele, i, arr) => {
                if (ele.name !== name) return false;
                extender = ele;
                return true;
            });

            return extender;
        }

        /**
          * Adds an extender.
          * @param value  The extender instance. 
          */
        public addExtender(value: ArrayBindingControlExtender<T>): void {
            if (!value || !value.name) return;
            this.removeExtender(value.name);
            this._extenders.push(value);
        }

        /**
          * Removes a specific extender.
          * @param name  The extender name. 
          */
        public removeExtender(name: string): void {
            if (!name) return;
            var col: ArrayBindingControlExtender<T>[] = [];
            this._extenders.forEach((ele, i, arr) => {
                if (!ele || ele.name === name) return;
                col.push(ele);
            });
            this._extenders = col;
        }

        /**
          * Clears all extenders registered. 
          */
        public clearExtenders(): void {
            this._extenders = [];
        }

    }

    /**
      * Item info for list control.
      */
    export class ListItemInfo<T> {

        /**
          * HTML element of the control.
          */
        public element: HTMLElement;

        /**
          * Data model / view model.
          */
        public model: T;

        /**
          * Current list index.
          */
        public index: number;

        /**
          * Converted item.
          */
        public converted: any;

        /**
          * Additional information and utilities.
          */
        public extenders: any;

        /**
          * References and cache.
          */
        public ref: any = {};

        /**
          * Sets reference instance property.
          * @param key  The property key. 
          * @param value  The value of the property to set. 
          */
        public set_prop(key: string, value: any) {
            if (!this.ref) this.ref = {};
            this.ref[key] = value;
        }

        /**
          * Gets reference instance property.
          * @param key  The property key. 
          */
        public get_prop<T>(key: string): T {
            if (!!this.ref) return <T>this.ref[key];
            this.ref = {};
            return null;
        }

        /**
          * Gets a child HTML element.
          * usePrefix  true if use current control identifier as prefix; otherwise, false.
          * appendingIdParts  the additional identifier parts.
          */
        public getChildElement(usePrefix: boolean, ...appendingIdParts: string[]): HTMLElement {
            var id = Elements.Utils.mergeId(usePrefix ? this.element.id : null, appendingIdParts);
            return Elements.getItem(id);
        }

        /**
          * Generates a copy of this instance.
          */
        public copy(): ListItemInfo<T> {
            var instance = new ListItemInfo<T>();
            instance.element = this.element;
            instance.model = this.model;
            instance.index = this.index;
            instance.converted = this.converted;
            instance.extenders = this.extenders;
            if (!this.ref) this.ref = {};
            instance.ref = this.ref;
            return instance;
        }
    }

    /**
      * List control.
      */
    export class ListControl<T> extends Common.VisualControl {

        private _list: ListItemInfo<T>[] = [];

        private _eleCount = 0;

        private _listEle: HTMLUListElement;

        private _containerEle: HTMLDivElement;

        private _itemTemplT: string;

        private _itemTemplV: string;

        private _headerTemplT: string;

        private _headerTemplV: string;

        private _extenders: ListExtender<T>[] = [];

        /**
          * Initializes a new instance of the ListControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones. 
          */
        constructor(id: string) {
            super(id);
            var listId = id + "_list";
            var notificationId = id + "_notification";
            this._containerEle = Elements.getById<HTMLDivElement>(id);
            this._containerEle.className = ListHelper.addItem(this._containerEle.className, " ", ["ali-controls-list"]);
            this._containerEle.innerHTML = "<div id=\"" + notificationId + "\" class=\"ali-pop-notification\" style=\"display: none; \"></div><ul id=\"" + listId + "\"></ul><div id=\"" + id + "_note\" class=\"ali-container-note\" style=\"display: none; \" ></div>";
            this._listEle = <HTMLUListElement>Elements.getItem(listId);
            var notificationEle = Elements.getItem(notificationId);
            notificationEle.onclick = (ev: MouseEvent) => {
                if (!!this.updateRequested) {
                    if (!!this.viewModel && !!this.viewModel.onUpdateRequested) this.viewModel.onUpdateRequested(this);
                    this.updateRequested.raise({});
                }

                notificationEle.style.display = "none";
            };
        }

        /**
          * Raised on request update.
          */
        public updateRequested = new EventHandlers<Object>();

        /**
          * The handler raised on pushing entries. 
          */
        public entriesPushed = new EventHandlers<T[]>();

        /**
          * View model for the list. 
          */
        public viewModel: ListViewModelContract<T>;

        /**
          * Sets the tiles view mode.
          * @param index  true if enable tiles mode; otherwise, false. 
          */
        public setTilesView(value: boolean) {
            var className = value ? "ali-controls-tiles" : "ali-controls-list";
            this._containerEle.className = Collection.ListHelper.addItem(this._containerEle.className, " ", [className], ["ali-controls-list", "ali-controls-tiles"]);
        }

        /**
          * Removes a specific item.
          * @param index  Index of the item to remove. 
          */
        public remove(index: number): void {
            if (index < 0 || index >= this._list.length) return;
            var col: ListItemInfo<T>[] = [];
            this._list.forEach((ele, i, arr) => {
                if (index === i) {
                    ele.element.outerHTML = "";
                    return;
                }

                col.push(ele);
                if (index > i) return;
                ele.index--;
                this.onItemIndexChanged(ele, ele.index + 1);
            });

            this._list = col;
        }

        /**
          * Processes the extender to resolve additional model.
          * @param name  The extender name. 
          * @param item  The target list item info. 
          * @param emptyObj  true if want to return an empty object instead of null when the extender does not exist; otherwise, false. 
          */
        public procExtender(name: string, item: ListItemInfo<T>, emptyObj: boolean = false): any {
            var extender = this.getExtender(name);
            if (!extender) return emptyObj === true ? {} : null;
            return extender.model(this, item);
        }

        /**
          * Gets a specific extender.
          * @param name  The extender name. 
          */
        public getExtender(name: string): ListExtender<T> {
            if (!name) return null;
            var extender: ListExtender<T> = null;
            this._extenders.some((ele, i, arr) => {
                if (ele.name !== name) return false;
                extender = ele;
                return true;
            });

            return extender;
        }

        /**
          * Adds an extender.
          * @param value  The extender instance. 
          */
        public addExtender(value: ListExtender<T>): void {
            if (!value || !value.name) return;
            this.removeExtender(value.name);
            this._extenders.push(value);
        }

        /**
          * Removes a specific extender.
          * @param name  The extender name. 
          */
        public removeExtender(name: string): void {
            if (!name) return;
            var col: ListExtender<T>[] = [];
            this._extenders.forEach((ele, i, arr) => {
                if (!ele || ele.name === name) return;
                col.push(ele);
            });
            this._extenders = col;
        }

        /**
          * Clears all extenders registered. 
          */
        public clearExtenders(): void {
            this._extenders = [];
        }

        /**
          * Push a given item. Supports actions of insertion, updating and removing.
          * @param entry  The item to set into the list. 
          */
        public push(entry: T): void {
            if (!this._push(entry)) return;
            this.refreshHeaders();
            if (!!this.viewModel && !!this.viewModel.onEntriesPushed) this.viewModel.onEntriesPushed(this, [entry]);
            if (!!this.entriesPushed) this.entriesPushed.raise([ entry ]);
        }

        /**
          * Batch pushes a colletion.
          * @param col  A collection to delta update into the list. 
          */        
        public pushRange(col: T[]) {
            if (!col) return;
            var deltaCol: T[] = [];
            col.forEach((ele, index, arr) => {
                if (this._push(ele)) deltaCol.push(ele);
            });
            this.refreshHeaders();
            if (deltaCol.length == 0) return;
            if (!!this.viewModel && !!this.viewModel.onEntriesPushed) this.viewModel.onEntriesPushed(this, deltaCol);
            if (!!this.entriesPushed) this.entriesPushed.raise(deltaCol);
        }

        /**
          * Reloads the list.
          */
        public refresh(): void {
            this._listEle.innerHTML = "";
            this._eleCount = 0;
            this._list.forEach((tile, i, arr) => {
                if (tile == null) return;
                var eleEle = document.createElement("li");
                eleEle.id = this._listEle.id + "_" + (new Date()).getMinutes().toString() + "i" + this._eleCount;
                tile.element = eleEle;
                this._eleCount++;
                this._listEle.appendChild(tile.element);
                this.renderItem(tile.copy());
                if (!this.isVisible(tile.model)) {
                    tile.element.style.display = "none";
                }
            });

            this.refreshHeaders();
        }

        /**
          * Sets the view template of each item.
          * @param sourceType  The type of view template source.
          * @param sourceValue  The value of view template source.
          */
        public setItemTemplate(sourceType: string, sourceValue: string) {
            if (!sourceType || !sourceValue || sourceType === "" || sourceValue === "") return;
            this._itemTemplT = sourceType;
            this._itemTemplV = sourceValue;
            this.refresh();
        }

        /**
          * Clears the view template of each item.
          */
        public clearItemTemplate() {
            this._itemTemplT = null;
            this._itemTemplV = null;
            this.refresh();
        }

        /**
          * Sets the view template of each items group header.
          * @param sourceType  The type of view template source.
          * @param sourceValue  The value of view template source.
          */
        public setHeaderTemplate(sourceType: string, sourceValue: string) {
            if (!sourceType || !sourceValue || sourceType === "" || sourceValue === "") return;
            this._headerTemplT = sourceType;
            this._headerTemplV = sourceValue;
            this.refresh();
        }

        /**
          * Clears the view template of each item.
          */
        public clearHeaderTemplate() {
            this._headerTemplT = null;
            this._headerTemplV = null;
            this.refresh();
        }

        /**
          * Sets the view template of item.
          */
        public refreshHeaders(): number {
            this.clearHeaders();
            var oldOne: ListItemInfo<T> = null;
            var count = 0;
            var errCount = 0;
            this._list.forEach((tile, i, arr) => {
                if (tile == null) return;
                var isNewGroup = !oldOne || !this.areInSameGroup(oldOne.model, tile.model);
                oldOne = tile;
                if (isNewGroup) {
                    var eleGroupEle = document.createElement("li");
                    eleGroupEle.id = this._listEle.id + "_" + (new Date()).getMinutes().toString() + "g" + this._eleCount;
                    this._eleCount++;
                    eleGroupEle.className = "ali-container-group-title";
                    this._listEle.insertBefore(eleGroupEle, tile.element);
                    var groupInfo = { element: eleGroupEle, firstItem: tile, model: null };
                    groupInfo.model = this.getGroupModel(groupInfo);
                    try {
                        if (!!this._headerTemplT && !!this._headerTemplV) {
                            var bindingControl = new Common.BindingControl<GroupItemInfoContract<T>>(eleGroupEle.id);
                            bindingControl.viewModel(groupInfo);
                            bindingControl.set_template(this._headerTemplT, this._headerTemplV);
                        }

                        this.renderGroupTitle({ element: eleGroupEle, firstItem: tile, model: groupInfo.model });
                    } catch (ex) {
                        errCount++;
                        eleGroupEle.outerHTML = "";
                    }
                    count++;
                }
            });

            if (errCount > 0) {
                Diagnostics.Tracker.warn("CoreLibrary", "[0x02072302] Failed to render group title in list control.");
            }

            return count;
        }

        public clearHeaders(): void {
            var groupCol = this.getGroupHeadersElements();
            if (!groupCol) return;
            groupCol.forEach((ele, i, arr) => {
                ele.outerHTML = "";
            });
        }

        public getChildrenElements(): HTMLLIElement[]{
            var list: HTMLLIElement[] = [];
            var children = this._listEle.children;
            for (var i = 0; i < children.length; i++) {
                var child = <HTMLLIElement>children[i];
                if (!child) continue;
                if (!!child.className && child.className != "" && child.className.indexOf("ali-container-group-title") >= 0) continue;
                list.push(child);
            }

            return list;
        }

        public getGroupHeadersElements(): HTMLLIElement[] {
            var list: HTMLLIElement[] = [];
            var children = this._listEle.children;
            for (var i = 0; i < children.length; i++) {
                var child = <HTMLLIElement>children[i];
                if (!child) continue;
                if (!child.className || child.className == "" || child.className.indexOf("ali-container-group-title") < 0) continue;
                list.push(child);
            }

            return list;
        }

        /**
          * Clears all items.
          */
        public clear(): void {
            this._listEle.innerHTML = "";
            this._list = [];
        }

        /**
          * Performs the specified action for each element in this list.
          * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array. 
          * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
          */
        public forEachItem(callbackfn: (value: ListItemInfo<T>, index: number, array: ListItemInfo<T>[]) => void): void {
            this._list.forEach((ele, i, arr) => {
                if (!!ele) callbackfn(ele.copy(), i, arr);
            });
        }

        /**
          * Determines whether the specified callback function returns true for any element of an array.
          * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array. 
          * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
          */
        public firstItem(callbackfn: (value: ListItemInfo<T>, index: number, array: ListItemInfo<T>[]) => boolean): ListItemInfo<T> {
            var info: ListItemInfo<T> = null;
            this._list.some((ele, i, arr) => {
                if (!ele || !callbackfn(ele.copy(), i, arr)) return false;
                info = ele.copy();
                return true;
            });
            return info;
        }

        /**
          * Renders the list item.
          * @param item  The item to render.
          */
        public renderItem(item: ListItemInfo<T>): void {
            if (!!this.viewModel && !!(<CustomizedListViewModelContract<T>>this.viewModel).renderItem) return (<CustomizedListViewModelContract<T>>this.viewModel).renderItem(this, item);
        }

        /**
          * Renders the group title.
          * @param start  The first entry of the group.
          */
        public renderGroupTitle(info: GroupItemInfoContract<T>): void {
            if (!!this.viewModel && !!(<CustomizedListViewModelContract<T>>this.viewModel).renderGroupTitle) return (<CustomizedListViewModelContract<T>>this.viewModel).renderGroupTitle(this, info);
        }

        /**
          * Occurs during an item has been changed.
          * @param newItem  The item with update.
          * @param oldItem  The original item.
          */
        public onItemChanged(newItem: ListItemInfo<T>, oldItem: ListItemInfo<T>): void {
            if (!!this.viewModel && !!(<CustomizedListViewModelContract<T>>this.viewModel).onItemChanged) return (<CustomizedListViewModelContract<T>>this.viewModel).onItemChanged(this, newItem, oldItem);
        }

        /**
          * Occurs during the index of an item has been changed.
          * @param item  The item of which index has been changed.
          * @param oldIndex  Original index.
          */
        public onItemIndexChanged(item: ListItemInfo<T>, oldIndex: number): void {
            if (!!this.viewModel && !!(<CustomizedListViewModelContract<T>>this.viewModel).onItemIndexChanged) return (<CustomizedListViewModelContract<T>>this.viewModel).onItemIndexChanged(this, item, oldIndex);
        }

        /**
          * Checks whether contains the given entry by searching key and returns the index.
          * @param entry  The entry to test.
          */
        public containsItem(entry: T): number {
            if (!!this.viewModel && !!this.viewModel.containsItem) return this.viewModel.containsItem(this, entry);
            return -1;
        }

        /**
          * Tests whether one of entry should be before another.
          * @param entryA  The entry to test.
          * @param entryB  The reference entry for comparing.
          */
        public shouldBeBefore(entryA: T, entryB: T): boolean {
            if (!!this.viewModel && !!this.viewModel.shouldBeBefore) return this.viewModel.shouldBeBefore(this, entryA, entryB);
            return false;
        }

        /**
          * Tests whether the entries are in same group.
          * @param entryA  The entry to test.
          * @param entryB  The reference entry for comparing.
          */
        public areInSameGroup(entryA: T, entryB: T): boolean {
            if (!!this.viewModel && !!this.viewModel.areInSameGroup) return this.viewModel.areInSameGroup(this, entryA, entryB);
            return true;
        }

        /**
          * Gets group item info model.
          * @param info  The group item information.
          */
        public getGroupModel(info: GroupItemInfoContract<T>): any {
            if (!!this.viewModel && !!this.viewModel.getGroupModel) return this.viewModel.getGroupModel(this, info);
            return null;
        }

        /**
          * Tests whether one of entry should be displayed.
          * @param item  The item to test.
          */
        public isVisible(item: T): boolean {
            if (!!this.viewModel && !!this.viewModel.isVisible) return this.viewModel.isVisible(this, item);
            return true;
        }

        /**
          * Checks whether the given item means it has been deleted.
          * @param entry  The entry to test.
          */
        public isDeleted(entry: T): boolean {
            if (!!this.viewModel && !!this.viewModel.isDeleted) return this.viewModel.isDeleted(this, entry);
            return false;
        }

        /**
          * Merges changing.
          * @param entry  The new entry or the one with changing.
          * @param oldItem  The original item.
          */
        public mergeChanging(entry: T, oldItem: ListItemInfo<T>): T {
            if (!!this.viewModel && !!this.viewModel.mergeChanging) return this.viewModel.mergeChanging(this, entry, oldItem);
            return entry;
        }

        /**
          * Tests given entry is valid.
          * @param entry  The entry to test.
          */
        public valid(entry: T): boolean {
            if (!!this.viewModel && !!this.viewModel.valid) return this.viewModel.valid(this, entry);
            return true;
        }

        private _push(entry: T): boolean {
            if (!entry) return false;
            var isToDel = this.isDeleted(entry);
            var position = this.containsItem(entry);
            if (isToDel) {
                this.remove(position);
                return true;
            }

            if (position >= 0) {
                this._update(entry, position);
                return true;
            }

            this._insert(entry);
            return true
        }

        private _insert(item: T): void {
            var col: ListItemInfo<T>[] = [];
            var hasInserted = false;
            var latestCheck = false;
            for (var i = 0; i < this._list.length; i++) {
                if (!hasInserted) {
                    var shouldBeBefore = this.shouldBeBefore(item, this._list[i].model);
                    if ((latestCheck && !shouldBeBefore) || (!latestCheck && shouldBeBefore)) {
                        var eleEle = document.createElement("li");
                        eleEle.id = this._listEle.id + "_" + (new Date()).getMinutes().toString() + "i" + this._eleCount;
                        this._eleCount++;
                        var tile = new ListItemInfo<T>();
                        tile.element = eleEle;
                        tile.model = item;
                        tile.index = i;
                        if (!!this.viewModel && !!(<any>this.viewModel).convert) tile.converted = (<any>this.viewModel).convert(this, item);
                        else tile.converted = item;
                        tile.extenders = (name) => {
                            return this.procExtender(name, tile.copy());
                        };
                        if (i >= this._list.length) {
                            this._listEle.appendChild(tile.element);
                        } else {
                            this._listEle.insertBefore(tile.element, this._list[i].element);
                        }

                        hasInserted = true;
                        if (!!this._itemTemplT && !!this._itemTemplV) {
                            var bindingControl = new Common.BindingControl<ListItemInfo<T>>(tile.element.id);
                            bindingControl.viewModel(tile);
                            bindingControl.set_template(this._itemTemplT, this._itemTemplV);
                        }

                        this.renderItem(tile.copy());
                        this._extenders.forEach((ele, i, arr) => {
                            if (!!ele && !!ele.load) ele.load(this, tile.copy());
                        });
                        col.push(tile);
                        if (!this.isVisible(tile.model)) {
                            tile.element.style.display = "none";
                        }
                    }
                }

                latestCheck = shouldBeBefore;
                if (hasInserted) {
                    this._list[i].index++;
                    this.onItemIndexChanged(this._list[i].copy(), this._list[i].index + 1);
                }

                col.push(this._list[i]);
            }

            if (!hasInserted) {
                var eleEle = document.createElement("li");
                eleEle.id = this._listEle.id + "_" + (new Date()).getMinutes().toString() + "i" + this._eleCount;
                this._eleCount++;
                var tile = new ListItemInfo<T>();
                tile.element = eleEle;
                tile.model = item;
                tile.index = this._list.length;
                if (!!this.viewModel && !!(<any>this.viewModel).convert) tile.converted = (<any>this.viewModel).convert(this, item);
                else tile.converted = item;
                tile.extenders = (name) => {
                    return this.procExtender(name, tile.copy());
                };
                this._listEle.appendChild(eleEle);
                if (!!this._itemTemplT && !!this._itemTemplV) {
                    var bindingControl = new Common.BindingControl<ListItemInfo<T>>(tile.element.id);
                    bindingControl.viewModel(tile);
                    bindingControl.set_template(this._itemTemplT, this._itemTemplV);
                }

                this.renderItem(tile.copy());
                this._extenders.forEach((ele, i, arr) => {
                    if (!!ele && !!ele.load) ele.load(this, tile.copy());
                });
                this._list.push(tile);
                if (!this.isVisible(tile.model)) {
                    tile.element.style.display = "none";
                }

                return;
            }

            this._list = col;
        }

        private _update(entry: T, position: number): void {
            var tile = this._list[position];
            var oldOne = tile.copy();
            var entryMerged = this.mergeChanging(entry, tile.copy());
            if (!entryMerged) return;
            var newPosition = position;
            var startPosition = position;
            var endPosition = position;
            if (position < this._list.length - 1) {
                for (var i = position + 1; i < this._list.length; i++) {
                    var shouldBeBefore = this.shouldBeBefore(entryMerged, this._list[i].model);
                    if (!shouldBeBefore && position < this._list.length - 1) continue;
                    if (position == this._list.length - 1) {
                        this._listEle.appendChild(tile.element);
                    } else {
                        this._listEle.insertBefore(tile.element, this._list[i].element);
                    }

                    newPosition = i - 1;
                    endPosition = newPosition;
                    break;
                }
            }

            if (position > 0 && endPosition <= startPosition) {
                for (var i = position - 1; i >= 0; i--) {
                    var shouldBeBefore = this.shouldBeBefore(entryMerged, this._list[i].model);
                    if (shouldBeBefore && i > 0) continue;
                    if (!shouldBeBefore && i === position + 1) break;
                    newPosition = shouldBeBefore && i == 0 ? 0 : i + 1;
                    this._listEle.insertBefore(tile.element, this._list[newPosition].element);
                    startPosition = newPosition;
                    break;
                }
            }

            tile.index = newPosition;
            var col: ListItemInfo<T>[] = [];
            if (position !== newPosition) {
                for (var i = 0; i < startPosition; i++) {
                    col.push(this._list[i]);
                }

                if (position > newPosition) {
                    this.onItemIndexChanged(tile.copy(), position);
                    col.push(tile);
                    for (var i = startPosition; i < endPosition; i++) {
                        var curTile = this._list[i];
                        curTile.index++;
                        this.onItemIndexChanged(curTile.copy(), curTile.index - 1);
                        col.push(curTile);
                    }
                } else if (position < newPosition) {
                    for (var i = startPosition + 1; i <= endPosition; i++) {
                        var curTile = this._list[i];
                        curTile.index--;
                        this.onItemIndexChanged(curTile.copy(), curTile.index + 1);
                        col.push(curTile);
                    }

                    this.onItemIndexChanged(tile.copy(), position);
                    col.push(tile);
                }

                for (var i = endPosition + 1; i < this._list.length; i++) {
                    col.push(this._list[i]);
                }

                tile.model = entryMerged;
                this.onItemChanged(tile.copy(), oldOne);
                this._list = col;
            } else {
                tile.model = entryMerged;
                this.onItemChanged(tile.copy(), oldOne);
            }

            if (!this.isVisible(tile.model)) {
                tile.element.style.display = "none";
            } else {
                tile.element.style.display = "";
            }
        }

    }

    export class EventHandlers<T> {

        private _list: Common.EventHandler<T>[] = [];

        /**
          * Registers an event handler.
          * @param h  The event handler to register. 
          */
        public add(h: (ev: T) => void): void {
            if (!h) return;
            if (this._list.some((ele, i, arr) => {
                return ele === h;
            })) return;
            this._list.push(h);
        }

        /**
          * Raises this event.
          * @param ev  The event arguments. 
          */
        public raise(ev: T): void {
            this._list.forEach((ele, i, arr) => {
                ele(ev);
            });
        }

        /**
          * Removes an event handler.
          * @param h  The event handler to remove. 
          */
        public remove(h: (ev: T) => void): void {
            if (!h) return;
            var col = [];
            this._list.forEach((ele, i, arr) => {
                if (ele === h) return;
                col.push(ele);
            });
            this._list = col;
        }

        /**
          * Clears all event handlers.
          */
        public clear(): void {
            this._list = [];
        }

    }

    export class ListHelper {

        /**
          * Checks whether a specific list contains a test item.
          * @param list  The list. 
          * @param testItem  The item to test.
          * @param compare  Additional compare handler. 
          */
        public static contains<T1, T2>(list: T1[], testItem: T2, compare?: Common.Func2<T1, T2, boolean>): boolean {
            if (!list) return false;
            return ListHelper.indexOf(list, testItem, compare) >= 0;
        }

        /**
          * Gets the index of a test item in a specific list.
          * @param list  The list. 
          * @param testItem  The item to test.
          * @param compare  Additional compare handler. 
          */
        public static indexOf<T1, T2>(list: T1[], testItem: T2, compare?: Common.Func2<T1, T2, boolean>): number {
            if (!list) return 0;
            var index = -1;
            list.some((v, i, a) => {
                if (!(!!compare ? compare(v, testItem) : <any>v === <any>testItem)) return false;
                index = i;
                return true;
            });

            return index;
        }

        /**
          * Modifies items in a specific list string.
          * @param raw  The list string. 
          * @param split  The split string.
          * @param addingItems  Items to add into the list string.
          * @param removingItems  Items to remove from the list list string. 
          */
        public static addItem(raw: string, split: string, addingItems: string[], removingItems?: string[]): string {
            if (!split) return raw;
            var str = "";
            if (!!raw && !!split) {
                split = split.toString();
                str = raw.toString() + split;
                str = str.replace(split + split, split);
                if (!!addingItems) addingItems.forEach((ele, i, arr) => {
                    str = str.replace(ele + split, split);
                });
                if (!!removingItems) removingItems.forEach((ele, i, arr) => {
                    str = str.replace(ele + split, split);
                });
                str = (str + split).replace(split + split, split).replace(split + split, split);
                if (str === split) str = "";
            }

            if (!!addingItems) addingItems.forEach((ele, i, arr) => {
                str += ele + split;
            });
            return str.replace(split + split, split);
        }

        /**
          * Finds the item view in the list.
          * @param col  The collection of item views. 
          * @param value  The value of item view to find. 
          */
        public static findItemView<T>(col: ItemViewContract<T>[], value: T): ItemViewContract<T> {
            if (!col) return null;
            var sel: ItemViewContract<T> = null;
            col.some((ele, i, arr) => {
                if (ele.value !== value) return false;
                sel = ele;
                return true;
            });
            return sel;
        }

    }

}

module AliHub.Data {

    /**
      * Data sources.
      */
    export var Sources: any = {};

}

module AliHub.Elements {

    /**
      * Action to fill element.
      */
    export interface FillAction {
        (element: HTMLElement): void;
    }

    /**
      * Gets specific HTML element.
      * id  the element identifier or prefix.
      * appendingIdParts  the additional identifier parts.
      */
    export var getById = <T extends HTMLElement>(id: string, ...appendingIdParts: string[]): T => {
        if (!id || id === "" || typeof id !== "string") return;
        var elementId = Utils.mergeId(id, appendingIdParts);
        return <T>document.getElementById(elementId);
    }

    /**
      * Gets specific HTML element.
      * id  the element identifier or prefix.
      * appendingIdParts  the additional identifier parts.
      */
    export var getItem = (id: string, ...appendingIdParts: string[]): HTMLElement => {
        if (!id || id === "" || typeof id !== "string") return;
        var elementId = Utils.mergeId(id, appendingIdParts);
        return document.getElementById(elementId);
    }

    /**
      * Document utilities.
      */
    export class Utils {

        /**
          * Gets top offset of specific element in document.
          * element  the element.
          */
        public static getTop(element: HTMLElement): number {
            var offset = element.offsetTop;
            if (element.offsetParent != null) offset += Utils.getTop(<HTMLElement>element.offsetParent);
            return offset;
        }

        /**
          * Gets left offset of specific element in document.
          * element  the element.
          */
        public static getLeft(element: HTMLElement): number {
            var offset = element.offsetLeft;
            if (element.offsetParent != null) offset += Utils.getLeft(<HTMLElement>element.offsetParent);
            return offset;
        }

        /**
          * Gets the position of the specific element in document.
          * element  the element.
          */
        public static getPosition(element: HTMLElement): Common.PlaneCoordinate {
            return { x: Utils.getLeft(element), y: Utils.getTop(element) };
        }

        /**
          * Gets the position of the mouse in specific element or document.
          * element  the optional element as target.
          */
        public static getMousePosition(element?: HTMLElement): Common.PlaneCoordinate {
            var x = (<any>event).pageX || (event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
            var y = (<any>event).pageY || (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
            if (!!element) {
                x -= Utils.getLeft(element);
                y -= Utils.getTop(element);
            }

            return { x: x, y: y };
        }
         
        /**
          * Gets specific HTML element.
          * id  the element identifier or prefix.
          * appendingIdParts  the additional identifier parts.
          */
        public static getById<T extends HTMLElement>(id: string, ...appendingIdParts: string[]): T {
            if (!id || id === "" || typeof id !== "string") return;
            var elementId = Utils.mergeId(id, appendingIdParts);
            return <T>document.getElementById(elementId);
        }

        /**
          * Changes style references and resolves the list all.
          * element  the element.
          * adding  the names to add.
          * removing  the names to remove.
          */
        public static changeStyleRef(element: HTMLElement, adding: string[], removing?: string[]): string[]{
            if (!element) return null;
            element.className = Collection.ListHelper.addItem(element.className, " ", adding, removing);
            return element.className.split(" ");
        }

        /**
          * Sanitizes a specific HTML part to text string.
          * htmlString  the HTML string to sanitize.
          */
        public static sanitizeHTML(htmlString): string {
            var tmp = document.createElement('div');
            tmp.appendChild(document.createTextNode(htmlString));
            return tmp.innerHTML;
        }

        /**
          * Merges an identifier.
          * prefix  the identifier prefix.
          * idParts  the additional identifier parts.
          */
        public static mergeId(prefix: string, idParts: string[]): string {
            if (!idParts) return null;
            var elementId = !!prefix ? prefix : "";
            idParts.forEach((ele, i, arr) => {
                if (!ele) return;
                if (elementId !== "") elementId += "_";
                elementId += ele;
            });

            return elementId;
        }

        public static getQuery(name: string | number): string {
            if (!!name) return null;
            if (typeof name === "string") {
                var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
                if (result == null || result.length < 1) {
                    return "";
                }

                return result[1];
            } else if (typeof name === "number") {
                var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));
                if (result == null) {
                    return "";
                }

                return result[name].substring(1);
            }

            return null;
        }

    }

}

module AliHub.Graph {

    /**
      * Series chart information.
      */
    export interface SeriesChartContract {
        categories: string[];
        data: Collection.KeyValuePairContract<string, number>;
        highligh?: Collection.IntervalContract<number>[];
        scope?: Collection.IntervalContract<number>;
    }

    /**
      * Image reference.
      */
    export interface ImageContract {

        /**
          * Image type - url, string, svg.
          */
        type: string;

        /**
          * Style reference key.
          */
        styleRef?: string;

    }

    /**
      * Image generated by charactors.
      * type should be string.
      */
    export interface StringImageContract extends ImageContract {

        /**
          * String color.
          */
        color?: string;

        /**
          * Background color.
          */
        bgColor?: string;

        /**
          * Charactors to show.
          */
        value: string;

    }

    /**
      * Image generated by charactors.
      * type should be url.
      */
    export interface UrlImageContract extends ImageContract {

        /**
          * String name.
          */
        name?: string;

        /**
          * Image URL.
          */
        url: string;

    }

    /**
      * Image generated by charactors.
      * type should be svg.
      */
    export interface SvgImageContract extends ImageContract {

        /**
          * SVG source.
          */
        source: string;

    }

    /**
      * Chart center.
      */
    export class Chart {

        /**
          * Generates an HTML string of progress bar.
          * value  the value.
          * blockCount  the count of block in progress bar.
          */
        public static genProgressBarHTML(value: number, blockCount: number): string {
            var str = "<svg class=\"chart-progress-img\" viewBox=\"0 0 104 20\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">"
                + "<title>Progress Bar</title><desc>Chart of progress bar.</desc><defs>"
                + "<linearGradient id=\"chart-progress-fill\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"><stop offset=\"0%\" class=\"chart-progress-fill-0\" /><stop offset=\"100%\" class=\"chart-progress-fill-100\" /></linearGradient>"
                + "</defs><g id=\"ProgressBar\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">"
                + "<g id=\"chart-progress-rec\" sketch:type=\"MSArtboardGroup\" >"
                + "<rect id=\"chart-progress-rec-b\" stroke=\"url(#chart-progress-fill)\" sketch:type=\"MSShapeGroup\" x=\"0\" y=\"0\" width=\"104\" height=\"20\" rx=\"4\" ry=\"4\"></rect>";
            var blockWidth = 100 / blockCount;
            var showCount = parseInt((value / blockWidth).toFixed())
            for (var step = 0; step < showCount; step++) {
                str += "<rect id=\"chart-progress-rec-f" + step.toString() + "\" fill=\"url(#chart-progress-fill)\" sketch:type=\"MSShapeGroup\" x=\"" + (step * blockWidth + 3).toString() + "\" y=\"2\" width=\"" + (blockWidth - 2).toString() + "\" height=\"16\" rx=\"2\" ry=\"2\"></rect>";
            }

            str += "</g></g></svg>";
            return str;
        }

        public static genIsoscelesRightTriangle(rotation: number): string {
            var x = (45 + rotation) * Math.PI / 180;
            var delta = Math.sin(Math.PI / 4);
            var sin = Math.sin(x);
            var cos = Math.cos(x);
            var ax = 100 * sin;
            var ay = 100 * (delta - cos);
            var degrees = rotation + 45;
            var str = "<svg version=\"1.1\" id=\"graph-polygon-tri-ir\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"100px\" height=\"100px\" viewBox=\"0 0 100 100\" xml:space=\"preserve\"><polygon points=\"15,15 15,85 85,15\" fill=\"#CCC\" stroke=\"#CCC\" stroke-width=\"1\" transform=\"rotate("
                + degrees.toString()
                + " 50, 50)\"/></svg>";
            return str;
        }
    }
    
    /**
      * Image container.
      */
    export class ImageContainer {

        /**
          * Generates an element for image.
          * image  the image contract.
          */
        public static generateImage(value: ImageContract | Common.BindingObjectContract<ImageContract>): HTMLElement {
            if (!value) return null;
            var image = <ImageContract>value;
            if (!(<any>value).type && !!(<any>value).subscribe) image = (<Common.BindingObjectContract<ImageContract>>value)();
            if (!image.type) return null;
            switch (image.type.toString().toLowerCase()) {
                case "url": {
                    var urlImg = <UrlImageContract>image;
                    var imgEle = document.createElement("img");
                    if (!!urlImg.url) imgEle.src = urlImg.url;
                    if (!!urlImg.name) imgEle.alt = urlImg.name;
                    imgEle.className = "ali-image-icon";
                    if (!!image.styleRef) imgEle.className += " " + image.styleRef;
                    return imgEle;
                }
                case "string": {
                    var strImg = <StringImageContract>image;
                    var spanEle = document.createElement("span");
                    spanEle.innerHTML = strImg.value;
                    spanEle.style.color = strImg.color;
                    spanEle.style.backgroundColor = strImg.bgColor;
                    spanEle.className = "ali-image-icon";
                    if (!!image.styleRef) spanEle.className += " " + image.styleRef;
                    return spanEle;
                }
                case "svg":
                    var svgImg = <SvgImageContract>image;
                    if (!svgImg.source) return null;
                    try {
                        var svgEle = document.createElement("span");
                        var svgSource = svgImg.source.toString();
                        var sourceStart = svgSource.indexOf("<svg ");
                        if (svgSource === "" || sourceStart < 0) return null;
                        svgSource = svgSource.substring(sourceStart);
                        svgEle.innerHTML = svgSource;
                        return <HTMLElement>svgEle.children[0];
                    } catch (ex) {
                        return null;
                    }
                default:
                    return null;
            }
        }

    }

    /**
      * External extensions for graph.
      */
    export class Extensions {

        /**
          * External extensions for graph.
          */
        public static radarGenerator(element: HTMLDivElement, data: Collection.KeyValuePairContract<string, number>[]): void {
        }

        public static lineGenerator(element: HTMLDivElement, data: Collection.KeyValuePairContract<string, number>[], highlightPosition?: number, scope?: Collection.IntervalContract<number>): void {
        }

    }

}

module AliHub.Panels {

    /**
      * Simple flow panel.
      */
    export class SingleFlowPanel<T> extends Common.VisualControl {

        private _containerEle: HTMLDivElement;

        private _content: T;

        private _contentId: string;

        private _sideBarId: string;

        private _sidebar: Common.VisualControl[] = [];

        private _counter = 0;

        /**
          * Initializes a new instance of the SingleFlowPanel class.
          * @param id  Element ID. The content will be filled into this element to replace original ones. 
          */
        constructor(id: string) {
            super(id);
            this._containerEle = Elements.getById<HTMLDivElement>(id);
            this._containerEle.innerHTML = "";
            this._containerEle.className = Collection.ListHelper.addItem(this._containerEle.className, " ", ["ali-content-dashboard", "ali-container-main"]);
            this._renderLayoutTable(this._containerEle);
        }

        /**
          * Gets panel content.
          */
        public getContent(): T {
            return this._content;
        }

        /**
          * Sets panel content.
          */
        public setContent(value: (id: string) => T): void {
            if (!value) return;
            this._content = value(this._contentId);
        }

        public addSidePanel<TControl extends Common.VisualControl>(generator: (id: string) => TControl): TControl {
            if (!generator || !this._sideBarId) return null;
            var sideBarEle = Elements.getById<HTMLDivElement>(this._sideBarId);
            if (!sideBarEle) return null;
            var container = document.createElement("div");
            var now = new Date();
            this._counter++;
            container.id = sideBarEle.id + "_i" + this._counter.toString() + "t" + now.getSeconds().toString() + "0" + now.getMilliseconds();
            container.className = "ali-container-main";
            sideBarEle.appendChild(container);
            var control = generator(container.id);
            if (!control) {
                container.outerHTML = "";
                return null;
            }

            this._sidebar.push(control);
            return control;
        }

        public getSidePanel<TControl extends Common.VisualControl>(index: number): TControl {
            if (index < 0 || index > this._sidebar.length) return null;
            return <TControl>this._sidebar[index];
        }

        private _renderLayoutTable(container: HTMLDivElement): void {
            Diagnostics.Tracker.info("CoreLibrary", "[0x02210101] Render single flow panel.");
            var row = document.createElement("tr");
            row.id = this._containerEle.id + "_table_b_r0";
            var tBody = document.createElement("tbody");
            tBody.appendChild(row);
            var table = document.createElement("table");
            table.id = this._containerEle.id + "_table";
            table.className = "ali-layout-t-grid ali-layout-s-tile";
            table.cellPadding = "0";
            table.cellSpacing = "0";
            table.appendChild(tBody);
            container.appendChild(table);

            var mainCol = document.createElement("td");
            mainCol.id = row.id + "_c0";
            mainCol.className = "ali-container-main";
            var mainColContent = document.createElement("div");
            mainColContent.id = mainCol.id + "_cnt";
            mainColContent.className = "ali-container-main";
            row.appendChild(mainCol);
            mainCol.appendChild(mainColContent);
            this._contentId = mainColContent.id;

            var sideCol = document.createElement("td");
            sideCol.id = row.id + "_c1";
            sideCol.className = "ali-container-side";
            row.appendChild(sideCol);
            this._sideBarId = sideCol.id;
        }

    }

    /**
      * Mini agenda.
      */
    export class MiniAgenda extends Common.VisualControl {

        /**
          * Initializes a new instance of the MiniAgenda class.
          * @param id  Element ID. The content will be filled into this element to replace original ones. 
          */
        constructor(id: string) {
            super(id);
            this._renderLayout();
        }

        private _renderLayout() {
            var now = new Date();
            var header = document.createElement("h4");
            this.get_element().appendChild(header);
            var container = document.createElement("div");
            container.className = "ali-container-main";
            this.get_element().appendChild(container);
            header.innerHTML = now.toLocaleDateString();
            container.innerHTML = "<div class=\"ali-container-main\"><span>" + AliHub.Res.hubTemplate().localString("empty") + "</span></div>";
        }

    }

}

module AliHub.Web {

    /**
      * Response task with result.
      */
    export interface ResponseTask<T> extends Common.TaskContract<Web.ResponseContract<T>> {
    }

    /**
      * Response task without result.
      */
    export interface EmptyResponseTask extends Common.TaskContract<Web.EmptyResponseContract> {
    }

    /**
      * Package contract with entry or raw data.
      */
    export interface PackageContract<T> {
        success: boolean;
        message: string;
        timestamp: Date;
        data: T;
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
    }

    /**
      * Web response information.
      */
    export interface ResponseContract<T> extends EmptyResponseContract {
        /**
          * Result.
          */
        result: T;
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
     * REST job contract.
     */
    export interface RestJobContract {

        /**
          * Sends by POST.
          */
        postInfo<T>(template: string, parameters: any, data: any, canBeEmpty: boolean, validation: (value: T) => boolean): Common.TaskContract<T>;

        /**
          * Sends by POST.
          */
        postEmpty(template: string, parameters: any, data: any): Common.TaskContract<boolean>;

        /**
          * Sends by GET.
          */
        getInfo<T>(template: string, parameters: any, canBeEmpty: boolean, validation: (value: T) => boolean): Common.TaskContract<T>;

        /**
          * Sends by GET.
          */
        getEmpty(template: string, parameters: any): Common.TaskContract<boolean>;

    }

    /**
      * Data package accessing job contract.
      */
    export interface DataPackageJobContract {

        /**
          * Sends by POST.
          */
        postInfo<T>(template: string, parameters: any, data: any, canBeEmpty: boolean): Web.ResponseTask<T>;

        /**
          * Sends by POST.
          */
        postEmpty<T>(template: string, parameters: any, data: any): Web.EmptyResponseTask;

        /**
          * Sends by GET.
          */
        getInfo<T>(template: string, parameters: any, canBeEmpty: boolean): Web.ResponseTask<T>;

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
    export class RestJob {

        private static _instance: RestJobContract;

        /**
          * Sets default instance.
          */
        public static set_instance(value: RestJobContract) {
            RestJob._instance = value;
        }

        /**
          * Sends by POST.
          */
        public static postInfo<T>(template: string, parameters: any, data: any, canBeEmpty: boolean = true, validation: (value: T) => boolean = null): Common.TaskContract<T> {
            return !!RestJob._instance ? RestJob._instance.postInfo(template, parameters, data, canBeEmpty, validation) : null;
        }

        /**
          * Sends by POST.
          */
        public static postEmpty(template: string, parameters: any, data: any): Common.TaskContract<boolean> {
            return !!RestJob._instance ? RestJob._instance.postEmpty(template, parameters, data) : null;
        }

        /**
          * Sends by GET.
          */
        public static getInfo<T>(template: string, parameters: any, canBeEmpty: boolean = true, validation: (value: T) => boolean = null): Common.TaskContract<T> {
            return !!RestJob._instance ? RestJob._instance.getInfo(template, parameters, canBeEmpty, validation) : null;
        }

        /**
          * Sends by GET.
          */
        public static getEmpty(template: string, parameters: any): Common.TaskContract<boolean> {
            return !!RestJob._instance ? RestJob._instance.getEmpty(template, parameters) : null;
        }

    }

    /**
      * Data package accessing job.
      */
    export class DataPackageJob {
        
        private static _instance: DataPackageJobContract;

        /**
          * Sets default instance.
          */
        public static set_instance(value: DataPackageJobContract) {
            DataPackageJob._instance = value;
        }

        /**
          * Sends by POST.
          */
        public static postInfo<T>(template: string, parameters: any, data: any, canBeEmpty: boolean = true): Web.ResponseTask<T> {
            return !!DataPackageJob._instance ? DataPackageJob._instance.postInfo(template, parameters, data, canBeEmpty) : null;
        }

        /**
          * Sends by POST.
          */
        public static postEmpty<T>(template: string, parameters: any, data: any): Web.EmptyResponseTask {
            return !!DataPackageJob._instance ? DataPackageJob._instance.postEmpty(template, parameters, data) : null;
        }

        /**
          * Sends by GET.
          */
        public static getInfo<T>(template: string, parameters: any, canBeEmpty: boolean = true): Web.ResponseTask<T> {
            return !!DataPackageJob._instance ? DataPackageJob._instance.getInfo(template, parameters, canBeEmpty) : null;
        }

        /**
          * Sends by GET.
          */
        public static getEmpty(template: string, parameters: any): Web.EmptyResponseTask {
            return !!DataPackageJob._instance ? DataPackageJob._instance.getEmpty(template, parameters) : null;
        }

        /**
          * Sets static data.
          */
        public static staticInfo<T>(data: T): Web.ResponseTask<T> {
            return !!DataPackageJob._instance ? DataPackageJob._instance.staticInfo(data) : null;
        }

        /**
          * Sets empty data.
          */
        public static staticEmpty(): Web.EmptyResponseTask {
            return !!DataPackageJob._instance ? DataPackageJob._instance.staticEmpty() : null;
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
            Heartbeat.instance.ping(p)
                .done((actionData) => {
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
            })
                .always(() => {
                var interval = Heartbeat.interval;
                if (interval == null || typeof interval !== "number") return;
                setTimeout(() => {
                    Heartbeat._check();
                }, interval);
            });
        }

    }

    export class NotificationCache {

        private _h: Collection.Dictionary<Common.Action2<NotificationItemContract, NotificationItemContract>> = {};

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
        public pushRange(col: NotificationItemContract[]): NotificationItemContract[]{
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

    /**
      * Web utilities.
      */
    export class Utils {

        /**
          * Builds a parameter string.
          */
        public static buildParaString(parameters: any): string {
            if (!parameters) return "";
            var str = "";
            var step = 0;
            for (var ele in parameters) {
                if (!ele || (typeof ele !== "string" && typeof ele !== "number")) continue;
                ele = ele.toString()
                var prop = parameters[ele];
                if (prop == null) prop = "";
                if (typeof prop !== "string" && typeof prop !== "number") continue;
                prop = prop.toString();
                if (step > 0) str += "&";
                str += encodeURIComponent(ele) + "=" + encodeURIComponent(prop);
                step++;
            }

            return str;
        }

    }
}

module AliHub.Diagnostics {

    export interface TrackerContract {

        /**
          * Logs something.
          */
        log(type: LogTypes, category: string, message: string);

    }

    export interface PageAnalyticsClientContract {

        /**
          * Records a stamp.
          */
        record(id: string);

    }

    export enum LogTypes {
        info = 0,
        debug = 1,
        warn = 2,
        error = 3,
    }

    export class Tracker implements TrackerContract, PageAnalyticsClientContract {

        private static _default = new Tracker();

        public static instance: TrackerContract = Tracker._default;

        public static pageAnalyticsClient: PageAnalyticsClientContract = Tracker._default;

        public record(id: string) {
        }

        public log(type: LogTypes, category: string, message: string) {
            switch (type) {
                case LogTypes.info:
                    this.info(category, message);
                    break;
                case LogTypes.debug:
                    this.debug(category, message);
                    break;
                case LogTypes.warn:
                    this.warn(category, message);
                    break;
                case LogTypes.error:
                    this.error(category, message);
                    break;
                default:
                    break;
            }
        }

        public info(category: string, message: string) {
            console.info("[" + category + "] " + message);
        }

        public debug(category: string, message: string) {
            console.debug("[" + category + "] " + message);
        }

        public warn(category: string, message: string) {
            console.warn("[" + category + "] " + message);
        }

        public error(category: string, message: string) {
            console.error("[" + category + "] " + message);
        }

        public static info(category: string, message: string) {
            try {
                Tracker.instance.log(LogTypes.info, category, message);
            } catch (ex) { }
        }

        public static debug(category: string, message: string) {
            try {
                Tracker.instance.log(LogTypes.debug, category, message);
            } catch (ex) { }
        }

        public static warn(category: string, message: string) {
            try {
                Tracker.instance.log(LogTypes.warn, category, message);
            } catch (ex) { }
        }

        public static error(category: string, message: string) {
            try {
                Tracker.instance.log(LogTypes.error, category, message);
            } catch (ex) { }
        }

        public static log(type: LogTypes, category: string, message: string) {
            try {
                Tracker.instance.log(type, category, message);
            } catch (ex) { }
        }

    }

}

module AliHub.Users {

    /**
      * Member profile contract.
      */
    export interface ProfileContract {

        /**
          * Member identifier.
          */
        id: number;

        /**
          * Birthday.
          */
        birthday?: Date;

        /**
          * Gender.
          */
        gender?: string;

        /**
          * Full name of the member.
          */
        name: string;

        /**
          * Nickname.
          */
        nickname?: string;

        /**
          * City name.
          */
        city?: string;

        /**
          * Tags of the member.
          */
        tags?: string[];

        /**
          * Mobile phone number.
          * ToDo: This will be removed soon.
          */
        mobile?: string;

        /**
          * The avatar of the member.
          */
        avatar?: string;

        /**
          * Phone numbers.
          */
        phone?: Collection.KeyValuePairContract<string, string>[];
    }

    export interface PrincipleContract {
        profile: ProfileContract;
        permission: Collection.Dictionary<string>;
        contact: Collection.Dictionary<string>;
    }

    /**
      * On call notification.
      * Property "type" is "oncall".
      */
    export interface OncallNotificationItemContract extends Web.NotificationItemContract {

        /**
          * Member information.
          */
        memberInfo?: ProfileContract;

        /**
          * On call time.
          */
        oncallTime: Date;

        /**
          * Expires in seconds.
          */
        expiration: number;

        /**
          * Status - active, inactive.
          */
        status: string;

    }

    export class ProfileCard extends Common.VisualControl {

        constructor(id: string) {
            super(id);
            this.add_styleRef(["ali-part-user-profile-card"]);
            this._renderLayout();
        }

        private _renderLayout() {
            var me = Users.Manager.get_principle();
            if (!me || !me.profile) {
                return;
            }

            var profile = me.profile;
            var infoEle = document.createElement("div");
            infoEle.className = "ali-container-main";
            this.get_element().appendChild(infoEle);
            var linkEle = document.createElement("div");
            this.get_element().appendChild(linkEle);

            var avatarEle = document.createElement("img");
            avatarEle.className = "ali-part-user-card-avatar";
            avatarEle.src = profile.avatar;
            avatarEle.alt = profile.nickname;
            infoEle.appendChild(avatarEle);
            var nameEle = document.createElement("span");
            nameEle.title = profile.nickname;
            nameEle.innerHTML = profile.nickname;
            infoEle.appendChild(nameEle);

            linkEle.innerHTML = "Preview Version | Building...";  // ToDo: Implement it.
        }

    }

    export class Manager {

        private static _me: PrincipleContract;

        public static get_principle(): PrincipleContract {
            return Manager._me;
        }

        public static set_principle(value: PrincipleContract): boolean {
            if (!value) {
                Manager._me = null;
                return true;
            }

            if (!value.profile) return false;
            if (!value.permission) value.permission = {};
            if (!value.contact) value.contact = {};
            Manager._me = value;
            return true;
        }

    }

}

module AliHub.Res {

    var _set = {
        templ: {},
        icons: {},
        locals: {},
        mkt: null
    }

    export var tempIconfont = {
        time: "&#xe604;",
        calendar: "&#xe605;",
        csp: "&#xe60b;",
        close: "&#xe61e;",
        topLeftCorner: "&#xe601;",
        bottomRightCorner: "&#xe602;",
        upArrow: "&#xe638;",
        downArrow: "&#xe630;",
        rightRoundArrow: "&#xe607;",
        dropdown: "&#xe600;",
        newspark: "&#xe635;",
        pending: "&#xe633;",
        processing: "&#xe62a;",
        completed: "&#xe636;",
        message: "&#xe623;",
        member: "&#xe62f;",
        search: "&#xe631;",
        feedback: "&#xe62c;",
        tags: "&#xe619;",
        alarm: "&#xe632;",
        enter: "&#xe62e;",
        more: "&#xe62d;",
        create: "&#xe62b;",
        note: "&#xe629;",
        forward: "&#xe622;",
        phone: "&#xe621;",
        male: "&#xe61f;",
        female: "&#xe620;",
        location: "&#xe61b;",
        manager: "&#xe61d;",
        file: "&#xe609;",
        todo: "&#xe60a;",
        listDot: "&#xe60c;",
        checkBox: "&#xe626;",
        daily: "&#xe61c;",
        night: "&#xe639;",
        rightSign: "&#xe608;"
    };

    /**
      * Strings resources.
      */
    export var strings = {
        appCenter: "App center",
        page: "Page",
        bindingError: "Cannot apply bindings",
        refresh: "refresh",
        reload: "reload",
        member: "Member",
        myMembers: "My members",
        recentDays: "Latest {0} days",
        planned: "Pending",
        processing: "Processing",
        completed: "Done",
        ladyName: "Ms. {0}",
        gentlemanName: "Mr. {0}",
        reminder: "Reminder",
        note: "Note",
        totalScore: "Total Score",
        cents: "{0} points",
        level: "Level",
        collapse: "Collapse",
        expand: "Expand",
        showAll: "Show all",
        followUp: "Follow up",
        noFollowUp: "None",
        memberTags: "Member tags",
        types: "Types",
        history: "History",
        trend: "Trend",
        distribution: "Distribution",
        newTasks: "{0} new tasks coming",
        bizTasks: "Tasks",
        summaryReports: "Reports",
        jobMgm: "Jobs Management",
        createTask: "Create task",
        seeMore: "See more",
        exit: "Exit",
        register: "Sign up",
        login: "Sign in",
        logout: "Sign out",
        typeKeywords: "Type keywords to search",
        requestHelp: "{0} is asking for help",
        cannotFind: "The {0} could not be found",
        newItem: "New",
        createItem: "Create",
        addItem: "Add",
        getItem: "Get",
        setItem: "Set",
        modifyItem: "Modify",
        updateItem: "Update",
        replaceItem: "Replace",
        overrideItem: "Override",
        fillItem: "Fill",
        removeItem: "Remove",
        deleteItem: "Delete",
        clearItem: "Clear",
        cleanUp: "Clean up",
        save: "Save",
        cancel: "Cancel",
        rollback: "Rollback",
        undo: "Undo",
        redo: "Redo",
        cut: "Cut",
        copy: "Copy",
        copySomething: "Copy {0}",
        paste: "Paste",
        clipboard: "Clip board",
        navigateTo: "Navigate to",
        settings: "Settings",
        options: "Options",
        profile: "Profile",
        draft: "Draft",
        open: "Open",
        close: "Close",
        turnOn: "Turn on",
        turnOff: "Turn off",
        update: "Update",
        upload: "Upload",
        download: "Download",
        assign: "Assign",
        reassign: "Reassign",
        flag: "Flag",
        send: "Send",
        reply: "Reply",
        replyAll: "Reply all",
        forward: "Forward",
        cc: "Cc",
        bcc: "Bcc",
        phoneCall: "Call",
        contact: "Contact",
        contactMember: "Contact member",
        attach: "Attach",
        attachment: "Attachment",
        expired: "Expired",
        message: "Message",
        notification: "Notification",
        feedback: "Feedback",
        help: "Help",
        support: "Support",
        window: "Window",
        aries: "Aries",
        taurus: "Taurus",
        gemini: "Gemini",
        cancer: "Cancer",
        leo: "Leo",
        virgo: "Virgo",
        libra: "Libra",
        scorpio: "Scorpio",
        sagittarius: "Sagittarius",
        capricorn: "Capricorn",
        aquarius: "Aquarius",
        pisces: "Pisces",
        ophiuchus: "Ophiuchus",
        horoscope: "Horoscope",
        astrology: "Astrology",
        loading: "Loading",
        failToLoadData: "Failed to load data",
        surname: "Surname",
        givenname: "Given Name",
        nickname: "nickname",
        city: "City",
        street: "Street",
        country: "Country",
        birthday: "Birthday",
        age: "Age",
        gender: "gender",
        male: "Male",
        female: "Female",
        other: "Other",
        fromSource: "From",
        toTarget: "To",
        today: "Today",
        secondsAgo: "Seconds ago",
        minuteAgo: "A min ago",
        minutesTwoAgo: "Two min ago",
        minutesAgo: "{0} min ago",
        hourAgo: "An hour ago",
        hoursAgo: "{0} h ago",
        hoursTwoAgo: "Two hours ago",
        yesterdayTime: "{0} yesterday",
        yesterday: "Yesterday",
        daysTwoAgo: "Two days ago",
        daysAgo: "{0} days ago",
        lastWeekDay: "Last {0}",
        lastWeek: "Last week",
        future: "Future",
        date: "Date",
        day: "Day",
        week: "Week",
        weekday: "Weekday",
        weekend: "Weekend",
        week0c: "S",
        week1c: "M",
        week2c: "T",
        week3c: "W",
        week4c: "T",
        week5c: "F",
        week6c: "S",
        week0s: "Sun",
        week1s: "Mon",
        week2s: "Tue",
        week3s: "Wed",
        week4s: "Thu",
        week5s: "Fri",
        week6s: "Sat",
        week0f: "Sunday",
        week1f: "Monday",
        week2f: "Tueday",
        week3f: "Wednesday",
        week4f: "Thursday",
        week5f: "Friday",
        week6f: "Saturday",
        week0t: "Sun {0}",
        week1t: "Mon {0}",
        week2t: "Tue {0}",
        week3t: "Wed {0}",
        week4t: "Thu {0}",
        week5t: "Fri {0}",
        week6t: "Sat {0}",
        month: "Month",
        month0s: "Jan",
        month1s: "Feb",
        month2s: "Mar",
        month3s: "Apr",
        month4s: "May",
        month5s: "Jun",
        month6s: "Jul",
        month7s: "Aug",
        month8s: "Sep",
        month9s: "Oct",
        monthAs: "Nov",
        monthBs: "Dec",
        month0f: "January",
        month1f: "February",
        month2f: "March",
        month3f: "April",
        month4f: "May",
        month5f: "June",
        month6f: "July",
        month7f: "August",
        month8f: "September",
        month9f: "October",
        monthAf: "November",
        monthBf: "December",
        year: "Year",
        empty: "Empty",
        commaSymbol: ", ",
        colonSymbol: ": ",
        ellipsisSymbol: "...",
        semicolonSymbol: "; ",
        enumCommaSymbol: ", ",
        periodSymbol: ". "
    };

    export function regLang(template: AliHub.Res.Templates) {
        if (!template) return null;
        template.strings.reg("ww", strings);
        template.strings.reg("en", strings);
        return template;
    }

    export interface IconFontContract {

        line: string;

        block: string;

    }

    export class IconFontCollection {

        private _icon: any = {};

        public iconfont(key: string, value?: IconFontContract): IconFontContract {
            if (!key || key.toString() == "") return null;
            key = key.toString();
            if (arguments.length > 1) this._icon[key] = value;
            return this._icon[key];
        }

        public lineIconfont(key: string, defaultValue: string = null): string {
            if (!key || key.toString() == "") return null;
            key = key.toString();
            var icon = this.iconfont(key);
            return !!icon && !!icon.line ? icon.line : defaultValue;
        }

        public blockIconfont(key: string, defaultValue: string = null): string {
            if (!key || key.toString() == "") return null;
            key = key.toString();
            var icon = this.iconfont(key);
            return !!icon && !!icon.block ? icon.block : defaultValue;
        }
    }

    export class Templates {

        private _html: any = {};

        private _svg: any = {};

        public strings = new Strings();

        public html(key: string, value?: string): string {
            if (!key || key.toString() == "") return null;
            key = key.toString();
            if (arguments.length > 1) this._html[key] = value;
            return this._html[key];
        }

        public svg(key: string, value?: string): string {
            if (!key || key.toString() == "") return null;
            key = key.toString();
            if (arguments.length > 1) this._svg[key] = value;
            return this._svg[key];
        }

        public localString(key: string, lang?: string): string {
            return arguments.length > 1 ? this.strings.field(key, lang) : this.strings.field(key);
        }

    }

    export class Strings {

        private _strings = { ww: {} };

        public defaultLang: string = null;

        public reg(lang: string, value: Collection.Dictionary<string> | {}) {
            this._strings[lang] = value;
        }

        public specialField(lang: string, key: string, value?: string): string {
            if (arguments.length > 2) {
                var strings = this._lang(lang, true);
                strings[key] = value;
            }

            return this._lang(lang)[key];
        }

        public localField(key: string, value?: string): string {
            return arguments.length > 1 ? this.specialField(market(), key, value) : this.specialField(market(), key);
        }

        public globalField(key: string, value?: string): string {
            return arguments.length > 1 ? this.specialField("ww", key, value) : this.specialField("ww", key);
        }

        public field(key: string, lang?: string) {
            var langCode = !lang || lang == "" ? market() : lang;
            var field = this.specialField(langCode, key);
            if (!!field || typeof field !== "undefined") return field;
            while (langCode.lastIndexOf("-") > 1) {
                langCode = langCode.substring(0, langCode.lastIndexOf("-"));
                field = this.specialField(langCode, key);
                if (!!field || typeof field !== "undefined") return field;
            }

            field = this.globalField(key);
            if (!!field || typeof field !== "undefined" || !this.defaultLang) return field;
            return this.specialField(this.defaultLang, key);
        }

        private _lang(lang: string, init?: boolean): Collection.Dictionary<string> {
            if (!lang || lang == "") {
                return {};
            }

            if (!this._strings[lang]) {
                if (init == true) {
                    this._strings[lang] = {};
                    return this._strings[lang];
                }

                return {};
            }

            return this._strings[lang];
        }

    }

    export function hubTemplate(): Templates {
        return templates("AliHub", true);
    }

    export function hubIconfont(): IconFontCollection {
        return iconfonts("AliHub", true);
    }

    export function factory(extender?: Common.Action1<Object>) {
        return () => {
            var res = {
                templates: (subject: string, createIfExist: boolean = false): Templates => {
                    return templates.apply(null, arguments);
                },
                iconfonts: (subject: string, value?: IconFontCollection | boolean): IconFontCollection => {
                    return iconfonts.apply(null, arguments);
                },
                market: (lang?: string | boolean): string => {
                    return market.apply(null, arguments);
                },

                // ToDo: Need remove.
                strings: strings,
                iconfont: tempIconfont
            };
            if (!!extender) extender(res);
            return res;
        }
    }

    export function templates(subject: string, createIfExist: boolean = false): Templates {
        if (!subject) return null;
        subject = subject.toString();
        if (subject === "") return null;
        var templ: Templates = _set.templ[subject];
        if (!templ && createIfExist) _set.templ[subject] = new Templates();
        return _set.templ[subject];
    }

    export function html(subject: string, key: string, value?: string): string {
        var templ: Templates = templates(subject, true);
        if (arguments.length > 2) {
            templ.html(key, value);
        }

        return templ.html(key);
    }

    export function svg(subject: string, key: string, value?: string): string {
        var templ: Templates = templates(subject, true);
        if (arguments.length > 2) {
            templ.svg(key, value);
        }

        return templ.svg(key);
    }

    export function iconfonts(subject: string, value?: IconFontCollection | boolean): IconFontCollection {
        if (arguments.length > 1 && typeof value !== "boolean") {
            _set.icons[subject] = value;
        }

        var col = _set.icons[subject];
        if (!col) {
            col = new IconFontCollection();
            if (value != null && value === true) _set.icons[subject] = col;
        }

        return col;
    }

    export function market(lang?: string | boolean): string {
        if (arguments.length > 0 && !!lang) {
            if (typeof lang === "string") {
                _set.mkt = lang;
            } else if (typeof lang === "boolean") {
                if (lang == true) {
                    if (!!document.documentElement.lang) {
                        _set.mkt = document.documentElement.lang;
                    } else if (!!navigator.userLanguage) {
                        _set.mkt = navigator.userLanguage;
                    } else if (!!navigator.browserLanguage) {
                        _set.mkt = navigator.browserLanguage;
                    }
                } else {
                    _set.mkt = "ww";
                }
            }
        } else {
            if (_set.mkt == null) market(true);
        }

        return _set.mkt;
    }

}

module AliHub.SocialNetwork {

    export interface PhoneNumberContract {
        region: number;
        city?: string;
        no: string;
        ext?: string;
    }

}

module AliHub.Media {

    export interface SoundPlayerClientContract {

        /**
          * Gets the earliest possible position, in seconds, that the playback can begin.
          */
        initialTime(): number;

        /**
          * Gets ready state.
          */
        readyState(): any;

        /**
          * Gets a flag of auto buffer enabled.
          */
        autobuffer(): boolean;

        /**
          * Gets or sets a flag to specify whether playback should restart after it completes.
          */
        loop(value?: boolean): boolean;

        /**
          * Gets information about whether the playback has ended or not.
          */
        ended(): boolean;

        /**
          * Gets a collection of buffered time ranges.
          */
        buffered(): TimeRanges;

        /**
          * Pauses the current playback and sets paused to TRUE. This can be used to test whether the media is playing or paused. You can also use the pause or play events to tell whether the media is playing or not.
          */
        pause(): void;

        /**
          * Gets a flag that specifies whether playback is paused.
          */
        paused(): boolean;

        /**
          * Loads and starts playback of a media resource.
          */
        play(): void;

        played: Collection.EventHandlers<boolean>;

        /**
          * Returns an object representing the current error state of the audio or video element.
          */
        error(): MediaError;

        /**
          * Returns a TimeRanges object that represents the ranges of the current media resource that can be seeked.
          */
        seekable(): TimeRanges;

        /**
          * Gets or sets a value that indicates whether to start playing the media automatically.
          */
        autoplay(value?: boolean): boolean;

        /**
          * Gets or sets the volume level for audio portions of the media element.
          */
        volume(value?: number): number;

        /**
          * Gets or sets the current rate of speed for the media resource to play. This speed is expressed as a multiple of the normal speed of the media resource.
          */
        playbackRate(value?: number): number;

        /**
          * Returns the duration in seconds of the current media resource. A NaN value is returned if duration is not available, or Infinity if the media resource is streaming.
          */
        duration(): number;

        /**
          * Gets or sets a flag that indicates whether the audio (either audio or the audio track on video media) is muted.
          */
        muted(value?: boolean): boolean;

        /**
          * Gets or sets the default playback rate when the user is not using fast forward or reverse for a video or audio resource.
          */
        defaultPlaybackRate(value?: number): number;

        /**
          * Returns a string that specifies whether the client can play a given media resource type.
          */
        canPlayType(type: string): string;

        /**
          * Gets a flag that indicates whether the the client is currently moving to a new playback position in the media resource.
          */
        seeking(): boolean;

        /**
          * Gets or sets the current playback position, in seconds.
          */
        currentTime(value?: number): number;

        /**
          * Gets or sets the name of the sound.
          */
        name: Common.BindingObjectContract<string>;

        /**
          * Gets or sets the album name of the sound.
          */
        album: Common.BindingObjectContract<string>;

        /**
          * Gets or sets the artist name of the sound.
          */
        artist: Common.BindingObjectContract<string>;

        add(path: string, mime: string): void;

        contain(path: string): boolean;

        clear(): void;

        changed: Collection.EventHandlers<string[]>;

        /**
          * Gets or sets the additional information of the sound.
          */
        info(value?: any): any;

    }

    export class SoundPlayerControl extends Common.VisualControl {

        private _paths: Collection.KeyValuePairContract<string, string>[] = [];

        private _audio: HTMLAudioElement;

        private _text: string;

        private _client: SoundPlayerClientContract;

        private _bindings: Common.BindingControl<SoundPlayerClientContract>;

        /**
          * Initializes a new instance of the BindingControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones. 
          */
        constructor(id: string) {
            super(id);
            this._render();
        }

        /**
          * Gets or sets the name of the sound.
          */
        public name = Common.BindingFactory.create<string>();

        /**
          * Gets or sets the album name of the sound.
          */
        public album = Common.BindingFactory.create<string>();

        /**
          * Gets or sets the artist name of the sound.
          */
        public artist = Common.BindingFactory.create<string>();

        /**
          * Gets or sets the additional information of the sound.
          */
        public info = Common.BindingFactory.create<any>();

        public contain(path: string): boolean {
            return this._paths.some((ele, i, arr) => {
                return path === ele.key;
            });
        }

        public client(): SoundPlayerClientContract {
            this._initClient();
            return this._client;
        }

        public add(path: string, mime: string) {
            if (!path || path.toString() == "") return;
            var changed = true;
            if (this._paths.some((ele, i, arr) => {
                if (path !== ele.key) return false;
                if (ele.value === mime) changed = false;
                ele.value = mime;
                return true;
            })) {
                if (!changed) this._setPath();
                return;
            }

            this._paths.push({ key: path, value: mime });
            this._setPath();
        }

        public clear() {
            this._paths = [];
            this._setPath();
        }

        public sounds(): string[]{
            var col = [];
            this._paths.forEach((ele, i, arr) => {
                col.push(ele.key);
            });
            return col;
        }

        public unsupportedText(str?: string): string {
            if (arguments.length > 0) this._text = str;
            return this._text;
        }

        /**
          * Sets the template. 
          * @param valueType  The data source type for the value.
          * @param value  The data source value.
          */
        public set_template(valueType: string, value: string) {
            if (!valueType || !value || !Elements.getById(this.get_id(), "v")) return;
            var vEle = this.getChildElement(true, "v");
            this._bindingControl();
            this._bindings.viewModel(this.client());
            this._bindings.set_template(valueType, value);
            vEle.style.display = "";
            this._audio.style.display = "none";
        }

        /**
          * Adds an extender.
          * @param value  The extender instance. 
          */
        public addExtender(value: Common.BindingControlExtender<SoundPlayerClientContract>): void {
            this._bindingControl().addExtender(value);
        }

        /**
          * Removes a specific extender.
          * @param name  The extender name. 
          */
        public removeExtender(name: string): void {
            this._bindingControl().removeExtender(name);
        }

        /**
          * Clears all extenders registered. 
          */
        public clearExtenders(): void {
            this._bindingControl().clearExtenders();
        }

        public play() {
            if (!this._paths || !this._audio) return;
            this._audio.play();
        }

        public pause() {
            if (!this._paths || !this._audio) return;
            this._audio.pause();
        }

        public paused = (): boolean => {
            return this._audio.paused;
        }

        public autoplay = (value?: boolean): boolean => {
            if (arguments.length > 0) this._audio.autoplay = value;
            return this._audio.autoplay;
        }

        public volume = (value?: number): number => {
            if (arguments.length > 0) this._audio.volume = value;
            return this._audio.volume;
        }

        public playbackRate = (value?: number): number => {
            if (arguments.length > 0) this._audio.playbackRate = value;
            return this._audio.playbackRate;
        }

        public muted = (value?: boolean): boolean => {
            if (arguments.length > 0) this._audio.muted = value;
            return this._audio.muted;
        }

        public defaultPlaybackRate = (value?: number): number => {
            if (arguments.length > 0) this._audio.defaultPlaybackRate = value;
            return this._audio.defaultPlaybackRate;
        }

        public canPlayType = (mime?: string): string => {
            return this._audio.canPlayType(mime);
        }

        public currentTime = (value?: number): number => {
            if (arguments.length > 0) this._audio.currentTime = value;
            return this._audio.currentTime
        }

        private _initClient() {
            if (!!this._client) return;
            var client: SoundPlayerClientContract = {
                initialTime: (): number => {
                    return this._audio.initialTime;
                },
                readyState: (): any => {
                    return this._audio.readyState;
                },
                autobuffer: (): boolean => {
                    return this._audio.autobuffer;
                },
                loop: (value?: boolean): boolean => {
                    if (arguments.length > 0) this._audio.loop = value;
                    return this._audio.loop;
                },
                ended: (): boolean => {
                    return this._audio.ended;
                },
                buffered: (): TimeRanges => {
                    return this._audio.buffered;
                },
                pause: (): void => {
                    if (this.paused()) return;
                    this.pause();
                    client.played.raise(false);
                },
                paused: (): boolean => {
                    return this.paused();
                },
                play: (): void => {
                    if (!this.paused()) return;
                    this.play();
                    client.played.raise(true);
                },
                played: new Collection.EventHandlers<boolean>(),
                error: (): MediaError => {
                    return this._audio.error;
                },
                seekable: (): TimeRanges => {
                    return this._audio.seekable;
                },
                autoplay: (value?: boolean): boolean => {
                    if (arguments.length > 0) this.autoplay(value);
                    return this.autoplay();
                },
                volume: (value?: number): number => {
                    if (arguments.length > 0) this.volume(value);
                    return this.volume();
                },
                playbackRate: (value?: number): number => {
                    if (arguments.length > 0) this.playbackRate(value);
                    return this.playbackRate();
                },
                duration: (): number => {
                    return this._audio.duration;
                },
                muted: (value?: boolean): boolean => {
                    if (arguments.length > 0) this.muted(value);
                    return this.muted();
                },
                defaultPlaybackRate: (value?: number): number => {
                    if (arguments.length > 0) this.defaultPlaybackRate(value);
                    return this.defaultPlaybackRate();
                },
                canPlayType: (mime: string): string => {
                    return this.canPlayType(mime);
                },
                seeking: (): boolean => {
                    return this._audio.seeking;
                },
                currentTime: (value?: number): number => {
                    if (arguments.length > 0) this.currentTime(value);
                    return this.currentTime();
                },
                add: (path: string, mime: string) => {
                    this.add(path, mime);
                    client.changed.raise(this.sounds());
                },
                clear: () => {
                    client.pause();
                    try {
                        if (!!this.sounds() && this.sounds().length > 0) {
                            client.currentTime(0);
                        }
                    } catch (ex) { }

                    this.clear();
                    client.changed.raise(this.sounds());
                },
                sounds: (): string[]=> {
                    return this.sounds();
                },
                contain: (path: string): boolean => {
                    return this.contain(path);
                },
                changed: new Collection.EventHandlers<string[]>(),
                name: this.name,
                album: this.album,
                artist: this.artist,
                info: this.info
            };
            if (!this._client) this._client = client;
        }

        private _setPath() {
            this._audio.innerHTML = "";
            this._paths.forEach((ele, i, arr) => {
                var sourceEle = document.createElement("source");
                sourceEle.setAttribute("src", ele.key);
                sourceEle.setAttribute("type", ele.value);
                this._audio.appendChild(sourceEle);
            });

            var errText = document.createElement("div");
            errText.innerHTML = this._text;
            this._audio.appendChild(errText);
            if (!!this._paths && this._paths.length > 0) this._audio.src = this._paths[0].key;
        }

        private _bindingControl(): Common.BindingControl<SoundPlayerClientContract> {
            if (!!this._bindings) return this._bindings;
            var vEle = this.getChildElement(true, "v");
            if (!vEle) return this._bindings;
            this._bindings = new Common.BindingControl<SoundPlayerClientContract>(vEle.id);
            return this._bindings;
        }

        private _render() {
            var vEle = document.createElement("div");
            vEle.id = this.get_id() + "_v";
            vEle.style.display = "none";
            this.appendElement(vEle);
            this._audio = document.createElement("audio");
            this._audio.id = this.get_id() + "_a";
            this.appendElement(this._audio);
        }

    }

}

if (typeof define === 'function' && define['amd']) {
    define(["exports"], function (exports) {
        return AliHub;
    });
}
