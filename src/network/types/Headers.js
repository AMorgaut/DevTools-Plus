/**
 * Request / response headers as keys / values of JSON object.
 *
 * @see https://chromedevtools.github.io/devtools-protocol/1-3/Network#type-Headers
 */

'use strict';

export const protocol = {
    id: 'Headers',
    description: 'Request / response headers as keys / values of JSON object.',
    type: 'object',
};

export const Headers = headers => Object.assign({}, headers);
