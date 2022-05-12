// DOM Elements
const icon = document.querySelector('.icon');
const myLinks = document.querySelectorAll('.main-navbar a+a');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const dialog = document.querySelector('#dialog');
const reserve = document.querySelector('#reserve');
const first = document.querySelector('#first');
const last = document.querySelector('#last');
const email = document.querySelector('#email');
const birthdate = document.querySelector('#birthdate');
const quantity = document.querySelector('#quantity');
const radioGroup = document.querySelector('#formRadio');
const checkboxGroup = document.querySelector('#formMentions');

const emptyMsg = 'Le champ ne peut-être vide.';
const textErrMsg =
  'Le champ doit contenir au moins 2 caractères alphabétiques non accentués et si besoin un trait d\'union " - " ou une apostrophe.';
const firstErrMsg =
  'Le champ doit contenir au moins 2 caractères alphabétiques non accentués et si besoin un trait d\'union " - " ou une apostrophe " \' ".';
const lastErrMsg =
  'Le champ doit contenir au moins 2 caractères alphabétiques non accentués et si besoin un trait d\'union " - " ou une apostrophe.';
const emailErrMsg = 'Le champ doit contenir une adresse mail valide.';
const birthdateErrMsg =
  'Le champ doit contenir une date valide, inférieure à 2013.';
const quantityErrMsg =
  'Vous devez saisir un nombre entier positif inférieur à 100.';
const radiosErrMsg = 'Vous devez choisir une ville.';
const cguErrMsg =
  "Vous devez avoir lu et accepté les conditions d'utilisations.";

const firstRegExp = /^[-a-zA-Z']{2,20}$/i;
const lastRegExp = /^[-a-zA-Z'\s]{2,20}$/i;
const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.[a-z]{2,3})+$/i;
const birthdateRegExp = /^(190[0-9]|19[1-9][0-9]|200[0-9]|201[0-2])/;
const quantityRegExp = /^(0?\d|[1-9]\d)$/;

const triggers = document.querySelectorAll('[aria-haspopup="dialog"]');
const dismissTriggers = dialog.querySelectorAll('[data-dismiss]');

let modal = null;
let trig = null;

/**
 * The function is called when the user clicks on the hamburger icon. The function toggles the class of
 * the navbar to responsive
 */
function editNav() {
  const myTopnav = document.getElementById('myTopnav');
  myTopnav.classList.toggle('responsive');
}

icon.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
  editNav();
});
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
[...myLinks].forEach((el) => {
  el.addEventListener('click', () => {
    setActive(el);
  });
});
/**
 * Stop the event from bubbling up the DOM tree.
 * @param   {Object}  e - The event object.
 */
function stopPropagation(e) {
  e.stopPropagation();
}

/**
 * It removes the modal from the DOM and resets the modal variable to null
 * @param el - The modal element
 */
function setToCloseModal(el) {
  el.style.display = 'none';
  el.setAttribute('aria-hidden', 'true');
  el.removeAttribute('aria-modal');
  el.removeEventListener('click', closeModal);
  modalClose.removeEventListener('click', closeModal);
  modalContent.removeEventListener('click', stopPropagation);
  modal = null;
}

function setToOpenModal(el) {
  el.style.display = 'block';
  el.removeAttribute('aria-hidden');
  el.setAttribute('aria-modal', 'true');
  el.addEventListener('click', closeModal);
  modalClose.addEventListener('click', closeModal);
  modalContent.addEventListener('click', stopPropagation);
  modal = el;
}

/**
 * It closes the modal
 * @param   {Object}  ev - the event object
 * @returns The function closeModal is being returned.
 */
const closeModal = (ev) => {
  if (!modal) return;
  ev.preventDefault();
  setToCloseModal(modal);
  // restoring focus
  trig.focus();
};

/* The above code is listening for a keydown event. If the key pressed is the escape key, the
closeModal function is called. */
window.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape') {
    closeModal(ev);
  }
});
/**
 * If there is no modal open, set the modal to the element that was clicked on and set the trigger to
 * the element that was clicked on.
 * @param   {Object}  ev - the event object
 */
const openModal = (ev) => {
  ev.preventDefault();
  const el = document.getElementById(ev.target.getAttribute('aria-haspopup'));
  if (!modal) {
    setToOpenModal(el);
    trig = ev.target;
  }
};

/**
 * It adds an event listener to each trigger element, which opens the modal when the trigger is clicked or Enter is pressed, which closes the modal when the trigger is clicked or Escape is pressed.
 */
triggers.forEach((trigger) => {
  trigger.addEventListener('click', (ev) => {
    ev.preventDefault();
    openModal(ev);
  });
  trigger.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      openModal(ev);
    }
  });
  /* Closing the modal when the user clicks on the button. */
  dismissTriggers.forEach((dismissTrigger) => {
    dismissTrigger.addEventListener('click', (ev) => {
      ev.preventDefault();
      closeModal(ev);
    });
  });
});
/**
 * It adds an error message to the form field if it doesn't already have one
 * @param {HTMLElement} el- the element that triggered the event
 * @param {String} message - the error message to display
 * @returns the value of the variable eltLastChild.
 */
