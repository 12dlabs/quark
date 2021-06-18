export = AliCrmDemoAmd;
declare module AliCrmDemoAmd {
    interface SimpleControllerContract extends AliHub.Common.ProcessingTask {
        minSize?: string;
        maxSize?: string;
        renderHeader?(): void;
        get_menu?(): AliHub.Collection.ButtonInfoContract[];
        get_path?(): AliHub.Collection.ButtonInfoContract[];
        isFullPage?: boolean;
    }
    class Manager {
        private static _init;
        static demoContainerId: string;
        static trackerUri: string;
        static load<T extends SimpleControllerContract>(instance: T): void;
        private static _preparePage(renderHeader?);
        private static searchProvider(q);
    }
}
