/**
 * Fired when WebSocket message is sent.
 * 
 * @see https://chromedevtools.github.io/devtools-protocol/1-3/Network#event-webSocketFrameSent
 */

'use strict';

export const protocol = {
    name: 'webSocketFrameSent',
    description: 'Fired when WebSocket frame is sent.',
    parameters: [
        { name: 'requestId', description: 'Request identifier.', $ref: 'RequestId' },
        { name: 'timestamp', description: 'Timestamp.', $ref: 'MonotonicTime' },
        { name: 'response', description: 'WebSocket response data.', $ref: 'WebSocketFrame' }
    ]
};
