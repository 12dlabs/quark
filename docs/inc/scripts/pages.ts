/*  --------------------
*  Pages show - Quark online - Alibaba
*  (c) Kingcean Tuan, 2015.
*
*  File  pages.ts
*  Description  The page show script.
*  Owner  Kingcean Tuan <kingcean@live.com>
*  --------------------  */

import bizcommon = require("./common");
import splitlib = require("../../libs/quark-panels/scripts/split");

if ((window as any).require.cssSuport) {
    require("./common");
    require("quark-panels/scripts/split");
    require("../css/pages.css");
}

/**
  * Left menu collection. 
  */
class MenuCollection {

    /**
      * Menu of home. 
      */
    public home(): splitlib.Interfaces.NavMenuContract {
        var col: splitlib.Interfaces.NavMenuContract = [];
        col.name = "Home";
        col.rootPath = "~/library/home/";
        col.defaultItem = { name: "Welcome", url: "./welcome.html" };
        col.push({
            name: "Languages",
            list: [{
                    name: "English",
                    url: "./welcome.html"
                }, {
                    name: "简体中文 (Chinese Simplified)",
                    url: "./zh-Hans.html"
                }]
        });
        return col;
    }

    /**
      * Menu of API reference. 
      */
    public quark(): splitlib.Interfaces.NavMenuContract {
        var col: splitlib.Interfaces.NavMenuContract = [];
        col.name = bizcommon.strings("name");
        col.rootPath = "~/library/reference/";
        col.defaultItem = {
            name: bizcommon.strings("intro"), url: bizcommon.strings("hmpgFile")
        };
        col.push({
            name: bizcommon.strings("tutorial"),
            list: [
                {
                    name: bizcommon.strings("intro"),
                    url: bizcommon.strings("hmpgFile") || "intro"
                },
                {
                    name: bizcommon.strings("introControl"),
                    url: bizcommon.strings("controlFile") || "control"
                },
                {
                    name: bizcommon.strings("emvvm"),
                    url: bizcommon.strings("mvvmFile") || "mvvm"
                },
                {
                    name: bizcommon.strings("goThrough") + " - ECMAScript 5",
                    url: "gothrough-js"
                }, {
                    name: bizcommon.strings("goThrough") + " - Type Script",
                    url: "gothrough-ts"
                }, {
                    name: bizcommon.strings("workWithFlipper"),
                    url: "Flipper"
                }
        });
        col.push({
            name: bizcommon.strings("collection"),
            list: [
                {
                    name: bizcommon.strings("utilities"),
                    url: "collection"
                },
                {
                    name: bizcommon.strings("list"),
                    url: "list"
                },
                {
                    name: bizcommon.strings("table"),
                    url: "table"
                },
                {
                    name: bizcommon.strings("tabs"),
                    url: "SwitchControl"
                },
                {
                    name: "Single flow",
                    url: "SingleFlowPanel"
                }
            ]
        });
        col.push({
            name: bizcommon.strings("web"),
            list: [{
                name: "Web data",
                url: "web"
            }]
        });
        col.push({
            name: bizcommon.strings("graph") + " + " + bizcommon.strings("media"),
            list: [{
                    name: bizcommon.strings("audio"),
                    url: "audio"
                }, {
                    name: bizcommon.strings("image"),
                    url: "image"
                }, {
                    name: bizcommon.strings("camera"),
                    url: "camera"
                }]
        });
        col.push({
            name: bizcommon.strings("object") + " + " + bizcommon.strings("type"),
            list: [
                {
                    name: bizcommon.strings("text"),
                    url: "text"
                },
                {
                    name: bizcommon.strings("datetime"),
                    url: "datetime"
                },
                {
                    name: bizcommon.strings("reflection") + " + " + bizcommon.strings("observable"),
                    url: "reflection"
                },
                {
                    name: bizcommon.strings("elements"),
                    url: "element"
                }
            ]
        });
        col.push({
            name: bizcommon.strings("panels"),
            list: [
                {
                    name: "Wizard + activity",
                    url: "ActivityControl"
                }]
        });
        col.push({
            name: bizcommon.strings("localization"),
            list: [
                {
                    name: bizcommon.strings("localization"),
                    url: bizcommon.strings("localizationFile") || "localization"
                }]
        });
        return col;
    }

}

/**
  * Gets the top menu. 
  */
function menu(): AliHub.Collection.ButtonInfoContract[] {
    return [{
        id: "quark",
        name: "Quark",
        url: "../../library/reference/"
    }, {
        id: "kingcean",
        name: "Kingcean.org",
        url: "https://kingcean.org/"
    }];
}

/**
  * Provides search schema. 
  */
function searchProvider(q: string): AliHub.Collection.ButtonInfoContract[] {
    if (!q || q.length < 1) return null;
    var list: AliHub.Collection.ButtonInfoContract[] = [
        { id: "reference", name: "Search {q} in " + bizcommon.strings("reference"), url: "../../library/reference/?{q}" }
    ];
    return list;
}

/**
  * Sets up the page. 
  */
export function setup(id: string, path: string) {
    // if ((AliHub.Diagnostics.tracker() as any).config) (AliHub.Diagnostics.tracker() as any).config("url", "http://fgt.quark.online.desktop");
    var split = splitlib.splitPage(id, {
        freeload: true,
        leftMenu: new MenuCollection(),
        path: path,
        searchProvider: searchProvider,
        homeInfo: { name: "12D Labs", url: "https://12dlabs.github.io") },
        pageMenu: menu,
        splitPanel: splitlib.AjaxPageSplitPanel,
        defaultPathTemplate: "{0}.html",
        titleTemplate: "{0} - {1} - Library - Quark"
    });
    var extenders = [new CodeExtension(), new ControlDescriptionExtension()];
    var right = split.right() as AliHub.Common.BindingControl<any>;
    right.addExtender(extenders);
    extenders.forEach((ext, i, arr) => {
        ext.load(right);
    });
}

