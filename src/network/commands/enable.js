/**
 * Enables network tracking, network events will now be delivered to the client.
 *
 * @see https://chromedevtools.github.io/devtools-protocol/1-2/Network#method-enable
 */

'use strict';

import http from 'http';
import https from 'https';

import uuidv4 from 'uuid/v4';

export const protocol = {
    name: 'enable',
    description: 'Enables network tracking, network events will now be delivered to the client.',
    parameters: [
        {
            name: "maxTotalBufferSize",
            optional: true,
            type: 'integer',
            description: 'Buffer size in bytes to use when preserving network payloads (XHRs, etc).',
            experimental: true
        },
        {
            name: "maxResourceBufferSize",
            optional: true,
            type: 'integer',
            description: 'Per-resource buffer size in bytes to use when preserving network payloads (XHRs, etc).',
            experimental: true
        }
    ]
};

export const requests = [];

// store a reference to the original request function
export const httpRequest = http.request;
export const httpsRequest = https.request;

function hookRequest(module, original, args) {
    const [ request ] = args;
    const uuid = uuidv4();
    const timestamp = Date.now();
    const cachedRequest = { uuid, request, timestamp };
    exports.requests.push(cachedRequest);
    console.log(request.host, request.body);
    return original.apply(module, arguments);
}

export const command = ({ maxTotalBufferSize, maxResourceBufferSize }) => {
    // override the function
    http.request = (...args) => hookRequest(http, exports.httpRequest, args);
    http2.request = (...args) => hookRequest(http2, exports.http2Request, args);
    https.request = (...args) => hookRequest(https, exports.httpsRequest, args);
};
