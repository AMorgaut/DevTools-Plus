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

import { PORT, TARGET, FAVICON } from '../config';
import httpFetch from 'node-fetch';

import { DESCRIPTION } from '../config';

export const fetch = fetchList;

async function fetchList() {
    const response = await httpFetch(`${TARGET}/json/list`);
    const json = await response.json();
    const [item] = json;
    return item;
}

export let targetWebSocketDebuggerUrl = fetchList()
    .then(item => item.webSocketDebuggerUrl);

export let proxyDebuggerUrl = targetWebSocketDebuggerUrl
    .then(url => url.replace(process.debugPort, PORT));

export async function getList() {
    const item = await fetchList();
    const { webSocketDebuggerUrl } = item;

    let proxyDebuggerUrl;
    let devtoolsFrontendUrl = item.devtoolsFrontendUrl;

    if (webSocketDebuggerUrl) {
        const targetWebSocketDebuggerUrl = await targetWebSocketDebuggerUrl;
        proxyDebuggerUrl = await proxyDebuggerUrl;
        devtoolsFrontendUrl = devtoolsFrontendUrl.replace(
            webSocketDebuggerUrl.replace('ws://', 'ws='),
            proxyDebuggerUrl.replace('ws://', 'ws=')
        );

        item.webSocketDebuggerUrl = proxyDebuggerUrl;
    }

    item.description = `${item.description} ${DESCRIPTION}`;
    item.faviconUrl = FAVICON;
    item.type = 'page';
    if (devtoolsFrontendUrl) {
        item.devtoolsFrontendUrl = devtoolsFrontendUrl.replace('v8only=true&', '');
    }

    return [item];
}