export interface ClassNameContract {
    namespace: string;
    name: string;
    extends?: ClassNameContract;
}

export interface ControlDescriptionContract extends ClassNameContract {
    tagName?: string;
    intro?: string;
    options?: string;
    optionsSample?: any;
    urlsSample?: any;
    hideOptions?: boolean;
    hideMembers?: boolean;
    templates?: string;
}

function genNameHTML(str: string, styleRef?: string | boolean) {
    if (!str) return "";
    var nameI = str.indexOf("<");
    var name = str;
    var nameA = "";
    if (nameI >= 0) {
        name = str.substring(0, nameI);
        nameA = "&lt;" + str.substring(nameI + 1, str.length - 1).replace(/</g, "&lt;").replace(/>/g, "&gt;") + "&gt;"
    }

    if (styleRef === true) styleRef = "ali-x-code-class";
    return "<span" + (!!styleRef && (styleRef as any) !== false ? " class=\"" + styleRef + "\"" : "") + ">" + name + "</span><span>" + nameA + "</span>";
}

function lowerFirst(str: string) {
    return str.substring(0, 1).toLowerCase() + str.substring(1);
}

function objHTML(obj: any, iip = 0, firstI = false, singleQuote = false, thisStr: string = null) {
    if (iip == null) iip = 0;
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

    if (obj == null) return prefix + "<span class=\"ali-x-code-keyword\">null</span>";
    if (typeof obj === "string") {
        if (obj.length > 5 && obj.indexOf("**$") === 0 && obj.lastIndexOf("**") === obj.length - 2) {
            var str = obj.substring(3, obj.length - 2);
            if (!!thisStr && str === "this") return thisStr;
            return str;
        }

        return "<span class=\"ali-x-code-string\">" + quoteStr + obj + quoteStr + "</span>";
    }

    if (typeof obj === "function") return "<span class=\"ali-x-code-unknown\">" + obj.toString().replace("function", "</span><span class=\"ali-x-code-keyword\">function</span><span class=\"ali-x-code-unknown\">") + "</span>";
    if (typeof obj === "number") return prefix1 + "<span class=\"ali-x-code-number\">" + obj.toString() + "</span>";
    if (typeof obj === "boolean") return prefix1 + "<span class=\"ali-x-code-keyword\">" + (obj ? "true" : "false") + "</span>";
    if (obj instanceof Date) return prefix1 + "<span class=\"ali-x-code-number\">" + (obj as Date).getTime().toString() + "</span>";
    if (obj instanceof Array) {
        var list: string[] = [];
        var len = 0;
        obj.forEach((ele, i, list) => {
            var str = objHTML(ele, nextIip, false, singleQuote, thisStr);
            list.push(str);
            len += str.length;
        });

        return prefix1 + (len < 50 ? "[" + list.join(", ") + "]" : "[" + nl + list.join("," + nl + prefix2) + nl + "]");
    }

    var objStr = prefix1 + "{";
    var objLen = 0;
    for (var prop in obj) {
        if (!prop || typeof prop !== "string") return;
        objLen++;
        objStr += nl + prefix2 + "<span class=\"ali-x-code-string\">" + quoteStr + prop + quoteStr + "</span>: " + objHTML(obj[prop], nextIip, false, singleQuote, thisStr) + ",";
    }

    if (objLen === 0) return "";
    objStr = objStr.substring(0, objStr.length - 1) + nl + prefix + "}";
    return objStr;
}

