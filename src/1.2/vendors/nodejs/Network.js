'use strict';

import http from "http";
import http2 from "http2";
import https from "https";

import createUuid from "uuid/v4";

import AbstractNetwork from '../../network';

export default class Network extends AbstractNetwork {

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
        super.enable(options);
        // override the function
        http.request = Network.hookRequest(http, Network.httpRequest);
        http2.request = Network.hookRequest(http2, Network.http2Request);
        https.request = Network.hookRequest(https, Network.httpsRequest);
    }

    /**
     * Disables network tracking, prevents network events from being sent to the client.
     *
     * @see https://chromedevtools.github.io/devtools-protocol/1-2/Network#method-disable
     */
    disable() {
        super.disable();
        http.request = this.httpRequest;
        http2.request = this.http2Request;
        https.request = this.httpsRequest;
    }

    /**
     * Returns content served for the given request.
     *
     * @todo Do not encode in base64 if the content type is a text one
     * @param {string} requestId Identifier of the network request to get content for.
     * @returns {{body:string, base64Encoded:boolean}}
     */
    async getResponseBody(requestId) {
        const { data } = Network.Request.getRemoteRequestById(requestId);
        return {
            body: Buffer.concat(data).toString('base64'),
            base64Encoded: true
        }
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // STATIC HELPERS
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    static hookRequest(module, original) {
        return (...args) => {
            const [ request ] = args;
            const remoteRequest = new AbstractNetwork.Request(request);
            console.log(request.host, request.body);
            return original.apply(module, arguments);
        }
    }
}


Object.assign(Network, AbstractNetwork, {
    httpRequest: http.request,
    http2Request: http2.request,
    httpsRequest: https.request,
});
