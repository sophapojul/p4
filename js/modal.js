/* eslint-disable no-alert */
// function editNav() {
//   const x = document.getElementById('myTopnav');
//   if (x.className === 'topnav') {
//     x.className += ' responsive';
//   } else {
//     x.className = 'topnav';
//   }
// }

// DOM Elements
// const modalBtn = document.querySelectorAll('.modal-btn');
// const formData = document.querySelectorAll('.formData');
const reserve = document.querySelector('#reserve');
const first = document.querySelector('#first');
const last = document.querySelector('#last');
const email = document.querySelector('#email');
const birthdate = document.querySelector('#birthdate');
const quantity = document.querySelector('#quantity');
const radioGroup = document.querySelector('#formRadio');
const checkboxGroup = document.querySelector('#formMentions');

const emptyMsg = 'Le champ ne peut-être vide';
const firstErrMsg = 'Prénom doit contenir au moins 2 caractères alphabétiques';
const lastErrMsg = 'Nom doit contenir au moins 2 caractères alphabétiques';
const emailErrMsg =
  'Email doit être au format X@X.xx(x) où X contient plusieurs caractères';
const birthdateErrMsg =
  'Birthdate doit être une date valide, inférieure à 2013';
const quantityErrMsg = 'Vous devez saisir un nombre entier inférieur à 100';
const radiosErrMsg = 'Vous devez choisir une ville';
const cguErrMsg = 'Vous devez avoir lu et accepté les cgu';

const firstRegExp = /^[-a-zA-Z']{2,20}$/i;
const lastRegExp = /^[-a-zA-Z'\s]{2,20}$/i;
const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.[a-z]{2,3})+$/i;
const birthdateRegExp = /^(190[0-9]|19[1-9][0-9]|200[0-9]|201[0-2])/;
const quantityRegExp = /^(0?\d|[1-9]\d)$/;

const triggers = document.querySelectorAll('[aria-haspopup="dialog"]');
const modalClose = document.querySelector('.modal-close');

let modal = null;

// function stopPropagation(e) {
//   e.stopPropagation();
// }

/**
 * It closes the modal, removes the event listeners, and restores focus to the trigger
 * @param {HTMLElement} modal - the modal element
 * @param {HTMLElement} trigger - the button that triggered the modal
 */
const closeModal = (modalElt, trigger) => {
  // const bouton = document.getElementById(trigger.dialog);
  // eslint-disable-next-line no-param-reassign
  modalElt.style.display = 'none';
  modalElt.setAttribute('aria-hidden', true);
  modalElt.removeAttribute('aria-modal');
  // modalForm.removeEventListener('click', closeModal);
  modalClose.removeEventListener('click', closeModal);
  // modalContent.removeEventListener('click', stopPropagation);
  modal = null;
  // restoring focus
  trigger.focus();
  return modal;
};

/* The above code is listening for a keydown event. If the key pressed is the escape key, the
closeModal function is called. */
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal(e);
  }
  // if (e.key === 'Tab') {
  //   blockFocusInModal(e);
  // }
});

/**
 * It opens a modal
 * @param modalElt - the modal element
 */
const openModal = (modalElt) => {
  // eslint-disable-next-line no-param-reassign
  modalElt.style.display = 'block';
  modalElt.removeAttribute('aria-hidden');
  modalElt.setAttribute('aria-modal', true);
  // modalForm.addEventListener('click', closeModal);
  modalClose.addEventListener('click', closeModal);
  // modalContent.addEventListener('click', stopPropagation);
  modal = modalElt;
  return modal;
};

/**
 * It adds an event listener to each trigger element, which opens the modal when the trigger is clicked or Enter is pressed, which closes the modal when the trigger is clicked or Escape is pressed.
 */
