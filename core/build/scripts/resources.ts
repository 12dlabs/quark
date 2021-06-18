/*  --------------------
 *  Client resources - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  resources.ts
 *  Description  Client resources.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

/// <reference path="common.ts" />

namespace AliHub.Res {

    var _set = {
        templ: {},
        icons: {},
        locals: {},
        mkt: null,
        lp: {
            homepage: "Homepage",
            appCenter: "App center",
            page: "Page",
            pages: "Pages",
            first: "First",
            last: "Last",
            previous: "Previous",
            next: "Next",
            total: "Total",
            current: "Current",
            index: "Index",
            bindingError: "Cannot apply bindings",
            refresh: "refresh",
            reload: "reload",
            member: "Member",
            myMembers: "My members",
            recentDays: "Latest {0} days",
            planned: "Pending",
            processing: "Processing",
            completed: "Done",
            ladyName: "Ms. {0}",
            gentlemanName: "Mr. {0}",
            reminder: "Reminder",
            note: "Note",
            totalScore: "Total Score",
            cents: "{0} points",
            level: "Level",
            collapse: "Collapse",
            expand: "Expand",
            showAll: "Show all",
            followUp: "Follow up",
            noFollowUp: "None",
            memberTags: "Member tags",
            types: "Types",
            history: "History",
            trend: "Trend",
            distribution: "Distribution",
            newTasks: "{0} new tasks coming",
            bizTasks: "Tasks",
            summaryReports: "Reports",
            jobMgm: "Jobs Management",
            createTask: "Create task",
            seeMore: "See more",
            exit: "Exit",
            register: "Sign up",
            login: "Sign in",
            logout: "Sign out",
            search: "Search",
            filter: "Filter",
            typeKeywords: "Type keywords to search",
            requestHelp: "{0} is asking for help",
            cannotFind: "The {0} could not be found",
            newItem: "New",
            createItem: "Create",
            addItem: "Add",
            getItem: "Get",
            setItem: "Set",
            modifyItem: "Modify",
            updateItem: "Update",
            replaceItem: "Replace",
            overrideItem: "Override",
            fillItem: "Fill",
            removeItem: "Remove",
            deleteItem: "Delete",
            clearItem: "Clear",
            cleanUp: "Clean up",
            ok: "OK",
            save: "Save",
            cancel: "Cancel",
            turnBack: "Back",
            rollback: "Rollback",
            undo: "Undo",
            redo: "Redo",
            cut: "Cut",
            copy: "Copy",
            copySomething: "Copy {0}",
            paste: "Paste",
            clipboard: "Clip board",
            navigateTo: "Navigate to",
            settings: "Settings",
            options: "Options",
            profile: "Profile",
            draft: "Draft",
            open: "Open",
            close: "Close",
            turnOn: "Turn on",
            turnOff: "Turn off",
            layout: "Layout",
            add: "Add",
            insert: "Insert",
            edit: "Edit",
            remove: "Remove",
            delete: "Delete",
            clear: "Clear",
            title: "Title",
            content: "Content",
            text: "Text",
            richtext: "Richtext",
            properties: "Properties",
            wizard: "Wizard",
            slide: "Slide",
            photo: "Photo",
            image: "Image",
            images: "Images",
            audio: "Audio",
            video: "Vidio",
            movie: "Movie",
            movies: "Movies",
            document: "Document",
            documents: "Documents",
            link: "Link",
            links: "Links",
            hyperlink: "Hyperlink",
            website: "Website",
            sns: "Social network",
            favorate: "Favorate",
            game: "Game",
            games: "Games",
            file: "File",
            files: "Files",
            folder: "Folder",
            dir: "Directory",
            moveUp: "Move up",
            moveRight: "Move right",
            moveDown: "Move down",
            moveLeft: "Move left",
            module: "Module",
            component: "Component",
            chapter: "Chapter",
            section: "Section",
            update: "Update",
            upload: "Upload",
            download: "Download",
            switch: "Switch",
            switchCamera: "Switch camera",
            capturePhoto: "Capture",
            record: "Record",
            assign: "Assign",
            reassign: "Reassign",
            flag: "Flag",
            send: "Send",
            reply: "Reply",
            replyAll: "Reply all",
            forward: "Forward",
            cc: "Cc",
            bcc: "Bcc",
            phoneCall: "Call",
            contact: "Contact",
            contactMember: "Contact member",
            attach: "Attach",
            attachment: "Attachment",
            expired: "Expired",
            message: "Message",
            notification: "Notification",
            feedback: "Feedback",
            help: "Help",
            support: "Support",
            window: "Window",
            aries: "Aries",
            taurus: "Taurus",
            gemini: "Gemini",
            cancer: "Cancer",
            leo: "Leo",
            virgo: "Virgo",
            libra: "Libra",
            scorpio: "Scorpio",
            sagittarius: "Sagittarius",
            capricorn: "Capricorn",
            aquarius: "Aquarius",
            pisces: "Pisces",
            ophiuchus: "Ophiuchus",
            horoscope: "Horoscope",
            astrology: "Astrology",
            loading: "Loading",
            failToLoadData: "Failed to load data",
            surname: "Surname",
            givenname: "Given name",
            middleName: "Middle name",
            nickname: "nickname",
            city: "City",
            street: "Street",
            country: "Country",
            birthday: "Birthday",
            age: "Age",
            gender: "gender",
            male: "Male",
            female: "Female",
            other: "Other",
            fromSource: "From",
            toTarget: "To",
            millisecondsNum: "{0}ms",
            secondsNum: "{0}s",
            minutesNum: "{0}m",
            hoursNum: "{0}h",
            daysNum: "{0}d",
            weeksNum: "{0}w",
            timeLocaleSep: " ",
            today: "Today",
            tomorrowTime: "{0} tomorrow",
            tomorrow: "Tomorrow",
            secondsAgo: "Seconds ago",
            minuteAgo: "A minute ago",
            minutesTwoAgo: "2 minutes ago",
            minutesAgo: "{0}min ago",
            hourAgo: "An hour ago",
            hoursAgo: "{0}h ago",
            hoursTwoAgo: "2 hours ago",
            yesterdayTime: "{0} yesterday",
            yesterday: "Yesterday",
            daysTwoAgo: "2 days ago",
            daysAgo: "{0} days ago",
            lastWeekDay: "Last {0}",
            lastWeek: "Last week",
            future: "Future",
            date: "Date",
            day: "Day",
            week: "Week",
            weekday: "Weekday",
            weekend: "Weekend",
            week0c: "S",
            week1c: "M",
            week2c: "T",
            week3c: "W",
            week4c: "T",
            week5c: "F",
            week6c: "S",
            week0s: "Sun",
            week1s: "Mon",
            week2s: "Tue",
            week3s: "Wed",
            week4s: "Thu",
            week5s: "Fri",
            week6s: "Sat",
            week0f: "Sunday",
            week1f: "Monday",
            week2f: "Tueday",
            week3f: "Wednesday",
            week4f: "Thursday",
            week5f: "Friday",
            week6f: "Saturday",
            week0t: "{0} Sun",
            week1t: "{0} Mon",
            week2t: "{0} Tue",
            week3t: "{0} Wed",
            week4t: "{0} Thu",
            week5t: "{0} Fri",
            week6t: "{0} Sat",
            month: "Month",
            month0s: "Jan",
            month1s: "Feb",
            month2s: "Mar",
            month3s: "Apr",
            month4s: "May",
            month5s: "Jun",
            month6s: "Jul",
            month7s: "Aug",
            month8s: "Sep",
            month9s: "Oct",
            monthAs: "Nov",
            monthBs: "Dec",
            month0f: "January",
            month1f: "February",
            month2f: "March",
            month3f: "April",
            month4f: "May",
            month5f: "June",
            month6f: "July",
            month7f: "August",
            month8f: "September",
            month9f: "October",
            monthAf: "November",
            monthBf: "December",
            year: "Year",
            am: "AM",
            pm: "PM",
            empty: "Empty",
            commaSymbol: ", ",
            colonSymbol: ": ",
            ellipsisSymbol: "...",
            semicolonSymbol: "; ",
            enumCommaSymbol: ", ",
            periodSymbol: ". "
        }
    }

    export function regLang(template: AliHub.Res.Templates) {
        if (!template) return null;
        template.strings.reg("ww", _set.lp);
        template.strings.reg("en", _set.lp);
        return template;
    }

    export interface IconFontContract {

        line: string;

        block: string;

    }

    /**
      * Language pack information.
      */
    export interface LanguagePackContract {
        lang: string;
        strings: any;
        template(templ: AliHub.Res.Templates): AliHub.Res.Templates;
    }

    export class IconFontCollection {

        private _icon: any = {};

        private _subject: string;

        public constructor(subject: string) {
            this._subject = subject;
        }

        public subject(): string {
            return this._subject;
        }

        public item(key: string, value?: IconFontContract): IconFontContract {
            if (!key || key.toString() == "") return null;
            key = key.toString();
            if (arguments.length > 1) this._icon[key] = value;
            return this._icon[key];
        }

        public line(key: string, defaultValue: string = null): string {
            if (!key || key.toString() == "") return null;
            key = key.toString();
            var icon = this.item(key);
            return !!icon && !!icon.line ? icon.line : defaultValue;
        }

        public block(key: string, defaultValue: string = null): string {
            if (!key || key.toString() == "") return null;
            key = key.toString();
            var icon = this.item(key);
            return !!icon && !!icon.block ? icon.block : defaultValue;
        }

    }

    /**
      * Template set.
      */
    export class Templates {

        private _html: any = {};

        private _settings: any = {};

        private _svg: any = {};

        private _subject: string;

        public data = {};

        /**
          * Initializes a new instance of the Templates class.
          * @param subject  The subject name.
          */
        public constructor(subject: string) {
            this._subject = subject;
        }

        /**
          * Gets subject name.
          */
        public subject(): string {
            return this._subject;
        }

        /**
          * Strings templates.
          */
        public strings = new Strings();

        /**
          * Gets or sets settings.
          * @param key  The template key.
          * @param value  The optional value to set.
          */
        public settings<T>(key: string, value?: T): T {
            if (!key) return undefined;
            if (arguments.length > 1) {
                this._settings[key] = value;
            }

            return this._settings[key];
        }

        /**
          * Gets or sets a property of the specific settings.
          * @param key  The template key.
          * @param prop  The property name.
          * @param value  The optional value to set.
          */
        public settingsProp<T>(key: string, prop: string, value?: T): T {
            if (!key || !prop) return undefined;
            var item = this._settings[key];
            if (arguments.length > 2) {
                if (item == null) {
                    item = {};
                    this._settings[key] = item;
                }

                item[prop] = value;
            }

            return item != null ? item[prop] : undefined;
        }

        /**
          * Gets or sets HTML template.
          * @param key  The template key.
          * @param value  The optional value to set.
          */
        public html(key: string, value?: string): string {
            if (!key || key.toString() == "") return null;
            key = key.toString();
            if (arguments.length > 1) {
                this._html[key] = value;
                Diagnostics.debugInfo("Add HTML template " + key + " for " + this.subject() + ".");
            }

            return this._html[key];
        }

        /**
          * Gets or sets SVG template.
          * @param key  The template key.
          * @param value  The optional value to set.
          */
        public svg(key: string, value?: string): string {
            if (!key || key.toString() == "") return null;
            key = key.toString();
            if (arguments.length > 1) {
                this._svg[key] = value;
                Diagnostics.debugInfo("Add SVG template " + key + " for " + this.subject() + ".");
            }

            return this._svg[key];
        }

        /**
          * Gets SVG source image object.
          * @param key  The template key.
          * @param styleRef  The optional style references.
          */
        public svgImage(key: string, styleRef?: string | string[]): Graph.SvgImageContract {
            var source = this.svg(key);
            return source ? { type: "svg", source: source, styleRef: styleRef } : null;
        }

        /**
          * Gets SVG element from templates.
          * @param key  The template key.
          * @param styleRef  The optional style references.
          */
        public svgElement(key: string, styleRef?: string | string[]): SVGElement {
            var src = this.svgImage(key);
            return Graph.imageElement(src) as any;
        }

        /**
          * Gets local string.
          * @param key  The template key.
          * @param lang  The opitonal market code string for a sepecific one.
          */
        public localString(key: string, lang?: string): string {
            return arguments.length > 1 ? this.strings.field(key, lang) : this.strings.field(key);
        }

        /**
          * Gets local string.
          * @param key  The template key.
          * @param lang  The opitonal market code string for a sepecific one.
          */
        public localStringInHTML(key: string, lang?: string): string {
            return arguments.length > 1 ? this.strings.fieldInHTML(key, lang) : this.strings.fieldInHTML(key);
        }

    }

    /**
      * String set.
      */
    export class Strings {

        private _strings = { ww: {} };

        /**
          * The market code for default language using.
          */
        public defaultLang: string = null;

        /**
          * Registers a language pack.
          * @param lang  The market code.
          * @param value  The language pack.
          * @param override  true if override original one if existed; otherwise, false.
          */
        public reg(lang: string, value: Collection.DictionaryContract<string> | Object, override = false) {
            if (!lang || lang == "") return;
            var key = lang.toString().toLowerCase();
            if (override || !value || !this._strings[key]) {
                this._strings[key] = value;
            } else {
                var obj = this._strings[key];
                for (var prop in value) {
                    obj[prop] = value[prop];
                }
            }
        }

        /**
          * Gets or sets the string for a specific market.
          * @param lang  The market code.
          * @param key  The template key.
          * @param value  The opitonal value to set.
          */
        public specificField(lang: string, key: string, value?: string): string {
            if (arguments.length > 2) {
                var strings = this._lang(lang, true);
                strings[key] = value;
            }

            return this._lang(lang)[key];
        }

        /**
          * Gets or sets local string.
          * @param key  The template key.
          * @param value  The opitonal value to set.
          */
        public localField(key: string, value?: string): string {
            return arguments.length > 1 ? this.specificField(market(), key, value) : this.specificField(market(), key);
        }

        /**
          * Gets or sets global string.
          * @param key  The template key.
          * @param value  The opitonal value to set.
          */
        public globalField(key: string, value?: string): string {
            return arguments.length > 1 ? this.specificField("ww", key, value) : this.specificField("ww", key);
        }

        /**
          * Copies a set of strings to an object as properties.
          * @param obj  The target object to copy to.
          * @param keys  The template keys.
          */
        public copyFields(obj: Object, keys?: string[]): any {
            if (!obj) obj = {};
            if (keys == null) {
                var lp = this._lang();
                for (var key in lp) {
                    if (!key || typeof key !== "string") continue;
                    obj[key] = lp[key];
                }

                return obj;
            }

            keys.forEach((key, i, arr) => {
                obj[key] = this.localField(key);
            });
            return obj;
        }

        public copyFieldToElement(key: string, element: string | HTMLElement | string[] | HTMLElement[]): string {
            if (!key) return null;
            var str = this.field(key);
            if (!element) return str;
            if (!str) str = "";
            else str = Common.Text.toHTML(str);
            Collection.toArray<string | HTMLElement>(element).forEach((ele, i, arr) => {
                var dom = Elements.getById(ele);
                if (dom) dom.innerHTML = str;
            });

            return str;
        }

        public copyFieldToInputElement(key: string, element: string | HTMLInputElement | HTMLTextAreaElement | string[] | HTMLInputElement[] | HTMLTextAreaElement[]): string {
            if (!key) return null;
            var str = this.field(key);
            if (!element) return str;
            if (!str) str = "";
            Collection.toArray<string | HTMLElement>(element).forEach((ele, i, arr) => {
                var dom = Elements.getById<HTMLInputElement>(ele);
                if (!!dom) dom.value = str;
            });

            return str;
        }

        /**
          * Gets local string.
          * @param key  The template key.
          * @param lang  The opitonal market code string for a sepecific one.
          */
        public field(key: string, lang?: string) {
            var langCode = !lang || lang == "" ? market() : lang;
            if (!langCode || langCode == "") langCode = "ww";
            var field = this.specificField(langCode, key);
            if (!!field || typeof field !== "undefined") return field;
            while (langCode.lastIndexOf("-") > 1) {
                langCode = langCode.substring(0, langCode.lastIndexOf("-"));
                field = this.specificField(langCode, key);
                if (!!field || typeof field !== "undefined") return field;
            }

            field = this.globalField(key);
            if (!!field || typeof field !== "undefined" || !this.defaultLang) return field;
            return this.specificField(this.defaultLang, key);
        }

        /**
          * Gets local HTML string.
          * @param key  The template key.
          * @param lang  The opitonal market code string for a sepecific one.
          */
        public fieldInHTML(key: string, lang?: string) {
            return Common.Text.toHTML(arguments.length > 1 ? this.field(key, lang) : this.field(key), true);
        }

        public toJSON() {
            return Common.Text.serialize(this.copyFields({ type: "LocalStrings" }));
        }

        private _lang(lang?: string, init?: boolean): Collection.DictionaryContract<string> {
            if (lang == null) lang = market();
            if (!lang || lang == "") {
                return {};
            }

            lang = lang.toString().toLowerCase();
            if (!this._strings[lang]) {
                if (init == true) {
                    this._strings[lang] = {};
                    return this._strings[lang];
                }

                return {};
            }

            return this._strings[lang];
        }

    }

    export function factory(extender?: Common.Action1<Object>) {
        return () => {
            var res = {
                templates: (subject: string, createIfExist: boolean = false): Templates => {
                    if (typeof createIfExist !== "undefined" && createIfExist !== void 0) return templates(subject, createIfExist);
                    else return templates(subject);
                },
                iconfonts: (subject: string, value?: IconFontCollection | boolean): IconFontCollection => {
                    if (typeof value !== "undefined" && value !== void 0) return iconfonts(subject, value);
                    else return iconfonts(subject);
                },
                market: (lang?: string | boolean): string => {
                    if (typeof lang !== "undefined" && lang !== void 0) return market(lang);
                    else return market();
                }
            };
            if (!!extender) extender(res);
            return res;
        }
    }

    /**
      * Gets a template set.
      * @param subject  The subject name.
      * @param createIfExist  A flag or handler for creation if the template set is empty currently.
      */
    export function templates(subject: string, createIfExist: boolean | Common.Action1<Templates> = false): Templates {
        if (!subject) return undefined;
        subject = subject.toString();
        if (subject === "") return undefined;
        var templ: Templates = _set.templ[subject];
        if (!templ && createIfExist) {
            _set.templ[subject] = new Templates(subject);
            if (typeof createIfExist === "function") createIfExist(_set.templ[subject]);
        }

        return _set.templ[subject];
    }

    /**
      * Gets or sets settings.
      * @param subject  The subject name.
      * @param key  The template key.
      * @param value  The optional value to set.
      */
    export function settings<T>(subject: string, key: string, value?: T): T {
        var templ: Templates = templates(subject, true);
        if (!templ) return undefined;
        if (arguments.length > 2) {
            templ.settings(key, value);
        }

        return templ.settings<T>(key);
    }

    /**
      * Gets or sets settings.
      * @param subject  The subject name.
      * @param key  The template key.
      * @param value  The optional value to set.
      */
    export function settingsProp<T>(subject: string, key: string, prop: string, value?: T): T {
        var templ: Templates = templates(subject, true);
        if (!templ) return undefined;
        if (arguments.length > 3) {
            templ.settingsProp(key, prop, value);
        }

        return templ.settingsProp<T>(key, prop);
    }

    /**
      * Gets or sets HTML template.
      * @param subject  The subject name.
      * @param key  The template key.
      * @param value  The optional value to set.
      */
    export function html(subject: string, key: string, value?: string): string {
        var templ: Templates = templates(subject, true);
        if (arguments.length > 2) {
            templ.html(key, value);
        }

        return templ.html(key);
    }

    /**
      * Gets or sets SVG template.
      * @param subject  The subject name.
      * @param key  The template key.
      * @param value  The optional value to set.
      */
    export function svg(subject: string, key: string, value?: string): string {
        var templ: Templates = templates(subject, true);
        if (arguments.length > 2) {
            templ.svg(key, value);
        }

        return templ.svg(key);
    }

    /**
      * Gets SVG source image object.
      * @param subject  The subject name.
      * @param key  The template key.
      * @param styleRef  The optional style references.
      */
    export function svgImage(subject: string, key: string, styleRef?: string | string[]): Graph.SvgImageContract {
        var source = Res.svg(subject, key);
        return source ? { type: "svg", source: source, styleRef: styleRef } : null;
    }

    /**
      * Gets SVG element from templates.
      * @param subject  The subject name.
      * @param key  The template key.
      * @param styleRef  The optional style references.
      */
    export function svgElement(subject: string, key: string, styleRef?: string | string[]): SVGElement {
        var src = Res.svgImage(subject, key, styleRef);
        return Graph.imageElement(src) as any;
    }

    export function iconfonts(subject: string, value?: IconFontCollection | boolean): IconFontCollection {
        if (arguments.length > 1 && typeof value !== "boolean") {
            _set.icons[subject] = value;
        }

        var col = _set.icons[subject];
        if (!col) {
            col = new IconFontCollection(subject);
            if (value != null && value === true) _set.icons[subject] = col;
        }

        return col;
    }

    /**
      * Gets local string.
      * @param subject  The subject name.
      * @param key  The template key.
      * @param lang  The opitonal market code string for a sepecific one.
      */
    export function strings(subject: string, key: string, lang?: string): string {
        var templ: Templates = templates(subject, true);
        return arguments.length > 2 ? templ.strings.field(key, lang) : templ.strings.field(key);
    }

    /**
      * Gets or sets current market code.
      * @param lang  The optional market code to set.
      */
    export function market(lang?: string | boolean): string {
        if (arguments.length > 0 && !!lang) {
            if (typeof lang === "string") {
                _set.mkt = lang;
            } else if (typeof lang === "boolean") {
                if (lang == true) {
                    var queryMkt = Common.Text.trim(Elements.getQuery("mkt"));
                    if (!!queryMkt) {
                        _set.mkt = queryMkt;
                    } else if (!!document.documentElement.lang) {
                        _set.mkt = document.documentElement.lang;
                    } else if (!!navigator.language) {
                        _set.mkt = navigator.language;
                    } else if (!!(navigator as any).userLanguage) {
                        _set.mkt = (navigator as any).userLanguage;
                    } else if (!!(navigator as any).browserLanguage) {
                        _set.mkt = (navigator as any).browserLanguage;
                    } else if (!!(navigator as any).systemLanguage) {
                        _set.mkt = (navigator as any).systemLanguage;
                    }
                } else {
                    _set.mkt = "ww";
                }
            }
            if (!!_set.mkt) _set.mkt = _set.mkt.toString().toLowerCase();
        } else {
            if (_set.mkt == null) market(true);
        }

        return _set.mkt;
    }

    export function builtIn() {
        return templates("AliHub.Quark", (templ) => {
            AliHub.Res.regLang(templ);
        });
    }

}
