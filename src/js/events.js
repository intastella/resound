import whichTransitionEvent from './utility.js';

var rsTransitionEvent = whichTransitionEvent();
var rsEvents = document.querySelectorAll('.js-event');

function rsInitEvents() {
  var rsEventHeading = document.querySelector('.js-event-heading');
  rsEvents = document.querySelectorAll('.js-event');
  
  Array.prototype.forEach.call(rsEvents, function(el, i){
    setTimeout(function() {
      if (i === 0) {
        rsEventHeading.classList.add('event-heading--on');
      }
      
      rsEvents[i].classList.add('event--on');
      rsEvents[i].addEventListener(rsTransitionEvent, rsEventReady);
    }, 250 + ( i * 100 ));
  });
}

function rsEventReady(event) {
  Array.prototype.forEach.call(rsEvents, function(el, i){
    rsEvents[i].removeEventListener(rsTransitionEvent, rsEventReady);
    rsEvents[i].classList.add('event--ready');
  });
}

export {rsInitEvents};
export default rsInitEvents;