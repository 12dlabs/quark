(function () {
    window.ql = AliHub;
    ql.Runtime.KissyLoader.addAliasPrefix("~/wwwroot/", "witness/");
    modulex.addModule = AliHub.Runtime.KissyLoader.addModule;
    modulex.addModule("quark", "http://g.alicdn.daily.taobao.net/hub/quark/1.7.897/");
    modulex.addModule("jquery", "https://g.alicdn.com/hub/jquery/2.2.1/index.min");
    modulex.addModule("witness", "../wwwroot/");
    modulex.principle = function (value) {
        return AliHub.Users.principle(value);
    };
})();
