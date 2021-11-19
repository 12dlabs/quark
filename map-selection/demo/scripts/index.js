/*  --------------------
*  Demo starter - Alibaba
*  (c) Kingcean Tuan, 2014.
*
*  File  index.ts
*  Description  Demo starter.
*  Owner  Kingcean Tuan <kingcean@live.com>
*  --------------------  */
define(["require", "exports", "../../src/scripts/editor"], function (require, exports, editor) {
    var Main;
    (function (Main) {
        if (!false) {
            require("../css/demo.css");
            require("map-selection/scripts/editor");
            require("./data");
        }
        function load() {
            Main.map = new editor.MapControl("page_show_map");
            return;
            // 设定坐标点演示。
            var point = Main.map.setPoint();
            point.getPosition(); // 坐标位置。
            // 添加多边形演示。
            Main.map.addPolygon([["120.141903", "30.305541"], ["120.126797", "30.294426"], ["120.136582", "30.288052"]], "#EECCAA");
            // 获取数据演示。
            Main.map.polygons().forEach(function (polygon, pi, pa) {
                polygon.getOptions().fillColor; // 颜色。RGB 字符串。
                polygon.getPath(); // 坐标点。一个数组，每个元素里面包含详细的坐标信息。
            });
            // 编辑演示。
            var n = 0;
            Main.map.edit(n); // 修改第n个地图。
            Main.map.complete(); // 结束修改。
            Main.map.remove(n); // 删除第n个地图。
        }
        Main.load = load;
    })(Main || (Main = {}));
    return Main;
});
//# sourceMappingURL=index.js.map