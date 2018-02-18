import {orderBy, uniq} from 'lodash';

import rsInitInputMasking from './input-masking.js';
import rsInitEvents from './events.js';
import rsInitModals from './modals.js';
import rsInitSearch from './search.js';

// function initRSEventAdd() {
//   var rsEventAddButton = document.querySelector('.js-event-add');
//   rsEventAddButton.addEventListener('click', function(el) {
//     el.preventDefault();
//     rsModalOpen(el);
//   });
// }

// function rsInitMusicAdd() {
//   var rsMusicAddButton = document.querySelector('.js-modal-event-button-music-add');
//   rsMusicAddButton.addEventListener('click', function(el) {
//     el.preventDefault();
//     rsModalOpen(el);
//     // var targetModalId = openLink.dataset.modalId;
//     // var targetModal = document.getElementById(targetModalId);
//   });
// }

function rsInitResound() {
  rsInitEvents();
  rsInitModals();
  rsInitInputMasking();
  rsInitSearch();
}

document.addEventListener('DOMContentLoaded', rsInitResound);