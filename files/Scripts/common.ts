/*  --------------------
 *  Common library - Files - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  common.ts
 *  Description  File common library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

/* ------- Name ------- */

var moduleName = "Ali.Files";
export var name = moduleName;

export var templates = AliHub.Res.templates(moduleName, true);
AliHub.Diagnostics.debugInfo("Module " + moduleName + " loaded.");

if (typeof require !== "undefined") {
    if (!!require && (require as any).cssSuport) require("../css/common.min.css");
}

/* ------- Localization ------- */
    
(function () {
    // Language pack "en" (default).
    var lp = {
        upload: "Upload",
        download: "Download",
        add: "Add",
        remove: "Remove",
        empty: "Empty",
        file: "File",
        folder: "Folder",
        search: "Search",
        addAttachment: "Add attachment",
        ok: "OK",
        submit: "Submit",
        cancel: "Cancel",
        note: "Note",
        homepage: "Homepage",
        name: "Files"
    };
    templates.strings.reg("ww", lp);
    templates.strings.reg("en", lp);

    // Language pack "zh-Hans".
    lp = {
        upload: "上传",
        download: "下载",
        add: "添加",
        remove: "删除",
        empty: "空",
        file: "文件",
        folder: "文件夹",
        search: "搜索",
        addAttachment: "添加附件",
        ok: "确定",
        submit: "提交",
        cancel: "取消",
        note: "备注",
        homepage: "主页",
        name: "文件"
    };
    templates.strings.reg("zh-Hans", lp);
    templates.strings.reg("zh-CN", lp);
    templates.strings.reg("zh-SG", lp);

    // SVG resources.
    templates.svg("upper", `<svg class="ali-x-action-upper" width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<title>Upper</title>
<defs></defs>
<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <g transform="translate(-7.000000, -7.000000)">
        <rect x="7" y="7" width="16" height="16"></rect>
        <path d="M15.9011094,8.27376428 C15.6550727,8.03069024 15.3188225,7.95979364 15,8.02056215 C14.6811775,7.95979364 14.3449273,8.03069024 14.0988906,8.27376428 L8.30062608,14.0062604 C7.89979131,14.4012558 7.89979131,15.0393251 8.30062608,15.4444485 C8.69941054,15.8394438 9.34935745,15.8394438 9.75019222,15.4444485 L13.9748471,11.2615494 L13.9748471,21.9871915 C13.9748471,22.5442362 14.4330905,23 15,23 C15.5669095,23 16.0251529,22.5442362 16.0251529,21.9871915 L16.0251529,11.2615494 L20.2498078,15.4444485 C20.6506426,15.8394438 21.2995643,15.8394438 21.6993739,15.4444485 C22.1002087,15.0393251 22.1002087,14.4012558 21.6993739,14.0062604 L15.9011094,8.27376428 L15.9011094,8.27376428 L15.9011094,8.27376428 Z" id="arrow-up-circle-path" fill="#000000"></path>
    </g>
</g>
</svg>`);
    templates.svg("refresh", `<svg class="ali-x-field-refresh" id="Layer_1" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve">
<path fill="#333333" d="M16,2.2v4.4c0,0.4-0.3,0.7-0.7,0.7h-4.4c-0.4,0-0.7-0.3-0.7-0.7c0-0.4,0.3-0.7,0.7-0.7h2.5c-1-1-1.8-1.7-2-1.9
    c-0.6-0.6-1.2-1-1.9-1.3C8.8,2.3,8,2.2,7.3,2.2S5.8,2.3,5.1,2.6C4.4,2.9,3.7,3.3,3.2,3.9c-0.6,0.6-1,1.2-1.3,1.9
    C1.6,6.5,1.5,7.2,1.5,8s0.1,1.5,0.4,2.2c0.3,0.7,0.7,1.4,1.3,1.9c0.6,0.6,1.2,1,1.9,1.3c0.7,0.3,1.4,0.4,2.2,0.4s1.5-0.1,2.2-0.4
    c0.7-0.3,1.4-0.7,1.9-1.3c0.3-0.3,0.6-0.7,0.8-1c0.2-0.4,0.4-0.7,0.6-1.1c0.1-0.4,0.5-0.6,0.9-0.4c0.4,0.1,0.6,0.5,0.4,0.9
    c-0.2,0.5-0.4,1-0.7,1.4c-0.3,0.5-0.6,0.9-1,1.3c-0.7,0.7-1.5,1.2-2.4,1.6c-0.4,0.2-0.9,0.3-1.3,0.4c-0.5,0.1-0.9,0.1-1.4,0.1
    c-0.5,0-0.9,0-1.4-0.1c-0.5-0.1-0.9-0.2-1.3-0.4c-0.9-0.4-1.7-0.9-2.4-1.6s-1.2-1.5-1.6-2.4c-0.2-0.4-0.3-0.9-0.4-1.3
    C0,8.9,0,8.5,0,8c0-0.5,0-0.9,0.1-1.4c0.1-0.5,0.2-0.9,0.4-1.3c0.4-0.9,0.9-1.7,1.6-2.4s1.5-1.2,2.4-1.6C5,1.1,5.4,0.9,5.9,0.9
    c0.5-0.1,0.9-0.1,1.4-0.1c0.5,0,0.9,0,1.4,0.1C9.1,0.9,9.6,1.1,10,1.3c0.9,0.4,1.7,0.9,2.4,1.6c0.2,0.2,1.1,1,2.1,2.1V2.2
    c0-0.4,0.3-0.7,0.7-0.7C15.7,1.5,16,1.8,16,2.2z"/>
</svg>`);
    templates.svg("collapsed", `<svg class="ali-x-field-collapsed" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<title>Collapsed folder icon</title>
<defs></defs>
<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <rect id="Rectangle-161" x="0" y="0" width="16" height="16"></rect>
    <polygon id="Triangle-1-Copy-6" fill="#333333" points="7 12 7 4 11 8"></polygon>
</g>
</svg>`);
    templates.svg("expanded", `<svg class="ali-x-field-expanded" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<title>Expanded folder icon</title>
<defs></defs>
<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <rect id="Rectangle-161" x="0" y="0" width="16" height="16"></rect>
    <polygon id="Triangle-1-Copy-6" fill="#333333" transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000) " points="6 12 6 4 10 8"></polygon>
</g>
</svg>`);
    templates.svg("noToggle", `<svg class="ali-x-field-empty" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<title>Empty folder icon</title>
<defs></defs>
<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
</g>
</svg>`);
    templates.svg("folder", `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
<g>
    <path d="M28,7H14.4l-1.7-1.7C12.5,5.1,12.3,5,12,5H4C2.9,5,2,5.9,2,7v18c0,1.1,0.9,2,2,2h24c1.1,0,2-0.9,2-2V9
        C30,7.9,29.1,7,28,7z" class="ali-x-svg-fill" />
    <path d="M28,7H14.4l-1.7-1.7C12.5,5.1,12.3,5,12,5H4C2.9,5,2,5.9,2,7v18c0,1.1,0.9,2,2,2h24
        c1.1,0,2-0.9,2-2V9C30,7.9,29.1,7,28,7z M11.6,7l1.7,1.7C13.5,8.9,13.7,9,14,9h14l0,2H4V7H11.6z M4,25V13h24l0,12H4z" class="ali-x-svg-stroke"/>
</g>
</svg>`);
    templates.svg("file", `<svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<title>File</title>
<defs></defs>
<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <rect x="0" y="0" width="16" height="16"></rect>
    <g transform="translate(2.000000, 0.000000)" fill="#9488C5">
        <path d="M9.87018115,4.00196162 C9.32534715,4.00196162 8.88316303,3.55403485 8.88316303,3.00212509 L8.88316303,1.00245202 L11.8442174,4.00196162 L9.87018115,4.00196162 L9.87018115,4.00196162 L9.87018115,4.00196162 Z M11.8442174,14.0003269 C11.8442174,14.5522367 11.4020333,15.0001635 10.8571993,15.0001635 L1.97403623,15.0001635 C1.42920223,15.0001635 0.987018115,14.5522367 0.987018115,14.0003269 L0.987018115,2.00228855 C0.987018115,1.45037879 1.42920223,1.00245202 1.97403623,1.00245202 L7.88232667,1.00245202 C7.8734435,2.19975627 7.89614492,3.00212509 7.89614492,3.00212509 C7.89614492,4.10644453 8.78001964,5.00179815 9.87018115,5.00179815 L11.8442174,5.00179815 L11.8442174,14.0003269 L11.8442174,14.0003269 L11.8442174,14.0003269 Z M8.88316303,0.00261548934 L8.88316303,0.0166132008 C8.81999387,0.0166132008 8.55646004,-0.00788279425 7.89614492,0.00261548934 L1.97403623,0.00261548934 C0.883874722,0.00261548934 0,0.897969104 0,2.00228855 L0,14.0003269 C0,15.1046464 0.883874722,16 1.97403623,16 L10.8571993,16 C11.9473608,16 12.8312355,15.1046464 12.8312355,14.0003269 L12.8312355,5.00179815 L12.8312355,4.00196162 L8.88316303,0.00261548934 L8.88316303,0.00261548934 L8.88316303,0.00261548934 Z" id="file-document"></path>
    </g>
</g>
</svg>`);
    templates.svg("close", `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
<g id="XMLID_321_">
    <path class="ali-x-svg-stroke" d="M17.4,16L27.7,5.7c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L16,14.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4
        L14.6,16L4.3,26.3c-0.4,0.4-0.4,1,0,1.4C4.5,27.9,4.7,28,5,28s0.5-0.1,0.7-0.3L16,17.4l10.3,10.3c0.2,0.2,0.5,0.3,0.7,0.3
        s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L17.4,16z"/>
</g>
</svg>`);
    templates.svg("search", `<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<title>Rectangle Search</title>
<defs></defs>
<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <rect x="0" y="0" width="16" height="16"></rect>
    <path d="M14.8137045,13.9137273 L11.2021818,10.3022045 C11.9860227,9.32236364 12.4545455,8.07954545 12.4545455,6.72727273 C12.4545455,3.56422727 9.89047727,1 6.72727273,1 C3.56422727,1 1,3.56422727 1,6.72727273 C1,9.89031818 3.56422727,12.4545455 6.72727273,12.4545455 C8.07954545,12.4545455 9.32236364,11.9858636 10.3022045,11.2020227 L13.9137273,14.8135455 C14.0379773,14.9377955 14.2008864,15 14.3636364,15 C14.5265455,15 14.6894545,14.9377955 14.8137045,14.8135455 C15.0622045,14.5652045 15.0622045,14.1620682 14.8137045,13.9137273 L14.8137045,13.9137273 Z M6.72727273,11.1818182 C4.26709091,11.1818182 2.27272727,9.18745455 2.27272727,6.72727273 C2.27272727,4.26709091 4.26709091,2.27272727 6.72727273,2.27272727 C9.18761364,2.27272727 11.1818182,4.26709091 11.1818182,6.72727273 C11.1818182,9.18745455 9.18761364,11.1818182 6.72727273,11.1818182 L6.72727273,11.1818182 Z" id="Shape" class="ali-svg-color-foreground"></path>
</g>
</svg>`);
    templates.svg("home", `<svg version="1.1" id="svg_home" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
<g id="XMLID_1_">
    <path class="ali-x-svg-stroke" d="M29.7,15.3l-4-4c0,0,0,0,0,0l-9-9c-0.4-0.4-1-0.4-1.4,0l-9,9c0,0,0,0,0,0l-4,4c-0.4,0.4-0.4,1,0,1.4
        s1,0.4,1.4,0L6,14.4V28c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V14.4l2.3,2.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3
        C30.1,16.3,30.1,15.7,29.7,15.3z M24,28H8V12.4l8-8l8,8V28z"/>
    <path class="ali-x-svg-stroke" d="M15.7,14.3c-1.3-1.3-3.5-1.3-4.8,0c-1.3,1.3-1.3,3.5,0,4.8c1.4,1.4,4.4,4.6,4.4,4.6c0.2,0.2,0.5,0.3,0.7,0.3
        s0.5-0.1,0.7-0.3c0,0,3-3.2,4.4-4.6c1.3-1.3,1.3-3.5,0-4.8c-1.3-1.3-3.5-1.3-4.8,0L16,14.6L15.7,14.3z M16.7,16.7l1-1
        c0.6-0.6,1.4-0.6,2,0c0.5,0.5,0.5,1.4,0,2c-0.9,1-2.7,2.8-3.7,3.8c-1-1-2.8-2.9-3.7-3.8c-0.5-0.6-0.6-1.5,0-2
        c0.3-0.3,0.6-0.4,1-0.4s0.7,0.1,1,0.4l1,1C15.7,17.1,16.3,17.1,16.7,16.7z"/>
</g>
</svg>`);
    templates.svg("favor", `<svg version="1.1" id="svg_favor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
<g id="XMLID_1011_">
    <path class="ali-x-svg-stroke" d="M24,29.2c-0.2,0-0.3,0-0.5-0.1l-7.6-4l-7.6,4c-0.3,0.2-0.7,0.1-1.1-0.1c-0.3-0.2-0.5-0.6-0.4-1l1.4-8.4
        l-6.1-6c-0.3-0.3-0.4-0.7-0.3-1s0.4-0.6,0.8-0.7l8.4-1.2l3.8-7.7c0.3-0.7,1.5-0.7,1.8,0l3.8,7.7l8.4,1.2c0.4,0.1,0.7,0.3,0.8,0.7
        s0,0.8-0.3,1l-6.1,6l1.4,8.4c0.1,0.4-0.1,0.8-0.4,1C24.4,29.2,24.2,29.2,24,29.2z M16,23c0.2,0,0.3,0,0.5,0.1l6.2,3.3l-1.2-6.9
        c-0.1-0.3,0.1-0.7,0.3-0.9l5-4.9l-7-1c-0.3,0-0.6-0.3-0.8-0.5L16,5.8l-3.1,6.3c-0.1,0.3-0.4,0.5-0.8,0.5l-7,1l5,4.9
        c0.2,0.2,0.3,0.6,0.3,0.9l-1.2,6.9l6.2-3.3C15.7,23.1,15.8,23,16,23z"/>
</g>
</svg>`);
    templates.svg("favor_fill", `<svg version="1.1" id="svg_favor_fill" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
<g id="XMLID_727_">
    <path id="XMLID_728_" d="M24,29.2c-0.2,0-0.3,0-0.5-0.1l-7.6-4l-7.6,4c-0.3,0.2-0.7,0.1-1.1-0.1c-0.3-0.2-0.5-0.6-0.4-1l1.4-8.4
        l-6.1-6c-0.3-0.3-0.4-0.7-0.3-1s0.4-0.6,0.8-0.7l8.4-1.2l3.8-7.7c0.3-0.7,1.5-0.7,1.8,0l3.8,7.7l8.4,1.2c0.4,0.1,0.7,0.3,0.8,0.7
        s0,0.8-0.3,1l-6.1,6l1.4,8.4c0.1,0.4-0.1,0.8-0.4,1C24.4,29.2,24.2,29.2,24,29.2z"/>
</g>
</svg>`);
    templates.svg("settings", `<svg version="1.1" id="svg_settings" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
<g id="Page-1_9_">
    <path class="ali-x-svg-stroke" d="M29.1,19.3L26.9,18c0.1-0.7,0.2-1.3,0.2-2c0-0.7-0.1-1.4-0.2-2l2.2-1.3c0.9-0.5,1.2-1.7,0.7-2.5l-1.9-3.2
        c-0.5-0.9-1.6-1.2-2.5-0.7l-2.2,1.3c-1-0.9-2.2-1.6-3.5-2.1V3.9c0-1-0.8-1.9-1.9-1.9h-3.7c-1,0-1.9,0.8-1.9,1.9v1.6
        C11,5.9,9.8,6.6,8.8,7.5L6.6,6.2C5.7,5.7,4.6,6,4.1,6.9l-1.9,3.2c-0.5,0.9-0.2,2,0.7,2.5L5.1,14c-0.1,0.7-0.2,1.3-0.2,2
        c0,0.7,0.1,1.4,0.2,2l-2.2,1.3C2,19.8,1.7,21,2.2,21.9l1.9,3.2c0.5,0.9,1.6,1.2,2.5,0.7l2.2-1.3c1,0.9,2.2,1.6,3.5,2.1v1.6
        c0,1,0.8,1.9,1.9,1.9h3.7c1,0,1.9-0.8,1.9-1.9v-1.6c1.3-0.5,2.5-1.2,3.5-2.1l2.2,1.3c0.9,0.5,2,0.2,2.5-0.7l1.9-3.2
        C30.3,21,30,19.8,29.1,19.3z M27.7,21.7l-0.9,1.6c-0.3,0.4-0.8,0.6-1.3,0.3l-2.6-1.5c-1.3,1.5-3.1,2.5-5.1,3v2.1
        c0,0.5-0.4,0.9-0.9,0.9h-1.9c-0.5,0-0.9-0.4-0.9-0.9v-2.1c-2-0.4-3.8-1.5-5.1-3l-2.6,1.5c-0.4,0.3-1,0.1-1.3-0.3l-0.9-1.6
        c-0.3-0.4-0.1-1,0.3-1.3l2.6-1.5C6.9,18,6.7,17,6.7,16c0-1,0.2-2,0.5-2.9l-2.6-1.5c-0.4-0.3-0.6-0.8-0.3-1.3l0.9-1.6
        c0.3-0.4,0.8-0.6,1.3-0.3l2.6,1.5c1.3-1.5,3.1-2.5,5.1-3V4.8c0-0.5,0.4-0.9,0.9-0.9h1.9c0.5,0,0.9,0.4,0.9,0.9v2.1
        c2,0.4,3.8,1.5,5.1,3l2.6-1.5c0.4-0.3,1-0.1,1.3,0.3l0.9,1.6c0.3,0.4,0.1,1-0.3,1.3l-2.6,1.5c0.3,0.9,0.5,1.9,0.5,2.9
        c0,1-0.2,2-0.5,2.9l2.6,1.5C27.8,20.7,27.9,21.3,27.7,21.7z"/>
    <path class="ali-x-svg-stroke" d="M16,11.3c-2.6,0-4.6,2.1-4.6,4.7c0,2.6,2.1,4.7,4.6,4.7s4.6-2.1,4.6-4.7C20.6,13.4,18.6,11.3,16,11.3z
         M16,18.8c-1.5,0-2.8-1.3-2.8-2.8c0-1.5,1.2-2.8,2.8-2.8s2.8,1.3,2.8,2.8C18.8,17.5,17.5,18.8,16,18.8z"/>
</g>
</svg>`);

})();

