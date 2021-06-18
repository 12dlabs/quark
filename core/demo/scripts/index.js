/*  --------------------
 *  Demo starter - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  index.ts
 *  Description  Demo starter.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
define(["require", "exports", "./data"], function (require, exports, mockdata) {
    var AliCrmDemoAmd;
    (function (AliCrmDemoAmd) {
        if (false) {
            require("../css/demo.css");
            require("quark-bindings/scripts/index");
            require("./data");
        }
        var Manager = (function () {
            function Manager() {
            }
            Manager.load = function (instance) {
                if (!instance)
                    return;
                if (!Manager._init) {
                    Manager._init = true;
                    AliHub.Common.PageController.minSize = instance.minSize;
                    AliHub.Common.PageController.maxSize = instance.maxSize;
                    var menu = null;
                    if (!!instance.get_menu)
                        AliHub.Common.PageController.menu = instance.get_menu();
                    if (!!instance.get_path)
                        AliHub.Common.PageController.path = instance.get_path();
                    Manager._preparePage(!!instance.renderHeader ? function () { instance.renderHeader(); } : null);
                }
                instance.process();
            };
            Manager._preparePage = function (renderHeader) {
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
                if (!AliHub.Common.PageController.menu)
                    AliHub.Common.PageController.menu = mockdata.Constant.pageMenu;
                if (!renderHeader)
                    AliHub.Common.PageController.renderHeader();
                else
                    renderHeader();
                AliHub.Common.PageController.searchProvider = Manager.searchProvider;
                var tracker = AliHub.Diagnostics.tracker();
                tracker.config("url", Manager.trackerUri);
            };
            Manager.searchProvider = function (q) {
                if (!q || q.length < 1)
                    return null;
                var list = [
                    { id: "s001", name: "Search {q} by Name", url: "javascript:alert('s001 - {q}');" },
                    { id: "s002", name: "Search {q} by Type", url: "javascript:alert('s002 - {q}');" }
                ];
                return list;
            };
            Manager._init = false;
            Manager.demoContainerId = "demo_container";
            Manager.trackerUri = "http://fgt.apass-crm.desktop/";
            return Manager;
        })();
        AliCrmDemoAmd.Manager = Manager;
    })(AliCrmDemoAmd || (AliCrmDemoAmd = {}));
    return AliCrmDemoAmd;
});
//# sourceMappingURL=index.js.map