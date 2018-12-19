'use strict';

import fetch from 'node-fetch';

export async function getDefault(target, uri) {
    const response = await fetch(`${target}${uri}`);
    return await response.json();
}