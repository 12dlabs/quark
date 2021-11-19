/*  --------------------
 *  Demo starter - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  index.ts
 *  Description  Demo starter.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

import mockdata = require("./data");
import bizcommon = require("../../src/scripts/common");

if (!false) {
    require("./data");
}

if (!bizcommon && !!console && !!console.error) console.error("Failed to load.");

/**
    * Sets up the configuration.
    */
function config() {

    // Set up mock data provider.
    mockdata.setup();
}

/**
  * Loads specific controller.
  */
export function load(id: string, controller: typeof BaseController) {
    config();
    if (!AliHub.Elements.getById(id)) return;
    var task = new controller();
    task.container = new AliHub.Common.VisualControl(id);
    task.process();
}

/**
  * The base controller.
  */
export class BaseController implements AliHub.Common.ProcessingTask {

    /**
      * The parent container.
      */
    public container: AliHub.Common.VisualControl;

    /**
      * Processes by the business logic.
      */
    public process() {
    }

}
