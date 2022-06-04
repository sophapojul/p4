// eslint-disable-next-line import/extensions
import { setErrMsg, removeErrMsg } from './message.js';
/**
 * It takes a value and a regular expression and returns true if the value matches the regular
 * expression
 * @param {HTMLInputElement} el - The input to test.
 * @param {RegExp} regExp - The regular expression to test against.
 * @returns true or false
 */
function testRegExp(el, regExp) {
  const testedValue = regExp.test(el.value.trim());
  return !!testedValue;
}
/**
 * If the selector is not null, return true.
 * @param   {HTMLInputElement} el - The selector to check.
 * @returns   {Boolean} A boolean value.
 */
function notNull(el) {
  return el !== null;
}
/**
 * If the input is not empty, remove the error message and return true, otherwise set the error message
 * and return false
 * @param  {HTMLInputElement} elt - The input element that is being validated.
 * @returns  {Boolean} A boolean value.
 */
function notEmpty(elt) {
  const el = elt;
  // const dataLength = el.value.trim().length;
  switch (el.getAttribute('type')) {
    case 'text':
    case 'email':
    case 'number':
    case 'date':
      return Boolean(el.value.trim());
    default:
      return true;
  }
}
/**
 * It checks if the input is valid, and if it is, it removes the error message, otherwise it sets the
 * error message
 * @param  {HTMLInputElement} elt - the element to check
 * @returns   {Boolean} A boolean value.
 */
export function valid(elt) {
  /**
   *
   *@const
   *@type {HTMLInputElement}
   */
  const el = elt;
  if (!notNull(el) || !notEmpty(el)) {
    /**
     *
     *@const label
     *@type {HTMLLabelElement}
     */
    // @ts-ignore
    const label = el.previousElementSibling;
    const emptyErrMsg = `Le champ ${label.innerText} ne peut-être vide.`;
    setErrMsg(el, emptyErrMsg);
    return false;
  }
  removeErrMsg(el);
  switch (el.type) {
    case 'text': {
      const textRegExp =
        /^(?=.{2,30}$)[A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff]+(?:['\s-][A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff]+)*$/iu;
      const textErrMsg =
        "Le champ doit contenir au moins 2 caractères alphabétiques et si besoin un trait d'union - ou une apostrophe ' ou un espace .";
      if (testRegExp(el, textRegExp)) {
        removeErrMsg(el);
        return true;
      }
      setErrMsg(el, textErrMsg);
      return false;
    }
    case 'email': {
      const emailRegExp =
        /^(?=.{2,40}$)[\w\d]+([.-]?[\w\d])*[@]{1}[\w\d]+([.-]?[\w\d]+)*[.]{1}[a-zA-Z]{2,3}$/i;
      const emailErrMsg = 'Le champ doit contenir une adresse mail valide.';
      if (testRegExp(el, emailRegExp)) {
        removeErrMsg(el);
        return true;
      }
      setErrMsg(el, emailErrMsg);
      return false;
    }
    case 'date': {
      const age = new Date().getFullYear() - new Date(el.value).getFullYear();
      const dateErrMsg =
        'Le champ doit contenir une date valide et vous devez avoir 12 ans.';
      if (
        new Date(el.value).toString() === 'Invalid Date' ||
        new Date(el.value).getFullYear() < 1900 ||
        age < 12
      ) {
        setErrMsg(el, dateErrMsg);
        return false;
      }
      return true;
    }
    case 'number': {
      const numberRegExp = /^\d{1,2}$/; // /^(0?\d|[1-9]\d)$/
      const numberErrMsg =
        'Vous devez saisir un nombre entier positif inférieur à 100.';
      if (testRegExp(el, numberRegExp)) {
        removeErrMsg(el);
        return true;
      }
      setErrMsg(el, numberErrMsg);
      return false;
    }
    case 'checkbox': {
      const cguErrMsg =
        "Vous devez avoir lu et accepté les conditions d'utilisations.";
      if (el.checked) {
        removeErrMsg(el);
        return true;
      }
      setErrMsg(el, cguErrMsg);
      return false;
    }
    case 'radio': {
      const radiosErrMsg = 'Vous devez choisir une ville.';
      if (el.checked) {
        removeErrMsg(el);
        return true;
      }
      setErrMsg(el, radiosErrMsg);
      el.parentElement.style.border = '1px solid red';
      return false;
    }
    default:
      return false;
  }
}
/**
 * If the first name field is not empty, then validate it
 * @returns  {Boolean} The function firstValid() is being returned.
 */
function firstValid() {
  return valid(document.querySelector('#first'));
}
/**
 * If the last name is not empty, then validate it
 * @returns  {Boolean} The function lastValid() is being returned.
 */
function lastValid() {
  return valid(document.querySelector('#last'));
}
/**
 * If the email field is not empty, then validate it
 * @returns  {Boolean} a boolean value.
 */
function emailValid() {
  return valid(document.querySelector('#email'));
}
/**
 * It checks if the birthdate input is not empty, and if it's not, it checks if the date is valid. If
 * it is, it checks if the date is in the correct format
 * @returns  {Boolean} A boolean value.
 */
function birthdateValid() {
  return valid(document.querySelector('#birthdate'));
}
/**
 * If the quantity field is not empty, then validate it using the regular expression.
 * @returns  {Boolean} the value of the function valid.
 */
function quantityValid() {
  return valid(document.querySelector('#quantity'));
}
/**
 * It checks if a radio button is selected, and if not, it displays an error message
 */
// eslint-disable-next-line consistent-return
function radioSelected() {
  const selected = document.querySelector('input[name="location"]:checked');
  if (selected) {
    if (document.querySelector('#formRadio').nextSibling.nodeName === 'SMALL') {
      document.querySelector('#formRadio').nextSibling.remove();
      document.querySelector('#formRadio').removeAttribute('style');
    }
    return true;
  }
  if (document.querySelector('#formRadio').nextSibling.nodeName !== 'SMALL') {
    const errElt = document.createElement('small');
    const radiosErrMsg = 'Vous devez choisir une ville.';
    errElt.textContent = radiosErrMsg;
    document
      .querySelector('#formRadio')
      .insertAdjacentElement('afterend', errElt);
    // @ts-ignore
    document.querySelector('#formRadio').nextSibling.style.fontSize = '.8rem';
    // @ts-ignore
    document.querySelector('#formRadio').nextSibling.style.color = 'red';
    // @ts-ignore
    document.querySelector('#formRadio').style.border = '2px solid red';
    return false;
  }
}
/**
 * It checks if the checkbox is checked, if not, it displays an error message, if it is, it removes the
 * error message
 * @returns {Boolean} A boolean value.
 */
function cguChecked() {
  /**
   *@const cgu - an input type checkbox
   *@type  {HTMLInputElement}
   */
  const cgu = document.querySelector('#checkbox1');
  const cguErrMsg =
    "Vous devez avoir lu et accepté les conditions d'utilisations.";
  if (!cgu.checked) {
    setErrMsg(cgu, cguErrMsg);
    return false;
  }
  removeErrMsg(cgu);
  return cgu.checked;
}
/**
 * It returns true if all the other functions return true
 * @returns {Boolean} A boolean value.
 */
export function validate() {
  const validated = !!(
    firstValid() &&
    lastValid() &&
    emailValid() &&
    birthdateValid() &&
    quantityValid() &&
    radioSelected() &&
    cguChecked()
  );
  return validated;
}
