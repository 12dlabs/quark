/*  --------------------
 *  Demo starter - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  index.ts
 *  Description  Demo starter.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

import mockdata = require("./data");

export = AliCrmDemoAmd;

module AliCrmDemoAmd {

    if ((window as any).require.cssSuport) {    // This is only for script text searching.
        require("../css/demo.css");
        require("quark-bindings/scripts/index");
        require("./data");
    }

    export interface SimpleControllerContract extends AliHub.Common.ProcessingTask {

        minSize?: string;

        maxSize?: string;

        renderHeader? (): void;

        get_menu? (): AliHub.Collection.ButtonInfoContract[];

        get_path? (): AliHub.Collection.ButtonInfoContract[];

        isFullPage?: boolean;

    }

    export class Manager {

        private static _init = false;

        public static demoContainerId = "demo_container";

        public static trackerUri = "http://fgt.apass-crm.desktop/";

        public static load<T extends SimpleControllerContract>(instance: T) {
            if (!instance) return;
            if (!Manager._init) {
                Manager._init = true;
                AliHub.Common.PageController.minSize = instance.minSize;
                AliHub.Common.PageController.maxSize = instance.maxSize;
                var menu = null;
                if (!!instance.get_menu) AliHub.Common.PageController.menu = instance.get_menu();
                if (!!instance.get_path) AliHub.Common.PageController.path = instance.get_path();
                Manager._preparePage(!!instance.renderHeader ? () => { instance.renderHeader(); } : null);
            }

            instance.process();
        }

        private static _preparePage(renderHeader?: () => void) {
            AliHub.Common.PageController.init();
            if (!AliHub.Elements.getById("alicrm_head")) {
                var ele = document.createElement("div");
                ele.id = "alicrm_head";
                document.body.appendChild(ele);
            }

            if (!AliHub.Elements.getById("alicrm_body")) {
                var ele = document.createElement("div");
                ele.id = "alicrm_body";
                ele.innerHTML = "<div class=\"alicrm-container-main\" ><div id=\"" + Manager.demoContainerId + "\" class=\"alicrm-container-main\" ></div></div>";
                document.body.appendChild(ele);
            }

            if (!AliHub.Elements.getById("alicrm_cover")) {
                var ele = document.createElement("div");
                ele.id = "alicrm_cover";
                ele.innerHTML = "<div class=\"alicrm-container-main\" ></div>";
                document.body.appendChild(ele);
            }

            if (!AliHub.Elements.getById("alicrm_hidden")) {
                var ele = document.createElement("div");
                ele.id = "alicrm_hidden";
                ele.innerHTML = "<div class=\"alicrm-container-main\" ></div>";
                document.body.appendChild(ele);
            }

            AliHub.Users.principle({ "contact": { "agent": "1" }, "permission": { "callRight": true }, "profile": { "id": "1", "nickname": "Kingcean", "name": "royaljinchen", avatar: "../images/taobao_avatar.jpg" } });
            if (!AliHub.Common.PageController.menu) AliHub.Common.PageController.menu = mockdata.Constant.pageMenu;
            if (!renderHeader) AliHub.Common.PageController.renderHeader();
            else renderHeader();
            AliHub.Common.PageController.searchProvider = Manager.searchProvider;

            var tracker = AliHub.Diagnostics.tracker();
            (<any>tracker).config("url", Manager.trackerUri);
        }

        private static searchProvider(q: string): AliHub.Collection.ButtonInfoContract[] {
            if (!q || q.length < 1) return null;
            var list: AliHub.Collection.ButtonInfoContract[] = [
                { id: "s001", name: "Search {q} by Name", url: "javascript:alert('s001 - {q}');" },
                { id: "s002", name: "Search {q} by Type", url: "javascript:alert('s002 - {q}');" }
            ];
            return list;
        }


    }

}
