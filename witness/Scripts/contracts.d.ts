/*  --------------------
 *  Interfaces - Witness - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  contracts.d.ts
 *  Description  Interfaces library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

declare namespace AliHub.Diagnostics {

    /**
      * The identity hit state.
      */
    export interface IdentityHitStateContract extends HitStateContract {

        /**
          * The current element ID.
          */
        target: string;

        /**
          * The previous element ID.
          */
        previous: string;

        /**
          * The duration between previous and current hit. In milliseconds.
          */
        duration: number;
    }

    /**
      * The position hit state.
      */
    export interface PositionHitStateContract extends HitStateContract, Common.PlaneCoordinate {
    }

    /**
      * The element hit flow model.
      */
    export interface ElementHitFlowContract {

        /**
          * The ID of element pointed from in the relationship between 2 closed hits.
          */
        fromTarget: string;

        /**
          * The ID of element pointed to in the relationship between 2 closed hits.
          */
        toTarget: string;

        /**
          * Gets the count in the relationship.
          */
        count: number;

        /**
          * Average duration between these 2 hits.
          */
        averageDuration: number;
    }

    /**
      * The element hit analysis summary.
      */
    export interface ElementHitSummaryContract {

        /**
          * A list of hits summary information about the relationship of 2 closed hits.
          */
        summary: ElementHitFlowContract[];
    }

    /**
      * The element hit link.
      */
    export interface ElementHitLinkContract {

        /**
          * Gets the count in the flow.
          */
        count: number;

        /**
          * The client pointed from.
          */
        fromTarget: ElementHitAnalysisContract;

        /**
          * The client pointed to.
          */
        toTarget: ElementHitAnalysisContract;

        /**
          * Average duration between these 2 hits.
          */
        averageDuration: number;
    }

    /**
      * The element hit analysis client.
      */
    export interface ElementHitAnalysisContract {

        /**
          * Gets the target client.
          */
        target(): string;

        /**
          * Gets the DOM.
          */
        element(): Element;

        /**
          * Gets current position of the DOM in the page.
          */
        position(): Common.PlaneCoordinate;

        /**
          * Gets current size of the DOM in the page.
          */
        size(): Common.PlaneCoordinate;

        /**
          * Gets the hit count.
          */
        count(): number;

        /**
          * Lists next clients.
          */
        next(): ElementHitLinkContract[];

        /**
          * Lists previous clients.
          */
        previous(): ElementHitLinkContract[];

        /**
          * Gets its content text.
          */
        text(): string;
    }

}
