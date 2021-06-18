/*  --------------------
 *  Date and time - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  datetime.ts
 *  Description  Collection library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

/// <reference path="common.ts" />

namespace AliHub.Common {

    /**
      * Calendar control options.
      */
    export interface TimeControlOptionsContract extends VisualControlOptionsContract<TimeControl> {
        start?: number;
        end?: number;
        viewModel?: PlanInfoContract<Graph.ColorStringContract>[];
        partsStyle?: TimeControlStyleContract;
    }

    /**
      * Calendar control options.
      */
    export interface TimeControlStyleContract {
        labelX?: number;
        labelY?: number;
        scaleWidth?: number;
        scaleHeight?: number;
        scaleLast?: boolean;
        itemLineWidth?: number;
        itemTitleX?: number;
        itemTitleY?: number;
    }

    export interface TimeContract {
        hour: number;
        minute?: number;
        second?: number;
        millisecond?: number;
    }

    export interface IntervalContract {
        start: Date;
        end: Date;
    }

    export interface PlanInfoContract<T> {
        start: TimeContract;
        duration: number;
        model: string | T;
    }

    export interface StopwatchNotificationOptionsContract {
        subject?: string | HTMLElement | Common.VisualControl;
        key?: string | Web.BaseDataPackageResolver<any> | boolean;
        post?: boolean;
        channel?: string | Common.Func<string>;
    }

    export interface HoroscopeInfoContract extends SymboItemContract {
        enName: string;
        start: { month: number, date: number };
        end: { month: number, date: number };
    }

    /**
      * Date time and related.
      */
    export class DateTime {

        public static only24h = false;

        /**
          * Converts to date.
          * @param value  The value to convert. 
          */
        public static parse(value: Date | number | string | boolean): Date {
            if (value == null) return null;
            if (value instanceof Date) return value;
            if ((value as any).month != null && (value as any).date != null) {
                var struc = value as any;
                return new Date(struc.year != null ? struc.year : (new Date()).getFullYear(), struc.month, struc.date || 0, struc.hour || 0, struc.minute || 0, struc.second || 0, struc.millisecond || 0);
            }

            switch (typeof value) {
                case "string":
                    switch (value) {
                        case "init":
                            value = (window as any)._pageInitDate;
                            var latest = !value || value === "init" ? new Date() : DateTime.parse(value);
                            if (latest == null) latest = new Date();
                            (window as any)._pageInitDate = latest;
                            return latest;
                        case "now":
                            return new Date();
                        case "today":
                            var now = new Date();
                            return new Date(now.getFullYear(), now.getMonth(), now.getDate());
                        default:
                            return new Date(value as string);
                    }
                case "number":
                    return new Date(value as number);
                case "boolean":
                    return value === true ? new Date() : null;
                default:
                    return value as any;
            }
        }

        /**
          * Converts to locale time string.
          * @param value  The date time. 
          */
        public static toLocaleTimeString(value: Date, only24h = false): string {
            value = DateTime.parse(value);
            if (value == null) return "";
            if (DateTime.only24h || only24h === true) {
                return Maths.addPrefix(value.getHours(), 2) + ":" + Maths.addPrefix(value.getMinutes(), 2) + ":" + Maths.addPrefix(value.getSeconds(), 2);
            }

            var timeStr = value.toLocaleTimeString();
            if (timeStr.indexOf("GMT") > 5) {
                timeStr = timeStr.substring(0, timeStr.indexOf("GMT"));
            } else if (timeStr.indexOf("GMT") === 0) {
                timeStr = timeStr.substring(5);
            }

            return timeStr;
        }

        /**
          * Gets locale string of the day of week string.
          * @param value  The date time. 
          */
        public static toDayOfWeekString(value: Date | number, short = false): string {
            if (value == null) return "";
            var dayOfWeek = typeof value === "number" ? value : value.getDay();
            if (short) {
                switch (dayOfWeek) {
                    case 0:
                        return Res.builtIn().localString("week0s");
                    case 1:
                        return Res.builtIn().localString("week1s");
                    case 2:
                        return Res.builtIn().localString("week2s");
                    case 3:
                        return Res.builtIn().localString("week3s");
                    case 4:
                        return Res.builtIn().localString("week4s");
                    case 5:
                        return Res.builtIn().localString("week5s");
                    case 6:
                        return Res.builtIn().localString("week6s");
                    default:
                        return "";
                }
            }

            switch (dayOfWeek) {
                case 0:
                    return Res.builtIn().localString("week0f");
                case 1:
                    return Res.builtIn().localString("week1f");
                case 2:
                    return Res.builtIn().localString("week2f");
                case 3:
                    return Res.builtIn().localString("week3f");
                case 4:
                    return Res.builtIn().localString("week4f");
                case 5:
                    return Res.builtIn().localString("week5f");
                case 6:
                    return Res.builtIn().localString("week6f");
                default:
                    return "";
            }
        }

        /**
          * Gets locale string of AM or PM.
          * @param value  The date time. 
          */
        public static toApmString(value: Date | number): string {
            if (value == null) return "";
            var hour = typeof value === "number" ? value : value.getHours();
            return hour >= 12 ? Res.builtIn().localString("pm") : Res.builtIn().localString("am");
        }

        /**
          * Gets locale string of the month.
          * @param value  The date time. 
          */
        public static toMonthString(value: Date | number, short = false): string {
            if (value == null) return "";
            var month = typeof value === "number" ? value : value.getDay();
            if (short) {
                switch (month) {
                    case 0:
                        return Res.builtIn().localString("month0s") || month.toString();
                    case 1:
                        return Res.builtIn().localString("month1s") || month.toString();
                    case 2:
                        return Res.builtIn().localString("month2s") || month.toString();
                    case 3:
                        return Res.builtIn().localString("month3s") || month.toString();
                    case 4:
                        return Res.builtIn().localString("month4s") || month.toString();
                    case 5:
                        return Res.builtIn().localString("month5s") || month.toString();
                    case 6:
                        return Res.builtIn().localString("month6s") || month.toString();
                    case 7:
                        return Res.builtIn().localString("month7s") || month.toString();
                    case 8:
                        return Res.builtIn().localString("month8s") || month.toString();
                    case 9:
                        return Res.builtIn().localString("month9s") || month.toString();
                    case 10:
                        return Res.builtIn().localString("monthAs") || month.toString();
                    case 11:
                        return Res.builtIn().localString("monthBs") || month.toString();
                    default:
                        return "";
                }
            }

            switch (month) {
                case 0:
                    return Res.builtIn().localString("month0f") || month.toString();
                case 1:
                    return Res.builtIn().localString("month1f") || month.toString();
                case 2:
                    return Res.builtIn().localString("month2f") || month.toString();
                case 3:
                    return Res.builtIn().localString("month3f") || month.toString();
                case 4:
                    return Res.builtIn().localString("month4f") || month.toString();
                case 5:
                    return Res.builtIn().localString("month5f") || month.toString();
                case 6:
                    return Res.builtIn().localString("month6f") || month.toString();
                case 7:
                    return Res.builtIn().localString("month7f") || month.toString();
                case 8:
                    return Res.builtIn().localString("month8f") || month.toString();
                case 9:
                    return Res.builtIn().localString("month9f") || month.toString();
                case 10:
                    return Res.builtIn().localString("monthAf") || month.toString();
                case 11:
                    return Res.builtIn().localString("monthBf") || month.toString();
                default:
                    return "";
            }
        }

        /**
          * Gets customized string.
          * @param value  The date time.
          * @param format  The template string.
          * @param classicFormatOnly  true if only classic text format; otherwise, false.
          */
        public static toCustomizedString(value: Date, format: string, classicFormatOnly = false): string {
            value = DateTime.parse(value);
            if (value == null) return "";
            if (format == null) return value.toString();
            format = format.toString();
            var horoscope = DateTime.getHoroscope(value);
            switch (format.toLowerCase()) {
                case "localedate":
                case "ldate":
                    return value.toLocaleDateString();
                case "localetime":
                case "ltime":
                    return value.toLocaleTimeString();
                case "localereladate":
                case "lrdate":
                    return DateTime.toLocaleString(value, true);
                case "localerelatime":
                case "lrtime":
                    return DateTime.toLocaleString(value, false);
                case "localedatetime":
                case "locale":
                    return value.toLocaleString();
                case "date":
                    return value.toDateString();
                case "time":
                    return value.toTimeString();
                case "full":
                case "datetime":
                    return value.toString();
                case "iso":
                    return value.toISOString();
                case "utc":
                    return value.toUTCString();
                case "number":
                    return value.getTime().toString();
                case "horoscope":
                    return !!horoscope ? horoscope.name : "";
                case "horoscopesymbo":
                    return !!horoscope ? horoscope.symbo : "";
                case "span":
                    return DateTime.getNowSpanString(value);
                default:
                    break;
            }

            var h = value.getHours() % 12;
            if (h === 0) h = 12;
            var info = {
                localedate: value.toLocaleDateString(),
                localetime: value.toLocaleTimeString(),
                locale: value.toLocaleString(),
                full: value.toString(),
                iso: value.toISOString(),
                horoscopename: !!horoscope ? horoscope.name : "",
                horoscopeen: !!horoscope ? horoscope.enName : "",
                horoscopesymbo: !!horoscope ? horoscope.symbo : "",
                yyyy: value.getFullYear(),
                dddd: DateTime.toDayOfWeekString(value, false),
                MMMM: DateTime.toMonthString(value.getMonth(), false),
                ddd: DateTime.toDayOfWeekString(value, true),
                MMM: DateTime.toMonthString(value.getMonth(), true),
                yy: value.getFullYear() % 100,
                MM: Maths.addPrefix(value.getMonth() + 1, 2),
                dd: Maths.addPrefix(value.getDate(), 2),
                M: value.getMonth() + 1,
                d: value.getDate(),
                HH: Maths.addPrefix(value.getHours(), 2),
                hh: Maths.addPrefix(h, 2),
                mm: Maths.addPrefix(value.getMinutes(), 2),
                ss: Maths.addPrefix(value.getSeconds(), 2),
                tt: DateTime.toApmString(value),
                mmm: Maths.addPrefix(value.getMilliseconds(), 3),
                H: value.getHours(),
                h: h,
                m: value.getMinutes(),
                s: value.getSeconds()
            };
            var str = Text.format(format, info);
            if (!!str && !classicFormatOnly) for (var prop in info) {
                if (!!prop && typeof prop === "string") str = str.replace(prop, info[prop]);
            }

            return str;
        }

        /**
          * Compares whether the two dates are in same day.
          * @param a  The first date to compare. 
          * @param a  The second date to compare. 
          */
        public static sameDate(a: Date, b: Date): boolean {
            a = DateTime.parse(a);
            b = DateTime.parse(b);
            if (a == null && b == null) return true;
            if (a == null || b == null) return false;
            return a.toDateString() === b.toDateString();
        }

        /**
          * Converts a specific date to locale string.
          * @param value  The date value. 
          */
        public static toLocaleString(value: Date, onlyDate: boolean = false): string {
            if (value == null) return "";
            value = DateTime.parse(value);
            var now = new Date();
            if (value.getFullYear() === now.getFullYear() && value.getMonth() === now.getMonth() && value.getDate() === now.getDate()) {
                return onlyDate ? AliHub.Res.builtIn().localString("today") : DateTime.toLocaleTimeString(value);
            }

            var diffDays = DateTime.getDaysDiff(now, value);
            if (value > now) {
                if (diffDays === 1) return onlyDate ? AliHub.Res.builtIn().localString("tomorrow") : AliHub.Res.builtIn().localString("tomorrowTime").replace("{0}", DateTime.toLocaleTimeString(value));
                if (value.getDay() - diffDays > 0) {
                    switch (value.getDay()) {
                        case 6:
                            return onlyDate ? AliHub.Res.builtIn().localString("week6f") : AliHub.Res.builtIn().localString("week6t").replace("{0}", DateTime.toLocaleTimeString(value));
                        case 5:
                            return onlyDate ? AliHub.Res.builtIn().localString("week5f") : AliHub.Res.builtIn().localString("week5t").replace("{0}", DateTime.toLocaleTimeString(value));
                        case 4:
                            return onlyDate ? AliHub.Res.builtIn().localString("week4f") : AliHub.Res.builtIn().localString("week4t").replace("{0}", DateTime.toLocaleTimeString(value));
                        case 3:
                            return onlyDate ? AliHub.Res.builtIn().localString("week3f") : AliHub.Res.builtIn().localString("week3t").replace("{0}", DateTime.toLocaleTimeString(value));
                        default:
                            break;
                    }
                }

                return onlyDate ? value.toLocaleDateString() : value.toLocaleString();
            }

            if (diffDays === 1) return onlyDate ? AliHub.Res.builtIn().localString("yesterday") : AliHub.Res.builtIn().localString("yesterdayTime").replace("{0}", DateTime.toLocaleTimeString(value));
            if (value.getDay() + diffDays < 6) {
                switch (value.getDay()) {
                    case 4:
                        return onlyDate ? AliHub.Res.builtIn().localString("week4f") : AliHub.Res.builtIn().localString("week4t").replace("{0}", DateTime.toLocaleTimeString(value));
                    case 3:
                        return onlyDate ? AliHub.Res.builtIn().localString("week3f") : AliHub.Res.builtIn().localString("week3t").replace("{0}", DateTime.toLocaleTimeString(value));
                    case 2:
                        return onlyDate ? AliHub.Res.builtIn().localString("week2f") : AliHub.Res.builtIn().localString("week2t").replace("{0}", DateTime.toLocaleTimeString(value));
                    case 1:
                        return onlyDate ? AliHub.Res.builtIn().localString("week1f") : AliHub.Res.builtIn().localString("week1t").replace("{0}", DateTime.toLocaleTimeString(value));
                    default:
                        break;
                }
            }

            return onlyDate ? value.toLocaleDateString() : value.toLocaleString();
        }

        /**
          * Converts a specific date to a full locale string.
          * @param value  The date value. 
          */
        public static toFullLocaleString(value: Date): string {
            if (value == null) return "";
            value = DateTime.parse(value);
            var now = new Date();
            return value.toLocaleString();
        }

        /**
          * Converts a specific date to simple string.
          * @param value  The date value. 
          */
        public static toSimpleString(value: Date): string {
            if (value == null) return "";
            value = DateTime.parse(value);
            return value.getFullYear().toString() + "-" + Maths.addPrefix(value.getMonth() + 1, 2) + "-" + Maths.addPrefix(value.getDate(), 2)
                + " " + Maths.addPrefix(value.getHours(), 2) + ":" + Maths.addPrefix(value.getMinutes(), 2) + ":" + Maths.addPrefix(value.getSeconds(), 2);
        }

        /**
          * Gets the day of week of a specific month.
          * @param fullYear  The full year. 
          * @param month  The month. 
          */
        public static monthStart(fullYear: number, month = 0): number {
            var date = new Date(fullYear, month);
            return date.getDay();
        }

        /**
          * Converts a specific date to number string.
          * @param value  The date value. 
          */
        public static toNumberString(value: Date | number | string): string {
            if (value == null) return "";
            if (typeof value === "number") return value.toString();
            value = DateTime.parse(value);
            if (value == null) return "";
            return value.getTime().toString();
        }

        /**
          * Gets a value indicating whether a year is leap.
          * @param fullYear  The full year to test. 
          */
        public static isLeap(fullYear: number): boolean {
            if (fullYear == null) return null;
            return fullYear % 400 === 0 || (fullYear % 4 === 0 && fullYear % 100 !== 0);
        }

        /**
          * Gets the count of days in a specific month.
          * @param fullYear  The month. 
          */
        public static getDayCount(fullYear: number, month?: number): number {
            if (month === 2) {
                if (fullYear == null) return null;
                return DateTime.isLeap(fullYear) ? 29 : 28;
            }

            if (month == null) {
                return DateTime.isLeap(fullYear) ? 366 : 365;
            }

            switch (month) {
                case 0:
                case 2:
                case 4:
                case 6:
                case 7:
                case 9:
                case 11:
                    return 31;
                default:
                    return 30;
            }
        }

        /**
          * Gets days difference between two date.
          * @param begin  The begin date. 
          * @param end  The end date. 
          */
        public static getDaysDiff(begin: Date, end: Date): number {
            if (begin == null || end == null) return null;
            begin = DateTime.parse(begin);
            end = DateTime.parse(end);
            if (begin > end) {
                var temp = begin;
                begin = end;
                end = temp;
            }

            var endYear = end.getFullYear();
            var beginYear = begin.getFullYear();
            var endMonth = end.getMonth();
            var beginMonth = begin.getMonth();
            var endDay = end.getDate();
            var beginDay = begin.getDate();

            if (endYear === beginYear && endMonth === beginMonth) {
                return endDay - beginDay;
            }

            var delta = 0;
            delta += DateTime.getDayCount(beginYear, beginMonth) - beginDay;
            delta += end.getDate();
            if (endYear === beginYear) {
                if (endMonth - beginMonth > 1) {
                    for (var i = beginMonth + 1; i < endMonth; i++) {
                        delta += DateTime.getDayCount(beginYear, i);
                    }
                }

                return delta;
            }

            for (var i = beginMonth + 1; i < 12; i++) {
                delta += DateTime.getDayCount(beginYear, i);
            }

            for (var i = 0; i < endMonth; i++) {
                delta += DateTime.getDayCount(endYear, i);
            }

            if (endYear - beginYear > 1) {
                for (var i = beginYear + 1; i < endYear; i++) {
                    delta += DateTime.getDayCount(i);
                }
            }

            return delta;
        }

        /**
          * Gets years difference between two date.
          * @param begin  The begin date. 
          * @param end  The end date. 
          */
        public static getYearsDiff(begin: Date, end: Date): number {
            if (begin == null || end == null) return null;
            begin = DateTime.parse(begin);
            end = DateTime.parse(end);
            if (begin > end) {
                var temp = begin;
                begin = end;
                end = temp;
            }

            var delta = end.getFullYear() - begin.getFullYear();
            return delta;
        }

        /**
          * Gets age by given a birthday.
          * @param value  The birthday. 
          */
        public static getAge(value: Date): number {
            if (value == null) return null;
            value = DateTime.parse(value);
            var now = new Date();
            var delta = now.getFullYear() - value.getFullYear();
            return value.getMonth() >= now.getMonth() ? delta : delta - 1;
        }

        /**
          * Gets horoscopes list.
          */
        public static getHoroscopes(): HoroscopeInfoContract[] {
            return [
                {
                    name: AliHub.Res.builtIn().localString("capricorn"),
                    enName: "Capricorn",
                    start: { month: 11, date: 22 },
                    end: { month: 0, date: 20 },
                    symbo: "♑"
                },
                {
                    name: AliHub.Res.builtIn().localString("aquarius"),
                    enName: "Aquarius",
                    start: { month: 0, date: 21 },
                    end: { month: 1, date: 19 },
                    symbo: "♒"
                },
                {
                    name: AliHub.Res.builtIn().localString("pisces"),
                    enName: "Pisces",
                    start: { month: 1, date: 20 },
                    end: { month: 2, date: 20 },
                    symbo: "♓"
                },
                {
                    name: AliHub.Res.builtIn().localString("aries"),
                    enName: "Aries",
                    start: { month: 2, date: 21 },
                    end: { month: 3, date: 20 },
                    symbo: "♈"
                },
                {
                    name: AliHub.Res.builtIn().localString("taurus"),
                    enName: "Taurus",
                    start: { month: 3, date: 21 },
                    end: { month: 4, date: 21 },
                    symbo: "♉"
                },
                {
                    name: AliHub.Res.builtIn().localString("gemini"),
                    enName: "Gemini",
                    start: { month: 4, date: 22 },
                    end: { month: 5, date: 21 },
                    symbo: "♊"
                },
                {
                    name: AliHub.Res.builtIn().localString("cancer"),
                    enName: "Cancer",
                    start: { month: 5, date: 22 },
                    end: { month: 6, date: 22 },
                    symbo: "♋"
                },
                {
                    name: AliHub.Res.builtIn().localString("leo"),
                    enName: "Leo",
                    start: { month: 6, date: 23 },
                    end: { month: 7, date: 23 },
                    symbo: "♌"
                },
                {
                    name: AliHub.Res.builtIn().localString("virgo"),
                    enName: "Virgo",
                    start: { month: 7, date: 24 },
                    end: { month: 8, date: 23 },
                    symbo: "♍"
                },
                {
                    name: AliHub.Res.builtIn().localString("libra"),
                    enName: "Libra",
                    start: { month: 8, date: 24 },
                    end: { month: 9, date: 23 },
                    symbo: "♎"
                },
                {
                    name: AliHub.Res.builtIn().localString("scorpio"),
                    enName: "Scorpio",
                    start: { month: 9, date: 24 },
                    end: { month: 10, date: 22 },
                    symbo: "♏"
                },
                {
                    name: AliHub.Res.builtIn().localString("sagittarius"),
                    enName: "Sagittarius",
                    start: { month: 10, date: 23 },
                    end: { month: 11, date: 21 },
                    symbo: "♐"
                }
            ];
        }

        /**
          * Gets a horoscope info by specific date.
          * @param value  The date. 
          */
        public static getHoroscope(value: Date): HoroscopeInfoContract {
            if (value == null) return null;
            value = DateTime.parse(value);
            var date = value.getDate();
            var month = value.getMonth();
            var list = DateTime.getHoroscopes();
            if ((month == 11 && date >= 22) || (month == 0 && date <= 20)) return list[0];
            else if ((month == 0 && date >= 21) || (month == 1 && date <= 19)) return list[1];
            else if ((month == 1 && date >= 20) || (month == 2 && date <= 20)) return list[2];
            else if ((month == 2 && date >= 21) || (month == 3 && date <= 20)) return list[3];
            else if ((month == 3 && date >= 21) || (month == 4 && date <= 21)) return list[4];
            else if ((month == 4 && date >= 22) || (month == 5 && date <= 21)) return list[5];
            else if ((month == 5 && date >= 22) || (month == 6 && date <= 22)) return list[6];
            else if ((month == 6 && date >= 23) || (month == 7 && date <= 23)) return list[7];
            else if ((month == 7 && date >= 24) || (month == 8 && date <= 23)) return list[8];
            else if ((month == 8 && date >= 24) || (month == 9 && date <= 23)) return list[9];
            else if ((month == 9 && date >= 24) || (month == 10 && date <= 22)) return list[10];
            else if ((month == 10 && date >= 23) || (month == 11 && date <= 21)) return list[11];
            else return null;
        }

        /**
          * Adds speicifc seconds to given date.
          * @param value  The date. 
          * @param adding  The timespan in second to add. 
          */
        public static addSeconds(value: Date, adding: number): Date {
            value = DateTime.parse(value);
            if (value == null) return null;
            var resultDate = new Date(value.getTime() + adding * 1000);
            return resultDate;
        }

        /**
          * Adds speicifc days to given date.
          * @param value  The date. 
          * @param adding  The timespan in day to add. 
          */
        public static addDays(value: Date, adding: number): Date {
            value = DateTime.parse(value);
            if (value == null) return null;
            var resultDate = new Date(value.getTime() + adding * 24 * 3600000);
            return resultDate;
        }

        /**
          * Gets timespan in milliseconds.
          * @param begin  The begin date. 
          * @param end  The end date. 
          */
        public static getSpan(begin: Date, end: Date): number {
            begin = DateTime.parse(begin);
            end = DateTime.parse(end);
            if (begin == null || end == null) return null;
            var span = end.getTime() - begin.getTime();
            return span;
        }

        /**
          * Gets timespan string.
          * @param begin  The begin date. 
          * @param end  The end date. 
          */
        public static getSpanString(begin: Date, end: Date, showMillisec: boolean = true): string {
            var span = DateTime.getSpan(begin, end);
            return DateTime.toSpanString(span, showMillisec);
        }

        /**
          * Gets timespan string to now.
          * @param target  The target date. 
          */
        public static getNowSpanString(target: Date): string {
            target = DateTime.parse(target);
            var now = new Date();
            var span = DateTime.getSpan(target, now);
            span = span / 10000;
            if (span < 0) {
                return AliHub.Res.builtIn().localString("future");
            } else if (span < 2) {
                return AliHub.Res.builtIn().localString("secondsAgo");
            } else if (span < 6) {
                return AliHub.Res.builtIn().localString("minuteAgo");
            } else if (span < 12) {
                return AliHub.Res.builtIn().localString("minutesTwoAgo");
            } else if (span < 360) {
                return AliHub.Res.builtIn().localString("minutesAgo").replace("{0}", (span / 6).toFixed());
            } else if (span < 720) {
                return AliHub.Res.builtIn().localString("hourAgo");
            } else if (span < 1080) {
                return AliHub.Res.builtIn().localString("hoursTwoAgo");
            } else if (span < 10000 && target.getDay() === now.getDay()) {
                return AliHub.Res.builtIn().localString("hoursAgo").replace("{0}", (span / 360).toFixed());
            } else {
                return DateTime.toLocaleString(target);
            }
        }

        /**
          * Gets timespan.
          * @param value  The timespan in milliseconds. 
          */
        public static toSpan(value: number | TimeSpanContract | AliHub.Common.Func<number> | AliHub.Common.Func<TimeSpanContract>): TimeSpanContract {
            if (value == null) return null;
            if (typeof value === "function") value = (value as any)();
            if (typeof value !== "number") {
                var spanObj = value as TimeSpanContract;
                if (!spanObj.Days) spanObj.Days = 0;
                if (!spanObj.Hours) spanObj.Hours = 0;
                if (!spanObj.Minutes) spanObj.Minutes = 0;
                if (!spanObj.Seconds) spanObj.Seconds = 0;
                if (!spanObj.Milliseconds) spanObj.Milliseconds = 0;
                return spanObj;
            }

            var span = value as number;
            if (span == null || isNaN(span)) return null;
            var result: TimeSpanContract = { Days: 0, Hours: 0, Minutes: 0, Seconds: 0, Milliseconds: 0 };
            var str = "";
            if (span < 0) {
                str += "-";
                span = -span;
            }

            if (span < 1000) {
                result.Milliseconds = span;
                return result;
            }

            var millis = span;
            var days = parseInt((millis / 86400000).toString(), 10);
            if (!isNaN(days) && days > 0) result.Days = days;
            millis -= days * 86400000;
            var hours = parseInt((millis / 3600000).toString(), 10);
            if (!isNaN(hours) && hours > 0) result.Hours = hours;
            millis -= hours * 3600000;
            var minutes = parseInt((millis / 60000).toString(), 10);
            if (isNaN(minutes)) minutes = 0;
            result.Minutes = minutes;
            millis -= minutes * 60000;
            var seconds = parseInt((millis / 1000).toString(), 10);
            if (isNaN(seconds)) seconds = 0;
            result.Seconds = seconds;
            millis -= minutes * 1000;
            result.Milliseconds = millis;
            return result;
        }

        /**
          * Gets timespan string.
          * @param span  The timespan in milliseconds. 
          */
        public static toSpanString(span: number, showMillisec: boolean = true): string {
            if (span == null || isNaN(span)) return "";
            var str = "";
            if (span < 0) {
                str += "-";
                span = -span;
            }

            if (span < 1000) {
                if (showMillisec) {
                    str += "0:00." + Maths.addPrefix(span, 3);
                } else {
                    if (span < 500) str += "0:00";
                    else str += "0:01";
                }

                return str;
            }

            var millis = span;
            var days = parseInt((millis / 86400000).toString(), 10);
            if (!isNaN(days) && days > 0) str += days.toString() + ":";
            millis -= days * 86400000;
            var hours = parseInt((millis / 3600000).toString(), 10);
            if (!isNaN(hours) && hours > 0) str += Maths.addPrefix(hours, 2) + ":";
            millis -= hours * 3600000;
            var minutes = parseInt((millis / 60000).toString(), 10);
            if (isNaN(minutes)) minutes = 0;
            str += Maths.addPrefix(minutes, 2) + ":";
            millis -= minutes * 60000;
            var seconds = parseInt((millis / 1000).toString(), 10);
            if (isNaN(seconds)) seconds = 0;
            str += Maths.addPrefix(seconds, 2);
            millis -= minutes * 1000;
            if (showMillisec && millis > 0) str += "." + Maths.addPrefix(millis, 3);
            return str === "NaN:NaN" || str === "NaN:NaN:NaN" || str === "NaN:NaN.NaN" || str === "NaN:NaN:NaN.NaN" ? "" : str;
        }

        /**
          * Gets locale timespan string.
          * @param value  The timespan in milliseconds. 
          */
        public static toLocaleSpanString(value: number | TimeSpanContract | AliHub.Common.Func<number> | AliHub.Common.Func<TimeSpanContract>, precision?: TimePrecisions): string {
            var span = DateTime.toSpan(value);
            if (!span) return "";
            if (precision == null || precision == TimePrecisions.Unknown) precision = TimePrecisions.Second;
            var str = span.Days > 0 ? AliHub.Res.builtIn().localString("daysNum").replace("{0}", span.Days.toString()) : "";
            if (precision === TimePrecisions.Day) return str;
            if (span.Hours > 0) str += AliHub.Res.builtIn().localString("hoursNum").replace("{0}", span.Hours.toString());
            if (precision === TimePrecisions.Hour) return str;
            if (span.Minutes > 0) str += AliHub.Res.builtIn().localString("minutesNum").replace("{0}", span.Minutes.toString());
            if (precision === TimePrecisions.Minute) return str;
            if (span.Seconds > 0) str += AliHub.Res.builtIn().localString("secondsNum").replace("{0}", span.Seconds.toString());
            if (precision === TimePrecisions.Second) return str;
            if (span.Milliseconds > 0) str += AliHub.Res.builtIn().localString("millisecondsNum").replace("{0}", span.Milliseconds.toString());
            return str;
        }

        /**
          * Gets time string.
          * @param value  The date time.
          */
        public static toTimeString(value: Date, showSecond: boolean = true, force24?: boolean): string {
            value = DateTime.parse(value);
            var str = "";
            if (force24 === true) {
                str = value.getHours() > 10 ? "" : "0";
                str += value.getHours().toString() + ":";
                str += value.getMinutes() > 10 ? "" : "0";
                str += value.getMinutes().toString();
                if (showSecond === true) {
                    str += value.getSeconds() > 0 ? "" : "0";
                    str += value.getSeconds().toString();
                }

                return str;
            }

            if (showSecond !== true) return value.toLocaleTimeString();
            var testHour = value.getHours() >= 12 ? 23 : 11;
            var testTime = new Date(2000, 0, 1, testHour, 57, 46);
            var hours = value.getHours();
            var is24 = false;
            var strTemp = testTime.toLocaleTimeString();
            if (strTemp.indexOf("23") >= 0) is24 = true;
            if ((is24 !== true && strTemp.indexOf("11") < 0) || strTemp.indexOf("57") < 0 || strTemp.indexOf("46") < 0) return value.toLocaleTimeString();
            strTemp = strTemp.replace("23", "{{hour}}").replace("11", "{{hour}}").replace("57", "{{min}}").replace(":46", "").replace("46", "{{sec}}");
            if (is24 === true && hours >= 12) hours -= 12;
            var hoursStr = hours.toString();
            if (hours < 10) hoursStr = "0" + hoursStr;
            var minStr = value.getMinutes().toString();
            if (value.getMinutes() < 10) minStr = "0" + minStr;
            var secStr = value.getSeconds().toString();
            if (value.getSeconds() < 10) secStr = "0" + secStr;
            str = strTemp.replace("{{hour}}", hours.toString()).replace("{{min}}", minStr).replace("{{sec}}", secStr);
            return str;
        }

    }

    /**
      * Time scheduler control.
      */
    export class TimeControl extends Common.VisualControl {

        private _start = 0;
        private _end = 24;
        private _model: PlanInfoContract<Graph.ColorStringContract>[];
        private _unit = 40;
        private _style: TimeControlStyleContract;

        /**
          * Initializes a new instance of the CalendarControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones. 
          */
        public constructor(id: VisualControlElementContract) {
            super(id);
            this.addStyleRef("ali-controls-time");
            this._style = {
                labelX: 9,
                labelY: 15,
                scaleWidth: 11,
                scaleHeight: 1,
                scaleLast: true,
                itemTitleX: -10,
                itemTitleY: 25
            };
        }

        /**
          * Loads specific options.
          * @param options  The options to load. 
          */
        public loadOptions(value: TimeControlOptionsContract | boolean): any {
            var options: TimeControlOptionsContract = super.loadOptions(value);
            if (!options) return options;

            if (options.start != null) this._start = options.start;
            if (options.end != null) this._end = options.end;
            if (this._start < 0) this._start = 0;
            if (this._end < 0) this._end = 0;
            if (this._start > 24) this._start = 24;
            if (this._end > 24) this._end = 24;
            if (this._start > this._end) {
                var tempNum = this._end;
                this._start = this._end;
                this._end = tempNum;
            }

            if (options.viewModel != null) this._model = options.viewModel;
            if (!!options.partsStyle) this._style = options.partsStyle;
            this._refresh();
        }

        public startHour(value?: number) {
            if (arguments.length > 0) {
                if (value != null && value >= 0 && value <= 24 && value <= this._end) {
                    this._start = value;
                }
            }

            return this._start;
        }

        public endHour(value?: number) {
            if (arguments.length > 0) {
                if (value != null && value >= 0 && value <= 24 && value >= this._start) {
                    this._end = value;
                }
            }

            return this._end;
        }

        public hours(): number {
            return this._end - this._start;
        }

        public setViewModel(col: PlanInfoContract<Graph.ColorStringContract>[]) {
            this._model = col;
            this._refresh();
        }

        private _refresh() {
            if (!this._model) {
                this.innerHTML("");
                return;
            }

            var list = this._model.sort((a, b) => {
                if (!a || !b) return 0;
                if (!a.start) a.start = { hour: 0 };
                if (!b.start) b.start = { hour: 0 };
                if (a.start.hour == null) a.start.hour = 0;
                if (b.start.hour == null) b.start.hour = 0;
                return (a.start.hour - b.start.hour) * 3600 + ((a.start.minute != null ? a.start.minute : 0) - (b.start.minute != null ? b.start.minute : 0)) * 60 + (a.start.second != null ? a.start.second : 0) - (b.start.second != null ? b.start.second : 0);
            });
            if (!list[list.length - 1]) {
                this.innerHTML("");
                return;
            }

            var endStart = list[list.length - 1].start;
            if (!endStart || !endStart.hour) {
                this.innerHTML("");
                return;
            }

            var endHour = (endStart.hour * 3600 + (endStart.minute != null ? endStart.minute : 0) * 60 + (endStart.second != null ? endStart.second : 0) + (list[list.length - 1].duration != null ? list[list.length - 1].duration : 0)) / 3600;
            var templ = '<svg id="__view_control_svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="' + ((endHour - this._start) * this._unit + (this._style.scaleLast ? 1 : 0)).toString() + '">\
<title>Day view</title><desc>Schedule for daily view.</desc><defs></defs><g id="__view_control_svg_gp" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" class="ali-container-graph ali-container-main"><g id="__view_control_svg_gp_bg" class="ali-container-bg">';
            var step = 0;
            for (var i = this._start; i < endHour; i++) {
                step = i - this._start;
                templ += '<g id="__view_control_svg_gp_bg_i' + i.toString() + '" transform="translate(0, ' + (step * this._unit).toString() + ')" class="ali-container-main"><rect width="' + (this._style.scaleWidth != null ? this._style.scaleWidth : 0).toString() + '" height="' + (this._style.scaleHeight != null ? this._style.scaleHeight : 0).toString() + '"></rect><text transform="translate(' + (this._style.labelX != null ? this._style.labelX : 0).toString() + ', ' + (this._style.labelY != null ? this._style.labelY : 0).toString() + ')"><tspan>' + i.toString() + ':00</tspan></text></g>';
            }

            templ += '<g id="__view_control_svg_gp_bg_last" transform="translate(0, ' + ((step + 1) * this._unit).toString() + ')" class="ali-container-main"><rect width="' + (this._style.scaleWidth != null ? this._style.scaleWidth : 0).toString() + '" height="' + (this._style.scaleHeight != null ? this._style.scaleHeight : 0).toString() + '"></rect></g></g><g id="__view_control_svg_gp_cnt" class="ali-container-main">';
            list.forEach((item, i, arr) => {
                var model: Graph.ColorStringContract = item.model as any;
                var startPixels = item.start.hour + (!!item.start.minute ? item.start.minute / 60 : 0);
                startPixels = (startPixels - this._start) * this._unit;
                var lenPixels = (item.duration != null ? item.duration : 0) / 3600;
                lenPixels *= this._unit;
                templ += '<g id="__view_control_svg_gp_cnt_i' + i.toString() + '" ' + (!!model.color ? ("fill=\"" + model.color + "\"") : "") + ' transform="translate(0, ' + startPixels.toString() + ')" class="ali-container-main">\
<rect ' + (!!model.bgColor ? ("fill=\"" + model.bgColor + "\"") : "") + ' width="100%" height="' + lenPixels.toString() + '"></rect><rect width="' + (this._style.itemLineWidth != null ? this._style.itemLineWidth : 0).toString() + '" height="' + lenPixels.toString() + '"></rect><text height="' + lenPixels.toString() + '" transform="translate(' + (this._style.itemTitleX != null ? this._style.itemTitleX : 0).toString() + ', ' + (this._style.itemTitleY != null ? this._style.itemTitleY : 0).toString() + ')"><tspan x="100%">' + model.value + '</tspan></text></g>';
            });

            templ += '</g></g></svg>';
            this.innerHTML(templ);
        }
    }

    /**
      * Stopwatch.
      */
    export class Stopwatch {

        private _time: Date[] = [];

        /**
          * The tracking identifier.
          */
        public trackingId: string;

        public notificationOptions: StopwatchNotificationOptionsContract;

        public recorded = new Collection.EventHandlers<Date>();

        public paused = new Collection.EventHandlers<Date>();

        public cleared = new Collection.EventHandlers<boolean>();

        public notifySucceeded = new Collection.EventHandlers<any>();

        public notifyFailed = new Collection.EventHandlers<any>();

        /**
          * Resets.
          * @param initDate  The optional initialized date; or true if start record now.
          */
        public reset(initDate?: Date | number | string | boolean): Date {
            var times = this._time.length;
            var isWorking = this._time.length % 2 > 0;
            var curDate = DateTime.parse(initDate as any);
            this._time = initDate != null ? [curDate] : [];
            if (times > 0) this.cleared.raise(isWorking);
            return curDate;
        }

        /**
          * Starts record.
          * @param resume  true if resumes; otherwise, false. Default is false.
          */
        public record(resume = false): Date {
            var curDate = new Date();
            if (resume) {
                if (this._time.length % 2 === 0) this._time.push(curDate);
            } else {
                var times = this._time.length;
                var isWorking = this._time.length % 2 > 0;
                this._time = [curDate];
                if (times > 0) this.cleared.raise(isWorking);
            }

            this.recorded.raise(curDate);
            return curDate;
        }

        /**
          * Stops record.
          */
        public stop(ignoreNotify: boolean | string = false): Date {
            if (this._time.length < 1) return null;
            if (this._time.length % 2 === 0) return this._time[this._time.length - 1];
            var curDate = new Date();
            this._time.push(curDate);
            if (!ignoreNotify || typeof ignoreNotify === "string") this.notify(typeof ignoreNotify === "string" ? ignoreNotify : null);
            this.paused.raise(curDate);
            return curDate;
        }

        /**
          * Gets timespan in milliseconds.
          * @param stop  true if stops record; otherwise, false. Default is false.
          */
        public span(stop = false, ignoreNotify: boolean | string = false): number {
            if (stop) this.stop(ignoreNotify);
            var span = 0;
            var rec = this._time;
            for (var i = 0; i < rec.length; i += 2) {
                span += DateTime.getSpan(rec[i], rec.length > i + 1 ? rec[i + 1] : new Date());
            }

            return span;
        }

        /**
          * Gets total timespan with rest in milliseconds.
          * @param stop  true if stops record; otherwise, false. Default is false.
          */
        public spanWithRest(stop = false, ignoreNotify: boolean | string = false): number {
            if (stop) this.stop(ignoreNotify);
            return this._time.length > 0 ? DateTime.getSpan(this._time[0], this._time.length % 2 === 0 ? this._time[this._time.length - 1] : new Date()) : 0;
        }

        /**
          * Gets timespan in milliseconds of latest record.
          * @param stop  true if stops record; otherwise, false. Default is false.
          */
        public latestSpan(stop = false, ignoreNotify: boolean | string = false): number {
            if (this._time.length < 1) return 0;
            if (stop) this.stop(ignoreNotify);
            return this._time.length % 2 === 0 ? DateTime.getSpan(this._time[this._time.length - 1], this._time[this._time.length - 2]) : DateTime.getSpan(new Date(), this._time[this._time.length - 1]);
        }

        public hasRecorded(): boolean {
            return this._time.length > 0;
        }

        public isRecording(): boolean {
            return this._time.length % 2 > 0;
        }

        public recordDate(index = 0): Date {
            return this._time.length > index * 2 ? this._time[index * 2] : null;
        }

        public latestRecordDate(): Date {
            if (this._time.length < 1) return null;
            return this._time.length % 2 === 0 ? this._time[this._time.length - 2] : this._time[this._time.length - 1];
        }

        public recordedTimes(): number {
            return this._time.length % 2 === 0 ? this._time.length / 2 : (this._time.length + 1) / 2;
        }

        public pausedTimes(): number {
            return this._time.length % 2 === 0 ? this._time.length / 2 : (this._time.length - 1) / 2;
        }

        public recordHistory(): IntervalContract[] {
            var list: IntervalContract[] = [];
            var rec = this._time;
            for (var i = 0; i < rec.length; i += 2) {
                list.push({
                    start: rec[i],
                    end: rec.length > i ? rec[i + 1] : null
                });
            }

            return list;
        }

        public info(message?: string) {
            var span = 0;
            var rec = this._time;
            var size = Elements.getSize() || { x: null, y: null };
            var isRecording = this._time.length % 2 > 0;
            var latest = this.latestRecordDate();
            var now = new Date();
            for (var i = 0; i < rec.length; i += 2) {
                span += DateTime.getSpan(rec[i], rec.length > i + 1 ? rec[i + 1] : now);
            }

            return {
                tracking: this.trackingId,
                span: this.span(),
                totalspan: this.spanWithRest(),
                begin: this._time.length > 0 ? this._time[0] : null,
                latest: latest,
                end: isRecording ? now : latest,
                recording: isRecording,
                url: window.location.href,
                width: size.x,
                height: size.y,
                message: message,
                channel: !!this.notificationOptions && !!this.notificationOptions.channel ? (typeof this.notificationOptions.channel === "function" ? (this.notificationOptions.channel as any)() : this.notificationOptions.channel.toString()) : null
            };
        }

        /**
          * Sends notification to record the timespan.
          */
        public notify<T>(message?: string): Web.ResponseTask<T> {
            var nOpt = this.notificationOptions;
            if (!nOpt) return;
            var webKey = nOpt.key != null && typeof nOpt.key === "boolean" ? (nOpt.key ? "timespan" : null) : nOpt.key as any;
            var parameters = this.info(message);
            AliHub.Diagnostics.info("CoreLibrary", "[0x01291601] Cost " + (!!parameters.span ? parameters.span.toString() : "0") + "ms " + (this.trackingId || "timespan") + (!!nOpt.channel ? (" (" + nOpt.channel + ")") : "") + ".");
            var task = nOpt.post ? AliHub.Web.resolveByPost<T>(nOpt.subject, webKey, { tracking: this.trackingId }, parameters) : AliHub.Web.resolve<T>(nOpt.subject, webKey, parameters);
            if (!!task) task.then((r) => {
                if (!!this.notifySucceeded) this.notifySucceeded.raise(r.result);
            }, (ei) => {
                if (!!this.notifyFailed) this.notifyFailed.raise(ei || {});
            });

            return task;
        }
    }

    /**
      * Creates a TimeControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param parent  The parent control.
      * @param options  The initializition options.
      */
    export function timeControl(idSuffix: string | HTMLElement, options?: TimeControlOptionsContract | boolean, parent?: VisualControl): TimeControl {
        return createControl(idSuffix, TimeControl, options, parent) as any;
    }

}
