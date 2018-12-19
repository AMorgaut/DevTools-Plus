/**
 * Fired when HTTP response is available.
 * 
 * @see https://chromedevtools.github.io/devtools-protocol/1-2/Network#event-responseReceived
 */

'use strict';

export const protocol = {
    name: 'responseReceived',
    description: 'Fired when HTTP response is available.',
    parameters: [
        { name: 'requestId', description: 'Request identifier.', $ref: 'RequestId' },
        { name: 'frameId', description: 'Frame identifier.', $ref: 'Page.FrameId', experimental: true },
        { name: 'loaderId', description: 'Loader identifier.', $ref: 'LoaderId' },
        { name: 'timestamp', description: 'Timestamp.', $ref: 'Timestamp' },
        { name: 'type', description: 'Type of this resource.', $ref: 'Page.ResourceType', experimental: true },
        { name: 'response', description: 'Response data.', $ref: 'Response' }
    ]
};
