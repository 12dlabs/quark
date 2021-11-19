/*  --------------------
 *  Configuration - Messenger - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  config.js
 *  Description  The loader for tests and demo.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

(function () {
    if (typeof DEBUG === "undefined") DEBUG = true;
    AliHub.Runtime.ModulexLoader.enable("websync/");
    AliHub.Runtime.ModulexLoader.addModule("punycode", "../../src/scripts/html2canvas")
    AliHub.Runtime.ModulexLoader.addModule("websync", "../../src/")
    AliHub.Runtime.ModulexLoader.addModule("demo", "../")
})();
