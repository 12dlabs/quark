/**
  * Sets up the page.
  */
export declare function setup(id: string, path: string): void;
export interface ClassNameContract {
    namespace: string;
    name: string;
    extends?: ClassNameContract;
}
export interface ControlDescriptionContract extends ClassNameContract {
    tagName?: string;
    intro?: string;
    options?: string;
    optionsSample?: any;
    urlsSample?: any;
    hideOptions?: boolean;
    hideMembers?: boolean;
    templates?: string;
}
export declare class ControlDescriptionExtension<T> implements AliHub.Common.BindingControlExtender<T> {
    /**
      * Extender name.
      */
    name: string;
    /**
      * Loads after done.
      * @param control  The target control.
      */
    load(control: AliHub.Common.BindingControl<T>): void;
}
export declare class CodeExtension<T> implements AliHub.Common.BindingControlExtender<T> {
    /**
      * Extender name.
      */
    name: string;
    /**
      * Loads after done.
      * @param control  The target control.
      */
    load(control: AliHub.Common.BindingControl<T>): void;
}