/* ------- Functions ------- */

/**
    * Gets SVG source string.
    * @param key  The key. 
    */
export function svg(key: string): string {
    if (!key) return null;
    return AliHub.Res.svg(moduleName, key);
}

/**
    * Gets SVG source string.
    * @param key  The key. 
    */
export function svgElement(key: string, styleRef?: string): SVGElement {
    if (!key) return null;
    return AliHub.Res.svgElement(moduleName, key, styleRef);
}

/**
    * Gets HTML source string.
    * @param key  The key. 
    */
export function html(key: string) {
    if (!key) return null;
    return AliHub.Res.html(moduleName, key);
}

/**
    * Gets local string.
    * @param key  The key. 
    */
export function strings(key: string, lang?: string) {
    if (!key) return null;
    return arguments.length > 1 ? AliHub.Res.strings(moduleName, key, lang) : AliHub.Res.strings(moduleName, key);
}

/**
    * Gets local string by HTML encoded.
    * @param key  The key. 
    */
export function stringInHtml(key: string, lang?: string) {
    if (!key) return null;
    return AliHub.Common.Text.toHTML(arguments.length > 1 ? AliHub.Res.strings(moduleName, key, lang) : AliHub.Res.strings(moduleName, key));
}

/**
    * Sets strings of specific market code.
    * @param lang  The market code. 
    * @param value  The strings. 
    */
