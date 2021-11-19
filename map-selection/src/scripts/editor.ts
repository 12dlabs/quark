/*  --------------------
 *  Editor - Map Selection - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  editor.js
 *  Description  The map polygons editor.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

declare var AMap;

if (false) {
    require("../css/common.css");
}

function _init() {
    var quark_bindings = require("quark-bindings/scripts/index");
    quark_bindings.setup();
    var templ = require("../generated/templates");
    AliHub.Diagnostics.Tracker.debugInfo("LbsSel", "Initialized AliHub LBS selection.");
}

export interface Settings {
    viewCenter?: number[];
    viewZoom?: number;
}

export class MapControl extends AliHub.Common.VisualControl {

    private _map;

    private _district;

    private _selected;

    private _polygons = [];

    private _editorTool;

    private _resultContainer;

    private _usedColors: string[] = [];

    private _settings: Settings;

    public strokeColor = "#0066FF";

    public randomColors = ["#EECCAA", "#AAEECC", "#AACCEE", "#EEAACC", "#CCEEAA", "#CCAAEE", "#EEBBBB", "#BBEEBB", "#BBBBEE", "#99EEEE", "#EE99EE", "#EEEE99",
        "#FFDDAA", "#AAFFDD", "#AADDFF", "#FFAADD", "#DDFFAA", "#DDAAFF", "#DDAAAA", "#AADDAA", "#AAAADD", "#AAFFFF", "#FFAAFF", "#FFFFAA",
        "#DDBB99", "#99DDBB", "#99BBDD", "#DD99BB", "#BBDD99", "#BB99DD", "#BB9999", "#99BB99", "#9999BB", "#99FFFF", "#FF99FF", "#FFFF99",
    ];

    public polygonOption = {
        strokeColor: "#FF33FF",
        strokeOpacity: 1,
        strokeWeight: 2
    };

    public constructor(id: string, settings?: Settings) {
        super(id);
        this._settings = !!settings ? settings : {};
        this.add_styleRef(["ali-map-selector"]);
        this._initMap();
        this._initMenu();
        this._initResult();
    }

    public getColor(): string {
        if (!this._usedColors || this._usedColors.length >= this.randomColors.length) {
            var color = this.randomColors[this._polygons.length % this.randomColors.length];
            return color;
        }

        var resultC: string;
        if (!this.randomColors.some((color, colorI, colorA) => {
            if (AliHub.Collection.ListHelper.contains(this._usedColors, color)) return false;
            this._usedColors.push(color);
            resultC = color;
            return true;
        })) this._usedColors = null;
        return !!resultC ? resultC : this.getColor();
    }

    public setPoint(longitude?: number, latitude?: number): any {
        var marker = new AMap.Marker({
            position: longitude != null && latitude != null ? new AMap.LngLat(longitude.toString(), latitude.toString()) : this._map.getCenter(),
            draggable: true,
            cursor: 'move',
            raiseOnDrag: true
        });
        marker.setMap(this._map);
        return marker;
    }

    public polygons(): any[] {
        return AliHub.Collection.ListHelper.copy(this._polygons);
    }

    public addPolygon(arr: string[][], color?: string) {
        this.complete();
        var polygonArr = new Array();
        arr.forEach((cor, ci, ca) => {
            if (!cor || cor.length < 2) return;
            polygonArr.push(new AMap.LngLat(cor[0].toString(), cor[1].toString()));
        });
        if (!!color || color == "") {
            this._usedColors.push(color);
        } else {
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
    }

    public map(): any {
        return this._map;
    }

    public getCenter(): any {
        return this._map.getCenter();
    }

    public select(index?: number): any {
        var polygon = this.get_polygon(index);
        if (polygon !== this._selected) {
            this.complete();
            this._selected = polygon;
        }

        return this._selected;
    }

    public get_polygon(index?: number): any {
        if (arguments.length > 0 && index != null) {
            if (index < 0) index = 0;
            else if (index >= this._polygons.length) index = this._polygons.length - 1;
            return this._polygons[index];
        }

        return this._selected;
    }

    public edit(index?: number) {
        if (!this.select(index)) return;
        if (!!this.polygonOption) this._selected.setOptions(this.polygonOption.strokeColor);
        this._map.plugin(["AMap.PolyEditor"],() => {
            this._editorTool = new AMap.PolyEditor(this._map, this._selected);
            this._editorTool.open();
        });
    }

    public complete() {
        if (!!this._editorTool) this._editorTool.close();
        if (!!this._selected) this._selected.setOptions({ strokeColor: this.strokeColor });
    }

    public remove(index?: number) {
        this.complete();
        var polygon = this.get_polygon(index);
        if (!polygon) return;
        AliHub.Collection.ListHelper.remove(this._polygons, [polygon], true);
        this._selected.setMap(null);
        this._selected = this._polygons[this._polygons.length - 1];
    }

    public clear() {
        while (this._polygons.length > 0) {
            this.remove();
        }
    }

    public district() {
        return this._district;
    }

    public search() {
        return this._district;
    }

    private _initMap() {
        var mapContainer = this.appendElement("div");
        mapContainer.id = this.get_id() + "_map";
        mapContainer.className = "ali-container-main";
        var viewSettings: any = {
            zoom: 13
        };
        if (!this._settings.viewCenter) viewSettings.center = this._settings.viewCenter;
        if (!this._settings.viewZoom) viewSettings.zoom = this._settings.viewZoom;
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
        this._map.plugin(["AMap.MouseTool"], () => {
            var mouseTool = new AMap.MouseTool(this._map); 
            mouseTool.polygon(this.polygonOption);
            AMap.event.addListener(mouseTool, "draw",(e) => {
                arr = e.obj.getPath();
                var polygon = new AMap.Polygon({
                    map: this._map,
                    path: arr,
                    extData: new Date(),
                    strokeColor: this.strokeColor,
                    strokeOpacity: 1,
                    strokeWeight: 1,
                    fillColor: this.getColor(),
                    fillOpacity: 0.4
                });
                this._polygons.push(polygon);
                this.complete();
                if (this._selected != null) {
                    this._selected.setOptions({ strokeColor: this.strokeColor });
                }

                this._selected = polygon;
                var pointsCount = this._selected.getPath().length;
                this._resultContainer.innerHTML = "" + this._selected.getPath() +"";
                AliHub.Diagnostics.Tracker.debugInfo("Added a polygon with " + pointsCount + " points .", polygon);

                AMap.event.addListener(polygon, "dblclick", (e) => {
                    this.complete();
                    this._selected = polygon;
                    this._selected.setOptions({ strokeColor: this.strokeColor });
                    polygon.setOptions(this.polygonOption);
                    this._editorTool = new AMap.PolyEditor(this._map, this._selected);
                });

                this._map.plugin(["AMap.PolyEditor"], () => {
                    e.obj.hide();
                    this._editorTool = new AMap.PolyEditor(this._map, this._selected);
                });

            });
        });

    }

    private _initMenu() {
        var menuContainer = this.appendElement("div");
        menuContainer.id = this.get_id() + "_menu";
        menuContainer.className = "ali-container-menu";
        this._refreshMenu();
    }

    private _refreshMenu(col?: AliHub.Collection.PropertiesContract<AliHub.Common.Action>) {
        var menuContainer = this.getChildElement(true, "menu");
        if (!col) col = [
            { key: AliHub.Res.builtIn().localString("save"), value: () => { this.complete(); } },
            { key: AliHub.Res.builtIn().localString("modifyItem"), value: () => { this.edit(); } },
            { key: AliHub.Res.builtIn().localString("removeItem"), value: () => { this.remove(); } }
        ];
        col.forEach((value, index, Array) => {
            var menuItemElement = document.createElement("input");
            menuItemElement.value = value.key;
            menuItemElement.onclick = value.value;
            menuItemElement.type = "button";
            menuContainer.appendChild(menuItemElement);
        });
    }

    private _initResult() {
        this._resultContainer = this.appendElement("div");
        this._resultContainer.id = this.get_id() + "_result";
        this._resultContainer.className = "ali-map-selector-info";
    }

}

_init();