function setErrMsg(el, message) {
  const eltLastChild = el.parentElement.lastChild;
  // test présence d'un message d'erreur
  if (eltLastChild.nodeName === 'SMALL') {
    return;
  } // sinon création du message d'erreur :
  // création de l'élément contenant le message
  const errElt = document.createElement('small');
  // ajout du message à l'élément créé
  errElt.textContent = message; // 'Votre prénom doit contenir au moins 2 lettres';
  errElt.style.color = 'red';
  el.parentElement.insertAdjacentElement('beforeend', errElt);
  // ajout de la classe invalid au parent
  el.parentElement.classList.add('invalid');
  if (el.type === 'checkbox') {
    document.querySelector(
      '#checkbox1'
    ).nextElementSibling.firstElementChild.style.border = '2px solid red';
  }
}

/**
 * It removes the error message and replaces the class `invalid` by the class `valid` on the parent
 * element of the element passed as argument
 * @param {HTMLElement} el - the element that triggered the event
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
    if (el.type === 'checkbox') {
      document.querySelector(
        '#checkbox1'
      ).nextElementSibling.firstElementChild.style.border = '';
    }
  }
}

/**
 * It takes a value and a regular expression and returns true if the value matches the regular
 * expression
 * @param value - The value to test.
 * @param regExp - The regular expression to test against.
 * @returns true or false
 */
function testRegExp(value, regExp) {
  const testedValue = regExp.test(value);
  return !!testedValue;
}

function notNull(selector) {
  // if (selector === null) {
  //   return false;
  // }
  // return true;
  return selector !== null;
}

/**
 * If the input is not empty, remove the error message and return true, otherwise set the error message
 * and return false
 * @param selector - The input element that is being validated.
 * @returns A boolean value.
 */
function notEmpty(selector) {
  if (!notNull(selector)) {
    return;
  }
  const dataLength = selector.value.length;
  switch (selector.getAttribute('type')) {
    case 'text':
    case 'email':
    case 'number':
      if (dataLength > 0) {
        removeErrMsg(selector);
        return true;
      }
      setErrMsg(selector, emptyMsg);
      return false;
    case 'date':
      if (new Date(selector.value).toString() === 'Invalid Date') {
        setErrMsg(selector, birthdateErrMsg);
        return false;
      }
      return true;
    case 'radio':
    case 'checkbox':
      if (selector.checked) {
        removeErrMsg(selector);
        return true;
      }
      setErrMsg(selector, emptyMsg);
      console.log('selector:', selector);
      selector.parentElement.style.border = '1px solid red';
      return false;
    default:
      return false;
  }
}

function allIsValid(el) {
  if (!notNull(el) || !notEmpty(el)) {
    setErrMsg(el, emptyMsg);
    return false;
  }
  removeErrMsg(el);
  switch (el.type) {
    case 'checkbox':
      if (el.checked) {
        removeErrMsg(el);
        return true;
      }
      setErrMsg(el, cguErrMsg);
      return false;
    case 'radio':
      if (el.checked) {
        removeErrMsg(el);
        return true;
      }
      setErrMsg(el, radiosErrMsg);
      console.log('selector:', el);
      el.parentElement.style.border = '1px solid red';
      return false;
    case 'date':
      return false;
    default:
      return false;
  }
}

/**
 * It validates the value of an input element against a regular expression and displays an error
 * message if the value is invalid
 * @param   {HTMLElement} el- The element to validate.
 * @param   {String}  errMsg - The error message to display if the input is invalid.
 * @param   {RegExp}  regExp - The regular expression to test the value against.
 * @returns  {Boolean}  A boolean value.
 */
function valid(el, errMsg, regExp) {
  const { value } = el;
  if (!notEmpty(el)) return false;
  if (regExp) {
    if (testRegExp(value, regExp)) {
      removeErrMsg(el);
      return true;
    }
    setErrMsg(el, errMsg);
    return false;
  }
  return false;
}

/**
 * If the first name field is not empty, then validate it
 * @returns The function firstValid() is being returned.
 */
function firstValid() {
  if (notEmpty(first)) {
    return valid(first, firstErrMsg, firstRegExp);
  }
  return false;
}

/**
 * If the last name is not empty, then validate it
 * @returns The function lastValid() is being returned.
 */
function lastValid() {
  if (notEmpty(last)) {
    return valid(last, lastErrMsg, lastRegExp);
  }
  return false;
}

/**
 * If the email field is not empty, then validate it
 * @returns a boolean value.
 */
function emailValid() {
  if (notEmpty(email)) {
    return valid(email, emailErrMsg, emailRegExp);
  }
  return false;
}

/**
 * If the birthdate field is not empty, check if the length of the value is not equal to 10 or if the
 * date is invalid. If either of those are true, set the error message and return false. Otherwise,
 * return the result of the valid function
 * @returns A boolean value.
 */
