'use strict';

import { PORT } from './config';
import http from 'http';

import { onHttpRequest } from './proxy/httpHandler';
import { handleUpgrade  } from './proxy/webSocketHandler';

function onHttpListen(error) {
    if (error) {
        return console.error('something bad happened', error)
    }
}

const httpProxy = http.createServer(onHttpRequest);

handleUpgrade(httpProxy);

httpProxy.listen(PORT, onHttpListen);
