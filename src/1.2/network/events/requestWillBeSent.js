/**
 * Fired when page is about to send HTTP request.
 *
 * @see https://chromedevtools.github.io/devtools-protocol/1-2/Network#event-requestWillBeSent
 */
'use strict';

import { Request } from '../types/Request';

/**
 *
 * @param cachedRequest
 */
export function send(cachedRequest) {
    const { requestId, request, timestamp } = cachedRequest;
    server.sendOverProtocol('Network.requestWillBeSent', {
        requestId,
        timestamp,
        request: Request(request)
    })
};