function genOptionsHTML(options: any, iip = 0, singleQuote = false) {
    if (iip == null) iip = 0;
    var prefix = "";
    for (var step = 0; step < iip; step++) {
        prefix += "&nbsp; &nbsp; ";
    }

    var prefix2 = prefix;
    var nl = " ";
    if (iip >= 0) {
        nl = "<br />";
        prefix2 += "&nbsp; &nbsp; ";
    }

    var str: string;
    if (!!options) str = "<span class=\"ali-x-code-keyword\">function</span> () { " + nl + prefix2 + "<span class=\"ali-x-code-keyword\">var</span> c = <span class=\"ali-x-code-keyword\">this</span>;" + nl + prefix2 + "<span class=\"ali-x-code-keyword\">return</span> " + objHTML(options, iip > 0 ? iip + 1 : -1, false, singleQuote, "c") + ";" + nl + prefix + "}";
    else str = "{" + nl + prefix2 + "styleRef: <span class=\"ali-x-code-string\">'sample'</span>," + nl + prefix2 + "attr: { title: <span class=\"ali-x-code-string\">'Test'</span> }" + nl + prefix + "}";
    return str;
}

function genControlDescHTML(info: ControlDescriptionContract) {
    if (!info || !info.name) return "";
    var hasNs = !!info.namespace;
    var cName = info.name;
    var cNameI = cName.indexOf("<");
    if (cNameI === 0) return "";
    if (cNameI > 0) cName = cName.substring(0, cNameI);
    var nameHTML = genNameHTML(info.name, true);
    var iips = "&nbsp; &nbsp; ";
    var idParam = "id: <span class=\"ali-x-code-keyword\">string</span> | <span class=\"ali-x-code-class\">HTMLElement</span>";
    var funcNameHTML = genNameHTML(lowerFirst(info.name), "ali-x-code-function");
    var funcNameHTML2 = lowerFirst(cName);

    var str = "<h1>" + (hasNs ? info.namespace + "." : "") + genNameHTML(info.name) + "</h1><div class=\"ali-x-section-code\">";
    if (hasNs) str += "<span class=\"ali-x-code-keyword\">namespace</span> <span class=\"ali-x-code-namespace\">" + info.namespace + "</span> {<br /><br />";
    str += (hasNs ? iips : "") + "<span class=\"ali-x-code-comment\">// " + bizcommon.strings("controlClassDeclare") + AliHub.Res.builtIn().localString("periodSymbol") + "</span><br />" + (hasNs ? iips : "") + "<span class=\"ali-x-code-keyword\">export class</span> " + nameHTML + " <span class=\"ali-x-code-keyword\">extends</span> ";
    if (!!info.extends && !!info.extends.name) {
        str += "<span class=\"ali-x-code-namespace\">" + (!!info.extends.namespace ? info.extends.namespace + "." : "") + "</span>" + genNameHTML(info.extends.name, true);
    } else {
        str += "<span class=\"ali-x-code-namespace\">AliHub.Common.</span><span class=\"ali-x-code-class\">VisualControl</span>";
    }

    str += " {<br />" + (hasNs ? iips : "") + iips + "<span class=\"ali-x-code-keyword\">public constructor</span>(" + idParam + ");<br />" + (hasNs ? iips : "") + "}";
    if (!!info.options) {
        str += "<br /><br />" + (hasNs ? iips : "") + "<span class=\"ali-x-code-comment\">// " + bizcommon.strings("controlOptionsDeclare") + AliHub.Res.builtIn().localString("periodSymbol") + "</span><br />" + (hasNs ? iips : "") + "<span class=\"ali-x-code-keyword\">export interface</span> " + genNameHTML(info.options, true) + " { }<br /><br />"
            + (hasNs ? iips : "") + "<span class=\"ali-x-code-comment\">// " + bizcommon.strings("controlFactoryDeclare") + AliHub.Res.builtIn().localString("periodSymbol") + "</span><br />" + (hasNs ? iips : "") + "<span class=\"ali-x-code-keyword\">export function</span> " + funcNameHTML
            + " (<br />" + (hasNs ? iips : "") + iips + idParam + ",<br />" + (hasNs ? iips : "") + iips + "options?: " + genNameHTML(info.options, true) + " | <span class=\"ali-x-code-keyword\">boolean</span><br />" + (hasNs ? iips : "") + "): " + nameHTML + " { }";
    }

    if (hasNs) str += "<br />}";
    str += "</div><p>" + (info.intro || "") + "</p><h2>" + bizcommon.strings("usages") + "</h2>";
    if (!!info.options) {
        var iip4bs = "<br />" + iips + iips + iips + iips;
        var urlsHTML = !!info.urlsSample ? objHTML(info.urlsSample, -1, false, true) : "";
        if (urlsHTML.length > 4) {
            urlsHTML = urlsHTML.substring(2, urlsHTML.length - 2);
            urlsHTML = " <span class=\"ali-x-code-attr\">urls</span>=&quot;" + urlsHTML + "&quot;";
        }

        str += "<p>" + bizcommon.strings("usagesJs") + "</p><div class=\"ali-x-section-code\">&lt;<span class=\"ali-x-code-tagname\">div</span> <span class=\"ali-x-code-attr\">id</span>=<span class=\"ali-x-code-string\">\"an_element_to_bind\"</span>" + urlsHTML + "&gt;<br />";
        if (!!info.templates) str += "<div class=\"ali-x-code-unknown\">" + info.templates + "</div><br />";
        str += "&lt;/<span class=\"ali-x-code-tagname\">div</span>&gt;<br /><br />&lt;<span class=\"ali-x-code-tagname\">script</span> <span class=\"ali-x-code-attr\">type</span>=<span class=\"ali-x-code-string\">\"text/javascript\"</span>&gt;<br />" + iips
            + "<span class=\"ali-x-code-keyword\">var</span> control = " + (hasNs ? "<span class=\"ali-x-code-namespace\">" + info.namespace + "</span>." : "") + "<span class=\"ali-x-code-function\">" + funcNameHTML2 + "</span>(<span class=\"ali-x-code-string\">\"an_element_to_bind\"</span>, "
            + genOptionsHTML(info.optionsSample, 1, false)
            + ");<br />&lt;/<span class=\"ali-x-code-tagname\">script</span>&gt;</div>";
        if (!!info.tagName) {
            str += "<p>" + bizcommon.strings("usagesWebC").replace("{0}", "<code data-mine=\"word\">control-options</code>") + "</p><div class=\"ali-x-section-code\">&lt;<span class=\"ali-x-code-tagname\">" + info.tagName + "</span> <span class=\"ali-x-code-attr\">control-options</span>=\""
                + genOptionsHTML(info.optionsSample, 1, true)
                + "\"" + urlsHTML + "&gt;<br />";
            if (!!info.templates) str += "<div class=\"ali-x-code-unknown\">" + info.templates + "</div><br />";
            str += "&lt;/<span class=\"ali-x-code-tagname\">" + info.tagName + "</span>&gt;</div>";
        }

        str += "<p>" + bizcommon.strings("usagesFlipper").replace("{0}", "<a href=\"" + bizcommon.rootPath + "library/reference/?./Flipper.html\">" + bizcommon.strings("workWithFlipper") + "</a>") + "</p><div class=\"ali-x-section-code\"><span class=\"ali-x-code-comment\">&lt;!-- Declare a web component. --&gt;</span><br />"
            + "&lt;<span class=\"ali-x-code-tagname\">web-component</span> <span class=\"ali-x-code-attr\">name</span>=<span class=\"ali-x-code-string\">\"sample-wc\"</span>&gt;<br />" + iips + "&lt;<span class=\"ali-x-code-tagname\">template</span>&gt;<br />";
        if (!!info.templates) str += "<div class=\"ali-x-code-unknown\">" + info.templates + "</div><br />";
        str += iips + "&lt;/<span class=\"ali-x-code-tagname\">template</span>&gt;<br />" + iips + "&lt;<span class=\"ali-x-code-tagname\">script</span>&gt;<br />" + iips + iips + "Flipper.register([<span class=\"ali-x-code-string\">'quark/scripts/import.min.js'</span>], <span class=\"ali-x-code-keyword\">function</span> (ql) {<br />" + iips + iips + iips
            + "<span class=\"ali-x-code-keyword\">return</span> {" + iip4bs + "controlType: " + (hasNs ? "<span class=\"ali-x-code-namespace\">" + info.namespace + "</span>." : "") + nameHTML + "," + iip4bs + "options: "
            + genOptionsHTML(info.optionsSample, 4, false)
            + "," + iip4bs + "ready: <span class=\"ali-x-code-keyword\">function</span> () {" + iip4bs + iips + "<span class=\"ali-x-code-keyword\">var</span> c = ql.<span class=\"ali-x-code-namespace\">Bindings</span>.bindFlipper(<span class=\"ali-x-code-keyword\">this</span>);" + iip4bs + "}<br />" + iips + iips + iips
            + "};<br />" + iips + iips + "}" + "<br />" + iips + "&lt;/<span class=\"ali-x-code-tagname\">script</span>&gt;<br />&lt;/<span class=\"ali-x-code-tagname\">web-component</span>&gt;<br /><br />"
            + "<span class=\"ali-x-code-comment\">&lt;!-- " + bizcommon.strings("usages") + AliHub.Res.builtIn().localString("periodSymbol") + " --&gt;</span><br />&lt;<span class=\"ali-x-code-tagname\">sample-wc</span>" + urlsHTML + "&gt;<br />&lt;/<span class=\"ali-x-code-tagname\">sample-wc</span>&gt;</div>";
    } else {
        str += "<p>" + bizcommon.strings("usagesJs2") + "</p><div class=\"ali-x-section-code\"><span class=\"ali-x-code-keyword\">var</span> c = <span class=\"ali-x-code-keyword\">new</span> <span class=\"ali-x-code-class\">" + cName + "</span>(<span class=\"ali-x-code-string\">\"an_element_to_bind\"</span>);</div>";
        if (!!info.tagName) str += "<p>" + bizcommon.strings("usagesWebC2") + "</p><div class=\"ali-x-section-code\">&lt;<span class=\"ali-x-code-tagname\">" + info.tagName + "</span>&gt;<br />&lt;/<span class=\"ali-x-code-tagname\">" + info.tagName + "</span>&gt;</div>";
    }

    if (!!info.options && !info.hideOptions) {
        str += "<h2>" + bizcommon.strings("optionsInfo") + "</h2><p>" + bizcommon.strings("seeCommentDoc").replace("{0}", "<code data-mine=\"word\">" + (hasNs ? info.namespace + "." : "") + genNameHTML(info.options) + "</code>") + "</p>";
    }

    if (!info.hideMembers) str += "<h2>" + bizcommon.strings("membersInfo") + "</h2><p>" + bizcommon.strings("seeCommentDoc").replace("{0}", "<code data-mine=\"word\">" + (hasNs ? info.namespace + "." : "") + genNameHTML(info.name) + "</code>") + "</p>";
    return str;
}

