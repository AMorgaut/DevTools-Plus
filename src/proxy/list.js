'use strict';

/**
 * GET /json or /json/list
 * A list of all available websocket targets.
 *
 * Today the only way found to expose the network panel is by settin type to "page" instead of node
 *
 * @todo explore again the best way to expose the network tab (through the "type"? the "devfronturl"? just the protocol? removing v8only?)
 * @todo send a feature request on the chromedevtools project
 * @see https://chromedevtools.github.io/devtools-protocol/#get-json-or-jsonlist
 */

import httpFetch from 'node-fetch';

import CONFIG from '../config';

export const fetch = fetchList;

async function fetchList() {
    const response = await httpFetch(`${CONFIG.TARGET}/json/list`);
    const json = await response.json();
    const [item] = json;
    return item;
}

/**
 * @type {Promise<string>}
 */
export const targetWebSocketDebuggerUrl = fetchList()
    .then(item => item.webSocketDebuggerUrl);

targetWebSocketDebuggerUrl.then(url => console.log('target url', url));

/**
 * @type {Promise<string>}
 */
export const proxyDebuggerUrl = targetWebSocketDebuggerUrl
    .then(url => url.replace(process.debugPort, CONFIG.PORT));

proxyDebuggerUrl.then(url => console.log('proxy url', url));

/**
 * @typedef RemoteProcess
 * @property {string} id
 * @property {string} title
 * @property {string} type
 * @property {string} description
 * @property {string} faviconUrl
 * @property {string} url
 * @property {string} devtoolsFrontendUrl
 * @property {string} webSocketDebuggerUrl
 */

/**
 * @returns {Promise<RemoteProcess[]>}
 */
export async function getList() {
    const item = await fetchList();
    const { webSocketDebuggerUrl } = item;

    let devtoolsFrontendUrl = item.devtoolsFrontendUrl;

    if (webSocketDebuggerUrl) {
        // const targetWebSocketDebuggerUrl = await targetWebSocketDebuggerUrl;
        // proxyDebuggerUrl = await proxyDebuggerUrl;
        devtoolsFrontendUrl = devtoolsFrontendUrl.replace(
            webSocketDebuggerUrl.replace('ws://', 'ws='),
            (await proxyDebuggerUrl).replace('ws://', 'ws=')
        );

        item.webSocketDebuggerUrl = await proxyDebuggerUrl;
    }

    item.description = `${item.description} ${CONFIG.DESCRIPTION}`;
    const [,,origin] = (await proxyDebuggerUrl).split('/');
    item.faviconUrl = CONFIG.FAVICON.startsWith('http') ? CONFIG.FAVICON : `http://${origin}/favicon`;
    item.type = 'page';
    if (devtoolsFrontendUrl) {
        item.devtoolsFrontendUrl = devtoolsFrontendUrl.replace('v8only=true&', '');
    }

    return [item];
}
