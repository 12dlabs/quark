/*  --------------------
 *  Panels - Web Sync - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  panels.ts
 *  Description  Panles for web sync.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

import bizcommon = require("./common");
require("quark/scripts/import.min.js");
require("./common");

var htmls = {
    toolbar: `<div id="__view_control_container" data-bind="if: info()" class="ali-websync-client-toolbar ali-websync-client-toolbar-basic">
    <div id="__view_control_container_func" class="ali-container-menu">
        <!-- ko if: info().creationVisible() -->
        <button class="ali-x-button-renew" data-bind="text: res().templates('AliHub.WebSync').localString('renew'), click: function (data, event) { info().renewId(); }"></button>
        <input class="ali-x-input-id" type="text" data-bind="value: info().id" />
        <!-- /ko -->
        <!-- ko if: info().id() -->
        <!-- ko if: !info().enable() -->
        <button class="ali-x-button-enable" data-bind="text: res().templates('AliHub.WebSync').localString('start'), click: function (data, event) { info().enable(true); }"></button>
        <!-- /ko -->
        <!-- ko if: info().enable() -->
        <button class="ali-x-button-disable" data-bind="text: res().templates('AliHub.WebSync').localString('stop'), click: function (data, event) { info().enable(false); }"></button>
        <!-- /ko -->
        <!-- ko if: info().leavingVisible() -->
        <button class="ali-x-button-leave" data-bind="text: res().templates('AliHub.WebSync').localString('leave'), click: function (data, event) { info().leave(); }"></button>
        <!-- /ko -->
        <!-- /ko -->
    </div>
    <!-- ko if: info().imagesVisible() -->
    <!-- ko if: info().response() -->
    <ul id="__view_control_container_view" class="ali-x-section-view" data-bind="foreach: info().response()">
        <!-- ko if: activities -->
        <!-- ko foreach: activities -->
        <!-- ko if: type === "screenshot" -->
        <!-- ko if: image -->
        <li class="ali-container-main" data-bind="image: image, click: function (data, event) { $root.info().getPosition('__view_control_container_view_item' + $index(), activity); }, attr: { id: '__view_control_container_view_item' + $index() }"></li>
        <!-- /ko -->
        <!-- /ko -->
        <!-- /ko -->
        <!-- /ko -->
    </ul>
    <!-- /ko -->
    <!-- /ko -->
</div>
`
};
for (var prop in htmls) {
    if (!!prop && typeof prop === "string" && !!htmls[prop] && typeof htmls[prop] === "string")
        bizcommon.templates.html(prop, htmls[prop]); 
}

export function clientPanel<T>(id: string): AliHub.Common.BindingControl<T> {
    var control = new AliHub.Common.BindingControl<T>(id);
    var client = new bizcommon.Client();
    control.info(client);
    control.setTemplate("static", bizcommon.html("toolbar"));
    return control;
}
