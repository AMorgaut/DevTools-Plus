'use strict';

/**
 * GET /json/close/{targetId}
 * Closes the target page identified by targetId.
 * For valid targets, the response is 200: "Target is closing". If the target is invalid, the response is 404: "No such target id: {targetId}"
 *
 * @todo explore possibilities to use this feature 
 * @see https://chromedevtools.github.io/devtools-protocol/#get-jsonclosetargetid
 */

export function getClose(...args) {
    console.log('CLOSE', ...args);
}
