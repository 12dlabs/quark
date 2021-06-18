declare var Flipper: AliFlipper.Manager;
declare var modulex: AliModules.KISSY6;
declare var KISSY: AliModules.KISSY6;
declare var JSTracker: AliModules.JSTracker;

declare namespace AliModules {

    interface KISSY6 {
        version: string;
        Config: any;
        Env: any;
        Loader: any;
        add(id?, factory?, cfg?);
        config(name?, value?): any;
        getModule(id?): any;
        getPackage(name?): any;
        getScript(uri?, success?, charset?): any;
        init(cfg?);
        noConflict();
        require(id: string);
        undef(id: string);
        use(modIds?, success?, error?);
        [property: string]: any;
    }

    interface JSTracker {
        config(name: string, value: any);
        debug(...param);
        warn(...param);
        error(...param);
        info(...param);
        log(...param);
        send(n);
        [property: string]: any;
    }
}

declare namespace AliFlipper {

    interface Manager {
        register(dependencies: string[], handler: (...dependencies) => InfoContract);
        register(info: InfoContract);
        [property: string]: any;
    }

    interface InfoContract {
        fetch?(): any;
        ready?(): any;
        destroy?(): any;
        [property: string]: any;
    }
}
