/*  --------------------
 *  Mock data - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  data.ts
 *  Description  Mock data provider and definitions.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
define(["require", "exports"], function (require, exports) {
    "use strict";
    function pageMenu() {
        return [
            {
                id: "tickets",
                name: AliHub.Res.builtIn().localString("bizTasks")
            }, {
                id: "statics",
                name: AliHub.Res.builtIn().localString("summaryReports")
            }, {
                id: "jobs",
                name: AliHub.Res.builtIn().localString("jobMgm")
            }, {
                id: "apps",
                name: AliHub.Res.builtIn().localString("appCenter")
            }
        ];
    }
    exports.pageMenu = pageMenu;
    function sampleProfile() {
        return {
            id: 1,
            name: "Mr Tuan",
            nickname: "Kingcean",
            avatar: "../images/taobao_avatar.jpg",
            gender: "m",
            city: "Shanghai",
            birthday: new Date(1987, 6, 17),
            mobile: "4008000000",
            tags: ["Handsome", "Nice"]
        };
    }
    exports.sampleProfile = sampleProfile;
});
