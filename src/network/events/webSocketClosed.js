/**
 * Fired when WebSocket is closed.
 * 
 * @see https://chromedevtools.github.io/devtools-protocol/1-3/Network#event-webSocketClosed
 */

'use strict';

export const protocol = {
    name: 'webSocketClosed',
    description: 'Fired when WebSocket is closed.',
    parameters: [
        { name: 'requestId', description: 'Request identifier.', $ref: 'RequestId' },
        { name: 'timestamp', description: 'Timestamp.', $ref: 'MonotonicTime' }
    ]
};
