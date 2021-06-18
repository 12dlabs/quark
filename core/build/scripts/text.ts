/*  --------------------
 *  Text - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  text.ts
 *  Description  Text, string and encode library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

/// <reference path="common.ts" />

namespace AliHub.Common {

    export interface TextPositionContract {
        start: number;
        end: number;
        q: string;
    }

    /**
      * Text and related.
      */
    export class Text {

        private static _base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        private static _base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

        /**
          * Copies a string.
          * @param value  The value to copy. 
          */
        public static copy(value: string) {
            if (!value) return;
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
                } catch (ex) {
                    if (!!node.outerHTML) node.outerHTML = "";
                }

                if (result) return true;
            } catch (ex) { }

            if ((window as any).clipboardData && (window as any).clipboardData.setData) {
                result = (window as any).clipboardData.setData("Text", value);
                if (result) return true;
            }

            return true;
        }

        /**
          * Formats a string.
          * @param template  The source string. 
          * @param parameters  The object or array of parameters. 
          * @param urlEncode  A value indicating whether this is for URI components.
          * @param preBag  A property bag for preparing if in limited mode. Or null for complete mode.
          */
        public static format(template: string, parameters?: any, uriComponent = false, preBag: string[] | Func<string[]> = null, propPrefix?: string): string {
            var path = template;
            if (!path || !parameters) return path;
            var now = new Date();
            var replaceH = (propName, propValueStr) => {
                if (propValueStr == null) propValueStr = "";
                if (typeof propValueStr === "function" && !!(propValueStr as any as Common.ListenedObjectContract<any>).subscribe) propValueStr = propValueStr();
                if (propValueStr instanceof Date) propValueStr = DateTime.toNumberString(propValueStr);
                if (typeof propValueStr !== "string" && typeof propValueStr !== "number" && typeof propValueStr !== "boolean") propValueStr = Text.serialize(propValueStr) || "";
                propValueStr = propValueStr.toString();
                if (uriComponent) propValueStr = encodeURIComponent(propValueStr);
                while (path.indexOf("{{" + propName + "}}") >= 0) path = path.replace("{{" + propName + "}}", propValueStr);
                while (path.indexOf("{" + propName + "}") >= 0) path = path.replace("{" + propName + "}", propValueStr);
                return path;
            };
            if (typeof parameters === "function" && !!((parameters as any as Common.ListenedObjectContract<any>).subscribe)) parameters = parameters();
            var propSerialized: string;
            if (!propPrefix && path.indexOf("{*}") >= 0) {
                propSerialized = Text.serialize(parameters);
            }

            var propSerializedUrl: string;
            if (!propPrefix && path.indexOf("{*|url}") >= 0) {
                propSerializedUrl = Web.buildParaString(parameters);
            }

            if (!preBag) {
                var mapping: { key: string, path?: string[], value: any }[] = [];
                Text.inScope(path, "{", "}", "\\").forEach((item) => {
                    if (!item || Collection.contains(mapping, item, "key")) return;
                    var path = (propPrefix ? item.replace(propPrefix + ".", "") : item).split(".");
                    mapping.push({ key: item, path: path, value: Reflection.getProperty(parameters, ...path) });
                });
                var replaceMappingItem = (key, value) => {
                    var mapRecItem = Collection.getItem(mapping, key, "key");
                    if (!mapRecItem) mapping.push({ key: key, value: value });
                    else if (mapRecItem.value == null) mapRecItem.value = value;
                };
                replaceMappingItem("timestamp", now);
                replaceMappingItem("now", now);
                if (propSerialized) replaceMappingItem("*", propSerialized);
                if (propSerializedUrl) path = replaceH("*|url", propSerializedUrl);
                mapping.forEach((item) => {
                    path = replaceH(item.key, item.value);
                });
            } else {
                for (var index in parameters) {
                    if (index == null) continue;
                    if (typeof index !== "string" && typeof index !== "number") continue;
                    var ele = (propPrefix ? (propPrefix.toString() + ".") : "") + index.toString();
                    var prop = parameters[index];
                    path = replaceH(ele, prop);
                    if (prop && typeof prop !== "string" && typeof prop !== "number" && typeof prop !== "boolean")
                        path = Text.format(path, prop, uriComponent, [], ele);
                }

                if (typeof preBag === "function") preBag = (preBag as any)();
                if ((preBag as string[]).forEach) (preBag as string[]).forEach((ele, i, arr) => {
                    path = replaceH(ele, "");
                });

                ["id", "name", "created", "key", "i", "index", "q", "no", "num", "subject", "title", "keyword", "guid", "uuid", "query", "mkt", "lang", "nick", "nickname", "value", "code", "type"].forEach((ele, i, arr) => {
                    ele = (!!propPrefix ? (propPrefix.toString() + ".") : "") + ele;
                    path = replaceH(ele, "");
                });
                path = replaceH("timestamp", now);
                path = replaceH("now", now);
                if (propSerialized) path = replaceH("*", propSerialized);
                if (propSerializedUrl) path = replaceH("*|url", propSerializedUrl);
            }

            return path;
        }

        /**
          * Trims a string.
          * @param str  The string to trim. 
          */
        public static trim(str: string): string {
            return str ? str.toString().replace(/(^\s*)|(\s*$)/g, "") : str;
        }

        /**
          * Left trims a string.
          * @param str  The string to remove left white spaces. 
          */
        public static leftTrim(str: string): string {
            return str ? str.toString().replace(/(^\s*)/g, "") : str;
        }

        /**
          * Right trims a string.
          * @param str  The string to remove right white spaces. 
          */
        public static rightTrim(str: string): string {
            return str ? str.toString().replace(/(\s*$)/g, "") : str;
        }

        /**
          * Converts HTML to text.
          * @param html  The HTML string. 
          * @param emptyForNull  true if return empty string if input is null; otherwise, false. 
          */
        public static parseHTML(html: string, emptyForNull = false): string {
            if (html == null) return emptyForNull ? "" : null;
            var element = document.createElement("div");
            element.innerHTML = html.toString();
            var str = element.innerText || element.textContent;
            if (!str) return "";
            return AliHub.Common.Text.trim(str.toString());
        }

        /**
          * Encodes text to HTML.
          * @param text  The text to encode. 
          * @param emptyForNull  true if return empty string if input is null; otherwise, false. 
          */
        public static toHTML(text: string, emptyForNull = false): string {
            if (!text) return emptyForNull ? "" : null;
            return text.toString().replace(/&/g, "&amp;").replace(/\s/g, "&nbsp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&#39;");
        }

        /**
          * Serializes an object to JSON string.
          * @param obj  The object to serialize.
          */
        public static serialize(obj: any, onlyJson: boolean | "simple" | "string" | "full" = false): string {
            if (obj == null) return onlyJson ? "" : "null";
            if (typeof JSON !== "undefined" && (!onlyJson || onlyJson.toString().toLowerCase() === "full")) {
                if (JSON && JSON.stringify) return JSON.stringify(obj);
            }

            var jsonMode = "full";
            if (!onlyJson) jsonMode = "full";
            else if (onlyJson === true) jsonMode = "string";
            else jsonMode = onlyJson.toString().toLowerCase();
            if (!jsonMode) jsonMode = "full";
            if (obj.toJSON && typeof obj.toJSON === "function") {
                obj = obj.toJSON();
                if (typeof obj === "string") return obj;
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
                return (obj as Date).getTime().toString();
            }

            var str = "";
            if (obj instanceof Array) {
                (obj as Array<any>).forEach((ele, i, arr) => {
                    str += ", " + Text.serialize(ele);
                });

                str = ("[" + str + "]").replace("[, ", "[");
                if (jsonMode === "simple") str = str.substring(1, str.length - 1);
                return str;
            }

            if (typeof JSON !== "undefined") {
                if (JSON && JSON.stringify) return JSON.stringify(obj);
            }

            for (var prop in obj) {
                if (!prop || typeof prop !== "string") return;
                str += ", \"" + prop + "\": " + Text.serialize(obj[prop]);
            }

            return ("{" + str + "}").replace("{, ", "{");
        }

        /**
          * Returns the position of the first occurrence of a substring. 
          * @param searchString The substring to search for in the string
          * @param position The index at which to begin searching the String object. If omitted, search starts at the beginning of the string.
          * @param last true if search the last one of position items; otherwise, false.
          * @param negative true if search from last; otherwise, false.
          */
        public static indexOf(str: string, q: string | number | (string | number)[], last = false, negative = false): TextPositionContract {
            var pos: TextPositionContract = {
                start: -1,
                end: -1,
                q: null
            };
            if (str == null || q == null) return pos;
            str = str.toString();
            Collection.toArray(q, true, (ele, i, arr) => {
                if (ele == null) return;
                if (typeof ele === "function") ele = (ele as any)();
                if (ele == null) return;
                switch (typeof ele) {
                    case "number":
                        if (isNaN(ele as number)) return;
                        if (ele < 0) ele = str.length - (ele as number);
                        if (negative) {
                            if (last ? ele >= pos.start && pos.start > -1 : ele <= pos.start) return;
                        } else {
                            if (last ? ele <= pos.start : ele >= pos.start && pos.start > -1) return;
                        }

                        if (ele > str.length) return;
                        pos.start = ele as number;
                        pos.end = ele as number;
                        pos.q = null;
                        return;
                    case "string":
                        if ((ele as string).length < 1) return;
                        var tempI = null;
                        if (negative) {
                            tempI = str.lastIndexOf(ele as string);
                            if (last ? tempI >= pos.start && pos.start > -1 : tempI <= pos.start) return;
                        } else {
                            tempI = str.indexOf(ele as string);
                            if (last ? tempI <= pos.start : tempI >= pos.start && pos.start > -1) return;
                        }

                        if (tempI > str.length) return;
                        pos.start = tempI;
                        pos.end = tempI + (ele as string).length - 1;
                        pos.q = ele as string;
                        return;
                    default:
                        return;
                }
            });

            return pos;
        }

        public static inScope(str: string, left: string, right: string, ignorePrefix?: string): string[] {
            if (!str) return [];
            var arr: string[] = [];
            var startPos = 0;
            while (true) {
                var leftPos = str.indexOf(left, startPos);
                if (leftPos < 0) break;
                var needPush = !(ignorePrefix && str.indexOf(ignorePrefix + left, startPos) === leftPos - ignorePrefix.length);
                leftPos++;
                var rightPos = str.indexOf(right, leftPos);
                if (rightPos < 0) break;
                startPos = rightPos + 1;
                if (needPush) arr.push(str.substring(leftPos, rightPos));
            }

            return arr;
        }

        public static isString(value: any): value is string {
            return value != null && typeof value === "string";
        }

        public static isNotEmptyString(value: any): value is string {
            return !!value && typeof value === "string";
        }

        public static isEmptyOrWhiteSpace(value: any): value is string {
            var isStr = Text.isNotEmptyString(value);
            if (!isStr) return false;
            return !!Text.trim(value);
        }

        public static dataUrlToBlob(dataURL: string): Blob {
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
        }

        /** 
           * Encodes to base64.
           * @param str The string to convert.
           */  
        public static base64encode(str: string): string {  
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
        }  

        /** 
         * Decodes from base64.
          * @param str The string to convert.
          */  
        public static base64decode(str: string): string {  
            var c1, c2, c3, c4;
            var len = str.length;
            var i = 0;
            var out = "";
            while (i < len) {  
                do {
                    c1 = Text._base64DecodeChars[str.charCodeAt(i++) & 0xff];
                }
                while (i < len && c1 == -1);

                if (c1 == -1) break;

                do {
                    c2 = Text._base64DecodeChars[str.charCodeAt(i++) & 0xff];
                }
                while (i < len && c2 == -1);
                if (c2 == -1) break;
                out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

                do {
                    c3 = str.charCodeAt(i++) & 0xff;
                    if (c3 == 61)
                        return out;
                    c3 = Text._base64DecodeChars[c3];
                }
                while (i < len && c3 == -1);
                if (c3 == -1) break;
                out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

                do {
                    c4 = str.charCodeAt(i++) & 0xff;
                    if (c4 == 61)
                        return out;
                    c4 = Text._base64DecodeChars[c4];
                }
                while (i < len && c4 == -1);
                if (c4 == -1) break;
                out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
            }

            return out;
        }

        /** 
          * Converts UTF-16 to UTF-8. 
          * @param str The string to convert.
          */  
        public static utf16to8(str: string): string {  
            var c;
            var out = "";
            var len = str.length;
            for (var i = 0; i < len; i++) {
                c = str.charCodeAt(i);
                if ((c >= 0x0001) && (c <= 0x007F)) {
                    out += str.charAt(i);
                } else {
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
        }

        /** 
          * Converts UTF-8 to UTF-16. 
          * @param str The string to convert.
          */  
        public static utf8to16(str: string): string {  
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
        }
    }
}
