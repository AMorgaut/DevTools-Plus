/**
 * Setting a "Chrome" value in "BROWSER" make chrome://inspect expose things as "open tab with url", "focus tab", "reload", "close"
 * Setting a "a higher Chrome version" value in "BROWSER" (ex: "Chrome/777.0.0.0") make chrome://inspect also expose "inspect fallback"
 */

'use strict';

export const PORT = 8229;
export const TARGET = `http://127.0.0.1:${process.debugPort}`;
export const FAVICON = '../favicon.ico'; // todo handle local favicon
export const BROWSER = 'DevToolsPlus';
export const USER_AGENT = '';
export const WEBKIT_VERSION = '';
export const DESCRIPTION = 'with DevTools-Plus';
