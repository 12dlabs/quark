/*  --------------------
*  Demo starter - Alibaba
*  (c) Kingcean Tuan, 2014.
*
*  File  index.ts
*  Description  Demo starter.
*  Owner  Kingcean Tuan <kingcean@live.com>
*  --------------------  */

import editor = require("../../src/scripts/editor");
import mockdata = require("./data");

export = Main;

module Main {

    if (!false) {
        require("../css/demo.css");
        require("map-selection/scripts/editor");
        require("./data");
    }

    export var map: editor.MapControl;

    export function load() {
        map = new editor.MapControl("page_show_map");
        return;

        // 设定坐标点演示。
        var point = map.setPoint();
        point.getPosition(); // 坐标位置。

        // 添加多边形演示。
        map.addPolygon([["120.141903", "30.305541"], ["120.126797", "30.294426"], ["120.136582", "30.288052"]], "#EECCAA");

        // 获取数据演示。
        map.polygons().forEach((polygon, pi, pa) => {
            polygon.getOptions().fillColor; // 颜色。RGB 字符串。
            polygon.getPath();  // 坐标点。一个数组，每个元素里面包含详细的坐标信息。
        });

        // 编辑演示。
        var n = 0;
        map.edit(n);    // 修改第n个地图。
        map.complete(); // 结束修改。
        map.remove(n);  // 删除第n个地图。
    }

}
