/*  --------------------
 *  Users and social network - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  users.ts
 *  Description  Users and social network library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

/// <reference path="common.ts" />
/// <reference path="media.ts" />

namespace AliHub.Users {

    /**
      * Phone number information.
      */
    export interface PhoneNumberContract {
        region: number;
        city?: string;
        no: string;
        ext?: string;
    }

    /**
      * Member profile contract.
      */
    export interface ProfileContract extends Common.UrlAvatarItemContract {

        /**
          * Birthday.
          */
        birthday?: Date;

        /**
          * Gender.
          */
        gender?: string;

        /**
          * Nickname.
          */
        nickname?: string;

        /**
          * City name.
          */
        city?: string;

        /**
          * Tags of the member.
          */
        tags?: string[];

        /**
          * Mobile phone number.
          */
        mobile?: string;

        /**
          * Email address.
          */
        email?: string;

        /**
          * Phone numbers.
          */
        phone?: Collection.KeyValuePairContract<string, string>[];

        /**
          * Additional original model.
          */
        model?: any;
    }

    /**
      * Comment information.
      */
    export interface CommentContract extends Common.IdentifiedContract {
        /**
          * User ID.
          */
        sender: string;

        /**
          * Message.
          */
        message: string;

        /**
          * Creation date time.
          */
        created: number;
    }

    /**
      * Principle information.
      */
    export interface PrincipleContract {
        profile: ProfileContract;
        permission: Collection.DictionaryContract<boolean>;
        contact: Collection.DictionaryContract<string>;
    }

    /**
      * On call notification.
      * Property "type" is "oncall".
      */
    export interface OncallNotificationItemContract extends Web.NotificationItemContract {

        /**
          * Member information.
          */
        memberInfo?: ProfileContract;

        /**
          * On call time.
          */
        oncallTime: Date;

        /**
          * Expires in seconds.
          */
        expiration: number;

        /**
          * Status - active, inactive.
          */
        status: string;

    }

    /**
      * Checks whether the current user has signed in.
      */
    export function logined(): boolean {
        return !!Inner.me.profile;
    }

    /**
      * Gets or sets principle for current user.
      * @param value  the principle to set as current.
      */
    export function principle(value?: PrincipleContract): PrincipleContract {
        if (arguments.length > 0) {
            if (value && value.profile) {
                Inner.me.profile = value.profile;
                Inner.me.permission = !!value.permission ? value.permission : {};
                Inner.me.contact = !!value.contact ? value.contact : {};
            } else {
                Inner.me.profile = null;
                Inner.me.permission = null;
                Inner.me.contact = null;
            }
        }

        return Inner.me;
    }

    /**
      * Gets or sets the profile for current user.
      * @param value  the user model to set as current user.
      */
    export function profile(value?: ProfileContract): ProfileContract {
        if (arguments.length > 0) {
            if (value) {
                Inner.me.profile = value;
                if (Inner.me.profile.id != null && typeof Inner.me.profile.id === "number") Inner.me.profile.id = (Inner.me.profile.id as any).toString();
            } else {
                Inner.me.profile = null;
            }
        }

        return Inner.me.profile;
    }

    /**
      * Checks given user information is about me.
      * @param model  the user model to test.
      */
    export function isMe(model: Common.IdentifiedContract | string): boolean {
        var me = Users.profile();
        return model && me && me.id && (typeof model === "string" ? model === me.id : model.id === me.id);
    }

    /**
      * Gets or sets the permission set for current user.
      * @param value  A dictionary to set permission.
      */
    export function permissionSet(value?: Collection.DictionaryContract<boolean>): Collection.DictionaryContract<boolean> {
        if (arguments.length > 0) {
            Inner.me.permission = value;
        }

        return Inner.me.permission;
    }

    /**
      * Checks if the current user has a permission.
      */
    export function hasPermission(key: string, ignoreLogin: boolean = false): boolean {
        if ((!ignoreLogin && !Inner.me.profile) || !Inner.me.permission) return false;
        var perm = Inner.me.permission[key];
        return perm === true || (typeof perm === "number" && perm === true);
    }

    /**
      * Sets the permission for current user.
      */
    export function configPermission(key: string, value: boolean): void {
        if (!Inner.me.permission) Inner.me.permission = {};
        Inner.me.permission[key] = value;
    }

    export function session<T>(key: string, value?: T): T {
        if (arguments.length > 1) {
            if (value == null) delete Inner.session[key];
            else Inner.session[key] = value;
        }

        return Inner.session[key];
    }

    export function fillSession<T>(obj: any, ignoreIfExist = false): string[] {
        var arr: string[] = [];
        for (var prop in obj) {
            if (!prop || typeof prop !== "string") continue;
            if (Inner.session[prop] && ignoreIfExist) continue;
            Inner.session[prop] = obj[prop];
            arr.push(prop);
        }

        return arr;
    }

    /**
      * Profile card.
      */
    export class ProfileCard extends Common.VisualControl {

        /**
          * Initializes a new instance of the ProfileCard class.
          * @param id  Element ID. The content will be filled into this element to replace original ones. 
          */
        constructor(id: Common.VisualControlElementContract) {
            super(id);
            this.addStyleRef("ali-part-user-profile-card");
            this.refresh();
        }

        public refresh() {
            this.innerHTML("");
            var me = Users.principle();
            if (!me || !me.profile) {
                return;
            }

            var profile = me.profile;
            this.appendElementByDef({
                styleRef: "ali-container-main",
                children: [
                    {
                        tagName: "img",
                        styleRef: "ali-part-user-card-avatar",
                        attr: {
                            src: profile.avatar,
                            alt: profile.nickname
                        }
                    },
                    {
                        tagName: "span",
                        attr: {
                            title: profile.nickname,
                            innerHTML: Common.Text.toHTML(profile.nickname)
                        }
                    }
                ]
            });
        }

    }

    class Inner {
        public static me: PrincipleContract = {
            profile: null,
            permission: null,
            contact: null
        };
        public static session: any = {};
    }

    try {
        if ((window as any)._principleInfo) Users.principle((window as any)._principleInfo);
        if ((window as any)._sessionInfo) Users.fillSession((window as any)._sessionInfo);
    } catch (ex) { }

}