export function local(lang: string, value: AliHub.Collection.DictionaryContract<string> | Object) {
    if (!lang || !value) return null;
    return AliHub.Res.templates(moduleName).strings.reg(lang, value);
}

/**
    * Gets data package resolver.
    * @param key  The key. 
    */
export function webResolver<T>(key: string, value?: string | AliHub.Web.WebResolverInfoContract<T>): AliHub.Web.BaseDataPackageResolver<T> {
    if (!key) return null;
    return arguments.length > 1 ? AliHub.Web.resolver<T>(moduleName, key, value) : AliHub.Web.resolver<T>(moduleName, key);
}

/* ------- Upload ------- */

/**
    * File upload result interface.
    */
export interface UploadResultConstruct {
    select(): PromiseLike<File>;
    upload(ignoreResult?: boolean): PromiseLike<any>;
    valid(): boolean;
}

/**
    * Uploads file.
    * @param url  The URL to post file. 
    * @param key  The field key.
    */
export function upload(url?: string, key?: string, convert?: (File: File, form: AliHub.Elements.HiddenFormContract) => void) {
    var form = AliHub.Elements.hiddenForm(url);
    var result = {} as UploadResultConstruct;
    result.select = () => {
        var promise = form.fileField(key || "file", true);
        if (!!convert) promise.then((r) => {
            convert(r, form);
        });
        return promise;
    };
    result.upload = <T>(ignoreResult?: boolean) => {
        var promise = form.submit<T>(ignoreResult);
        if (!!promise) promise.then((r) => {
            form.dispose();
        });
        return promise;
    };
    result.valid = () => {
        return true;
    };
    return result;
}

/**
    * Multiple files uploade client control.
    */
export class UploadControl extends AliHub.Common.VisualControl {

    private _list: HTMLUListElement;

    public url: string | (() => string);

    public fieldKey: string;

    public removeContent = AliHub.Common.listenedObj<AliHub.Graph.ImageContract>();

    public addContent = AliHub.Common.listenedObj<AliHub.Graph.ImageContract>();

    public fileConvert: (File: File, form: AliHub.Elements.HiddenFormContract) => void;

    public upload: (url?: string, key?: string, convert?: (File: File, form: AliHub.Elements.HiddenFormContract) => void) => UploadResultConstruct;

    public uploaded = new AliHub.Collection.EventHandlers<{ file: File, result: any, success: boolean }>();

    public constructor(id: AliHub.Common.VisualControlElementContract) {
        super(id);
        this.addStyleRef("ali-controls-files-upload");
        this._list = this.appendElement<HTMLUListElement>("ul", "files");
        this._list.className = "ali-container-main";
        this.removeContent({ type: "string", value: "X" });
        var actions = this.appendElement("div", "actions");
        actions.className = "ali-container-main ali-x-section-actions";
        var addButton = document.createElement("button");
        addButton.innerHTML = "<span>" + AliHub.Common.Text.toHTML(templates.localString("add")) + "</span>";
        actions.appendChild(addButton);
        this.addContent.subscribe((newValue) => {
            addButton.innerHTML = "";
            var addGraphEle = AliHub.Graph.imageElement(this.addContent);
            if (!addGraphEle) {
                addGraphEle = document.createElement("span");
                addGraphEle.innerHTML = AliHub.Common.Text.toHTML(templates.localString("add"));
            }

            addButton.appendChild(addGraphEle);
        });
        AliHub.Elements.listen(addButton, "click", (ev) => {
            this.add();
        });
    }

