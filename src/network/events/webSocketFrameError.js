/**
 * Fired when WebSocket message error occurs.
 * 
 * @see https://chromedevtools.github.io/devtools-protocol/1-3/Network#event-webSocketFrameError
 */

'use strict';

export const protocol = {
    name: 'webSocketFrameError',
    description: 'Fired when WebSocket frame error occurs.',
    parameters: [
        { name: 'requestId', description: 'Request identifier.', $ref: 'RequestId' },
        { name: 'timestamp', description: 'Timestamp.', $ref: 'MonotonicTime' },
        { name: 'errorMessage', description: 'WebSocket frame error message.', type: 'string' }
    ]
};
