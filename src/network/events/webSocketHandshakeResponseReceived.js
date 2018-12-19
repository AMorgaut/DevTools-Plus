/**
 * @see https://chromedevtools.github.io/devtools-protocol/1-3/Network#event-webSocketHandshakeResponseReceived
 */

'use strict';

export const protocol = {
    name: 'webSocketHandshakeResponseReceived',
    description: 'Fired when WebSocket handshake response becomes available.',
    parameters: [
        { name: 'requestId', description: 'Request identifier.', $ref: 'RequestId' },
        { name: 'timestamp', description: 'Timestamp.', $ref: 'MonotonicTime' },
        { name: 'response', description: 'WebSocket response data.', $ref: 'WebSocketFrame' }
    ]
};
