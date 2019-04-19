'use strict';

import protocol from './protocol';
import * as Network_1_2 from '../../1.2/network'

export default class Network extends Network_1_2 {
    constructor() {
        super();
    }
}

Object.assign(Network, { protocol });
