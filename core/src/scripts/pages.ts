/*  --------------------
 *  Pages - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  pages.ts
 *  Description  Pages utilities.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

/// <reference path="common.ts" />
/// <reference path="datetime.ts" />
/// <reference path="collection.ts" />

namespace AliHub.Common {

    /**
      * Page options.
      */
    export interface PageOptionsContract {

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
    export class PageController {

        private static _hasInited = false;

        private static _onresize: Common.Action[];

        private static _size: string;

        /**
          * The app center URL.
          */
        public static appCenterUrl: string;

        /**
          * The element identifier of the page body panel.
          */
        public static bodyPanelId = "ali_body";

        /**
          * The element identifier of the page header panel.
          */
        public static headerPanelId = "ali_head";

        /**
          * The element identifier of the page cover panel.
          */
        public static coverPanelId = "ali_cover";

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
          * Home information.
          */
        public static homeInfo: Collection.BasicButtonInfoContract;

        /**
          * Search icon.
          */
        public static searchIcon: Graph.ImageContract;

        /**
          * The tips in search box.
          */
        public static searchTip: string;

        /**
          * The search provider.
          */
        public static searchProvider: Common.Func1<string, Collection.ButtonInfoContract[]>;

        /**
          * The link target of search item.
          */
        public static searchTarget = "_self";

        /**
          * The options bar info.
          */
        public static optionsBar: Collection.ButtonInfoContract[];

        /**
          * The mininum size of the page.
          */
        public static minSize: string;

        /**
          * The maxinum size of the page.
          */
        public static maxSize: string;

        /**
          * Loads page options.
          */
        public static loadOptions(value: PageOptionsContract) {
            PageController.appCenterUrl = value.appCenterUrl;
            PageController.bodyPanelId = value.bodyPanelId;
            PageController.headerPanelId = value.headerPanelId;
            PageController.coverPanelId = value.coverPanelId;
            PageController.hiddenPanelId = value.hiddenPanelId;
            PageController.messageUrl = value.messageUrl;
            PageController.feedbackUrl = value.feedbackUrl;
            PageController.signOutUrl = value.signOutUrl;
            PageController.menu = value.menu;
            PageController.path = value.path;
            PageController.isLastNodeInPath = value.isLastNodeInPath;
            PageController.homeInfo = value.homeInfo;
            PageController.searchIcon = value.searchIcon;
            PageController.searchTip = value.searchTip;
            PageController.searchProvider = value.searchProvider;
            PageController.searchTarget = value.searchTarget;
            PageController.optionsBar = value.optionsBar;
            PageController.minSize = value.minSize;
            PageController.maxSize = value.maxSize;
        }

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
            var applySize = [];
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
                var sizeTest = Collection.indexOf(sizes, "ali-size-" + PageController.minSize);
                if (sizeTest < sizeIndex) {
                    sizeIndex = sizeTest;
                    applySize.push("ali-size-cc-s");
                }
            }

            if (!!PageController.maxSize) {
                var sizeTest = Collection.indexOf(sizes, "ali-size-" + PageController.maxSize);
                if (sizeTest > sizeIndex) {
                    sizeIndex = sizeTest;
                    applySize.push("");
                    applySize.push("ali-size-cc-l");
                }
            }

            applySize.push(sizes[sizeIndex]);
            var horH = window.innerWidth >= 100 ? (window.innerWidth / 100).toString() : "0";
            if (window.innerWidth > 10000) horH = "x";
            if (horH.indexOf(".") > 0) horH = horH.substring(0, horH.indexOf("."));
            var hSizes = ["ali-size-hxx", "ali-size-cc-s", "ali-size-cc-l"];
            for (var i = 0; i <= 100; i++) {
                hSizes.push("ali-size-h" + i.toString() + "x");
            }

            if (!!document.body) {
                document.body.parentElement.className = Collection.addItem(
                    document.body.parentElement.className,
                    " ",
                    ["ali-size-h" + horH + "x"],
                    hSizes);
                document.body.parentElement.className = Collection.addItem(
                    document.body.parentElement.className,
                    " ",
                    applySize,
                    sizes);
            }

            var coverPanel = Elements.getById(PageController.coverPanelId);
            if (!!coverPanel) coverPanel.style.height = window.innerHeight.toString() + "px";
        }

        /**
          * Initializes the page.
          */
        public static init(unlisten = false) {
            if (PageController._hasInited === true) return;
            PageController._hasInited = true;
            PageController.refreshLayout();
            Elements.listen(window, "resize", (ev: UIEvent) => {
                PageController.refreshLayout();
            });

            if (unlisten) return;
            var eleCol = document.getElementsByTagName("*");
            for (var i = 0; i < eleCol.length; i++) {
                try {
                    fillControl(eleCol[i] as any, null, true);
                } catch (ex) { }
            }

            Elements.listen(document, "DOMNodeInserted", (event) => {
                fillControl(event.target as any || event.srcElement, null, true);
            });
            //Elements.listen(document, "DOMNodeRemovedFromDocument", (event) => {
            //    var c = getControl(event.target as any || event.srcElement);
            //    try {
            //        c.dispose();
            //    } catch (ex) { }
            //});
        }

        public static generatePage(id?: string, unlisten = false) {
            AliHub.Common.PageController.init(unlisten);
            if (!AliHub.Elements.getById(PageController.headerPanelId)) {
                var ele = document.createElement("div");
                ele.id = PageController.headerPanelId;
                document.body.appendChild(ele);
            }

            if (!AliHub.Elements.getById(PageController.bodyPanelId)) {
                var ele = document.createElement("div");
                ele.id = PageController.bodyPanelId;
                if (!id) id = PageController.bodyPanelId + "_cnt";
                ele.innerHTML = "<div class=\"ali-container-main\" ><div id=\"" + id + "\" class=\"ali-container-main\" ></div></div>";
                document.body.appendChild(ele);
            }

            if (!AliHub.Elements.getById(PageController.coverPanelId)) {
                var ele = document.createElement("div");
                ele.id = PageController.coverPanelId;
                ele.innerHTML = "<div class=\"ali-container-main\" ></div>";
                document.body.appendChild(ele);
            }

            if (!AliHub.Elements.getById(PageController.hiddenPanelId)) {
                var ele = document.createElement("div");
                ele.id = PageController.hiddenPanelId;
                ele.innerHTML = "<div class=\"ali-container-main\" ></div>";
                document.body.appendChild(ele);
            }
        }

        /**
          * Added resize handler.
          */
        public static addResizeEvent(h: Common.Action) {
            if (!PageController._onresize) {
                PageController._onresize = [];
                window.addEventListener("resize",(ev: UIEvent) => {
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
            var hiddenEle = Elements.getById(PageController.hiddenPanelId);
            if (!hiddenEle) return;
            var appStarterEle = Elements.getById(hiddenEle.id + "_starter");
            if (!appStarterEle) {
                appStarterEle = document.createElement("div");
                hiddenEle.appendChild(appStarterEle);
                appStarterEle.id = hiddenEle.id + "_starter";
                appStarterEle = Elements.getById(hiddenEle.id + "_starter");
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
            var coverPanel = Elements.getById(Common.PageController.coverPanelId);
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
            var coverPanel = Elements.getById(Common.PageController.coverPanelId);
            coverPanel.className = "ali-container-visible-f";
            coverPanel.style.display = "none";
        }

        /**
          * Renders header.
          */
        public static renderHeader(branch?: string): void {
            var cElement = Elements.getById(PageController.headerPanelId);
            if (!cElement) return;
            var containerEle = document.createElement("div");
            containerEle.className = "ali-container-main";
            var crumbEle = containerEle;
            var hEc = cElement.getElementsByTagName("h1");
            var isMemberPage = false;
            var title: Collection.BasicButtonInfoContract = !!PageController.homeInfo ? PageController.homeInfo : { name: document.title };
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

                if (!titleStr || titleStr == "") titleStr = AliHub.Res.builtIn().localString("page");
                containerEle.appendChild(hEc[0]);
                crumbEle = document.createElement("div");
                crumbEle.className = "ali-container-main";
                var pathArr: Collection.ButtonInfoContract[] = [{
                    id: "root",
                    name: title.name,
                    url: title.url,
                    avatar: title.avatar,
                    note: title.note,
                    onclick: title.onclick
                }];
                if (!!PageController.path) {
                    PageController.path.forEach((tV, tI, tA) => {
                        if (!!tV) pathArr.push(tV);
                    });
                } else {
                    pathArr.push({
                        id: "apps",
                        name: AliHub.Res.builtIn().localString("appCenter"),
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
                PageController.renderMenu(pathEle, pathArr, pathArr[pathArr.length - 1].id, null,(splitEle: HTMLLIElement, leftIndex: number) => {
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
                if (!!title.avatar) {
                    var titleImg = Graph.imageElement(title.avatar);
                    titleLinkEle.appendChild(titleImg);
                }

                if (!!title.name) {
                    var titleLinkTextEle = document.createElement("span");
                    titleLinkTextEle.innerHTML = title.name;
                    titleLinkTextEle.title = title.name;
                    titleLinkEle.appendChild(titleLinkTextEle);
                }

                if (!!title.note) titleLinkEle.title = title.note;
                if (!!title.url) titleLinkEle.href = title.url;
                else titleLinkEle.href = "#";
                if (!!title.onclick) titleLinkEle.onclick = (ev: MouseEvent) => {
                    return title.onclick();
                };
                if (!title.url && !title.onclick) titleLinkEle.onclick = (ev: MouseEvent) => {
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
            var profile = Users.profile();
            var optionsMenu: Collection.ButtonInfoContract[] = [];
            if (!!profile) {
                var msgUrl = Text.format(PageController.messageUrl, { "user": profile.id });
                var signOutUrl = Text.format(PageController.signOutUrl, { "user": profile.id });
                optionsMenu.push(
                    {
                        id: "me",
                        name: profile.nickname,
                        avatar: {
                            type: "url",
                            name: profile.nickname,
                            url: profile.avatar
                        } as any,
                        children: [
                            {
                                id: "me\logout",
                                name: AliHub.Res.builtIn().localString("logout"),
                                url: signOutUrl
                            }
                        ]
                    }
                );
            }

            Collection.pushRange(optionsMenu, PageController.optionsBar);
            PageController.renderMenu(userEle, optionsMenu);
            crumbEle.appendChild(userEle);
        }

        public static changeBranch(path: string) {
            var menuEle = Elements.getById(PageController.headerPanelId + "_menu") as HTMLUListElement;
            if (!menuEle) return;
            PageController.selectMenuItem(menuEle, PageController.menu, path);
        }

        public static selectMenuItem(element: HTMLUListElement, menu: Collection.ButtonInfoContract[], path: string) {
            if (!element || !menu) return null;
            menu.forEach((item, index, arr) => {
                var itemEle = Elements.getById(element.id + "_i" + index.toString());
                if (!itemEle.tagName || itemEle.tagName.toString().toLowerCase() !== "li") return;
                if (!!path && path === item.id) Elements.changeStyleRef(itemEle, ["ali-state-active-t"], []);
                else Elements.changeStyleRef(itemEle, [], ["ali-state-active-t"]);
            });
        }

        /**
          * Renders menu.
          */
        public static renderMenu(element: HTMLUListElement, menu: Collection.ButtonInfoContract[], path?: string, h?: (item: Collection.ButtonInfoContract, itemElement: HTMLLIElement, index: number) => void, split?: (splitElement: HTMLLIElement, leftIndex: number) => boolean): HTMLLIElement[] {
            if (!element || !menu) return null;
            var col: HTMLLIElement[] = [];
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
                    var iconEle = Graph.imageElement(item.avatar);
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
            Elements.changeStyleRef(element, ["ali-container-search"]);
            var infoEle = document.createElement("div");
            infoEle.id = element.id + "_info";
            infoEle.className = "ali-container-main";
            var iconEle = Graph.imageElement(PageController.searchIcon);
            if (!!iconEle) infoEle.appendChild(iconEle);
            var inputEle = document.createElement("input");
            inputEle.type = "search";
            inputEle.placeholder = !!PageController.searchTip && PageController.searchTip !== "" ? PageController.searchTip : AliHub.Res.builtIn().localString("typeKeywords");
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
                var eles = PageController.renderMenu(subMenuEle, col, null,(mItem, mElement, mIndex) => {
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
                var keyCode = (<any>event).keyCode;
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
                    var menuLinkItem = Elements.getById(menuItem.id + "_info_link");
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
            inputEle.onpaste = (ev: ClipboardEvent) => {
                setTimeout(() => {
                    var q = inputEle.value;
                    showJump(q);
                    selItem(0);
                }, 200);
            };
        }

    }

    export function initPage(id?: string | boolean, unlisten = false) {
        if (!id) PageController.init(unlisten);
        else PageController.generatePage(typeof id === "string" ? id : null);
    }

}
