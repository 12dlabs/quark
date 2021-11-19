export interface Settings {
    viewCenter?: number[];
    viewZoom?: number;
}
export declare class MapControl extends AliHub.Common.VisualControl {
    private _map;
    private _district;
    private _selected;
    private _polygons;
    private _editorTool;
    private _resultContainer;
    private _usedColors;
    private _settings;
    strokeColor: string;
    randomColors: string[];
    polygonOption: {
        strokeColor: string;
        strokeOpacity: number;
        strokeWeight: number;
    };
    constructor(id: string, settings?: Settings);
    getColor(): string;
    setPoint(longitude?: number, latitude?: number): any;
    polygons(): any[];
    addPolygon(arr: string[][], color?: string): void;
    map(): any;
    getCenter(): any;
    select(index?: number): any;
    get_polygon(index?: number): any;
    edit(index?: number): void;
    complete(): void;
    remove(index?: number): void;
    clear(): void;
    district(): any;
    search(): any;
    private _initMap();
    private _initMenu();
    private _refreshMenu(col?);
    private _initResult();
}
