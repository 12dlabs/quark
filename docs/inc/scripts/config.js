(function () {
    var refRootPath = "https://g.alicdn.com/hub/";
    AliHub.Runtime.ModulexLoader.addAliasPrefix("~/inc/", "local/");
    AliHub.Runtime.ModulexLoader.addModule("local", "../../inc/", true);
    AliHub.Runtime.ModulexLoader.addModule("quark-panels", refRootPath + "quark-panels/0.5.46/");
    AliHub.Runtime.ModulexLoader.addModule("codemirror", refRootPath + "codemirror/5.10/");
    if (!window.listener) window.listener = { push: function (str) { console.info(str); } };
})();
