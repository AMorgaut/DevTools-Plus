'use strict';

/**
 * GET /json/activate/{targetId}
 * Brings a page into the foreground (activate a tab).
 * For valid targets, the response is 200: "Target activated". If the target is invalid, the response is 404: "No such target id: {targetId}"
 *
 * @todo explore possibilities to use this feature 
 * @see https://chromedevtools.github.io/devtools-protocol/#get-jsonnewurl
 */

export function getActivate(...args) {
    console.log('ACTIVATE', ...args);
}
