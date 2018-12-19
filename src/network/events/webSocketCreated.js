/**
 * Fired upon WebSocket creation.
 * 
 * @see https://chromedevtools.github.io/devtools-protocol/1-3/Network#event-webSocketCreated
 */

'use strict';

 export const protocol = {
    name: 'webSocketCreated',
    description: 'Fired upon WebSocket creation.',
    parameters: [
        { name: 'requestId', description: 'Request identifier.', $ref: 'RequestId' },
        { name: 'url', description: 'WebSocket request URL.', type: 'string' },
        { name: 'initiator', description: 'Request initiator.', $ref: 'Initiator' }
    ]
};
