/**
 * Fired when HTTP request has failed to load.
 * 
 * @see https://chromedevtools.github.io/devtools-protocol/1-2/Network#event-loadingFailed  
 */
'use strict';

export const protocol = {
    name: 'loadingFailed',
    description: 'Fired when HTTP request has failed to load.',
    parameters: [
        { name: 'requestId', description: 'Request identifier.', $ref: 'RequestId' },
        { name: 'timestamp', description: 'Timestamp.', $ref: 'Timestamp' },
        { name: 'type', description: 'Resource type.', $ref: 'Page.ResourceType' },
        { name: 'errorText', description: 'User friendly error message.', type: 'string' },
        { name: 'canceled', description: 'True if loading was canceled.', type: 'boolean', optional: true },
        { name: 'blockedReason', description: 'The reason why loading was blocked, if any.', $ref: 'BlockedReason', optional: true, experimental: true }
    ]
};
