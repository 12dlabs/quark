/*  --------------------
 *  Panels - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  panels.ts
 *  Description  Panels library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

/// <reference path="common.ts" />

namespace AliHub.Panels {

    export interface SingleFlowPanelOptionsContract<T> extends Common.VisualControlOptionsContract<SingleFlowPanel<T>> {
    }

    /**
      * Simple flow panel.
      */
    export class SingleFlowPanel<T> extends Common.VisualControl {

        private _content: T;

        private _contentId: string;

        private _sideBarId: string;

        private _sidebar: Common.VisualControl[] = [];

        private _counter = 0;

        /**
          * Initializes a new instance of the SingleFlowPanel class.
          * @param id  Element ID. The content will be filled into this element to replace original ones. 
          */
        constructor(id: Common.VisualControlElementContract) {
            super(id);
            this.get_element().innerHTML = "";
            this.add_styleRef(["ali-content-dashboard", "ali-container-main"]);
            this._renderLayoutTable();
        }

        /**
          * Gets panel content.
          */
        public getContent(): T {
            return this._content;
        }

        /**
          * Sets panel content.
          */
        public setContent(value: (id: string) => T): void {
            if (!value) return;
            this._content = value(this._contentId);
        }

        public addSidePanel<TControl extends Common.VisualControl>(generator: (id: string) => TControl): TControl {
            if (!generator || !this._sideBarId) return null;
            var sideBarEle = Elements.getById<HTMLDivElement>(this._sideBarId);
            if (!sideBarEle) return null;
            var container = document.createElement("div");
            var now = new Date();
            this._counter++;
            container.id = sideBarEle.id + "_i" + this._counter.toString() + "t" + now.getSeconds().toString() + "0" + now.getMilliseconds();
            container.className = "ali-container-main";
            sideBarEle.appendChild(container);
            var control = generator(container.id);
            if (!control) {
                container.outerHTML = "";
                return null;
            }

            this._sidebar.push(control);
            return control;
        }

        public getSidePanel<TControl extends Common.VisualControl>(index: number): TControl {
            if (index < 0 || index > this._sidebar.length) return null;
            return <TControl>this._sidebar[index];
        }

        private _renderLayoutTable(): void {
            Diagnostics.info("CoreLibrary", "[0x02210101] Render single flow panel.");
            var row = document.createElement("tr");
            row.id = this.get_id() + "_table_b_r0";
            var tBody = document.createElement("tbody");
            tBody.appendChild(row);
            var table = document.createElement("table");
            table.id = this.get_id() + "_table";
            table.className = "ali-layout-t-grid ali-layout-s-tile";
            table.cellPadding = "0";
            table.cellSpacing = "0";
            table.appendChild(tBody);
            this.appendElement(table);

            var mainCol = document.createElement("td");
            mainCol.id = row.id + "_c0";
            mainCol.className = "ali-container-main";
            var mainColContent = document.createElement("div");
            mainColContent.id = mainCol.id + "_cnt";
            mainColContent.className = "ali-container-main";
            row.appendChild(mainCol);
            mainCol.appendChild(mainColContent);
            this._contentId = mainColContent.id;

            var sideCol = document.createElement("td");
            sideCol.id = row.id + "_c1";
            sideCol.className = "ali-container-side";
            row.appendChild(sideCol);
            this._sideBarId = sideCol.id;
        }

    }

    /**
      * Mini agenda.
      */
    export class MiniAgenda extends Common.VisualControl {

        /**
          * Initializes a new instance of the MiniAgenda class.
          * @param id  Element ID. The content will be filled into this element to replace original ones. 
          */
        constructor(id: string) {
            super(id);
            this._renderLayout();
        }

        private _renderLayout() {
            var now = new Date();
            var header = document.createElement("h4");
            this.get_element().appendChild(header);
            var container = document.createElement("div");
            container.className = "ali-container-main";
            this.get_element().appendChild(container);
            header.innerHTML = now.toLocaleDateString();
            container.innerHTML = "<div class=\"ali-container-main\"><span>" + AliHub.Res.builtIn().localString("empty") + "</span></div>";
        }

    }

    /**
      * Creates a SingleFlowPanel.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param parent  The parent control.
      * @param options  The initializition options.
      */
    export function singleFlowPanel<T>(idSuffix: string, parent?: Common.VisualControl, options?: SingleFlowPanelOptionsContract<T>): SingleFlowPanel<T> {
        return Common.createControl(idSuffix, SingleFlowPanel, parent, options) as any;
    }

}
 