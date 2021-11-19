/*  --------------------
*  Panels - Web Sync - Alibaba
*  (c) Kingcean Tuan, 2014.
*
*  File  panels.ts
*  Description  Panles for web sync.
*  Owner  Kingcean Tuan <kingcean@live.com>
*  --------------------  */
define(["require", "exports", "./common"], function (require, exports, bizcommon) {
    "use strict";
    require("quark/scripts/import.min.js");
    require("./common");
    var htmls = {
        toolbar: "<div id=\"__view_control_container\" data-bind=\"if: info()\" class=\"ali-websync-client-toolbar ali-websync-client-toolbar-basic\">\n    <div id=\"__view_control_container_func\" class=\"ali-container-menu\">\n        <!-- ko if: info().creationVisible() -->\n        <button class=\"ali-x-button-renew\" data-bind=\"text: res().templates('AliHub.WebSync').localString('renew'), click: function (data, event) { info().renewId(); }\"></button>\n        <input class=\"ali-x-input-id\" type=\"text\" data-bind=\"value: info().id\" />\n        <!-- /ko -->\n        <!-- ko if: info().id() -->\n        <!-- ko if: !info().enable() -->\n        <button class=\"ali-x-button-enable\" data-bind=\"text: res().templates('AliHub.WebSync').localString('start'), click: function (data, event) { info().enable(true); }\"></button>\n        <!-- /ko -->\n        <!-- ko if: info().enable() -->\n        <button class=\"ali-x-button-disable\" data-bind=\"text: res().templates('AliHub.WebSync').localString('stop'), click: function (data, event) { info().enable(false); }\"></button>\n        <!-- /ko -->\n        <!-- ko if: info().leavingVisible() -->\n        <button class=\"ali-x-button-leave\" data-bind=\"text: res().templates('AliHub.WebSync').localString('leave'), click: function (data, event) { info().leave(); }\"></button>\n        <!-- /ko -->\n        <!-- /ko -->\n    </div>\n    <!-- ko if: info().imagesVisible() -->\n    <!-- ko if: info().response() -->\n    <ul id=\"__view_control_container_view\" class=\"ali-x-section-view\" data-bind=\"foreach: info().response()\">\n        <!-- ko if: activities -->\n        <!-- ko foreach: activities -->\n        <!-- ko if: type === \"screenshot\" -->\n        <!-- ko if: image -->\n        <li class=\"ali-container-main\" data-bind=\"image: image, click: function (data, event) { $root.info().getPosition('__view_control_container_view_item' + $index(), activity); }, attr: { id: '__view_control_container_view_item' + $index() }\"></li>\n        <!-- /ko -->\n        <!-- /ko -->\n        <!-- /ko -->\n        <!-- /ko -->\n    </ul>\n    <!-- /ko -->\n    <!-- /ko -->\n</div>\n"
    };
    for (var prop in htmls) {
        if (!!prop && typeof prop === "string" && !!htmls[prop] && typeof htmls[prop] === "string")
            bizcommon.templates.html(prop, htmls[prop]);
    }
    function clientPanel(id) {
        var control = new AliHub.Common.BindingControl(id);
        var client = new bizcommon.Client();
        control.info(client);
        control.setTemplate("static", bizcommon.html("toolbar"));
        return control;
    }
    exports.clientPanel = clientPanel;
});
//# sourceMappingURL=panels.js.map