'use strict';

/**
 * GET /json/version
 * Browser version metadata
 *
 * Setting a "Chrome" value in "Browser" make chrome://inspect expose things as "open tab with url", "focus tab", "reload", "close"
 * Setting a "a higher Chrome version" value in "Browser" make chrome://inspect also expose "inspect fallback"
 *
 * @todo explore again the impact of the different changes
 * @see https://chromedevtools.github.io/devtools-protocol/#get-jsonversion
 */

import os from 'os';
import httpFetch from 'node-fetch';

import { version } from '../package.json';
import { BROWSER, USER_AGENT, WEBKIT_VERSION } from '../config';

export async function getVersion(target) {
    const response = await httpFetch(`${target}/json/version`);
    const json = await response.json();

    json.Browser = BROWSER;
    json['Protocol-Version'] = '1.3';
    json['V8-Version'] = process.versions.v8;
    json['User-Agent'] = `Mozilla/5.0 (${os.type()}; ${os.arch()} ${os.type()} ${os.release()}) DevTools-Plus/${version} ${USER_AGENT}`;
    json['WebKit-Version'] = WEBKIT_VERSION;

    return json;
}
