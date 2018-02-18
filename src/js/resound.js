import {orderBy, uniq} from 'lodash';

import rsInitInputMasking from './input-masking.js';
import rsInitEvents from './events.js';
import rsInitModals from './modals.js';
import rsInitSearch from './search.js';

function rsInitResound() {
  rsInitEvents();
  rsInitModals();
  rsInitInputMasking();
  rsInitSearch();
}

document.addEventListener('DOMContentLoaded', rsInitResound);