    public add() {
        var url = this._url();
        if (!url) return;
        var info = (this.upload || upload)(url, this.fieldKey, this.fileConvert);
        info.select().then((r) => {
            var itemEle = document.createElement("li");
            itemEle.className = "ali-container-main";
            this._list.appendChild(itemEle);
            var titleEle = document.createElement("span");
            var progressEle = document.createElement("em");
            var result = {
                value: null,
                success: false,
                pending: true
            };
            (itemEle as any)._xRefInfo = result;
            var removeEle = document.createElement("button");
            var removeGraphEle = AliHub.Graph.imageElement(this.removeContent);
            if (!removeGraphEle) {
                removeGraphEle = document.createElement("span");
                removeGraphEle.innerHTML = AliHub.Common.Text.toHTML(templates.localString("remove"));
            }

            removeEle.appendChild(removeGraphEle);
            removeEle.title = AliHub.Common.Text.toHTML(templates.localString("remove"));
            AliHub.Elements.listen(removeEle, "click", (ev) => {
                try {
                    itemEle.remove();
                } catch (ex) {
                    itemEle.outerHTML = "";
                }

                itemEle = null;
            });
            titleEle.innerHTML = r.name;
            progressEle.innerHTML = "Uploading";
            progressEle.className = "ali-state-progress-loading";
            if (!itemEle) return;
            itemEle.appendChild(titleEle);
            itemEle.appendChild(progressEle);
            itemEle.appendChild(removeEle);
            info.upload().then((r2) => {
                if (!itemEle) return;
                result.value = r2;
                result.success = true;
                result.pending = false;
                progressEle.innerHTML = "Success";
                progressEle.className = "ali-state-progress-success";
                this.uploaded.raise({
                    file: r,
                    result: r2,
                    success: true
                });
            }, (r2) => {
                if (!itemEle) return;
                result.value = r2;
                result.pending = false;
                progressEle.innerHTML = "Error";
                progressEle.className = "ali-state-progress-error";
                this.uploaded.raise({
                    file: r,
                    result: r2,
                    success: false
                });
            });
        }, (r) => {
        });
    }

    public isUploading(): boolean {
        if (!!this._list.children) for (var i = 0; i < this._list.children.length; i++) {
            var itemEle = this._list.children[i];
            if (!itemEle) continue;
            var r = (itemEle as any)._xRefInfo;
            if (r.pending) return true;
        }

        return false;
    }

    public result(): any[] {
        var list = [];
        if (!!this._list.children) for (var i = 0; i < this._list.children.length; i++) {
            var itemEle = this._list.children[i];
            if (!itemEle) continue;
            var r = (itemEle as any)._xRefInfo;
            if (!r || !r.success || r.pending || !r.value) continue;
            list.push(r.value);
        }

        return list;
    }

    public removeAll() {
        if (!!this._list) this._list.innerHTML = "";
    }

    private _url(): string {
        if (!!this.url) return typeof this.url === "string" ? this.url : (this.url as any as Function)();
        var urls = this.parseAttr<any>("urls");
        return !!urls ? urls.upload : undefined;
    }

}

/* ------- Text ------- */

export function readText(fs: any, pathname: string) {
    if (!pathname || !fs || !fs.readFileSync || typeof fs.readFileSync !== "function") return null;
    var bin = fs.readFileSync(pathname);
    if (!bin) return null;
    if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
        bin = bin.slice(3);
    }

    return bin.toString("utf-8");
}

/* ------- Explorer ------- */

export interface FileContract {
    id: string;
    isDir?: boolean;
    type?: string;
    name: string;
    icon?: AliHub.Graph.ImageContract
    children?: FileContract[] | boolean;
    [property: string]: any;
}

export interface ItemInfoContract {
    isExpand: AliHub.Common.BindingObjectContract<boolean>;
    path(): string[];
    model(): FileContract;
    clearChildrenCache(): void
}

export interface FilesContract {
    list: FileContract[];
    bag?: any;
}

class ItemInfo implements AliHub.Common.DisposableContract {
    private _path: string[] = [];

    public finalDisposable = new AliHub.Collection.DisposableArray();

    public changedDisposable = new AliHub.Collection.DisposableArray();

    public constructor(...path: string[]) {
        this._path = path;
    }

    public model = AliHub.Common.bindingObj<FileContract>();

    public isExpand = AliHub.Common.bindingObj(false);

    public path(): string[] {
        return AliHub.Collection.copy(this._path);
    }

    public childNodes: HTMLUListElement;

    public expand(): PromiseLike<FileContract[]> {
        return AliHub.Common.rejectDeferred(null, "Cannot expand.");
    }

    public select(expand?: boolean): PromiseLike<FileContract[]> {
        return AliHub.Common.rejectDeferred(null, "Cannot select.");
    }

    public dispose() {
        this.changedDisposable.dispose();
        this.finalDisposable.dispose();
    }
}

export class TreeControl extends AliHub.Common.VisualControl {
    private _listEle: HTMLUListElement;
    private _cntEle: HTMLUListElement;
    private _navEle: HTMLDivElement;
    private _selected: HTMLLIElement;
    private _fileIcons: any = {};
    private _folderIcons: any = {};
    private _searInputEle: HTMLInputElement;
    private _tempRes: any = {};

    public transferBag = AliHub.Common.listenedObj<any>({});

    public subject: string | HTMLElement | AliHub.Common.VisualControl;

    public resolveKey: string;

    public queryKey: string;

    public showFiles = AliHub.Common.listenedObj(false);

    public pushed = new AliHub.Collection.EventHandlers<FileContract>();

    public selected = new AliHub.Collection.EventHandlers<FileContract>();

    public itemSelected = new AliHub.Collection.EventHandlers<FileContract>();

    public emptyText: string;

    public convertor = AliHub.Common.listenedObj<AliHub.Common.Func1<any, FilesContract>>();

    public searched = new AliHub.Collection.EventHandlers<{ q: string, promise: PromiseLike<FileContract[]>, path: string[] }>();

    public separator = "\\";

    public allowNameInHTML = false;

    public loadBag: any = {};

    public from: string;

    public disableAutoSearch = false;

    public hideTypeInTips = false;

    public disableEventsInContent = false;

    public extendService = {
        itemRendered: new AliHub.Collection.EventHandlers<{ element: HTMLElement, model: FileContract, path: string[] }>(),
        contentItemRendered: new AliHub.Collection.EventHandlers<{ element: HTMLElement, model: FileContract, path: string[] }>(),
        ignoreDirSelectOnce: () => {
            this._tempRes.ignoreExpandOnce = true;
        },
        getSelectedElement: () => {
            return this._selected;
        }
    };

    public constructor(id: AliHub.Common.VisualControlElementContract) {
        super(id);
        this.addStyleRef("ali-controls-files-tree");
        this.showFiles.subscribe((newValue) => {
            if (newValue) this.addStyleRef("ali-files-with-file");
            else this.removeStyleRef("ali-files-with-file");
        });
        this._navEle = this.appendElement<HTMLDivElement>("div", "nav");
        this._navEle.className = "ali-container-nav";
        var menuEle = document.createElement("div");
        menuEle.className = "ali-x-section-actions";
        this._navEle.appendChild(menuEle);
        var upperBtn = templates.svgElement("upper", "ali-x-field-action");
        AliHub.Elements.changeStyleRef(upperBtn as any, "");
        menuEle.appendChild(upperBtn);
        AliHub.Elements.listen(upperBtn, "click", (ev) => {
            this.upper();
        });
        var refreshBtn = templates.svgElement("refresh", "ali-x-field-action");
        AliHub.Elements.changeStyleRef(refreshBtn as any, "ali-x-field-action");
        menuEle.appendChild(refreshBtn);
        AliHub.Elements.listen(refreshBtn, "click", (ev) => {
            var selectedInfo = this._selectedInfo();
            if (!selectedInfo) return;
            selectedInfo.select(true);
        });
        var searchEle = document.createElement("div");
        searchEle.className = "ali-x-section-search";
        this._navEle.appendChild(searchEle);
        this._searInputEle = document.createElement("input");
        this._searInputEle.className = "ali-x-field-input";
        this._searInputEle.type = "search";
        this._searInputEle.placeholder = AliHub.Common.Text.toHTML(templates.localString("search")) + "...";
        var queryIcon = AliHub.Graph.imageElement({
            type: "svg",
            source: templates.svg("search"),
            styleRef: "ali-x-field-icon"
        });
        searchEle.appendChild(queryIcon);
        searchEle.appendChild(this._searInputEle);
        AliHub.Elements.lazySearch({
            suggest: (q) => {
                return this.searchSuggest(q);
            },
            enter: (q) => {
                return this.searchEnter(q);
            },
            target: this._searInputEle
        });
        this._listEle = this.appendElement<HTMLUListElement>("ul", "list");
        this._listEle.className = "ali-container-main ali-files-container-tree";
        this._cntEle = this.appendElement<HTMLUListElement>("ul", "list");
        this._cntEle.className = "ali-files-container-files";
    }

