/*  --------------------
 *  Player - XTracker - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  player.ts
 *  Description  XTracker client player.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./common"], factory);
    }
})(function (require, exports) {
    "use strict";
    var bizcommon = require("./common");
    function popupViewer() {
        var container = document.createElement("div");
        document.body.appendChild(container);
        var c = new ViewerControl(container);
        c.addStyleRef("ali-control-xtracker-player-full");
        c.appendElementByDefToChild("menu", {
            idSuffix: "prev",
            styleRef: "ali-x-action-prev",
            tagName: "button",
            events: {
                click: function () {
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
    exports.popupViewer = popupViewer;
    var ViewerControl = (function (_super) {
        __extends(ViewerControl, _super);
        /**
          * Initializes a new instance of the ViewerControl class.
          * @param id  The element to render.
          */
        function ViewerControl(id) {
            var _this = _super.call(this, id) || this;
            _this._set = {};
            _this._enumerable = [];
            _this.position = AliHub.Common.listenedObj(0);
            _this.addStyleRef("ali-control-xtracker-player");
            _this.position.format = function (newValue, oldValue) {
                return AliHub.Common.Maths.isValidNumber(newValue)
                    && newValue >= 0
                    && newValue < _this._enumerable.length
                    ? newValue : oldValue;
            };
            _this.position.subscribe(function (newValue) {
                var pos = _this.position();
                if (pos < 0)
                    _this.position(pos = 0);
                if (pos >= _this.position.length)
                    _this.position(pos = _this.position.length - 1);
                var rec = _this._enumerable[pos];
                if (!rec || !rec.type || !rec.created || !rec.data)
                    return;
                var timeEle = _this.getChildElement("view", "time");
                timeEle.innerHTML = AliHub.Common.Text.toHTML(AliHub.Common.DateTime.toLocaleString(rec.created));
                var hlEle = _this.getChildElement("view", "hl");
                hlEle.style.display = "none";
                switch (rec.type) {
                    case "screen":
                        var imgEle = _this.getChildElement("view", "image");
                        imgEle.innerHTML = "";
                        imgEle.appendChild(AliHub.Graph.imageElement(rec.data));
                        break;
                    case "input":
                        var inputInfo = rec.data;
                        switch (inputInfo.type) {
                            case "click":
                                hlEle.style.display = "inline-block";
                                hlEle.style.top = ((inputInfo.y || 0)).toString() + "px";
                                hlEle.style.left = ((inputInfo.x || 0)).toString() + "px";
                                break;
                        }
                        break;
                    case "log":
                        var logInfo = rec.data;
                        var logEle = _this.getChildElement("logs", "list");
                        var logLastEle = logEle.children.length > 0 ? logEle.children[0] : null;
                        var logNewEle = document.createElement("li");
                        logNewEle.title = AliHub.Common.DateTime.toLocaleString(logInfo.created);
                        logNewEle.innerHTML = "<em>" + logInfo.category + "</em><span>" + logInfo.message + "</span>";
                        logEle.insertBefore(logNewEle, logLastEle);
                        break;
                }
            });
            _this.appendElementByDef({
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
            }, {
                idSuffix: "logs",
                styleRef: "ali-x-section-logs",
                children: [
                    {
                        idSuffix: "list",
                        styleRef: "ali-container-main",
                        tagName: "ul"
                    }
                ]
            }, {
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
            });
            _this.listen("click", function (ev) {
                _this.position(_this.position() - 1);
            }, "menu", "prev");
            _this.listen("click", function (ev) {
                _this.position(_this.position() + 1);
            }, "menu", "next");
            return _this;
        }
        ViewerControl.prototype.loadFromWeb = function () {
        };
        ViewerControl.prototype.loadData = function (data) {
            var _this = this;
            this._set = data;
            this._enumerable = [];
            if (!data)
                return;
            if (data.imgInfo)
                data.imgInfo.forEach(function (item) {
                    if (!item || !item.created)
                        return;
                    var createdTime = AliHub.Common.DateTime.parse(item.created);
                    if (!createdTime)
                        return;
                    _this._enumerable.push({
                        created: createdTime,
                        type: "screen",
                        data: item
                    });
                });
            if (data.inputInfo)
                data.inputInfo.forEach(function (item) {
                    if (!item || !item.created)
                        return;
                    var createdTime = AliHub.Common.DateTime.parse(item.created);
                    if (!createdTime)
                        return;
                    _this._enumerable.push({
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
            this._enumerable.sort(function (a, b) {
                return a.created.getTime() - b.created.getTime();
            });
            this.position.model(0, true);
        };
        return ViewerControl;
    }(AliHub.Common.VisualControl));
    exports.ViewerControl = ViewerControl;
});
