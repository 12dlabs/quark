/*  --------------------
 *  Kissy loader - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  kissyLoader.js
 *  Description  Loader by Kissy and optimization.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

var AliHub;
(function (AliHub) {
    var Runtime;
    (function (Runtime) {
        Runtime.loadModule = function (name, path) {
            try {
                var checkIns = eval(name);
                if (!!checkIns) return;
            } catch (ex) { }
            var instance = require(path);
            eval(name + "=instance;");
            return instance;
        };
        var KissyLoader = (function () {
            function KissyLoader() {
            }
            KissyLoader._aliasPref = [];
            KissyLoader.addModule = function (key, path) {
                var now = new Date();
                var debugMode = typeof DEBUG !== "undefined" && DEBUG === true ? true : false;
                var packageList = {};
                packageList[key] = {
                    path: path,
                    debug: debugMode,
                    tag: now.getTime().toString(),
                    combine: false,
                    ignorePackageNameInUri: true,
                    charset: "utf-8"
                }
                if (typeof KISSY === "undefined") {
                    KISSY = modulex;
                    if (!KISSY.ready) KISSY.ready = function (e) {
                        if (typeof addEventListener !== "undefined" && !!addEventListener) addEventListener(window, "load", e);
                    };
                }
                KISSY.config({
                    packages: packageList
                });
            };
            KissyLoader.setup = function (corePath, bindingPath) {
                if (KissyLoader._loaded) return;
                KissyLoader._loaded = true;
                var now = new Date();
                var debugMode = typeof DEBUG !== "undefined" && DEBUG === true ? true : false;
                if (typeof KISSY === "undefined") {
                    KISSY = modulex;
                    if (!KISSY.ready) KISSY.ready = function (e) {
                        if (typeof addEventListener !== "undefined" && !!addEventListener) addEventListener(window, "load", e);
                    };
                }
                var containPackage = false;
                var packages = {};
                if (!!corePath && corePath != "") {
                    packages.quark = {
                        path: corePath,
                        debug: debugMode,
                        tag: now.getTime().toString(),
                        combine: false,
                        ignorePackageNameInUri: true,
                        charset: "utf-8"
                    };
                    KissyLoader.addAliasPrefix("~/libs/quark/", "quark/");
                    containPackage = true;
                }

                if (!!bindingPath && bindingPath != "") {
                    packages["quark-bindings"] = {
                        path: bindingPath,
                        debug: debugMode,
                        tag: now.getTime().toString(),
                        combine: false,
                        ignorePackageNameInUri: true,
                        charset: "utf-8"
                    };
                    containPackage = true;
                }

                if (containPackage) {
                    KISSY.config({
                        packages: packages
                    });
                    KissyLoader.addAliasPrefix("~/libs/quark-", "quark-");
                }

                if (!!KissyLoader._define || define === KissyLoader.regModule) return;
                KissyLoader._define = define;
                define = KissyLoader.regModule;
                if (!!modulex && !KissyLoader._getRequires && !!modulex.Loader.Utils.getRequiresFromFn) {
                    KissyLoader._getRequires = modulex.Loader.Utils.getRequiresFromFn;
                    modulex.Loader.Utils.getRequiresFromFn = function (fn) {
                        return !!fn.raw ? KissyLoader._getRequires(fn.raw) : [];
                    };
                }
            };
            KissyLoader.enable = function (value) {
                if (value === false || value === 0 || value === "disable" || value === "f" || value === "F") {
                    if (!!KissyLoader._define) define = KissyLoader._define;
                    if (!!modulex && !!KissyLoader._getRequires) modulex.Loader.Utils.getRequiresFromFn = KissyLoader._getRequires;
                } else {
                    define = KissyLoader.regModule;
                }
            };
            KissyLoader.regModule = function (name, deps, callback) {
                if (typeof name !== 'string') {
                    callback = deps;
                    deps = name;
                    name = null;
                }
                if (!(deps instanceof Array)) {
                    callback = deps;
                    deps = null;
                }
                var originalCallback = callback;
                if (!name || (!!name && !!deps && deps.length > 2 && ((deps[0] === "require" && deps[1] === "exports") || (deps[0] === "exports" && deps[1] === "require")))) {
                    if (!!deps && deps.length >= 2 && (deps.length > 2 || (deps[0] === "exports" && deps[1] === "require"))) {
                        callback = function (aR, aE, aM) {
                            if (deps[0] === "exports" && deps[1] === "require") {
                                var aTemp = aR;
                                aR = aE;
                                aE = aTemp;
                            }

                            var args = [aR, aE];
                            var moduleName = aM.name;
                            if (!aM.requires) aM.requires = [];
                            if (!moduleName) moduleName = aM.id;
                            var curPath = moduleName.split("/");
                            deps.forEach(function (depItem, depIndex, depArr) {
                                if (!depItem || depIndex < 2) return;
                                var depPath = depItem.toString();
                                var depPathLen = 0;
                                var replaceDepItem = depItem;
                                if (depItem.indexOf("./") === 0) {
                                    depPathLen = 1;
                                    replaceDepItem = replaceDepItem.replace("./", "");
                                } else if (depItem.indexOf("../") === 0) {
                                    while (true) {
                                        var tmpReplaceDepItem = replaceDepItem.replace("../", "");
                                        if (replaceDepItem.length === tmpReplaceDepItem.length) break;
                                        replaceDepItem = tmpReplaceDepItem;
                                    }
                                    depPathLen = (depItem.length - replaceDepItem.length) / 3 + 1;
                                }
                                if (depPathLen > 0) {
                                    var arrDepPath = depPath.split("/");
                                    depPath = "";
                                    if (curPath.length > depPathLen) {
                                        for (var i = 0; i < curPath.length - depPathLen; i++) {
                                            depPath += curPath[i] + "/";
                                        }

                                        var depPathStart = arrDepPath.length - depPathLen;
                                        if (depPathStart < 0) depPathStart = 0;
                                        for (var i = depPathStart; i < arrDepPath.length - 1; i++) {
                                            depPath += arrDepPath[i] + "/";
                                        }

                                        depPath += arrDepPath[arrDepPath.length - 1];
                                        depPath = KissyLoader.applyAliasPath(depPath);
                                    } else if (curPath.length === depPathLen) {
                                        var depItemPath = KissyLoader.applyAliasPath("~/" + replaceDepItem);
                                        if (depItemPath == "~/" + replaceDepItem) {
                                            args.push(null);
                                            return;
                                        }

                                        depPath = depItemPath;
                                    } else {
                                        args.push(null);
                                        return;
                                    }
                                }

                                aM.requires.push("depPath");
                                var depInstance = aR(depPath);
                                if (typeof depInstance == "undefined" && !!console && !!console.error) {
                                    console.error("Failed to load module. (" + moduleName + " -> " + depPath + ")", aM);
                                }

                                args.push(depInstance);
                            });
                            try {
                                var exCount1 = 0;
                                if (!!aM && !!aM.exports) for (var exProp in aM.exports) {
                                    exCount1++;
                                }

                                var moduleExport = originalCallback.apply(aM, args);
                                if (!moduleExport && !!aM && aM.exports) {
                                    var exCount2 = 0;
                                    for (var exProp in aM.exports) {
                                        exCount2++;
                                    }

                                    if (exCount1 < exCount2) moduleExport = aM.exports;
                                }

                                if (!moduleExport) {
                                    if (!!console && !!console.error) console.error("Failed to resolve module. (" + moduleName + ")", aM);
                                }

                                aM.exports = moduleExport;
                                return moduleExport;
                            } catch (ex) {
                                if (!!console && !!console.error) console.error("Failed to load module. (" + moduleName + ")", ex);
                                throw ex;
                            }
                        }

                    }

                    callback.raw = originalCallback;
                    KissyLoader._define(callback);
                    return;
                }

                if (!!name && !!deps && deps.length >= 2 && typeof KISSY !== "undefined" && !!KISSY.version && KISSY.version.toString().indexOf("6.") === 0) {
                    callback = function () {
                        var aM = arguments[2];
                        var moduleName = aM.name;
                        if (!moduleName) moduleName = aM.id;
                        try {
                            var moduleExport = originalCallback.apply(aM, arguments);
                            if (!aM.exports) moduleExport = aM.exports;
                            if (!moduleExport) {
                                if (!!console && !!console.error) console.error("Failed to resolve module. (" + moduleName + ")");
                            }
                            aM.exports = moduleExport;
                            return moduleExport;
                        } catch (ex) {
                            if (!!console && !!console.error) console.error("Failed to load module. (" + moduleName + ")", ex);
                            throw ex;
                        }
                    };

                    KissyLoader._define(callback);
                    return;
                }

                KissyLoader._define(name, deps, callback);
            };
            KissyLoader.regModule.amd = {
                jQuery: true
            };
            KissyLoader.addAliasPrefix = function (originalPrefix, correctPrefix) {
                if (!originalPrefix || !correctPrefix || originalPrefix == "") return;
                if (KissyLoader._aliasPref.some(function (ele, i, arr) {
                    if (!ele || ele.key !== originalPrefix || !ele.value) return false;
                    ele.value = correctPrefix;
                    return true;
                })) return;
                KissyLoader._aliasPref.push({ key: originalPrefix, value: correctPrefix });
            };
            KissyLoader.applyAliasPath = function (path) {
                KissyLoader._aliasPref.some(function (prefItem, prefIndex, prefArr) {
                    if (!prefItem || !prefItem.key || prefItem.key == "" || path.indexOf(prefItem.key) < 0) return false;
                    path = path.replace(prefItem.key, prefItem.value);
                    return true;
                });
                return path;
            };
            return KissyLoader;
        })();
        Runtime.KissyLoader = KissyLoader;
        KissyLoader.setup();
    })(Runtime = AliHub.Runtime || (AliHub.Runtime = {}));
})(AliHub || (AliHub = {}));
if (typeof define === 'function') {
    if (define['amd']) {
        define(["exports"], function (exports) {
            return AliHub.Runtime.KissyLoader;
        });
    } else if (!!modulex) {
        define(function (aR, aE, aM) {
            return AliHub.Runtime.KissyLoader;
        });
    }
}
