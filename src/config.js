/**
 * Setting a "Chrome" value in "BROWSER" make chrome://inspect expose things as "open tab with url", "focus tab", "reload", "close"
 * Setting a "a higher Chrome version" value in "BROWSER" (ex: "Chrome/777.0.0.0") make chrome://inspect also expose "inspect fallback"
 */

'use strict';

export const PORT = 8229;
export const TARGET = `http://127.0.0.1:${process.debugPort}`;
export const FAVICON = '../favicon.ico';
export const BROWSER = `NodePlus/70.0.NodeJS.${process.version}`;
export const USER_AGENT = '';
export const WEBKIT_VERSION = '537.36 (@cfede9db1d154de0468cb0538479f34c0755a0f4)';
export const DESCRIPTION = 'with DevTools-Plus';
