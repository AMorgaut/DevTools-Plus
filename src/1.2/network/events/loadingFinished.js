/**
 * Fired when HTTP request has finished loading.
 *
 * @see https://chromedevtools.github.io/devtools-protocol/1-2/Network#event-loadingFinished
 */
'use strict';

import { Request } from '../types/Request';


export function send(cachedRequest) {
    const { requestId, request, timestamp } = cachedRequest;
    server.sendOverProtocol('Network.loadingFinished', {
        requestId,
        timestamp,
        request: Request(request)
    })
}
