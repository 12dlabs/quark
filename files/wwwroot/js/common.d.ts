export declare var name: string;
export declare var templates: AliHub.Res.Templates;
/**
    * Gets SVG source string.
    * @param key  The key.
    */
export declare function svg(key: string): string;
/**
    * Gets SVG source string.
    * @param key  The key.
    */
export declare function svgElement(key: string, styleRef?: string): SVGElement;
/**
    * Gets HTML source string.
    * @param key  The key.
    */
export declare function html(key: string): string;
/**
    * Gets local string.
    * @param key  The key.
    */
export declare function strings(key: string, lang?: string): string;
/**
    * Gets local string by HTML encoded.
    * @param key  The key.
    */
export declare function stringInHtml(key: string, lang?: string): string;
/**
    * Sets strings of specific market code.
    * @param lang  The market code.
    * @param value  The strings.
    */
export declare function local(lang: string, value: AliHub.Collection.DictionaryContract<string> | Object): void;
/**
    * Gets data package resolver.
    * @param key  The key.
    */
export declare function webResolver<T>(key: string, value?: string | AliHub.Web.WebResolverInfoContract<T>): AliHub.Web.BaseDataPackageResolver<T>;
/**
    * File upload result interface.
    */
export interface UploadResultConstruct {
    select(): PromiseLike<File>;
    upload(ignoreResult?: boolean): PromiseLike<any>;
    valid(): boolean;
}
/**
    * Uploads file.
    * @param url  The URL to post file.
    * @param key  The field key.
    */
export declare function upload(url?: string, key?: string, convert?: (File: File, form: AliHub.Elements.HiddenFormContract) => void): UploadResultConstruct;
/**
    * Multiple files uploade client control.
    */