export class ControlDescriptionExtension<T> implements AliHub.Common.BindingControlExtender<T> {

    /**
      * Extender name.
      */
    public name = "quark.site.description.control";

    /**
      * Loads after done.
      * @param control  The target control.
      */
    public load(control: AliHub.Common.BindingControl<T>): void {
        if (typeof CodeMirror === "undefined") return;
        if (!CodeMirror) return;
        var proc = (newValue) => {
            if (!newValue) return;
            setTimeout(() => {
                var ele = control.getElement();
                var codeEles = ele.getElementsByTagName("section");
                if (!!codeEles) for (var step = 0; step < codeEles.length; step++) {
                    var codeEle = codeEles[step];
                    if (!codeEle || (codeEle as any)._isEditor) continue;
                    (codeEle as any)._isEditor = true;
                    var codeHtml = AliHub.Common.Text.trim(codeEle.innerHTML);
                    if (!codeHtml) continue;
                    var classInfo = AliHub.Elements.parseAttr<ControlDescriptionContract>(codeEle, "data-code-control");
                    if (!classInfo) continue;
                    var templates = codeEle.getElementsByTagName("div");
                    if (!templates || templates.length === 0) {
                        if (!classInfo.intro) classInfo.intro = codeHtml;
                    } else {
                        for (var index in templates) {
                            var template = templates[index] as HTMLDivElement;
                            if (!template || !template.tagName) break;
                            var templateKey = AliHub.Elements.getAttr(template, ["data-part", "data-key", "part", "key"]);
                            if (!!templateKey) switch (templateKey.toString().toLowerCase()) {
                                case "intro":
                                    if (!classInfo.intro) classInfo.intro = template.innerHTML;
                                    break;
                                case "templates":
                                    classInfo.templates = AliHub.Common.Text.trim(template.innerHTML);
                                    if (!!classInfo.templates) {
                                        classInfo.templates = AliHub.Common.Text.toHTML(classInfo.templates).replace(/ data-temp-bind=&quot;/g, " <span class=\"ali-x-code-attr\">data-bind</span>=&quot;")
                                            .replace(/&lt;part key=\&quot;/g, "<br />&lt;<span class=\"ali-x-code-tagname\">part</span> <span class=\"ali-x-code-attr\">key</span>=\&quot;").replace(/&lt;\/part/g, "<br />&lt;\/<span class=\"ali-x-code-tagname\">part</span>")
                                            .replace(/&lt;p /g, "<br />&lt;<span class=\"ali-x-code-tagname\">p</span> ").replace(/&lt;\/p/g, "<br />&lt;\/<span class=\"ali-x-code-tagname\">p</span>").replace(/&lt;p&gt;/g, "<br />&lt;\/<span class=\"ali-x-code-tagname\">p</span>&gt;")
                                            .replace(/&lt;div /g, "<br />&lt;<span class=\"ali-x-code-tagname\">div</span> ").replace(/&lt;\/div/g, "<br />&lt;\/<span class=\"ali-x-code-tagname\">div</span>").replace(/&lt;div&gt;/g, "<br />&lt;\/<span class=\"ali-x-code-tagname\">div</span>&gt;")
                                            .replace(/&lt;span /g, "&lt;<span class=\"ali-x-code-tagname\">span</span> ").replace(/&lt;\/span/g, "&lt;\/<span class=\"ali-x-code-tagname\">span</span>").replace(/&lt;span&gt;/g, "<br />&lt;\/<span class=\"ali-x-code-tagname\">span</span>&gt;")
                                            .replace(/ return /g, " <span class=\"ali-x-code-keyword\">return</span> ").replace(/ return;/g, " <span class=\"ali-x-code-keyword\">return</span>;").replace(/ break;/g, " <span class=\"ali-x-code-keyword\">break</span>;").replace(/\(typeof /g, "(<span class=\"ali-x-code-keyword\">typeof</span> ");
                                    }

                                    break;
                                case "templstrings":
                                    classInfo.templates = AliHub.Common.Text.trim(template.innerHTML);
                                    break;
                                default:
                                    break;
                            }
                        }
                    }

                    try {
                        var cdh = genControlDescHTML(classInfo);
                        if (!!cdh) codeEle.innerHTML = cdh;
                    } catch (ex) { }
                }
            }, 1600);
        };
        proc(control.viewModel());
        control.subscribeViewModel(proc);
    }
}

declare var CodeMirror;
export class CodeExtension<T> implements AliHub.Common.BindingControlExtender<T> {

