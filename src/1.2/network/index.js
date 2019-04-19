'use strict';

import Request from './Request';

/**
 * Network Domain
 * Network domain allows tracking network activities of the page.
 * It exposes information about http, file, data and other requests and responses, their headers, bodies, timing, etc.
 *
 * @class
 * @see https://chromedevtools.github.io/devtools-protocol/1-2/Network
 */
export default class Network {

    constructor() {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // PUBLIC API
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Enables network tracking, network events will now be delivered to the client.
     *
     * @see https://chromedevtools.github.io/devtools-protocol/1-2/Network#method-enable
     *
     * @param {Object} options
     * @param {number} [options.maxTotalBufferSize] Buffer size in bytes to use when preserving network payloads (XHRs, etc)
     * @param {number} [options.maxResourceBufferSize] Per-resource buffer size in bytes to use when preserving network payloads (XHRs, etc)
     */
    enable(options) {
        const {
            maxTotalBufferSize = this.maxTotalBufferSize,
            maxResourceBufferSize = this.maxResourceBufferSize
        } = options;
        Object.assign(this, { maxTotalBufferSize, maxResourceBufferSize, enabled: true });
        Object.assign(Request, { maxTotalBufferSize, maxResourceBufferSize });
    }

    /**
     * Disables network tracking, prevents network events from being sent to the client.
     *
     * @see https://chromedevtools.github.io/devtools-protocol/1-2/Network#method-disable
     */
    disable() {
        this.enabled = false;
    }

    /**
     * Allows overriding user agent with the given string.
     *
     * @param {string} userAgent User agent to use
     */
    setUserAgentOverride(userAgent) {
        this.userAgent = userAgent;
    }

    /**
     * Specifies whether to always send extra HTTP headers with the requests from this page.
     *
     * @param {Network.Headers} headers
     */
    setExtraHTTPHeaders(headers) {
        this.extraHTTPHeaders = headers;
    }

    /**
     * Returns content served for the given request.
     *
     * @abstract
     * @param {string} requestId Identifier of the network request to get content for.
     * @returns {{body:string, base64Encoded:boolean}}
     */
    getResponseBody(requestId) {
        throw new Error('Not implemented');
    }

    /**
     * Tells whether clearing browser cache is supported.
     *
     * @returns {boolean}
     */
    canClearBrowserCache() {
        return false;
    }

    /**
     * Clears browser cache.
     */
    clearBrowserCache() {
        throw new Error('Not implemented');
    }

    /**
     * Tells whether clearing browser cookies is supported.
     *
     * @returns {boolean}
     */
    canClearBrowserCookies() {
        return false;
    }

    /**
     * Clears browser cookies.
     */
    clearBrowserCookies() {
        throw new Error('Not implemented');
    }

    /**
     * Activates emulation of network conditions.
     *
     * @param {boolean} offline True to emulate internet disconnection
     * @param {number} latency Additional latency (ms).
     * @param {number} downloadThroughput Maximal aggregated download throughput.
     * @param {number} uploadThroughput Maximal aggregated upload throughput.
     * @param {Object} options
     * @param {Network.ConnectionType} options Connection type if known.
     */
    emulateNetworkConditions(offline, latency, downloadThroughput, uploadThroughput, options) {
        const { connectionType } = options;
        throw new Error('Not implemented');
    }

    /**
     * Toggles ignoring cache for each request. If true, cache will not be used.
     *
     * @param {boolean} cacheDisabled Cache disabled state
     */
    setCacheDisabled(cacheDisabled) {

    }
}

Object.assign(Network, {
    Request
});