    public appendElementAfterNavigator<T extends HTMLElement>(child: string | T, idSuffix?: string, styleRef?: string | string[]) {
        var ele = this.appendElement(child, idSuffix, styleRef);
        if (!ele) return ele;
        this.getElement().insertBefore(ele, this._listEle);
        return ele;
    }

    public searchSuggest(q: string) {
        return !this.disableAutoSearch ? this._search(q) : null;
    }

    public searchEnter(q: string) {
        return this.disableAutoSearch ? this._search(q) : null;
    }

    public formatText(str: string) {
        return !str || this.allowNameInHTML ? str : AliHub.Common.Text.toHTML(str, true);
    }

    public push(...value: FileContract[]) {
        var allEles = this._children();
        value.forEach((item, i, arr) => {
            if (!item || !item.name) return;
            if (!item.id) item.id = item.name;
            var info = AliHub.Collection.getItem(allEles, item, (a, b) => {
                var model = a.info.model();
                return !!model && model.name === b.name;
            });
            var existing = false;
            if (!info) {
                var info = {
                    info: new ItemInfo(item.id),
                    element: document.createElement("li")
                };
            } else {
                info.info.model(item);
                return;
            }

            info.info.model(item);
            this._listEle.appendChild(info.element);
            this._renderItem(info.element, info.info);
            if (this.extendService.itemRendered) this.extendService.itemRendered.raise({ element: info.element, model: item, path: [ item.id ] });
            this.pushed.raise(item);
        });
    }

    public selectedInfo() {
        return this._info(this._selectedInfo());
    }

    public clear() {
        this._listEle.innerHTML = "";
        this._cntEle.innerHTML = "";
    }

    public renderItem(element: HTMLDivElement, model: FileContract, info: ItemInfoContract): AliHub.Common.DisposableContract {
        if (!element || !model) return;
        var collapsed = templates.svg("collapsed");
        var expanded = templates.svg("expanded");
        var emptyF = templates.svg("noToggle");
        element.innerHTML = "";
        var iconInfo = this.icon(model.isDir, model.type);
        var iconEle = document.createElement("span");
        iconEle.className = "ali-x-field-icon";
        iconEle.appendChild(AliHub.Graph.imageElement(iconInfo));
        var expandEle = document.createElement("span");
        expandEle.className = "ali-x-field-expand"
        element.appendChild(expandEle);
        element.appendChild(iconEle);
        var tempC = document.createElement("div");
        tempC.innerHTML += this._renderItemName(model);
        for (var step = 0; step < tempC.children.length; step++) {
            element.appendChild(tempC.children[step]);
        }

        var show = (newValue) => {
            if (!expandEle) return;
            var toggleStr = newValue ? expanded : collapsed;
            if (!model.children) {
                toggleStr = emptyF;
            } else if ((model.children as FileContract[]).forEach) {
                var count = 0;
                (model.children as FileContract[]).forEach((item, i, arr) => {
                    if (!!item && item.isDir) count++;
                });

                if (count === 0) toggleStr = emptyF;
            }

            expandEle.innerHTML = toggleStr;
        };
        show(info.isExpand());
        return info.isExpand.subscribe(show);
    }

    public renderContentItem(element: HTMLLIElement, model: FileContract, info: ItemInfoContract): AliHub.Common.DisposableContract {
        if (!element) return AliHub.Common.Reflection.emptyDisposable();
        element.innerHTML = "";
        var iconInfo = this.icon(model.isDir, model.type);
        var iconEle = AliHub.Graph.imageElement(iconInfo);
        AliHub.Elements.changeStyleRef(iconEle, "ali-x-field-icon");
        element.appendChild(iconEle);
        element.innerHTML += this._renderItemName(model);
        return AliHub.Common.Reflection.emptyDisposable();
    }

    public appendChildToNavigatorPanel<T extends Element>(newChild: T) {
        return this._navEle.appendChild(newChild) as T;
    }

    public upper() {
        var info = this._selectedInfo();
        if (!info) return;
        var path = info.path();
        if (!path || path.length < 1) return;
        this.expand(path.slice(0, path.length - 1), true);
    }

    public adaptHeight(target: HTMLElement | Window | number, compute: AliHub.Common.Func1<number, number>) {
        var getHeight = (height) => {
            var navSize = AliHub.Elements.getSize(this._navEle);
            height -= (!!navSize ? navSize.y : 0) || 0;
            return !!compute ? compute(height) : height;
        };
        AliHub.Elements.adaptHeight(this._listEle, target, getHeight);
        AliHub.Elements.adaptHeight(this._cntEle, target, getHeight);
    }

    public static resolveChildren(children: FileContract[] | boolean, path: string[], subject: string | HTMLElement | AliHub.Common.VisualControl, key: string, q?: string, failedForEmpty = false, webReady?: (items: FilesContract) => void, separator = "\\", convertor?: AliHub.Common.Func1<any, FilesContract>, bag?: any, from?: string): PromiseLike<FileContract[]> {
        var deferred = AliHub.Common.deferred<FileContract[]>();
        var none = (err?) => {
            if (failedForEmpty) deferred.reject(err || "No child.");
            else deferred.resolve([]);
        };

        if (!children) {
            none();
            return deferred.promise();
        }

        if (typeof children !== "boolean" && typeof children !== "string") {
            deferred.resolve(children);
            return deferred.promise();
        }

        var parameters = {
            id: null,
            path: null,
            tag: typeof children === "string" ? children : null,
            depth: null,
            q: q,
            bag: bag,
            from: from
        };
        if (!!path) {
            if (path.length > 0) parameters.id = path[path.length - 1];
            parameters.path = path.join(separator);
            parameters.depth = path.length;
        }

        AliHub.Web.resolve<FilesContract>(subject, key, parameters).then((r) => {
            if (!r.result) {
                none();
                return;
            }

            if (!!convertor) r.result = convertor(r.result);
            if (!r.result.list) r.result.list = (r.result as any).files;
            if (!r.result.list || !(r.result.list instanceof Array) || !r.result.list.length) {
                none();
                return;
            }

            if (!!webReady) webReady(r.result);
            deferred.resolve(r.result.list);
        }, (r) => {
            none(r);
        });
        return deferred.promise();
    }

    public childFiles(path: string[], webReady?: (col: FilesContract) => void): PromiseLike<FileContract[]> {
        var deferred = AliHub.Common.deferred<FileContract[]>();
        var children: FileContract[] = [];
        this._children().forEach((item, i, arr) => {
            var model = item.info.model();
            if (!model) return;
            if (!model.id) model.id = model.name;
            if (!model.id) return;
            children.push(model);
        });
        if (!path || path.length === 0) {
            deferred.resolve(children);
            return deferred.promise();
        }

        this._childFiles(deferred, children, path, 0, webReady);
        return deferred.promise();
    }

    public expand(path: string[], select = false): PromiseLike<FileContract[]> {
        var deferred2 = AliHub.Common.deferred<FileContract[]>();
        if (!this._listEle) {
            deferred2.reject("Empty tree");
            return deferred2.promise();
        }

        var deferred = AliHub.Common.deferred<ItemInfo[]>();
        this._deepChildren(deferred, this._listEle.children, path, select);
        deferred.promise().then((r) => {
            if (!r) {
                deferred2.reject();
                return;
            }

            var list: FileContract[] = [];
            r.forEach((item, i, arr) => {
                if (!item) return;
                var model = item.model();
                if (!!model) list.push(model);
            });
            deferred2.resolve(list);
        }, (r) => {
            deferred2.reject(r);
        });
        return deferred2.promise();
    }

