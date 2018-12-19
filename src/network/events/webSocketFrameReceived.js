/**
 * Fired when WebSocket message is received.
 * 
 * @see https://chromedevtools.github.io/devtools-protocol/1-3/Network#event-webSocketFrameReceived
 */

'use strict';

export const protocol = {
    name: 'webSocketFrameReceived',
    description: 'Fired when WebSocket frame is receive.',
    parameters: [
        { name: 'requestId', description: 'Request identifier.', $ref: 'RequestId' },
        { name: 'timestamp', description: 'Timestamp.', $ref: 'MonotonicTime' },
        { name: 'response', description: 'WebSocket response data.', $ref: 'WebSocketFrame' }
    ]
};
