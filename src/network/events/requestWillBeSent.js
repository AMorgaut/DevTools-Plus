/**
 * Fired when page is about to send HTTP request.
 * 
 * @see https://chromedevtools.github.io/devtools-protocol/1-2/Network#event-requestWillBeSent
 */
'use strict';

import { Request } from '../types/Request';

const name = 'requestWillBeSent';

export const protocol = {
    name,
    description: 'Fired when page is about to send HTTP request.',
    parameters: [
        { name: 'requestId', description: 'Request identifier.', $ref: 'RequestId' },
        { name: 'frameId', description: 'Frame identifier.', $ref: 'Page.FrameId', experimental: true },
        { name: 'loaderId', description: 'Loader identifier.', $ref: 'LoaderId' },
        { name: 'documentURL', description: 'URL of the document this request is loaded for.', type: 'string' },
        { name: 'request', description: 'Request data.', $ref: 'Request' },
        { name: 'timestamp', description: 'Timestamp.', $ref: 'Timestamp' },
        { name: 'wallTime', description: 'UTC Timestamp.', $ref: 'Timestamp', experimental: true },
        { name: 'initiator', description: 'Request initiator.', $ref: 'Initiator' },
        { name: 'redirectResponse', description: 'Redirect response data.', $ref: 'Response' },
        { name: 'type', description: 'Type of this resource.', $ref: 'Page.ResourceType', experimental: true }
    ]
};

export function send(cachedRequest) {
    const { requestId, request, timestamp } = cachedRequest;
    server.sendOverProtocol(name, {
        requestId,
        timestamp,
        request: Request(request)
    })
};
