import ql = AliHub;
export declare var name: string;
export declare var templates: ql.Res.Templates;
/**
  * Gets SVG source string.
  * @param key  The key.
  */
export declare function svg(key: string): string;
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
  * Sets strings of specific market code.
  * @param lang  The market code.
  * @param value  The strings.
  */
export declare function local(lang: string, value: ql.Collection.DictionaryContract<string> | Object): void;
/**
  * Gets data package resolver.
  * @param key  The key.
  */
export declare function webResolver<T>(key: string, value?: string | ql.Web.WebResolverInfoContract<T>): ql.Web.BaseDataPackageResolver<T>;
/**
  * Batch sets URL templates.
  * @param key  The key.
  */
export declare function setUrlTemplates(urls: ql.Common.ClassicObject): string[];
/**
  * Sets or gets the implementation for hit collector.
  * @param value  The hit collector implementation instance.
  */
export declare function hitCollector(value?: ql.Common.Action1<ql.Diagnostics.IdentityHitStateContract>): ql.Common.Action1<ql.Diagnostics.IdentityHitStateContract>;
/**
  * Sets or gets the implementation for target resolver.
  * @param value  The target resolver implementation instance.
  */
export declare function targetResolver(value?: (element: Element) => string): (element: Element) => string;
/**
  * Sets or gets whether use SPM attributes.
  * @param value  true if use SPM attributes; otherwise, false.
  */
export declare function useSpm(value?: boolean): boolean;
/**
  * The client.
  */
export declare class Client {
    private _tracking;
    private _rela;
    private _path;
    private _properties;
    /**
      * Gets or sets the app identifier.
      */
    appId: ql.Common.ListenedObjectContract<string>;
    /**
      * Gets or sets the page identifier.
      */
    pageId: ql.Common.ListenedObjectContract<string>;
    /**
      * Resource subject.
      */
    subject: string | HTMLElement | ql.Common.VisualControl;
    /**
      * DOM element of hit targets container.
      */
    container: HTMLElement;
    /**
      * Gets or sets whether show analyzer report.
      */
    analyzerVisible: ql.Common.ListenedObjectContract<boolean>;
    /**
      * Gets or sets the additional property bag.
      */
    bag: ql.Common.ListenedObjectContract<any>;
    /**
      * Gets or sets the category string.
      */
    category: ql.Common.ListenedObjectContract<string>;
    /**
      * Gets or sets whether stop to send hit information.
      */
    silent: ql.Common.ListenedObjectContract<boolean>;
    /**
      * Adds or removes an event occured when the property is changed.
      */
    propChanged: ql.Collection.EventHandlers<ql.Collection.ValueChangedContract<any>>;
    /**
      * Gets or sets whether need remove duplicate hit information.
      */
    removeDuplicate: ql.Common.ListenedObjectContract<boolean>;
    /**
      * Initializes a new instance of the ElementsHitPool class.
      */
    constructor(app: string, page: string);
    /**
      * Batch registers the send events.
      */
    registerSendEvents(): void;
    /**
      * Registers the send event for a element.
      */
    registerSendEvent(element: Element, getTarget?: (element: Element) => string): boolean;
    all(): ql.Diagnostics.ElementHitAnalysisContract[];
    randomSilent(permillage: number): void;
    /**
      * Sets the specific additional property.
      * @param key  The property name.
      * @param value  The value of the property.
      */
    prop(name: string, value?: any): any;
    maxiCount(): number;
    miniCount(): number;
    maxiDuration(): number;
    miniDuration(): number;
    loadFromWeb(): ql.Web.ResponseTask<ql.Diagnostics.ElementHitSummaryContract>;
    sendHitInfo(target: string, note?: string): void;
    push(...value: ql.Diagnostics.ElementHitFlowContract[]): void;
    get(target: string): ql.Diagnostics.ElementHitAnalysisContract;
    static pushInit(...value: ((pool: Client) => boolean)[]): void;
    private _add(model);
    private _getElement(target, info);
}
