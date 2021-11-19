declare module AliHub.Runtime {
    var loadModule: (name: string, path: string) => any;
}
declare module AliHub.Common {
    /**
      * Action without parameter.
      */
    interface Action {
        (): void;
    }
    /**
      * Action with a parameter.
      */
    interface Action1<T> {
        (arg: T): void;
    }
    /**
      * Action with 2 parameters.
      */
    interface Action2<T1, T2> {
        (arg1: T1, arg2: T2): void;
    }
    /**
      * Action with 3 parameters.
      */
    interface Action3<T1, T2, T3> {
        (arg1: T1, arg2: T2, arg3: T3): void;
    }
    /**
      * Action with 4 parameters.
      */
    interface Action4<T1, T2, T3, T4> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4): void;
    }
    /**
      * Function without parameter.
      */
    interface Func<T> {
        (): T;
    }
    /**
      * Function with a parameter.
      */
    interface Func1<T, TResult> {
        (arg: T): TResult;
    }
    /**
      * Function with 2 parameters.
      */
    interface Func2<T1, T2, TResult> {
        (arg1: T1, arg2: T2): TResult;
    }
    /**
      * Function with 3 parameters.
      */
    interface Func3<T1, T2, T3, TResult> {
        (arg1: T1, arg2: T2, arg3: T3): TResult;
    }
    /**
      * Function with 4 parameters.
      */
    interface Func4<T1, T2, T3, T4, TResult> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4): TResult;
    }
    /**
      * Action to raise event handler.
      */
    interface EventHandler<T> {
        (ev: T): void;
    }
    /**
      * Processing task.
      */
    interface ProcessingTask {
        process(): void;
    }
    /**
      * Processing task.
      */
    interface ObjectProcessingTask<T> {
        process(object: T): void;
    }
    /**
      * Cancellable task.
      */
    interface CancelableTask extends ProcessingTask {
        cancel(): void;
    }
    interface IdentifiedContract {
        id: string;
    }
    interface NamedContract {
        name: string;
    }
    /**
      * Value changed arguments.
      */
    interface ValueChangedArgsContract<T> {
        oldValue: T;
        newValue: T;
        target: any;
        event: string;
    }
    interface ReferenceItemContract {
        id: string;
        type: string;
    }
    interface SenderItemContract {
        id?: string;
        name: string;
        intro?: string;
        avatar?: AliHub.Graph.ImageContract;
        url?: string;
    }
    /**
     * Interface for the task promise/deferred callbacks
     */
    interface CallbackContract<T> {
        (value?: T, ...args: any[]): void;
    }
    interface TaskOperationContract<T, R> {
        (callback: CallbackContract<T>, ...callbacks: CallbackContract<T>[]): TaskContract<R>;
        (callback: CallbackContract<T>[], ...callbacks: CallbackContract<T>[]): TaskContract<R>;
    }
    /**
     * Allows task Promises to interop with non-task promises
     */
    interface TaskTokenContract<T> {
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
    interface TaskContract<T> {
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
    interface SymboItemContract {
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
    interface FollowUpContract {
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
    interface CommentFollowUpContract extends FollowUpContract {
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
    interface DisposableContract {
        dispose(): void;
    }
    /**
      * Binding object.
      */
    interface BindingObjectContract<T> {
        (value?: T): T;
        subscribe(callback: (newValue: T) => void, target?: any, event?: string): DisposableContract;
    }
    /**
      * Binding parameters.
      */
    interface BindingParamContract<T> {
        id: string;
        model: BindingObjectContract<T>;
        info: BindingObjectContract<any>;
        converted: BindingObjectContract<any>;
        res: any;
    }
    /**
      * Model extender of binding control.
      */
    interface BindingControlExtender<T> {
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
        load?(control: BindingControl<T>): void;
    }
    /**
      * Biographic coordinate.
      */
    interface BioCoordinate {
        dimension: number;
        longitude: number;
        altitude?: number;
    }
    /**
      * 2D coordinate.
      */
    interface PlaneCoordinate {
        x: number;
        y: number;
    }
    /**
      * 3D coordinate.
      */
    interface StereoscopicCoordinate extends PlaneCoordinate {
        z: number;
    }
    /**
      * 4D coordinate.
      */
    interface SpacetimeCoordinate extends StereoscopicCoordinate {
        t: number;
    }
    /**
      * Visual control.
      */
    class VisualControl {
        private _containerId;
        private _properties;
        private _children;
        propChanged: Collection.EventHandlers<Collection.ValueChangedContract<any>>;
        /**
          * Initializes a new instance of the VisualControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        constructor(id: string);
        /**
          * Gets the identifier.
          */
        get_id(): string;
        /**
          * Gets the control element.
          */
        get_element(): HTMLElement;
        /**
          * Gets the specific additional property.
          * @param key  The property name.
          */
        get_prop(name: string): any;
        /**
          * Sets the specific additional property.
          * @param key  The property name.
          * @param value  The value of the property.
          */
        set_prop(name: string, value: any): any;
        /**
          * Adds class.
          * @param value  A list of class to add.
          */
        add_styleRef(value: string | string[]): void;
        /**
          * Removes class.
          * @param value  A list of class to remove.
          */
        remove_styleRef(value: string | string[]): void;
        /**
          * Modifies class.
          * @param adding  A list of class to add.
          * @param removing  A list of class to remove.
          */
        modify_styleRef(adding: string[], removing: string[]): void;
        /**
          * Appends an element as child.
          * @param child  An element to add; or tag name of element to add.
          */
        appendElement(child: HTMLElement | string): HTMLElement;
        /**
          * Clears the control.
          */
        clear(): void;
        /**
          * Gets a child HTML element.
          * usePrefix  true if use current control identifier as prefix; otherwise, false.
          * appendingIdParts  the additional identifier parts.
          */
        getChildElement(usePrefix: boolean, ...appendingIdParts: string[]): HTMLElement;
        /**
          * Gets a child control.
          * usePrefix  true if use current control identifier as prefix; otherwise, false.
          * appendingIdParts  the additional identifier parts.
          */
        getChildControl(usePrefix: boolean, ...appendingIdParts: string[]): VisualControl;
        /**
          * Creates a control as child.
          * @param id  The identifier.
          * @param control  The type of the control to append.
          * @param tag  The tag name of element to fill the control.
          */
        createControl(idSuffix: string, control: typeof VisualControl, tag?: string): VisualControl;
        /**
          * Adds a control as child.
          * @param id  The identifier.
          * @param control  The control factory.
          * @param tag  The tag name of element to fill the control.
          */
        addControl(idSuffix: string, control: Func2<string, VisualControl, VisualControl>, tag?: string): VisualControl;
    }
    class ControlManager {
        private static _initializers;
        static initializers(): ObjectProcessingTask<VisualControl>[];
    }
    /**
      * Mathematics utilities.
      */
    class Maths {
        private static _count;
        /**
          * Adds prefix of a number to a string.
          * @param value  The number to format.
          * @param len  The miximum length of the string to build.
          */
        static addPrefix(value: number, len: number): string;
        static randomString(prefix?: string): string;
    }
    /**
      * Date time and related.
      */
    class DateTime {
        static only24h: boolean;
        /**
          * Converts to date.
          * @param value  The value to convert.
          */
        static parse(value: Date): Date;
        static parse(value: number): Date;
        static parse(value: string): Date;
        static toLocaleTimeString(value: Date, only24h?: boolean): string;
        /**
          * Converts a specific date to locale string.
          * @param value  The date value.
          */
        static toLocaleString(value: Date, onlyDate?: boolean): string;
        /**
          * Converts a specific date to a full locale string.
          * @param value  The date value.
          */
        static toFullLocaleString(value: Date): string;
        /**
          * Converts a specific date to simple string.
          * @param value  The date value.
          */
        static toSimpleString(value: Date): string;
        /**
          * Converts a specific date to number string.
          * @param value  The date value.
          */
        static toNumberString(value: Date): string;
        /**
          * Gets a value indicating whether a year is leap.
          * @param fullYear  The full year to test.
          */
        static isLeap(fullYear: number): boolean;
        /**
          * Gets the count of days in a specific month.
          * @param fullYear  The month.
          */
        static getDayCount(fullYear: number, month?: number): number;
        /**
          * Gets days difference between two date.
          * @param begin  The begin date.
          * @param end  The end date.
          */
        static getDaysDiff(begin: Date, end: Date): number;
        /**
          * Gets years difference between two date.
          * @param begin  The begin date.
          * @param end  The end date.
          */
        static getYearsDiff(begin: Date, end: Date): number;
        /**
          * Gets age by given a birthday.
          * @param value  The birthday.
          */
        static getAge(value: Date): number;
        /**
          * Gets horoscopes list.
          */
        static getHoroscopes(): SymboItemContract[];
        /**
          * Gets a horoscope info by specific date.
          * @param value  The date.
          */
        static getHoroscope(value: Date): SymboItemContract;
        /**
          * Adds speicifc seconds to given date.
          * @param value  The date.
          * @param adding  The timespan in second to add.
          */
        static addSeconds(value: Date, adding: number): Date;
        /**
          * Adds speicifc days to given date.
          * @param value  The date.
          * @param adding  The timespan in day to add.
          */
        static addDays(value: Date, adding: number): Date;
        /**
          * Gets timespan in milliseconds.
          * @param begin  The begin date.
          * @param end  The end date.
          */
        static getSpan(begin: Date, end: Date): number;
        /**
          * Gets timespan string.
          * @param begin  The begin date.
          * @param end  The end date.
          */
        static getSpanString(begin: Date, end: Date): string;
        /**
          * Gets timespan string to now.
          * @param target  The target date.
          */
        static getNowSpanString(target: Date): string;
        /**
          * Gets timespan string.
          * @param span  The timespan in milliseconds.
          */
        static toSpanString(span: number, showMillisec?: boolean): string;
        static toTimeString(value: Date, showSecond?: boolean, force24?: boolean): string;
    }
    /**
      * Text and related.
      */
    class Text {
        /**
          * Copies a string.
          * @param value  The value to copy.
          */
        static copy(value: string): void;
        /**
          * Formats a string.
          * @param template  The source string.
          * @param parameters  The object or array of parameters.
          */
        static format(template: string, parameters?: any): string;
    }
    class Reflection {
        static copy<T>(obj: T): T;
    }
    interface BindingFactoryContract {
        create<T>(value?: T): BindingObjectContract<T>;
        createArray<T>(col?: T[]): Collection.BindingArrayContract<T>;
        applyBindings(viewModel: any, element: HTMLElement): any;
    }
    class BindingFactory {
        private static _instance;
        static set_instance(factory: BindingFactoryContract): void;
        static create<T>(value?: T): BindingObjectContract<T>;
        static createArray<T>(col?: T[]): Collection.BindingArrayContract<T>;
        static createControl<T>(id: string, viewModel: T, templateType: any, templateValue: string): BindingControl<T>;
        static applyBindings(viewMode: any, element: HTMLElement): void;
        static applyTemplate(id: string, valueType: string, value: string, bindings: any, onerror: Func1<string, boolean>): void;
    }
    /**
      * Binding object.
      */
    class BindingObject<T> {
        private _raw;
        changed: Collection.EventHandlers<ValueChangedArgsContract<T>>;
        get_value(): T;
        set_value(value: T): void;
        toObservable(): BindingObjectContract<T>;
        private _getChangedArgs(oldValue, event);
    }
    /**
      * Binding control.
      */
    class BindingControl<T> extends VisualControl {
        private _bindings;
        private _extenders;
        private _convertor;
        private _converted;
        private _extendersLoaded;
        /**
          * Initializes a new instance of the BindingControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        constructor(id: string);
        /**
          * Gets observable model.
          */
        get_observable(): BindingObjectContract<T>;
        /**
          * Raises on binding error.
          * @param errorMessage  The error message.
          */
        onBindingError(errorMessage: string): boolean;
        /**
          * Sets the template.
          * @param valueType  The data source type for the value.
          * @param value  The data source value.
          */
        set_template(valueType: string, value: string): void;
        /**
          * Gets or sets the view model.
          * @param value  Model value to set; or ignore this parameter, if just resolve model.
          * @param binding  An optional flag to indicate whether the given binding value is to replace old one.
          */
        viewModel(value?: T, binding?: boolean): T;
        /**
          * Gets or sets the additional information.
          * @param value  The additional information value to set; or ignore this parameter, if just resolve the additional information.
          */
        info(value?: any): any;
        /**
          * Gets or sets the convertor.
          * @param value  The convertor to set; or ignore this parameter, if just resolve the convertor.
          */
        convertor(h?: Func1<T, any>): Func1<T, any>;
        /**
          * Gets or sets the converted value.
          */
        converted(): any;
        /**
          * Updates the converted value.
          */
        updateConverted(): void;
        /**
          * Sets view model as null.
          */
        clearViewModel(): void;
        /**
          * Refreshes view.
          */
        refresh(): void;
        /**
          * Processes the extender to resolve additional model.
          * @param name  The extender name.
          * @param emptyObj  true if want to return an empty object instead of null when the extender does not exist; otherwise, false.
          */
        procExtender(name: string, emptyObj?: boolean): any;
        /**
          * Gets a specific extender.
          * @param name  The extender name.
          */
        getExtender(name: string): BindingControlExtender<T>;
        /**
          * Adds an extender.
          * @param value  The extender instance.
          */
        addExtender(value: BindingControlExtender<T>): void;
        /**
          * Removes a specific extender.
          * @param name  The extender name.
          */
        removeExtender(name: string): void;
        updateExtenders(): void;
        /**
          * Clears all extenders registered.
          */
        clearExtenders(): void;
        private _loadExtenders();
    }
    /**
      * Activity control.
      */
    class ActivityControl extends VisualControl {
        private _activities;
        private _index;
        private _count;
        /**
          * Raised on changed.
          */
        changed: Collection.EventHandlers<VisualControl>;
        /**
          * Initializes a new instance of the ActivityControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        constructor(id: string);
        /**
          * Gets the length of all including cached.
          */
        length(): number;
        /**
          * Gets current index.
          */
        index(): number;
        /**
          * Gets current control.
          */
        current(): VisualControl;
        /**
          * Adds a control by a factory.
          * @param control  The optional control factory.
          */
        add(control?: Func1<string, VisualControl>, h?: Action1<VisualControl>): VisualControl;
        /**
          * Turns to a specific control.
          * @param control  The control factory.
          */
        turnTo(control: VisualControl | string | number): VisualControl;
        back(step?: number): void;
        private _turnTo(index);
    }
    /**
      * Creates a control as child.
      * @param id  The identifier.
      * @param control  The type of the control to append.
      * @param parent  The parent control.
      */
    function createControl(id: string, control: typeof VisualControl, parent?: VisualControl): VisualControl;
    /**
      * Extends a class.
      * @param derivedClass  The derived class.
      * @param baseClass  The base class.
      */
    function extend(derivedClass: any, baseClass: any): void;
}
declare module AliHub.Data {
    /**
      * Data sources.
      */
    var Sources: any;
}
declare var modulex: any, KISSY: any, exports: any;
declare module AliHub.Collection {
    /**
      * Hash table.
      */
    interface HashTable {
        /**
          * Gets or sets value by key.
          */
        [key: string]: any;
    }
    /**
      * Dictionary.
      */
    interface Dictionary<T> {
        /**
          * Gets or sets value by key.
          */
        [key: string]: T;
    }
    /**
      * Key value pair.
      */
    interface ItemViewContract<T> {
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
    interface MappingContract {
        [key: string]: string | string[];
    }
    interface MappedContract {
        map: MappingContract;
    }
    /**
      * Changing list.
      */
    interface ChangingContract<T> {
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
      * Changing value.
      */
    interface ValueChangedContract<T> {
        /**
          * Source.
          */
        old?: T;
        /**
          * Target.
          */
        value?: T;
        /**
          * Key.
          */
        key: string;
    }
    /**
      * Current changing count infor.
      */
    interface ChangingCountContract<T> {
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
    interface KeyValuePairContract<TKey, TValue> {
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
      * Key value pairs.
      */
    interface PropertiesContract<T> extends Array<KeyValuePairContract<string, T>> {
    }
    /**
      * Key value pairs for strings.
      */
    interface StringPropertiesContract extends Array<KeyValuePairContract<string, string>> {
    }
    /**
      * Interval.
      */
    interface IntervalContract<T> {
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
    interface SymbolDescriptionContract<T> {
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
    interface BasicButtonInfoContract {
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
    interface ButtonInfoContract extends BasicButtonInfoContract {
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
    interface ListItemContract extends BasicButtonInfoContract {
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
    interface GroupItemInfoContract<T> {
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
    interface BindingArrayContract<T> extends Common.BindingObjectContract<T[]> {
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
    interface ArrayBindingParamContract<T> {
        id: string;
        model: BindingArrayContract<T>;
        info: Common.BindingObjectContract<any>;
        converted: Common.BindingObjectContract<any>;
        res: any;
    }
    /**
      * Grouped list contract.
      */
    interface GroupedListContract<T> {
        name: string;
        list: Collection.KeyValuePairContract<string, T>[];
    }
    /**
      * View model for list control.
      */
    interface ListViewModelContract<T> {
        /**
          * Tests whether one of entry should be displayed.
          * @param list  The list control which requests to process this method.
          * @param item  The item to test.
          */
        isVisible?(list: ListControl<T>, item: T): boolean;
        /**
          * Tests whether one of entry should be before another.
          * @param list  The list control which requests to process this method.
          * @param entryA  The entry to test.
          * @param entryB  The reference entry for comparing.
          */
        shouldBeBefore?(list: ListControl<T>, entryA: T, entryB: T): boolean;
        /**
          * Tests whether the entries are in same group.
          * @param list  The list control which requests to process this method.
          * @param entryA  The entry to test.
          * @param entryB  The reference entry for comparing.
          */
        areInSameGroup?(list: ListControl<T>, entryA: T, entryB: T): boolean;
        /**
          * Checks whether contains the given entry by searching key and returns the index.
          * @param list  The list control which requests to process this method.
          * @param entry  The entry to test.
          */
        containsItem?(list: ListControl<T>, entry: T): number;
        /**
          * Merges changing.
          * @param list  The list control which requests to process this method.
          * @param entry  The new entry or the one with changing.
          * @param oldItem  The original item.
          */
        mergeChanging?(list: ListControl<T>, entry: T, oldItem: ListItemInfo<T>): T;
        /**
          * Checks whether the given item means it has been deleted.
          * @param list  The list control which requests to process this method.
          * @param entry  The entry to test.
          */
        isDeleted?(list: ListControl<T>, entry: T): boolean;
        /**
          * Raises on pushing entries.
          * @param list  The list control which requests to process this method.
          * @param col  The entries pushed.
          */
        onEntriesPushed?(list: ListControl<T>, col: T[]): void;
        /**
          * Raises on request update.
          * @param list  The list control which requests to process this method.
          */
        onUpdateRequested?(list: ListControl<T>): void;
        /**
          * Gets group item info model.
          * @param list  The list control which requests to process this method.
          * @param info  The group item information.
          */
        getGroupModel?(list: ListControl<T>, info: GroupItemInfoContract<T>): any;
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
    interface CustomizedListViewModelContract<T> extends ListViewModelContract<T> {
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
        onItemChanged?(list: ListControl<T>, newItem: ListItemInfo<T>, oldItem: ListItemInfo<T>): void;
        /**
          * Occurs during the index of an item has been changed.
          * @param list  The list control which requests to process this method.
          * @param item  The item of which index has been changed.
          * @param oldIndex  Original index.
          */
        onItemIndexChanged?(list: ListControl<T>, item: ListItemInfo<T>, oldIndex: number): void;
    }
    /**
      * Converted view model for list control.
      */
    interface ConvertedListViewModelContract<TSource, TTarget> extends ListViewModelContract<TSource> {
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
    interface CommonListViewModelContract<T> extends ConvertedListViewModelContract<T, ListItemContract> {
    }
    /**
      * List control extender.
      */
    interface ListExtender<T> {
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
        load?(list: ListControl<T>, item: ListItemInfo<T>): void;
    }
    /**
      * Model extender of binding control.
      */
    interface ArrayBindingControlExtender<T> {
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
        load?(control: ArrayBindingControl<T>): void;
    }
    /**
      * Button render styles.
      */
    enum ButtonRenderStyles {
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
        image = 2,
    }
    interface PagingViewModelContract {
        turnTo(control: PagingControl, index: number): void;
        getModel?(control: PagingControl, index: number): any;
    }
    interface PositionContract {
        index: number;
        total?: number;
    }
    interface PagingInfoContract extends PositionContract {
        current: Common.Func<number>;
    }
    interface RecordsCountContract {
        start: number;
        end: number;
        size: number;
        total: number;
        pageIndex: number;
        pageTotal: number;
    }
    /**
      * Array binding control.
      */
    class ArrayBindingControl<T> extends Common.VisualControl {
        private _bindings;
        private _extenders;
        private _convertor;
        private _converted;
        /**
          * Initializes a new instance of the ArrayBindingControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        constructor(id: string);
        /**
          * Gets observable model.
          */
        get_observable(): BindingArrayContract<T>;
        /**
          * Raises on binding error.
          */
        onBindingError(errorMessage: string): boolean;
        /**
          * Sets the template.
          * @param valueType  The data source type for the value.
          * @param value  The data source value.
          */
        set_template(valueType: string, value: string): void;
        /**
          * Gets or sets the view model.
          * @param value  Model value to set; or null, if just to resolve model.
          */
        viewModel(value?: T[]): T[];
        /**
          * Gets or sets the additional information.
          * @param value  The additional information value to set; or ignore this parameter, if just resolve the additional information.
          */
        info(value?: any): any;
        /**
          * Gets or sets the convertor.
          * @param value  The convertor to set; or ignore this parameter, if just resolve the convertor.
          */
        convertor(h?: Common.Func1<T[], any>): Common.Func1<T[], any>;
        /**
          * Gets the converted value.
          */
        converted(): any;
        /**
          * Updates the converted value.
          */
        updateConverted(): void;
        /**
          * Sets view model as null.
          */
        clearViewModel(): void;
        /**
          * Refreshes view.
          */
        refresh(): void;
        /**
          * Processes the extender to resolve additional model.
          * @param name  The extender name.
          * @param emptyObj  true if want to return an empty object instead of null when the extender does not exist; otherwise, false.
          */
        procExtender(name: string, emptyObj?: boolean): any;
        /**
          * Gets a specific extender.
          * @param name  The extender name.
          */
        getExtender(name: string): ArrayBindingControlExtender<T>;
        /**
          * Adds an extender.
          * @param value  The extender instance.
          */
        addExtender(value: ArrayBindingControlExtender<T>): void;
        /**
          * Removes a specific extender.
          * @param name  The extender name.
          */
        removeExtender(name: string): void;
        /**
          * Clears all extenders registered.
          */
        clearExtenders(): void;
    }
    /**
      * Item info for list control.
      */
    class ListItemInfo<T> {
        /**
          * HTML element of the control.
          */
        element: HTMLElement;
        /**
          * Data model / view model.
          */
        model: T;
        /**
          * Current list index.
          */
        index: number;
        /**
          * Converted item.
          */
        converted: any;
        /**
          * Additional information and utilities.
          */
        extenders: any;
        /**
          * References and cache.
          */
        ref: any;
        /**
          * Sets reference instance property.
          * @param key  The property key.
          * @param value  The value of the property to set.
          */
        set_prop(key: string, value: any): void;
        /**
          * Gets reference instance property.
          * @param key  The property key.
          */
        get_prop<T>(key: string): T;
        /**
          * Gets a child HTML element.
          * usePrefix  true if use current control identifier as prefix; otherwise, false.
          * appendingIdParts  the additional identifier parts.
          */
        getChildElement(usePrefix: boolean, ...appendingIdParts: string[]): HTMLElement;
        /**
          * Generates a copy of this instance.
          */
        copy(): ListItemInfo<T>;
    }
    /**
      * List control.
      */
    class ListControl<T> extends Common.VisualControl {
        private _list;
        private _eleCount;
        private _listEle;
        private _containerEle;
        private _itemTemplT;
        private _itemTemplV;
        private _headerTemplT;
        private _headerTemplV;
        private _extenders;
        private _references;
        /**
          * Initializes a new instance of the ListControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        constructor(id: string);
        /**
          * Raised on request update.
          */
        updateRequested: EventHandlers<Object>;
        /**
          * The handler raised on pushing entries.
          */
        entriesPushed: EventHandlers<T[]>;
        /**
          * View model for the list.
          */
        viewModel: ListViewModelContract<T>;
        addReference(...values: MappedContract[]): void;
        containReference(...value: MappedContract[]): boolean;
        removeReference(...value: MappedContract[]): void;
        clearReference(): void;
        getResource<TRes>(reference: Common.ReferenceItemContract): TRes;
        getResources<TRes>(reference: Common.ReferenceItemContract): TRes[];
        /**
          * Sets the tiles view mode.
          * @param index  true if enable tiles mode; otherwise, false.
          */
        setTilesView(value: boolean): void;
        /**
          * Removes a specific item.
          * @param index  Index of the item to remove.
          */
        remove(index: number): void;
        /**
          * Processes the extender to resolve additional model.
          * @param name  The extender name.
          * @param item  The target list item info.
          * @param emptyObj  true if want to return an empty object instead of null when the extender does not exist; otherwise, false.
          */
        procExtender(name: string, item: ListItemInfo<T>, emptyObj?: boolean): any;
        /**
          * Gets a specific extender.
          * @param name  The extender name.
          */
        getExtender(name: string): ListExtender<T>;
        /**
          * Adds an extender.
          * @param value  The extender instance.
          */
        addExtender(value: ListExtender<T>): void;
        /**
          * Removes a specific extender.
          * @param name  The extender name.
          */
        removeExtender(name: string): void;
        /**
          * Clears all extenders registered.
          */
        clearExtenders(): void;
        /**
          * Push a given item. Supports actions of insertion, updating and removing.
          * @param entry  The item to set into the list. Collection supported.
          */
        push(...entry: T[]): T[];
        /**
          * Batch pushes a colletion.
          * @param col  A collection to delta update into the list.
          */
        pushRange(col: T[]): T[];
        /**
          * Pushes a resource.
          * @param propertyKey  The property key to get collection in the resource object.
          * @param resource  A resource to push. Collection supported.
          */
        pushResource(propertyKey: string, ...resource: MappedContract[]): T[];
        /**
          * Reloads the list.
          */
        refresh(): void;
        /**
          * Sets the view template of each item.
          * @param sourceType  The type of view template source.
          * @param sourceValue  The value of view template source.
          */
        setItemTemplate(sourceType: string, sourceValue: string): void;
        /**
          * Clears the view template of each item.
          */
        clearItemTemplate(): void;
        /**
          * Sets the view template of each items group header.
          * @param sourceType  The type of view template source.
          * @param sourceValue  The value of view template source.
          */
        setHeaderTemplate(sourceType: string, sourceValue: string): void;
        /**
          * Clears the view template of each item.
          */
        clearHeaderTemplate(): void;
        /**
          * Sets the view template of item.
          */
        refreshHeaders(): number;
        clearHeaders(): void;
        getChildrenElements(): HTMLLIElement[];
        getGroupHeadersElements(): HTMLLIElement[];
        /**
          * Clears all items.
          */
        clear(): void;
        /**
          * Performs the specified action for each element in this list.
          * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
          * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
          */
        forEachItem(callbackfn: (value: ListItemInfo<T>, index: number, array: ListItemInfo<T>[]) => void): void;
        /**
          * Determines whether the specified callback function returns true for any element of an array.
          * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
          * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
          */
        firstItem(callbackfn: (value: ListItemInfo<T>, index: number, array: ListItemInfo<T>[]) => boolean): ListItemInfo<T>;
        /**
          * Renders the list item.
          * @param item  The item to render.
          */
        renderItem(item: ListItemInfo<T>): void;
        /**
          * Renders the group title.
          * @param start  The first entry of the group.
          */
        renderGroupTitle(info: GroupItemInfoContract<T>): void;
        /**
          * Occurs during an item has been changed.
          * @param newItem  The item with update.
          * @param oldItem  The original item.
          */
        onItemChanged(newItem: ListItemInfo<T>, oldItem: ListItemInfo<T>): void;
        /**
          * Occurs during the index of an item has been changed.
          * @param item  The item of which index has been changed.
          * @param oldIndex  Original index.
          */
        onItemIndexChanged(item: ListItemInfo<T>, oldIndex: number): void;
        /**
          * Checks whether contains the given entry by searching key and returns the index.
          * @param entry  The entry to test.
          */
        containsItem(entry: T): number;
        /**
          * Tests whether one of entry should be before another.
          * @param entryA  The entry to test.
          * @param entryB  The reference entry for comparing.
          */
        shouldBeBefore(entryA: T, entryB: T): boolean;
        /**
          * Tests whether the entries are in same group.
          * @param entryA  The entry to test.
          * @param entryB  The reference entry for comparing.
          */
        areInSameGroup(entryA: T, entryB: T): boolean;
        /**
          * Gets group item info model.
          * @param info  The group item information.
          */
        getGroupModel(info: GroupItemInfoContract<T>): any;
        /**
          * Tests whether one of entry should be displayed.
          * @param item  The item to test.
          */
        isVisible(item: T): boolean;
        /**
          * Checks whether the given item means it has been deleted.
          * @param entry  The entry to test.
          */
        isDeleted(entry: T): boolean;
        /**
          * Merges changing.
          * @param entry  The new entry or the one with changing.
          * @param oldItem  The original item.
          */
        mergeChanging(entry: T, oldItem: ListItemInfo<T>): T;
        /**
          * Tests given entry is valid.
          * @param entry  The entry to test.
          */
        valid(entry: T): boolean;
        private _push(entry);
        private _insert(item);
        private _getItemControl(tile);
        private _update(entry, position);
    }
    class ResourcePath {
        private _arr;
        private _split;
        constructor(path: string, split?: string);
        pushString(path: string): void;
        remove(): void;
        item(index: number, value?: KeyValuePairContract<string, string>): KeyValuePairContract<string, string>;
        length(): number;
        toParameterString(): string;
    }
    class PagingHelper {
    }
    /**
      * Paging control.
      */
    class PagingControl extends Common.VisualControl {
        private _viewModel;
        private _bindingControl;
        private _total;
        private _index;
        private _around;
        private _selector;
        private _infoEle;
        private _selectorTemplT;
        private _selectorTemplV;
        private _ellipsisTemplT;
        private _ellipsisTemplV;
        private _funcTemplT;
        private _funcTemplV;
        private _infoTemplT;
        private _infoTemplV;
        viewModelChanged: EventHandlers<ValueChangedContract<PagingViewModelContract>>;
        indexChanged: EventHandlers<ValueChangedContract<number>>;
        totalChanged: EventHandlers<ValueChangedContract<number>>;
        aroundCountChanged: EventHandlers<ValueChangedContract<number>>;
        info: Common.BindingObjectContract<{}>;
        constructor(id: string);
        viewModel(value?: PagingViewModelContract): PagingViewModelContract;
        total(value?: number): number;
        index(value?: number): number;
        aroundCount(value?: number): number;
        getPageModel(index: number): any;
        getPageInfo(index: number): PagingInfoContract;
        refresh(): void;
        setSelectorTemplate(valueType: string, value: string): void;
        setEllipsisTemplate(valueType: string, value: string): void;
        setFunctionTemplate(valueType: string, value: string): void;
        setInfoTemplate(valueType: string, value: string): void;
        isValidIndex(index: number): boolean;
        turnTo(key: string | number): number;
        private _formatKey(key);
        private _getPageInfo(index);
        private _refreshSelector();
        private _generateEllipsis(parent, partName);
        private _generateFuncPart(key, parent);
        private _generatePageSelector(index, parent, selected?);
    }
    /**
      * Event handlers.
      */
    class EventHandlers<T> {
        private _list;
        /**
          * Registers an event handler.
          * @param h  The event handler to register.
          */
        add(h: (ev: T) => void): Common.DisposableContract;
        /**
          * Raises this event.
          * @param ev  The event arguments.
          */
        raise(ev: T): void;
        /**
          * Removes an event handler.
          * @param h  The event handler to remove.
          */
        remove(h: (ev: T) => void): void;
        /**
          * Clears all event handlers.
          */
        clear(): void;
    }
    class ListHelper {
        static toArray<T>(value: T | T[], emptyForNull?: boolean): T[];
        static toStringArray(value: string | string[], emptyForNull?: boolean): string[];
        static isArray(col: any): boolean;
        /**
          * Checks whether a specific list contains a test item.
          * @param list  The list.
          * @param testItem  The item to test.
          * @param compare  Additional compare handler.
          */
        static contains<T1, T2>(list: T1[], testItem: T2, compare?: Common.Func2<T1, T2, boolean>): boolean;
        /**
          * Gets the index of a test item in a specific list.
          * @param list  The list.
          * @param testItem  The item to test.
          * @param compare  Additional compare handler.
          */
        static indexOf<T1, T2>(list: T1[], testItem: T2, compare?: Common.Func2<T1, T2, boolean>): number;
        static copy<T>(list: T[]): T[];
        static pushRange(list: any[], adding: any[], nullCheck?: boolean): any[];
        static remove(list: any[], removing: any[], changeRaw?: boolean, compare?: Common.Func2<any, any, boolean>): any[];
        static removeKeyValuePair<TKey, TValue>(list: KeyValuePairContract<TKey, TValue>[], removing: TKey[], changeRaw?: boolean): KeyValuePairContract<TKey, TValue>[];
        /**
          * Modifies items in a specific list string.
          * @param raw  The list string.
          * @param split  The split string.
          * @param addingItems  Items to add into the list string.
          * @param removingItems  Items to remove from the list list string.
          */
        static addItem(raw: string, split: string, addingItems: string | string[], removingItems?: string | string[]): string;
        static getResource<T>(col: MappedContract | MappedContract[], reference: Common.ReferenceItemContract): T;
        static getResources<T>(col: MappedContract | MappedContract[], reference: Common.ReferenceItemContract): T[];
        static setKeyValue<TKey, TValue>(col: KeyValuePairContract<TKey, TValue>[], item: KeyValuePairContract<TKey, TValue>, compare?: Common.Func2<TKey, TKey, boolean>): KeyValuePairContract<TKey, TValue>[];
        /**
          * Finds the item view in the list.
          * @param col  The collection of item views.
          * @param value  The value of item view to find.
          */
        static findItemView<T>(col: ItemViewContract<T>[], value: T): ItemViewContract<T>;
    }
}
declare module AliHub.Diagnostics {
    interface TrackerContract {
        /**
          * Logs something.
          */
        log(type: LogTypes, category: string, message: string): any;
    }
    interface PageAnalyticsClientContract {
        /**
          * Records a stamp.
          */
        record(id: string): any;
    }
    enum LogTypes {
        info = 0,
        debug = 1,
        warn = 2,
        error = 3,
    }
    class Tracker implements TrackerContract, PageAnalyticsClientContract {
        private static _default;
        static instance: TrackerContract;
        static pageAnalyticsClient: PageAnalyticsClientContract;
        record(id: string): void;
        log(type: LogTypes, category: string, message: string): void;
        info(category: string, message: string): void;
        debug(category: string, message: string): void;
        warn(category: string, message: string): void;
        error(category: string, message: string): void;
        static logSwitch(instance: any, type: LogTypes, category: string, message: string): void;
        static info(category: string, message: string): void;
        static debug(category: string, message: string): void;
        static warn(category: string, message: string): void;
        static error(category: string, message: string): void;
        static log(type: LogTypes, category: string, message: string): void;
        static record(id: string): void;
        static consoleInstance(): Tracker;
        static debugInfo(message: string, ...optionalParams: any[]): void;
    }
}
declare module AliHub.Elements {
    /**
      * Action to fill element.
      */
    interface FillAction {
        (element: HTMLElement): void;
    }
    /**
      * Gets specific HTML element.
      * id  the element identifier or prefix.
      * appendingIdParts  the additional identifier parts.
      */
    var getById: <T extends HTMLElement>(id: string, ...appendingIdParts: string[]) => T;
    /**
      * Gets specific HTML element.
      * id  the element identifier or prefix.
      * appendingIdParts  the additional identifier parts.
      */
    var getItem: (id: string, ...appendingIdParts: string[]) => HTMLElement;
    /**
      * Registers a control.
      * name  the name of tag to register.
      * control  the control name to register.
      */
    function register(name: string, control: typeof Common.VisualControl): any;
    /**
      * Document utilities.
      */
    class Utils {
        /**
          * Gets top offset of specific element in document.
          * element  the element.
          */
        static getTop(element: HTMLElement): number;
        /**
          * Gets left offset of specific element in document.
          * element  the element.
          */
        static getLeft(element: HTMLElement): number;
        /**
          * Gets the position of the specific element in document.
          * element  the element.
          */
        static getPosition(element: HTMLElement): Common.PlaneCoordinate;
        /**
          * Gets the position of the mouse in specific element or document.
          * element  the optional element as target.
          */
        static getMousePosition(element?: HTMLElement): Common.PlaneCoordinate;
        /**
          * Gets specific HTML element.
          * id  the element identifier or prefix.
          * appendingIdParts  the additional identifier parts.
          */
        static getById<T extends HTMLElement>(id: string, ...appendingIdParts: string[]): T;
        /**
          * Changes style references and resolves the list all.
          * element  the element.
          * adding  the names to add.
          * removing  the names to remove.
          */
        static changeStyleRef(element: HTMLElement, adding: string | string[], removing?: string | string[]): string[];
        /**
          * Sanitizes a specific HTML part to text string.
          * htmlString  the HTML string to sanitize.
          */
        static sanitizeHTML(htmlString: any): string;
        /**
          * Merges an identifier.
          * prefix  the identifier prefix.
          * idParts  the additional identifier parts.
          */
        static mergeId(prefix: string, idParts: string[]): string;
        static getQueryInfo(): Collection.StringPropertiesContract;
        static getQuery(name: string | number): string;
        static toQueryString(value: Collection.StringPropertiesContract): string;
        static getPageAddress(): string;
        static addEvent(element: HTMLElement, eventType: string, h: (ev: Event) => void): void;
    }
}
declare module AliHub.Graph {
    /**
      * Series chart information.
      */
    interface SeriesChartContract {
        categories: string[];
        data: Collection.KeyValuePairContract<string, number>;
        highligh?: Collection.IntervalContract<number>[];
        scope?: Collection.IntervalContract<number>;
    }
    /**
      * Image reference.
      */
    interface ImageContract {
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
    interface StringImageContract extends ImageContract {
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
    interface UrlImageContract extends ImageContract {
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
    interface SvgImageContract extends ImageContract {
        /**
          * SVG source.
          */
        source: string;
    }
    /**
      * Chart center.
      */
    class Chart {
        /**
          * Generates an HTML string of progress bar.
          * value  the value.
          * blockCount  the count of block in progress bar.
          */
        static genProgressBarHTML(value: number, blockCount: number): string;
        static genIsoscelesRightTriangle(rotation: number): string;
    }
    /**
      * Image container.
      */
    class ImageContainer {
        /**
          * Generates an element for image.
          * image  the image contract.
          */
        static generateImage(value: ImageContract | Common.BindingObjectContract<ImageContract>): HTMLElement;
    }
    /**
      * External extensions for graph.
      */
    class Extensions {
        /**
          * External extensions for graph.
          */
        static radarGenerator(element: HTMLDivElement, data: Collection.KeyValuePairContract<string, number>[]): void;
        static lineGenerator(element: HTMLDivElement, data: Collection.KeyValuePairContract<string, number>[], highlightPosition?: number, scope?: Collection.IntervalContract<number>): void;
    }
}
declare module AliHub.Media {
    interface SoundPlayerClientContract {
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
        loaded: Collection.EventHandlers<Collection.KeyValuePairContract<string, string>[]>;
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
          * Gets or sets the preload mode.
          */
        preload(value?: string): string;
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
        sound(path: string, mime: string): void;
        sounds(value?: Collection.KeyValuePairContract<string, string>[]): Collection.KeyValuePairContract<string, string>[];
        contain(path: string): boolean;
        clear(): void;
        changed: Collection.EventHandlers<Collection.KeyValuePairContract<string, string>[]>;
        /**
          * Gets or sets the additional data model of the sound.
          */
        model(value?: any): any;
    }
    class SoundPlayerControl extends Common.VisualControl {
        private _paths;
        private _audio;
        private _text;
        private _client;
        private _bindings;
        /**
          * Initializes a new instance of the BindingControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        constructor(id: string);
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
        /**
          * Gets or sets the additional data model of the sound.
          */
        model: Common.BindingObjectContract<any>;
        voiceLoaded: Collection.EventHandlers<Collection.KeyValuePairContract<string, string>[]>;
        played: Collection.EventHandlers<boolean>;
        contain(path: string): boolean;
        client(): SoundPlayerClientContract;
        sound(path: string, mime: string): void;
        sounds(value?: Collection.KeyValuePairContract<string, string>[]): Collection.KeyValuePairContract<string, string>[];
        unsupportedText(str?: string): string;
        /**
          * Sets the template.
          * @param valueType  The data source type for the value.
          * @param value  The data source value.
          */
        set_template(valueType: string, value: string): void;
        /**
          * Adds an extender.
          * @param value  The extender instance.
          */
        addExtender(value: Common.BindingControlExtender<SoundPlayerClientContract>): void;
        /**
          * Removes a specific extender.
          * @param name  The extender name.
          */
        removeExtender(name: string): void;
        /**
          * Clears all extenders registered.
          */
        clearExtenders(): void;
        play(): void;
        pause(): void;
        paused: () => boolean;
        autoplay: (value?: boolean) => boolean;
        volume: (value?: number) => number;
        playbackRate: (value?: number) => number;
        muted: (value?: boolean) => boolean;
        defaultPlaybackRate: (value?: number) => number;
        canPlayType: (mime?: string) => string;
        currentTime: (value?: number) => number;
        copyBinding(control: Common.BindingControl<any>): void;
        private _initClient();
        private _bindingControl();
        private _renew();
    }
}
declare module AliHub.Common {
    /**
      * Page controller.
      */
    class PageController {
        private static _hasInited;
        private static _onresize;
        private static _size;
        /**
          * The app center URL.
          */
        static appCenterUrl: string;
        /**
          * The element identifier of the page body panel.
          */
        static bodyPanelId: string;
        /**
          * The element identifier of the page header panel.
          */
        static headerPanelId: string;
        /**
          * The element identifier of the page cover panel.
          */
        static coverPanelId: string;
        /**
          * The element identifier of the page hidden panel.
          */
        static hiddenPanelId: string;
        /**
          * The message center path URL.
          */
        static messageUrl: string;
        /**
          * The feedback path URL.
          */
        static feedbackUrl: string;
        /**
          * The user sign out path URL.
          */
        static signOutUrl: string;
        /**
          * The menu in top bar.
          */
        static menu: Collection.ButtonInfoContract[];
        /**
          * The breadcrumb of the page.
          */
        static path: Collection.ButtonInfoContract[];
        /**
          * A value indicating whether this page is last node in the path.
          */
        static isLastNodeInPath: boolean;
        static homeInfo: Collection.BasicButtonInfoContract;
        static searchIcon: Graph.ImageContract;
        /**
          * The tips in search box.
          */
        static searchTip: string;
        /**
          * The search provider.
          */
        static searchProvider: Common.Func1<string, Collection.ButtonInfoContract[]>;
        /**
          * The link target of search item.
          */
        static searchTarget: string;
        /**
          * The options bar info.
          */
        static optionsBar: Collection.ButtonInfoContract[];
        /**
          * The mininum size of the page.
          */
        static minSize: string;
        /**
          * The maxinum size of the page.
          */
        static maxSize: string;
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
        static getWindowSize(): string;
        /**
          * Refreshes page layout.
          */
        static refreshLayout(): void;
        /**
          * Initializes the page.
          */
        static init(): void;
        static generatePage(id?: string): void;
        /**
          * Added resize handler.
          */
        static addResizeEvent(h: Common.Action): void;
        /**
          * Opens an app by given URL.
          */
        static openApp(url: string, timeout?: number): void;
        /**
          * Loads client script.
          */
        static loadScript(url: string): void;
        /**
          * Shows customized page cover.
          */
        static showCustomizedCover(): HTMLDivElement;
        /**
          * Hides customized page cover.
          */
        static hideCustomizedCover(): void;
        /**
          * Renders header.
          */
        static renderHeader(branch?: string): void;
        static changeBranch(path: string): void;
        static selectMenuItem(element: HTMLUListElement, menu: Collection.ButtonInfoContract[], path: string): any;
        /**
          * Renders menu.
          */
        static renderMenu(element: HTMLUListElement, menu: Collection.ButtonInfoContract[], path?: string, h?: (item: Collection.ButtonInfoContract, itemElement: HTMLLIElement, index: number) => void, split?: (splitElement: HTMLLIElement, leftIndex: number) => boolean): HTMLLIElement[];
        private static _menuElements;
        private static _menuItems;
        private static _menuSelIndex;
        private static _q;
        private static _renderSearchBar(element);
    }
}
declare module AliHub.Panels {
    /**
      * Simple flow panel.
      */
    class SingleFlowPanel<T> extends Common.VisualControl {
        private _containerEle;
        private _content;
        private _contentId;
        private _sideBarId;
        private _sidebar;
        private _counter;
        /**
          * Initializes a new instance of the SingleFlowPanel class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        constructor(id: string);
        /**
          * Gets panel content.
          */
        getContent(): T;
        /**
          * Sets panel content.
          */
        setContent(value: (id: string) => T): void;
        addSidePanel<TControl extends Common.VisualControl>(generator: (id: string) => TControl): TControl;
        getSidePanel<TControl extends Common.VisualControl>(index: number): TControl;
        private _renderLayoutTable(container);
    }
    /**
      * Mini agenda.
      */
    class MiniAgenda extends Common.VisualControl {
        /**
          * Initializes a new instance of the MiniAgenda class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        constructor(id: string);
        private _renderLayout();
    }
}
declare module AliHub.Res {
    function regLang(template: AliHub.Res.Templates): Templates;
    interface IconFontContract {
        line: string;
        block: string;
    }
    class IconFontCollection {
        private _icon;
        private _subject;
        constructor(subject: string);
        subject(): string;
        item(key: string, value?: IconFontContract): IconFontContract;
        line(key: string, defaultValue?: string): string;
        block(key: string, defaultValue?: string): string;
    }
    class Templates {
        private _html;
        private _svg;
        private _subject;
        constructor(subject: string);
        subject(): string;
        strings: Strings;
        html(key: string, value?: string): string;
        svg(key: string, value?: string): string;
        localString(key: string, lang?: string): string;
    }
    class Strings {
        private _strings;
        defaultLang: string;
        reg(lang: string, value: Collection.Dictionary<string> | {}): void;
        specialField(lang: string, key: string, value?: string): string;
        localField(key: string, value?: string): string;
        globalField(key: string, value?: string): string;
        field(key: string, lang?: string): string;
        private _lang(lang, init?);
    }
    function factory(extender?: Common.Action1<Object>): () => {
        templates: (subject: string, createIfExist?: boolean) => Templates;
        iconfonts: (subject: string, value?: boolean | IconFontCollection) => IconFontCollection;
        market: (lang?: string | boolean) => string;
    };
    function templates(subject: string, createIfExist?: boolean): Templates;
    function html(subject: string, key: string, value?: string): string;
    function svg(subject: string, key: string, value?: string): string;
    function iconfonts(subject: string, value?: IconFontCollection | boolean): IconFontCollection;
    function strings(subject: string, key: string, lang?: string): string;
    function market(lang?: string | boolean): string;
    function builtIn(): Templates;
}
declare module AliHub.Users {
    /**
      * Member profile contract.
      */
    interface ProfileContract {
        /**
          * Member identifier.
          */
        id: string;
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
    interface PrincipleContract {
        profile: ProfileContract;
        permission: Collection.Dictionary<boolean>;
        contact: Collection.Dictionary<string>;
    }
    /**
      * On call notification.
      * Property "type" is "oncall".
      */
    interface OncallNotificationItemContract extends Web.NotificationItemContract {
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
    class ProfileCard extends Common.VisualControl {
        constructor(id: string);
        private _renderLayout();
    }
    class Manager {
        private static _me;
        static logined(): boolean;
        static principle(value?: PrincipleContract): PrincipleContract;
        static profile(value?: ProfileContract): ProfileContract;
        static permissionSet(value?: Collection.Dictionary<boolean>): Collection.Dictionary<boolean>;
        static hasPermission(key: string, ignoreLogin?: boolean): boolean;
        static configPermission(key: string, value: boolean): void;
    }
}
declare module AliHub.SocialNetwork {
    interface PhoneNumberContract {
        region: number;
        city?: string;
        no: string;
        ext?: string;
    }
}
declare module AliHub.Web {
    /**
      * Response task with result.
      */
    interface ResponseTask<T> extends Common.TaskContract<Web.ResponseContract<T>> {
    }
    /**
      * Response task without result.
      */
    interface EmptyResponseTask extends Common.TaskContract<Web.EmptyResponseContract> {
    }
    /**
      * Package contract with entry or raw data.
      */
    interface PackageContract<T> {
        success: boolean;
        message: string;
        timestamp: Date;
        data: T;
    }
    /**
      * Package contract with entry or raw data. This is obsolete.
      */
    interface ObsoletePackageContract<T> {
        isSuccess: boolean;
        errMsg: string;
        data: T;
    }
    /**
      * Web response information.
      */
    interface EmptyResponseContract {
        /**
          * Timestamp.
          */
        timestamp: Date;
    }
    /**
      * Web response information.
      */
    interface ResponseContract<T> extends EmptyResponseContract {
        /**
          * Result.
          */
        result: T;
    }
    /**
      * Web response with user online status information.
      */
    interface HeartbeatResponseContract {
        /**
          * User online status.
          */
        online: Web.OnlineStatusContract;
        /**
          * Notification list.
          */
        notification: NotificationItemContract[];
    }
    interface HeartbeatRequestContract {
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
    interface NotificationItemContract {
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
    interface ActiveNotificationItemContract extends NotificationItemContract {
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
    interface OnlineStatusContract {
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
    interface RestJobContract {
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
        /**
          * Sends by GET to resolve a string.
          */
        getString(template: string, parameters: any, canBeEmpty: boolean): AliHub.Common.TaskContract<string>;
    }
    /**
      * Data package accessing job contract.
      */
    interface DataPackageJobContract {
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
    class RestJob {
        private static _instance;
        /**
          * Sets default instance.
          */
        static set_instance(value: RestJobContract): void;
        /**
          * Sends by POST.
          */
        static postInfo<T>(template: string, parameters: any, data: any, canBeEmpty?: boolean, validation?: (value: T) => boolean): Common.TaskContract<T>;
        /**
          * Sends by POST.
          */
        static postEmpty(template: string, parameters: any, data: any): Common.TaskContract<boolean>;
        /**
          * Sends by GET.
          */
        static getInfo<T>(template: string, parameters: any, canBeEmpty?: boolean, validation?: (value: T) => boolean): Common.TaskContract<T>;
        /**
          * Sends by GET.
          */
        static getEmpty(template: string, parameters: any): Common.TaskContract<boolean>;
        /**
          * Sends by GET to resolve a string.
          */
        static getString(template: string, parameters: any, canBeEmpty?: boolean): AliHub.Common.TaskContract<string>;
    }
    /**
      * Data package accessing job.
      */
    class DataPackageJob {
        private static _instance;
        /**
          * Sets default instance.
          */
        static set_instance(value: DataPackageJobContract): void;
        /**
          * Sends by POST.
          */
        static postInfo<T>(template: string, parameters: any, data: any, canBeEmpty?: boolean): Web.ResponseTask<T>;
        /**
          * Sends by POST.
          */
        static postEmpty<T>(template: string, parameters: any, data: any): Web.EmptyResponseTask;
        /**
          * Sends by GET.
          */
        static getInfo<T>(template: string, parameters: any, canBeEmpty?: boolean): Web.ResponseTask<T>;
        /**
          * Sends by GET.
          */
        static getEmpty(template: string, parameters: any): Web.EmptyResponseTask;
        /**
          * Sets static data.
          */
        static staticInfo<T>(data: T): Web.ResponseTask<T>;
        /**
          * Sets empty data.
          */
        static staticEmpty(): Web.EmptyResponseTask;
    }
    class BaseDataPackageResolver<T> {
        canBeEmpty: boolean;
        pathTemplate: string;
    }
    class DataPackageResolver<T> extends BaseDataPackageResolver<T> {
        resolve(): Web.ResponseTask<T>;
    }
    class RequestDataPackageResolver<TRequest, TResponse> extends BaseDataPackageResolver<TResponse> {
        resolve(model: TRequest): Web.ResponseTask<TResponse>;
    }
    class IdentifiedDataPackageResolver<T> extends BaseDataPackageResolver<T> {
        resolve(id: string): Web.ResponseTask<T>;
    }
    class NamedDataPackageResolver<T> extends BaseDataPackageResolver<T> {
        resolve(name: string): Web.ResponseTask<T>;
    }
    /**
      * Heartbeat.
      */
    class Heartbeat {
        private static _ignore;
        private static _enabled;
        static interval: number;
        static instance: Heartbeat;
        pathTemplate: string;
        ping(input: Web.HeartbeatRequestContract): Web.ResponseTask<Web.HeartbeatResponseContract>;
        /**
          * Enables heartbeat.
          */
        static enable(): void;
        /**
          * Registers handler.
          */
        static addHandler(type: string, h: Common.Action2<NotificationItemContract, NotificationItemContract>): void;
        private static _check();
    }
    class NotificationCache {
        private _h;
        private _list;
        static instance: NotificationCache;
        /**
          * Pushes notification.
          */
        push(value: NotificationItemContract): boolean;
        /**
          * Pushes a collection of notification.
          */
        pushRange(col: NotificationItemContract[]): NotificationItemContract[];
        /**
          * Registers handler.
          */
        addHandler(type: string, h: Common.Action2<NotificationItemContract, NotificationItemContract>): void;
        private _raiseHandler(value, oldValue);
    }
    /**
      * Web utilities.
      */
    class Utils {
        /**
          * Builds a parameter string.
          */
        static buildParaString(parameters: any): string;
    }
}
