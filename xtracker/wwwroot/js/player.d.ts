import bizcommon = require("./common");
export declare function popupViewer(): ViewerControl;
export declare class ViewerControl extends AliHub.Common.VisualControl {
    private _set;
    private _enumerable;
    position: AliHub.Common.ListenedObjectContract<number>;
    /**
      * Initializes a new instance of the ViewerControl class.
      * @param id  The element to render.
      */
    constructor(id: AliHub.Common.VisualControlElementContract);
    loadFromWeb(): void;
    loadData(data: bizcommon.Diagnostic.SetContract): void;
}
