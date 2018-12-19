/**
 * Fired when HTTP request has finished loading.
 *
 * @see https://chromedevtools.github.io/devtools-protocol/1-2/Network#event-loadingFinished
 */
'use strict';

import { Request } from '../types/Request';

const name = 'loadingFinished';

export const protocol = {
    name,
    description: 'Fired when HTTP request has finished loading.',
    parameters: [
        { name: 'requestId', description: 'Request identifier.', $ref: 'RequestId' },
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
}
