/* eslint-disable consistent-return */
/* eslint-disable func-names */

/**
 * The above code is selecting the element with the id of reserve.
 *
 * @const  {HTMLFormElement}  reserve  inscription form
 */
const reserve = document.querySelector('#reserve');
// const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.[a-z]{2,3})+$/i;
let modal = null;
let previousActiveElement = null;
/**
 * The function is called when the user clicks on the hamburger icon. The function toggles the class of
 * the navbar to responsive
 */
function editNav() {
  const myTopnav = document.getElementById('myTopnav');
  myTopnav.classList.toggle('responsive');
}
document.querySelector('.icon').addEventListener('click', editNav);
/**
 * It takes an element as an argument, removes the active class from all of its siblings, and adds the
 * active class to itself
 * @param  el - the element that was clicked
 */
function setActive(el) {
  [...el.parentElement.children].forEach((sib) => {
    if (sib.classList.contains('active')) {
      sib.classList.remove('active');
    }
  });
  el.classList.add('active');
}
/* The above code is adding an event listener to each link in the navbar. When the link is clicked, the
setActive function is called. */
document.querySelectorAll('.main-navbar a+a').forEach((el) => {
  el.addEventListener('click', () => {
    setActive(el);
  });
});
/**
 * It traps the focus inside the dialog box
 * @param  {HTMLElement} el - The element that will be focused on when the dialog is opened.
 */
function trapFocus(el) {
  /**
   *
   * @let focusableElts
   * @type {Array}
   */
  const focusableElts = Array.from(
    el.querySelectorAll(
      'input,span[role=radio],span[role=checkbox],button[type=submit],button[data-dismiss=dialog],span[data-dismiss="dialog"]'
    )
  );
  /**
   *
   * @let firstFocusableElt
   * @type {HTMLElement}
   */
  const firstFocusableElt = focusableElts[0];
  /**
   *
   * @let lastFocusableElt
   * @type {HTMLElement}
   */
  const lastFocusableElt = focusableElts[focusableElts.length - 1];
  const KEYCODE_TAB = '9';
  el.addEventListener('keydown', (ev) => {
    const isTabPressed = ev.key === 'Tab' || ev.code === KEYCODE_TAB;
    if (!isTabPressed) {
      return;
    }
    if (ev.shiftKey) {
      /* shift + tab */ if (document.activeElement === firstFocusableElt) {
        lastFocusableElt.focus();
        ev.preventDefault();
      }
    } /* tab */ else if (document.activeElement === lastFocusableElt) {
      firstFocusableElt.focus();
      ev.preventDefault();
    }
  });
}
/**
 * It closes the modal
 * @param   {Event}  ev - the event object
 * @returns The function closeModal is being returned.
 */
function closeModal(ev) {
  if (!modal) return;
  ev.preventDefault();
  // eslint-disable-next-line no-use-before-define
  Array.from(document.querySelector('#myTopnav').children).forEach((child) =>
    child.removeAttribute('inert')
  );
  Array.from(document.querySelector('main').children).forEach(
    /**
     * @type {function}
     * @param  {Element} child
     */
    (child) => {
      if (child !== modal) {
        child.removeAttribute('inert');
      }
    }
  );
  modal.removeAttribute('style');
  modal.setAttribute('aria-hidden', 'true');
  modal.removeAttribute('aria-modal');
  modal.removeEventListener('click', closeModal);
  modal
    .querySelector('span[data-dismiss="dialog"]')
    .removeEventListener('click', closeModal);
  modal.lastElementChild.removeEventListener('click', closeModal);
  // eslint-disable-next-line no-use-before-define
  modal.removeEventListener('keydown', checkCloseModal);
  // restoring focus
  previousActiveElement.focus();
  modal = null;
}
function checkCloseModal(ev) {
  if (ev.key === 'Enter' && ev.target.type === 'submit') {
    ev.target.click();
    return;
  }
  if (ev.key === 'Escape' || ev.key === 'Enter') {
    closeModal(ev);
  }
}
/**
 * It sets the modal to open
 * @param  {HTMLElement} el - the modal element
 */
