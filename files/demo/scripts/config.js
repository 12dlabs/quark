(function () {
    var refRootPath = false ? "http://g.alicdn.daily.taobao.net/hub/" : "http://g.alicdn.com/hub/";
    AliHub.Runtime.ModulexLoader.addAliasPrefix("~/wwwroot/", "files/");
    AliHub.Runtime.ModulexLoader.addModule("files", "../wwwroot/");
    if (!window.listener) window.listener = { push: function (str) { console.info(str); } };
})();
