/**
 * Fired if request ended up loading from cache.
 * 
 * @see https://chromedevtools.github.io/devtools-protocol/1-2/Network#event-requestServedFromCache
 */
'use strict';

export const protocol = {
    name: 'requestServedFromCache',
    description: 'Fired if request ended up loading from cache.',
    parameters: [
        { name: 'requestId', description: 'Request identifier.', $ref: 'RequestId' }
    ]
};
