/*  --------------------
 *  Player - XTracker - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  player.ts
 *  Description  XTracker client player.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

import bizcommon = require("./common");

export function popupViewer() {
    var container = document.createElement("div");
    document.body.appendChild(container);
    var c = new ViewerControl(container);
    c.addStyleRef("ali-control-xtracker-player-full");
    c.appendElementByDefToChild("menu", {
        idSuffix: "prev",
        styleRef: "ali-x-action-prev",
        tagName: "button",
        events: {
            click: () => {
                c.dispose();
            }
        },
        children: [
            {
                element: bizcommon.templates.svgElement("close")
            },
            {
                tagName: "span",
                innerHTML: bizcommon.templates.localStringInHTML("close")
            }
        ]
    });
    return c;
}

export class ViewerControl extends AliHub.Common.VisualControl {

    private _set = {} as bizcommon.Diagnostic.SetContract;

    private _enumerable: { created: Date, type: "screen" | "input" | "log", data: any }[] = [];

    public position = AliHub.Common.listenedObj<number>(0);

    /**
      * Initializes a new instance of the ViewerControl class.
      * @param id  The element to render.
      */
    public constructor(id: AliHub.Common.VisualControlElementContract) {
        super(id);
        this.addStyleRef("ali-control-xtracker-player");

        this.position.format = (newValue, oldValue) => {
            return AliHub.Common.Maths.isValidNumber(newValue)
                && newValue >= 0
                && newValue < this._enumerable.length
                ? newValue : oldValue;
        };
        this.position.subscribe((newValue) => {
            var pos = this.position();
            if (pos < 0) this.position(pos = 0);
            if (pos >= this.position.length) this.position(pos = this.position.length - 1);
            var rec = this._enumerable[pos];
            if (!rec || !rec.type || !rec.created || !rec.data) return;
            var timeEle = this.getChildElement("view", "time");
            timeEle.innerHTML = AliHub.Common.Text.toHTML(AliHub.Common.DateTime.toLocaleString(rec.created));
            var hlEle = this.getChildElement("view", "hl");
            hlEle.style.display = "none";
            switch (rec.type) {
                case "screen":
                    var imgEle = this.getChildElement("view", "image");
                    imgEle.innerHTML = "";
                    imgEle.appendChild(AliHub.Graph.imageElement(rec.data));
                    break;
                case "input":
                    var inputInfo = rec.data as bizcommon.Diagnostic.InputContract;
                    switch (inputInfo.type) {
                        case "click":
                            hlEle.style.display = "inline-block";
                            hlEle.style.top = ((inputInfo.y || 0)).toString() + "px";
                            hlEle.style.left = ((inputInfo.x || 0)).toString() + "px";
                            break;
                    }

                    break;
                case "log":
                    var logInfo = rec.data as AliHub.Diagnostics.LogRecordContract;
                    var logEle = this.getChildElement("logs", "list");
                    var logLastEle = logEle.children.length > 0 ? logEle.children[0] : null;
                    var logNewEle = document.createElement("li");
                    logNewEle.title = AliHub.Common.DateTime.toLocaleString(logInfo.created as Date);
                    logNewEle.innerHTML = `<em>${logInfo.category}</em><span>${logInfo.message}</span>`;
                    logEle.insertBefore(logNewEle, logLastEle);
                    break;
            }
        });

        this.appendElementByDef(
            {
                idSuffix: "view",
                styleRef: "ali-x-section-view",
                children: [
                    {
                        idSuffix: "time",
                        styleRef: "ali-x-field-time",
                        tagName: "span"
                    },
                    {
                        idSuffix: "image",
                        styleRef: "ali-x-field-image",
                        tagName: "span"
                    },
                    {
                        idSuffix: "hl",
                        styleRef: "ali-x-field-hl",
                        style: {
                            position: "absolute",
                            display: "none"
                        },
                        tagName: "span",
                        innerHTML: "&nbsp;"
                    }
                ]
            },
            {
                idSuffix: "logs",
                styleRef: "ali-x-section-logs",
                children: [
                    {
                        idSuffix: "list",
                        styleRef: "ali-container-main",
                        tagName: "ul"
                    }
                ]
            },
            {
                idSuffix: "menu",
                styleRef: "ali-x-section-menu",
                children: [
                    {
                        idSuffix: "prev",
                        styleRef: "ali-x-action-prev",
                        tagName: "button",
                        children: [
                            {
                                element: bizcommon.templates.svgElement("left")
                            },
                            {
                                tagName: "span",
                                innerHTML: bizcommon.templates.localStringInHTML("previous")
                            }
                        ]
                    },
                    {
                        idSuffix: "next",
                        styleRef: "ali-x-action-next",
                        tagName: "button",
                        children: [
                            {
                                element: bizcommon.templates.svgElement("right")
                            },
                            {
                                tagName: "span",
                                innerHTML: bizcommon.templates.localStringInHTML("next")
                            }
                        ]
                    }
                ]
            }
        );
        this.listen("click", (ev) => {
            this.position(this.position() - 1);
        }, "menu", "prev");
        this.listen("click", (ev) => {
            this.position(this.position() + 1);
        }, "menu", "next");
    }

    public loadFromWeb() {

    }

    public loadData(data: bizcommon.Diagnostic.SetContract) {
        this._set = data;
        this._enumerable = [];
        if (!data) return;

        if (data.imgInfo) data.imgInfo.forEach((item) => {
            if (!item || !item.created) return;
            var createdTime = AliHub.Common.DateTime.parse(item.created);
            if (!createdTime) return;
            this._enumerable.push({
                created: createdTime,
                type: "screen",
                data: item
            });
        });

        if (data.inputInfo) data.inputInfo.forEach((item) => {
            if (!item || !item.created) return;
            var createdTime = AliHub.Common.DateTime.parse(item.created);
            if (!createdTime) return;
            this._enumerable.push({
                created: createdTime,
                type: "input",
                data: item
            });
        });

        //if (data.logInfo) data.logInfo.forEach((item) => {
        //    if (!item || !item.created) return;
        //    var createdTime = AliHub.Common.DateTime.parse(item.created);
        //    if (!createdTime) return;
        //    this._enumerable.push({
        //        created: createdTime,
        //        type: "log",
        //        data: item
        //    });
        //});

        this._enumerable.sort((a, b) => {
            return a.created.getTime() - b.created.getTime();
        });
        this.position.model(0, true);
    }
}