export declare class UploadControl extends AliHub.Common.VisualControl {
    private _list;
    url: string | (() => string);
    fieldKey: string;
    removeContent: AliHub.Common.ListenedObjectContract<AliHub.Graph.ImageContract>;
    addContent: AliHub.Common.ListenedObjectContract<AliHub.Graph.ImageContract>;
    fileConvert: (File: File, form: AliHub.Elements.HiddenFormContract) => void;
    upload: (url?: string, key?: string, convert?: (File: File, form: AliHub.Elements.HiddenFormContract) => void) => UploadResultConstruct;
    uploaded: AliHub.Collection.EventHandlers<{
        file: File;
        result: any;
        success: boolean;
    }>;
    constructor(id: AliHub.Common.VisualControlElementContract);
    add(): void;
    isUploading(): boolean;
    result(): any[];
    removeAll(): void;
    private _url();
}
export declare function readText(fs: any, pathname: string): any;
export interface FileContract {
    id: string;
    isDir?: boolean;
    type?: string;
    name: string;
    icon?: AliHub.Graph.ImageContract;
    children?: FileContract[] | boolean;
    [property: string]: any;
}
export interface ItemInfoContract {
    isExpand: AliHub.Common.BindingObjectContract<boolean>;
    path(): string[];
    model(): FileContract;
    clearChildrenCache(): void;
}
export interface FilesContract {
    list: FileContract[];
    bag?: any;
}
export declare class TreeControl extends AliHub.Common.VisualControl {
    private _listEle;
    private _cntEle;
    private _navEle;
    private _selected;
    private _fileIcons;
    private _folderIcons;
    private _searInputEle;
    private _tempRes;
    transferBag: AliHub.Common.ListenedObjectContract<any>;
    subject: string | HTMLElement | AliHub.Common.VisualControl;
    resolveKey: string;
    queryKey: string;
    showFiles: AliHub.Common.ListenedObjectContract<boolean>;
    pushed: AliHub.Collection.EventHandlers<FileContract>;
    selected: AliHub.Collection.EventHandlers<FileContract>;
    itemSelected: AliHub.Collection.EventHandlers<FileContract>;
    emptyText: string;
    convertor: AliHub.Common.ListenedObjectContract<AliHub.Common.Func1<any, FilesContract>>;
    searched: AliHub.Collection.EventHandlers<{
        q: string;
        promise: PromiseLike<FileContract[]>;
        path: string[];
    }>;
    separator: string;
    allowNameInHTML: boolean;
    loadBag: any;
    from: string;
    disableAutoSearch: boolean;
    hideTypeInTips: boolean;
    disableEventsInContent: boolean;
    extendService: {
        itemRendered: AliHub.Collection.EventHandlers<{
            element: HTMLElement;
            model: FileContract;
            path: string[];
        }>;
        contentItemRendered: AliHub.Collection.EventHandlers<{
            element: HTMLElement;
            model: FileContract;
            path: string[];
        }>;
        ignoreDirSelectOnce: () => void;
        getSelectedElement: () => HTMLLIElement;
    };
    constructor(id: AliHub.Common.VisualControlElementContract);
    appendElementAfterNavigator<T extends HTMLElement>(child: string | T, idSuffix?: string, styleRef?: string | string[]): T;
    searchSuggest(q: string): PromiseLike<AliHub.Web.ResponseContract<FilesContract>>;
    searchEnter(q: string): PromiseLike<AliHub.Web.ResponseContract<FilesContract>>;
    formatText(str: string): string;
    push(...value: FileContract[]): void;
    selectedInfo(): ItemInfoContract;
    clear(): void;
    renderItem(element: HTMLDivElement, model: FileContract, info: ItemInfoContract): AliHub.Common.DisposableContract;
    renderContentItem(element: HTMLLIElement, model: FileContract, info: ItemInfoContract): AliHub.Common.DisposableContract;
    appendChildToNavigatorPanel<T extends Element>(newChild: T): T;
    upper(): void;
    adaptHeight(target: HTMLElement | Window | number, compute: AliHub.Common.Func1<number, number>): void;
    static resolveChildren(children: FileContract[] | boolean, path: string[], subject: string | HTMLElement | AliHub.Common.VisualControl, key: string, q?: string, failedForEmpty?: boolean, webReady?: (items: FilesContract) => void, separator?: string, convertor?: AliHub.Common.Func1<any, FilesContract>, bag?: any, from?: string): PromiseLike<FileContract[]>;
    childFiles(path: string[], webReady?: (col: FilesContract) => void): PromiseLike<FileContract[]>;
    expand(path: string[], select?: boolean): PromiseLike<FileContract[]>;
    loadFromWeb(selectFirst?: boolean): PromiseLike<FileContract[]>;
    search(q: string): PromiseLike<FileContract[]>;
    transferProp(key: string, value?: any): any;
    icon(isDir: boolean, type: string, value?: AliHub.Graph.ImageContract): any;
    convertFile(m: any): FilesContract;
    refreshContent(): void;
    getInfo(path: string[], autoExpand?: boolean): PromiseLike<ItemInfoContract>;
    private _search(q);
    private _children(elements?);
    private _findChild(path, index, elements);
    private _renderItemName(model);
    private _childFiles(deferred, list, path, index?, webReady?);
    private _deepChildren(deferred, col, path, select?, index?);
    private _info(info);
    private _selectedInfo();
    private _renderContent(childInfoCol, clicked?, parent?);
    private _renderItem(element, info);
}
export declare class BaseMdiControl extends AliHub.Collection.SwitchControl {
    private _loaders;
    subject: HTMLElement | AliHub.Common.VisualControl | string;
    fileOpened: AliHub.Collection.EventHandlers<{
        control: AliHub.Common.VisualControl;
        model: FileContract;
        from: any;
    }>;
    constructor(id: AliHub.Common.VisualControlElementContract);
    fileLoader(type: string, h?: AliHub.Common.Func3<HTMLElement, FileContract, any, AliHub.Common.VisualControl>): AliHub.Common.Func3<HTMLElement, FileContract, any, AliHub.Common.VisualControl>;
    newTab(name: string, control?: AliHub.Common.Func1<HTMLElement, AliHub.Common.VisualControl>): AliHub.Common.VisualControl;
    newFileTab(model: FileContract, from: any): AliHub.Common.VisualControl;
    renderTab(name: string, tabC: AliHub.Common.VisualControl, contentC: AliHub.Common.VisualControl): void;
}
export declare class MdiControl extends BaseMdiControl {
    private _explorer;
    constructor(id: AliHub.Common.VisualControlElementContract);
    tree(): TreeControl;
    push(...value: FileContract[]): void;
    adaptHeight(target: HTMLElement | Window | number, compute?: AliHub.Common.Func1<number, number>): void;
    icons(isDir: boolean, type: string, value?: AliHub.Graph.ImageContract): any;
}
export declare class SubmitControl extends AliHub.Common.VisualControl {
    private _text;
    private _upload;
    name: AliHub.Common.ListenedObjectContract<string>;
    attachmentUrl: AliHub.Common.ListenedObjectContract<string>;
    submitted: AliHub.Collection.EventHandlers<any>;
    cancelled: AliHub.Collection.EventHandlers<any>;
    closed: AliHub.Collection.EventHandlers<any>;
    uploadKey: AliHub.Common.ListenedObjectContract<string>;
    fileConverter: AliHub.Common.ListenedObjectContract<(File: File, form: AliHub.Elements.HiddenFormContract) => void>;
    constructor(id: AliHub.Common.VisualControlElementContract);
    focusTextArea(): void;
    clearContent(): void;
    note(): string;
    attachment(): any[];
    isUploading(): boolean;
    submit(): void;
    cancel(): void;
}
