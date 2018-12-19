'use strict';

import { protocol as enable  } from './enable';
import { protocol as disable  } from './disable';
import { protocol as getResponseBody  } from './getResponseBody';

export const protocol = [ enable, disable, getResponseBody ];
