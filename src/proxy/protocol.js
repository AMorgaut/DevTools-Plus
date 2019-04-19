'use strict';

/**
 * GET /json/protocol
 * The current devtools protocol, as JSON:
 *
 * @todo explore all the protocol that may be added
 * @see https://chromedevtools.github.io/devtools-protocol/#get-jsonprotocol
 */

// import httpFetch from 'node-fetch';
import { PROTOCOL_VERSION } from "../config";


export async function getProtocol(target) {
    // const response = await httpFetch(`${target}/json/protocol`);
    // const json = await response.json();
    // json.domains.push(Network);
    return await import(`../${PROTOCOL_VERSION}/protocol.json`);
}
