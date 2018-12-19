/**
 * Disables network tracking, prevents network events from being sent to the client.
 *
 * @see https://chromedevtools.github.io/devtools-protocol/1-2/Network#method-disable
 */

'use strict';

import http from 'http';
import https from 'https';

import { httpRequest, http2Request, httpsRequest } from './enable';

export const protocol = {
    name: 'disable',
    description: 'Disables network tracking, prevents network events from being sent to the client.'
};

export const command = () => {
    http.request = httpRequest;
    https.request = httpsRequest;
};
