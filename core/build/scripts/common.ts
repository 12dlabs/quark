/*  --------------------
 *  Core Library - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  common.ts
 *  Description  Client core script library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

declare namespace AliHub.Runtime {

    /**
      * Loads a specific module.
      */
    var loadModule: (name: string, path: string) => any;

}

namespace AliHub.Common {

    /**
      * Visual control element.
      */
    export type VisualControlElementContract = string | HTMLElement | VisualControlParentIdContract;

    export type ItemWithBoolean<T> = T | boolean | Func<T>;

    /**
      * Visual control identifier with parent information.
      */
    export interface VisualControlParentIdContract {
        parent: string | HTMLElement | VisualControl | Document | Window;
        suffix: string;
        styleRef?: string | string[];
    }

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
      * Action with 5 parameters.
      */
    export interface Action5<T1, T2, T3, T4, T5> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5): void;
    }

    /**
      * Action with 6 parameters.
      */
    export interface Action6<T1, T2, T3, T4, T5, T6> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6): void;
    }

    /**
      * Action with 7 parameters.
      */
    export interface Action7<T1, T2, T3, T4, T5, T6, T7> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7): void;
    }

    /**
      * Action with 8 parameters.
      */
    export interface Action8<T1, T2, T3, T4, T5, T6, T7, T8> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8): void;
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
      * Function with 5 parameters.
      */
    export interface Func5<T1, T2, T3, T4, T5, TResult> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5): TResult;
    }

    /**
      * Function with 6 parameters.
      */
    export interface Func6<T1, T2, T3, T4, T5, T6, TResult> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6): TResult;
    }

    /**
      * Function with 7 parameters.
      */
    export interface Func7<T1, T2, T3, T4, T5, T6, T7, TResult> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7): TResult;
    }

    /**
      * Function with 8 parameters.
      */
    export interface Func8<T1, T2, T3, T4, T5, T6, T7, T8, TResult> {
        (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8): TResult;
    }

    /**
      * Equatable function handler.
      */
    export interface EquatableFunc<T> {

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
    export interface EventHandler<T> {
        (ev: T): void;
    }

    /**
      * Classic object.
      */
    export interface ClassicObject {
        [property: string]: any;
    }

    /**
      * Processing task.
      */
    export interface ProcessingTask {
        process(): void;
        [property: string]: any;
    }

    /**
      * Processing task.
      */
    export interface ObjectProcessingTask<T> {
        process(object: T): void;
    }

    /**
      * Cancellable task.
      */
    export interface CancelableTask extends ProcessingTask {
        cancel(): void;
    }

    export interface DeferredContract<T> {
        resolve(value?: T);
        reject(reason?: any);
        promise(): PromiseLike<T>;
        [property: string]: any;
    }

    export interface IdentifiedContract {
        id: string;
        [property: string]: any;
    }

    export interface NamedContract {
        name: string;
        [property: string]: any;
    }

    export interface SimpleEntryContract extends IdentifiedContract, NamedContract {
    }

    /**
      * Avatar with item info contract.
      */
    export interface UrlAvatarItemContract extends SimpleEntryContract {
        avatar?: string;
    }

    /**
      * Value changed arguments.
      */
    export interface ValueChangedArgsContract<T> {

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
    export interface ReferenceItemContract {

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

    export interface SenderItemContract {
        id?: string;
        name: string;
        intro?: string;
        avatar?: AliHub.Graph.ImageContract;
        url?: string;
    }

    export interface ActiveItemContract {
        onload?: Action;
        onactive?: Action;
        oninactive?: Action;
        onclose?: Action;
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

    export interface EntityBindingContract<T> extends Common.ListenedObjectContract<string> {
        getEntity(): T;
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

        [property: string]: any;
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

        /**
          * Additional properties.
          */
        [key: string]: any;

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

        /**
          * Additional properties.
          */
        [key: string]: any;

    }

    /**
      * Disposable.
      */
    export interface DisposableContract {

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
    export interface ControlInfoContract {
        index: number;
        key: string;
        control: Common.VisualControl;
        model: any;
    }

    /**
      * Options of continuity task.
      */
    export interface ContinuityTaskOptionsContract {

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
    export interface VisualControlOptionsContract<T extends VisualControl> {

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
    export interface ActivityControlOptionsContract extends VisualControlOptionsContract<ActivityControl> {
    }

    /**
      * Binding control options.
      */
    export interface BindingControlOptionsContract<T> extends VisualControlOptionsContract<BindingControl<T>> {

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
        webData?: { subject?: string, key: string | Web.BaseDataPackageResolver<T>, parameters?: any }
    }

    /**
      * Binding factory contract.
      */
    export interface BindingFactoryContract {

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
        applyBindings(control: VisualControl & BindingContainerContract<any>);
    }

    /**
      * Binding object.
      */
    export interface BindingObjectContract<T> {

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

    export interface ListenedObjectContract<T> extends BindingObjectContract<T> {
        referenceKey?: string;
        listenChanging(h: (ev: ValueChangedArgsContract<T>) => void, target?: any, disposableList?: Collection.DisposableArray, args?: any, remove?: Common.Func3<ValueChangedArgsContract<T>, any, number, boolean>): DisposableContract;
        listen(h: (ev: ValueChangedArgsContract<T>) => void, target?: any, disposableList?: Collection.DisposableArray, args?: any, remove?: Common.Func3<ValueChangedArgsContract<T>, any, number, boolean>): DisposableContract;
        listenOnce(h: (ev: ValueChangedArgsContract<T>) => void, target?: any): DisposableContract;
        unlisten(h: (ev: ValueChangedArgsContract<T>) => void): void;
        unlistenChanging(h: (ev: ValueChangedArgsContract<T>) => void): void;
        forceToNotify(delay?: boolean | number): void;
        clearListener(): void;
        clearChangingListener(): void;
        format(newValue: T, oldValue: T): T;
        model(value?: T, forceToNotify?: boolean): T;
        copyModel(): T;
        changeTimes(): number;
        setterCalledTimes(): number;
        bag: any;
        loadFromWeb(subject: string | HTMLElement | VisualControl, key: string | Web.BaseDataPackageResolver<T>, parameters?: any): Web.ResponseTask<T>;
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
        model? (control: BindingControl<T>): any;

        /**
          * Loads after done.
          * @param control  The target control. 
          */
        load? (control: BindingControl<T>): void;

    }

    export interface BindingContainerContract<T> {

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
    export interface BioCoordinate {

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
    export interface InvalidContract {

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
    export interface PlaneCoordinate {

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
    export interface StereoscopicCoordinate extends PlaneCoordinate {

        /**
          * Z for height.
          */
        z: number;
    }

    /**
      * 4D coordinate.
      */
    export interface SpacetimeCoordinate extends StereoscopicCoordinate {

        /**
          * T for time.
          */
        t: number;
    }

    export interface PositionContract {
        top: number;
        right: number;
        bottom: number;
        left: number;
    }

    /**
      * Date time options.
      */
    export interface DateTimeOptionsContract {
        force24h?: boolean;
        precision?: TimePrecisions;
    }

    /**
      * Time span.
      */
    export interface TimeSpanContract {
        Days: number;
        Hours: number;
        Minutes: number;
        Seconds: number;
        Milliseconds: number;
    }

    /**
      * The sensitive levels.
      */
    export enum SensitiveLevels {
        Unknown = 0,
        Hbi = 1,
        Mbi = 2,
        Lbi = 3,
        None = 7
    }

    /**
      * The time precisions.
      */
    export enum TimePrecisions {
        Unknown = 0,
        Millisecond = 1,
        Second = 2,
        Minute = 3,
        Hour = 4,
        Day = 5
    }

    class Inner {
        public static bindingFactory: BindingFactoryContract;
        public static templateEngines = { "none": (c) => { } };
        public static defaultTemplateEngine: string;
    }

    /**
      * Visual control.
      */
    export class VisualControl implements Common.DisposableContract {
        private _increaseNumber = 0;
        private _increaseNumberReset = false;
        private _containerElement: HTMLElement;
        private _properties: any = {};
        private _propertyHandlers: any = {};
        private _templateParts: any = {};

        /**
          * Adds or removes an event occured when the property is changed. 
          */
        public propChanged = new Collection.EventHandlers<Collection.ValueChangedContract<any>>();

        /**
          * Adds or removes an event occured when there are nodes appended. 
          */
        public nodeAppended = new Collection.EventHandlers<Node[]>();

        /**
          * A disposable array which will be loaded during this instance is disposed. 
          */
        public disposableContainer = new Collection.DisposableArray();

        /**
          * Initializes a new instance of the VisualControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones. 
          */
        constructor(id: VisualControlElementContract) {
            var containerId = Maths.randomString("ali_content_ele_n_ri");
            var container: HTMLElement = null;
            if (!id) {
            } else if (typeof id === "string") {
                containerId = id;
                if (containerId.indexOf("__view_control_") === 0) {
                    var parentId = Common.parentControl(containerId);
                    containerId = containerId.replace("__view_control_", parentId ? parentId.getId() : "");
                }
            } else if ((id as HTMLElement).tagName) {
                container = id as HTMLElement;
                var parentControl = Common.parentControl(container);
                if (!container.id && !container.getAttribute("data-control-id")) {
                    container.id = Maths.randomString(parentControl && parentControl.getId() ? parentControl.getId() : "ali_content_ele_e_ri");
                } else if (!container.id && container.getAttribute("data-control-id")) {
                    container.id = Elements.mergeId(parentControl && parentControl.getId() ? parentControl.getId() : "", [container.getAttribute("data-control-id")]);
                }

                containerId = container.id;
            } else if ((id as VisualControlParentIdContract).parent && (id as VisualControlParentIdContract).suffix) {
                var parentInfo = id as VisualControlParentIdContract;
                var ele = AliHub.Elements.getById(parentInfo.parent);
                if ((ele as any as Document).body || (ele as any as Document).documentElement || (ele as any as Window).parent) {
                    containerId = (parentInfo.suffix.toString().indexOf("_") === 0 ? "ali_container_ele_b" : "") + parentInfo.suffix.toString();
                } else if (ele) {
                    containerId = ele.id + (parentInfo.suffix.toString().indexOf("_") === 0 ? "" : "_") + parentInfo.suffix.toString();
                    container = Elements.getById(containerId);
                    if (!container) {
                        container = document.createElement("div");
                        container.id = containerId;
                        ele.appendChild(container);
                    }

                    AliHub.Elements.changeStyleRef(container, parentInfo.styleRef);
                }
            }

            if (!container) container = Elements.getById(containerId);
            this._containerElement = container;
            if (!container) {
                return;
            }

            this.addStyleRef("ali-controls-item");
            if (container.children) for (var step = 0; step < container.children.length; step++) {
                var templateP = container.children[step] as HTMLElement;
                if (templateP && templateP.tagName && (templateP.tagName.toString().toLowerCase() === "template" || templateP.tagName.toString().toLowerCase() === "section" || templateP.tagName.toString().toLowerCase() === "div" || templateP.tagName.toString().toLowerCase() === "part") && templateP.innerHTML) {
                    var templateKey = Elements.getAttr(templateP, ["data-part", "data-key", "part", "key"]);
                    if (templateKey != null) {
                        if (!templateKey) templateKey = "_";
                        this._templateParts[templateKey] = templateP.innerHTML.toString().replace("__view_control_", this._containerElement.id).replace("{{_id}}", this._containerElement.id).replace("{{id()}}", this._containerElement.id);
                    }
                }
            }

            var initializers = ControlManager.initializers();
            if (initializers && initializers instanceof Array) initializers.forEach((inith, ihi, iha) => {
                if (!inith || !inith.process) return;
                try {
                    inith.process(this);
                } catch (ex) {
                    var errMsg = "Unknown reason.";
                    if (ex && ex.message) errMsg = ex.message;
                    Diagnostics.error("CoreLibrary", "[0x02450102] Failed to load control initializer #" + ihi + ". (" + errMsg + ")");
                }
            });

            try {
                (container as any)._control = this;
            } catch (ex) { }
        }

        /**
          * Gets the identifier.
          */
        public getId(): string {
            return this._containerElement ? this._containerElement.id : null;
        }

        /**
          * Gets a number increased.
          */
        public increaseNumber(doNothingWhenTooLarge = false): number {
            var needReset = false;
            if (this._increaseNumber < Number.MAX_VALUE) {
                try {
                    this._increaseNumber++;
                } catch (ex) {
                    needReset = true;
                }
            } else {
                needReset = true;
            }

            if (needReset && !doNothingWhenTooLarge) {
                this._increaseNumber = 0;
                this._increaseNumberReset = true;
            }

            return this._increaseNumber;
        }

        /**
          * Gets a value indicating whether the increased number has been reset.
          */
        public increaseNumberIsReset() {
            return this._increaseNumberReset;
        }

        /**
          * Gets the control element.
          */
        public getElement(): HTMLElement {
            return this._containerElement;
        }

        /**
          * Gets the tag name of the control element.
          */
        public getTagName(): string {
            var ele = this.getElement();
            if (!ele) return undefined;
            return ele.tagName;
        }

        /**
          * Gets the control element.
          */
        public dispose(): void {
            if (this.disposableContainer) this.disposableContainer.dispose();
            if (!this._containerElement) return;
            try {
                this._containerElement.remove();
            } catch (ex) {
                if (this._containerElement.outerHTML) this._containerElement.outerHTML = "";
            }

            this._containerElement = null;
        }

        /**
          * Gets or sets the specific additional property. 
          * @param key  The property name.
          * @param value  The value of the property to set if has.
          */
        public prop(name: string, value?: any): any {
            if (arguments.length > 1) {
                var old = this._properties[name];
                if (old !== value) {
                    this._properties[name] = value;
                    this.propChanged.raise({ key: name, value: this._properties[name], old: old });
                    var hs = this._propertyHandlers[name];
                    if (hs && hs instanceof Array) {
                        (hs as Common.Action1<Collection.ValueChangedContract<any>>[]).forEach((h) => {
                            if (h) h({ key: name, value: this._properties[name], old: old });
                        });
                    }
                }
            }

            return this._properties[name];
        }

        /**
          * Removes the specific additional property. 
          * @param name  The property name.
          */
        public removeProp(name: string): any {
            delete this._properties[name];
        }

        /**
          * Gets the specific additional property. 
          * @param name  The property name.
          * @param includeInherit  A value indicating whether try to get from parent if it does not exist in current control.
          */
        public getProp(name: string, includeInherit?: boolean): any {
            var propV = this._properties[name];
            if (propV !== undefined || !includeInherit) return propV;
            var c = this.parentControl();
            return c && c.getProp && typeof c.getProp === "function" ? c.getProp(name, true) : undefined;
        }

        public propProp(name: string, propKey: string, includeInherit?: boolean): any {
            var propV = this.getProp(name, includeInherit);
            return (propV || {})[propKey];
        }

        /**
          * Gets the specific additional property information. 
          * @param name  The property name.
          */
        public propInfo(name: string): { owner: VisualControl, name: string, value: any, update: (v: any) => any, listen: (h: Common.Action1<Collection.ValueChangedContract<any>>) => void } {
            var propV = this._properties[name];
            if (propV !== undefined) return {
                owner: this,
                name: name,
                value: propV,
                update: (v) => {
                    return this.prop(name, v);
                },
                listen: (h) => {
                    this.listenProp(name, h);
                }
            };
            var c = this.parentControl();
            return c && c.propInfo && typeof c.propInfo === "function" ? c.propInfo(name) : {
                owner: undefined,
                name: name,
                value: undefined,
                update: (v) => {
                    return undefined;
                },
                listen: (h) => {
                }
            };
        }

        /**
          * Gets the specific additional property. 
          * @param name  The property name.
          * @param defaultFunc  A function to generate devault value if there is no such property.
          * @param defaultStaticValue  A static value for default.
          */
        public getPropWithDefaultValue(name: string, defaultFunc?: (c: VisualControl, key: string) => any, defaultStaticValue?: any): any {
            if (this._properties[name] !== undefined) return this._properties[name];
            if (defaultFunc) this._properties[name] = defaultFunc(this, name);
            if (defaultStaticValue && this._properties[name] === undefined) this._properties[name] = defaultStaticValue;
            return this._properties[name];
        }

        /**
          * Gets or sets the specific additional property. 
          * @param includeInherit  true if include inherit properties; otherwise, false.
          */
        public propKeys(includeInherit?: boolean): string[] {
            var list = [];
            for (var prop in this._properties) {
                if (prop && typeof prop === "string") list.push(prop);
            }

            if (includeInherit) {
                var c = this.parentControl();
                if (c && c.propKeys && typeof c.propKeys === "function") {
                    var list2 = c.propKeys(true);
                    Collection.pushRange(list, list2, true, true);
                }
            }

            return list;
        }

        /**
          * Gets a copy of additional properties.
          * @param includeInherit  true if include inherit properties; otherwise, false.
          */
        public propObj(includeInherit?: boolean): any {
            if (!includeInherit) return Reflection.copy(this._properties);
            var c = this.parentControl();
            if (!c) return Reflection.copy(this._properties);
            var obj: any = c.propObj(true);
            this.propKeys().forEach((key) => {
                if (!key || typeof key !== "string") return;
                obj[key] = this._properties[key];
            });
            return obj;
        }

        /**
          * Registers handler for a specific additional property changed.
          */
        public listenProp(key: string, ...h: Common.Action1<Collection.ValueChangedContract<any>>[]): number {
            if (!key || !h) return 0;
            var col = this._propertyHandlers[key] as any[];
            if (!col || !(col instanceof Array)) {
                col = [];
                this._propertyHandlers[key] = col;
            }

            var count = 0;
            h.forEach((item) => {
                if (!item || typeof item !== "function") return;
                col.push(item);
                count++
            });

            return count;
        }

        /**
          * Removes handler registered for a specific additional property changed.
          */
        public unlistenProp(key: string, ...h: Common.Action1<Collection.ValueChangedContract<any>>[]): number {
            if (!key || !h) return 0;
            var col = this._propertyHandlers[key] as any[];
            if (!col || !(col instanceof Array)) {
                col = [];
                this._propertyHandlers[key] = col;
            }

            var removed = Collection.remove(col, h, true);
            return removed ? (removed.length || 0) : 0;
        }

        /**
          * Clears all handlers registered for a specific additional property changed.
          */
        public clearListenProp(key: string): void {
            if (!key) return;
            delete this._propertyHandlers[key];
        }

        /**
          * Gets the source control which has the property. 
          * @param key  The property name.
          */
        public getPropSourceControl(name: string): any {
            var propV = this._properties[name];
            if (propV !== undefined) return this;
            var c = this.parentControl();
            return c && c.getPropSourceControl && typeof c.getPropSourceControl === "function" ? c.getPropSourceControl(name) : undefined;
        }

        /**
          * Gets common information of this control.
          * This result will be used for serialization.
          */
        public getCommonInfo(): any {
            return {
                id: this.getId(),
                tagName: this.getTagName(),
                props: this.propObj(true),
                type: "VisualControl"
            };
        }

        public toJSON(): string {
            var obj = this.getCommonInfo();
            try {
                return Common.Text.serialize(obj);
            } catch (ex) {
                obj.propKeys = this.propKeys(true);
                return Common.Text.serialize(obj);
            }
        }

        /**
          * Modifies style class.
          * @param adding  A list of style class to add.
          * @param removing  A list of style class to remove.
          */
        public styleRef(adding?: string | string[], removing?: string | string[], ...childId: string[]) {
            var ele = this.getChildElement(true, ...childId);
            return Elements.changeStyleRef(ele, adding, removing);
        }

        /**
          * Sets style class from given candidates.
          * @param key  A key to select from the candidates.
          * @param candidates  A dictionary of candidates.
          */
        public pickStyleRef(key: string, candidates: any, ...childId: string[]) {
            var ele = this.getChildElement(true, ...childId);
            if (!ele || !candidates) return [];
            var removing = [];
            for (var prop in candidates) {
                if (!prop || typeof prop !== "string" || prop === key) continue;
                var list = candidates[prop] as string | string[];
                removing.push(Collection.toStringArray(list, true));
            }

            return Elements.changeStyleRef(ele, Collection.toStringArray(candidates[key], true), removing);
        }

        /**
          * Adds style class.
          * @param value  A list of style class to add.
          */
        public addStyleRef(...value: string[]) {
            var ele = this.getElement();
            return Elements.changeStyleRef(ele, value);
        }

        /**
          * Removes style class.
          * @param value  A list of style class to remove.
          */
        public removeStyleRef(...value: string[]) {
            var ele = this.getElement();
            return Elements.changeStyleRef(ele, [], value);
        }

        /**
          * Modifies style class.
          * @param adding  A list of style class to add.
          * @param removing  A list of style class to remove.
          */
        public styleClass(adding?: string | string[], removing?: string | string[], ...childId: string[]) {
            return this.styleRef(adding, removing, ...childId);
        }

        /**
          * Sets style class from given candidates.
          * @param key  A key to select from the candidates.
          * @param candidates  A dictionary of candidates.
          */
        public pickStyleClass(key: string, candidates: any, ...childId: string[]) {
            return this.pickStyleRef(key, candidates, ...childId);
        }

        /**
          * Adds style class.
          * @param value  A list of style class to add.
          */
        public addStyleClass(...value: string[]) {
            return this.addStyleRef(...value);
        }

        /**
          * Removes style class.
          * @param value  A list of style class to remove.
          */
        public removeStyleClass(...value: string[]) {
            return this.removeStyleRef(...value);
        }

        /**
          * Change style property.
          * @param key  Style property key. 
          * @param value  Style property value. 
          */
        public styleProp(key: string, value?: string): string {
            var ele = this.getElement();
            if (!ele) return null;
            try {
                if (arguments.length > 1) ele.style[key] = value;
                return ele.style[key];
            } catch (ex) {
                return null;
            }
        }

        /**
          * Gets parent control. 
          */
        public parentControl<T extends VisualControl>(): T {
            return Common.parentControl<T>(this);
        }

        /**
          * Gets grand parent control. 
          */
        public grandParentControl<T extends VisualControl>(): T {
            return Common.parentControl<T>(Common.parentControl(this));
        }

        /**
          * Gets parent element. 
          */
        public parentElement(): HTMLElement {
            var ele = this.getElement();
            return ele ? ele.parentElement : null;
        }

        /**
          * Gets parent node. 
          */
        public parentNode(): Node {
            var ele = this.getElement();
            return ele ? ele.parentNode : null;
        }

        /**
          * Gets or sets template part. 
          * @param key  The key. 
          */
        public templatePart(key: string, value?: string): string {
            if (!key) key = "_";
            if (arguments.length > 1) {
                this._templateParts[key] = value;
            }

            return this._templateParts[key];
        }

        /**
          * Loads specific options.
          * @param options  The options to load. 
          */
        public loadOptions(value: VisualControlOptionsContract<any> | boolean | Func<VisualControlOptionsContract<any>>): any {
            if (!value) return null;
            var options: VisualControlOptionsContract<VisualControl>;
            if (typeof value === "function") value = Reflection.unwrapObject(value, this);
            try {
                if (typeof value === "boolean") {
                    if (this._containerElement) {
                        options = Elements.parseAttr(this._containerElement, "control-options", true);
                    }
                } else if (typeof value === "string") {
                    options = eval("(" + value + ")");
                } else {
                    options = value;
                }
            } catch (ex) { }

            if (options == null) return null;
            if (typeof options === "function") options = Reflection.unwrapObject(options, this);
            if (options == null || typeof options !== "object") return null;
            if (options.preInit) options.preInit(this);
            if (options.attr && this._containerElement) for (var prop in options.attr) {
                if (prop || typeof prop !== "string" || options.attr[prop] != null || typeof options.attr[prop] !== "string") continue;
                try {
                    this._containerElement.setAttribute(prop, options.attr[prop]);
                } catch (ex) { }
            }

            this.addStyleRef(...Collection.toArray(options.styleRef));
            return options;
        }

        /**
          * Appends an element as child.
          * @param child  An element to add; or tag name of element to add. 
          */
        public appendElement<T extends Element>(child?: T | string, idSuffix?: string, styleRef?: string | string[], events?: any, attributes?: any): T {
            var ele = this.getElement();
            if (!ele) return null;
            if (child == null) child = "div";
            var element = typeof child === "string" ? document.createElement(child) as Element as T : child;
            if (idSuffix != null) element.id = this.getId() + "_" + idSuffix.toString();
            ele.appendChild(element);
            if (styleRef) Elements.changeStyleRef(element as any, styleRef);
            this.nodeAppended.raise([element]);
            if (events) {
                for (var prop in events) {
                    if (prop && typeof prop === "string" && events[prop] && typeof events[prop] === "string")
                        AliHub.Elements.listen(element, prop, events[prop]);
                }
            }

            if (attributes) {
                for (var prop in attributes) {
                    if (prop && typeof prop === "string" && attributes[prop] && typeof attributes[prop] === "string")
                        element.setAttribute(prop, attributes[prop]);
                }
            }

            return element;
        }

        /**
          * Appends HTML as children.
          * @param html  An HTML string to append.
          */
        public appendHTML(html: string): Node[] {
            var ele = this.getElement();
            if (!ele) return null;
            var tempEle = document.createElement("div");
            tempEle.innerHTML = html;
            var nodeList: Node[] = [];
            if (tempEle.childNodes) for (var i = 0; i < tempEle.childNodes.length; i++) {
                var nodeToPush = tempEle.childNodes[i];
                if (!nodeToPush) continue;
                nodeList.push(nodeToPush);
            }

            nodeList.forEach((item) => {
                ele.appendChild(item);
            });
            tempEle.innerHTML = "";
            this.nodeAppended.raise(nodeList);
            return nodeList;
        }

        /**
          * Appends elements as child.
          * @param children  The element definitions to add.
          */
        public appendElementByDef(...children: (Elements.SubElementDefinitionContract | string)[]): Element[] {
            return this.appendElementByDefToChild(null, ...children);
        }

        /**
          * Appends elements as child to a specific child.
          * @param idSuffix  The identifier suffix.
          * @param children  The element definitions to add.
          */
        public appendElementByDefToChild(idSuffix: string, ...children: (Elements.SubElementDefinitionContract | string)[]): Element[] {
            var ele = this.getChildElement(idSuffix);
            if (!ele || !children) return [];
            var render: (parent: Element, id: string, items: (Elements.SubElementDefinitionContract | string)[]) => Element[];
            render = (parent, id, items) => {
                var eles: Element[] = [];
                items.forEach((item) => {
                    if (!item) return;
                    if (typeof item === "string") {
                        var tempEle = document.createElement("div");
                        tempEle.innerHTML = item;
                        if (tempEle.childNodes) for (var i = 0; i < tempEle.childNodes.length; i++) {
                            var nodeToPush = tempEle.childNodes[i];
                            if (!nodeToPush || !(nodeToPush as any as Element).tagName) continue;
                            eles.push(nodeToPush as any as Element);
                        }

                        eles.forEach((item) => {
                            parent.appendChild(item);
                        });
                        tempEle.innerHTML = "";
                        return;
                    }

                    var eleItem = item.element as HTMLElement || document.createElement((item.tagName ? item.tagName.toString().toLowerCase() : null) || "div");
                    if (!eleItem.tagName) return;
                    if (item.element && item.tagName && item.tagName.toString().toLowerCase() !== item.element.tagName.toString().toLocaleLowerCase()) return;
                    var curId: string = id;
                    if (item.idSuffix) {
                        curId = Elements.mergeId(id, [item.idSuffix]);
                        eleItem.id = curId;
                    }

                    parent.appendChild(eleItem);
                    eles.push(eleItem);
                    Elements.changeStyleRef(eleItem, (item as any).className);
                    Elements.changeStyleRef(eleItem, item.styleRef);
                    if (item.style) {
                        for (var prop in item.style) {
                            if (!prop || typeof prop !== "string" || !item.style[prop] || typeof item.style[prop] !== "string") continue;
                            eleItem.style[prop] = item.style[prop];
                        }
                    }

                    if (item.attr) {
                        for (var prop in item.attr) {
                            if (!prop || typeof prop !== "string" || !item.attr[prop] || typeof item.attr[prop] !== "string") continue;
                            eleItem.setAttribute(prop, item.attr[prop]);
                        }
                    }

                    if (item.attrObjs) {
                        for (var prop in item.attrObjs) {
                            if (!prop || typeof prop !== "string" || !item.attrObjs.hasOwnProperty || !(item.attrObjs as Object).hasOwnProperty(prop)) continue;
                            Elements.setAttr(eleItem, prop, item.attrObjs[prop]);
                        }
                    }

                    if (item.events) {
                        var eventsInfo = item.events;
                        if (typeof eventsInfo === "function") eventsInfo = eventsInfo(eleItem);
                        for (var prop in eventsInfo) {
                            if (!prop || typeof prop !== "string" || !eventsInfo[prop] || typeof eventsInfo[prop] !== "function") continue;
                            Elements.listen(eleItem, prop, eventsInfo[prop]);
                        }
                    }

                    if (item.onClick) Elements.onClick(eleItem, item.onClick);
                    if (item.gesture) Elements.addGesture(eleItem, item.gesture);
                    if (item.value) {
                        var obsV = item.value as Common.ListenedObjectContract<string>;
                        if (typeof obsV === "function" && obsV.listen && obsV.model) {
                            (eleItem as HTMLInputElement).value = (obsV.model() || "").toString();
                            Elements.listen(eleItem, "change", (ev) => {
                                obsV.model((eleItem as HTMLInputElement).value);
                            });
                            obsV.listen((newValue) => {
                                if (eleItem)
                                (eleItem as HTMLInputElement).value = (newValue || "").toString();
                            }, item, null, null, () => {
                                return !eleItem || !eleItem.parentElement;
                            });
                        } else {
                            (eleItem as HTMLInputElement).value = item.value.toString();
                        }
                    }

                    if (item.prepared) item.prepared(eleItem);
                    if (item.innerHTML) {
                        if (typeof item.innerHTML === "string" || typeof item.innerHTML === "number") {
                            eleItem.innerHTML = item.innerHTML.toString();
                        } else if (item.innerHTML.value) {
                            var renderHTML = (innerHTML: string, encode: boolean | Common.Func1<string, string>, template: string) => {
                                var eleItemHTML = !innerHTML ? "" : (encode ? (typeof encode === "function" ? encode(innerHTML) : Common.Text.toHTML(innerHTML, true)) : innerHTML.toString());
                                if (template) {
                                    var eleItemHTML2 = template.toString().replace("{0}", eleItemHTML).replace("{0}", eleItemHTML).replace("{0}", eleItemHTML);
                                    eleItemHTML = eleItemHTML2;
                                }

                                eleItem.innerHTML = eleItemHTML;
                            };
                            if (typeof item.innerHTML.value === "string") {
                                renderHTML(item.innerHTML.value, item.innerHTML.encode, item.innerHTML.template);
                            } else if (item.innerHTML.value.model && item.innerHTML.value.listen) {
                                var obsV = item.innerHTML.value;
                                renderHTML(obsV.model(), item.innerHTML.encode, item.innerHTML.template);
                                obsV.listen((newValue) => {
                                    if (!eleItem) return;
                                    renderHTML(newValue.newValue, (item.innerHTML as any).encode, (item.innerHTML as any).template);
                                }, item, null, null, () => {
                                    return !eleItem || !eleItem.parentElement;
                                });
                            }

                        }
                    }

                    if (item.children) {
                        var childrenInfo = item.children;
                        if (typeof childrenInfo === "function") childrenInfo = childrenInfo(eleItem);
                        if (childrenInfo instanceof Array) {
                            render(eleItem, curId, childrenInfo);
                        }
                    }

                    if (item.controlType && typeof item.controlType === "function") {
                        var c = new item.controlType(eleItem);
                        if (item.options) c.loadOptions(item.options);
                    }

                    if (item.ready) item.ready(eleItem);
                });
                return eles;
            };

            var nodeList = render(ele, ele.id, children);
            this.nodeAppended.raise(nodeList);
            return nodeList;
        }

        /**
          * Checks whether has the attribute.
          * @param name  the attribute name.
          */
        public hasAttr(name: string, dataPrefix = false, ...childId: string[]): boolean {
            var ele = this.getChildElement(true, ...childId);
            if (!ele) return undefined;
            if (ele.hasAttribute(name)) return true;
            return dataPrefix && ele.hasAttribute("data-" + name);
        }

        /**
          * Gets the specific element attribute.
          * @param name  the attribute name.
          */
        public getAttr(name: string, dataPrefix = false, ...childId: string[]): string {
            var ele = this.getChildElement(true, ...childId);
            if (!ele) return undefined;
            if (ele.hasAttribute(name)) return ele.getAttribute(name);
            if (dataPrefix && ele.hasAttribute("data-" + name)) return ele.getAttribute("data-" + name);
            return undefined;
        }

        /**
          * Gets or sets element attribute.
          * @param name  the attribute name.
          */
        public attr(name: string, value?: string, ...childId: string[]): string {
            var ele = this.getChildElement(true, ...childId);
            if (!ele) return undefined;
            if (arguments.length > 1) {
                ele.setAttribute(name, value);
            }

            return ele.getAttribute(name);
        }

        /**
          * Registers an event handler after a specific attribute changed.
          * @param name  the attribute name.
          * @param h  the event handler to add.
          */
        public attrChanged(name: string, h: Common.Action1<string>, ...childId: string[]) {
            var ele = this.getChildElement(true, ...childId);
            return Elements.listen(ele, "DOMAttrModified", (ev: any) => {
                var attr = ev.attrName || ev.propertyName;
                if (name !== attr) return;
                h(this._containerElement.getAttribute(name));
            });
        }

        /**
          * Gets element attribute object.
          * @param name  the attribute name.
          * @param dataPrefix  a value indicating whether use "data-" prefix for optional.
          */
        public parseAttr<T>(name: string, dataPrefix = false): T {
            return Elements.parseAttr<T>(this._containerElement, name, dataPrefix);
        }

        /**
          * Listens attributes changes of a specific element to an object.
          * @param name  the attribute name.
          * @param obj  the object to bind.
          * @param ignoreUndefined  a value indicating whether need ignore undefined.
          * @param dataPrefix  a value indicating whether use "data-" prefix for optional.
          */
        public listenAttr(name: string | string[], obj: any, ignoreUndefined = false, dataPrefix = false, ...childId: string[]) {
            var ele = this.getChildElement(true, ...childId);
            return Elements.listenAttr(ele, name, obj, ignoreUndefined, dataPrefix);;
        }

        /**
          * Adds an event handler to current control.
          * @param eventType  the type of event.
          * @param h  the event handler to add.
          */
        public listen(eventType: string, h: (ev: Event) => void, ...childId: string[]): void {
            var ele = this.getChildElement(true, ...childId);
            if (ele) Elements.listen(ele, eventType, h);
        }

        /**
          * Adds gesture handlers to current control.
          * @param options  the options.
          */
        public addGesture(options: Elements.GestureActionOptionsContract, ...childId: string[]) {
            var ele = this.getChildElement(true, ...childId);
            if (ele) Elements.addGesture(ele, options);
        }

        /**
          * Adds gesture handlers to current control.
          * @param options  the options.
          */
        public onClick(options: Elements.ClickOptionsContract, ...childId: string[]) {
            var ele = this.getChildElement(true, ...childId);
            if (ele) Elements.onClick(ele, options);
        }

        /**
          * Adds a shortcut key for given element.
          * @param options  The shortcut key options.
          */
        public shortcutKey(options: Elements.ShortcutKeyOptionsContract, ...childId: string[]) {
            var ele = this.getChildElement(true, ...childId);
            if (ele) Elements.shortcutKey(ele, options);
        }

        /**
          * Gets the size of specific element.
          */
        public getSize(...childId: string[]): PlaneCoordinate & Common.InvalidContract {
            var ele = this.getChildElement(true, ...childId);
            return ele ? Elements.getSize(ele, true) : { invalid: true, message: "element does not exist." } as any;
        }

        /**
          * Gets the position of the specific element in document.
          */
        public getPosition(...childId: string[]): Common.PlaneCoordinate & Common.InvalidContract {
            var ele = this.getChildElement(true, ...childId);
            return ele ? Elements.getPosition(ele) : { invalid: true, message: "element does not exist." } as any;
        }

        /**
          * Gets the position of the mouse in specific element or document.
          */
        public getMousePosition(...childId: string[]): Common.PlaneCoordinate & Common.InvalidContract {
            var ele = this.getChildElement(true, ...childId);
            return ele ? Elements.getMousePosition(ele) : { invalid: true, message: "element does not exist." } as any;
        }

        /**
          * Clears the control.
          */
        public clear() {
            var ele = this.getElement();
            if (!ele) return;
            ele.innerHTML = "";
        }

        /**
          * Gets a child HTML element.
          * childId  The child id suffix, resolver will merge the prefix by current control id automatically; true if use current control identifier as prefix; otherwise, false.
          * appendingIdParts  the additional identifier parts.
          */
        public getChildElement<T extends HTMLElement>(childId: boolean | string, ...appendingIdParts: string[]): T {
            if ((childId == null || childId === true) && (!appendingIdParts || appendingIdParts.length === 0)) return this._containerElement as T;
            var prefix = this._containerElement.id;
            if (!childId) prefix = null;
            else if (typeof childId === "string") appendingIdParts = [childId].concat(appendingIdParts);
            var id = Elements.mergeId(prefix, appendingIdParts);
            return Elements.getById<T>(id);
        }

        /**
          * Gets child HTML elements.
          * tagName  An optional tag name for filter.
          */
        public getChildElements(tagName?: string | string[]): Element[] {
            var ele = this.getElement();
            var col: HTMLElement[] = [];
            if (!ele || !ele.children) return col;
            if (!tagName) {
                for (var i = 0; i < ele.children.length; i++) {
                    var cEle = ele.children[i];
                    col.push(cEle as any);
                }
            } else {
                var names: string[] = [];
                (typeof tagName === "string" ? [tagName] : tagName).forEach((item) => {
                    if (item) names.push(item.toString().toLowerCase());
                });
                for (var i = 0; i < ele.children.length; i++) {
                    var cEle = ele.children[i];
                    if (!cEle || !cEle.tagName) continue;
                    if (!Collection.contains(names, cEle.tagName.toString().toLowerCase())) continue;
                    col.push(cEle as any);
                }
            }

            return col;
        }

        /**
          * Gets a child control.
          * childId  The child id suffix, resolver will merge the prefix by current control id automatically; true if use current control identifier as prefix; otherwise, false.
          * appendingIdParts  the additional identifier parts.
          */
        public getChildControl<T extends VisualControl>(childId: boolean | string, ...appendingIdParts: string[]): T {
            var prefix = this._containerElement.id;
            if (!childId) prefix = null;
            else if (typeof childId === "string") appendingIdParts = [childId].concat(appendingIdParts);
            var id = Elements.mergeId(prefix, appendingIdParts);
            return Common.getControl(id) as T;
        }

        /**
          * Creates a control as child.
          * @param id  The identifier.
          * @param control  The type of the control to append.
          * @param options  The options to load.
          * @param tag  The tag name of element to fill the control.
          */
        public createControl(idSuffix: string, control: typeof VisualControl, options?: VisualControlOptionsContract<VisualControl>, tag?: string): VisualControl {
            if (!idSuffix || idSuffix.toString() === "" || !control) return null;
            var id = idSuffix.toString().replace("__view_control_", this._containerElement.id).replace("{{_id}}", this._containerElement.id).replace("{{id()}}", this._containerElement.id);
            if (id.indexOf(this._containerElement.id) !== 0) {
                id = this._containerElement.id + (id.indexOf("_") > 0 ? "_" : "") + id;
            }

            if (!tag || tag.toString() === "") tag = "div";
            var element = Elements.getById(id);
            if (!element) element = this.appendElement(tag) as any;
            element.id = id;
            var c = new control(id);
            c.loadOptions(options);
            return c;
        }

        /**
          * Adds a control as child.
          * @param id  The identifier.
          * @param control  The control factory.
          * @param tag  The tag name of element to fill the control.
          */
        public addControl<T extends VisualControl>(idSuffix: string, control: Func2<HTMLElement, VisualControl, T>, tag?: string): T {
            if (!idSuffix || idSuffix.toString() === "" || !control) return;
            var id = idSuffix.toString().replace("__view_control_", this._containerElement.id).replace("{{_id}}", this._containerElement.id).replace("{{id()}}", this._containerElement.id);
            if (id.indexOf(this._containerElement.id) !== 0) {
                id = this._containerElement.id + (id.indexOf("_") !== 0 ? "_" : "") + id;
            }

            if (!tag || tag.toString() === "") tag = "div";
            var element = Elements.getById(id);
            if (!element) element = this.appendElement<HTMLElement>(tag);
            element.id = id;
            return control(element, this);
        }

        /**
          * Gets or sets inner HTML.
          * @param value  The inner HTML to set.
          */
        public innerHTML(value?: string): string {
            if (arguments.length > 0) this.getElement().innerHTML = value ? value.toString().replace(/__view_control_/g, this._containerElement.id + "_").replace(/{{_id}}/g, this._containerElement.id).replace(/{{id\(\)}}/g, this._containerElement.id) : "";
            return this.getElement().innerHTML;
        }

        /**
          * Gets computed style.
          */
        public computedStyle(pseudoElt?: string, ...childId: string[]): CSSStyleDeclaration {
            var ele = this.getChildElement(true, ...childId);
            if (!ele) return null;
            return getComputedStyle(ele, pseudoElt);
        }

        /**
          * Gets matched CSS rules.
          */
        public styleRefRules(pseudoElt?: string, ...childId: string[]): CSSRuleList {
            var ele = this.getChildElement(true, ...childId);
            if (!ele) return null;
            return getMatchedCSSRules(ele, pseudoElt);
        }

        /**
          * Requests full screen.
          */
        public fullScreen(...childId: string[]) {
            var ele = this.getChildElement(true, ...childId);
            if (!ele) return;
            try {
                var requestMethod = ele.requestFullscreen || (ele as any).requestFullScreen || ele.webkitRequestFullScreen || ele.webkitRequestFullscreen || (ele as any).mozRequestFullScreen || (ele as any).msRequestFullScreen;
                if (requestMethod) {
                    requestMethod.call(ele);
                } else if (typeof (window as any).ActiveXObject !== "undefined") {
                    var wscript = new ActiveXObject("WScript.Shell");
                    if (wscript) wscript.SendKeys("{F11}");
                }
            } catch (ex) { }
        }

        /**
          * Gets or sets the language.
          * @param value  The inner HTML to set.
          */
        public lang(value?: string, ...childId: string[]) {
            var ele = this.getChildElement(true, ...childId);
            if (!ele) return;
            if (arguments.length > 0) ele.lang = value;
            return ele.lang;
        }

        /**
          * Scrolls to specific position.
          * @param x  Left in pixel.
          * @param y  Top in pixel.
          */
        public scrollTo(x?: number, y?: number) {
            var ele = this._containerElement;
            if (!ele) return;
            if (x != null) ele.scrollLeft = x;
            if (y != null) ele.scrollTop = y;
        }

    }

    /**
      * Controls manager.
      */
    export class ControlManager {

        private static _initializers: ObjectProcessingTask<VisualControl>[] = [];

        public static initializers() {
            return ControlManager._initializers;
        }

    }

    /**
      * Reflection utilities.
      */
    export class Reflection {

        public static isNotNull(obj: any): boolean {
            return obj != null;
        }

        public static isFunction(value: any): value is Function {
            return value && typeof value === "function";
        }

        /**
          * Copies an object. 
          * @param html  The object to copy. 
          */
        public static copy<T>(obj: T): T {
            if (obj == null) return null;
            if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") return obj;
            if (obj instanceof Array) {
                var array = [];
                (obj as any as any[]).forEach((item, i, arr) => {
                    array.push(item);
                });

                return array as any;
            }

            var result = {} as any;
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) result[prop] = obj[prop];
            }

            return result as T;
        }

        public static addProperties(target: any, properties: any, override = false) {
            if (!target || !properties) return;
            for (var prop in properties) {
                if (properties.hasOwnProperty(prop) && (override || target[prop] === undefined)) target[prop] = properties[prop];
            }
        }

        /**
          * Gets identifier from a entry. 
          * @param model  The entry. 
          * @param h  An optional handler to resolve identifier from the entry. 
          */
        public static getId<T extends IdentifiedContract>(model: string | number | T, h?: Action1<T>): string {
            if (model === "") return "";
            if (!model) return null;
            if (typeof model === "function") model = (model as any)();
            var id: string = null;
            if (typeof model === "number") {
                id = model.toString();
            } else if (typeof model === "string") {
                id = model.toString();
            } else if (model.id) {
                id = model.id;
                if (h) h(model);
            }

            return id;
        }

        /**
          * Extends a class.
          * @param derivedClass  The derived class.
          * @param baseClass  The base class.
          */
        public static extend(derivedClass, baseClass) {
            for (var p in baseClass) {
                if (baseClass.hasOwnProperty(p)) derivedClass[p] = baseClass[p];
            }

            function __() {
                this.constructor = derivedClass;
            }

            __.prototype = baseClass.prototype;
            derivedClass.prototype = new __();
        };

        /**
          * Unwraps object. 
          * @param value  The object wrapped. 
          * @param count  An optional value of maximum depth. 
          */
        public static unwrapObject<T>(value: T | Func<T>, thisArg?: any, count?: number): T {
            if (value == null) return value as T;
            var step = 0;
            if (count == null || count === -1) count = null;
            while (value != null && typeof value === "function" && (count == null || step < count)) {
                value = (value as Func<T>).apply(thisArg);
                step++;
            }

            return value as T;
        }

        /**
          * Creates an empty disposable object. 
          * @param obj  An additional information to copy. 
          */
        public static emptyDisposable(obj?: any): DisposableContract {
            var disp = { dispose: () => { }, useless: true };
            if (obj) for (var prop in obj) {
                if (!prop || typeof prop !== "string") continue;
                disp[prop] = obj[prop];
            }

            return disp;
        }

        public static callMethod(obj: any, method: string, ...args: any[]) {
            return obj && obj[method] && typeof obj[method] === "function" ? obj[method](...args) : undefined;
        }

        public static getProperty(obj: any, ...prop: (string | number)[]) {
            if (!prop || prop.length < 1) return obj;
            var propV = obj;
            if (prop.some((p) => {
                if (propV == null) return true;
                if (propV[p] == null && typeof p === "string" && p.length > 2 && p.indexOf("()") === p.length - 2) {
                    var methodName = p.substring(0, p.length - 2);
                    if (propV[methodName] && typeof propV[methodName] === "function") {
                        propV = propV[methodName]();
                        return false;
                    }
                }

                propV = propV[p];
                return false;
            })) return undefined;
            return propV;
        }

        public static setProperty(value: any, obj: any, ...prop: (string | number)[]) {
            if (!prop || prop.length < 1) return false;
            var propV = obj;
            var succ = false;
            prop.some((p, i) => {
                if (propV == null) return true;
                propV = propV[p];
                if (i < prop.length - 2) return false;
                propV[prop[prop.length - 1]] = value;
                succ = true;
                return true;
            });
            return succ;
        }

        public static toIntroHTML(obj: any, iip = 0, firstI = false, singleQuote = false, thisStr: string = null) {
            if (iip == null) iip = 0;
            var nextIip = iip >= 0 ? iip + 1 : -1;
            var prefix = "";
            var quoteStr = singleQuote ? "'" : "&quot;";
            for (var step = 0; step < iip; step++) {
                prefix += "&nbsp; &nbsp; ";
            }

            var nl = " ";
            var prefix1 = firstI ? prefix : "";
            var prefix2 = prefix;
            if (iip >= 0) {
                nl = "<br />";
                prefix2 += "&nbsp; &nbsp; ";
            }

            if (obj == null) return prefix + "<span class=\"ali-x-code-keyword\">null</span>";
            if (typeof obj === "string") {
                if (obj.length > 5 && obj.indexOf("**$") === 0 && obj.lastIndexOf("**") === obj.length - 2) {
                    var str = obj.substring(3, obj.length - 2);
                    if (thisStr && str === "this") return thisStr;
                    return str;
                }

                return "<span class=\"ali-x-code-string\">" + quoteStr + obj + quoteStr + "</span>";
            }

            if (typeof obj === "function") return "<span class=\"ali-x-code-unknown\">" + obj.toString().replace("function", "</span><span class=\"ali-x-code-keyword\">function</span><span class=\"ali-x-code-unknown\">") + "</span>";
            if (typeof obj === "number") return prefix1 + "<span class=\"ali-x-code-number\">" + obj.toString() + "</span>";
            if (typeof obj === "boolean") return prefix1 + "<span class=\"ali-x-code-keyword\">" + (obj ? "true" : "false") + "</span>";
            if (obj instanceof Date) return prefix1 + "<span class=\"ali-x-code-number\">" + (obj as Date).getTime().toString() + "</span>";
            if (obj instanceof Array) {
                var list: string[] = [];
                var len = 0;
                obj.forEach((ele, i, list) => {
                    var str = Reflection.toIntroHTML(ele, nextIip, false, singleQuote, thisStr);
                    list.push(str);
                    len += str.length;
                });

                return prefix1 + (len < 50 ? "[" + list.join(", ") + "]" : "[" + nl + list.join("," + nl + prefix2) + nl + "]");
            }

            var objStr = prefix1 + "{";
            var objLen = 0;
            for (var prop in obj) {
                if (!prop || typeof prop !== "string") return;
                objLen++;
                objStr += nl + prefix2 + "<span class=\"ali-x-code-string\">" + quoteStr + prop + quoteStr + "</span>: " + Reflection.toIntroHTML(obj[prop], nextIip, false, singleQuote, thisStr) + ",";
            }

            if (objLen === 0) return "";
            objStr = objStr.substring(0, objStr.length - 1) + nl + prefix + "}";
            return objStr;
        }

    }

    /**
      * Binding convertion.
      */
    export class BindingConvertion<T> {

        private _model: AliHub.Common.Func<T>;

        public constructor(model: T | AliHub.Common.Func<T>) {
            if (model && typeof model !== "function") {
                this._model = () => model as any;
            } else {
                this._model = model as any;
            }
        }

        /**
          * Gets model.
          */
        public model(): T {
            return this._model();
        }

    }

    /**
      * Binding property bag.
      */
    export class BindingPropertyBag {

        private _properties: string[] = [];

        /**
          * Raises on property changed.
          */
        public propChanged = new Collection.EventHandlers<Collection.ValueChangedContract<any>>();

        public bindStr(): AliHub.Common.BindingObjectContract<string> {
            return AliHub.Common.bindingObj<string>();
        }

        public bindObj<T>(): AliHub.Common.BindingObjectContract<T> {
            return AliHub.Common.bindingObj<T>();
        }

        public initProp(...keys: string[]) {
            if (!keys) return;
            keys.forEach((key, ki, ka) => {
                if (this[key] && typeof this[key] === "function") return;
                this[key] = AliHub.Common.bindingObj();
                this._regProp(key);
            });
        }

        /**
          * Sets a property.
          * @param key  The property key.
          * @param value  The value of the property.
          */
        public setProp(key: string, value: any) {
            if (!key || key == "") return;
            var old = null;
            if (this[key] && typeof this[key] === "function") {
                old = this[key]();
                this[key](value);
            } else if (value == null) {
                this[key] = AliHub.Common.bindingObj();
            } else if (value instanceof Array) {
                this[key] = AliHub.Common.bindingArray(value);
            } else {
                this[key] = AliHub.Common.bindingObj(value);
            }

            this._regProp(key);
            this.propChanged.raise({ key: key, old: old, value: value });
        }

        public loadObj(obj: any, properties?: string[]) {
            if (obj == null || obj instanceof Array) return;
            var objType = typeof obj;
            if (objType === "string" || objType === "number" || objType === "boolean") return;
            if (properties == null) {
                for (var prop in obj) {
                    if (!prop || typeof prop !== "string") continue;
                    this.setProp(prop, obj[prop]);
                }

                return;
            }

            for (var prop in properties) {
                this.setProp(prop, obj[prop]);
            }
        }

        public initArray(...keys: string[]) {
            if (!keys) return;
            keys.forEach((key, ki, ka) => {
                if (this[key] && typeof this[key] === "function") return;
                this[key] = AliHub.Common.bindingArray();
                this._regProp(key);
            });
        }

        /**
          * Sets an array.
          * @param key  The property key.
          * @param value  The array value of the property.
          */
        public setArray<T>(key: string, col: Array<T>) {
            if (!key || key == "") return;
            var old = null;
            if (this[key] && typeof this[key] === "function") {
                old = this[key]();
                this[key](col);
            } else if (col == null) {
                this[key] = AliHub.Common.bindingArray();
            } else {
                if (!(col instanceof Array)) col = [col] as any;
                this[key] = AliHub.Common.bindingArray(col);
            }

            this._regProp(key);
            this.propChanged.raise({ key: key, old: old, value: col });
        }

        /**
          * Pushes items to an array property.
          * @param key  The property key.
          * @param items  The items to push.
          */
        public pushArrayItem<T>(key: string, ...items: T[]): Array<T> {
            if (!key || key == "") return null;
            this.initArray(key);
            if (items) items.forEach((value, vi, va) => {
                this[key].push(value);
            });
            return this[key]();
        }

        /**
          * Gets the property value.
          * @param key  The property key.
          */
        public getProp<T>(key: string): T {
            if (!key || key == "") return undefined;
            var prop = this[key];
            return prop && typeof prop === "function" ? prop() : prop;
        }

        /**
          * Gets the observable object the property.
          * @param key  The property key.
          */
        public getPropSource<T>(key: string): Common.BindingObjectContract<T> {
            if (!key || key == "") return undefined;
            return this[key];
        }

        public propertyNames(): string[] {
            return Collection.copy(this._properties);
        }

        public unwrap<T>(count?: number): T {
            var obj: any = {};
            for (var i in this._properties) {
                var prop = this._properties[i];
                if (!prop || typeof prop !== "string") continue;
                obj[prop] = Reflection.unwrapObject(this[prop], this, count);
            };

            return obj;
        }

        private _regProp(name: string) {
            if (!name) return false;
            name = name.toString();
            if (this._properties.some((ele, i, arr) => { return ele === name })) return false;
            this._properties.push(name);
            return true;
        }

    }

    /**
      * Binding object.
      */
    export class BindingObject<T> {

        private _raw: T;

        public changed = new Collection.EventHandlers<ValueChangedArgsContract<T>>();

        /**
          * Gets the value.
          */
        public get_value() {
            return this._raw;
        }

        /**
          * Sets the value.
          * @param value  The value to set.
          */
        public set_value(value: T) {
            if (value === this._raw) return;
            var oldValue = this._raw;
            this._raw = value;
            this.changed.raise(this._getChangedArgs(oldValue, "changed"));
        }

        /**
          * Gets the observable object.
          */
        public toObservable(): BindingObjectContract<T> {
            var obs = (value?: T) => {
                if (typeof value !== "undefined" && value !== void 0) {
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
    export class BindingControl<T> extends VisualControl implements BindingContainerContract<T> {

        private _model = Common.bindingObj<T>();

        private _info = Common.bindingObj<any>();

        private _extenders: BindingControlExtender<T>[] = [];

        private _convertor: Func1<T, any> = null;

        private _converted = Common.bindingObj();

        private _extendersLoaded = false;

        private _bindingControls: AliHub.Collection.PropertiesContract<AliHub.Common.BindingControl<T>> = [];

        private _templateEngine: string;

        private _modelDispose: DisposableContract;

        public viewModelChanged = new Collection.EventHandlers<Collection.PropertyItemContract<T>>();

        public convertedChanged = new Collection.EventHandlers<Collection.PropertyItemContract<any>>();

        public convertorChanged = new Collection.EventHandlers<Collection.PropertyItemContract<Func1<T, any>>>();

        public infoChanged = new Collection.EventHandlers<Collection.PropertyItemContract<any>>();

        /**
          * Initializes a new instance of the BindingControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones. 
          */
        constructor(id: VisualControlElementContract) {
            super(id);
            this.addStyleRef("ali-controls-binding");
            this._modelDispose = this._model.subscribe((newValue) => {
                var converted = this._updateConverted(newValue);
                this._loadExtenders();
                if (!!this.viewModelChanged && !!this.viewModelChanged.raise) this.viewModelChanged.raise({ key: "viewModel", value: newValue });
                if (!!this.convertedChanged && !!this.convertedChanged.raise) this.convertedChanged.raise({ key: "converted", value: converted });
            });
        }

        /**
          * Raises on binding error. 
          * @param errorMessage  The error message.
          */
        public onBindingError(errorMessage: string): boolean {
            return !!this._model();
        }

        /**
          * Gets or sets templete engine.
          * @param value  The templete engine type.
          */
        public templateEngine(name?: string): string {
            if (arguments.length > 0) {
                this._templateEngine = name;
            }

            return this._templateEngine;
        }

        /**
          * Sets the template. 
          * @param valueType  The data source type for the value.
          * @param value  The data source value.
          */
        public setTemplate(valueType: string, value: string) {
            if (valueType == null && value == null) return;
            if (valueType === "part" || valueType === "initpart") {
                value = this.templatePart(!!value ? value : "");
                if (!value) value = this.templatePart("content");
                if (valueType === "initpart" && !value) return;
                valueType = "";
            }

            Common.applyTemplate(this._templateEngine, this, valueType, value, (errMsg) => { return this.onBindingError(errMsg); });
            this._loadExtenders();
        }

        /**
          * Gets or sets the view model. 
          * @param value  Model value to set; or ignore this parameter, if just resolve model.
          * @param binding  An optional flag to indicate whether the given binding value is to replace old one.
          */
        public viewModel(value?: T): T {
            if (arguments.length > 0) this._model(value);
            return this._model();
        }

        /**
          * Sets the view model from web. 
          * @param subject  The subject of data resolver registered. 
          * @param key  The key of data resolver. 
          */
        public setViewModelFromWeb(subject: string, key: string | Web.BaseDataPackageResolver<T>, parameters?: any) {
            var promise = Web.resolve(subject, key, parameters);
            promise.then((m) => {
                this.viewModel(m.result);
            });
            return promise;
        }

        /**
          * Binds the view model. 
          * @param value  Model value observable object to bind.
          */
        public bindViewModel(value: BindingObjectContract<T>) {
            if (!!this._modelDispose && !!this._modelDispose.dispose) this._modelDispose.dispose();            
            this._model = value;
            this._modelDispose = this._model.subscribe((newValue: T) => {
                var converted = this._updateConverted(newValue);
                this._loadExtenders();
                if (!!this.viewModelChanged && !!this.viewModelChanged.raise) this.viewModelChanged.raise({ key: "viewModel", value: newValue });
                if (!!this.convertedChanged && !!this.convertedChanged.raise) this.convertedChanged.raise({ key: "converted", value: converted });
            });
            this.updateConverted();
            this._extendersLoaded = false;
            this._loadExtenders();
        }

        /**
          * Subscribe view model changed. 
          * @param h  Callback during value has been changed.
          * @param target  The "this" target of h callback.
          */
        public subscribeViewModel(h: (newValue: T) => void, target?: any): DisposableContract {
            return this.viewModelChanged.add((ev) => {
                h.call(target || this, ev.value);
            });
        }

        /**
          * Gets observable view model. 
          */
        public observableViewModel(): BindingObjectContract<T> {
            return this._model;
        }

        /**
          * Gets or sets the additional information.
          * @param value  The additional information value to set; or ignore this parameter, if just resolve the additional information.
          */
        public info(value?: any): any {
            if (arguments.length > 0) {
                this.setInfo(value);
            }

            return this._info();
        }

        /**
          * Sets the additional information.
          * @param value  The additional information value to set; or ignore this parameter, if just resolve the additional information.
          */
        public setInfo(value: any) {
            this._info(value);
            this.infoChanged.raise({ key: "info", value: value });
            this._loadExtenders();
        }

        /**
          * Gets or sets the convertor.
          * @param value  The convertor to set; or ignore this parameter, if just resolve the convertor.
          */
        public convertor(h?: Func1<T, any>): Func1<T, any> {
            if (arguments.length > 0) {
                this.setConvertor(h);
            }

            return this._convertor;
        }

        /**
          * Sets the convertor.
          * @param value  The convertor to set; or ignore this parameter, if just resolve the convertor.
          */
        public setConvertor(h?: Func1<T, any>) {
            if (h === this._convertor || (!h && !this._convertor)) return;
            this._convertor = h;
            var converted = this.updateConverted();
            if (!!this.convertorChanged && !!this.convertorChanged.raise) this.convertorChanged.raise({ key: "convertor", value: h });
            if (!!this.convertedChanged && !!this.convertedChanged.raise) this.convertedChanged.raise({ key: "converted", value: converted });
        }

        /**
          * Gets or sets the converted value.
          */
        public converted(): any {
            return this._converted();
        }

        /**
          * Gets observable converted model. 
          */
        public observableConverted(): BindingObjectContract<any> {
            return this._converted;
        }

        /**
          * Updates the converted value.
          */
        public updateConverted(): any {
            return this._updateConverted(this._model());
        }

        /**
          * Sets view model as null. 
          */
        public clearViewModel(): void {
            this._model(null);
        }

        /**
          * Listens model changes.
          * @param obj  the object to bind.
          */
        public listenModel(obj: any, proc?: Action1<Function>, ignoreFirstProc = false): Collection.DisposableArray {
            return Common.listenBindingControl(this, obj, proc, ignoreFirstProc);
        }

        /**
          * Refreshes view. 
          */
        public refresh(): void {
            var model = this._model();
            this._model(null);
            this._model(model);
        }

        /**
          * Loads specific options.
          * @param options  The options to load. 
          */
        public loadOptions(value: BindingControlOptionsContract<T> | boolean): any {
            var options: BindingControlOptionsContract<T> = super.loadOptions(value);
            if (!options) return null;
            if (!!options.templateEngine) this.templateEngine(options.templateEngine);
            if (!!options.bindControl) {
                this.bindViewModel(options.bindControl.observableViewModel());
                this.convertor((m) => { return options.bindControl.converted(); });
                this.setInfo(options.bindControl.info());
            }

            if (!!options.viewModel) this.viewModel(options.viewModel);
            if (!!options.convertor) this.setConvertor(options.convertor);
            if (!options.ignoreParts) this.setTemplate("initpart", null);
            this.setTemplate(options.templateType, options.template);
            this.addExtender(options.extender);
            if (!!options.webData) {
                var webData = typeof options.webData === "function" ? (options.webData as any as Function).call(options) : options.webData;
                this.setViewModelFromWeb(webData.subject, webData.key, webData.parameters);
            }

            return options;
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
        public addExtender(value: BindingControlExtender<T> | BindingControlExtender<T>[]): void {
            var col = Collection.toArray(value);
            col.forEach((ele, i, arr) => {
                if (!ele || !ele.name) return;
                this.removeExtender(ele.name);
                this._extenders.push(ele);
                if (this._extendersLoaded && !!ele.load) ele.load(this);
            });
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
          * Updates extenders.
          */
        public updateExtenders(): void {
            this._loadExtenders();
        }

        /**
          * Clears all extenders registered. 
          */
        public clearExtenders(): void {
            this._extenders = [];
        }

        /**
          * Creates a binding control as child with current binding.
          */
        public addBindingControl(idSuffix: string, templateKey: string, templateValue: string, override = true, h?: AliHub.Common.Action1<AliHub.Common.BindingControl<T>>) {
            var kvp = this._getBindingControl(idSuffix);
            if (!override && !!kvp && !!kvp.value) return kvp.value;
            return <AliHub.Common.BindingControl<T>>this.addControl(idSuffix, (cid) => {
                var control = new AliHub.Common.BindingControl<T>(cid);
                control.convertor((m) => { return this.converted(); });
                control.bindViewModel(this._model);
                control.setTemplate(templateKey, templateValue);
                if (!kvp) this._bindingControls.push({ key: idSuffix, value: control });
                else kvp.value = control;
                if (!!h) h(control);
                return control;
            });
        }

        /**
          * Gets a specific child binding control.
          */
        public getBindingControl(key: string): AliHub.Common.BindingControl<T> {
            var kvp = this._getBindingControl(key);
            return !!kvp ? kvp.value : null;
        }

        private _updateConverted(model: any): any {
            if (!this._convertor) return undefined;
            var converted = this._convertor(model);
            this._converted(converted);
            return this._converted();
        }

        private _getBindingControl(key: string): Collection.KeyValuePairContract<string, AliHub.Common.BindingControl<T>> {
            if (!key || key.toString().length < 1) return null;
            var kvp: Collection.KeyValuePairContract<string, AliHub.Common.BindingControl<T>>;
            this._bindingControls.some((ele, i, arr) => {
                if (!ele || !ele.key || ele.key !== key) return false;
                kvp = ele;
                return true;
            });

            if (!kvp && key.indexOf("_") === 0) {
                var key2 = "_" + key;
                this._bindingControls.some((ele, i, arr) => {
                    if (!ele || !ele.key || ele.key !== key2) return false;
                    kvp = ele;
                    return true;
                });
            }

            return kvp;
        }

        private _loadExtenders() {
            if (this._extendersLoaded || !this.getElement()) return;
            var html = this.getElement().innerHTML;
            if (!!html && html !== "" && !!this.viewModel()) {
                this._extendersLoaded = true;
                this._extenders.forEach((ele, i, arr) => {
                    if (!!ele && !!ele.load) ele.load(this);
                });
            }
        }

    }

    /**
      * Activity control.
      */
    export class ActivityControl extends VisualControl {

        private _activities: ControlInfoContract[] = [];

        private _index = -1;

        private _count = 0;

        /**
          * Raised on changing. 
          */
        public changing = new Collection.EventHandlers<Collection.ValueChangedContract<ControlInfoContract>>();

        /**
          * Raised on changed. 
          */
        public changed = new Collection.EventHandlers<ControlInfoContract>();

        /**
          * Initializes a new instance of the ActivityControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones. 
          */
        public constructor(id: VisualControlElementContract) {
            super(id);
            this.addStyleRef("ali-controls-activity");
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
          * Gets current information.
          */
        public current(): ControlInfoContract {
            if (this._activities.length === 0 || this._index == -1) {
                this._index = -1;
                return null;
            }

            if (this._index >= this._activities.length) this._index = this._activities.length - 1;
            if (this._index < 0) this._index = 0;
            var item = this._activities[this._index];
            return !!item ? { key: item.key, control: item.control, model: item.model, index: this._index } : null;
        }

        /**
          * Gets current control.
          */
        public currentControl(): VisualControl {
            var item = this.current();
            return !!item ? item.control : null;
        }

        /**
          * Gets current item model.
          */
        public currentItemModel(): any {
            var item = this.current();
            return !!item ? item.model : null;
        }

        /**
          * Adds a control by a factory.
          * @param control  The optional control factory. 
          */
        public add(control?: Action1<HTMLElement>, model?: any, h?: Action1<VisualControl>): ControlInfoContract {
            if (this._count >= 100000000) this._count = 0;
            this._count++;
            if (this._index < this._activities.length - 1) {
                var col: ControlInfoContract[] = [];
                this._activities.forEach((acti, i, arr) => {
                    if (!acti || !acti.control) return;
                    if (i <= this._index) {
                        col.push(acti);
                    } else {
                        acti.control.getElement().outerHTML = "";
                    }
                });

                this._activities = col;
                this._index = this._activities.length - 1;
            }

            var element = this.appendElement<HTMLDivElement>("div");
            var now = new Date();
            var key = this._count.toString() + "t" + now.getSeconds().toString() + now.getMilliseconds().toString();
            element.id = this.getId() + "_c" + key;
            if (control) control(element);
            var c = Common.getControl(element);
            if (!c) c = new VisualControl(element);
            if (!!h) h(c);
            this._activities.push({ key: key, control: c, model: model, index: this._activities.length });
            this._turnTo(this._index + 1);
            return { key: key, control: c, model: model, index: this._activities.length };
        }

        /**
          * Gets item info.
          * @param control  The item to get. 
          */
        public getItem(control: VisualControl | string | number): ControlInfoContract {
            if (control == null) return null;
            if (typeof control === "number") {
                if (control >= this._activities.length || control < 0) return null;
                var item = this._activities[control];
                return { key: item.key, control: item.control, model: item.model, index: control };
            }

            var c: ControlInfoContract = null;
            var count = -1;
            var id = typeof control === "string" ? control : (<VisualControl>control).getId();
            this._activities.some((ele, i, ar) => {
                count++;
                if (!ele || !ele.control || (ele.control.getId() !== id && ele.key !== id)) return false;
                c = ele;
                return true;
            });
            return !!c ? { key: c.key, control: c.control, model: c.model, index: count } : null;
        }

        /**
          * Gets previous item.
          */
        public getPrevious(): ControlInfoContract {
            var index = this._index - 1;
            return this.getItem(index);
        }

        /**
          * Gets all items.
          */
        public items(): ControlInfoContract[] {
            var list: ControlInfoContract[] = [];
            for (var i = 0; i < this._activities.length; i++) {
                list.push(this.getItem(i));
            }

            return list;
        }

        /**
          * Turns to a specific control.
          * @param control  The control or key. 
          */
        public turnTo(control: VisualControl | string | number): ControlInfoContract {
            var item = this.getItem(control);
            this._turnTo(!!item ? item.index : -1);
            return item;
        }

        /**
          * Turns back.
          * @param step  An option step to back. 
          */
        public back(step: number = 1): ControlInfoContract {
            var index = this._index - step;
            return this.turnTo(index);
        }

        /**
          * Loads specific options.
          * @param options  The options to load. 
          */
        public loadOptions(value: ActivityControlOptionsContract | boolean): any {
            var options: ActivityControlOptionsContract = super.loadOptions(value);
            if (!options) return options;
            return options;
        }

        private _turnTo(index: number) {
            var oldItem = this.current();
            this._index = index;
            var cur = this.current();
            this.changing.raise({
                key: "active",
                old: !!oldItem && !!oldItem.control ? { key: oldItem.key, control: oldItem.control, model: oldItem.model, index: oldItem.index } : null,
                value: !!cur && !!cur.control ? { key: cur.key, control: cur.control, model: cur.model, index: index }: null
            });

            if (!!oldItem && !!oldItem.control) {
                AliHub.Elements.changeStyleRef(oldItem.control.getElement(), "ali-state-active-f", "ali-state-active-t");
                oldItem.control.styleProp("display", "none");
            }

            if (!cur || !cur.control) {
                this.changed.raise(null);
                return;
            }

            AliHub.Elements.changeStyleRef(cur.control.getElement(), "ali-state-active-t", "ali-state-active-f");
            cur.control.styleProp("display", "");
            this.changed.raise({ key: cur.key, control: cur.control, model: cur.model, index: index });
        }

    }

    export class ListenedBag {
        private _model: any = {};

        public changed = new Collection.EventHandlers<Collection.ValueChangedContract<any>>();

        public prop(key: string, value?: any) {
            if (!key) return undefined;
            if (arguments.length > 1) {
                this.listenedProp<any>(key, true)(value);
            }

            return this._model[key] && typeof this._model[key] === "function" ? this._model[key]() : undefined;
        }

        public listenedProp<T>(key: string, createOneWhenEmpty?: boolean) {
            var obs = this._model[key] as Common.ListenedObjectContract<T>;
            if (!obs && createOneWhenEmpty) {
                this._model[key] = Common.listenedObj();
                obs = this._model[key];
                obs.referenceKey = key;
                obs.listen((ev) => {
                    this.changed.raise({
                        key: key,
                        old: ev.oldValue,
                        value: ev.newValue
                    });
                });
            }

            return obs;
        }

        public loadModel(bag: any) {
            if (!bag) return;
            var count = 0;
            for (var prop in bag) {
                if (!prop || typeof prop !== "string") continue;
                this.prop(prop, bag[prop]);
                count++;
            }

            return count;
        }

        public getModel() {
            var info: any = {};
            for (var prop in this._model) {
                if (!prop || typeof prop !== "string") continue;
                var obs = this._model[prop] as Common.ListenedObjectContract<any>;
                if (!obs || typeof obs !== "function" || !obs.model || !obs.subscribe || !obs.listen) continue;
                info[prop] = obs();
            }

            return info;
        }

        public hasProp(key: string) {
            var obs = this._model[key] as Common.ListenedObjectContract<any>;
            return obs && typeof obs === "function" && obs.model && obs.subscribe && obs.listen;
        }

        public removeProp(...key: string[]) {
            var count = 0;
            key.forEach((prop) => {
                if (!prop || typeof prop !== "string") return;
                var obs = this._model[prop] as Common.ListenedObjectContract<any>;
                if (!obs) return;
                var oldValue = obs();
                delete this._model[prop];
                if (oldValue !== undefined) this.changed.raise({
                    key: prop,
                    old: oldValue,
                    value: undefined
                });
                count++;
            });
            return count;
        }
    }

    /**
      * Gets a handler to manage a continuity task.
      * @param options  The options.
      */
    export function getContinuityTask(options: ContinuityTaskOptionsContract): Action {
        if (!options || !options.process || options.count === 0 || options.span === 0) return;
        if (!options.start && options.count == null) {
            return () => options.process(0, options);
        }

        var count = 0;
        var time: Date = null;
        return () => {
            var timespan = time != null ? AliHub.Common.DateTime.getSpan(time, new Date) : null;
            time = new Date();
            if (timespan == null || isNaN(timespan) || timespan > (options.span || 1000)) {
                count = 1;
                return;
            }

            count++;
            var start = options.start ? options.start : 0;
            if (count >= start && (options.count == null || options.count > count - start)) options.process(count - 1, options);
        };
    }

    export function sleepLoop(h: AliHub.Common.Func<boolean>, timeout: number, count?: number) {
        var task = { timeout: timeout, times: 0 } as any;
        if (Maths.isValidNumber(count) && count >= 0) task.count = count;
        task.proc = () => {
            var result = h();
            try {
                if (task.times < Number.MAX_VALUE) task.times++;
                if (task.times >= task.count && task.count >= 0) return;
            } catch (ex) { }
            if (!result) return;
            task.token = setTimeout(() => {
                delete task["token"];
                task.proc();
            }, task.timeout);
        };
        task.proc();
        return {
            dispose: () => {
                if (task.token != null) try {
                    clearTimeout(task.token);
                } catch (ex) { }
            },
            times: () => {
                return task.times;
            },
            timeout: function (value?: number) {
                if (arguments.length > 0 && Maths.isValidNumber(value)) task.timeout = value;
                return task.timeout;
            },
            count: function (value?: number) {
                if (arguments.length > 0) {
                    if (Maths.isValidNumber(value)) task.count = value;
                    else delete task["count"]
                }

                return task.count;
            },
            handler: () => {
                return h;
            }
        };
    }

    /**
      * Creates deferred object.
      */
    export function deferred<T>(): DeferredContract<T> {
        if (typeof Promise !== "undefined") {
            try {
                if (Promise) {
                    var resolveH: Common.Action1<T>;
                    var rejectH: Common.Action1<any>;
                    var promise = new Promise<T>(function (resolve, reject) {
                        resolveH = resolve;
                        rejectH = reject;
                    });
                    return {
                        resolve: (value?: T) => {
                            resolveH(value);
                        },
                        reject: (reason?: any) => {
                            rejectH(reason);
                        },
                        promise: () => {
                            return promise;
                        },
                        then: function () {
                            promise.then.apply(promise, arguments);
                        },
                        catch: function () {
                            promise.catch.apply(promise, arguments);
                        }
                    };
                }
            } catch (ex) { }
        }

        if (typeof jQuery !== "undefined") {
            if (jQuery && jQuery.Deferred) return jQuery.Deferred<T>();
        }

        return null;
    }

    /**
      * Rejects deferred.
      */
    export function rejectDeferred(deferred: any, message: string, info?: any, inner?: any) {
        if (!deferred) deferred = Common.deferred();
        deferred.reject({
            title: message,
            message: message,
            info: info,
            inner: inner,
            timestamp: new Date()
        });
        return deferred;
    }

    /**
      * Listens model changes for binding control.
      * @param control  the source control.
      * @param obj  the object to bind.
      */
    export function listenBindingControl(control: VisualControl & BindingContainerContract<any>, obj: any, proc ?: Action1 <Function>, ignoreFirstProc = false): Collection.DisposableArray {
        var disp = new Collection.DisposableArray();
        if (!obj) obj = {};
        var init = () => {
            obj.id = control.getId();
            obj.model = control.viewModel();
            obj.info = control.info();
            obj.converted = control.converted();
            obj.prop = {};
            control.propKeys().forEach((ele, i, arr) => {
                obj.prop[ele] = control.prop(ele);
            });
        };
        if (!proc) proc = (h) => { h(); };
        if (!ignoreFirstProc) proc(init);
        else init();
        control.viewModelChanged.add((ev) => {
            proc(() => {
                obj.model = ev.value;
            });
        }, control, disp);
        control.convertedChanged.add((ev) => {
            proc(() => {
                obj.converted = ev.value;
            });
        }, control, disp);
        control.convertorChanged.add((ev) => {
            proc(() => {
                obj.convertor = ev.value;
            });
        }, control, disp);
        control.propChanged.add((ev) => {
            if (!ev.key) return;
            proc(() => {
                if (!obj.prop) obj.prop = {};
                obj.prop[ev.key] = ev.value;
            });
        }, control, disp);
        (disp as any).data = obj;
        return disp;
    }

    /**
      * Sets the default binding factory instance. 
      * @param factory  The binding factory instance. 
      */
    export function bindingFactory(value?: BindingFactoryContract, forNullOnly = false): BindingFactoryContract {
        if (arguments.length > 0) {
            if (forNullOnly !== true || !Inner.bindingFactory) Inner.bindingFactory = value;
        }

        return Inner.bindingFactory;
    }

    /**
      * Creates a binding object. 
      * @param value  The value if need fill initially.
      */
    export function bindingObj<T>(value?: T): BindingObjectContract<T> {
        if (Inner.bindingFactory) {
            return arguments.length > 0 ? Inner.bindingFactory.create(value) : Inner.bindingFactory.create<T>();
        }

        return arguments.length > 0 ? listenedObj(value) : listenedObj<T>();
    }

    /**
      * Creates a listened object. 
      * @param value  The value if need fill initially.
      */
    export function listenedObj<T>(initValue?: T): ListenedObjectContract<T> {
        var raw = initValue;
        var times = 0;
        var times2 = 0;
        var changing = new Collection.EventHandlers<ValueChangedArgsContract<T>>();
        var changed = new Collection.EventHandlers<ValueChangedArgsContract<T>>();
        var obs: ListenedObjectContract<T> = function (value?: T) {
            if (arguments.length > 0) {
                if (times2 < Number.MAX_VALUE) times2++;
                var oldValue = raw;
                if (value === oldValue) return;
                if (obs.format && typeof obs.format === "function") value = obs.format(value, oldValue);
                if (value === oldValue) return;
                changing.raise({ oldValue: oldValue, newValue: value, event: "changing", target: null, times: times });
                raw = value;
                if (times < Number.MAX_VALUE) times++;
                changed.raise({ oldValue: oldValue, newValue: value, event: "changed", target: null, times: times });
            }

            return raw;
        } as any;
        obs.bag = {};
        obs.listenChanging = (h: (ev: ValueChangedArgsContract<T>) => void, target?: any, disposableList?: Collection.DisposableArray, args?: any, remove?: Common.Func3<ValueChangedArgsContract<T>, any, number, boolean>): DisposableContract => {
            return changing.add(h, target, disposableList, args, remove);
        };
        obs.listen = (h: (ev: ValueChangedArgsContract<T>) => void, target?: any, disposableList?: Collection.DisposableArray, args?: any, remove?: Common.Func3<ValueChangedArgsContract<T>, any, number, boolean>): DisposableContract => {
            return changed.add(h, target, disposableList, args, remove);
        };
        obs.listenOnce = (h: (ev: ValueChangedArgsContract<T>) => void, target?: any, disposableList?: Collection.DisposableArray, args?: any, remove?: Common.Func3<ValueChangedArgsContract<T>, any, number, boolean>): DisposableContract => {
            return changed.addOnce(h, target, disposableList, args);
        };
        obs.forceToNotify = function (delay?: boolean | number) {
            var notifyNow = () => {
                changing.raise({ oldValue: raw, newValue: raw, event: "notify", target: null, times: times });
                changed.raise({ oldValue: raw, newValue: raw, event: "notify", target: null, times: times });
            };
            if (delay == null || delay === false) notifyNow();
            else if (delay === true) setTimeout(notifyNow, 0);
            else if (typeof delay === "number") setTimeout(notifyNow, delay);
        };
        obs.unlisten = (h: (ev: ValueChangedArgsContract<T>) => void) => {
            changed.remove(h);
        };
        obs.unlistenChanging = (h: (ev: ValueChangedArgsContract<T>) => void) => {
            changing.remove(h);
        };
        obs.clearListener = () => {
            changed.clear();
        };
        obs.clearChangingListener = () => {
            changing.clear();
        };
        obs.subscribe = (callback: (newValue: T) => void, target?: any, event?: string): DisposableContract => {
            event = event ? event.toString().toLowerCase() : null;
            if (!event || event === "changed" || event === "change") return changed.add((ev) => {
                callback.call(target, ev.newValue);
            });
            if (event === "changing" || event === "beforechange") return changing.add((ev) => {
                callback.call(target, ev.newValue);
            });
            return { useless: true, dispose: () => { }, raise: () => { callback.call(target, raw); } };
        };
        obs.model = function (value?: T, forceToNotify = false): T {
            if (arguments.length > 0) {
                if (forceToNotify && obs() === value) obs.forceToNotify();
                else obs(value);
            }

            return raw;
        };
        obs.loadFromWeb = (subject: string | HTMLElement | VisualControl, key: string | Web.BaseDataPackageResolver<T>, parameters?: any) => {
            var promise = Web.resolve(subject, key, parameters);
            promise.then((m) => {
                obs.model(m.result);
            });
            return promise;
        };
        obs.copyModel = () => {
            return Reflection.copy(raw);
        };
        obs.changeTimes = () => {
            return times;
        };
        obs.setterCalledTimes = () => {
            return times2;
        };
        (obs as any).toJSON = () => {
            return Common.Text.serialize(raw);
        };
        return obs;
    }

    export function entityBinding<T>(resolve: Common.Func1<string, T>, id?: string) {
        var obs: EntityBindingContract<T> = (arguments.length > 1 ? listenedObj(id) : listenedObj()) as any;
        obs.getEntity = resolve && typeof resolve === "function" ? () => {
            var id = obs();
            if (!id) return null;
            return resolve(id);
        } : null;
        return obs;
    }

    /**
      * Creates a binding array. 
      * @param col  The array if need fill initially.
      */
    export function bindingArray<T>(col?: T[]): Collection.BindingArrayContract<T> {
        if (Inner.bindingFactory) {
            return arguments.length > 0 ? Inner.bindingFactory.createArray<T>(col) : Inner.bindingFactory.createArray<T>();
        }

        var obs = Common.listenedObj<T[]>(col) as any as Collection.BindingArrayContract<T>;
        obs.indexOf = (searchElement: T, fromIndex?: number): number => {
            return (obs() || []).indexOf(searchElement, fromIndex);
        };
        obs.slice = (start: number, end?: number) => {
            return (obs() || []).slice(start, end);
        };
        obs.splice = (start: number, deleteCount?: number, ...items) => {
            return (obs() || []).splice(start, deleteCount, ...items);
        };
        obs.pop = (): T => {
            return (obs() || []).pop();
        };
        obs.push = (...items): void => {
            var list = obs();
            if (!list) return;
            list.push(...items);
        };
        obs.shift = (): T => {
            return (obs() || []).shift();
        };
        obs.unshift = (...items) => {
            return (obs() || []).unshift();
        };
        obs.reverse = () => {
            return bindingArray((obs() || []).reverse());
        };
        obs.sort = function (compareFunction?: (left: T, right: T) => number) {
            var list = obs();
            if (!list) return;
            return bindingArray(arguments.length > 0 ? list.sort(compareFunction) : list.sort());
        };
        return obs;
    }

    /**
      * Applies binding for view.
      * @param viewModel  The view model.
      * @param element  The element to bind.
      */
    export function applyBindings(control: VisualControl & BindingContainerContract<any>) {
        if (!Inner.bindingFactory || !control) return;
        Inner.bindingFactory.applyBindings(control);
    }

    /**
      * Applies binding for view.
      * @param name  The name of template engine.
      * @param value  The template engine to register.
      */
    export function setTemplateEngine(name: string, value: Common.Action1<VisualControl & BindingContainerContract<any>>) {
        Inner.templateEngines[name] = value;
    }

    /**
      * Applies binding for view.
      * @param name  The name of template engine.
      */
    export function removeTemplateEngine(name: string) {
        delete Inner.templateEngines[name];
    }

    /**
      * Applies a view template with a view model.
      * @param id  The element identifier.
      * @param valueType  The template source type.
      * @param value  The template source value.
      * @param bindings  The view model.
      * @param onerror  The handler to raised on error. The exception message will be provided; a value indicating whether need throw is expected to return.
      */
    export function applyTemplate(type: string, control: VisualControl & BindingContainerContract<any>, valueType: string, value: string, onerror: Func1<string, boolean>) {
        if (!control) return;
        if (!valueType || valueType === "") valueType = "static";
        var str = null;
        var element = control.getElement();
        if (!element) return;
        switch (valueType.toString().toLowerCase()) {
            case "html":
            case "htm":
            case "static":
                str = value ? value.toString() : "";
                break;
            case "element":
                var srcEle = value ? Elements.getById(value) : element;
                if (!srcEle) return;
                str = srcEle.innerHTML;
                break;
            case "this":
            case "inner":
                if (value) {
                    var innerEle = control.getChildElement(true, value);
                    if (!innerEle) return;
                    str = innerEle.innerHTML;
                } else {
                    str = element.innerHTML;
                }

                break;
            case "ajax":
                if (value) Web.RestJob.getString(value, {}).then((str) => {
                    Common.applyTemplate(type, control, "static", str, onerror);
                });

                return;
            default:
                return;
        }

        if (str) {
            str = str.replace(/__view_control_/g, element.id + "_").replace(/{{_id}}/g, element.id).replace(/{{id\(\)}}/g, element.id);
            element.innerHTML = str;
            if (!type) {
                var strTrim = Text.trim(str);
                var teSearText = "<!-- template-engine:";
                var teIndex = strTrim.indexOf(teSearText);
                if (teIndex < 5) {
                    var teLastIndex = strTrim.indexOf("-->", teSearText.length);
                    if (teLastIndex < 50) {
                        var teString = strTrim.substring(teIndex + teSearText.length, teLastIndex);
                        if (teString && teString.indexOf("\n") > 0) teString = teString.substring(0, teString.indexOf("\n"));
                        if (teString && teString.indexOf("\r") > 0) teString = teString.substring(0, teString.indexOf("\r"));
                        if (teString) teString = Text.trim(teString.replace("\n", "").replace("\r", ""));
                        if (teString) type = teString;
                    }
                }
            }
        } else {
            element.innerHTML = "";
        }

        try {
            var te: Common.Action1<VisualControl & BindingContainerContract<any>> = null;
            if (type) te = typeof type === "function" ? type as any : Inner.templateEngines[type];
            if (!te && Inner.defaultTemplateEngine) te = Inner.templateEngines[Inner.defaultTemplateEngine];
            if (!te) te = Common.applyBindings;
            if (te) te(control);
            else Diagnostics.error("CoreLibrary", "[0x02090404] Failed to apply bindings because there is no one registered.");
        } catch (ex) {
            if (!onerror) return;
            var errMsg = ex && ex.message ? ex.message : AliHub.Res.builtIn().localString("bindingError");
            Diagnostics.error("CoreLibrary", "[0x02090403] Failed to apply bindings" + (type ? (" via " + type) : "") + ". (" + errMsg + ")");
            if (!onerror(errMsg)) throw ex;
        }
    }

    /**
      * Gets or sets the template engine. 
      */
    export function defaultTemplateEngine(value?: string): string {
        if (arguments.length > 0) Inner.defaultTemplateEngine = value;
        return Inner.defaultTemplateEngine;
    }

    /**
      * Gets parent control. 
      */
    export function parentControl<T extends VisualControl>(element: HTMLElement | string | VisualControl): T {
        var ele = Elements.getById(element);
        if (!ele) return null;
        var parent = ele.parentElement;
        while (parent && parent !== document.body) {
            if ((parent as any)._control) return (parent as any)._control;
            parent = parent.parentElement;
        }

        return null;
    }

    /**
      * Gets current control. 
      */
    export function currentControl<T extends VisualControl>(element: HTMLElement | string | VisualControl): T {
        var ele = Elements.getById(element);
        while (ele && ele !== document.body) {
            if ((ele as any)._control) return (ele as any)._control;
            ele = ele.parentElement;
        }

        return null;
    }
    
    function getBuiltInControlType(type: string): typeof Common.VisualControl {
        if (typeof type !== "string") return null;
        switch (type.toLowerCase().replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace("-", "").replace("-", "").replace("-", "").replace("-", "").replace("alihub", "").replace("quark", "").replace("control", "")) {
            case "visual":
            case "commonvisual":
                return Common.VisualControl;
            case "binding":
            case "commonbinding":
                return Common.BindingControl;
            case "activity":
            case "commonactivity":
                return Common.ActivityControl;
            case "time":
            case "commontime":
                return Common.TimeControl;
            case "list":
            case "collectionlist":
                return Collection.ListControl;
            case "table":
            case "collectiontable":
                return Collection.TableControl;
            case "paging":
            case "collectionpaging":
                return Collection.PagingControl;
            case "array":
            case "arraybinding":
            case "collectionbinding":
                return Collection.BindingControl;
            case "switch":
            case "collectionswitch":
                return Collection.SwitchControl;
            case "singleflow":
            case "collectionsingleflow":
                return Collection.SingleFlowControl;
            case "audio":
            case "mediaaudio":
                return Media.AudioControl;
            case "camera":
            case "mediacamera":
                return Media.CameraControl;
            case "button":
            case "elementsbutton":
                return Elements.ButtonControl;
            case "checkbox":
            case "elementscheckbox":
                return Elements.ButtonControl;
            default:
                return Elements.getControlRegisteredForTag(type.toLowerCase());
        }
    }

    /**
      * Fills a control in an element.
      * @param element  The element.
      * @param options  The options to load.
      */
    export function fillControl<T extends Common.VisualControl>(element: HTMLElement | string, type?: string | typeof Common.VisualControl, options?: VisualControlOptionsContract<T> | boolean | Func<VisualControlOptionsContract<T>>): T {
        var ele = Elements.getById(element);
        if (!ele || !ele.tagName) return null;
        if ((ele as any)._control) return (ele as any)._control;
        var toFill = true;
        var parentEle = ele;
        while (parentEle) {
            var eTagName = parentEle.tagName ? parentEle.tagName.toString().toLowerCase() : null;
            if (!eTagName || eTagName === "template" || eTagName === "part" || eTagName === "template-part") {
                toFill = false;
                break;
            }

            parentEle = parentEle.parentElement;
        }

        if (!toFill) return;
        if (!type) {
            if (ele.tagName.toLowerCase().indexOf("quark-") === 0) type = ele.tagName.toLowerCase();
            else if (Elements.hasControlRegisteredForTag() && ele.tagName.toLowerCase().indexOf("-") > 0) type = ele.tagName.toLowerCase();
            else if (ele.getAttribute && ele.getAttribute("data-control-type")) type = ele.getAttribute("data-control-type");
        }

        if (!type) return null;
        var gen: typeof Common.VisualControl = type as any;
        if (typeof type === "string") gen = getBuiltInControlType(type);
        var c = ele && gen && typeof gen === "function" ? new gen(ele) : null;
        if (!c) return null;
        c.loadOptions(Reflection.unwrapObject(options, c));
        return c as any;
    }

    /**
      * Gets a specific control.
      * @param id  the element identifier or prefix.
      * @param appendingIdParts  the additional identifier parts.
      */
    export function getControl<T extends VisualControl>(element: string | HTMLElement | Common.VisualControl | Document | Window | AliHub.Common.Func<HTMLElement> | AliHub.Common.Func<string> | AliHub.Common.Func<Common.VisualControl>, ...appendingIdParts: string[]): T {
        var ele = Elements.getById(element, ...appendingIdParts);
        return ele && (ele as any)._control ? (ele as any)._control : null;
    }

    /**
      * Creates a control as child.
      * @param id  The identifier.
      * @param control  The type of the control to append.
      * @param parent  The parent control.
      */
    export function createControl(id: string | HTMLElement, control?: typeof VisualControl, options?: VisualControlOptionsContract<any> | boolean | VisualControl | Func<VisualControlOptionsContract<any>>, parent?: VisualControl | VisualControlOptionsContract<VisualControl> | boolean): VisualControl {
        if (!control) control = VisualControl;
        var cO: VisualControlOptionsContract<VisualControl> | boolean = options as any;
        var pC: VisualControl = parent && (parent as VisualControl).getId ? (parent as any) : null;
        if (options && (options as VisualControl).getId && (!pC || !pC.getId)) {
            cO = null;
            pC = options as any;
        }

        if (!cO && parent && !(parent as VisualControl).getId) {
            cO = parent as any;
        }

        var c: VisualControl;
        if (pC) {
            if (!id) return null;
            if ((id as HTMLElement).tagName) {
                if (!(id as HTMLElement).id) (id as HTMLElement).id = Maths.randomString("ali_content_ele_t_ri");
                id = (id as HTMLElement).id;
            }

            c = pC.createControl(id as string, control);
        } else {
            c = new control(id);
        }

        if (cO && c) c.loadOptions(cO);
        return c;
    }

    /**
      * Creates a VisualControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param options  The initializition options.
      * @param parent  The parent control.
      */
    export function visualControl<T>(idSuffix: string | HTMLElement, options?: VisualControlOptionsContract<VisualControl> | boolean, parent?: VisualControl): VisualControl {
        return createControl(idSuffix, null, options, parent);
    }

    /**
      * Creates a BindingControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param options  The initializition options.
      * @param parent  The parent control.
      */
    export function bindingControl<T>(idSuffix: string | HTMLElement, options?: VisualControl | BindingControlOptionsContract<T> | boolean, parent?: VisualControl | BindingControlOptionsContract<T> | boolean): BindingControl<T> {
        return createControl(idSuffix, BindingControl, options, parent) as any;
    }

    /**
      * Creates a ActivityControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param options  The initializition options.
      * @param parent  The parent control.
      */
    export function activityControl(idSuffix: string | HTMLElement, options?: ActivityControlOptionsContract | boolean, parent?: VisualControl): ActivityControl {
        return createControl(idSuffix, ActivityControl, options, parent) as any;
    }

}

namespace AliHub.Data {

    /**
      * Data sources.
      */
    export var Sources: any = {};

}

// For asynchronous modules loaders.
(function () {
    var __resolveAliHub = function (message) {
        if (typeof console === "undefined") return AliHub;
        if (console && typeof console.info === "function") console.info("Quark loads completed by AMD.");
        return AliHub;
    };
    try {
        if (!(window as any)._pageInitDate) (window as any)._pageInitDate = new Date();
    } catch (ex) { }
    if (typeof define === 'function') {
        if (define['amd']) {
            define(["exports"], function (exports) {
                return __resolveAliHub("Quark loads completed by AMD.");
            });
        } else if (typeof __webpack_require__ !== "undefined") {
            define(["exports"], function (exports) {
                return __resolveAliHub("Quark loads completed by Webpack.");
            });
        } else if (typeof modulex !== "undefined" || typeof KISSY !== "undefined") {
            define(function (r, e, m) {
                return __resolveAliHub("Quark loads completed by KISSY / Modulex.");
            });
        }
    } else if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        __resolveAliHub("Quark loads completed by CommonJS.");
        module["exports"] = AliHub;
    } else if (typeof KISSY !== "undefined") {
        KISSY.add(function (S) {
            return __resolveAliHub("Quark loads completed by KISSY 1.x.");
        }, { requires: [] });
    }
})();
