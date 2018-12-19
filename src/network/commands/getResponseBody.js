/**
 * Returns content served for the given request.
 * 
 * @see https://chromedevtools.github.io/devtools-protocol/1-2/Network#method-getResponseBody
 */
'use strict';

export const protocol = {
    name: 'getResponseBody',
    description: 'Returns content served for the given request.',
    parameters: [
        {
            name: 'requestId',
            $ref: 'RequestId',
            description: 'Identifier of the network request to get content for.'
        }
    ],
    returns: [
        {
            name: 'body',
            description: 'Response body.',
            type: 'string'
        },
        {
            name: 'base64Encoded',
            description: 'True, if content was sent as base64.',
            type: 'boolean'
        }
    ],
};
