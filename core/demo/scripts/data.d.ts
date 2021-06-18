export = Main;
declare module Main {
    class Constant {
        static pageMenu: AliHub.Collection.ButtonInfoContract[];
        static sampleProfile: {
            id: number;
            name: string;
            nickname: string;
            avatar: string;
            gender: string;
            city: string;
            birthday: Date;
            mobile: string;
            tags: string[];
        };
    }
}
