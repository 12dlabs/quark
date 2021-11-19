/**
  * Loads specific controller.
  */
export declare function load(id: string, controller: typeof BaseController): void;
/**
  * The base controller.
  */
export declare class BaseController implements AliHub.Common.ProcessingTask {
    /**
      * The parent container.
      */
    container: AliHub.Common.VisualControl;
    /**
      * Processes by the business logic.
      */
    process(): void;
}
