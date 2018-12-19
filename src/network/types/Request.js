/**
 * @see https://chromedevtools.github.io/devtools-protocol/1-3/Network#type-Request
 */

'use strict';

const { Headers } = require('./Headers');

export const protocol = {
    id: 'Request',
    description: 'HTTP request data.',
    type: 'object',
    properties: [
        { name: 'url', description: 'Request URL.', type: 'string' },
        { name: 'method', description: 'HTTP request method.', type: 'string' },
        { name: 'headers', description: 'HTTP request headers.', $ref: 'Headers' },
        { name: 'postData', description: 'HTTP POST request data.', type: 'string', optional: true },
        {
            name: 'mixedContentType',
            description: 'The mixed content status of the request, as defined in http://www.w3.org/TR/mixed-content/blockable, optionally-blockable, none',
            type: 'string',
            optional: true
        },
        {
            name: 'initialPriority',
            description: 'Priority of the resource request at the time request is sent.',
            $ref: 'ResourcePriority'
        }
    ]
};

export const Request = request => ({
    url: request.url,
    method: request.method,
    headers: Headers(request.headers)
});
