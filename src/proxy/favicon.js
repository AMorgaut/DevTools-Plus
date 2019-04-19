import fileSystem from 'fs';
import path from 'path';

import { FAVICON } from '../config';

const MIME = {
    gif: 'image/gif',
    ico: 'image/x-icon',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    webp: 'image/webp',
};

/**
 * Returns the favicon image from the file path specified in the config
 *
 * @param {string} target
 * @param {http.Request} request
 * @param {http.Response} response
 */
export function getFavicon(target, request, response) {
    const filePath = path.join(__dirname, '..', FAVICON);
    const extension = path.extname(filePath);
    const { size } = fileSystem.statSync(filePath);
    const headers = {
        'Content-Type': MIME[extension.substr(1)],
        'Content-Length': size
    };

    const readStream = fileSystem.createReadStream(filePath);

    response.writeHead(200, headers);
    readStream.pipe(response);
}
