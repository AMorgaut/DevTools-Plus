
const http = require('http');
const https = require('https');
const { promisify } = require('util');
const { parse } = require('url');
require('../');

const CLIENTS = { http, https };


http.createServer((request, response) => {
    const { method, url, headers } = request;
    console.log('========================================================================');
    console.log(method, url, headers);
    console.log('========================================================================');

    // read htt request config
    let body = [];
    request.on('data', chunk => body.push(chunk));
    request.on('end', () => {
        let error;
        try {
            body = Buffer.concat(body).toString();
            const options = body && JSON.parse(body);

            if (!options || !options.url) {
                throw Object.assign(
                    new Error('Wrong Request: URL is Missing'),
                    { status: 500 }
                );
            }

            Object.assign(options, parse(options.url));
            console.log('========================================================================');
            console.log(options);
            console.log('========================================================================');
            delete options.url;

            // do request and read response
            const client = CLIENTS[options.protocol.replace(':', '')];
            const req = client.request(options, res => {
                response.writeHead(res.statusCode, res.headers);
                res.pipe(response, { end: true });
            });
            req.on('error', error => { throw Object.assign(error, { status: 500 }); });
            request.pipe(req, { end: true });
        } catch (error) {
            response
                .writeHead(
                    error.status || 500,
                    { 'Content-Type': 'application/json' }
                )
                .end(JSON.stringify(error));
        }
    });
}).listen(8081);