function setToOpenModal(el) {
  Array.from(document.querySelector('#myTopnav').children).forEach((child) =>
    child.setAttribute('inert', 'true')
  );
  Array.from(document.querySelector('main').children).forEach(
    /**
     * @type {function(Element)}
     */
    (child) => {
      if (child !== el) child.setAttribute('inert', 'true'); // child.inert = true;
    }
  );
  el.setAttribute('style', 'display: block');
  el.removeAttribute('aria-hidden');
  el.setAttribute('aria-modal', 'true');
  el.querySelectorAll('[data-dismiss="dialog"]').forEach((elt) =>
    elt.addEventListener('click', closeModal)
  );
  el.lastElementChild.addEventListener('click', closeModal);
  el.addEventListener('keydown', checkCloseModal);
  trapFocus(el);
  modal = el;
}
/**
 * If there is no modal open, set the modal to the element that was clicked on and set the trigger to
 * the element that was clicked on.
 * @param   {Event}  ev - the event object
 */
const openModal = (ev) => {
  ev.preventDefault();
  /**
   * @const btn
   * @type {EventTarget}
   */
  const btn = ev.target;
  // @ts-ignore
  const el = document.getElementById(btn.getAttribute('aria-haspopup'));
  if (!modal) {
    previousActiveElement = document.activeElement;
    setToOpenModal(el);
  }
};
/**
 * It adds an event listener to each trigger element, which opens the modal when the trigger is clicked or Enter is pressed, which closes the modal when the trigger is clicked or Escape is pressed.
 */
document.querySelectorAll('[aria-haspopup="dialog"]').forEach((trigger) => {
  /**
   * The above code is adding an event listener to the trigger element. When the trigger element is
  clicked, the openModal function is called.
   *
   * @param   {String}  click
   * @param   {PointerEvent|KeyboardEvent}  ev
   *
   */
  trigger.addEventListener('click', openModal);
  trigger.addEventListener('keydown', (ev) => {
    // @ts-ignore
    if (ev.key === 'Enter') {
      openModal(ev);
    }
  });
  /* Closing the modal when the user clicks on the button. */
  document
    .querySelector('#dialog')
    .querySelectorAll('[data-dismiss]')
    .forEach((dismissTrigger) => {
      dismissTrigger.addEventListener('click', closeModal);
    });
});
/**
 * It adds an error message to the form field if it doesn't already have one
 * @param {HTMLInputElement} el - the element that triggered the event
 * @param {String} message - the error message to display
 * @returns the value of the variable eltLastChild.
 */
function setErrMsg(el, message) {
  const eltLastChild = el.parentElement.lastChild;
  // test présence d'un message d'erreur
  if (
    eltLastChild.nodeName === 'SMALL' &&
    eltLastChild.textContent === message
  ) {
    return;
  } // sinon création du message d'erreur :
  // création de l'élément contenant le message
  eltLastChild.textContent = '';
  const errElt = document.createElement('small');
  // ajout du message à l'élément créé
  errElt.textContent = message; // 'Votre prénom doit contenir au moins 2 lettres';
  errElt.style.color = 'red';
  el.parentElement.insertAdjacentElement('beforeend', errElt);
  // ajout de la classe invalid au parent
  el.parentElement.classList.remove('valid');
  el.parentElement.classList.add('invalid');
  if (el.getAttribute('type') === 'checkbox') {
    document
      .querySelector('#checkbox1')
      .nextElementSibling.firstElementChild.setAttribute(
        'style',
        'border:2px solid red;'
      );
  }
  if (el.type !== 'date') {
    el.focus();
  }
}
// TODO set valid message and delete previous message
/**
 * It removes the error message and replaces the class `invalid` by the class `valid` on the parent
 * element of the element passed as argument
 * @param {HTMLInputElement} el - the element that triggered the event
 */
function removeErrMsg(el) {
  const eltLastChild = el.parentElement.lastChild;
  // test présence d'un message d'erreur
  if (eltLastChild.nodeName === 'SMALL') {
    // suppression du message d'erreur
    eltLastChild.remove();
    // remplacement de la classe invalid par la classe valid sur le parent
    el.parentElement.classList.remove('invalid');
    el.parentElement.classList.add('valid');
    if (el.getAttribute('type') === 'checkbox') {
      document
        .querySelector('#checkbox1')
        .nextElementSibling.firstElementChild.removeAttribute('style');
    }
  }
  el.parentElement.classList.add('valid');
}
/**
 * It takes a value and a regular expression and returns true if the value matches the regular
 * expression
 * @param {HTMLInputElement}el - The value to test.
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
function valid(elt) {
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
      const textRegExp = /^(?=.{2,30}$)[\p{L}]+(?:['\-\s][p{L}]+)*$/iu;
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
        /^(?=.{2,40}$)[a-zA-Z]+([._-]?[a-zA-Z])*[@]{1}[a-zA-Z]+([._-]?[a-zA-Z]+)*[.]{1}[a-zA-Z]{2,3}$/i;
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
function isSelected() {
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
   *@const cgu - a node
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
function validate() {
  const validated = !!(
    firstValid() &&
    lastValid() &&
    emailValid() &&
    birthdateValid() &&
    quantityValid() &&
    isSelected() &&
    cguChecked()
  );
  return validated;
}
/**
 * It creates a modal window with a success message and displays it
 * @param   {String} firstname - the first name of the user
 * @param   {String} lastname - the last name of the user
 */
