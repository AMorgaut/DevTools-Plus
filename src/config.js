/**
 * Setting a "Chrome" value in "BROWSER" make chrome://inspect expose things as "open tab with url", "focus tab", "reload", "close"
 * Setting a "a higher Chrome version" value in "BROWSER" (ex: "Chrome/777.0.0.0") make chrome://inspect also expose "inspect fallback"
 */

export default {
    PORT: 8230,
    PROTOCOL_VERSION: '1.2',
    TARGET: `http://127.0.0.1:${process.debugPort}`,
    FAVICON: '../favicon.ico',
    BROWSER: `NodePlus/50.0.NodeJS.${process.version}`,
    USER_AGENT: '',
    WEBKIT_VERSION: '537.36 (@cfede9db1d154de0468cb0538479f34c0755a0f4)',
    DESCRIPTION: 'with DevTools-Plus',
};
