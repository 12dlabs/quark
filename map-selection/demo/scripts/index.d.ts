import editor = require("../../src/scripts/editor");
export = Main;
declare module Main {
    var map: editor.MapControl;
    function load(): void;
}
