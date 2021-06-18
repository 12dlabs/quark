var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*  --------------------
 *  Core Library - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  common.ts
 *  Description  Client core script library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
var AliHub;
(function (AliHub) {
    var Common;
    (function (Common) {
        /**
          * The sensitive levels.
          */
        var SensitiveLevels;
        (function (SensitiveLevels) {
            SensitiveLevels[SensitiveLevels["Unknown"] = 0] = "Unknown";
            SensitiveLevels[SensitiveLevels["Hbi"] = 1] = "Hbi";
            SensitiveLevels[SensitiveLevels["Mbi"] = 2] = "Mbi";
            SensitiveLevels[SensitiveLevels["Lbi"] = 3] = "Lbi";
            SensitiveLevels[SensitiveLevels["None"] = 7] = "None";
        })(SensitiveLevels = Common.SensitiveLevels || (Common.SensitiveLevels = {}));
        /**
          * The time precisions.
          */
        var TimePrecisions;
        (function (TimePrecisions) {
            TimePrecisions[TimePrecisions["Unknown"] = 0] = "Unknown";
            TimePrecisions[TimePrecisions["Millisecond"] = 1] = "Millisecond";
            TimePrecisions[TimePrecisions["Second"] = 2] = "Second";
            TimePrecisions[TimePrecisions["Minute"] = 3] = "Minute";
            TimePrecisions[TimePrecisions["Hour"] = 4] = "Hour";
            TimePrecisions[TimePrecisions["Day"] = 5] = "Day";
        })(TimePrecisions = Common.TimePrecisions || (Common.TimePrecisions = {}));
        var Inner = (function () {
            function Inner() {
            }
            return Inner;
        }());
        Inner.templateEngines = { "none": function (c) { } };
        /**
          * Visual control.
          */
        var VisualControl = (function () {
            /**
              * Initializes a new instance of the VisualControl class.
              * @param id  Element ID. The content will be filled into this element to replace original ones.
              */
            function VisualControl(id) {
                var _this = this;
                this._increaseNumber = 0;
                this._increaseNumberReset = false;
                this._properties = {};
                this._propertyHandlers = {};
                this._templateParts = {};
                /**
                  * Adds or removes an event occured when the property is changed.
                  */
                this.propChanged = new AliHub.Collection.EventHandlers();
                /**
                  * Adds or removes an event occured when there are nodes appended.
                  */
                this.nodeAppended = new AliHub.Collection.EventHandlers();
                /**
                  * A disposable array which will be loaded during this instance is disposed.
                  */
                this.disposableContainer = new AliHub.Collection.DisposableArray();
                var containerId = Common.Maths.randomString("ali_content_ele_n_ri");
                var container = null;
                if (!id) {
                }
                else if (typeof id === "string") {
                    containerId = id;
                    if (containerId.indexOf("__view_control_") === 0) {
                        var parentId = Common.parentControl(containerId);
                        containerId = containerId.replace("__view_control_", parentId ? parentId.getId() : "");
                    }
                }
                else if (id.tagName) {
                    container = id;
                    var parentControl = Common.parentControl(container);
                    if (!container.id && !container.getAttribute("data-control-id")) {
                        container.id = Common.Maths.randomString(parentControl && parentControl.getId() ? parentControl.getId() : "ali_content_ele_e_ri");
                    }
                    else if (!container.id && container.getAttribute("data-control-id")) {
                        container.id = AliHub.Elements.mergeId(parentControl && parentControl.getId() ? parentControl.getId() : "", [container.getAttribute("data-control-id")]);
                    }
                    containerId = container.id;
                }
                else if (id.parent && id.suffix) {
                    var parentInfo = id;
                    var ele = AliHub.Elements.getById(parentInfo.parent);
                    if (ele.body || ele.documentElement || ele.parent) {
                        containerId = (parentInfo.suffix.toString().indexOf("_") === 0 ? "ali_container_ele_b" : "") + parentInfo.suffix.toString();
                    }
                    else if (ele) {
                        containerId = ele.id + (parentInfo.suffix.toString().indexOf("_") === 0 ? "" : "_") + parentInfo.suffix.toString();
                        container = AliHub.Elements.getById(containerId);
                        if (!container) {
                            container = document.createElement("div");
                            container.id = containerId;
                            ele.appendChild(container);
                        }
                        AliHub.Elements.changeStyleRef(container, parentInfo.styleRef);
                    }
                }
                if (!container)
                    container = AliHub.Elements.getById(containerId);
                this._containerElement = container;
                if (!container) {
                    return;
                }
                this.addStyleRef("ali-controls-item");
                if (container.children)
                    for (var step = 0; step < container.children.length; step++) {
                        var templateP = container.children[step];
                        if (templateP && templateP.tagName && (templateP.tagName.toString().toLowerCase() === "template" || templateP.tagName.toString().toLowerCase() === "section" || templateP.tagName.toString().toLowerCase() === "div" || templateP.tagName.toString().toLowerCase() === "part") && templateP.innerHTML) {
                            var templateKey = AliHub.Elements.getAttr(templateP, ["data-part", "data-key", "part", "key"]);
                            if (templateKey != null) {
                                if (!templateKey)
                                    templateKey = "_";
                                this._templateParts[templateKey] = templateP.innerHTML.toString().replace("__view_control_", this._containerElement.id).replace("{{_id}}", this._containerElement.id).replace("{{id()}}", this._containerElement.id);
                            }
                        }
                    }
                var initializers = ControlManager.initializers();
                if (initializers && initializers instanceof Array)
                    initializers.forEach(function (inith, ihi, iha) {
                        if (!inith || !inith.process)
                            return;
                        try {
                            inith.process(_this);
                        }
                        catch (ex) {
                            var errMsg = "Unknown reason.";
                            if (ex && ex.message)
                                errMsg = ex.message;
                            AliHub.Diagnostics.error("CoreLibrary", "[0x02450102] Failed to load control initializer #" + ihi + ". (" + errMsg + ")");
                        }
                    });
                try {
                    container._control = this;
                }
                catch (ex) { }
            }
            /**
              * Gets the identifier.
              */
            VisualControl.prototype.getId = function () {
                return this._containerElement ? this._containerElement.id : null;
            };
            /**
              * Gets a number increased.
              */
            VisualControl.prototype.increaseNumber = function (doNothingWhenTooLarge) {
                if (doNothingWhenTooLarge === void 0) { doNothingWhenTooLarge = false; }
                var needReset = false;
                if (this._increaseNumber < Number.MAX_VALUE) {
                    try {
                        this._increaseNumber++;
                    }
                    catch (ex) {
                        needReset = true;
                    }
                }
                else {
                    needReset = true;
                }
                if (needReset && !doNothingWhenTooLarge) {
                    this._increaseNumber = 0;
                    this._increaseNumberReset = true;
                }
                return this._increaseNumber;
            };
            /**
              * Gets a value indicating whether the increased number has been reset.
              */
            VisualControl.prototype.increaseNumberIsReset = function () {
                return this._increaseNumberReset;
            };
            /**
              * Gets the control element.
              */
            VisualControl.prototype.getElement = function () {
                return this._containerElement;
            };
            /**
              * Gets the tag name of the control element.
              */
            VisualControl.prototype.getTagName = function () {
                var ele = this.getElement();
                if (!ele)
                    return undefined;
                return ele.tagName;
            };
            /**
              * Gets the control element.
              */
            VisualControl.prototype.dispose = function () {
                if (this.disposableContainer)
                    this.disposableContainer.dispose();
                if (!this._containerElement)
                    return;
                try {
                    this._containerElement.remove();
                }
                catch (ex) {
                    if (this._containerElement.outerHTML)
                        this._containerElement.outerHTML = "";
                }
                this._containerElement = null;
            };
            /**
              * Gets or sets the specific additional property.
              * @param key  The property name.
              * @param value  The value of the property to set if has.
              */
            VisualControl.prototype.prop = function (name, value) {
                var _this = this;
                if (arguments.length > 1) {
                    var old = this._properties[name];
                    if (old !== value) {
                        this._properties[name] = value;
                        this.propChanged.raise({ key: name, value: this._properties[name], old: old });
                        var hs = this._propertyHandlers[name];
                        if (hs && hs instanceof Array) {
                            hs.forEach(function (h) {
                                if (h)
                                    h({ key: name, value: _this._properties[name], old: old });
                            });
                        }
                    }
                }
                return this._properties[name];
            };
            /**
              * Removes the specific additional property.
              * @param name  The property name.
              */
            VisualControl.prototype.removeProp = function (name) {
                delete this._properties[name];
            };
            /**
              * Gets the specific additional property.
              * @param name  The property name.
              * @param includeInherit  A value indicating whether try to get from parent if it does not exist in current control.
              */
            VisualControl.prototype.getProp = function (name, includeInherit) {
                var propV = this._properties[name];
                if (propV !== undefined || !includeInherit)
                    return propV;
                var c = this.parentControl();
                return c && c.getProp && typeof c.getProp === "function" ? c.getProp(name, true) : undefined;
            };
            VisualControl.prototype.propProp = function (name, propKey, includeInherit) {
                var propV = this.getProp(name, includeInherit);
                return (propV || {})[propKey];
            };
            /**
              * Gets the specific additional property information.
              * @param name  The property name.
              */
            VisualControl.prototype.propInfo = function (name) {
                var _this = this;
                var propV = this._properties[name];
                if (propV !== undefined)
                    return {
                        owner: this,
                        name: name,
                        value: propV,
                        update: function (v) {
                            return _this.prop(name, v);
                        },
                        listen: function (h) {
                            _this.listenProp(name, h);
                        }
                    };
                var c = this.parentControl();
                return c && c.propInfo && typeof c.propInfo === "function" ? c.propInfo(name) : {
                    owner: undefined,
                    name: name,
                    value: undefined,
                    update: function (v) {
                        return undefined;
                    },
                    listen: function (h) {
                    }
                };
            };
            /**
              * Gets the specific additional property.
              * @param name  The property name.
              * @param defaultFunc  A function to generate devault value if there is no such property.
              * @param defaultStaticValue  A static value for default.
              */
            VisualControl.prototype.getPropWithDefaultValue = function (name, defaultFunc, defaultStaticValue) {
                if (this._properties[name] !== undefined)
                    return this._properties[name];
                if (defaultFunc)
                    this._properties[name] = defaultFunc(this, name);
                if (defaultStaticValue && this._properties[name] === undefined)
                    this._properties[name] = defaultStaticValue;
                return this._properties[name];
            };
            /**
              * Gets or sets the specific additional property.
              * @param includeInherit  true if include inherit properties; otherwise, false.
              */
            VisualControl.prototype.propKeys = function (includeInherit) {
                var list = [];
                for (var prop in this._properties) {
                    if (prop && typeof prop === "string")
                        list.push(prop);
                }
                if (includeInherit) {
                    var c = this.parentControl();
                    if (c && c.propKeys && typeof c.propKeys === "function") {
                        var list2 = c.propKeys(true);
                        AliHub.Collection.pushRange(list, list2, true, true);
                    }
                }
                return list;
            };
            /**
              * Gets a copy of additional properties.
              * @param includeInherit  true if include inherit properties; otherwise, false.
              */
            VisualControl.prototype.propObj = function (includeInherit) {
                var _this = this;
                if (!includeInherit)
                    return Reflection.copy(this._properties);
                var c = this.parentControl();
                if (!c)
                    return Reflection.copy(this._properties);
                var obj = c.propObj(true);
                this.propKeys().forEach(function (key) {
                    if (!key || typeof key !== "string")
                        return;
                    obj[key] = _this._properties[key];
                });
                return obj;
            };
            /**
              * Registers handler for a specific additional property changed.
              */
            VisualControl.prototype.listenProp = function (key) {
                var h = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    h[_i - 1] = arguments[_i];
                }
                if (!key || !h)
                    return 0;
                var col = this._propertyHandlers[key];
                if (!col || !(col instanceof Array)) {
                    col = [];
                    this._propertyHandlers[key] = col;
                }
                var count = 0;
                h.forEach(function (item) {
                    if (!item || typeof item !== "function")
                        return;
                    col.push(item);
                    count++;
                });
                return count;
            };
            /**
              * Removes handler registered for a specific additional property changed.
              */
            VisualControl.prototype.unlistenProp = function (key) {
                var h = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    h[_i - 1] = arguments[_i];
                }
                if (!key || !h)
                    return 0;
                var col = this._propertyHandlers[key];
                if (!col || !(col instanceof Array)) {
                    col = [];
                    this._propertyHandlers[key] = col;
                }
                var removed = AliHub.Collection.remove(col, h, true);
                return removed ? (removed.length || 0) : 0;
            };
            /**
              * Clears all handlers registered for a specific additional property changed.
              */
            VisualControl.prototype.clearListenProp = function (key) {
                if (!key)
                    return;
                delete this._propertyHandlers[key];
            };
            /**
              * Gets the source control which has the property.
              * @param key  The property name.
              */
            VisualControl.prototype.getPropSourceControl = function (name) {
                var propV = this._properties[name];
                if (propV !== undefined)
                    return this;
                var c = this.parentControl();
                return c && c.getPropSourceControl && typeof c.getPropSourceControl === "function" ? c.getPropSourceControl(name) : undefined;
            };
            /**
              * Gets common information of this control.
              * This result will be used for serialization.
              */
            VisualControl.prototype.getCommonInfo = function () {
                return {
                    id: this.getId(),
                    tagName: this.getTagName(),
                    props: this.propObj(true),
                    type: "VisualControl"
                };
            };
            VisualControl.prototype.toJSON = function () {
                var obj = this.getCommonInfo();
                try {
                    return Common.Text.serialize(obj);
                }
                catch (ex) {
                    obj.propKeys = this.propKeys(true);
                    return Common.Text.serialize(obj);
                }
            };
            /**
              * Modifies style class.
              * @param adding  A list of style class to add.
              * @param removing  A list of style class to remove.
              */
            VisualControl.prototype.styleRef = function (adding, removing) {
                var childId = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    childId[_i - 2] = arguments[_i];
                }
                var ele = this.getChildElement.apply(this, [true].concat(childId));
                return AliHub.Elements.changeStyleRef(ele, adding, removing);
            };
            /**
              * Sets style class from given candidates.
              * @param key  A key to select from the candidates.
              * @param candidates  A dictionary of candidates.
              */
            VisualControl.prototype.pickStyleRef = function (key, candidates) {
                var childId = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    childId[_i - 2] = arguments[_i];
                }
                var ele = this.getChildElement.apply(this, [true].concat(childId));
                if (!ele || !candidates)
                    return [];
                var removing = [];
                for (var prop in candidates) {
                    if (!prop || typeof prop !== "string" || prop === key)
                        continue;
                    var list = candidates[prop];
                    removing.push(AliHub.Collection.toStringArray(list, true));
                }
                return AliHub.Elements.changeStyleRef(ele, AliHub.Collection.toStringArray(candidates[key], true), removing);
            };
            /**
              * Adds style class.
              * @param value  A list of style class to add.
              */
            VisualControl.prototype.addStyleRef = function () {
                var value = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    value[_i] = arguments[_i];
                }
                var ele = this.getElement();
                return AliHub.Elements.changeStyleRef(ele, value);
            };
            /**
              * Removes style class.
              * @param value  A list of style class to remove.
              */
            VisualControl.prototype.removeStyleRef = function () {
                var value = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    value[_i] = arguments[_i];
                }
                var ele = this.getElement();
                return AliHub.Elements.changeStyleRef(ele, [], value);
            };
            /**
              * Modifies style class.
              * @param adding  A list of style class to add.
              * @param removing  A list of style class to remove.
              */
            VisualControl.prototype.styleClass = function (adding, removing) {
                var childId = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    childId[_i - 2] = arguments[_i];
                }
                return this.styleRef.apply(this, [adding, removing].concat(childId));
            };
            /**
              * Sets style class from given candidates.
              * @param key  A key to select from the candidates.
              * @param candidates  A dictionary of candidates.
              */
            VisualControl.prototype.pickStyleClass = function (key, candidates) {
                var childId = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    childId[_i - 2] = arguments[_i];
                }
                return this.pickStyleRef.apply(this, [key, candidates].concat(childId));
            };
            /**
              * Adds style class.
              * @param value  A list of style class to add.
              */
            VisualControl.prototype.addStyleClass = function () {
                var value = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    value[_i] = arguments[_i];
                }
                return this.addStyleRef.apply(this, value);
            };
            /**
              * Removes style class.
              * @param value  A list of style class to remove.
              */
            VisualControl.prototype.removeStyleClass = function () {
                var value = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    value[_i] = arguments[_i];
                }
                return this.removeStyleRef.apply(this, value);
            };
            /**
              * Change style property.
              * @param key  Style property key.
              * @param value  Style property value.
              */
            VisualControl.prototype.styleProp = function (key, value) {
                var ele = this.getElement();
                if (!ele)
                    return null;
                try {
                    if (arguments.length > 1)
                        ele.style[key] = value;
                    return ele.style[key];
                }
                catch (ex) {
                    return null;
                }
            };
            /**
              * Gets parent control.
              */
            VisualControl.prototype.parentControl = function () {
                return Common.parentControl(this);
            };
            /**
              * Gets grand parent control.
              */
            VisualControl.prototype.grandParentControl = function () {
                return Common.parentControl(Common.parentControl(this));
            };
            /**
              * Gets parent element.
              */
            VisualControl.prototype.parentElement = function () {
                var ele = this.getElement();
                return ele ? ele.parentElement : null;
            };
            /**
              * Gets parent node.
              */
            VisualControl.prototype.parentNode = function () {
                var ele = this.getElement();
                return ele ? ele.parentNode : null;
            };
            /**
              * Gets or sets template part.
              * @param key  The key.
              */
            VisualControl.prototype.templatePart = function (key, value) {
                if (!key)
                    key = "_";
                if (arguments.length > 1) {
                    this._templateParts[key] = value;
                }
                return this._templateParts[key];
            };
            /**
              * Loads specific options.
              * @param options  The options to load.
              */
            VisualControl.prototype.loadOptions = function (value) {
                if (!value)
                    return null;
                var options;
                if (typeof value === "function")
                    value = Reflection.unwrapObject(value, this);
                try {
                    if (typeof value === "boolean") {
                        if (this._containerElement) {
                            options = AliHub.Elements.parseAttr(this._containerElement, "control-options", true);
                        }
                    }
                    else if (typeof value === "string") {
                        options = eval("(" + value + ")");
                    }
                    else {
                        options = value;
                    }
                }
                catch (ex) { }
                if (options == null)
                    return null;
                if (typeof options === "function")
                    options = Reflection.unwrapObject(options, this);
                if (options == null || typeof options !== "object")
                    return null;
                if (options.preInit)
                    options.preInit(this);
                if (options.attr && this._containerElement)
                    for (var prop in options.attr) {
                        if (prop || typeof prop !== "string" || options.attr[prop] != null || typeof options.attr[prop] !== "string")
                            continue;
                        try {
                            this._containerElement.setAttribute(prop, options.attr[prop]);
                        }
                        catch (ex) { }
                    }
                this.addStyleRef.apply(this, AliHub.Collection.toArray(options.styleRef));
                return options;
            };
            /**
              * Appends an element as child.
              * @param child  An element to add; or tag name of element to add.
              */
            VisualControl.prototype.appendElement = function (child, idSuffix, styleRef, events, attributes) {
                var ele = this.getElement();
                if (!ele)
                    return null;
                if (child == null)
                    child = "div";
                var element = typeof child === "string" ? document.createElement(child) : child;
                if (idSuffix != null)
                    element.id = this.getId() + "_" + idSuffix.toString();
                ele.appendChild(element);
                if (styleRef)
                    AliHub.Elements.changeStyleRef(element, styleRef);
                this.nodeAppended.raise([element]);
                if (events) {
                    for (var prop in events) {
                        if (prop && typeof prop === "string" && events[prop] && typeof events[prop] === "string")
                            AliHub.Elements.listen(element, prop, events[prop]);
                    }
                }
                if (attributes) {
                    for (var prop in attributes) {
                        if (prop && typeof prop === "string" && attributes[prop] && typeof attributes[prop] === "string")
                            element.setAttribute(prop, attributes[prop]);
                    }
                }
                return element;
            };
            /**
              * Appends HTML as children.
              * @param html  An HTML string to append.
              */
            VisualControl.prototype.appendHTML = function (html) {
                var ele = this.getElement();
                if (!ele)
                    return null;
                var tempEle = document.createElement("div");
                tempEle.innerHTML = html;
                var nodeList = [];
                if (tempEle.childNodes)
                    for (var i = 0; i < tempEle.childNodes.length; i++) {
                        var nodeToPush = tempEle.childNodes[i];
                        if (!nodeToPush)
                            continue;
                        nodeList.push(nodeToPush);
                    }
                nodeList.forEach(function (item) {
                    ele.appendChild(item);
                });
                tempEle.innerHTML = "";
                this.nodeAppended.raise(nodeList);
                return nodeList;
            };
            /**
              * Appends elements as child.
              * @param children  The element definitions to add.
              */
            VisualControl.prototype.appendElementByDef = function () {
                var children = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    children[_i] = arguments[_i];
                }
                return this.appendElementByDefToChild.apply(this, [null].concat(children));
            };
            /**
              * Appends elements as child to a specific child.
              * @param idSuffix  The identifier suffix.
              * @param children  The element definitions to add.
              */
            VisualControl.prototype.appendElementByDefToChild = function (idSuffix) {
                var children = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    children[_i - 1] = arguments[_i];
                }
                var ele = this.getChildElement(idSuffix);
                if (!ele || !children)
                    return [];
                var render;
                render = function (parent, id, items) {
                    var eles = [];
                    items.forEach(function (item) {
                        if (!item)
                            return;
                        if (typeof item === "string") {
                            var tempEle = document.createElement("div");
                            tempEle.innerHTML = item;
                            if (tempEle.childNodes)
                                for (var i = 0; i < tempEle.childNodes.length; i++) {
                                    var nodeToPush = tempEle.childNodes[i];
                                    if (!nodeToPush || !nodeToPush.tagName)
                                        continue;
                                    eles.push(nodeToPush);
                                }
                            eles.forEach(function (item) {
                                parent.appendChild(item);
                            });
                            tempEle.innerHTML = "";
                            return;
                        }
                        var eleItem = item.element || document.createElement((item.tagName ? item.tagName.toString().toLowerCase() : null) || "div");
                        if (!eleItem.tagName)
                            return;
                        if (item.element && item.tagName && item.tagName.toString().toLowerCase() !== item.element.tagName.toString().toLocaleLowerCase())
                            return;
                        var curId = id;
                        if (item.idSuffix) {
                            curId = AliHub.Elements.mergeId(id, [item.idSuffix]);
                            eleItem.id = curId;
                        }
                        parent.appendChild(eleItem);
                        eles.push(eleItem);
                        AliHub.Elements.changeStyleRef(eleItem, item.className);
                        AliHub.Elements.changeStyleRef(eleItem, item.styleRef);
                        if (item.style) {
                            for (var prop in item.style) {
                                if (!prop || typeof prop !== "string" || !item.style[prop] || typeof item.style[prop] !== "string")
                                    continue;
                                eleItem.style[prop] = item.style[prop];
                            }
                        }
                        if (item.attr) {
                            for (var prop in item.attr) {
                                if (!prop || typeof prop !== "string" || !item.attr[prop] || typeof item.attr[prop] !== "string")
                                    continue;
                                eleItem.setAttribute(prop, item.attr[prop]);
                            }
                        }
                        if (item.attrObjs) {
                            for (var prop in item.attrObjs) {
                                if (!prop || typeof prop !== "string" || !item.attrObjs.hasOwnProperty || !item.attrObjs.hasOwnProperty(prop))
                                    continue;
                                AliHub.Elements.setAttr(eleItem, prop, item.attrObjs[prop]);
                            }
                        }
                        if (item.events) {
                            var eventsInfo = item.events;
                            if (typeof eventsInfo === "function")
                                eventsInfo = eventsInfo(eleItem);
                            for (var prop in eventsInfo) {
                                if (!prop || typeof prop !== "string" || !eventsInfo[prop] || typeof eventsInfo[prop] !== "function")
                                    continue;
                                AliHub.Elements.listen(eleItem, prop, eventsInfo[prop]);
                            }
                        }
                        if (item.onClick)
                            AliHub.Elements.onClick(eleItem, item.onClick);
                        if (item.gesture)
                            AliHub.Elements.addGesture(eleItem, item.gesture);
                        if (item.value) {
                            var obsV = item.value;
                            if (typeof obsV === "function" && obsV.listen && obsV.model) {
                                eleItem.value = (obsV.model() || "").toString();
                                AliHub.Elements.listen(eleItem, "change", function (ev) {
                                    obsV.model(eleItem.value);
                                });
                                obsV.listen(function (newValue) {
                                    if (eleItem)
                                        eleItem.value = (newValue || "").toString();
                                }, item, null, null, function () {
                                    return !eleItem || !eleItem.parentElement;
                                });
                            }
                            else {
                                eleItem.value = item.value.toString();
                            }
                        }
                        if (item.prepared)
                            item.prepared(eleItem);
                        if (item.innerHTML) {
                            if (typeof item.innerHTML === "string" || typeof item.innerHTML === "number") {
                                eleItem.innerHTML = item.innerHTML.toString();
                            }
                            else if (item.innerHTML.value) {
                                var renderHTML = function (innerHTML, encode, template) {
                                    var eleItemHTML = !innerHTML ? "" : (encode ? (typeof encode === "function" ? encode(innerHTML) : Common.Text.toHTML(innerHTML, true)) : innerHTML.toString());
                                    if (template) {
                                        var eleItemHTML2 = template.toString().replace("{0}", eleItemHTML).replace("{0}", eleItemHTML).replace("{0}", eleItemHTML);
                                        eleItemHTML = eleItemHTML2;
                                    }
                                    eleItem.innerHTML = eleItemHTML;
                                };
                                if (typeof item.innerHTML.value === "string") {
                                    renderHTML(item.innerHTML.value, item.innerHTML.encode, item.innerHTML.template);
                                }
                                else if (item.innerHTML.value.model && item.innerHTML.value.listen) {
                                    var obsV = item.innerHTML.value;
                                    renderHTML(obsV.model(), item.innerHTML.encode, item.innerHTML.template);
                                    obsV.listen(function (newValue) {
                                        if (!eleItem)
                                            return;
                                        renderHTML(newValue.newValue, item.innerHTML.encode, item.innerHTML.template);
                                    }, item, null, null, function () {
                                        return !eleItem || !eleItem.parentElement;
                                    });
                                }
                            }
                        }
                        if (item.children) {
                            var childrenInfo = item.children;
                            if (typeof childrenInfo === "function")
                                childrenInfo = childrenInfo(eleItem);
                            if (childrenInfo instanceof Array) {
                                render(eleItem, curId, childrenInfo);
                            }
                        }
                        if (item.controlType && typeof item.controlType === "function") {
                            var c = new item.controlType(eleItem);
                            if (item.options)
                                c.loadOptions(item.options);
                        }
                        if (item.ready)
                            item.ready(eleItem);
                    });
                    return eles;
                };
                var nodeList = render(ele, ele.id, children);
                this.nodeAppended.raise(nodeList);
                return nodeList;
            };
            /**
              * Checks whether has the attribute.
              * @param name  the attribute name.
              */
            VisualControl.prototype.hasAttr = function (name, dataPrefix) {
                if (dataPrefix === void 0) { dataPrefix = false; }
                var childId = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    childId[_i - 2] = arguments[_i];
                }
                var ele = this.getChildElement.apply(this, [true].concat(childId));
                if (!ele)
                    return undefined;
                if (ele.hasAttribute(name))
                    return true;
                return dataPrefix && ele.hasAttribute("data-" + name);
            };
            /**
              * Gets the specific element attribute.
              * @param name  the attribute name.
              */
            VisualControl.prototype.getAttr = function (name, dataPrefix) {
                if (dataPrefix === void 0) { dataPrefix = false; }
                var childId = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    childId[_i - 2] = arguments[_i];
                }
                var ele = this.getChildElement.apply(this, [true].concat(childId));
                if (!ele)
                    return undefined;
                if (ele.hasAttribute(name))
                    return ele.getAttribute(name);
                if (dataPrefix && ele.hasAttribute("data-" + name))
                    return ele.getAttribute("data-" + name);
                return undefined;
            };
            /**
              * Gets or sets element attribute.
              * @param name  the attribute name.
              */
            VisualControl.prototype.attr = function (name, value) {
                var childId = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    childId[_i - 2] = arguments[_i];
                }
                var ele = this.getChildElement.apply(this, [true].concat(childId));
                if (!ele)
                    return undefined;
                if (arguments.length > 1) {
                    ele.setAttribute(name, value);
                }
                return ele.getAttribute(name);
            };
            /**
              * Registers an event handler after a specific attribute changed.
              * @param name  the attribute name.
              * @param h  the event handler to add.
              */
            VisualControl.prototype.attrChanged = function (name, h) {
                var _this = this;
                var childId = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    childId[_i - 2] = arguments[_i];
                }
                var ele = this.getChildElement.apply(this, [true].concat(childId));
                return AliHub.Elements.listen(ele, "DOMAttrModified", function (ev) {
                    var attr = ev.attrName || ev.propertyName;
                    if (name !== attr)
                        return;
                    h(_this._containerElement.getAttribute(name));
                });
            };
            /**
              * Gets element attribute object.
              * @param name  the attribute name.
              * @param dataPrefix  a value indicating whether use "data-" prefix for optional.
              */
            VisualControl.prototype.parseAttr = function (name, dataPrefix) {
                if (dataPrefix === void 0) { dataPrefix = false; }
                return AliHub.Elements.parseAttr(this._containerElement, name, dataPrefix);
            };
            /**
              * Listens attributes changes of a specific element to an object.
              * @param name  the attribute name.
              * @param obj  the object to bind.
              * @param ignoreUndefined  a value indicating whether need ignore undefined.
              * @param dataPrefix  a value indicating whether use "data-" prefix for optional.
              */
            VisualControl.prototype.listenAttr = function (name, obj, ignoreUndefined, dataPrefix) {
                if (ignoreUndefined === void 0) { ignoreUndefined = false; }
                if (dataPrefix === void 0) { dataPrefix = false; }
                var childId = [];
                for (var _i = 4; _i < arguments.length; _i++) {
                    childId[_i - 4] = arguments[_i];
                }
                var ele = this.getChildElement.apply(this, [true].concat(childId));
                return AliHub.Elements.listenAttr(ele, name, obj, ignoreUndefined, dataPrefix);
                ;
            };
            /**
              * Adds an event handler to current control.
              * @param eventType  the type of event.
              * @param h  the event handler to add.
              */
            VisualControl.prototype.listen = function (eventType, h) {
                var childId = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    childId[_i - 2] = arguments[_i];
                }
                var ele = this.getChildElement.apply(this, [true].concat(childId));
                if (ele)
                    AliHub.Elements.listen(ele, eventType, h);
            };
            /**
              * Adds gesture handlers to current control.
              * @param options  the options.
              */
            VisualControl.prototype.addGesture = function (options) {
                var childId = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    childId[_i - 1] = arguments[_i];
                }
                var ele = this.getChildElement.apply(this, [true].concat(childId));
                if (ele)
                    AliHub.Elements.addGesture(ele, options);
            };
            /**
              * Adds gesture handlers to current control.
              * @param options  the options.
              */
            VisualControl.prototype.onClick = function (options) {
                var childId = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    childId[_i - 1] = arguments[_i];
                }
                var ele = this.getChildElement.apply(this, [true].concat(childId));
                if (ele)
                    AliHub.Elements.onClick(ele, options);
            };
            /**
              * Adds a shortcut key for given element.
              * @param options  The shortcut key options.
              */
            VisualControl.prototype.shortcutKey = function (options) {
                var childId = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    childId[_i - 1] = arguments[_i];
                }
                var ele = this.getChildElement.apply(this, [true].concat(childId));
                if (ele)
                    AliHub.Elements.shortcutKey(ele, options);
            };
            /**
              * Gets the size of specific element.
              */
            VisualControl.prototype.getSize = function () {
                var childId = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    childId[_i] = arguments[_i];
                }
                var ele = this.getChildElement.apply(this, [true].concat(childId));
                return ele ? AliHub.Elements.getSize(ele, true) : { invalid: true, message: "element does not exist." };
            };
            /**
              * Gets the position of the specific element in document.
              */
            VisualControl.prototype.getPosition = function () {
                var childId = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    childId[_i] = arguments[_i];
                }
                var ele = this.getChildElement.apply(this, [true].concat(childId));
                return ele ? AliHub.Elements.getPosition(ele) : { invalid: true, message: "element does not exist." };
            };
            /**
              * Gets the position of the mouse in specific element or document.
              */
            VisualControl.prototype.getMousePosition = function () {
                var childId = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    childId[_i] = arguments[_i];
                }
                var ele = this.getChildElement.apply(this, [true].concat(childId));
                return ele ? AliHub.Elements.getMousePosition(ele) : { invalid: true, message: "element does not exist." };
            };
            /**
              * Clears the control.
              */
            VisualControl.prototype.clear = function () {
                var ele = this.getElement();
                if (!ele)
                    return;
                ele.innerHTML = "";
            };
            /**
              * Gets a child HTML element.
              * childId  The child id suffix, resolver will merge the prefix by current control id automatically; true if use current control identifier as prefix; otherwise, false.
              * appendingIdParts  the additional identifier parts.
              */
            VisualControl.prototype.getChildElement = function (childId) {
                var appendingIdParts = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    appendingIdParts[_i - 1] = arguments[_i];
                }
                if ((childId == null || childId === true) && (!appendingIdParts || appendingIdParts.length === 0))
                    return this._containerElement;
                var prefix = this._containerElement.id;
                if (!childId)
                    prefix = null;
                else if (typeof childId === "string")
                    appendingIdParts = [childId].concat(appendingIdParts);
                var id = AliHub.Elements.mergeId(prefix, appendingIdParts);
                return AliHub.Elements.getById(id);
            };
            /**
              * Gets child HTML elements.
              * tagName  An optional tag name for filter.
              */
            VisualControl.prototype.getChildElements = function (tagName) {
                var ele = this.getElement();
                var col = [];
                if (!ele || !ele.children)
                    return col;
                if (!tagName) {
                    for (var i = 0; i < ele.children.length; i++) {
                        var cEle = ele.children[i];
                        col.push(cEle);
                    }
                }
                else {
                    var names = [];
                    (typeof tagName === "string" ? [tagName] : tagName).forEach(function (item) {
                        if (item)
                            names.push(item.toString().toLowerCase());
                    });
                    for (var i = 0; i < ele.children.length; i++) {
                        var cEle = ele.children[i];
                        if (!cEle || !cEle.tagName)
                            continue;
                        if (!AliHub.Collection.contains(names, cEle.tagName.toString().toLowerCase()))
                            continue;
                        col.push(cEle);
                    }
                }
                return col;
            };
            /**
              * Gets a child control.
              * childId  The child id suffix, resolver will merge the prefix by current control id automatically; true if use current control identifier as prefix; otherwise, false.
              * appendingIdParts  the additional identifier parts.
              */
            VisualControl.prototype.getChildControl = function (childId) {
                var appendingIdParts = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    appendingIdParts[_i - 1] = arguments[_i];
                }
                var prefix = this._containerElement.id;
                if (!childId)
                    prefix = null;
                else if (typeof childId === "string")
                    appendingIdParts = [childId].concat(appendingIdParts);
                var id = AliHub.Elements.mergeId(prefix, appendingIdParts);
                return Common.getControl(id);
            };
            /**
              * Creates a control as child.
              * @param id  The identifier.
              * @param control  The type of the control to append.
              * @param options  The options to load.
              * @param tag  The tag name of element to fill the control.
              */
            VisualControl.prototype.createControl = function (idSuffix, control, options, tag) {
                if (!idSuffix || idSuffix.toString() === "" || !control)
                    return null;
                var id = idSuffix.toString().replace("__view_control_", this._containerElement.id).replace("{{_id}}", this._containerElement.id).replace("{{id()}}", this._containerElement.id);
                if (id.indexOf(this._containerElement.id) !== 0) {
                    id = this._containerElement.id + (id.indexOf("_") > 0 ? "_" : "") + id;
                }
                if (!tag || tag.toString() === "")
                    tag = "div";
                var element = AliHub.Elements.getById(id);
                if (!element)
                    element = this.appendElement(tag);
                element.id = id;
                var c = new control(id);
                c.loadOptions(options);
                return c;
            };
            /**
              * Adds a control as child.
              * @param id  The identifier.
              * @param control  The control factory.
              * @param tag  The tag name of element to fill the control.
              */
            VisualControl.prototype.addControl = function (idSuffix, control, tag) {
                if (!idSuffix || idSuffix.toString() === "" || !control)
                    return;
                var id = idSuffix.toString().replace("__view_control_", this._containerElement.id).replace("{{_id}}", this._containerElement.id).replace("{{id()}}", this._containerElement.id);
                if (id.indexOf(this._containerElement.id) !== 0) {
                    id = this._containerElement.id + (id.indexOf("_") !== 0 ? "_" : "") + id;
                }
                if (!tag || tag.toString() === "")
                    tag = "div";
                var element = AliHub.Elements.getById(id);
                if (!element)
                    element = this.appendElement(tag);
                element.id = id;
                return control(element, this);
            };
            /**
              * Gets or sets inner HTML.
              * @param value  The inner HTML to set.
              */
            VisualControl.prototype.innerHTML = function (value) {
                if (arguments.length > 0)
                    this.getElement().innerHTML = value ? value.toString().replace(/__view_control_/g, this._containerElement.id + "_").replace(/{{_id}}/g, this._containerElement.id).replace(/{{id\(\)}}/g, this._containerElement.id) : "";
                return this.getElement().innerHTML;
            };
            /**
              * Gets computed style.
              */
            VisualControl.prototype.computedStyle = function (pseudoElt) {
                var childId = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    childId[_i - 1] = arguments[_i];
                }
                var ele = this.getChildElement.apply(this, [true].concat(childId));
                if (!ele)
                    return null;
                return getComputedStyle(ele, pseudoElt);
            };
            /**
              * Gets matched CSS rules.
              */
            VisualControl.prototype.styleRefRules = function (pseudoElt) {
                var childId = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    childId[_i - 1] = arguments[_i];
                }
                var ele = this.getChildElement.apply(this, [true].concat(childId));
                if (!ele)
                    return null;
                return getMatchedCSSRules(ele, pseudoElt);
            };
            /**
              * Requests full screen.
              */
            VisualControl.prototype.fullScreen = function () {
                var childId = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    childId[_i] = arguments[_i];
                }
                var ele = this.getChildElement.apply(this, [true].concat(childId));
                if (!ele)
                    return;
                try {
                    var requestMethod = ele.requestFullscreen || ele.requestFullScreen || ele.webkitRequestFullScreen || ele.webkitRequestFullscreen || ele.mozRequestFullScreen || ele.msRequestFullScreen;
                    if (requestMethod) {
                        requestMethod.call(ele);
                    }
                    else if (typeof window.ActiveXObject !== "undefined") {
                        var wscript = new ActiveXObject("WScript.Shell");
                        if (wscript)
                            wscript.SendKeys("{F11}");
                    }
                }
                catch (ex) { }
            };
            /**
              * Gets or sets the language.
              * @param value  The inner HTML to set.
              */
            VisualControl.prototype.lang = function (value) {
                var childId = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    childId[_i - 1] = arguments[_i];
                }
                var ele = this.getChildElement.apply(this, [true].concat(childId));
                if (!ele)
                    return;
                if (arguments.length > 0)
                    ele.lang = value;
                return ele.lang;
            };
            /**
              * Scrolls to specific position.
              * @param x  Left in pixel.
              * @param y  Top in pixel.
              */
            VisualControl.prototype.scrollTo = function (x, y) {
                var ele = this._containerElement;
                if (!ele)
                    return;
                if (x != null)
                    ele.scrollLeft = x;
                if (y != null)
                    ele.scrollTop = y;
            };
            return VisualControl;
        }());
        Common.VisualControl = VisualControl;
        /**
          * Controls manager.
          */
        var ControlManager = (function () {
            function ControlManager() {
            }
            ControlManager.initializers = function () {
                return ControlManager._initializers;
            };
            return ControlManager;
        }());
        ControlManager._initializers = [];
        Common.ControlManager = ControlManager;
        /**
          * Reflection utilities.
          */
        var Reflection = (function () {
            function Reflection() {
            }
            Reflection.isNotNull = function (obj) {
                return obj != null;
            };
            Reflection.isFunction = function (value) {
                return value && typeof value === "function";
            };
            /**
              * Copies an object.
              * @param html  The object to copy.
              */
            Reflection.copy = function (obj) {
                if (obj == null)
                    return null;
                if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean")
                    return obj;
                if (obj instanceof Array) {
                    var array = [];
                    obj.forEach(function (item, i, arr) {
                        array.push(item);
                    });
                    return array;
                }
                var result = {};
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop))
                        result[prop] = obj[prop];
                }
                return result;
            };
            Reflection.addProperties = function (target, properties, override) {
                if (override === void 0) { override = false; }
                if (!target || !properties)
                    return;
                for (var prop in properties) {
                    if (properties.hasOwnProperty(prop) && (override || target[prop] === undefined))
                        target[prop] = properties[prop];
                }
            };
            /**
              * Gets identifier from a entry.
              * @param model  The entry.
              * @param h  An optional handler to resolve identifier from the entry.
              */
            Reflection.getId = function (model, h) {
                if (model === "")
                    return "";
                if (!model)
                    return null;
                if (typeof model === "function")
                    model = model();
                var id = null;
                if (typeof model === "number") {
                    id = model.toString();
                }
                else if (typeof model === "string") {
                    id = model.toString();
                }
                else if (model.id) {
                    id = model.id;
                    if (h)
                        h(model);
                }
                return id;
            };
            /**
              * Extends a class.
              * @param derivedClass  The derived class.
              * @param baseClass  The base class.
              */
            Reflection.extend = function (derivedClass, baseClass) {
                for (var p in baseClass) {
                    if (baseClass.hasOwnProperty(p))
                        derivedClass[p] = baseClass[p];
                }
                function __() {
                    this.constructor = derivedClass;
                }
                __.prototype = baseClass.prototype;
                derivedClass.prototype = new __();
            };
            ;
            /**
              * Unwraps object.
              * @param value  The object wrapped.
              * @param count  An optional value of maximum depth.
              */
            Reflection.unwrapObject = function (value, thisArg, count) {
                if (value == null)
                    return value;
                var step = 0;
                if (count == null || count === -1)
                    count = null;
                while (value != null && typeof value === "function" && (count == null || step < count)) {
                    value = value.apply(thisArg);
                    step++;
                }
                return value;
            };
            /**
              * Creates an empty disposable object.
              * @param obj  An additional information to copy.
              */
            Reflection.emptyDisposable = function (obj) {
                var disp = { dispose: function () { }, useless: true };
                if (obj)
                    for (var prop in obj) {
                        if (!prop || typeof prop !== "string")
                            continue;
                        disp[prop] = obj[prop];
                    }
                return disp;
            };
            Reflection.callMethod = function (obj, method) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                return obj && obj[method] && typeof obj[method] === "function" ? obj[method].apply(obj, args) : undefined;
            };
            Reflection.getProperty = function (obj) {
                var prop = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    prop[_i - 1] = arguments[_i];
                }
                if (!prop || prop.length < 1)
                    return obj;
                var propV = obj;
                if (prop.some(function (p) {
                    if (propV == null)
                        return true;
                    if (propV[p] == null && typeof p === "string" && p.length > 2 && p.indexOf("()") === p.length - 2) {
                        var methodName = p.substring(0, p.length - 2);
                        if (propV[methodName] && typeof propV[methodName] === "function") {
                            propV = propV[methodName]();
                            return false;
                        }
                    }
                    propV = propV[p];
                    return false;
                }))
                    return undefined;
                return propV;
            };
            Reflection.setProperty = function (value, obj) {
                var prop = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    prop[_i - 2] = arguments[_i];
                }
                if (!prop || prop.length < 1)
                    return false;
                var propV = obj;
                var succ = false;
                prop.some(function (p, i) {
                    if (propV == null)
                        return true;
                    propV = propV[p];
                    if (i < prop.length - 2)
                        return false;
                    propV[prop[prop.length - 1]] = value;
                    succ = true;
                    return true;
                });
                return succ;
            };
            Reflection.toIntroHTML = function (obj, iip, firstI, singleQuote, thisStr) {
                if (iip === void 0) { iip = 0; }
                if (firstI === void 0) { firstI = false; }
                if (singleQuote === void 0) { singleQuote = false; }
                if (thisStr === void 0) { thisStr = null; }
                if (iip == null)
                    iip = 0;
                var nextIip = iip >= 0 ? iip + 1 : -1;
                var prefix = "";
                var quoteStr = singleQuote ? "'" : "&quot;";
                for (var step = 0; step < iip; step++) {
                    prefix += "&nbsp; &nbsp; ";
                }
                var nl = " ";
                var prefix1 = firstI ? prefix : "";
                var prefix2 = prefix;
                if (iip >= 0) {
                    nl = "<br />";
                    prefix2 += "&nbsp; &nbsp; ";
                }
                if (obj == null)
                    return prefix + "<span class=\"ali-x-code-keyword\">null</span>";
                if (typeof obj === "string") {
                    if (obj.length > 5 && obj.indexOf("**$") === 0 && obj.lastIndexOf("**") === obj.length - 2) {
                        var str = obj.substring(3, obj.length - 2);
                        if (thisStr && str === "this")
                            return thisStr;
                        return str;
                    }
                    return "<span class=\"ali-x-code-string\">" + quoteStr + obj + quoteStr + "</span>";
                }
                if (typeof obj === "function")
                    return "<span class=\"ali-x-code-unknown\">" + obj.toString().replace("function", "</span><span class=\"ali-x-code-keyword\">function</span><span class=\"ali-x-code-unknown\">") + "</span>";
                if (typeof obj === "number")
                    return prefix1 + "<span class=\"ali-x-code-number\">" + obj.toString() + "</span>";
                if (typeof obj === "boolean")
                    return prefix1 + "<span class=\"ali-x-code-keyword\">" + (obj ? "true" : "false") + "</span>";
                if (obj instanceof Date)
                    return prefix1 + "<span class=\"ali-x-code-number\">" + obj.getTime().toString() + "</span>";
                if (obj instanceof Array) {
                    var list = [];
                    var len = 0;
                    obj.forEach(function (ele, i, list) {
                        var str = Reflection.toIntroHTML(ele, nextIip, false, singleQuote, thisStr);
                        list.push(str);
                        len += str.length;
                    });
                    return prefix1 + (len < 50 ? "[" + list.join(", ") + "]" : "[" + nl + list.join("," + nl + prefix2) + nl + "]");
                }
                var objStr = prefix1 + "{";
                var objLen = 0;
                for (var prop in obj) {
                    if (!prop || typeof prop !== "string")
                        return;
                    objLen++;
                    objStr += nl + prefix2 + "<span class=\"ali-x-code-string\">" + quoteStr + prop + quoteStr + "</span>: " + Reflection.toIntroHTML(obj[prop], nextIip, false, singleQuote, thisStr) + ",";
                }
                if (objLen === 0)
                    return "";
                objStr = objStr.substring(0, objStr.length - 1) + nl + prefix + "}";
                return objStr;
            };
            return Reflection;
        }());
        Common.Reflection = Reflection;
        /**
          * Binding convertion.
          */
        var BindingConvertion = (function () {
            function BindingConvertion(model) {
                if (model && typeof model !== "function") {
                    this._model = function () { return model; };
                }
                else {
                    this._model = model;
                }
            }
            /**
              * Gets model.
              */
            BindingConvertion.prototype.model = function () {
                return this._model();
            };
            return BindingConvertion;
        }());
        Common.BindingConvertion = BindingConvertion;
        /**
          * Binding property bag.
          */
        var BindingPropertyBag = (function () {
            function BindingPropertyBag() {
                this._properties = [];
                /**
                  * Raises on property changed.
                  */
                this.propChanged = new AliHub.Collection.EventHandlers();
            }
            BindingPropertyBag.prototype.bindStr = function () {
                return AliHub.Common.bindingObj();
            };
            BindingPropertyBag.prototype.bindObj = function () {
                return AliHub.Common.bindingObj();
            };
            BindingPropertyBag.prototype.initProp = function () {
                var _this = this;
                var keys = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    keys[_i] = arguments[_i];
                }
                if (!keys)
                    return;
                keys.forEach(function (key, ki, ka) {
                    if (_this[key] && typeof _this[key] === "function")
                        return;
                    _this[key] = AliHub.Common.bindingObj();
                    _this._regProp(key);
                });
            };
            /**
              * Sets a property.
              * @param key  The property key.
              * @param value  The value of the property.
              */
            BindingPropertyBag.prototype.setProp = function (key, value) {
                if (!key || key == "")
                    return;
                var old = null;
                if (this[key] && typeof this[key] === "function") {
                    old = this[key]();
                    this[key](value);
                }
                else if (value == null) {
                    this[key] = AliHub.Common.bindingObj();
                }
                else if (value instanceof Array) {
                    this[key] = AliHub.Common.bindingArray(value);
                }
                else {
                    this[key] = AliHub.Common.bindingObj(value);
                }
                this._regProp(key);
                this.propChanged.raise({ key: key, old: old, value: value });
            };
            BindingPropertyBag.prototype.loadObj = function (obj, properties) {
                if (obj == null || obj instanceof Array)
                    return;
                var objType = typeof obj;
                if (objType === "string" || objType === "number" || objType === "boolean")
                    return;
                if (properties == null) {
                    for (var prop in obj) {
                        if (!prop || typeof prop !== "string")
                            continue;
                        this.setProp(prop, obj[prop]);
                    }
                    return;
                }
                for (var prop in properties) {
                    this.setProp(prop, obj[prop]);
                }
            };
            BindingPropertyBag.prototype.initArray = function () {
                var _this = this;
                var keys = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    keys[_i] = arguments[_i];
                }
                if (!keys)
                    return;
                keys.forEach(function (key, ki, ka) {
                    if (_this[key] && typeof _this[key] === "function")
                        return;
                    _this[key] = AliHub.Common.bindingArray();
                    _this._regProp(key);
                });
            };
            /**
              * Sets an array.
              * @param key  The property key.
              * @param value  The array value of the property.
              */
            BindingPropertyBag.prototype.setArray = function (key, col) {
                if (!key || key == "")
                    return;
                var old = null;
                if (this[key] && typeof this[key] === "function") {
                    old = this[key]();
                    this[key](col);
                }
                else if (col == null) {
                    this[key] = AliHub.Common.bindingArray();
                }
                else {
                    if (!(col instanceof Array))
                        col = [col];
                    this[key] = AliHub.Common.bindingArray(col);
                }
                this._regProp(key);
                this.propChanged.raise({ key: key, old: old, value: col });
            };
            /**
              * Pushes items to an array property.
              * @param key  The property key.
              * @param items  The items to push.
              */
            BindingPropertyBag.prototype.pushArrayItem = function (key) {
                var _this = this;
                var items = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    items[_i - 1] = arguments[_i];
                }
                if (!key || key == "")
                    return null;
                this.initArray(key);
                if (items)
                    items.forEach(function (value, vi, va) {
                        _this[key].push(value);
                    });
                return this[key]();
            };
            /**
              * Gets the property value.
              * @param key  The property key.
              */
            BindingPropertyBag.prototype.getProp = function (key) {
                if (!key || key == "")
                    return undefined;
                var prop = this[key];
                return prop && typeof prop === "function" ? prop() : prop;
            };
            /**
              * Gets the observable object the property.
              * @param key  The property key.
              */
            BindingPropertyBag.prototype.getPropSource = function (key) {
                if (!key || key == "")
                    return undefined;
                return this[key];
            };
            BindingPropertyBag.prototype.propertyNames = function () {
                return AliHub.Collection.copy(this._properties);
            };
            BindingPropertyBag.prototype.unwrap = function (count) {
                var obj = {};
                for (var i in this._properties) {
                    var prop = this._properties[i];
                    if (!prop || typeof prop !== "string")
                        continue;
                    obj[prop] = Reflection.unwrapObject(this[prop], this, count);
                }
                ;
                return obj;
            };
            BindingPropertyBag.prototype._regProp = function (name) {
                if (!name)
                    return false;
                name = name.toString();
                if (this._properties.some(function (ele, i, arr) { return ele === name; }))
                    return false;
                this._properties.push(name);
                return true;
            };
            return BindingPropertyBag;
        }());
        Common.BindingPropertyBag = BindingPropertyBag;
        /**
          * Binding object.
          */
        var BindingObject = (function () {
            function BindingObject() {
                this.changed = new AliHub.Collection.EventHandlers();
            }
            /**
              * Gets the value.
              */
            BindingObject.prototype.get_value = function () {
                return this._raw;
            };
            /**
              * Sets the value.
              * @param value  The value to set.
              */
            BindingObject.prototype.set_value = function (value) {
                if (value === this._raw)
                    return;
                var oldValue = this._raw;
                this._raw = value;
                this.changed.raise(this._getChangedArgs(oldValue, "changed"));
            };
            /**
              * Gets the observable object.
              */
            BindingObject.prototype.toObservable = function () {
                var _this = this;
                var obs = function (value) {
                    if (typeof value !== "undefined" && value !== void 0) {
                        _this._raw = value;
                    }
                    return _this._raw;
                };
                obs.subscribe = function (callback, target, event) {
                    return { dispose: function () { } };
                };
                return obs;
            };
            BindingObject.prototype._getChangedArgs = function (oldValue, event) {
                return {
                    oldValue: oldValue,
                    newValue: this._raw,
                    target: this,
                    event: event
                };
            };
            return BindingObject;
        }());
        Common.BindingObject = BindingObject;
        /**
          * Binding control.
          */
        var BindingControl = (function (_super) {
            __extends(BindingControl, _super);
            /**
              * Initializes a new instance of the BindingControl class.
              * @param id  Element ID. The content will be filled into this element to replace original ones.
              */
            function BindingControl(id) {
                var _this = _super.call(this, id) || this;
                _this._model = Common.bindingObj();
                _this._info = Common.bindingObj();
                _this._extenders = [];
                _this._convertor = null;
                _this._converted = Common.bindingObj();
                _this._extendersLoaded = false;
                _this._bindingControls = [];
                _this.viewModelChanged = new AliHub.Collection.EventHandlers();
                _this.convertedChanged = new AliHub.Collection.EventHandlers();
                _this.convertorChanged = new AliHub.Collection.EventHandlers();
                _this.infoChanged = new AliHub.Collection.EventHandlers();
                _this.addStyleRef("ali-controls-binding");
                _this._modelDispose = _this._model.subscribe(function (newValue) {
                    var converted = _this._updateConverted(newValue);
                    _this._loadExtenders();
                    if (!!_this.viewModelChanged && !!_this.viewModelChanged.raise)
                        _this.viewModelChanged.raise({ key: "viewModel", value: newValue });
                    if (!!_this.convertedChanged && !!_this.convertedChanged.raise)
                        _this.convertedChanged.raise({ key: "converted", value: converted });
                });
                return _this;
            }
            /**
              * Raises on binding error.
              * @param errorMessage  The error message.
              */
            BindingControl.prototype.onBindingError = function (errorMessage) {
                return !!this._model();
            };
            /**
              * Gets or sets templete engine.
              * @param value  The templete engine type.
              */
            BindingControl.prototype.templateEngine = function (name) {
                if (arguments.length > 0) {
                    this._templateEngine = name;
                }
                return this._templateEngine;
            };
            /**
              * Sets the template.
              * @param valueType  The data source type for the value.
              * @param value  The data source value.
              */
            BindingControl.prototype.setTemplate = function (valueType, value) {
                var _this = this;
                if (valueType == null && value == null)
                    return;
                if (valueType === "part" || valueType === "initpart") {
                    value = this.templatePart(!!value ? value : "");
                    if (!value)
                        value = this.templatePart("content");
                    if (valueType === "initpart" && !value)
                        return;
                    valueType = "";
                }
                Common.applyTemplate(this._templateEngine, this, valueType, value, function (errMsg) { return _this.onBindingError(errMsg); });
                this._loadExtenders();
            };
            /**
              * Gets or sets the view model.
              * @param value  Model value to set; or ignore this parameter, if just resolve model.
              * @param binding  An optional flag to indicate whether the given binding value is to replace old one.
              */
            BindingControl.prototype.viewModel = function (value) {
                if (arguments.length > 0)
                    this._model(value);
                return this._model();
            };
            /**
              * Sets the view model from web.
              * @param subject  The subject of data resolver registered.
              * @param key  The key of data resolver.
              */
            BindingControl.prototype.setViewModelFromWeb = function (subject, key, parameters) {
                var _this = this;
                var promise = AliHub.Web.resolve(subject, key, parameters);
                promise.then(function (m) {
                    _this.viewModel(m.result);
                });
                return promise;
            };
            /**
              * Binds the view model.
              * @param value  Model value observable object to bind.
              */
            BindingControl.prototype.bindViewModel = function (value) {
                var _this = this;
                if (!!this._modelDispose && !!this._modelDispose.dispose)
                    this._modelDispose.dispose();
                this._model = value;
                this._modelDispose = this._model.subscribe(function (newValue) {
                    var converted = _this._updateConverted(newValue);
                    _this._loadExtenders();
                    if (!!_this.viewModelChanged && !!_this.viewModelChanged.raise)
                        _this.viewModelChanged.raise({ key: "viewModel", value: newValue });
                    if (!!_this.convertedChanged && !!_this.convertedChanged.raise)
                        _this.convertedChanged.raise({ key: "converted", value: converted });
                });
                this.updateConverted();
                this._extendersLoaded = false;
                this._loadExtenders();
            };
            /**
              * Subscribe view model changed.
              * @param h  Callback during value has been changed.
              * @param target  The "this" target of h callback.
              */
            BindingControl.prototype.subscribeViewModel = function (h, target) {
                var _this = this;
                return this.viewModelChanged.add(function (ev) {
                    h.call(target || _this, ev.value);
                });
            };
            /**
              * Gets observable view model.
              */
            BindingControl.prototype.observableViewModel = function () {
                return this._model;
            };
            /**
              * Gets or sets the additional information.
              * @param value  The additional information value to set; or ignore this parameter, if just resolve the additional information.
              */
            BindingControl.prototype.info = function (value) {
                if (arguments.length > 0) {
                    this.setInfo(value);
                }
                return this._info();
            };
            /**
              * Sets the additional information.
              * @param value  The additional information value to set; or ignore this parameter, if just resolve the additional information.
              */
            BindingControl.prototype.setInfo = function (value) {
                this._info(value);
                this.infoChanged.raise({ key: "info", value: value });
                this._loadExtenders();
            };
            /**
              * Gets or sets the convertor.
              * @param value  The convertor to set; or ignore this parameter, if just resolve the convertor.
              */
            BindingControl.prototype.convertor = function (h) {
                if (arguments.length > 0) {
                    this.setConvertor(h);
                }
                return this._convertor;
            };
            /**
              * Sets the convertor.
              * @param value  The convertor to set; or ignore this parameter, if just resolve the convertor.
              */
            BindingControl.prototype.setConvertor = function (h) {
                if (h === this._convertor || (!h && !this._convertor))
                    return;
                this._convertor = h;
                var converted = this.updateConverted();
                if (!!this.convertorChanged && !!this.convertorChanged.raise)
                    this.convertorChanged.raise({ key: "convertor", value: h });
                if (!!this.convertedChanged && !!this.convertedChanged.raise)
                    this.convertedChanged.raise({ key: "converted", value: converted });
            };
            /**
              * Gets or sets the converted value.
              */
            BindingControl.prototype.converted = function () {
                return this._converted();
            };
            /**
              * Gets observable converted model.
              */
            BindingControl.prototype.observableConverted = function () {
                return this._converted;
            };
            /**
              * Updates the converted value.
              */
            BindingControl.prototype.updateConverted = function () {
                return this._updateConverted(this._model());
            };
            /**
              * Sets view model as null.
              */
            BindingControl.prototype.clearViewModel = function () {
                this._model(null);
            };
            /**
              * Listens model changes.
              * @param obj  the object to bind.
              */
            BindingControl.prototype.listenModel = function (obj, proc, ignoreFirstProc) {
                if (ignoreFirstProc === void 0) { ignoreFirstProc = false; }
                return Common.listenBindingControl(this, obj, proc, ignoreFirstProc);
            };
            /**
              * Refreshes view.
              */
            BindingControl.prototype.refresh = function () {
                var model = this._model();
                this._model(null);
                this._model(model);
            };
            /**
              * Loads specific options.
              * @param options  The options to load.
              */
            BindingControl.prototype.loadOptions = function (value) {
                var options = _super.prototype.loadOptions.call(this, value);
                if (!options)
                    return null;
                if (!!options.templateEngine)
                    this.templateEngine(options.templateEngine);
                if (!!options.bindControl) {
                    this.bindViewModel(options.bindControl.observableViewModel());
                    this.convertor(function (m) { return options.bindControl.converted(); });
                    this.setInfo(options.bindControl.info());
                }
                if (!!options.viewModel)
                    this.viewModel(options.viewModel);
                if (!!options.convertor)
                    this.setConvertor(options.convertor);
                if (!options.ignoreParts)
                    this.setTemplate("initpart", null);
                this.setTemplate(options.templateType, options.template);
                this.addExtender(options.extender);
                if (!!options.webData) {
                    var webData = typeof options.webData === "function" ? options.webData.call(options) : options.webData;
                    this.setViewModelFromWeb(webData.subject, webData.key, webData.parameters);
                }
                return options;
            };
            /**
              * Processes the extender to resolve additional model.
              * @param name  The extender name.
              * @param emptyObj  true if want to return an empty object instead of null when the extender does not exist; otherwise, false.
              */
            BindingControl.prototype.procExtender = function (name, emptyObj) {
                if (emptyObj === void 0) { emptyObj = false; }
                var extender = this.getExtender(name);
                if (!extender)
                    return emptyObj === true ? {} : null;
                return extender.model(this);
            };
            /**
              * Gets a specific extender.
              * @param name  The extender name.
              */
            BindingControl.prototype.getExtender = function (name) {
                if (!name)
                    return null;
                var extender = null;
                this._extenders.some(function (ele, i, arr) {
                    if (ele.name !== name)
                        return false;
                    extender = ele;
                    return true;
                });
                return extender;
            };
            /**
              * Adds an extender.
              * @param value  The extender instance.
              */
            BindingControl.prototype.addExtender = function (value) {
                var _this = this;
                var col = AliHub.Collection.toArray(value);
                col.forEach(function (ele, i, arr) {
                    if (!ele || !ele.name)
                        return;
                    _this.removeExtender(ele.name);
                    _this._extenders.push(ele);
                    if (_this._extendersLoaded && !!ele.load)
                        ele.load(_this);
                });
            };
            /**
              * Removes a specific extender.
              * @param name  The extender name.
              */
            BindingControl.prototype.removeExtender = function (name) {
                if (!name)
                    return;
                var col = [];
                this._extenders.forEach(function (ele, i, arr) {
                    if (!ele || ele.name === name)
                        return;
                    col.push(ele);
                });
                this._extenders = col;
            };
            /**
              * Updates extenders.
              */
            BindingControl.prototype.updateExtenders = function () {
                this._loadExtenders();
            };
            /**
              * Clears all extenders registered.
              */
            BindingControl.prototype.clearExtenders = function () {
                this._extenders = [];
            };
            /**
              * Creates a binding control as child with current binding.
              */
            BindingControl.prototype.addBindingControl = function (idSuffix, templateKey, templateValue, override, h) {
                var _this = this;
                if (override === void 0) { override = true; }
                var kvp = this._getBindingControl(idSuffix);
                if (!override && !!kvp && !!kvp.value)
                    return kvp.value;
                return this.addControl(idSuffix, function (cid) {
                    var control = new AliHub.Common.BindingControl(cid);
                    control.convertor(function (m) { return _this.converted(); });
                    control.bindViewModel(_this._model);
                    control.setTemplate(templateKey, templateValue);
                    if (!kvp)
                        _this._bindingControls.push({ key: idSuffix, value: control });
                    else
                        kvp.value = control;
                    if (!!h)
                        h(control);
                    return control;
                });
            };
            /**
              * Gets a specific child binding control.
              */
            BindingControl.prototype.getBindingControl = function (key) {
                var kvp = this._getBindingControl(key);
                return !!kvp ? kvp.value : null;
            };
            BindingControl.prototype._updateConverted = function (model) {
                if (!this._convertor)
                    return undefined;
                var converted = this._convertor(model);
                this._converted(converted);
                return this._converted();
            };
            BindingControl.prototype._getBindingControl = function (key) {
                if (!key || key.toString().length < 1)
                    return null;
                var kvp;
                this._bindingControls.some(function (ele, i, arr) {
                    if (!ele || !ele.key || ele.key !== key)
                        return false;
                    kvp = ele;
                    return true;
                });
                if (!kvp && key.indexOf("_") === 0) {
                    var key2 = "_" + key;
                    this._bindingControls.some(function (ele, i, arr) {
                        if (!ele || !ele.key || ele.key !== key2)
                            return false;
                        kvp = ele;
                        return true;
                    });
                }
                return kvp;
            };
            BindingControl.prototype._loadExtenders = function () {
                var _this = this;
                if (this._extendersLoaded || !this.getElement())
                    return;
                var html = this.getElement().innerHTML;
                if (!!html && html !== "" && !!this.viewModel()) {
                    this._extendersLoaded = true;
                    this._extenders.forEach(function (ele, i, arr) {
                        if (!!ele && !!ele.load)
                            ele.load(_this);
                    });
                }
            };
            return BindingControl;
        }(VisualControl));
        Common.BindingControl = BindingControl;
        /**
          * Activity control.
          */
        var ActivityControl = (function (_super) {
            __extends(ActivityControl, _super);
            /**
              * Initializes a new instance of the ActivityControl class.
              * @param id  Element ID. The content will be filled into this element to replace original ones.
              */
            function ActivityControl(id) {
                var _this = _super.call(this, id) || this;
                _this._activities = [];
                _this._index = -1;
                _this._count = 0;
                /**
                  * Raised on changing.
                  */
                _this.changing = new AliHub.Collection.EventHandlers();
                /**
                  * Raised on changed.
                  */
                _this.changed = new AliHub.Collection.EventHandlers();
                _this.addStyleRef("ali-controls-activity");
                return _this;
            }
            /**
              * Gets the length of all including cached.
              */
            ActivityControl.prototype.length = function () {
                return this._activities.length;
            };
            /**
              * Gets current index.
              */
            ActivityControl.prototype.index = function () {
                return this._index;
            };
            /**
              * Gets current information.
              */
            ActivityControl.prototype.current = function () {
                if (this._activities.length === 0 || this._index == -1) {
                    this._index = -1;
                    return null;
                }
                if (this._index >= this._activities.length)
                    this._index = this._activities.length - 1;
                if (this._index < 0)
                    this._index = 0;
                var item = this._activities[this._index];
                return !!item ? { key: item.key, control: item.control, model: item.model, index: this._index } : null;
            };
            /**
              * Gets current control.
              */
            ActivityControl.prototype.currentControl = function () {
                var item = this.current();
                return !!item ? item.control : null;
            };
            /**
              * Gets current item model.
              */
            ActivityControl.prototype.currentItemModel = function () {
                var item = this.current();
                return !!item ? item.model : null;
            };
            /**
              * Adds a control by a factory.
              * @param control  The optional control factory.
              */
            ActivityControl.prototype.add = function (control, model, h) {
                var _this = this;
                if (this._count >= 100000000)
                    this._count = 0;
                this._count++;
                if (this._index < this._activities.length - 1) {
                    var col = [];
                    this._activities.forEach(function (acti, i, arr) {
                        if (!acti || !acti.control)
                            return;
                        if (i <= _this._index) {
                            col.push(acti);
                        }
                        else {
                            acti.control.getElement().outerHTML = "";
                        }
                    });
                    this._activities = col;
                    this._index = this._activities.length - 1;
                }
                var element = this.appendElement("div");
                var now = new Date();
                var key = this._count.toString() + "t" + now.getSeconds().toString() + now.getMilliseconds().toString();
                element.id = this.getId() + "_c" + key;
                if (control)
                    control(element);
                var c = Common.getControl(element);
                if (!c)
                    c = new VisualControl(element);
                if (!!h)
                    h(c);
                this._activities.push({ key: key, control: c, model: model, index: this._activities.length });
                this._turnTo(this._index + 1);
                return { key: key, control: c, model: model, index: this._activities.length };
            };
            /**
              * Gets item info.
              * @param control  The item to get.
              */
            ActivityControl.prototype.getItem = function (control) {
                if (control == null)
                    return null;
                if (typeof control === "number") {
                    if (control >= this._activities.length || control < 0)
                        return null;
                    var item = this._activities[control];
                    return { key: item.key, control: item.control, model: item.model, index: control };
                }
                var c = null;
                var count = -1;
                var id = typeof control === "string" ? control : control.getId();
                this._activities.some(function (ele, i, ar) {
                    count++;
                    if (!ele || !ele.control || (ele.control.getId() !== id && ele.key !== id))
                        return false;
                    c = ele;
                    return true;
                });
                return !!c ? { key: c.key, control: c.control, model: c.model, index: count } : null;
            };
            /**
              * Gets previous item.
              */
            ActivityControl.prototype.getPrevious = function () {
                var index = this._index - 1;
                return this.getItem(index);
            };
            /**
              * Gets all items.
              */
            ActivityControl.prototype.items = function () {
                var list = [];
                for (var i = 0; i < this._activities.length; i++) {
                    list.push(this.getItem(i));
                }
                return list;
            };
            /**
              * Turns to a specific control.
              * @param control  The control or key.
              */
            ActivityControl.prototype.turnTo = function (control) {
                var item = this.getItem(control);
                this._turnTo(!!item ? item.index : -1);
                return item;
            };
            /**
              * Turns back.
              * @param step  An option step to back.
              */
            ActivityControl.prototype.back = function (step) {
                if (step === void 0) { step = 1; }
                var index = this._index - step;
                return this.turnTo(index);
            };
            /**
              * Loads specific options.
              * @param options  The options to load.
              */
            ActivityControl.prototype.loadOptions = function (value) {
                var options = _super.prototype.loadOptions.call(this, value);
                if (!options)
                    return options;
                return options;
            };
            ActivityControl.prototype._turnTo = function (index) {
                var oldItem = this.current();
                this._index = index;
                var cur = this.current();
                this.changing.raise({
                    key: "active",
                    old: !!oldItem && !!oldItem.control ? { key: oldItem.key, control: oldItem.control, model: oldItem.model, index: oldItem.index } : null,
                    value: !!cur && !!cur.control ? { key: cur.key, control: cur.control, model: cur.model, index: index } : null
                });
                if (!!oldItem && !!oldItem.control) {
                    AliHub.Elements.changeStyleRef(oldItem.control.getElement(), "ali-state-active-f", "ali-state-active-t");
                    oldItem.control.styleProp("display", "none");
                }
                if (!cur || !cur.control) {
                    this.changed.raise(null);
                    return;
                }
                AliHub.Elements.changeStyleRef(cur.control.getElement(), "ali-state-active-t", "ali-state-active-f");
                cur.control.styleProp("display", "");
                this.changed.raise({ key: cur.key, control: cur.control, model: cur.model, index: index });
            };
            return ActivityControl;
        }(VisualControl));
        Common.ActivityControl = ActivityControl;
        var ListenedBag = (function () {
            function ListenedBag() {
                this._model = {};
                this.changed = new AliHub.Collection.EventHandlers();
            }
            ListenedBag.prototype.prop = function (key, value) {
                if (!key)
                    return undefined;
                if (arguments.length > 1) {
                    this.listenedProp(key, true)(value);
                }
                return this._model[key] && typeof this._model[key] === "function" ? this._model[key]() : undefined;
            };
            ListenedBag.prototype.listenedProp = function (key, createOneWhenEmpty) {
                var _this = this;
                var obs = this._model[key];
                if (!obs && createOneWhenEmpty) {
                    this._model[key] = Common.listenedObj();
                    obs = this._model[key];
                    obs.referenceKey = key;
                    obs.listen(function (ev) {
                        _this.changed.raise({
                            key: key,
                            old: ev.oldValue,
                            value: ev.newValue
                        });
                    });
                }
                return obs;
            };
            ListenedBag.prototype.loadModel = function (bag) {
                if (!bag)
                    return;
                var count = 0;
                for (var prop in bag) {
                    if (!prop || typeof prop !== "string")
                        continue;
                    this.prop(prop, bag[prop]);
                    count++;
                }
                return count;
            };
            ListenedBag.prototype.getModel = function () {
                var info = {};
                for (var prop in this._model) {
                    if (!prop || typeof prop !== "string")
                        continue;
                    var obs = this._model[prop];
                    if (!obs || typeof obs !== "function" || !obs.model || !obs.subscribe || !obs.listen)
                        continue;
                    info[prop] = obs();
                }
                return info;
            };
            ListenedBag.prototype.hasProp = function (key) {
                var obs = this._model[key];
                return obs && typeof obs === "function" && obs.model && obs.subscribe && obs.listen;
            };
            ListenedBag.prototype.removeProp = function () {
                var _this = this;
                var key = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    key[_i] = arguments[_i];
                }
                var count = 0;
                key.forEach(function (prop) {
                    if (!prop || typeof prop !== "string")
                        return;
                    var obs = _this._model[prop];
                    if (!obs)
                        return;
                    var oldValue = obs();
                    delete _this._model[prop];
                    if (oldValue !== undefined)
                        _this.changed.raise({
                            key: prop,
                            old: oldValue,
                            value: undefined
                        });
                    count++;
                });
                return count;
            };
            return ListenedBag;
        }());
        Common.ListenedBag = ListenedBag;
        /**
          * Gets a handler to manage a continuity task.
          * @param options  The options.
          */
        function getContinuityTask(options) {
            if (!options || !options.process || options.count === 0 || options.span === 0)
                return;
            if (!options.start && options.count == null) {
                return function () { return options.process(0, options); };
            }
            var count = 0;
            var time = null;
            return function () {
                var timespan = time != null ? AliHub.Common.DateTime.getSpan(time, new Date) : null;
                time = new Date();
                if (timespan == null || isNaN(timespan) || timespan > (options.span || 1000)) {
                    count = 1;
                    return;
                }
                count++;
                var start = options.start ? options.start : 0;
                if (count >= start && (options.count == null || options.count > count - start))
                    options.process(count - 1, options);
            };
        }
        Common.getContinuityTask = getContinuityTask;
        function sleepLoop(h, timeout, count) {
            var task = { timeout: timeout, times: 0 };
            if (Common.Maths.isValidNumber(count) && count >= 0)
                task.count = count;
            task.proc = function () {
                var result = h();
                try {
                    if (task.times < Number.MAX_VALUE)
                        task.times++;
                    if (task.times >= task.count && task.count >= 0)
                        return;
                }
                catch (ex) { }
                if (!result)
                    return;
                task.token = setTimeout(function () {
                    delete task["token"];
                    task.proc();
                }, task.timeout);
            };
            task.proc();
            return {
                dispose: function () {
                    if (task.token != null)
                        try {
                            clearTimeout(task.token);
                        }
                        catch (ex) { }
                },
                times: function () {
                    return task.times;
                },
                timeout: function (value) {
                    if (arguments.length > 0 && Common.Maths.isValidNumber(value))
                        task.timeout = value;
                    return task.timeout;
                },
                count: function (value) {
                    if (arguments.length > 0) {
                        if (Common.Maths.isValidNumber(value))
                            task.count = value;
                        else
                            delete task["count"];
                    }
                    return task.count;
                },
                handler: function () {
                    return h;
                }
            };
        }
        Common.sleepLoop = sleepLoop;
        /**
          * Creates deferred object.
          */
        function deferred() {
            if (typeof Promise !== "undefined") {
                try {
                    if (Promise) {
                        var resolveH;
                        var rejectH;
                        var promise = new Promise(function (resolve, reject) {
                            resolveH = resolve;
                            rejectH = reject;
                        });
                        return {
                            resolve: function (value) {
                                resolveH(value);
                            },
                            reject: function (reason) {
                                rejectH(reason);
                            },
                            promise: function () {
                                return promise;
                            },
                            then: function () {
                                promise.then.apply(promise, arguments);
                            },
                            catch: function () {
                                promise.catch.apply(promise, arguments);
                            }
                        };
                    }
                }
                catch (ex) { }
            }
            if (typeof jQuery !== "undefined") {
                if (jQuery && jQuery.Deferred)
                    return jQuery.Deferred();
            }
            return null;
        }
        Common.deferred = deferred;
        /**
          * Rejects deferred.
          */
        function rejectDeferred(deferred, message, info, inner) {
            if (!deferred)
                deferred = Common.deferred();
            deferred.reject({
                title: message,
                message: message,
                info: info,
                inner: inner,
                timestamp: new Date()
            });
            return deferred;
        }
        Common.rejectDeferred = rejectDeferred;
        /**
          * Listens model changes for binding control.
          * @param control  the source control.
          * @param obj  the object to bind.
          */
        function listenBindingControl(control, obj, proc, ignoreFirstProc) {
            if (ignoreFirstProc === void 0) { ignoreFirstProc = false; }
            var disp = new AliHub.Collection.DisposableArray();
            if (!obj)
                obj = {};
            var init = function () {
                obj.id = control.getId();
                obj.model = control.viewModel();
                obj.info = control.info();
                obj.converted = control.converted();
                obj.prop = {};
                control.propKeys().forEach(function (ele, i, arr) {
                    obj.prop[ele] = control.prop(ele);
                });
            };
            if (!proc)
                proc = function (h) { h(); };
            if (!ignoreFirstProc)
                proc(init);
            else
                init();
            control.viewModelChanged.add(function (ev) {
                proc(function () {
                    obj.model = ev.value;
                });
            }, control, disp);
            control.convertedChanged.add(function (ev) {
                proc(function () {
                    obj.converted = ev.value;
                });
            }, control, disp);
            control.convertorChanged.add(function (ev) {
                proc(function () {
                    obj.convertor = ev.value;
                });
            }, control, disp);
            control.propChanged.add(function (ev) {
                if (!ev.key)
                    return;
                proc(function () {
                    if (!obj.prop)
                        obj.prop = {};
                    obj.prop[ev.key] = ev.value;
                });
            }, control, disp);
            disp.data = obj;
            return disp;
        }
        Common.listenBindingControl = listenBindingControl;
        /**
          * Sets the default binding factory instance.
          * @param factory  The binding factory instance.
          */
        function bindingFactory(value, forNullOnly) {
            if (forNullOnly === void 0) { forNullOnly = false; }
            if (arguments.length > 0) {
                if (forNullOnly !== true || !Inner.bindingFactory)
                    Inner.bindingFactory = value;
            }
            return Inner.bindingFactory;
        }
        Common.bindingFactory = bindingFactory;
        /**
          * Creates a binding object.
          * @param value  The value if need fill initially.
          */
        function bindingObj(value) {
            if (Inner.bindingFactory) {
                return arguments.length > 0 ? Inner.bindingFactory.create(value) : Inner.bindingFactory.create();
            }
            return arguments.length > 0 ? listenedObj(value) : listenedObj();
        }
        Common.bindingObj = bindingObj;
        /**
          * Creates a listened object.
          * @param value  The value if need fill initially.
          */
        function listenedObj(initValue) {
            var raw = initValue;
            var times = 0;
            var times2 = 0;
            var changing = new AliHub.Collection.EventHandlers();
            var changed = new AliHub.Collection.EventHandlers();
            var obs = function (value) {
                if (arguments.length > 0) {
                    if (times2 < Number.MAX_VALUE)
                        times2++;
                    var oldValue = raw;
                    if (value === oldValue)
                        return;
                    if (obs.format && typeof obs.format === "function")
                        value = obs.format(value, oldValue);
                    if (value === oldValue)
                        return;
                    changing.raise({ oldValue: oldValue, newValue: value, event: "changing", target: null, times: times });
                    raw = value;
                    if (times < Number.MAX_VALUE)
                        times++;
                    changed.raise({ oldValue: oldValue, newValue: value, event: "changed", target: null, times: times });
                }
                return raw;
            };
            obs.bag = {};
            obs.listenChanging = function (h, target, disposableList, args, remove) {
                return changing.add(h, target, disposableList, args, remove);
            };
            obs.listen = function (h, target, disposableList, args, remove) {
                return changed.add(h, target, disposableList, args, remove);
            };
            obs.listenOnce = function (h, target, disposableList, args, remove) {
                return changed.addOnce(h, target, disposableList, args);
            };
            obs.forceToNotify = function (delay) {
                var notifyNow = function () {
                    changing.raise({ oldValue: raw, newValue: raw, event: "notify", target: null, times: times });
                    changed.raise({ oldValue: raw, newValue: raw, event: "notify", target: null, times: times });
                };
                if (delay == null || delay === false)
                    notifyNow();
                else if (delay === true)
                    setTimeout(notifyNow, 0);
                else if (typeof delay === "number")
                    setTimeout(notifyNow, delay);
            };
            obs.unlisten = function (h) {
                changed.remove(h);
            };
            obs.unlistenChanging = function (h) {
                changing.remove(h);
            };
            obs.clearListener = function () {
                changed.clear();
            };
            obs.clearChangingListener = function () {
                changing.clear();
            };
            obs.subscribe = function (callback, target, event) {
                event = event ? event.toString().toLowerCase() : null;
                if (!event || event === "changed" || event === "change")
                    return changed.add(function (ev) {
                        callback.call(target, ev.newValue);
                    });
                if (event === "changing" || event === "beforechange")
                    return changing.add(function (ev) {
                        callback.call(target, ev.newValue);
                    });
                return { useless: true, dispose: function () { }, raise: function () { callback.call(target, raw); } };
            };
            obs.model = function (value, forceToNotify) {
                if (forceToNotify === void 0) { forceToNotify = false; }
                if (arguments.length > 0) {
                    if (forceToNotify && obs() === value)
                        obs.forceToNotify();
                    else
                        obs(value);
                }
                return raw;
            };
            obs.loadFromWeb = function (subject, key, parameters) {
                var promise = AliHub.Web.resolve(subject, key, parameters);
                promise.then(function (m) {
                    obs.model(m.result);
                });
                return promise;
            };
            obs.copyModel = function () {
                return Reflection.copy(raw);
            };
            obs.changeTimes = function () {
                return times;
            };
            obs.setterCalledTimes = function () {
                return times2;
            };
            obs.toJSON = function () {
                return Common.Text.serialize(raw);
            };
            return obs;
        }
        Common.listenedObj = listenedObj;
        function entityBinding(resolve, id) {
            var obs = (arguments.length > 1 ? listenedObj(id) : listenedObj());
            obs.getEntity = resolve && typeof resolve === "function" ? function () {
                var id = obs();
                if (!id)
                    return null;
                return resolve(id);
            } : null;
            return obs;
        }
        Common.entityBinding = entityBinding;
        /**
          * Creates a binding array.
          * @param col  The array if need fill initially.
          */
        function bindingArray(col) {
            if (Inner.bindingFactory) {
                return arguments.length > 0 ? Inner.bindingFactory.createArray(col) : Inner.bindingFactory.createArray();
            }
            var obs = Common.listenedObj(col);
            obs.indexOf = function (searchElement, fromIndex) {
                return (obs() || []).indexOf(searchElement, fromIndex);
            };
            obs.slice = function (start, end) {
                return (obs() || []).slice(start, end);
            };
            obs.splice = function (start, deleteCount) {
                var items = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    items[_i - 2] = arguments[_i];
                }
                return (_a = (obs() || [])).splice.apply(_a, [start, deleteCount].concat(items));
                var _a;
            };
            obs.pop = function () {
                return (obs() || []).pop();
            };
            obs.push = function () {
                var items = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i] = arguments[_i];
                }
                var list = obs();
                if (!list)
                    return;
                list.push.apply(list, items);
            };
            obs.shift = function () {
                return (obs() || []).shift();
            };
            obs.unshift = function () {
                var items = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i] = arguments[_i];
                }
                return (obs() || []).unshift();
            };
            obs.reverse = function () {
                return bindingArray((obs() || []).reverse());
            };
            obs.sort = function (compareFunction) {
                var list = obs();
                if (!list)
                    return;
                return bindingArray(arguments.length > 0 ? list.sort(compareFunction) : list.sort());
            };
            return obs;
        }
        Common.bindingArray = bindingArray;
        /**
          * Applies binding for view.
          * @param viewModel  The view model.
          * @param element  The element to bind.
          */
        function applyBindings(control) {
            if (!Inner.bindingFactory || !control)
                return;
            Inner.bindingFactory.applyBindings(control);
        }
        Common.applyBindings = applyBindings;
        /**
          * Applies binding for view.
          * @param name  The name of template engine.
          * @param value  The template engine to register.
          */
        function setTemplateEngine(name, value) {
            Inner.templateEngines[name] = value;
        }
        Common.setTemplateEngine = setTemplateEngine;
        /**
          * Applies binding for view.
          * @param name  The name of template engine.
          */
        function removeTemplateEngine(name) {
            delete Inner.templateEngines[name];
        }
        Common.removeTemplateEngine = removeTemplateEngine;
        /**
          * Applies a view template with a view model.
          * @param id  The element identifier.
          * @param valueType  The template source type.
          * @param value  The template source value.
          * @param bindings  The view model.
          * @param onerror  The handler to raised on error. The exception message will be provided; a value indicating whether need throw is expected to return.
          */
        function applyTemplate(type, control, valueType, value, onerror) {
            if (!control)
                return;
            if (!valueType || valueType === "")
                valueType = "static";
            var str = null;
            var element = control.getElement();
            if (!element)
                return;
            switch (valueType.toString().toLowerCase()) {
                case "html":
                case "htm":
                case "static":
                    str = value ? value.toString() : "";
                    break;
                case "element":
                    var srcEle = value ? AliHub.Elements.getById(value) : element;
                    if (!srcEle)
                        return;
                    str = srcEle.innerHTML;
                    break;
                case "this":
                case "inner":
                    if (value) {
                        var innerEle = control.getChildElement(true, value);
                        if (!innerEle)
                            return;
                        str = innerEle.innerHTML;
                    }
                    else {
                        str = element.innerHTML;
                    }
                    break;
                case "ajax":
                    if (value)
                        AliHub.Web.RestJob.getString(value, {}).then(function (str) {
                            Common.applyTemplate(type, control, "static", str, onerror);
                        });
                    return;
                default:
                    return;
            }
            if (str) {
                str = str.replace(/__view_control_/g, element.id + "_").replace(/{{_id}}/g, element.id).replace(/{{id\(\)}}/g, element.id);
                element.innerHTML = str;
                if (!type) {
                    var strTrim = Common.Text.trim(str);
                    var teSearText = "<!-- template-engine:";
                    var teIndex = strTrim.indexOf(teSearText);
                    if (teIndex < 5) {
                        var teLastIndex = strTrim.indexOf("-->", teSearText.length);
                        if (teLastIndex < 50) {
                            var teString = strTrim.substring(teIndex + teSearText.length, teLastIndex);
                            if (teString && teString.indexOf("\n") > 0)
                                teString = teString.substring(0, teString.indexOf("\n"));
                            if (teString && teString.indexOf("\r") > 0)
                                teString = teString.substring(0, teString.indexOf("\r"));
                            if (teString)
                                teString = Common.Text.trim(teString.replace("\n", "").replace("\r", ""));
                            if (teString)
                                type = teString;
                        }
                    }
                }
            }
            else {
                element.innerHTML = "";
            }
            try {
                var te = null;
                if (type)
                    te = typeof type === "function" ? type : Inner.templateEngines[type];
                if (!te && Inner.defaultTemplateEngine)
                    te = Inner.templateEngines[Inner.defaultTemplateEngine];
                if (!te)
                    te = Common.applyBindings;
                if (te)
                    te(control);
                else
                    AliHub.Diagnostics.error("CoreLibrary", "[0x02090404] Failed to apply bindings because there is no one registered.");
            }
            catch (ex) {
                if (!onerror)
                    return;
                var errMsg = ex && ex.message ? ex.message : AliHub.Res.builtIn().localString("bindingError");
                AliHub.Diagnostics.error("CoreLibrary", "[0x02090403] Failed to apply bindings" + (type ? (" via " + type) : "") + ". (" + errMsg + ")");
                if (!onerror(errMsg))
                    throw ex;
            }
        }
        Common.applyTemplate = applyTemplate;
        /**
          * Gets or sets the template engine.
          */
        function defaultTemplateEngine(value) {
            if (arguments.length > 0)
                Inner.defaultTemplateEngine = value;
            return Inner.defaultTemplateEngine;
        }
        Common.defaultTemplateEngine = defaultTemplateEngine;
        /**
          * Gets parent control.
          */
        function parentControl(element) {
            var ele = AliHub.Elements.getById(element);
            if (!ele)
                return null;
            var parent = ele.parentElement;
            while (parent && parent !== document.body) {
                if (parent._control)
                    return parent._control;
                parent = parent.parentElement;
            }
            return null;
        }
        Common.parentControl = parentControl;
        /**
          * Gets current control.
          */
        function currentControl(element) {
            var ele = AliHub.Elements.getById(element);
            while (ele && ele !== document.body) {
                if (ele._control)
                    return ele._control;
                ele = ele.parentElement;
            }
            return null;
        }
        Common.currentControl = currentControl;
        function getBuiltInControlType(type) {
            if (typeof type !== "string")
                return null;
            switch (type.toLowerCase().replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace("-", "").replace("-", "").replace("-", "").replace("-", "").replace("alihub", "").replace("quark", "").replace("control", "")) {
                case "visual":
                case "commonvisual":
                    return Common.VisualControl;
                case "binding":
                case "commonbinding":
                    return Common.BindingControl;
                case "activity":
                case "commonactivity":
                    return Common.ActivityControl;
                case "time":
                case "commontime":
                    return Common.TimeControl;
                case "list":
                case "collectionlist":
                    return AliHub.Collection.ListControl;
                case "table":
                case "collectiontable":
                    return AliHub.Collection.TableControl;
                case "paging":
                case "collectionpaging":
                    return AliHub.Collection.PagingControl;
                case "array":
                case "arraybinding":
                case "collectionbinding":
                    return AliHub.Collection.BindingControl;
                case "switch":
                case "collectionswitch":
                    return AliHub.Collection.SwitchControl;
                case "singleflow":
                case "collectionsingleflow":
                    return AliHub.Collection.SingleFlowControl;
                case "audio":
                case "mediaaudio":
                    return AliHub.Media.AudioControl;
                case "camera":
                case "mediacamera":
                    return AliHub.Media.CameraControl;
                case "button":
                case "elementsbutton":
                    return AliHub.Elements.ButtonControl;
                case "checkbox":
                case "elementscheckbox":
                    return AliHub.Elements.ButtonControl;
                default:
                    return AliHub.Elements.getControlRegisteredForTag(type.toLowerCase());
            }
        }
        /**
          * Fills a control in an element.
          * @param element  The element.
          * @param options  The options to load.
          */
        function fillControl(element, type, options) {
            var ele = AliHub.Elements.getById(element);
            if (!ele || !ele.tagName)
                return null;
            if (ele._control)
                return ele._control;
            var toFill = true;
            var parentEle = ele;
            while (parentEle) {
                var eTagName = parentEle.tagName ? parentEle.tagName.toString().toLowerCase() : null;
                if (!eTagName || eTagName === "template" || eTagName === "part" || eTagName === "template-part") {
                    toFill = false;
                    break;
                }
                parentEle = parentEle.parentElement;
            }
            if (!toFill)
                return;
            if (!type) {
                if (ele.tagName.toLowerCase().indexOf("quark-") === 0)
                    type = ele.tagName.toLowerCase();
                else if (AliHub.Elements.hasControlRegisteredForTag() && ele.tagName.toLowerCase().indexOf("-") > 0)
                    type = ele.tagName.toLowerCase();
                else if (ele.getAttribute && ele.getAttribute("data-control-type"))
                    type = ele.getAttribute("data-control-type");
            }
            if (!type)
                return null;
            var gen = type;
            if (typeof type === "string")
                gen = getBuiltInControlType(type);
            var c = ele && gen && typeof gen === "function" ? new gen(ele) : null;
            if (!c)
                return null;
            c.loadOptions(Reflection.unwrapObject(options, c));
            return c;
        }
        Common.fillControl = fillControl;
        /**
          * Gets a specific control.
          * @param id  the element identifier or prefix.
          * @param appendingIdParts  the additional identifier parts.
          */
        function getControl(element) {
            var appendingIdParts = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                appendingIdParts[_i - 1] = arguments[_i];
            }
            var ele = AliHub.Elements.getById.apply(AliHub.Elements, [element].concat(appendingIdParts));
            return ele && ele._control ? ele._control : null;
        }
        Common.getControl = getControl;
        /**
          * Creates a control as child.
          * @param id  The identifier.
          * @param control  The type of the control to append.
          * @param parent  The parent control.
          */
        function createControl(id, control, options, parent) {
            if (!control)
                control = VisualControl;
            var cO = options;
            var pC = parent && parent.getId ? parent : null;
            if (options && options.getId && (!pC || !pC.getId)) {
                cO = null;
                pC = options;
            }
            if (!cO && parent && !parent.getId) {
                cO = parent;
            }
            var c;
            if (pC) {
                if (!id)
                    return null;
                if (id.tagName) {
                    if (!id.id)
                        id.id = Common.Maths.randomString("ali_content_ele_t_ri");
                    id = id.id;
                }
                c = pC.createControl(id, control);
            }
            else {
                c = new control(id);
            }
            if (cO && c)
                c.loadOptions(cO);
            return c;
        }
        Common.createControl = createControl;
        /**
          * Creates a VisualControl.
          * @param idSuffix  The identifier or identifier suffix if has a parent control.
          * @param options  The initializition options.
          * @param parent  The parent control.
          */
        function visualControl(idSuffix, options, parent) {
            return createControl(idSuffix, null, options, parent);
        }
        Common.visualControl = visualControl;
        /**
          * Creates a BindingControl.
          * @param idSuffix  The identifier or identifier suffix if has a parent control.
          * @param options  The initializition options.
          * @param parent  The parent control.
          */
        function bindingControl(idSuffix, options, parent) {
            return createControl(idSuffix, BindingControl, options, parent);
        }
        Common.bindingControl = bindingControl;
        /**
          * Creates a ActivityControl.
          * @param idSuffix  The identifier or identifier suffix if has a parent control.
          * @param options  The initializition options.
          * @param parent  The parent control.
          */
        function activityControl(idSuffix, options, parent) {
            return createControl(idSuffix, ActivityControl, options, parent);
        }
        Common.activityControl = activityControl;
    })(Common = AliHub.Common || (AliHub.Common = {}));
})(AliHub || (AliHub = {}));
(function (AliHub) {
    var Data;
    (function (Data) {
        /**
          * Data sources.
          */
        Data.Sources = {};
    })(Data = AliHub.Data || (AliHub.Data = {}));
})(AliHub || (AliHub = {}));
// For asynchronous modules loaders.
(function () {
    var __resolveAliHub = function (message) {
        if (typeof console === "undefined")
            return AliHub;
        if (console && typeof console.info === "function")
            console.info("Quark loads completed by AMD.");
        return AliHub;
    };
    try {
        if (!window._pageInitDate)
            window._pageInitDate = new Date();
    }
    catch (ex) { }
    if (typeof define === 'function') {
        if (define['amd']) {
            define(["exports"], function (exports) {
                return __resolveAliHub("Quark loads completed by AMD.");
            });
        }
        else if (typeof __webpack_require__ !== "undefined") {
            define(["exports"], function (exports) {
                return __resolveAliHub("Quark loads completed by Webpack.");
            });
        }
        else if (typeof modulex !== "undefined" || typeof KISSY !== "undefined") {
            define(function (r, e, m) {
                return __resolveAliHub("Quark loads completed by KISSY / Modulex.");
            });
        }
    }
    else if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        __resolveAliHub("Quark loads completed by CommonJS.");
        module["exports"] = AliHub;
    }
    else if (typeof KISSY !== "undefined") {
        KISSY.add(function (S) {
            return __resolveAliHub("Quark loads completed by KISSY 1.x.");
        }, { requires: [] });
    }
})();
/*  --------------------
 *  Collection - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  collection.ts
 *  Description  Collection library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
/// <reference path="common.ts" />
var AliHub;
(function (AliHub) {
    var Collection;
    (function (Collection) {
        /**
          * Table column types.
          */
        var ReferenceMappingTypes;
        (function (ReferenceMappingTypes) {
            ReferenceMappingTypes[ReferenceMappingTypes["Property"] = 0] = "Property";
            ReferenceMappingTypes[ReferenceMappingTypes["Id"] = 1] = "Id";
            ReferenceMappingTypes[ReferenceMappingTypes["Key"] = 2] = "Key";
            ReferenceMappingTypes[ReferenceMappingTypes["Index"] = 3] = "Index";
            ReferenceMappingTypes[ReferenceMappingTypes["Function"] = 6] = "Function";
            ReferenceMappingTypes[ReferenceMappingTypes["Static"] = 7] = "Static";
        })(ReferenceMappingTypes = Collection.ReferenceMappingTypes || (Collection.ReferenceMappingTypes = {}));
        /**
          * Table column types.
          */
        var TableColumnTypes;
        (function (TableColumnTypes) {
            TableColumnTypes[TableColumnTypes["None"] = 0] = "None";
            TableColumnTypes[TableColumnTypes["Property"] = 1] = "Property";
            TableColumnTypes[TableColumnTypes["Item"] = 2] = "Item";
            TableColumnTypes[TableColumnTypes["Statistics"] = 3] = "Statistics";
            TableColumnTypes[TableColumnTypes["Index"] = 4] = "Index";
            TableColumnTypes[TableColumnTypes["Action"] = 5] = "Action";
            TableColumnTypes[TableColumnTypes["Decorator"] = 6] = "Decorator";
            TableColumnTypes[TableColumnTypes["Other"] = 7] = "Other";
        })(TableColumnTypes = Collection.TableColumnTypes || (Collection.TableColumnTypes = {}));
        /**
          * Button render styles.
          */
        var ButtonRenderStyles;
        (function (ButtonRenderStyles) {
            /**
              * Normal button.
              */
            ButtonRenderStyles[ButtonRenderStyles["normal"] = 0] = "normal";
            /**
              * Textbox button.
              */
            ButtonRenderStyles[ButtonRenderStyles["text"] = 1] = "text";
            /**
              * Image button.
              */
            ButtonRenderStyles[ButtonRenderStyles["image"] = 2] = "image";
        })(ButtonRenderStyles = Collection.ButtonRenderStyles || (Collection.ButtonRenderStyles = {}));
        /**
          * Selection modes.
          */
        var SelectionModes;
        (function (SelectionModes) {
            /**
              * Selection is off.
              */
            SelectionModes[SelectionModes["None"] = 0] = "None";
            /**
              * Single item selection.
              */
            SelectionModes[SelectionModes["Single"] = 1] = "Single";
            /**
              * Single item selection or empty.
              */
            SelectionModes[SelectionModes["SingleOrEmpty"] = 2] = "SingleOrEmpty";
            /**
              * Multiple selection.
              */
            SelectionModes[SelectionModes["Multiple"] = 3] = "Multiple";
        })(SelectionModes = Collection.SelectionModes || (Collection.SelectionModes = {}));
        /**
          * Array binding control.
          */
        var BindingControl = (function (_super) {
            __extends(BindingControl, _super);
            /**
              * Initializes a new instance of the ArrayBindingControl class.
              * @param id  Element ID. The content will be filled into this element to replace original ones.
              */
            function BindingControl(id) {
                var _this = _super.call(this, id) || this;
                _this._model = AliHub.Common.bindingArray();
                _this._info = AliHub.Common.bindingObj();
                _this._extenders = [];
                _this._convertor = null;
                _this._converted = AliHub.Common.bindingObj();
                _this._extendersLoaded = false;
                _this.viewModelChanged = new Collection.EventHandlers();
                _this.convertedChanged = new Collection.EventHandlers();
                _this.convertorChanged = new Collection.EventHandlers();
                _this.infoChanged = new Collection.EventHandlers();
                _this._modelDispose = _this._model.subscribe(function (newValue) {
                    var converted = _this._updateConverted(newValue);
                    _this._loadExtenders();
                    if (_this.viewModelChanged && _this.viewModelChanged.raise)
                        _this.viewModelChanged.raise({ key: "viewModel", value: newValue });
                    if (_this.convertedChanged && _this.convertedChanged.raise)
                        _this.convertedChanged.raise({ key: "converted", value: converted });
                });
                return _this;
            }
            /**
              * Raises on binding error.
              */
            BindingControl.prototype.onBindingError = function (errorMessage) {
                return !!this._model();
            };
            /**
              * Gets or sets templete engine.
              * @param value  The templete engine type.
              */
            BindingControl.prototype.templateEngine = function (name) {
                if (arguments.length > 0) {
                    this._templateEngine = name;
                }
                return this._templateEngine;
            };
            /**
              * Sets the template.
              * @param valueType  The data source type for the value.
              * @param value  The data source value.
              */
            BindingControl.prototype.setTemplate = function (valueType, value) {
                var _this = this;
                if (valueType == null && value == null)
                    return;
                if (valueType === "part" || valueType === "initpart") {
                    value = this.templatePart(!!value ? value : "item");
                    if (valueType === "initpart" && !value)
                        return;
                    valueType = "";
                }
                AliHub.Common.applyTemplate(this._templateEngine, this, valueType, value, function (errMsg) { return _this.onBindingError(errMsg); });
                this._loadExtenders();
            };
            /**
              * Gets or sets the view model.
              * @param value  Model value to set; or null, if just to resolve model.
              */
            BindingControl.prototype.viewModel = function (value) {
                if (arguments.length > 0) {
                    this._model(value);
                }
                return this._model();
            };
            /**
              * Sets the view model from web.
              * @param subject  The subject of data resolver registered.
              * @param key  The key of data resolver.
              */
            BindingControl.prototype.setViewModelFromWeb = function (subject, key, parameters) {
                var _this = this;
                var promise = AliHub.Web.resolve(subject, key, parameters);
                promise.then(function (m) {
                    _this.viewModel(m.result);
                });
                return promise;
            };
            /**
              * Subscribe view model changed.
              * @param h  Callback during value has been changed.
              * @param target  The "this" target of h callback.
              */
            BindingControl.prototype.subscribeViewModel = function (h, target) {
                var _this = this;
                return this.viewModelChanged.add(function (ev) {
                    h.call(target || _this, ev.value);
                });
            };
            /**
              * Gets observable view model.
              */
            BindingControl.prototype.observableViewModel = function () {
                return this._model;
            };
            /**
              * Gets or sets the additional information.
              * @param value  The additional information value to set; or ignore this parameter, if just resolve the additional information.
              */
            BindingControl.prototype.info = function (value) {
                if (arguments.length > 0)
                    this._info(value);
                return this._info();
            };
            /**
              * Sets the additional information.
              * @param value  The additional information value to set; or ignore this parameter, if just resolve the additional information.
              */
            BindingControl.prototype.setInfo = function (value) {
                this._info(value);
                this.infoChanged.raise({ key: "info", value: value });
                this._loadExtenders();
            };
            /**
              * Gets or sets the convertor.
              * @param value  The convertor to set; or ignore this parameter, if just resolve the convertor.
              */
            BindingControl.prototype.convertor = function (h) {
                if (arguments.length > 0) {
                    this.setConvertor(h);
                }
                return this._convertor;
            };
            /**
              * Sets the convertor.
              * @param value  The convertor to set; or ignore this parameter, if just resolve the convertor.
              */
            BindingControl.prototype.setConvertor = function (h) {
                if (h === this._convertor || (!h && !this._convertor))
                    return;
                this._convertor = h;
                var converted = this.updateConverted();
                if (this.convertorChanged && this.convertorChanged.raise)
                    this.convertorChanged.raise({ key: "convertor", value: h });
                if (this.convertedChanged && this.convertedChanged.raise)
                    this.convertedChanged.raise({ key: "converted", value: converted });
            };
            /**
              * Gets the converted value.
              */
            BindingControl.prototype.converted = function () {
                return this._converted();
            };
            /**
              * Updates the converted value.
              */
            BindingControl.prototype.updateConverted = function () {
                return this._updateConverted(this._model());
            };
            /**
              * Sets view model as null.
              */
            BindingControl.prototype.clearViewModel = function () {
                this.viewModel(null);
            };
            /**
              * Listens model changes.
              * @param obj  the object to bind.
              */
            BindingControl.prototype.listenModel = function (obj, proc, ignoreFirstProc) {
                if (ignoreFirstProc === void 0) { ignoreFirstProc = false; }
                return AliHub.Common.listenBindingControl(this, obj, proc, ignoreFirstProc);
            };
            /**
              * Refreshes view.
              */
            BindingControl.prototype.refresh = function () {
                var model = this._model();
                this._model();
                this._model(model);
            };
            /**
              * Loads specific options.
              * @param value  The options to load.
              */
            BindingControl.prototype.loadOptions = function (value) {
                var options = _super.prototype.loadOptions.call(this, value);
                if (!options)
                    return null;
                if (!!options.templateEngine)
                    this.templateEngine(options.templateEngine);
                if (!!options.viewModel)
                    this.viewModel(options.viewModel);
                if (!!options.convertor)
                    this.setConvertor(options.convertor);
                this.addExtender(options.extender);
                this.setTemplate(options.templateType, options.template);
                return options;
            };
            /**
              * Processes the extender to resolve additional model.
              * @param name  The extender name.
              * @param emptyObj  true if want to return an empty object instead of null when the extender does not exist; otherwise, false.
              */
            BindingControl.prototype.procExtender = function (name, emptyObj) {
                if (emptyObj === void 0) { emptyObj = false; }
                var extender = this.getExtender(name);
                if (!extender)
                    return emptyObj === true ? {} : null;
                return extender.model(this);
            };
            /**
              * Gets a specific extender.
              * @param name  The extender name.
              */
            BindingControl.prototype.getExtender = function (name) {
                if (!name)
                    return null;
                var extender = null;
                this._extenders.some(function (ele, i, arr) {
                    if (ele.name !== name)
                        return false;
                    extender = ele;
                    return true;
                });
                return extender;
            };
            /**
              * Adds an extender.
              * @param value  The extender instance.
              */
            BindingControl.prototype.addExtender = function (value) {
                var _this = this;
                var col = Collection.toArray(value);
                col.forEach(function (ele, i, arr) {
                    if (!ele || !ele.name)
                        return;
                    _this.removeExtender(ele.name);
                    _this._extenders.push(ele);
                    if (_this._extendersLoaded && ele.load)
                        ele.load(_this);
                });
            };
            /**
              * Removes a specific extender.
              * @param name  The extender name.
              */
            BindingControl.prototype.removeExtender = function (name) {
                if (!name)
                    return;
                var col = [];
                this._extenders.forEach(function (ele, i, arr) {
                    if (!ele || ele.name === name)
                        return;
                    col.push(ele);
                });
                this._extenders = col;
            };
            /**
              * Updates extenders.
              */
            BindingControl.prototype.updateExtenders = function () {
                this._loadExtenders();
            };
            /**
              * Clears all extenders registered.
              */
            BindingControl.prototype.clearExtenders = function () {
                this._extenders = [];
            };
            BindingControl.prototype._updateConverted = function (model) {
                if (!this._convertor)
                    return undefined;
                var converted = this._convertor(model);
                this._converted(converted);
                return this._converted();
            };
            BindingControl.prototype._loadExtenders = function () {
                var _this = this;
                if (this._extendersLoaded || !this.getElement())
                    return;
                var html = this.getElement().innerHTML;
                if (html && html !== "" && this.viewModel()) {
                    this._extendersLoaded = true;
                    this._extenders.forEach(function (ele, i, arr) {
                        if (!!ele && !!ele.load)
                            ele.load(_this);
                    });
                }
            };
            return BindingControl;
        }(AliHub.Common.VisualControl));
        Collection.BindingControl = BindingControl;
        /**
          * Item info for list control.
          */
        var ListItemInfo = (function () {
            function ListItemInfo() {
                /**
                  * References and cache.
                  */
                this.ref = {};
                /**
                  * Manual text notification.
                  */
                this.notify = new AliHub.Collection.EventHandlers();
            }
            /**
              * Sets reference instance property.
              * @param key  The property key.
              * @param value  The value of the property to set.
              */
            ListItemInfo.prototype.setProp = function (key, value) {
                if (!this.ref)
                    this.ref = {};
                this.ref[key] = value;
            };
            /**
              * Gets reference instance property.
              * @param key  The property key.
              */
            ListItemInfo.prototype.getProp = function (key) {
                if (!!this.ref)
                    return this.ref[key];
                this.ref = {};
                return null;
            };
            /**
              * Gets a child HTML element.
              * usePrefix  true if use current control identifier as prefix; otherwise, false.
              * appendingIdParts  the additional identifier parts.
              */
            ListItemInfo.prototype.getChildElement = function (usePrefix) {
                var appendingIdParts = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    appendingIdParts[_i - 1] = arguments[_i];
                }
                var id = AliHub.Elements.mergeId(usePrefix ? this.element.id : null, appendingIdParts);
                return AliHub.Elements.getById(id);
            };
            /**
              * Generates a copy of this instance.
              */
            ListItemInfo.prototype.copy = function () {
                var instance = new ListItemInfo();
                instance.element = this.element;
                instance.model = this.model;
                instance.index = this.index;
                instance.converted = this.converted;
                instance.extenders = this.extenders;
                instance.notify = this.notify;
                if (!this.ref)
                    this.ref = {};
                instance.ref = this.ref;
                return instance;
            };
            return ListItemInfo;
        }());
        Collection.ListItemInfo = ListItemInfo;
        /**
          * List control.
          */
        var ListControl = (function (_super) {
            __extends(ListControl, _super);
            /**
              * Initializes a new instance of the ListControl class.
              * @param id  Element ID. The content will be filled into this element to replace original ones.
              */
            function ListControl(id) {
                var _this = _super.call(this, id) || this;
                _this._list = [];
                _this._eleCount = 0;
                _this._extenders = [];
                _this._references = [];
                _this._selected = [];
                /**
                  * Raised on request update.
                  */
                _this.updateRequested = new EventHandlers();
                /**
                  * The handler raised on pushing entries.
                  */
                _this.entriesPushed = new EventHandlers();
                /**
                  * The handler raised on items selected.
                  */
                _this.selected = new EventHandlers();
                /**
                  * Selection mode for user experience.
                  */
                _this.selectionMode = SelectionModes.None;
                var eleId = _this.getId();
                var listId = eleId + "_list";
                var notificationId = eleId + "_notification";
                _this.addStyleRef("ali-controls-list");
                _this.getElement().innerHTML = "<div id=\"" + notificationId + "\" class=\"ali-pop-notification\" style=\"display: none; \"></div><ul id=\"" + listId + "\"></ul><div id=\"" + eleId + "_empty\" class=\"ali-container-empty\" style=\"display: none; \" ></div><div id=\"" + eleId + "_note\" class=\"ali-container-note\" style=\"display: none; \" ></div>";
                _this._listEle = AliHub.Elements.getById(listId);
                var notificationEle = AliHub.Elements.getById(notificationId);
                if (!!notificationEle)
                    notificationEle.onclick = function (ev) {
                        if (!!_this.updateRequested) {
                            if (!!_this.viewModel && !!_this.viewModel.onUpdateRequested)
                                _this.viewModel.onUpdateRequested(_this);
                            _this.updateRequested.raise({});
                        }
                        notificationEle.style.display = "none";
                    };
                return _this;
            }
            /**
              * Gets whether the list is empty to show.
              */
            ListControl.prototype.isEmpty = function () {
                var emptyContainer = this.getChildElement(true, "empty");
                var count = this.forEachItem();
                if (count === 0) {
                    if (!!emptyContainer)
                        emptyContainer.style.display = "";
                    return true;
                }
                if (!!emptyContainer)
                    emptyContainer.style.display = "none";
                return false;
            };
            /**
              * Adds a reference.
              */
            ListControl.prototype.addReference = function () {
                var _this = this;
                var values = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    values[_i] = arguments[_i];
                }
                if (!values)
                    return;
                values.forEach(function (value, vI, vA) {
                    if (Collection.contains(_this._references, value))
                        return;
                    _this._references.push(value);
                });
            };
            /**
              * Checks whehter there is a specific reference.
              */
            ListControl.prototype.containReference = function () {
                var value = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    value[_i] = arguments[_i];
                }
                return Collection.contains(this._references, value);
            };
            /**
              * Removes a specific reference.
              */
            ListControl.prototype.removeReference = function () {
                var value = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    value[_i] = arguments[_i];
                }
                Collection.remove(this._references, value, true);
            };
            /**
              * Clears all references.
              */
            ListControl.prototype.clearReference = function () {
                this._references = [];
            };
            /**
              * Gets an entry by a specific reference item.
              */
            ListControl.prototype.getEntry = function (reference) {
                return Collection.getEntry(this._references, reference);
            };
            /**
              * Gets entries by a specific reference item.
              */
            ListControl.prototype.getEntries = function (reference) {
                if (arguments.length === 0) {
                    var col = [];
                    this._list.forEach(function (ele, i, arr) {
                        if (!!ele)
                            col.push(ele.model);
                    });
                    return col;
                }
                return Collection.getEntries(this._references, reference);
            };
            /**
              * Selects one or more entries.
              * @param entry  The entry to select.
              */
            ListControl.prototype.select = function () {
                var entry = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    entry[_i] = arguments[_i];
                }
                var copied = Collection.copy(this._selected);
                if (this._changeSelection(entry, null) > 0)
                    this.selected.raise({ key: "selected", old: copied, value: this._selected });
            };
            /**
              * Unselects one or more entries.
              * @param entry  The entry to unselect.
              */
            ListControl.prototype.unselect = function () {
                var entry = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    entry[_i] = arguments[_i];
                }
                var copied = Collection.copy(this._selected);
                if (this._changeSelection(null, entry) > 0)
                    this.selected.raise({ key: "selected", old: copied, value: this._selected });
            };
            /**
              * Changes selection.
              * @param adding  The entry to select.
              * @param removing  The entry to unselect.
              * @param clearAction  A value indicating whether need clear before selection changing action.
              */
            ListControl.prototype.changeSelection = function (adding, removing, clearAction) {
                if (clearAction === void 0) { clearAction = false; }
                if (clearAction)
                    this.clearSelection();
                var copied = Collection.copy(this._selected);
                if (this._changeSelection(adding, removing) > 0)
                    this.selected.raise({ key: "selected", old: copied, value: this._selected });
            };
            /**
              * Clears all selection.
              */
            ListControl.prototype.clearSelection = function () {
                var copied = Collection.copy(this._selected);
                if (this._changeSelection(null, copied) > 0)
                    this.selected.raise({ key: "selected", old: copied, value: this._selected });
            };
            /**
              * Checks whether an entry is selected.
              * @param entry  The entry to test.
              */
            ListControl.prototype.isSelected = function (entry) {
                return Collection.indexOf(this._selected, entry) >= 0;
            };
            /**
              * Sets the tiles view mode.
              * @param index  true if enable tiles mode; otherwise, false.
              */
            ListControl.prototype.setTilesView = function (value) {
                var className = value ? "ali-controls-tiles" : "ali-controls-list";
                this.styleRef([className], ["ali-controls-list", "ali-controls-tiles"]);
            };
            /**
              * Removes a specific item.
              * @param index  Index of the item to remove.
              */
            ListControl.prototype.remove = function (index) {
                var _this = this;
                if (index < 0 || index >= this._list.length) {
                    this.isEmpty();
                    return;
                }
                var col = [];
                var delList = [];
                this._list.forEach(function (ele, i, arr) {
                    if (index === i) {
                        delList.push(ele.model);
                        ele.element.outerHTML = "";
                        return;
                    }
                    col.push(ele);
                    if (index > i)
                        return;
                    ele.index--;
                    _this.onItemIndexChanged(ele, ele.index + 1);
                });
                this.changeSelection(null, delList);
                this._list = col;
                this.isEmpty();
            };
            /**
              * Processes the extender to resolve additional model.
              * @param name  The extender name.
              * @param item  The target list item info.
              * @param emptyObj  true if want to return an empty object instead of null when the extender does not exist; otherwise, false.
              */
            ListControl.prototype.procExtender = function (name, item, emptyObj) {
                if (emptyObj === void 0) { emptyObj = false; }
                var extender = this.getExtender(name);
                if (!extender)
                    return emptyObj === true ? {} : null;
                return extender.model(this, item);
            };
            /**
              * Gets a specific extender.
              * @param name  The extender name.
              */
            ListControl.prototype.getExtender = function (name) {
                if (!name)
                    return null;
                var extender = null;
                this._extenders.some(function (ele, i, arr) {
                    if (ele.name !== name)
                        return false;
                    extender = ele;
                    return true;
                });
                return extender;
            };
            /**
              * Adds an extender.
              * @param value  The extender instance.
              */
            ListControl.prototype.addExtender = function (value) {
                var _this = this;
                if (!value)
                    return;
                var col = Collection.toArray(value);
                col.forEach(function (ele, i, arr) {
                    if (!ele || !ele.name)
                        return;
                    _this.removeExtender(ele.name);
                    _this._extenders.push(ele);
                });
            };
            /**
              * Removes a specific extender.
              * @param name  The extender name.
              */
            ListControl.prototype.removeExtender = function (name) {
                if (!name)
                    return;
                var col = [];
                this._extenders.forEach(function (ele, i, arr) {
                    if (!ele || ele.name === name)
                        return;
                    col.push(ele);
                });
                this._extenders = col;
            };
            /**
              * Clears all extenders registered.
              */
            ListControl.prototype.clearExtenders = function () {
                this._extenders = [];
            };
            /**
              * Push a given item. Supports actions of insertion, updating and removing.
              * @param entry  The item to set into the list. Collection supported.
              */
            ListControl.prototype.push = function () {
                var entry = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    entry[_i] = arguments[_i];
                }
                return this.pushRange(entry);
            };
            /**
              * Batch pushes a colletion.
              * @param col  A collection to delta update into the list.
              */
            ListControl.prototype.pushRange = function (col) {
                var _this = this;
                if (!col) {
                    this.isEmpty();
                    return [];
                }
                if (!Collection.isArray(col))
                    col = col.list || col.arr;
                if (!col) {
                    this.isEmpty();
                    return [];
                }
                var deltaCol = [];
                col.forEach(function (ele, index, arr) {
                    if (_this._push(ele))
                        deltaCol.push(ele);
                });
                this.refreshHeaders();
                if (deltaCol.length == 0)
                    return [];
                if (!!this.viewModel && !!this.viewModel.onEntriesPushed)
                    this.viewModel.onEntriesPushed(this, deltaCol);
                if (!!this.entriesPushed)
                    this.entriesPushed.raise(deltaCol);
                this.isEmpty();
                return deltaCol;
            };
            /**
              * Pushes a resource.
              * @param propertyKey  The property key to get collection in the resource object.
              * @param resource  A resource to push. Collection supported.
              */
            ListControl.prototype.pushResource = function (propertyKey) {
                var _this = this;
                var resource = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    resource[_i - 1] = arguments[_i];
                }
                if (!resource) {
                    this.isEmpty();
                    return [];
                }
                var col = [];
                var result = [];
                resource.forEach(function (res, resI, resA) {
                    if (!res)
                        return;
                    if (res instanceof Array) {
                        var pushedX = _this.pushRange(res);
                        if (!!pushedX)
                            pushedX.forEach(function (pushedItem, pushedI, pushedA) {
                                result.push(pushedItem);
                            });
                        return;
                    }
                    _this.addReference(res);
                    var entries = !!propertyKey ? res[propertyKey] : (res.list || res.arr);
                    if (!Collection.isArray(entries))
                        return;
                    var pushed = _this.pushRange(entries);
                    if (!!pushed)
                        pushed.forEach(function (pushedItem, pushedI, pushedA) {
                            result.push(pushedItem);
                        });
                });
                return result;
            };
            /**
              * Batch pushes a colletion from web.
              * @param subject  The subject of data resolver registered.
              * @param key  The key of data resolver.
              */
            ListControl.prototype.pushFromWeb = function (subject, key, parameters, clearBefore) {
                var _this = this;
                if (clearBefore === void 0) { clearBefore = false; }
                var promise = AliHub.Web.resolve(subject, key, parameters);
                promise.then(function (r) {
                    if (clearBefore)
                        _this.clear();
                    _this.push(r.result);
                });
                return promise;
            };
            /**
              * Batch pushes a colletion from web.
              * @param subject  The subject of data resolver registered.
              * @param key  The key of data resolver.
              */
            ListControl.prototype.pushRangeFromWeb = function (subject, key, parameters, clearBefore) {
                var _this = this;
                if (clearBefore === void 0) { clearBefore = false; }
                var promise = AliHub.Web.resolve(subject, key, parameters);
                promise.then(function (r) {
                    if (clearBefore)
                        _this.clear();
                    _this.pushRange(r.result);
                });
                return promise;
            };
            /**
              * Batch pushes a colletion from web.
              * @param subject  The subject of data resolver registered.
              * @param key  The key of data resolver.
              * @param propertyKey  The property key to get collection in the resource object.
              */
            ListControl.prototype.pushResourceFromWeb = function (subject, key, propertyKey, parameters, clearBefore) {
                var _this = this;
                if (clearBefore === void 0) { clearBefore = false; }
                var promise = AliHub.Web.resolve(subject, key, parameters);
                promise.then(function (r) {
                    if (clearBefore)
                        _this.clear();
                    _this.pushResource(propertyKey, r.result);
                });
                return promise;
            };
            /**
              * Reloads the list.
              */
            ListControl.prototype.refresh = function () {
                var _this = this;
                if (!this._listEle)
                    return;
                this._listEle.innerHTML = "";
                this._eleCount = 0;
                this._list.forEach(function (tile, i, arr) {
                    if (tile == null)
                        return;
                    var eleEle = document.createElement("li");
                    eleEle.className = "ali-container-main";
                    eleEle.id = _this._listEle.id + "_" + (new Date()).getMinutes().toString() + "i" + _this._eleCount;
                    tile.element = eleEle;
                    _this._eleCount++;
                    _this._listEle.appendChild(tile.element);
                    _this.renderItem(tile.copy());
                    if (!_this.isVisible(tile.model)) {
                        tile.element.style.display = "none";
                    }
                });
                this.refreshHeaders();
                this.isEmpty();
            };
            /**
              * Loads specific options.
              * @param value  The options to load.
              */
            ListControl.prototype.loadOptions = function (value) {
                var options = _super.prototype.loadOptions.call(this, value);
                if (!options)
                    return null;
                if (options.itemTemplateEngine)
                    this._itemTemplG = options.itemTemplateEngine;
                if (options.headerTemplateEngine)
                    this._headerTemplG = options.headerTemplateEngine;
                this.viewModel = new ConfigurableListViewModel({
                    areInSameGroup: options.areInSameGroup,
                    areSame: options.areSame,
                    convert: options.convert,
                    getGroupModel: options.getGroupModel,
                    isBefore: options.isBefore,
                    isDeleted: options.isDeleted,
                    isVisible: options.isVisible,
                    mergeChanging: options.mergeChanging,
                    valid: options.valid
                });
                if (options.tilesView != null)
                    this.setTilesView(options.tilesView);
                if (options.selectionMode != null)
                    this.selectionMode = options.selectionMode;
                if (!options.ignoreParts) {
                    this.setItemTemplate("initpart", null);
                    this.setHeaderTemplate("initpart", null);
                    this.setEmptyMessageTemplate("initpart", null);
                }
                if (options.emptyMessageTemplateEngine && !this._empty) {
                    this._empty = new AliHub.Common.BindingControl(this.getId() + "_empty");
                    this._empty.addStyleRef("ali-container-empty");
                    this._empty.templateEngine(options.emptyMessageTemplateEngine);
                }
                if (options.emptyMessageViewModel != null)
                    this.emptyMessageViewModel(options.emptyMessageViewModel);
                if (options.emptyMessageTemplate)
                    this.setEmptyMessageTemplate(options.emptyMessageTemplateType, options.emptyMessageTemplate);
                this.setItemTemplate(options.itemTemplateType, options.itemTemplate);
                this.setHeaderTemplate(options.headerTemplateType, options.headerTemplate);
                if (options.renderItem) {
                    if (!this.viewModel)
                        this.viewModel = {};
                    this.viewModel.renderItem = options.renderItem;
                }
                if (options.renderGroupTitle) {
                    if (!this.viewModel)
                        this.viewModel = {};
                    this.viewModel.renderGroupTitle = options.renderGroupTitle;
                }
                this.addExtender(options.extender);
                if (options.webData) {
                    var webData = typeof options.webData === "function" ? options.webData.call(options) : options.webData;
                    this.pushResourceFromWeb(webData.subject, webData.key, webData.propertyKey, webData.parameters, webData.clearBefore);
                }
                return options;
            };
            /**
              * Sets the view template of each item.
              * @param sourceType  The type of view template source.
              * @param sourceValue  The value of view template source.
              */
            ListControl.prototype.setItemTemplate = function (sourceType, sourceValue) {
                if (sourceType == null && sourceValue == null)
                    return;
                if (sourceType === "part" || sourceType === "initpart") {
                    sourceValue = this.templatePart(sourceValue ? sourceValue : "item");
                    if (sourceType === "initpart" && !sourceValue)
                        return;
                    sourceType = "";
                }
                this._itemTemplT = sourceType || "static";
                this._itemTemplV = sourceValue;
                this.refresh();
            };
            /**
              * Clears the view template of each item.
              */
            ListControl.prototype.clearItemTemplate = function () {
                this._itemTemplT = null;
                this._itemTemplV = null;
                this.refresh();
            };
            /**
              * Sets the view template of each group header.
              * @param sourceType  The type of view template source.
              * @param sourceValue  The value of view template source.
              */
            ListControl.prototype.setHeaderTemplate = function (sourceType, sourceValue) {
                if (sourceType == null && sourceValue == null)
                    return;
                if (sourceType === "part" || sourceType === "initpart") {
                    sourceValue = this.templatePart(!!sourceValue ? sourceValue : "header");
                    if (sourceType === "initpart" && !sourceValue)
                        return;
                    sourceType = "";
                }
                this._headerTemplT = !!sourceType ? sourceType : "static";
                this._headerTemplV = sourceValue;
                this.refresh();
            };
            /**
              * Clears the view template of each group header.
              */
            ListControl.prototype.clearHeaderTemplate = function () {
                this._headerTemplT = null;
                this._headerTemplV = null;
                this.refresh();
            };
            /**
              * Sets the view template of the empty message.
              * @param sourceType  The type of view template source.
              * @param sourceValue  The value of view template source.
              */
            ListControl.prototype.setEmptyMessageTemplate = function (sourceType, sourceValue, viewModel) {
                if (viewModel === void 0) { viewModel = null; }
                if (sourceType == null && sourceValue == null)
                    return;
                if (!this._empty) {
                    this._empty = new AliHub.Common.BindingControl(this.getId() + "_empty");
                    this._empty.addStyleRef("ali-container-empty");
                }
                if (sourceType === "part" || sourceType === "initpart") {
                    sourceValue = this.templatePart(!!sourceValue ? sourceValue : "empty");
                    if (sourceType === "initpart" && !sourceValue)
                        return;
                    sourceType = "";
                }
                this._empty.setTemplate(sourceType, sourceValue);
                if (arguments.length > 2)
                    this._empty.viewModel(viewModel);
            };
            /**
              * Gets or sets empty mesaage view model.
              */
            ListControl.prototype.emptyMessageViewModel = function (viewModel) {
                if (!this._empty)
                    return null;
                if (arguments.length > 0)
                    this._empty.viewModel(viewModel);
                return this._empty.viewModel();
            };
            /**
              * Sets the view template of item.
              */
            ListControl.prototype.refreshHeaders = function () {
                var _this = this;
                this.clearHeaders();
                var oldOne = null;
                var count = 0;
                var errCount = 0;
                this._list.forEach(function (tile, i, arr) {
                    if (tile == null)
                        return;
                    var isNewGroup = !oldOne || !_this.areInSameGroup(oldOne.model, tile.model);
                    oldOne = tile;
                    if (isNewGroup) {
                        var eleGroupEle = document.createElement("li");
                        eleGroupEle.id = _this._listEle.id + "_" + (new Date()).getMinutes().toString() + "g" + _this._eleCount;
                        _this._eleCount++;
                        eleGroupEle.className = "ali-container-group-title";
                        _this._listEle.insertBefore(eleGroupEle, tile.element);
                        var groupInfo = { element: eleGroupEle, firstItem: tile, model: null };
                        var model = _this.getGroupModel(groupInfo);
                        groupInfo.model = model;
                        try {
                            if (!!_this._headerTemplT && !!_this._headerTemplV) {
                                var bindingControl = new AliHub.Common.BindingControl(eleGroupEle.id);
                                bindingControl.templateEngine(_this._headerTemplG);
                                bindingControl.viewModel(model);
                                bindingControl.info(groupInfo);
                                bindingControl.setTemplate(_this._headerTemplT, _this._headerTemplV);
                            }
                            _this.renderGroupTitle({ element: eleGroupEle, firstItem: tile, model: model });
                        }
                        catch (ex) {
                            errCount++;
                            eleGroupEle.outerHTML = "";
                        }
                        count++;
                    }
                });
                if (errCount > 0) {
                    AliHub.Diagnostics.warn("CoreLibrary", "[0x02072302] Failed to render group title in list control for " + errCount.toString() + " times.");
                }
                return count;
            };
            ListControl.prototype.clearHeaders = function () {
                var groupCol = this.getGroupHeadersElements();
                if (!groupCol)
                    return;
                groupCol.forEach(function (ele, i, arr) {
                    ele.outerHTML = "";
                });
            };
            ListControl.prototype.getChildrenElements = function () {
                var list = [];
                var children = this._listEle.children;
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    if (!child)
                        continue;
                    if (!!child.className && child.className != "" && child.className.indexOf("ali-container-group-title") >= 0)
                        continue;
                    list.push(child);
                }
                return list;
            };
            ListControl.prototype.getGroupHeadersElements = function () {
                var list = [];
                var children = this._listEle.children;
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    if (!child)
                        continue;
                    if (!child.className || child.className == "" || child.className.indexOf("ali-container-group-title") < 0)
                        continue;
                    list.push(child);
                }
                return list;
            };
            /**
              * Clears all items.
              */
            ListControl.prototype.clear = function () {
                this._listEle.innerHTML = "";
                this._list = [];
                this._selected = [];
                var emptyContainer = this.getChildElement(true, "empty");
                if (!emptyContainer)
                    return;
                emptyContainer.style.display = "";
            };
            /**
              * Copies entries.
              */
            ListControl.prototype.copyEntries = function () {
                var col = [];
                this._list.forEach(function (ele, i, arr) {
                    if (ele)
                        col.push(ele.model);
                });
                return col;
            };
            /**
              * Performs the specified action for each element in this list.
              * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
              * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
              */
            ListControl.prototype.forEachItem = function (callbackfn) {
                var count = 0;
                this._list.forEach(function (ele, i, arr) {
                    if (!ele)
                        return;
                    count++;
                    if (callbackfn)
                        callbackfn(ele.copy(), i, arr);
                });
                return count;
            };
            /**
              * Returns the position of the first occurrence of a substring.
              * @param item  An item to find.
              * @param compare  An additional comparation handler.
              * @param action  An additional action handler for specific item searched.
              */
            ListControl.prototype.itemIndexOf = function (item, compare, action) {
                var _this = this;
                var info;
                this._list.some(function (ele, i, arr) {
                    if (!ele || !ele.model)
                        return false;
                    if (compare != null) {
                        var h = compare;
                        if (!h.call(_this, ele.model, item))
                            return false;
                    }
                    else {
                        if (ele.model !== item)
                            return false;
                    }
                    info = ele;
                    return true;
                });
                if (!!action)
                    action(info);
                return !!info ? info.index : -1;
            };
            /**
              * Determines whether the specified callback function returns true for any element of an array.
              * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
              * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
              */
            ListControl.prototype.firstItem = function (callbackfn) {
                var info = null;
                this._list.some(function (ele, i, arr) {
                    if (!ele || (!!callbackfn && !callbackfn(ele.copy(), i, arr)))
                        return false;
                    info = ele.copy();
                    return true;
                });
                return info;
            };
            /**
              * Renders the list item.
              * @param item  The item to render.
              */
            ListControl.prototype.renderItem = function (item) {
                if (!!this.viewModel && !!this.viewModel.renderItem)
                    return this.viewModel.renderItem(this, item);
            };
            /**
              * Renders the group title.
              * @param start  The first entry of the group.
              */
            ListControl.prototype.renderGroupTitle = function (info) {
                if (!!this.viewModel && !!this.viewModel.renderGroupTitle)
                    return this.viewModel.renderGroupTitle(this, info);
            };
            /**
              * Occurs during an item has been changed.
              * @param newItem  The item with update.
              * @param oldItem  The original item.
              */
            ListControl.prototype.onItemChanged = function (newItem, oldItem) {
                if (!!this.viewModel && !!this.viewModel.onItemChanged)
                    return this.viewModel.onItemChanged(this, newItem, oldItem);
            };
            /**
              * Occurs during the index of an item has been changed.
              * @param item  The item of which index has been changed.
              * @param oldIndex  Original index.
              */
            ListControl.prototype.onItemIndexChanged = function (item, oldIndex) {
                if (!!this.viewModel && !!this.viewModel.onItemIndexChanged)
                    return this.viewModel.onItemIndexChanged(this, item, oldIndex);
            };
            /**
              * Checks whether contains the given entry by searching key and returns the index.
              * @param entry  The entry to test.
              */
            ListControl.prototype.containsItem = function (entry) {
                if (!!this.viewModel && !!this.viewModel.containsItem)
                    return this.viewModel.containsItem(this, entry);
                return -1;
            };
            /**
              * Tests whether one of entry should be before another.
              * @param entryA  The entry to test.
              * @param entryB  The reference entry for comparing.
              */
            ListControl.prototype.shouldBeBefore = function (entryA, entryB) {
                if (!!this.viewModel && !!this.viewModel.shouldBeBefore)
                    return this.viewModel.shouldBeBefore(this, entryA, entryB);
                return false;
            };
            /**
              * Tests whether the entries are in same group.
              * @param entryA  The entry to test.
              * @param entryB  The reference entry for comparing.
              */
            ListControl.prototype.areInSameGroup = function (entryA, entryB) {
                if (!!this.viewModel && !!this.viewModel.areInSameGroup)
                    return this.viewModel.areInSameGroup(this, entryA, entryB);
                return true;
            };
            /**
              * Gets group item info model.
              * @param info  The group item information.
              */
            ListControl.prototype.getGroupModel = function (info) {
                if (!!this.viewModel && !!this.viewModel.getGroupModel)
                    return this.viewModel.getGroupModel(this, info);
                return null;
            };
            /**
              * Tests whether one of entry should be displayed.
              * @param item  The item to test.
              */
            ListControl.prototype.isVisible = function (item) {
                if (!!this.viewModel && !!this.viewModel.isVisible)
                    return this.viewModel.isVisible(this, item);
                return true;
            };
            /**
              * Checks whether the given item means it has been deleted.
              * @param entry  The entry to test.
              */
            ListControl.prototype.isDeleted = function (entry) {
                if (!!this.viewModel && !!this.viewModel.isDeleted)
                    return this.viewModel.isDeleted(this, entry);
                return false;
            };
            /**
              * Merges changing.
              * @param entry  The new entry or the one with changing.
              * @param oldItem  The original item.
              */
            ListControl.prototype.mergeChanging = function (entry, oldItem) {
                if (!!this.viewModel && !!this.viewModel.mergeChanging)
                    return this.viewModel.mergeChanging(this, entry, oldItem);
                return entry;
            };
            /**
              * Tests given entry is valid.
              * @param entry  The entry to test.
              */
            ListControl.prototype.valid = function (entry) {
                if (!!this.viewModel && !!this.viewModel.valid)
                    return this.viewModel.valid(this, entry);
                return true;
            };
            ListControl.prototype._changeSelection = function (adding, removing) {
                var _this = this;
                var count = 0;
                if (!!removing) {
                    removing.forEach(function (entry, eI, eArr) {
                        _this.itemIndexOf(entry, null, function (info) {
                            if (!info)
                                return;
                            AliHub.Elements.changeStyleRef(info.element, [], ["ali-state-active-t"]);
                        });
                    });
                    count += removing.length;
                    Collection.remove(this._selected, removing, true);
                }
                if (!!adding) {
                    var toAdd = [];
                    adding.forEach(function (entry, eI, eArr) {
                        _this.itemIndexOf(entry, null, function (info) {
                            if (!info)
                                return;
                            AliHub.Elements.changeStyleRef(info.element, ["ali-state-active-t"]);
                            toAdd.push(entry);
                        });
                    });
                    count += toAdd.length;
                    Collection.pushRange(this._selected, toAdd);
                }
                return count;
            };
            ListControl.prototype._push = function (entry) {
                if (!entry || !this.valid(entry))
                    return false;
                var isToDel = this.isDeleted(entry);
                var position = this.containsItem(entry);
                if (isToDel) {
                    this.remove(position);
                    return true;
                }
                if (position >= 0) {
                    this._update(entry, position);
                    return true;
                }
                this._insert(entry);
                return true;
            };
            ListControl.prototype._changeElementSelection = function (info) {
                if (!info || !info.element || !info.model)
                    return false;
                switch (this.selectionMode) {
                    case SelectionModes.None:
                        this.clearSelection();
                        return false;
                        ;
                    case SelectionModes.Single:
                        var copied = Collection.copy(this._selected);
                        if (this._changeSelection([info.model], copied) > 0)
                            this.selected.raise({ key: "selected", old: copied, value: this._selected });
                        return true;
                    case SelectionModes.Multiple:
                        var isSel = this.isSelected(info.model);
                        if (isSel) {
                            this.changeSelection(null, [info.model]);
                            return false;
                        }
                        this.changeSelection([info.model], null);
                        return false;
                }
            };
            ListControl.prototype._insert = function (item) {
                var _this = this;
                var col = [];
                var hasInserted = false;
                var latestCheck = false;
                for (var i = 0; i < this._list.length; i++) {
                    if (!hasInserted) {
                        var shouldBeBefore = this.shouldBeBefore(item, this._list[i].model);
                        if ((latestCheck && !shouldBeBefore) || (!latestCheck && shouldBeBefore)) {
                            var eleEle = document.createElement("li");
                            eleEle.className = "ali-container-main";
                            eleEle.id = this._listEle.id + "_" + (new Date()).getMinutes().toString() + "i" + this._eleCount;
                            this._eleCount++;
                            var tile = new ListItemInfo();
                            tile.element = eleEle;
                            tile.model = item;
                            tile.index = i;
                            AliHub.Elements.listen(eleEle, "click", function (ev) {
                                _this._changeElementSelection(tile);
                            });
                            if (!!this.viewModel && !!this.viewModel.convert)
                                tile.converted = this.viewModel.convert(this, item);
                            else
                                tile.converted = null;
                            tile.extenders = function (name) {
                                return _this.procExtender(name, tile.copy());
                            };
                            if (i >= this._list.length) {
                                this._listEle.appendChild(tile.element);
                            }
                            else {
                                this._listEle.insertBefore(tile.element, this._list[i].element);
                            }
                            hasInserted = true;
                            var bindingControl = this._getItemControl(tile);
                            this.renderItem(tile.copy());
                            this._extenders.forEach(function (ele, i, arr) {
                                if (!!ele && !!ele.load)
                                    ele.load(_this, tile.copy());
                            });
                            col.push(tile);
                            if (!this.isVisible(tile.model)) {
                                tile.element.style.display = "none";
                            }
                        }
                    }
                    latestCheck = shouldBeBefore;
                    if (hasInserted) {
                        this._list[i].index++;
                        this.onItemIndexChanged(this._list[i].copy(), this._list[i].index + 1);
                    }
                    col.push(this._list[i]);
                }
                if (!hasInserted) {
                    var eleEle = document.createElement("li");
                    eleEle.className = "ali-container-main";
                    eleEle.id = this._listEle.id + "_" + (new Date()).getMinutes().toString() + "i" + this._eleCount;
                    this._eleCount++;
                    var tile = new ListItemInfo();
                    tile.element = eleEle;
                    tile.model = item;
                    tile.index = this._list.length;
                    AliHub.Elements.listen(eleEle, "click", function (ev) {
                        _this._changeElementSelection(tile);
                    });
                    if (!!this.viewModel && !!this.viewModel.convert)
                        tile.converted = this.viewModel.convert(this, item);
                    else
                        tile.converted = item;
                    tile.extenders = function (name) {
                        return _this.procExtender(name, tile.copy());
                    };
                    this._listEle.appendChild(eleEle);
                    var bindingControl = this._getItemControl(tile);
                    this.renderItem(tile.copy());
                    this._extenders.forEach(function (ele, i, arr) {
                        if (!!ele && !!ele.load)
                            ele.load(_this, tile.copy());
                    });
                    this._list.push(tile);
                    if (!this.isVisible(tile.model)) {
                        tile.element.style.display = "none";
                    }
                    return;
                }
                this._list = col;
            };
            ListControl.prototype._getItemControl = function (tile) {
                if (!this._itemTemplT || !this._itemTemplV)
                    return null;
                var bindingControl = new AliHub.Common.BindingControl(tile.element);
                bindingControl.templateEngine(this._itemTemplG);
                bindingControl.viewModel(tile.model);
                bindingControl.info(tile);
                bindingControl.convertor(function (originalValue) {
                    return tile.converted;
                });
                bindingControl.setTemplate(this._itemTemplT, this._itemTemplV);
                tile.notify.add(function (ev) {
                    bindingControl.viewModel(tile.model);
                    bindingControl.info(tile);
                    bindingControl.updateConverted();
                    tile.converted = bindingControl.converted();
                });
                return bindingControl;
            };
            ListControl.prototype._update = function (entry, position) {
                var tile = this._list[position];
                var oldOne = tile.copy();
                var entryMerged = this.mergeChanging(entry, tile.copy());
                if (!entryMerged)
                    return;
                var newPosition = position;
                var startPosition = position;
                var endPosition = position;
                if (position < this._list.length - 1) {
                    for (var i = position + 1; i < this._list.length; i++) {
                        var shouldBeBefore = this.shouldBeBefore(entryMerged, this._list[i].model);
                        if (!shouldBeBefore && position < this._list.length - 1)
                            continue;
                        if (position == this._list.length - 1) {
                            this._listEle.appendChild(tile.element);
                        }
                        else {
                            this._listEle.insertBefore(tile.element, this._list[i].element);
                        }
                        newPosition = i - 1;
                        endPosition = newPosition;
                        break;
                    }
                }
                if (position > 0 && endPosition <= startPosition) {
                    for (var i = position - 1; i >= 0; i--) {
                        var shouldBeBefore = this.shouldBeBefore(entryMerged, this._list[i].model);
                        if (shouldBeBefore && i > 0)
                            continue;
                        if (!shouldBeBefore && i === position + 1)
                            break;
                        newPosition = shouldBeBefore && i == 0 ? 0 : i + 1;
                        var positionEle = this._list[newPosition].element;
                        if (tile.element != positionEle && tile.element.id != positionEle.id)
                            this._listEle.insertBefore(tile.element, positionEle);
                        startPosition = newPosition;
                        break;
                    }
                }
                tile.index = newPosition;
                var col = [];
                if (position !== newPosition) {
                    for (var i = 0; i < startPosition; i++) {
                        col.push(this._list[i]);
                    }
                    if (position > newPosition) {
                        this.onItemIndexChanged(tile.copy(), position);
                        col.push(tile);
                        for (var i = startPosition; i < endPosition; i++) {
                            var curTile = this._list[i];
                            curTile.index++;
                            this.onItemIndexChanged(curTile.copy(), curTile.index - 1);
                            col.push(curTile);
                        }
                    }
                    else if (position < newPosition) {
                        for (var i = startPosition + 1; i <= endPosition; i++) {
                            var curTile = this._list[i];
                            curTile.index--;
                            this.onItemIndexChanged(curTile.copy(), curTile.index + 1);
                            col.push(curTile);
                        }
                        this.onItemIndexChanged(tile.copy(), position);
                        col.push(tile);
                    }
                    for (var i = endPosition + 1; i < this._list.length; i++) {
                        col.push(this._list[i]);
                    }
                    tile.model = entryMerged;
                    tile.notify.raise({ key: "update", value: "Entry updated with new position." });
                    this.onItemChanged(tile.copy(), oldOne);
                    this._list = col;
                }
                else {
                    tile.model = entryMerged;
                    tile.notify.raise({ key: "update", value: "Entry updated." });
                    this.onItemChanged(tile.copy(), oldOne);
                }
                if (!this.isVisible(tile.model)) {
                    tile.element.style.display = "none";
                }
                else {
                    tile.element.style.display = "";
                }
            };
            return ListControl;
        }(AliHub.Common.VisualControl));
        Collection.ListControl = ListControl;
        /**
          * Single flow panel control.
          */
        var SingleFlowControl = (function (_super) {
            __extends(SingleFlowControl, _super);
            /**
              * Initializes a new instance of the SingleFlowControl class.
              * @param id  Element ID. The content will be filled into this element to replace original ones.
              */
            function SingleFlowControl(id) {
                var _this = _super.call(this, id) || this;
                _this._sidebar = [];
                _this._counter = 0;
                _this.getElement().innerHTML = "";
                _this.addStyleRef("ali-controls-flow-single");
                _this._renderLayoutTable();
                return _this;
            }
            /**
              * Gets panel content.
              */
            SingleFlowControl.prototype.getContent = function () {
                return this._content;
            };
            /**
              * Sets panel content.
              */
            SingleFlowControl.prototype.setContent = function (value) {
                if (!value)
                    return;
                this._content = value(this._contentId);
            };
            SingleFlowControl.prototype.addSidePanel = function (generator) {
                if (!generator || !this._sideBarId)
                    return null;
                var sideBarEle = AliHub.Elements.getById(this._sideBarId);
                if (!sideBarEle)
                    return null;
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
            };
            SingleFlowControl.prototype.getSidePanel = function (index) {
                if (index < 0 || index > this._sidebar.length)
                    return null;
                return this._sidebar[index];
            };
            SingleFlowControl.prototype._renderLayoutTable = function () {
                AliHub.Diagnostics.info("CoreLibrary", "[0x02210101] Render single flow panel.");
                var row = document.createElement("tr");
                row.id = this.getId() + "_table_b_r0";
                var tBody = document.createElement("tbody");
                tBody.appendChild(row);
                var table = document.createElement("table");
                table.id = this.getId() + "_table";
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
            };
            return SingleFlowControl;
        }(AliHub.Common.VisualControl));
        Collection.SingleFlowControl = SingleFlowControl;
        /**
          * Resource path.
          */
        var ResourcePath = (function () {
            function ResourcePath(path, split) {
                this._arr = [];
                this._split = "/";
                if (!!split)
                    this._split = split;
                this.pushString(path);
            }
            ResourcePath.prototype.pushString = function (path) {
                if (!path)
                    return;
                var arr = path.split(this._split);
                for (var step = 0; step < arr.length; step += 2) {
                    var key = arr[step];
                    var iValue = (step + 1 < arr.length) ? arr[step + 1] : null;
                    this._arr.push({ key: key, value: iValue });
                }
            };
            ResourcePath.prototype.remove = function () {
                if (this._arr.length > 0)
                    this._arr.pop();
            };
            ResourcePath.prototype.item = function (index, value) {
                if (index > this._arr.length || index < 0)
                    return null;
                if (arguments.length > 1) {
                    if (!value)
                        return;
                    if (index === this._arr.length)
                        this._arr.push(value);
                    else
                        this._arr[index] = value;
                }
                else {
                    if (index === this._arr.length)
                        return null;
                }
                return this._arr[index];
            };
            ResourcePath.prototype.length = function () {
                return this._arr.length;
            };
            ResourcePath.prototype.toParameterString = function () {
                var _this = this;
                var str = "";
                this._arr.forEach(function (iV, iI, iA) {
                    str += iV.key + _this._split + iV.value + _this._split;
                });
                return str;
            };
            return ResourcePath;
        }());
        Collection.ResourcePath = ResourcePath;
        /**
          * Ticket list view model.
          */
        var ConfigurableListViewModel = (function () {
            /**
              * Initializes a new instance of the ConfigurableListViewModel class.
              * @param settings  The settings.
              */
            function ConfigurableListViewModel(settings) {
                this._settings = settings ? settings : {};
            }
            /**
              * Tests whether one of entry should be displayed.
              * @param list  The list control which requests to process this method.
              * @param item  The item to test.
              */
            ConfigurableListViewModel.prototype.isVisible = function (list, item) {
                return !!this._settings.isVisible ? this._settings.isVisible(item) : true;
            };
            /**
              * Tests whether one of entry should be before another.
              * @param list  The list control which requests to process this method.
              * @param entryA  The entry to test.
              * @param entryB  The reference entry for comparing.
              */
            ConfigurableListViewModel.prototype.shouldBeBefore = function (list, entryA, entryB) {
                if (!this._settings.isBefore)
                    return false;
                if (this._settings.isBefore === true)
                    return true;
                if (this._settings.isBefore === "") {
                    return entryA == entryB || (!!entryA && entryA > entryB);
                }
                if (this._settings.isBefore === "!") {
                    return entryA == entryB || (!!entryB && entryB > entryA);
                }
                if (typeof this._settings.isBefore === "string") {
                    var key = this._settings.isBefore;
                    if (entryA[key] == null && entryB[key] == null)
                        return false;
                    var desc = false;
                    if (key.indexOf("!") === 0) {
                        desc = true;
                        key = key.substring(1);
                    }
                    else if (key.indexOf(" ") === 0) {
                        key = key.substring(1);
                    }
                    if (entryA[key] == null)
                        return desc;
                    if (entryB[key] == null)
                        return !desc;
                    return desc ? (entryA[key] >= entryB[key]) : (entryA[key] <= entryB[key]);
                }
                return this._settings.isBefore(entryA, entryB);
            };
            /**
              * Tests whether the entries are in same group.
              * @param list  The list control which requests to process this method.
              * @param entryA  The entry to test.
              * @param entryB  The reference entry for comparing.
              */
            ConfigurableListViewModel.prototype.areInSameGroup = function (list, entryA, entryB) {
                return !!this._settings.areInSameGroup ? this._settings.areInSameGroup(entryA, entryB) : true;
            };
            /**
              * Checks whether contains the given entry by searching key and returns the index.
              * @param list  The list control which requests to process this method.
              * @param entry  The entry to test.
              */
            ConfigurableListViewModel.prototype.containsItem = function (list, entry) {
                var _this = this;
                if (!this._settings.areSame)
                    return list.itemIndexOf(entry);
                var keyProperty = this._settings.areSame;
                var compare = typeof this._settings.areSame === "string" ?
                    function (eA, eB) { return !!eA && eA[_this._settings.areSame] == eB[_this._settings.areSame]; } :
                    function (eA, eB) { return _this._settings.areSame(eA, eB); };
                return list.itemIndexOf(entry, compare);
            };
            /**
              * Merges changing.
              * @param list  The list control which requests to process this method.
              * @param entry  The new entry or the one with changing.
              * @param oldItem  The original item.
              */
            ConfigurableListViewModel.prototype.mergeChanging = function (list, entry, oldItem) {
                return !!this._settings.mergeChanging ? this._settings.mergeChanging(entry, oldItem) : entry;
            };
            /**
              * Checks whether the given item means it has been deleted.
              * @param list  The list control which requests to process this method.
              * @param entry  The entry to test.
              */
            ConfigurableListViewModel.prototype.isDeleted = function (list, entry) {
                return !!this._settings.isDeleted ? this._settings.isDeleted(entry) : false;
            };
            /**
              * Gets group item info model.
              * @param list  The list control which requests to process this method.
              * @param info  The group item information.
              */
            ConfigurableListViewModel.prototype.getGroupModel = function (list, info) {
                return !!this._settings.getGroupModel ? this._settings.getGroupModel(info) : null;
            };
            /**
              * Tests given entry is valid.
              * @param list  The list control which requests to process this method.
              * @param entry  The entry to test.
              */
            ConfigurableListViewModel.prototype.valid = function (list, entry) {
                return !!this._settings.valid ? this._settings.valid(entry) : true;
            };
            /**
              * Converts given entry to the one of target type.
              * @param list  The list control which requests to process this method.
              * @param entry  The entry to convert.
              */
            ConfigurableListViewModel.prototype.convert = function (list, entry) {
                return !!this._settings.convert ? this._settings.convert(entry) : null;
            };
            return ConfigurableListViewModel;
        }());
        Collection.ConfigurableListViewModel = ConfigurableListViewModel;
        /**
          * Paging control.
          */
        var PagingControl = (function (_super) {
            __extends(PagingControl, _super);
            /**
              * Initializes a new instance of the PagingControl class.
              * @param id  Element ID. The content will be filled into this element to replace original ones.
              */
            function PagingControl(id) {
                var _this = _super.call(this, id) || this;
                _this._index = 0;
                _this._around = 3;
                _this.viewModelChanged = new EventHandlers();
                _this.indexChanged = new EventHandlers();
                _this.totalChanged = new EventHandlers();
                _this.aroundCountChanged = new EventHandlers();
                /**
                  * Additional binding information.
                  */
                _this.info = AliHub.Common.bindingObj();
                _this.addStyleRef("ali-controls-paging");
                _this._selector = _this.appendElement("ul");
                _this._selector.id = _this.getId() + "_sel";
                _this._selector.className = "ali-container-main";
                _this._infoEle = _this.appendElement("div");
                _this._infoEle.id = _this.getId() + "_info";
                _this._infoEle.className = "ali-container-main";
                _this._infoEle.style.display = "none";
                return _this;
            }
            PagingControl.prototype.viewModel = function (value) {
                if (arguments.length > 0 && this._viewModel !== value) {
                    var old = this._viewModel;
                    this._viewModel = value;
                    this._refreshSelector();
                    this.viewModelChanged.raise({ key: "viewModel", value: this._viewModel, old: old });
                }
                return this._viewModel;
            };
            /**
              * Loads specific options.
              * @param value  The options to load.
              */
            PagingControl.prototype.loadOptions = function (value) {
                var options = _super.prototype.loadOptions.call(this, value);
                if (!options)
                    return null;
                if (!options.ignoreParts) {
                    this.setEllipsisTemplate("initpart", null);
                    this.setFunctionTemplate("initpart", null);
                    this.setInfoTemplate("initpart", null);
                    this.setSelectorTemplate("initpart", null);
                }
                this.setEllipsisTemplate(options.ellipsisTemplateType, options.ellipsisTemplate);
                this.setFunctionTemplate(options.functionTemplateType, options.functionTemplate);
                this.setInfoTemplate(options.infoTemplateType, options.infoTemplate);
                this.setSelectorTemplate(options.selectorTemplateType, options.selectorTemplate);
                return options;
            };
            /**
              * Gets or sets pages count.
              * @param value  Page count.
              */
            PagingControl.prototype.total = function (value) {
                if (arguments.length > 0 && this._total !== value) {
                    var old = this._total;
                    this._total = value;
                    this._refreshSelector();
                    this.totalChanged.raise({ key: "total", value: this._total, old: old });
                }
                return this._total;
            };
            /**
              * Gets or sets page index.
              * @param value  Page index.
              */
            PagingControl.prototype.index = function (value, raise) {
                if (arguments.length > 0 && this._index !== value) {
                    var old = this._index;
                    this._index = value;
                    this._refreshSelector();
                    if (raise == null)
                        raise = true;
                    if (raise && !!this._viewModel && !!this._viewModel.turnTo)
                        this._viewModel.turnTo(this, this._index);
                    this.indexChanged.raise({ key: "index", value: this._index, old: old, raise: raise });
                }
                return this._index;
            };
            PagingControl.prototype.aroundCount = function (value) {
                if (arguments.length > 0 && this._around !== value) {
                    var old = this._around;
                    if (value == null || value < 0)
                        value = 0;
                    this._around = value;
                    this._refreshSelector();
                    this.aroundCountChanged.raise({ key: "aroundCount", value: this._around, old: old });
                }
                return this._index;
            };
            /**
              * Gets page data model.
              * @param index  Page index.
              */
            PagingControl.prototype.getPageModel = function (index) {
                if (!this._viewModel || !this._viewModel.getModel)
                    return null;
                return this._viewModel.getModel(this, index);
            };
            /**
              * Gets page informatino.
              * @param index  Page index.
              */
            PagingControl.prototype.getPageInfo = function (index) {
                var _this = this;
                var model = this._getPageInfo(index);
                model.turnTo = function () {
                    _this.index(index);
                };
                model.getModel = function () {
                    if (!_this._viewModel || !_this._viewModel.getModel)
                        return null;
                    return _this._viewModel.getModel(_this, index);
                };
                model.isCurrent = function () {
                    return _this._index === index;
                };
                return model;
            };
            /**
              * Refreshes.
              */
            PagingControl.prototype.refresh = function () {
                this._refreshSelector();
            };
            PagingControl.prototype.setSelectorTemplate = function (valueType, value) {
                if (valueType == null && value == null)
                    return;
                if (valueType === "part" || valueType === "initpart") {
                    value = this.templatePart(!!value ? value : "selector");
                    if (valueType === "initpart" && !value)
                        return;
                    valueType = "";
                }
                this._selectorTemplT = valueType;
                this._selectorTemplV = value;
                this._refreshSelector();
            };
            PagingControl.prototype.setEllipsisTemplate = function (valueType, value) {
                if (valueType == null && value == null)
                    return;
                if (valueType === "part" || valueType === "initpart") {
                    value = this.templatePart(!!value ? value : "ellipsis");
                    if (valueType === "initpart" && !value)
                        return;
                    valueType = "";
                }
                this._ellipsisTemplT = valueType;
                this._ellipsisTemplV = value;
                this._refreshSelector();
            };
            PagingControl.prototype.setFunctionTemplate = function (valueType, value) {
                if (valueType == null && value == null)
                    return;
                if (valueType === "part" || valueType === "initpart") {
                    value = this.templatePart(!!value ? value : "function");
                    if (valueType === "initpart" && !value)
                        return;
                    valueType = "";
                }
                this._funcTemplT = valueType;
                this._funcTemplV = value;
                this._refreshSelector();
            };
            PagingControl.prototype.setInfoTemplate = function (valueType, value) {
                if (valueType == null && value == null)
                    return;
                if (valueType === "part" || valueType === "initpart") {
                    value = this.templatePart(!!value ? value : "info");
                    if (valueType === "initpart" && !value)
                        return;
                    valueType = "";
                }
                this._infoTemplT = valueType;
                this._infoTemplV = value;
                if (!this._bindingControl) {
                    var infoEle = this.getChildElement(true, "_info");
                    infoEle.style.display = "";
                    this._bindingControl = new AliHub.Common.BindingControl(infoEle.id);
                    this._bindingControl.viewModel(this.info);
                }
                this._bindingControl.setTemplate(valueType, value);
            };
            PagingControl.prototype.isValidIndex = function (index) {
                return index != null && typeof index === "number" && index >= 0 && (this._total == null || index < this._total);
            };
            /**
              * Turns to the specific page.
              * @param key  Page index or keyword of page, e.g. first, previous, next, last, refresh.
              */
            PagingControl.prototype.turnTo = function (key) {
                if (key == null)
                    return this._index;
                if (typeof key === "number")
                    return this.index(key);
                key = this._formatKey(key.toString());
                var cur = this.index();
                switch (key) {
                    case "first":
                        if (cur > 0)
                            this.index(0);
                        break;
                    case "previous":
                        if (cur > 0)
                            this.index(cur - 1);
                        break;
                    case "next":
                        if (this._total == null || cur < this._total)
                            this.index(cur + 1);
                        break;
                    case "last":
                        if (this._total != null && cur < this._total)
                            this.index(this._total);
                        break;
                    case "refresh":
                        this.refresh();
                        break;
                    default:
                        break;
                }
                return this._index;
            };
            PagingControl.prototype._formatKey = function (key) {
                if (key == null)
                    return null;
                switch (key.toString().toLowerCase()) {
                    case "fir":
                    case "first":
                    case "1st":
                    case "1":
                        return "first";
                    case "pre":
                    case "prev":
                    case "previous":
                        return "previous";
                    case "nex":
                    case "nxt":
                    case "next":
                        return "next";
                    case "las":
                    case "lst":
                    case "last":
                        return "last";
                    case "rfr":
                    case "refresh":
                    case "reload":
                        return "refresh";
                    default:
                        return null;
                }
            };
            PagingControl.prototype._getPageInfo = function (index) {
                var _this = this;
                var model = {
                    index: index,
                    total: this._total,
                    current: function () {
                        return _this._index;
                    },
                    turnTo: function () {
                        _this.index(index);
                    }
                };
                return model;
            };
            PagingControl.prototype._refreshSelector = function () {
                this._selector.innerHTML = "";
                this._selector.style.display = (this._total === 1) ? "none" : "";
                var partA = 0;
                if (this._index > 0)
                    this._generateFuncPart("previous", this._selector);
                if (partA >= this._index)
                    partA = this._index - 1;
                var partD = (this._total != null ? this._total : 0) - 1;
                for (var step = 0; step <= partA; step++) {
                    this._generatePageSelector(step, this._selector);
                }
                var partB = this._index - this._around;
                if (partA >= partB)
                    partB = partA + 1;
                if (partA < partB - 1)
                    this._generateEllipsis(this._selector, "left");
                for (var step = partB; step < this._index; step++) {
                    this._generatePageSelector(step, this._selector);
                }
                this._generatePageSelector(this._index, this._selector, true);
                var partC = this._index + this._around;
                if (partD >= 0) {
                    if (partD <= partC)
                        partC = partD - 1;
                    for (var step = this._index + 1; step <= partC; step++) {
                        this._generatePageSelector(step, this._selector);
                    }
                }
                if (partD < 0 || partD > partC + 1)
                    this._generateEllipsis(this._selector, "right");
                if (partD > 0 && partD !== this._index)
                    this._generatePageSelector(partD, this._selector);
                if (partD < 0 || partD > this._index)
                    this._generateFuncPart("next", this._selector);
            };
            PagingControl.prototype._generateEllipsis = function (parent, partName) {
                var _this = this;
                var ele = document.createElement("li");
                ele.id = parent.id + "_" + partName;
                ele.innerHTML = "<span id=\"" + ele.id + "_link\" class=\"ali-container-main\">...</span>";
                parent.appendChild(ele);
                if (this._ellipsisTemplV && this._ellipsisTemplV != "") {
                    AliHub.Elements.getById(ele.id, "_link").style.display = "none";
                    var container = document.createElement("div");
                    container.id = ele.id + "_container";
                    container.className = "ali-container-main";
                    parent.appendChild(container);
                    var control = new AliHub.Common.BindingControl(container.id);
                    control.viewModel({ part: partName });
                    control.info({ part: partName, current: function () { return _this._index; }, total: function () { return _this._total; } });
                    control.setTemplate(this._ellipsisTemplT, this._ellipsisTemplV);
                }
                return ele;
            };
            PagingControl.prototype._generateFuncPart = function (key, parent) {
                var _this = this;
                key = this._formatKey(key);
                if (!key)
                    return null;
                var ele = document.createElement("li");
                ele.id = parent.id + "_f_" + key;
                parent.appendChild(ele);
                var link = document.createElement("a");
                link.id = ele.id + "_link";
                link.className = "ali-container-main";
                switch (key) {
                    case "first":
                        link.innerHTML = "1";
                        break;
                    case "previous":
                        link.innerHTML = "&lt;";
                        break;
                    case "next":
                        link.innerHTML = "&gt;";
                        break;
                    case "last":
                        link.innerHTML = AliHub.Res.builtIn().localString("last");
                        break;
                    case "refresh":
                        link.innerHTML = AliHub.Res.builtIn().localString("refresh");
                        break;
                    default:
                        break;
                }
                link.href = "#";
                link.onclick = function (ev) {
                    _this.turnTo(key);
                    return false;
                };
                ele.appendChild(link);
                if (!!this._funcTemplV && this._funcTemplV != "") {
                    link.style.display = "none";
                    var container = document.createElement("div");
                    container.id = ele.id + "_container";
                    container.className = "ali-container-main";
                    parent.appendChild(container);
                    var control = new AliHub.Common.BindingControl(container.id);
                    control.viewModel({ key: key });
                    control.info({ key: key, turnTo: function () { _this.turnTo(key); }, current: function () { return _this._index; }, total: function () { return _this._total; } });
                    control.setTemplate(this._funcTemplT, this._funcTemplV);
                }
                return ele;
            };
            PagingControl.prototype._generatePageSelector = function (index, parent, selected) {
                var _this = this;
                if (selected === void 0) { selected = false; }
                if (!this.isValidIndex(index))
                    return null;
                var info = this.getPageInfo(index);
                var ele = document.createElement("li");
                ele.id = parent.id + "_i" + index.toString();
                if (selected)
                    ele.className = "ali-state-active-t";
                parent.appendChild(ele);
                var link = document.createElement("a");
                link.id = ele.id + "_link";
                link.className = "ali-container-main";
                link.innerHTML = (index + 1).toString();
                link.href = "#";
                link.onclick = function (ev) {
                    _this.index(index);
                    return false;
                };
                ele.appendChild(link);
                if (!!this._selectorTemplV && this._selectorTemplV != "") {
                    link.style.display = "none";
                    var container = document.createElement("div");
                    container.id = ele.id + "_container";
                    container.className = "ali-container-main";
                    parent.appendChild(container);
                    var control = new AliHub.Common.BindingControl(container.id);
                    var model = null;
                    if (!!this._viewModel && !!this._viewModel.getModel)
                        model = this._viewModel.getModel(this, index);
                    control.viewModel(model);
                    control.info(info);
                    control.setTemplate(this._selectorTemplT, this._selectorTemplV);
                }
                return ele;
            };
            return PagingControl;
        }(AliHub.Common.VisualControl));
        Collection.PagingControl = PagingControl;
        /**
          * Active item monitor.
          */
        var ActiveItemMonitor = (function () {
            function ActiveItemMonitor() {
                this._col = [];
                this._index = -1;
                /**
                  * Raised on switched.
                  */
                this.switched = new Collection.EventHandlers();
            }
            ActiveItemMonitor.prototype.add = function (value, isBg) {
                if (isBg === void 0) { isBg = false; }
                if (!value)
                    return null;
                this._col.push(value);
                if (!!value.onload)
                    value.onload();
                if (isBg !== true)
                    this.turnTo(this._col.length - 1);
                return value;
            };
            ActiveItemMonitor.prototype.getIndex = function (item) {
                if (item == null)
                    item = this._index;
                if (typeof item === "number")
                    return item >= 0 && item < this._col.length ? item : -1;
                return Collection.indexOf(this._col, item);
            };
            ActiveItemMonitor.prototype.getItem = function (item) {
                var index = this.getIndex(item);
                if (index < 0 || index >= this._col.length)
                    return null;
                return this._col[index];
            };
            ActiveItemMonitor.prototype.remove = function (item, turnNext) {
                var index = this.getIndex(item);
                if (index < 0)
                    return;
                var info = this.getItem(index);
                if (!info)
                    return;
                if (info.oninactive)
                    info.oninactive();
                Collection.remove(this._col, [info], true);
                this._index = index >= this._col.length ? this._col.length - 1 : index;
                if (this._col.length === 0) {
                    this.switched.raise(null);
                    return;
                }
                if (turnNext === true) {
                    this.turnTo(index >= this._col.length ? this._col.length - 1 : index);
                }
                else {
                    this._index = 0;
                    this.switched.raise(null);
                }
            };
            ActiveItemMonitor.prototype.clear = function () {
                var _this = this;
                this._col.forEach(function (iV, iI, IArguments) {
                    if (!iV)
                        return;
                    if (iI === _this._index && !!iV.oninactive)
                        iV.oninactive();
                    if (!!iV.onclose)
                        iV.onclose();
                });
                this._col = [];
                this._index = -1;
                this.switched.raise(null);
            };
            ActiveItemMonitor.prototype.turnTo = function (item) {
                var index = this.getIndex(item);
                if (index < 0)
                    return null;
                var info = this._turnTo(index);
                if (!!info)
                    this.switched.raise(info);
                return info;
            };
            ActiveItemMonitor.prototype._turnTo = function (index) {
                var item = this.getItem(index);
                if (!item)
                    return null;
                var old = this.getItem(this._index);
                if (!!old && old.oninactive)
                    old.oninactive();
                this._index = index;
                if (!!item.onactive)
                    item.onactive();
                return item;
            };
            return ActiveItemMonitor;
        }());
        Collection.ActiveItemMonitor = ActiveItemMonitor;
        /**
          * Switch control.
          */
        var SwitchControl = (function (_super) {
            __extends(SwitchControl, _super);
            /**
              * Initializes a new instance of the SwitchControl class.
              * @param id  Element ID. The content will be filled into this element to replace original ones.
              */
            function SwitchControl(id) {
                var _this = _super.call(this, id) || this;
                _this._count = 0;
                _this._col = [];
                _this._index = AliHub.Common.bindingObj(0);
                /**
                  * Raised on switched.
                  */
                _this.switched = new Collection.EventHandlers();
                /**
                  * A value indicating whether enable tab button for switching.
                  */
                _this.tabButton = true;
                /**
                  * A value indicating whether turn back to first tab.
                  */
                _this.backToFirst = false;
                _this.addStyleRef("ali-controls-switch");
                _this._tabs = _this.appendElement("ul");
                _this._tabs.id = _this.getId() + "_tabs";
                _this._tabs.className = "ali-container-collection-tabs";
                return _this;
            }
            SwitchControl.prototype.setTabTemplate = function (valueType, value) {
                if (valueType == null && value == null)
                    return;
                if (valueType === "part" || valueType === "initpart") {
                    value = this.templatePart(!!value ? value : "tab");
                    if (valueType === "initpart" && !value)
                        return;
                    valueType = "";
                }
                this._tabTempT = !!valueType ? valueType : "static";
                this._tabTempV = value;
            };
            SwitchControl.prototype.clearTabTemplate = function () {
                this._tabTempT = null;
                this._tabTempV = null;
            };
            /**
              * Adds a control by a factory.
              * @param control  The optional control factory.
              * @param model  The optional model.
              * @param h  The handler to fill additional information to the control.
              * @param isBg  A value indicating whether this is a background action.
              */
            SwitchControl.prototype.add = function (control, model, options) {
                var _this = this;
                if (this._count >= Number.MAX_VALUE)
                    this._count = 0;
                if (!options)
                    options = {};
                this._count++;
                var now = new Date();
                var key = this._count.toString() + "t" + now.getSeconds().toString() + now.getMilliseconds().toString();
                var element = this.appendElement("div", "c" + key);
                if (control)
                    control(element);
                var c = AliHub.Common.getControl(element);
                if (!c)
                    c = new AliHub.Common.VisualControl(element);
                AliHub.Elements.changeStyleRef(element, "ali-state-active-f", "ali-state-active-t");
                element.style.display = "none";
                var tab = document.createElement("li");
                tab.id = this.getId() + "_t" + key;
                tab.className = "ali-container-main";
                AliHub.Elements.listen(tab, "click", function (ev) {
                    if (_this.tabButton)
                        _this.turnTo(c);
                });
                this._tabs.appendChild(tab);
                var tabControl = AliHub.Common.bindingControl(tab, {
                    templateEngine: this._tabTempG,
                    template: this._tabTempV,
                    templateType: this._tabTempT,
                    viewModel: model,
                    styleRef: "ali-controls-switch-tabs-item"
                });
                tabControl.info({ control: c, model: model, key: key, index: this._col.length, options: options });
                this._col.push({ control: c, model: model, key: key, index: this._col.length, options: options, tab: tabControl });
                if (!!options.loaded)
                    options.loaded({ control: c, model: model, key: key, index: this._col.length, options: options, tab: tabControl });
                if (options.background !== true)
                    this.turnTo(this._col.length - 1);
                return c;
            };
            SwitchControl.prototype.getIndex = function (control) {
                if (control == null)
                    control = this._index();
                if (typeof control === "number") {
                    if (control < 0 || control >= this._col.length)
                        return -1;
                    return control;
                }
                var cid = typeof control === "string" ? control : control.getId();
                var cR = -1;
                this._col.some(function (cV, cI, cA) {
                    if (!cV || !cV.control || (cV.control.getId() !== cid && cV.key !== cid))
                        return false;
                    cR = cI;
                    return true;
                });
                return cR;
            };
            SwitchControl.prototype.getControl = function (control) {
                var item = this.getItem(control);
                return !!item ? item.control : null;
            };
            SwitchControl.prototype.getItemModel = function (control) {
                var item = this.getItem(control);
                return !!item ? item.model : null;
            };
            SwitchControl.prototype.getItem = function (control) {
                var index = this.getIndex(control);
                if (index < 0 || index >= this._col.length)
                    return null;
                var item = this._col[index];
                return !!item ? { key: item.key, control: item.control, model: item.model, index: index, options: item.options, tab: item.tab } : null;
            };
            /**
              * Gets the size of tabs bar.
              */
            SwitchControl.prototype.getTabsSize = function () {
                return AliHub.Elements.getSize(this._tabs);
            };
            /**
              * Turns to a specific control.
              * @param control  The control or key.
              */
            SwitchControl.prototype.turnTo = function (control) {
                var _this = this;
                var oldInfo = this.getItem();
                if (control == null)
                    return null;
                if (typeof control === "number") {
                    var info = this._turnTo(control);
                    return !!info ? info.control : null;
                }
                var cid = typeof control === "string" ? control : control.getId();
                var cR;
                var count = -1;
                this._col.some(function (cV, cI, cA) {
                    count++;
                    if (!cV || !cV.control || (cV.control.getId() !== cid && cV.key !== cid))
                        return false;
                    _this._turnTo(cI);
                    return true;
                });
                return cR;
            };
            /**
              * Gets item info.
              * @param control  The item to get.
              */
            SwitchControl.prototype.items = function () {
                var col = [];
                this._col.forEach(function (item, i, arr) {
                    if (!item)
                        return;
                    col.push({ key: item.key, control: item.control, model: item.model, index: i, options: item.options, tab: item.tab });
                });
                return col;
            };
            SwitchControl.prototype.remove = function (control) {
                var cI = this.getIndex(control);
                var cV = this._col[cI];
                if (!cV || !cV.control)
                    return;
                var cId = cV.control.getId();
                var cE = cV.control.getElement();
                if (!cE || !cId)
                    return;
                var list = [];
                this._col.forEach(function (iV, iI, iA) {
                    if (!iV || !iV.control || iV.control.getId() === cId)
                        return;
                    list.push(iV);
                });
                this._col = list;
                cE.outerHTML = "";
                var tab = !!cV.tab ? cV.tab.getElement() : null;
                if (!!tab && !!tab.outerHTML)
                    tab.outerHTML = "";
                if (this._col.length === 0) {
                    this.switched.raise(null);
                    return;
                }
                var nextI = this.backToFirst ? 0 : (cI >= this._col.length ? this._col.length - 1 : cI);
                this.turnTo(nextI);
            };
            SwitchControl.prototype.clear = function () {
                this._col.forEach(function (iV, iI, iA) {
                    if (!iV || iV.control)
                        return;
                    var iE = iV.control.getElement();
                    if (!iE)
                        return;
                    iE.outerHTML = "";
                });
                this._index(-1);
                this._col = [];
                this.switched.raise(null);
            };
            SwitchControl.prototype.hideAll = function () {
                var _this = this;
                this._index(-1);
                this._col.forEach(function (cV, cI, cA) {
                    if (!cV || !cV.control)
                        return;
                    var cE = cV.control.getElement();
                    if (!cE)
                        return;
                    AliHub.Elements.changeStyleRef(cE, "ali-state-active-f", "ali-state-active-t");
                    cE.style.display = "none";
                    var tabId = _this.getId() + "_t" + cV.key;
                    var tabControl = AliHub.Elements.getById(tabId);
                    if (!tabControl)
                        return;
                    var wasActived = (" " + tabControl.className + " ").indexOf("ali-state-active-t") > 0;
                    AliHub.Elements.changeStyleRef(tabControl, "ali-state-active-f", "ali-state-active-t");
                    if (wasActived && !!cV.options.hidden)
                        cV.options.hidden({ control: cV.control, model: cV.model, key: cV.key, index: cI, options: cV.options, tab: cV.tab });
                });
            };
            /**
              * Loads specific options.
              * @param value  The options to load.
              */
            SwitchControl.prototype.loadOptions = function (value) {
                var options = _super.prototype.loadOptions.call(this, value);
                if (!options)
                    return null;
                if (!!options.tabTemplateEngine)
                    this._tabTempG = options.tabTemplateEngine;
                if (options.tabButton != null)
                    this.tabButton = options.tabButton;
                if (!options.ignoreParts)
                    this.setTabTemplate("initpart", null);
                this.setTabTemplate(options.tabTemplateType, options.tabTemplate);
                return options;
            };
            SwitchControl.prototype._turnTo = function (index) {
                if (index >= this._col.length)
                    return null;
                this.hideAll();
                if (index < 0 || index >= this._col.length)
                    return null;
                var info = this._col[index];
                if (!info || !info.control)
                    return null;
                var cE = info.control.getElement();
                if (!cE)
                    return null;
                this._index(index);
                AliHub.Elements.changeStyleRef(cE, "ali-state-active-t", "ali-state-active-f");
                cE.style.display = "";
                var tabId = this.getId() + "_t" + info.key;
                var tabControl = AliHub.Elements.getById(tabId);
                AliHub.Elements.changeStyleRef(tabControl, "ali-state-active-t", "ali-state-active-f");
                if (!!info.options.shown)
                    info.options.shown({ control: info.control, model: info.model, key: info.key, index: index, options: info.options, tab: info.tab });
                this.switched.raise({ key: info.key, control: info.control, model: info.model, index: index, options: info.options, tab: info.tab });
                return info;
            };
            return SwitchControl;
        }(AliHub.Common.VisualControl));
        Collection.SwitchControl = SwitchControl;
        /**
          * Table control.
          */
        var TableControl = (function (_super) {
            __extends(TableControl, _super);
            /**
              * Initializes a new instance of the SwitchControl class.
              * @param id  Element ID. The content will be filled into this element to replace original ones.
              */
            function TableControl(id) {
                var _this = _super.call(this, id) || this;
                _this._options = { schema: null, values: null };
                _this._references = [];
                _this.renderingHeadCell = new EventHandlers();
                _this.renderingCell = new EventHandlers();
                _this.addStyleRef("ali-controls-table");
                _this.innerHTML("<table id=\"{{id()}}_table\"><thead id=\"{{id()}}_table_head\"></thead><tbody id=\"{{id()}}_table_body\"></tbody><tfoot id=\"{{id()}}_table_foot\"></tfoot></table><div id=\"\" + eleId + \"_empty\" class=\"ali-container-empty\" style=\"display: none; \" ></div>");
                return _this;
            }
            /**
              * Sets schema information.
              * @param value  The schema.
              * @param reload  A value indicating whether need reload the table.
              */
            TableControl.prototype.schema = function (value, reload) {
                if (reload === void 0) { reload = true; }
                this._options.schema = value;
                if (reload)
                    this._refresh();
            };
            TableControl.prototype.headCell = function (id) {
                if (id == null)
                    return null;
                if (typeof id === "function")
                    id = id();
                if (typeof id === "string")
                    return getItem(this._options.schema, id, "id");
                if (typeof id === "number") {
                    if (id < 0)
                        return null;
                    if (!this._options.schema || this._options.schema.length <= id)
                        return null;
                    return this._options.schema[id];
                }
                return null;
            };
            /**
              * Pushes a set of entries.
              * @param col  The collection to insert.
              */
            TableControl.prototype.pushRange = function (col) {
                var _this = this;
                if (!col) {
                    this.isEmpty();
                    return [];
                }
                if (!this._options.values)
                    this._options.values = [];
                if (!Collection.isArray(col))
                    col = col.list || col.arr;
                if (!col) {
                    this.isEmpty();
                    return [];
                }
                var deltaCol = [];
                col.forEach(function (ele, i, arr) {
                    if (!ele)
                        return;
                    _this._options.values.push(ele);
                    deltaCol.push(ele);
                });
                this._refresh();
                if (deltaCol.length == 0)
                    return [];
                return deltaCol;
            };
            /**
              * Pushes a resource.
              * @param propertyKey  The property key to get collection in the resource object.
              * @param resource  A resource to push. Collection supported.
              */
            TableControl.prototype.pushResource = function (propertyKey) {
                var _this = this;
                var resource = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    resource[_i - 1] = arguments[_i];
                }
                if (!resource) {
                    this.isEmpty();
                    return [];
                }
                var col = [];
                var result = [];
                resource.forEach(function (res, resI, resA) {
                    if (!res)
                        return;
                    if (res instanceof Array) {
                        var pushedX = _this.pushRange(res);
                        if (!!pushedX)
                            pushedX.forEach(function (pushedItem, pushedI, pushedA) {
                                result.push(pushedItem);
                            });
                        return;
                    }
                    _this.addReference(res);
                    var entries = !!propertyKey ? res[propertyKey] : (res.list || res.arr);
                    if (!Collection.isArray(entries))
                        return;
                    var pushed = _this.pushRange(entries);
                    if (!!pushed)
                        pushed.forEach(function (pushedItem, pushedI, pushedA) {
                            result.push(pushedItem);
                        });
                });
                return result;
            };
            /**
              * Batch pushes a colletion from web.
              * @param subject  The subject of data resolver registered.
              * @param key  The key of data resolver.
              */
            TableControl.prototype.pushRangeFromWeb = function (subject, key, parameters, clearBefore) {
                var _this = this;
                if (clearBefore === void 0) { clearBefore = false; }
                var promise = AliHub.Web.resolve(subject, key, parameters);
                promise.then(function (r) {
                    if (clearBefore)
                        _this.clear();
                    _this.pushRange(r.result);
                });
                return promise;
            };
            /**
              * Batch pushes a colletion from web.
              * @param subject  The subject of data resolver registered.
              * @param key  The key of data resolver.
              * @param propertyKey  The property key to get collection in the resource object.
              */
            TableControl.prototype.pushResourceFromWeb = function (subject, key, propertyKey, parameters, clearBefore, schemaKey) {
                var _this = this;
                if (clearBefore === void 0) { clearBefore = false; }
                var promise = AliHub.Web.resolve(subject, key, parameters);
                promise.then(function (r) {
                    if (clearBefore)
                        _this.clear();
                    if (!!schemaKey)
                        _this.schema(r.result[schemaKey]);
                    _this.pushResource(propertyKey, r.result);
                });
                return promise;
            };
            /**
              * Gets whether the list is empty to show.
              */
            TableControl.prototype.isEmpty = function () {
                var emptyContainer = this.getChildElement(true, "empty");
                if (!this._options.values)
                    this._options.values = [];
                if (this._options.values.length === 0) {
                    if (!!emptyContainer)
                        emptyContainer.style.display = "";
                    return true;
                }
                if (!!emptyContainer)
                    emptyContainer.style.display = "none";
                return false;
            };
            /**
              * Loads specific options.
              * @param value  The options to load.
              */
            TableControl.prototype.loadOptions = function (value) {
                var options = _super.prototype.loadOptions.call(this, value);
                if (!options)
                    return null;
                if (!!options.renderCell)
                    this.renderingCell.add(options.renderCell);
                if (!!options.renderHeadCell)
                    this.renderingCell.add(options.renderHeadCell);
                if (!options.ignoreParts)
                    this.setCellTemplate("initpart", null);
                this.setCellTemplate(options.cellTemplateType, options.cellTemplate);
                this.cellConvertor = options.cellConvertor;
                if (!options.ignoreParts)
                    this.setHeadCellTemplate("initpart", null);
                this.setHeadCellTemplate(options.headCellTemplateType, options.headCellTemplate);
                this.headCellConvertor = options.headCellConvertor;
                if (!!options.schema)
                    this.schema(options.schema);
                if (options.emptyMessageViewModel != null)
                    this.emptyMessageViewModel(options.emptyMessageViewModel);
                this.setEmptyMessageTemplate(options.emptyMessageTemplateType, options.emptyMessageTemplate);
                if (!!options.emptyMessageTemplate)
                    this.setEmptyMessageTemplate(options.emptyMessageTemplateType, options.emptyMessageTemplate);
                if (!!options.webData) {
                    var webData = typeof options.webData === "function" ? options.webData.call(options) : options.webData;
                    this.pushResourceFromWeb(webData.subject, webData.key, webData.propertyKey, webData.parameters, webData.clearBefore, webData.schemaKey);
                }
                return options;
            };
            TableControl.prototype.setCellTemplate = function (valueType, value) {
                if (valueType == null && value == null)
                    return;
                if (valueType === "part" || valueType === "initpart") {
                    value = this.templatePart(!!value ? value : "cell");
                    if (valueType === "initpart" && !value)
                        return;
                    valueType = "";
                }
                this._cellTemplate = value;
                this._cellTemplateType = valueType;
            };
            TableControl.prototype.setHeadCellTemplate = function (valueType, value) {
                if (valueType == null && value == null)
                    return;
                if (valueType === "part" || valueType === "initpart") {
                    value = this.templatePart(!!value ? value : "head");
                    if (valueType === "initpart" && !value)
                        return;
                    valueType = "";
                }
                this._headCellTemplate = value;
                this._headCellTemplateType = valueType;
            };
            /**
              * Sets the view template of the empty message.
              * @param sourceType  The type of view template source.
              * @param sourceValue  The value of view template source.
              */
            TableControl.prototype.setEmptyMessageTemplate = function (sourceType, sourceValue, viewModel) {
                if (viewModel === void 0) { viewModel = null; }
                if (sourceType == null && sourceValue == null)
                    return;
                if (!this._empty) {
                    this._empty = new AliHub.Common.BindingControl(this.getId() + "_empty");
                    this._empty.addStyleRef("ali-container-empty");
                }
                if (sourceType === "part" || sourceType === "initpart") {
                    sourceValue = this.templatePart(!!sourceValue ? sourceValue : "empty");
                    if (sourceType === "initpart" && !sourceValue)
                        return;
                    sourceType = "";
                }
                this._empty.setTemplate(sourceType, sourceValue);
                if (arguments.length > 2)
                    this._empty.viewModel(viewModel);
            };
            /**
              * Gets or sets empty mesaage view model.
              */
            TableControl.prototype.emptyMessageViewModel = function (viewModel) {
                if (!this._empty)
                    return null;
                if (arguments.length > 0)
                    this._empty.viewModel(viewModel);
                return this._empty.viewModel();
            };
            /**
              * Refreshes.
              */
            TableControl.prototype.refresh = function () {
                this._refresh();
            };
            /**
              * Adds a reference.
              */
            TableControl.prototype.addReference = function () {
                var _this = this;
                var values = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    values[_i] = arguments[_i];
                }
                if (!values)
                    return;
                values.forEach(function (value, vI, vA) {
                    if (Collection.contains(_this._references, value))
                        return;
                    _this._references.push(value);
                });
            };
            /**
              * Checks whehter there is a specific reference.
              */
            TableControl.prototype.containReference = function () {
                var value = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    value[_i] = arguments[_i];
                }
                return Collection.contains(this._references, value);
            };
            /**
              * Removes a specific reference.
              */
            TableControl.prototype.removeReference = function () {
                var value = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    value[_i] = arguments[_i];
                }
                Collection.remove(this._references, value, true);
            };
            /**
              * Clears all references.
              */
            TableControl.prototype.clearReference = function () {
                this._references = [];
            };
            /**
              * Gets an entry by a specific reference item.
              */
            TableControl.prototype.getEntry = function (reference) {
                return Collection.getEntry(this._references, reference);
            };
            /**
              * Gets entries by a specific reference item.
              */
            TableControl.prototype.getEntries = function (reference) {
                return Collection.getEntries(this._references, reference);
            };
            TableControl.prototype._refresh = function () {
                var _this = this;
                if (!this._options || !this._options.schema || !this.parentElement())
                    return;
                // Render head.
                var thead = this.getChildElement("table", "head");
                var theadRow = document.createElement("tr");
                theadRow.id = thead.id + "_main";
                thead.innerHTML = "";
                thead.appendChild(theadRow);
                var cols = [];
                this._options.schema.forEach(function (ele, i, arr) {
                    if (!ele || (!ele.model && !ele.render))
                        return;
                    cols.push(ele);
                    var theadCell = document.createElement("th");
                    theadCell.id = theadRow.id + "_c" + i.toString();
                    theadRow.appendChild(theadCell);
                    if (ele.width)
                        theadCell.style.width = ele.width.toString() + (typeof ele.width === "string" ? "" : "px");
                    if (ele.styleRef)
                        AliHub.Elements.changeStyleRef(theadCell, ele.styleRef);
                    var cellText = null;
                    if (typeof ele.model === "string") {
                        cellText = ele.model.toString();
                    }
                    else if (ele.model.name && (typeof ele.model.name === "string" || typeof ele.model.name === "number")) {
                        cellText = ele.model.name.toString();
                    }
                    else if (ele.model.nickname && (typeof ele.model.nickname === "string" || typeof ele.model.nickname === "number")) {
                        cellText = ele.model.nickname.toString();
                    }
                    else if (ele.model.title && (typeof ele.model.title === "string" || typeof ele.model.title === "number")) {
                        cellText = ele.model.title.toString();
                    }
                    if (_this._headCellTemplate) {
                        theadCell.innerHTML = "<div id=\"" + theadCell.id + "_container\"></div>";
                        var cellControl = new AliHub.Common.BindingControl(theadCell.id + "_container");
                        cellControl.info({ column: ele, container: theadCell });
                        cellControl.viewModel(ele.model);
                        if (!!_this.headCellConvertor)
                            cellControl.setConvertor(_this.headCellConvertor);
                        cellControl.setTemplate(_this._headCellTemplateType, _this._headCellTemplate);
                    }
                    else {
                        theadCell.innerHTML = cellText;
                    }
                    if (_this.renderingHeadCell)
                        _this.renderingHeadCell.raise({ column: ele, container: theadCell, text: cellText });
                    if (ele.render)
                        ele.render({ column: ele, container: theadCell });
                    try {
                        theadCell._bindInfo = ele;
                    }
                    catch (ex) { }
                });
                // Render body.
                var tbody = this.getChildElement("table", "body");
                var rows = this._options.values;
                if (rows)
                    rows.forEach(function (row, rI, rArr) {
                        var recRow = document.createElement("tr");
                        recRow.id = tbody.id + "_r" + rI.toString();
                        tbody.appendChild(recRow);
                        cols.forEach(function (ele, i, arr) {
                            var propCell = document.createElement("td");
                            propCell.id = recRow.id + "_c" + i.toString();
                            recRow.appendChild(propCell);
                            var cellInfo = Collection.cellInfo(row, ele, propCell);
                            var cellText = null;
                            if (!cellInfo)
                                return;
                            if (!!_this._cellTemplate) {
                                propCell.innerHTML = "<div id=\"" + propCell.id + "_container\"></div>";
                                var cellControl = new AliHub.Common.BindingControl(propCell.id + "_container");
                                cellControl.info(cellInfo);
                                cellControl.viewModel(cellInfo.value);
                                if (!!_this.cellConvertor)
                                    cellControl.setConvertor(_this.cellConvertor);
                                cellControl.setTemplate(_this._cellTemplateType, _this._cellTemplate);
                            }
                            else if (cellInfo.value != null) {
                                propCell.innerHTML = cellInfo.value.toString();
                            }
                            if (!!_this.renderingCell)
                                _this.renderingCell.raise(cellInfo);
                            if (!!ele.valueRender)
                                ele.valueRender(cellInfo);
                        });
                    });
                // Render foot.
                var tfoot = this.getChildElement("table", "foot");
                // Check if it is empty.
                this.isEmpty();
            };
            return TableControl;
        }(AliHub.Common.VisualControl));
        Collection.TableControl = TableControl;
        var DisposableArray = (function () {
            function DisposableArray() {
                this._list = [];
            }
            DisposableArray.prototype.push = function () {
                var value = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    value[_i] = arguments[_i];
                }
                return this.pushRange(value);
            };
            DisposableArray.prototype.pushRange = function (col) {
                var _this = this;
                if (!col)
                    return [];
                var list = [];
                col.forEach(function (ele, i, arr) {
                    if (!ele || !ele.dispose)
                        return;
                    _this._list.push(ele);
                    list.push(ele);
                });
                return list;
            };
            DisposableArray.prototype.dispose = function () {
                this._list.forEach(function (ele, i, arr) {
                    if (!ele || !ele.dispose)
                        return;
                    try {
                        ele.dispose();
                    }
                    catch (ex) { }
                });
                this._list = [];
            };
            return DisposableArray;
        }());
        Collection.DisposableArray = DisposableArray;
        /**
          * Event handlers.
          */
        var EventHandlers = (function () {
            function EventHandlers() {
                this._count = 0;
                this._list = [];
            }
            /**
              * Registers an event handler.
              * @param h  The event handler to register.
              */
            EventHandlers.prototype.add = function (h, target, disposableList, args, remove, delay) {
                var _this = this;
                if (!h)
                    return;
                var info = { handler: h, target: target, args: args, remove: remove, start: this._count };
                var disp = {
                    added: new Date(),
                    hasAdded: false,
                    dispose: function () {
                        _this.remove(h);
                    },
                    raise: function (ev) {
                        args ? h.call(target, ev, args) : h.call(target, ev);
                    },
                    count: function () {
                        return _this._count - info.start;
                    }
                };
                if (disposableList)
                    disposableList.push(disp);
                var proc = function () {
                    disp.added = new Date();
                    disp.hasAdded = true;
                    if (_this._list.some(function (ele, i, arr) {
                        if (ele.handler !== h)
                            return false;
                        ele.target = target;
                        return true;
                    }))
                        return;
                    _this._list.push(info);
                };
                if (delay == null || delay === false)
                    proc();
                else if (delay === true)
                    setTimeout(function () { proc(); }, 0);
                else if (typeof delay === "number")
                    setTimeout(function () { proc(); }, delay);
                else
                    setTimeout(function () { proc(); }, 0);
                return disp;
            };
            EventHandlers.prototype.addOnce = function (h, target, disposableList, args, delay) {
                return this.add(h, target, disposableList, args, function (ev, args2, index) {
                    return index > 0;
                }, delay);
            };
            /**
              * Raises this event.
              * @param ev  The event arguments.
              * @param ignoreEx  true if ignore exception; otherwise, false.
              */
            EventHandlers.prototype.raise = function (ev, ignoreEx, delay) {
                var _this = this;
                if (ignoreEx === void 0) { ignoreEx = false; }
                var proc = function () {
                    if (_this._count < Number.MAX_VALUE)
                        _this._count++;
                    _this._list.forEach(function (ele, i, arr) {
                        if (ele.remove) {
                            var needRemove = true;
                            try {
                                if (!ele.remove.call(ele.target, ev, ele.args, _this._count - ele.start)) {
                                    needRemove = false;
                                }
                            }
                            catch (ex) { }
                            if (needRemove)
                                _this.remove(ele.handler);
                            return;
                        }
                        if (ignoreEx) {
                            try {
                                ele.args ? ele.handler.call(ele.target, ev, ele.args) : ele.handler.call(ele.target, ev);
                            }
                            catch (ex) {
                            }
                        }
                        else {
                            ele.args ? ele.handler.call(ele.target, ev, ele.args) : ele.handler.call(ele.target, ev);
                        }
                    });
                };
                if (delay == null || delay === false)
                    proc();
                else if (delay === true)
                    setTimeout(function () { proc(); }, 0);
                else if (typeof delay === "number")
                    setTimeout(function () { proc(); }, delay);
                else
                    setTimeout(function () { proc(); }, 0);
            };
            /**
              * Removes an event handler.
              * @param h  The event handler to remove.
              */
            EventHandlers.prototype.remove = function (h) {
                if (!h)
                    return;
                var col = [];
                this._list.forEach(function (ele, i, arr) {
                    if (ele.handler === h)
                        return;
                    col.push(ele);
                });
                this._list = col;
            };
            /**
              * Clears all event handlers.
              */
            EventHandlers.prototype.clear = function () {
                this._list = [];
            };
            /**
              * Adds listener methods of this event to a specific object.
              */
            EventHandlers.prototype.addListenerMethods = function (obj) {
                var _this = this;
                if (!obj)
                    return;
                obj.listen = function (h, target, disposableList, args, remove) {
                    return _this.add(h, target, disposableList, args);
                };
                obj.unlisten = function (h) {
                    _this.remove(h);
                };
                obj.clearListener = function () {
                    _this.clear();
                };
            };
            return EventHandlers;
        }());
        Collection.EventHandlers = EventHandlers;
        /**
          * The mapping.
          */
        var Mapping = (function () {
            function Mapping() {
                this._mapping = {};
                this.caseSensitive = false;
                this.changed = new Collection.EventHandlers();
            }
            Mapping.prototype.get = function (key) {
                if (!key)
                    return undefined;
                key = key.toString();
                return this._mapping[this.caseSensitive ? key : key.toLowerCase()];
            };
            /**
              * Sets up a mapping.
              */
            Mapping.prototype.map = function (dict, clearBeforeSet) {
                if (clearBeforeSet === void 0) { clearBeforeSet = false; }
                if (!dict)
                    return;
                if (clearBeforeSet)
                    this.clear();
                for (var key in dict) {
                    if (!key || typeof key !== "string")
                        continue;
                    var mapObj = dict[key];
                    if (!this.caseSensitive)
                        key = key.toLowerCase();
                    var oldValue = this._mapping[key];
                    this._mapping[key] = mapObj;
                    this.changed.raise({ key: key, old: oldValue, value: this._mapping[key] });
                }
            };
            Mapping.prototype.push = function (key, value) {
                if (!key || !value)
                    return;
                key = key.toString();
                if (!this.caseSensitive)
                    key = key.toLowerCase();
                var oldValue = this._mapping[key];
                if (oldValue === this._mapping[key])
                    return;
                this._mapping[key] = value;
                this.changed.raise({ key: key, old: oldValue, value: this._mapping[key] });
            };
            Mapping.prototype.item = function (key, value) {
                if (!key)
                    return undefined;
                if (arguments.length > 1) {
                    if (value == null)
                        this.remove(key);
                    else
                        this.push(key, value);
                }
                return this._mapping[key];
            };
            Mapping.prototype.remove = function (key) {
                if (!key)
                    return;
                key = key.toString();
                if (!this.caseSensitive)
                    key = key.toLowerCase();
                var oldValue = this._mapping[key];
                if (this._mapping[key])
                    delete this._mapping[key];
                if (oldValue !== undefined)
                    this.changed.raise({ key: key, old: oldValue, value: undefined });
            };
            Mapping.prototype.clear = function () {
                var oldMapping = this._mapping;
                this._mapping = {};
                for (var key in oldMapping) {
                    if (!key || typeof key !== "string" || oldMapping[key] === undefined)
                        continue;
                    this.changed.raise({ key: key, old: oldMapping[key], value: undefined });
                }
            };
            return Mapping;
        }());
        Collection.Mapping = Mapping;
        /**
          * Gets an array by given item or array.
          * This is used to work as a part of the processing logic that need support both single item or an array.
          * @param value  An item or an array.
          * @param emptyForNull  A value indicating whether need return an empty array if given item is null.
          * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
          * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
          */
        function toArray(value, emptyForNull, callbackfn, thisArg) {
            if (emptyForNull === void 0) { emptyForNull = true; }
            var result;
            if (!value)
                result = emptyForNull ? [] : null;
            else if (value instanceof Array)
                result = value;
            else
                result = [value];
            if (!!callbackfn && !!result)
                result.forEach(callbackfn, thisArg);
            return result;
        }
        Collection.toArray = toArray;
        /**
          * Converts to string array.
          * This is used to work as a part of the processing logic that need support both single item or an array.
          * @param value  A string or a string array.
          * @param emptyForNull  A value indicating whether need return an empty array if given item is null.
          * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
          * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
          */
        function toStringArray(value, emptyForNull, callbackfn, thisArg) {
            if (emptyForNull === void 0) { emptyForNull = true; }
            var result;
            if (!value)
                result = emptyForNull ? [] : null;
            else if (value instanceof Array)
                result = value;
            else
                result = [value.toString()];
            if (!!callbackfn && !!result)
                result.forEach(callbackfn, thisArg);
            return result;
        }
        Collection.toStringArray = toStringArray;
        /**
          * Checks if the specific object is an array.
          */
        function isArray(col) {
            return col != null && col instanceof Array;
        }
        Collection.isArray = isArray;
        /**
          * Checks whether a specific list contains a test item.
          * @param list  The list.
          * @param testItem  The item to test.
          * @param compare  Additional compare handler.
          */
        function contains(list, testItem, compare) {
            if (!list)
                return false;
            return Collection.indexOf(list, testItem, compare) >= 0;
        }
        Collection.contains = contains;
        /**
          * Gets the index of a test item in a specific list.
          * @param list  The list.
          * @param testItem  The item to test.
          * @param compare  Additional compare handler.
          */
        function indexOf(list, testItem, compare) {
            if (!list)
                return 0;
            var index = -1;
            list.some(function (v, i, a) {
                if (!(!!compare ? (typeof compare === "string" ? (v != null && v[compare] === testItem) : compare(v, testItem)) : v === testItem))
                    return false;
                index = i;
                return true;
            });
            return index;
        }
        Collection.indexOf = indexOf;
        /**
          * Gets the element of a test item in a specific list.
          * @param list  The list.
          * @param testItem  The item to test.
          * @param compare  Additional compare handler.
          */
        function getItem(list, testItem, compare) {
            if (!list)
                return undefined;
            var value;
            return list.some(function (v, i, a) {
                if (!(!!compare ? (typeof compare === "string" ? (v != null && v[compare] === testItem) : compare(v, testItem)) : v === testItem))
                    return false;
                value = v;
                return true;
            }) ? value : undefined;
        }
        Collection.getItem = getItem;
        /**
          * Copies a list.
          * @param list  The list to copy.
          */
        function copy(list, removeEmpty) {
            if (removeEmpty === void 0) { removeEmpty = false; }
            if (!list)
                return null;
            var col = [];
            list.forEach(function (ele, i, arr) {
                if (!ele && removeEmpty)
                    return;
                col.push(ele);
            });
            return col;
        }
        Collection.copy = copy;
        /**
          * Adds a list to target list one.
          * @param list  The target list.
          * @param adding  The list to add.
          * @param nullCheck  A value indicating whether need ignore null.
          * @param duplicateCheck  A value indicating whether need ignore the one duplicated.
          */
        function pushRange(list, adding, nullCheck, duplicateCheck) {
            if (nullCheck === void 0) { nullCheck = false; }
            if (duplicateCheck === void 0) { duplicateCheck = false; }
            if (!list)
                return null;
            if (!!adding)
                adding.forEach(function (ele, i, arr) {
                    if (!ele && nullCheck)
                        return;
                    if (duplicateCheck && Collection.contains(list, ele, typeof duplicateCheck === "boolean" ? null : duplicateCheck))
                        return;
                    list.push(ele);
                });
            return list;
        }
        Collection.pushRange = pushRange;
        /**
          * Removes a number of items from a target list.
          * @param list  The target list.
          * @param removing  The list to remove.
          * @param changeRaw  A value indicating whether change the target list or create a copy list to modify.
          * @param compare  An optional comparing handler.
          */
        function remove(list, removing, changeRaw, compare) {
            if (changeRaw === void 0) { changeRaw = false; }
            if (compare === void 0) { compare = null; }
            if (!list)
                return null;
            if (removing == null || removing.length === 0)
                return list;
            var col = changeRaw ? list : [];
            var raw = changeRaw ? Collection.copy(list) : list;
            var len = col.length;
            if (len > 0)
                for (var step = 0; step < len; step++)
                    col.pop();
            raw.forEach(function (value, index, array) {
                if (Collection.contains(removing, value, compare))
                    return;
                col.push(value);
            });
            return col;
        }
        Collection.remove = remove;
        /**
          * Removes key value pairs.
          * @param list  The target key value pairs.
          * @param removing  The keys to remove.
          * @param changeRaw  A value indicating whether change the target list or create a copy list to modify.
          */
        function removeKeyValuePair(list, removing, changeRaw) {
            if (changeRaw === void 0) { changeRaw = false; }
            return Collection.remove(list, removing, changeRaw, function (left, right) {
                return left.key === right;
            });
        }
        Collection.removeKeyValuePair = removeKeyValuePair;
        /**
          * Sets a key value pair.
          * @param list  The target key value pairs.
          * @param item  The key value pair to set.
          * @param compare  An optional comparing handler.
          */
        function setKeyValue(col, item, compare) {
            if (compare === void 0) { compare = null; }
            if (!col)
                col = [];
            if (!item)
                return col;
            var contains = false;
            col.forEach(function (iV, iI, iA) {
                if (!!compare ? compare(iV.key, item.key) : (iV.key !== item.key))
                    return;
                contains = true;
                iV.value = item.value;
            });
            if (!contains)
                col.push(item);
            return col;
        }
        Collection.setKeyValue = setKeyValue;
        /**
          * Modifies items in a specific list string.
          * @param raw  The list string.
          * @param split  The split string.
          * @param addingItems  Items to add into the list string.
          * @param removingItems  Items to remove from the list list string.
          */
        function addItem(raw, split, addingItems, removingItems, keepSplitAround) {
            if (!split)
                return raw;
            var str = "";
            var addingCol = Collection.toStringArray(addingItems, false);
            var removingCol = Collection.toStringArray(removingItems, false);
            split = split.toString();
            str = split + (raw || "").toString() + split;
            str = str.replace(split + split, split);
            if (!!addingCol)
                addingCol.forEach(function (ele, i, arr) {
                    str = str.replace(split + ele + split, split);
                });
            if (!!removingCol)
                removingCol.forEach(function (ele, i, arr) {
                    str = str.replace(split + ele + split, split);
                });
            str = (str + split).replace(split + split, split).replace(split + split, split).replace(split + split, split).replace(split + split, split);
            if (str === split)
                str = "";
            if (!!addingCol)
                addingCol.forEach(function (ele, i, arr) {
                    str += split + ele + split;
                    str = str.replace(split + split, split);
                });
            if (!keepSplitAround && str.length > split.length * 2) {
                str = str.substring(split.length, str.length - split.length);
            }
            return str.replace(split + split, split);
        }
        Collection.addItem = addItem;
        /**
          * Gets an entry.
          * @param col  The mapped object with resources.
          * @param reference  The entry reference item to get.
          * @param resType  The reference type.
          */
        function getEntry(col, reference, resType) {
            if (!col || !reference)
                return null;
            var result = null;
            var resId = typeof reference === "string" ? reference : reference.id;
            if (!resType && !!reference.type)
                resType = reference.type;
            if (!resType || !resId)
                return null;
            resId = resId.toString();
            resType = resType.toString();
            Collection.toArray(col).forEach(function (mapped, mI, mA) {
                var mapping = mapped.map;
                if (!mapping)
                    mapping = mapped.mapping;
                if (!mapping)
                    mapping = {};
                var fields = mapping[resType];
                if (!fields)
                    fields = [resType];
                if (!fields)
                    return;
                Collection.toStringArray(fields).forEach(function (field, fI, fA) {
                    var list = mapped[field];
                    if (!list)
                        return;
                    list.some(function (item, iI, iA) {
                        if (item.id != resId)
                            return false;
                        result = item;
                        return true;
                    });
                });
            });
            return result;
        }
        Collection.getEntry = getEntry;
        /**
          * Gets a list of entry.
          * @param col  The mapped object with resources.
          * @param reference  The entry reference item to get.
          */
        function getEntries(col, reference) {
            if (!col || !reference || !reference.id || !reference.type)
                return [];
            var result = [];
            var resType = reference.type.toString();
            Collection.toArray(col).forEach(function (mapped, mI, mA) {
                var mapping = mapped.map;
                if (!mapping)
                    mapping = mapped.mapping;
                var fields = mapping[resType];
                if (!fields)
                    fields = [resType];
                if (!fields)
                    return;
                Collection.toStringArray(fields).forEach(function (field, fI, fA) {
                    var list = mapped[field];
                    if (!list)
                        return;
                    list.some(function (item, iI, iA) {
                        if (item.id != reference.id.toString())
                            return false;
                        result.push(item);
                        return true;
                    });
                });
            });
            return result;
        }
        Collection.getEntries = getEntries;
        /**
          * Finds the item view in the list.
          * @param col  The collection of item views.
          * @param value  The value of item view to find.
          */
        function findItemView(col, value) {
            if (!col)
                return null;
            var sel = null;
            col.some(function (ele, i, arr) {
                if (ele.value !== value)
                    return false;
                sel = ele;
                return true;
            });
            return sel;
        }
        Collection.findItemView = findItemView;
        /**
          * Gets cell information of a table.
          * @param row  The model data of the row.
          * @param column  The column information.
          * @param element  The cell element.
          */
        function cellInfo(row, column, element) {
            if (!row || !column)
                return null;
            var prop = !!column.property ? row[column.property.toString()] : row;
            var propItem = null;
            if (column.mapping == null)
                column.mapping = ReferenceMappingTypes.Property;
            switch (column.mapping) {
                case ReferenceMappingTypes.Property:
                    if (!prop)
                        break;
                    propItem = !!column.key ? prop[column.key.toString()] : prop;
                    break;
                case ReferenceMappingTypes.Id:
                    if (!prop || !column.key || !Collection.isArray(prop) || !prop.length)
                        break;
                    propItem = Collection.getItem(prop, column.key, "id");
                    break;
                case ReferenceMappingTypes.Key:
                    if (!prop || !column.key || !Collection.isArray(prop) || !prop.length)
                        break;
                    propItem = Collection.getItem(prop, column.key, "key");
                    if (!!propItem)
                        propItem = propItem.value;
                    break;
                case ReferenceMappingTypes.Index:
                    if (!prop || column.key == null || !Collection.isArray(prop) || !prop.length)
                        break;
                    var propIndex = typeof column.key === "number" ? column.key : parseInt(column.key);
                    if (isNaN(propIndex) || propIndex < 0 || propIndex > prop.length)
                        break;
                    propItem = prop[propIndex];
                    break;
                case ReferenceMappingTypes.Function:
                    if (!prop || !column.key || typeof column.key !== "function")
                        break;
                    propItem = column.key(prop);
                    break;
                case ReferenceMappingTypes.Static:
                    propItem = column.key != null ? column.key : "";
                    break;
                default:
                    if (!prop)
                        break;
                    propItem = !!column.key ? prop[column.key.toString()] : prop;
                    break;
            }
            return {
                column: column,
                row: row,
                container: element,
                value: propItem
            };
        }
        Collection.cellInfo = cellInfo;
        /**
          * Formats a list.
          * @param col  The original collection.
          * @param format  The format handler.
          */
        function formatList(col, format, removeEmpty) {
            if (removeEmpty === void 0) { removeEmpty = false; }
            if (!col)
                return null;
            var list = [];
            col.forEach(function (ele, i, arr) {
                if (!ele && removeEmpty)
                    return;
                list.push(format(ele));
            });
            return list;
        }
        Collection.formatList = formatList;
        /**
          * Gets different between two versions of list.
          * @param oldItems  The list copied in old version.
          * @param newItems  The current list.
          */
        function diff(oldItems, newItems) {
            var result = {
                added: [],
                modified: [],
                removed: [],
                unchanged: []
            };
            if (!oldItems) {
                result.added = newItems || [];
                return result;
            }
            if (!newItems) {
                result.removed = oldItems;
                return result;
            }
            oldItems.forEach(function (item, i, arr) {
                if (Collection.contains(newItems, item))
                    result.unchanged.push(item);
                else
                    result.removed.push(item);
            });
            newItems.forEach(function (item, i, arr) {
                if (!Collection.contains(oldItems, item))
                    result.added.push(item);
            });
            return result;
        }
        Collection.diff = diff;
        /*
         * Changes selects.
         */
        function changeSelect(list, selectionMode, selected, h, value) {
            if (!list || !selected || selectionMode == null || selectionMode === Collection.SelectionModes.None)
                return {
                    selectionMode: selectionMode != null ? selectionMode : Collection.SelectionModes.None,
                    toSelected: [],
                    toUnselected: [],
                    selected: Collection.copy(list)
                };
            var old = Collection.copy(list);
            selected.forEach(function (entity, eI, eArr) {
                if (!h)
                    h = function (arg1, arg2) { };
                var isSelected = Collection.contains(list, entity);
                var selectValue = value !== false;
                if (value == null)
                    selectValue = !isSelected;
                if (isSelected === selectValue)
                    return isSelected;
                switch (selectionMode) {
                    case Collection.SelectionModes.Single:
                    case Collection.SelectionModes.SingleOrEmpty:
                        if (selectionMode === Collection.SelectionModes.Single && value == null && isSelected)
                            return true;
                        while (list.length > 0) {
                            var hasSel = list.pop();
                            h(hasSel, false);
                        }
                        if (selectValue)
                            list.push(entity);
                        break;
                    case Collection.SelectionModes.Multiple:
                        if (selectValue) {
                            list.push(entity);
                        }
                        else {
                            Collection.remove(list, [entity], true);
                        }
                        break;
                    default:
                        break;
                }
                h(entity, selectValue);
            });
            var diffL = Collection.diff(old, list);
            return {
                selectionMode: selectionMode,
                toSelected: diffL.added,
                toUnselected: diffL.removed,
                selected: Collection.copy(list)
            };
        }
        Collection.changeSelect = changeSelect;
        /**
          * Creates a binding array.
          * @param col  The array if need fill initially.
          */
        function bindingArray(col) {
            return arguments.length > 0 ? AliHub.Common.bindingArray(col) : AliHub.Common.bindingArray();
        }
        Collection.bindingArray = bindingArray;
        /**
          * Creates a BindingControl.
          * @param idSuffix  The identifier or identifier suffix if has a parent control.
          * @param parent  The parent control.
          * @param options  The initializition options.
          */
        function bindingControl(idSuffix, options, parent) {
            return AliHub.Common.createControl(idSuffix, BindingControl, options, parent);
        }
        Collection.bindingControl = bindingControl;
        /**
          * Creates a ListControl.
          * @param idSuffix  The identifier or identifier suffix if has a parent control.
          * @param parent  The parent control.
          * @param options  The initializition options.
          */
        function listControl(idSuffix, options, parent) {
            return AliHub.Common.createControl(idSuffix, ListControl, options, parent);
        }
        Collection.listControl = listControl;
        /**
          * Creates a PagingControl.
          * @param idSuffix  The identifier or identifier suffix if has a parent control.
          * @param parent  The parent control.
          * @param options  The initializition options.
          */
        function pagingControl(idSuffix, options, parent) {
            return AliHub.Common.createControl(idSuffix, PagingControl, options, parent);
        }
        Collection.pagingControl = pagingControl;
        /**
          * Creates a SwitchControl.
          * @param idSuffix  The identifier or identifier suffix if has a parent control.
          * @param parent  The parent control.
          * @param options  The initializition options.
          */
        function switchControl(idSuffix, options, parent) {
            return AliHub.Common.createControl(idSuffix, SwitchControl, options, parent);
        }
        Collection.switchControl = switchControl;
        /**
          * Creates a SingleFlowControl.
          * @param idSuffix  The identifier or identifier suffix if has a parent control.
          * @param parent  The parent control.
          * @param options  The initializition options.
          */
        function singleFlowControl(idSuffix, options, parent) {
            return AliHub.Common.createControl(idSuffix, SingleFlowControl, options, parent);
        }
        Collection.singleFlowControl = singleFlowControl;
    })(Collection = AliHub.Collection || (AliHub.Collection = {}));
})(AliHub || (AliHub = {}));
/*  --------------------
 *  Date and time - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  datetime.ts
 *  Description  Collection library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
/// <reference path="common.ts" />
var AliHub;
(function (AliHub) {
    var Common;
    (function (Common) {
        /**
          * Date time and related.
          */
        var DateTime = (function () {
            function DateTime() {
            }
            /**
              * Converts to date.
              * @param value  The value to convert.
              */
            DateTime.parse = function (value) {
                if (value == null)
                    return null;
                if (value instanceof Date)
                    return value;
                if (value.month != null && value.date != null) {
                    var struc = value;
                    return new Date(struc.year != null ? struc.year : (new Date()).getFullYear(), struc.month, struc.date || 0, struc.hour || 0, struc.minute || 0, struc.second || 0, struc.millisecond || 0);
                }
                switch (typeof value) {
                    case "string":
                        switch (value) {
                            case "init":
                                value = window._pageInitDate;
                                var latest = !value || value === "init" ? new Date() : DateTime.parse(value);
                                if (latest == null)
                                    latest = new Date();
                                window._pageInitDate = latest;
                                return latest;
                            case "now":
                                return new Date();
                            case "today":
                                var now = new Date();
                                return new Date(now.getFullYear(), now.getMonth(), now.getDate());
                            default:
                                return new Date(value);
                        }
                    case "number":
                        return new Date(value);
                    case "boolean":
                        return value === true ? new Date() : null;
                    default:
                        return value;
                }
            };
            /**
              * Converts to locale time string.
              * @param value  The date time.
              */
            DateTime.toLocaleTimeString = function (value, only24h) {
                if (only24h === void 0) { only24h = false; }
                value = DateTime.parse(value);
                if (value == null)
                    return "";
                if (DateTime.only24h || only24h === true) {
                    return Common.Maths.addPrefix(value.getHours(), 2) + ":" + Common.Maths.addPrefix(value.getMinutes(), 2) + ":" + Common.Maths.addPrefix(value.getSeconds(), 2);
                }
                var timeStr = value.toLocaleTimeString();
                if (timeStr.indexOf("GMT") > 5) {
                    timeStr = timeStr.substring(0, timeStr.indexOf("GMT"));
                }
                else if (timeStr.indexOf("GMT") === 0) {
                    timeStr = timeStr.substring(5);
                }
                return timeStr;
            };
            /**
              * Gets locale string of the day of week string.
              * @param value  The date time.
              */
            DateTime.toDayOfWeekString = function (value, short) {
                if (short === void 0) { short = false; }
                if (value == null)
                    return "";
                var dayOfWeek = typeof value === "number" ? value : value.getDay();
                if (short) {
                    switch (dayOfWeek) {
                        case 0:
                            return AliHub.Res.builtIn().localString("week0s");
                        case 1:
                            return AliHub.Res.builtIn().localString("week1s");
                        case 2:
                            return AliHub.Res.builtIn().localString("week2s");
                        case 3:
                            return AliHub.Res.builtIn().localString("week3s");
                        case 4:
                            return AliHub.Res.builtIn().localString("week4s");
                        case 5:
                            return AliHub.Res.builtIn().localString("week5s");
                        case 6:
                            return AliHub.Res.builtIn().localString("week6s");
                        default:
                            return "";
                    }
                }
                switch (dayOfWeek) {
                    case 0:
                        return AliHub.Res.builtIn().localString("week0f");
                    case 1:
                        return AliHub.Res.builtIn().localString("week1f");
                    case 2:
                        return AliHub.Res.builtIn().localString("week2f");
                    case 3:
                        return AliHub.Res.builtIn().localString("week3f");
                    case 4:
                        return AliHub.Res.builtIn().localString("week4f");
                    case 5:
                        return AliHub.Res.builtIn().localString("week5f");
                    case 6:
                        return AliHub.Res.builtIn().localString("week6f");
                    default:
                        return "";
                }
            };
            /**
              * Gets locale string of AM or PM.
              * @param value  The date time.
              */
            DateTime.toApmString = function (value) {
                if (value == null)
                    return "";
                var hour = typeof value === "number" ? value : value.getHours();
                return hour >= 12 ? AliHub.Res.builtIn().localString("pm") : AliHub.Res.builtIn().localString("am");
            };
            /**
              * Gets locale string of the month.
              * @param value  The date time.
              */
            DateTime.toMonthString = function (value, short) {
                if (short === void 0) { short = false; }
                if (value == null)
                    return "";
                var month = typeof value === "number" ? value : value.getDay();
                if (short) {
                    switch (month) {
                        case 0:
                            return AliHub.Res.builtIn().localString("month0s") || month.toString();
                        case 1:
                            return AliHub.Res.builtIn().localString("month1s") || month.toString();
                        case 2:
                            return AliHub.Res.builtIn().localString("month2s") || month.toString();
                        case 3:
                            return AliHub.Res.builtIn().localString("month3s") || month.toString();
                        case 4:
                            return AliHub.Res.builtIn().localString("month4s") || month.toString();
                        case 5:
                            return AliHub.Res.builtIn().localString("month5s") || month.toString();
                        case 6:
                            return AliHub.Res.builtIn().localString("month6s") || month.toString();
                        case 7:
                            return AliHub.Res.builtIn().localString("month7s") || month.toString();
                        case 8:
                            return AliHub.Res.builtIn().localString("month8s") || month.toString();
                        case 9:
                            return AliHub.Res.builtIn().localString("month9s") || month.toString();
                        case 10:
                            return AliHub.Res.builtIn().localString("monthAs") || month.toString();
                        case 11:
                            return AliHub.Res.builtIn().localString("monthBs") || month.toString();
                        default:
                            return "";
                    }
                }
                switch (month) {
                    case 0:
                        return AliHub.Res.builtIn().localString("month0f") || month.toString();
                    case 1:
                        return AliHub.Res.builtIn().localString("month1f") || month.toString();
                    case 2:
                        return AliHub.Res.builtIn().localString("month2f") || month.toString();
                    case 3:
                        return AliHub.Res.builtIn().localString("month3f") || month.toString();
                    case 4:
                        return AliHub.Res.builtIn().localString("month4f") || month.toString();
                    case 5:
                        return AliHub.Res.builtIn().localString("month5f") || month.toString();
                    case 6:
                        return AliHub.Res.builtIn().localString("month6f") || month.toString();
                    case 7:
                        return AliHub.Res.builtIn().localString("month7f") || month.toString();
                    case 8:
                        return AliHub.Res.builtIn().localString("month8f") || month.toString();
                    case 9:
                        return AliHub.Res.builtIn().localString("month9f") || month.toString();
                    case 10:
                        return AliHub.Res.builtIn().localString("monthAf") || month.toString();
                    case 11:
                        return AliHub.Res.builtIn().localString("monthBf") || month.toString();
                    default:
                        return "";
                }
            };
            /**
              * Gets customized string.
              * @param value  The date time.
              * @param format  The template string.
              * @param classicFormatOnly  true if only classic text format; otherwise, false.
              */
            DateTime.toCustomizedString = function (value, format, classicFormatOnly) {
                if (classicFormatOnly === void 0) { classicFormatOnly = false; }
                value = DateTime.parse(value);
                if (value == null)
                    return "";
                if (format == null)
                    return value.toString();
                format = format.toString();
                var horoscope = DateTime.getHoroscope(value);
                switch (format.toLowerCase()) {
                    case "localedate":
                    case "ldate":
                        return value.toLocaleDateString();
                    case "localetime":
                    case "ltime":
                        return value.toLocaleTimeString();
                    case "localereladate":
                    case "lrdate":
                        return DateTime.toLocaleString(value, true);
                    case "localerelatime":
                    case "lrtime":
                        return DateTime.toLocaleString(value, false);
                    case "localedatetime":
                    case "locale":
                        return value.toLocaleString();
                    case "date":
                        return value.toDateString();
                    case "time":
                        return value.toTimeString();
                    case "full":
                    case "datetime":
                        return value.toString();
                    case "iso":
                        return value.toISOString();
                    case "utc":
                        return value.toUTCString();
                    case "number":
                        return value.getTime().toString();
                    case "horoscope":
                        return !!horoscope ? horoscope.name : "";
                    case "horoscopesymbo":
                        return !!horoscope ? horoscope.symbo : "";
                    case "span":
                        return DateTime.getNowSpanString(value);
                    default:
                        break;
                }
                var h = value.getHours() % 12;
                if (h === 0)
                    h = 12;
                var info = {
                    localedate: value.toLocaleDateString(),
                    localetime: value.toLocaleTimeString(),
                    locale: value.toLocaleString(),
                    full: value.toString(),
                    iso: value.toISOString(),
                    horoscopename: !!horoscope ? horoscope.name : "",
                    horoscopeen: !!horoscope ? horoscope.enName : "",
                    horoscopesymbo: !!horoscope ? horoscope.symbo : "",
                    yyyy: value.getFullYear(),
                    dddd: DateTime.toDayOfWeekString(value, false),
                    MMMM: DateTime.toMonthString(value.getMonth(), false),
                    ddd: DateTime.toDayOfWeekString(value, true),
                    MMM: DateTime.toMonthString(value.getMonth(), true),
                    yy: value.getFullYear() % 100,
                    MM: Common.Maths.addPrefix(value.getMonth() + 1, 2),
                    dd: Common.Maths.addPrefix(value.getDate(), 2),
                    M: value.getMonth() + 1,
                    d: value.getDate(),
                    HH: Common.Maths.addPrefix(value.getHours(), 2),
                    hh: Common.Maths.addPrefix(h, 2),
                    mm: Common.Maths.addPrefix(value.getMinutes(), 2),
                    ss: Common.Maths.addPrefix(value.getSeconds(), 2),
                    tt: DateTime.toApmString(value),
                    mmm: Common.Maths.addPrefix(value.getMilliseconds(), 3),
                    H: value.getHours(),
                    h: h,
                    m: value.getMinutes(),
                    s: value.getSeconds()
                };
                var str = Common.Text.format(format, info);
                if (!!str && !classicFormatOnly)
                    for (var prop in info) {
                        if (!!prop && typeof prop === "string")
                            str = str.replace(prop, info[prop]);
                    }
                return str;
            };
            /**
              * Compares whether the two dates are in same day.
              * @param a  The first date to compare.
              * @param a  The second date to compare.
              */
            DateTime.sameDate = function (a, b) {
                a = DateTime.parse(a);
                b = DateTime.parse(b);
                if (a == null && b == null)
                    return true;
                if (a == null || b == null)
                    return false;
                return a.toDateString() === b.toDateString();
            };
            /**
              * Converts a specific date to locale string.
              * @param value  The date value.
              */
            DateTime.toLocaleString = function (value, onlyDate) {
                if (onlyDate === void 0) { onlyDate = false; }
                if (value == null)
                    return "";
                value = DateTime.parse(value);
                var now = new Date();
                if (value.getFullYear() === now.getFullYear() && value.getMonth() === now.getMonth() && value.getDate() === now.getDate()) {
                    return onlyDate ? AliHub.Res.builtIn().localString("today") : DateTime.toLocaleTimeString(value);
                }
                var diffDays = DateTime.getDaysDiff(now, value);
                if (value > now) {
                    if (diffDays === 1)
                        return onlyDate ? AliHub.Res.builtIn().localString("tomorrow") : AliHub.Res.builtIn().localString("tomorrowTime").replace("{0}", DateTime.toLocaleTimeString(value));
                    if (value.getDay() - diffDays > 0) {
                        switch (value.getDay()) {
                            case 6:
                                return onlyDate ? AliHub.Res.builtIn().localString("week6f") : AliHub.Res.builtIn().localString("week6t").replace("{0}", DateTime.toLocaleTimeString(value));
                            case 5:
                                return onlyDate ? AliHub.Res.builtIn().localString("week5f") : AliHub.Res.builtIn().localString("week5t").replace("{0}", DateTime.toLocaleTimeString(value));
                            case 4:
                                return onlyDate ? AliHub.Res.builtIn().localString("week4f") : AliHub.Res.builtIn().localString("week4t").replace("{0}", DateTime.toLocaleTimeString(value));
                            case 3:
                                return onlyDate ? AliHub.Res.builtIn().localString("week3f") : AliHub.Res.builtIn().localString("week3t").replace("{0}", DateTime.toLocaleTimeString(value));
                            default:
                                break;
                        }
                    }
                    return onlyDate ? value.toLocaleDateString() : value.toLocaleString();
                }
                if (diffDays === 1)
                    return onlyDate ? AliHub.Res.builtIn().localString("yesterday") : AliHub.Res.builtIn().localString("yesterdayTime").replace("{0}", DateTime.toLocaleTimeString(value));
                if (value.getDay() + diffDays < 6) {
                    switch (value.getDay()) {
                        case 4:
                            return onlyDate ? AliHub.Res.builtIn().localString("week4f") : AliHub.Res.builtIn().localString("week4t").replace("{0}", DateTime.toLocaleTimeString(value));
                        case 3:
                            return onlyDate ? AliHub.Res.builtIn().localString("week3f") : AliHub.Res.builtIn().localString("week3t").replace("{0}", DateTime.toLocaleTimeString(value));
                        case 2:
                            return onlyDate ? AliHub.Res.builtIn().localString("week2f") : AliHub.Res.builtIn().localString("week2t").replace("{0}", DateTime.toLocaleTimeString(value));
                        case 1:
                            return onlyDate ? AliHub.Res.builtIn().localString("week1f") : AliHub.Res.builtIn().localString("week1t").replace("{0}", DateTime.toLocaleTimeString(value));
                        default:
                            break;
                    }
                }
                return onlyDate ? value.toLocaleDateString() : value.toLocaleString();
            };
            /**
              * Converts a specific date to a full locale string.
              * @param value  The date value.
              */
            DateTime.toFullLocaleString = function (value) {
                if (value == null)
                    return "";
                value = DateTime.parse(value);
                var now = new Date();
                return value.toLocaleString();
            };
            /**
              * Converts a specific date to simple string.
              * @param value  The date value.
              */
            DateTime.toSimpleString = function (value) {
                if (value == null)
                    return "";
                value = DateTime.parse(value);
                return value.getFullYear().toString() + "-" + Common.Maths.addPrefix(value.getMonth() + 1, 2) + "-" + Common.Maths.addPrefix(value.getDate(), 2)
                    + " " + Common.Maths.addPrefix(value.getHours(), 2) + ":" + Common.Maths.addPrefix(value.getMinutes(), 2) + ":" + Common.Maths.addPrefix(value.getSeconds(), 2);
            };
            /**
              * Gets the day of week of a specific month.
              * @param fullYear  The full year.
              * @param month  The month.
              */
            DateTime.monthStart = function (fullYear, month) {
                if (month === void 0) { month = 0; }
                var date = new Date(fullYear, month);
                return date.getDay();
            };
            /**
              * Converts a specific date to number string.
              * @param value  The date value.
              */
            DateTime.toNumberString = function (value) {
                if (value == null)
                    return "";
                if (typeof value === "number")
                    return value.toString();
                value = DateTime.parse(value);
                if (value == null)
                    return "";
                return value.getTime().toString();
            };
            /**
              * Gets a value indicating whether a year is leap.
              * @param fullYear  The full year to test.
              */
            DateTime.isLeap = function (fullYear) {
                if (fullYear == null)
                    return null;
                return fullYear % 400 === 0 || (fullYear % 4 === 0 && fullYear % 100 !== 0);
            };
            /**
              * Gets the count of days in a specific month.
              * @param fullYear  The month.
              */
            DateTime.getDayCount = function (fullYear, month) {
                if (month === 2) {
                    if (fullYear == null)
                        return null;
                    return DateTime.isLeap(fullYear) ? 29 : 28;
                }
                if (month == null) {
                    return DateTime.isLeap(fullYear) ? 366 : 365;
                }
                switch (month) {
                    case 0:
                    case 2:
                    case 4:
                    case 6:
                    case 7:
                    case 9:
                    case 11:
                        return 31;
                    default:
                        return 30;
                }
            };
            /**
              * Gets days difference between two date.
              * @param begin  The begin date.
              * @param end  The end date.
              */
            DateTime.getDaysDiff = function (begin, end) {
                if (begin == null || end == null)
                    return null;
                begin = DateTime.parse(begin);
                end = DateTime.parse(end);
                if (begin > end) {
                    var temp = begin;
                    begin = end;
                    end = temp;
                }
                var endYear = end.getFullYear();
                var beginYear = begin.getFullYear();
                var endMonth = end.getMonth();
                var beginMonth = begin.getMonth();
                var endDay = end.getDate();
                var beginDay = begin.getDate();
                if (endYear === beginYear && endMonth === beginMonth) {
                    return endDay - beginDay;
                }
                var delta = 0;
                delta += DateTime.getDayCount(beginYear, beginMonth) - beginDay;
                delta += end.getDate();
                if (endYear === beginYear) {
                    if (endMonth - beginMonth > 1) {
                        for (var i = beginMonth + 1; i < endMonth; i++) {
                            delta += DateTime.getDayCount(beginYear, i);
                        }
                    }
                    return delta;
                }
                for (var i = beginMonth + 1; i < 12; i++) {
                    delta += DateTime.getDayCount(beginYear, i);
                }
                for (var i = 0; i < endMonth; i++) {
                    delta += DateTime.getDayCount(endYear, i);
                }
                if (endYear - beginYear > 1) {
                    for (var i = beginYear + 1; i < endYear; i++) {
                        delta += DateTime.getDayCount(i);
                    }
                }
                return delta;
            };
            /**
              * Gets years difference between two date.
              * @param begin  The begin date.
              * @param end  The end date.
              */
            DateTime.getYearsDiff = function (begin, end) {
                if (begin == null || end == null)
                    return null;
                begin = DateTime.parse(begin);
                end = DateTime.parse(end);
                if (begin > end) {
                    var temp = begin;
                    begin = end;
                    end = temp;
                }
                var delta = end.getFullYear() - begin.getFullYear();
                return delta;
            };
            /**
              * Gets age by given a birthday.
              * @param value  The birthday.
              */
            DateTime.getAge = function (value) {
                if (value == null)
                    return null;
                value = DateTime.parse(value);
                var now = new Date();
                var delta = now.getFullYear() - value.getFullYear();
                return value.getMonth() >= now.getMonth() ? delta : delta - 1;
            };
            /**
              * Gets horoscopes list.
              */
            DateTime.getHoroscopes = function () {
                return [
                    {
                        name: AliHub.Res.builtIn().localString("capricorn"),
                        enName: "Capricorn",
                        start: { month: 11, date: 22 },
                        end: { month: 0, date: 20 },
                        symbo: "♑"
                    },
                    {
                        name: AliHub.Res.builtIn().localString("aquarius"),
                        enName: "Aquarius",
                        start: { month: 0, date: 21 },
                        end: { month: 1, date: 19 },
                        symbo: "♒"
                    },
                    {
                        name: AliHub.Res.builtIn().localString("pisces"),
                        enName: "Pisces",
                        start: { month: 1, date: 20 },
                        end: { month: 2, date: 20 },
                        symbo: "♓"
                    },
                    {
                        name: AliHub.Res.builtIn().localString("aries"),
                        enName: "Aries",
                        start: { month: 2, date: 21 },
                        end: { month: 3, date: 20 },
                        symbo: "♈"
                    },
                    {
                        name: AliHub.Res.builtIn().localString("taurus"),
                        enName: "Taurus",
                        start: { month: 3, date: 21 },
                        end: { month: 4, date: 21 },
                        symbo: "♉"
                    },
                    {
                        name: AliHub.Res.builtIn().localString("gemini"),
                        enName: "Gemini",
                        start: { month: 4, date: 22 },
                        end: { month: 5, date: 21 },
                        symbo: "♊"
                    },
                    {
                        name: AliHub.Res.builtIn().localString("cancer"),
                        enName: "Cancer",
                        start: { month: 5, date: 22 },
                        end: { month: 6, date: 22 },
                        symbo: "♋"
                    },
                    {
                        name: AliHub.Res.builtIn().localString("leo"),
                        enName: "Leo",
                        start: { month: 6, date: 23 },
                        end: { month: 7, date: 23 },
                        symbo: "♌"
                    },
                    {
                        name: AliHub.Res.builtIn().localString("virgo"),
                        enName: "Virgo",
                        start: { month: 7, date: 24 },
                        end: { month: 8, date: 23 },
                        symbo: "♍"
                    },
                    {
                        name: AliHub.Res.builtIn().localString("libra"),
                        enName: "Libra",
                        start: { month: 8, date: 24 },
                        end: { month: 9, date: 23 },
                        symbo: "♎"
                    },
                    {
                        name: AliHub.Res.builtIn().localString("scorpio"),
                        enName: "Scorpio",
                        start: { month: 9, date: 24 },
                        end: { month: 10, date: 22 },
                        symbo: "♏"
                    },
                    {
                        name: AliHub.Res.builtIn().localString("sagittarius"),
                        enName: "Sagittarius",
                        start: { month: 10, date: 23 },
                        end: { month: 11, date: 21 },
                        symbo: "♐"
                    }
                ];
            };
            /**
              * Gets a horoscope info by specific date.
              * @param value  The date.
              */
            DateTime.getHoroscope = function (value) {
                if (value == null)
                    return null;
                value = DateTime.parse(value);
                var date = value.getDate();
                var month = value.getMonth();
                var list = DateTime.getHoroscopes();
                if ((month == 11 && date >= 22) || (month == 0 && date <= 20))
                    return list[0];
                else if ((month == 0 && date >= 21) || (month == 1 && date <= 19))
                    return list[1];
                else if ((month == 1 && date >= 20) || (month == 2 && date <= 20))
                    return list[2];
                else if ((month == 2 && date >= 21) || (month == 3 && date <= 20))
                    return list[3];
                else if ((month == 3 && date >= 21) || (month == 4 && date <= 21))
                    return list[4];
                else if ((month == 4 && date >= 22) || (month == 5 && date <= 21))
                    return list[5];
                else if ((month == 5 && date >= 22) || (month == 6 && date <= 22))
                    return list[6];
                else if ((month == 6 && date >= 23) || (month == 7 && date <= 23))
                    return list[7];
                else if ((month == 7 && date >= 24) || (month == 8 && date <= 23))
                    return list[8];
                else if ((month == 8 && date >= 24) || (month == 9 && date <= 23))
                    return list[9];
                else if ((month == 9 && date >= 24) || (month == 10 && date <= 22))
                    return list[10];
                else if ((month == 10 && date >= 23) || (month == 11 && date <= 21))
                    return list[11];
                else
                    return null;
            };
            /**
              * Adds speicifc seconds to given date.
              * @param value  The date.
              * @param adding  The timespan in second to add.
              */
            DateTime.addSeconds = function (value, adding) {
                value = DateTime.parse(value);
                if (value == null)
                    return null;
                var resultDate = new Date(value.getTime() + adding * 1000);
                return resultDate;
            };
            /**
              * Adds speicifc days to given date.
              * @param value  The date.
              * @param adding  The timespan in day to add.
              */
            DateTime.addDays = function (value, adding) {
                value = DateTime.parse(value);
                if (value == null)
                    return null;
                var resultDate = new Date(value.getTime() + adding * 24 * 3600000);
                return resultDate;
            };
            /**
              * Gets timespan in milliseconds.
              * @param begin  The begin date.
              * @param end  The end date.
              */
            DateTime.getSpan = function (begin, end) {
                begin = DateTime.parse(begin);
                end = DateTime.parse(end);
                if (begin == null || end == null)
                    return null;
                var span = end.getTime() - begin.getTime();
                return span;
            };
            /**
              * Gets timespan string.
              * @param begin  The begin date.
              * @param end  The end date.
              */
            DateTime.getSpanString = function (begin, end, showMillisec) {
                if (showMillisec === void 0) { showMillisec = true; }
                var span = DateTime.getSpan(begin, end);
                return DateTime.toSpanString(span, showMillisec);
            };
            /**
              * Gets timespan string to now.
              * @param target  The target date.
              */
            DateTime.getNowSpanString = function (target) {
                target = DateTime.parse(target);
                var now = new Date();
                var span = DateTime.getSpan(target, now);
                span = span / 10000;
                if (span < 0) {
                    return AliHub.Res.builtIn().localString("future");
                }
                else if (span < 2) {
                    return AliHub.Res.builtIn().localString("secondsAgo");
                }
                else if (span < 6) {
                    return AliHub.Res.builtIn().localString("minuteAgo");
                }
                else if (span < 12) {
                    return AliHub.Res.builtIn().localString("minutesTwoAgo");
                }
                else if (span < 360) {
                    return AliHub.Res.builtIn().localString("minutesAgo").replace("{0}", (span / 6).toFixed());
                }
                else if (span < 720) {
                    return AliHub.Res.builtIn().localString("hourAgo");
                }
                else if (span < 1080) {
                    return AliHub.Res.builtIn().localString("hoursTwoAgo");
                }
                else if (span < 10000 && target.getDay() === now.getDay()) {
                    return AliHub.Res.builtIn().localString("hoursAgo").replace("{0}", (span / 360).toFixed());
                }
                else {
                    return DateTime.toLocaleString(target);
                }
            };
            /**
              * Gets timespan.
              * @param value  The timespan in milliseconds.
              */
            DateTime.toSpan = function (value) {
                if (value == null)
                    return null;
                if (typeof value === "function")
                    value = value();
                if (typeof value !== "number") {
                    var spanObj = value;
                    if (!spanObj.Days)
                        spanObj.Days = 0;
                    if (!spanObj.Hours)
                        spanObj.Hours = 0;
                    if (!spanObj.Minutes)
                        spanObj.Minutes = 0;
                    if (!spanObj.Seconds)
                        spanObj.Seconds = 0;
                    if (!spanObj.Milliseconds)
                        spanObj.Milliseconds = 0;
                    return spanObj;
                }
                var span = value;
                if (span == null || isNaN(span))
                    return null;
                var result = { Days: 0, Hours: 0, Minutes: 0, Seconds: 0, Milliseconds: 0 };
                var str = "";
                if (span < 0) {
                    str += "-";
                    span = -span;
                }
                if (span < 1000) {
                    result.Milliseconds = span;
                    return result;
                }
                var millis = span;
                var days = parseInt((millis / 86400000).toString(), 10);
                if (!isNaN(days) && days > 0)
                    result.Days = days;
                millis -= days * 86400000;
                var hours = parseInt((millis / 3600000).toString(), 10);
                if (!isNaN(hours) && hours > 0)
                    result.Hours = hours;
                millis -= hours * 3600000;
                var minutes = parseInt((millis / 60000).toString(), 10);
                if (isNaN(minutes))
                    minutes = 0;
                result.Minutes = minutes;
                millis -= minutes * 60000;
                var seconds = parseInt((millis / 1000).toString(), 10);
                if (isNaN(seconds))
                    seconds = 0;
                result.Seconds = seconds;
                millis -= minutes * 1000;
                result.Milliseconds = millis;
                return result;
            };
            /**
              * Gets timespan string.
              * @param span  The timespan in milliseconds.
              */
            DateTime.toSpanString = function (span, showMillisec) {
                if (showMillisec === void 0) { showMillisec = true; }
                if (span == null || isNaN(span))
                    return "";
                var str = "";
                if (span < 0) {
                    str += "-";
                    span = -span;
                }
                if (span < 1000) {
                    if (showMillisec) {
                        str += "0:00." + Common.Maths.addPrefix(span, 3);
                    }
                    else {
                        if (span < 500)
                            str += "0:00";
                        else
                            str += "0:01";
                    }
                    return str;
                }
                var millis = span;
                var days = parseInt((millis / 86400000).toString(), 10);
                if (!isNaN(days) && days > 0)
                    str += days.toString() + ":";
                millis -= days * 86400000;
                var hours = parseInt((millis / 3600000).toString(), 10);
                if (!isNaN(hours) && hours > 0)
                    str += Common.Maths.addPrefix(hours, 2) + ":";
                millis -= hours * 3600000;
                var minutes = parseInt((millis / 60000).toString(), 10);
                if (isNaN(minutes))
                    minutes = 0;
                str += Common.Maths.addPrefix(minutes, 2) + ":";
                millis -= minutes * 60000;
                var seconds = parseInt((millis / 1000).toString(), 10);
                if (isNaN(seconds))
                    seconds = 0;
                str += Common.Maths.addPrefix(seconds, 2);
                millis -= minutes * 1000;
                if (showMillisec && millis > 0)
                    str += "." + Common.Maths.addPrefix(millis, 3);
                return str === "NaN:NaN" || str === "NaN:NaN:NaN" || str === "NaN:NaN.NaN" || str === "NaN:NaN:NaN.NaN" ? "" : str;
            };
            /**
              * Gets locale timespan string.
              * @param value  The timespan in milliseconds.
              */
            DateTime.toLocaleSpanString = function (value, precision) {
                var span = DateTime.toSpan(value);
                if (!span)
                    return "";
                if (precision == null || precision == Common.TimePrecisions.Unknown)
                    precision = Common.TimePrecisions.Second;
                var str = span.Days > 0 ? AliHub.Res.builtIn().localString("daysNum").replace("{0}", span.Days.toString()) : "";
                if (precision === Common.TimePrecisions.Day)
                    return str;
                if (span.Hours > 0)
                    str += AliHub.Res.builtIn().localString("hoursNum").replace("{0}", span.Hours.toString());
                if (precision === Common.TimePrecisions.Hour)
                    return str;
                if (span.Minutes > 0)
                    str += AliHub.Res.builtIn().localString("minutesNum").replace("{0}", span.Minutes.toString());
                if (precision === Common.TimePrecisions.Minute)
                    return str;
                if (span.Seconds > 0)
                    str += AliHub.Res.builtIn().localString("secondsNum").replace("{0}", span.Seconds.toString());
                if (precision === Common.TimePrecisions.Second)
                    return str;
                if (span.Milliseconds > 0)
                    str += AliHub.Res.builtIn().localString("millisecondsNum").replace("{0}", span.Milliseconds.toString());
                return str;
            };
            /**
              * Gets time string.
              * @param value  The date time.
              */
            DateTime.toTimeString = function (value, showSecond, force24) {
                if (showSecond === void 0) { showSecond = true; }
                value = DateTime.parse(value);
                var str = "";
                if (force24 === true) {
                    str = value.getHours() > 10 ? "" : "0";
                    str += value.getHours().toString() + ":";
                    str += value.getMinutes() > 10 ? "" : "0";
                    str += value.getMinutes().toString();
                    if (showSecond === true) {
                        str += value.getSeconds() > 0 ? "" : "0";
                        str += value.getSeconds().toString();
                    }
                    return str;
                }
                if (showSecond !== true)
                    return value.toLocaleTimeString();
                var testHour = value.getHours() >= 12 ? 23 : 11;
                var testTime = new Date(2000, 0, 1, testHour, 57, 46);
                var hours = value.getHours();
                var is24 = false;
                var strTemp = testTime.toLocaleTimeString();
                if (strTemp.indexOf("23") >= 0)
                    is24 = true;
                if ((is24 !== true && strTemp.indexOf("11") < 0) || strTemp.indexOf("57") < 0 || strTemp.indexOf("46") < 0)
                    return value.toLocaleTimeString();
                strTemp = strTemp.replace("23", "{{hour}}").replace("11", "{{hour}}").replace("57", "{{min}}").replace(":46", "").replace("46", "{{sec}}");
                if (is24 === true && hours >= 12)
                    hours -= 12;
                var hoursStr = hours.toString();
                if (hours < 10)
                    hoursStr = "0" + hoursStr;
                var minStr = value.getMinutes().toString();
                if (value.getMinutes() < 10)
                    minStr = "0" + minStr;
                var secStr = value.getSeconds().toString();
                if (value.getSeconds() < 10)
                    secStr = "0" + secStr;
                str = strTemp.replace("{{hour}}", hours.toString()).replace("{{min}}", minStr).replace("{{sec}}", secStr);
                return str;
            };
            return DateTime;
        }());
        DateTime.only24h = false;
        Common.DateTime = DateTime;
        /**
          * Time scheduler control.
          */
        var TimeControl = (function (_super) {
            __extends(TimeControl, _super);
            /**
              * Initializes a new instance of the CalendarControl class.
              * @param id  Element ID. The content will be filled into this element to replace original ones.
              */
            function TimeControl(id) {
                var _this = _super.call(this, id) || this;
                _this._start = 0;
                _this._end = 24;
                _this._unit = 40;
                _this.addStyleRef("ali-controls-time");
                _this._style = {
                    labelX: 9,
                    labelY: 15,
                    scaleWidth: 11,
                    scaleHeight: 1,
                    scaleLast: true,
                    itemTitleX: -10,
                    itemTitleY: 25
                };
                return _this;
            }
            /**
              * Loads specific options.
              * @param options  The options to load.
              */
            TimeControl.prototype.loadOptions = function (value) {
                var options = _super.prototype.loadOptions.call(this, value);
                if (!options)
                    return options;
                if (options.start != null)
                    this._start = options.start;
                if (options.end != null)
                    this._end = options.end;
                if (this._start < 0)
                    this._start = 0;
                if (this._end < 0)
                    this._end = 0;
                if (this._start > 24)
                    this._start = 24;
                if (this._end > 24)
                    this._end = 24;
                if (this._start > this._end) {
                    var tempNum = this._end;
                    this._start = this._end;
                    this._end = tempNum;
                }
                if (options.viewModel != null)
                    this._model = options.viewModel;
                if (!!options.partsStyle)
                    this._style = options.partsStyle;
                this._refresh();
            };
            TimeControl.prototype.startHour = function (value) {
                if (arguments.length > 0) {
                    if (value != null && value >= 0 && value <= 24 && value <= this._end) {
                        this._start = value;
                    }
                }
                return this._start;
            };
            TimeControl.prototype.endHour = function (value) {
                if (arguments.length > 0) {
                    if (value != null && value >= 0 && value <= 24 && value >= this._start) {
                        this._end = value;
                    }
                }
                return this._end;
            };
            TimeControl.prototype.hours = function () {
                return this._end - this._start;
            };
            TimeControl.prototype.setViewModel = function (col) {
                this._model = col;
                this._refresh();
            };
            TimeControl.prototype._refresh = function () {
                var _this = this;
                if (!this._model) {
                    this.innerHTML("");
                    return;
                }
                var list = this._model.sort(function (a, b) {
                    if (!a || !b)
                        return 0;
                    if (!a.start)
                        a.start = { hour: 0 };
                    if (!b.start)
                        b.start = { hour: 0 };
                    if (a.start.hour == null)
                        a.start.hour = 0;
                    if (b.start.hour == null)
                        b.start.hour = 0;
                    return (a.start.hour - b.start.hour) * 3600 + ((a.start.minute != null ? a.start.minute : 0) - (b.start.minute != null ? b.start.minute : 0)) * 60 + (a.start.second != null ? a.start.second : 0) - (b.start.second != null ? b.start.second : 0);
                });
                if (!list[list.length - 1]) {
                    this.innerHTML("");
                    return;
                }
                var endStart = list[list.length - 1].start;
                if (!endStart || !endStart.hour) {
                    this.innerHTML("");
                    return;
                }
                var endHour = (endStart.hour * 3600 + (endStart.minute != null ? endStart.minute : 0) * 60 + (endStart.second != null ? endStart.second : 0) + (list[list.length - 1].duration != null ? list[list.length - 1].duration : 0)) / 3600;
                var templ = '<svg id="__view_control_svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="' + ((endHour - this._start) * this._unit + (this._style.scaleLast ? 1 : 0)).toString() + '">\
<title>Day view</title><desc>Schedule for daily view.</desc><defs></defs><g id="__view_control_svg_gp" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" class="ali-container-graph ali-container-main"><g id="__view_control_svg_gp_bg" class="ali-container-bg">';
                var step = 0;
                for (var i = this._start; i < endHour; i++) {
                    step = i - this._start;
                    templ += '<g id="__view_control_svg_gp_bg_i' + i.toString() + '" transform="translate(0, ' + (step * this._unit).toString() + ')" class="ali-container-main"><rect width="' + (this._style.scaleWidth != null ? this._style.scaleWidth : 0).toString() + '" height="' + (this._style.scaleHeight != null ? this._style.scaleHeight : 0).toString() + '"></rect><text transform="translate(' + (this._style.labelX != null ? this._style.labelX : 0).toString() + ', ' + (this._style.labelY != null ? this._style.labelY : 0).toString() + ')"><tspan>' + i.toString() + ':00</tspan></text></g>';
                }
                templ += '<g id="__view_control_svg_gp_bg_last" transform="translate(0, ' + ((step + 1) * this._unit).toString() + ')" class="ali-container-main"><rect width="' + (this._style.scaleWidth != null ? this._style.scaleWidth : 0).toString() + '" height="' + (this._style.scaleHeight != null ? this._style.scaleHeight : 0).toString() + '"></rect></g></g><g id="__view_control_svg_gp_cnt" class="ali-container-main">';
                list.forEach(function (item, i, arr) {
                    var model = item.model;
                    var startPixels = item.start.hour + (!!item.start.minute ? item.start.minute / 60 : 0);
                    startPixels = (startPixels - _this._start) * _this._unit;
                    var lenPixels = (item.duration != null ? item.duration : 0) / 3600;
                    lenPixels *= _this._unit;
                    templ += '<g id="__view_control_svg_gp_cnt_i' + i.toString() + '" ' + (!!model.color ? ("fill=\"" + model.color + "\"") : "") + ' transform="translate(0, ' + startPixels.toString() + ')" class="ali-container-main">\
<rect ' + (!!model.bgColor ? ("fill=\"" + model.bgColor + "\"") : "") + ' width="100%" height="' + lenPixels.toString() + '"></rect><rect width="' + (_this._style.itemLineWidth != null ? _this._style.itemLineWidth : 0).toString() + '" height="' + lenPixels.toString() + '"></rect><text height="' + lenPixels.toString() + '" transform="translate(' + (_this._style.itemTitleX != null ? _this._style.itemTitleX : 0).toString() + ', ' + (_this._style.itemTitleY != null ? _this._style.itemTitleY : 0).toString() + ')"><tspan x="100%">' + model.value + '</tspan></text></g>';
                });
                templ += '</g></g></svg>';
                this.innerHTML(templ);
            };
            return TimeControl;
        }(Common.VisualControl));
        Common.TimeControl = TimeControl;
        /**
          * Stopwatch.
          */
        var Stopwatch = (function () {
            function Stopwatch() {
                this._time = [];
                this.recorded = new AliHub.Collection.EventHandlers();
                this.paused = new AliHub.Collection.EventHandlers();
                this.cleared = new AliHub.Collection.EventHandlers();
                this.notifySucceeded = new AliHub.Collection.EventHandlers();
                this.notifyFailed = new AliHub.Collection.EventHandlers();
            }
            /**
              * Resets.
              * @param initDate  The optional initialized date; or true if start record now.
              */
            Stopwatch.prototype.reset = function (initDate) {
                var times = this._time.length;
                var isWorking = this._time.length % 2 > 0;
                var curDate = DateTime.parse(initDate);
                this._time = initDate != null ? [curDate] : [];
                if (times > 0)
                    this.cleared.raise(isWorking);
                return curDate;
            };
            /**
              * Starts record.
              * @param resume  true if resumes; otherwise, false. Default is false.
              */
            Stopwatch.prototype.record = function (resume) {
                if (resume === void 0) { resume = false; }
                var curDate = new Date();
                if (resume) {
                    if (this._time.length % 2 === 0)
                        this._time.push(curDate);
                }
                else {
                    var times = this._time.length;
                    var isWorking = this._time.length % 2 > 0;
                    this._time = [curDate];
                    if (times > 0)
                        this.cleared.raise(isWorking);
                }
                this.recorded.raise(curDate);
                return curDate;
            };
            /**
              * Stops record.
              */
            Stopwatch.prototype.stop = function (ignoreNotify) {
                if (ignoreNotify === void 0) { ignoreNotify = false; }
                if (this._time.length < 1)
                    return null;
                if (this._time.length % 2 === 0)
                    return this._time[this._time.length - 1];
                var curDate = new Date();
                this._time.push(curDate);
                if (!ignoreNotify || typeof ignoreNotify === "string")
                    this.notify(typeof ignoreNotify === "string" ? ignoreNotify : null);
                this.paused.raise(curDate);
                return curDate;
            };
            /**
              * Gets timespan in milliseconds.
              * @param stop  true if stops record; otherwise, false. Default is false.
              */
            Stopwatch.prototype.span = function (stop, ignoreNotify) {
                if (stop === void 0) { stop = false; }
                if (ignoreNotify === void 0) { ignoreNotify = false; }
                if (stop)
                    this.stop(ignoreNotify);
                var span = 0;
                var rec = this._time;
                for (var i = 0; i < rec.length; i += 2) {
                    span += DateTime.getSpan(rec[i], rec.length > i + 1 ? rec[i + 1] : new Date());
                }
                return span;
            };
            /**
              * Gets total timespan with rest in milliseconds.
              * @param stop  true if stops record; otherwise, false. Default is false.
              */
            Stopwatch.prototype.spanWithRest = function (stop, ignoreNotify) {
                if (stop === void 0) { stop = false; }
                if (ignoreNotify === void 0) { ignoreNotify = false; }
                if (stop)
                    this.stop(ignoreNotify);
                return this._time.length > 0 ? DateTime.getSpan(this._time[0], this._time.length % 2 === 0 ? this._time[this._time.length - 1] : new Date()) : 0;
            };
            /**
              * Gets timespan in milliseconds of latest record.
              * @param stop  true if stops record; otherwise, false. Default is false.
              */
            Stopwatch.prototype.latestSpan = function (stop, ignoreNotify) {
                if (stop === void 0) { stop = false; }
                if (ignoreNotify === void 0) { ignoreNotify = false; }
                if (this._time.length < 1)
                    return 0;
                if (stop)
                    this.stop(ignoreNotify);
                return this._time.length % 2 === 0 ? DateTime.getSpan(this._time[this._time.length - 1], this._time[this._time.length - 2]) : DateTime.getSpan(new Date(), this._time[this._time.length - 1]);
            };
            Stopwatch.prototype.hasRecorded = function () {
                return this._time.length > 0;
            };
            Stopwatch.prototype.isRecording = function () {
                return this._time.length % 2 > 0;
            };
            Stopwatch.prototype.recordDate = function (index) {
                if (index === void 0) { index = 0; }
                return this._time.length > index * 2 ? this._time[index * 2] : null;
            };
            Stopwatch.prototype.latestRecordDate = function () {
                if (this._time.length < 1)
                    return null;
                return this._time.length % 2 === 0 ? this._time[this._time.length - 2] : this._time[this._time.length - 1];
            };
            Stopwatch.prototype.recordedTimes = function () {
                return this._time.length % 2 === 0 ? this._time.length / 2 : (this._time.length + 1) / 2;
            };
            Stopwatch.prototype.pausedTimes = function () {
                return this._time.length % 2 === 0 ? this._time.length / 2 : (this._time.length - 1) / 2;
            };
            Stopwatch.prototype.recordHistory = function () {
                var list = [];
                var rec = this._time;
                for (var i = 0; i < rec.length; i += 2) {
                    list.push({
                        start: rec[i],
                        end: rec.length > i ? rec[i + 1] : null
                    });
                }
                return list;
            };
            Stopwatch.prototype.info = function (message) {
                var span = 0;
                var rec = this._time;
                var size = AliHub.Elements.getSize() || { x: null, y: null };
                var isRecording = this._time.length % 2 > 0;
                var latest = this.latestRecordDate();
                var now = new Date();
                for (var i = 0; i < rec.length; i += 2) {
                    span += DateTime.getSpan(rec[i], rec.length > i + 1 ? rec[i + 1] : now);
                }
                return {
                    tracking: this.trackingId,
                    span: this.span(),
                    totalspan: this.spanWithRest(),
                    begin: this._time.length > 0 ? this._time[0] : null,
                    latest: latest,
                    end: isRecording ? now : latest,
                    recording: isRecording,
                    url: window.location.href,
                    width: size.x,
                    height: size.y,
                    message: message,
                    channel: !!this.notificationOptions && !!this.notificationOptions.channel ? (typeof this.notificationOptions.channel === "function" ? this.notificationOptions.channel() : this.notificationOptions.channel.toString()) : null
                };
            };
            /**
              * Sends notification to record the timespan.
              */
            Stopwatch.prototype.notify = function (message) {
                var _this = this;
                var nOpt = this.notificationOptions;
                if (!nOpt)
                    return;
                var webKey = nOpt.key != null && typeof nOpt.key === "boolean" ? (nOpt.key ? "timespan" : null) : nOpt.key;
                var parameters = this.info(message);
                AliHub.Diagnostics.info("CoreLibrary", "[0x01291601] Cost " + (!!parameters.span ? parameters.span.toString() : "0") + "ms " + (this.trackingId || "timespan") + (!!nOpt.channel ? (" (" + nOpt.channel + ")") : "") + ".");
                var task = nOpt.post ? AliHub.Web.resolveByPost(nOpt.subject, webKey, { tracking: this.trackingId }, parameters) : AliHub.Web.resolve(nOpt.subject, webKey, parameters);
                if (!!task)
                    task.then(function (r) {
                        if (!!_this.notifySucceeded)
                            _this.notifySucceeded.raise(r.result);
                    }, function (ei) {
                        if (!!_this.notifyFailed)
                            _this.notifyFailed.raise(ei || {});
                    });
                return task;
            };
            return Stopwatch;
        }());
        Common.Stopwatch = Stopwatch;
        /**
          * Creates a TimeControl.
          * @param idSuffix  The identifier or identifier suffix if has a parent control.
          * @param parent  The parent control.
          * @param options  The initializition options.
          */
        function timeControl(idSuffix, options, parent) {
            return Common.createControl(idSuffix, TimeControl, options, parent);
        }
        Common.timeControl = timeControl;
    })(Common = AliHub.Common || (AliHub.Common = {}));
})(AliHub || (AliHub = {}));
/*  --------------------
 *  Diagnostics - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  diagnostics.ts
 *  Description  Diagnostics library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
/// <reference path="common.ts" />
var AliHub;
(function (AliHub) {
    var Diagnostics;
    (function (Diagnostics) {
        var _instances = {};
        /**
          * Log types.
          */
        var LogTypes;
        (function (LogTypes) {
            /**
              * Information.
              */
            LogTypes[LogTypes["info"] = 0] = "info";
            /**
              * Debug.
              */
            LogTypes[LogTypes["debug"] = 1] = "debug";
            /**
              * Warn.
              */
            LogTypes[LogTypes["warn"] = 2] = "warn";
            /**
              * Error.
              */
            LogTypes[LogTypes["error"] = 3] = "error";
            /**
              * Fatal.
              */
            LogTypes[LogTypes["fatal"] = 4] = "fatal";
        })(LogTypes = Diagnostics.LogTypes || (Diagnostics.LogTypes = {}));
        /**
          * Tracker.
          */
        var Tracker = (function () {
            function Tracker() {
                this.history = [];
                this.historyCount = 0;
            }
            /**
              * Records with an identifier for mark.
              */
            Tracker.prototype.record = function (id, parameter) {
                this.debug("ProcRec", id + " (AliHub.Diagnostics.Tracker.record)", parameter);
            };
            /**
              * Resolves a logger or console instance.
              */
            Tracker.prototype.logger = function () {
                return null;
            };
            /**
              * Logs a message as specific level.
              */
            Tracker.prototype.log = function (type, category, message) {
                var optionalParams = [];
                for (var _i = 3; _i < arguments.length; _i++) {
                    optionalParams[_i - 3] = arguments[_i];
                }
                switch (type) {
                    case LogTypes.info:
                    case "info":
                        if (this.info)
                            this.info(category, message);
                        break;
                    case LogTypes.debug:
                    case "debug":
                        if (this.debug)
                            this.debug(category, message);
                        break;
                    case LogTypes.warn:
                    case "warn":
                        if (this.warn)
                            this.warn(category, message);
                        break;
                    case LogTypes.error:
                    case "error":
                        if (this.error)
                            this.error(category, message);
                        break;
                    default:
                        break;
                }
            };
            /**
              * Logs a message as INFO level.
              */
            Tracker.prototype.info = function (category, message) {
                var optionalParams = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    optionalParams[_i - 2] = arguments[_i];
                }
                var l = this.logger();
                var createdDate = new Date;
                if (l && l.info)
                    l.info.apply(l, ["[" + category + "] " + message].concat(optionalParams));
                if (this.historyCount < 1)
                    return;
                if (this.historyCount < this.history.length)
                    this.history.splice(0, this.history.length - this.historyCount + 1);
                this.history.push({
                    level: LogTypes.info,
                    category: category,
                    message: message,
                    parameters: optionalParams,
                    created: createdDate
                });
            };
            /**
              * Logs a message for debug.
              */
            Tracker.prototype.debug = function (category, message) {
                var optionalParams = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    optionalParams[_i - 2] = arguments[_i];
                }
                var l = this.logger();
                var createdDate = new Date;
                if (l && l.debug)
                    l.debug.apply(l, ["[" + category + "] " + message].concat(optionalParams));
                if (this.historyCount < 1)
                    return;
                if (this.historyCount < this.history.length)
                    this.history.splice(0, this.history.length - this.historyCount + 1);
                this.history.push({
                    level: LogTypes.debug,
                    category: category,
                    message: message,
                    parameters: optionalParams,
                    created: createdDate
                });
            };
            /**
              * Logs a message as WARN level.
              */
            Tracker.prototype.warn = function (category, message) {
                var optionalParams = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    optionalParams[_i - 2] = arguments[_i];
                }
                var l = this.logger();
                var createdDate = new Date;
                if (l && l.warn)
                    l.warn.apply(l, ["[" + category + "] " + message].concat(optionalParams));
                if (this.historyCount < 1)
                    return;
                if (this.historyCount < this.history.length)
                    this.history.splice(0, this.history.length - this.historyCount + 1);
                this.history.push({
                    level: LogTypes.warn,
                    category: category,
                    message: message,
                    parameters: optionalParams,
                    created: createdDate
                });
            };
            /**
              * Logs a message as ERROR level.
              */
            Tracker.prototype.error = function (category, message) {
                var optionalParams = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    optionalParams[_i - 2] = arguments[_i];
                }
                var l = this.logger();
                var createdDate = new Date;
                if (l && l.error)
                    l.error.apply(l, ["[" + category + "] " + message].concat(optionalParams));
                if (this.historyCount < 1)
                    return;
                if (this.historyCount < this.history.length)
                    this.history.splice(0, this.history.length - this.historyCount + 1);
                this.history.push({
                    level: LogTypes.error,
                    category: category,
                    message: message,
                    parameters: optionalParams,
                    created: createdDate
                });
            };
            return Tracker;
        }());
        Tracker.console = false;
        Diagnostics.Tracker = Tracker;
        function tracker(value) {
            if (arguments.length > 0) {
                _instances.tracker = value;
            }
            if (!_instances.tracker) {
                _instances.tracker = consoleTracker();
            }
            return _instances.tracker;
        }
        Diagnostics.tracker = tracker;
        function pageAnalyticsClient(value) {
            if (arguments.length > 0) {
                _instances.pageAnalyticsClient = value;
            }
            if (!_instances.pageAnalyticsClient) {
                _instances.pageAnalyticsClient = consoleTracker();
            }
            return _instances.pageAnalyticsClient;
        }
        Diagnostics.pageAnalyticsClient = pageAnalyticsClient;
        function consoleTracker() {
            if (!_instances.consoleTracker)
                _instances.consoleTracker = new Tracker();
            _instances.consoleTracker.logger = function () {
                if (typeof console !== "undefined") {
                    return console;
                }
                return null;
            };
            _instances.disableAdditionalConsole = true;
            return _instances.consoleTracker;
        }
        Diagnostics.consoleTracker = consoleTracker;
        function emptyTracker() {
            if (!_instances.emptyTracker)
                _instances.emptyTracker = new Tracker();
            return _instances.emptyTracker;
        }
        Diagnostics.emptyTracker = emptyTracker;
        function logSwitch(instance, type, category, message) {
            if (!instance || !instance.log)
                return;
            instance.log(type, category, message);
        }
        Diagnostics.logSwitch = logSwitch;
        /**
          * Logs a message as INFO level.
          */
        function info(category, message) {
            var optionalParams = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                optionalParams[_i - 2] = arguments[_i];
            }
            Diagnostics.log.apply(Diagnostics, [LogTypes.info, category, message].concat(optionalParams));
        }
        Diagnostics.info = info;
        /**
          * Logs a message for debug.
          */
        function debug(category, message) {
            var optionalParams = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                optionalParams[_i - 2] = arguments[_i];
            }
            Diagnostics.log.apply(Diagnostics, [LogTypes.debug, category, message].concat(optionalParams));
        }
        Diagnostics.debug = debug;
        /**
          * Logs a message as WARN level.
          */
        function warn(category, message) {
            var optionalParams = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                optionalParams[_i - 2] = arguments[_i];
            }
            Diagnostics.log.apply(Diagnostics, [LogTypes.warn, category, message].concat(optionalParams));
        }
        Diagnostics.warn = warn;
        /**
          * Logs a message as ERROR level.
          */
        function error(category, message) {
            var optionalParams = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                optionalParams[_i - 2] = arguments[_i];
            }
            Diagnostics.log.apply(Diagnostics, [LogTypes.error, category, message].concat(optionalParams));
        }
        Diagnostics.error = error;
        /**
          * Logs a message as a specific level.
          */
        function log(type, category, message) {
            var optionalParams = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                optionalParams[_i - 3] = arguments[_i];
            }
            try {
                var ti = tracker();
                ti.log.apply(ti, [type, category, message].concat(optionalParams));
                if (ti.disableAdditionalConsole === true)
                    return;
            }
            catch (ex) { }
            if (Tracker.console) {
                var key = type.toString();
                switch (type) {
                    case LogTypes.error:
                        key = "error";
                        break;
                    case LogTypes.warn:
                        key = "warn";
                        break;
                    case LogTypes.info:
                        key = "info";
                        break;
                    case LogTypes.debug:
                        key = "debug";
                        break;
                    case "error":
                    case "warn":
                    case "info":
                    case "debug":
                        break;
                    default:
                        return;
                }
                if (Tracker.console !== true && Tracker.console[key] && typeof Tracker.console[key] === "function") {
                    try {
                        (_a = Tracker.console)[key].apply(_a, ["[" + category + "] " + message].concat(optionalParams));
                        return;
                    }
                    catch (ex) { }
                }
                if (typeof console === "undefined")
                    return;
                if (console && console[key] && typeof console[key] === "function")
                    console[key].apply(console, ["[" + category + "] " + message].concat(optionalParams));
            }
            var _a;
        }
        Diagnostics.log = log;
        /**
          * Records with an identifier for mark.
          */
        function record(id, parameter) {
            try {
                pageAnalyticsClient().record(id, parameter);
            }
            catch (ex) { }
        }
        Diagnostics.record = record;
        /**
          * Logs a message to console for debug with optional parameters.
          */
        function debugInfo(message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            if (typeof console === "undefined")
                return;
            var args = [message];
            if (optionalParams)
                optionalParams.forEach(function (value, index, array) {
                    args.push(value);
                });
            if (console && console.debug)
                console.debug.apply(console, args);
        }
        Diagnostics.debugInfo = debugInfo;
    })(Diagnostics = AliHub.Diagnostics || (AliHub.Diagnostics = {}));
})(AliHub || (AliHub = {}));
/*  --------------------
 *  Maths - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  maths.ts
 *  Description  Maths library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
/// <reference path="common.ts" />
var AliHub;
(function (AliHub) {
    var Common;
    (function (Common) {
        /**
          * Mathematics utilities.
          */
        var Maths = (function () {
            function Maths() {
            }
            Maths.isNumber = function (value) {
                return value != null && typeof value === "number";
            };
            Maths.isValidNumber = function (value) {
                return value != null && typeof value === "number" && !isNaN(value);
            };
            /**
              * Validates if given object is a number.
              * @param value  The number to test.
              */
            Maths.validNumber = function (value) {
                return value != null && typeof value === "number" && !isNaN(value);
            };
            /**
              * Adds prefix of a number to a string.
              * @param value  The number to format.
              * @param len  The miximum length of the string to build.
              */
            Maths.addPrefix = function (value, len) {
                var str = value.toString();
                if (str.length >= len)
                    return str;
                for (var step = 0; step < len - str.length; step++) {
                    str = "0" + str;
                }
                return str;
            };
            Maths.randomString = function (prefix) {
                var now = new Date();
                if (Maths._count >= Number.MAX_VALUE)
                    this._count = 0;
                try {
                    Maths._count++;
                }
                catch (ex) {
                    Maths._count = 0;
                }
                var str = "n" + Maths._count.toString() + "t" + now.getTime().toString();
                if (!!prefix)
                    str = prefix + "_" + str;
                return str;
            };
            Maths.inRange = function (value, maxReal, minReal, maxExpect, minExpect, scope) {
                if (scope === void 0) { scope = false; }
                var minusReal = (maxReal || 0) - (minReal || 0);
                maxExpect = maxExpect || 0;
                minExpect = minExpect || 0;
                if (maxExpect > minExpect) {
                    var tempN = maxExpect;
                    maxExpect = minExpect;
                    minExpect = tempN;
                }
                if (minusReal === 0)
                    return (maxExpect - minExpect) / 2;
                else if (minExpect < 0)
                    minExpect = -minExpect;
                var result = (value - (minReal || 0)) * 1.0 / minusReal * (maxExpect - minExpect) + minExpect;
                if (scope) {
                    if (result > maxExpect)
                        result = maxExpect;
                    else if (result < minExpect)
                        result = minExpect;
                }
                return result;
            };
            return Maths;
        }());
        Maths._count = 0;
        Common.Maths = Maths;
    })(Common = AliHub.Common || (AliHub.Common = {}));
})(AliHub || (AliHub = {}));
/*  --------------------
 *  Elements - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  elements.ts
 *  Description  Elements library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
/// <reference path="maths.ts" />
var AliHub;
(function (AliHub) {
    var Elements;
    (function (Elements) {
        var _set = {
            webcomponents: [],
            regMsgHs: null
        };
        function messageHandlers() {
            if (_set.regMsgHs != null)
                return _set.regMsgHs;
            _set.regMsgHs = [];
            Elements.listen(window, "message", function (ev) {
                if (ev.data.type != "AliHub.Elements.MessagePackageInfoContract" || !ev.data.track || !ev.data.data)
                    return;
                var msg = ev.data;
                var info = AliHub.Collection.getItem(_set.regMsgHs, msg, function (a, b) {
                    return a.track === b.track;
                });
                if (!info)
                    return;
                info.process({
                    timestamp: new Date(),
                    data: msg.data,
                    origin: ev.origin,
                    success: msg.success,
                    track: info.track,
                    process: info.process
                });
            });
            return _set.regMsgHs;
        }
        function hiddenForm(url) {
            var container = document.createElement("div");
            container.id = AliHub.Common.Maths.randomString("page_hidden_r_container_sender");
            container.style.display = "none";
            document.body.appendChild(container);
            var frame = document.createElement("iframe");
            frame.id = container.id + "_iframe";
            frame.name = frame.id;
            container.appendChild(frame);
            var form = document.createElement("form");
            form.id = container.id + "_form";
            form.name = form.id;
            form.target = frame.id;
            form.method = "POST";
            form.action = url || "";
            container.appendChild(form);
            var submit = document.createElement("input");
            submit.type = "submit";
            form.appendChild(submit);
            var info = {};
            var sent;
            var inputEle = function (key) {
                if (key == null)
                    return;
                var eles = form.getElementsByTagName("input");
                if (!!eles)
                    for (var i = 0; i < eles.length; i++) {
                        var ele = eles[i];
                        if (!ele || ele.name !== key)
                            continue;
                        return ele;
                    }
                return null;
            };
            info.formData = function () {
                var formData;
                if (typeof FormData !== "undefined") {
                    try {
                        if (!!FormData)
                            formData = new FormData(form);
                    }
                    catch (ex) { }
                }
                return formData;
            };
            info.url = function (value) {
                if (arguments.length > 0) {
                    form.action = value || "";
                }
                return form.action;
            };
            info.method = function (value) {
                if (arguments.length > 0) {
                    form.method = value || "";
                }
                return form.method;
            };
            info.field = function (key, value) {
                if (key == null)
                    return;
                key = key.toString();
                var field = inputEle(key);
                if (arguments.length > 1) {
                    if (value != null) {
                        if (!field)
                            field = document.createElement("input");
                        field.name = key;
                        field.type = "text";
                        field.value = value.toString();
                        form.appendChild(field);
                    }
                    else if (!!field) {
                        field.remove();
                    }
                }
                return !!field ? field.value : null;
            };
            info.jsonField = function (key, value) {
                var result = info.field(key, AliHub.Common.Text.serialize(value));
                return !!result ? eval("(" + result + ")") : null;
            };
            var getFile = function (input) {
                if (!input || !input.tagName || input.tagName.toString().toLowerCase() === "file" || !input.files || input.files.length < 1 || !input.files[0])
                    return null;
                var file = input.files[0];
                return file;
            };
            info.fileField = function (key, change, mime) {
                if (!key)
                    return null;
                key = key.toString();
                var deferred = AliHub.Common.deferred();
                if (key == null)
                    return deferred.reject();
                var field = inputEle(key);
                if (!field) {
                    if (!change)
                        return deferred.reject();
                    field = document.createElement("input");
                    field.type = "file";
                    if (!!mime)
                        field.accept = mime;
                    field.name = key;
                    form.appendChild(field);
                    form.enctype = "multipart/form-data";
                }
                if (!change) {
                    var file = getFile(field);
                    if (!!file)
                        deferred.resolve(file);
                    else
                        deferred.reject();
                }
                else {
                    Elements.listenOnce(field, "change", function (ev) {
                        var file = getFile(field);
                        if (!!file)
                            deferred.resolve(file);
                        else
                            deferred.reject();
                    });
                    field.click();
                }
                return deferred.promise();
            };
            info.getFileField = function (key) {
                var field = inputEle(key);
                return getFile(field);
            };
            info.addSet = function (obj) {
                if (!obj || typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean")
                    return;
                for (var prop in obj) {
                    if (prop == null || (typeof prop !== "string" && typeof prop !== "number"))
                        continue;
                    info.jsonField(prop, obj[prop]);
                }
            };
            info.remove = function () {
                var key = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    key[_i] = arguments[_i];
                }
                if (!key)
                    return 0;
                var fields = [];
                var eles = form.getElementsByTagName("input");
                var count = eles.length;
                if (!!eles)
                    for (var i = 0; i < eles.length; i++) {
                        var ele = eles[i];
                        if (!ele || !AliHub.Collection.contains(key, ele))
                            continue;
                        fields.push(ele);
                    }
                var len = count - fields.length;
                fields.forEach(function (item, i, arr) {
                    item.remove();
                });
                return len;
            };
            info.clear = function () {
                form.innerHTML = "";
            };
            var clickAction = true;
            var listenResult = function () {
                var postUrl = form.action;
                var mark = "&";
                var deferred = AliHub.Common.deferred();
                if (!!postUrl && postUrl.length > 10) {
                    var callbackIndex = postUrl.indexOf("&callback=?");
                    if (callbackIndex < 0) {
                        callbackIndex = postUrl.indexOf("?callback=?");
                        mark = "?";
                    }
                    if (callbackIndex < 0) {
                        if (typeof FormData === "undefined")
                            return AliHub.Common.rejectDeferred(deferred, "Cannot find parameter callback.");
                        clickAction = false;
                        var formData = new FormData(form);
                        if (typeof jQuery !== "undefined") {
                            jQuery.ajax({
                                url: form.action,
                                type: form.method,
                                data: formData,
                                processData: false,
                                contentType: false
                            }).then(function (actionResult) {
                                var actionResult = AliHub.Web.DataPackageJob.upgradePackage(actionResult);
                                if (!actionResult.success)
                                    AliHub.Common.rejectDeferred(deferred, "failed result", actionResult);
                                else
                                    deferred.resolve({ result: actionResult.data, timestamp: actionResult.timestamp });
                            }, function (actionResult) {
                                deferred.reject(actionResult);
                            });
                        }
                        else {
                            var oReq = new XMLHttpRequest();
                            try {
                                oReq.onreadystatechange = function (ev) {
                                    if (oReq.readyState === 4) {
                                        if (oReq.status == 200) {
                                            var actionResult = eval("(" + oReq.responseText + ")");
                                            var actionResult = AliHub.Web.DataPackageJob.upgradePackage(actionResult);
                                            if (!actionResult.success)
                                                AliHub.Common.rejectDeferred(deferred, "failed result", actionResult);
                                            else
                                                deferred.resolve({ result: actionResult.data, timestamp: actionResult.timestamp });
                                        }
                                        else {
                                            deferred.reject(ev);
                                        }
                                    }
                                };
                                // oReq.addEventListener("error", (ev) => { deferred.reject(ev); }, false);
                                if (!info.onprogress)
                                    info.onprogress = new AliHub.Collection.EventHandlers();
                                oReq.upload.addEventListener("progress", function (ev) { info.onprogress.raise(ev); }, false);
                            }
                            catch (ex) { }
                            oReq.open(form.method, form.action);
                            oReq.send(formData);
                        }
                        return deferred.promise();
                    }
                    if (callbackIndex + 11 < postUrl.length) {
                        if (postUrl.indexOf("&", callbackIndex + 1) < 0 && postUrl.indexOf("#", callbackIndex + 1) < 0)
                            return AliHub.Common.rejectDeferred(deferred, "Parameter callback is invalid.");
                    }
                }
                var track = AliHub.Common.Maths.randomString("AliHub.Elements.hiddenForm");
                postUrl = postUrl.replace(mark + "callback=?", mark + "callback=" + encodeURIComponent(track));
                form.action = postUrl + "&callbacktype=message";
                Elements.listenMessagePackage(function (r) {
                    var result = {
                        result: r.data,
                        timestamp: AliHub.Common.DateTime.parse(r.timestamp)
                    };
                    if (r.success) {
                        deferred.resolve(result);
                    }
                    else {
                        deferred.reject(r.data);
                    }
                }, track);
                return deferred.promise();
            };
            info.submit = function (ignoreResult) {
                sent = new Date();
                clickAction = true;
                var promise;
                var formData;
                if (!!info.formDataConvert && !!info.formData)
                    formData = info.formData();
                if (ignoreResult) {
                    var deferred = AliHub.Common.deferred();
                    promise = deferred.promise();
                    deferred.resolve(null);
                }
                else if (!!formData) {
                    var oReq = new XMLHttpRequest();
                    oReq.withCredentials = true;
                    oReq.open(form.method, form.action, true);
                    var deferred = AliHub.Common.deferred();
                    promise = deferred.promise();
                    oReq.onload = function (oEvent) {
                        if (oReq.readyState === 4 && oReq.status === 200) {
                            if (oReq.status === 200) {
                                var respData = AliHub.Web.DataPackageJob.upgradePackage(JSON.parse(oReq.responseText));
                                if (respData.success)
                                    deferred.resolve(respData.data);
                                else
                                    deferred.reject(respData.message);
                            }
                            else {
                                deferred.reject(oReq.statusText);
                            }
                        }
                    };
                    if (typeof info.formDataConvert === "function")
                        info.formDataConvert(formData, oReq);
                    oReq.send(formData);
                    clickAction = false;
                }
                else {
                    promise = listenResult();
                }
                if (clickAction)
                    submit.click();
                return promise;
            };
            info.dispose = function () {
                try {
                    container.remove();
                }
                catch (ex) {
                    if (!!container.outerHTML)
                        container.outerHTML = "";
                }
            };
            return info;
        }
        Elements.hiddenForm = hiddenForm;
        function postMessagePackage(contentWindow, track, success, data, targetOrigin) {
            if (!contentWindow)
                return;
            try {
                if (!!contentWindow.AliHub && !!contentWindow.AliHub.Elements) {
                    contentWindow.AliHub.Elements.manualReceiveMessagePackage(track, success, data);
                    return;
                }
            }
            catch (ex) { }
            if (!contentWindow.postMessage)
                return;
            contentWindow.postMessage({
                type: "AliHub.Elements.MessagePackageInfoContract",
                track: track,
                success: success,
                data: data,
                timestamp: new Date()
            }, targetOrigin || "*");
        }
        Elements.postMessagePackage = postMessagePackage;
        function manualReceiveMessagePackage(track, success, data) {
            if (!track)
                return false;
            var mhs = messageHandlers();
            var existed = AliHub.Collection.getItem(mhs, track, function (a, b) {
                return a.track === b;
            });
            if (!existed)
                return false;
            existed.process({
                timestamp: new Date(),
                data: data,
                process: existed.process,
                success: success,
                origin: null,
                track: track
            });
            Elements.unlistenPackageMessage(track);
            return true;
        }
        Elements.manualReceiveMessagePackage = manualReceiveMessagePackage;
        function listenMessagePackage(h, track) {
            if (!h)
                return AliHub.Common.Reflection.emptyDisposable();
            if (!track)
                track = AliHub.Common.Maths.randomString("AliHub.Elements.listenMessagePackage");
            var info = { track: track, process: h };
            var mhs = messageHandlers();
            var existed = AliHub.Collection.getItem(mhs, info, function (a, b) {
                return a.track === b.track;
            });
            if (!existed) {
                mhs.push(info);
                return;
            }
            existed.process = info.process;
            info = existed;
            return {
                track: track,
                dispose: function () {
                    unlistenPackageMessage(info.track);
                }
            };
        }
        Elements.listenMessagePackage = listenMessagePackage;
        function unlistenPackageMessage(track) {
            AliHub.Collection.remove(messageHandlers(), [{ track: track }], true, function (a, b) {
                return a.track === b.track;
            });
        }
        Elements.unlistenPackageMessage = unlistenPackageMessage;
        function getControlRegisteredForTag(name) {
            var rec = AliHub.Collection.getItem(_set.webcomponents, name, "name");
            return !!rec && !!rec.control ? rec.control : undefined;
        }
        Elements.getControlRegisteredForTag = getControlRegisteredForTag;
        function hasControlRegisteredForTag() {
            return !!_set.webcomponents && _set.webcomponents.length > 0;
        }
        Elements.hasControlRegisteredForTag = hasControlRegisteredForTag;
        /**
          * Registers element for a specific control.
          * name  the name of tag to register.
          * control  the control name to register.
          */
        function register(name, control) {
            if (!name || name.indexOf("-") < 1)
                return;
            name = name.toString().toLowerCase();
            if (_set.webcomponents == null)
                _set.webcomponents = [];
            if (!control) {
                delete _set.webcomponents[name];
                return;
            }
            var rec = AliHub.Collection.getItem(_set.webcomponents, name, "name");
            if (!!rec) {
                rec.control = control;
                return;
            }
            _set.webcomponents.push({
                name: name,
                control: control
            });
            var eleCol = document.getElementsByTagName(name);
            for (var step = 0; step < eleCol.length; step++) {
                try {
                    AliHub.Common.fillControl(eleCol[step], control, true);
                }
                catch (ex) { }
            }
        }
        Elements.register = register;
        /**
          * Registers element for a specific control.
          * name  the name of tag to register.
          * control  the control name to register.
          */
        function registerControlAsWebComponent(name, control, h) {
            if (!name || !control || name.indexOf("-") < 1)
                return null;
            if (!Object.create || !document.registerElement)
                return null;
            try {
                var proto = Object.create(HTMLElement.prototype);
                var vct;
                proto.createdCallback = function () {
                    var ele = this;
                    if (!ele)
                        return;
                    vct = new control(ele);
                    vct.loadOptions(true);
                };
                proto.getControl = function () {
                    return vct;
                };
                if (!!h)
                    h(proto);
                document.registerElement(name, { prototype: proto });
                return proto;
            }
            catch (ex) {
                return null;
            }
        }
        Elements.registerControlAsWebComponent = registerControlAsWebComponent;
        function openPage(url, target, data) {
            if (!url)
                return;
            if (data)
                url = AliHub.Web.mergeLink(url, data);
            else
                url = url.toString();
            var tempLink = document.createElement("a");
            tempLink.innerHTML = "Temp";
            tempLink.style.display = "none";
            tempLink.href = url;
            if (target)
                tempLink.target = target;
            document.body.appendChild(tempLink);
            tempLink.click();
            setTimeout(function () {
                if (!tempLink)
                    return;
                try {
                    tempLink.remove();
                }
                catch (ex) {
                    if (tempLink.outerHTML)
                        tempLink.outerHTML = "";
                }
            }, 3000);
        }
        Elements.openPage = openPage;
        /**
          * Gets top offset of specific element in document.
          * @param element  the element.
          */
        function getTop(element) {
            var ele = getById(element);
            if (!ele)
                return null;
            var offset = ele.offsetTop;
            if (ele.offsetParent != null)
                offset += getTop(ele.offsetParent);
            return offset;
        }
        Elements.getTop = getTop;
        /**
          * Gets left offset of specific element in document.
          * @param element  the element.
          */
        function getLeft(element) {
            var ele = getById(element);
            if (!ele)
                return null;
            var offset = ele.offsetLeft;
            if (ele.offsetParent != null)
                offset += getLeft(ele.offsetParent);
            return offset;
        }
        Elements.getLeft = getLeft;
        /**
          * Gets the position of the specific element in document.
          * @param element  the element.
          */
        function getPosition(element) {
            if (!element)
                return { invalid: true, message: "element should not be null" };
            var left = getLeft(element);
            var top = getTop(element);
            var result = { x: left, y: top };
            if (left == null || top == null || isNaN(left) || isNaN(top))
                result.invalid = true;
            return result;
        }
        Elements.getPosition = getPosition;
        /**
          * Gets the position of the mouse in specific element or document.
          * @param element  the optional element as target.
          */
        function getMousePosition(element, ev) {
            if (!ev)
                ev = event;
            if (!ev)
                return { invalid: true, message: "cannot get event" };
            var x = ev.pageX || (ev.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
            var y = ev.pageY || (ev.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
            var evTouches = ev.touches;
            if (!!evTouches && !!evTouches.length && evTouches.length > 0 && !!evTouches[0]) {
                if (isNaN(x) || x == null)
                    x = evTouches[0].pageX;
                if (isNaN(y) || y == null)
                    y = evTouches[0].pageX;
            }
            else {
                evTouches = ev.changedTouches;
                if (!!evTouches && !!evTouches.length && evTouches.length > 0 && !!evTouches[0]) {
                    if (isNaN(x) || x == null)
                        x = evTouches[0].pageX;
                    if (isNaN(y) || y == null)
                        y = evTouches[0].pageX;
                }
            }
            if (!!element) {
                if (!isNaN(x) && x != null)
                    x -= getLeft(element);
                if (!isNaN(y) && y != null)
                    y -= getTop(element);
            }
            return { x: x, y: y };
        }
        Elements.getMousePosition = getMousePosition;
        /**
          * Gets specific HTML element.
          * @param id  the element identifier or prefix.
          * @param appendingIdParts  the additional identifier parts.
          */
        function getById(element) {
            var appendingIdParts = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                appendingIdParts[_i - 1] = arguments[_i];
            }
            if (!element) {
                if (!appendingIdParts || appendingIdParts.length === 0)
                    return null;
                var mergeEleId = mergeId(null, appendingIdParts);
                return document.getElementById(mergeEleId);
            }
            if (typeof element === "function")
                element = element();
            if (!element)
                return null;
            if (!!element.jquery && !!element.length && element.length > 0)
                element = element[0];
            if (!!element.body || !!element.documentElement)
                return document;
            if (!!element.parent && !!element.scroll)
                return window;
            var id = null;
            if (typeof element === "string") {
                id = element;
            }
            else if (!!element.getId && !!element.getElement) {
                if (!appendingIdParts || appendingIdParts.length === 0)
                    return element.getElement();
                id = element.getId();
            }
            else if (!!element.tagName) {
                if (!appendingIdParts || appendingIdParts.length === 0)
                    return element;
                id = element.id;
            }
            if (!id)
                return null;
            var elementId = mergeId(id, appendingIdParts);
            var ele = document.getElementById(elementId);
            if (!!ele || (!!appendingIdParts && appendingIdParts.length > 0) || typeof element !== "string")
                return ele;
            if (!!document.querySelector)
                return document.querySelector(element);
            if (typeof jQuery === "undefined")
                return null;
            if (!jQuery)
                return null;
            var jDom = jQuery(element);
            return !!jDom && jDom.length > 0 ? jDom[0] : null;
        }
        Elements.getById = getById;
        /**
          * Checks if an element is in another one.
          * @param test  the element to test.
          * @param container  the container element.
          */
        function inElement(test, container) {
            test = Elements.getById(test);
            container = Elements.getById(container);
            if (!test || !container)
                return false;
            if (test === container)
                return true;
            var ele = test;
            while (ele.parentNode) {
                ele = ele.parentNode;
                if (ele === container)
                    return true;
            }
            return false;
        }
        Elements.inElement = inElement;
        /**
          * Creates elements and appends into a container.
          * @param container  the container to append elements.
          * @param children  the elements to create.
          */
        function createChildren(container) {
            var children = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                children[_i - 1] = arguments[_i];
            }
            container = Elements.getById(container);
            if (!container)
                return [];
            var eles = [];
            children.forEach(function (item) {
                if (!item)
                    return;
                if (typeof item === "string") {
                    var tempEle = document.createElement("div");
                    tempEle.innerHTML = item;
                    if (tempEle.childNodes)
                        for (var i = 0; i < tempEle.childNodes.length; i++) {
                            var nodeToPush = tempEle.childNodes[i];
                            if (!nodeToPush || !nodeToPush.tagName)
                                continue;
                            container.appendChild(nodeToPush);
                            eles.push(nodeToPush);
                        }
                    tempEle.innerHTML = "";
                    return;
                }
                var eleItem = item.element || document.createElement(item.tagName || "div");
                Elements.changeStyleRef(eleItem, item.className);
                Elements.changeStyleRef(eleItem, item.styleRef);
                if (item.style) {
                    for (var prop in item.style) {
                        if (!prop || typeof prop !== "string" || !item.style[prop] || typeof item.style[prop] !== "string")
                            continue;
                        eleItem.style[prop] = item.style[prop];
                    }
                }
                container.appendChild(eleItem);
                eles.push(eleItem);
                if (item.attr) {
                    for (var prop in item.attr) {
                        if (!prop || typeof prop !== "string" || !item.attr[prop] || typeof item.attr[prop] !== "string")
                            continue;
                        eleItem.setAttribute(prop, item.attr[prop]);
                    }
                }
                if (item.events) {
                    var eventsInfo = item.events;
                    if (typeof eventsInfo === "function")
                        eventsInfo = eventsInfo(eleItem);
                    for (var prop in eventsInfo) {
                        if (!prop || typeof prop !== "string" || !eventsInfo[prop] || typeof eventsInfo[prop] !== "function")
                            continue;
                        Elements.listen(eleItem, prop, eventsInfo[prop]);
                    }
                }
                if (item.prepared)
                    item.prepared(eleItem);
                if (item.innerHTML)
                    eleItem.innerHTML = item.innerHTML;
                if (item.children) {
                    var childrenInfo = item.children;
                    if (typeof childrenInfo === "function")
                        childrenInfo = childrenInfo(eleItem);
                    if (childrenInfo instanceof Array) {
                        Elements.createChildren.apply(Elements, [eleItem].concat(childrenInfo));
                    }
                }
                if (item.ready)
                    item.ready(eleItem);
            });
            return eles;
        }
        Elements.createChildren = createChildren;
        /**
          * Lists child nodes from a specific element or more.
          * @param element  the container element(s).
          * @param tagName  the sub elements tag name array.
          */
        function childNodes(element) {
            var tagName = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                tagName[_i - 1] = arguments[_i];
            }
            var eles = AliHub.Collection.toArray(element, true);
            tagName.forEach(function (tag) {
                var parents = eles;
                eles = [];
                var tagNames = AliHub.Collection.toStringArray(tag, true);
                parents.forEach(function (container) {
                    for (var step = 0; step < container.children.length; step++) {
                        var ele = container.children[step];
                        if (!ele || !ele.tagName || tagNames.indexOf(ele.tagName.toString().toLowerCase()) < 0)
                            continue;
                        eles.push(ele);
                    }
                });
            });
            return eles;
        }
        Elements.childNodes = childNodes;
        /**
          * Changes style references and resolves the list all.
          * @param element  the element.
          * @param adding  the names to add.
          * @param removing  the names to remove.
          */
        function changeStyleRef(element, adding, removing, reverse) {
            if (reverse === void 0) { reverse = false; }
            if (!element)
                return [];
            var ele = typeof element === "string" ? document.getElementById(element) : element;
            if (!ele)
                return null;
            if (reverse) {
                var tmp = adding;
                adding = removing;
                removing = tmp;
            }
            if (ele.className && typeof ele.className === "string") {
                ele.className = AliHub.Common.Text.trim(AliHub.Collection.addItem(ele.className, " ", adding, removing));
                return ele.className.split(" ");
            }
            if (!!ele.classList && !!ele.classList.add && !!ele.classList.remove) {
                var addingArr = AliHub.Collection.toStringArray(adding);
                if (!!addingArr && addingArr.length > 0) {
                    var tmpArr = [];
                    addingArr.forEach(function (item, i, arr) {
                        tmpArr.push.apply(tmpArr, item.replace("  ", " ").replace("  ", " ").split(" "));
                    });
                    (_a = ele.classList).add.apply(_a, tmpArr);
                }
                var removingArr = AliHub.Collection.toStringArray(removing);
                if (!!removingArr && removingArr.length > 0) {
                    var tmpArr = [];
                    addingArr.forEach(function (item, i, arr) {
                        tmpArr.push.apply(tmpArr, item.replace("  ", " ").replace("  ", " ").split(" "));
                    });
                    (_b = ele.classList).remove.apply(_b, tmpArr);
                }
                var arr = [];
                for (var i = 0; i < ele.classList.length; i++) {
                    var item = ele.classList[i];
                    if (!!item)
                        arr.push(item);
                }
                return arr;
            }
            return [];
            var _a, _b;
        }
        Elements.changeStyleRef = changeStyleRef;
        /**
          * Adds style references and resolves the list all.
          * @param element  the element.
          * @param adding  the names to add.
          */
        function addStyleRef(element) {
            var adding = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                adding[_i - 1] = arguments[_i];
            }
            return Elements.changeStyleRef(element, adding);
        }
        Elements.addStyleRef = addStyleRef;
        /**
          * Removes style references and resolves the list all.
          * @param element  the element.
          * @param removing  the names to remove.
          */
        function removeStyleRef(element) {
            var removing = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                removing[_i - 1] = arguments[_i];
            }
            return Elements.changeStyleRef(element, null, removing);
        }
        Elements.removeStyleRef = removeStyleRef;
        /**
          * Changes style references and resolves the list all.
          * @param element  the element.
          * @param adding  the names to add.
          * @param removing  the names to remove.
          */
        function changeStyleClass(element, adding, removing, reverse) {
            if (reverse === void 0) { reverse = false; }
            return Elements.changeStyleRef(element, adding, removing, reverse);
        }
        Elements.changeStyleClass = changeStyleClass;
        /**
          * Adds style references and resolves the list all.
          * @param element  the element.
          * @param adding  the names to add.
          */
        function addStyleClass(element) {
            var adding = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                adding[_i - 1] = arguments[_i];
            }
            return Elements.changeStyleRef(element, adding);
        }
        Elements.addStyleClass = addStyleClass;
        /**
          * Removes style references and resolves the list all.
          * @param element  the element.
          * @param removing  the names to remove.
          */
        function removeStyleClass(element) {
            var removing = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                removing[_i - 1] = arguments[_i];
            }
            return Elements.changeStyleRef(element, null, removing);
        }
        Elements.removeStyleClass = removeStyleClass;
        /**
          * Sanitizes a specific HTML part to text string.
          * @param htmlString  the HTML string to sanitize.
          */
        function sanitizeHTML(htmlString, emptyForNull) {
            if (emptyForNull === void 0) { emptyForNull = false; }
            if (!htmlString)
                return emptyForNull ? "" : null;
            var tmp = document.createElement('div');
            tmp.appendChild(document.createTextNode(htmlString));
            return tmp.innerHTML;
        }
        Elements.sanitizeHTML = sanitizeHTML;
        /**
          * Merges an identifier.
          * @param prefix  the identifier prefix.
          * @param idParts  the additional identifier parts.
          */
        function mergeId(prefix, idParts) {
            var elementId = !!prefix ? (typeof prefix === "string" ? prefix : prefix.id) : "";
            if (!elementId)
                elementId = "";
            if (!idParts)
                return elementId;
            idParts.forEach(function (ele, i, arr) {
                if (!ele)
                    return;
                if (elementId !== "")
                    elementId += "_";
                elementId += ele;
            });
            return elementId;
        }
        Elements.mergeId = mergeId;
        /**
          * Gets query information collection from URL.
          */
        function getQueryInfo(url, emptyStringForNull, notToDecode) {
            if (emptyStringForNull === void 0) { emptyStringForNull = false; }
            if (notToDecode === void 0) { notToDecode = false; }
            url = url || location.search;
            if (!url)
                return [];
            var questionMarkPosition = url.indexOf("?");
            if (questionMarkPosition > 0)
                url = url.substring(questionMarkPosition + 1);
            var query = url.split("&");
            var result = [];
            if (query)
                for (var step = 0; step < query.length; step++) {
                    var prop = query[step];
                    if (!prop)
                        return;
                    var propArr = prop.split("=");
                    var key = propArr[0];
                    var iValue = (propArr.length > 1 ? propArr[1] : null) || (emptyStringForNull ? "" : null);
                    if (!!iValue && !notToDecode)
                        iValue = decodeURIComponent(iValue);
                    result.push({ key: key, value: iValue });
                }
            return result;
        }
        Elements.getQueryInfo = getQueryInfo;
        /**
          * Gets query information object from URL.
          */
        function getQueryObj(url, emptyStringForNull, notToDecode) {
            if (emptyStringForNull === void 0) { emptyStringForNull = false; }
            if (notToDecode === void 0) { notToDecode = false; }
            url = url || location.search;
            if (!url)
                return {};
            var questionMarkPosition = url.indexOf("?");
            if (questionMarkPosition > 0)
                url = url.substring(questionMarkPosition + 1);
            var query = url.split("&");
            var result = {};
            if (query)
                for (var step = 0; step < query.length; step++) {
                    var prop = query[step];
                    if (!prop)
                        return;
                    var propArr = prop.split("=");
                    var key = propArr[0];
                    var iValue = (propArr.length > 1 ? propArr[1] : null) || (emptyStringForNull ? "" : null);
                    if (!!iValue && !notToDecode)
                        iValue = decodeURIComponent(iValue);
                    result[key] = iValue;
                }
            return result;
        }
        Elements.getQueryObj = getQueryObj;
        /**
          * Gets query property by given name from URL.
          * @param name  the property name.
          */
        function getQuery(name, notToDecode) {
            if (notToDecode === void 0) { notToDecode = false; }
            return Elements.getStringQuery(location.search, name, notToDecode);
        }
        Elements.getQuery = getQuery;
        /**
          * Gets query property by given name from URL.
          * @param name  the property name.
          */
        function getStringQuery(url, name, notToDecode) {
            if (notToDecode === void 0) { notToDecode = false; }
            url = url || location.search;
            if (name == null)
                return null;
            try {
                if (typeof name === "string") {
                    var result = url.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
                    if (result == null || result.length < 1) {
                        return "";
                    }
                    return notToDecode ? result[1] : decodeURIComponent(result[1]);
                }
                else if (typeof name === "number") {
                    var result = url.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));
                    if (result == null) {
                        return "";
                    }
                    return notToDecode ? result[name].substring(1) : decodeURIComponent(result[name].substring(1));
                }
            }
            catch (ex) { }
            return null;
        }
        Elements.getStringQuery = getStringQuery;
        function queryField(key, value) {
            if (!key)
                return null;
            if (value == null)
                value = "";
            if (typeof value === "function")
                value = value();
            if (value instanceof Date)
                value = AliHub.Common.DateTime.toNumberString(value);
            if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean")
                value = "";
            return encodeURIComponent(key) + "=" + (value != null ? encodeURIComponent(value.toString()) : "");
        }
        Elements.queryField = queryField;
        /**
          * Gets full query string for URL.
          * @param value  the query information collection.
          */
        function toQueryString(value) {
            if (!value || value.length < 1)
                return "";
            var str = "";
            if (typeof value === "function")
                value = value();
            if (AliHub.Collection.isArray(value)) {
                value.forEach(function (iV, iI, iA) {
                    if (iV && iV.key)
                        str += "&" + Elements.queryField(iV.key, iV.value);
                });
            }
            else {
                for (var ele in value) {
                    if (ele == null)
                        continue;
                    if (typeof ele !== "string" && typeof ele !== "number")
                        continue;
                    ele = ele.toString();
                    var eleValue = value[ele];
                    var field = Elements.queryField(ele, value[ele]);
                    if (!field)
                        continue;
                    str += "&" + Elements.queryField(ele, value[ele]);
                }
            }
            return str.length > 0 ? str.substring(1) : "";
        }
        Elements.toQueryString = toQueryString;
        /**
          * Gets page address without query and hash.
          */
        function getPageAddress(includePort) {
            return window.location.protocol + "//" + window.location.host + (includePort ? (":" + window.location.port) : "") + window.location.pathname;
        }
        Elements.getPageAddress = getPageAddress;
        /**
          * Requests full screen.
          */
        function fullScreen(element) {
            if (arguments.length > 0) {
                var ele = Elements.getById(element);
                if (!ele)
                    return;
                try {
                    var requestMethod = ele.requestFullScreen || ele.requestFullscreen || ele.webkitRequestFullScreen || ele.webkitRequestFullscreen || ele.mozRequestFullScreen || ele.msRequestFullScreen;
                    if (!!requestMethod) {
                        requestMethod.call(ele);
                    }
                    else if (typeof window.ActiveXObject !== "undefined") {
                        var wscript = new ActiveXObject("WScript.Shell");
                        if (!!wscript)
                            wscript.SendKeys("{F11}");
                    }
                }
                catch (ex) { }
            }
            return document.fullScreenElement || document.fullscreenElement || document.webkitFullScreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullScreenElement;
        }
        Elements.fullScreen = fullScreen;
        /**
          * Cancels full screen.
          */
        function cancelFullScreen() {
            try {
                if (!!document.cancelFullScreen)
                    document.cancelFullScreen();
                else if (!!document.cancelFullscreen)
                    document.cancelFullscreen();
                else if (!!document.fullscreenElement)
                    document.webkitCancelFullScreen();
                else if (!!document.webkitCancelFullscreen)
                    document.webkitCancelFullscreen();
                else if (!!document.mozCancelFullScreen)
                    document.mozCancelFullScreen();
                else if (!!document.msCancelFullScreen)
                    document.msCancelFullScreen();
            }
            catch (ex) { }
        }
        Elements.cancelFullScreen = cancelFullScreen;
        /**
          * Adds an event listener to a target element.
          * @param element  the target element.
          * @param eventType  the type of event.
          * @param h  the event handler to add.
          */
        function listen(element, eventType, h) {
            if (!element || !h || !eventType || eventType.toString() == "")
                return AliHub.Common.Reflection.emptyDisposable();
            if (typeof element === "function")
                element = element();
            if (!!element.jquery && !!element.length && element.length > 0)
                element = element[0];
            if (typeof element === "string")
                element = Elements.getById(element);
            if (!!element.get_element)
                element = element.getElement();
            eventType = eventType.toString();
            if (!!element.addEventListener)
                element.addEventListener(eventType, h, false);
            else if (!!element.attachEvent)
                element.attachEvent("on" + eventType, h);
            return {
                eventType: eventType,
                handler: h,
                dispose: function () {
                    if (!!element.removeEventListener)
                        element.removeEventListener(eventType, h, false);
                    else if (!!element.detachEvent)
                        element.detachEvent("on" + eventType, h);
                },
                process: function (ev) {
                    h(ev);
                }
            };
        }
        Elements.listen = listen;
        /**
          * Adds an event listener only once to a target element.
          * @param element  the target element.
          * @param eventType  the type of event.
          * @param h  the event handler to add.
          */
        function listenOnce(element, eventType) {
            var h = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                h[_i - 2] = arguments[_i];
            }
            if (!h || h.length < 1)
                return AliHub.Common.Reflection.emptyDisposable();
            var list = [];
            var handler = function (ev) {
                list.forEach(function (hi, hIndex, hA) {
                    hi(ev);
                });
            };
            list.push.apply(list, [function (ev) {
                    unlisten(element, eventType, handler);
                }].concat(h));
            return listen(element, eventType, handler);
        }
        Elements.listenOnce = listenOnce;
        /**
          * Adds an event listener later and only once to a target element.
          * @param element  the target element.
          * @param eventType  the type of event.
          * @param h  the event handler to add.
          */
        function listenOnceLater(element, eventType) {
            var h = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                h[_i - 2] = arguments[_i];
            }
            var promise = AliHub.Common.deferred();
            setTimeout(function () {
                var result = Elements.listenOnce.apply(Elements, [element, eventType].concat(h));
                if (result.useless)
                    promise.reject(result);
                else
                    promise.resolve(result);
            }, 0);
            return promise.promise();
        }
        Elements.listenOnceLater = listenOnceLater;
        /**
          * Adds an event listener to a target element.
          * @param element  the target element.
          * @param eventType  the type of event.
          * @param h  the event handler to add.
          */
        function addEvent(element, eventType, h) {
            return listen(element, eventType, h);
        }
        Elements.addEvent = addEvent;
        /**
          * Removes an event listener from a target element.
          * @param element  the target element.
          * @param eventType  the type of event.
          * @param h  the event handler to add.
          */
        function unlisten(element, eventType, h) {
            if (!element || !h || !eventType || eventType.toString() == "")
                return;
            if (typeof element === "function")
                element = element();
            if (!!element.jquery && !!element.length && element.length > 0)
                element = element[0];
            if (typeof element === "string")
                element = Elements.getById(element);
            if (!!element.get_element)
                element = element.getElement();
            eventType = eventType.toString();
            if (!!element.removeEventListener)
                element.removeEventListener(eventType, h, false);
            else if (!!element.detachEvent)
                element.detachEvent("on" + eventType, h);
        }
        Elements.unlisten = unlisten;
        /**
          * Removes an event listener from a target element.
          * @param element  the target element.
          * @param eventType  the type of event.
          * @param h  the event handler to add.
          */
        function removeEvent(element, eventType, h) {
            unlisten(element, eventType, h);
        }
        Elements.removeEvent = removeEvent;
        /**
          * Processes for all elements.
          */
        function processAll(container, h) {
            container = Elements.getById(container);
            if (!container)
                return;
            var allEles = container.children || document.all;
            for (var i = 0; i < allEles.length; i++) {
                h(allEles[i]);
            }
            Elements.listen(container, "DOMNodeInserted", function (event) {
                var ele = event.target || event.srcElement;
                if (!ele || !ele.tagName)
                    return;
                h(ele);
            });
        }
        Elements.processAll = processAll;
        function parseCssRules(styleContent) {
            if (!styleContent || typeof styleContent !== "string")
                return [];
            var doc = document.implementation.createHTMLDocument("CSS Loader"), styleElement = document.createElement("style");
            styleElement.textContent = styleContent;
            doc.body.appendChild(styleElement);
            return styleElement.sheet.cssRules;
        }
        Elements.parseCssRules = parseCssRules;
        /**
          * Adds gesture handlers.
          * @param element  the target element.
          * @param options  the options.
          */
        function addGesture(element, options) {
            if (!options)
                return AliHub.Common.Reflection.emptyDisposable();
            var ele = Elements.getById(element);
            var minX = !!options.minX && typeof options.minX === "function" ? options.minX() : options.minX;
            var minY = !!options.minY && typeof options.minY === "function" ? options.minY() : options.minY;
            if (!minX || minX < 0)
                minX = 1;
            minX = Math.abs(minX);
            if (!minY || minY < 0)
                minY = 1;
            minY = Math.abs(minY);
            var start = null;
            var moved = function (changed) {
                var isX = !changed.y || (Math.abs(changed.x) / Math.abs(changed.y) > (minX + 0.01) / (minY + 0.01));
                if (isX) {
                    if (changed.x > minX && !!options.turnLeft)
                        options.turnLeft(ele, changed.x);
                    else if (changed.x < -minX && !!options.turnRight)
                        options.turnRight(ele, -changed.x);
                }
                else {
                    if (changed.y > minY && !!options.turnUp)
                        options.turnUp(ele, changed.y);
                    else if (changed.y < -minY && !!options.turnDown)
                        options.turnDown(ele, -changed.y);
                }
                if (!!options.moveEnd)
                    options.moveEnd(ele, changed);
            };
            var event1 = Elements.listen(ele, "touchstart", function (ev) {
                start = {
                    x: ev.targetTouches[0].pageX,
                    y: ev.targetTouches[0].pageY
                };
                if (!!options.moveStart)
                    options.moveStart(ele);
            });
            var event2 = !!options.moving ? Elements.listen(ele, "touchmove", function (ev) {
                var point = (ev.touches ? ev.touches[0] : ev);
                if (!point)
                    return;
                var coor = {
                    x: point.pageX - start.x,
                    y: point.pageY - start.y
                };
                options.moving(ele, coor);
            }) : null;
            var event3 = Elements.listen(ele, "touchend", function (ev) {
                if (start == null)
                    return;
                var changed = {
                    x: ev.changedTouches[0].pageX - start.x,
                    y: ev.changedTouches[0].pageY - start.y
                };
                start = null;
                moved(changed);
            });
            var event4 = Elements.listen(ele, "mousedown", function (ev) {
                var mStartP = Elements.getMousePosition();
                var event4a = Elements.listen(document.body, "mousemove", function (ev) {
                    var mCurP = Elements.getMousePosition();
                    var coor = {
                        x: mCurP.x - mStartP.x,
                        y: mCurP.y - mStartP.y
                    };
                    options.moving(ele, coor);
                });
                var event4b = Elements.listenOnce(document.body, "mouseup", function (ev) {
                    event4a.dispose();
                    var mCurP = Elements.getMousePosition();
                    var changed = {
                        x: mCurP.x - mStartP.x,
                        y: mCurP.y - mStartP.y
                    };
                    moved(changed);
                });
            });
            return {
                dispose: function () {
                    if (!!event1)
                        event1.dispose();
                    if (!!event2)
                        event2.dispose();
                    if (!!event3)
                        event3.dispose();
                    if (!!event4)
                        event4.dispose();
                }
            };
        }
        Elements.addGesture = addGesture;
        /**
          * Adds an event handler for clicking or tapping.
          * @param element  the target element.
          * @param options  The options.
          */
        function onClick(element, options) {
            if (!options || !options.process || options.count === 0 || options.span === 0)
                return AliHub.Common.Reflection.emptyDisposable();
            if (!options.start && options.count == null) {
                return listen(element, "click", function (ev) { return options.process((ev || event), 0, options); });
            }
            var count = 0;
            var time = null;
            return listen(element, "click", function (ev) {
                var timespan = time != null ? AliHub.Common.DateTime.getSpan(time, new Date) : null;
                time = new Date();
                if (timespan == null || isNaN(timespan) || timespan > (!!options.span ? options.span : 1000)) {
                    count = 1;
                    return;
                }
                count++;
                var start = !!options.start ? options.start : 0;
                if (count >= start && (options.count == null || options.count > count - start))
                    options.process((ev || event), count - 1, options);
            });
        }
        Elements.onClick = onClick;
        /**
          * Added event handler for listening element attribute changing.
          * @param element  the target element.
          * @param attrName  the attribute name to listen; or null for any attribute.
          * @param handler  the handler to raise after attribute changes.
          */
        function attrChanged(element, attrName, handler) {
            var ele = Elements.getById(element);
            if (!ele || !handler)
                return AliHub.Common.Reflection.emptyDisposable();
            if (attrName === null) {
                return Elements.listen(ele, "DOMAttrModified", function (ev) {
                    handler(ev);
                });
            }
            var names = AliHub.Collection.toStringArray(attrName);
            if (!names || names.length < 1)
                return AliHub.Common.Reflection.emptyDisposable();
            return Elements.listen(ele, "DOMAttrModified", function (ev) {
                var attr = ev.attrName || ev.propertyName;
                if (!attr || !names || !names.some(function (name, ni, narr) {
                    return name === attr;
                }))
                    return;
                handler(ev);
            });
        }
        Elements.attrChanged = attrChanged;
        /**
          * Gets the size of specific element.
          * @param element  the target element.
          */
        function getSize(element, emptyForNull) {
            if (emptyForNull === void 0) { emptyForNull = false; }
            if (!element)
                element = window;
            if (typeof element === "function")
                element = element();
            if (typeof element === "string")
                element = Elements.getById(element);
            if (element && element.getElement) {
                element = element.getElement();
            }
            if (!element)
                return emptyForNull ? { invalid: true, message: "element does not exist." } : null;
            if (!!element.body || !!element.documentElement) {
                var bodyWidth = !!document.body ? document.body.scrollWidth : 0;
                var documentWidth = !!document.documentElement ? document.documentElement.scrollWidth : 0;
                var bodyHeight = !!document.body ? document.body.scrollHeight : 0;
                var documentHeight = !!document.documentElement ? document.documentElement.scrollHeight : 0;
                return {
                    x: bodyWidth > documentWidth ? bodyWidth : documentWidth,
                    y: bodyHeight > documentHeight ? bodyHeight : documentHeight
                };
            }
            if (!element.parent)
                return {
                    x: element.offsetWidth,
                    y: element.offsetHeight
                };
            return {
                x: document.compatMode == "CSS1Compat" ? document.documentElement.clientWidth : document.body.clientWidth,
                y: document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight
            };
        }
        Elements.getSize = getSize;
        /**
          * Adds a shortcut key for given element.
          * @param element  The target element.
          * @param options  The shortcut key options.
          */
        function shortcutKey(element, options) {
            if (!options || !options.process)
                return;
            listen(element, "keydown", function (event) {
                if ((options.ctrl && !event.ctrlKey) || (options.alt && !event.altKey) || (options.shift && !event.shiftKey))
                    return;
                if (options.key != null && options.key != (typeof options.key === "string" ? event.key : event.keyCode))
                    return;
                options.process(event);
            });
        }
        Elements.shortcutKey = shortcutKey;
        /**
          * Adapts the height size of given element, window or static number. null for clear adaption.
          * @param element  The target element.
          * @param target  An optional element to compare.
          * @param compute  An optional computing handler.
          */
        function adaptHeight(element, target, compute) {
            var col = AliHub.Collection.toArray(element);
            if (!col || col.length < 1)
                return;
            if (target == null) {
                col.forEach(function (ele, i, arr) {
                    ele.style.height = "";
                });
                return;
            }
            if (typeof target === "number") {
                if (isNaN(target))
                    return;
                var num = !!compute ? compute(target) : target;
                if (num != null) {
                    var numStr = num + "px";
                    col.forEach(function (ele, i, arr) {
                        ele.style.height = numStr;
                    });
                }
                return;
            }
            if (!target.parent) {
                adaptHeight(col, target.offsetHeight, compute);
                Elements.listen(target, "resize", function (ev) {
                    adaptHeight(col, target.offsetHeight, compute);
                });
                return;
            }
            adaptHeight(col, window.innerHeight ? window.innerHeight : document.body.clientHeight, compute);
            if (!!window.addEventListener)
                window.addEventListener("resize", function (ev) {
                    adaptHeight(col, window.innerHeight ? window.innerHeight : document.body.clientHeight, compute);
                });
            else
                AliHub.Common.PageController.addResizeEvent(function () {
                    adaptHeight(col, window.innerHeight ? window.innerHeight : document.body.clientHeight, compute);
                });
        }
        Elements.adaptHeight = adaptHeight;
        /**
          * Adapts the width size of given element, window or static number. null for clear adaption.
          * @param element  The target.
          */
        function adaptWidth(element, target, compute) {
            var col = AliHub.Collection.toArray(element);
            if (!col || col.length < 1)
                return;
            if (target == null) {
                col.forEach(function (ele, i, arr) {
                    ele.style.width = "";
                });
                return;
            }
            if (typeof target === "number") {
                if (isNaN(target))
                    return;
                var num = !!compute ? compute(num) : target;
                var numStr = num + "px";
                col.forEach(function (ele, i, arr) {
                    ele.style.width = numStr;
                });
                return;
            }
            if (!target.parent) {
                adaptWidth(col, target.offsetWidth, compute);
                Elements.listen(target, "resize", function (ev) {
                    adaptWidth(col, target.offsetWidth, compute);
                });
                return;
            }
            adaptWidth(col, window.innerWidth ? window.innerWidth : document.body.clientWidth, compute);
            if (!!window.addEventListener)
                window.addEventListener("resize", function (ev) {
                    adaptWidth(col, window.innerWidth ? window.innerWidth : document.body.clientWidth, compute);
                });
            else
                AliHub.Common.PageController.addResizeEvent(function () {
                    adaptWidth(col, window.innerWidth ? window.innerWidth : document.body.clientWidth, compute);
                });
        }
        Elements.adaptWidth = adaptWidth;
        /**
          * Gets coordinate information for scrolling.
          */
        function getScroll() {
            var doc = document.documentElement;
            var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
            var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
            return { x: left, y: top };
        }
        Elements.getScroll = getScroll;
        /**
          * Listens page scrolling down event.
          * This is very useful to implement the auto loading for a list by scrolling down.
          * @param options  the options.
          */
        function listenScroll(options) {
            if (!options)
                return;
            var isLoadingScrollInfo = AliHub.Common.Reflection.unwrapObject(options.isEnding) === true;
            var isHiddingHeader = false;
            Elements.listen(window, "scroll", function (ev) {
                try {
                    var scrollInfo = Elements.getScroll();
                    var windowSize = Elements.getSize(window);
                    var docSize = Elements.getSize(document);
                    if (!scrollInfo || !windowSize || !docSize) {
                        isLoadingScrollInfo = false;
                        return;
                    }
                    var hiddenOwner = getById(options.titleOwner);
                    if (!!hiddenOwner) {
                        var titleBar = getById(options.titleBar);
                        var titleShortBar = getById(options.titleShortBar);
                        var titleHeight = !!titleBar && !!titleBar.offsetHeight ? titleBar.offsetHeight : 0;
                        if (!!titleShortBar && !!titleShortBar.offsetHeight)
                            titleHeight -= titleShortBar.offsetHeight;
                        var titleHiddenStyleRef = !!options.hiddenStyleRef ? options.hiddenStyleRef.toString() : "ali-container-collapse-m";
                        if (!!options.titleHeight) {
                            var tHeight = AliHub.Common.Reflection.unwrapObject(options.titleHeight);
                            if (typeof tHeight === "number")
                                titleHeight += tHeight;
                        }
                        if (titleHeight <= 0)
                            titleHeight = 1;
                        if (scrollInfo.y > titleHeight && !isHiddingHeader) {
                            Elements.changeStyleRef(hiddenOwner, titleHiddenStyleRef);
                            isHiddingHeader = !isHiddingHeader;
                        }
                        else if (scrollInfo.y < titleHeight && !!isHiddingHeader) {
                            Elements.changeStyleRef(hiddenOwner, [], titleHiddenStyleRef);
                            isHiddingHeader = !isHiddingHeader;
                        }
                        var restHeight = AliHub.Common.Reflection.unwrapObject(options.restHeight);
                        if (!restHeight || typeof restHeight !== "number")
                            restHeight = 1;
                        if (scrollInfo.y + windowSize.y + restHeight < docSize.y) {
                            isLoadingScrollInfo = false;
                            return;
                        }
                    }
                    if (isLoadingScrollInfo)
                        return;
                    isLoadingScrollInfo = true;
                    if (!options.scrollEnd) {
                        isLoadingScrollInfo = false;
                        return;
                    }
                    var prom = options.scrollEnd();
                    if (!prom || !prom.then) {
                        isLoadingScrollInfo = false;
                        return;
                    }
                    prom.then(function () {
                        isLoadingScrollInfo = false;
                    }, function () {
                        isLoadingScrollInfo = false;
                    });
                }
                catch (ex) {
                    isLoadingScrollInfo = false;
                    throw ex;
                }
            });
        }
        Elements.listenScroll = listenScroll;
        /**
          * Gets the specific string object of an element.
          * @param element  the element to get attribute.
          * @param name  the attribute name to test one by one. Only the first one matched will be used if it is an array.
          */
        function getAttr(element, name) {
            var ele = getById(element);
            if (!ele || !name)
                return undefined;
            var keys = AliHub.Collection.toStringArray(name);
            var result = null;
            keys.some(function (key, i, arr) {
                if (!ele.hasAttribute(key)) {
                    return false;
                }
                result = ele.getAttribute(key);
                return true;
            });
            return result;
        }
        Elements.getAttr = getAttr;
        /**
          * Sets the specific string object of an element.
          * @param element  the element to get attribute.
          * @param name  the attribute name to test one by one.
           * @param value  the value to set.
         */
        function setAttr(element, name, value) {
            var ele = getById(element);
            if (!ele || !name)
                return undefined;
            if (value == null)
                ele.removeAttribute(name);
            var result = AliHub.Common.Text.serialize(value);
            ele.setAttribute(name, result);
            return result;
        }
        Elements.setAttr = setAttr;
        /**
          * Gets the specific attribute object of an element.
          * @param element  the element to get attribute.
          * @param name  the attribute name.
          * @param dataPrefix  a value indicating whether use "data-" prefix for optional.
          */
        function parseAttr(element, name, dataPrefix) {
            if (dataPrefix === void 0) { dataPrefix = false; }
            if (!name)
                return undefined;
            var attrStr = Elements.getAttr(element, dataPrefix ? [name, "data-" + name] : name);
            if (attrStr == null)
                return undefined;
            attrStr = AliHub.Common.Text.trim(attrStr);
            if (attrStr.indexOf("{{") === 0 && attrStr.length > 4) {
                return eval("(" + attrStr.substring(2, attrStr.length - 2) + ")");
            }
            var indexA = attrStr.indexOf(":");
            var indexB = attrStr.indexOf("{");
            if (indexA > 0 && (indexB < 0 || indexA < indexB))
                return eval("({" + attrStr + "})");
            if (indexA < 0 && indexB < 0 && attrStr.indexOf("=") < 0 && attrStr.indexOf("'") < 0 && attrStr.indexOf("\"") < 0 && attrStr.indexOf("(") < 0 && attrStr.indexOf(")") < 0 && attrStr.indexOf(" ") > 0) {
                return attrStr.indexOf(";") >= 0 ? attrStr.split(";") : attrStr;
            }
            return eval("(" + attrStr + ")");
        }
        Elements.parseAttr = parseAttr;
        /**
          * Listens attributes changes of a specific element to an object.
          * @param element  the element to get attribute.
          * @param name  the attribute name.
          * @param obj  the object to bind.
          * @param ignoreUndefined  a value indicating whether need ignore undefined.
          * @param dataPrefix  a value indicating whether use "data-" prefix for optional.
          */
        function listenAttr(element, name, obj, ignoreUndefined, dataPrefix) {
            if (ignoreUndefined === void 0) { ignoreUndefined = false; }
            if (dataPrefix === void 0) { dataPrefix = false; }
            if (!element || !name || !obj)
                return AliHub.Common.Reflection.emptyDisposable();
            var keys = AliHub.Collection.toArray(name);
            keys.forEach(function (key, i, arr) {
                var attr = Elements.parseAttr(element, key, dataPrefix);
                if (!ignoreUndefined || attr !== undefined)
                    obj[key] = attr;
            });
            var disp = Elements.attrChanged(element, keys, function (ev) {
                var key = ev.attrName || ev.propertyName;
                var attr = Elements.parseAttr(element, key);
                if (dataPrefix && key.indexOf("data-") === 0 && !AliHub.Collection.contains(keys, key.substring(5)))
                    key = key.substring(5);
                if (!ignoreUndefined || attr !== undefined)
                    obj[key] = attr;
            });
            return disp;
        }
        Elements.listenAttr = listenAttr;
        /**
          * Pops up a dialog.
          * @param model  the popup dialog model.
          */
        function popup(model) {
            if (!model || !model.render)
                return null;
            var pageWidth = document.body.scrollWidth;
            var pageHeight = document.body.scrollHeight;
            var container = document.createElement("div");
            container.id = AliHub.Common.Maths.randomString("page_hidden_tips_panel_i");
            container.className = "ali-popup-zone-block";
            var parentEle = Elements.getById("ali_hidden");
            if (parentEle)
                parentEle.appendChild(container);
            else
                document.body.appendChild(container);
            var c = new AliHub.Common.VisualControl(container);
            var target = Elements.getById(model.target);
            var orientation = model.orientation == null ? PeripheralOrientations.Bottom : model.orientation;
            c.target = function () { return target; };
            c.orientation = function () { return orientation; };
            c.getTargetSize = function () { return Elements.getSize(model.target); };
            c.getTargetPosition = function () { return Elements.getPosition(model.target); };
            c.timeout = function () { return model.timeout; };
            c.isMenu = function () { return model.isMenu; };
            var avoidClose = false;
            c.avoidCloseMenuOnce = function (value) {
                if (arguments.length > 0) {
                    avoidClose = value;
                }
                return avoidClose;
            };
            c.close = function () { c.dispose(); };
            var size = { width: 0, height: 0 };
            var position = !!target ? Elements.getPosition(target) : Elements.getMousePosition(target);
            if (!!target) {
                size.width = target.offsetWidth;
                size.height = target.offsetHeight;
            }
            container.style.position = model.fixed ? "fixed" : "absolute";
            if (position.x < 0)
                position.x = 0;
            if (position.y < 0)
                position.y = 0;
            switch (orientation) {
                case PeripheralOrientations.Hidden:
                    container.style.position = "hidden";
                    break;
                case PeripheralOrientations.Top:
                    container.style.bottom = position.y.toString() + "px";
                    container.style.left = position.x.toString() + "px";
                    break;
                case PeripheralOrientations.Right:
                    container.style.top = position.y.toString() + "px";
                    container.style.left = (position.x + size.width).toString() + "px";
                    break;
                case PeripheralOrientations.Bottom:
                    container.style.top = (position.y + size.height).toString() + "px";
                    container.style.left = position.x.toString() + "px";
                    break;
                case PeripheralOrientations.Left:
                    container.style.top = position.y.toString() + "px";
                    container.style.right = position.x.toString() + "px";
                    break;
                case PeripheralOrientations.Cover:
                    container.style.top = position.y.toString() + "px";
                    container.style.left = position.x.toString() + "px";
                    break;
            }
            model.render(c);
            var cPosition = Elements.getPosition(container);
            if (cPosition.y + container.offsetHeight > pageHeight) {
                if (container.style.top != null && container.style.top.length > 0 && (container.style.bottom == null || container.style.bottom.length < 1) && cPosition.y > container.offsetHeight) {
                    container.style.top = "";
                    container.style.bottom = "0px";
                }
                else {
                    container.style.bottom = position.y.toString() + "px";
                }
            }
            //if (cPosition.y < 0) {
            //    if (container.style.bottom != null && container.style.bottom.length > 0 && (container.style.top == null || container.style.top.length < 1) && cPosition.y > container.offsetHeight) {
            //        container.style.bottom = "";
            //        container.style.top = (position.y + size.height).toString() + "px";
            //    } else {
            //        container.style.top = "0px";
            //    }
            //}
            if (cPosition.x + container.offsetWidth > pageWidth) {
                if (container.style.left != null && container.style.left.length > 0 && (container.style.right == null || container.style.right.length < 1) && cPosition.x > container.offsetWidth) {
                    container.style.left = "";
                    container.style.right = "0px";
                }
                else {
                    container.style.right = position.x.toString() + "px";
                }
            }
            //if (cPosition.x < 0) {
            //    if (container.style.right != null && container.style.right.length > 0 && (container.style.left == null || container.style.left.length < 1) && cPosition.x > container.offsetWidth) {
            //        container.style.right = "";
            //        container.style.left = (position.x + size.width).toString() + "px";
            //    } else {
            //        container.style.left = "0px";
            //    }
            //}
            if (!!model.adjust)
                model.adjust(c);
            if (c.timeout != null && c.timeout() > 0)
                setTimeout(function () {
                    c.close();
                }, c.timeout());
            if (model.isMenu) {
                var clickBody = {
                    h: null,
                    r: function () {
                        Elements.listenOnceLater(document, "click", clickBody.h);
                    }
                };
                clickBody.h = function (ev) {
                    if (!c.avoidCloseMenuOnce()) {
                        c.close();
                        return;
                    }
                    c.avoidCloseMenuOnce(false);
                    clickBody.r();
                };
                clickBody.r();
            }
            return c;
        }
        Elements.popup = popup;
        function url(element) {
            if (!element)
                return window.location.href;
            if (typeof Blob === "undefined" || typeof URL === "undefined")
                return null;
            if (!Blob || !URL)
                return null;
            var mime = "text/xml";
            var str = "";
            if (!!element.outerHTML) {
                mime = "text/html";
                str = element.outerHTML;
            }
            else {
                if (typeof XMLSerializer === "undefined")
                    return null;
                if (!XMLSerializer)
                    return null;
                if (!!element.classList)
                    mime = "image/svg+xml";
                var xs = new XMLSerializer();
                var str = xs.serializeToString(element);
            }
            var blob = new Blob([str], { type: mime });
            return URL.createObjectURL(blob);
        }
        Elements.url = url;
        /**
          * Adds lazy search.
          */
        function lazySearch(options) {
            if (!options || !options.target)
                return AliHub.Common.Reflection.emptyDisposable();
            ;
            var qEle = Elements.getById(options.target);
            if (!qEle)
                return AliHub.Common.Reflection.emptyDisposable();
            ;
            var disp = new AliHub.Collection.DisposableArray();
            var qStr = qEle.value != null ? qEle.value : qEle.innerHTML;
            var h = !options.suggest ? function () { } : function () {
                var text = qEle.value != null ? qEle.value : qEle.innerHTML;
                if (text == qStr)
                    return;
                var lazy = 300;
                if (options.lazy != null && !isNaN(options.lazy))
                    lazy = options.lazy;
                setTimeout(function () {
                    var newText = qEle.value != null ? qEle.value : qEle.innerHTML;
                    if (qStr == newText || text != newText)
                        return;
                    qStr = newText;
                    options.suggest(qStr);
                }, lazy);
            };
            disp.push(Elements.listen(qEle, "input", function (ev) {
                h();
            }));
            disp.push(Elements.listen(qEle, "paste", function (ev) {
                h();
            }));
            disp.push(Elements.listen(qEle, "cut", function (ev) {
                h();
            }));
            disp.push(Elements.listen(qEle, "blur", function (ev) {
                var text = qEle.value != null ? qEle.value : qEle.innerHTML;
                if (qStr == text || !options.suggest)
                    return;
                qStr = text;
                options.suggest(qStr);
            }));
            disp.push(Elements.listen(qEle, "keydown", function (ev) {
                if (!qEle)
                    return;
                if (ev.keyCode === 13) {
                    var text = qEle.value != null ? qEle.value : qEle.innerHTML;
                    if (!!options.suggest && !options.ignoreSuggestForEnter)
                        options.suggest(text);
                    else
                        qStr = qEle.value != null ? qEle.value : qEle.innerHTML;
                    if (!!options.enter)
                        options.enter(text);
                    return;
                }
                if (ev.keyCode === 27) {
                    if (!!qEle.value)
                        qEle.value = "";
                    h();
                    return;
                }
            }));
            if (!!options.button)
                disp.push(Elements.listen(Elements.getById(options.button), "click", function (ev) {
                    var text = qEle.value != null ? qEle.value : qEle.innerHTML;
                    if (!!options.suggest && !options.ignoreSuggestForEnter)
                        options.suggest(text);
                    else
                        qStr = qEle.value != null ? qEle.value : qEle.innerHTML;
                    if (!!options.enter)
                        options.enter(text);
                }));
            return disp;
        }
        Elements.lazySearch = lazySearch;
        /**
          * Collapses panel.
          */
        function collapse(options) {
            var targetPanel = Elements.getById(options.target);
            var expandButton = Elements.getById(options.expandButton);
            var collapseButton = Elements.getById(options.collapseButton);
            if (!targetPanel)
                return AliHub.Common.Reflection.emptyDisposable();
            var disp = new AliHub.Collection.DisposableArray();
            if (options.isExpanded)
                Elements.changeStyleRef(targetPanel, [], "ali-container-collapse-s");
            else
                Elements.changeStyleRef(targetPanel, "ali-container-collapse-s");
            disp.push(Elements.listen(expandButton, "click", function (ev) {
                Elements.changeStyleRef(targetPanel, [], "ali-container-collapse-s");
            }));
            disp.push(Elements.listen(collapseButton, "click", function (ev) {
                Elements.changeStyleRef(targetPanel, "ali-container-collapse-s");
            }));
            return disp;
        }
        Elements.collapse = collapse;
        function bindText(obs, element) {
            var appendingIdParts = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                appendingIdParts[_i - 2] = arguments[_i];
            }
            if (!obs)
                return { dispose: function () { }, useless: true };
            var h = function (newValue) {
                var dom = Elements.getById.apply(Elements, [element].concat(appendingIdParts));
                if (!!dom)
                    dom.innerHTML = AliHub.Common.Text.toHTML(!!newValue ? newValue.toString() : "");
            };
            h(obs());
            return obs.subscribe(h);
        }
        Elements.bindText = bindText;
        function bindProp(obs, prop, element) {
            var appendingIdParts = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                appendingIdParts[_i - 3] = arguments[_i];
            }
            if (!obs)
                return { dispose: function () { }, useless: true };
            var h = function (newValue) {
                var dom = Elements.getById.apply(Elements, [element].concat(appendingIdParts));
                if (!!dom)
                    dom[prop] = !!newValue ? newValue.toString() : "";
            };
            h(obs());
            return obs.subscribe(h);
        }
        Elements.bindProp = bindProp;
        /**
          * Peripheral orientations.
          */
        var PeripheralOrientations;
        (function (PeripheralOrientations) {
            PeripheralOrientations[PeripheralOrientations["Hidden"] = 0] = "Hidden";
            PeripheralOrientations[PeripheralOrientations["Top"] = 1] = "Top";
            PeripheralOrientations[PeripheralOrientations["Right"] = 2] = "Right";
            PeripheralOrientations[PeripheralOrientations["Bottom"] = 3] = "Bottom";
            PeripheralOrientations[PeripheralOrientations["Left"] = 4] = "Left";
            PeripheralOrientations[PeripheralOrientations["Cover"] = 5] = "Cover";
        })(PeripheralOrientations = Elements.PeripheralOrientations || (Elements.PeripheralOrientations = {}));
        /*
         * The button control.
         */
        var ButtonControl = (function (_super) {
            __extends(ButtonControl, _super);
            /**
              * Initializes a new instance of the ButtonControl class.
              * @param id  The element to render.
              */
            function ButtonControl(id) {
                var _this = _super.call(this, id) || this;
                /**
                  * Gets or sets the name of the button.
                  */
                _this.name = AliHub.Common.listenedObj();
                /**
                  * Gets or sets the icon of the button.
                  */
                _this.icon = AliHub.Common.listenedObj();
                /**
                  * Adds or removes the event handler after clicking.
                  */
                _this.clicked = new AliHub.Collection.EventHandlers();
                /**
                  * Gets or sets the data model.
                  */
                _this.model = AliHub.Common.listenedObj();
                /**
                  * Gets or sets a value indicating whether enable name in HTML.
                  */
                _this.enableNameHTML = false;
                /**
                  * The timespan in millisecond for multiple hitting.
                  */
                _this.span = 0;
                _this.addStyleRef("ali-controls-button");
                var iconContainer = _this.appendElement("span", "icon", "ali-x-section-icon");
                var nameContainer = _this.appendElement("span", "name", "ali-x-section-name");
                _this.name.subscribe(function (newValue) {
                    nameContainer.innerHTML = _this.enableNameHTML ? (newValue || "").toString() : AliHub.Common.Text.toHTML(newValue, true);
                });
                _this.icon.subscribe(function (newValue) {
                    iconContainer.innerHTML = "";
                    if (!newValue)
                        return;
                    var iconEle = AliHub.Graph.imageElement(newValue);
                    if (!iconEle)
                        return;
                    iconContainer.appendChild(iconEle);
                });
                var latestClicked = null;
                var clickingCount = 0;
                _this.listen("click", function (ev) {
                    var currentTime = new Date();
                    var latestTime = latestClicked;
                    try {
                        if (latestClicked != null && latestClicked.getTime) {
                            var diff = currentTime.getTime() - latestClicked.getTime();
                            if (diff >= 0 && diff <= _this.span)
                                clickingCount++;
                            else
                                clickingCount = 0;
                        }
                        else {
                            clickingCount = 0;
                        }
                    }
                    catch (ex) {
                        clickingCount = 0;
                    }
                    latestClicked = currentTime;
                    _this.clicked.raise({
                        times: clickingCount,
                        latest: latestTime,
                        current: currentTime,
                        span: _this.span,
                        event: ev || event
                    });
                });
                return _this;
            }
            /**
              * Loads specific options.
              * @param options  The options to load.
              */
            ButtonControl.prototype.loadOptions = function (value) {
                var options = _super.prototype.loadOptions.call(this, value);
                if (!options)
                    return options;
                if (!!options.name)
                    this.name(options.name);
                if (!!options.icon)
                    this.icon(options.icon);
                if (!!options.model)
                    this.name(options.model);
                if (options.span != null)
                    this.span = options.span;
                if (!!options.action && typeof options.action === "function")
                    this.clicked.add(function (ev) {
                        options.action(ev);
                    });
                return options;
            };
            return ButtonControl;
        }(AliHub.Common.VisualControl));
        Elements.ButtonControl = ButtonControl;
        /**
          * Checkbox and radio control.
          */
        var CheckboxControl = (function (_super) {
            __extends(CheckboxControl, _super);
            /**
             * Initializes a new instance of the CheckboxControl class.
             * @param id  The element to render.
             */
            function CheckboxControl(id) {
                var _this = _super.call(this, id) || this;
                _this.name = AliHub.Common.listenedObj();
                _this.selected = AliHub.Common.listenedObj(false);
                _this.nameIsHTML = AliHub.Common.listenedObj(false);
                _this.model = AliHub.Common.listenedObj();
                _this.unselectOthers = AliHub.Common.listenedObj(false);
                _this.disableSelectByUI = AliHub.Common.listenedObj(false);
                _this.checkboxIcon = AliHub.Common.listenedObj();
                _this.radioIcon = AliHub.Common.listenedObj();
                _this.addStyleRef("ali-controls-checkbox", "ali-x-state-selected-f");
                _this.appendElementByDef({
                    idSuffix: "main",
                    styleRef: "ali-container-main",
                    children: [
                        {
                            idSuffix: "select",
                            tagName: "span",
                            styleRef: "ali-x-field-select ali-x-field-select-checkbox",
                            children: [
                                {
                                    element: AliHub.Graph.imageElement(_this.checkboxIcon())
                                }
                            ]
                        },
                        {
                            idSuffix: "name",
                            tagName: "span",
                            styleRef: "ali-x-field-name"
                        }
                    ]
                });
                _this.name.subscribe(function (newValue) {
                    _this.refreshName();
                });
                _this.nameIsHTML.subscribe(function (newValue) {
                    _this.refreshName();
                });
                _this.selected.subscribe(function (newValue) {
                    _this.styleRef(newValue ? "ali-x-state-selected-t" : "ali-x-state-selected-f", newValue ? "ali-x-state-selected-f" : "ali-x-state-selected-t");
                    if (!newValue || !_this.unselectOthers())
                        return;
                    _this.forEachControl(function (item) {
                        if (item === _this)
                            return;
                        item.selected(false);
                    });
                });
                _this.listen("click", function (ev) {
                    if (_this.disableSelectByUI())
                        return;
                    if (!_this.unselectOthers() || !_this.selected())
                        _this.selected(!_this.selected());
                }, "main");
                _this.unselectOthers.subscribe(function (newValue) {
                    var ele = _this.getChildElement("main", "select");
                    if (!ele)
                        return;
                    ele.innerHTML = "";
                    var imgEle = AliHub.Graph.imageElement(newValue ? _this.radioIcon() : _this.checkboxIcon());
                    ele.appendChild(imgEle);
                    _this.styleRef(newValue ? "ali-x-field-select-radio" : "ali-x-field-select-checkbox", newValue ? "ali-x-field-select-checkbox" : "ali-x-field-select-radio", "main", "select");
                });
                _this.checkboxIcon.subscribe(function (newValue) {
                    var ele = _this.getChildElement("main", "select");
                    if (!ele || _this.unselectOthers())
                        return;
                    ele.innerHTML = "";
                    var imgEle = AliHub.Graph.imageElement(newValue);
                    ele.appendChild(imgEle);
                });
                _this.radioIcon.subscribe(function (newValue) {
                    var ele = _this.getChildElement("main", "select");
                    if (!ele || !_this.unselectOthers())
                        return;
                    ele.innerHTML = "";
                    var imgEle = AliHub.Graph.imageElement(newValue);
                    ele.appendChild(imgEle);
                });
                return _this;
            }
            /**
              * Loads specific options.
              * @param options  The options to load.
              */
            CheckboxControl.prototype.loadOptions = function (value) {
                var options = _super.prototype.loadOptions.call(this, value);
                if (options.name)
                    this.name(options.name);
                if (options.model != null)
                    this.model(options.model);
                if (options.select)
                    this.selected(options.select);
                if (options.selected)
                    this.selected.listen(options.selected);
                if (options.unselectOthers)
                    this.unselectOthers(true);
                if (options.checkboxIcon)
                    this.checkboxIcon(options.checkboxIcon);
                if (options.radioIcon)
                    this.checkboxIcon(options.checkboxIcon);
                return options;
            };
            CheckboxControl.prototype.refreshName = function () {
                var ele = this.getChildElement("main", "name");
                if (!ele)
                    return null;
                var str = (this.nameIsHTML() ? this.name() : AliHub.Common.Text.toHTML(this.name())) || "";
                ele.innerHTML = str;
                return str;
            };
            CheckboxControl.prototype.forEachControl = function (callbackfn, thisArg) {
                var arr = [];
                if (this.selected())
                    arr.push(this);
                if (this.getGroup && typeof this.getGroup === "function") {
                    var cs = this.getGroup();
                    if (cs && cs.forEach)
                        cs.forEach(function (item) {
                            var c = AliHub.Common.getControl(item);
                            if (!c || !c.selected || typeof c.selected !== "function" || AliHub.Collection.contains(arr, c))
                                return;
                            arr.push(c);
                        });
                }
                if (callbackfn)
                    arr.forEach(callbackfn, thisArg);
                return arr.length;
            };
            CheckboxControl.prototype.getSelectedModels = function () {
                var arr = [];
                this.forEachControl(function (item) {
                    if (!item.selected() || AliHub.Collection.contains(arr, item.model()))
                        return;
                    arr.push(item.model());
                });
                return arr;
            };
            CheckboxControl.prototype.getSelectedControls = function () {
                var arr = [];
                this.forEachControl(function (item) {
                    if (!item.selected() || AliHub.Collection.contains(arr, item))
                        return;
                    arr.push(item);
                });
                return arr;
            };
            CheckboxControl.prototype.setGroupControls = function () {
                var col = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    col[_i] = arguments[_i];
                }
                var arr = [this];
                this.unselectOthers(true);
                var groupResolver = function () { return arr; };
                this.getGroup = groupResolver;
                col.forEach(function (item) {
                    var list = AliHub.Collection.toArray(item);
                    list.forEach(function (item2) {
                        var c = AliHub.Common.getControl(item2);
                        if (!c || !c.selected || typeof c.selected !== "function" || !c.unselectOthers || typeof c.unselectOthers !== "function" || AliHub.Collection.contains(arr, c))
                            return;
                        c.unselectOthers(true);
                        c.getGroup = groupResolver;
                        arr.push(c);
                    });
                });
                return arr.length;
            };
            return CheckboxControl;
        }(AliHub.Common.VisualControl));
        Elements.CheckboxControl = CheckboxControl;
        /**
          * Collapse panel extender.
          */
        var CollapseExtender = (function () {
            /**
              * Initializes a new instance of the CollapseExtender class.
              * @param info  The collapse information.
              */
            function CollapseExtender(info) {
                /**
                  * Extender name.
                  */
                this.name = "ali-hub-container-expand";
                this._col = info;
            }
            /**
              * Gets model.
              * @param control  The target control.
              */
            CollapseExtender.prototype.model = function (control) {
                return {
                    info: this._col
                };
            };
            /**
              * Loads after done.
              * @param control  The target control.
              */
            CollapseExtender.prototype.load = function (control) {
                var _this = this;
                var hasSubscribed = false;
                control.subscribeViewModel(function (newValue) {
                    if (hasSubscribed)
                        return;
                    _this._col.forEach(function (info, ii, ia) {
                        var targetPanel = Elements.getById(control, info.targetIdPart);
                        var expandButton = Elements.getById(control, info.expandIdPart);
                        var collapseButton = Elements.getById(control, info.collapseIdPart);
                        Elements.collapse({
                            target: targetPanel,
                            expandButton: expandButton,
                            collapseButton: collapseButton,
                            isExpanded: info.isExpanded
                        });
                    });
                    hasSubscribed = true;
                });
            };
            return CollapseExtender;
        }());
        Elements.CollapseExtender = CollapseExtender;
        /**
          * Search bar extender.
          */
        var SearchExtender = (function () {
            /**
              * Initializes a new instance of the SearchExtender class.
              * @param info  The search bar information.
              */
            function SearchExtender(info) {
                this._info = [];
                /**
                  * Extender name.
                  */
                this.name = "ali-nine-search";
                /**
                  * Time span in millisecond to process in lazy mode.
                  */
                this.lazy = 300;
                /**
                  * Auto focus if it contains only one.
                  */
                this.autoFocus = true;
                this._info = AliHub.Collection.toArray(info);
            }
            /**
              * Loads after done.
              * @param control  The target control.
              */
            SearchExtender.prototype.load = function (control) {
                var _this = this;
                if (!this._info)
                    return;
                this._info.forEach(function (ele, i, arr) {
                    var searchbox = control.getChildElement(true, ele.inputIdPart);
                    var button = !!ele.buttonIdPart ? control.getChildElement(true, ele.buttonIdPart) : null;
                    var lazy = _this.lazy;
                    if (ele.lazy != null && !isNaN(ele.lazy))
                        lazy = ele.lazy;
                    Elements.lazySearch({
                        target: searchbox,
                        button: button,
                        enter: ele.enter,
                        suggest: ele.suggest,
                        lazy: lazy,
                        ignoreSuggestForEnter: ele.ignoreSuggestForEnter
                    });
                });
                if (this.autoFocus && this._info.length === 1 && !!this._info[0].inputIdPart) {
                    var qEle = control.getChildElement(true, this._info[0].inputIdPart);
                    if (!!qEle && qEle.focus)
                        qEle.focus();
                }
            };
            return SearchExtender;
        }());
        Elements.SearchExtender = SearchExtender;
    })(Elements = AliHub.Elements || (AliHub.Elements = {}));
})(AliHub || (AliHub = {}));
/*  --------------------
 *  Graph - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  graph.ts
 *  Description  Graph library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
/// <reference path="common.ts" />
var AliHub;
(function (AliHub) {
    var Graph;
    (function (Graph) {
        function svgToImage(svg) {
            var image = document.createElement("img");
            image.src = "";
            var canvas = document.createElement("canvas");
            canvas.getContext("2d").drawImage(image, 0, 0);
            return {
                type: "url",
                url: canvas.toDataURL("image/png")
            };
        }
        /**
          * Generates an element for image.
          * image  the image contract.
          */
        function imageElement(value) {
            if (!value)
                return null;
            var image = value;
            if (!value.type && !!value.subscribe)
                image = value();
            if (!image || !image.type)
                return null;
            var styleRefs = AliHub.Collection.toStringArray(image.styleRef, true);
            switch (image.type.toString().toLowerCase()) {
                case "url": {
                    var urlImg = image;
                    var imgEle = document.createElement("img");
                    if (!!urlImg.url)
                        imgEle.src = urlImg.url;
                    if (!!urlImg.name)
                        imgEle.alt = urlImg.name;
                    imgEle.className = "ali-image-icon";
                    if (!!image.styleRef)
                        for (var item in styleRefs) {
                            imgEle.className += " " + styleRefs[item];
                        }
                    return imgEle;
                }
                case "string": {
                    var strImg = image;
                    var spanEle = document.createElement("span");
                    spanEle.innerHTML = strImg.value;
                    spanEle.style.color = strImg.color;
                    spanEle.style.backgroundColor = strImg.bgColor;
                    spanEle.className = "ali-image-icon";
                    if (!!image.styleRef)
                        for (var item in styleRefs) {
                            spanEle.className += " " + styleRefs[item];
                        }
                    return spanEle;
                }
                case "svg":
                    var svgImg = image;
                    if (!svgImg.source)
                        return null;
                    try {
                        var svgEle = document.createElement("span");
                        var svgSource = svgImg.source.toString();
                        var sourceStart = svgSource.indexOf("<svg ");
                        if (svgSource === "" || sourceStart < 0)
                            return null;
                        svgSource = svgSource.substring(sourceStart);
                        svgEle.innerHTML = svgSource;
                        var svgSrcEle = svgEle.children[0];
                        if (!!image.styleRef && !!svgSrcEle && !!svgSrcEle.classList && !!svgSrcEle.classList.add) {
                            (_a = svgSrcEle.classList).add.apply(_a, styleRefs);
                        }
                        return svgSrcEle;
                    }
                    catch (ex) {
                        return null;
                    }
                default:
                    return null;
            }
            var _a;
        }
        Graph.imageElement = imageElement;
        /*
          * Links given rectangles and dots by lines.
          */
        function lines(boxes) {
            if (!boxes)
                return [];
            var list = [];
            for (var i = 0; i < boxes.length - 1; i++) {
                var a = boxes[i];
                if (!a) {
                    list.push(null);
                    continue;
                }
                var next = 1;
                var b;
                while (next < boxes.length) {
                    b = boxes[i + next];
                    if (!!b)
                        break;
                    next++;
                }
                var aPos = {
                    x: a.x,
                    y: a.y,
                    rate: 50,
                    side: AliHub.Elements.PeripheralOrientations.Cover
                };
                var bPos = {
                    x: b.x,
                    y: b.y,
                    rate: 50,
                    side: AliHub.Elements.PeripheralOrientations.Cover
                };
                list.push({
                    start: aPos,
                    end: bPos
                });
                var distX = ((b.width || 0) - (a.width || 0)) / 2 + bPos.x - aPos.x;
                var distY = ((b.height || 0) - (a.height || 0)) / 2 + bPos.y - aPos.y;
                var isHorizontal = Math.abs(distX) > Math.abs(distY);
                if (a.width != null && a.height !== null) {
                    if (isHorizontal) {
                        if (distX > 0) {
                            aPos.side = AliHub.Elements.PeripheralOrientations.Right;
                            aPos.x += a.width;
                        }
                        else {
                            aPos.side = AliHub.Elements.PeripheralOrientations.Left;
                        }
                        var aHeightMin = a.height * 1.0 / 10;
                        if (distY > aHeightMin || distY < -aHeightMin)
                            aPos.rate = distY > 0 ? 60 : 40;
                        aPos.y += a.height * aPos.rate / 100;
                    }
                    else {
                        if (distY > 0) {
                            aPos.side = AliHub.Elements.PeripheralOrientations.Bottom;
                            aPos.y += a.height;
                        }
                        else {
                            aPos.side = AliHub.Elements.PeripheralOrientations.Top;
                        }
                        var aWidthMin = a.width * 1.0 / 10;
                        if (distX > aWidthMin || distX < -aWidthMin)
                            aPos.rate = distX > 0 ? 60 : 40;
                        aPos.x += a.width * aPos.rate / 100;
                    }
                }
                if (b.width != null && b.height !== null) {
                    if (isHorizontal) {
                        if (distX > 0) {
                            bPos.side = AliHub.Elements.PeripheralOrientations.Left;
                        }
                        else {
                            bPos.side = AliHub.Elements.PeripheralOrientations.Right;
                            bPos.x += b.width;
                        }
                        var bHeightMin = b.height * 1.0 / 10;
                        if (distY > bHeightMin || distY < -bHeightMin)
                            bPos.rate = distY > 0 ? 40 : 60;
                        bPos.y += b.height * bPos.rate / 100;
                    }
                    else {
                        if (distY > 0) {
                            bPos.side = AliHub.Elements.PeripheralOrientations.Top;
                        }
                        else {
                            bPos.side = AliHub.Elements.PeripheralOrientations.Bottom;
                            bPos.y += b.height;
                        }
                        var bWidthMin = b.width * 1.0 / 10;
                        if (distX > bWidthMin || distX < -bWidthMin)
                            bPos.rate = distX > 0 ? 40 : 60;
                        bPos.x += b.width * bPos.rate / 100;
                    }
                }
            }
            return list;
        }
        Graph.lines = lines;
        /**
          * Chart center.
          */
        var Chart = (function () {
            function Chart() {
            }
            /**
              * Generates an HTML string of progress bar.
              * value  the value.
              * blockCount  the count of block in progress bar.
              */
            Chart.genProgressBarHTML = function (value, blockCount) {
                var str = "<svg class=\"chart-progress-img\" viewBox=\"0 0 104 20\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">"
                    + "<title>Progress Bar</title><desc>Chart of progress bar.</desc><defs>"
                    + "<linearGradient id=\"chart-progress-fill\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"><stop offset=\"0%\" class=\"chart-progress-fill-0\" /><stop offset=\"100%\" class=\"chart-progress-fill-100\" /></linearGradient>"
                    + "</defs><g id=\"ProgressBar\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">"
                    + "<g id=\"chart-progress-rec\" sketch:type=\"MSArtboardGroup\" >"
                    + "<rect id=\"chart-progress-rec-b\" stroke=\"url(#chart-progress-fill)\" sketch:type=\"MSShapeGroup\" x=\"0\" y=\"0\" width=\"104\" height=\"20\" rx=\"4\" ry=\"4\"></rect>";
                var blockWidth = 100 / blockCount;
                var showCount = parseInt((value / blockWidth).toFixed());
                for (var step = 0; step < showCount; step++) {
                    str += "<rect id=\"chart-progress-rec-f" + step.toString() + "\" fill=\"url(#chart-progress-fill)\" sketch:type=\"MSShapeGroup\" x=\"" + (step * blockWidth + 3).toString() + "\" y=\"2\" width=\"" + (blockWidth - 2).toString() + "\" height=\"16\" rx=\"2\" ry=\"2\"></rect>";
                }
                str += "</g></g></svg>";
                return str;
            };
            Chart.genIsoscelesRightTriangle = function (rotation) {
                var x = (45 + rotation) * Math.PI / 180;
                var delta = Math.sin(Math.PI / 4);
                var sin = Math.sin(x);
                var cos = Math.cos(x);
                var ax = 100 * sin;
                var ay = 100 * (delta - cos);
                var degrees = rotation + 45;
                var str = "<svg version=\"1.1\" id=\"graph-polygon-tri-ir\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"100px\" height=\"100px\" viewBox=\"0 0 100 100\" xml:space=\"preserve\"><polygon points=\"15,15 15,85 85,15\" fill=\"#CCC\" stroke=\"#CCC\" stroke-width=\"1\" transform=\"rotate("
                    + degrees.toString()
                    + " 50, 50)\"/></svg>";
                return str;
            };
            return Chart;
        }());
        Graph.Chart = Chart;
        /**
          * External extensions for graph.
          */
        var Extensions = (function () {
            function Extensions() {
            }
            /**
              * Renders radar.
              */
            Extensions.radar = function (element, title, data) {
            };
            /**
              * Renders line.
              */
            Extensions.line = function (element, title, data, options) {
            };
            /**
              * Renders pie.
              */
            Extensions.pie = function (element, title, data, options) {
            };
            return Extensions;
        }());
        Graph.Extensions = Extensions;
    })(Graph = AliHub.Graph || (AliHub.Graph = {}));
})(AliHub || (AliHub = {}));
/*  --------------------
 *  Media - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  media.ts
 *  Description  Multiple media library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
/// <reference path="common.ts" />
var AliHub;
(function (AliHub) {
    var Media;
    (function (Media) {
        /**
          * Audio control.
          */
        var AudioControl = (function (_super) {
            __extends(AudioControl, _super);
            /**
              * Initializes a new instance of the AudioControl class.
              * @param id  Element ID. The content will be filled into this element to replace original ones.
              */
            function AudioControl(id) {
                var _this = _super.call(this, id) || this;
                _this._paths = [];
                /**
                  * Gets or sets the name of the sound.
                  */
                _this.name = AliHub.Common.bindingObj();
                /**
                  * Gets or sets the album name of the sound.
                  */
                _this.album = AliHub.Common.bindingObj();
                /**
                  * Gets or sets the artist name of the sound.
                  */
                _this.artist = AliHub.Common.bindingObj();
                /**
                  * Gets or sets the additional data model of the sound.
                  */
                _this.model = AliHub.Common.bindingObj();
                /**
                  * Key points.
                  */
                _this.keypoints = AliHub.Collection.bindingArray();
                /**
                  * Occurs when the audio is loaded.
                  */
                _this.voiceLoaded = new AliHub.Collection.EventHandlers();
                /**
                  * Occurs when it plays or pauses.
                  */
                _this.played = new AliHub.Collection.EventHandlers();
                /**
                  * Checks if the player is paused.
                  */
                _this.paused = function () {
                    return _this._audio.paused;
                };
                /**
                  * Gets or sets a value indicating whether it is autoplay.
                  */
                _this.autoplay = function (value) {
                    if (typeof value !== "undefined" && value !== void 0)
                        _this._audio.autoplay = value;
                    return _this._audio.autoplay;
                };
                /**
                  * Gets or sets volume.
                  */
                _this.volume = function (value) {
                    if (typeof value !== "undefined" && value !== void 0)
                        _this._audio.volume = value;
                    return _this._audio.volume;
                };
                /**
                  * Gets or sets the playback rate.
                  */
                _this.playbackRate = function (value) {
                    if (typeof value !== "undefined" && value !== void 0)
                        _this._audio.playbackRate = value;
                    return _this._audio.playbackRate;
                };
                /**
                  * Gets or sets a value indicating whether it is muted.
                  */
                _this.muted = function (value) {
                    if (typeof value !== "undefined" && value !== void 0)
                        _this._audio.muted = value;
                    return _this._audio.muted;
                };
                /**
                  * Gets or sets the default playback rate.
                  */
                _this.defaultPlaybackRate = function (value) {
                    if (typeof value !== "undefined" && value !== void 0)
                        _this._audio.defaultPlaybackRate = value;
                    return _this._audio.defaultPlaybackRate;
                };
                /**
                  * Gets whether it can play specific file type.
                  */
                _this.canPlayType = function (mime) {
                    return _this._audio.canPlayType(mime);
                };
                /**
                  * Gets or sets current time to play.
                  */
                _this.currentTime = function (value) {
                    if (typeof value !== "undefined" && value !== void 0)
                        _this._audio.currentTime = value;
                    return _this._audio.currentTime;
                };
                _this.addStyleRef("ali-controls-audio");
                var vEle = document.createElement("div");
                vEle.id = _this.getId() + "_v";
                vEle.style.display = "none";
                _this.appendElement(vEle);
                _this._renew();
                if (!!window.AudioContext || !!window.webkitAudioContext)
                    _this._audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                return _this;
            }
            /**
              * Checks whether it contain specific audio file path.
              */
            AudioControl.prototype.contain = function (path) {
                return this._paths.some(function (ele, i, arr) {
                    return path === ele.key;
                });
            };
            /**
              * Gets player client.
              */
            AudioControl.prototype.client = function () {
                this._initClient();
                return this._client;
            };
            /**
              * Changes a sound file.
              */
            AudioControl.prototype.sound = function (path, mime) {
                return this.soundSet([{ key: path, value: mime }]);
            };
            /**
              * Changes sound files.
              */
            AudioControl.prototype.soundSet = function (value, loadImmediately) {
                var _this = this;
                if (loadImmediately === void 0) { loadImmediately = false; }
                if (arguments.length > 0) {
                    this.keypoints(null);
                    var autoplay = this._audio.autoplay;
                    var preload = this._audio.preload;
                    try {
                        if (!!this._paths && this._paths.length > 0) {
                            this._audio.pause();
                            this._audio.currentTime = 0;
                        }
                    }
                    catch (ex) { }
                    try {
                        this._audio.outerHTML = "";
                    }
                    catch (ex) { }
                    this._paths = [];
                    this._renew();
                    if (!!value)
                        value.forEach(function (ele, i, arr) {
                            var sourceEle = document.createElement("source");
                            sourceEle.setAttribute("src", ele.key);
                            sourceEle.setAttribute("type", ele.value);
                            _this._audio.appendChild(sourceEle);
                            _this._paths.push(ele);
                        });
                    if (loadImmediately && !!this._audio.load)
                        this._audio.load();
                    if (autoplay != null)
                        this._audio.autoplay = autoplay;
                    if (preload != null)
                        this._audio.preload = preload;
                    var errText = document.createElement("div");
                    errText.innerHTML = this._text;
                    this._audio.appendChild(errText);
                }
                var col = [];
                this._paths.forEach(function (ele, i, arr) {
                    col.push(ele.key);
                });
                return col;
            };
            /**
              * Gets or sets unsupported text displayed.
              */
            AudioControl.prototype.unsupportedText = function (str) {
                if (arguments.length > 0)
                    this._text = str;
                return this._text;
            };
            /**
              * Loads specific options.
              * @param value  The options to load.
              */
            AudioControl.prototype.loadOptions = function (value) {
                var options = _super.prototype.loadOptions.call(this, value);
                if (!options)
                    return null;
                if (!!options.unsupportedText)
                    this.unsupportedText(options.unsupportedText.toString());
                if (!options.ignoreParts)
                    this.set_template("initpart", null);
                this.set_template(options.templateType, options.template);
                return options;
            };
            /**
              * Sets the template.
              * @param valueType  The data source type for the value.
              * @param value  The data source value.
              */
            AudioControl.prototype.set_template = function (valueType, value) {
                if ((valueType == null && value == null) || !AliHub.Elements.getById(this.getId(), "v"))
                    return;
                var vEle = this.getChildElement(true, "v");
                this._bindingControl();
                this._bindings.bindViewModel(this.model);
                this._bindings.info(this.client());
                if (valueType === "part" || valueType === "initpart") {
                    value = this.templatePart(!!value ? value : "");
                    if (valueType === "initpart" && !value)
                        return;
                    valueType = "";
                }
                this._bindings.setTemplate(valueType, value);
                vEle.style.display = "";
                this._audio.style.display = "none";
            };
            /**
              * Adds an extender.
              * @param value  The extender instance.
              */
            AudioControl.prototype.addExtender = function (value) {
                this._bindingControl().addExtender(value);
            };
            /**
              * Removes a specific extender.
              * @param name  The extender name.
              */
            AudioControl.prototype.removeExtender = function (name) {
                this._bindingControl().removeExtender(name);
            };
            /**
              * Clears all extenders registered.
              */
            AudioControl.prototype.clearExtenders = function () {
                this._bindingControl().clearExtenders();
            };
            /**
              * Plays.
              */
            AudioControl.prototype.play = function () {
                if (!this._paths || !this._audio)
                    return;
                this._audio.play();
            };
            /**
              * Pauses.
              */
            AudioControl.prototype.pause = function () {
                if (!this._paths || !this._audio || this._paths.length === 0)
                    return;
                this._audio.pause();
            };
            /**
              * Copies the specific binding control view model and additional information.
              */
            AudioControl.prototype.copyBinding = function (control) {
                control.info(this.client());
                control.bindViewModel(this.model);
            };
            AudioControl.prototype._initClient = function () {
                var _this = this;
                if (!!this._client)
                    return;
                var client = {
                    sourceNode: function () {
                        return !!_this._audioCtx ? _this._audioCtx.createMediaElementSource(_this._audio) : null;
                    },
                    initialTime: function () {
                        return _this._audio.initialTime;
                    },
                    readyState: function () {
                        return _this._audio.readyState;
                    },
                    autobuffer: function () {
                        return _this._audio.autobuffer;
                    },
                    loop: function (value) {
                        if (typeof value !== "undefined" && value !== void 0)
                            _this._audio.loop = value;
                        return _this._audio.loop;
                    },
                    ended: function () {
                        return _this._audio.ended;
                    },
                    buffered: function () {
                        return _this._audio.buffered;
                    },
                    pause: function () {
                        if (_this.paused())
                            return;
                        _this.pause();
                    },
                    paused: function () {
                        return _this.paused();
                    },
                    play: function () {
                        if (!_this.paused())
                            return;
                        _this.play();
                    },
                    played: this.played,
                    loaded: this.voiceLoaded,
                    error: function () {
                        return _this._audio.error;
                    },
                    seekable: function () {
                        return _this._audio.seekable;
                    },
                    autoplay: function (value) {
                        if (typeof value !== "undefined" && value !== void 0)
                            _this.autoplay(value);
                        return _this.autoplay();
                    },
                    preload: function (value) {
                        if (typeof value !== "undefined" && value !== void 0)
                            _this._audio.preload = value;
                        return _this._audio.preload;
                    },
                    volume: function (value) {
                        if (typeof value !== "undefined" && value !== void 0)
                            _this.volume(value);
                        return _this.volume();
                    },
                    playbackRate: function (value) {
                        if (typeof value !== "undefined" && value !== void 0)
                            _this.playbackRate(value);
                        return _this.playbackRate();
                    },
                    duration: function () {
                        return _this._audio.duration;
                    },
                    muted: function (value) {
                        if (typeof value !== "undefined" && value !== void 0)
                            _this.muted(value);
                        return _this.muted();
                    },
                    defaultPlaybackRate: function (value) {
                        if (typeof value !== "undefined" && value !== void 0)
                            _this.defaultPlaybackRate(value);
                        return _this.defaultPlaybackRate();
                    },
                    canPlayType: function (mime) {
                        return _this.canPlayType(mime);
                    },
                    seeking: function () {
                        return _this._audio.seeking;
                    },
                    currentTime: function (value) {
                        if (typeof value !== "undefined" && value !== void 0)
                            _this.currentTime(value);
                        return _this.currentTime();
                    },
                    keypoints: this.keypoints,
                    sound: function (path, mime) {
                        _this.sound(path, mime);
                        client.changed.raise(_this.soundSet());
                        return _this.soundSet();
                    },
                    soundSet: function (value) {
                        if (typeof value !== "undefined" && value !== void 0) {
                            _this.soundSet(value);
                            client.changed.raise(_this.soundSet());
                        }
                        return _this.soundSet();
                    },
                    clear: function () {
                        _this.soundSet(null);
                    },
                    contain: function (path) {
                        return _this.contain(path);
                    },
                    changed: new AliHub.Collection.EventHandlers(),
                    name: this.name,
                    album: this.album,
                    artist: this.artist,
                    model: this.model
                };
                if (!this._client)
                    this._client = client;
            };
            AudioControl.prototype._bindingControl = function () {
                var _this = this;
                if (!!this._bindings)
                    return this._bindings;
                var vEle = this.getChildElement(true, "v");
                if (!vEle)
                    return this._bindings;
                this._bindings = new AliHub.Common.BindingControl(vEle.id);
                this.propChanged.add(function (ev) {
                    if (!!ev)
                        _this._bindings.prop(ev.key, ev.value);
                });
                return this._bindings;
            };
            AudioControl.prototype._renew = function () {
                var _this = this;
                this._audio = typeof Audio === "undefined" ? document.createElement("audio") : new Audio();
                this._audio.id = this.getId() + "_a";
                AliHub.Elements.listen(this._audio, "play", function (ev) {
                    _this.played.raise(true);
                });
                AliHub.Elements.listen(this._audio, "pause", function (ev) {
                    _this.played.raise(false);
                });
                AliHub.Elements.listen(this._audio, "load", function (ev) {
                    _this.voiceLoaded.raise(_this.soundSet());
                });
                this.appendElement(this._audio);
            };
            return AudioControl;
        }(AliHub.Common.VisualControl));
        Media.AudioControl = AudioControl;
        /**
          * Audio view extender.
          * This is used to extend view abilities with DOM accessing for audio player.
          */
        var AudioExtender = (function () {
            function AudioExtender() {
                /**
                  * Extender name.
                  */
                this.name = "ali-hub-player-audio";
                /**
                  * Inteval to refresh.
                  */
                this.interval = 300;
                /**
                  * A value indicating whether refresh automatics after loading.
                  */
                this.autoRefresh = true;
            }
            /**
              * Gets model.
              * @param control  The list control which requests to process this method.
              * @param item  The target list item info.
              */
            AudioExtender.prototype.model = function (control) {
                var _this = this;
                return { refresh: function (loop) {
                        if (loop === void 0) { loop = true; }
                        return _this.refresh(control, loop);
                    } };
            };
            /**
              * Gets the player.
              * @param control  The control which requests to process this method.
              */
            AudioExtender.prototype.player = function (control) {
                return control.info();
            };
            /**
              * Loads after done.
              * @param control  The control which requests to process this method.
              */
            AudioExtender.prototype.load = function (control) {
                var _this = this;
                var player = this.player(control);
                if (!player)
                    return;
                var playEle = control.getChildElement(true, "c", "cnt", "actions", "play");
                var pauseEle = control.getChildElement(true, "c", "cnt", "actions", "pause");
                if (!!pauseEle)
                    pauseEle.style.display = "none";
                var regInfo = {};
                if (this.autoRefresh)
                    this.refresh(control);
                regInfo.played = player.played.add(function (ev) {
                    if (!control.getElement() && !!regInfo.played)
                        regInfo.played.dispose();
                    if (ev) {
                        _this.refresh(control);
                    }
                    else {
                        if (!!playEle)
                            playEle.style.display = "";
                        if (!!pauseEle)
                            pauseEle.style.display = "none";
                    }
                });
                var barEle = control.getChildElement(true, "c", "cnt", "progress", "bar");
                if (!!barEle)
                    AliHub.Elements.listen(barEle, "click", function (ev) {
                        if (!barEle.offsetWidth)
                            return;
                        var coordinate = AliHub.Elements.getMousePosition(barEle);
                        if (!coordinate || coordinate.x == null)
                            return;
                        _this.turnToPercents(control, coordinate.x, barEle.offsetWidth);
                        AliHub.Elements.changeStyleRef(barEle, null, "ali-state-active-t");
                    });
                var dragEle = control.getChildElement(true, "c", "cnt", "progress", "bar", "drag");
                if (!!dragEle)
                    AliHub.Elements.addGesture(barEle, {
                        moving: function (element, distance) {
                            var position = AliHub.Elements.getMousePosition(barEle);
                            if (position.x < 0)
                                position.x = 0;
                            else if (position.x > barEle.offsetWidth)
                                position.x = barEle.offsetWidth;
                            if (!position.x || isNaN(position.x))
                                return;
                            dragEle.style.left = position.x.toString() + "px";
                            AliHub.Elements.changeStyleRef(barEle, "ali-state-active-t");
                        },
                        moveEnd: function (element, distance) {
                            var duration = player.duration();
                            if (!duration || isNaN(duration)) {
                                AliHub.Elements.changeStyleRef(barEle, null, "ali-state-active-t");
                                return;
                            }
                            var position = AliHub.Elements.getMousePosition(barEle);
                            var currentTime = position.x * 1.0 / barEle.offsetWidth * duration;
                            if (!position.x || isNaN(position.x)) {
                                AliHub.Elements.changeStyleRef(barEle, null, "ali-state-active-t");
                                return;
                            }
                            if (currentTime < 0)
                                position.x = 0;
                            else if (currentTime > duration)
                                currentTime = duration;
                            player.play();
                            player.currentTime(currentTime);
                            AliHub.Elements.changeStyleRef(barEle, null, "ali-state-active-t");
                        }
                    });
            };
            /**
              * Turns to the specific percents of play progress.
              * @param control  The control which requests to process this method.
              * @param value  The value to go.
              * @param denominator  The denominator.
              */
            AudioExtender.prototype.turnToPercents = function (control, value, denominator) {
                if (denominator === void 0) { denominator = 100; }
                if (value < 0 || denominator < 0 || value > denominator)
                    return;
                var player = this.player(control);
                if (!player || !player.duration())
                    return;
                var sec = player.duration() * value / denominator;
                player.currentTime(sec);
            };
            /**
              * Refreshes the control.
              * @param control  The control which requests to process this method.
              * @param loop  A value indicating whether need try to loop to refresh if it is playing.
              */
            AudioExtender.prototype.refresh = function (control, loop) {
                var _this = this;
                if (loop === void 0) { loop = true; }
                var player = this.player(control);
                if (!player || !control.parentElement())
                    return;
                var playEle = control.getChildElement(true, "c", "cnt", "actions", "play");
                var pauseEle = control.getChildElement(true, "c", "cnt", "actions", "pause");
                if (player.paused()) {
                    playEle.style.display = "";
                    pauseEle.style.display = "none";
                    return;
                }
                playEle.style.display = "none";
                pauseEle.style.display = "";
                var bgContainerEle = control.getChildElement(true, "c", "cnt", "progress", "bar");
                var bgBarEle = control.getChildElement(true, "c", "cnt", "progress", "bar", "bg");
                var currentTime = player.currentTime() != null && !isNaN(player.currentTime()) && player.currentTime() > 0 ? player.currentTime() : null;
                var duration = player.duration() != null && !isNaN(player.duration()) && player.duration() > 0 ? player.duration() : null;
                if (!!duration && !!currentTime) {
                    var percentNumber = player.currentTime() * 100 / player.duration();
                    if (percentNumber > 100)
                        percentNumber = 100;
                    else if (percentNumber < 0)
                        percentNumber = 0;
                    var percent = percentNumber.toString();
                    var percentDot = percent.indexOf(".");
                    if (percentDot === 0) {
                        percent = "0" + percent;
                    }
                    else if (percentDot < percent.length - 4) {
                        percent = percent.substring(0, percentDot + 4);
                    }
                    bgBarEle.style.width = percent + "%";
                }
                control.getChildElement(true, "c", "cnt", "time", "current").innerHTML = !!currentTime ? AliHub.Common.DateTime.toSpanString(currentTime * 1000, false) : "";
                control.getChildElement(true, "c", "cnt", "time", "rest").innerHTML = !!duration && !!currentTime ? AliHub.Common.DateTime.toSpanString((duration - currentTime) * 1000, false) : "";
                control.getChildElement(true, "c", "cnt", "time", "duration").innerHTML = !!duration ? AliHub.Common.DateTime.toSpanString(duration * 1000, false) : "";
                var kpEle = control.getChildElement(true, "c", "cnt", "progress", "bar", "kp");
                if (!!player.keypoints && !!duration) {
                    var size = AliHub.Elements.getSize(bgContainerEle);
                    var keypoints = player.keypoints();
                    if (!!keypoints && keypoints.length > 0 && !!size && !!size.x && !!kpEle) {
                        kpEle.style.display = "";
                        var kpStr = "";
                        keypoints.forEach(function (ele, i, arr) {
                            if (!ele || !ele.time || ele.time < 0 || ele.time > duration)
                                return;
                            kpStr += "<span style=\"left: " + (ele.time / duration * size.x).toFixed(0) + "px; \" class=\"ali-container-main\"" + (!!ele.note ? (" title=\"" + ele.note.toString() + "\"") : "") + ">" + i.toString() + "</span>";
                        });
                        kpEle.innerHTML = kpStr;
                    }
                }
                else {
                    if (!!kpEle)
                        kpEle.innerHTML = "";
                    kpEle.style.display = "none";
                }
                if (loop)
                    setTimeout(function () {
                        _this.refresh(control);
                    }, this.interval);
            };
            return AudioExtender;
        }());
        Media.AudioExtender = AudioExtender;
        /**
          * Camera control.
          */
        var CameraControl = (function (_super) {
            __extends(CameraControl, _super);
            /**
              * Initializes a new instance of the CameraControl class.
              * @param id  Element ID. The content will be filled into this element to replace original ones.
              */
            function CameraControl(id) {
                var _this = _super.call(this, id) || this;
                _this._mediaStream = null;
                _this._currentCam = null;
                _this._count = 0;
                /**
                  * A value indicating whether can switch camera.
                  */
                _this.canSwitch = AliHub.Common.bindingObj(true);
                /**
                  * Width of camera view.
                  */
                _this.viewWidth = 640;
                /**
                  * Height of camera view.
                  */
                _this.viewHeight = 360;
                /**
                  * Occurs after captured.
                  */
                _this.captured = new AliHub.Collection.EventHandlers();
                /**
                  * File name prefix.
                  */
                _this.filePrefix = "WEBCAM";
                /**
                  * The data model for not support.
                  */
                _this.notSupportModel = AliHub.Common.bindingObj();
                /**
                  * A value indicating whether the photos captured is desc.
                  */
                _this.isDesc = AliHub.Common.bindingObj(false);
                _this.addStyleRef("ali-controls-camera");
                _this.innerHTML('<div id="__view_control_actions"><button id="__view_control_actions_switch" type="button" disabled="disabled">' + AliHub.Res.builtIn().localString("switchCamera") + '</button></div><video id="__view_control_video" class="ali-container-main"></video><div id="__view_control_invalid" style="display: none;"></div><ul id="__view_control_captured" class="ali-container-main"></ul>');
                _this.listen("click", function () { _this.capture(); }, "video");
                _this.listen("click", function () { _this.nextWebCam(); }, "actions", "switch");
                _this.canSwitch.subscribe(function (newValue) {
                    if (newValue != null)
                        _this.getChildElement(true, "actions", "switch").disabled = newValue;
                });
                return _this;
            }
            /**
              * Loads specific options.
              * @param options  The options to load.
              */
            CameraControl.prototype.loadOptions = function (value) {
                var options = _super.prototype.loadOptions.call(this, value);
                if (!options)
                    return options;
                if (!!options.captured)
                    this.captured.add(function (arg) { options.captured(arg); });
                if (options.isDesc != null)
                    this.isDesc(options.isDesc);
                if (options.filePrefix != null)
                    this.filePrefix = options.filePrefix.toString();
                if (options.viewWidth != null)
                    this.viewWidth = options.viewWidth;
                if (options.viewHeight != null)
                    this.viewHeight = options.viewHeight;
                if (!!options.photoModelConvert)
                    this.photoModelConvert = options.photoModelConvert;
                if (!options.ignoreParts) {
                    this.setPhotoTemplate("initpart", null);
                    this.setNotSupportTemplate("initpart", null);
                }
                this.setPhotoTemplate(options.photoTemplateType, options.photoTemplate);
                this.setNotSupportTemplate(options.notSupportTemplateType, options.notSupportTemplate);
                if (!this.available()) {
                    if (!!options.failedLoad)
                        options.failedLoad();
                }
                else {
                    if (!options.lazyLoad)
                        this.start();
                }
                return options;
            };
            /**
              * Rotates through the webcam device list.
              */
            CameraControl.prototype.nextWebCam = function () {
                // 1. Release the current webcam (if there is one in use)
                // 2. Call getUserMedia() to access the next webcam
                var _this = this;
                this.canSwitch(false);
                var video = this.getChildElement(true, "video");
                if (this._currentCam !== null) {
                    this._currentCam++;
                    if (this._currentCam >= this._webcamList.length) {
                        this._currentCam = 0;
                    }
                    if (typeof (video.srcObject) !== 'undefined')
                        video.srcObject = null;
                    video.src = null;
                    if (this._mediaStream) {
                        var videoTracks = this._mediaStream.getVideoTracks();
                        videoTracks[0].stop();
                        this._mediaStream = null;
                    }
                }
                else {
                    this._currentCam = 0;
                }
                navigator.mediaDevices.getUserMedia({
                    video: {
                        width: this.viewWidth,
                        height: this.viewHeight,
                        deviceId: { exact: this._webcamList[this._currentCam] }
                    }
                }).then(function (stream) {
                    // Set the mediaStream on the video tag.
                    _this._mediaStream = stream;
                    video.srcObject = _this._mediaStream;
                    if (video.paused)
                        video.play();
                    AliHub.Elements.changeStyleRef(video, "ali-info-filled-t");
                    if (_this._webcamList.length > 1) {
                        _this.canSwitch(true);
                    }
                }).catch(function (e) { _this._getUserMediaError(e); });
            };
            /**
              * Occurs when click on video tag.
              */
            CameraControl.prototype.capture = function () {
                // 1. Capture a video frame from the video tag and render on the canvas element
                var _this = this;
                if (!this._mediaStream) {
                    return;
                }
                try {
                    this._count++;
                }
                catch (ex) {
                    this._count = 0;
                }
                var video = this.getChildElement(true, "video");
                var canvas = document.createElement("canvas");
                var picList = this.getChildElement("captured");
                var picItem = document.createElement("li");
                picItem.id = this.getId() + "_captured_i" + this._count.toString();
                var button = document.createElement("button");
                button.type = "button";
                button.value = AliHub.Res.builtIn().localString("download");
                button.innerHTML = AliHub.Res.builtIn().localString("download");
                if (!this.isDesc() || !picList.firstElementChild) {
                    picList.appendChild(picItem);
                }
                else {
                    picList.insertBefore(picItem, picList.firstElementChild);
                }
                picItem.appendChild(canvas);
                picItem.appendChild(button);
                var link = document.createElement("a");
                link.innerHTML = AliHub.Res.builtIn().localString("download");
                link.style.display = "none";
                var time = new Date();
                var name = (this.filePrefix || "") + AliHub.Common.DateTime.toCustomizedString(time, "{{yyyy}}{{MM}}{{dd}}{{HH}}{{mm}}{{ss}}{{mmm}}");
                picItem.appendChild(link);
                var videoWidth = video.videoWidth;
                var videoHeight = video.videoHeight;
                if (canvas.width !== videoWidth || canvas.height !== videoHeight) {
                    canvas.width = videoWidth;
                    canvas.height = videoHeight;
                }
                var ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
                var download = function () {
                    if (navigator.msSaveBlob) {
                        var imgData1 = canvas.msToBlob("image/jpeg");
                        navigator.msSaveBlob(imgData1, name + ".jpg");
                    }
                    else {
                        link.href = canvas.toDataURL("image/jpeg");
                        link.download = name + ".jpg";
                        link.click();
                    }
                };
                AliHub.Elements.listen(button, "click", download);
                var info = function () {
                    return {
                        image: function (styleRef) {
                            return {
                                type: "url",
                                url: canvas.toDataURL("image/jpeg"),
                                styleRef: styleRef
                            };
                        },
                        captured: time,
                        download: download,
                        size: { x: videoWidth, y: videoHeight }
                    };
                };
                if (!!this._photoTempT || !!this._photoTempV) {
                    var bindingEle = document.createElement("div");
                    bindingEle.id = picItem.id + "_b";
                    picItem.appendChild(bindingEle);
                    var bindingControl = new AliHub.Common.BindingControl(bindingEle);
                    bindingControl.setTemplate(this._photoTempT, this._photoTempV);
                    bindingControl.viewModel(info());
                    bindingControl.convertor(function (entry) {
                        return !!_this.photoModelConvert ? _this.photoModelConvert(entry) : null;
                    });
                }
                this.captured.raise(info());
            };
            /**
              * Starts to get webcams and opens the first one.
              */
            CameraControl.prototype.start = function () {
                var _this = this;
                if (!this.available())
                    return;
                // Starts enumerateDevices() and define the callback functions.
                navigator.mediaDevices.enumerateDevices().then(function (devices) {
                    // 1. Identify all webcam devices and store the info in the webcamList
                    // 2. Start the demo with the first webcam on the list
                    // 3. Show the webcam 'switch' button when there are multiple webcams
                    // 4. Show error message when there is no webcam
                    // 5. Register event listener (devicechange) to respond to device plugin or unplug
                    // Identify all webcams
                    _this._webcamList = [];
                    for (var i = 0; i < devices.length; i++) {
                        if (devices[i].kind === 'videoinput') {
                            _this._webcamList[_this._webcamList.length] = devices[i].deviceId;
                        }
                    }
                    if (_this._webcamList.length > 0) {
                        // Start video with the first device on the list
                        _this.nextWebCam();
                        _this.canSwitch(_this._webcamList.length > 1);
                    }
                    else {
                        AliHub.Diagnostics.error("CoreLibrary", "[0x02710501] Webcam not found.");
                    }
                    AliHub.Elements.listen(navigator.mediaDevices, "devicechange", function () { _this.deviceChanged(); });
                }).catch(function (e) { _this._getUserMediaError(e); });
            };
            /**
              * Check if it can work.
              */
            CameraControl.prototype.available = function () {
                return navigator.getUserMedia;
            };
            /**
              * Handles devicechange event.
              */
            CameraControl.prototype.deviceChanged = function () {
                // 1. Reset webcamList
                // 2. Re-enumerate webcam devices
                var _this = this;
                AliHub.Elements.unlisten(navigator.mediaDevices, "devicechange", function () { _this.deviceChanged(); });
                // Reset the webcam list and re-enumerate
                this._webcamList = [];
                this.start();
            };
            /**
              * Sets the template.
              * @param valueType  The data source type for the value.
              * @param value  The data source value.
              */
            CameraControl.prototype.setPhotoTemplate = function (valueType, value) {
                if (valueType == null && value == null)
                    return;
                if (valueType === "part" || valueType === "initpart") {
                    value = this.templatePart(!!value ? value : "");
                    if (!value)
                        value = this.templatePart(!!value ? value : "photo");
                    if (valueType === "initpart" && !value)
                        return;
                    valueType = "";
                }
                this._photoTempT = valueType;
                this._photoTempV = value;
            };
            /**
              * Sets the template.
              * @param valueType  The data source type for the value.
              * @param value  The data source value.
              */
            CameraControl.prototype.setNotSupportTemplate = function (valueType, value) {
                if (valueType == null && value == null)
                    return;
                if (valueType === "part" || valueType === "initpart") {
                    value = this.templatePart(!!value ? value : "");
                    if (!value)
                        value = this.templatePart(!!value ? value : "notsupport");
                    if (valueType === "initpart" && !value)
                        return;
                    valueType = "";
                }
                this._invalidTempT = valueType;
                this._invalidTempV = value;
            };
            /**
              * Callback function when getUserMedia() returns error.
              */
            CameraControl.prototype._getUserMediaError = function (e) {
                if (e.name.indexOf("NotFoundError") >= 0) {
                    AliHub.Diagnostics.error("CoreLibrary", "[0x02712301] Webcam not found.");
                }
                else {
                    AliHub.Diagnostics.error("CoreLibrary", "[0x02712302] The following error occurred: " + e.name + ". Please check your webcam device(s) and try again.");
                }
            };
            return CameraControl;
        }(AliHub.Common.VisualControl));
        Media.CameraControl = CameraControl;
        function speak(sentence) {
            if (!sentence)
                return null;
            try {
                var utterance = new window.SpeechSynthesisUtterance(sentence);
                window.speechSynthesis.speak(utterance);
                return sentence;
            }
            catch (ex) { }
            return null;
        }
        Media.speak = speak;
        /**
          * Creates an AudioContext object.
          */
        function audioContext() {
            return (!!window.AudioContext || !!window.webkitAudioContext) ? new (window.AudioContext || window.webkitAudioContext)() : null;
        }
        Media.audioContext = audioContext;
        /**
          * Creates an AudioControl.
          * @param idSuffix  The identifier or identifier suffix if has a parent control.
          * @param parent  The parent control.
          * @param options  The initializition options.
          */
        function audioControl(idSuffix, options, parent) {
            return AliHub.Common.createControl(idSuffix, AudioControl, options, parent);
        }
        Media.audioControl = audioControl;
        /**
          * Creates an CameraControl.
          * @param idSuffix  The identifier or identifier suffix if has a parent control.
          * @param parent  The parent control.
          * @param options  The initializition options.
          */
        function cameraControl(idSuffix, options, parent) {
            return AliHub.Common.createControl(idSuffix, CameraControl, options, parent);
        }
        Media.cameraControl = cameraControl;
    })(Media = AliHub.Media || (AliHub.Media = {}));
})(AliHub || (AliHub = {}));
/*  --------------------
 *  Pages - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  pages.ts
 *  Description  Pages utilities.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
/// <reference path="common.ts" />
/// <reference path="datetime.ts" />
/// <reference path="collection.ts" />
var AliHub;
(function (AliHub) {
    var Common;
    (function (Common) {
        /**
          * Page controller.
          */
        var PageController = (function () {
            function PageController() {
            }
            /**
              * Loads page options.
              */
            PageController.loadOptions = function (value) {
                PageController.appCenterUrl = value.appCenterUrl;
                PageController.bodyPanelId = value.bodyPanelId;
                PageController.headerPanelId = value.headerPanelId;
                PageController.coverPanelId = value.coverPanelId;
                PageController.hiddenPanelId = value.hiddenPanelId;
                PageController.messageUrl = value.messageUrl;
                PageController.feedbackUrl = value.feedbackUrl;
                PageController.signOutUrl = value.signOutUrl;
                PageController.menu = value.menu;
                PageController.path = value.path;
                PageController.isLastNodeInPath = value.isLastNodeInPath;
                PageController.homeInfo = value.homeInfo;
                PageController.searchIcon = value.searchIcon;
                PageController.searchTip = value.searchTip;
                PageController.searchProvider = value.searchProvider;
                PageController.searchTarget = value.searchTarget;
                PageController.optionsBar = value.optionsBar;
                PageController.minSize = value.minSize;
                PageController.maxSize = value.maxSize;
            };
            /**
              * Gets window size level.
              * xxxl - 10000px
              * xxl - 3840px
              * xl - 1920px
              * l - 1440px
              * m - 1024px
              * s - 800px
              * xs - 640px
              * xxs - 480px
              * xxxs - 320px
              */
            PageController.getWindowSize = function () {
                return this._size;
            };
            /**
              * Refreshes page layout.
              */
            PageController.refreshLayout = function () {
                var sizeIndex = null;
                var sizes = ["ali-size-xxxl", "ali-size-xxl", "ali-size-xl", "ali-size-l", "ali-size-m", "ali-size-s", "ali-size-xs", "ali-size-xxs", "ali-size-xxxs"];
                var applySize = [];
                if (window.innerWidth > 4000) {
                    sizeIndex = 0;
                }
                else if (window.innerWidth > 2400) {
                    sizeIndex = 1;
                }
                else if (window.innerWidth > 1600) {
                    sizeIndex = 2;
                }
                else if (window.innerWidth > 1300) {
                    sizeIndex = 3;
                }
                else if (window.innerWidth > 900) {
                    sizeIndex = 4;
                }
                else if (window.innerWidth > 640) {
                    sizeIndex = 5;
                }
                else if (window.innerWidth > 480) {
                    sizeIndex = 6;
                }
                else if (window.innerWidth > 320) {
                    sizeIndex = 7;
                }
                else {
                    sizeIndex = 8;
                }
                if (!!PageController.minSize) {
                    var sizeTest = AliHub.Collection.indexOf(sizes, "ali-size-" + PageController.minSize);
                    if (sizeTest < sizeIndex) {
                        sizeIndex = sizeTest;
                        applySize.push("ali-size-cc-s");
                    }
                }
                if (!!PageController.maxSize) {
                    var sizeTest = AliHub.Collection.indexOf(sizes, "ali-size-" + PageController.maxSize);
                    if (sizeTest > sizeIndex) {
                        sizeIndex = sizeTest;
                        applySize.push("");
                        applySize.push("ali-size-cc-l");
                    }
                }
                applySize.push(sizes[sizeIndex]);
                var horH = window.innerWidth >= 100 ? (window.innerWidth / 100).toString() : "0";
                if (window.innerWidth > 10000)
                    horH = "x";
                if (horH.indexOf(".") > 0)
                    horH = horH.substring(0, horH.indexOf("."));
                var hSizes = ["ali-size-hxx", "ali-size-cc-s", "ali-size-cc-l"];
                for (var i = 0; i <= 100; i++) {
                    hSizes.push("ali-size-h" + i.toString() + "x");
                }
                if (!!document.body) {
                    document.body.parentElement.className = AliHub.Collection.addItem(document.body.parentElement.className, " ", ["ali-size-h" + horH + "x"], hSizes);
                    document.body.parentElement.className = AliHub.Collection.addItem(document.body.parentElement.className, " ", applySize, sizes);
                }
                var coverPanel = AliHub.Elements.getById(PageController.coverPanelId);
                if (!!coverPanel)
                    coverPanel.style.height = window.innerHeight.toString() + "px";
            };
            /**
              * Initializes the page.
              */
            PageController.init = function (unlisten) {
                if (unlisten === void 0) { unlisten = false; }
                if (PageController._hasInited === true)
                    return;
                PageController._hasInited = true;
                PageController.refreshLayout();
                AliHub.Elements.listen(window, "resize", function (ev) {
                    PageController.refreshLayout();
                });
                if (unlisten)
                    return;
                var eleCol = document.getElementsByTagName("*");
                for (var i = 0; i < eleCol.length; i++) {
                    try {
                        Common.fillControl(eleCol[i], null, true);
                    }
                    catch (ex) { }
                }
                AliHub.Elements.listen(document, "DOMNodeInserted", function (event) {
                    Common.fillControl(event.target || event.srcElement, null, true);
                });
                //Elements.listen(document, "DOMNodeRemovedFromDocument", (event) => {
                //    var c = getControl(event.target as any || event.srcElement);
                //    try {
                //        c.dispose();
                //    } catch (ex) { }
                //});
            };
            PageController.generatePage = function (id, unlisten) {
                if (unlisten === void 0) { unlisten = false; }
                AliHub.Common.PageController.init(unlisten);
                if (!AliHub.Elements.getById(PageController.headerPanelId)) {
                    var ele = document.createElement("div");
                    ele.id = PageController.headerPanelId;
                    document.body.appendChild(ele);
                }
                if (!AliHub.Elements.getById(PageController.bodyPanelId)) {
                    var ele = document.createElement("div");
                    ele.id = PageController.bodyPanelId;
                    if (!id)
                        id = PageController.bodyPanelId + "_cnt";
                    ele.innerHTML = "<div class=\"ali-container-main\" ><div id=\"" + id + "\" class=\"ali-container-main\" ></div></div>";
                    document.body.appendChild(ele);
                }
                if (!AliHub.Elements.getById(PageController.coverPanelId)) {
                    var ele = document.createElement("div");
                    ele.id = PageController.coverPanelId;
                    ele.innerHTML = "<div class=\"ali-container-main\" ></div>";
                    document.body.appendChild(ele);
                }
                if (!AliHub.Elements.getById(PageController.hiddenPanelId)) {
                    var ele = document.createElement("div");
                    ele.id = PageController.hiddenPanelId;
                    ele.innerHTML = "<div class=\"ali-container-main\" ></div>";
                    document.body.appendChild(ele);
                }
            };
            /**
              * Added resize handler.
              */
            PageController.addResizeEvent = function (h) {
                if (!PageController._onresize) {
                    PageController._onresize = [];
                    window.addEventListener("resize", function (ev) {
                        PageController._onresize.forEach(function (action, aI, aA) {
                            action();
                        });
                    });
                }
                if (PageController._onresize.some(function (handler, hI, hA) {
                    return handler === h;
                }))
                    return;
                PageController._onresize.push(h);
            };
            /**
              * Opens an app by given URL.
              */
            PageController.openApp = function (url, timeout) {
                if (!url || !PageController.hiddenPanelId)
                    return;
                var hiddenEle = AliHub.Elements.getById(PageController.hiddenPanelId);
                if (!hiddenEle)
                    return;
                var appStarterEle = AliHub.Elements.getById(hiddenEle.id + "_starter");
                if (!appStarterEle) {
                    appStarterEle = document.createElement("div");
                    hiddenEle.appendChild(appStarterEle);
                    appStarterEle.id = hiddenEle.id + "_starter";
                    appStarterEle = AliHub.Elements.getById(hiddenEle.id + "_starter");
                }
                var browserEle = document.createElement("iframe");
                browserEle.src = url;
                appStarterEle.appendChild(browserEle);
                browserEle.onload = function (ev) {
                    setTimeout(function () { browserEle.outerHTML = ""; }, 10000);
                };
            };
            /**
              * Loads client script.
              */
            PageController.loadScript = function (url) {
                var script = document.createElement('script');
                script.src = url;
                document.getElementsByTagName('head')[0].appendChild(script);
            };
            /**
              * Shows customized page cover.
              */
            PageController.showCustomizedCover = function () {
                var coverPanel = AliHub.Elements.getById(Common.PageController.coverPanelId);
                coverPanel.style.display = "block";
                coverPanel.className = "ali-container-visible-t";
                PageController.refreshLayout();
                coverPanel.innerHTML = "<div id=\"" + Common.PageController.coverPanelId + "_panel\" ></div>";
                return AliHub.Elements.getById(Common.PageController.coverPanelId + "_panel");
            };
            /**
              * Hides customized page cover.
              */
            PageController.hideCustomizedCover = function () {
                var coverPanel = AliHub.Elements.getById(Common.PageController.coverPanelId);
                coverPanel.className = "ali-container-visible-f";
                coverPanel.style.display = "none";
            };
            /**
              * Renders header.
              */
            PageController.renderHeader = function (branch) {
                var cElement = AliHub.Elements.getById(PageController.headerPanelId);
                if (!cElement)
                    return;
                var containerEle = document.createElement("div");
                containerEle.className = "ali-container-main";
                var crumbEle = containerEle;
                var hEc = cElement.getElementsByTagName("h1");
                var isMemberPage = false;
                var title = !!PageController.homeInfo ? PageController.homeInfo : { name: document.title };
                if (!!hEc && hEc.length > 0 && !!hEc[0]) {
                    isMemberPage = true;
                    var titleStr = null;
                    if (!!hEc[0].title) {
                        titleStr = hEc[0].title;
                    }
                    else if (!!hEc[0].innerText) {
                        titleStr = hEc[0].innerText;
                    }
                    else {
                        titleStr = hEc[0].innerHTML;
                    }
                    if (!titleStr || titleStr == "")
                        titleStr = AliHub.Res.builtIn().localString("page");
                    containerEle.appendChild(hEc[0]);
                    crumbEle = document.createElement("div");
                    crumbEle.className = "ali-container-main";
                    var pathArr = [{
                            id: "root",
                            name: title.name,
                            url: title.url,
                            avatar: title.avatar,
                            note: title.note,
                            onclick: title.onclick
                        }];
                    if (!!PageController.path) {
                        PageController.path.forEach(function (tV, tI, tA) {
                            if (!!tV)
                                pathArr.push(tV);
                        });
                    }
                    else {
                        pathArr.push({
                            id: "apps",
                            name: AliHub.Res.builtIn().localString("appCenter"),
                            url: PageController.appCenterUrl
                        });
                    }
                    if (PageController.isLastNodeInPath !== true)
                        pathArr.push({
                            id: "current",
                            name: titleStr,
                            url: "javascript:window.location.reload();"
                        });
                    var pathEle = document.createElement("ul");
                    pathEle.id = PageController.headerPanelId + "_nav";
                    PageController.renderMenu(pathEle, pathArr, pathArr[pathArr.length - 1].id, null, function (splitEle, leftIndex) {
                        var splitInfoEle = document.createElement("div");
                        splitInfoEle.className = "ali-container-main";
                        if (leftIndex === pathArr.length - 2)
                            splitInfoEle.className += " ali-state-active-t";
                        splitInfoEle.innerHTML = "<svg version=\"1.1\" id=\"" + splitEle.id + "_svg\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 20 40\" enable-background=\"new 0 0 20 40\" xml:space=\"preserve\">"
                            + "<polygon points=\"0,0 20,20 0,40 20,40 20,0 20,0\" /><polygon points=\"19,20 0,40 1,40 20,20 1,0 0,0\"/></svg>";
                        splitEle.appendChild(splitInfoEle);
                        return true;
                    });
                    crumbEle.appendChild(pathEle);
                }
                else {
                    var titleEle = document.createElement("h1");
                    titleEle.id = PageController.headerPanelId + "_title";
                    containerEle.appendChild(titleEle);
                    var titleLinkEle = document.createElement("a");
                    if (!!title.avatar) {
                        var titleImg = AliHub.Graph.imageElement(title.avatar);
                        titleLinkEle.appendChild(titleImg);
                    }
                    if (!!title.name) {
                        var titleLinkTextEle = document.createElement("span");
                        titleLinkTextEle.innerHTML = title.name;
                        titleLinkTextEle.title = title.name;
                        titleLinkEle.appendChild(titleLinkTextEle);
                    }
                    if (!!title.note)
                        titleLinkEle.title = title.note;
                    if (!!title.url)
                        titleLinkEle.href = title.url;
                    else
                        titleLinkEle.href = "#";
                    if (!!title.onclick)
                        titleLinkEle.onclick = function (ev) {
                            return title.onclick();
                        };
                    if (!title.url && !title.onclick)
                        titleLinkEle.onclick = function (ev) {
                            return false;
                        };
                    titleEle.appendChild(titleLinkEle);
                    containerEle.appendChild(titleEle);
                }
                cElement.innerHTML = "";
                var hcEle = document.createElement("div");
                hcEle.className = "ali-container-main";
                hcEle.appendChild(containerEle);
                if (crumbEle != containerEle) {
                    var mcEle = document.createElement("div");
                    mcEle.className = "ali-container-main ali-container-nav";
                    cElement.appendChild(mcEle);
                    mcEle.appendChild(crumbEle);
                    cElement.appendChild(mcEle);
                    hcEle.className += " ali-container-menu";
                }
                cElement.appendChild(hcEle);
                var menuEle = document.createElement("ul");
                menuEle.id = PageController.headerPanelId + "_menu";
                PageController.renderMenu(menuEle, PageController.menu, branch);
                containerEle.appendChild(menuEle);
                var userEle = document.createElement("ul");
                userEle.id = PageController.headerPanelId + "_user";
                var searchEle = document.createElement("li");
                searchEle.id = userEle.id + "_sear";
                PageController._renderSearchBar(searchEle);
                userEle.appendChild(searchEle);
                var profile = AliHub.Users.profile();
                var optionsMenu = [];
                if (!!profile) {
                    var msgUrl = Common.Text.format(PageController.messageUrl, { "user": profile.id });
                    var signOutUrl = Common.Text.format(PageController.signOutUrl, { "user": profile.id });
                    optionsMenu.push({
                        id: "me",
                        name: profile.nickname,
                        avatar: {
                            type: "url",
                            name: profile.nickname,
                            url: profile.avatar
                        },
                        children: [
                            {
                                id: "me\logout",
                                name: AliHub.Res.builtIn().localString("logout"),
                                url: signOutUrl
                            }
                        ]
                    });
                }
                AliHub.Collection.pushRange(optionsMenu, PageController.optionsBar);
                PageController.renderMenu(userEle, optionsMenu);
                crumbEle.appendChild(userEle);
            };
            PageController.changeBranch = function (path) {
                var menuEle = AliHub.Elements.getById(PageController.headerPanelId + "_menu");
                if (!menuEle)
                    return;
                PageController.selectMenuItem(menuEle, PageController.menu, path);
            };
            PageController.selectMenuItem = function (element, menu, path) {
                if (!element || !menu)
                    return null;
                menu.forEach(function (item, index, arr) {
                    var itemEle = AliHub.Elements.getById(element.id + "_i" + index.toString());
                    if (!itemEle.tagName || itemEle.tagName.toString().toLowerCase() !== "li")
                        return;
                    if (!!path && path === item.id)
                        AliHub.Elements.changeStyleRef(itemEle, ["ali-state-active-t"], []);
                    else
                        AliHub.Elements.changeStyleRef(itemEle, [], ["ali-state-active-t"]);
                });
            };
            /**
              * Renders menu.
              */
            PageController.renderMenu = function (element, menu, path, h, split) {
                if (!element || !menu)
                    return null;
                var col = [];
                menu.forEach(function (item, index, arr) {
                    if (index > 0 && !!split) {
                        var splitEle = document.createElement("li");
                        splitEle.id = element.id + "_split" + index.toString();
                        splitEle.className = "ali-container-split";
                        element.appendChild(splitEle);
                        if (!split(splitEle, index - 1))
                            splitEle.style.display = "none";
                    }
                    var itemEle = document.createElement("li");
                    col.push(itemEle);
                    itemEle.id = element.id + "_i" + index.toString();
                    itemEle.className = "ali-container-menu";
                    if (!!path && path === item.id)
                        itemEle.className = "ali-state-active-t";
                    var infoEle = document.createElement("div");
                    infoEle.id = itemEle.id + "_info";
                    infoEle.className = "ali-container-main";
                    var linkEle = document.createElement("a");
                    linkEle.target = PageController.searchTarget;
                    linkEle.id = infoEle.id + "_link";
                    if (!!item.name)
                        linkEle.title = item.name.replace("<em>", "\"").replace("</em>", "\"");
                    if (!!item.avatar && item.renderStyle !== AliHub.Collection.ButtonRenderStyles.text) {
                        var iconEle = AliHub.Graph.imageElement(item.avatar);
                        if (!!iconEle)
                            linkEle.appendChild(iconEle);
                    }
                    if (!!item.name && item.renderStyle !== AliHub.Collection.ButtonRenderStyles.image) {
                        var contentEle = document.createElement("span");
                        contentEle.innerHTML = item.name;
                        linkEle.appendChild(contentEle);
                    }
                    linkEle.href = "#";
                    if (!!item.url)
                        linkEle.href = item.url;
                    else
                        linkEle.onclick = function (ev) { return false; };
                    if (!!item.onclick)
                        linkEle.onclick = function (ev) { return item.onclick(); };
                    infoEle.appendChild(linkEle);
                    itemEle.appendChild(infoEle);
                    element.appendChild(itemEle);
                    if (!!h)
                        h(item, itemEle, index);
                    if (!item.children)
                        return;
                    var childrenEle = document.createElement("ul");
                    childrenEle.id = itemEle.id + "_menu";
                    itemEle.appendChild(childrenEle);
                    PageController.renderMenu(childrenEle, item.children);
                });
                return col;
            };
            PageController._renderSearchBar = function (element) {
                if (!element)
                    return;
                AliHub.Elements.changeStyleRef(element, ["ali-container-search"]);
                var infoEle = document.createElement("div");
                infoEle.id = element.id + "_info";
                infoEle.className = "ali-container-main";
                var iconEle = AliHub.Graph.imageElement(PageController.searchIcon);
                if (!!iconEle)
                    infoEle.appendChild(iconEle);
                var inputEle = document.createElement("input");
                inputEle.type = "search";
                inputEle.placeholder = !!PageController.searchTip && PageController.searchTip !== "" ? PageController.searchTip : AliHub.Res.builtIn().localString("typeKeywords");
                inputEle.value = "";
                inputEle.autocomplete = "off";
                inputEle.spellcheck = false;
                infoEle.appendChild(inputEle);
                element.appendChild(infoEle);
                var subMenuEle = document.createElement("ul");
                element.appendChild(subMenuEle);
                var selItem = function (mIndex) {
                    if (!PageController._menuElements)
                        return;
                    if (PageController._menuSelIndex != null) {
                        var oldIndex = PageController._menuSelIndex;
                        if (oldIndex != null && oldIndex >= 0 && oldIndex < PageController._menuElements.length) {
                            var oldElement = PageController._menuElements[oldIndex];
                            if (!!oldElement)
                                oldElement.className = "";
                        }
                    }
                    if (mIndex < 0 || mIndex >= PageController._menuElements.length)
                        mIndex = 0;
                    var mElement = PageController._menuElements[mIndex];
                    if (!mElement)
                        return;
                    mElement.className = "ali-state-active-t";
                    PageController._menuSelIndex = mIndex;
                };
                var showJump = function (q, forceRefresh) {
                    if (forceRefresh === void 0) { forceRefresh = false; }
                    if (!PageController.searchProvider) {
                        subMenuEle.style.display = "none";
                        return;
                    }
                    if (!forceRefresh && PageController._q === q)
                        return;
                    PageController._q = q;
                    PageController._menuSelIndex = -1;
                    var subItems = PageController.searchProvider(q);
                    if (!subItems || subItems.length === 0)
                        return;
                    subMenuEle.innerHTML = "";
                    subMenuEle.style.display = "block";
                    var emQ = "<em>" + q + "</em>";
                    var qReplace = function (str, em) {
                        return !!str ? str.replace("{{q}}", em ? emQ : q).replace("{q}", em ? emQ : q) : "";
                    };
                    var col = [];
                    subItems.forEach(function (ele, i, arr) {
                        var item = Common.Reflection.copy(ele);
                        if (!item || !item.name)
                            return;
                        item.name = qReplace(item.name, true);
                        if (!!item.url)
                            item.url = qReplace(item.url, false);
                        col.push(item);
                    });
                    var eles = PageController.renderMenu(subMenuEle, col, null, function (mItem, mElement, mIndex) {
                        mElement.onmouseenter = function (ev) {
                            selItem(mIndex);
                        };
                    });
                    PageController._menuElements = eles;
                    PageController._menuItems = subItems;
                    return eles;
                };
                inputEle.onblur = function (ev) {
                    if (!inputEle.value || inputEle.value === "" || inputEle.value === " " || !PageController.searchProvider) {
                        subMenuEle.style.display = "none";
                        PageController._q = null;
                    }
                };
                inputEle.onkeydown = function (ev) {
                    var keyCode = event.keyCode;
                    if (!inputEle.value || inputEle.value === "" || inputEle.value === " " || !PageController.searchProvider) {
                        subMenuEle.style.display = "none";
                        return;
                    }
                    if (keyCode === 27) {
                        subMenuEle.style.display = "none";
                        return;
                    }
                    else if (keyCode === 13) {
                        var menuItems = PageController._menuElements;
                        if (!menuItems)
                            return;
                        var curIndex = PageController._menuSelIndex;
                        if (curIndex == null)
                            curIndex = 0;
                        if (curIndex < 0 || curIndex >= menuItems.length)
                            return;
                        var menuItem = menuItems[curIndex];
                        if (!menuItem)
                            return;
                        var menuLinkItem = AliHub.Elements.getById(menuItem.id + "_info_link");
                        if (!menuLinkItem)
                            return;
                        menuLinkItem.click();
                        return;
                    }
                    else if (keyCode !== 38 && keyCode !== 40) {
                        return;
                    }
                    var q = inputEle.value;
                    showJump(q);
                    var curIndex = PageController._menuSelIndex;
                    if (!PageController._menuElements)
                        return;
                    if (keyCode === 40) {
                        if (curIndex == null)
                            curIndex = -1;
                        if (curIndex < PageController._menuElements.length - 1)
                            selItem(curIndex + 1);
                    }
                    else if (keyCode === 38) {
                        if (curIndex == null)
                            curIndex = PageController._menuElements.length;
                        if (curIndex > 0)
                            selItem(curIndex - 1);
                    }
                };
                inputEle.onkeypress = function (ev) {
                    if (!inputEle.value || inputEle.value === "" || inputEle.value === " " || !PageController.searchProvider) {
                        subMenuEle.style.display = "none";
                        return;
                    }
                    setTimeout(function () {
                        var q = inputEle.value;
                        setTimeout(function () {
                            if (q !== inputEle.value)
                                return;
                            showJump(q);
                            selItem(0);
                        }, 300);
                    }, 200);
                };
                inputEle.onpaste = function (ev) {
                    setTimeout(function () {
                        var q = inputEle.value;
                        showJump(q);
                        selItem(0);
                    }, 200);
                };
            };
            return PageController;
        }());
        PageController._hasInited = false;
        /**
          * The element identifier of the page body panel.
          */
        PageController.bodyPanelId = "ali_body";
        /**
          * The element identifier of the page header panel.
          */
        PageController.headerPanelId = "ali_head";
        /**
          * The element identifier of the page cover panel.
          */
        PageController.coverPanelId = "ali_cover";
        /**
          * The element identifier of the page hidden panel.
          */
        PageController.hiddenPanelId = "ali_hidden";
        /**
          * The link target of search item.
          */
        PageController.searchTarget = "_self";
        Common.PageController = PageController;
        function initPage(id, unlisten) {
            if (unlisten === void 0) { unlisten = false; }
            if (!id)
                PageController.init(unlisten);
            else
                PageController.generatePage(typeof id === "string" ? id : null);
        }
        Common.initPage = initPage;
    })(Common = AliHub.Common || (AliHub.Common = {}));
})(AliHub || (AliHub = {}));
/*  --------------------
 *  Client resources - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  resources.ts
 *  Description  Client resources.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
/// <reference path="common.ts" />
var AliHub;
(function (AliHub) {
    var Res;
    (function (Res) {
        var _set = {
            templ: {},
            icons: {},
            locals: {},
            mkt: null,
            lp: {
                homepage: "Homepage",
                appCenter: "App center",
                page: "Page",
                pages: "Pages",
                first: "First",
                last: "Last",
                previous: "Previous",
                next: "Next",
                total: "Total",
                current: "Current",
                index: "Index",
                bindingError: "Cannot apply bindings",
                refresh: "refresh",
                reload: "reload",
                member: "Member",
                myMembers: "My members",
                recentDays: "Latest {0} days",
                planned: "Pending",
                processing: "Processing",
                completed: "Done",
                ladyName: "Ms. {0}",
                gentlemanName: "Mr. {0}",
                reminder: "Reminder",
                note: "Note",
                totalScore: "Total Score",
                cents: "{0} points",
                level: "Level",
                collapse: "Collapse",
                expand: "Expand",
                showAll: "Show all",
                followUp: "Follow up",
                noFollowUp: "None",
                memberTags: "Member tags",
                types: "Types",
                history: "History",
                trend: "Trend",
                distribution: "Distribution",
                newTasks: "{0} new tasks coming",
                bizTasks: "Tasks",
                summaryReports: "Reports",
                jobMgm: "Jobs Management",
                createTask: "Create task",
                seeMore: "See more",
                exit: "Exit",
                register: "Sign up",
                login: "Sign in",
                logout: "Sign out",
                search: "Search",
                filter: "Filter",
                typeKeywords: "Type keywords to search",
                requestHelp: "{0} is asking for help",
                cannotFind: "The {0} could not be found",
                newItem: "New",
                createItem: "Create",
                addItem: "Add",
                getItem: "Get",
                setItem: "Set",
                modifyItem: "Modify",
                updateItem: "Update",
                replaceItem: "Replace",
                overrideItem: "Override",
                fillItem: "Fill",
                removeItem: "Remove",
                deleteItem: "Delete",
                clearItem: "Clear",
                cleanUp: "Clean up",
                ok: "OK",
                save: "Save",
                cancel: "Cancel",
                turnBack: "Back",
                rollback: "Rollback",
                undo: "Undo",
                redo: "Redo",
                cut: "Cut",
                copy: "Copy",
                copySomething: "Copy {0}",
                paste: "Paste",
                clipboard: "Clip board",
                navigateTo: "Navigate to",
                settings: "Settings",
                options: "Options",
                profile: "Profile",
                draft: "Draft",
                open: "Open",
                close: "Close",
                turnOn: "Turn on",
                turnOff: "Turn off",
                layout: "Layout",
                add: "Add",
                insert: "Insert",
                edit: "Edit",
                remove: "Remove",
                delete: "Delete",
                clear: "Clear",
                title: "Title",
                content: "Content",
                text: "Text",
                richtext: "Richtext",
                properties: "Properties",
                wizard: "Wizard",
                slide: "Slide",
                photo: "Photo",
                image: "Image",
                images: "Images",
                audio: "Audio",
                video: "Vidio",
                movie: "Movie",
                movies: "Movies",
                document: "Document",
                documents: "Documents",
                link: "Link",
                links: "Links",
                hyperlink: "Hyperlink",
                website: "Website",
                sns: "Social network",
                favorate: "Favorate",
                game: "Game",
                games: "Games",
                file: "File",
                files: "Files",
                folder: "Folder",
                dir: "Directory",
                moveUp: "Move up",
                moveRight: "Move right",
                moveDown: "Move down",
                moveLeft: "Move left",
                module: "Module",
                component: "Component",
                chapter: "Chapter",
                section: "Section",
                update: "Update",
                upload: "Upload",
                download: "Download",
                switch: "Switch",
                switchCamera: "Switch camera",
                capturePhoto: "Capture",
                record: "Record",
                assign: "Assign",
                reassign: "Reassign",
                flag: "Flag",
                send: "Send",
                reply: "Reply",
                replyAll: "Reply all",
                forward: "Forward",
                cc: "Cc",
                bcc: "Bcc",
                phoneCall: "Call",
                contact: "Contact",
                contactMember: "Contact member",
                attach: "Attach",
                attachment: "Attachment",
                expired: "Expired",
                message: "Message",
                notification: "Notification",
                feedback: "Feedback",
                help: "Help",
                support: "Support",
                window: "Window",
                aries: "Aries",
                taurus: "Taurus",
                gemini: "Gemini",
                cancer: "Cancer",
                leo: "Leo",
                virgo: "Virgo",
                libra: "Libra",
                scorpio: "Scorpio",
                sagittarius: "Sagittarius",
                capricorn: "Capricorn",
                aquarius: "Aquarius",
                pisces: "Pisces",
                ophiuchus: "Ophiuchus",
                horoscope: "Horoscope",
                astrology: "Astrology",
                loading: "Loading",
                failToLoadData: "Failed to load data",
                surname: "Surname",
                givenname: "Given name",
                middleName: "Middle name",
                nickname: "nickname",
                city: "City",
                street: "Street",
                country: "Country",
                birthday: "Birthday",
                age: "Age",
                gender: "gender",
                male: "Male",
                female: "Female",
                other: "Other",
                fromSource: "From",
                toTarget: "To",
                millisecondsNum: "{0}ms",
                secondsNum: "{0}s",
                minutesNum: "{0}m",
                hoursNum: "{0}h",
                daysNum: "{0}d",
                weeksNum: "{0}w",
                timeLocaleSep: " ",
                today: "Today",
                tomorrowTime: "{0} tomorrow",
                tomorrow: "Tomorrow",
                secondsAgo: "Seconds ago",
                minuteAgo: "A minute ago",
                minutesTwoAgo: "2 minutes ago",
                minutesAgo: "{0}min ago",
                hourAgo: "An hour ago",
                hoursAgo: "{0}h ago",
                hoursTwoAgo: "2 hours ago",
                yesterdayTime: "{0} yesterday",
                yesterday: "Yesterday",
                daysTwoAgo: "2 days ago",
                daysAgo: "{0} days ago",
                lastWeekDay: "Last {0}",
                lastWeek: "Last week",
                future: "Future",
                date: "Date",
                day: "Day",
                week: "Week",
                weekday: "Weekday",
                weekend: "Weekend",
                week0c: "S",
                week1c: "M",
                week2c: "T",
                week3c: "W",
                week4c: "T",
                week5c: "F",
                week6c: "S",
                week0s: "Sun",
                week1s: "Mon",
                week2s: "Tue",
                week3s: "Wed",
                week4s: "Thu",
                week5s: "Fri",
                week6s: "Sat",
                week0f: "Sunday",
                week1f: "Monday",
                week2f: "Tueday",
                week3f: "Wednesday",
                week4f: "Thursday",
                week5f: "Friday",
                week6f: "Saturday",
                week0t: "{0} Sun",
                week1t: "{0} Mon",
                week2t: "{0} Tue",
                week3t: "{0} Wed",
                week4t: "{0} Thu",
                week5t: "{0} Fri",
                week6t: "{0} Sat",
                month: "Month",
                month0s: "Jan",
                month1s: "Feb",
                month2s: "Mar",
                month3s: "Apr",
                month4s: "May",
                month5s: "Jun",
                month6s: "Jul",
                month7s: "Aug",
                month8s: "Sep",
                month9s: "Oct",
                monthAs: "Nov",
                monthBs: "Dec",
                month0f: "January",
                month1f: "February",
                month2f: "March",
                month3f: "April",
                month4f: "May",
                month5f: "June",
                month6f: "July",
                month7f: "August",
                month8f: "September",
                month9f: "October",
                monthAf: "November",
                monthBf: "December",
                year: "Year",
                am: "AM",
                pm: "PM",
                empty: "Empty",
                commaSymbol: ", ",
                colonSymbol: ": ",
                ellipsisSymbol: "...",
                semicolonSymbol: "; ",
                enumCommaSymbol: ", ",
                periodSymbol: ". "
            }
        };
        function regLang(template) {
            if (!template)
                return null;
            template.strings.reg("ww", _set.lp);
            template.strings.reg("en", _set.lp);
            return template;
        }
        Res.regLang = regLang;
        var IconFontCollection = (function () {
            function IconFontCollection(subject) {
                this._icon = {};
                this._subject = subject;
            }
            IconFontCollection.prototype.subject = function () {
                return this._subject;
            };
            IconFontCollection.prototype.item = function (key, value) {
                if (!key || key.toString() == "")
                    return null;
                key = key.toString();
                if (arguments.length > 1)
                    this._icon[key] = value;
                return this._icon[key];
            };
            IconFontCollection.prototype.line = function (key, defaultValue) {
                if (defaultValue === void 0) { defaultValue = null; }
                if (!key || key.toString() == "")
                    return null;
                key = key.toString();
                var icon = this.item(key);
                return !!icon && !!icon.line ? icon.line : defaultValue;
            };
            IconFontCollection.prototype.block = function (key, defaultValue) {
                if (defaultValue === void 0) { defaultValue = null; }
                if (!key || key.toString() == "")
                    return null;
                key = key.toString();
                var icon = this.item(key);
                return !!icon && !!icon.block ? icon.block : defaultValue;
            };
            return IconFontCollection;
        }());
        Res.IconFontCollection = IconFontCollection;
        /**
          * Template set.
          */
        var Templates = (function () {
            /**
              * Initializes a new instance of the Templates class.
              * @param subject  The subject name.
              */
            function Templates(subject) {
                this._html = {};
                this._settings = {};
                this._svg = {};
                this.data = {};
                /**
                  * Strings templates.
                  */
                this.strings = new Strings();
                this._subject = subject;
            }
            /**
              * Gets subject name.
              */
            Templates.prototype.subject = function () {
                return this._subject;
            };
            /**
              * Gets or sets settings.
              * @param key  The template key.
              * @param value  The optional value to set.
              */
            Templates.prototype.settings = function (key, value) {
                if (!key)
                    return undefined;
                if (arguments.length > 1) {
                    this._settings[key] = value;
                }
                return this._settings[key];
            };
            /**
              * Gets or sets a property of the specific settings.
              * @param key  The template key.
              * @param prop  The property name.
              * @param value  The optional value to set.
              */
            Templates.prototype.settingsProp = function (key, prop, value) {
                if (!key || !prop)
                    return undefined;
                var item = this._settings[key];
                if (arguments.length > 2) {
                    if (item == null) {
                        item = {};
                        this._settings[key] = item;
                    }
                    item[prop] = value;
                }
                return item != null ? item[prop] : undefined;
            };
            /**
              * Gets or sets HTML template.
              * @param key  The template key.
              * @param value  The optional value to set.
              */
            Templates.prototype.html = function (key, value) {
                if (!key || key.toString() == "")
                    return null;
                key = key.toString();
                if (arguments.length > 1) {
                    this._html[key] = value;
                    AliHub.Diagnostics.debugInfo("Add HTML template " + key + " for " + this.subject() + ".");
                }
                return this._html[key];
            };
            /**
              * Gets or sets SVG template.
              * @param key  The template key.
              * @param value  The optional value to set.
              */
            Templates.prototype.svg = function (key, value) {
                if (!key || key.toString() == "")
                    return null;
                key = key.toString();
                if (arguments.length > 1) {
                    this._svg[key] = value;
                    AliHub.Diagnostics.debugInfo("Add SVG template " + key + " for " + this.subject() + ".");
                }
                return this._svg[key];
            };
            /**
              * Gets SVG source image object.
              * @param key  The template key.
              * @param styleRef  The optional style references.
              */
            Templates.prototype.svgImage = function (key, styleRef) {
                var source = this.svg(key);
                return source ? { type: "svg", source: source, styleRef: styleRef } : null;
            };
            /**
              * Gets SVG element from templates.
              * @param key  The template key.
              * @param styleRef  The optional style references.
              */
            Templates.prototype.svgElement = function (key, styleRef) {
                var src = this.svgImage(key);
                return AliHub.Graph.imageElement(src);
            };
            /**
              * Gets local string.
              * @param key  The template key.
              * @param lang  The opitonal market code string for a sepecific one.
              */
            Templates.prototype.localString = function (key, lang) {
                return arguments.length > 1 ? this.strings.field(key, lang) : this.strings.field(key);
            };
            /**
              * Gets local string.
              * @param key  The template key.
              * @param lang  The opitonal market code string for a sepecific one.
              */
            Templates.prototype.localStringInHTML = function (key, lang) {
                return arguments.length > 1 ? this.strings.fieldInHTML(key, lang) : this.strings.fieldInHTML(key);
            };
            return Templates;
        }());
        Res.Templates = Templates;
        /**
          * String set.
          */
        var Strings = (function () {
            function Strings() {
                this._strings = { ww: {} };
                /**
                  * The market code for default language using.
                  */
                this.defaultLang = null;
            }
            /**
              * Registers a language pack.
              * @param lang  The market code.
              * @param value  The language pack.
              * @param override  true if override original one if existed; otherwise, false.
              */
            Strings.prototype.reg = function (lang, value, override) {
                if (override === void 0) { override = false; }
                if (!lang || lang == "")
                    return;
                var key = lang.toString().toLowerCase();
                if (override || !value || !this._strings[key]) {
                    this._strings[key] = value;
                }
                else {
                    var obj = this._strings[key];
                    for (var prop in value) {
                        obj[prop] = value[prop];
                    }
                }
            };
            /**
              * Gets or sets the string for a specific market.
              * @param lang  The market code.
              * @param key  The template key.
              * @param value  The opitonal value to set.
              */
            Strings.prototype.specificField = function (lang, key, value) {
                if (arguments.length > 2) {
                    var strings = this._lang(lang, true);
                    strings[key] = value;
                }
                return this._lang(lang)[key];
            };
            /**
              * Gets or sets local string.
              * @param key  The template key.
              * @param value  The opitonal value to set.
              */
            Strings.prototype.localField = function (key, value) {
                return arguments.length > 1 ? this.specificField(market(), key, value) : this.specificField(market(), key);
            };
            /**
              * Gets or sets global string.
              * @param key  The template key.
              * @param value  The opitonal value to set.
              */
            Strings.prototype.globalField = function (key, value) {
                return arguments.length > 1 ? this.specificField("ww", key, value) : this.specificField("ww", key);
            };
            /**
              * Copies a set of strings to an object as properties.
              * @param obj  The target object to copy to.
              * @param keys  The template keys.
              */
            Strings.prototype.copyFields = function (obj, keys) {
                var _this = this;
                if (!obj)
                    obj = {};
                if (keys == null) {
                    var lp = this._lang();
                    for (var key in lp) {
                        if (!key || typeof key !== "string")
                            continue;
                        obj[key] = lp[key];
                    }
                    return obj;
                }
                keys.forEach(function (key, i, arr) {
                    obj[key] = _this.localField(key);
                });
                return obj;
            };
            Strings.prototype.copyFieldToElement = function (key, element) {
                if (!key)
                    return null;
                var str = this.field(key);
                if (!element)
                    return str;
                if (!str)
                    str = "";
                else
                    str = AliHub.Common.Text.toHTML(str);
                AliHub.Collection.toArray(element).forEach(function (ele, i, arr) {
                    var dom = AliHub.Elements.getById(ele);
                    if (dom)
                        dom.innerHTML = str;
                });
                return str;
            };
            Strings.prototype.copyFieldToInputElement = function (key, element) {
                if (!key)
                    return null;
                var str = this.field(key);
                if (!element)
                    return str;
                if (!str)
                    str = "";
                AliHub.Collection.toArray(element).forEach(function (ele, i, arr) {
                    var dom = AliHub.Elements.getById(ele);
                    if (!!dom)
                        dom.value = str;
                });
                return str;
            };
            /**
              * Gets local string.
              * @param key  The template key.
              * @param lang  The opitonal market code string for a sepecific one.
              */
            Strings.prototype.field = function (key, lang) {
                var langCode = !lang || lang == "" ? market() : lang;
                if (!langCode || langCode == "")
                    langCode = "ww";
                var field = this.specificField(langCode, key);
                if (!!field || typeof field !== "undefined")
                    return field;
                while (langCode.lastIndexOf("-") > 1) {
                    langCode = langCode.substring(0, langCode.lastIndexOf("-"));
                    field = this.specificField(langCode, key);
                    if (!!field || typeof field !== "undefined")
                        return field;
                }
                field = this.globalField(key);
                if (!!field || typeof field !== "undefined" || !this.defaultLang)
                    return field;
                return this.specificField(this.defaultLang, key);
            };
            /**
              * Gets local HTML string.
              * @param key  The template key.
              * @param lang  The opitonal market code string for a sepecific one.
              */
            Strings.prototype.fieldInHTML = function (key, lang) {
                return AliHub.Common.Text.toHTML(arguments.length > 1 ? this.field(key, lang) : this.field(key), true);
            };
            Strings.prototype.toJSON = function () {
                return AliHub.Common.Text.serialize(this.copyFields({ type: "LocalStrings" }));
            };
            Strings.prototype._lang = function (lang, init) {
                if (lang == null)
                    lang = market();
                if (!lang || lang == "") {
                    return {};
                }
                lang = lang.toString().toLowerCase();
                if (!this._strings[lang]) {
                    if (init == true) {
                        this._strings[lang] = {};
                        return this._strings[lang];
                    }
                    return {};
                }
                return this._strings[lang];
            };
            return Strings;
        }());
        Res.Strings = Strings;
        function factory(extender) {
            return function () {
                var res = {
                    templates: function (subject, createIfExist) {
                        if (createIfExist === void 0) { createIfExist = false; }
                        if (typeof createIfExist !== "undefined" && createIfExist !== void 0)
                            return templates(subject, createIfExist);
                        else
                            return templates(subject);
                    },
                    iconfonts: function (subject, value) {
                        if (typeof value !== "undefined" && value !== void 0)
                            return iconfonts(subject, value);
                        else
                            return iconfonts(subject);
                    },
                    market: function (lang) {
                        if (typeof lang !== "undefined" && lang !== void 0)
                            return market(lang);
                        else
                            return market();
                    }
                };
                if (!!extender)
                    extender(res);
                return res;
            };
        }
        Res.factory = factory;
        /**
          * Gets a template set.
          * @param subject  The subject name.
          * @param createIfExist  A flag or handler for creation if the template set is empty currently.
          */
        function templates(subject, createIfExist) {
            if (createIfExist === void 0) { createIfExist = false; }
            if (!subject)
                return undefined;
            subject = subject.toString();
            if (subject === "")
                return undefined;
            var templ = _set.templ[subject];
            if (!templ && createIfExist) {
                _set.templ[subject] = new Templates(subject);
                if (typeof createIfExist === "function")
                    createIfExist(_set.templ[subject]);
            }
            return _set.templ[subject];
        }
        Res.templates = templates;
        /**
          * Gets or sets settings.
          * @param subject  The subject name.
          * @param key  The template key.
          * @param value  The optional value to set.
          */
        function settings(subject, key, value) {
            var templ = templates(subject, true);
            if (!templ)
                return undefined;
            if (arguments.length > 2) {
                templ.settings(key, value);
            }
            return templ.settings(key);
        }
        Res.settings = settings;
        /**
          * Gets or sets settings.
          * @param subject  The subject name.
          * @param key  The template key.
          * @param value  The optional value to set.
          */
        function settingsProp(subject, key, prop, value) {
            var templ = templates(subject, true);
            if (!templ)
                return undefined;
            if (arguments.length > 3) {
                templ.settingsProp(key, prop, value);
            }
            return templ.settingsProp(key, prop);
        }
        Res.settingsProp = settingsProp;
        /**
          * Gets or sets HTML template.
          * @param subject  The subject name.
          * @param key  The template key.
          * @param value  The optional value to set.
          */
        function html(subject, key, value) {
            var templ = templates(subject, true);
            if (arguments.length > 2) {
                templ.html(key, value);
            }
            return templ.html(key);
        }
        Res.html = html;
        /**
          * Gets or sets SVG template.
          * @param subject  The subject name.
          * @param key  The template key.
          * @param value  The optional value to set.
          */
        function svg(subject, key, value) {
            var templ = templates(subject, true);
            if (arguments.length > 2) {
                templ.svg(key, value);
            }
            return templ.svg(key);
        }
        Res.svg = svg;
        /**
          * Gets SVG source image object.
          * @param subject  The subject name.
          * @param key  The template key.
          * @param styleRef  The optional style references.
          */
        function svgImage(subject, key, styleRef) {
            var source = Res.svg(subject, key);
            return source ? { type: "svg", source: source, styleRef: styleRef } : null;
        }
        Res.svgImage = svgImage;
        /**
          * Gets SVG element from templates.
          * @param subject  The subject name.
          * @param key  The template key.
          * @param styleRef  The optional style references.
          */
        function svgElement(subject, key, styleRef) {
            var src = Res.svgImage(subject, key, styleRef);
            return AliHub.Graph.imageElement(src);
        }
        Res.svgElement = svgElement;
        function iconfonts(subject, value) {
            if (arguments.length > 1 && typeof value !== "boolean") {
                _set.icons[subject] = value;
            }
            var col = _set.icons[subject];
            if (!col) {
                col = new IconFontCollection(subject);
                if (value != null && value === true)
                    _set.icons[subject] = col;
            }
            return col;
        }
        Res.iconfonts = iconfonts;
        /**
          * Gets local string.
          * @param subject  The subject name.
          * @param key  The template key.
          * @param lang  The opitonal market code string for a sepecific one.
          */
        function strings(subject, key, lang) {
            var templ = templates(subject, true);
            return arguments.length > 2 ? templ.strings.field(key, lang) : templ.strings.field(key);
        }
        Res.strings = strings;
        /**
          * Gets or sets current market code.
          * @param lang  The optional market code to set.
          */
        function market(lang) {
            if (arguments.length > 0 && !!lang) {
                if (typeof lang === "string") {
                    _set.mkt = lang;
                }
                else if (typeof lang === "boolean") {
                    if (lang == true) {
                        var queryMkt = AliHub.Common.Text.trim(AliHub.Elements.getQuery("mkt"));
                        if (!!queryMkt) {
                            _set.mkt = queryMkt;
                        }
                        else if (!!document.documentElement.lang) {
                            _set.mkt = document.documentElement.lang;
                        }
                        else if (!!navigator.language) {
                            _set.mkt = navigator.language;
                        }
                        else if (!!navigator.userLanguage) {
                            _set.mkt = navigator.userLanguage;
                        }
                        else if (!!navigator.browserLanguage) {
                            _set.mkt = navigator.browserLanguage;
                        }
                        else if (!!navigator.systemLanguage) {
                            _set.mkt = navigator.systemLanguage;
                        }
                    }
                    else {
                        _set.mkt = "ww";
                    }
                }
                if (!!_set.mkt)
                    _set.mkt = _set.mkt.toString().toLowerCase();
            }
            else {
                if (_set.mkt == null)
                    market(true);
            }
            return _set.mkt;
        }
        Res.market = market;
        function builtIn() {
            return templates("AliHub.Quark", function (templ) {
                AliHub.Res.regLang(templ);
            });
        }
        Res.builtIn = builtIn;
    })(Res = AliHub.Res || (AliHub.Res = {}));
})(AliHub || (AliHub = {}));
/*  --------------------
 *  Users and social network - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  users.ts
 *  Description  Users and social network library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
/// <reference path="common.ts" />
/// <reference path="media.ts" />
var AliHub;
(function (AliHub) {
    var Users;
    (function (Users) {
        /**
          * Checks whether the current user has signed in.
          */
        function logined() {
            return !!Inner.me.profile;
        }
        Users.logined = logined;
        /**
          * Gets or sets principle for current user.
          * @param value  the principle to set as current.
          */
        function principle(value) {
            if (arguments.length > 0) {
                if (value && value.profile) {
                    Inner.me.profile = value.profile;
                    Inner.me.permission = !!value.permission ? value.permission : {};
                    Inner.me.contact = !!value.contact ? value.contact : {};
                }
                else {
                    Inner.me.profile = null;
                    Inner.me.permission = null;
                    Inner.me.contact = null;
                }
            }
            return Inner.me;
        }
        Users.principle = principle;
        /**
          * Gets or sets the profile for current user.
          * @param value  the user model to set as current user.
          */
        function profile(value) {
            if (arguments.length > 0) {
                if (value) {
                    Inner.me.profile = value;
                    if (Inner.me.profile.id != null && typeof Inner.me.profile.id === "number")
                        Inner.me.profile.id = Inner.me.profile.id.toString();
                }
                else {
                    Inner.me.profile = null;
                }
            }
            return Inner.me.profile;
        }
        Users.profile = profile;
        /**
          * Checks given user information is about me.
          * @param model  the user model to test.
          */
        function isMe(model) {
            var me = Users.profile();
            return model && me && me.id && (typeof model === "string" ? model === me.id : model.id === me.id);
        }
        Users.isMe = isMe;
        /**
          * Gets or sets the permission set for current user.
          * @param value  A dictionary to set permission.
          */
        function permissionSet(value) {
            if (arguments.length > 0) {
                Inner.me.permission = value;
            }
            return Inner.me.permission;
        }
        Users.permissionSet = permissionSet;
        /**
          * Checks if the current user has a permission.
          */
        function hasPermission(key, ignoreLogin) {
            if (ignoreLogin === void 0) { ignoreLogin = false; }
            if ((!ignoreLogin && !Inner.me.profile) || !Inner.me.permission)
                return false;
            var perm = Inner.me.permission[key];
            return perm === true || (typeof perm === "number" && perm === true);
        }
        Users.hasPermission = hasPermission;
        /**
          * Sets the permission for current user.
          */
        function configPermission(key, value) {
            if (!Inner.me.permission)
                Inner.me.permission = {};
            Inner.me.permission[key] = value;
        }
        Users.configPermission = configPermission;
        function session(key, value) {
            if (arguments.length > 1) {
                if (value == null)
                    delete Inner.session[key];
                else
                    Inner.session[key] = value;
            }
            return Inner.session[key];
        }
        Users.session = session;
        function fillSession(obj, ignoreIfExist) {
            if (ignoreIfExist === void 0) { ignoreIfExist = false; }
            var arr = [];
            for (var prop in obj) {
                if (!prop || typeof prop !== "string")
                    continue;
                if (Inner.session[prop] && ignoreIfExist)
                    continue;
                Inner.session[prop] = obj[prop];
                arr.push(prop);
            }
            return arr;
        }
        Users.fillSession = fillSession;
        /**
          * Profile card.
          */
        var ProfileCard = (function (_super) {
            __extends(ProfileCard, _super);
            /**
              * Initializes a new instance of the ProfileCard class.
              * @param id  Element ID. The content will be filled into this element to replace original ones.
              */
            function ProfileCard(id) {
                var _this = _super.call(this, id) || this;
                _this.addStyleRef("ali-part-user-profile-card");
                _this.refresh();
                return _this;
            }
            ProfileCard.prototype.refresh = function () {
                this.innerHTML("");
                var me = Users.principle();
                if (!me || !me.profile) {
                    return;
                }
                var profile = me.profile;
                this.appendElementByDef({
                    styleRef: "ali-container-main",
                    children: [
                        {
                            tagName: "img",
                            styleRef: "ali-part-user-card-avatar",
                            attr: {
                                src: profile.avatar,
                                alt: profile.nickname
                            }
                        },
                        {
                            tagName: "span",
                            attr: {
                                title: profile.nickname,
                                innerHTML: AliHub.Common.Text.toHTML(profile.nickname)
                            }
                        }
                    ]
                });
            };
            return ProfileCard;
        }(AliHub.Common.VisualControl));
        Users.ProfileCard = ProfileCard;
        var Inner = (function () {
            function Inner() {
            }
            return Inner;
        }());
        Inner.me = {
            profile: null,
            permission: null,
            contact: null
        };
        Inner.session = {};
        try {
            if (window._principleInfo)
                Users.principle(window._principleInfo);
            if (window._sessionInfo)
                Users.fillSession(window._sessionInfo);
        }
        catch (ex) { }
    })(Users = AliHub.Users || (AliHub.Users = {}));
})(AliHub || (AliHub = {}));
/*  --------------------
 *  Text - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  text.ts
 *  Description  Text, string and encode library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
/// <reference path="common.ts" />
var AliHub;
(function (AliHub) {
    var Common;
    (function (Common) {
        /**
          * Text and related.
          */
        var Text = (function () {
            function Text() {
            }
            /**
              * Copies a string.
              * @param value  The value to copy.
              */
            Text.copy = function (value) {
                if (!value)
                    return;
                var result = false;
                try {
                    var node = document.createElement("p");
                    node.innerHTML = Text.toHTML(value);
                    document.body.appendChild(node);
                    window.getSelection().removeAllRanges();
                    var range = document.createRange();
                    range.selectNode(node);
                    window.getSelection().addRange(range);
                    result = document.execCommand("copy");
                    try {
                        node.remove();
                    }
                    catch (ex) {
                        if (!!node.outerHTML)
                            node.outerHTML = "";
                    }
                    if (result)
                        return true;
                }
                catch (ex) { }
                if (window.clipboardData && window.clipboardData.setData) {
                    result = window.clipboardData.setData("Text", value);
                    if (result)
                        return true;
                }
                return true;
            };
            /**
              * Formats a string.
              * @param template  The source string.
              * @param parameters  The object or array of parameters.
              * @param urlEncode  A value indicating whether this is for URI components.
              * @param preBag  A property bag for preparing if in limited mode. Or null for complete mode.
              */
            Text.format = function (template, parameters, uriComponent, preBag, propPrefix) {
                if (uriComponent === void 0) { uriComponent = false; }
                if (preBag === void 0) { preBag = null; }
                var path = template;
                if (!path || !parameters)
                    return path;
                var now = new Date();
                var replaceH = function (propName, propValueStr) {
                    if (propValueStr == null)
                        propValueStr = "";
                    if (typeof propValueStr === "function" && !!propValueStr.subscribe)
                        propValueStr = propValueStr();
                    if (propValueStr instanceof Date)
                        propValueStr = Common.DateTime.toNumberString(propValueStr);
                    if (typeof propValueStr !== "string" && typeof propValueStr !== "number" && typeof propValueStr !== "boolean")
                        propValueStr = Text.serialize(propValueStr) || "";
                    propValueStr = propValueStr.toString();
                    if (uriComponent)
                        propValueStr = encodeURIComponent(propValueStr);
                    while (path.indexOf("{{" + propName + "}}") >= 0)
                        path = path.replace("{{" + propName + "}}", propValueStr);
                    while (path.indexOf("{" + propName + "}") >= 0)
                        path = path.replace("{" + propName + "}", propValueStr);
                    return path;
                };
                if (typeof parameters === "function" && !!(parameters.subscribe))
                    parameters = parameters();
                var propSerialized;
                if (!propPrefix && path.indexOf("{*}") >= 0) {
                    propSerialized = Text.serialize(parameters);
                }
                var propSerializedUrl;
                if (!propPrefix && path.indexOf("{*|url}") >= 0) {
                    propSerializedUrl = AliHub.Web.buildParaString(parameters);
                }
                if (!preBag) {
                    var mapping = [];
                    Text.inScope(path, "{", "}", "\\").forEach(function (item) {
                        if (!item || AliHub.Collection.contains(mapping, item, "key"))
                            return;
                        var path = (propPrefix ? item.replace(propPrefix + ".", "") : item).split(".");
                        mapping.push({ key: item, path: path, value: Common.Reflection.getProperty.apply(Common.Reflection, [parameters].concat(path)) });
                    });
                    var replaceMappingItem = function (key, value) {
                        var mapRecItem = AliHub.Collection.getItem(mapping, key, "key");
                        if (!mapRecItem)
                            mapping.push({ key: key, value: value });
                        else if (mapRecItem.value == null)
                            mapRecItem.value = value;
                    };
                    replaceMappingItem("timestamp", now);
                    replaceMappingItem("now", now);
                    if (propSerialized)
                        replaceMappingItem("*", propSerialized);
                    if (propSerializedUrl)
                        path = replaceH("*|url", propSerializedUrl);
                    mapping.forEach(function (item) {
                        path = replaceH(item.key, item.value);
                    });
                }
                else {
                    for (var index in parameters) {
                        if (index == null)
                            continue;
                        if (typeof index !== "string" && typeof index !== "number")
                            continue;
                        var ele = (propPrefix ? (propPrefix.toString() + ".") : "") + index.toString();
                        var prop = parameters[index];
                        path = replaceH(ele, prop);
                        if (prop && typeof prop !== "string" && typeof prop !== "number" && typeof prop !== "boolean")
                            path = Text.format(path, prop, uriComponent, [], ele);
                    }
                    if (typeof preBag === "function")
                        preBag = preBag();
                    if (preBag.forEach)
                        preBag.forEach(function (ele, i, arr) {
                            path = replaceH(ele, "");
                        });
                    ["id", "name", "created", "key", "i", "index", "q", "no", "num", "subject", "title", "keyword", "guid", "uuid", "query", "mkt", "lang", "nick", "nickname", "value", "code", "type"].forEach(function (ele, i, arr) {
                        ele = (!!propPrefix ? (propPrefix.toString() + ".") : "") + ele;
                        path = replaceH(ele, "");
                    });
                    path = replaceH("timestamp", now);
                    path = replaceH("now", now);
                    if (propSerialized)
                        path = replaceH("*", propSerialized);
                    if (propSerializedUrl)
                        path = replaceH("*|url", propSerializedUrl);
                }
                return path;
            };
            /**
              * Trims a string.
              * @param str  The string to trim.
              */
            Text.trim = function (str) {
                return str ? str.toString().replace(/(^\s*)|(\s*$)/g, "") : str;
            };
            /**
              * Left trims a string.
              * @param str  The string to remove left white spaces.
              */
            Text.leftTrim = function (str) {
                return str ? str.toString().replace(/(^\s*)/g, "") : str;
            };
            /**
              * Right trims a string.
              * @param str  The string to remove right white spaces.
              */
            Text.rightTrim = function (str) {
                return str ? str.toString().replace(/(\s*$)/g, "") : str;
            };
            /**
              * Converts HTML to text.
              * @param html  The HTML string.
              * @param emptyForNull  true if return empty string if input is null; otherwise, false.
              */
            Text.parseHTML = function (html, emptyForNull) {
                if (emptyForNull === void 0) { emptyForNull = false; }
                if (html == null)
                    return emptyForNull ? "" : null;
                var element = document.createElement("div");
                element.innerHTML = html.toString();
                var str = element.innerText || element.textContent;
                if (!str)
                    return "";
                return AliHub.Common.Text.trim(str.toString());
            };
            /**
              * Encodes text to HTML.
              * @param text  The text to encode.
              * @param emptyForNull  true if return empty string if input is null; otherwise, false.
              */
            Text.toHTML = function (text, emptyForNull) {
                if (emptyForNull === void 0) { emptyForNull = false; }
                if (!text)
                    return emptyForNull ? "" : null;
                return text.toString().replace(/&/g, "&amp;").replace(/\s/g, "&nbsp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&#39;");
            };
            /**
              * Serializes an object to JSON string.
              * @param obj  The object to serialize.
              */
            Text.serialize = function (obj, onlyJson) {
                if (onlyJson === void 0) { onlyJson = false; }
                if (obj == null)
                    return onlyJson ? "" : "null";
                if (typeof JSON !== "undefined" && (!onlyJson || onlyJson.toString().toLowerCase() === "full")) {
                    if (JSON && JSON.stringify)
                        return JSON.stringify(obj);
                }
                var jsonMode = "full";
                if (!onlyJson)
                    jsonMode = "full";
                else if (onlyJson === true)
                    jsonMode = "string";
                else
                    jsonMode = onlyJson.toString().toLowerCase();
                if (!jsonMode)
                    jsonMode = "full";
                if (obj.toJSON && typeof obj.toJSON === "function") {
                    obj = obj.toJSON();
                    if (typeof obj === "string")
                        return obj;
                }
                switch (typeof obj) {
                    case "string":
                        return jsonMode === "simple" || jsonMode === "string" ? obj : ("\"" + obj.replace(/\"/g, "\\\"") + "\"");
                    case "number":
                        return obj.toString();
                    case "boolean":
                        return obj ? "true" : "false";
                    default:
                        break;
                }
                if (obj instanceof Date) {
                    return obj.getTime().toString();
                }
                var str = "";
                if (obj instanceof Array) {
                    obj.forEach(function (ele, i, arr) {
                        str += ", " + Text.serialize(ele);
                    });
                    str = ("[" + str + "]").replace("[, ", "[");
                    if (jsonMode === "simple")
                        str = str.substring(1, str.length - 1);
                    return str;
                }
                if (typeof JSON !== "undefined") {
                    if (JSON && JSON.stringify)
                        return JSON.stringify(obj);
                }
                for (var prop in obj) {
                    if (!prop || typeof prop !== "string")
                        return;
                    str += ", \"" + prop + "\": " + Text.serialize(obj[prop]);
                }
                return ("{" + str + "}").replace("{, ", "{");
            };
            /**
              * Returns the position of the first occurrence of a substring.
              * @param searchString The substring to search for in the string
              * @param position The index at which to begin searching the String object. If omitted, search starts at the beginning of the string.
              * @param last true if search the last one of position items; otherwise, false.
              * @param negative true if search from last; otherwise, false.
              */
            Text.indexOf = function (str, q, last, negative) {
                if (last === void 0) { last = false; }
                if (negative === void 0) { negative = false; }
                var pos = {
                    start: -1,
                    end: -1,
                    q: null
                };
                if (str == null || q == null)
                    return pos;
                str = str.toString();
                AliHub.Collection.toArray(q, true, function (ele, i, arr) {
                    if (ele == null)
                        return;
                    if (typeof ele === "function")
                        ele = ele();
                    if (ele == null)
                        return;
                    switch (typeof ele) {
                        case "number":
                            if (isNaN(ele))
                                return;
                            if (ele < 0)
                                ele = str.length - ele;
                            if (negative) {
                                if (last ? ele >= pos.start && pos.start > -1 : ele <= pos.start)
                                    return;
                            }
                            else {
                                if (last ? ele <= pos.start : ele >= pos.start && pos.start > -1)
                                    return;
                            }
                            if (ele > str.length)
                                return;
                            pos.start = ele;
                            pos.end = ele;
                            pos.q = null;
                            return;
                        case "string":
                            if (ele.length < 1)
                                return;
                            var tempI = null;
                            if (negative) {
                                tempI = str.lastIndexOf(ele);
                                if (last ? tempI >= pos.start && pos.start > -1 : tempI <= pos.start)
                                    return;
                            }
                            else {
                                tempI = str.indexOf(ele);
                                if (last ? tempI <= pos.start : tempI >= pos.start && pos.start > -1)
                                    return;
                            }
                            if (tempI > str.length)
                                return;
                            pos.start = tempI;
                            pos.end = tempI + ele.length - 1;
                            pos.q = ele;
                            return;
                        default:
                            return;
                    }
                });
                return pos;
            };
            Text.inScope = function (str, left, right, ignorePrefix) {
                if (!str)
                    return [];
                var arr = [];
                var startPos = 0;
                while (true) {
                    var leftPos = str.indexOf(left, startPos);
                    if (leftPos < 0)
                        break;
                    var needPush = !(ignorePrefix && str.indexOf(ignorePrefix + left, startPos) === leftPos - ignorePrefix.length);
                    leftPos++;
                    var rightPos = str.indexOf(right, leftPos);
                    if (rightPos < 0)
                        break;
                    startPos = rightPos + 1;
                    if (needPush)
                        arr.push(str.substring(leftPos, rightPos));
                }
                return arr;
            };
            Text.isString = function (value) {
                return value != null && typeof value === "string";
            };
            Text.isNotEmptyString = function (value) {
                return !!value && typeof value === "string";
            };
            Text.isEmptyOrWhiteSpace = function (value) {
                var isStr = Text.isNotEmptyString(value);
                if (!isStr)
                    return false;
                return !!Text.trim(value);
            };
            Text.dataUrlToBlob = function (dataURL) {
                var BASE64_MARKER = ';base64,';
                if (dataURL.indexOf(BASE64_MARKER) == -1) {
                    var parts = dataURL.split(',');
                    var contentType = parts[0].split(':')[1];
                    var raw = decodeURIComponent(parts[1]);
                    return new Blob([raw], { type: contentType });
                }
                var parts = dataURL.split(BASE64_MARKER);
                var contentType = parts[0].split(':')[1];
                var raw = window.atob(parts[1]);
                var rawLength = raw.length;
                var uInt8Array = new Uint8Array(rawLength);
                for (var i = 0; i < rawLength; ++i) {
                    uInt8Array[i] = raw.charCodeAt(i);
                }
                return new Blob([uInt8Array], { type: contentType });
            };
            /**
               * Encodes to base64.
               * @param str The string to convert.
               */
            Text.base64encode = function (str) {
                var c1, c2, c3;
                var len = str.length;
                var i = 0;
                var out = "";
                while (i < len) {
                    c1 = str.charCodeAt(i++) & 0xff;
                    if (i == len) {
                        out += Text._base64EncodeChars.charAt(c1 >> 2);
                        out += Text._base64EncodeChars.charAt((c1 & 0x3) << 4);
                        out += "==";
                        break;
                    }
                    c2 = str.charCodeAt(i++);
                    if (i == len) {
                        out += Text._base64EncodeChars.charAt(c1 >> 2);
                        out += Text._base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                        out += Text._base64EncodeChars.charAt((c2 & 0xF) << 2);
                        out += "=";
                        break;
                    }
                    c3 = str.charCodeAt(i++);
                    out += Text._base64EncodeChars.charAt(c1 >> 2);
                    out += Text._base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += Text._base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                    out += Text._base64EncodeChars.charAt(c3 & 0x3F);
                }
                return out;
            };
            /**
             * Decodes from base64.
              * @param str The string to convert.
              */
            Text.base64decode = function (str) {
                var c1, c2, c3, c4;
                var len = str.length;
                var i = 0;
                var out = "";
                while (i < len) {
                    do {
                        c1 = Text._base64DecodeChars[str.charCodeAt(i++) & 0xff];
                    } while (i < len && c1 == -1);
                    if (c1 == -1)
                        break;
                    do {
                        c2 = Text._base64DecodeChars[str.charCodeAt(i++) & 0xff];
                    } while (i < len && c2 == -1);
                    if (c2 == -1)
                        break;
                    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
                    do {
                        c3 = str.charCodeAt(i++) & 0xff;
                        if (c3 == 61)
                            return out;
                        c3 = Text._base64DecodeChars[c3];
                    } while (i < len && c3 == -1);
                    if (c3 == -1)
                        break;
                    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
                    do {
                        c4 = str.charCodeAt(i++) & 0xff;
                        if (c4 == 61)
                            return out;
                        c4 = Text._base64DecodeChars[c4];
                    } while (i < len && c4 == -1);
                    if (c4 == -1)
                        break;
                    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
                }
                return out;
            };
            /**
              * Converts UTF-16 to UTF-8.
              * @param str The string to convert.
              */
            Text.utf16to8 = function (str) {
                var c;
                var out = "";
                var len = str.length;
                for (var i = 0; i < len; i++) {
                    c = str.charCodeAt(i);
                    if ((c >= 0x0001) && (c <= 0x007F)) {
                        out += str.charAt(i);
                    }
                    else {
                        if (c > 0x07FF) {
                            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                        }
                        else {
                            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                        }
                    }
                }
                return out;
            };
            /**
              * Converts UTF-8 to UTF-16.
              * @param str The string to convert.
              */
            Text.utf8to16 = function (str) {
                var c;
                var char2, char3;
                var out = "";
                var len = str.length;
                var i = 0;
                while (i < len) {
                    c = str.charCodeAt(i++);
                    switch (c >> 4) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                            // Number template - 0xxx xxxx
                            out += str.charAt(i - 1);
                            break;
                        case 12:
                        case 13:
                            // Number template - 110x xxxx 10xx xxxx
                            char2 = str.charCodeAt(i++);
                            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                            break;
                        case 14:
                            // Number template - 1110 xxxx 10xx xxxx 10xx xxxx
                            char2 = str.charCodeAt(i++);
                            char3 = str.charCodeAt(i++);
                            out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                            break;
                    }
                }
                return out;
            };
            return Text;
        }());
        Text._base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        Text._base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
        Common.Text = Text;
    })(Common = AliHub.Common || (AliHub.Common = {}));
})(AliHub || (AliHub = {}));
/*  --------------------
 *  Web - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  web.ts
 *  Description  Web library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
/// <reference path="text.ts" />
var AliHub;
(function (AliHub) {
    var Web;
    (function (Web) {
        /**
         * REST job.
         */
        var RestJob = (function () {
            function RestJob() {
            }
            /**
              * Gets or sets default instance.
              */
            RestJob.instance = function (value) {
                if (arguments.length > 0) {
                    RestJob._instance = value;
                }
                if (!RestJob._instance)
                    RestJob._instance = new RestJob();
                return RestJob._instance;
            };
            /**
              * Sends by POST.
              */
            RestJob.postInfo = function (template, parameters, data, canBeEmpty, validation) {
                if (canBeEmpty === void 0) { canBeEmpty = true; }
                if (validation === void 0) { validation = null; }
                return RestJob.instance() ? RestJob.instance().postInfo(template, parameters, data, canBeEmpty, validation) : null;
            };
            /**
              * Sends by POST.
              */
            RestJob.postEmpty = function (template, parameters, data) {
                return RestJob.instance() ? RestJob.instance().postEmpty(template, parameters, data) : null;
            };
            /**
              * Sends by GET.
              */
            RestJob.getInfo = function (template, parameters, canBeEmpty, validation) {
                if (canBeEmpty === void 0) { canBeEmpty = true; }
                if (validation === void 0) { validation = null; }
                return RestJob.instance() ? RestJob.instance().getInfo(template, parameters, canBeEmpty, validation) : null;
            };
            /**
              * Sends by GET.
              */
            RestJob.getEmpty = function (template, parameters) {
                return RestJob.instance() ? RestJob.instance().getEmpty(template, parameters) : null;
            };
            /**
              * Sends by GET to resolve a string.
              */
            RestJob.getString = function (template, parameters, canBeEmpty) {
                if (canBeEmpty === void 0) { canBeEmpty = true; }
                return RestJob.instance() ? RestJob.instance().getString(template, parameters, canBeEmpty) : null;
            };
            /**
              * Sends by POST to resolve response JSON.
              */
            RestJob.prototype.postInfo = function (template, parameters, data, canBeEmpty, validation, convertor) {
                if (canBeEmpty === void 0) { canBeEmpty = true; }
                if (validation === void 0) { validation = null; }
                var deferred = AliHub.Common.deferred();
                if (!deferred)
                    return null;
                var path = AliHub.Common.Text.format(template, parameters, true);
                if (!path) {
                    AliHub.Common.rejectDeferred(deferred, "empty path", path);
                    return deferred.promise();
                }
                var callbackQ = Web.callbackQuery(path);
                if (callbackQ && (path.indexOf("&callbacktype=message") > 0 || path.indexOf("?callbacktype=message") > 0)) {
                    var form = AliHub.Elements.hiddenForm(path);
                    form.addSet(data);
                    form.submit().then(function (r) {
                        deferred.resolve(r.result);
                        form.dispose();
                    }, function (reason) {
                        deferred.reject(reason);
                        form.dispose();
                    });
                }
                else if (path.indexOf("&enablecors=true") > 0 || path.indexOf("?enablecors=true") > 0) {
                    if (this._jQueryAjax(deferred, path, "POST", data, true, canBeEmpty, null, null)
                        || this._fetchResp(deferred, path, "POST", data, true, canBeEmpty, validation, convertor))
                        return deferred.promise();
                    else
                        AliHub.Common.rejectDeferred(deferred, "cannot send cors request", path);
                    return deferred.promise();
                }
                if (typeof jQuery !== "undefined") {
                    if (jQuery && jQuery.post) {
                        jQuery.post(path, data, function (actionResult) {
                            if (!canBeEmpty && actionResult == null) {
                                AliHub.Common.rejectDeferred(deferred, "empty response", path);
                                return deferred.promise();
                            }
                            if (validation && !validation(actionResult)) {
                                AliHub.Common.rejectDeferred(deferred, "failed to validate", path);
                                return deferred.promise();
                            }
                            deferred.resolve(convertor ? convertor(actionResult) : actionResult);
                        }, "json").fail(function (ei) { AliHub.Common.rejectDeferred(deferred, "network error", ei); });
                        return deferred.promise();
                    }
                }
                if (path.indexOf("&callback=") > 0 || path.indexOf("?callback=") >= 0)
                    AliHub.Common.rejectDeferred(deferred, "jsonp is not implemented", path);
                else if (this._fetchResp(deferred, path, "POST", data, false, canBeEmpty, validation, convertor))
                    return deferred.promise();
                else
                    AliHub.Common.rejectDeferred(deferred, "fetch api is not supported", path);
                return deferred.promise();
            };
            /**
              * Sends by POST without response.
              */
            RestJob.prototype.postEmpty = function (template, parameters, data) {
                var deferred = AliHub.Common.deferred();
                if (!deferred)
                    return null;
                var path = AliHub.Common.Text.format(template, parameters, true);
                if (!path) {
                    AliHub.Common.rejectDeferred(deferred, "empty path", path);
                    return deferred.promise();
                }
                var callbackQ = Web.callbackQuery(path);
                if (callbackQ && (path.indexOf("&callbacktype=message") > 0 || path.indexOf("?callbacktype=message") > 0)) {
                    var form = AliHub.Elements.hiddenForm(path);
                    form.addSet(data);
                    form.submit(true);
                    setTimeout(function () {
                        form.dispose();
                    }, 30000);
                }
                else if (path.indexOf("&enablecors=true") > 0 || path.indexOf("?enablecors=true") > 0) {
                    if (this._jQueryAjax(deferred, path, "POST", data, true, "avoid", null, null)
                        || this._fetchResp(deferred, path, "POST", data, true, "avoid", null, null))
                        return deferred.promise();
                    else
                        AliHub.Common.rejectDeferred(deferred, "cannot send cors request", path);
                    return deferred.promise();
                }
                if (typeof jQuery !== "undefined") {
                    if (jQuery && jQuery.post) {
                        jQuery.post(path, data, function (actionResult) {
                            deferred.resolve(true);
                        }, "json").fail(function (ei) { AliHub.Common.rejectDeferred(deferred, "network error", ei); });
                        return deferred.promise();
                    }
                }
                if (path.indexOf("&callback=") > 0 || path.indexOf("?callback=") >= 0)
                    AliHub.Common.rejectDeferred(deferred, "jsonp is not implemented", path);
                else if (path.indexOf("callback=") < 0 && this._fetchResp(deferred, path, "POST", data, false, "avoid", null, null))
                    return deferred.promise();
                else
                    AliHub.Common.rejectDeferred(deferred, "fetch api is not supported", path);
                return deferred.promise();
            };
            /**
              * Sends by GET to resolve response JSON.
              */
            RestJob.prototype.getInfo = function (template, parameters, canBeEmpty, validation, convertor) {
                if (canBeEmpty === void 0) { canBeEmpty = true; }
                if (validation === void 0) { validation = null; }
                var deferred = AliHub.Common.deferred();
                var path = AliHub.Common.Text.format(template, parameters, true);
                if (!path) {
                    AliHub.Common.rejectDeferred(deferred, "empty path", path);
                    return deferred.promise();
                }
                if (path.indexOf("&enablecors=true") > 0 || path.indexOf("?enablecors=true") > 0) {
                    if (this._jQueryAjax(deferred, path, "GET", null, true, canBeEmpty, validation, convertor)
                        || this._fetchResp(deferred, path, "GET", null, true, canBeEmpty, validation, convertor))
                        return deferred.promise();
                    else
                        AliHub.Common.rejectDeferred(deferred, "cannot send cors request", path);
                    return deferred.promise();
                }
                if (typeof jQuery !== "undefined") {
                    if (jQuery && jQuery.getJSON) {
                        jQuery.getJSON(path, function (actionResult) {
                            if (!canBeEmpty && actionResult == null) {
                                AliHub.Common.rejectDeferred(deferred, "empty response", path);
                                return deferred.promise();
                            }
                            if (validation && !validation(actionResult)) {
                                AliHub.Common.rejectDeferred(deferred, "failed to validate", path);
                                return deferred.promise();
                            }
                            deferred.resolve(convertor ? convertor(actionResult) : actionResult);
                        }).fail(function (ei) { AliHub.Common.rejectDeferred(deferred, "network error", ei); });
                        return deferred.promise();
                    }
                }
                if (path.indexOf("&callback=") > 0 || path.indexOf("?callback=") >= 0)
                    AliHub.Common.rejectDeferred(deferred, "jsonp is not implemented", path);
                else if (this._fetchResp(deferred, path, "GET", null, false, canBeEmpty, validation, convertor))
                    return deferred.promise();
                else
                    AliHub.Common.rejectDeferred(deferred, "fetch api is not supported", path);
                return deferred.promise();
            };
            /**
              * Sends by GET without response.
              */
            RestJob.prototype.getEmpty = function (template, parameters) {
                var deferred = AliHub.Common.deferred();
                var path = AliHub.Common.Text.format(template, parameters, true);
                if (!path) {
                    AliHub.Common.rejectDeferred(deferred, "empty path", path);
                    return deferred.promise();
                }
                if (path.indexOf("&enablecors=true") > 0 || path.indexOf("?enablecors=true") > 0) {
                    if (this._jQueryAjax(deferred, path, "GET", null, true, "avoid", null, null)
                        || this._fetchResp(deferred, path, "GET", null, true, "avoid", null, null))
                        return deferred.promise();
                    else
                        AliHub.Common.rejectDeferred(deferred, "cannot send cors request", path);
                    return deferred.promise();
                }
                if (typeof jQuery !== "undefined") {
                    if (jQuery && jQuery.get) {
                        jQuery.get(path, function (actionResult) {
                            deferred.resolve(true);
                        }).fail(function (ei) { AliHub.Common.rejectDeferred(deferred, "network error", ei); });
                        ;
                        return deferred.promise();
                    }
                }
                if (path.indexOf("&callback=") > 0 || path.indexOf("?callback=") >= 0)
                    AliHub.Common.rejectDeferred(deferred, "jsonp is not implemented", path);
                else if (this._fetchResp(deferred, path, "GET", null, false, "avoid", null, null))
                    return deferred.promise();
                else
                    AliHub.Common.rejectDeferred(deferred, "fetch api is not supported", path);
                return deferred.promise();
            };
            /**
              * Sends by GET to resolve a string.
              */
            RestJob.prototype.getString = function (template, parameters, canBeEmpty) {
                if (canBeEmpty === void 0) { canBeEmpty = true; }
                var deferred = AliHub.Common.deferred();
                if (!deferred)
                    return null;
                var path = AliHub.Common.Text.format(template, parameters, true);
                if (!path) {
                    AliHub.Common.rejectDeferred(deferred, "empty path", path);
                    return deferred.promise();
                }
                if (path.indexOf("&enablecors=true") > 0 || path.indexOf("?enablecors=true") > 0) {
                    if (this._jQueryAjax(deferred, path, "GET", null, true, canBeEmpty, null, null)
                        || this._fetchResp(deferred, path, "GET", null, true, canBeEmpty, null, null))
                        return deferred.promise();
                    else
                        AliHub.Common.rejectDeferred(deferred, "cannot send cors request", path);
                    return deferred.promise();
                }
                if (typeof jQuery !== "undefined") {
                    if (jQuery && jQuery.get) {
                        jQuery.get(path, function (actionResult) {
                            if (!canBeEmpty && actionResult == null) {
                                deferred.reject();
                            }
                            deferred.resolve(actionResult);
                        }).fail(function (ei) { AliHub.Common.rejectDeferred(deferred, "network error", ei); });
                        return deferred.promise();
                    }
                }
                if (path.indexOf("&callback=") > 0 || path.indexOf("?callback=") >= 0)
                    AliHub.Common.rejectDeferred(deferred, "jsonp is not implemented", path);
                else if (this._fetchResp(deferred, path, "GET", null, false, canBeEmpty, null, null))
                    return deferred.promise();
                else
                    AliHub.Common.rejectDeferred(deferred, "fetch api is not supported", path);
                return deferred.promise();
            };
            RestJob.prototype._jQueryAjax = function (deferred, path, method, data, cors, canBeEmpty, validation, convertor) {
                if (validation === void 0) { validation = null; }
                if (typeof jQuery === "undefined")
                    return false;
                if (!jQuery || !jQuery.ajax)
                    return false;
                var options = {
                    type: method,
                    url: path,
                    data: data,
                    dataType: "json",
                    success: function (actionResult) {
                        if (canBeEmpty === "avoid") {
                            deferred.resolve(true);
                        }
                        else {
                            if (!canBeEmpty && actionResult == null) {
                                deferred.reject();
                            }
                            if (validation && !validation(actionResult)) {
                                deferred.reject();
                            }
                            deferred.resolve(convertor ? convertor(actionResult) : actionResult);
                        }
                    }
                };
                if (cors) {
                    options.crossDomain = true;
                    options.xhrFields = { withCredentials: true };
                }
                try {
                    jQuery.ajax(options).fail(function (ei) { AliHub.Common.rejectDeferred(deferred, "network error", ei); });
                    return true;
                }
                catch (ex) {
                    return false;
                }
            };
            RestJob.prototype._fetchResp = function (deferred, path, method, data, cors, canBeEmpty, validation, convertor) {
                if (validation === void 0) { validation = null; }
                if (typeof RestJob.fetch !== "function")
                    return false;
                var options = {
                    method: method
                };
                if (cors)
                    options.mode = "cors";
                if (data) {
                    try {
                        if (typeof data.append === "function" || data instanceof ArrayBuffer || data instanceof Blob || data instanceof File) {
                            if (!data.needSerialize)
                                options.body = data;
                        }
                    }
                    catch (ex) { }
                    if (!options.body)
                        options.body = Web.buildParaString(data);
                }
                try {
                    RestJob.fetch(path, options).then(function (response) {
                        if (!response.ok) {
                            AliHub.Common.rejectDeferred(deferred, "response status error");
                            return;
                        }
                        if (canBeEmpty === "avoid")
                            deferred.resolve(true);
                        else
                            response.text().then(function (respJson) {
                                if (!canBeEmpty && respJson == null) {
                                    AliHub.Common.rejectDeferred(deferred, "empty response", path);
                                    return;
                                }
                                if (validation && !validation(respJson)) {
                                    AliHub.Common.rejectDeferred(deferred, "failed to validate", path);
                                    return;
                                }
                                deferred.resolve(convertor ? convertor(respJson) : respJson);
                            }, function (exJson) {
                                AliHub.Common.rejectDeferred(deferred, "parse error", exJson);
                            });
                    }, function (exResp) {
                        AliHub.Common.rejectDeferred(deferred, "fetch error", exResp);
                    });
                    return true;
                }
                catch (ex) {
                    return false;
                }
            };
            return RestJob;
        }());
        RestJob.fetch = window.fetch;
        Web.RestJob = RestJob;
        /**
          * Data package accessing job.
          */
        var DataPackageJob = (function () {
            function DataPackageJob() {
            }
            /**
              * Gets or sets default instance.
              */
            DataPackageJob.instance = function (value) {
                if (arguments.length > 0) {
                    DataPackageJob._instance = value;
                }
                if (!DataPackageJob._instance)
                    DataPackageJob._instance = new DataPackageJob();
                return DataPackageJob._instance;
            };
            /**
              * Sends by POST.
              */
            DataPackageJob.postInfo = function (template, parameters, data, canBeEmpty, convertor) {
                if (canBeEmpty === void 0) { canBeEmpty = true; }
                if (typeof data === "function")
                    data = data();
                return DataPackageJob.instance() ? DataPackageJob.instance().postInfo(template, parameters, data, canBeEmpty, convertor) : null;
            };
            /**
              * Sends by POST.
              */
            DataPackageJob.postEmpty = function (template, parameters, data) {
                if (typeof data === "function")
                    data = data();
                return DataPackageJob.instance() ? DataPackageJob.instance().postEmpty(template, parameters, data) : null;
            };
            /**
              * Sends by GET.
              */
            DataPackageJob.getInfo = function (template, parameters, canBeEmpty, convertor) {
                if (canBeEmpty === void 0) { canBeEmpty = true; }
                return DataPackageJob.instance() ? DataPackageJob.instance().getInfo(template, parameters, canBeEmpty, convertor) : null;
            };
            /**
              * Sends by GET.
              */
            DataPackageJob.getEmpty = function (template, parameters) {
                return DataPackageJob.instance() ? DataPackageJob.instance().getEmpty(template, parameters) : null;
            };
            /**
              * Sets static data.
              */
            DataPackageJob.staticInfo = function (data) {
                return DataPackageJob.instance() ? DataPackageJob.instance().staticInfo(data) : null;
            };
            /**
              * Sets empty data.
              */
            DataPackageJob.staticEmpty = function () {
                return DataPackageJob.instance() ? DataPackageJob.instance().staticEmpty() : null;
            };
            /**
              * Updgrade package.
              */
            DataPackageJob.upgradePackage = function (value, sent) {
                var copied = {};
                try {
                    copied = AliHub.Common.Reflection.copy(value);
                }
                catch (ex) { }
                var originalValue = value;
                sent = AliHub.Common.DateTime.parse(sent);
                if (originalValue == null || typeof originalValue === "string" || typeof originalValue === "number" || typeof originalValue === "boolean" || originalValue instanceof Array) {
                    return {
                        data: originalValue,
                        result: originalValue,
                        success: true,
                        timestamp: new Date(),
                        message: null,
                        sent: sent,
                        received: new Date(),
                        info: copied
                    };
                }
                if (originalValue.success != null) {
                    if (originalValue.data == null)
                        originalValue.data = originalValue.content || originalValue.result || originalValue.resultData;
                    if (originalValue.message == null && originalValue.errorMsg != null)
                        originalValue.message = originalValue.errorMsg || originalValue.errMsg || originalValue.exMsg;
                    originalValue.sent = sent;
                    originalValue.received = new Date();
                    originalValue.result = originalValue.data;
                    originalValue.info = copied;
                    return originalValue;
                }
                var opc = originalValue;
                if (opc.isSuccess == null && value.result != null) {
                    return {
                        data: originalValue.data,
                        success: originalValue.result === "true" || originalValue.result === true,
                        timestamp: originalValue.timestamp != null ? originalValue.timestamp : new Date(),
                        message: opc.errMsg != null ? opc.errMsg : originalValue.message,
                        sent: sent,
                        received: new Date(),
                        info: copied
                    };
                }
                if (opc.isSuccess == null && value.status != null) {
                    return {
                        data: originalValue.data || originalValue.result || originalValue.resultData,
                        result: originalValue.data || originalValue.result || originalValue.resultData,
                        success: originalValue.status === 1 || originalValue.status === true || originalValue.status === "ok" || originalValue.status === "Ok" || originalValue.status === "OK",
                        timestamp: originalValue.timestamp != null ? originalValue.timestamp : new Date(),
                        message: opc.errMsg != null ? opc.errMsg : originalValue.message,
                        sent: sent,
                        received: new Date(),
                        info: copied
                    };
                }
                if (opc.isSuccess == null) {
                    return {
                        data: opc,
                        result: opc,
                        success: true,
                        timestamp: new Date(),
                        message: null,
                        sent: sent,
                        received: new Date(),
                        info: copied
                    };
                }
                var result = {
                    data: null,
                    message: opc.errMsg,
                    success: opc.isSuccess,
                    timestamp: new Date(),
                    sent: sent,
                    received: new Date(),
                    info: copied
                };
                if (opc.data) {
                    result.data = opc.data.result;
                    if (opc.data.timestamp != null)
                        result.timestamp = opc.data.timestamp;
                }
                result.result = result.data;
                return result;
            };
            /**
              * Sends by POST.
              */
            DataPackageJob.prototype.postInfo = function (template, parameters, data, canBeEmpty, convertor) {
                if (canBeEmpty === void 0) { canBeEmpty = true; }
                var deferred = AliHub.Common.deferred();
                if (!deferred)
                    return null;
                var sent = new Date();
                var postData = {};
                var templateLower = template ? template.toString().toLowerCase() : null;
                if (data == null) {
                    postData = null;
                }
                else if (typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
                    postData = data;
                }
                else if (templateLower && (templateLower.indexOf("&requestencode=form") > 0 || templateLower.indexOf("?requestencode=form") > 0)) {
                    postData = data;
                }
                else {
                    var serialize = null;
                    var onlyJson = "full";
                    if (templateLower) {
                        if (templateLower.indexOf("&requestencode=base64") > 0 || templateLower.indexOf("?requestencode=base64") > 0)
                            serialize = AliHub.Common.Text.base64encode;
                        else if (templateLower.indexOf("&requestencode=uri") > 0 || templateLower.indexOf("?requestencode=uri") > 0)
                            serialize = encodeURIComponent;
                        if (templateLower.indexOf("&requestfield=simple") > 0 || templateLower.indexOf("?requestfield=simple") > 0)
                            onlyJson = "simple";
                        else if (templateLower.indexOf("&requestfield=string") > 0 || templateLower.indexOf("?requestfield=string") > 0)
                            onlyJson = "string";
                    }
                    for (var key in data) {
                        if (key == null || (typeof key !== "string" && typeof key !== "number"))
                            continue;
                        var fieldStr = AliHub.Common.Text.serialize(data[key], onlyJson);
                        if (serialize)
                            fieldStr = serialize(fieldStr);
                        postData[key] = fieldStr;
                    }
                }
                Web.RestJob.postInfo(template, parameters, postData, canBeEmpty).then(function (actionResult) {
                    actionResult = DataPackageJob.upgradePackage(actionResult, sent);
                    actionResult.timestamp = AliHub.Common.DateTime.parse(actionResult.timestamp);
                    if (!actionResult.success) {
                        AliHub.Common.rejectDeferred(deferred, "failed result", actionResult);
                        return;
                    }
                    if (!canBeEmpty && actionResult.data == null) {
                        AliHub.Common.rejectDeferred(deferred, "empty result", actionResult);
                        return;
                    }
                    if (convertor)
                        actionResult.data = convertor(actionResult.data);
                    deferred.resolve(actionResult);
                }, function (ei) { deferred.reject(ei); });
                return deferred.promise();
            };
            /**
              * Sends by POST.
              */
            DataPackageJob.prototype.postEmpty = function (template, parameters, data) {
                var deferred = AliHub.Common.deferred();
                if (!deferred)
                    return null;
                var sent = new Date();
                var postData = {};
                var templateLower = template ? template.toString().toLowerCase() : null;
                if (data == null) {
                    postData = null;
                }
                else if (typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
                    postData = data;
                }
                else if (templateLower && (templateLower.indexOf("&requestencode=form") > 0 || templateLower.indexOf("?requestencode=form") > 0)) {
                    postData = data;
                }
                else {
                    var serialize = null;
                    if (template) {
                        if (templateLower.indexOf("&requestencode=base64") > 0 || templateLower.indexOf("?requestencode=base64") > 0)
                            serialize = AliHub.Common.Text.base64encode;
                        else if (templateLower.indexOf("&requestencode=uri") > 0 || templateLower.indexOf("?requestencode=uri") > 0)
                            serialize = encodeURIComponent;
                    }
                    for (var key in data) {
                        if (key == null || (typeof key !== "string" && typeof key !== "number"))
                            continue;
                        var fieldStr = AliHub.Common.Text.serialize(data[key]);
                        if (serialize)
                            fieldStr = serialize(fieldStr);
                        postData[key] = fieldStr;
                    }
                }
                Web.RestJob.postInfo(template, parameters, postData, true).then(function (actionResult) {
                    actionResult = DataPackageJob.upgradePackage(actionResult, sent);
                    actionResult.timestamp = AliHub.Common.DateTime.parse(actionResult.timestamp);
                    if (!actionResult.success)
                        AliHub.Common.rejectDeferred(deferred, "failed result", actionResult);
                    else
                        deferred.resolve({ success: true, timestamp: AliHub.Common.DateTime.parse(actionResult.timestamp) });
                }, function (ei) { deferred.reject(ei); });
                return deferred.promise();
            };
            /**
              * Sends by GET.
              */
            DataPackageJob.prototype.getInfo = function (template, parameters, canBeEmpty, convertor) {
                if (canBeEmpty === void 0) { canBeEmpty = true; }
                var deferred = AliHub.Common.deferred();
                if (!deferred)
                    return null;
                var sent = new Date();
                Web.RestJob.getInfo(template, parameters, canBeEmpty).then(function (actionResult) {
                    actionResult = DataPackageJob.upgradePackage(actionResult, sent);
                    actionResult.timestamp = AliHub.Common.DateTime.parse(actionResult.timestamp);
                    if (!actionResult.success) {
                        AliHub.Common.rejectDeferred(deferred, "failed result", actionResult);
                        return;
                    }
                    if (!canBeEmpty && actionResult.data == null) {
                        AliHub.Common.rejectDeferred(deferred, "empty result", actionResult);
                        return;
                    }
                    if (convertor)
                        actionResult.data = convertor(actionResult.data);
                    deferred.resolve(actionResult);
                }, function (ei) { deferred.reject(ei); });
                return deferred.promise();
            };
            /**
              * Sends by GET.
              */
            DataPackageJob.prototype.getEmpty = function (template, parameters) {
                var deferred = AliHub.Common.deferred();
                if (!deferred)
                    return null;
                var sent = new Date();
                Web.RestJob.getInfo(template, parameters, true).then(function (actionResult) {
                    actionResult = DataPackageJob.upgradePackage(actionResult, sent);
                    actionResult.timestamp = AliHub.Common.DateTime.parse(actionResult.timestamp);
                    if (!actionResult.success)
                        AliHub.Common.rejectDeferred(deferred, "failed result", actionResult);
                    else
                        deferred.resolve({ success: true, timestamp: AliHub.Common.DateTime.parse(actionResult.timestamp) });
                }, function (ei) { deferred.reject(ei); });
                return deferred.promise();
            };
            /**
              * Sets static data.
              */
            DataPackageJob.prototype.staticInfo = function (data) {
                var deferred = AliHub.Common.deferred();
                if (!deferred)
                    return null;
                var sent = new Date();
                deferred.resolve({
                    success: true,
                    data: data,
                    result: data,
                    timestamp: new Date(),
                    sent: sent,
                    received: new Date()
                });
                return deferred.promise();
            };
            /**
              * Sets empty data.
              */
            DataPackageJob.prototype.staticEmpty = function () {
                var deferred = AliHub.Common.deferred();
                if (!deferred)
                    return null;
                var sent = new Date();
                deferred.resolve({
                    success: true,
                    timestamp: new Date(),
                    sent: sent,
                    received: new Date()
                });
                return deferred.promise();
            };
            return DataPackageJob;
        }());
        Web.DataPackageJob = DataPackageJob;
        var StaticDataPackageResolver = (function () {
            function StaticDataPackageResolver() {
            }
            StaticDataPackageResolver.prototype.data = function (value) {
                if (arguments.length > 0) {
                    this._data = value;
                }
                return this._data;
            };
            StaticDataPackageResolver.prototype.resolve = function () {
                return DataPackageJob.staticInfo(this._data);
            };
            return StaticDataPackageResolver;
        }());
        Web.StaticDataPackageResolver = StaticDataPackageResolver;
        var BaseDataPackageResolver = (function () {
            function BaseDataPackageResolver(info, subject, key) {
                this.info = info || { template: null };
                if (subject && key)
                    resolver(subject, key, this.info);
            }
            BaseDataPackageResolver.prototype.pathTemplate = function (value) {
                if (arguments.length > 0)
                    this.info.template = value;
                return this.info.template;
            };
            return BaseDataPackageResolver;
        }());
        Web.BaseDataPackageResolver = BaseDataPackageResolver;
        var DataPackageResolver = (function (_super) {
            __extends(DataPackageResolver, _super);
            function DataPackageResolver(info, subject, key) {
                return _super.call(this, info, subject, key) || this;
            }
            DataPackageResolver.prototype.resolve = function (model) {
                if (model === void 0) { model = null; }
                var info = this.info;
                if (info.mock)
                    return info.mock(model, info, null);
                var url = AliHub.Common.Text.format(info.template, null, true, info.preBag);
                return DataPackageJob.getInfo(url, model, info.canBeEmpty, info.convertor);
            };
            return DataPackageResolver;
        }(BaseDataPackageResolver));
        Web.DataPackageResolver = DataPackageResolver;
        var RequestDataPackageResolver = (function (_super) {
            __extends(RequestDataPackageResolver, _super);
            function RequestDataPackageResolver(info, subject, key) {
                return _super.call(this, info, subject, key) || this;
            }
            RequestDataPackageResolver.prototype.resolve = function (model) {
                var info = this.info;
                if (info.mock)
                    return info.mock(model, info, null);
                var url = AliHub.Common.Text.format(info.template, model, true, info.preBag);
                return DataPackageJob.getInfo(url, info, info.canBeEmpty, info.convertor);
            };
            return RequestDataPackageResolver;
        }(BaseDataPackageResolver));
        Web.RequestDataPackageResolver = RequestDataPackageResolver;
        var IdentifiedDataPackageResolver = (function (_super) {
            __extends(IdentifiedDataPackageResolver, _super);
            function IdentifiedDataPackageResolver(info, subject, key) {
                return _super.call(this, info, subject, key) || this;
            }
            IdentifiedDataPackageResolver.prototype.resolve = function (id, model) {
                if (!model)
                    model = {};
                model.id = id;
                var info = this.info;
                if (info.mock)
                    return info.mock(model, info, null);
                var url = AliHub.Common.Text.format(info.template, model, true, info.preBag);
                return DataPackageJob.getInfo(url, info, info.canBeEmpty, info.convertor);
            };
            return IdentifiedDataPackageResolver;
        }(BaseDataPackageResolver));
        Web.IdentifiedDataPackageResolver = IdentifiedDataPackageResolver;
        var NamedDataPackageResolver = (function (_super) {
            __extends(NamedDataPackageResolver, _super);
            function NamedDataPackageResolver(info, subject, key) {
                return _super.call(this, info, subject, key) || this;
            }
            NamedDataPackageResolver.prototype.resolve = function (name, model) {
                if (!model)
                    model = {};
                model.name = name;
                var info = this.info;
                if (info.mock)
                    return info.mock(model, info, null);
                var url = AliHub.Common.Text.format(info.template, model, true, info.preBag);
                return DataPackageJob.getInfo(url, info, info.canBeEmpty, info.convertor);
            };
            return NamedDataPackageResolver;
        }(BaseDataPackageResolver));
        Web.NamedDataPackageResolver = NamedDataPackageResolver;
        var PostDataPackageResolver = (function (_super) {
            __extends(PostDataPackageResolver, _super);
            function PostDataPackageResolver(info, subject, key) {
                return _super.call(this, info, subject, key) || this;
            }
            PostDataPackageResolver.prototype.resolve = function (model, data) {
                var info = this.info;
                if (info.mock)
                    return info.mock(model, info, data);
                var url = AliHub.Common.Text.format(info.template, model, true, info.preBag);
                return DataPackageJob.postInfo(url, info, data, info.canBeEmpty, info.convertor);
            };
            return PostDataPackageResolver;
        }(BaseDataPackageResolver));
        Web.PostDataPackageResolver = PostDataPackageResolver;
        /**
          * Heartbeat.
          */
        var Heartbeat = (function () {
            function Heartbeat() {
            }
            Heartbeat.prototype.ping = function (input) {
                return DataPackageJob.postInfo(this.pathTemplate, null, input);
            };
            /**
              * Enables heartbeat.
              */
            Heartbeat.enable = function () {
                Heartbeat._check();
                Heartbeat._enabled = true;
            };
            /**
              * Registers handler.
              */
            Heartbeat.addHandler = function (type, h) {
                Web.NotificationCache.instance.addHandler(type, h);
            };
            Heartbeat._check = function () {
                var p = {
                    init: false,
                    ignore: Heartbeat._ignore
                };
                Heartbeat._ignore = null;
                Heartbeat.instance.ping(p).then(function (actionData) {
                    if (!actionData || !actionData.result)
                        return;
                    var resp = actionData.result;
                    if (!resp.notification)
                        return;
                    var nList = [];
                    var col = Web.NotificationCache.instance.pushRange(resp.notification);
                    col.forEach(function (nV, nI, nA) {
                        if (!nV)
                            return;
                        nList.push({ key: nV.id, value: nV.timestamp });
                    });
                    Heartbeat._ignore = nList;
                    var interval = Heartbeat.interval;
                    if (interval == null || typeof interval !== "number")
                        return;
                    setTimeout(function () {
                        Heartbeat._check();
                    }, interval);
                }, function () {
                    var interval = Heartbeat.interval;
                    if (interval == null || typeof interval !== "number")
                        return;
                    setTimeout(function () {
                        Heartbeat._check();
                    }, interval);
                });
            };
            return Heartbeat;
        }());
        Heartbeat._enabled = false;
        Heartbeat.interval = 5000;
        Heartbeat.instance = new Heartbeat();
        Web.Heartbeat = Heartbeat;
        var NotificationCache = (function () {
            function NotificationCache() {
                this._h = {};
                this._list = [];
            }
            /**
              * Pushes notification.
              */
            NotificationCache.prototype.push = function (value) {
                if (!value || !value.id || value.id === "" || value.timestamp == null || !value.type)
                    return false;
                value.timestamp = AliHub.Common.DateTime.parse(value.timestamp);
                var index = -1;
                var oldValue = null;
                if (this._list.some(function (ele, i, arr) {
                    if (ele.id !== value.id)
                        return false;
                    if (ele.timestamp <= value.timestamp)
                        index = i;
                    oldValue = ele;
                    return true;
                })) {
                    if (index < 0)
                        return false;
                    this._list[index] = value;
                }
                else {
                    this._list.push(value);
                    index = this._list.length;
                }
                this._raiseHandler(value, oldValue);
                return true;
            };
            /**
              * Pushes a collection of notification.
              */
            NotificationCache.prototype.pushRange = function (col) {
                var _this = this;
                if (!col)
                    return [];
                var list = [];
                col.forEach(function (ele, i, arr) {
                    if (!_this.push(ele))
                        return false;
                    list.push(ele);
                });
                return list;
            };
            /**
              * Registers handler.
              */
            NotificationCache.prototype.addHandler = function (type, h) {
                if (!type || type === "" || !h)
                    return;
                this._h[type] = h;
            };
            NotificationCache.prototype._raiseHandler = function (value, oldValue) {
                if (!value)
                    return;
                var h = this._h[value.type];
                if (!h)
                    return;
                h(value, oldValue);
            };
            return NotificationCache;
        }());
        NotificationCache.instance = new NotificationCache();
        Web.NotificationCache = NotificationCache;
        function callbackQuery(url) {
            if (!url || url.length < 10)
                return null;
            var mark = "&";
            var callbackIndex = url.indexOf("&callback=?");
            if (callbackIndex < 0) {
                callbackIndex = url.indexOf("?callback=?");
                mark = "?";
            }
            if (callbackIndex < 0)
                return null;
            if (callbackIndex + 11 < url.length) {
                if (url.indexOf("&", callbackIndex + 1) < 0 && url.indexOf("#", callbackIndex + 1) < 0)
                    return null;
            }
            return mark + "callaback=?";
        }
        Web.callbackQuery = callbackQuery;
        /**
          * Gets or sets the resolver.
          */
        function resolver(subject, key, value) {
            var info;
            if (!subject)
                return null;
            if (typeof subject === "string") {
                info = AliHub.Res.settingsProp(subject, "urls", key);
                if (!info) {
                    info = {};
                    AliHub.Res.settingsProp(subject, "urls", key, info);
                }
            }
            else if (subject.tagName || subject.getElement) {
                var ele = subject.getElement && typeof subject.getElement === "function" ? subject.getElement() : subject;
                if (ele && ele.tagName) {
                    var eleAttr = AliHub.Elements.parseAttr(subject, "urls", true);
                    info = eleAttr && eleAttr[key] && typeof eleAttr[key] === "string" ? info = {
                        template: eleAttr[key]
                    } : null;
                }
            }
            if (arguments.length > 2) {
                if (value == null)
                    info = null;
                else if (typeof value === "string")
                    info.template = value;
                else
                    info = value;
                if (!subject) {
                }
                else if (typeof subject === "string") {
                    AliHub.Res.settingsProp(subject, "urls", key, info);
                }
            }
            if (info.canBeEmpty == null)
                info.canBeEmpty = true;
            var resolver = new RequestDataPackageResolver(info);
            return resolver;
        }
        Web.resolver = resolver;
        /**
          * Creates resolvers.
          */
        function createResolvers(col) {
            if (!col)
                return;
            col.forEach(function (ele, i, arr) {
                if (!ele || !ele.subject || !ele.key)
                    return;
                resolver(ele.subject, ele.key, ele.info);
            });
        }
        Web.createResolvers = createResolvers;
        /**
          * Batch adds URL templates.
          */
        function setUrlTemplates(subject, urls) {
            if (!urls)
                return;
            var keys = [];
            for (var ele in urls) {
                if (!ele || typeof ele !== "string")
                    continue;
                var prop = urls[ele];
                if (!prop || (typeof prop !== "string" && !prop.template))
                    continue;
                resolver(subject, ele, prop);
                keys.push(ele);
            }
            return keys;
        }
        Web.setUrlTemplates = setUrlTemplates;
        /**
          * Serializes a data to a URL format string.
          * @param link  the base URL string.
          * @param data  the data model.
          */
        function mergeLink(link, data, justAppend) {
            if (justAppend === void 0) { justAppend = false; }
            var url = (link || "").toString();
            if (data) {
                var urlSplit = justAppend || url.indexOf("?") >= 0 ? "&" : "?";
                for (var prop in data) {
                    if (!prop || typeof prop !== "string")
                        continue;
                    url += urlSplit + encodeURIComponent(prop) + "=" + encodeURIComponent((data[prop] || "").toString());
                    urlSplit = "&";
                }
            }
            return url;
        }
        Web.mergeLink = mergeLink;
        function _getResolverInfo(subject, key) {
            if (!key) {
                return subject && typeof subject === "string" ? { template: subject } : null;
            }
            if (subject && typeof subject === "string" && typeof key === "string") {
                return resolver(subject, key).info;
            }
            if (subject && typeof subject !== "string" && typeof key === "string") {
                var prop = null;
                if (subject.urls) {
                    prop = subject.urls;
                    if (prop && typeof prop === "function")
                        prop = prop.call(subject);
                }
                else if ((subject.tagName && subject.getAttribute) || (subject.getId && !!subject.getElement)) {
                    prop = AliHub.Elements.parseAttr(subject, "urls", true);
                    if (prop === undefined)
                        prop = AliHub.Elements.parseAttr(subject, "config-urls", true);
                }
                if (prop && prop[key])
                    return typeof prop[key] === "string" ? { template: prop[key] } : prop[key];
                else
                    return null;
            }
            if (!subject) {
                return typeof key !== "string" ? key.info : { template: key };
            }
            return null;
        }
        /**
          * Resolves data by GET.
          */
        function resolve(subject, key, parameters) {
            var info = _getResolverInfo(subject, key);
            if (!info)
                return AliHub.Common.rejectDeferred(null, "web resolver does not exist");
            if (info.mock)
                return info.mock(parameters, info, null);
            var url = AliHub.Common.Text.format(info.template, parameters, true, info.preBag);
            return DataPackageJob.getInfo(url, null, info.canBeEmpty, info.convertor);
        }
        Web.resolve = resolve;
        /**
          * Resolves empty by GET.
          */
        function resolveEmpty(subject, key, parameters) {
            var info = _getResolverInfo(subject, key);
            if (!info)
                return AliHub.Common.rejectDeferred(null, "web resolver does not exist");
            if (info.mock)
                return info.mock(parameters, info, null);
            var url = AliHub.Common.Text.format(info.template, parameters, true, info.preBag);
            return DataPackageJob.getEmpty(url, null);
        }
        Web.resolveEmpty = resolveEmpty;
        /**
          * Resolves data by POST.
          */
        function resolveByPost(subject, key, parameters, data) {
            var info = _getResolverInfo(subject, key);
            if (!info)
                return AliHub.Common.rejectDeferred(null, "web resolver does not exist");
            if (info.mock)
                return info.mock(parameters, info, data);
            var url = AliHub.Common.Text.format(info.template, parameters, true, info.preBag);
            return DataPackageJob.postInfo(url, null, data, info.canBeEmpty, info.convertor);
        }
        Web.resolveByPost = resolveByPost;
        /**
          * Resolves empty by POST.
          */
        function resolveEmptyByPost(subject, key, parameters, data) {
            var info = _getResolverInfo(subject, key);
            if (!info)
                return AliHub.Common.rejectDeferred(null, "web resolver does not exist");
            if (info.mock)
                return info.mock(parameters, info, data);
            var url = AliHub.Common.Text.format(info.template, parameters, true, info.preBag);
            return DataPackageJob.postEmpty(url, null, data);
        }
        Web.resolveEmptyByPost = resolveEmptyByPost;
        /**
          * Builds a parameter string.
          */
        function buildParaString(parameters, onlySimple) {
            if (onlySimple === void 0) { onlySimple = false; }
            if (!parameters)
                return "";
            var str = "";
            var step = 0;
            for (var ele in parameters) {
                if (!ele || (typeof ele !== "string" && typeof ele !== "number"))
                    continue;
                ele = ele.toString();
                var prop = parameters[ele];
                if (prop == null)
                    prop = "";
                if (onlySimple && typeof prop !== "string" && typeof prop !== "number")
                    continue;
                prop = AliHub.Common.Text.serialize(prop, "string");
                if (step > 0)
                    str += "&";
                str += encodeURIComponent(ele) + "=" + encodeURIComponent(prop);
                step++;
            }
            return str;
        }
        Web.buildParaString = buildParaString;
    })(Web = AliHub.Web || (AliHub.Web = {}));
})(AliHub || (AliHub = {}));
/*  --------------------
 *  Binding of implementation - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  plugins.ts
 *  Description  Lots of useful functionalities.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
/// <reference path="pages.ts" />
/// <reference path="resources.ts" />
/// <reference path="elements.ts" />
/// <reference path="users.ts" />
/// <reference path="web.ts" />
var AliHub;
(function (AliHub) {
    var Bindings;
    (function (Bindings) {
        var _bindingProvider = typeof ko !== "undefined" ? ko : null;
        /**
          * Sets up the bindings.
          */
        function setup(options) {
            if (!options)
                options = {};
            if (!!options.ko && options.ko !== true)
                _bindingProvider = options.ko;
            else if (options.ko === true && !window.ko)
                window.ko = options.ko;
            AliHub.Common.bindingFactory(KnockoutBindingFactory.instance(), options.override);
            registerAngularJsModule();
            AliHub.Common.setTemplateEngine("angularjs", bindAngularJs);
            AliHub.Common.setTemplateEngine("vuejs", bindVueJs);
            if (typeof JSTracker !== "undefined" && (options.override || AliHub.Diagnostics.tracker() === AliHub.Diagnostics.emptyTracker()))
                AliHub.Diagnostics.tracker(taobaoJsTracker());
            if (typeof goldlog !== "undefined" && (options.override || AliHub.Diagnostics.pageAnalyticsClient().basic === true))
                AliHub.Diagnostics.pageAnalyticsClient(GoldlogTracker.instance());
            var controlInit = AliHub.Common.ControlManager.initializers();
            HighChartsFactory.setup(options.override);
            jQueryControlsSetup();
            AliHub.Common.PageController.init();
            AliHub.Diagnostics.debugInfo("Quark bindings has initialized.");
        }
        Bindings.setup = setup;
        /**
          * Enables jQuery.
          * http://jquery.com/
          */
        function jQueryControlsSetup() {
            try {
                if (typeof jQuery !== "undefined") {
                    if (jQuery && jQuery.fn)
                        jQuery.fn.getControls = function () {
                            var arr = [];
                            if (this.each)
                                this.each(function () {
                                    var c = AliHub.Common.getControl(this);
                                    if (c)
                                        arr.push(c);
                                });
                            return arr;
                        };
                }
            }
            catch (ex) { }
        }
        Bindings.jQueryControlsSetup = jQueryControlsSetup;
        /**
          * Creates binding provider.
          */
        function bindingProvider(value) {
            if (arguments.length > 0)
                _bindingProvider = value;
            return _bindingProvider;
        }
        Bindings.bindingProvider = bindingProvider;
        /**
          * KnockoutJs binding factory.
          * http://knockoutjs.com/
          */
        var KnockoutBindingFactory = (function () {
            function KnockoutBindingFactory() {
                /**
                  * The binding provider which is the Knockout instance.
                  */
                this.provider = _bindingProvider;
            }
            /**
              * Singleton instance.
              */
            KnockoutBindingFactory.instance = function () {
                if (!KnockoutBindingFactory._instance) {
                    var instance = new KnockoutBindingFactory();
                    var koi = instance.provider;
                    if (!koi)
                        return null;
                    KnockoutBindingFactory._instance = instance;
                    AliHub.Common.setTemplateEngine("knockout", instance.applyBindings);
                    AliHub.Common.setTemplateEngine("ko", instance.applyBindings);
                    koi.bindingHandlers["image"] = {
                        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                            element.innerHTML = "";
                            var imgValue = koi.unwrap(valueAccessor());
                            if (!imgValue)
                                return;
                            var imgEle = AliHub.Graph.imageElement(imgValue);
                            if (!imgEle)
                                return;
                            element.appendChild(imgEle);
                        }
                    };
                    koi.bindingHandlers["control"] = {
                        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                            var controlValue = koi.unwrap(valueAccessor());
                            if (!controlValue)
                                return;
                            var options = allBindingsAccessor.get('controlOptions');
                            if (!!options)
                                koi.unwrap(options);
                            AliHub.Common.fillControl(element, controlValue, !!options ? options : null);
                        }
                    };
                    koi.bindingHandlers["datetime"] = {
                        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                            var dtValue = koi.unwrap(valueAccessor());
                            if (!dtValue)
                                return;
                            var options = allBindingsAccessor.get('datetimeFormat');
                            if (!!options)
                                koi.unwrap(options);
                            element.innerHTML = AliHub.Common.DateTime.toCustomizedString(dtValue, options);
                        }
                    };
                    koi.bindingHandlers["file"] = {
                        init: function (element, valueAccessor, allBindings) {
                            if (typeof FileReader === "undefined")
                                return;
                            var reader = new FileReader();
                            AliHub.Elements.listen(element, "change", function () {
                                if (!element.files || element.files.length < 1 || !element.files[0])
                                    return;
                                var fi = element.files[0];
                                if (reader.readyState === 1)
                                    reader.abort();
                                var dataType = allBindings.get('fileDataType') || "dataUrl";
                                reader.onload = function (ev) {
                                    valueAccessor()({
                                        name: fi.name,
                                        fileType: fi.type,
                                        modified: fi.lastModifiedDate,
                                        size: fi.size,
                                        dataType: dataType.toString(),
                                        data: reader.result
                                    });
                                };
                                switch (dataType.toString().toLowerCase()) {
                                    case "text":
                                        reader.readAsText(fi);
                                        break;
                                    case "array":
                                    case "arraybuffer":
                                        reader.readAsArrayBuffer(fi);
                                        break;
                                    case "binary":
                                    case "binarystring":
                                        reader.readAsBinaryString(fi);
                                        break;
                                    case "dataurl":
                                        reader.readAsDataURL(fi);
                                        break;
                                    default:
                                        valueAccessor()(fi);
                                        break;
                                }
                            });
                        }
                    };
                }
                return this._instance;
            };
            /**
              * Checks whether the instance is alive.
              */
            KnockoutBindingFactory.prototype.alive = function () {
                return !!this.provider;
            };
            /**
              * Creates an observable object.
              */
            KnockoutBindingFactory.prototype.create = function (value) {
                if (!this.provider)
                    return null;
                if (arguments.length > 0)
                    return this.provider.observable(value);
                return this.provider.observable();
            };
            /**
              * Creates an observable array.
              */
            KnockoutBindingFactory.prototype.createArray = function (col) {
                if (!this.provider)
                    return null;
                if (arguments.length > 0)
                    return this.provider.observableArray(col);
                return this.provider.observableArray();
            };
            /**
              * Creates a computed instance.
              */
            KnockoutBindingFactory.prototype.createComputed = function (h, context) {
                return !!this.provider ? this.provider.computed(h, context) : null;
            };
            /**
              * Checks whether the instance is observable.
              */
            KnockoutBindingFactory.prototype.isObservable = function (instance) {
                return !!this.provider ? this.provider.isObservable(instance) : null;
            };
            /**
              * Checks whether the instance is computed.
              */
            KnockoutBindingFactory.prototype.isComputed = function (instance) {
                return !!this.provider ? this.provider.isComputed(instance) : null;
            };
            /**
              * Converts to JSON.
              */
            KnockoutBindingFactory.prototype.toJson = function (viewModel) {
                return !!this.provider ? this.provider.toJSON(viewModel) : null;
            };
            KnockoutBindingFactory.prototype.applyBindings = function (control) {
                if (!this.provider)
                    return;
                var model = AliHub.Common.bindingObj(control.viewModel());
                control.viewModelChanged.add(function (ev) {
                    model(ev.value);
                });
                var converted = AliHub.Common.bindingObj(control.converted());
                control.convertedChanged.add(function (ev) {
                    converted(ev.value);
                });
                var info = AliHub.Common.bindingObj(control.info());
                control.infoChanged.add(function (ev) {
                    info(ev.value);
                });
                this.provider.applyBindings({
                    id: control.getId(),
                    model: model,
                    info: info,
                    converted: converted,
                    res: AliHub.Res.factory(),
                    templates: AliHub.Res.templates,
                    control: this,
                    hub: function (key) {
                        return !!key ? AliHub[key.toString()] : AliHub;
                    },
                    extenders: function (name, emptyObj) {
                        if (emptyObj === void 0) { emptyObj = false; }
                        return control.procExtender(name, emptyObj);
                    }
                }, control.getElement());
            };
            /**
              * Unwraps.
              */
            KnockoutBindingFactory.prototype.unwrap = function (value) {
                return !!this.provider ? this.provider.unwrap(value) : AliHub.Common.Reflection.unwrapObject(value);
            };
            return KnockoutBindingFactory;
        }());
        Bindings.KnockoutBindingFactory = KnockoutBindingFactory;
        /**
          * Binds for Flipper.
          * http://gitlab.alibaba-inc.com/crm/flipper
          */
        function bindFlipper(instance, reload) {
            if (reload === void 0) { reload = false; }
            if (!instance)
                return null;
            if (!!instance.getId && !!instance.getElement && !!instance.loadOptions && (instance instanceof AliHub.Common.VisualControl))
                return instance;
            var controlType = instance.controlType;
            if (!controlType)
                controlType = AliHub.Common.VisualControl;
            if (!reload && !!instance.getControl && typeof instance.getControl === "function") {
                return instance.getControl();
            }
            var c = new controlType(instance);
            var id = c.getId();
            if (!!id && !AliHub.Elements.getById(id))
                return null;
            if (!!instance.options)
                c.loadOptions(instance.options);
            instance.getControl = function () {
                return c;
            };
            return c;
        }
        Bindings.bindFlipper = bindFlipper;
        /**
          * Binds AngularJs 1.x for a control.
          * https://angularjs.org/
          */
        function bindAngularJs(control) {
            if (!control)
                return;
            control.attr("ng-controller", "AliHubControlController");
        }
        Bindings.bindAngularJs = bindAngularJs;
        /**
          * Register AngularJs controller for a binding control.
          * https://angularjs.org/
          */
        function registerAngularJsModule(angularInstance) {
            if (!angularInstance || !angularInstance.module) {
                if (typeof angular === "undefined")
                    return null;
                angularInstance = angular;
            }
            if (!angularInstance || !angularInstance.module)
                return null;
            try {
                var module = angularInstance.module("quark", []);
                module.controller("AliHubControlController", ["$scope", "$element", function ($scope, $element) {
                        var c = AliHub.Common.currentControl($element);
                        var disp = AliHub.Common.listenBindingControl(c, $scope, function (h) {
                            $scope.$apply(h);
                        }, true);
                        $scope.control = c;
                        $scope.dispose = disp;
                    }]);
                module.filter("AliHubText", function () {
                    return function (input, arg) {
                        if (!arg || !input)
                            return input;
                        return !!AliHub.Common.Text[arg] && typeof AliHub.Common.Text[arg] === "function" ? AliHub.Common.Text[arg](input) : input;
                    };
                });
                return module;
            }
            catch (ex) {
                return null;
            }
        }
        Bindings.registerAngularJsModule = registerAngularJsModule;
        function angularScopeGet($scope, key, parameter, done, fail, target) {
            var task = AliHub.Web.resolve(null, $scope.urls[key], parameter);
            var succ = !!done && !!done.call ? function (r) {
                $scope.$apply(function () {
                    return done.call(target || $scope, r);
                });
            } : null;
            var error = !!fail && !!fail.call ? function (r) {
                $scope.$apply(function () {
                    return fail.call(target || $scope, r);
                });
            } : null;
            task.then(succ, error);
            return task;
        }
        Bindings.angularScopeGet = angularScopeGet;
        function angularScopePost($scope, key, parameter, data, done, fail, target) {
            var task = AliHub.Web.resolveByPost(null, $scope.urls[key], parameter, data);
            var succ = !!done && !!done.call ? function (r) {
                $scope.$apply(function () {
                    return done.call(target || $scope, r);
                });
            } : null;
            var error = !!fail && !!fail.call ? function (r) {
                $scope.$apply(function () {
                    return fail.call(target || $scope, r);
                });
            } : null;
            task.then(succ, error);
            return task;
        }
        Bindings.angularScopePost = angularScopePost;
        /**
          * Vue.js binding function.
          * http://vuejs.org/
          */
        function bindVueJs(control) {
            if (typeof Vue === "undefined" || !control)
                return;
            if (!Vue)
                return;
            try {
                var data = { control: control };
                var disp = AliHub.Common.listenBindingControl(control, data);
                var vue = new Vue({
                    el: "#" + control.getId(),
                    data: data,
                    destroyed: function () {
                        disp.dispose();
                    }
                });
                control.prop("vuejs", vue);
            }
            catch (ex) { }
        }
        Bindings.bindVueJs = bindVueJs;
        /**
          * Creates an instance of Taobao JsTracker.
          * http://jstracker.taobao.net
          */
        function taobaoJsTracker() {
            var tracker = new AliHub.Diagnostics.Tracker();
            var l = tracker.logger();
            tracker.logger = function () {
                if (typeof JSTracker === "undefined")
                    return l;
                return JSTracker || l;
            };
            tracker.config = function (key, value) {
                if (typeof JSTracker === "undefined")
                    return;
                if (!JSTracker || !JSTracker.config)
                    return;
                try {
                    JSTracker.config(key, value);
                }
                catch (ex) { }
            };
            return tracker;
        }
        Bindings.taobaoJsTracker = taobaoJsTracker;
        /**
          * Goldlog.
          * http://shuju.taobao.ali.com/main/adminIndex.htm
          */
        var GoldlogTracker = (function () {
            function GoldlogTracker() {
                this.mapping = new AliHub.Collection.Mapping();
                this.ignoreCustomizedParameter = false;
            }
            /**
              * Singleton instance.
              */
            GoldlogTracker.instance = function () {
                if (!GoldlogTracker._instance)
                    GoldlogTracker._instance = new GoldlogTracker();
                return this._instance;
            };
            /**
              * Records a stamp.
              */
            GoldlogTracker.prototype.record = function (key, parameter) {
                var arr = this.mapping.get(key);
                if (!goldlog || !arr || !arr.length || arr.length < 4)
                    return;
                goldlog.record(arr[0], arr[1], !parameter || this.ignoreCustomizedParameter ? arr[2] : AliHub.Elements.toQueryString(parameter), arr[3]);
            };
            /**
              * Records directly.
              */
            GoldlogTracker.prototype.recordDirectly = function (a1, a2, a3, a4) {
                GoldlogTracker.request(a1, a2, a3, a4);
            };
            /**
              * Checks whether the instance is alive.
              */
            GoldlogTracker.prototype.alive = function () {
                if (typeof goldlog === "undefined")
                    return false;
                return !!goldlog && !!goldlog.record;
            };
            /**
              * Sets up a mapping.
              */
            GoldlogTracker.prototype.map = function (dict) {
                this.mapping.map(dict);
            };
            GoldlogTracker.prototype.push = function (key, value) {
                this.push(key, value);
            };
            GoldlogTracker.prototype.remove = function (key) {
                this.remove(key);
            };
            GoldlogTracker.prototype.clear = function () {
                this.mapping.clear();
            };
            GoldlogTracker.request = function (a1, a2, a3, a4) {
                if (typeof goldlog !== "undefined") {
                    if (!!goldlog && !!goldlog.record) {
                        goldlog.record(a1, a2, a3, a4);
                        return;
                    }
                }
                var img = new Image();
                var id = AliHub.Common.Maths.randomString("hidden_image");
                var timestamp = new Date().getTime();
                var src = "//wgo.mmstat.com/" + a1.toString() + "." + a2.toString() + "." + a3.toString() + "." + a4.toString() + "?cache=" + timestamp.toString() + "&gmkey=&gokey=&logtype=2";
                window[id] = img;
                setTimeout(function () {
                    img.onload = img.onerror = function () {
                        setTimeout(function () {
                            delete window[id];
                        }, 400);
                    };
                    img.src = src;
                }, 20);
            };
            return GoldlogTracker;
        }());
        Bindings.GoldlogTracker = GoldlogTracker;
        /**
          * High charts factory.
          * http://highcharts.com/
          */
        var HighChartsFactory = (function () {
            function HighChartsFactory() {
            }
            HighChartsFactory.setup = function (override) {
                if (override === void 0) { override = false; }
                if (typeof Highcharts === "undefined")
                    return;
                if (override || !AliHub.Graph.Extensions.radar)
                    AliHub.Graph.Extensions.radar = HighChartsFactory.radar;
                if (override || !AliHub.Graph.Extensions.line)
                    AliHub.Graph.Extensions.line = HighChartsFactory.line;
            };
            HighChartsFactory.radar = function (element, title, data) {
                var gen = function () {
                    var keys = [];
                    var values = [];
                    for (var i = 0; i < data.length; i++) {
                        keys.push(data[i].key);
                        values.push(data[i].value);
                    }
                    if (!!jQuery('#' + element.id)["highcharts"])
                        jQuery('#' + element.id)["highcharts"]({
                            title: {
                                text: !!title ? title : "",
                                x: -80
                            },
                            chart: {
                                polar: true,
                                type: 'line'
                            },
                            pane: {
                                size: '80%'
                            },
                            legend: {
                                enabled: false
                            },
                            xAxis: {
                                categories: keys,
                                tickmarkPlacement: 'on',
                                lineWidth: 0
                            },
                            yAxis: {
                                gridLineInterpolation: 'polygon',
                                lineWidth: 0,
                                min: 0,
                                max: 100
                            },
                            tooltip: {
                                shared: true,
                                pointFormat: '<span style="color:{series.color}"><b>{point.y:,.0f}</b>'
                            },
                            series: [{
                                    name: 'Values',
                                    data: values,
                                    pointPlacement: 'on'
                                }]
                        });
                };
                jQuery(gen);
            };
            HighChartsFactory.line = function (element, title, data, options) {
                var gen = function () {
                    var keys = [];
                    var values = [];
                    var indexes = [];
                    for (var i = 0; i < data.length; i++) {
                        keys.push(data[i].key);
                        values.push(data[i].value);
                        indexes.push(i);
                    }
                    if (!!options && options.highlight != null) {
                        var plotBands = [{
                                from: options.highlight - 0.4,
                                to: options.highlight + 0.4,
                                color: 'rgba(0, 0, 0, 0.2)'
                            }];
                    }
                    if (!!jQuery('#' + element.id)["highcharts"])
                        jQuery('#' + element.id)["highcharts"]({
                            chart: {
                                type: 'areaspline'
                            },
                            title: {
                                text: !!title ? title : ""
                            },
                            legend: {
                                enabled: false
                            },
                            plotOptions: {
                                series: {
                                    marker: {
                                        enabled: false
                                    },
                                    fillColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')
                                }
                            },
                            xAxis: {
                                categories: keys,
                                labels: {
                                    formatter: function () {
                                        return "";
                                    }
                                },
                                plotBands: plotBands
                            },
                            yAxis: {
                                min: !!options && options.min != null ? options.min : null,
                                max: !!options && options.max != null ? options.max : null
                            },
                            tooltip: {
                                shared: true,
                                pointFormat: '<span style="color:{series.color}"><b>{point.y:,.0f}</b>'
                            },
                            series: [{
                                    name: 'Values',
                                    data: values
                                }]
                        });
                };
                jQuery(gen);
            };
            HighChartsFactory.pie = function (element, title, data, options) {
                var gen = function () {
                    var arr = [];
                    data.forEach(function (item, ii, ia) {
                        arr.push({
                            name: item.key,
                            y: item.value
                        });
                    });
                    if (!!jQuery('#' + element.id)["highcharts"])
                        jQuery('#' + element.id)["highcharts"]({
                            chart: {
                                plotBackgroundColor: null,
                                plotBorderWidth: null,
                                plotShadow: false,
                                type: 'pie'
                            },
                            title: {
                                text: !!title ? title : ""
                            },
                            tooltip: {
                                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                            },
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    dataLabels: {
                                        enabled: true,
                                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                        style: {
                                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                        }
                                    }
                                }
                            },
                            series: [{
                                    name: "Brands",
                                    colorByPoint: true,
                                    innerSize: !!options && !!options.innerSize ? options.innerSize : null,
                                    data: arr
                                }]
                        });
                };
                jQuery(gen);
            };
            return HighChartsFactory;
        }());
        Bindings.HighChartsFactory = HighChartsFactory;
    })(Bindings = AliHub.Bindings || (AliHub.Bindings = {}));
})(AliHub || (AliHub = {}));
/*  --------------------
 *  lp\zh-Hans + lp\zh-Hant - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  zh.ts
 *  Description  Language pack for Chinese.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
/// <reference path="resources.ts" />
var AliHub;
(function (AliHub) {
    var Res;
    (function (Res) {
        /**
          * Language pack for zh-Hans.
          */
        var Lp_zhHans = (function () {
            function Lp_zhHans() {
                this.lang = "zh-Hans";
                this.strings = {
                    homepage: "主页",
                    appCenter: "应用中心",
                    page: "页面",
                    pages: "页面",
                    first: "第一",
                    last: "最后",
                    previous: "前面",
                    next: "后面",
                    total: "总数",
                    current: "当前",
                    index: "索引",
                    bindingError: "无法绑定",
                    refresh: "刷新",
                    reload: "重载",
                    member: "会员",
                    myMembers: "我的会员",
                    recentDays: "近{0}天",
                    planned: "未处理",
                    processing: "处理中",
                    completed: "已完成",
                    ladyName: "{0}女士",
                    gentlemanName: "{0}先生",
                    reminder: "提醒",
                    note: "便签",
                    totalScore: "综合评分",
                    cents: "{0}分",
                    level: "等级",
                    collapse: "收起",
                    expand: "展开",
                    showAll: "显示全部",
                    followUp: "跟进",
                    noFollowUp: "暂未跟进",
                    memberTags: "会员印象",
                    types: "类别",
                    history: "历史",
                    trend: "趋势",
                    distribution: "分布",
                    newTasks: "{0}条新任务",
                    bizTasks: "工作任务",
                    summaryReports: "统计报表",
                    jobMgm: "工作管理",
                    createTask: "新建任务",
                    seeMore: "查看更多",
                    exit: "退出",
                    register: "注册",
                    login: "登录",
                    logout: "注销",
                    search: "搜索",
                    filter: "过滤",
                    typeKeywords: "输入搜索关键词",
                    requestHelp: "{0} 正在请求帮助中",
                    cannotFind: "该{0}并不存在",
                    newItem: "新建",
                    createItem: "创建",
                    addItem: "添加",
                    getItem: "获取",
                    setItem: "设置",
                    modifyItem: "修改",
                    updateItem: "更新",
                    replaceItem: "替换",
                    overrideItem: "覆盖",
                    fillItem: "填充",
                    removeItem: "移除",
                    deleteItem: "删除",
                    clearItem: "清空",
                    cleanUp: "清理",
                    ok: "确定",
                    save: "保存",
                    cancel: "取消",
                    turnBack: "返回",
                    rollback: "回滚",
                    undo: "撤销",
                    redo: "重复",
                    cut: "剪切",
                    copy: "复制",
                    copySomething: "复制{0}",
                    paste: "粘贴",
                    clipboard: "剪切板",
                    navigateTo: "导航至",
                    settings: "设置",
                    options: "选项",
                    profile: "档案",
                    draft: "草稿",
                    open: "打开",
                    close: "关闭",
                    turnOn: "开启",
                    turnOff: "关闭",
                    layout: "布局",
                    add: "添加",
                    insert: "插入",
                    edit: "编辑",
                    remove: "移除",
                    delete: "删除",
                    clear: "清空",
                    title: "标题",
                    content: "内容",
                    text: "文本",
                    richtext: "富文本",
                    properties: "属性",
                    wizard: "向导",
                    slide: "幻灯片",
                    photo: "照片",
                    image: "图片",
                    images: "图片",
                    audio: "音频",
                    video: "视频",
                    movie: "电影",
                    movies: "电影",
                    document: "文档",
                    documents: "文档",
                    link: "链接",
                    links: "链接",
                    hyperlink: "超链接",
                    website: "网站",
                    sns: "社交网络",
                    favorate: "收藏",
                    game: "游戏",
                    games: "游戏",
                    file: "文件",
                    files: "文件",
                    folder: "文件夹",
                    dir: "目录",
                    moveUp: "上移",
                    moveRight: "右移",
                    moveDown: "下移",
                    moveLeft: "左移",
                    module: "模块",
                    component: "组件",
                    chapter: "章",
                    section: "节",
                    update: "更新",
                    upload: "上传",
                    download: "下载",
                    switch: "切换",
                    switchCamera: "切换摄像头",
                    capturePhoto: "拍照",
                    record: "录制",
                    assign: "委派",
                    reassign: "转交",
                    flag: "标记",
                    send: "发送",
                    reply: "回复",
                    replyAll: "全部回复",
                    forward: "转发",
                    cc: "抄送",
                    bcc: "秘密抄送",
                    phoneCall: "拨打",
                    contact: "联系",
                    contactMember: "联系会员",
                    attach: "附加",
                    attachment: "附件",
                    expired: "已超时",
                    message: "消息",
                    notification: "通知",
                    feedback: "反馈",
                    help: "帮助",
                    support: "支持",
                    window: "窗口",
                    aries: "白羊座",
                    taurus: "金牛座",
                    gemini: "双子座",
                    cancer: "巨蟹座",
                    leo: "狮子座",
                    virgo: "室女座",
                    libra: "天秤座",
                    scorpio: "天蝎座",
                    sagittarius: "射手座",
                    capricorn: "摩羯座",
                    aquarius: "水瓶座",
                    pisces: "双鱼座",
                    ophiuchus: "蛇夫座",
                    horoscope: "星座",
                    astrology: "占星",
                    loading: "加载中",
                    failToLoadData: "数据加载失败",
                    surname: "姓氏",
                    givenname: "名字",
                    middleName: "中间名",
                    nickname: "昵称",
                    city: "城市",
                    street: "接到",
                    country: "国家",
                    birthday: "生日",
                    age: "年龄",
                    gender: "性别",
                    male: "男",
                    female: "女",
                    other: "其它",
                    fromSource: "从",
                    toTarget: "至",
                    millisecondsNum: "{0}微秒",
                    secondsNum: "{0}秒",
                    minutesNum: "{0}分",
                    hoursNum: "{0}小时",
                    daysNum: "{0}天",
                    weeksNum: "{0}周",
                    timeLocaleSep: "",
                    today: "今天",
                    tomorrowTime: "明天 {0}",
                    tomorrow: "明天",
                    secondsAgo: "数秒之前",
                    minuteAgo: "一分钟前",
                    minutesTwoAgo: "两分钟前",
                    minutesAgo: "{0}分钟前",
                    hourAgo: "一个小时前",
                    hoursTwoAgo: "两个小时前",
                    hoursAgo: "{0}个小时前",
                    yesterdayTime: "昨天 {0}",
                    yesterday: "昨天",
                    daysTwoAgo: "前天",
                    daysAgo: "{0}天前",
                    lastWeekDay: "上{0}",
                    lastWeek: "上周",
                    future: "未来",
                    date: "日期",
                    day: "天",
                    week: "星期",
                    weekday: "工作日",
                    weekend: "周末",
                    week0c: "日",
                    week1c: "一",
                    week2c: "二",
                    week3c: "三",
                    week4c: "四",
                    week5c: "五",
                    week6c: "六",
                    week0s: "周日",
                    week1s: "周一",
                    week2s: "周二",
                    week3s: "周三",
                    week4s: "周四",
                    week5s: "周五",
                    week6s: "周六",
                    week0f: "星期天",
                    week1f: "星期一",
                    week2f: "星期二",
                    week3f: "星期三",
                    week4f: "星期四",
                    week5f: "星期五",
                    week6f: "星期六",
                    week0t: "周日 {0}",
                    week1t: "周一 {0}",
                    week2t: "周二 {0}",
                    week3t: "周三 {0}",
                    week4t: "周四 {0}",
                    week5t: "周五 {0}",
                    week6t: "周六 {0}",
                    month: "月",
                    month0s: "1月",
                    month1s: "2月",
                    month2s: "3月",
                    month3s: "4月",
                    month4s: "5月",
                    month5s: "6月",
                    month6s: "7月",
                    month7s: "8月",
                    month8s: "9月",
                    month9s: "10月",
                    monthAs: "11月",
                    monthBs: "12月",
                    month0f: "一月",
                    month1f: "二月",
                    month2f: "三月",
                    month3f: "四月",
                    month4f: "五月",
                    month5f: "六月",
                    month6f: "七月",
                    month7f: "八月",
                    month8f: "九月",
                    month9f: "十月",
                    monthAf: "十一月",
                    monthBf: "十二月",
                    year: "年",
                    am: "上午",
                    pm: "下午",
                    empty: "暂无",
                    commaSymbol: "，",
                    colonSymbol: "：",
                    ellipsisSymbol: "……",
                    semicolonSymbol: "；",
                    enumCommaSymbol: "、",
                    periodSymbol: "。"
                };
            }
            Lp_zhHans.prototype.template = function (templ) {
                if (!templ)
                    return null;
                templ.strings.reg(this.lang, this.strings);
                templ.strings.reg("zh-CN", this.strings);
                templ.strings.reg("zh-SG", this.strings);
                return templ;
            };
            return Lp_zhHans;
        }());
        Res.Lp_zhHans = Lp_zhHans;
        /**
          * Language pack for zh-Hant.
          */
        var Lp_zhHant = (function () {
            function Lp_zhHant() {
                this.lang = "zh-Hant";
                this.strings = {
                    homepage: "主頁",
                    appCenter: "應用中心",
                    page: "頁面",
                    pages: "頁面",
                    first: "第一",
                    last: "最後",
                    previous: "前面",
                    next: "後面",
                    total: "總數",
                    current: "當前",
                    index: "索引",
                    bindingError: "無法綁定",
                    refresh: "刷新",
                    reload: "重載",
                    member: "會員",
                    myMembers: "我的會員",
                    recentDays: "近{0}天",
                    planned: "未處理",
                    processing: "處理中",
                    completed: "已完成",
                    ladyName: "{0}女士",
                    gentlemanName: "{0}先生",
                    reminder: "提醒",
                    note: "便簽",
                    totalScore: "綜合評分",
                    cents: "{0}分",
                    level: "等級",
                    collapse: "收起",
                    expand: "展開",
                    showAll: "顯示全部",
                    followUp: "跟進",
                    noFollowUp: "暫未跟進",
                    memberTags: "會員印象",
                    types: "類別",
                    history: "歷史",
                    trend: "趨勢",
                    distribution: "分佈",
                    newTasks: "{0}條新任務",
                    bizTasks: "工作任務",
                    summaryReports: "統計報表",
                    jobMgm: "工作管理",
                    createTask: "新建任務",
                    seeMore: "查看更多",
                    exit: "退出",
                    register: "註冊",
                    login: "登錄",
                    logout: "登出",
                    search: "搜索",
                    filter: "過濾",
                    typeKeywords: "輸入搜索關鍵字",
                    requestHelp: "{0} 正在請求説明中",
                    cannotFind: "該{0}並不存在",
                    newItem: "新建",
                    createItem: "創建",
                    addItem: "添加",
                    getItem: "獲取",
                    setItem: "設置",
                    modifyItem: "修改",
                    updateItem: "更新",
                    replaceItem: "替換",
                    overrideItem: "覆蓋",
                    fillItem: "填充",
                    removeItem: "移除",
                    deleteItem: "刪除",
                    clearItem: "清空",
                    cleanUp: "清理",
                    ok: "確定",
                    save: "保存",
                    cancel: "取消",
                    turnBack: "返回",
                    rollback: "回滾",
                    undo: "撤銷",
                    redo: "重複",
                    cut: "剪切",
                    copy: "複製",
                    copySomething: "複製{0}",
                    paste: "粘貼",
                    clipboard: "剪切板",
                    navigateTo: "導航至",
                    settings: "設置",
                    options: "選項",
                    profile: "檔案",
                    draft: "草稿",
                    open: "打開",
                    close: "關閉",
                    turnOn: "開啟",
                    turnOff: "關閉",
                    layout: "佈局",
                    add: "添加",
                    insert: "插入",
                    edit: "編輯",
                    remove: "移除",
                    delete: "刪除",
                    clear: "清空",
                    title: "標題",
                    content: "內容",
                    text: "文本",
                    richtext: "富文本",
                    properties: "屬性",
                    wizard: "嚮導",
                    slide: "幻燈片",
                    photo: "照片",
                    image: "圖片",
                    images: "圖片",
                    audio: "音訊",
                    video: "視頻",
                    movie: "電影",
                    movies: "電影",
                    document: "文檔",
                    documents: "文檔",
                    link: "連結",
                    links: "連結",
                    hyperlink: "超連結",
                    website: "網站",
                    sns: "社交網路",
                    favorate: "收藏",
                    game: "遊戲",
                    games: "遊戲",
                    file: "檔",
                    files: "檔",
                    folder: "資料夾",
                    dir: "目錄",
                    moveUp: "上移",
                    moveRight: "右移",
                    moveDown: "下移",
                    moveLeft: "左移",
                    module: "模組",
                    component: "元件",
                    chapter: "章",
                    section: "節",
                    update: "更新",
                    upload: "上傳",
                    download: "下載",
                    switch: "切換",
                    switchCamera: "切換攝像頭",
                    capturePhoto: "拍照",
                    record: "錄製",
                    assign: "委派",
                    reassign: "轉交",
                    flag: "標記",
                    send: "發送",
                    reply: "回復",
                    replyAll: "全部回復",
                    forward: "轉發",
                    cc: "抄送",
                    bcc: "秘密抄送",
                    phoneCall: "撥打",
                    contact: "聯繫",
                    contactMember: "聯繫會員",
                    attach: "附加",
                    attachment: "附件",
                    expired: "已超時",
                    message: "消息",
                    notification: "通知",
                    feedback: "回饋",
                    help: "説明",
                    support: "支援",
                    window: "視窗",
                    aries: "白羊座",
                    taurus: "金牛座",
                    gemini: "雙子座",
                    cancer: "巨蟹座",
                    leo: "獅子座",
                    virgo: "室女座",
                    libra: "天秤座",
                    scorpio: "天蠍座",
                    sagittarius: "射手座",
                    capricorn: "摩羯座",
                    aquarius: "水瓶座",
                    pisces: "雙魚座",
                    ophiuchus: "蛇夫座",
                    horoscope: "星座",
                    astrology: "占星",
                    loading: "載入中",
                    failToLoadData: "資料載入失敗",
                    surname: "姓氏",
                    givenname: "名字",
                    middleName: "中間名",
                    nickname: "昵稱",
                    city: "城市",
                    street: "接到",
                    country: "國家",
                    birthday: "生日",
                    age: "年齡",
                    gender: "性別",
                    male: "男",
                    female: "女",
                    other: "其它",
                    fromSource: "從",
                    toTarget: "至",
                    millisecondsNum: "{0}微秒",
                    secondsNum: "{0}秒",
                    minutesNum: "{0}分",
                    hoursNum: "{0}小時",
                    daysNum: "{0}天",
                    weeksNum: "{0}周",
                    timeLocaleSep: "",
                    today: "今天",
                    tomorrowTime: "明天 {0}",
                    tomorrow: "明天",
                    secondsAgo: "數秒之前",
                    minuteAgo: "一分鐘前",
                    minutesTwoAgo: "兩分鐘前",
                    minutesAgo: "{0}分鐘前",
                    hourAgo: "一個小時前",
                    hoursTwoAgo: "兩個小時前",
                    hoursAgo: "{0}個小時前",
                    yesterdayTime: "昨天 {0}",
                    yesterday: "昨天",
                    daysTwoAgo: "前天",
                    daysAgo: "{0}天前",
                    lastWeekDay: "上{0}",
                    lastWeek: "上周",
                    future: "未來",
                    date: "日期",
                    day: "天",
                    week: "星期",
                    weekday: "工作日",
                    weekend: "週末",
                    week0c: "日",
                    week1c: "一",
                    week2c: "二",
                    week3c: "三",
                    week4c: "四",
                    week5c: "五",
                    week6c: "六",
                    week0s: "周日",
                    week1s: "週一",
                    week2s: "週二",
                    week3s: "週三",
                    week4s: "週四",
                    week5s: "週五",
                    week6s: "週六",
                    week0f: "星期天",
                    week1f: "星期一",
                    week2f: "星期二",
                    week3f: "星期三",
                    week4f: "星期四",
                    week5f: "星期五",
                    week6f: "星期六",
                    week0t: "周日 {0}",
                    week1t: "週一 {0}",
                    week2t: "週二 {0}",
                    week3t: "週三 {0}",
                    week4t: "週四 {0}",
                    week5t: "週五 {0}",
                    week6t: "週六 {0}",
                    month: "月",
                    month0s: "1月",
                    month1s: "2月",
                    month2s: "3月",
                    month3s: "4月",
                    month4s: "5月",
                    month5s: "6月",
                    month6s: "7月",
                    month7s: "8月",
                    month8s: "9月",
                    month9s: "10月",
                    monthAs: "11月",
                    monthBs: "12月",
                    month0f: "一月",
                    month1f: "二月",
                    month2f: "三月",
                    month3f: "四月",
                    month4f: "五月",
                    month5f: "六月",
                    month6f: "七月",
                    month7f: "八月",
                    month8f: "九月",
                    month9f: "十月",
                    monthAf: "十一月",
                    monthBf: "十二月",
                    year: "年",
                    am: "上午",
                    pm: "下午",
                    empty: "暫無",
                    commaSymbol: "，",
                    colonSymbol: ":",
                    ellipsisSymbol: "...",
                    semicolonSymbol: "; ",
                    enumCommaSymbol: "、",
                    periodSymbol: "。"
                };
            }
            Lp_zhHant.prototype.template = function (templ) {
                if (!templ)
                    return null;
                templ.strings.reg(this.lang, this.strings);
                templ.strings.reg("zh-TW", this.strings);
                templ.strings.reg("zh-HK", this.strings);
                templ.strings.reg("zh-MO", this.strings);
                return templ;
            };
            return Lp_zhHant;
        }());
        Res.Lp_zhHant = Lp_zhHant;
        // Loads the language pack.
        (new Lp_zhHans).template(Res.builtIn());
        (new Lp_zhHant).template(Res.builtIn());
    })(Res = AliHub.Res || (AliHub.Res = {}));
})(AliHub || (AliHub = {}));
//# sourceMappingURL=index.js.map