    public loadFromWeb(selectFirst = false): PromiseLike<FileContract[]> {
        var deferred = AliHub.Common.deferred<FileContract[]>();
        TreeControl.resolveChildren(true, [], this.subject, this.resolveKey, null, false, (col) => {
            this.transferProp("folder", col.bag || {});
        }, this.separator, this.convertor(), this.loadBag, this.from).then((r) => {
            this.push(...r);
            if (selectFirst && !!r && r.length > 0) {
                if (r.some((item, i, arr) => {
                    if (!item || !item.isDir || !item.id) return false;
                    this.expand([item.id], true).then((r2) => {
                        deferred.resolve(r);
                    }, (r2) => {
                        deferred.resolve(r);
                    });
                    return true;
                })) return deferred.promise();
            }

            deferred.resolve(r);
        }, (r) => {
            deferred.reject(r);
        });

        return deferred.promise();
    }

    public search(q: string): PromiseLike<FileContract[]> {
        if (!q) {
            return this._selectedInfo().select(true);
        }

        var path = [];
        var info = this._selectedInfo();
        if (!!info && !!info.path && typeof info.path === "function") {
            path = info.path();
        }

        if (this._searInputEle.value !== q) this._searInputEle.value = q;
        var deferred = AliHub.Common.deferred<FileContract[]>();
        TreeControl.resolveChildren(true, path, this.subject, this.queryKey || this.resolveKey, q, false, (col) => {
            this.transferProp("folder", col.bag || {});
        }, this.separator, this.convertor(), this.loadBag, this.from).then((r) => {
            var col: ItemInfo[] = [];
            r.forEach((item, i, arr) => {
                var infoItem = new ItemInfo(item.id || item.name);
                infoItem.model(item);
                infoItem.select = () => {
                    this.selected.raise(infoItem.model());
                    this.itemSelected.raise(infoItem.model());
                    return AliHub.Common.rejectDeferred(null, "Cannot select.");
                };
                col.push(infoItem);
            });
            this._renderContent(col);
        }, (r) => {
            this._renderContent([]);
            deferred.reject(r);
        });

        var searchPromise = deferred.promise();
        this.searched.raise({ q: q, promise: searchPromise, path: path });
        return searchPromise;
    }

    public transferProp(key: string, value?: any) {
        if (arguments.length > 0) {
            this.transferBag()[key] = value;
        }

        return this.transferBag()[key];
    }

    public icon(isDir: boolean, type: string, value?: AliHub.Graph.ImageContract) {
        var set = isDir ? this._folderIcons : this._fileIcons;
        if (arguments.length > 2) set[type] = value;
        var img = set[type];
        return !!img ? img : {
            type: "svg",
            source: templates.svg(isDir ? "folder" : "file")
        };
    }

    public convertFile(m: any): FilesContract {
        var convertor = this.convertor();
        return convertor ? convertor(m) : m;
    }

    public refreshContent() {
        var info = this._selectedInfo();
        var childInfoCol: ItemInfo[] = [];
        var model = info ? info.model() : null;
        if (!!model && !!model.children && !!info.childNodes && !!info.childNodes.children) {
            for (var i = 0; i < info.childNodes.children.length; i++) {
                var itemEle = info.childNodes.children[i];
                if (!itemEle || !itemEle.tagName || itemEle.tagName.toString().toLowerCase() !== "li" || !(itemEle as any)._xFileInfo) continue;
                var infoItem: ItemInfo = (itemEle as any)._xFileInfo;
                if (!infoItem.model || !infoItem.model()) continue;
                childInfoCol.push(infoItem);
            }
        }

        this._renderContent(childInfoCol, null, info);
    }

    public getInfo(path: string[], autoExpand?: boolean) {
        var deferred = AliHub.Common.deferred<ItemInfoContract>();
        var arr = path.slice(0, path.length - 1);
        if (!this._listEle) {
            deferred.reject("Empty tree.");
            return deferred.promise();
        }

        if (autoExpand) {
            var innerDeferred = AliHub.Common.deferred<ItemInfo[]>();
            this._deepChildren(innerDeferred, this._listEle.children, arr);
            innerDeferred.promise().then((r) => {
                if (!r) {
                    deferred.reject("No such folder.");
                    return;
                }

                var list: FileContract[] = [];
                if (!r.some((item) => {
                    if (!item) return false;
                    var model = item.model();
                    if (model && model.id === path[path.length - 1]) {
                        deferred.resolve(this._info(item));
                        return true;
                    }

                    return false;
                })) deferred.reject("No such folder in its parent.");
            }, (r) => {
                deferred.reject(r);
            });
        } else {
            var info = this._findChild(path, 0, this._listEle);
            if (info) deferred.resolve(this._info(info));
            else deferred.reject("Cannot find it in cache.");
        }

        return deferred.promise();
    }

    private _search(q: string) {
        var deferred = AliHub.Common.deferred<AliHub.Web.ResponseContract<FilesContract>>();
        this.search(q).then((r) => {
            deferred.resolve({
                timestamp: new Date(),
                result: { list: r },
                success: true
            });
        }, (r) => {
            deferred.reject(r);
        });
        return deferred.promise();
    }

    private _children(elements?: HTMLUListElement): ({ element: HTMLLIElement, info: ItemInfo })[] {
        var ces = (elements || this._listEle).children;
        if (!ces) return [];
        var list = [];
        for (var i = 0; i < ces.length; i++) {
            var li = ces[i];
            if (!li || !li.tagName || li.tagName.toString().toLowerCase() !== "li" || !(li as any)._xFileInfo) continue;
            list.push({
                element: li,
                info: (li as any)._xFileInfo
            });
        }

        return list;
    }

    private _findChild(path: string[], index: number, elements: HTMLUListElement) {
        if (index < 0 || index >= path.length || !elements || !elements.childNodes) return null;
        var testId = path[index];
        var theItem: ItemInfo;
        this._children(elements).some((item) => {
            if (!item.info.model) return false;
            var model = item.info.model();
            if (!model || model.id !== testId) return false;
            theItem = index === path.length - 1 ? item.info : this._findChild(path, index + 1, item.info.childNodes);
            return true;
        });
        return theItem;
    }

    private _renderItemName(model: FileContract) {
        return '<strong class="ali-x-field-name" title="' + (AliHub.Common.Text.toHTML(model.name) || "") + (!this.hideTypeInTips && !!model.type ? (" (" + AliHub.Common.Text.toHTML(model.type, true) + ")") : "") + '">' + (this.formatText(model.name) || "") + '</strong><em class="ali-x-field-type">' + (this.formatText(model.type) || "") + '</em>';
    }

    private _childFiles(deferred: AliHub.Common.DeferredContract<FileContract[]>, list: FileContract[], path: string[], index = 0, webReady?: (col: FilesContract) => void) {
        if (index === path.length) {
            deferred.resolve(list);
            return;
        }

        if (!list) {
            deferred.reject("Cannot touch the path.");
            return;
        }

        if (index < 0 || index >= path.length) {
            deferred.reject("Something error.");
            return;
        }

        var key = path[index];
        var item = AliHub.Collection.getItem(list, key, (a, b) => {
            return !!a && (a.id === b || (!a.id && a.name === b));
        });
        if (!item) {
            deferred.reject("Cannot find.");
            return;
        }

        TreeControl.resolveChildren(item.children, path, this.subject, this.resolveKey, null, true, webReady, this.separator, this.convertor(), this.loadBag, this.from).then((r) => {
            this._childFiles(deferred, r, path, index + 1, webReady);
        }, (r) => {
            deferred.reject(r);
        });
    }

    private _deepChildren(deferred: AliHub.Common.DeferredContract<ItemInfo[]>, col: HTMLCollection, path: string[], select = false, index = 0) {
        if (!col) {
            deferred.reject("Cannot touch the path.");
            return;
        }

        var list: ItemInfo[] = [];
        for (var i = 0; i < col.length; i++) {
            var li = col[i];
            if (!li || !li.tagName || li.tagName.toString().toLowerCase() !== "li") continue;
            var info = (li as any)._xFileInfo as ItemInfo;
            if (!!info && !!info.model && !!info.model()) list.push(info);
        }

        if (index === path.length) {
            deferred.resolve(list);
            return;
        }

        if (!list) {
            deferred.reject("Cannot touch the path.");
            return;
        }

        if (index < 0 || index >= path.length) {
            deferred.reject("Something error.");
            return;
        }

        var key = path[index];
        var item = AliHub.Collection.getItem(list, key, (a, b) => {
            if (!a) return false;
            var aModel = a.model();
            return !!aModel && (aModel.id === b || (!aModel.id && aModel.name === b));
        });
        if (!item) {
            deferred.reject("Cannot find it.");
            return;
        }

        item.expand().then((r) => {
            if (index === path.length - 1 && select) {
                item.select();
            }

            this._deepChildren(deferred, item.childNodes.children, path, select, index + 1);
        }, (r) => {
            deferred.reject(r);
            item.select();
        });
    }