const triggerElt = () => {
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', openModal);
    const dialog = document.getElementById('dialog');
    const dismissTriggers = dialog.querySelectorAll('[data-dismiss]');
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openModal(dialog);
    });
    trigger.addEventListener('keydown', (event) => {
      if (event.code === 'Enter') {
        event.preventDefault();
        openModal(dialog);
      }
    });
    /* Closing the modal when the user clicks on the button. */
    dismissTriggers.forEach((dismissTrigger) => {
      const dismissModal = document.getElementById('dismissModal');
      dismissTrigger.addEventListener('click', (event) => {
        event.preventDefault();
        closeModal(dismissModal);
      });
    });
    dialog.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        closeModal(dialog, trigger);
      }
    });
    //   window.addEventListener('click', (event) => {
    //     if (event.target === dialog) {
    //       closeModal(dialog);
    //     }
    //   });
    return trigger;
  });
};

function setErrMsg(elt, message) {
  const eltLastChild = elt.parentElement.lastChild;
  // test présence d'un message d'erreur
  if (eltLastChild.nodeName === 'SMALL') {
    return;
  } // sinon création du message d'erreur :
  // création de l'élément contenant le message
  const errElt = document.createElement('small');
  // ajout du message à l'élément créé
  errElt.textContent = message; // 'Votre prénom doit contenir au moins 2 lettres';
  elt.parentElement.insertAdjacentElement('beforeend', errElt);
  // ajout de la classe invalid au parent
  elt.parentElement.classList.add('invalid');
}

/**
 * It removes the error message and replaces the class `invalid` by the class `valid` on the parent
 * element of the element passed as argument
 * @param elt - the element that triggered the event
 */
function removeErrMsg(elt) {
  const eltLastChild = elt.parentElement.lastChild;
  // test présence d'un message d'erreur
  if (eltLastChild.nodeName === 'SMALL') {
    // suppression du message d'erreur
    eltLastChild.remove();
    // remplacement de la classe invalid par la classe valid sur le parent
    elt.parentElement.classList.remove('invalid');
    elt.parentElement.classList.add('valid');
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

/**
 * If the input is not empty, remove the error message and return true, otherwise set the error message
 * and return false
 * @param selector - The input element that is being validated.
 * @returns A boolean value.
 */
function notEmpty(selector) {
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
      if (
        birthdate.value.length !== 10 ||
        new Date(selector.value).toString() === 'Invalid Date'
      ) {
        setErrMsg(birthdate, birthdateErrMsg);
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
      return false;
    default:
      return false;
  }
}

/**
 * It validates the value of an input element against a regular expression and displays an error
 * message if the value is invalid
 * @param elt - The element to validate.
 * @param errMsg - The error message to display if the input is invalid.
 * @param regExp - The regular expression to test the value against.
 * @returns A boolean value.
 */
function valid(elt, errMsg, regExp) {
  const { value } = elt;
  if (!notEmpty(elt)) return false;
  if (regExp) {
    if (testRegExp(value, regExp)) {
      removeErrMsg(elt);
      return true;
    }
    setErrMsg(elt, errMsg);
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
    if (
      birthdate.value.length !== 10 ||
      toTestDate.toString() === 'Invalid Date'
    ) {
      setErrMsg(birthdate, birthdateErrMsg);

      return false;
    }
    // if (toTestDate.getFullYear() < 2012)
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
    }
    return true;
  }
  if (document.querySelector('#formRadio').nextSibling.nodeName !== 'SMALL') {
    const errElt = document.createElement('small');
    errElt.textContent = radiosErrMsg;
    document
      .querySelector('#formRadio')
      .insertAdjacentElement('afterend', errElt);
    document.querySelector('#formRadio').nextSibling.style.fontSize = '1rem';
    document.querySelector('#formRadio').nextSibling.style.color = 'red';
    return false;
  }
  return selected;
}

/**
 * It checks if the checkbox is checked, if not, it displays an error message, if it is, it removes the
 * error message
 * @returns A boolean value.
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
 * @returns A boolean value.
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
triggerElt();
reserve.addEventListener('submit', (ev) => {
  ev.preventDefault();
  validate();
});
// const inputs = document.querySelectorAll('input');
// for (let i = 0; i < inputs.length; i += 1) {
//   inputs[i].addEventListener('input', () => {
//     valid(this);
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
radioGroup.addEventListener('input', () => {
  isSelected();
});

/* Adding an event listener to the checkbox group. */
checkboxGroup.addEventListener('input', () => {
  cguChecked();
});

// document.addEventListener('DOMContentLoaded', () => {});
