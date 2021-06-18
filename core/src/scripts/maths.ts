/*  --------------------
 *  Maths - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  maths.ts
 *  Description  Maths library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

/// <reference path="common.ts" />

namespace AliHub.Common {

    /**
      * Mathematics utilities.
      */
    export class Maths {

        private static _count = 0;

        public static isNumber(value: any): value is number {
            return value != null && typeof value === "number";
        }

        public static isValidNumber(value: any): value is number {
            return value != null && typeof value === "number" && !isNaN(value);
        }

        /**
          * Validates if given object is a number.
          * @param value  The number to test. 
          */
        public static validNumber(value: any): boolean {
            return value != null && typeof value === "number" && !isNaN(value);
        }

        /**
          * Adds prefix of a number to a string.
          * @param value  The number to format. 
          * @param len  The miximum length of the string to build. 
          */
        public static addPrefix(value: number | string, len: number): string {
            var str = value.toString();
            if (str.length >= len) return str;
            for (var step = 0; step < len - str.length; step++) {
                str = "0" + str;
            }

            return str;
        }

        public static randomString(prefix?: string): string {
            var now = new Date();
            if (Maths._count >= Number.MAX_VALUE) this._count = 0;
            try {
                Maths._count++;
            } catch (ex) {
                Maths._count = 0;
            }

            var str = "n" + Maths._count.toString() + "t" + now.getTime().toString();
            if (!!prefix) str = prefix + "_" + str;
            return str;
        }

        public static inRange(value: number, maxReal: number, minReal: number, maxExpect: number, minExpect: number, scope = false) {
            var minusReal = (maxReal || 0) - (minReal || 0);
            maxExpect = maxExpect || 0;
            minExpect = minExpect || 0;
            if (maxExpect > minExpect) {
                var tempN = maxExpect;
                maxExpect = minExpect;
                minExpect = tempN;
            }

            if (minusReal === 0) return (maxExpect - minExpect) / 2;
            else if (minExpect < 0) minExpect = -minExpect;
            var result = (value - (minReal || 0)) * 1.0 / minusReal * (maxExpect - minExpect) + minExpect;
            if (scope) {
                if (result > maxExpect) result = maxExpect;
                else if (result < minExpect) result = minExpect;
            }

            return result;
        }

    }

}