    private _info(info: ItemInfo): ItemInfoContract {
        return {
            model: () => {
                return info.model();
            },
            isExpand: info.isExpand,
            path: () => {
                return info.path();
            },
            clearChildrenCache: (children?: boolean | FilesContract) => {
                var model = info.model();
                if (!model || !model.isDir) return;
                if (info.childNodes) try {
                        info.childNodes.remove();
                    } catch (ex) {
                        if (info.childNodes.outerHTML) info.childNodes.outerHTML = "";
                    }

                info.childNodes = null;
                if (info.model()) {
                    if (children == null || children === true) info.model().children = true;
                    else if (children === false) info.model().children = false;
                    else if (children instanceof Array) {
                        var files = this.convertFile(children);
                        info.model().children = files ? files.list : false;
                    }
                }

                if (info.isExpand()) info.isExpand(false);
            }
        };
    }

    private _selectedInfo() {
        if (!this._selected) return null;
        var info = (this._selected as any)._xFileInfo as ItemInfo;
        if (!info || !info.model || !info.path || !info.expand) return null;
        return info;
    }

    private _renderContent(childInfoCol: ItemInfo[], clicked?: AliHub.Common.Action1<ItemInfo>, parent?: ItemInfo) {
        if (!this._cntEle) return;
        this._cntEle.innerHTML = "";
        if (childInfoCol.length === 0) {
            var emptyItemEle = document.createElement("li");
            emptyItemEle.className = "ali-container-empty";
            emptyItemEle.innerHTML = "<em>" + (!!this.emptyText ? (AliHub.Common.Text.toHTML(this.emptyText) || "") : AliHub.Common.Text.toHTML(templates.localString("empty"))) + "</em>";
            this._cntEle.appendChild(emptyItemEle);
            return;
        }

        childInfoCol.forEach((infoItem, i, arr) => {
            var cntItemEle = document.createElement("li");
            cntItemEle.className = "ali-container-main";
            var modelItem = infoItem.model();
            AliHub.Elements.listen(cntItemEle, "click", (ev2) => {
                if (!!clicked) clicked(infoItem);
                if (parent && parent.isExpand && !parent.isExpand()) parent.isExpand(true);
                if (!modelItem || this.disableEventsInContent) return;
                if (modelItem.isDir) {
                    infoItem.select(true);
                } else {
                    infoItem.select();
                }
            });
            this._cntEle.appendChild(cntItemEle);
            var cntDisposable = this.renderContentItem(cntItemEle, infoItem.model(), this._info(infoItem));
            infoItem.changedDisposable.push(cntDisposable);
            if (this.extendService.contentItemRendered) this.extendService.contentItemRendered.raise({ element: cntItemEle, model: infoItem.model(), path: infoItem.path() });
        });
    }

    private _renderItem(element: HTMLLIElement, info: ItemInfo) {
        var model = info.model();
        (element as any)._xFileInfo = info;
        if (!model) return;
        AliHub.Elements.changeStyleRef(element, ["ali-container-main", (model.isDir ? "ali-files-dir" : "ali-files-file")]);
        var container = document.createElement("div");
        container.className = "ali-container-main";
        element.appendChild(container);
        var itemDisposable = this.renderItem(container, model, this._info(info));
        info.finalDisposable.push(itemDisposable);
        var showContent = () => {
            model = info.model();
            var childInfoCol: ItemInfo[] = [];
            if (!!model && !!model.children && !!info.childNodes && !!info.childNodes.children) {
                for (var i = 0; i < info.childNodes.children.length; i++) {
                    var itemEle = info.childNodes.children[i];
                    if (!itemEle || !itemEle.tagName || itemEle.tagName.toString().toLowerCase() !== "li" || !(itemEle as any)._xFileInfo) continue;
                    var infoItem: ItemInfo = (itemEle as any)._xFileInfo;
                    if (!infoItem.model || !infoItem.model()) continue;
                    childInfoCol.push(infoItem);
                }
            }

            this._renderContent(childInfoCol, null, info);
        };
        info.select = (expand) => {
            var deferred = AliHub.Common.deferred<FileContract[]>();
            var isExpand = info.isExpand();
            var h = () => {
                if (info.model().isDir || this.showFiles()) {
                    var selectedInfo = this._selectedInfo();
                    if (!!selectedInfo && this._selected !== element) {
                        AliHub.Elements.changeStyleRef(this._selected, null, "ali-state-active-t");
                        if (!!selectedInfo && !!selectedInfo.changedDisposable && !!selectedInfo.changedDisposable.dispose) selectedInfo.changedDisposable.dispose();
                    }

                    AliHub.Elements.changeStyleRef(element, "ali-state-active-t");
                    showContent();
                    this._selected = element;
                    this.selected.raise(info.model());
                }

                this.itemSelected.raise(info.model());
                if (expand == null || typeof expand !== "boolean") info.isExpand(isExpand);
                else info.isExpand(expand);
            };
            info.expand().then((r) => {
                h();
                deferred.resolve();
            }, (r) => {
                h();
                deferred.resolve();
            });
            return deferred.promise();
        };
        AliHub.Elements.listen(container, "click", (ev) => {
            if (!this._tempRes.ignoreExpandOnce) info.select(!info.isExpand());
            this._tempRes.ignoreExpandOnce = false;
        });
        var showChildren = () => {
            if (!model.children || !(model.children instanceof Array)) return [];
            var infoList: ItemInfo[] = [];
            (model.children as FileContract[]).forEach((item, i, arr) => {
                if (!item || (!item.name && !item.id)) return;
                var itemEle = document.createElement("li");
                var infoItem = new ItemInfo(...info.path(), (item.id || item.name));
                infoItem.model(item);
                infoList.push(infoItem);
                info.childNodes.appendChild(itemEle);
                this._renderItem(itemEle, infoItem);
                if (this.extendService.itemRendered) this.extendService.itemRendered.raise({ element: itemEle, model: item, path: infoItem.path() });
            });

            return infoList;
        };
        var tempInfo: any = {};
        info.expand = () => {
            info.isExpand(true);
            return tempInfo.expanding;
        };
        var isExpand = (isExpand: boolean) => {
            tempInfo.expanding = null;
            if (isExpand) {
                var deferred = AliHub.Common.deferred<FileContract[]>();
                if (!info.childNodes) {
                    info.childNodes = document.createElement("ul");
                    info.childNodes.className = "ali-container-main";
                    element.appendChild(info.childNodes);
                    this.childFiles(info.path(), (col) => {
                        this.transferProp("folder", col.bag || {});
                    }).then((r) => {
                        model.children = r;
                        showChildren();
                        deferred.resolve(r);
                    }, (r) => {
                        deferred.reject(r);
                    });
                } else {
                    deferred.resolve(model.children as any);
                }

                info.childNodes.style.display = "";
                tempInfo.expanding = deferred.promise();
                return;
            }

            if (!info.childNodes) return;
            info.childNodes.style.display = "none";
        };
        info.isExpand.subscribe(isExpand);
        isExpand(info.isExpand());
    }

}

export class BaseMdiControl extends AliHub.Collection.SwitchControl {

    private _loaders: any = {};

    public subject: HTMLElement | AliHub.Common.VisualControl | string;

    public fileOpened = new AliHub.Collection.EventHandlers<{ control: AliHub.Common.VisualControl, model: FileContract, from: any }>();

