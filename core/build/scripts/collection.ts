/*  --------------------
 *  Collection - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  collection.ts
 *  Description  Collection library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

/// <reference path="common.ts" />

namespace AliHub.Collection {

    /**
      * Hash table.
      */
    export interface HashTableContract {

        /**
          * Gets or sets value by key.
          */
        [key: string]: any;
    }

    /**
      * Dictionary.
      */
    export interface DictionaryContract<T> {

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

        [property: string]: any;
    }

    export interface MappingContract {
        [key: string]: string | string[];
    }

    export interface MappedContract {
        map: MappingContract;
        [property: string]: any;
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
      * Changing value.
      */
    export interface ValueChangedContract<T> {

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
    export interface SelectChangedContract<T> {

        selectionMode: SelectionModes;

        toUnselected: T[];

        toSelected: T[];

        selected: T[];

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
      * Current changing count infor.
      */
    export interface ChangedListContract<T> {

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
      * Key value pair with string key.
      */
    export interface PropertyItemContract<T> extends KeyValuePairContract<string, T> {
    }

    /**
      * Key value pairs.
      */
    export interface KeyValuePairsContract<TKey, TValue> extends Array<KeyValuePairContract<TKey, TValue>> {
    }

    /**
      * Properties.
      */
    export interface PropertiesContract<T> extends KeyValuePairsContract<string, T> {
    }

    /**
      * Strings properties.
      */
    export interface StringPropertiesContract extends PropertiesContract<string> {
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

        /**
          * Property.
          */
        [key: string]: any;

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
      * List organizing settings.
      */
    export interface ListOrganizeSettingsContract<T> {

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

    export interface TableCellArgContract {
        container: HTMLTableCellElement;
        value: any;
        column: TableColumnContract;
        row: any;
        [property: string]: any;
    }

    export interface TableColumnArgContract {
        container: HTMLTableCellElement;
        column: TableColumnContract;
        [property: string]: any;
    }

    export interface TableContract<T> {
        schema: TableColumnContract[];
        values: T[];
        statistics?: TableStatisticsContract;
        order?: string | Common.Func2<any, any, boolean>;
        key?: string | Common.Func2<any, any, boolean>;
        [property: string]: any;
    }

    export interface DataTableRowContract {
        model: any;
        statistics?: PropertiesContract<any> | any[];
        items: PropertiesContract<any> | any[];
    }

    export interface TableColumnContract {
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

    export interface TableStatisticsContract {
        id?: string;
        name: string;
        values: PropertiesContract<any>;
    }

    export interface SelectorItemContract {
        id: string;
        name: string;
        children?: SelectorItemContract[] | boolean;
    }

    export interface ShiftChangingContract {
        user: string;
        shift: string;
        date: number;
        note: string;
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
        reverse(): BindingArrayContract<T>;
        sort(): BindingArrayContract<T>;
        sort(compareFunction: (left: T, right: T) => number): BindingArrayContract<T>;
    }

    /**
      * Grouped list contract.
      */
    export interface GroupedListContract<T> {
        name: string;
        list: Collection.KeyValuePairContract<string, T>[];
    }

    /**
      * Web data resolver.
      */
    export interface WebDataContract {
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
    export interface ListViewModelContract<T> {

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
        renderGroupTitle? (list: ListControl<T>, info: GroupItemInfoContract<T>): void;

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
      * Binding control options.
      */
    export interface BindingControlOptionsContract<T> extends Common.VisualControlOptionsContract<BindingControl<T>> {

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
    export interface SwitchControlOptionsContract extends Common.VisualControlOptionsContract<SwitchControl> {

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
    export interface ListControlOptionsContract<T> extends Common.VisualControlOptionsContract<ListControl<T>> {

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
    export interface PagingControlOptionsContract extends Common.VisualControlOptionsContract<PagingControl> {

        /**
          * Template source value for selector.
          */
        selectorTemplate;

        /**
          * Template source type for selector.
          */
        selectorTemplateType;

        /**
          * Template source value for ellipsis zone.
          */
        ellipsisTemplate;

        /**
          * Template source type for ellipsis zone.
          */
        ellipsisTemplateType;

        /**
          * Template source value for function zone.
          */
        functionTemplate;

        /**
          * Template source type for function zone.
          */
        functionTemplateType;

        /**
          * Template source value for information zone.
          */
        infoTemplate;

        /**
          * Template source type for information zone.
          */
        infoTemplateType;
    }

    /**
      * Binding control options.
      */
    export interface TableControlOptionsContract<T> extends Common.VisualControlOptionsContract<TableControl<T>> {

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
    export interface SingleFlowControlOptionsContract<T> extends Common.VisualControlOptionsContract<SingleFlowControl<T>> {
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
        model? (list: ListControl<T>, item: ListItemInfo<T>): any;

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

    export interface PagingViewModelContract {

        turnTo(control: PagingControl, index: number): void;

        getModel? (control: PagingControl, index: number): any;

    }

    export interface PositionContract {

        index: number;

        total?: number;

    }

    export interface PagingInfoContract extends PositionContract {

        current: Common.Func<number>;

    }

    export interface RecordsCountContract {
        start: number;
        end: number;
        size: number;
        total: number;
        pageIndex: number;
        pageTotal: number;
    }

    export interface SwitchItemInfoContract {
        index: number;
        key: string;
        control: Common.VisualControl;
        model: any;
        options: SwitchItemOptionsContract;
        tab: Common.BindingControl<any>;
    }

    export interface SwitchItemOptionsContract {
        background?: boolean;
        loaded?: Common.Action1<SwitchItemInfoContract>;
        shown?: Common.Action1<SwitchItemInfoContract>;
        hidden?: Common.Action1<SwitchItemInfoContract>;
    }

    /**
      * Table column types.
      */
    export enum ReferenceMappingTypes {
        Property = 0,
        Id = 1,
        Key = 2,
        Index = 3,
        Function = 6,
        Static = 7
    }

    /**
      * Table column types.
      */
    export enum TableColumnTypes {
        None = 0,
        Property = 1,
        Item = 2,
        Statistics = 3,
        Index = 4,
        Action = 5,
        Decorator = 6,
        Other = 7
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
      * Selection modes.
      */
    export enum SelectionModes {

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
        Multiple = 3

    }

    /**
      * Array binding control.
      */
    export class BindingControl<T> extends Common.VisualControl implements Common.BindingContainerContract<T[]> {

        private _model = Common.bindingArray<T>();

        private _info = Common.bindingObj();

        private _extenders: BindingControlExtender<T>[] = [];

        private _convertor: Common.Func1<T[], any> = null;

        private _converted = Common.bindingObj();

        private _extendersLoaded = false;

        private _templateEngine: string;

        private _modelDispose: Common.DisposableContract;

        public viewModelChanged = new Collection.EventHandlers<Collection.PropertyItemContract<T[]>>();

        public convertedChanged = new Collection.EventHandlers<Collection.PropertyItemContract<any>>();

        public convertorChanged = new Collection.EventHandlers<Collection.PropertyItemContract<Common.Func1<T[], any>>>();

        public infoChanged = new Collection.EventHandlers<Collection.PropertyItemContract<any>>();

        /**
          * Initializes a new instance of the ArrayBindingControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones. 
          */
        constructor(id: Common.VisualControlElementContract) {
            super(id);
            this._modelDispose = this._model.subscribe((newValue) => {
                var converted = this._updateConverted(newValue);
                this._loadExtenders();
                if (this.viewModelChanged && this.viewModelChanged.raise) this.viewModelChanged.raise({ key: "viewModel", value: newValue });
                if (this.convertedChanged && this.convertedChanged.raise) this.convertedChanged.raise({ key: "converted", value: converted });
            });
        }

        /**
          * Raises on binding error. 
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
                value = this.templatePart(!!value ? value : "item");
                if (valueType === "initpart" && !value) return;
                valueType = "";
            }

            Common.applyTemplate(this._templateEngine, this, valueType, value, (errMsg) => { return this.onBindingError(errMsg); });
            this._loadExtenders();
        }

        /**
          * Gets or sets the view model. 
          * @param value  Model value to set; or null, if just to resolve model.
          */
        public viewModel(value?: T[]): T[] {
            if (arguments.length > 0) {
                this._model(value);
            }

            return this._model();
        }

        /**
          * Sets the view model from web. 
          * @param subject  The subject of data resolver registered. 
          * @param key  The key of data resolver. 
          */
        public setViewModelFromWeb(subject: string, key: string | Web.BaseDataPackageResolver<T[]>, parameters?: any) {
            var promise = Web.resolve(subject, key, parameters);
            promise.then((m) => {
                this.viewModel(m.result);
            });
            return promise;
        }

        /**
          * Subscribe view model changed. 
          * @param h  Callback during value has been changed.
          * @param target  The "this" target of h callback.
          */
        public subscribeViewModel(h: (newValue: T[]) => void, target?: any): Common.DisposableContract {
            return this.viewModelChanged.add((ev) => {
                h.call(target || this, ev.value);
            });
        }

        /**
          * Gets observable view model. 
          */
        public observableViewModel(): BindingArrayContract<T> {
            return this._model;
        }

        /**
          * Gets or sets the additional information. 
          * @param value  The additional information value to set; or ignore this parameter, if just resolve the additional information.
          */
        public info(value?: any): any {
            if (arguments.length > 0) this._info(value);
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
        public convertor(h?: Common.Func1<T[], any>): Common.Func1<T[], any> {
            if (arguments.length > 0) {
                this.setConvertor(h);
            }

            return this._convertor;
        }

        /**
          * Sets the convertor.
          * @param value  The convertor to set; or ignore this parameter, if just resolve the convertor.
          */
        public setConvertor(h: Common.Func1<T[], any>) {
            if (h === this._convertor || (!h && !this._convertor)) return;
            this._convertor = h;
            var converted = this.updateConverted();
            if (this.convertorChanged && this.convertorChanged.raise) this.convertorChanged.raise({ key: "convertor", value: h });
            if (this.convertedChanged && this.convertedChanged.raise) this.convertedChanged.raise({ key: "converted", value: converted });
        }

        /**
          * Gets the converted value.
          */
        public converted(): any {
            return this._converted();
        }

        /**
          * Updates the converted value.
          */
        public updateConverted() {
            return this._updateConverted(this._model());
        }

        /**
          * Sets view model as null. 
          */
        public clearViewModel(): void {
            this.viewModel(null);
        }


        /**
          * Listens model changes.
          * @param obj  the object to bind.
          */
        public listenModel(obj: any, proc?: Common.Action1<Function>, ignoreFirstProc = false): Collection.DisposableArray {
            return Common.listenBindingControl(this, obj, proc, ignoreFirstProc);
        }

        /**
          * Refreshes view. 
          */
        public refresh(): void {
            var model = this._model();
            this._model();
            this._model(model);
        }

        /**
          * Loads specific options.
          * @param value  The options to load. 
          */
        public loadOptions(value: BindingControlOptionsContract<T> | boolean): any {
            var options: BindingControlOptionsContract<T> = super.loadOptions(value);
            if (!options) return null;
            if (!!options.templateEngine) this.templateEngine(options.templateEngine);
            if (!!options.viewModel) this.viewModel(options.viewModel);
            if (!!options.convertor) this.setConvertor(options.convertor);
            this.addExtender(options.extender);
            this.setTemplate(options.templateType, options.template);
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
                if (this._extendersLoaded && ele.load) ele.load(this);
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

        private _updateConverted(model: any): any {
            if (!this._convertor) return undefined;
            var converted = this._convertor(model);
            this._converted(converted);
            return this._converted();
        }

        private _loadExtenders() {
            if (this._extendersLoaded || !this.getElement()) return;
            var html = this.getElement().innerHTML;
            if (html && html !== "" && this.viewModel()) {
                this._extendersLoaded = true;
                this._extenders.forEach((ele, i, arr) => {
                    if (!!ele && !!ele.load) ele.load(this);
                });
            }
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
          * Manual text notification.
          */
        public notify = new AliHub.Collection.EventHandlers<KeyValuePairContract<string, string>>();

        /**
          * Sets reference instance property.
          * @param key  The property key. 
          * @param value  The value of the property to set. 
          */
        public setProp(key: string, value: any) {
            if (!this.ref) this.ref = {};
            this.ref[key] = value;
        }

        /**
          * Gets reference instance property.
          * @param key  The property key. 
          */
        public getProp<T>(key: string): T {
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
            var id = Elements.mergeId(usePrefix ? this.element.id : null, appendingIdParts);
            return Elements.getById(id);
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
            instance.notify = this.notify;
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

        private _itemTemplG: string;

        private _itemTemplT: string;

        private _itemTemplV: string;

        private _headerTemplG: string;

        private _headerTemplT: string;

        private _headerTemplV: string;

        private _extenders: ListExtender<T>[] = [];

        private _references: MappedContract[] = [];

        private _selected: T[] = [];

        private _empty: Common.BindingControl<any>;

        /**
          * Raised on request update.
          */
        public updateRequested = new EventHandlers<Object>();

        /**
          * The handler raised on pushing entries. 
          */
        public entriesPushed = new EventHandlers<T[]>();

        /**
          * The handler raised on items selected. 
          */
        public selected = new EventHandlers<ValueChangedContract<T[]>>();

        /**
          * View model for the list. 
          */
        public viewModel: ListViewModelContract<T>;

        /**
          * Selection mode for user experience. 
          */
        public selectionMode = SelectionModes.None;

        /**
          * Initializes a new instance of the ListControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones. 
          */
        constructor(id: Common.VisualControlElementContract) {
            super(id);
            var eleId = this.getId();
            var listId = eleId + "_list";
            var notificationId = eleId + "_notification";
            this.addStyleRef("ali-controls-list");
            this.getElement().innerHTML = "<div id=\"" + notificationId + "\" class=\"ali-pop-notification\" style=\"display: none; \"></div><ul id=\"" + listId + "\"></ul><div id=\"" + eleId + "_empty\" class=\"ali-container-empty\" style=\"display: none; \" ></div><div id=\"" + eleId + "_note\" class=\"ali-container-note\" style=\"display: none; \" ></div>";
            this._listEle = Elements.getById(listId) as HTMLUListElement;
            var notificationEle = Elements.getById(notificationId);
            if (!!notificationEle) notificationEle.onclick = (ev: MouseEvent) => {
                if (!!this.updateRequested) {
                    if (!!this.viewModel && !!this.viewModel.onUpdateRequested) this.viewModel.onUpdateRequested(this);
                    this.updateRequested.raise({});
                }

                notificationEle.style.display = "none";
            };
        }

        /**
          * Gets whether the list is empty to show. 
          */
        public isEmpty(): boolean {
            var emptyContainer = this.getChildElement(true, "empty");
            var count = this.forEachItem();
            if (count === 0) {
                if (!!emptyContainer) emptyContainer.style.display = "";
                return true;
            }

            if (!!emptyContainer) emptyContainer.style.display = "none";
            return false;
        }

        /**
          * Adds a reference. 
          */
        public addReference(...values: MappedContract[]) {
            if (!values) return;
            values.forEach((value, vI, vA) => {
                if (Collection.contains(this._references, value)) return;
                this._references.push(value);
            });
        }

        /**
          * Checks whehter there is a specific reference. 
          */
        public containReference(...value: MappedContract[]): boolean {
            return Collection.contains(this._references, value);
        }

        /**
          * Removes a specific reference. 
          */
        public removeReference(...value: MappedContract[]) {
            Collection.remove(this._references, value, true);
        }
        
        /**
          * Clears all references. 
          */
        public clearReference() {
            this._references = [];
        }

        /**
          * Gets an entry by a specific reference item. 
          */
        public getEntry<TRes>(reference: Common.ReferenceItemContract): TRes {
            return Collection.getEntry<TRes>(this._references, reference);
        }

        /**
          * Gets entries by a specific reference item. 
          */
        public getEntries<TRes>(reference?: Common.ReferenceItemContract): TRes[] {
            if (arguments.length === 0) {
                var col: T[] = [];
                this._list.forEach((ele, i, arr) => {
                    if (!!ele) col.push(ele.model);
                });

                return col as any;
            }

            return Collection.getEntries<TRes>(this._references, reference);
        }

        /**
          * Selects one or more entries.
          * @param entry  The entry to select. 
          */
        public select(...entry: T[]) {
            var copied = Collection.copy(this._selected);
            if (this._changeSelection(entry, null) > 0) this.selected.raise({ key: "selected", old: copied, value: this._selected });
        }

        /**
          * Unselects one or more entries.
          * @param entry  The entry to unselect. 
          */
        public unselect(...entry: T[]) {
            var copied = Collection.copy(this._selected);
            if (this._changeSelection(null, entry) > 0) this.selected.raise({ key: "selected", old: copied, value: this._selected });
        }

        /**
          * Changes selection.
          * @param adding  The entry to select. 
          * @param removing  The entry to unselect. 
          * @param clearAction  A value indicating whether need clear before selection changing action. 
          */
        public changeSelection(adding: T[], removing?: T[], clearAction = false) {
            if (clearAction) this.clearSelection();
            var copied = Collection.copy(this._selected);
            if (this._changeSelection(adding, removing) > 0) this.selected.raise({ key: "selected", old: copied, value: this._selected });
        }

        /**
          * Clears all selection.
          */
        public clearSelection() {
            var copied = Collection.copy(this._selected);
            if (this._changeSelection(null, copied) > 0) this.selected.raise({ key: "selected", old: copied, value: this._selected });
        }

        /**
          * Checks whether an entry is selected.
          * @param entry  The entry to test. 
          */
        public isSelected(entry: T): boolean {
            return Collection.indexOf(this._selected, entry) >= 0;
        }

        /**
          * Sets the tiles view mode.
          * @param index  true if enable tiles mode; otherwise, false. 
          */
        public setTilesView(value: boolean) {
            var className = value ? "ali-controls-tiles" : "ali-controls-list";
            this.styleRef([className], ["ali-controls-list", "ali-controls-tiles"]);
        }

        /**
          * Removes a specific item.
          * @param index  Index of the item to remove. 
          */
        public remove(index: number): void {
            if (index < 0 || index >= this._list.length) {
                this.isEmpty();
                return;
            }

            var col: ListItemInfo<T>[] = [];
            var delList: T[] = [];
            this._list.forEach((ele, i, arr) => {
                if (index === i) {
                    delList.push(ele.model);
                    ele.element.outerHTML = "";
                    return;
                }

                col.push(ele);
                if (index > i) return;
                ele.index--;
                this.onItemIndexChanged(ele, ele.index + 1);
            });

            this.changeSelection(null, delList);
            this._list = col;
            this.isEmpty();
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
        public addExtender(value: ListExtender<T> |  ListExtender<T>[]): void {
            if (!value) return;
            var col = Collection.toArray(value);
            col.forEach((ele, i, arr) => {
                if (!ele || !ele.name) return;
                this.removeExtender(ele.name);
                this._extenders.push(ele);
            });
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
          * @param entry  The item to set into the list. Collection supported.
          */
        public push(...entry: T[]): T[] {
            return this.pushRange(entry);
        }

        /**
          * Batch pushes a colletion.
          * @param col  A collection to delta update into the list. 
          */
        public pushRange(col: T[]): T[] {
            if (!col) {
                this.isEmpty();
                return [];
            }

            if (!Collection.isArray(col)) col = (col as any).list || (col as any).arr;
            if (!col) {
                this.isEmpty();
                return [];
            }

            var deltaCol: T[] = [];
            col.forEach((ele, index, arr) => {
                if (this._push(ele)) deltaCol.push(ele);
            });
            this.refreshHeaders();
            if (deltaCol.length == 0) return [];
            if (!!this.viewModel && !!this.viewModel.onEntriesPushed) this.viewModel.onEntriesPushed(this, deltaCol);
            if (!!this.entriesPushed) this.entriesPushed.raise(deltaCol);
            this.isEmpty();
            return deltaCol;
        }

        /**
          * Pushes a resource.
          * @param propertyKey  The property key to get collection in the resource object. 
          * @param resource  A resource to push. Collection supported.
          */
        public pushResource(propertyKey: string, ...resource: MappedContract[]): T[] {
            if (!resource) {
                this.isEmpty();
                return [];
            }

            var col: T[] = [];
            var result: T[] = [];
            resource.forEach((res, resI, resA) => {
                if (!res) return;
                if (res instanceof Array) {
                    var pushedX = this.pushRange(res as any);
                    if (!!pushedX) pushedX.forEach((pushedItem, pushedI, pushedA) => {
                        result.push(pushedItem);
                    });

                    return;
                }

                this.addReference(res);
                var entries: T[] = !!propertyKey ? res[propertyKey] : ((res as any).list || (res as any).arr);
                if (!Collection.isArray(entries)) return;
                var pushed = this.pushRange(entries);
                if (!!pushed) pushed.forEach((pushedItem, pushedI, pushedA) => {
                    result.push(pushedItem);
                });
            });
            return result;
        }

        /**
          * Batch pushes a colletion from web.
          * @param subject  The subject of data resolver registered. 
          * @param key  The key of data resolver. 
          */
        public pushFromWeb(subject: string, key: string | Web.BaseDataPackageResolver<T>, parameters?: any, clearBefore = false): Web.ResponseTask<T> {
            var promise = Web.resolve<T>(subject, key, parameters);
            promise.then((r) => {
                if (clearBefore) this.clear();
                this.push(r.result);
            });
            return promise;
        }

        /**
          * Batch pushes a colletion from web.
          * @param subject  The subject of data resolver registered. 
          * @param key  The key of data resolver. 
          */
        public pushRangeFromWeb(subject: string, key: string | Web.BaseDataPackageResolver<T[]>, parameters?: any, clearBefore = false): Web.ResponseTask<T[]> {
            var promise = Web.resolve<T[]>(subject, key, parameters);
            promise.then((r) => {
                if (clearBefore) this.clear();
                this.pushRange(r.result);
            });
            return promise;
        }

        /**
          * Batch pushes a colletion from web.
          * @param subject  The subject of data resolver registered. 
          * @param key  The key of data resolver. 
          * @param propertyKey  The property key to get collection in the resource object. 
          */
        public pushResourceFromWeb(subject: string, key: string | Web.BaseDataPackageResolver<MappedContract>, propertyKey: string, parameters?: any, clearBefore = false): Web.ResponseTask<MappedContract> {
            var promise = Web.resolve<MappedContract>(subject, key, parameters);
            promise.then((r) => {
                if (clearBefore) this.clear();
                this.pushResource(propertyKey, r.result);
            });
            return promise;
        }

        /**
          * Reloads the list.
          */
        public refresh(): void {
            if (!this._listEle) return;
            this._listEle.innerHTML = "";
            this._eleCount = 0;
            this._list.forEach((tile, i, arr) => {
                if (tile == null) return;
                var eleEle = document.createElement("li");
                eleEle.className = "ali-container-main";
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
            this.isEmpty();
        }

        /**
          * Loads specific options.
          * @param value  The options to load. 
          */
        public loadOptions(value: ListControlOptionsContract<T> | boolean): any {
            var options: ListControlOptionsContract<T> = super.loadOptions(value);
            if (!options) return null;
            if (options.itemTemplateEngine) this._itemTemplG = options.itemTemplateEngine;
            if (options.headerTemplateEngine) this._headerTemplG = options.headerTemplateEngine;
            this.viewModel = new ConfigurableListViewModel({
                areInSameGroup: options.areInSameGroup,
                areSame: options.areSame,
                convert: options.convert,
                getGroupModel: options.getGroupModel,
                isBefore: options.isBefore,
                isDeleted: options.isDeleted,
                isVisible: options.isVisible,
                mergeChanging: options.mergeChanging,
                valid: options.valid
            });
            if (options.tilesView != null) this.setTilesView(options.tilesView);
            if (options.selectionMode != null) this.selectionMode = options.selectionMode;
            if (!options.ignoreParts) {
                this.setItemTemplate("initpart", null);
                this.setHeaderTemplate("initpart", null);
                this.setEmptyMessageTemplate("initpart", null);
            }

            if (options.emptyMessageTemplateEngine && !this._empty) {
                this._empty = new Common.BindingControl(this.getId() + "_empty");
                this._empty.addStyleRef("ali-container-empty");
                this._empty.templateEngine(options.emptyMessageTemplateEngine);
            }

            if (options.emptyMessageViewModel != null) this.emptyMessageViewModel(options.emptyMessageViewModel);
            if (options.emptyMessageTemplate) this.setEmptyMessageTemplate(options.emptyMessageTemplateType, options.emptyMessageTemplate);
            this.setItemTemplate(options.itemTemplateType, options.itemTemplate);
            this.setHeaderTemplate(options.headerTemplateType, options.headerTemplate);
            if (options.renderItem) {
                if (!this.viewModel) this.viewModel = {};
                this.viewModel.renderItem = options.renderItem;
            }

            if (options.renderGroupTitle) {
                if (!this.viewModel) this.viewModel = {};
                this.viewModel.renderGroupTitle = options.renderGroupTitle;
            }

            this.addExtender(options.extender);
            if (options.webData) {
                var webData = typeof options.webData === "function" ? (options.webData as any as Function).call(options) : options.webData;
                this.pushResourceFromWeb(webData.subject, webData.key, webData.propertyKey, webData.parameters, webData.clearBefore);
            }

            return options;
        }

        /**
          * Sets the view template of each item.
          * @param sourceType  The type of view template source.
          * @param sourceValue  The value of view template source.
          */
        public setItemTemplate(sourceType: string, sourceValue: string) {
            if (sourceType == null && sourceValue == null) return;
            if (sourceType === "part" || sourceType === "initpart") {
                sourceValue = this.templatePart(sourceValue ? sourceValue : "item");
                if (sourceType === "initpart" && !sourceValue) return;
                sourceType = "";
            }

            this._itemTemplT = sourceType || "static";
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
          * Sets the view template of each group header.
          * @param sourceType  The type of view template source.
          * @param sourceValue  The value of view template source.
          */
        public setHeaderTemplate(sourceType: string, sourceValue: string) {
            if (sourceType == null && sourceValue == null) return;
            if (sourceType === "part" || sourceType === "initpart") {
                sourceValue = this.templatePart(!!sourceValue ? sourceValue : "header");
                if (sourceType === "initpart" && !sourceValue) return;
                sourceType = "";
            }

            this._headerTemplT = !!sourceType ? sourceType : "static";
            this._headerTemplV = sourceValue;
            this.refresh();
        }

        /**
          * Clears the view template of each group header.
          */
        public clearHeaderTemplate() {
            this._headerTemplT = null;
            this._headerTemplV = null;
            this.refresh();
        }

        /**
          * Sets the view template of the empty message.
          * @param sourceType  The type of view template source.
          * @param sourceValue  The value of view template source.
          */
        public setEmptyMessageTemplate(sourceType: string, sourceValue: string, viewModel = null) {
            if (sourceType == null && sourceValue == null) return;
            if (!this._empty) {
                this._empty = new Common.BindingControl(this.getId() + "_empty");
                this._empty.addStyleRef("ali-container-empty");
            }

            if (sourceType === "part" || sourceType === "initpart") {
                sourceValue = this.templatePart(!!sourceValue ? sourceValue : "empty");
                if (sourceType === "initpart" && !sourceValue) return;
                sourceType = "";
            }

            this._empty.setTemplate(sourceType, sourceValue);
            if (arguments.length > 2) this._empty.viewModel(viewModel);
        }

        /**
          * Gets or sets empty mesaage view model.
          */
        public emptyMessageViewModel<T>(viewModel?: T): T {
            if (!this._empty) return null;
            if (arguments.length > 0) this._empty.viewModel(viewModel);
            return this._empty.viewModel();
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
                    var model = this.getGroupModel(groupInfo);
                    groupInfo.model = model;
                    try {
                        if (!!this._headerTemplT && !!this._headerTemplV) {
                            var bindingControl = new Common.BindingControl<GroupItemInfoContract<T>>(eleGroupEle.id);
                            bindingControl.templateEngine(this._headerTemplG);
                            bindingControl.viewModel(model);
                            bindingControl.info(groupInfo);
                            bindingControl.setTemplate(this._headerTemplT, this._headerTemplV);
                        }

                        this.renderGroupTitle({ element: eleGroupEle, firstItem: tile, model: model });
                    } catch (ex) {
                        errCount++;
                        eleGroupEle.outerHTML = "";
                    }
                    count++;
                }
            });

            if (errCount > 0) {
                Diagnostics.warn("CoreLibrary", "[0x02072302] Failed to render group title in list control for " + errCount.toString() + " times.");
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

        public getChildrenElements(): HTMLLIElement[] {
            var list: HTMLLIElement[] = [];
            var children = this._listEle.children;
            for (var i = 0; i < children.length; i++) {
                var child = children[i] as HTMLLIElement;
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
                var child = children[i] as HTMLLIElement;
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
            this._selected = [];
            var emptyContainer = this.getChildElement(true, "empty");
            if (!emptyContainer) return;
            emptyContainer.style.display = "";
        }

        /**
          * Copies entries. 
          */
        public copyEntries(): T[] {
            var col: T[] = [];
            this._list.forEach((ele, i, arr) => {
                if (ele) col.push(ele.model);
            });

            return col;
        }

        /**
          * Performs the specified action for each element in this list.
          * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array. 
          * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
          */
        public forEachItem(callbackfn?: (value: ListItemInfo<T>, index: number, array: ListItemInfo<T>[]) => void): number {
            var count = 0;
            this._list.forEach((ele, i, arr) => {
                if (!ele) return;
                count++;
                if (callbackfn) callbackfn(ele.copy(), i, arr);
            });
            return count;
        }

        /**
          * Returns the position of the first occurrence of a substring. 
          * @param item  An item to find. 
          * @param compare  An additional comparation handler.
          * @param action  An additional action handler for specific item searched.
          */
        public itemIndexOf<TItem>(item: TItem, compare?: Common.Func2<T, TItem, boolean>, action?: Common.Action1<ListItemInfo<T>>): number {
            var info: ListItemInfo<T>;
            this._list.some((ele, i, arr) => {
                if (!ele || !ele.model) return false;
                if (compare != null) {
                    var h = compare as Common.Func2<T, TItem, boolean>;
                    if (!h.call(this, ele.model, item)) return false;
                } else {
                    if (ele.model !== item as any) return false;
                }

                info = ele;
                return true;
            });
            if (!!action) action(info);
            return !!info ? info.index : -1;
        }

        /**
          * Determines whether the specified callback function returns true for any element of an array.
          * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array. 
          * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
          */
        public firstItem(callbackfn?: (value: ListItemInfo<T>, index: number, array: ListItemInfo<T>[]) => boolean): ListItemInfo<T> {
            var info: ListItemInfo<T> = null;
            this._list.some((ele, i, arr) => {
                if (!ele || (!!callbackfn && !callbackfn(ele.copy(), i, arr))) return false;
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
            if (!!this.viewModel && !!this.viewModel.renderItem) return this.viewModel.renderItem(this, item);
        }

        /**
          * Renders the group title.
          * @param start  The first entry of the group.
          */
        public renderGroupTitle(info: GroupItemInfoContract<T>): void {
            if (!!this.viewModel && !!this.viewModel.renderGroupTitle) return this.viewModel.renderGroupTitle(this, info);
        }

        /**
          * Occurs during an item has been changed.
          * @param newItem  The item with update.
          * @param oldItem  The original item.
          */
        public onItemChanged(newItem: ListItemInfo<T>, oldItem: ListItemInfo<T>): void {
            if (!!this.viewModel && !!this.viewModel.onItemChanged) return this.viewModel.onItemChanged(this, newItem, oldItem);
        }

        /**
          * Occurs during the index of an item has been changed.
          * @param item  The item of which index has been changed.
          * @param oldIndex  Original index.
          */
        public onItemIndexChanged(item: ListItemInfo<T>, oldIndex: number): void {
            if (!!this.viewModel && !!this.viewModel.onItemIndexChanged) return this.viewModel.onItemIndexChanged(this, item, oldIndex);
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

        private _changeSelection(adding: T[], removing: T[]): number {
            var count = 0;
            if (!!removing) {
                removing.forEach((entry, eI, eArr) => {
                    this.itemIndexOf(entry, null, (info) => {
                        if (!info) return;
                        AliHub.Elements.changeStyleRef(info.element, [], ["ali-state-active-t"]);
                    });
                });

                count += removing.length;
                Collection.remove(this._selected, removing, true);
            }

            if (!!adding) {
                var toAdd = [];
                adding.forEach((entry, eI, eArr) => {
                    this.itemIndexOf(entry, null, (info) => {
                        if (!info) return;
                        AliHub.Elements.changeStyleRef(info.element, ["ali-state-active-t"]);
                        toAdd.push(entry);
                    });
                });

                count += toAdd.length;
                Collection.pushRange(this._selected, toAdd);
            }

            return count;
        }

        private _push(entry: T): boolean {
            if (!entry || !this.valid(entry)) return false;
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

        private _changeElementSelection(info: ListItemInfo<T>): boolean {
            if (!info || !info.element || !info.model) return false;
            switch (this.selectionMode) {
                case SelectionModes.None:
                    this.clearSelection();
                    return false;;
                case SelectionModes.Single:
                    var copied = Collection.copy(this._selected);
                    if (this._changeSelection([info.model], copied) > 0) this.selected.raise({ key: "selected", old: copied, value: this._selected });
                    return true;
                case SelectionModes.Multiple:
                    var isSel = this.isSelected(info.model);
                    if (isSel) {
                        this.changeSelection(null, [info.model]);
                        return false;
                    }

                    this.changeSelection([info.model], null);
                    return false;
            }
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
                        eleEle.className = "ali-container-main";
                        eleEle.id = this._listEle.id + "_" + (new Date()).getMinutes().toString() + "i" + this._eleCount;
                        this._eleCount++;
                        var tile = new ListItemInfo<T>();
                        tile.element = eleEle;
                        tile.model = item;
                        tile.index = i;
                        Elements.listen(eleEle, "click",(ev) => {
                            this._changeElementSelection(tile);
                        });
                        if (!!this.viewModel && !!(<any>this.viewModel).convert) tile.converted = (<any>this.viewModel).convert(this, item);
                        else tile.converted = null;
                        tile.extenders = (name) => {
                            return this.procExtender(name, tile.copy());
                        };
                        if (i >= this._list.length) {
                            this._listEle.appendChild(tile.element);
                        } else {
                            this._listEle.insertBefore(tile.element, this._list[i].element);
                        }

                        hasInserted = true;
                        var bindingControl = this._getItemControl(tile);
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
                eleEle.className = "ali-container-main";
                eleEle.id = this._listEle.id + "_" + (new Date()).getMinutes().toString() + "i" + this._eleCount;
                this._eleCount++;
                var tile = new ListItemInfo<T>();
                tile.element = eleEle;
                tile.model = item;
                tile.index = this._list.length;
                Elements.listen(eleEle, "click",(ev) => {
                    this._changeElementSelection(tile);
                });
                if (!!this.viewModel && !!(<any>this.viewModel).convert) tile.converted = (<any>this.viewModel).convert(this, item);
                else tile.converted = item;
                tile.extenders = (name) => {
                    return this.procExtender(name, tile.copy());
                };
                this._listEle.appendChild(eleEle);
                var bindingControl = this._getItemControl(tile);
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

        private _getItemControl(tile: ListItemInfo<T>): Common.BindingControl<T> {
            if (!this._itemTemplT || !this._itemTemplV) return null;
            var bindingControl = new Common.BindingControl<T>(tile.element);
            bindingControl.templateEngine(this._itemTemplG);
            bindingControl.viewModel(tile.model);
            bindingControl.info(tile);
            bindingControl.convertor((originalValue) => {
                return tile.converted;
            });
            bindingControl.setTemplate(this._itemTemplT, this._itemTemplV);
            tile.notify.add((ev) => {
                bindingControl.viewModel(tile.model);
                bindingControl.info(tile);
                bindingControl.updateConverted();
                tile.converted = bindingControl.converted();
            });
            return bindingControl;
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
                    var positionEle = this._list[newPosition].element;
                    if (tile.element != positionEle && tile.element.id != positionEle.id) this._listEle.insertBefore(tile.element, positionEle);
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
                tile.notify.raise({ key: "update", value: "Entry updated with new position." });
                this.onItemChanged(tile.copy(), oldOne);
                this._list = col;
            } else {
                tile.model = entryMerged;
                tile.notify.raise({ key: "update", value: "Entry updated." });
                this.onItemChanged(tile.copy(), oldOne);
            }

            if (!this.isVisible(tile.model)) {
                tile.element.style.display = "none";
            } else {
                tile.element.style.display = "";
            }
        }

    }

    /**
      * Single flow panel control.
      */
    export class SingleFlowControl<T> extends Common.VisualControl {

        private _content: T;

        private _contentId: string;

        private _sideBarId: string;

        private _sidebar: Common.VisualControl[] = [];

        private _counter = 0;

        /**
          * Initializes a new instance of the SingleFlowControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones. 
          */
        constructor(id: Common.VisualControlElementContract) {
            super(id);
            this.getElement().innerHTML = "";
            this.addStyleRef("ali-controls-flow-single");
            this._renderLayoutTable();
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

        private _renderLayoutTable(): void {
            Diagnostics.info("CoreLibrary", "[0x02210101] Render single flow panel.");
            var row = document.createElement("tr");
            row.id = this.getId() + "_table_b_r0";
            var tBody = document.createElement("tbody");
            tBody.appendChild(row);
            var table = document.createElement("table");
            table.id = this.getId() + "_table";
            table.className = "ali-layout-t-grid ali-layout-s-tile";
            table.cellPadding = "0";
            table.cellSpacing = "0";
            table.appendChild(tBody);
            this.appendElement(table);

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
      * Resource path.
      */
    export class ResourcePath {

        private _arr: StringPropertiesContract = [];

        private _split: string = "/";

        public constructor(path: string, split?: string) {
            if (!!split) this._split = split;
            this.pushString(path);
        }

        public pushString(path: string) {
            if (!path) return;
            var arr = path.split(this._split);
            for (var step = 0; step < arr.length; step += 2) {
                var key = arr[step];
                var iValue = (step + 1 < arr.length) ? arr[step + 1] : null;
                this._arr.push({ key: key, value: iValue });
            }
        }

        public remove() {
            if (this._arr.length > 0) this._arr.pop();
        }

        public item(index: number, value?: KeyValuePairContract<string, string>): KeyValuePairContract<string, string> {
            if (index > this._arr.length || index < 0) return null;
            if (arguments.length > 1) {
                if (!value) return;
                if (index === this._arr.length) this._arr.push(value);
                else this._arr[index] = value;
            } else {
                if (index === this._arr.length) return null;
            }

            return this._arr[index];
        }

        public length(): number {
            return this._arr.length;
        }

        public toParameterString(): string {
            var str = "";
            this._arr.forEach((iV, iI, iA) => {
                str += iV.key + this._split + iV.value + this._split;
            });

            return str;
        }

    }

    /**
      * Ticket list view model.
      */
    export class ConfigurableListViewModel<T> implements AliHub.Collection.ListViewModelContract<T> {

        private _settings: ListOrganizeSettingsContract<T>;

        /**
          * Initializes a new instance of the ConfigurableListViewModel class.
          * @param settings  The settings. 
          */
        public constructor(settings: ListOrganizeSettingsContract<T>) {
            this._settings = settings ? settings : {};
        }

        /**
          * Tests whether one of entry should be displayed.
          * @param list  The list control which requests to process this method.
          * @param item  The item to test.
          */
        public isVisible(list: ListControl<T>, item: T): boolean {
            return !!this._settings.isVisible ? this._settings.isVisible(item) : true;
        }

        /**
          * Tests whether one of entry should be before another.
          * @param list  The list control which requests to process this method.
          * @param entryA  The entry to test.
          * @param entryB  The reference entry for comparing.
          */
        public shouldBeBefore(list: ListControl<T>, entryA: T, entryB: T): boolean {
            if (!this._settings.isBefore) return false;
            if (this._settings.isBefore === true) return true;
            if (this._settings.isBefore === "") {
                return entryA == entryB || (!!entryA && entryA > entryB);
            }

            if (this._settings.isBefore === "!") {
                return entryA == entryB || (!!entryB && entryB > entryA);
            }

            if (typeof this._settings.isBefore === "string") {
                var key = this._settings.isBefore as string;
                if (entryA[key] == null && entryB[key] == null) return false;
                var desc = false;
                if (key.indexOf("!") === 0) {
                    desc = true;
                    key = key.substring(1);
                } else if (key.indexOf(" ") === 0) {
                    key = key.substring(1);
                }

                if (entryA[key] == null) return desc;
                if (entryB[key] == null) return !desc;
                return desc ? (entryA[key] >= entryB[key]) : (entryA[key] <= entryB[key]);
            }

            return (this._settings.isBefore as any)(entryA, entryB);
        }

        /**
          * Tests whether the entries are in same group.
          * @param list  The list control which requests to process this method.
          * @param entryA  The entry to test.
          * @param entryB  The reference entry for comparing.
          */
        public areInSameGroup(list: ListControl<T>, entryA: T, entryB: T): boolean {
            return !!this._settings.areInSameGroup ? this._settings.areInSameGroup(entryA, entryB) : true;
        }

        /**
          * Checks whether contains the given entry by searching key and returns the index.
          * @param list  The list control which requests to process this method.
          * @param entry  The entry to test.
          */
        public containsItem(list: ListControl<T>, entry: T): number {
            if (!this._settings.areSame) return list.itemIndexOf(entry);
            var keyProperty = this._settings.areSame;
            var compare = typeof this._settings.areSame === "string" ?
                (eA, eB) => { return !!eA && eA[this._settings.areSame as string] == eB[this._settings.areSame as string] } :
                (eA, eB) => { return (this._settings.areSame as any)(eA, eB); };
            return list.itemIndexOf(entry, compare);
        }

        /**
          * Merges changing.
          * @param list  The list control which requests to process this method.
          * @param entry  The new entry or the one with changing.
          * @param oldItem  The original item.
          */
        public mergeChanging(list: ListControl<T>, entry: T, oldItem: ListItemInfo<T>): T {
            return !!this._settings.mergeChanging ? this._settings.mergeChanging(entry, oldItem) : entry;
        }

        /**
          * Checks whether the given item means it has been deleted.
          * @param list  The list control which requests to process this method.
          * @param entry  The entry to test.
          */
        public isDeleted(list: ListControl<T>, entry: T): boolean {
            return !!this._settings.isDeleted ? this._settings.isDeleted(entry) : false;
        }

        /**
          * Gets group item info model.
          * @param list  The list control which requests to process this method.
          * @param info  The group item information.
          */
        public getGroupModel(list: ListControl<T>, info: GroupItemInfoContract<T>): any {
            return !!this._settings.getGroupModel ? this._settings.getGroupModel(info) : null;
        }

        /**
          * Tests given entry is valid.
          * @param list  The list control which requests to process this method.
          * @param entry  The entry to test.
          */
        public valid(list: ListControl<T>, entry: T): boolean {
            return !!this._settings.valid ? this._settings.valid(entry) : true;
        }

        /**
          * Converts given entry to the one of target type.
          * @param list  The list control which requests to process this method.
          * @param entry  The entry to convert.
          */
        public convert(list: ListControl<T>, entry: T) {
            return !!this._settings.convert ? this._settings.convert(entry) : null;
        }
    }

    /**
      * Paging control.
      */
    export class PagingControl extends Common.VisualControl {

        private _viewModel: PagingViewModelContract;

        private _bindingControl: Common.BindingControl<any>;

        private _total: number;

        private _index = 0;

        private _around = 3;

        private _selector: HTMLUListElement;

        private _infoEle: HTMLDivElement;

        private _selectorTemplT: string;

        private _selectorTemplV: string;

        private _ellipsisTemplT: string;

        private _ellipsisTemplV: string;

        private _funcTemplT: string;

        private _funcTemplV: string;

        private _infoTemplT: string;

        private _infoTemplV: string;

        public viewModelChanged = new EventHandlers<ValueChangedContract<PagingViewModelContract>>();

        public indexChanged = new EventHandlers<ValueChangedContract<number>>();

        public totalChanged = new EventHandlers<ValueChangedContract<number>>();

        public aroundCountChanged = new EventHandlers<ValueChangedContract<number>>();

        /**
          * Additional binding information. 
          */
        public info = Common.bindingObj();

        /**
          * Initializes a new instance of the PagingControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones. 
          */
        public constructor(id: Common.VisualControlElementContract) {
            super(id);
            this.addStyleRef("ali-controls-paging");

            this._selector = this.appendElement("ul") as HTMLUListElement;
            this._selector.id = this.getId() + "_sel";
            this._selector.className = "ali-container-main";

            this._infoEle = this.appendElement("div") as HTMLDivElement;
            this._infoEle.id = this.getId() + "_info";
            this._infoEle.className = "ali-container-main";
            this._infoEle.style.display = "none";
        }

        public viewModel(value?: PagingViewModelContract) {
            if (arguments.length > 0 && this._viewModel !== value) {
                var old = this._viewModel;
                this._viewModel = value;
                this._refreshSelector();
                this.viewModelChanged.raise({ key: "viewModel", value: this._viewModel, old: old });
            }

            return this._viewModel;
        }

        /**
          * Loads specific options.
          * @param value  The options to load. 
          */
        public loadOptions(value: PagingControlOptionsContract | boolean): any {
            var options: PagingControlOptionsContract = super.loadOptions(value);
            if (!options) return null;
            if (!options.ignoreParts) {
                this.setEllipsisTemplate("initpart", null);
                this.setFunctionTemplate("initpart", null);
                this.setInfoTemplate("initpart", null);
                this.setSelectorTemplate("initpart", null);
            }

            this.setEllipsisTemplate(options.ellipsisTemplateType, options.ellipsisTemplate);
            this.setFunctionTemplate(options.functionTemplateType, options.functionTemplate);
            this.setInfoTemplate(options.infoTemplateType, options.infoTemplate);
            this.setSelectorTemplate(options.selectorTemplateType, options.selectorTemplate);
            return options;
        }

        /**
          * Gets or sets pages count.
          * @param value  Page count. 
          */
        public total(value?: number) {
            if (arguments.length > 0 && this._total !== value) {
                var old = this._total;
                this._total = value;
                this._refreshSelector();
                this.totalChanged.raise({ key: "total", value: this._total, old: old });
            }

            return this._total;
        }

        /**
          * Gets or sets page index.
          * @param value  Page index. 
          */
        public index(value?: number, raise?: boolean) {
            if (arguments.length > 0 && this._index !== value) {
                var old = this._index;
                this._index = value;
                this._refreshSelector();
                if (raise == null) raise = true;
                if (raise && !!this._viewModel && !!this._viewModel.turnTo) this._viewModel.turnTo(this, this._index);
                this.indexChanged.raise({ key: "index", value: this._index, old: old, raise: raise } as any);
            }

            return this._index;
        }

        public aroundCount(value?: number) {
            if (arguments.length > 0 && this._around !== value) {
                var old = this._around;
                if (value == null || value < 0) value = 0;
                this._around = value;
                this._refreshSelector();
                this.aroundCountChanged.raise({ key: "aroundCount", value: this._around, old: old });
            }

            return this._index;
        }

        /**
          * Gets page data model.
          * @param index  Page index. 
          */
        public getPageModel(index: number): any {
            if (!this._viewModel || !this._viewModel.getModel) return null;
            return this._viewModel.getModel(this, index);
        }

        /**
          * Gets page informatino.
          * @param index  Page index. 
          */
        public getPageInfo(index: number): PagingInfoContract {
            var model = this._getPageInfo(index) as any;
            model.turnTo = () => {
                this.index(index);
            };
            model.getModel = () => {
                if (!this._viewModel || !this._viewModel.getModel) return null;
                return this._viewModel.getModel(this, index);
            };
            model.isCurrent = () => {
                return this._index === index;
            };
            return model;
        }

        /**
          * Refreshes. 
          */
        public refresh() {
            this._refreshSelector();
        }

        public setSelectorTemplate(valueType: string, value: string) {
            if (valueType == null && value == null) return;
            if (valueType === "part" || valueType === "initpart") {
                value = this.templatePart(!!value ? value : "selector");
                if (valueType === "initpart" && !value) return;
                valueType = "";
            }

            this._selectorTemplT = valueType;
            this._selectorTemplV = value;
            this._refreshSelector();
        }

        public setEllipsisTemplate(valueType: string, value: string) {
            if (valueType == null && value == null) return;
            if (valueType === "part" || valueType === "initpart") {
                value = this.templatePart(!!value ? value : "ellipsis");
                if (valueType === "initpart" && !value) return;
                valueType = "";
            }

            this._ellipsisTemplT = valueType;
            this._ellipsisTemplV = value;
            this._refreshSelector();
        }

        public setFunctionTemplate(valueType: string, value: string) {
            if (valueType == null && value == null) return;
            if (valueType === "part" || valueType === "initpart") {
                value = this.templatePart(!!value ? value : "function");
                if (valueType === "initpart" && !value) return;
                valueType = "";
            }

            this._funcTemplT = valueType;
            this._funcTemplV = value;
            this._refreshSelector();
        }

        public setInfoTemplate(valueType: string, value: string) {
            if (valueType == null && value == null) return;
            if (valueType === "part" || valueType === "initpart") {
                value = this.templatePart(!!value ? value : "info");
                if (valueType === "initpart" && !value) return;
                valueType = "";
            }

            this._infoTemplT = valueType;
            this._infoTemplV = value;
            if (!this._bindingControl) {
                var infoEle = this.getChildElement(true, "_info");
                infoEle.style.display = "";
                this._bindingControl = new Common.BindingControl(infoEle.id);
                this._bindingControl.viewModel(this.info);
            }

            this._bindingControl.setTemplate(valueType, value);
        }

        public isValidIndex(index: number): boolean {
            return index != null && typeof index === "number" && index >= 0 && (this._total == null || index < this._total);
        }

        /**
          * Turns to the specific page.
          * @param key  Page index or keyword of page, e.g. first, previous, next, last, refresh. 
          */
        public turnTo(key: string | number): number {
            if (key == null) return this._index;
            if (typeof key === "number") return this.index(key);
            key = this._formatKey(key.toString());
            var cur = this.index();
            switch (key) {
                case "first":
                    if (cur > 0) this.index(0);
                    break;
                case "previous":
                    if (cur > 0) this.index(cur - 1);
                    break;
                case "next":
                    if (this._total == null || cur < this._total) this.index(cur + 1);
                    break;
                case "last":
                    if (this._total != null && cur < this._total) this.index(this._total);
                    break;
                case "refresh":
                    this.refresh();
                    break;
                default:
                    break;
            }

            return this._index;
        }

        private _formatKey(key: string): string {
            if (key == null) return null;
            switch (key.toString().toLowerCase()) {
                case "fir":
                case "first":
                case "1st":
                case "1":
                    return "first";
                case "pre":
                case "prev":
                case "previous":
                    return "previous";
                case "nex":
                case "nxt":
                case "next":
                    return "next";
                case "las":
                case "lst":
                case "last":
                    return "last";
                case "rfr":
                case "refresh":
                case "reload":
                    return "refresh";
                default:
                    return null;
            }
        }

        private _getPageInfo(index: number): PagingInfoContract {
            var model = {
                index: index,
                total: this._total,
                current: () => {
                    return this._index;
                },
                turnTo: () => {
                    this.index(index);
                }
            };
            return model;
        }

        private _refreshSelector() {
            this._selector.innerHTML = "";
            this._selector.style.display = (this._total === 1) ? "none" : "";
            var partA = 0;
            if (this._index > 0) this._generateFuncPart("previous", this._selector);
            if (partA >= this._index) partA = this._index - 1;
            var partD = (this._total != null ? this._total : 0) - 1;
            for (var step = 0; step <= partA; step++) {
                this._generatePageSelector(step, this._selector);
            }

            var partB = this._index - this._around;
            if (partA >= partB) partB = partA + 1;
            if (partA < partB - 1) this._generateEllipsis(this._selector, "left");
            for (var step = partB; step < this._index; step++) {
                this._generatePageSelector(step, this._selector);
            }
            
            this._generatePageSelector(this._index, this._selector, true);
            var partC = this._index + this._around;
            if (partD >= 0) {
                if (partD <= partC) partC = partD - 1;
                for (var step = this._index + 1; step <= partC; step++) {
                    this._generatePageSelector(step, this._selector);
                }
            }

            if (partD < 0 || partD > partC + 1) this._generateEllipsis(this._selector, "right");
            if (partD > 0 && partD !== this._index) this._generatePageSelector(partD, this._selector);
            if (partD < 0 || partD > this._index) this._generateFuncPart("next", this._selector);
        }

        private _generateEllipsis(parent: HTMLUListElement, partName: string): HTMLLIElement {
            var ele = document.createElement("li");
            ele.id = parent.id + "_" + partName;
            ele.innerHTML = "<span id=\"" + ele.id + "_link\" class=\"ali-container-main\">...</span>";
            parent.appendChild(ele);
            if (this._ellipsisTemplV && this._ellipsisTemplV != "") {
                Elements.getById(ele.id, "_link").style.display = "none";
                var container = document.createElement("div");
                container.id = ele.id + "_container";
                container.className = "ali-container-main";
                parent.appendChild(container);
                var control = new Common.BindingControl(container.id);
                control.viewModel({ part: partName });
                control.info({ part: partName, current: () => { return this._index; }, total: () => { return this._total; } });
                control.setTemplate(this._ellipsisTemplT, this._ellipsisTemplV);
            }

            return ele;
        }

        private _generateFuncPart(key: string, parent: HTMLUListElement): HTMLLIElement {
            key = this._formatKey(key);
            if (!key) return null;
            var ele = document.createElement("li");
            ele.id = parent.id + "_f_" + key;
            parent.appendChild(ele);
            var link = document.createElement("a");
            link.id = ele.id + "_link";
            link.className = "ali-container-main";
            switch (key) {
                case "first":
                    link.innerHTML = "1";
                    break;
                case "previous":
                    link.innerHTML = "&lt;";
                    break;
                case "next":
                    link.innerHTML = "&gt;";
                    break;
                case "last":
                    link.innerHTML = Res.builtIn().localString("last");
                    break;
                case "refresh":
                    link.innerHTML = Res.builtIn().localString("refresh");
                    break;
                default:
                    break;
            }

            link.href = "#";
            link.onclick = (ev: MouseEvent) => {
                this.turnTo(key);
                return false;
            };
            ele.appendChild(link);
            if (!!this._funcTemplV && this._funcTemplV != "") {
                link.style.display = "none";
                var container = document.createElement("div");
                container.id = ele.id + "_container";
                container.className = "ali-container-main";
                parent.appendChild(container);
                var control = new Common.BindingControl(container.id);
                control.viewModel({ key: key });
                control.info({ key: key, turnTo: () => { this.turnTo(key); }, current: () => { return this._index; }, total: () => { return this._total; } });
                control.setTemplate(this._funcTemplT, this._funcTemplV);
            }

            return ele;
        }

        private _generatePageSelector(index: number, parent: HTMLUListElement, selected = false): HTMLLIElement {
            if (!this.isValidIndex(index)) return null;
            var info = this.getPageInfo(index);
            var ele = document.createElement("li");
            ele.id = parent.id + "_i" + index.toString();
            if (selected) ele.className = "ali-state-active-t"; 
            parent.appendChild(ele);
            var link = document.createElement("a");
            link.id = ele.id + "_link";
            link.className = "ali-container-main";
            link.innerHTML = (index + 1).toString();
            link.href = "#";
            link.onclick = (ev: MouseEvent) => {
                this.index(index);
                return false;
            };
            ele.appendChild(link);
            if (!!this._selectorTemplV && this._selectorTemplV != "") {
                link.style.display = "none";
                var container = document.createElement("div");
                container.id = ele.id + "_container";
                container.className = "ali-container-main";
                parent.appendChild(container);
                var control = new Common.BindingControl(container.id);
                var model = null;
                if (!!this._viewModel && !!this._viewModel.getModel) model = this._viewModel.getModel(this, index);
                control.viewModel(model);
                control.info(info);
                control.setTemplate(this._selectorTemplT, this._selectorTemplV);
            }

            return ele;
        }

    }

    /**
      * Active item monitor.
      */
    export class ActiveItemMonitor {

        private _col: Common.ActiveItemContract[] = [];

        private _index = -1;

        /**
          * Raised on switched. 
          */
        public switched = new Collection.EventHandlers<Common.ActiveItemContract>();

        public add(value: Common.ActiveItemContract, isBg = false): Common.ActiveItemContract {
            if (!value) return null;
            this._col.push(value);
            if (!!value.onload) value.onload();
            if (isBg !== true) this.turnTo(this._col.length - 1);
            return value;
        }

        public getIndex(item?: Common.ActiveItemContract | number): number {
            if (item == null) item = this._index;
            if (typeof item === "number") return item >= 0 && item < this._col.length ? item : -1;
            return Collection.indexOf(this._col, item);
        }

        public getItem(item: Common.ActiveItemContract | number): Common.ActiveItemContract {
            var index = this.getIndex(item);
            if (index < 0 || index >= this._col.length) return null;
            return this._col[index];
        }

        public remove(item?: Common.ActiveItemContract | number, turnNext?: boolean): void {
            var index = this.getIndex(item);
            if (index < 0) return;
            var info = this.getItem(index);
            if (!info) return;
            if (info.oninactive) info.oninactive();
            Collection.remove(this._col, [info], true);
            this._index = index >= this._col.length ? this._col.length - 1 : index;
            if (this._col.length === 0) {
                this.switched.raise(null);
                return;
            }

            if (turnNext === true) {
                this.turnTo(index >= this._col.length ? this._col.length - 1 : index);
            } else {
                this._index = 0;
                this.switched.raise(null);
            }
        }

        public clear() {
            this._col.forEach((iV, iI, IArguments) => {
                if (!iV) return;
                if (iI === this._index && !!iV.oninactive) iV.oninactive();
                if (!!iV.onclose) iV.onclose();
            });
            this._col = [];
            this._index = -1;
            this.switched.raise(null);
        }

        public turnTo(item: Common.ActiveItemContract | number): Common.ActiveItemContract {
            var index = this.getIndex(item);
            if (index < 0) return null;
            var info = this._turnTo(index);
            if (!!info) this.switched.raise(info);
            return info;
        }

        private _turnTo(index: number): Common.ActiveItemContract {
            var item = this.getItem(index);
            if (!item) return null;
            var old = this.getItem(this._index);
            if (!!old && old.oninactive) old.oninactive();
            this._index = index;
            if (!!item.onactive) item.onactive();
            return item;
        }

    }

    /**
      * Switch control.
      */
    export class SwitchControl extends Common.VisualControl {

        private _count = 0;
        private _col: SwitchItemInfoContract[] = [];
        private _index = Common.bindingObj(0);
        private _tabs: HTMLUListElement;
        private _tabTempT: string;
        private _tabTempV: string;
        private _tabTempG: string;

        /**
          * Raised on switched. 
          */
        public switched = new Collection.EventHandlers<SwitchItemInfoContract>();

        /**
          * A value indicating whether enable tab button for switching. 
          */
        public tabButton = true;

        /**
          * A value indicating whether turn back to first tab. 
          */
        public backToFirst = false;

        /**
          * Initializes a new instance of the SwitchControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones. 
          */
        public constructor(id: Common.VisualControlElementContract) {
            super(id);
            this.addStyleRef("ali-controls-switch");
            this._tabs = this.appendElement("ul") as any;
            this._tabs.id = this.getId() + "_tabs";
            this._tabs.className = "ali-container-collection-tabs";
        }

        public setTabTemplate(valueType: string, value: string) {
            if (valueType == null && value == null) return;
            if (valueType === "part" || valueType === "initpart") {
                value = this.templatePart(!!value ? value : "tab");
                if (valueType === "initpart" && !value) return;
                valueType = "";
            }

            this._tabTempT = !!valueType ? valueType : "static";
            this._tabTempV = value;
        }

        public clearTabTemplate() {
            this._tabTempT = null;
            this._tabTempV = null;
        }

        /**
          * Adds a control by a factory.
          * @param control  The optional control factory. 
          * @param model  The optional model. 
          * @param h  The handler to fill additional information to the control. 
          * @param isBg  A value indicating whether this is a background action. 
          */
        public add(control?: Common.Action1<HTMLElement>, model?: any, options?: SwitchItemOptionsContract): Common.VisualControl {
            if (this._count >= Number.MAX_VALUE) this._count = 0;
            if (!options) options = {};
            this._count++;
            var now = new Date();
            var key = this._count.toString() + "t" + now.getSeconds().toString() + now.getMilliseconds().toString();
            var element = this.appendElement<HTMLDivElement>("div", "c" + key);
            if (control) control(element);
            var c = Common.getControl(element);
            if (!c) c = new Common.VisualControl(element);
            AliHub.Elements.changeStyleRef(element, "ali-state-active-f", "ali-state-active-t");
            element.style.display = "none";
            var tab = document.createElement("li");
            tab.id = this.getId() + "_t" + key;
            tab.className = "ali-container-main";
            AliHub.Elements.listen(tab, "click", (ev) => {
                if (this.tabButton) this.turnTo(c);
            });
            this._tabs.appendChild(tab);
            var tabControl = Common.bindingControl(tab, {
                templateEngine: this._tabTempG,
                template: this._tabTempV,
                templateType: this._tabTempT,
                viewModel: model,
                styleRef: "ali-controls-switch-tabs-item"
            });
            tabControl.info({ control: c, model: model, key: key, index: this._col.length, options: options });
            this._col.push({ control: c, model: model, key: key, index: this._col.length, options: options, tab: tabControl });
            if (!!options.loaded) options.loaded({ control: c, model: model, key: key, index: this._col.length, options: options, tab: tabControl });
            if (options.background !== true) this.turnTo(this._col.length - 1);
            return c;
        }

        public getIndex(control?: Common.VisualControl | string | number): number {
            if (control == null) control = this._index();
            if (typeof control === "number") {
                if (control < 0 || control >= this._col.length) return -1;
                return control;
            }

            var cid = typeof control === "string" ? control : (<Common.VisualControl>control).getId();
            var cR = -1;
            this._col.some((cV, cI, cA) => {
                if (!cV || !cV.control || (cV.control.getId() !== cid && cV.key !== cid)) return false;
                cR = cI;
                return true;
            });
            return cR;
        }

        public getControl(control?: Common.VisualControl | string | number): Common.VisualControl {
            var item = this.getItem(control);
            return !!item ? item.control : null;
        }

        public getItemModel(control?: Common.VisualControl | string | number): any {
            var item = this.getItem(control);
            return !!item ? item.model : null;
        }

        public getItem(control?: Common.VisualControl | string | number): SwitchItemInfoContract {
            var index = this.getIndex(control);
            if (index < 0 || index >= this._col.length) return null;
            var item = this._col[index];
            return !!item ? { key: item.key, control: item.control, model: item.model, index: index, options: item.options, tab: item.tab } : null;
        }

        /**
          * Gets the size of tabs bar. 
          */
        public getTabsSize() {
            return Elements.getSize(this._tabs);
        }

        /**
          * Turns to a specific control.
          * @param control  The control or key. 
          */
        public turnTo(control: Common.VisualControl | string | number): Common.VisualControl {
            var oldInfo = this.getItem();
            if (control == null) return null;
            if (typeof control === "number") {
                var info = this._turnTo(control);
                return !!info ? info.control : null;
            }

            var cid = typeof control === "string" ? control : (<Common.VisualControl>control).getId();
            var cR: Common.VisualControl;
            var count = -1;
            this._col.some((cV, cI, cA) => {
                count++;
                if (!cV || !cV.control || (cV.control.getId() !== cid && cV.key !== cid)) return false;
                this._turnTo(cI);
                return true;
            });
            return cR;
        }

        /**
          * Gets item info.
          * @param control  The item to get. 
          */
        public items() {
            var col: SwitchItemInfoContract[] = [];
            this._col.forEach((item, i, arr) => {
                if (!item) return;
                col.push({ key: item.key, control: item.control, model: item.model, index: i, options: item.options, tab: item.tab } );
            });

            return col;
        }

        public remove(control: Common.VisualControl | string | number): void {
            var cI = this.getIndex(control);
            var cV = this._col[cI];
            if (!cV || !cV.control) return;
            var cId = cV.control.getId();
            var cE = cV.control.getElement();
            if (!cE || !cId) return;
            var list: SwitchItemInfoContract[] = [];
            this._col.forEach((iV, iI, iA) => {
                if (!iV || !iV.control || iV.control.getId() === cId) return;
                list.push(iV);
            });
            this._col = list;
            cE.outerHTML = "";
            var tab = !!cV.tab ? cV.tab.getElement() : null;
            if (!!tab && !!tab.outerHTML) tab.outerHTML = "";
            if (this._col.length === 0) {
                this.switched.raise(null);
                return;
            }

            var nextI = this.backToFirst ? 0 : (cI >= this._col.length ? this._col.length - 1 : cI);
            this.turnTo(nextI);
        }

        public clear(): void {
            this._col.forEach((iV, iI, iA) => {
                if (!iV || iV.control) return;
                var iE = iV.control.getElement();
                if (!iE) return;
                iE.outerHTML = "";
            });
            this._index(-1);
            this._col = [];
            this.switched.raise(null);
        }

        public hideAll() {
            this._index(-1);
            this._col.forEach((cV, cI, cA) => {
                if (!cV || !cV.control) return;
                var cE = cV.control.getElement();
                if (!cE) return;
                AliHub.Elements.changeStyleRef(cE, "ali-state-active-f", "ali-state-active-t");
                cE.style.display = "none";
                var tabId = this.getId() + "_t" + cV.key;
                var tabControl = AliHub.Elements.getById(tabId);
                if (!tabControl) return;
                var wasActived = (" " + tabControl.className + " ").indexOf("ali-state-active-t") > 0;
                AliHub.Elements.changeStyleRef(tabControl, "ali-state-active-f", "ali-state-active-t");
                if (wasActived && !!cV.options.hidden) cV.options.hidden({ control: cV.control, model: cV.model, key: cV.key, index: cI, options: cV.options, tab: cV.tab });
            });
        }

        /**
          * Loads specific options.
          * @param value  The options to load. 
          */
        public loadOptions(value: SwitchControlOptionsContract | boolean): any {
            var options: SwitchControlOptionsContract = super.loadOptions(value);
            if (!options) return null;
            if (!!options.tabTemplateEngine) this._tabTempG = options.tabTemplateEngine;
            if (options.tabButton != null) this.tabButton = options.tabButton;
            if (!options.ignoreParts) this.setTabTemplate("initpart", null);
            this.setTabTemplate(options.tabTemplateType, options.tabTemplate);
            return options;
        }

        private _turnTo(index: number): SwitchItemInfoContract {
            if (index >= this._col.length) return null;
            this.hideAll();
            if (index < 0 || index >= this._col.length) return null;
            var info = this._col[index];
            if (!info || !info.control) return null;
            var cE = info.control.getElement();
            if (!cE) return null;
            this._index(index);
            AliHub.Elements.changeStyleRef(cE, "ali-state-active-t", "ali-state-active-f");
            cE.style.display = "";
            var tabId = this.getId() + "_t" + info.key;
            var tabControl = AliHub.Elements.getById(tabId);
            AliHub.Elements.changeStyleRef(tabControl, "ali-state-active-t", "ali-state-active-f");
            if (!!info.options.shown) info.options.shown({ control: info.control, model: info.model, key: info.key, index: index, options: info.options, tab: info.tab });
            this.switched.raise({ key: info.key, control: info.control, model: info.model, index: index, options: info.options, tab: info.tab });
            return info;
        }

    }

    /**
      * Table control.
      */
    export class TableControl<T> extends Common.VisualControl {

        private _options: TableContract<T> = { schema: null, values: null };
        private _cellTemplate: string;
        private _cellTemplateType: string;
        private _headCellTemplate: string;
        private _headCellTemplateType: string;
        private _references: MappedContract[] = [];
        private _empty: Common.BindingControl<any>;

        public cellConvertor: (model: any) => any;

        public headCellConvertor: (model: any) => any;

        public renderingHeadCell = new EventHandlers<TableColumnArgContract>();

        public renderingCell = new EventHandlers<TableCellArgContract>();

        /**
          * Initializes a new instance of the SwitchControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones. 
          */
        public constructor(id: Common.VisualControlElementContract) {
            super(id);
            this.addStyleRef("ali-controls-table");
            this.innerHTML(`<table id="{{id()}}_table"><thead id="{{id()}}_table_head"></thead><tbody id="{{id()}}_table_body"></tbody><tfoot id="{{id()}}_table_foot"></tfoot></table><div id=\"" + eleId + "_empty\" class=\"ali-container-empty\" style=\"display: none; \" ></div>`);
        }

        /**
          * Sets schema information.
          * @param value  The schema. 
          * @param reload  A value indicating whether need reload the table. 
          */
        public schema(value: TableColumnContract[], reload = true) {
            this._options.schema = value;
            if (reload) this._refresh();
        }

        public headCell(id: string | number | Common.Func<string> | Common.Func<number>): TableColumnContract {
            if (id == null) return null;
            if (typeof id === "function") id = (id as any)();
            if (typeof id === "string") return getItem(this._options.schema, id, "id");
            if (typeof id === "number") {
                if (id < 0) return null;
                if (!this._options.schema || this._options.schema.length <= id) return null;
                return this._options.schema[id];
            }

            return null;
        }

        /**
          * Pushes a set of entries.
          * @param col  The collection to insert. 
          */
        public pushRange(col: T[]): T[] {
            if (!col) {
                this.isEmpty();
                return [];
            }

            if (!this._options.values) this._options.values = [];
            if (!Collection.isArray(col)) col = (col as any).list || (col as any).arr;
            if (!col) {
                this.isEmpty();
                return [];
            }

            var deltaCol: T[] = [];
            col.forEach((ele, i, arr) => {
                if (!ele) return;
                this._options.values.push(ele);
                deltaCol.push(ele);
            });
            this._refresh();
            if (deltaCol.length == 0) return [];
            return deltaCol;
        }

        /**
          * Pushes a resource.
          * @param propertyKey  The property key to get collection in the resource object. 
          * @param resource  A resource to push. Collection supported.
          */
        public pushResource(propertyKey: string, ...resource: MappedContract[]): T[] {
            if (!resource) {
                this.isEmpty();
                return [];
            }

            var col: T[] = [];
            var result: T[] = [];
            resource.forEach((res, resI, resA) => {
                if (!res) return;
                if (res instanceof Array) {
                    var pushedX = this.pushRange(res as any);
                    if (!!pushedX) pushedX.forEach((pushedItem, pushedI, pushedA) => {
                        result.push(pushedItem);
                    });

                    return;
                }

                this.addReference(res);
                var entries: T[] = !!propertyKey ? res[propertyKey] : ((res as any).list || (res as any).arr);
                if (!Collection.isArray(entries)) return;
                var pushed = this.pushRange(entries);
                if (!!pushed) pushed.forEach((pushedItem, pushedI, pushedA) => {
                    result.push(pushedItem);
                });
            });
            return result;
        }

        /**
          * Batch pushes a colletion from web.
          * @param subject  The subject of data resolver registered. 
          * @param key  The key of data resolver. 
          */
        public pushRangeFromWeb(subject: string, key: string | Web.BaseDataPackageResolver<T[]>, parameters?: any, clearBefore = false): Web.ResponseTask<T[]> {
            var promise = Web.resolve<T[]>(subject, key, parameters);
            promise.then((r) => {
                if (clearBefore) this.clear();
                this.pushRange(r.result);
            });
            return promise;
        }

        /**
          * Batch pushes a colletion from web.
          * @param subject  The subject of data resolver registered. 
          * @param key  The key of data resolver. 
          * @param propertyKey  The property key to get collection in the resource object. 
          */
        public pushResourceFromWeb(subject: string, key: string | Web.BaseDataPackageResolver<MappedContract>, propertyKey: string, parameters?: any, clearBefore = false, schemaKey?: string): Web.ResponseTask<MappedContract> {
            var promise = Web.resolve<MappedContract>(subject, key, parameters);
            promise.then((r) => {
                if (clearBefore) this.clear();
                if (!!schemaKey) this.schema(r.result[schemaKey]);
                this.pushResource(propertyKey, r.result);
            });
            return promise;
        }

        /**
          * Gets whether the list is empty to show. 
          */
        public isEmpty(): boolean {
            var emptyContainer = this.getChildElement(true, "empty");
            if (!this._options.values) this._options.values = [];
            if (this._options.values.length === 0) {
                if (!!emptyContainer) emptyContainer.style.display = "";
                return true;
            }

            if (!!emptyContainer) emptyContainer.style.display = "none";
            return false;
        }

        /**
          * Loads specific options.
          * @param value  The options to load. 
          */
        public loadOptions(value: TableControlOptionsContract<T> | boolean): any {
            var options: TableControlOptionsContract<T> = super.loadOptions(value);
            if (!options) return null;
            if (!!options.renderCell) this.renderingCell.add(options.renderCell);
            if (!!options.renderHeadCell) this.renderingCell.add(options.renderHeadCell);
            if (!options.ignoreParts) this.setCellTemplate("initpart", null);
            this.setCellTemplate(options.cellTemplateType, options.cellTemplate);
            this.cellConvertor = options.cellConvertor;
            if (!options.ignoreParts) this.setHeadCellTemplate("initpart", null);
            this.setHeadCellTemplate(options.headCellTemplateType, options.headCellTemplate);
            this.headCellConvertor = options.headCellConvertor;
            if (!!options.schema) this.schema(options.schema);
            if (options.emptyMessageViewModel != null) this.emptyMessageViewModel(options.emptyMessageViewModel);
            this.setEmptyMessageTemplate(options.emptyMessageTemplateType, options.emptyMessageTemplate);
            if (!!options.emptyMessageTemplate) this.setEmptyMessageTemplate(options.emptyMessageTemplateType, options.emptyMessageTemplate);
            if (!!options.webData) {
                var webData = typeof options.webData === "function" ? (options.webData as any as Function).call(options) : options.webData;
                this.pushResourceFromWeb(webData.subject, webData.key, webData.propertyKey, webData.parameters, webData.clearBefore, webData.schemaKey);
            }

            return options;
        }

        public setCellTemplate(valueType: string, value: string) {
            if (valueType == null && value == null) return;
            if (valueType === "part" || valueType === "initpart") {
                value = this.templatePart(!!value ? value : "cell");
                if (valueType === "initpart" && !value) return;
                valueType = "";
            }

            this._cellTemplate = value;
            this._cellTemplateType = valueType;
        }

        public setHeadCellTemplate(valueType: string, value: string) {
            if (valueType == null && value == null) return;
            if (valueType === "part" || valueType === "initpart") {
                value = this.templatePart(!!value ? value : "head");
                if (valueType === "initpart" && !value) return;
                valueType = "";
            }

            this._headCellTemplate = value;
            this._headCellTemplateType = valueType;
        }

        /**
          * Sets the view template of the empty message.
          * @param sourceType  The type of view template source.
          * @param sourceValue  The value of view template source.
          */
        public setEmptyMessageTemplate(sourceType: string, sourceValue: string, viewModel = null) {
            if (sourceType == null && sourceValue == null) return;
            if (!this._empty) {
                this._empty = new Common.BindingControl(this.getId() + "_empty");
                this._empty.addStyleRef("ali-container-empty");
            }

            if (sourceType === "part" || sourceType === "initpart") {
                sourceValue = this.templatePart(!!sourceValue ? sourceValue : "empty");
                if (sourceType === "initpart" && !sourceValue) return;
                sourceType = "";
            }

            this._empty.setTemplate(sourceType, sourceValue);
            if (arguments.length > 2) this._empty.viewModel(viewModel);
        }

        /**
          * Gets or sets empty mesaage view model.
          */
        public emptyMessageViewModel<T>(viewModel?: T): T {
            if (!this._empty) return null;
            if (arguments.length > 0) this._empty.viewModel(viewModel);
            return this._empty.viewModel();
        }

        /**
          * Refreshes. 
          */
        public refresh() {
            this._refresh();
        }

        /**
          * Adds a reference. 
          */
        public addReference(...values: MappedContract[]) {
            if (!values) return;
            values.forEach((value, vI, vA) => {
                if (Collection.contains(this._references, value)) return;
                this._references.push(value);
            });
        }

        /**
          * Checks whehter there is a specific reference. 
          */
        public containReference(...value: MappedContract[]): boolean {
            return Collection.contains(this._references, value);
        }

        /**
          * Removes a specific reference. 
          */
        public removeReference(...value: MappedContract[]) {
            Collection.remove(this._references, value, true);
        }

        /**
          * Clears all references. 
          */
        public clearReference() {
            this._references = [];
        }

        /**
          * Gets an entry by a specific reference item. 
          */
        public getEntry<TRes>(reference: Common.ReferenceItemContract): TRes {
            return Collection.getEntry<TRes>(this._references, reference);
        }

        /**
          * Gets entries by a specific reference item. 
          */
        public getEntries<TRes>(reference: Common.ReferenceItemContract): TRes[] {
            return Collection.getEntries<TRes>(this._references, reference);
        }

        private _refresh() {
            if (!this._options || !this._options.schema || !this.parentElement()) return;

            // Render head.
            var thead = this.getChildElement("table", "head");
            var theadRow = document.createElement("tr");
            theadRow.id = thead.id + "_main";
            thead.innerHTML = "";
            thead.appendChild(theadRow);
            var cols: TableColumnContract[] = [];
            this._options.schema.forEach((ele, i, arr) => {
                if (!ele || (!ele.model && !ele.render)) return;
                cols.push(ele);
                var theadCell = document.createElement("th");
                theadCell.id = theadRow.id + "_c" + i.toString();
                theadRow.appendChild(theadCell);
                if (ele.width) theadCell.style.width = ele.width.toString() + (typeof ele.width === "string" ? "" : "px");
                if (ele.styleRef) Elements.changeStyleRef(theadCell, ele.styleRef);
                var cellText: string = null;
                if (typeof ele.model === "string") {
                    cellText = ele.model.toString();
                } else if (ele.model.name && (typeof ele.model.name === "string" || typeof ele.model.name === "number")) {
                    cellText = ele.model.name.toString();
                } else if (ele.model.nickname && (typeof ele.model.nickname === "string" || typeof ele.model.nickname === "number")) {
                    cellText = ele.model.nickname.toString();
                } else if (ele.model.title && (typeof ele.model.title === "string" || typeof ele.model.title === "number")) {
                    cellText = ele.model.title.toString();
                }

                if (this._headCellTemplate) {
                    theadCell.innerHTML = "<div id=\"" + theadCell.id + "_container\"></div>";
                    var cellControl = new Common.BindingControl<TableColumnContract>(theadCell.id + "_container");
                    cellControl.info({ column: ele, container: theadCell });
                    cellControl.viewModel(ele.model);
                    if (!!this.headCellConvertor) cellControl.setConvertor(this.headCellConvertor);
                    cellControl.setTemplate(this._headCellTemplateType, this._headCellTemplate);
                } else {
                    theadCell.innerHTML = cellText;
                }

                if (this.renderingHeadCell) this.renderingHeadCell.raise({ column: ele, container: theadCell, text: cellText });
                if (ele.render) ele.render({ column: ele, container: theadCell });
                try {
                    (theadCell as any)._bindInfo = ele;
                } catch (ex) { }
            });

            // Render body.
            var tbody = this.getChildElement("table", "body");
            var rows = this._options.values;
            if (rows) rows.forEach((row, rI, rArr) => {
                var recRow = document.createElement("tr");
                recRow.id = tbody.id + "_r" + rI.toString();
                tbody.appendChild(recRow);
                cols.forEach((ele, i, arr) => {
                    var propCell = document.createElement("td");
                    propCell.id = recRow.id + "_c" + i.toString();
                    recRow.appendChild(propCell);
                    var cellInfo = Collection.cellInfo(row, ele, propCell);
                    var cellText: string = null;
                    if (!cellInfo) return;
                    if (!!this._cellTemplate) {
                        propCell.innerHTML = "<div id=\"" + propCell.id + "_container\"></div>";
                        var cellControl = new Common.BindingControl(propCell.id + "_container");
                        cellControl.info(cellInfo);
                        cellControl.viewModel(cellInfo.value);
                        if (!!this.cellConvertor) cellControl.setConvertor(this.cellConvertor);
                        cellControl.setTemplate(this._cellTemplateType, this._cellTemplate);
                    } else if (cellInfo.value != null) {
                        propCell.innerHTML = cellInfo.value.toString();
                    }

                    if (!!this.renderingCell) this.renderingCell.raise(cellInfo);
                    if (!!ele.valueRender) ele.valueRender(cellInfo);
                });
            });

            // Render foot.
            var tfoot = this.getChildElement("table", "foot");

            // Check if it is empty.
            this.isEmpty();
        }

    }

    export interface EventInfoContract<T> {
        handler: (ev: T) => void;
        target?: any;
        args?: any;
        remove?: (ev: T, args: any, count: number) => boolean;
        start: number;
    }

    export class DisposableArray implements Common.DisposableContract {

        private _list: Common.DisposableContract[] = [];

        public push(...value: Common.DisposableContract[]): Common.DisposableContract[] {
            return this.pushRange(value);
        }

        public pushRange(col: Common.DisposableContract[]): Common.DisposableContract[] {
            if (!col) return [];
            var list = [];
            col.forEach((ele, i, arr) => {
                if (!ele || !ele.dispose) return;
                this._list.push(ele);
                list.push(ele);
            });

            return list;
        }

        public dispose() {
            this._list.forEach((ele, i, arr) => {
                if (!ele || !ele.dispose) return;
                try {
                    ele.dispose();
                } catch (ex) { }
            });
            this._list = [];
        }

    }

    /**
      * Event handlers.
      */
    export class EventHandlers<T> {
        private _count = 0;
        private _list: EventInfoContract<T>[] = [];

        /**
          * Registers an event handler.
          * @param h  The event handler to register. 
          */
        public add(h: Common.EventHandler<T>, target?: any, disposableList?: DisposableArray, args?: any, remove?: Common.Func3<T, any, number, boolean>, delay?: boolean | number) {
            if (!h) return;
            var info = { handler: h, target: target, args: args, remove: remove, start: this._count };
            var disp = {
                added: new Date(),
                hasAdded: false,
                dispose: () => {
                    this.remove(h);
                },
                raise: (ev: T) => {
                    args ? h.call(target, ev, args) : h.call(target, ev);
                },
                count: () => {
                    return this._count - info.start;
                }
            };
            if (disposableList) disposableList.push(disp);
            var proc = () => {
                disp.added = new Date();
                disp.hasAdded = true;
                if (this._list.some((ele, i, arr) => {
                    if (ele.handler !== h) return false;
                    ele.target = target;
                    return true;
                })) return;
                this._list.push(info);
            };
            if (delay == null || delay === false) proc();
            else if (delay === true) setTimeout(() => { proc(); }, 0);
            else if (typeof delay === "number") setTimeout(() => { proc(); }, delay);
            else setTimeout(() => { proc(); }, 0);
            return disp;
        }

        public addOnce(h: Common.EventHandler<T>, target?: any, disposableList?: DisposableArray, args?: any, delay?: boolean | number) {
            return this.add(h, target, disposableList, args, (ev, args2, index) => {
                return index > 0;
            }, delay);
        }

        /**
          * Raises this event.
          * @param ev  The event arguments. 
          * @param ignoreEx  true if ignore exception; otherwise, false.
          */
        public raise(ev: T, ignoreEx = false, delay?: boolean | number): void {
            var proc = () => {
                if (this._count < Number.MAX_VALUE) this._count++;
                this._list.forEach((ele, i, arr) => {
                    if (ele.remove) {
                        var needRemove = true;
                        try {
                            if (!ele.remove.call(ele.target, ev, ele.args, this._count - ele.start)) {
                                needRemove = false;
                            }
                        } catch (ex) { }
                        if (needRemove) this.remove(ele.handler);
                        return;
                    }

                    if (ignoreEx) {
                        try {
                            ele.args ? ele.handler.call(ele.target, ev, ele.args) : ele.handler.call(ele.target, ev);
                        } catch (ex) {
                        }
                    } else {
                        ele.args ? ele.handler.call(ele.target, ev, ele.args) : ele.handler.call(ele.target, ev);
                    }
                });
            };
            if (delay == null || delay === false) proc();
            else if (delay === true) setTimeout(() => { proc(); }, 0);
            else if (typeof delay === "number") setTimeout(() => { proc(); }, delay);
            else setTimeout(() => { proc(); }, 0);
        }

        /**
          * Removes an event handler.
          * @param h  The event handler to remove. 
          */
        public remove(h: Common.EventHandler<T>): void {
            if (!h) return;
            var col = [];
            this._list.forEach((ele, i, arr) => {
                if (ele.handler === h) return;
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

        /**
          * Adds listener methods of this event to a specific object.
          */
        public addListenerMethods(obj: any) {
            if (!obj) return;
            obj.listen = (h: (ev: T) => void, target?: any, disposableList?: DisposableArray, args?: any, remove?: Common.Func3<T, any, number, boolean>): Common.DisposableContract => {
                return this.add(h, target, disposableList, args);
            };
            obj.unlisten = (h: (ev: T) => void): void => {
                this.remove(h);
            };
            obj.clearListener = () => {
                this.clear();
            };
        }

    }

    /**
      * The mapping.
      */
    export class Mapping<T> {

        private _mapping: Collection.DictionaryContract<T> = {};

        public caseSensitive = false;

        public changed = new Collection.EventHandlers<Collection.ValueChangedContract<T>>();

        public get(key: string) {
            if (!key) return undefined;
            key = key.toString();
            return this._mapping[this.caseSensitive ? key : key.toLowerCase()];
        }

        /**
          * Sets up a mapping.
          */
        public map(dict: Collection.DictionaryContract<T>, clearBeforeSet = false) {
            if (!dict) return;
            if (clearBeforeSet) this.clear();
            for (var key in dict) {
                if (!key || typeof key !== "string") continue;
                var mapObj = dict[key];
                if (!this.caseSensitive) key = key.toLowerCase();
                var oldValue = this._mapping[key];
                this._mapping[key] = mapObj;
                this.changed.raise({ key: key, old: oldValue, value: this._mapping[key] });
            }
        }

        public push(key: string, value: T) {
            if (!key || !value) return;
            key = key.toString();
            if (!this.caseSensitive) key = key.toLowerCase();
            var oldValue = this._mapping[key];
            if (oldValue === this._mapping[key]) return;
            this._mapping[key] = value;
            this.changed.raise({ key: key, old: oldValue, value: this._mapping[key] });
        }

        public item(key: string, value?: T) {
            if (!key) return undefined;
            if (arguments.length > 1) {
                if (value == null) this.remove(key);
                else this.push(key, value);
            }

            return this._mapping[key];
        }

        public remove(key: string) {
            if (!key) return;
            key = key.toString();
            if (!this.caseSensitive) key = key.toLowerCase();
            var oldValue = this._mapping[key];
            if (this._mapping[key]) delete this._mapping[key];
            if (oldValue !== undefined) this.changed.raise({ key: key, old: oldValue, value: undefined });
        }

        public clear() {
            var oldMapping = this._mapping;
            this._mapping = {};
            for (var key in oldMapping) {
                if (!key || typeof key !== "string" || oldMapping[key] === undefined) continue;
                this.changed.raise({ key: key, old: oldMapping[key], value: undefined });
            }
        }

    }

    /**
      * Gets an array by given item or array.
      * This is used to work as a part of the processing logic that need support both single item or an array.
      * @param value  An item or an array.
      * @param emptyForNull  A value indicating whether need return an empty array if given item is null.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    export function toArray<T>(value: T | T[], emptyForNull = true, callbackfn?: (value: T, index: number, array: T[]) => void, thisArg?: any): T[] {
        var result: T[];
        if (!value) result = emptyForNull ? [] : null;
        else if (value instanceof Array) result = value;
        else result = [value];
        if (!!callbackfn && !!result) result.forEach(callbackfn, thisArg);
        return result;
    }

    /**
      * Converts to string array.
      * This is used to work as a part of the processing logic that need support both single item or an array.
      * @param value  A string or a string array.
      * @param emptyForNull  A value indicating whether need return an empty array if given item is null.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    export function toStringArray(value: string | string[], emptyForNull = true, callbackfn?: (value: string, index: number, array: string[]) => void, thisArg?: any): string[] {
        var result: string[];
        if (!value) result = emptyForNull ? [] : null;
        else if (value instanceof Array) result = value;
        else result = [value.toString()];
        if (!!callbackfn && !!result) result.forEach(callbackfn, thisArg);
        return result;
    }

    /**
      * Checks if the specific object is an array.
      */
    export function isArray(col: any): col is any[] {
        return col != null && col instanceof Array;
    }

    /**
      * Checks whether a specific list contains a test item.
      * @param list  The list. 
      * @param testItem  The item to test.
      * @param compare  Additional compare handler. 
      */
    export function contains<T1, T2>(list: T1[], testItem: T2, compare?: Common.Func2<T1, T2, boolean> | string): boolean {
        if (!list) return false;
        return Collection.indexOf(list, testItem, compare) >= 0;
    }

    /**
      * Gets the index of a test item in a specific list.
      * @param list  The list. 
      * @param testItem  The item to test.
      * @param compare  Additional compare handler. 
      */
    export function indexOf<T1, T2>(list: T1[], testItem: T2, compare?: Common.Func2<T1, T2, boolean> | string): number {
        if (!list) return 0;
        var index = -1;
        list.some((v, i, a) => {
            if (!(!!compare ? (typeof compare === "string" ? (v != null && (v as any)[compare] === testItem) : compare(v, testItem)) : v as any === testItem as any)) return false;
            index = i;
            return true;
        });

        return index;
    }

    /**
      * Gets the element of a test item in a specific list.
      * @param list  The list. 
      * @param testItem  The item to test.
      * @param compare  Additional compare handler. 
      */
    export function getItem<T1, T2>(list: T1[], testItem: T2, compare?: Common.Func2<T1, T2, boolean> | string): T1 {
        if (!list) return undefined;
        var value: T1;
        return list.some((v, i, a) => {
            if (!(!!compare ? (typeof compare === "string" ? (v != null && (v as any)[compare] === testItem) : compare(v, testItem)) : v as any === testItem as any)) return false;
            value = v;
            return true;
        }) ? value: undefined;
    }

    /**
      * Copies a list.
      * @param list  The list to copy. 
      */
    export function copy<T>(list: T[], removeEmpty = false): T[] {
        if (!list) return null;
        var col = [];
        list.forEach((ele, i, arr) => {
            if (!ele && removeEmpty) return;
            col.push(ele);
        });

        return col;
    }

    /**
      * Adds a list to target list one.
      * @param list  The target list. 
      * @param adding  The list to add.
      * @param nullCheck  A value indicating whether need ignore null. 
      * @param duplicateCheck  A value indicating whether need ignore the one duplicated.
      */
    export function pushRange(list: any[], adding: any[], nullCheck = false, duplicateCheck: string | boolean | Common.Func2<any, any, boolean> = false): any[] {
        if (!list) return null;
        if (!!adding) adding.forEach((ele, i, arr) => {
            if (!ele && nullCheck) return;
            if (duplicateCheck && Collection.contains(list, ele, typeof duplicateCheck === "boolean" ? null : duplicateCheck)) return;
            list.push(ele);
        });

        return list;
    }

    /**
      * Removes a number of items from a target list.
      * @param list  The target list. 
      * @param removing  The list to remove.
      * @param changeRaw  A value indicating whether change the target list or create a copy list to modify. 
      * @param compare  An optional comparing handler. 
      */
    export function remove(list: any[], removing: any[], changeRaw = false, compare: Common.Func2<any, any, boolean> | string = null): any[] {
        if (!list) return null;
        if (removing == null || removing.length === 0) return list;
        var col = changeRaw ? list : [];
        var raw = changeRaw ? Collection.copy(list) : list;
        var len = col.length;
        if (len > 0) for (var step = 0; step < len; step++) col.pop();
        raw.forEach((value, index, array) => {
            if (Collection.contains(removing, value, compare)) return;
            col.push(value);
        });

        return col;
    }

    /**
      * Removes key value pairs.
      * @param list  The target key value pairs. 
      * @param removing  The keys to remove.
      * @param changeRaw  A value indicating whether change the target list or create a copy list to modify. 
      */
    export function removeKeyValuePair<TKey, TValue>(list: KeyValuePairContract<TKey, TValue>[], removing: TKey[], changeRaw = false): KeyValuePairContract<TKey, TValue>[] {
        return Collection.remove(list, removing, changeRaw, (left: KeyValuePairContract<TKey, TValue>, right: TKey) => {
            return left.key === right;
        });
    }

    /**
      * Sets a key value pair.
      * @param list  The target key value pairs. 
      * @param item  The key value pair to set.
      * @param compare  An optional comparing handler. 
      */
    export function setKeyValue<TKey, TValue>(col: KeyValuePairContract<TKey, TValue>[], item: KeyValuePairContract<TKey, TValue>, compare: Common.Func2<TKey, TKey, boolean> = null): KeyValuePairContract<TKey, TValue>[] {
        if (!col) col = [];
        if (!item) return col;
        var contains = false;
        col.forEach((iV, iI, iA) => {
            if (!!compare ? compare(iV.key, item.key) : (iV.key !== item.key)) return;
            contains = true;
            iV.value = item.value;
        });
        if (!contains) col.push(item);
        return col;
    }

    /**
      * Modifies items in a specific list string.
      * @param raw  The list string. 
      * @param split  The split string.
      * @param addingItems  Items to add into the list string.
      * @param removingItems  Items to remove from the list list string. 
      */
    export function addItem(raw: string, split: string, addingItems: string | string[], removingItems?: string | string[], keepSplitAround?: boolean): string {
        if (!split) return raw;
        var str = "";
        var addingCol = Collection.toStringArray(addingItems, false);
        var removingCol = Collection.toStringArray(removingItems, false);
        split = split.toString();
        str = split + (raw || "").toString() + split;
        str = str.replace(split + split, split);
        if (!!addingCol) addingCol.forEach((ele, i, arr) => {
            str = str.replace(split + ele + split, split);
        });
        if (!!removingCol) removingCol.forEach((ele, i, arr) => {
            str = str.replace(split + ele + split, split);
        });
        str = (str + split).replace(split + split, split).replace(split + split, split).replace(split + split, split).replace(split + split, split);
        if (str === split) str = "";
        if (!!addingCol) addingCol.forEach((ele, i, arr) => {
            str += split + ele + split;
            str = str.replace(split + split, split);
        });
        if (!keepSplitAround && str.length > split.length * 2) {
            str = str.substring(split.length, str.length - split.length)
        }

        return str.replace(split + split, split);
    }

    /**
      * Gets an entry.
      * @param col  The mapped object with resources. 
      * @param reference  The entry reference item to get.
      * @param resType  The reference type.
      */
    export function getEntry<T>(col: MappedContract | MappedContract[], reference: Common.ReferenceItemContract | string, resType?: string): T {
        if (!col || !reference) return null;
        var result = null;
        var resId = typeof reference === "string" ? reference : reference.id;
        if (!resType && !!(reference as Common.ReferenceItemContract).type) resType = (reference as Common.ReferenceItemContract).type;
        if (!resType || !resId) return null;
        resId = resId.toString();
        resType = resType.toString();
        Collection.toArray(col).forEach((mapped, mI, mA) => {
            var mapping = mapped.map;
            if (!mapping) mapping = (<any>mapped).mapping;
            if (!mapping) mapping = {};
            var fields = mapping[resType] as string[];
            if (!fields) fields = [resType];
            if (!fields) return;
            Collection.toStringArray(fields).forEach((field, fI, fA) => {
                var list = mapped[field] as Common.IdentifiedContract[];
                if (!list) return;
                list.some((item, iI, iA) => {
                    if (item.id != resId) return false;
                    result = item;
                    return true;
                });
            });
        });
        return result;
    }

    /**
      * Gets a list of entry.
      * @param col  The mapped object with resources. 
      * @param reference  The entry reference item to get.
      */
    export function getEntries<T>(col: MappedContract | MappedContract[], reference: Common.ReferenceItemContract): T[] {
        if (!col || !reference || !reference.id || !reference.type) return [];
        var result = [];
        var resType = reference.type.toString();
        Collection.toArray(col).forEach((mapped, mI, mA) => {
            var mapping = mapped.map;
            if (!mapping) mapping = (<any>mapped).mapping;
            var fields = mapping[resType] as string[];
            if (!fields) fields = [resType];
            if (!fields) return;
            Collection.toStringArray(fields).forEach((field, fI, fA) => {
                var list = mapped[field] as Common.IdentifiedContract[];
                if (!list) return;
                list.some((item, iI, iA) => {
                    if (item.id != reference.id.toString()) return false;
                    result.push(<any>item);
                    return true;
                });
            });
        });
        return result;
    }

    /**
      * Finds the item view in the list.
      * @param col  The collection of item views. 
      * @param value  The value of item view to find. 
      */
    export function findItemView<T>(col: ItemViewContract<T>[], value: T): ItemViewContract<T> {
        if (!col) return null;
        var sel: ItemViewContract<T> = null;
        col.some((ele, i, arr) => {
            if (ele.value !== value) return false;
            sel = ele;
            return true;
        });
        return sel;
    }

    /**
      * Gets cell information of a table.
      * @param row  The model data of the row. 
      * @param column  The column information. 
      * @param element  The cell element. 
      */
    export function cellInfo<T>(row: T, column: TableColumnContract, element: HTMLTableCellElement) {
        if (!row || !column) return null;
        var prop = !!column.property ? row[column.property.toString()] : row;
        var propItem = null;
        if (column.mapping == null) column.mapping = ReferenceMappingTypes.Property;
        switch (column.mapping) {
            case ReferenceMappingTypes.Property:
                if (!prop) break;
                propItem = !!column.key ? prop[column.key.toString()] : prop;
                break;
            case ReferenceMappingTypes.Id:
                if (!prop || !column.key || !Collection.isArray(prop) || !prop.length) break;
                propItem = Collection.getItem(prop as PropertiesContract<any>, column.key, "id");
                break;
            case ReferenceMappingTypes.Key:
                if (!prop || !column.key || !Collection.isArray(prop) || !prop.length) break;
                propItem = Collection.getItem(prop as PropertiesContract<any>, column.key, "key");
                if (!!propItem) propItem = propItem.value;
                break;
            case ReferenceMappingTypes.Index:
                if (!prop || column.key == null || !Collection.isArray(prop) || !prop.length) break;
                var propIndex = typeof column.key === "number" ? (column.key as any as number) : parseInt(column.key);
                if (isNaN(propIndex) || propIndex < 0 || propIndex > (prop as any[]).length) break;
                propItem = prop[propIndex];
                break;
            case ReferenceMappingTypes.Function:
                if (!prop || !column.key || typeof column.key !== "function") break;
                propItem = (column.key as any)(prop);
                break;
            case ReferenceMappingTypes.Static:
                propItem = column.key != null ? column.key : "";
                break;
            default:
                if (!prop) break;
                propItem = !!column.key ? prop[column.key.toString()] : prop;
                break;
        }

        return {
            column: column,
            row: row,
            container: element,
            value: propItem
        };
    }

    /**
      * Formats a list.
      * @param col  The original collection. 
      * @param format  The format handler. 
      */
    export function formatList<T>(col: T[], format: AliHub.Common.Func1<T, T>, removeEmpty = false): T[] {
        if (!col) return null;
        var list = []
        col.forEach((ele, i, arr) => {
            if (!ele && removeEmpty) return;
            list.push(format(ele));
        });
        return list;
    }

    /**
      * Gets different between two versions of list.
      * @param oldItems  The list copied in old version. 
      * @param newItems  The current list. 
      */
    export function diff<T>(oldItems: T[], newItems: T[]): ChangedListContract<T> {
        var result = {
            added: [],
            modified: [],
            removed: [],
            unchanged: []
        };

        if (!oldItems) {
            result.added = newItems || [];
            return result;
        }

        if (!newItems) {
            result.removed = oldItems;
            return result;
        }

        oldItems.forEach((item, i, arr) => {
            if (Collection.contains(newItems, item)) result.unchanged.push(item);
            else result.removed.push(item);
        });

        newItems.forEach((item, i, arr) => {
            if (!Collection.contains(oldItems, item)) result.added.push(item);
        });

        return result;
    }

    /*
     * Changes selects.
     */
    export function changeSelect<T>(list: T[], selectionMode: Collection.SelectionModes, selected: T[], h: Common.Action2<T, boolean>, value?: boolean): SelectChangedContract<T> {
        if (!list || !selected || selectionMode == null || selectionMode === Collection.SelectionModes.None) return {
            selectionMode: selectionMode != null ? selectionMode : Collection.SelectionModes.None,
            toSelected: [],
            toUnselected: [],
            selected: Collection.copy(list)
        };
        var old = Collection.copy(list);
        selected.forEach((entity, eI, eArr) => {
            if (!h) h = (arg1, arg2) => { };
            var isSelected = Collection.contains(list, entity);
            var selectValue = value !== false;
            if (value == null) selectValue = !isSelected;
            if (isSelected === selectValue) return isSelected;
            switch (selectionMode) {
                case Collection.SelectionModes.Single:
                case Collection.SelectionModes.SingleOrEmpty:
                    if (selectionMode === Collection.SelectionModes.Single && value == null && isSelected) return true;
                    while (list.length > 0) {
                        var hasSel = list.pop();
                        h(hasSel, false);
                    }

                    if (selectValue) list.push(entity);
                    break;
                case Collection.SelectionModes.Multiple:
                    if (selectValue) {
                        list.push(entity);
                    } else {
                        Collection.remove(list, [entity], true);
                    }

                    break;
                default:
                    break;
            }

            h(entity, selectValue);
        });

        var diffL = Collection.diff(old, list);
        return {
            selectionMode: selectionMode,
            toSelected: diffL.added,
            toUnselected: diffL.removed,
            selected: Collection.copy(list)
        };
    }

    /**
      * Creates a binding array. 
      * @param col  The array if need fill initially.
      */
    export function bindingArray<T>(col?: T[]): Collection.BindingArrayContract<T> {
        return arguments.length > 0 ? Common.bindingArray<T>(col) : Common.bindingArray<T>();
    }

    /**
      * Creates a BindingControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param parent  The parent control.
      * @param options  The initializition options.
      */
    export function bindingControl<T>(idSuffix: string | HTMLElement, options?: BindingControlOptionsContract<T> | boolean, parent?: Common.VisualControl): BindingControl<T> {
        return Common.createControl(idSuffix, BindingControl, options, parent) as any;
    }

    /**
      * Creates a ListControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param parent  The parent control.
      * @param options  The initializition options.
      */
    export function listControl<T>(idSuffix: string | HTMLElement, options?: ListControlOptionsContract<T> | boolean | Common.VisualControl, parent?: Common.VisualControl | ListControlOptionsContract<T> | boolean): ListControl<T> {
        return Common.createControl(idSuffix, ListControl, options, parent) as any;
    }

    /**
      * Creates a PagingControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param parent  The parent control.
      * @param options  The initializition options.
      */
    export function pagingControl(idSuffix: string | HTMLElement, options?: PagingControlOptionsContract | boolean, parent?: Common.VisualControl): PagingControl {
        return Common.createControl(idSuffix, PagingControl, options, parent) as any;
    }

    /**
      * Creates a SwitchControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param parent  The parent control.
      * @param options  The initializition options.
      */
    export function switchControl(idSuffix: string | HTMLElement, options?: SwitchControlOptionsContract | boolean, parent?: Common.VisualControl): SwitchControl {
        return Common.createControl(idSuffix, SwitchControl, options, parent) as any;
    }

    /**
      * Creates a SingleFlowControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param parent  The parent control.
      * @param options  The initializition options.
      */
    export function singleFlowControl<T>(idSuffix: string | HTMLElement, options?: SingleFlowControlOptionsContract<T> | boolean, parent?: Common.VisualControl): SingleFlowControl<T> {
        return Common.createControl(idSuffix, SingleFlowControl, options, parent) as any;
    }

}
