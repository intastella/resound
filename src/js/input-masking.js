import {maskInput} from 'vanilla-text-mask/dist/vanillaTextMask.js';

function rsInitInputMasking() {
  var maskPlaceholderChar = "\u2000"; // Unicode space character

  var maskDateNodes = document.querySelectorAll('.js-input-mask-date');
  var maskDate = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  if (maskDateNodes !== null) {
    Array.prototype.forEach.call(maskDateNodes, function(el, i){
      maskInput({ inputElement: maskDateNodes[i], mask: maskDate, placeholderChar: maskPlaceholderChar });
    });
  }
}

export {
  rsInitInputMasking
};
export default rsInitInputMasking;