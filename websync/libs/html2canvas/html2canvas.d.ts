/*  --------------------
 *  html2canvas declaration
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  html2canvas.ts
 *  Description  html2canvas declaration.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------
 *  html2canvas
 *  http://html2canvas.hertzen.com
 *  (c) 2015 Niklas von Hertzen. Released under MIT License.
 *  --------------------  */

/**
  * html2canvas module.
  */
declare module html2canvas {

    /**
      * The options for HTML to Canvas.
      */
    interface OptionsContract {

        /**
          * Raised on the canvas rendered is provided.
          */
        onrendered: (canvas: HTMLCanvasElement) => void;

        /**
          * Whether to allow cross-origin images to taint the canvas.
          * default value  false.
          */
        allowTaint?: boolean;

        /**
          * Canvas background color, if none is specified in DOM. Set undefined for transparent.
          * default value  #fff.
          */
        background?: string;

        /**
          * Define the height of the canvas in pixels. If null, renders with full height of the window.
          * default value  null.
          */
        height?: number;

        /**
          * Whether to render each letter separately. Necessary if letter-spacing is used.
          * default value  false.
          */
        letterRendering?: boolean;

        /**
          * Whether to log events in the console.
          * default value  false.
          */
        logging?: boolean;

        /**
          * Url to the proxy which is to be used for loading cross-origin images. If left empty, cross-origin images won't be loaded.
          * default value  undefined.
          */
        proxy?: string;

        /**
          * Whether to test each image if it taints the canvas before drawing them.
          * default value  true.
          */
        taintTest?: boolean;

        /**
          * Timeout for loading images, in milliseconds. Setting it to 0 will result in no timeout.
          * default value  0.
          */
        timeout?: number;

        /**
          * Define the width of the canvas in pixels. If null, renders with full width of the window.
          * default value  null.
          */
        width?: number;

        /**
          * Whether to attempt to load cross-origin images as CORS served, before reverting back to proxy.
          * default value  false.
          */
        useCORS?: boolean;
    }
}

/**
  * Transfers an HTML dom to canvas.
  */
declare function html2canvas(element: HTMLElement, options: html2canvas.OptionsContract);