    /**
      * Extender name.
      */
    public name = "quark.site.code";

    /**
      * Loads after done.
      * @param control  The target control.
      */
    public load(control: AliHub.Common.BindingControl<T>): void {
        if (typeof CodeMirror === "undefined") return;
        if (!CodeMirror) return;
        var proc = (newValue) => {
            if (!newValue) return;
            setTimeout(() => {
                var ele = control.getElement();
                var codeEles = ele.getElementsByTagName("code");
                if (!!codeEles) for (var step = 0; step < codeEles.length; step++) {
                    var codeEle = codeEles[step];
                    if (!codeEle || (codeEle as any)._isEditor) continue;
                    (codeEle as any)._isEditor = true;
                    var codeHtml = AliHub.Common.Text.trim(codeEle.innerHTML);
                    if (!codeHtml || codeHtml.length < 50 || codeHtml.indexOf("<") < 0) continue;
                    var langM = AliHub.Elements.getAttr(codeEle, "data-mine");
                    if (langM === "none" || langM === "word") continue;
                    codeEle.innerHTML = "";
                    var codeText = AliHub.Common.Text.parseHTML(codeHtml);
                    if (!langM) langM = codeText.indexOf("<") === 0 ? "text/html" : "text/typescript";
                    try {
                        var myCodeMirror = CodeMirror(codeEle, {
                            value: codeText,
                            lineNumbers: true,
                            mode: langM
                        });
                        myCodeMirror.setSize('auto', 'auto');
                        AliHub.Elements.changeStyleRef(codeEle, "ali-panel-code-customized");
                    } catch (ex) {
                        codeEle.innerHTML = codeHtml;
                    }
                }
            }, 2000);
        };
        proc(control.viewModel());
        control.subscribeViewModel(proc);
    }
}
