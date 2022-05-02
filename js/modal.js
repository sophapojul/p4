/* eslint-disable no-alert */
function editNav() {
  const x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// DOM Elements
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');
const reserve = document.querySelector('#reserve');
const first = document.querySelector('#first');
const last = document.querySelector('#last');
const email = document.querySelector('#email');
const birthdate = document.querySelector('#birthdate');
const quantity = document.querySelector('#quantity');
const radioGroup = document.querySelector('#formRadio');
const checkboxGroup = document.querySelector('#formMentions');
const locations = document.querySelectorAll('input[name="location"]');

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

function testRegExp(value, regExp) {
  const testedValue = regExp.test(value);
  return !!testedValue;
}

function valid(elt, errMsg, regExp) {
  // TODO if no regExp else testing if elt.checked
  const { value } = elt;
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

function notNull(data) {
  return !!data.value;
}

function notEmpty(data) {
  const dataLength = data.value.length;
  return dataLength > 0;
}

function firstValid() {
  if (!notNull(first)) {
    return false;
  }
  if (notEmpty(first)) {
    return valid(first, firstErrMsg, firstRegExp);
  }
  return false;
}

function lastValid() {
  if (!notNull(last)) {
    return false;
  }
  if (notEmpty(last)) {
    return valid(last, lastErrMsg, lastRegExp);
  }
  return false;
}

function emailValid() {
  if (!notNull(email)) {
    return false;
  }
  if (notEmpty(email)) {
    return valid(email, emailErrMsg, emailRegExp);
  }
  return false;
}

function birthdateValid() {
  const toTestDate = new Date(birthdate.value);
  if (!notNull(birthdate)) {
    return false;
  }
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

function quantityValid() {
  if (!notNull(quantity)) {
    return false;
  }
  if (notEmpty(quantity))
    if (valid(quantity, quantityErrMsg, quantityRegExp)) {
      return true;
    }
  return false;
}

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
function cguChecked() {
  const cgu = document.querySelector('#checkbox1');
  if (!cgu.checked) {
    setErrMsg(cgu, cguErrMsg);
    return false;
  }
  removeErrMsg(cgu);
  return cgu.checked;
}
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
reserve.addEventListener('submit', (ev) => {
  ev.preventDefault();
  validate();
  // if (validate()) {
  //   window.location = './';
  // }
});
// const inputs = document.querySelectorAll('change');
// for (let i = 0; i < inputs.length; i += 1) {
//   inputs[i].addEventListener('change', () => {
//     valid(this);
//   });
// }
first.addEventListener('input', () => {
  firstValid();
});
last.addEventListener('input', () => {
  lastValid();
});
email.addEventListener('input', () => {
  emailValid();
});
birthdate.addEventListener('input', () => {
  birthdateValid();
});
quantity.addEventListener('input', () => {
  quantityValid();
});
radioGroup.addEventListener('input', () => {
  isSelected();
});
checkboxGroup.addEventListener('input', () => {
  cguChecked();
});
document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll('[aria-haspopup="dialog"]');
  const modalWrapper = document.querySelectorAll('.modal');

  const modalForm = document.getElementById('dialog');
  const modalContent = document.querySelector('.modal-content');
  const modalClose = document.querySelector('.modal-close');
  const modalBody = document.querySelector('.modal-body');
  let modal = null;
  const focusableSelector = 'input, span, button';
  let focusableElements = [];
  // const doc = document.querySelector('main');
  // const focusableElementsArray = [
  //   'input:not([disabled])',
  //   'select:not([disabled])',
  //   '[tabindex]:not([tabindex="-1"])'
  // ];
  function stopPropagation(e) {
    e.stopPropagation();
  }

  // close modal
  const closeModal = (e) => {
    e.preventDefault();
    modalForm.style.display = 'none';
    modalForm.setAttribute('aria-hidden', true);
    modalForm.removeAttribute('aria-modal');
    modalForm.removeEventListener('click', closeModal);
    modalClose.removeEventListener('click', closeModal);
    modalContent.removeEventListener('click', stopPropagation);
    modal = null;
    // restoring focus
    // trig.focus();
  };

  const openModal = (e) => {
    e.preventDefault();
    focusableElements = Array.from(
      modalBody.querySelectorAll(focusableSelector)
    );
    console.log(focusableElements);
    // const firstFocusableElement = focusableElements[0];
    // const lastFocusableElement =
    //   focusableElements[focusableElements.length - 1];

    // doc.setAttribute('aria-hidden', true);
    modalForm.style.display = 'block';
    modalForm.removeAttribute('aria-hidden');
    modalForm.setAttribute('aria-modal', true);
    modalForm.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
    modalContent.addEventListener('click', stopPropagation);
    modal = modalForm;
    // return if no focusable element
    // if (!firstFocusableElement) {
    //   return;
    // }

    // window.setTimeout(() => {
    //   firstFocusableElement.focus();

    //   // trapping focus inside the dialog
    //   focusableElements.forEach((focusableElement) => {
    //     if (focusableElement.addEventListener) {
    //       focusableElement.addEventListener('keydown', (event) => {
    //         const tab = event.code === 'Tab';

    //         if (!tab) {
    //           return;
    //         }

    //         if (event.shiftKey) {
    //           if (event.target === firstFocusableElement) {
    //             // shift + tab
    //             event.preventDefault();

    //             lastFocusableElement.focus();
    //           }
    //         } else if (event.target === lastFocusableElement) {
    //           // tab
    //           event.preventDefault();

    //           firstFocusableElement.focus();
    //         }
    //       });
    //     }
    //   });
    // }, 100);
  };

  const blockFocusInModal = (e) => {
    e.preventDefault();
    let index = focusableElements.findIndex(
      (f) => f === modalForm.querySelector(':focus')
    );
    index += 1;
    if (index >= focusableElements.length) {
      index = 0;
    }
    focusableElements[index].focus();
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', openModal);
    //   const dialog = document.getElementById('dialog');
    //   const dismissTriggers = dialog.querySelectorAll('[data-dismiss]');
    //   // open modal
    //   trigger.addEventListener('click', (event) => {
    //     event.preventDefault();
    //     openModal(dialog);
    //   });
    //   trigger.addEventListener('keydown', (event) => {
    //     if (event.code === 'Enter') {
    //       event.preventDefault();
    //       openModal(dialog);
    //     }
    //   });
    //   // close modal
    //   dismissTriggers.forEach((dismissTrigger) => {
    //     const dismissModal = document.getElementById('dismissModal');
    //     dismissTrigger.addEventListener('click', (event) => {
    //       event.preventDefault();
    //       closeModal(dismissModal);
    //     });
    //   });
    //   dialog.addEventListener('keydown', (event) => {
    //     if (event.code === 'Escape') {
    //       closeModal(dialog, trigger);
    //     }
    //   });
    //   window.addEventListener('click', (event) => {
    //     if (event.target === dialog) {
    //       closeModal(dialog);
    //     }
    //   });
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(e);
    }
    if (e.key === 'Tab') {
      blockFocusInModal(e);
    }
  });
});
