declare namespace AliHub.Runtime {
    /**
      * Loads a specific module.
      */
    var loadModule: (name: string, path: string) => any;
}
declare namespace AliHub.Common {
    /**
      * Visual control element.
      */
    type VisualControlElementContract = string | HTMLElement | VisualControlParentIdContract;
    /**
      * Visual control identifier with parent information.
      */
    interface VisualControlParentIdContract {
        parent: string | HTMLElement | VisualControl | Document | Window;
        suffix: string;
        styleRef?: string | string[];
    }
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
      * Action with 5 parameters.
      */
    interface Action5<T1, T2, T3, T4, T5> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5): void;
    }
    /**
      * Action with 6 parameters.
      */
    interface Action6<T1, T2, T3, T4, T5, T6> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6): void;
    }
    /**
      * Action with 7 parameters.
      */
    interface Action7<T1, T2, T3, T4, T5, T6, T7> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7): void;
    }
    /**
      * Action with 8 parameters.
      */
    interface Action8<T1, T2, T3, T4, T5, T6, T7, T8> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8): void;
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
      * Function with 5 parameters.
      */
    interface Func5<T1, T2, T3, T4, T5, TResult> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5): TResult;
    }
    /**
      * Function with 6 parameters.
      */
    interface Func6<T1, T2, T3, T4, T5, T6, TResult> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6): TResult;
    }
    /**
      * Function with 7 parameters.
      */
    interface Func7<T1, T2, T3, T4, T5, T6, T7, TResult> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7): TResult;
    }
    /**
      * Function with 8 parameters.
      */
    interface Func8<T1, T2, T3, T4, T5, T6, T7, T8, TResult> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8): TResult;
    }
    /**
      * Equatable function handler.
      */
    interface EquatableFunc<T> {
        /**
          * Tests whether one of entry should be same another.
          * @param entryA  The entry to test.
          * @param entryB  The reference entry for comparing.
          */
        (entryA: T, entryB: T): boolean;
    }
    /**
      * Action to raise event handler.
      */
    interface EventHandler<T> {
        (ev: T): void;
    }
    /**
      * Classic object.
      */
    interface ClassicObject {
        [property: string]: any;
    }
    /**
      * Processing task.
      */
    interface ProcessingTask {
        process(): void;
        [property: string]: any;
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
    interface DeferredContract<T> {
        resolve(value?: T): any;
        reject(reason?: any): any;
        promise(): PromiseLike<T>;
    }
    interface IdentifiedContract {
        id: string;
        [property: string]: any;
    }
    interface NamedContract {
        name: string;
        [property: string]: any;
    }
    interface SimpleEntryContract extends IdentifiedContract, NamedContract {
    }
    /**
      * Avatar with item info contract.
      */
    interface UrlAvatarItemContract extends SimpleEntryContract {
        avatar?: string;
    }
    /**
      * Value changed arguments.
      */
    interface ValueChangedArgsContract<T> {
        /**
          * Old value.
          */
        oldValue: T;
        /**
          * New value.
          */
        newValue: T;
        /**
          * Target owner.
          */
        target: any;
        /**
          * Event type of name, or event key.
          */
        event: string;
        /**
          * Property.
          */
        [property: string]: any;
    }
    /**
      * Resource references item.
      */
    interface ReferenceItemContract {
        /**
          * Resource identifier.
          */
        id: string;
        /**
          * Resource type.
          */
        type: string;
        [property: string]: any;
    }
    interface SenderItemContract {
        id?: string;
        name: string;
        intro?: string;
        avatar?: AliHub.Graph.ImageContract;
        url?: string;
    }
    interface ActiveItemContract {
        onload?: Action;
        onactive?: Action;
        oninactive?: Action;
        onclose?: Action;
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
    interface EntityBindingContract<T> extends Common.ListenedObjectContract<string> {
        getEntity(): T;
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
        [property: string]: any;
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
        /**
          * Additional properties.
          */
        [key: string]: any;
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
        /**
          * Additional properties.
          */
        [key: string]: any;
    }
    /**
      * Disposable.
      */
    interface DisposableContract {
        /**
          * Disposes current instance.
          */
        dispose(): void;
        /**
          * Additional properties.
          */
        [key: string]: any;
    }
    /**
      * Control information.
      */
    interface ControlInfoContract {
        index: number;
        key: string;
        control: Common.VisualControl;
        model: any;
    }
    /**
      * Options of continuity task.
      */
    interface ContinuityTaskOptionsContract {
        /**
          * The handler to raise.
          */
        process: Common.Action2<number, ContinuityTaskOptionsContract>;
        /**
          * Start for hitting.
          */
        start?: number;
        /**
          * Hitting count.
          */
        count?: number;
        /**
          * The timespan in millisecond for hitting.
          */
        span?: number;
    }
    /**
      * Binding control options.
      */
    interface VisualControlOptionsContract<T extends VisualControl> {
        /**
          * Style references.
          */
        styleRef?: string[] | string;
        /**
          * Occurs during initializing.
          */
        preInit?: Action1<T>;
        /**
          * A value indicating whether deny to load template parts automatically.
          */
        ignoreParts?: boolean;
        /**
          * Element attributes.
          */
        attr?: any;
    }
    /**
      * Activity control options.
      */
    interface ActivityControlOptionsContract extends VisualControlOptionsContract<ActivityControl> {
    }
    /**
      * Binding control options.
      */
    interface BindingControlOptionsContract<T> extends VisualControlOptionsContract<BindingControl<T>> {
        /**
          * Template source type.
          * Any of "ajax", "static", "inner" and "element".
          */
        templateType?: string;
        /**
          * Template source value.
          */
        template?: string;
        /**
          * Convertor, a handler to convert view model to the one used for view.
          */
        convertor?: Func1<T, any>;
        /**
          * View model.
          */
        viewModel?: T;
        /**
          * The extenders.
          */
        extender?: BindingControlExtender<T>[] | BindingControlExtender<T>;
        /**
          * The binding control to bind for view model and other data properties.
          */
        bindControl?: BindingControl<T>;
        /**
          * Template engine name.
          */
        templateEngine?: string;
        /**
          * The data from web by resolver.
          */
        webData?: {
            subject?: string;
            key: string | Web.BaseDataPackageResolver<T>;
            parameters?: any;
        };
    }
    /**
      * Binding factory contract.
      */
    interface BindingFactoryContract {
        /**
          * Creates a binding object.
          */
        create<T>(value?: T): BindingObjectContract<T>;
        /**
          * Creates a binding array.
          */
        createArray<T>(col?: T[]): Collection.BindingArrayContract<T>;
        /**
          * Applies a binding relationship between a view model and a DOM element.
          */
        applyBindings(control: VisualControl & BindingContainerContract<any>): any;
    }
    /**
      * Binding object.
      */
    interface BindingObjectContract<T> {
        /**
          * Resolves the data.
          */
        (value?: T): T;
        /**
          * Subscribes the changing.
          */
        subscribe(callback: (newValue: T) => void, target?: any, event?: string): DisposableContract;
        [property: string]: any;
    }
    interface ListenedObjectContract<T> extends BindingObjectContract<T> {
        listen(h: (ev: ValueChangedArgsContract<T>) => void, target?: any, disposableList?: Collection.DisposableArray, args?: any): DisposableContract;
        unlisten(h: (ev: ValueChangedArgsContract<T>) => void): void;
        clearListener(): void;
        format(newValue: T, oldValue: T): T;
        model(value?: T): T;
        copyModel(): T;
        changeTimes(): number;
        loadFromWeb(subject: string | HTMLElement | VisualControl, key: string | Web.BaseDataPackageResolver<T>, parameters?: any): Web.ResponseTask<T>;
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
    interface BindingContainerContract<T> {
        viewModelChanged: Collection.EventHandlers<Collection.PropertyItemContract<T>>;
        convertedChanged: Collection.EventHandlers<Collection.PropertyItemContract<any>>;
        convertorChanged: Collection.EventHandlers<Collection.PropertyItemContract<Func1<T, any>>>;
        infoChanged: Collection.EventHandlers<Collection.PropertyItemContract<any>>;
        viewModel(value?: T): T;
        info(): any;
        convertor(h?: Func1<T, any>): Func1<T, any>;
        converted(): any;
        procExtender(name: string, emptyObj?: boolean): any;
    }
    /**
      * Biographic coordinate.
      */
    interface BioCoordinate {
        /**
          * Dimension.
          * Like Z.
          */
        dimension: number;
        /**
          * Longitude.
          * Like Y.
          */
        longitude: number;
        /**
          * Altitude.
          * Like X.
          */
        altitude?: number;
        /**
          * The property.
          */
        [property: string]: any;
    }
    /**
      * 2D coordinate.
      */
    interface InvalidContract {
        /**
          * true if invalid; otherwise, false.
          */
        invalid?: boolean;
        /**
          * Message.
          */
        message?: string;
        /**
          * The property.
          */
        [property: string]: any;
    }
    /**
      * 2D coordinate.
      */
    interface PlaneCoordinate {
        /**
          * X for horizontal.
          */
        x: number;
        /**
          * Y for vertical.
          */
        y: number;
    }
    /**
      * 3D coordinate.
      */
    interface StereoscopicCoordinate extends PlaneCoordinate {
        /**
          * Z for height.
          */
        z: number;
    }
    /**
      * 4D coordinate.
      */
    interface SpacetimeCoordinate extends StereoscopicCoordinate {
        /**
          * T for time.
          */
        t: number;
    }
    interface PositionContract {
        top: number;
        right: number;
        bottom: number;
        left: number;
    }
    /**
      * Date time options.
      */
    interface DateTimeOptionsContract {
        force24h?: boolean;
        precision?: TimePrecisions;
    }
    /**
      * Time span.
      */
    interface TimeSpanContract {
        Days: number;
        Hours: number;
        Minutes: number;
        Seconds: number;
        Milliseconds: number;
    }
    /**
      * The sensitive levels.
      */
    enum SensitiveLevels {
        Unknown = 0,
        Hbi = 1,
        Mbi = 2,
        Lbi = 3,
        None = 7,
    }
    /**
      * The time precisions.
      */
    enum TimePrecisions {
        Unknown = 0,
        Millisecond = 1,
        Second = 2,
        Minute = 3,
        Hour = 4,
        Day = 5,
    }
    /**
      * Visual control.
      */
    class VisualControl implements Common.DisposableContract {
        private _increaseNumber;
        private _increaseNumberReset;
        private _containerElement;
        private _properties;
        private _propertyHandlers;
        private _templateParts;
        /**
          * Adds or removes an event occured when the property is changed.
          */
        propChanged: Collection.EventHandlers<Collection.ValueChangedContract<any>>;
        /**
          * Initializes a new instance of the VisualControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        constructor(id: VisualControlElementContract);
        /**
          * Gets the identifier.
          */
        getId(): string;
        /**
          * Gets a number increased.
          */
        increaseNumber(doNothingWhenTooLarge?: boolean): number;
        /**
          * Gets a value indicating whether the increased number has been reset.
          */
        increaseNumberIsReset(): boolean;
        /**
          * Gets the control element.
          */
        getElement(): HTMLElement;
        /**
          * Gets the tag name of the control element.
          */
        getTagName(): string;
        /**
          * Gets the control element.
          */
        dispose(): void;
        /**
          * Gets or sets the specific additional property.
          * @param key  The property name.
          * @param value  The value of the property to set if has.
          */
        prop(name: string, value?: any): any;
        /**
          * Removes the specific additional property.
          * @param key  The property name.
          */
        removeProp(name: string): any;
        /**
          * Gets the specific additional property.
          * @param key  The property name.
          * @param includeInherit  A value indicating whether try to get from parent if it does not exist in current control.
          */
        getProp(name: string, includeInherit?: boolean): any;
        /**
          * Gets the specific additional property.
          * @param key  The property name.
          * @param defaultFunc  A function to generate devault value if there is no such property.
          * @param defaultStaticValue  A static value for default.
          */
        getPropWithDefaultValue(name: string, defaultFunc?: (c: VisualControl, key: string) => any, defaultStaticValue?: any): any;
        /**
          * Gets or sets the specific additional property.
          * @param key  The property name.
          * @param value  The value of the property to set if has.
          */
        propKeys(includeInherit?: boolean): string[];
        /**
          * Gets a copy of additional properties.
          */
        propObj(): any;
        /**
          * Registers handler for a specific additional property changed.
          */
        listenProp(key: string, ...h: Common.Action1<Collection.ValueChangedContract<any>>[]): number;
        /**
          * Removes handler registered for a specific additional property changed.
          */
        unlistenProp(key: string, ...h: Common.Action1<Collection.ValueChangedContract<any>>[]): number;
        /**
          * Clears all handlers registered for a specific additional property changed.
          */
        clearListenProp(key: string, ...h: Common.Action1<Collection.ValueChangedContract<any>>[]): number;
        /**
          * Modifies class.
          * @param adding  A list of class to add.
          * @param removing  A list of class to remove.
          */
        styleRef(adding?: string | string[], removing?: string | string[], ...childId: string[]): string[];
        /**
          * Adds class.
          * @param value  A list of class to add.
          */
        addStyleRef(...value: string[]): string[];
        /**
          * Removes class.
          * @param value  A list of class to remove.
          */
        removeStyleRef(...value: string[]): string[];
        /**
          * Change style property.
          * @param key  Style property key.
          * @param value  Style property value.
          */
        styleProp(key: string, value?: string): string;
        /**
          * Gets parent control.
          */
        parentControl<T extends VisualControl>(): T;
        /**
          * Gets parent element.
          */
        parentElement(): HTMLElement;
        /**
          * Gets parent node.
          */
        parentNode(): Node;
        /**
          * Gets or sets template part.
          * @param key  The key.
          */
        templatePart(key: string, value?: string): string;
        /**
          * Loads specific options.
          * @param options  The options to load.
          */
        loadOptions(value: VisualControlOptionsContract<any> | boolean | Func<VisualControlOptionsContract<any>>): any;
        /**
          * Appends an element as child.
          * @param child  An element to add; or tag name of element to add.
          */
        appendElement<T extends Element>(child: T | string, idSuffix?: string, styleRef?: string | string[]): T;
        /**
          * Appends elements as child.
          * @param children  The element definitions to add.
          */
        appendElementByDef(...children: Elements.SubElementDefinitionContract[]): HTMLElement[];
        /**
          * Appends elements as child to a specific child.
          * @param idSuffix  The identifier suffix.
          * @param children  The element definitions to add.
          */
        appendElementByDefToChild(idSuffix: string, ...children: Elements.SubElementDefinitionContract[]): HTMLElement[];
        /**
          * Checks whether has the attribute.
          * @param name  the attribute name.
          */
        hasAttr(name: string, dataPrefix?: boolean, ...childId: string[]): boolean;
        /**
          * Gets the specific element attribute.
          * @param name  the attribute name.
          */
        getAttr(name: string, dataPrefix?: boolean, ...childId: string[]): string;
        /**
          * Gets or sets element attribute.
          * @param name  the attribute name.
          */
        attr(name: string, value?: string, ...childId: string[]): string;
        /**
          * Registers an event handler after a specific attribute changed.
          * @param name  the attribute name.
          * @param h  the event handler to add.
          */
        attrChanged(name: string, h: Common.Action1<string>, ...childId: string[]): DisposableContract;
        /**
          * Gets element attribute object.
          * @param name  the attribute name.
          * @param dataPrefix  a value indicating whether use "data-" prefix for optional.
          */
        parseAttr<T>(name: string, dataPrefix?: boolean): T;
        /**
          * Listens attributes changes of a specific element to an object.
          * @param name  the attribute name.
          * @param obj  the object to bind.
          * @param ignoreUndefined  a value indicating whether need ignore undefined.
          * @param dataPrefix  a value indicating whether use "data-" prefix for optional.
          */
        listenAttr(name: string | string[], obj: any, ignoreUndefined?: boolean, dataPrefix?: boolean, ...childId: string[]): DisposableContract;
        /**
          * Adds an event handler to current control.
          * @param eventType  the type of event.
          * @param h  the event handler to add.
          */
        listen(eventType: string, h: (ev: Event) => void, ...childId: string[]): void;
        /**
          * Adds gesture handlers to current control.
          * @param options  the options.
          */
        addGesture(options: Elements.GestureActionOptionsContruct, ...childId: string[]): void;
        /**
          * Adds gesture handlers to current control.
          * @param options  the options.
          */
        onClick(options: Elements.ClickOptionsContract, ...childId: string[]): void;
        /**
          * Adds a shortcut key for given element.
          * @param options  The shortcut key options.
          */
        shortcutKey(options: Elements.ShortcutKeyOptionsContract, ...childId: string[]): void;
        /**
          * Gets the size of specific element.
          */
        getSize(...childId: string[]): PlaneCoordinate & Common.InvalidContract;
        /**
          * Gets the position of the specific element in document.
          */
        getPosition(...childId: string[]): Common.PlaneCoordinate & Common.InvalidContract;
        /**
          * Gets the position of the mouse in specific element or document.
          */
        getMousePosition(...childId: string[]): Common.PlaneCoordinate & Common.InvalidContract;
        /**
          * Clears the control.
          */
        clear(): void;
        /**
          * Gets a child HTML element.
          * childId  The child id suffix, resolver will merge the prefix by current control id automatically; true if use current control identifier as prefix; otherwise, false.
          * appendingIdParts  the additional identifier parts.
          */
        getChildElement<T extends HTMLElement>(childId: boolean | string, ...appendingIdParts: string[]): T;
        /**
          * Gets child HTML elements.
          * tagName  An optional tag name for filter.
          */
        getChildElements(tagName?: string | string[]): Element[];
        /**
          * Gets a child control.
          * childId  The child id suffix, resolver will merge the prefix by current control id automatically; true if use current control identifier as prefix; otherwise, false.
          * appendingIdParts  the additional identifier parts.
          */
        getChildControl<T extends VisualControl>(childId: boolean | string, ...appendingIdParts: string[]): T;
        /**
          * Creates a control as child.
          * @param id  The identifier.
          * @param control  The type of the control to append.
          * @param options  The options to load.
          * @param tag  The tag name of element to fill the control.
          */
        createControl(idSuffix: string, control: typeof VisualControl, options?: VisualControlOptionsContract<VisualControl>, tag?: string): VisualControl;
        /**
          * Adds a control as child.
          * @param id  The identifier.
          * @param control  The control factory.
          * @param tag  The tag name of element to fill the control.
          */
        addControl<T extends VisualControl>(idSuffix: string, control: Func2<HTMLElement, VisualControl, T>, tag?: string): T;
        /**
          * Gets or sets inner HTML.
          * @param value  The inner HTML to set.
          */
        innerHTML(value?: string): string;
        /**
          * Gets computed style.
          */
        computedStyle(pseudoElt?: string, ...childId: string[]): CSSStyleDeclaration;
        /**
          * Gets matched CSS rules.
          */
        styleRefRules(pseudoElt?: string, ...childId: string[]): CSSRuleList;
        /**
          * Requests full screen.
          */
        fullScreen(...childId: string[]): void;
        /**
          * Gets or sets the language.
          * @param value  The inner HTML to set.
          */
        lang(value?: string, ...childId: string[]): string;
        /**
          * Scrolls to specific position.
          * @param x  Left in pixel.
          * @param y  Top in pixel.
          */
        scrollTo(x?: number, y?: number): void;
    }
    /**
      * Controls manager.
      */
    class ControlManager {
        private static _initializers;
        static initializers(): ObjectProcessingTask<VisualControl>[];
    }
    /**
      * Reflection utilities.
      */
    class Reflection {
        /**
          * Copies an object.
          * @param html  The object to copy.
          */
        static copy<T>(obj: T): T;
        static addProperties(target: any, properties: any, override?: boolean): void;
        /**
          * Gets identifier from a entry.
          * @param model  The entry.
          * @param h  An optional handler to resolve identifier from the entry.
          */
        static getId<T extends IdentifiedContract>(model: string | number | T, h?: Action1<T>): string;
        /**
          * Extends a class.
          * @param derivedClass  The derived class.
          * @param baseClass  The base class.
          */
        static extend(derivedClass: any, baseClass: any): void;
        /**
          * Unwraps object.
          * @param value  The object wrapped.
          * @param count  An optional value of maximum depth.
          */
        static unwrapObject<T>(value: T | Func<T>, thisArg?: any, count?: number): T;
        /**
          * Creates an empty disposable object.
          * @param obj  An additional information to copy.
          */
        static emptyDisposable(obj?: any): DisposableContract;
        static callMethod(obj: any, method: string, ...args: any[]): any;
        static getProperty(obj: any, ...prop: (string | number)[]): any;
        static setProperty(value: any, obj: any, ...prop: (string | number)[]): boolean;
        static toIntroHTML(obj: any, iip?: number, firstI?: boolean, singleQuote?: boolean, thisStr?: string): string;
    }
    /**
      * Binding convertion.
      */
    class BindingConvertion<T> {
        private _model;
        constructor(model: T | AliHub.Common.Func<T>);
        /**
          * Gets model.
          */
        model(): T;
    }
    /**
      * Binding property bag.
      */
    class BindingPropertyBag {
        private _properties;
        /**
          * Raises on property changed.
          */
        propChanged: Collection.EventHandlers<Collection.ValueChangedContract<any>>;
        bindStr(): AliHub.Common.BindingObjectContract<string>;
        bindObj<T>(): AliHub.Common.BindingObjectContract<T>;
        initProp(...keys: string[]): void;
        /**
          * Sets a property.
          * @param key  The property key.
          * @param value  The value of the property.
          */
        setProp(key: string, value: any): void;
        loadObj(obj: any, properties?: string[]): void;
        initArray(...keys: string[]): void;
        /**
          * Sets an array.
          * @param key  The property key.
          * @param value  The array value of the property.
          */
        setArray<T>(key: string, col: Array<T>): void;
        /**
          * Pushes items to an array property.
          * @param key  The property key.
          * @param items  The items to push.
          */
        pushArrayItem<T>(key: string, ...items: T[]): Array<T>;
        /**
          * Gets the property value.
          * @param key  The property key.
          */
        getProp<T>(key: string): T;
        /**
          * Gets the observable object the property.
          * @param key  The property key.
          */
        getPropSource<T>(key: string): Common.BindingObjectContract<T>;
        propertyNames(): string[];
        unwrap<T>(count?: number): T;
        private _regProp(name);
    }
    /**
      * Binding object.
      */
    class BindingObject<T> {
        private _raw;
        changed: Collection.EventHandlers<ValueChangedArgsContract<T>>;
        /**
          * Gets the value.
          */
        get_value(): T;
        /**
          * Sets the value.
          * @param value  The value to set.
          */
        set_value(value: T): void;
        /**
          * Gets the observable object.
          */
        toObservable(): BindingObjectContract<T>;
        private _getChangedArgs(oldValue, event);
    }
    /**
      * Binding control.
      */
    class BindingControl<T> extends VisualControl implements BindingContainerContract<T> {
        private _model;
        private _info;
        private _extenders;
        private _convertor;
        private _converted;
        private _extendersLoaded;
        private _bindingControls;
        private _templateEngine;
        private _modelDispose;
        viewModelChanged: Collection.EventHandlers<Collection.PropertyItemContract<T>>;
        convertedChanged: Collection.EventHandlers<Collection.PropertyItemContract<any>>;
        convertorChanged: Collection.EventHandlers<Collection.PropertyItemContract<Func1<T, any>>>;
        infoChanged: Collection.EventHandlers<Collection.PropertyItemContract<any>>;
        /**
          * Initializes a new instance of the BindingControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        constructor(id: VisualControlElementContract);
        /**
          * Raises on binding error.
          * @param errorMessage  The error message.
          */
        onBindingError(errorMessage: string): boolean;
        /**
          * Gets or sets templete engine.
          * @param value  The templete engine type.
          */
        templateEngine(name?: string): string;
        /**
          * Sets the template.
          * @param valueType  The data source type for the value.
          * @param value  The data source value.
          */
        setTemplate(valueType: string, value: string): void;
        /**
          * Gets or sets the view model.
          * @param value  Model value to set; or ignore this parameter, if just resolve model.
          * @param binding  An optional flag to indicate whether the given binding value is to replace old one.
          */
        viewModel(value?: T): T;
        /**
          * Sets the view model from web.
          * @param subject  The subject of data resolver registered.
          * @param key  The key of data resolver.
          */
        setViewModelFromWeb(subject: string, key: string | Web.BaseDataPackageResolver<T>, parameters?: any): Web.ResponseTask<T>;
        /**
          * Binds the view model.
          * @param value  Model value observable object to bind.
          */
        bindViewModel(value: BindingObjectContract<T>): void;
        /**
          * Subscribe view model changed.
          * @param h  Callback during value has been changed.
          * @param target  The "this" target of h callback.
          */
        subscribeViewModel(h: (newValue: T) => void, target?: any): DisposableContract;
        /**
          * Gets observable view model.
          */
        observableViewModel(): BindingObjectContract<T>;
        /**
          * Gets or sets the additional information.
          * @param value  The additional information value to set; or ignore this parameter, if just resolve the additional information.
          */
        info(value?: any): any;
        /**
          * Sets the additional information.
          * @param value  The additional information value to set; or ignore this parameter, if just resolve the additional information.
          */
        setInfo(value: any): void;
        /**
          * Gets or sets the convertor.
          * @param value  The convertor to set; or ignore this parameter, if just resolve the convertor.
          */
        convertor(h?: Func1<T, any>): Func1<T, any>;
        /**
          * Sets the convertor.
          * @param value  The convertor to set; or ignore this parameter, if just resolve the convertor.
          */
        setConvertor(h?: Func1<T, any>): void;
        /**
          * Gets or sets the converted value.
          */
        converted(): any;
        /**
          * Gets observable converted model.
          */
        observableConverted(): BindingObjectContract<any>;
        /**
          * Updates the converted value.
          */
        updateConverted(): any;
        /**
          * Sets view model as null.
          */
        clearViewModel(): void;
        /**
          * Listens model changes.
          * @param obj  the object to bind.
          */
        listenModel(obj: any, proc?: Action1<Function>, ignoreFirstProc?: boolean): Collection.DisposableArray;
        /**
          * Refreshes view.
          */
        refresh(): void;
        /**
          * Loads specific options.
          * @param options  The options to load.
          */
        loadOptions(value: BindingControlOptionsContract<T> | boolean): any;
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
        addExtender(value: BindingControlExtender<T> | BindingControlExtender<T>[]): void;
        /**
          * Removes a specific extender.
          * @param name  The extender name.
          */
        removeExtender(name: string): void;
        /**
          * Updates extenders.
          */
        updateExtenders(): void;
        /**
          * Clears all extenders registered.
          */
        clearExtenders(): void;
        /**
          * Creates a binding control as child with current binding.
          */
        addBindingControl(idSuffix: string, templateKey: string, templateValue: string, override?: boolean, h?: AliHub.Common.Action1<AliHub.Common.BindingControl<T>>): BindingControl<T>;
        /**
          * Gets a specific child binding control.
          */
        getBindingControl(key: string): AliHub.Common.BindingControl<T>;
        private _updateConverted(model);
        private _getBindingControl(key);
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
          * Raised on changing.
          */
        changing: Collection.EventHandlers<Collection.ValueChangedContract<ControlInfoContract>>;
        /**
          * Raised on changed.
          */
        changed: Collection.EventHandlers<ControlInfoContract>;
        /**
          * Initializes a new instance of the ActivityControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        constructor(id: VisualControlElementContract);
        /**
          * Gets the length of all including cached.
          */
        length(): number;
        /**
          * Gets current index.
          */
        index(): number;
        /**
          * Gets current information.
          */
        current(): ControlInfoContract;
        /**
          * Gets current control.
          */
        currentControl(): VisualControl;
        /**
          * Gets current item model.
          */
        currentItemModel(): any;
        /**
          * Adds a control by a factory.
          * @param control  The optional control factory.
          */
        add(control?: Func1<HTMLElement, VisualControl>, model?: any, h?: Action1<VisualControl>): ControlInfoContract;
        /**
          * Gets item info.
          * @param control  The item to get.
          */
        getItem(control: VisualControl | string | number): ControlInfoContract;
        /**
          * Gets previous item.
          */
        getPrevious(): ControlInfoContract;
        /**
          * Gets all items.
          */
        items(): ControlInfoContract[];
        /**
          * Turns to a specific control.
          * @param control  The control or key.
          */
        turnTo(control: VisualControl | string | number): ControlInfoContract;
        /**
          * Turns back.
          * @param step  An option step to back.
          */
        back(step?: number): ControlInfoContract;
        /**
          * Loads specific options.
          * @param options  The options to load.
          */
        loadOptions(value: ActivityControlOptionsContract | boolean): any;
        private _turnTo(index);
    }
    /**
      * Gets a handler to manage a continuity task.
      * @param options  The options.
      */
    function getContinuityTask(options: ContinuityTaskOptionsContract): Action;
    /**
      * Creates deferred object.
      */
    function deferred<T>(): DeferredContract<T>;
    /**
      * Rejects deferred.
      */
    function rejectDeferred(deferred: any, message: string, info?: any, inner?: any): any;
    /**
      * Listens model changes for binding control.
      * @param control  the source control.
      * @param obj  the object to bind.
      */
    function listenBindingControl(control: VisualControl & BindingContainerContract<any>, obj: any, proc?: Action1<Function>, ignoreFirstProc?: boolean): Collection.DisposableArray;
    /**
      * Sets the default binding factory instance.
      * @param factory  The binding factory instance.
      */
    function bindingFactory(value?: BindingFactoryContract, forNullOnly?: boolean): BindingFactoryContract;
    /**
      * Creates a binding object.
      * @param value  The value if need fill initially.
      */
    function bindingObj<T>(value?: T): BindingObjectContract<T>;
    /**
      * Creates a listened object.
      * @param value  The value if need fill initially.
      */
    function listenedObj<T>(value?: T): ListenedObjectContract<T>;
    function entityBinding<T>(resolve: Common.Func1<string, T>, id?: string): EntityBindingContract<T>;
    /**
      * Creates a binding array.
      * @param col  The array if need fill initially.
      */
    function bindingArray<T>(col?: T[]): Collection.BindingArrayContract<T>;
    /**
      * Applies binding for view.
      * @param viewModel  The view model.
      * @param element  The element to bind.
      */
    function applyBindings(control: VisualControl & BindingContainerContract<any>): void;
    /**
      * Applies binding for view.
      * @param name  The name of template engine.
      * @param value  The template engine to register.
      */
    function setTemplateEngine(name: string, value: Common.Action1<VisualControl & BindingContainerContract<any>>): void;
    /**
      * Applies binding for view.
      * @param name  The name of template engine.
      */
    function removeTemplateEngine(name: string): void;
    /**
      * Applies a view template with a view model.
      * @param id  The element identifier.
      * @param valueType  The template source type.
      * @param value  The template source value.
      * @param bindings  The view model.
      * @param onerror  The handler to raised on error. The exception message will be provided; a value indicating whether need throw is expected to return.
      */
    function applyTemplate(type: string, control: VisualControl & BindingContainerContract<any>, valueType: string, value: string, onerror: Func1<string, boolean>): void;
    /**
      * Gets or sets the template engine.
      */
    function defaultTemplateEngine(value?: string): string;
    /**
      * Gets parent control.
      */
    function parentControl<T extends VisualControl>(element: HTMLElement | string | VisualControl): T;
    /**
      * Gets current control.
      */
    function currentControl<T extends VisualControl>(element: HTMLElement | string | VisualControl): T;
    /**
      * Fills a control in an element.
      * @param element  The element.
      * @param options  The options to load.
      */
    function fillControl<T extends Common.VisualControl>(element: HTMLElement | string, type?: string | typeof Common.VisualControl, options?: VisualControlOptionsContract<T> | boolean | Func<VisualControlOptionsContract<T>>): T;
    /**
      * Gets a specific control.
      * @param id  the element identifier or prefix.
      * @param appendingIdParts  the additional identifier parts.
      */
    function getControl<T extends VisualControl>(element: string | HTMLElement | Common.VisualControl | Document | Window | AliHub.Common.Func<HTMLElement> | AliHub.Common.Func<string> | AliHub.Common.Func<Common.VisualControl>, ...appendingIdParts: string[]): T;
    /**
      * Creates a control as child.
      * @param id  The identifier.
      * @param control  The type of the control to append.
      * @param parent  The parent control.
      */
    function createControl(id: string | HTMLElement, control?: typeof VisualControl, options?: VisualControlOptionsContract<any> | boolean | VisualControl | Func<VisualControlOptionsContract<any>>, parent?: VisualControl | VisualControlOptionsContract<VisualControl> | boolean): VisualControl;
    /**
      * Creates a VisualControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param options  The initializition options.
      * @param parent  The parent control.
      */
    function visualControl<T>(idSuffix: string | HTMLElement, options?: VisualControlOptionsContract<VisualControl> | boolean, parent?: VisualControl): VisualControl;
    /**
      * Creates a BindingControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param options  The initializition options.
      * @param parent  The parent control.
      */
    function bindingControl<T>(idSuffix: string | HTMLElement, options?: VisualControl | BindingControlOptionsContract<T> | boolean, parent?: VisualControl | BindingControlOptionsContract<T> | boolean): BindingControl<T>;
    /**
      * Creates a ActivityControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param options  The initializition options.
      * @param parent  The parent control.
      */
    function activityControl(idSuffix: string | HTMLElement, options?: ActivityControlOptionsContract | boolean, parent?: VisualControl): ActivityControl;
}
declare namespace AliHub.Data {
    /**
      * Data sources.
      */
    var Sources: any;
}
declare namespace AliHub.Collection {
    /**
      * Hash table.
      */
    interface HashTableContract {
        /**
          * Gets or sets value by key.
          */
        [key: string]: any;
    }
    /**
      * Dictionary.
      */
    interface DictionaryContract<T> {
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
        [property: string]: any;
    }
    interface MappingContract {
        [key: string]: string | string[];
    }
    interface MappedContract {
        map: MappingContract;
        [property: string]: any;
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
      * Selection changing value.
      */
    interface SelectChangedContract<T> {
        selectionMode: SelectionModes;
        toUnselected: T[];
        toSelected: T[];
        selected: T[];
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
      * Current changing count infor.
      */
    interface ChangedListContract<T> {
        /**
          * Items unchanged.
          */
        unchanged: T[];
        /**
          * Items added.
          */
        added?: T[];
        /**
          * Items removed.
          */
        removed?: T[];
        /**
          * Items modified.
          */
        modified?: T[];
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
      * Key value pair with string key.
      */
    interface PropertyItemContract<T> extends KeyValuePairContract<string, T> {
    }
    /**
      * Key value pairs.
      */
    interface KeyValuePairsContract<TKey, TValue> extends Array<KeyValuePairContract<TKey, TValue>> {
    }
    /**
      * Properties.
      */
    interface PropertiesContract<T> extends KeyValuePairsContract<string, T> {
    }
    /**
      * Strings properties.
      */
    interface StringPropertiesContract extends PropertiesContract<string> {
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
        /**
          * Property.
          */
        [key: string]: any;
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
      * List organizing settings.
      */
    interface ListOrganizeSettingsContract<T> {
        /**
          * Tests whether one of entry should be displayed.
          * @param item  The item to test.
          */
        isVisible?(item: T): boolean;
        /**
          * Tests whether one of entry should be before another.
          * A string is support for auto testing the property, such as "created" or "!created" by desc.
          */
        isBefore?: Common.EquatableFunc<T> | string | boolean;
        /**
          * Tests whether the entries are in same group.
          * @param entryA  The entry to test.
          * @param entryB  The reference entry for comparing.
          */
        areInSameGroup?(entryA: T, entryB: T): boolean;
        /**
          * Checks whether contains the given entry by searching key and returns the index.
          * A string is support for auto testing the property, such as "id".
          */
        areSame?: Common.EquatableFunc<T> | string;
        /**
          * Merges changing.
          * @param entry  The new entry or the one with changing.
          * @param oldItem  The original item.
          */
        mergeChanging?(entry: T, oldItem: ListItemInfo<T>): T;
        /**
          * Checks whether the given item means it has been deleted.
          * @param entry  The entry to test.
          */
        isDeleted?(entry: T): boolean;
        /**
          * Gets group item info model.
          * @param info  The group item information.
          */
        getGroupModel?(info: GroupItemInfoContract<T>): any;
        /**
          * Tests given entry is valid.
          * @param entry  The entry to test.
          */
        valid?(entry: T): boolean;
        /**
          * Converts given entry to the one of target type.
          * @param entry  The entry to convert.
          */
        convert?(entry: T): any;
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
    interface TableCellArgContract {
        container: HTMLTableCellElement;
        value: any;
        column: TableColumnContract;
        row: any;
        [property: string]: any;
    }
    interface TableColumnArgContract {
        container: HTMLTableCellElement;
        column: TableColumnContract;
        [property: string]: any;
    }
    interface TableContract<T> {
        schema: TableColumnContract[];
        values: T[];
        statistics?: TableStatisticsContract;
        order?: string | Common.Func2<any, any, boolean>;
        key?: string | Common.Func2<any, any, boolean>;
        [property: string]: any;
    }
    interface DataTableRowContract {
        model: any;
        statistics?: PropertiesContract<any> | any[];
        items: PropertiesContract<any> | any[];
    }
    interface TableColumnContract {
        model: any;
        width?: number | string;
        styleRef?: string | string[];
        render?: Common.Action1<TableColumnArgContract>;
        valueRender?: Common.Action1<TableCellArgContract>;
        property: string;
        mapping: ReferenceMappingTypes | number;
        key?: string;
        [key: string]: any;
    }
    interface TableStatisticsContract {
        id?: string;
        name: string;
        values: PropertiesContract<any>;
    }
    interface SelectorItemContract {
        id: string;
        name: string;
        children?: SelectorItemContract[] | boolean;
    }
    interface ShiftChangingContract {
        user: string;
        shift: string;
        date: number;
        note: string;
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
        reverse(): BindingArrayContract<T>;
        sort(): BindingArrayContract<T>;
        sort(compareFunction: (left: T, right: T) => number): BindingArrayContract<T>;
    }
    /**
      * Grouped list contract.
      */
    interface GroupedListContract<T> {
        name: string;
        list: Collection.KeyValuePairContract<string, T>[];
    }
    /**
      * Web data resolver.
      */
    interface WebDataContract {
        subject?: string;
        key: string | Web.BaseDataPackageResolver<MappedContract>;
        propertyKey?: string;
        parameters?: any;
        clearBefore?: boolean;
        [key: string]: any;
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
        /**
          * Renders the list item.
          * @param list  The list control which requests to process this method.
          * @param item  The item to render.
          */
        renderItem?(list: ListControl<T>, item: ListItemInfo<T>): void;
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
      * Binding control options.
      */
    interface BindingControlOptionsContract<T> extends Common.VisualControlOptionsContract<BindingControl<T>> {
        /**
          * Template source type.
          */
        templateType?: string;
        /**
          * Template source value.
          */
        template?: string;
        /**
          * Convertor, a handler to convert view model to the one used for view.
          */
        convertor?: Common.Func1<T[], any>;
        /**
          * View model.
          */
        viewModel?: T[];
        /**
          * The extenders.
          */
        extender?: BindingControlExtender<T>[] | BindingControlExtender<T>;
        /**
          * Template engine name.
          */
        templateEngine?: string;
    }
    /**
      * List control options.
      */
    interface SwitchControlOptionsContract extends Common.VisualControlOptionsContract<SwitchControl> {
        /**
          * Template source type for tab item.
          */
        tabTemplateType?: string;
        /**
          * Template source value for tab item.
          */
        tabTemplate?: string;
        /**
          * Template engine name.
          */
        tabTemplateEngine?: string;
        /**
          * A value indicating whehter enables tab button which is used to switch related content views by clicking or tapping the tab.
          */
        tabButton?: boolean;
    }
    /**
      * List control options.
      */
    interface ListControlOptionsContract<T> extends Common.VisualControlOptionsContract<ListControl<T>> {
        /**
          * Template source type for entry.
          */
        itemTemplateType?: string;
        /**
          * Template source value for entry.
          */
        itemTemplate?: string;
        /**
          * Template engine name.
          */
        itemTemplateEngine?: string;
        /**
          * Template source type for group header.
          */
        headerTemplateType?: string;
        /**
          * Template source value for group header.
          */
        headerTemplate?: string;
        /**
          * Template engine name.
          */
        headerTemplateEngine?: string;
        /**
          * Template source type for empty message.
          * The part template key is "empty".
          */
        emptyMessageTemplateType?: string;
        /**
          * Template source value for empty message.
          */
        emptyMessageTemplate?: string;
        /**
          * Empty message view model.
          */
        emptyMessageViewModel?: any;
        /**
          * Template engine name.
          */
        emptyMessageTemplateEngine?: string;
        /**
          * Extenders.
          */
        extender?: ListExtender<T>[] | ListExtender<T>;
        /**
          * A value indicating whehter enables tiles view mode.
          */
        tilesView?: boolean;
        /**
          * Selection mode.
          */
        selectionMode?: SelectionModes;
        /**
          * Tests whether one of entry should be displayed.
          * @param item  The item to test.
          */
        isVisible?(item: T): boolean;
        /**
          * Tests whether one of entry should be before another.
          * A string is support for auto testing the property, such as "created" or "!created" by desc.
          */
        isBefore?: Common.EquatableFunc<T> | string;
        /**
          * Tests whether the entries are in same group.
          * @param entryA  The entry to test.
          * @param entryB  The reference entry for comparing.
          */
        areInSameGroup?(entryA: T, entryB: T): boolean;
        /**
          * Checks whether contains the given entry by searching key and returns the index.
          * A string is support for auto testing the property, such as "id".
          */
        areSame?: Common.EquatableFunc<T> | string;
        /**
          * Merges changing.
          * @param entry  The new entry or the one with changing.
          * @param oldItem  The original item.
          */
        mergeChanging?(entry: T, oldItem: ListItemInfo<T>): T;
        /**
          * Checks whether the given item means it has been deleted.
          * @param entry  The entry to test.
          */
        isDeleted?(entry: T): boolean;
        /**
          * Gets group item info model.
          * @param info  The group item information.
          */
        getGroupModel?(info: GroupItemInfoContract<T>): any;
        /**
          * Tests given entry is valid.
          * @param entry  The entry to test.
          */
        valid?(entry: T): boolean;
        /**
          * Converts given entry to the one of target type.
          * @param entry  The entry to convert.
          */
        convert?(entry: T): any;
        /**
          * Renders the list item.
          * @param list  The list control which requests to process this method.
          * @param item  The item to render.
          */
        renderItem?(list: ListControl<T>, item: ListItemInfo<T>): void;
        /**
          * Renders the group title.
          * @param list  The list control which requests to process this method.
          * @param info  The group item information argument.
          */
        renderGroupTitle?(list: ListControl<T>, info: GroupItemInfoContract<T>): void;
        /**
          * Web data resolver.
          */
        webData?: WebDataContract;
    }
    /**
      * Paging control options.
      */
    interface PagingControlOptionsContract extends Common.VisualControlOptionsContract<PagingControl> {
        /**
          * Template source value for selector.
          */
        selectorTemplate: any;
        /**
          * Template source type for selector.
          */
        selectorTemplateType: any;
        /**
          * Template source value for ellipsis zone.
          */
        ellipsisTemplate: any;
        /**
          * Template source type for ellipsis zone.
          */
        ellipsisTemplateType: any;
        /**
          * Template source value for function zone.
          */
        functionTemplate: any;
        /**
          * Template source type for function zone.
          */
        functionTemplateType: any;
        /**
          * Template source value for information zone.
          */
        infoTemplate: any;
        /**
          * Template source type for information zone.
          */
        infoTemplateType: any;
    }
    /**
      * Binding control options.
      */
    interface TableControlOptionsContract<T> extends Common.VisualControlOptionsContract<TableControl<T>> {
        /**
          * Table schema.
          */
        schema?: TableColumnContract[];
        /**
          * The rendering handler for cell.
          */
        renderCell?: (TableCellArgContract) => void;
        /**
          * The rendering handler for head cell.
          */
        renderHeadCell?: (TableColumnArgContract) => void;
        /**
          * Template source value for cell zone.
          */
        cellTemplate: string;
        /**
          * Template source type for cell zone.
          */
        cellTemplateType: string;
        /**
          * Convertor for cell.
          */
        cellConvertor: (model: any) => any;
        /**
          * Template source value for head cell zone.
          */
        headCellTemplate: string;
        /**
          * Template source type for head cell zone.
          */
        headCellTemplateType: string;
        /**
          * Convertor for head cell.
          * The part template key is "head".
          */
        headCellConvertor: (model: any) => any;
        /**
          * Template source type for empty message.
          * The part template key is "empty".
          */
        emptyMessageTemplateType?: string;
        /**
          * Template source value for empty message.
          */
        emptyMessageTemplate?: string;
        /**
          * Empty message view model.
          */
        emptyMessageViewModel?: any;
        /**
          * Web data resolver.
          */
        webData?: WebDataContract;
    }
    /**
      * Single flow panel control options.
      */
    interface SingleFlowControlOptionsContract<T> extends Common.VisualControlOptionsContract<SingleFlowControl<T>> {
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
    interface SwitchItemInfoContract {
        index: number;
        key: string;
        control: Common.VisualControl;
        model: any;
        options: SwitchItemOptionsContract;
        tab: Common.BindingControl<any>;
    }
    interface SwitchItemOptionsContract {
        background?: boolean;
        loaded?: Common.Action1<SwitchItemInfoContract>;
        shown?: Common.Action1<SwitchItemInfoContract>;
        hidden?: Common.Action1<SwitchItemInfoContract>;
    }
    /**
      * Table column types.
      */
    enum ReferenceMappingTypes {
        Property = 0,
        Id = 1,
        Key = 2,
        Index = 3,
        Function = 6,
        Static = 7,
    }
    /**
      * Table column types.
      */
    enum TableColumnTypes {
        None = 0,
        Property = 1,
        Item = 2,
        Statistics = 3,
        Index = 4,
        Action = 5,
        Decorator = 6,
        Other = 7,
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
    /**
      * Selection modes.
      */
    enum SelectionModes {
        /**
          * Selection is off.
          */
        None = 0,
        /**
          * Single item selection.
          */
        Single = 1,
        /**
          * Single item selection or empty.
          */
        SingleOrEmpty = 2,
        /**
          * Multiple selection.
          */
        Multiple = 3,
    }
    /**
      * Array binding control.
      */
    class BindingControl<T> extends Common.VisualControl implements Common.BindingContainerContract<T[]> {
        private _model;
        private _info;
        private _extenders;
        private _convertor;
        private _converted;
        private _extendersLoaded;
        private _templateEngine;
        private _modelDispose;
        viewModelChanged: EventHandlers<PropertyItemContract<T[]>>;
        convertedChanged: EventHandlers<PropertyItemContract<any>>;
        convertorChanged: EventHandlers<PropertyItemContract<Common.Func1<T[], any>>>;
        infoChanged: EventHandlers<PropertyItemContract<any>>;
        /**
          * Initializes a new instance of the ArrayBindingControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        constructor(id: Common.VisualControlElementContract);
        /**
          * Raises on binding error.
          */
        onBindingError(errorMessage: string): boolean;
        /**
          * Gets or sets templete engine.
          * @param value  The templete engine type.
          */
        templateEngine(name?: string): string;
        /**
          * Sets the template.
          * @param valueType  The data source type for the value.
          * @param value  The data source value.
          */
        setTemplate(valueType: string, value: string): void;
        /**
          * Gets or sets the view model.
          * @param value  Model value to set; or null, if just to resolve model.
          */
        viewModel(value?: T[]): T[];
        /**
          * Sets the view model from web.
          * @param subject  The subject of data resolver registered.
          * @param key  The key of data resolver.
          */
        setViewModelFromWeb(subject: string, key: string | Web.BaseDataPackageResolver<T[]>, parameters?: any): Web.ResponseTask<T[]>;
        /**
          * Subscribe view model changed.
          * @param h  Callback during value has been changed.
          * @param target  The "this" target of h callback.
          */
        subscribeViewModel(h: (newValue: T[]) => void, target?: any): Common.DisposableContract;
        /**
          * Gets observable view model.
          */
        observableViewModel(): BindingArrayContract<T>;
        /**
          * Gets or sets the additional information.
          * @param value  The additional information value to set; or ignore this parameter, if just resolve the additional information.
          */
        info(value?: any): any;
        /**
          * Sets the additional information.
          * @param value  The additional information value to set; or ignore this parameter, if just resolve the additional information.
          */
        setInfo(value: any): void;
        /**
          * Gets or sets the convertor.
          * @param value  The convertor to set; or ignore this parameter, if just resolve the convertor.
          */
        convertor(h?: Common.Func1<T[], any>): Common.Func1<T[], any>;
        /**
          * Sets the convertor.
          * @param value  The convertor to set; or ignore this parameter, if just resolve the convertor.
          */
        setConvertor(h: Common.Func1<T[], any>): void;
        /**
          * Gets the converted value.
          */
        converted(): any;
        /**
          * Updates the converted value.
          */
        updateConverted(): any;
        /**
          * Sets view model as null.
          */
        clearViewModel(): void;
        /**
          * Listens model changes.
          * @param obj  the object to bind.
          */
        listenModel(obj: any, proc?: Common.Action1<Function>, ignoreFirstProc?: boolean): Collection.DisposableArray;
        /**
          * Refreshes view.
          */
        refresh(): void;
        /**
          * Loads specific options.
          * @param value  The options to load.
          */
        loadOptions(value: BindingControlOptionsContract<T> | boolean): any;
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
        addExtender(value: BindingControlExtender<T> | BindingControlExtender<T>[]): void;
        /**
          * Removes a specific extender.
          * @param name  The extender name.
          */
        removeExtender(name: string): void;
        /**
          * Updates extenders.
          */
        updateExtenders(): void;
        /**
          * Clears all extenders registered.
          */
        clearExtenders(): void;
        private _updateConverted(model);
        private _loadExtenders();
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
          * Manual text notification.
          */
        notify: EventHandlers<KeyValuePairContract<string, string>>;
        /**
          * Sets reference instance property.
          * @param key  The property key.
          * @param value  The value of the property to set.
          */
        setProp(key: string, value: any): void;
        /**
          * Gets reference instance property.
          * @param key  The property key.
          */
        getProp<T>(key: string): T;
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
        private _itemTemplG;
        private _itemTemplT;
        private _itemTemplV;
        private _headerTemplG;
        private _headerTemplT;
        private _headerTemplV;
        private _extenders;
        private _references;
        private _selected;
        private _empty;
        /**
          * Raised on request update.
          */
        updateRequested: EventHandlers<Object>;
        /**
          * The handler raised on pushing entries.
          */
        entriesPushed: EventHandlers<T[]>;
        /**
          * The handler raised on items selected.
          */
        selected: EventHandlers<ValueChangedContract<T[]>>;
        /**
          * View model for the list.
          */
        viewModel: ListViewModelContract<T>;
        /**
          * Selection mode for user experience.
          */
        selectionMode: SelectionModes;
        /**
          * Initializes a new instance of the ListControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        constructor(id: Common.VisualControlElementContract);
        /**
          * Gets whether the list is empty to show.
          */
        isEmpty(): boolean;
        /**
          * Adds a reference.
          */
        addReference(...values: MappedContract[]): void;
        /**
          * Checks whehter there is a specific reference.
          */
        containReference(...value: MappedContract[]): boolean;
        /**
          * Removes a specific reference.
          */
        removeReference(...value: MappedContract[]): void;
        /**
          * Clears all references.
          */
        clearReference(): void;
        /**
          * Gets an entry by a specific reference item.
          */
        getEntry<TRes>(reference: Common.ReferenceItemContract): TRes;
        /**
          * Gets entries by a specific reference item.
          */
        getEntries<TRes>(reference?: Common.ReferenceItemContract): TRes[];
        /**
          * Selects one or more entries.
          * @param entry  The entry to select.
          */
        select(...entry: T[]): void;
        /**
          * Unselects one or more entries.
          * @param entry  The entry to unselect.
          */
        unselect(...entry: T[]): void;
        /**
          * Changes selection.
          * @param adding  The entry to select.
          * @param removing  The entry to unselect.
          * @param clearAction  A value indicating whether need clear before selection changing action.
          */
        changeSelection(adding: T[], removing?: T[], clearAction?: boolean): void;
        /**
          * Clears all selection.
          */
        clearSelection(): void;
        /**
          * Checks whether an entry is selected.
          * @param entry  The entry to test.
          */
        isSelected(entry: T): boolean;
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
        addExtender(value: ListExtender<T> | ListExtender<T>[]): void;
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
          * Batch pushes a colletion from web.
          * @param subject  The subject of data resolver registered.
          * @param key  The key of data resolver.
          */
        pushFromWeb(subject: string, key: string | Web.BaseDataPackageResolver<T>, parameters?: any, clearBefore?: boolean): Web.ResponseTask<T>;
        /**
          * Batch pushes a colletion from web.
          * @param subject  The subject of data resolver registered.
          * @param key  The key of data resolver.
          */
        pushRangeFromWeb(subject: string, key: string | Web.BaseDataPackageResolver<T[]>, parameters?: any, clearBefore?: boolean): Web.ResponseTask<T[]>;
        /**
          * Batch pushes a colletion from web.
          * @param subject  The subject of data resolver registered.
          * @param key  The key of data resolver.
          * @param propertyKey  The property key to get collection in the resource object.
          */
        pushResourceFromWeb(subject: string, key: string | Web.BaseDataPackageResolver<MappedContract>, propertyKey: string, parameters?: any, clearBefore?: boolean): Web.ResponseTask<MappedContract>;
        /**
          * Reloads the list.
          */
        refresh(): void;
        /**
          * Loads specific options.
          * @param value  The options to load.
          */
        loadOptions(value: ListControlOptionsContract<T> | boolean): any;
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
          * Sets the view template of each group header.
          * @param sourceType  The type of view template source.
          * @param sourceValue  The value of view template source.
          */
        setHeaderTemplate(sourceType: string, sourceValue: string): void;
        /**
          * Clears the view template of each group header.
          */
        clearHeaderTemplate(): void;
        /**
          * Sets the view template of the empty message.
          * @param sourceType  The type of view template source.
          * @param sourceValue  The value of view template source.
          */
        setEmptyMessageTemplate(sourceType: string, sourceValue: string, viewModel?: any): void;
        /**
          * Gets or sets empty mesaage view model.
          */
        emptyMessageViewModel<T>(viewModel?: T): T;
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
          * Copies entries.
          */
        copyEntries(): T[];
        /**
          * Performs the specified action for each element in this list.
          * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
          * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
          */
        forEachItem(callbackfn?: (value: ListItemInfo<T>, index: number, array: ListItemInfo<T>[]) => void): number;
        /**
          * Returns the position of the first occurrence of a substring.
          * @param item  An item to find.
          * @param compare  An additional comparation handler.
          * @param action  An additional action handler for specific item searched.
          */
        itemIndexOf<TItem>(item: TItem, compare?: Common.Func2<T, TItem, boolean>, action?: Common.Action1<ListItemInfo<T>>): number;
        /**
          * Determines whether the specified callback function returns true for any element of an array.
          * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
          * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
          */
        firstItem(callbackfn?: (value: ListItemInfo<T>, index: number, array: ListItemInfo<T>[]) => boolean): ListItemInfo<T>;
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
        private _changeSelection(adding, removing);
        private _push(entry);
        private _changeElementSelection(info);
        private _insert(item);
        private _getItemControl(tile);
        private _update(entry, position);
    }
    /**
      * Single flow panel control.
      */
    class SingleFlowControl<T> extends Common.VisualControl {
        private _content;
        private _contentId;
        private _sideBarId;
        private _sidebar;
        private _counter;
        /**
          * Initializes a new instance of the SingleFlowControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        constructor(id: Common.VisualControlElementContract);
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
        private _renderLayoutTable();
    }
    /**
      * Resource path.
      */
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
    /**
      * Ticket list view model.
      */
    class ConfigurableListViewModel<T> implements AliHub.Collection.ListViewModelContract<T> {
        private _settings;
        /**
          * Initializes a new instance of the ConfigurableListViewModel class.
          * @param settings  The settings.
          */
        constructor(settings: ListOrganizeSettingsContract<T>);
        /**
          * Tests whether one of entry should be displayed.
          * @param list  The list control which requests to process this method.
          * @param item  The item to test.
          */
        isVisible(list: ListControl<T>, item: T): boolean;
        /**
          * Tests whether one of entry should be before another.
          * @param list  The list control which requests to process this method.
          * @param entryA  The entry to test.
          * @param entryB  The reference entry for comparing.
          */
        shouldBeBefore(list: ListControl<T>, entryA: T, entryB: T): boolean;
        /**
          * Tests whether the entries are in same group.
          * @param list  The list control which requests to process this method.
          * @param entryA  The entry to test.
          * @param entryB  The reference entry for comparing.
          */
        areInSameGroup(list: ListControl<T>, entryA: T, entryB: T): boolean;
        /**
          * Checks whether contains the given entry by searching key and returns the index.
          * @param list  The list control which requests to process this method.
          * @param entry  The entry to test.
          */
        containsItem(list: ListControl<T>, entry: T): number;
        /**
          * Merges changing.
          * @param list  The list control which requests to process this method.
          * @param entry  The new entry or the one with changing.
          * @param oldItem  The original item.
          */
        mergeChanging(list: ListControl<T>, entry: T, oldItem: ListItemInfo<T>): T;
        /**
          * Checks whether the given item means it has been deleted.
          * @param list  The list control which requests to process this method.
          * @param entry  The entry to test.
          */
        isDeleted(list: ListControl<T>, entry: T): boolean;
        /**
          * Gets group item info model.
          * @param list  The list control which requests to process this method.
          * @param info  The group item information.
          */
        getGroupModel(list: ListControl<T>, info: GroupItemInfoContract<T>): any;
        /**
          * Tests given entry is valid.
          * @param list  The list control which requests to process this method.
          * @param entry  The entry to test.
          */
        valid(list: ListControl<T>, entry: T): boolean;
        /**
          * Converts given entry to the one of target type.
          * @param list  The list control which requests to process this method.
          * @param entry  The entry to convert.
          */
        convert(list: ListControl<T>, entry: T): any;
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
        /**
          * Additional binding information.
          */
        info: Common.BindingObjectContract<{}>;
        /**
          * Initializes a new instance of the PagingControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        constructor(id: Common.VisualControlElementContract);
        viewModel(value?: PagingViewModelContract): PagingViewModelContract;
        /**
          * Loads specific options.
          * @param value  The options to load.
          */
        loadOptions(value: PagingControlOptionsContract | boolean): any;
        /**
          * Gets or sets pages count.
          * @param value  Page count.
          */
        total(value?: number): number;
        /**
          * Gets or sets page index.
          * @param value  Page index.
          */
        index(value?: number, raise?: boolean): number;
        aroundCount(value?: number): number;
        /**
          * Gets page data model.
          * @param index  Page index.
          */
        getPageModel(index: number): any;
        /**
          * Gets page informatino.
          * @param index  Page index.
          */
        getPageInfo(index: number): PagingInfoContract;
        /**
          * Refreshes.
          */
        refresh(): void;
        setSelectorTemplate(valueType: string, value: string): void;
        setEllipsisTemplate(valueType: string, value: string): void;
        setFunctionTemplate(valueType: string, value: string): void;
        setInfoTemplate(valueType: string, value: string): void;
        isValidIndex(index: number): boolean;
        /**
          * Turns to the specific page.
          * @param key  Page index or keyword of page, e.g. first, previous, next, last, refresh.
          */
        turnTo(key: string | number): number;
        private _formatKey(key);
        private _getPageInfo(index);
        private _refreshSelector();
        private _generateEllipsis(parent, partName);
        private _generateFuncPart(key, parent);
        private _generatePageSelector(index, parent, selected?);
    }
    /**
      * Active item monitor.
      */
    class ActiveItemMonitor {
        private _col;
        private _index;
        /**
          * Raised on switched.
          */
        switched: EventHandlers<Common.ActiveItemContract>;
        add(value: Common.ActiveItemContract, isBg?: boolean): Common.ActiveItemContract;
        getIndex(item?: Common.ActiveItemContract | number): number;
        getItem(item: Common.ActiveItemContract | number): Common.ActiveItemContract;
        remove(item?: Common.ActiveItemContract | number, turnNext?: boolean): void;
        clear(): void;
        turnTo(item: Common.ActiveItemContract | number): Common.ActiveItemContract;
        private _turnTo(index);
    }
    /**
      * Switch control.
      */
    class SwitchControl extends Common.VisualControl {
        private _count;
        private _col;
        private _index;
        private _tabs;
        private _tabTempT;
        private _tabTempV;
        private _tabTempG;
        /**
          * Raised on switched.
          */
        switched: EventHandlers<SwitchItemInfoContract>;
        /**
          * A value indicating whether enable tab button for switching.
          */
        tabButton: boolean;
        /**
          * A value indicating whether turn back to first tab.
          */
        backToFirst: boolean;
        /**
          * Initializes a new instance of the SwitchControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        constructor(id: Common.VisualControlElementContract);
        setTabTemplate(valueType: string, value: string): void;
        clearTabTemplate(): void;
        /**
          * Adds a control by a factory.
          * @param control  The optional control factory.
          * @param model  The optional model.
          * @param h  The handler to fill additional information to the control.
          * @param isBg  A value indicating whether this is a background action.
          */
        add(control?: Common.Func1<HTMLElement, Common.VisualControl>, model?: any, options?: SwitchItemOptionsContract): Common.VisualControl;
        getIndex(control?: Common.VisualControl | string | number): number;
        getControl(control?: Common.VisualControl | string | number): Common.VisualControl;
        getItemModel(control?: Common.VisualControl | string | number): any;
        getItem(control?: Common.VisualControl | string | number): SwitchItemInfoContract;
        /**
          * Gets the size of tabs bar.
          */
        getTabsSize(): Common.PlaneCoordinate & Common.InvalidContract;
        /**
          * Turns to a specific control.
          * @param control  The control or key.
          */
        turnTo(control: Common.VisualControl | string | number): Common.VisualControl;
        /**
          * Gets item info.
          * @param control  The item to get.
          */
        items(): SwitchItemInfoContract[];
        remove(control: Common.VisualControl | string | number): void;
        clear(): void;
        hideAll(): void;
        /**
          * Loads specific options.
          * @param value  The options to load.
          */
        loadOptions(value: SwitchControlOptionsContract | boolean): any;
        private _turnTo(index);
    }
    /**
      * Table control.
      */
    class TableControl<T> extends Common.VisualControl {
        private _options;
        private _cellTemplate;
        private _cellTemplateType;
        private _headCellTemplate;
        private _headCellTemplateType;
        private _references;
        private _empty;
        cellConvertor: (model: any) => any;
        headCellConvertor: (model: any) => any;
        renderingHeadCell: EventHandlers<TableColumnArgContract>;
        renderingCell: EventHandlers<TableCellArgContract>;
        /**
          * Initializes a new instance of the SwitchControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        constructor(id: Common.VisualControlElementContract);
        /**
          * Sets schema information.
          * @param value  The schema.
          * @param reload  A value indicating whether need reload the table.
          */
        schema(value: TableColumnContract[], reload?: boolean): void;
        headCell(id: string | number | Common.Func<string> | Common.Func<number>): TableColumnContract;
        /**
          * Pushes a set of entries.
          * @param col  The collection to insert.
          */
        pushRange(col: T[]): T[];
        /**
          * Pushes a resource.
          * @param propertyKey  The property key to get collection in the resource object.
          * @param resource  A resource to push. Collection supported.
          */
        pushResource(propertyKey: string, ...resource: MappedContract[]): T[];
        /**
          * Batch pushes a colletion from web.
          * @param subject  The subject of data resolver registered.
          * @param key  The key of data resolver.
          */
        pushRangeFromWeb(subject: string, key: string | Web.BaseDataPackageResolver<T[]>, parameters?: any, clearBefore?: boolean): Web.ResponseTask<T[]>;
        /**
          * Batch pushes a colletion from web.
          * @param subject  The subject of data resolver registered.
          * @param key  The key of data resolver.
          * @param propertyKey  The property key to get collection in the resource object.
          */
        pushResourceFromWeb(subject: string, key: string | Web.BaseDataPackageResolver<MappedContract>, propertyKey: string, parameters?: any, clearBefore?: boolean, schemaKey?: string): Web.ResponseTask<MappedContract>;
        /**
          * Gets whether the list is empty to show.
          */
        isEmpty(): boolean;
        /**
          * Loads specific options.
          * @param value  The options to load.
          */
        loadOptions(value: TableControlOptionsContract<T> | boolean): any;
        setCellTemplate(valueType: string, value: string): void;
        setHeadCellTemplate(valueType: string, value: string): void;
        /**
          * Sets the view template of the empty message.
          * @param sourceType  The type of view template source.
          * @param sourceValue  The value of view template source.
          */
        setEmptyMessageTemplate(sourceType: string, sourceValue: string, viewModel?: any): void;
        /**
          * Gets or sets empty mesaage view model.
          */
        emptyMessageViewModel<T>(viewModel?: T): T;
        /**
          * Refreshes.
          */
        refresh(): void;
        /**
          * Adds a reference.
          */
        addReference(...values: MappedContract[]): void;
        /**
          * Checks whehter there is a specific reference.
          */
        containReference(...value: MappedContract[]): boolean;
        /**
          * Removes a specific reference.
          */
        removeReference(...value: MappedContract[]): void;
        /**
          * Clears all references.
          */
        clearReference(): void;
        /**
          * Gets an entry by a specific reference item.
          */
        getEntry<TRes>(reference: Common.ReferenceItemContract): TRes;
        /**
          * Gets entries by a specific reference item.
          */
        getEntries<TRes>(reference: Common.ReferenceItemContract): TRes[];
        private _refresh();
    }
    interface EventInfoContract<T> {
        handler: (ev: T) => void;
        target?: any;
        args?: any;
    }
    class DisposableArray implements Common.DisposableContract {
        private _list;
        push(...value: Common.DisposableContract[]): Common.DisposableContract[];
        pushRange(col: Common.DisposableContract[]): Common.DisposableContract[];
        dispose(): void;
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
        add(h: Common.EventHandler<T>, target?: any, disposableList?: DisposableArray, args?: any): Common.DisposableContract;
        /**
          * Raises this event.
          * @param ev  The event arguments.
          * @param ignoreEx  true if ignore exception; otherwise, false.
          */
        raise(ev: T, ignoreEx?: boolean): void;
        /**
          * Removes an event handler.
          * @param h  The event handler to remove.
          */
        remove(h: Common.EventHandler<T>): void;
        /**
          * Clears all event handlers.
          */
        clear(): void;
        /**
          * Adds listener methods of this event to a specific object.
          */
        addListenerMethods(obj: any): void;
    }
    /**
      * Gets an array by given item or array.
      * This is used to work as a part of the processing logic that need support both single item or an array.
      * @param value  An item or an array.
      * @param emptyForNull  A value indicating whether need return an empty array if given item is null.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    function toArray<T>(value: T | T[], emptyForNull?: boolean, callbackfn?: (value: T, index: number, array: T[]) => void, thisArg?: any): T[];
    /**
      * Converts to string array.
      * This is used to work as a part of the processing logic that need support both single item or an array.
      * @param value  A string or a string array.
      * @param emptyForNull  A value indicating whether need return an empty array if given item is null.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    function toStringArray(value: string | string[], emptyForNull?: boolean, callbackfn?: (value: string, index: number, array: string[]) => void, thisArg?: any): string[];
    /**
      * Checks if the specific object is an array.
      */
    function isArray(col: any): col is any[];
    /**
      * Checks whether a specific list contains a test item.
      * @param list  The list.
      * @param testItem  The item to test.
      * @param compare  Additional compare handler.
      */
    function contains<T1, T2>(list: T1[], testItem: T2, compare?: Common.Func2<T1, T2, boolean> | string): boolean;
    /**
      * Gets the index of a test item in a specific list.
      * @param list  The list.
      * @param testItem  The item to test.
      * @param compare  Additional compare handler.
      */
    function indexOf<T1, T2>(list: T1[], testItem: T2, compare?: Common.Func2<T1, T2, boolean> | string): number;
    /**
      * Gets the element of a test item in a specific list.
      * @param list  The list.
      * @param testItem  The item to test.
      * @param compare  Additional compare handler.
      */
    function getItem<T1, T2>(list: T1[], testItem: T2, compare?: Common.Func2<T1, T2, boolean> | string): T1;
    /**
      * Copies a list.
      * @param list  The list to copy.
      */
    function copy<T>(list: T[]): T[];
    /**
      * Adds a list to target list one.
      * @param list  The target list.
      * @param adding  The list to add.
      * @param nullCheck  A value indicating whether need ignore null.
      * @param duplicateCheck  A value indicating whether need ignore the one duplicated.
      */
    function pushRange(list: any[], adding: any[], nullCheck?: boolean, duplicateCheck?: string | boolean | Common.Func2<any, any, boolean>): any[];
    /**
      * Removes a number of items from a target list.
      * @param list  The target list.
      * @param removing  The list to remove.
      * @param changeRaw  A value indicating whether change the target list or create a copy list to modify.
      * @param compare  An optional comparing handler.
      */
    function remove(list: any[], removing: any[], changeRaw?: boolean, compare?: Common.Func2<any, any, boolean> | string): any[];
    /**
      * Removes key value pairs.
      * @param list  The target key value pairs.
      * @param removing  The keys to remove.
      * @param changeRaw  A value indicating whether change the target list or create a copy list to modify.
      */
    function removeKeyValuePair<TKey, TValue>(list: KeyValuePairContract<TKey, TValue>[], removing: TKey[], changeRaw?: boolean): KeyValuePairContract<TKey, TValue>[];
    /**
      * Sets a key value pair.
      * @param list  The target key value pairs.
      * @param item  The key value pair to set.
      * @param compare  An optional comparing handler.
      */
    function setKeyValue<TKey, TValue>(col: KeyValuePairContract<TKey, TValue>[], item: KeyValuePairContract<TKey, TValue>, compare?: Common.Func2<TKey, TKey, boolean>): KeyValuePairContract<TKey, TValue>[];
    /**
      * Modifies items in a specific list string.
      * @param raw  The list string.
      * @param split  The split string.
      * @param addingItems  Items to add into the list string.
      * @param removingItems  Items to remove from the list list string.
      */
    function addItem(raw: string, split: string, addingItems: string | string[], removingItems?: string | string[]): string;
    /**
      * Gets an entry.
      * @param col  The mapped object with resources.
      * @param reference  The entry reference item to get.
      * @param resType  The reference type.
      */
    function getEntry<T>(col: MappedContract | MappedContract[], reference: Common.ReferenceItemContract | string, resType?: string): T;
    /**
      * Gets a list of entry.
      * @param col  The mapped object with resources.
      * @param reference  The entry reference item to get.
      */
    function getEntries<T>(col: MappedContract | MappedContract[], reference: Common.ReferenceItemContract): T[];
    /**
      * Finds the item view in the list.
      * @param col  The collection of item views.
      * @param value  The value of item view to find.
      */
    function findItemView<T>(col: ItemViewContract<T>[], value: T): ItemViewContract<T>;
    /**
      * Gets cell information of a table.
      * @param row  The model data of the row.
      * @param column  The column information.
      * @param element  The cell element.
      */
    function cellInfo<T>(row: T, column: TableColumnContract, element: HTMLTableCellElement): {
        column: TableColumnContract;
        row: T;
        container: HTMLTableCellElement;
        value: any;
    };
    /**
      * Formats a list.
      * @param col  The original collection.
      * @param format  The format handler.
      */
    function formatList<T>(col: T[], format: AliHub.Common.Func1<T, T>): T[];
    /**
      * Gets different between two versions of list.
      * @param oldItems  The list copied in old version.
      * @param newItems  The current list.
      */
    function diff<T>(oldItems: T[], newItems: T[]): ChangedListContract<T>;
    function changeSelect<T>(list: T[], selectionMode: Collection.SelectionModes, selected: T[], h: Common.Action2<T, boolean>, value?: boolean): SelectChangedContract<T>;
    /**
      * Creates a binding array.
      * @param col  The array if need fill initially.
      */
    function bindingArray<T>(col?: T[]): Collection.BindingArrayContract<T>;
    /**
      * Creates a BindingControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param parent  The parent control.
      * @param options  The initializition options.
      */
    function bindingControl<T>(idSuffix: string | HTMLElement, options?: BindingControlOptionsContract<T> | boolean, parent?: Common.VisualControl): BindingControl<T>;
    /**
      * Creates a ListControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param parent  The parent control.
      * @param options  The initializition options.
      */
    function listControl<T>(idSuffix: string | HTMLElement, options?: ListControlOptionsContract<T> | boolean | Common.VisualControl, parent?: Common.VisualControl | ListControlOptionsContract<T> | boolean): ListControl<T>;
    /**
      * Creates a PagingControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param parent  The parent control.
      * @param options  The initializition options.
      */
    function pagingControl(idSuffix: string | HTMLElement, options?: PagingControlOptionsContract | boolean, parent?: Common.VisualControl): PagingControl;
    /**
      * Creates a SwitchControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param parent  The parent control.
      * @param options  The initializition options.
      */
    function switchControl(idSuffix: string | HTMLElement, options?: SwitchControlOptionsContract | boolean, parent?: Common.VisualControl): SwitchControl;
    /**
      * Creates a SingleFlowControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param parent  The parent control.
      * @param options  The initializition options.
      */
    function singleFlowControl<T>(idSuffix: string | HTMLElement, options?: SingleFlowControlOptionsContract<T> | boolean, parent?: Common.VisualControl): SingleFlowControl<T>;
}
declare namespace AliHub.Common {
    /**
      * Calendar control options.
      */
    interface CalendarControlOptionsContract extends VisualControlOptionsContract<CalendarControl> {
    }
    /**
      * Calendar control options.
      */
    interface TimeControlOptionsContract extends VisualControlOptionsContract<TimeControl> {
        start?: number;
        end?: number;
        viewModel?: PlanInfoContract<Graph.ColorStringContract>[];
        partsStyle?: TimeControlStyleContract;
    }
    /**
      * Calendar control options.
      */
    interface TimeControlStyleContract {
        labelX?: number;
        labelY?: number;
        scaleWidth?: number;
        scaleHeight?: number;
        scaleLast?: boolean;
        itemLineWidth?: number;
        itemTitleX?: number;
        itemTitleY?: number;
    }
    interface TimeContract {
        hour: number;
        minute?: number;
        second?: number;
        millisecond?: number;
    }
    interface IntervalContract {
        start: Date;
        end: Date;
    }
    interface PlanInfoContract<T> {
        start: TimeContract;
        duration: number;
        model: string | T;
    }
    interface StopwatchNotificationOptionsContract {
        subject?: string | HTMLElement | Common.VisualControl;
        key?: string | Web.BaseDataPackageResolver<any> | boolean;
        post?: boolean;
        channel?: string | Common.Func<string>;
    }
    interface HoroscopeInfoContract extends SymboItemContract {
        enName: string;
        start: {
            month: number;
            date: number;
        };
        end: {
            month: number;
            date: number;
        };
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
        static parse(value: Date | number | string | boolean): Date;
        /**
          * Converts to locale time string.
          * @param value  The date time.
          */
        static toLocaleTimeString(value: Date, only24h?: boolean): string;
        /**
          * Gets locale string of the day of week string.
          * @param value  The date time.
          */
        static toDayOfWeekString(value: Date | number, short?: boolean): string;
        /**
          * Gets locale string of AM or PM.
          * @param value  The date time.
          */
        static toApmString(value: Date | number): string;
        /**
          * Gets locale string of the month.
          * @param value  The date time.
          */
        static toMonthString(value: Date | number, short?: boolean): string;
        /**
          * Gets customized string.
          * @param value  The date time.
          * @param format  The template string.
          * @param classicFormatOnly  true if only classic text format; otherwise, false.
          */
        static toCustomizedString(value: Date, format: string, classicFormatOnly?: boolean): string;
        /**
          * Compares whether the two dates are in same day.
          * @param a  The first date to compare.
          * @param a  The second date to compare.
          */
        static sameDate(a: Date, b: Date): boolean;
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
          * Gets the day of week of a specific month.
          * @param fullYear  The full year.
          * @param month  The month.
          */
        static monthStart(fullYear: number, month?: number): number;
        /**
          * Converts a specific date to number string.
          * @param value  The date value.
          */
        static toNumberString(value: Date | number | string): string;
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
        static getHoroscopes(): HoroscopeInfoContract[];
        /**
          * Gets a horoscope info by specific date.
          * @param value  The date.
          */
        static getHoroscope(value: Date): HoroscopeInfoContract;
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
        static getSpanString(begin: Date, end: Date, showMillisec?: boolean): string;
        /**
          * Gets timespan string to now.
          * @param target  The target date.
          */
        static getNowSpanString(target: Date): string;
        /**
          * Gets timespan.
          * @param value  The timespan in milliseconds.
          */
        static toSpan(value: number | TimeSpanContract | AliHub.Common.Func<number> | AliHub.Common.Func<TimeSpanContract>): TimeSpanContract;
        /**
          * Gets timespan string.
          * @param span  The timespan in milliseconds.
          */
        static toSpanString(span: number, showMillisec?: boolean): string;
        /**
          * Gets locale timespan string.
          * @param value  The timespan in milliseconds.
          */
        static toLocaleSpanString(value: number | TimeSpanContract | AliHub.Common.Func<number> | AliHub.Common.Func<TimeSpanContract>, precision?: TimePrecisions): string;
        /**
          * Gets time string.
          * @param value  The date time.
          */
        static toTimeString(value: Date, showSecond?: boolean, force24?: boolean): string;
    }
    /**
      * Calendar control.
      */
    class CalendarControl extends Common.VisualControl {
        /**
          * Initializes a new instance of the CalendarControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        constructor(id: VisualControlElementContract);
        /**
          * Loads specific options.
          * @param options  The options to load.
          */
        loadOptions(value: CalendarControlOptionsContract | boolean): any;
    }
    /**
      * Time scheduler control.
      */
    class TimeControl extends Common.VisualControl {
        private _start;
        private _end;
        private _model;
        private _unit;
        private _style;
        /**
          * Initializes a new instance of the CalendarControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        constructor(id: VisualControlElementContract);
        /**
          * Loads specific options.
          * @param options  The options to load.
          */
        loadOptions(value: TimeControlOptionsContract | boolean): any;
        startHour(value?: number): number;
        endHour(value?: number): number;
        hours(): number;
        setViewModel(col: PlanInfoContract<Graph.ColorStringContract>[]): void;
        private _refresh();
    }
    /**
      * Stopwatch.
      */
    class Stopwatch {
        private _time;
        /**
          * The tracking identifier.
          */
        trackingId: string;
        notificationOptions: StopwatchNotificationOptionsContract;
        recorded: Collection.EventHandlers<Date>;
        paused: Collection.EventHandlers<Date>;
        cleared: Collection.EventHandlers<boolean>;
        notifySucceeded: Collection.EventHandlers<any>;
        notifyFailed: Collection.EventHandlers<any>;
        /**
          * Resets.
          * @param initDate  The optional initialized date; or true if start record now.
          */
        reset(initDate?: Date | number | string | boolean): Date;
        /**
          * Starts record.
          * @param resume  true if resumes; otherwise, false. Default is false.
          */
        record(resume?: boolean): Date;
        /**
          * Stops record.
          */
        stop(ignoreNotify?: boolean | string): Date;
        /**
          * Gets timespan in milliseconds.
          * @param stop  true if stops record; otherwise, false. Default is false.
          */
        span(stop?: boolean, ignoreNotify?: boolean | string): number;
        /**
          * Gets total timespan with rest in milliseconds.
          * @param stop  true if stops record; otherwise, false. Default is false.
          */
        spanWithRest(stop?: boolean, ignoreNotify?: boolean | string): number;
        /**
          * Gets timespan in milliseconds of latest record.
          * @param stop  true if stops record; otherwise, false. Default is false.
          */
        latestSpan(stop?: boolean, ignoreNotify?: boolean | string): number;
        hasRecorded(): boolean;
        isRecording(): boolean;
        recordDate(index?: number): Date;
        latestRecordDate(): Date;
        recordedTimes(): number;
        pausedTimes(): number;
        recordHistory(): IntervalContract[];
        info(message?: string): {
            tracking: string;
            span: number;
            totalspan: number;
            begin: Date;
            latest: Date;
            end: Date;
            recording: boolean;
            url: string;
            width: number;
            height: number;
            message: string;
            channel: any;
        };
        /**
          * Sends notification to record the timespan.
          */
        notify<T>(message?: string): Web.ResponseTask<T>;
    }
    /**
      * Creates a CalendarControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param parent  The parent control.
      * @param options  The initializition options.
      */
    function calendarControl(idSuffix: string | HTMLElement, options?: CalendarControlOptionsContract | boolean, parent?: VisualControl): CalendarControl;
    /**
      * Creates a TimeControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param parent  The parent control.
      * @param options  The initializition options.
      */
    function timeControl(idSuffix: string | HTMLElement, options?: TimeControlOptionsContract | boolean, parent?: VisualControl): TimeControl;
}
declare namespace AliHub.Diagnostics {
    /**
      * Tracker client.
      */
    interface TrackerContract {
        /**
          * Logs something.
          */
        log(type: LogTypes, category: string, message: string): any;
    }
    /**
      * Page anaytics client.
      */
    interface PageAnalyticsClientContract {
        /**
          * Records a stamp.
          */
        record(id: string, parameter?: any): any;
    }
    interface TrackerLoggerContract {
        info(message?: any, ...optionalParams: any[]): void;
        debug(message?: any, ...optionalParams: any[]): void;
        warn(message?: any, ...optionalParams: any[]): void;
        error(message?: any, ...optionalParams: any[]): void;
    }
    /**
      * The hit state.
      */
    interface HitStateContract {
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
    /**
      * Log types.
      */
    enum LogTypes {
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
    }
    /**
      * Tracker.
      */
    class Tracker implements TrackerContract, PageAnalyticsClientContract {
        /**
          * A flag indicating whether it is in basic mode.
          */
        basic: boolean;
        constructor();
        /**
          * Records with an identifier for mark.
          */
        record(id: string, parameter?: any): void;
        /**
          * Resolves a logger or console instance.
          */
        logger(): TrackerLoggerContract;
        /**
          * Logs a message as specific level.
          */
        log(type: LogTypes, category: string, message: string): void;
        /**
          * Logs a message as INFO level.
          */
        info(category: string, message: string): void;
        /**
          * Logs a message for debug.
          */
        debug(category: string, message: string): void;
        /**
          * Logs a message as WARN level.
          */
        warn(category: string, message: string): void;
        /**
          * Logs a message as ERROR level.
          */
        error(category: string, message: string): void;
    }
    function tracker(value?: TrackerContract): TrackerContract;
    function pageAnalyticsClient(value?: PageAnalyticsClientContract): PageAnalyticsClientContract;
    function consoleTracker(): Tracker;
    function logSwitch(instance: any, type: LogTypes, category: string, message: string): void;
    /**
      * Logs a message as INFO level.
      */
    function info(category: string, message: string): void;
    /**
      * Logs a message for debug.
      */
    function debug(category: string, message: string): void;
    /**
      * Logs a message as WARN level.
      */
    function warn(category: string, message: string): void;
    /**
      * Logs a message as ERROR level.
      */
    function error(category: string, message: string): void;
    /**
      * Logs a message as a specific level.
      */
    function log(type: LogTypes, category: string, message: string): void;
    /**
      * Records with an identifier for mark.
      */
    function record(id: string, parameter?: any): void;
    /**
      * Logs a message to console for debug with optional parameters.
      */
    function debugInfo(message: string, ...optionalParams: any[]): void;
}
declare namespace AliHub.Common {
    /**
      * Mathematics utilities.
      */
    class Maths {
        private static _count;
        /**
          * Validates if given object is a number.
          * @param value  The number to test.
          */
        static validNumber(value: any): boolean;
        /**
          * Adds prefix of a number to a string.
          * @param value  The number to format.
          * @param len  The miximum length of the string to build.
          */
        static addPrefix(value: number | string, len: number): string;
        static randomString(prefix?: string): string;
        static inRange(value: number, maxReal: number, minReal: number, maxExpect: number, minExpect: number, scope?: boolean): number;
    }
}
declare namespace AliHub.Elements {
    type AnyElementReference = string | HTMLElement | Window | Document | Common.VisualControl | Common.Func<string> | Common.Func<HTMLElement> | Common.Func<Window> | Common.Func<Document> | Common.Func<Common.VisualControl>;
    type EventElementReferences = string | Element | Window | Document | Worker | Common.VisualControl | Common.Func<string> | Common.Func<Element> | Common.Func<Window> | Common.Func<Document> | Common.Func<Worker> | Common.Func<Common.VisualControl>;
    interface SubElementDefinitionContract {
        tagName?: string;
        idSuffix?: string;
        styleRef?: string | string[];
        attr?: any;
        style?: any;
        events?: any;
        children?: SubElementDefinitionContract[];
        innerHTML?: string;
    }
    /**
      * Action to fill element.
      */
    interface FillAction {
        /**
          * Fill something to an element.
          */
        (element: HTMLElement): void;
    }
    /**
      * Peripheral popup contract.
      */
    interface PeripheralPopupContract {
        /**
          * The target element.
          */
        target?: HTMLElement;
        /**
          * The orientation.
          */
        orientation: PeripheralOrientations;
        /**
          * The handler to raise on rendering.
          */
        render: (info: PeripheralPopupInfo) => void;
        /**
          * The handler to size adjusting.
          */
        adjust?: (info: PeripheralPopupInfo) => void;
        /**
          * Timeout in millisecond.
          */
        timeout?: number;
    }
    /**
      * Screen coordinate.
      */
    interface ScreenCoordinate extends Common.PlaneCoordinate {
        /**
          * Activity identifier.
          */
        activity: string;
    }
    /**
      * Collapse panel information.
      */
    interface CollapseInfoContract {
        /**
          * The target element identifier suffix.
          */
        targetIdPart: string;
        /**
          * The collapse element identifier suffix.
          */
        collapseIdPart: string;
        /**
          * The expand element identifier suffix.
          */
        expandIdPart: string;
        /**
          * A value indicating whether the target is expanded by default.
          */
        isExpanded?: boolean;
    }
    /**
      * Collapse panel options.
      */
    interface CollapseOptionsContract {
        /**
          * The target panel element.
          */
        target: HTMLElement | string;
        /**
          * The collapse button element.
          */
        collapseButton: HTMLElement | string;
        /**
          * The expand button element.
          */
        expandButton: HTMLElement | string;
        /**
          * A value indicating whether the target is expanded by default.
          */
        isExpanded?: boolean;
    }
    /**
      * Search bar information.
      */
    interface SearchBarInfoContract {
        /**
          * The input element identifier suffix.
          */
        inputIdPart: string;
        /**
          * The button element identifier suffix.
          */
        buttonIdPart?: string;
        /**
          * Action to provide suggestion.
          */
        suggest?: Common.Func1<string, Web.ResponseTask<any>>;
        /**
          * Action to enter.
          */
        enter?: Common.Func1<string, Web.ResponseTask<any>>;
        /**
          * Time span in millisecond to process in lazy mode.
          */
        lazy?: number;
        /**
          * true if ignore to process suggest handler when enter is occured.
          */
        ignoreSuggestForEnter?: boolean;
    }
    /**
      * Search options.
      */
    interface SearchOptionsContract {
        /**
          * The search box element identifier suffix.
          */
        target: HTMLInputElement | string;
        /**
          * The button element.
          */
        button?: HTMLElement | string;
        /**
          * Action to provide suggestion.
          */
        suggest?: Common.Func1<string, Web.ResponseTask<any>>;
        /**
          * Action to enter.
          */
        enter?: Common.Func1<string, Web.ResponseTask<any>>;
        /**
          * Time span in millisecond to process in lazy mode.
          */
        lazy?: number;
        /**
          * true if ignore to process suggest handler when enter is occured.
          */
        ignoreSuggestForEnter?: boolean;
    }
    /**
      * Gesture handlers options.
      */
    interface GestureActionOptionsContruct {
        /**
          * The mininum horizontal value to active related gesture handlers.
          */
        minX?: number | Common.BindingObjectContract<number>;
        /**
          * The mininum vertical value to active related gesture handlers.
          */
        minY?: number | Common.BindingObjectContract<number>;
        /**
          * The handler rasied on turning up. The element and distance will be provided.
          */
        turnUp?: Common.Action2<HTMLElement | Window | Document, number>;
        /**
          * The handler rasied on turning right. The element and distance will be provided.
          */
        turnRight?: Common.Action2<HTMLElement | Window | Document, number>;
        /**
          * The handler rasied on turning down. The element and distance will be provided.
          */
        turnDown?: Common.Action2<HTMLElement | Window | Document, number>;
        /**
          * The handler rasied on turning left. The element and distance will be provided.
          */
        turnLeft?: Common.Action2<HTMLElement | Window | Document, number>;
        /**
          * The handler rasied before moving. The element will be provided.
          */
        moveStart?: Common.Action1<HTMLElement | Window | Document>;
        /**
          * The handler rasied after moving. The element and distance will be provided.
          */
        moveEnd?: Common.Action2<HTMLElement | Window | Document, Common.PlaneCoordinate>;
        /**
          * The handler rasied on moving. The element and distance will be provided.
          */
        moving?: Common.Action2<HTMLElement | Window | Document, Common.PlaneCoordinate>;
    }
    /**
      * Scrolling down options.
      */
    interface ScrollListenerOptionsContract {
        /**
          * Title owner.
          */
        titleOwner?: HTMLElement | string | Common.VisualControl | Common.Func<HTMLElement> | Common.Func<string> | Common.Func<Common.VisualControl>;
        /**
          * Full title bar.
          */
        titleBar?: HTMLElement | string | Common.VisualControl | Common.Func<HTMLElement> | Common.Func<string> | Common.Func<Common.VisualControl>;
        /**
          * Title bar after scrolling down.
          */
        titleShortBar?: HTMLElement | string | Common.VisualControl | Common.Func<HTMLElement> | Common.Func<string> | Common.Func<Common.VisualControl>;
        /**
          * Title height or additional title height if title bar is provided.
          */
        titleHeight?: number | Common.Func<number>;
        /**
          * The style references used for scrolling down.
          */
        hiddenStyleRef?: string | string[];
        /**
          * The rest height to add for computing.
          */
        restHeight?: number | Common.Func<number>;
        /**
          * The handler rasied on scrolling to end.
          */
        scrollEnd?: Common.Func<Web.ResponseTask<any>>;
        /**
          * A value indicating whether the scrolling is end.
          */
        isEnding?: boolean | Common.Func<boolean>;
    }
    /**
      * Options of clicking and tapping handler.
      */
    interface ClickOptionsContract {
        /**
          * The handler to raise.
          */
        process: Common.Action3<MouseEvent, number, ClickOptionsContract>;
        /**
          * Start for hitting.
          */
        start?: number;
        /**
          * Hitting count.
          */
        count?: number;
        /**
          * The timespan in millisecond for hitting.
          */
        span?: number;
    }
    interface QuickClicksContract {
        times: number;
        latest?: Date;
        current: Date;
        span: number;
    }
    interface ButtonControlOptionsContract extends Common.VisualControlOptionsContract<ButtonControl> {
        name?: string;
        icon?: Graph.ImageContract;
        model?: any;
        span?: number;
        action?: Common.Action1<QuickClicksContract>;
    }
    /**
      * Options of shortcut key.
      */
    interface ShortcutKeyOptionsContract {
        /**
          * The handler to raise.
          */
        process: (ev: KeyboardEvent) => void;
        /**
          * The key pressed.
          */
        key?: string | number;
        /**
          * A flag indicating whether the CTRL key is pressed.
          */
        ctrl?: boolean;
        /**
          * A flag indicating whether the ALT key is pressed.
          */
        alt?: boolean;
        /**
          * A flag indicating whether the SHIFT key is pressed.
          */
        shift?: boolean;
    }
    interface MessagePackageTokenContract extends Common.DisposableContract {
        track: string;
    }
    interface MessagePackageInfoContract<T> {
        track: string;
        process: Common.Action1<MessagePackageResultContract<T>>;
    }
    interface MessagePackageResultContract<T> extends MessagePackageInfoContract<T> {
        success: boolean;
        data: T;
        origin: string;
        timestamp: Date;
    }
    interface HiddenFormContract extends Common.DisposableContract {
        url(): string;
        method(value?: string): string;
        field(key: string, value?: string): string;
        jsonField<T>(key: string, value: T): T;
        fileField(key: string, change: boolean, mime?: string): PromiseLike<File>;
        getFileField(key: string): File;
        addSet(obj: any): any;
        remove(...key: string[]): number;
        clear(): any;
        submit<T>(ignoreResult?: boolean): Web.ResponseTask<T>;
    }
    function hiddenForm(url?: string): HiddenFormContract;
    function postMessagePackage(contentWindow: Window, track: string, success: boolean, data: any, targetOrigin: string): void;
    function manualReceiveMessagePackage(track: string, success: boolean, data: any): boolean;
    function listenMessagePackage<T>(h: Common.Action1<MessagePackageResultContract<T>>, track?: string): MessagePackageTokenContract;
    function unlistenPackageMessage(track: string): void;
    function getControlRegisteredForTag(name: string): typeof Common.VisualControl;
    function hasControlRegisteredForTag(): boolean;
    /**
      * Registers element for a specific control.
      * name  the name of tag to register.
      * control  the control name to register.
      */
    function register(name: string, control: typeof Common.VisualControl): void;
    /**
      * Registers element for a specific control.
      * name  the name of tag to register.
      * control  the control name to register.
      */
    function registerControlAsWebComponent(name: string, control: typeof Common.VisualControl, h?: Common.Action1<any>): any;
    /**
      * Gets top offset of specific element in document.
      * @param element  the element.
      */
    function getTop(element: string | HTMLElement | Common.VisualControl | Common.Func<HTMLElement> | Common.Func<string> | Common.Func<Common.VisualControl>): number;
    /**
      * Gets left offset of specific element in document.
      * @param element  the element.
      */
    function getLeft(element: string | HTMLElement | Common.VisualControl | Common.Func<HTMLElement> | Common.Func<string> | Common.Func<Common.VisualControl>): number;
    /**
      * Gets the position of the specific element in document.
      * @param element  the element.
      */
    function getPosition(element: string | HTMLElement | Common.VisualControl | Common.Func<HTMLElement> | Common.Func<string> | Common.Func<Common.VisualControl>): Common.PlaneCoordinate & Common.InvalidContract;
    /**
      * Gets the position of the mouse in specific element or document.
      * @param element  the optional element as target.
      */
    function getMousePosition(element?: string | HTMLElement | Common.VisualControl | Common.Func<HTMLElement> | Common.Func<string> | Common.Func<Common.VisualControl>): Common.PlaneCoordinate & Common.InvalidContract;
    /**
      * Gets specific HTML element.
      * @param id  the element identifier or prefix.
      * @param appendingIdParts  the additional identifier parts.
      */
    function getById<T extends HTMLElement>(element: AnyElementReference, ...appendingIdParts: string[]): T;
    /**
      * Changes style references and resolves the list all.
      * @param element  the element.
      * @param adding  the names to add.
      * @param removing  the names to remove.
      */
    function changeStyleRef(element: HTMLElement | string, adding?: string | string[], removing?: string | string[]): string[];
    /**
      * Sanitizes a specific HTML part to text string.
      * @param htmlString  the HTML string to sanitize.
      */
    function sanitizeHTML(htmlString: any, emptyForNull?: boolean): string;
    /**
      * Merges an identifier.
      * @param prefix  the identifier prefix.
      * @param idParts  the additional identifier parts.
      */
    function mergeId(prefix: HTMLElement | string, idParts: string[]): string;
    /**
      * Gets query information collection from URL.
      */
    function getQueryInfo(url?: string, emptyStringForNull?: boolean, notToDecode?: boolean): Collection.StringPropertiesContract;
    /**
      * Gets query information object from URL.
      */
    function getQueryObj(url?: string, emptyStringForNull?: boolean, notToDecode?: boolean): Collection.DictionaryContract<string>;
    /**
      * Gets query property by given name from URL.
      * @param name  the property name.
      */
    function getQuery(name: string | number, notToDecode?: boolean): string;
    /**
      * Gets query property by given name from URL.
      * @param name  the property name.
      */
    function getStringQuery(url: string, name: string | number, notToDecode?: boolean): string;
    function queryField(key: string, value: any): string;
    /**
      * Gets full query string for URL.
      * @param value  the query information collection.
      */
    function toQueryString(value: any | Collection.StringPropertiesContract): string;
    /**
      * Gets page address without query and hash.
      */
    function getPageAddress(): string;
    /**
      * Requests full screen.
      */
    function fullScreen(element?: AnyElementReference): HTMLElement;
    /**
      * Cancels full screen.
      */
    function cancelFullScreen(): void;
    /**
      * Adds an event listener to a target element.
      * @param element  the target element.
      * @param eventType  the type of event.
      * @param h  the event handler to add.
      */
    function listen(element: EventElementReferences, eventType: string, h: (ev: Event) => void): Common.DisposableContract;
    /**
      * Adds an event listener only once to a target element.
      * @param element  the target element.
      * @param eventType  the type of event.
      * @param h  the event handler to add.
      */
    function listenOnce(element: EventElementReferences, eventType: string, ...h: ((ev: Event) => void)[]): Common.DisposableContract;
    /**
      * Adds an event listener to a target element.
      * @param element  the target element.
      * @param eventType  the type of event.
      * @param h  the event handler to add.
      */
    function addEvent(element: EventElementReferences, eventType: string, h: (ev: Event) => void): Common.DisposableContract;
    /**
      * Removes an event listener from a target element.
      * @param element  the target element.
      * @param eventType  the type of event.
      * @param h  the event handler to add.
      */
    function unlisten(element: EventElementReferences, eventType: string, h: (ev: Event) => void): void;
    /**
      * Removes an event listener from a target element.
      * @param element  the target element.
      * @param eventType  the type of event.
      * @param h  the event handler to add.
      */
    function removeEvent(element: EventElementReferences, eventType: string, h: (ev: Event) => void): void;
    /**
      * Processes for all elements.
      */
    function processAll(container: HTMLElement, h: (element: Element) => void): void;
    function parseCssRules(styleContent: any): any;
    /**
      * Adds gesture handlers.
      * @param element  the target element.
      * @param options  the options.
      */
    function addGesture(element: AnyElementReference, options: GestureActionOptionsContruct): Common.DisposableContract;
    /**
      * Adds an event handler for clicking or tapping.
      * @param element  the target element.
      * @param options  The options.
      */
    function onClick(element: string | Element | Window | Worker, options: ClickOptionsContract): Common.DisposableContract;
    /**
      * Added event handler for listening element attribute changing.
      * @param element  the target element.
      * @param attrName  the attribute name to listen; or null for any attribute.
      * @param handler  the handler to raise after attribute changes.
      */
    function attrChanged(element: AnyElementReference, attrName: string | string[], handler: Common.Action1<Event>): Common.DisposableContract;
    /**
      * Gets the size of specific element.
      * @param element  the target element.
      */
    function getSize(element?: AnyElementReference, emptyForNull?: boolean): Common.PlaneCoordinate & Common.InvalidContract;
    /**
      * Adds a shortcut key for given element.
      * @param element  The target element.
      * @param options  The shortcut key options.
      */
    function shortcutKey(element: EventElementReferences, options: ShortcutKeyOptionsContract): void;
    /**
      * Adapts the height size of given element, window or static number. null for clear adaption.
      * @param element  The target element.
      * @param target  An optional element to compare.
      * @param compute  An optional computing handler.
      */
    function adaptHeight(element: HTMLElement[] | HTMLElement, target?: HTMLElement | Window | number, compute?: Common.Func1<number, number>): void;
    /**
      * Adapts the width size of given element, window or static number. null for clear adaption.
      * @param element  The target.
      */
    function adaptWidth(element: HTMLElement[] | HTMLElement, target?: HTMLElement | Window | number, compute?: Common.Func1<number, number>): void;
    /**
      * Gets coordinate information for scrolling.
      */
    function getScroll(): Common.PlaneCoordinate;
    /**
      * Listens page scrolling down event.
      * This is very useful to implement the auto loading for a list by scrolling down.
      * @param options  the options.
      */
    function listenScroll(options: ScrollListenerOptionsContract): void;
    /**
      * Gets the specific string object of an element.
      * @param element  the element to get attribute.
      * @param name  the attribute name to test one by one. Only the first one matched will be used if it is an array.
      */
    function getAttr(element: AnyElementReference, name: string | string[]): string;
    /**
      * Gets the specific attribute object of an element.
      * @param element  the element to get attribute.
      * @param name  the attribute name.
      * @param dataPrefix  a value indicating whether use "data-" prefix for optional.
      */
    function parseAttr<T>(element: AnyElementReference, name: string, dataPrefix?: boolean): T;
    /**
      * Listens attributes changes of a specific element to an object.
      * @param element  the element to get attribute.
      * @param name  the attribute name.
      * @param obj  the object to bind.
      * @param ignoreUndefined  a value indicating whether need ignore undefined.
      * @param dataPrefix  a value indicating whether use "data-" prefix for optional.
      */
    function listenAttr(element: AnyElementReference, name: string | string[], obj: any, ignoreUndefined?: boolean, dataPrefix?: boolean): Common.DisposableContract;
    /**
      * Pops up a dialog.
      * @param model  the popup dialog model.
      */
    function popup(model: PeripheralPopupContract): HTMLDivElement;
    function url(element?: Node): string;
    /**
      * Adds lazy search.
      */
    function lazySearch(options: SearchOptionsContract): Common.DisposableContract;
    /**
      * Collapses panel.
      */
    function collapse(options: CollapseOptionsContract): Common.DisposableContract;
    function bindText(obs: Common.BindingObjectContract<string>, element: Elements.AnyElementReference, ...appendingIdParts: string[]): Common.DisposableContract;
    function bindProp(obs: Common.BindingObjectContract<string>, prop: string, element: Elements.AnyElementReference, ...appendingIdParts: string[]): Common.DisposableContract;
    /**
      * Peripheral orientations.
      */
    enum PeripheralOrientations {
        Hidden = 0,
        Top = 1,
        Right = 2,
        Bottom = 3,
        Left = 4,
        Cover = 5,
    }
    class ButtonControl extends AliHub.Common.VisualControl {
        /**
          * Gets or sets the name of the button.
          */
        name: Common.ListenedObjectContract<string>;
        /**
          * Gets or sets the icon of the button.
          */
        icon: Common.ListenedObjectContract<Graph.ImageContract>;
        /**
          * Adds or removes the event handler after clicking.
          */
        clicked: Collection.EventHandlers<QuickClicksContract>;
        /**
          * Gets or sets the data model.
          */
        model: Common.ListenedObjectContract<any>;
        /**
          * Gets or sets a value indicating whether enable name in HTML.
          */
        enableNameHTML: boolean;
        /**
          * The timespan in millisecond for hitting.
          */
        span: number;
        /**
          * Initializes a new instance of the ButtonControl class.
          * @param id  The element to render.
          */
        constructor(id: AliHub.Common.VisualControlElementContract);
        /**
          * Loads specific options.
          * @param options  The options to load.
          */
        loadOptions(value: ButtonControlOptionsContract | boolean): any;
    }
    /**
      * Peripheral popup dialog info.
      */
    class PeripheralPopupInfo {
        private _target;
        private _orientation;
        private _timeout;
        private _container;
        /**
          * Initializes a new instance of the PeripheralPopupInfo class.
          * @param model  The model.
          * @param container  The container.
          */
        constructor(model: PeripheralPopupContract, container: Common.VisualControl);
        /**
          * Gets the controller of the popup container.
          */
        container(): Common.VisualControl;
        /**
          * Gets the target element.
          */
        target(): HTMLElement;
        /**
          * Gets the orientation.
          */
        orientation(): PeripheralOrientations;
        /**
          * Gets timeout in millisecond.
          */
        timeout(): number;
        /**
          * Closes the popup dialog immediately.
          */
        close(): void;
    }
    /**
      * Collapse panel extender.
      */
    class CollapseExtender<T> implements Common.BindingControlExtender<T> {
        private _col;
        /**
          * Extender name.
          */
        name: string;
        /**
          * Initializes a new instance of the CollapseExtender class.
          * @param info  The collapse information.
          */
        constructor(info: CollapseInfoContract[]);
        /**
          * Gets model.
          * @param control  The target control.
          */
        model(control: Common.BindingControl<T>): any;
        /**
          * Loads after done.
          * @param control  The target control.
          */
        load(control: Common.BindingControl<T>): void;
    }
    /**
      * Search bar extender.
      */
    class SearchExtender implements Common.BindingControlExtender<any> {
        private _info;
        /**
          * Extender name.
          */
        name: string;
        /**
          * Time span in millisecond to process in lazy mode.
          */
        lazy: number;
        /**
          * Auto focus if it contains only one.
          */
        autoFocus: boolean;
        /**
          * Initializes a new instance of the SearchExtender class.
          * @param info  The search bar information.
          */
        constructor(info: SearchBarInfoContract[] | SearchBarInfoContract);
        /**
          * Loads after done.
          * @param control  The target control.
          */
        load(control: Common.BindingControl<any>): void;
    }
}
declare namespace AliHub.Graph {
    interface SizePositionContract extends Common.PlaneCoordinate {
        width?: number;
        height?: number;
    }
    interface PositionInLineContract extends Common.PlaneCoordinate {
        rate: number;
        side: Elements.PeripheralOrientations;
    }
    interface LineEndsContract {
        start: PositionInLineContract;
        end: PositionInLineContract;
    }
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
      * String with color.
      */
    interface ColorStringContract {
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
        /**
          * Style reference key.
          */
        styleRef?: string | string[];
        /**
          * Additional properties.
          */
        [property: string]: any;
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
        styleRef?: string | string[];
        /**
          * Additional properties.
          */
        [property: string]: any;
    }
    /**
      * Image generated by charactors.
      * type should be string.
      */
    interface StringImageContract extends ImageContract, ColorStringContract {
    }
    /**
      * Image generated by URL.
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
      * Image generated by SVG.
      * type should be svg.
      */
    interface SvgImageContract extends ImageContract {
        /**
          * SVG source.
          */
        source: string;
    }
    /**
      * Line options.
      */
    interface LineOptionsContract {
        highlight?: number;
        max?: number;
        min?: number;
    }
    /**
      * Pie options.
      */
    interface PieOptionsContract {
        innerSize?: string;
    }
    /**
      * Generates an element for image.
      * image  the image contract.
      */
    function imageElement(value: ImageContract | Common.BindingObjectContract<ImageContract>): HTMLElement;
    function lines(boxes: SizePositionContract[]): LineEndsContract[];
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
      * External extensions for graph.
      */
    class Extensions {
        /**
          * Renders radar.
          */
        static radar(element: HTMLElement, title: string, data: Collection.PropertiesContract<number>): void;
        /**
          * Renders line.
          */
        static line(element: HTMLElement, title: string, data: Collection.PropertiesContract<number>, options?: LineOptionsContract): void;
        /**
          * Renders pie.
          */
        static pie(element: HTMLElement, title: string, data: Collection.PropertiesContract<number>, options?: PieOptionsContract): void;
    }
}
declare namespace AliHub.Media {
    /**
      * Audio control options.
      */
    interface AudioControlOptionsContract extends Common.VisualControlOptionsContract<AudioControl> {
        /**
          * Template source type.
          */
        templateType?: string;
        /**
          * Template source value.
          */
        template?: string;
        /**
          * Text diplayed when the browser does not support.
          */
        unsupportedText: string;
    }
    /**
      * Audio key point.
      */
    interface AudioKeyPointContract {
        /**
          * The time.
          */
        time: number;
        /**
          * The note.
          */
        note?: string;
    }
    /**
      * Audio client.
      */
    interface AudioClientContract {
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
        /**
          * Occurs on played.
          */
        played: Collection.EventHandlers<boolean>;
        /**
          * Occurs on loaded.
          */
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
        /**
          * Key points in second.
          */
        keypoints: Collection.BindingArrayContract<AudioKeyPointContract>;
        /**
          * Sets an audio file to play.
          */
        sound(path: string, mime: string): Collection.StringPropertiesContract;
        /**
          * Sets the audio to play with multiple files for different type supports.
          */
        soundSet(value?: Collection.KeyValuePairContract<string, string>[]): Collection.KeyValuePairContract<string, string>[];
        /**
          * Checks whether it contain specific audio file path.
          */
        contain(path: string): boolean;
        /**
          * Clears.
          */
        clear(): void;
        /**
          * Occurs when audio is changed.
          */
        changed: Collection.EventHandlers<Collection.KeyValuePairContract<string, string>[]>;
        /**
          * Gets or sets the additional data model of the sound.
          */
        model(value?: any): any;
        /**
          * Properties.
          */
        [key: string]: any;
    }
    /**
      * Camera captured event information.
      */
    interface CameraCapturedInfoContract {
        image: (styleRef?: string) => Graph.ImageContract;
        captured: Date;
        download: () => void;
        size: Common.PlaneCoordinate;
    }
    /**
      * Camera control options.
      */
    interface CameraControlOptionsContract extends Common.VisualControlOptionsContract<CameraControl> {
        /**
          * Width of camera view.
          */
        viewWidth?: number;
        /**
          * Height of camera view.
          */
        viewHeight?: number;
        /**
          * Occurs after photo captured.
          */
        captured?: Common.Action1<CameraCapturedInfoContract>;
        /**
          * File name prefix.
          */
        filePrefix?: string;
        /**
          * The data model convertor for photo captured item.
          */
        photoModelConvert?(entry: CameraCapturedInfoContract): any;
        /**
          * Template source value for photo captured item.
          */
        photoTemplate?: string;
        /**
          * Template source type for photo captured item.
          */
        photoTemplateType?: string;
        /**
          * The data model for not support.
          */
        notSupportModel?: any;
        /**
          * Template source value for not support.
          */
        notSupportTemplate?: string;
        /**
          * Template source type for not support.
          */
        notSupportTemplateType?: string;
        /**
          * Failed load.
          */
        failedLoad?: Common.Action;
        /**
          * A value indicating whether not load immediately.
          */
        lazyLoad?: boolean;
        /**
          * A value indicating whether the photos captured is desc.
          */
        isDesc?: boolean;
    }
    /**
      * Audio control.
      */
    class AudioControl extends Common.VisualControl {
        private _paths;
        private _audio;
        private _text;
        private _client;
        private _bindings;
        private _audioCtx;
        /**
          * Initializes a new instance of the AudioControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        constructor(id: Common.VisualControlElementContract);
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
        /**
          * Key points.
          */
        keypoints: Collection.BindingArrayContract<AudioKeyPointContract>;
        /**
          * Occurs when the audio is loaded.
          */
        voiceLoaded: Collection.EventHandlers<Collection.KeyValuePairContract<string, string>[]>;
        /**
          * Occurs when it plays or pauses.
          */
        played: Collection.EventHandlers<boolean>;
        /**
          * Checks whether it contain specific audio file path.
          */
        contain(path: string): boolean;
        /**
          * Gets player client.
          */
        client(): AudioClientContract;
        /**
          * Changes a sound file.
          */
        sound(path: string, mime: string): Collection.StringPropertiesContract;
        /**
          * Changes sound files.
          */
        soundSet(value?: Collection.StringPropertiesContract, loadImmediately?: boolean): Collection.StringPropertiesContract;
        /**
          * Gets or sets unsupported text displayed.
          */
        unsupportedText(str?: string): string;
        /**
          * Loads specific options.
          * @param value  The options to load.
          */
        loadOptions(value: AudioControlOptionsContract | boolean): any;
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
        addExtender(value: Common.BindingControlExtender<AudioClientContract>): void;
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
          * Plays.
          */
        play(): void;
        /**
          * Pauses.
          */
        pause(): void;
        /**
          * Checks if the player is paused.
          */
        paused: () => boolean;
        /**
          * Gets or sets a value indicating whether it is autoplay.
          */
        autoplay: (value?: boolean) => boolean;
        /**
          * Gets or sets volume.
          */
        volume: (value?: number) => number;
        /**
          * Gets or sets the playback rate.
          */
        playbackRate: (value?: number) => number;
        /**
          * Gets or sets a value indicating whether it is muted.
          */
        muted: (value?: boolean) => boolean;
        /**
          * Gets or sets the default playback rate.
          */
        defaultPlaybackRate: (value?: number) => number;
        /**
          * Gets whether it can play specific file type.
          */
        canPlayType: (mime?: string) => string;
        /**
          * Gets or sets current time to play.
          */
        currentTime: (value?: number) => number;
        /**
          * Copies the specific binding control view model and additional information.
          */
        copyBinding(control: Common.BindingControl<any>): void;
        private _initClient();
        private _bindingControl();
        private _renew();
    }
    /**
      * Audio view extender.
      * This is used to extend view abilities with DOM accessing for audio player.
      */
    class AudioExtender<T> implements Common.BindingControlExtender<T> {
        /**
          * Extender name.
          */
        name: string;
        /**
          * Inteval to refresh.
          */
        interval: number;
        /**
          * A value indicating whether refresh automatics after loading.
          */
        autoRefresh: boolean;
        /**
          * Gets model.
          * @param control  The list control which requests to process this method.
          * @param item  The target list item info.
          */
        model(control: AliHub.Common.BindingControl<T>): any;
        /**
          * Gets the player.
          * @param control  The control which requests to process this method.
          */
        player(control: AliHub.Common.BindingControl<T>): AliHub.Media.AudioClientContract;
        /**
          * Loads after done.
          * @param control  The control which requests to process this method.
          */
        load(control: AliHub.Common.BindingControl<T>): void;
        /**
          * Turns to the specific percents of play progress.
          * @param control  The control which requests to process this method.
          * @param value  The value to go.
          * @param denominator  The denominator.
          */
        turnToPercents(control: AliHub.Common.BindingControl<T>, value: number, denominator?: number): void;
        /**
          * Refreshes the control.
          * @param control  The control which requests to process this method.
          * @param loop  A value indicating whether need try to loop to refresh if it is playing.
          */
        refresh(control: AliHub.Common.BindingControl<T>, loop?: boolean): void;
    }
    /**
      * Camera control.
      */
    class CameraControl extends Common.VisualControl {
        private _mediaStream;
        private _webcamList;
        private _currentCam;
        private _photoTempV;
        private _photoTempT;
        private _invalidTempV;
        private _invalidTempT;
        private _count;
        /**
          * A value indicating whether can switch camera.
          */
        canSwitch: Common.BindingObjectContract<boolean>;
        /**
          * Width of camera view.
          */
        viewWidth: number;
        /**
          * Height of camera view.
          */
        viewHeight: number;
        /**
          * Occurs after captured.
          */
        captured: Collection.EventHandlers<CameraCapturedInfoContract>;
        /**
          * File name prefix.
          */
        filePrefix: string;
        /**
          * The data model convertor.
          */
        photoModelConvert: Common.Func1<CameraCapturedInfoContract, any>;
        /**
          * The data model for not support.
          */
        notSupportModel: Common.BindingObjectContract<{}>;
        /**
          * A value indicating whether the photos captured is desc.
          */
        isDesc: Common.BindingObjectContract<boolean>;
        /**
          * Initializes a new instance of the CameraControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        constructor(id: Common.VisualControlElementContract);
        /**
          * Loads specific options.
          * @param options  The options to load.
          */
        loadOptions(value: CameraControlOptionsContract | boolean): any;
        /**
          * Rotates through the webcam device list.
          */
        nextWebCam(): void;
        /**
          * Occurs when click on video tag.
          */
        capture(): void;
        /**
          * Starts to get webcams and opens the first one.
          */
        start(): void;
        /**
          * Check if it can work.
          */
        available(): any;
        /**
          * Handles devicechange event.
          */
        deviceChanged(): void;
        /**
          * Sets the template.
          * @param valueType  The data source type for the value.
          * @param value  The data source value.
          */
        setPhotoTemplate(valueType: string, value: string): void;
        /**
          * Sets the template.
          * @param valueType  The data source type for the value.
          * @param value  The data source value.
          */
        setNotSupportTemplate(valueType: string, value: string): void;
        /**
          * Callback function when getUserMedia() returns error.
          */
        private _getUserMediaError(e);
    }
    /**
      * Creates an AudioContext object.
      */
    function audioContext(): any;
    /**
      * Creates an AudioControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param parent  The parent control.
      * @param options  The initializition options.
      */
    function audioControl(idSuffix: string, options?: AudioControlOptionsContract, parent?: Common.VisualControl): AudioControl;
    /**
      * Creates an CameraControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param parent  The parent control.
      * @param options  The initializition options.
      */
    function cameraControl(idSuffix: string, options?: CameraControlOptionsContract, parent?: Common.VisualControl): CameraControl;
}
declare namespace AliHub.Common {
    /**
      * Page options.
      */
    interface PageOptionsContract {
        /**
          * The app center URL.
          */
        appCenterUrl?: string;
        /**
          * The element identifier of the page body panel.
          */
        bodyPanelId?: string;
        /**
          * The element identifier of the page header panel.
          */
        headerPanelId?: string;
        /**
          * The element identifier of the page cover panel.
          */
        coverPanelId?: string;
        /**
          * The element identifier of the page hidden panel.
          */
        hiddenPanelId?: string;
        /**
          * The message center path URL.
          */
        messageUrl?: string;
        /**
          * The feedback path URL.
          */
        feedbackUrl?: string;
        /**
          * The user sign out path URL.
          */
        signOutUrl?: string;
        /**
          * The menu in top bar.
          */
        menu?: Collection.ButtonInfoContract[];
        /**
          * The breadcrumb of the page.
          */
        path?: Collection.ButtonInfoContract[];
        /**
          * A value indicating whether this page is last node in the path.
          */
        isLastNodeInPath?: boolean;
        /**
          * Home information.
          */
        homeInfo?: Collection.BasicButtonInfoContract;
        /**
          * Search icon.
          */
        searchIcon?: Graph.ImageContract;
        /**
          * The tips in search box.
          */
        searchTip?: string;
        /**
          * The search provider.
          */
        searchProvider?: Common.Func1<string, Collection.ButtonInfoContract[]>;
        /**
          * The link target of search item.
          */
        searchTarget?: string;
        /**
          * The options bar info.
          */
        optionsBar?: Collection.ButtonInfoContract[];
        /**
          * The mininum size of the page.
          */
        minSize?: string;
        /**
          * The maxinum size of the page.
          */
        maxSize?: string;
    }
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
        /**
          * Home information.
          */
        static homeInfo: Collection.BasicButtonInfoContract;
        /**
          * Search icon.
          */
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
          * Loads page options.
          */
        static loadOptions(value: PageOptionsContract): void;
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
        static init(unlisten?: boolean): void;
        static generatePage(id?: string, unlisten?: boolean): void;
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
    function initPage(id?: string | boolean, unlisten?: boolean): void;
}
declare namespace AliHub.Res {
    function regLang(template: AliHub.Res.Templates): Templates;
    interface IconFontContract {
        line: string;
        block: string;
    }
    /**
      * Language pack information.
      */
    interface LanguagePackContract {
        lang: string;
        strings: any;
        template(templ: AliHub.Res.Templates): AliHub.Res.Templates;
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
    /**
      * Template set.
      */
    class Templates {
        private _html;
        private _settings;
        private _svg;
        private _subject;
        /**
          * Initializes a new instance of the Templates class.
          * @param subject  The subject name.
          */
        constructor(subject: string);
        /**
          * Gets subject name.
          */
        subject(): string;
        /**
          * Strings templates.
          */
        strings: Strings;
        /**
          * Gets or sets settings.
          * @param key  The template key.
          * @param value  The optional value to set.
          */
        settings<T>(key: string, value?: T): T;
        /**
          * Gets or sets HTML template.
          * @param key  The template key.
          * @param value  The optional value to set.
          */
        html(key: string, value?: string): string;
        /**
          * Gets or sets SVG template.
          * @param key  The template key.
          * @param value  The optional value to set.
          */
        svg(key: string, value?: string): string;
        /**
          * Gets SVG element from templates.
          * @param key  The template key.
          * @param styleRef  The optional style references.
          */
        svgElement(key: string, styleRef?: string): SVGElement;
        /**
          * Gets local string.
          * @param key  The template key.
          * @param lang  The opitonal market code string for a sepecific one.
          */
        localString(key: string, lang?: string): string;
    }
    /**
      * String set.
      */
    class Strings {
        private _strings;
        /**
          * The market code for default language using.
          */
        defaultLang: string;
        /**
          * Registers a language pack.
          * @param lang  The market code.
          * @param value  The language pack.
          * @param override  true if override original one if existed; otherwise, false.
          */
        reg(lang: string, value: Collection.DictionaryContract<string> | Object, override?: boolean): void;
        /**
          * Gets or sets the string for a specific market.
          * @param lang  The market code.
          * @param key  The template key.
          * @param value  The opitonal value to set.
          */
        specificField(lang: string, key: string, value?: string): string;
        /**
          * Gets or sets local string.
          * @param key  The template key.
          * @param value  The opitonal value to set.
          */
        localField(key: string, value?: string): string;
        /**
          * Gets or sets global string.
          * @param key  The template key.
          * @param value  The opitonal value to set.
          */
        globalField(key: string, value?: string): string;
        /**
          * Copies a set of strings to an object as properties.
          * @param obj  The target object to copy to.
          * @param keys  The template keys.
          */
        copyFields(obj: Object, keys?: string[]): any;
        copyFieldToElement(key: string, element: string | HTMLElement | string[] | HTMLElement[]): string;
        copyFieldToInputElement(key: string, element: string | HTMLInputElement | HTMLTextAreaElement | string[] | HTMLInputElement[] | HTMLTextAreaElement[]): string;
        /**
          * Gets local string.
          * @param key  The template key.
          * @param lang  The opitonal market code string for a sepecific one.
          */
        field(key: string, lang?: string): string;
        private _lang(lang?, init?);
    }
    function factory(extender?: Common.Action1<Object>): () => {
        templates: (subject: string, createIfExist?: boolean) => Templates;
        iconfonts: (subject: string, value?: boolean | IconFontCollection) => IconFontCollection;
        market: (lang?: string | boolean) => string;
    };
    /**
      * Gets a template set.
      * @param subject  The subject name.
      * @param createIfExist  A flag or handler for creation if the template set is empty currently.
      */
    function templates(subject: string, createIfExist?: boolean | Common.Action1<Templates>): Templates;
    /**
      * Gets or sets settings.
      * @param subject  The subject name.
      * @param key  The template key.
      * @param value  The optional value to set.
      */
    function settings<T>(subject: string, key: string, value?: T): T;
    /**
      * Gets or sets HTML template.
      * @param subject  The subject name.
      * @param key  The template key.
      * @param value  The optional value to set.
      */
    function html(subject: string, key: string, value?: string): string;
    /**
      * Gets or sets SVG template.
      * @param subject  The subject name.
      * @param key  The template key.
      * @param value  The optional value to set.
      */
    function svg(subject: string, key: string, value?: string): string;
    /**
      * Gets SVG element from templates.
      * @param subject  The subject name.
      * @param key  The template key.
      * @param styleRef  The optional style references.
      */
    function svgElement(subject: string, key: string, styleRef?: string): SVGElement;
    function iconfonts(subject: string, value?: IconFontCollection | boolean): IconFontCollection;
    /**
      * Gets local string.
      * @param subject  The subject name.
      * @param key  The template key.
      * @param lang  The opitonal market code string for a sepecific one.
      */
    function strings(subject: string, key: string, lang?: string): string;
    /**
      * Gets or sets current market code.
      * @param lang  The optional market code to set.
      */
    function market(lang?: string | boolean): string;
    function builtIn(): Templates;
}
declare namespace AliHub.Users {
    /**
      * Phone number information.
      */
    interface PhoneNumberContract {
        region: number;
        city?: string;
        no: string;
        ext?: string;
    }
    /**
      * Member profile contract.
      */
    interface ProfileContract extends Common.UrlAvatarItemContract {
        /**
          * Birthday.
          */
        birthday?: Date;
        /**
          * Gender.
          */
        gender?: string;
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
          */
        mobile?: string;
        /**
          * Email address.
          */
        email?: string;
        /**
          * Phone numbers.
          */
        phone?: Collection.KeyValuePairContract<string, string>[];
    }
    /**
      * Comment information.
      */
    interface CommentContract extends Common.IdentifiedContract {
        sender: string;
        message: string;
        created: number;
    }
    /**
      * Principle information.
      */
    interface PrincipleContract {
        profile: ProfileContract;
        permission: Collection.DictionaryContract<boolean>;
        contact: Collection.DictionaryContract<string>;
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
    /**
      * Checks whether the current user has signed in.
      */
    function logined(): boolean;
    /**
      * Gets or sets principle for current user.
      * @param value  the principle to set as current.
      */
    function principle(value?: PrincipleContract): PrincipleContract;
    /**
      * Gets or sets the profile for current user.
      * @param value  the user model to set as current user.
      */
    function profile(value?: ProfileContract): ProfileContract;
    /**
      * Checks given user information is about me.
      * @param model  the user model to test.
      */
    function isMe(model: Common.IdentifiedContract | string): boolean;
    /**
      * Gets or sets the permission set for current user.
      * @param value  A dictionary to set permission.
      */
    function permissionSet(value?: Collection.DictionaryContract<boolean>): Collection.DictionaryContract<boolean>;
    /**
      * Checks if the current user has a permission.
      */
    function hasPermission(key: string, ignoreLogin?: boolean): boolean;
    /**
      * Sets the permission for current user.
      */
    function configPermission(key: string, value: boolean): void;
    /**
      * Profile card.
      */
    class ProfileCard extends Common.VisualControl {
        /**
          * Initializes a new instance of the ProfileCard class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        constructor(id: Common.VisualControlElementContract);
        private _renderLayout();
    }
}
declare namespace AliHub.Common {
    interface TextPositionContract {
        start: number;
        end: number;
        q: string;
    }
    /**
      * Text and related.
      */
    class Text {
        private static _base64EncodeChars;
        private static _base64DecodeChars;
        /**
          * Copies a string.
          * @param value  The value to copy.
          */
        static copy(value: string): void;
        /**
          * Formats a string.
          * @param template  The source string.
          * @param parameters  The object or array of parameters.
          * @param urlEncode  A value indicating whether this is for URI components.
          * @param preBag  A property bag for preparing.
          */
        static format(template: string, parameters?: any, uriComponent?: boolean, preBag?: string[] | Func<string[]>, propPrefix?: string): string;
        /**
          * Trims a string.
          * @param str  The string to trim.
          */
        static trim(str: string): string;
        /**
          * Left trims a string.
          * @param str  The string to remove left white spaces.
          */
        static leftTrim(str: string): string;
        /**
          * Right trims a string.
          * @param str  The string to remove right white spaces.
          */
        static rightTrim(str: string): string;
        /**
          * Converts HTML to text.
          * @param html  The HTML string.
          * @param emptyForNull  true if return empty string if input is null; otherwise, false.
          */
        static parseHTML(html: string, emptyForNull?: boolean): string;
        /**
          * Encodes text to HTML.
          * @param text  The text to encode.
          * @param emptyForNull  true if return empty string if input is null; otherwise, false.
          */
        static toHTML(text: string, emptyForNull?: boolean): string;
        static serialize(obj: any, onlyJson?: boolean): string;
        /**
          * Returns the position of the first occurrence of a substring.
          * @param searchString The substring to search for in the string
          * @param position The index at which to begin searching the String object. If omitted, search starts at the beginning of the string.
          * @param last true if search the last one of position items; otherwise, false.
          * @param negative true if search from last; otherwise, false.
          */
        static indexOf(str: string, q: string | number | (string | number)[], last?: boolean, negative?: boolean): TextPositionContract;
        /**
           * Encodes to base64.
           * @param str The string to convert.
           */
        static base64encode(str: string): string;
        /**
         * Decodes from base64.
          * @param str The string to convert.
          */
        static base64decode(str: string): string;
        /**
          * Converts UTF-16 to UTF-8.
          * @param str The string to convert.
          */
        static utf16to8(str: string): string;
        /**
          * Converts UTF-8 to UTF-16.
          * @param str The string to convert.
          */
        static utf8to16(str: string): string;
    }
}
declare namespace AliHub.Web {
    /**
      * Response task with result.
      */
    interface ResponseTask<T> extends PromiseLike<Web.ResponseContract<T>> {
    }
    /**
      * Response task without result.
      */
    interface EmptyResponseTask extends PromiseLike<Web.EmptyResponseContract> {
    }
    /**
      * Package contract with entry or raw data.
      */
    interface PackageContract<T> {
        success: boolean;
        message: string;
        timestamp: Date;
        data: T;
        sent: Date;
        received: Date;
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
        [property: string]: any;
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
    /**
      * Heart beat request.
      */
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
      * Web resolver information contract.
      */
    interface WebResolverInfoContract<T> {
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
    interface WebResolverBindingContract {
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
    interface RestJobContract {
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
    interface DataPackageJobContract {
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
    class RestJob implements Web.RestJobContract {
        private static _instance;
        /**
          * Gets or sets default instance.
          */
        static instance(value?: RestJobContract): RestJobContract;
        /**
          * Sends by POST.
          */
        static postInfo<T>(template: string, parameters: any, data: any, canBeEmpty?: boolean, validation?: (value: T) => boolean): PromiseLike<T>;
        /**
          * Sends by POST.
          */
        static postEmpty(template: string, parameters: any, data: any): PromiseLike<boolean>;
        /**
          * Sends by GET.
          */
        static getInfo<T>(template: string, parameters: any, canBeEmpty?: boolean, validation?: (value: T) => boolean): PromiseLike<T>;
        /**
          * Sends by GET.
          */
        static getEmpty(template: string, parameters: any): PromiseLike<boolean>;
        /**
          * Sends by GET to resolve a string.
          */
        static getString(template: string, parameters: any, canBeEmpty?: boolean): PromiseLike<string>;
        /**
          * Sends by POST.
          */
        postInfo<T>(template: string, parameters: any, data: any, canBeEmpty?: boolean, validation?: (value: T) => boolean, convertor?: (value: T) => T): PromiseLike<T>;
        /**
          * Sends by POST.
          */
        postEmpty(template: string, parameters: any, data: any): PromiseLike<boolean>;
        /**
          * Sends by GET.
          */
        getInfo<T>(template: string, parameters: any, canBeEmpty?: boolean, validation?: (value: T) => boolean, convertor?: (value: T) => T): PromiseLike<T>;
        /**
          * Sends by GET.
          */
        getEmpty(template: string, parameters: any): PromiseLike<boolean>;
        /**
          * Sends by GET to resolve a string.
          */
        getString(template: string, parameters: any, canBeEmpty?: boolean): PromiseLike<string>;
    }
    /**
      * Data package accessing job.
      */
    class DataPackageJob implements Web.DataPackageJobContract {
        private static _instance;
        /**
          * Gets or sets default instance.
          */
        static instance(value?: DataPackageJob): DataPackageJobContract;
        /**
          * Sends by POST.
          */
        static postInfo<T>(template: string, parameters: any, data: any, canBeEmpty?: boolean, convertor?: (value: T) => T): Web.ResponseTask<T>;
        /**
          * Sends by POST.
          */
        static postEmpty<T>(template: string, parameters: any, data: any): Web.EmptyResponseTask;
        /**
          * Sends by GET.
          */
        static getInfo<T>(template: string, parameters: any, canBeEmpty?: boolean, convertor?: (value: T) => T): Web.ResponseTask<T>;
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
        /**
          * Updgrade package.
          */
        static upgradePackage<T>(value: Web.PackageContract<T> | Web.ObsoletePackageContract<Web.ResponseContract<T>> | Web.ObsoletePackageContract<Web.EmptyResponseContract>, sent?: Date): Web.PackageContract<T>;
        /**
          * Sends by POST.
          */
        postInfo<T>(template: string, parameters: any, data: any, canBeEmpty?: boolean, convertor?: (value: T) => T): Web.ResponseTask<T>;
        /**
          * Sends by POST.
          */
        postEmpty<T>(template: string, parameters: any, data: any): Web.EmptyResponseTask;
        /**
          * Sends by GET.
          */
        getInfo<T>(template: string, parameters: any, canBeEmpty?: boolean, convertor?: (value: T) => T): Web.ResponseTask<T>;
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
    class StaticDataPackageResolver<T> {
        private _data;
        data(value?: T): T;
        resolve(): Web.ResponseTask<T>;
    }
    abstract class BaseDataPackageResolver<T> {
        info: WebResolverInfoContract<T>;
        constructor(info?: WebResolverInfoContract<T>, subject?: string, key?: string);
        pathTemplate(value?: string): string;
    }
    class DataPackageResolver<T> extends BaseDataPackageResolver<T> {
        constructor(info?: WebResolverInfoContract<T>, subject?: string, key?: string);
        resolve(model?: any): Web.ResponseTask<T>;
    }
    class RequestDataPackageResolver<TRequest, TResponse> extends BaseDataPackageResolver<TResponse> {
        constructor(info?: WebResolverInfoContract<TResponse>, subject?: string, key?: string);
        resolve(model: TRequest): Web.ResponseTask<TResponse>;
    }
    class IdentifiedDataPackageResolver<T> extends BaseDataPackageResolver<T> {
        constructor(info?: WebResolverInfoContract<T>, subject?: string, key?: string);
        resolve(id: string, model?: any): Web.ResponseTask<T>;
    }
    class NamedDataPackageResolver<T> extends BaseDataPackageResolver<T> {
        constructor(info?: WebResolverInfoContract<T>, subject?: string, key?: string);
        resolve(name: string, model?: any): Web.ResponseTask<T>;
    }
    class PostDataPackageResolver<TRequest, TResponse> extends BaseDataPackageResolver<TResponse> {
        constructor(info?: WebResolverInfoContract<TResponse>, subject?: string, key?: string);
        resolve(model: TRequest, data: any): Web.ResponseTask<TResponse>;
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
    function callbackQuery(url: string): string;
    /**
      * Gets or sets the resolver.
      */
    function resolver<T>(subject: string | HTMLElement | Common.VisualControl, key: string, value?: string | WebResolverInfoContract<T>): RequestDataPackageResolver<any, T>;
    /**
      * Creates resolvers.
      */
    function createResolvers(col: WebResolverBindingContract[]): void;
    /**
      * Batch adds URL templates.
      */
    function setUrlTemplates(subject: string, urls: Common.ClassicObject): string[];
    /**
      * Resolves data by GET.
      */
    function resolve<T>(subject: string | HTMLElement | Common.VisualControl, key: string | Web.BaseDataPackageResolver<T>, parameters?: any): Web.ResponseTask<T>;
    /**
      * Resolves empty by GET.
      */
    function resolveEmpty(subject: string | HTMLElement | Common.VisualControl, key: string | Web.BaseDataPackageResolver<any>, parameters?: any): Web.EmptyResponseTask;
    /**
      * Resolves data by POST.
      */
    function resolveByPost<T>(subject: string | HTMLElement | Common.VisualControl, key: string | Web.BaseDataPackageResolver<T>, parameters?: any, data?: any): Web.ResponseTask<T>;
    /**
      * Resolves empty by POST.
      */
    function resolveEmptyByPost(subject: string | HTMLElement | Common.VisualControl, key: string | Web.BaseDataPackageResolver<any>, parameters?: any, data?: any): Web.EmptyResponseTask;
    /**
      * Builds a parameter string.
      */
    function buildParaString(parameters: any): string;
}
declare namespace AliHub.Bindings {
    /**
      * Options contract for binding.
      */
    interface OptionsContract {
        ko?: KnockoutClientContract | boolean;
        override?: boolean;
    }
    interface AngularClientContract {
        module: Function;
    }
    interface KnockoutClientContract {
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
    /**
      * Sets up the bindings.
      */
    function setup(options?: OptionsContract): void;
    /**
      * Creates binding provider.
      */
    function bindingProvider(value?: KnockoutClientContract): any;
    /**
      * KnockoutJs binding factory.
      * http://knockoutjs.com/
      */
    class KnockoutBindingFactory implements AliHub.Common.BindingFactoryContract {
        private static _instance;
        /**
          * Singleton instance.
          */
        static instance(): KnockoutBindingFactory;
        /**
          * The binding provider which is the Knockout instance.
          */
        provider: KnockoutClientContract;
        /**
          * Checks whether the instance is alive.
          */
        alive(): boolean;
        /**
          * Creates an observable object.
          */
        create<T>(value?: T): AliHub.Common.BindingObjectContract<T>;
        /**
          * Creates an observable array.
          */
        createArray<T>(col?: T[]): AliHub.Collection.BindingArrayContract<T>;
        /**
          * Creates a computed instance.
          */
        createComputed<T>(h: AliHub.Common.Func<T>, context?: any): any;
        /**
          * Checks whether the instance is observable.
          */
        isObservable(instance: any): boolean;
        /**
          * Checks whether the instance is computed.
          */
        isComputed(instance: any): boolean;
        /**
          * Converts to JSON.
          */
        toJson(viewModel: any): any;
        applyBindings(control: Common.VisualControl & Common.BindingContainerContract<any>): void;
        /**
          * Unwraps.
          */
        unwrap(value: any): any;
    }
    /**
      * Binds for Flipper.
      * http://gitlab.alibaba-inc.com/crm/flipper
      */
    function bindFlipper<T extends Common.VisualControl>(instance: any, reload?: boolean): T;
    /**
      * Binds AngularJs 1.x for a control.
      * https://angularjs.org/
      */
    function bindAngularJs(control: Common.VisualControl & Common.BindingContainerContract<any>): void;
    /**
      * Register AngularJs controller for a binding control.
      * https://angularjs.org/
      */
    function registerAngularJsModule(angularInstance?: AngularClientContract): any;
    function angularScopeGet<T>($scope: any, key: string, parameter: any, done?: Common.Action1<T>, fail?: Common.Action1<any>, target?: any): Web.ResponseTask<T>;
    function angularScopePost<T>($scope: any, key: string, parameter: any, data: any, done?: Common.Action1<T>, fail?: Common.Action1<any>, target?: any): Web.ResponseTask<T>;
    /**
      * Vue.js binding function.
      * http://vuejs.org/
      */
    function bindVueJs(control: Common.VisualControl & Common.BindingContainerContract<any>): void;
    /**
      * Creates an instance of Taobao JsTracker.
      * http://jstracker.taobao.net
      */
    function taobaoJsTracker(): AliHub.Diagnostics.TrackerContract;
    /**
      * Goldlog.
      * http://shuju.taobao.ali.com/main/adminIndex.htm
      */
    class GoldlogTracker implements AliHub.Diagnostics.PageAnalyticsClientContract {
        private static _instance;
        /**
          * Singleton instance.
          */
        static instance(): GoldlogTracker;
        private _mapping;
        /**
          * Records a stamp.
          */
        record(key: string, parameter?: any): void;
        /**
          * Records directly.
          */
        recordDirectly(a1: any, a2: any, a3: any, a4: any): void;
        /**
          * Checks whether the instance is alive.
          */
        alive(): boolean;
        /**
          * Sets up a mapping.
          */
        map(dict: AliHub.Collection.DictionaryContract<string[]>): void;
        push(key: string, value: string[]): void;
        remove(key: string): void;
        clear(): void;
        static request(a1: any, a2: any, a3: any, a4: any): void;
    }
    /**
      * High charts factory.
      * http://highcharts.com/
      */
    class HighChartsFactory {
        static setup(override?: boolean): void;
        static radar(element: HTMLElement, title: string, data: AliHub.Collection.PropertiesContract<number>): void;
        static line(element: HTMLElement, title: string, data: AliHub.Collection.PropertiesContract<number>, options?: Graph.LineOptionsContract): void;
        static pie(element: HTMLElement, title: string, data: AliHub.Collection.PropertiesContract<number>, options?: Graph.PieOptionsContract): void;
    }
}
declare namespace AliHub.Res {
    /**
      * Language pack for zh-Hans.
      */
    class Lp_zhHans implements LanguagePackContract {
        lang: string;
        strings: {
            homepage: string;
            appCenter: string;
            page: string;
            pages: string;
            first: string;
            last: string;
            previous: string;
            next: string;
            total: string;
            current: string;
            index: string;
            bindingError: string;
            refresh: string;
            reload: string;
            member: string;
            myMembers: string;
            recentDays: string;
            planned: string;
            processing: string;
            completed: string;
            ladyName: string;
            gentlemanName: string;
            reminder: string;
            note: string;
            totalScore: string;
            cents: string;
            level: string;
            collapse: string;
            expand: string;
            showAll: string;
            followUp: string;
            noFollowUp: string;
            memberTags: string;
            types: string;
            history: string;
            trend: string;
            distribution: string;
            newTasks: string;
            bizTasks: string;
            summaryReports: string;
            jobMgm: string;
            createTask: string;
            seeMore: string;
            exit: string;
            register: string;
            login: string;
            logout: string;
            search: string;
            filter: string;
            typeKeywords: string;
            requestHelp: string;
            cannotFind: string;
            newItem: string;
            createItem: string;
            addItem: string;
            getItem: string;
            setItem: string;
            modifyItem: string;
            updateItem: string;
            replaceItem: string;
            overrideItem: string;
            fillItem: string;
            removeItem: string;
            deleteItem: string;
            clearItem: string;
            cleanUp: string;
            ok: string;
            save: string;
            cancel: string;
            turnBack: string;
            rollback: string;
            undo: string;
            redo: string;
            cut: string;
            copy: string;
            copySomething: string;
            paste: string;
            clipboard: string;
            navigateTo: string;
            settings: string;
            options: string;
            profile: string;
            draft: string;
            open: string;
            close: string;
            turnOn: string;
            turnOff: string;
            layout: string;
            add: string;
            insert: string;
            edit: string;
            remove: string;
            delete: string;
            clear: string;
            title: string;
            content: string;
            text: string;
            richtext: string;
            properties: string;
            wizard: string;
            slide: string;
            photo: string;
            image: string;
            images: string;
            audio: string;
            video: string;
            movie: string;
            movies: string;
            document: string;
            documents: string;
            link: string;
            links: string;
            hyperlink: string;
            website: string;
            sns: string;
            favorate: string;
            game: string;
            games: string;
            file: string;
            files: string;
            folder: string;
            dir: string;
            moveUp: string;
            moveRight: string;
            moveDown: string;
            moveLeft: string;
            module: string;
            component: string;
            chapter: string;
            section: string;
            update: string;
            upload: string;
            download: string;
            switch: string;
            switchCamera: string;
            capturePhoto: string;
            record: string;
            assign: string;
            reassign: string;
            flag: string;
            send: string;
            reply: string;
            replyAll: string;
            forward: string;
            cc: string;
            bcc: string;
            phoneCall: string;
            contact: string;
            contactMember: string;
            attach: string;
            attachment: string;
            expired: string;
            message: string;
            notification: string;
            feedback: string;
            help: string;
            support: string;
            window: string;
            aries: string;
            taurus: string;
            gemini: string;
            cancer: string;
            leo: string;
            virgo: string;
            libra: string;
            scorpio: string;
            sagittarius: string;
            capricorn: string;
            aquarius: string;
            pisces: string;
            ophiuchus: string;
            horoscope: string;
            astrology: string;
            loading: string;
            failToLoadData: string;
            surname: string;
            givenname: string;
            middleName: string;
            nickname: string;
            city: string;
            street: string;
            country: string;
            birthday: string;
            age: string;
            gender: string;
            male: string;
            female: string;
            other: string;
            fromSource: string;
            toTarget: string;
            millisecondsNum: string;
            secondsNum: string;
            minutesNum: string;
            hoursNum: string;
            daysNum: string;
            weeksNum: string;
            timeLocaleSep: string;
            today: string;
            tomorrowTime: string;
            tomorrow: string;
            secondsAgo: string;
            minuteAgo: string;
            minutesTwoAgo: string;
            minutesAgo: string;
            hourAgo: string;
            hoursTwoAgo: string;
            hoursAgo: string;
            yesterdayTime: string;
            yesterday: string;
            daysTwoAgo: string;
            daysAgo: string;
            lastWeekDay: string;
            lastWeek: string;
            future: string;
            date: string;
            day: string;
            week: string;
            weekday: string;
            weekend: string;
            week0c: string;
            week1c: string;
            week2c: string;
            week3c: string;
            week4c: string;
            week5c: string;
            week6c: string;
            week0s: string;
            week1s: string;
            week2s: string;
            week3s: string;
            week4s: string;
            week5s: string;
            week6s: string;
            week0f: string;
            week1f: string;
            week2f: string;
            week3f: string;
            week4f: string;
            week5f: string;
            week6f: string;
            week0t: string;
            week1t: string;
            week2t: string;
            week3t: string;
            week4t: string;
            week5t: string;
            week6t: string;
            month: string;
            month0s: string;
            month1s: string;
            month2s: string;
            month3s: string;
            month4s: string;
            month5s: string;
            month6s: string;
            month7s: string;
            month8s: string;
            month9s: string;
            monthAs: string;
            monthBs: string;
            month0f: string;
            month1f: string;
            month2f: string;
            month3f: string;
            month4f: string;
            month5f: string;
            month6f: string;
            month7f: string;
            month8f: string;
            month9f: string;
            monthAf: string;
            monthBf: string;
            year: string;
            am: string;
            pm: string;
            empty: string;
            commaSymbol: string;
            colonSymbol: string;
            ellipsisSymbol: string;
            semicolonSymbol: string;
            enumCommaSymbol: string;
            periodSymbol: string;
        };
        template(templ: AliHub.Res.Templates): AliHub.Res.Templates;
    }
    /**
      * Language pack for zh-Hant.
      */
    class Lp_zhHant implements LanguagePackContract {
        lang: string;
        strings: {
            homepage: string;
            appCenter: string;
            page: string;
            pages: string;
            first: string;
            last: string;
            previous: string;
            next: string;
            total: string;
            current: string;
            index: string;
            bindingError: string;
            refresh: string;
            reload: string;
            member: string;
            myMembers: string;
            recentDays: string;
            planned: string;
            processing: string;
            completed: string;
            ladyName: string;
            gentlemanName: string;
            reminder: string;
            note: string;
            totalScore: string;
            cents: string;
            level: string;
            collapse: string;
            expand: string;
            showAll: string;
            followUp: string;
            noFollowUp: string;
            memberTags: string;
            types: string;
            history: string;
            trend: string;
            distribution: string;
            newTasks: string;
            bizTasks: string;
            summaryReports: string;
            jobMgm: string;
            createTask: string;
            seeMore: string;
            exit: string;
            register: string;
            login: string;
            logout: string;
            search: string;
            filter: string;
            typeKeywords: string;
            requestHelp: string;
            cannotFind: string;
            newItem: string;
            createItem: string;
            addItem: string;
            getItem: string;
            setItem: string;
            modifyItem: string;
            updateItem: string;
            replaceItem: string;
            overrideItem: string;
            fillItem: string;
            removeItem: string;
            deleteItem: string;
            clearItem: string;
            cleanUp: string;
            ok: string;
            save: string;
            cancel: string;
            turnBack: string;
            rollback: string;
            undo: string;
            redo: string;
            cut: string;
            copy: string;
            copySomething: string;
            paste: string;
            clipboard: string;
            navigateTo: string;
            settings: string;
            options: string;
            profile: string;
            draft: string;
            open: string;
            close: string;
            turnOn: string;
            turnOff: string;
            layout: string;
            add: string;
            insert: string;
            edit: string;
            remove: string;
            delete: string;
            clear: string;
            title: string;
            content: string;
            text: string;
            richtext: string;
            properties: string;
            wizard: string;
            slide: string;
            photo: string;
            image: string;
            images: string;
            audio: string;
            video: string;
            movie: string;
            movies: string;
            document: string;
            documents: string;
            link: string;
            links: string;
            hyperlink: string;
            website: string;
            sns: string;
            favorate: string;
            game: string;
            games: string;
            file: string;
            files: string;
            folder: string;
            dir: string;
            moveUp: string;
            moveRight: string;
            moveDown: string;
            moveLeft: string;
            module: string;
            component: string;
            chapter: string;
            section: string;
            update: string;
            upload: string;
            download: string;
            switch: string;
            switchCamera: string;
            capturePhoto: string;
            record: string;
            assign: string;
            reassign: string;
            flag: string;
            send: string;
            reply: string;
            replyAll: string;
            forward: string;
            cc: string;
            bcc: string;
            phoneCall: string;
            contact: string;
            contactMember: string;
            attach: string;
            attachment: string;
            expired: string;
            message: string;
            notification: string;
            feedback: string;
            help: string;
            support: string;
            window: string;
            aries: string;
            taurus: string;
            gemini: string;
            cancer: string;
            leo: string;
            virgo: string;
            libra: string;
            scorpio: string;
            sagittarius: string;
            capricorn: string;
            aquarius: string;
            pisces: string;
            ophiuchus: string;
            horoscope: string;
            astrology: string;
            loading: string;
            failToLoadData: string;
            surname: string;
            givenname: string;
            middleName: string;
            nickname: string;
            city: string;
            street: string;
            country: string;
        };
        template(templ: AliHub.Res.Templates): AliHub.Res.Templates;
    }
}
