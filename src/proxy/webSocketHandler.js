'use strict';

import WebSocket from 'ws';
import list from './list';

let remoteProtocolServer = null;
let wsProxy = null;

export function handleUpgrade(proxyServer) {
    wsProxy = new WebSocket.Server({ server: proxyServer });

    wsProxy.on('connection', onDevtoolsConnection);
    wsProxy.on('message', onDevToolsMessage);
    wsProxy.on('error', (error) => console.error('DEVTOOLS', error));
    wsProxy.on('close', onDevtoolsConnectionClose);
}

async function onDevtoolsConnection(ws, request, socket, head) {
    console.log('============================== WEB SOCKET DEVTOOLS CONNECTION ==============================');
    // console.log('head', head);
    console.log('request', request.method, request.url, request.headers);
    // console.log('socket', socket);
    const { headers } = request;
    const url = await list.targetWebSocketDebuggerUrl;
    remoteProtocolServer = new WebSocket(url, [], {
        // perMessageDeflate: headers['sec-websocket-extensions'].includes('permessage-deflate'),
        'sec-websocket-extension': headers['sec-websocket-extension'],
        'sec-websocket-key': headers['sec-websocket-key'],
        protocolVersion: Number(headers['sec-websocket-version'])
    });
    remoteProtocolServer.on('open', onRemoteProtocolServerConnection);
    remoteProtocolServer.on('message', onRemoteProtocolMessage);
    remoteProtocolServer.on('error', (error) => console.error('REMOTE', url, error));
    remoteProtocolServer.on('close', onRemoteProtocolServerConnectionClose);
}

function onRemoteProtocolServerConnection() {
    console.log('============================== REMOTE PROTOCOL CONNECTION ==============================');
}

function onDevtoolsConnectionClose(...args) {
    console.log('============================== WEB SOCKET DEVTOOLS CLOSE ==============================');
    console.log('[DEVTOOLS]', ...args);
    remoteProtocolServer.close();
    remoteProtocolServer = null;
}

function onRemoteProtocolServerConnectionClose(...args) {
    console.log('============================== REMOTE PROTOCOL CLOSE ==============================');
    console.log('[REMOTE]', ...args);
}

function onDevToolsMessage(data) {
    console.log('============================== WEB SOCKET DEVTOOLS MESSAGE ==============================');
    console.log('[DEVTOOLS]', data);
    data.sessionId = data.sessionId.replace(':8229:', `:${PORT}:`);
    const request = JSON.parse(data.message);
    if (request.method.startsWith('Network')) {
        console.log(request);
        return;
    }
    remoteProtocolServer.send(data);
}

function onRemoteProtocolMessage(data) {
    console.log('============================== REMOTE PROTOCOL MESSAGE ==============================');
    console.log('[REMOTE]', data);
    data.sessionId = data.sessionId.replace(`:${PORT}:`, ':8229:');
    wsProxy.send(data);
}

export { wsProxy, remoteProtocolServer };
