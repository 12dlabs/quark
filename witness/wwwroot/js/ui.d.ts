import qDiag = AliHub.Diagnostics;
export declare function showButton(value?: boolean): void;
export declare class Visualization {
    id: string;
    isShow: boolean;
    private witnessSvg;
    private witnessLayer;
    private witnessAnalysisLayer;
    private witnessShowBtn;
    miniR: number;
    maxiR: number;
    private _miniR;
    private _maxiR;
    miniT: number;
    maxiT: number;
    private _miniT;
    private _maxiT;
    /**
     * The constructed function
     */
    constructor();
    /**
     * Map radius in a controlled range
     */
    private _getR(r);
    /**
    * Draw a circle.
    * @param  {object} ele   The hit analysis element
    * @param  {object} group The svg group for all circles
    */
    private _drawCircle(ele, group);
    /**
     * Map duration in a controlled range
     */
    private _getT(t);
    /**
    * Draw a line.
    * @param  {object} elementHitLink   The element hit link
    * @param  {object} group            The svg group for all lines
    */
    private _drawLine(elementHitLink, group);
    /**
    * Draw all lines from a hit element.
    * @param  {object} next  Lists next clients
    * @param  {object} group The svg group for all lines
    */
    private _drawLines(next, group);
    private _make(targetEle, degree, next, size);
    /**
    * Parse relation between the given element and all other elements to a certain degree
    * @param  {object}  ele    The hit analysis element
    * @param  {number}  degree The degree of the hierarchy structure
    * @param  {boolean} next   The direction tag
    */
    private _parseRelation(targetEle, degree, next);
    /**
     * The hit element analysis show.
     */
    private _hitElementAnalysisShow(ele);
    private _changeMode(value);
    appendVisibleButton(obs: any): void;
    /**
    * Show the witness visualization.
    * @param  {object} summary The element hit link analysis summary
    */
    toggle(isVisible: any, summary: qDiag.ElementHitAnalysisContract[]): void;
    static create: (client: any) => void;
}
export declare class Sunburst {
    private config;
    private colors;
    private colorIndex;
    private colorObj;
    private description;
    private container;
    private width;
    private height;
    private radius;
    private totalSize;
    private vis;
    private partition;
    private arc;
    constructor(config: any);
    private _initializeBreadcrumbTrail();
    private _drawLegend();
    private _updateBreadcrumbs(nodeArray, percentageString);
    private _mouseover(d);
    private _mouseleave(d);
    private _getAncestors(node);
    private _createVisualization(json);
    private init(json);
}
