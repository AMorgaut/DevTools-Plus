'use strict';

/**
 * GET /json/new?{url}
 * Opens a new tab. Responds with the websocket target data for the new tab.
 *
 * @todo explore possibilities to use this feature: new node process? 
 * @todo explore what is the best response to return: on success, on failure 
 * @see https://chromedevtools.github.io/devtools-protocol/#get-jsonnewurl
 */

export function getNew(...args) {
    console.log('NEW', ...args);
}
