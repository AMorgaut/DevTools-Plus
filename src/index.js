'use strict';

import CONFIG from './config';
import http from 'http';

import { onHttpRequest } from './proxy/httpHandler';
import { handleUpgrade  } from './proxy/webSocketHandler';

function onHttpListen(error) {
    console.log('HTTP Listen on port: ', CONFIG.PORT);
    if (error) {
        return console.error('something bad happened', error)
    }
}

const httpProxy = http.createServer(onHttpRequest);

handleUpgrade(httpProxy);

httpProxy.listen(CONFIG.PORT, onHttpListen);
