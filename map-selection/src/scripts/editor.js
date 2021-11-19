/*  --------------------
 *  Editor - Map Selection - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  editor.js
 *  Description  The map polygons editor.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    if (false) {
        require("../css/common.css");
    }
    function _init() {
        var quark_bindings = require("quark-bindings/scripts/index");
        quark_bindings.setup();
        var templ = require("../generated/templates");
        AliHub.Diagnostics.Tracker.debugInfo("LbsSel", "Initialized AliHub LBS selection.");
    }
    var MapControl = (function (_super) {
        __extends(MapControl, _super);
        function MapControl(id, settings) {
            _super.call(this, id);
            this._polygons = [];
            this._usedColors = [];
            this.strokeColor = "#0066FF";
            this.randomColors = ["#EECCAA", "#AAEECC", "#AACCEE", "#EEAACC", "#CCEEAA", "#CCAAEE", "#EEBBBB", "#BBEEBB", "#BBBBEE", "#99EEEE", "#EE99EE", "#EEEE99",
                "#FFDDAA", "#AAFFDD", "#AADDFF", "#FFAADD", "#DDFFAA", "#DDAAFF", "#DDAAAA", "#AADDAA", "#AAAADD", "#AAFFFF", "#FFAAFF", "#FFFFAA",
                "#DDBB99", "#99DDBB", "#99BBDD", "#DD99BB", "#BBDD99", "#BB99DD", "#BB9999", "#99BB99", "#9999BB", "#99FFFF", "#FF99FF", "#FFFF99",
            ];
            this.polygonOption = {
                strokeColor: "#FF33FF",
                strokeOpacity: 1,
                strokeWeight: 2
            };
            this._settings = !!settings ? settings : {};
            this.add_styleRef(["ali-map-selector"]);
            this._initMap();
            this._initMenu();
            this._initResult();
        }
        MapControl.prototype.getColor = function () {
            var _this = this;
            if (!this._usedColors || this._usedColors.length >= this.randomColors.length) {
                var color = this.randomColors[this._polygons.length % this.randomColors.length];
                return color;
            }
            var resultC;
            if (!this.randomColors.some(function (color, colorI, colorA) {
                if (AliHub.Collection.ListHelper.contains(_this._usedColors, color))
                    return false;
                _this._usedColors.push(color);
                resultC = color;
                return true;
            }))
                this._usedColors = null;
            return !!resultC ? resultC : this.getColor();
        };
        MapControl.prototype.setPoint = function (longitude, latitude) {
            var marker = new AMap.Marker({
                position: longitude != null && latitude != null ? new AMap.LngLat(longitude.toString(), latitude.toString()) : this._map.getCenter(),
                draggable: true,
                cursor: 'move',
                raiseOnDrag: true
            });
            marker.setMap(this._map);
            return marker;
        };
        MapControl.prototype.polygons = function () {
            return AliHub.Collection.ListHelper.copy(this._polygons);
        };
        MapControl.prototype.addPolygon = function (arr, color) {
            this.complete();
            var polygonArr = new Array();
            arr.forEach(function (cor, ci, ca) {
                if (!cor || cor.length < 2)
                    return;
                polygonArr.push(new AMap.LngLat(cor[0].toString(), cor[1].toString()));
            });
            if (!!color || color == "") {
                this._usedColors.push(color);
            }
            else {
                color = this.getColor();
            }
            var polygon = new AMap.Polygon({
                path: polygonArr,
                strokeColor: this.strokeColor,
                strokeOpacity: 1,
                strokeWeight: 1,
                fillColor: color,
                fillOpacity: 0.4
            });
            polygon.setMap(this._map);
            this._polygons.push(polygon);
            this._selected = polygon;
        };
        MapControl.prototype.map = function () {
            return this._map;
        };
        MapControl.prototype.getCenter = function () {
            return this._map.getCenter();
        };
        MapControl.prototype.select = function (index) {
            var polygon = this.get_polygon(index);
            if (polygon !== this._selected) {
                this.complete();
                this._selected = polygon;
            }
            return this._selected;
        };
        MapControl.prototype.get_polygon = function (index) {
            if (arguments.length > 0 && index != null) {
                if (index < 0)
                    index = 0;
                else if (index >= this._polygons.length)
                    index = this._polygons.length - 1;
                return this._polygons[index];
            }
            return this._selected;
        };
        MapControl.prototype.edit = function (index) {
            var _this = this;
            if (!this.select(index))
                return;
            if (!!this.polygonOption)
                this._selected.setOptions(this.polygonOption.strokeColor);
            this._map.plugin(["AMap.PolyEditor"], function () {
                _this._editorTool = new AMap.PolyEditor(_this._map, _this._selected);
                _this._editorTool.open();
            });
        };
        MapControl.prototype.complete = function () {
            if (!!this._editorTool)
                this._editorTool.close();
            if (!!this._selected)
                this._selected.setOptions({ strokeColor: this.strokeColor });
        };
        MapControl.prototype.remove = function (index) {
            this.complete();
            var polygon = this.get_polygon(index);
            if (!polygon)
                return;
            AliHub.Collection.ListHelper.remove(this._polygons, [polygon], true);
            this._selected.setMap(null);
            this._selected = this._polygons[this._polygons.length - 1];
        };
        MapControl.prototype.clear = function () {
            while (this._polygons.length > 0) {
                this.remove();
            }
        };
        MapControl.prototype.district = function () {
            return this._district;
        };
        MapControl.prototype.search = function () {
            return this._district;
        };
        MapControl.prototype._initMap = function () {
            var _this = this;
            var mapContainer = this.appendElement("div");
            mapContainer.id = this.get_id() + "_map";
            mapContainer.className = "ali-container-main";
            var viewSettings = {
                zoom: 13
            };
            if (!this._settings.viewCenter)
                viewSettings.center = this._settings.viewCenter;
            if (!this._settings.viewZoom)
                viewSettings.zoom = this._settings.viewZoom;
            this._map = new AMap.Map(mapContainer.id, {
                resizeEnable: true,
                view: new AMap.View2D(viewSettings)
            });
            AMap.service(["AMap.DistrictSearch"], function () {
                var opts = {
                    subdistrict: 1,
                    extensions: 'all',
                    level: 'district'
                };
                this._district = new AMap.DistrictSearch(opts);
            });
            var arr = new Array();
            this._map.plugin(["AMap.MouseTool"], function () {
                var mouseTool = new AMap.MouseTool(_this._map);
                mouseTool.polygon(_this.polygonOption);
                AMap.event.addListener(mouseTool, "draw", function (e) {
                    arr = e.obj.getPath();
                    var polygon = new AMap.Polygon({
                        map: _this._map,
                        path: arr,
                        extData: new Date(),
                        strokeColor: _this.strokeColor,
                        strokeOpacity: 1,
                        strokeWeight: 1,
                        fillColor: _this.getColor(),
                        fillOpacity: 0.4
                    });
                    _this._polygons.push(polygon);
                    _this.complete();
                    if (_this._selected != null) {
                        _this._selected.setOptions({ strokeColor: _this.strokeColor });
                    }
                    _this._selected = polygon;
                    var pointsCount = _this._selected.getPath().length;
                    _this._resultContainer.innerHTML = "" + _this._selected.getPath() + "";
                    AliHub.Diagnostics.Tracker.debugInfo("Added a polygon with " + pointsCount + " points .", polygon);
                    AMap.event.addListener(polygon, "dblclick", function (e) {
                        _this.complete();
                        _this._selected = polygon;
                        _this._selected.setOptions({ strokeColor: _this.strokeColor });
                        polygon.setOptions(_this.polygonOption);
                        _this._editorTool = new AMap.PolyEditor(_this._map, _this._selected);
                    });
                    _this._map.plugin(["AMap.PolyEditor"], function () {
                        e.obj.hide();
                        _this._editorTool = new AMap.PolyEditor(_this._map, _this._selected);
                    });
                });
            });
        };
        MapControl.prototype._initMenu = function () {
            var menuContainer = this.appendElement("div");
            menuContainer.id = this.get_id() + "_menu";
            menuContainer.className = "ali-container-menu";
            this._refreshMenu();
        };
        MapControl.prototype._refreshMenu = function (col) {
            var _this = this;
            var menuContainer = this.getChildElement(true, "menu");
            if (!col)
                col = [
                    { key: AliHub.Res.builtIn().localString("save"), value: function () { _this.complete(); } },
                    { key: AliHub.Res.builtIn().localString("modifyItem"), value: function () { _this.edit(); } },
                    { key: AliHub.Res.builtIn().localString("removeItem"), value: function () { _this.remove(); } }
                ];
            col.forEach(function (value, index, Array) {
                var menuItemElement = document.createElement("input");
                menuItemElement.value = value.key;
                menuItemElement.onclick = value.value;
                menuItemElement.type = "button";
                menuContainer.appendChild(menuItemElement);
            });
        };
        MapControl.prototype._initResult = function () {
            this._resultContainer = this.appendElement("div");
            this._resultContainer.id = this.get_id() + "_result";
            this._resultContainer.className = "ali-map-selector-info";
        };
        return MapControl;
    })(AliHub.Common.VisualControl);
    exports.MapControl = MapControl;
    _init();
});
//# sourceMappingURL=editor.js.map