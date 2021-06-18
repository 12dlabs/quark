/**
  * Root path.
  */
export declare var rootPath: string;
/**
  * Gets path.
  * @param path  The path.
  */
export declare function getPath(path: string): string;
/**
  * Gets identifier from the path.
  */
export declare function getIdByPath(): string;
/**
  * Bind the control to page as single page web application.
  */
export declare function controlPage(control: PageSplitPanel, titleTemplate?: string): void;
/**
  * Sets page as single split panel web application.
  */
export declare function splitPage(id: string, options?: Interfaces.PageOptions): PageSplitPanel;
/**
  * Split panel.
  */
export declare class SplitPanel extends AliHub.Common.VisualControl {
    private _left;
    private _right;
    constructor(id: string);
    left<T extends AliHub.Common.VisualControl>(control?: AliHub.Common.Func1<string, T>): T;
    right<T extends AliHub.Common.VisualControl>(control?: AliHub.Common.Func1<string, T>): T;
}
/**
  * Page split panel.
  */
export declare class PageSplitPanel extends SplitPanel {
    private _menu;
    private _selected;
    menuChanged: AliHub.Collection.EventHandlers<Interfaces.NavMenuContract>;
    itemChanged: AliHub.Collection.EventHandlers<Interfaces.NavMenuItemContract>;
    freeLoad: boolean;
    timestamp: any;
    defaultPathTemplate: string;
    constructor(id: string);
    selected(value?: Interfaces.NavMenuItemContract | string): Interfaces.NavMenuItemContract;
    contain(path: string): Interfaces.NavMenuItemContract;
    loadDefault(): void;
    getPath(path: string): string;
    menu(value?: Interfaces.NavMenuContract, loadDefault?: boolean): Interfaces.NavMenuContract;
    selectItem(value: Interfaces.NavMenuItemContract): void;
}
/**
  * Page split panel with AJAX loader.
  */
export declare class AjaxPageSplitPanel extends PageSplitPanel {
    constructor(id: string);
    private _prepareBody();
    selectItem(value: Interfaces.NavMenuItemContract): void;
}
/**
  * Page split panel with iframe supports.
  */
export declare class FramePageSplitPanel extends PageSplitPanel {
    private _frameElement;
    constructor(id: string);
    private _prepareBody();
    selectItem(value: Interfaces.NavMenuItemContract): void;
    iframe(): HTMLIFrameElement;
}
export declare namespace Interfaces {
    /**
      * Navigator menu.
      */
    interface NavMenuContract extends Array<NavMenuGroupContract> {
        name?: string;
        rootPath?: string;
        defaultItem?: NavMenuItemContract;
    }
    /**
      * Navigator menu group.
      */
    interface NavMenuGroupContract {
        name?: string;
        list: NavMenuItemContract[];
    }
    /**
      * Navigator menu item.
      */
    interface NavMenuItemContract {
        name?: string;
        url: string;
    }
    /**
      * Page options.
      */
    interface PageOptions {
        /**
          * Type of page split panel to render.
          */
        splitPanel?: typeof PageSplitPanel;
        /**
          * Site information.
          */
        homeInfo?: AliHub.Collection.BasicButtonInfoContract;
        /**
          * Search provider.
          */
        searchProvider?: AliHub.Common.Func1<string, AliHub.Collection.ButtonInfoContract[]>;
        /**
          * Page menu.
          */
        pageMenu?: AliHub.Common.Func<AliHub.Collection.ButtonInfoContract[]>;
        /**
          * Left menu of splitted panel.
          */
        leftMenu?: any;
        /**
          * Site path.
          */
        path?: string;
        /**
          * A value indicating whether the page is to free load sub-page by given information.
          */
        freeload?: boolean;
        /**
          * Title template.
          */
        titleTemplate?: string;
        /**
          * The default path template.
          */
        defaultPathTemplate?: string;
    }
}
