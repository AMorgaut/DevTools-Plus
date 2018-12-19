/**
 * Fired when data chunk was received over the network.
 * 
 * @see https://chromedevtools.github.io/devtools-protocol/1-2/Network#event-dataReceived
 */

'use strict';

export const protocol = {
    name: 'dataReceived',
    description: 'Fired when data chunk was received over the network.',
    parameters: [
        { name: 'requestId', description: 'Request identifier.', $ref: 'RequestId' },
        { name: 'timestamp', description: 'Timestamp.', $ref: 'Timestamp' },
        { name: 'dataLength', description: 'Data chunk length.', type: 'number' },
        { name: 'encodedDataLength', description: 'Actual bytes received (might be less than dataLength for compressed encodings).', type: 'number' }
    ]
};
