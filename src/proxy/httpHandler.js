'use strict';

/**
 * HTTP Endpoints
 *
 * If started with a remote-debugging-port, these HTTP endpoints are available on the same port.
 *
 * @todo Expose only endpoints related to the choosen protocol version
 * @todo send a Bad REquest response instead of the default for unknown pathes ? (at least in a strict mode?)
 *
 * @see https://chromedevtools.github.io/devtools-protocol/endpoints
 * @see https://cs.chromium.org/chromium/src/content/browser/devtools/devtools_http_handler.cc?type=cs&q=f:devtools_http_handler.cc+%22command+%3D%3D+%22&sq=package:chromium&g=0&l=569
 */

import { parse } from 'url';

import { TARGET } from '../config';
import { getDefault } from './default';

import { getActivate } from './activate';
import { getClose } from './close';
import { getFavicon } from './favicon';
import { getNew } from './new';
import { getProtocol } from './protocol';
import { getList } from './list';
import { getVersion } from './version';

const handlers = {
    activate: getActivate,
    close: getClose,
    favicon: getFavicon,
    list: getList,
    new: getNew,
    protocol: getProtocol,
    version: getVersion
};

export async function onHttpRequest(request, response) {
    const { method, url, headers } = request;
    console.log(method, url, headers);
    const { pathname } = parse(url);
    const [, ns, api] = pathname.split('/');
    const call = handlers[ns === 'json' ? (api || 'list') : (ns || 'list')] || (() => getDefault(TARGET, url));
    const json = await call(TARGET, request, response);
    if (json) {
        // console.log(pathname, ns, api, call.name, 'response', json);
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(json));
    }
}
