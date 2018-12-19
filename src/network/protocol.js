'use strict';

import { protocol as commands  } from './commands';
import { protocol as events  } from './events';
import { protocol as types  } from './types';

const domain = 'Network';
const description = 'Network domain allows tracking network activities of the node.js process. ' +
    'It exposes information about http, file, data and other requests and responses, their headers, bodies, timing, etc.';

export { domain, description, commands, events, types };
