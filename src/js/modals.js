import whichTransitionEvent from './utility.js';

var rsTransitionEvent = whichTransitionEvent();

function rsModalOpen(openLink) {
  var rsTargetModalOpenId = openLink.dataset.modalId;
  var rsTargetModalOpen = document.getElementById(rsTargetModalOpenId);
  rsTargetModalOpen.classList.add('modal--open');
  
  setTimeout(function(){
    rsTargetModalOpen.classList.add('modal--visible');
  }, 10);
}

var rsTargetModalClose;

function rsModalClose(closeLink, callback) {
  var rsTargetModalCloseId = closeLink.dataset.modalId;
  rsTargetModalClose = document.getElementById(rsTargetModalCloseId);
  
  rsTargetModalClose.classList.add('modal--closed');
  rsTargetModalClose.addEventListener(rsTransitionEvent, rsResetModalClose);
  
  if (typeof callback == "function") {
    callback();
  }
}

function rsResetModalClose() {
  rsTargetModalClose.removeEventListener(rsTransitionEvent, rsResetModalClose);
  rsTargetModalClose.classList.remove('modal--open', 'modal--visible', 'modal--closed');
}

function rsBindModalOpenLinks() {
  var rsModalOpenLinks = document.querySelectorAll('.js-modal-open');
  Array.prototype.forEach.call(rsModalOpenLinks, function(el, i){
    rsModalOpenLinks[i].addEventListener('click', function(el) {
      el.preventDefault();
      rsModalOpen(el.currentTarget);
    });
  });
}

function rsBindModalCloseLinks() {
  var rsModalCloseLinks = document.querySelectorAll('.js-modal-close');
  Array.prototype.forEach.call(rsModalCloseLinks, function(el, i){
    rsModalCloseLinks[i].addEventListener('click', function(el) {
      el.preventDefault();
      el.stopPropagation();
      rsModalClose(el.currentTarget);
    });
  });
}

function rsInitModals() {
  rsBindModalOpenLinks();
  rsBindModalCloseLinks();
}

 export {rsInitModals, rsModalClose};
 export default rsInitModals;