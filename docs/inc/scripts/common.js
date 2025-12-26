/*  --------------------
*  Common library - Quark online - Alibaba
*  (c) Kingcean Tuan, 2015.
*
*  File  common.ts
*  Description  The common library for the online service.
*  Owner  Kingcean Tuan <kingcean@live.com>
*  --------------------  */
define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
      * Root path.
      */
    exports.rootPath = "../../";
    // Default language pack.
    function initLp(template) {
        var res = {
            name: "Quark",
            hmpgFile: "intro",
            controlFile: "control",
            mvvmFile: "mvvm",
            localizationFile: "localization",
            intro: "Introduction",
            tutorial: "Tutorial",
            reference: "API Reference",
            definition: "Definition",
            usages: "Usages",
            membersInfo: "Member properties and methods",
            optionsInfo: "Options information",
            samples: "Samples",
            demo: "Demo",
            releaseNotes: "Release notes",
            type: "Type",
            db: "Database",
            data: "Data",
            stream: "Stream",
            file: "File",
            object: "Object",
            text: "Text",
            datetime: "Date time",
            collection: "Collection",
            list: "List",
            table: "Table",
            tabs: "Tabs",
            web: "Web",
            network: "Network",
            elements: "Elements",
            graph: "Graph",
            image: "Image",
            picture: "Picture",
            photo: "Photo",
            chart: "Chart",
            media: "Media",
            camera: "Camera",
            audio: "Audio",
            video: "Video",
            panels: "Panels",
            reflection: "Reflection",
            observable: "Observable",
            binding: "Binding",
            diagnostics: "Diagnostics",
            utilities: "Utilities",
            localization: "Localization",
            globalization: "Globalization",
            template: "Template",
            advanced: "Advanced",
            goThrough: "Go through",
            emvvm: "Enhanced MVVM",
            introControl: "Introduce control",
            tdlabs: "12D Labs",
            ape: "Ape",
            oref: "CDN",
            controlClassDeclare: "Class declaration",
            controlOptionsDeclare: "Options contract name",
            controlFactoryDeclare: "Generator declaration",
            usagesJs: "You can create and get an instance in JavaScript by following way. It binds a DOM for accessing and management.",
            usagesJs2: "You can initialize an instance of this class by following way. It binds a DOM for accessing and management.",
            usagesWebC: "This control also supports web component. You can set options or options generator function by attribute {0}.",
            usagesWebC2: "This control also supports web component.",
            usagesFlipper: "For Flipper users, you can create a web component based this as following way.",
            seeCommentDoc: "See comment documentation of {0}.",
            workWithFlipper: "Working together with Flipper",
            prereleased: "Note: This is a preview site which may be substantially modified before it's commercially released."
        };
        template.strings.reg("ww", res);
        template.strings.reg("en", res);
        return template;
    }
    // Setup.
    if (!exports.moduleName) {
        exports.moduleName = "AliHub.Quark.Online";
        require("quark/scripts/import");
        var lp_zh_Hans = require("./zh-Hans");
        AliHub.Diagnostics.debugInfo("Quark online common library loaded (module name " + exports.moduleName + ").");
        var template = AliHub.Res.templates(exports.moduleName, true);
        AliHub.Diagnostics.debugInfo("Registered template " + template.subject() + ".");
        initLp(template);
        lp_zh_Hans.template(template);
    }
    /**
      * Gets SVG source string.
      * @param key  The key.
      */
    function svg(key) {
        if (!key)
            return null;
        return AliHub.Res.svg(exports.moduleName, key);
    }
    exports.svg = svg;
    /**
      * Gets HTML source string.
      * @param key  The key.
      */
    function html(key) {
        if (!key)
            return null;
        return AliHub.Res.html(exports.moduleName, key);
    }
    exports.html = html;
    /**
      * Gets local string.
      * @param key  The key.
      */
    function strings(key, lang) {
        if (!key)
            return null;
        return arguments.length > 1 ? AliHub.Res.strings(exports.moduleName, key, lang) : AliHub.Res.strings(exports.moduleName, key);
    }
    exports.strings = strings;
    /**
      * Sets strings of specific market code.
      * @param lang  The market code.
      * @param value  The strings.
      */
    function local(lang, value) {
        if (!lang || !value)
            return null;
        return AliHub.Res.templates(exports.moduleName).strings.reg(lang, value);
    }
    exports.local = local;
    /**
      * Gets data package resolver.
      * @param key  The key.
      */
    function webResolver(key, value) {
        if (!key)
            return null;
        return arguments.length > 1 ? AliHub.Web.resolver(exports.moduleName, key, value) : AliHub.Web.resolver(exports.moduleName, key);
    }
    exports.webResolver = webResolver;
});
