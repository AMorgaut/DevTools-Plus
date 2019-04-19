
/**
 * @see https://chromedevtools.github.io/devtools-protocol/1-3/Network
 */

'use strict';

export default protocol = {
    events: [{
        name: 'webSocketClosed',
        description: 'Fired when WebSocket is closed.',
        parameters: [
            { name: 'requestId', description: 'Request identifier.', $ref: 'RequestId' },
            { name: 'timestamp', description: 'Timestamp.', $ref: 'MonotonicTime' }
        ]
    }, {
        name: 'webSocketCreated',
        description: 'Fired upon WebSocket creation.',
        parameters: [
            { name: 'requestId', description: 'Request identifier.', $ref: 'RequestId' },
            { name: 'url', description: 'WebSocket request URL.', type: 'string' },
            { name: 'initiator', description: 'Request initiator.', $ref: 'Initiator' }
        ]
    }, {
        name: 'webSocketFrameError',
        description: 'Fired when WebSocket frame error occurs.',
        parameters: [
            { name: 'requestId', description: 'Request identifier.', $ref: 'RequestId' },
            { name: 'timestamp', description: 'Timestamp.', $ref: 'MonotonicTime' },
            { name: 'errorMessage', description: 'WebSocket frame error message.', type: 'string' }
        ]
    },  {
        name: 'webSocketFrameReceived',
        description: 'Fired when WebSocket frame is receive.',
        parameters: [
            { name: 'requestId', description: 'Request identifier.', $ref: 'RequestId' },
            { name: 'timestamp', description: 'Timestamp.', $ref: 'MonotonicTime' },
            { name: 'response', description: 'WebSocket response data.', $ref: 'WebSocketFrame' }
        ]
    }, {
        name: 'webSocketFrameSent',
        description: 'Fired when WebSocket frame is sent.',
        parameters: [
            { name: 'requestId', description: 'Request identifier.', $ref: 'RequestId' },
            { name: 'timestamp', description: 'Timestamp.', $ref: 'MonotonicTime' },
            { name: 'response', description: 'WebSocket response data.', $ref: 'WebSocketFrame' }
        ]
    }, {
        name: 'webSocketHandshakeResponseReceived',
        description: 'Fired when WebSocket handshake response becomes available.',
        parameters: [
            { name: 'requestId', description: 'Request identifier.', $ref: 'RequestId' },
            { name: 'timestamp', description: 'Timestamp.', $ref: 'MonotonicTime' },
            { name: 'response', description: 'WebSocket response data.', $ref: 'WebSocketFrame' }
        ]
    },  {
        name: 'webSocketWillSendHandshakeRequest',
        description: 'Fired when WebSocket is about to initiate handshake.',
        parameters: [
            { name: 'requestId', description: 'Request identifier.', $ref: 'RequestId' },
            { name: 'timestamp', description: 'Timestamp.', $ref: 'MonotonicTime' },
            { name: 'wallTime', description: 'UTC Timestamp.', $ref: 'TimeSinceEpoch' },
            { name: 'request', description: 'WebSocket response data.', $ref: 'WebSocketFrame' }
        ]
    }]
};
