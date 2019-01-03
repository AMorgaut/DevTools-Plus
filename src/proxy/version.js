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

import { version } from '../../package.json';
import { BROWSER, USER_AGENT, WEBKIT_VERSION } from '../config';
import { proxyDebuggerUrl } from "./list";

export async function getVersion(target) {
    const response = await httpFetch(`${target}/json/version`);

    const ua = `Mozilla/5.0 (${os.type()}; ${os.arch()} ${os.type()} ${os.release()}) DevTools-Plus/${version} ${USER_AGENT}`;
    // const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3601.0 Safari/537.36';

    return Object.assign(await response.json(), {
        Browser: BROWSER,
        'Protocol-Version': '1.2',
        'V8-Version': process.versions.v8,
        'User-Agent': ua,
        'WebKit-Version': WEBKIT_VERSION,
        webSocketDebuggerUrl: await proxyDebuggerUrl,

    });
}