function displaySuccessModal(firstname, lastname) {
  /**
   * @const
   * @type {HTMLElement}
   */
  const div = document.createElement('div');
  div.setAttribute('id', 'successModal');
  div.setAttribute('class', 'modal, successModal');
  div.setAttribute('role', 'dialog');
  div.innerHTML = `
    <div class="modal-content" role="document">
      <span
        tabindex="0"
        role="button"
        id="dismissSuccessModal"
        class="modal-close"
        aria-label="Fermer la fenêtre modale"
        title="Fermer la fenêtre modale"
        data-dismiss="dialog"
      ></span>
      <div class="modal-body">
        <h3>Merci pour votre inscription ! <span>${firstname} ${lastname}</span></h3>
        <button class="button btn-submit" data-dismiss="dialog">Fermer</button>
      </div>
    </div>
    <div class="modal-mask"></div>
  `;
  document.querySelector('main').appendChild(div);
  /**
   * @const
   * @type  {HTMLElement}
   */
  const successModal = document.querySelector('#successModal');
  setToOpenModal(successModal);
}
/* The above code is adding an event listener to each of the radio buttons. When the user presses the
enter or space key, the radio button is checked. */
Array.from(document.querySelectorAll('span[role="radio"]')).forEach(
  (element) => {
    element.addEventListener('keydown', (ev) => {
      // @ts-ignore
      if (ev.code === 'Enter' || ev.code === 'Space') {
        document.querySelector(
          `input[value="${document.activeElement.getAttribute('aria-label')}"]`
          // @ts-ignore
        ).checked = true;
        document
          .querySelector(
            `input[value="${document.activeElement.getAttribute(
              'aria-label'
            )}"]`
          )
          .nextElementSibling.firstElementChild.setAttribute(
            'aria-checked',
            'true'
          );
      }
    });
  }
);
/* The above code is adding an event listener to each span element with the role of checkbox. The event
listener is listening for the enter or space key to be pressed. If the enter or space key is
pressed, the code will check the checkbox that is associated with the span element. */
document.querySelectorAll('span[role="checkbox"]').forEach((element) => {
  element.addEventListener('keydown', function (ev) {
    // @ts-ignore
    if (ev.code === 'Enter' || ev.code === 'Space') {
      const selected = this.parentElement.previousElementSibling;
      /**
       * @const
       * @type  {HTMLInputElement}
       */
      // @ts-ignore
      const elt = document.getElementById(`${selected.id}`);
      elt.checked = !elt.checked;
      this.setAttribute('aria-checked', String(!selected));
    }
  });
});
/* Adding an event listener to each input element with the form attribute of "reserve" and calling the
valid function on each change. */
/**
 *
 * @param   {HTMLInputElement}  el
 *
 */
document.querySelectorAll('input[form="reserve"]').forEach((el) => {
  // @ts-ignore
  el.addEventListener('change', () => valid(el));
});
/**
 * The above code is listening for a submit event on the form. If the form is valid, it will send the
form data to the console. If the form is not valid, it will prevent the form from submitting.
 *
 * @param   {String}  submit  listener type
 * @param   {SubmitEvent}  ev  submit event
 *
 */
reserve.addEventListener('submit', function (ev) {
  if (!validate()) {
    ev.preventDefault();
  } else {
    const data = Object.fromEntries(new FormData(this));
    // eslint-disable-next-line no-console
    console.table(data);
    // new Response(new FormData(reserve)).text().then(console.log);
    // send form by Ajax
    // @ts-ignore
    reserve.reset();
    document
      .querySelectorAll('.formData')
      .forEach((div) => div.classList.remove('valid'));
    closeModal(ev);
    // @ts-ignore
    displaySuccessModal(data.first, data.last);
  }
});