function birthdateValid() {
  const toTestDate = new Date(birthdate.value);
  if (notEmpty(birthdate)) {
    if (toTestDate.toString() === 'Invalid Date') {
      setErrMsg(birthdate, birthdateErrMsg);

      return false;
    }
    return valid(birthdate, birthdateErrMsg, birthdateRegExp);
  }
  return false;
}

/**
 * If the quantity field is not empty, then validate it using the regular expression.
 * @returns the value of the function valid.
 */
function quantityValid() {
  if (notEmpty(quantity)) {
    return valid(quantity, quantityErrMsg, quantityRegExp);
  }
  return false;
}

/**
 * It checks if a radio button is selected, and if not, it displays an error message
 * @returns A boolean value.
 */
function isSelected() {
  const selected = document.querySelector('input[name="location"]:checked');
  if (selected) {
    if (document.querySelector('#formRadio').nextSibling.nodeName === 'SMALL') {
      document.querySelector('#formRadio').nextSibling.remove();
      document.querySelector('#formRadio').style.border = '';
    }
    return true;
  }
  if (document.querySelector('#formRadio').nextSibling.nodeName !== 'SMALL') {
    const errElt = document.createElement('small');
    errElt.textContent = radiosErrMsg;
    document
      .querySelector('#formRadio')
      .insertAdjacentElement('afterend', errElt);
    document.querySelector('#formRadio').nextSibling.style.fontSize = '.8rem';
    document.querySelector('#formRadio').nextSibling.style.color = 'red';
    document.querySelector('#formRadio').style.border = '2px solid red';

    return false;
  }
  return selected;
}

/**
 * It checks if the checkbox is checked, if not, it displays an error message, if it is, it removes the
 * error message
 * @returns {Boolean} A boolean value.
 */
function cguChecked() {
  const cgu = document.querySelector('#checkbox1');
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
// document.querySelector('.main-navbar').addEventListener('click', editNav);:46

/* The above code is adding an event listener to each of the radio buttons. When the user presses the
enter or space key, the radio button is checked. */
Array.from(document.querySelectorAll('span[role="radio"]')).forEach(
  (element) => {
    element.addEventListener('keydown', (ev) => {
      if (ev.code === 'Enter' || ev.code === 'Space') {
        document.querySelector(
          `input[value="${document.activeElement.getAttribute('aria-label')}"]`
        ).checked = true;
      }
    });
  }
);

/* The above code is adding an event listener to each span element with the role of checkbox. The event
listener is listening for the enter or space key to be pressed. If the enter or space key is
pressed, the code will check the checkbox that is associated with the span element. */
Array.from(document.querySelectorAll('span[role="checkbox"]')).forEach(
  (element) => {
    element.addEventListener('keydown', (ev) => {
      if (ev.code === 'Enter' || ev.code === 'Space') {
        const selected = ev.target.parentElement.previousElementSibling;
        document.getElementById(`${selected.id}`).checked ^= 1;
        ev.target.setAttribute('aria-checked', String(!selected));
      }
    });
  }
);

/* The above code is listening for a submit event on the form. If the form is valid, it will send the
form data to the console. If the form is not valid, it will prevent the form from submitting. */
document.addEventListener('submit', (ev) => {
  const successModal = document.querySelector('#successModal');
  if (!validate()) {
    ev.preventDefault();
  } else {
    // send form by Ajax
    console.table([...new FormData(reserve).entries()]);
    reserve.reset();
    closeModal(ev);
    setToOpenModal(successModal);
  }
  // ev.target.submit();
});
// const inputs = document.querySelectorAll('#reserve input');
// const iinp = document.querySelector('#reserve').elements / Object HTMLFormControlsCollection / Array.from()
// for (let i = 0; i < inputs.length; i += 1) {
//   inputs[i].addEventListener('input', (ev) => {
//     const el= ev.target;
//     valid(el);
//   });
// }

/* The above code is adding an event listener to the first input field. When the input field is
changed, the firstValid() function is called. */
first.addEventListener('change', () => {
  firstValid();
});

/* The above code is adding an event listener to the last input field. When the last input field is
changed, the lastValid() function is called. */
last.addEventListener('change', () => {
  lastValid();
});

/* The above code is adding an event listener to the email input field. When the user changes the value
of the email input field, the emailValid() function is called. */
email.addEventListener('change', () => {
  emailValid();
});

/* The above code is adding an event listener to the birthdate input field. When the user changes the
value of the input field, the birthdateValid() function is called. */
birthdate.addEventListener('change', () => {
  birthdateValid();
});

/* The above code is adding an event listener to the quantity input field. When the quantity input
field changes, the quantityValid() function is called. */
quantity.addEventListener('change', () => {
  quantityValid();
});

/* The above code is adding an event listener to the radioGroup variable. The event listener is
listening for an input event. When the input event is triggered, the isSelected function is called. */
radioGroup.addEventListener('change', () => {
  isSelected();
});

/* Adding an event listener to the checkbox group. */
checkboxGroup.addEventListener('change', () => {
  cguChecked();
});

// document.addEventListener('DOMContentLoaded', () => {});