    public constructor(id: AliHub.Common.VisualControlElementContract) {
        super(id);
        this.addStyleRef("ali-controls-files-mdi");
    }

    public fileLoader(type: string, h?: AliHub.Common.Func3<HTMLElement, FileContract, any, AliHub.Common.VisualControl>): AliHub.Common.Func3<HTMLElement, FileContract, any, AliHub.Common.VisualControl> {
        if (arguments.length > 1) {
            if (h === null) delete this._loaders[type];
            else this._loaders[type] = h;
        }

        return this._loaders[type];
    }

    public newTab(name: string, control?: AliHub.Common.Func1<HTMLElement, AliHub.Common.VisualControl>) {
        return this.add(control, { name: name }, {
            loaded: (info) => {
                this.renderTab(name, info.tab, info.control);
            }
        });
    }

    public newFileTab(model: FileContract, from: any) {
        if (!model || model.isDir) return null;
        var h = this.fileLoader(model.type);
        if (!h) {
            this.fileOpened.raise({
                control: null,
                model: model,
                from: from
            });
            return null;
        }

        var c = this.add((cEle) => {
            return h(cEle, model, from || {});
        }, model, {
            loaded: (info) => {
                this.renderTab(model.name, info.tab, info.control);
                if ((info.tab as any).icon) (info.tab as any).icon(model.icon);
            }
        });
        this.fileOpened.raise({
            control: c,
            model: model,
            from: from
        });
        return c;
    }

    public renderTab(name: string, tabC: AliHub.Common.VisualControl, contentC: AliHub.Common.VisualControl) {
        var iconEle = tabC.appendElement<HTMLSpanElement>("span", "icon", "ali-x-field-icon");
        iconEle.style.display = "none";
        var nameEle = tabC.appendElement<HTMLSpanElement>("span", "name", "ali-x-field-name");
        nameEle.innerHTML = AliHub.Common.Text.toHTML(name);
        if (name) nameEle.title = iconEle.title = name;
        var closeButton = tabC.appendElement<HTMLSpanElement>("span", "close", "ali-x-action-close");
        closeButton.title = AliHub.Res.builtIn().localString("close");
        closeButton.appendChild(svgElement("close"));
        var nameObs = (tabC as any).name = AliHub.Common.listenedObj<string>(name);
        nameObs.subscribe((newValue) => {
            nameEle.innerHTML = AliHub.Common.Text.toHTML(newValue);
            nameEle.title = iconEle.title = newValue;
        });
        var iconObs = (tabC as any).icon = AliHub.Common.listenedObj<AliHub.Graph.ImageContract>();
        iconObs.subscribe((newValue) => {
            iconEle.innerHTML = "";
            var imageEle = AliHub.Graph.imageElement(newValue);
            if (!newValue || !imageEle) {
                iconEle.style.display = "none";
                return;
            }

            iconEle.style.display = "";
            iconEle.appendChild(imageEle);
        });
        (tabC as any).close = () => {
            this.remove(contentC);
        };
        var closeButtonVisible = AliHub.Common.listenedObj(true);
        closeButtonVisible.subscribe((newValue) => {
            closeButton.style.display = newValue ? "" : "none";
            AliHub.Elements.changeStyleRef(closeButton, newValue ? "" : "ali-x-tab-locked", newValue ? "ali-x-tab-locked" : "");
        });
        (tabC as any).closeButtonVisible = closeButtonVisible;
        AliHub.Elements.listen(closeButton, "click", (ev) => {
            this.remove(contentC);
        });
    }

}

export class MdiControl extends BaseMdiControl {

    private _explorer: TreeControl;

    public constructor(id: AliHub.Common.VisualControlElementContract) {
        super(id);
        this._explorer = this.add((cid) => {
            var c = new TreeControl(cid);
            c.itemSelected.add((ev) => {
                if (ev.isDir) return;
                this.newFileTab(ev, this._explorer.transferBag());
            });
            return c;
        }, {
            name: strings("homepage"),
            locked: true
        }, {
            loaded: (info) => {
                this.renderTab(strings("homepage"), info.tab, info.control);
                if ((info.tab as any).closeButtonVisible) (info.tab as any).closeButtonVisible(false);
            }
        }) as any;
    }

    public tree() {
        return this._explorer;
    }

    public push(...value: FileContract[]) {
        this._explorer.push(...value);
    }

    public adaptHeight(target: HTMLElement | Window | number, compute?: AliHub.Common.Func1<number, number>) {
        this._explorer.adaptHeight(target, (height) => {
            var size = this.getTabsSize();
            if (!!size && AliHub.Common.Maths.validNumber(size.y)) height -= size.y;
            return !!compute ? compute(height) : height;
        });
    }

    public icons(isDir: boolean, type: string, value?: AliHub.Graph.ImageContract) {
        return arguments.length > 2 ? this._explorer.icon(isDir, type, value) : this._explorer.icon(isDir, type);
    }

}

export class SubmitControl extends AliHub.Common.VisualControl {

    private _text: HTMLTextAreaElement;
    private _upload: UploadControl;

    public name = AliHub.Common.listenedObj<string>();

    public attachmentUrl = AliHub.Common.listenedObj<string>();

    public submitted = new AliHub.Collection.EventHandlers<any>();

    public cancelled = new AliHub.Collection.EventHandlers<any>();

    public closed = new AliHub.Collection.EventHandlers<any>();

    public uploadKey = AliHub.Common.listenedObj<string>();

    public fileConverter = AliHub.Common.listenedObj<(File: File, form: AliHub.Elements.HiddenFormContract) => void>();

    public constructor(id: AliHub.Common.VisualControlElementContract) {
        super(id);
        this.addStyleRef("ali-controls-files-submit");
        var title = this.appendElement("h5");
        this._text = this.appendElement("textarea", "text") as HTMLTextAreaElement;
        this._text.placeholder = stringInHtml("note");
        this._upload = this.addControl("upload", (cid) => {
            var uC = new UploadControl(cid);
            return uC;
        });
        this.fileConverter.subscribe((newValue) => {
            this._upload.fileConvert = newValue;
        });
        this.uploadKey.subscribe((newValue) => {
            this._upload.fieldKey = newValue;
        });
        this._upload.addStyleRef("ali-x-section-main");
        this._upload.styleProp("display", "none");
        this._upload.addContent({ type: "string", value: stringInHtml("addAttachment") });
        var buttonsEle = this.appendElement("div", "actions");
        buttonsEle.className = "ali-x-section-actions ali-x-section-main";

        var submitBtn = document.createElement("button");
        submitBtn.className = "ali-x-action-submit";
        submitBtn.innerHTML = stringInHtml("ok");
        buttonsEle.appendChild(submitBtn);
        var cancelBtn = document.createElement("button");
        cancelBtn.className = "ali-x-action-cancel";
        cancelBtn.innerHTML = stringInHtml("cancel");
        buttonsEle.appendChild(cancelBtn);

        AliHub.Elements.listen(submitBtn, "click", (ev) => {
            this.submit();
        });
        AliHub.Elements.listen(cancelBtn, "click", (ev) => {
            this.cancel();
        });
        this.name.subscribe((newValue) => {
            if (!title) return;
            title.innerHTML = AliHub.Common.Text.toHTML(newValue);
        });
        this.attachmentUrl.subscribe((newValue) => {
            this._upload.styleProp("display", newValue ? "" : "none");
            this._upload.url = newValue;
        });
    }

    public focusTextArea() {
        try {
            this._text.focus();
        } catch (ex) { }
    }

    public clearContent() {
        if (!!this._text) {
            if (!!this._text.innerHTML) this._text.innerHTML = "";
            if (!!this._text.value) this._text.value = "";
        }

        this._upload.removeAll();
    }

    public note() {
        return this._text.value || this._text.innerHTML;
    }

    public attachment() {
        return this._upload.result();
    }

    public isUploading() {
        return this._upload.isUploading();
    }

    public submit() {
        this.submitted.raise({ submit: true });
        this.closed.raise({ submit: true });
        this.clearContent();
    }

    public cancel() {
        this.cancelled.raise({ submit: false });
        this.closed.raise({ submit: false });
        this.clearContent();
    }

}
