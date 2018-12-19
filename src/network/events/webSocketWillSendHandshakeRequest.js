/**
 * Fired when WebSocket is about to initiate handshake.
 * 
 * @see https://chromedevtools.github.io/devtools-protocol/1-3/Network#event-webSocketWillSendHandshakeRequest
 */

'use strict';

export const protocol = {
    name: 'webSocketWillSendHandshakeRequest',
    description: 'Fired when WebSocket is about to initiate handshake.',
    parameters: [
        { name: 'requestId', description: 'Request identifier.', $ref: 'RequestId' },
        { name: 'timestamp', description: 'Timestamp.', $ref: 'MonotonicTime' },
        { name: 'wallTime', description: 'UTC Timestamp.', $ref: 'TimeSinceEpoch' },
        { name: 'request', description: 'WebSocket response data.', $ref: 'WebSocketFrame' }
    ]
};
