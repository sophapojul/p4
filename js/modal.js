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
const modalBg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');
const modalClose = document.querySelector('.close');
const reserve = document.querySelector('#reserve');
const first = document.querySelector('#first');
const last = document.querySelector('#last');
const email = document.querySelector('#email');
const birthdate = document.querySelector('#birthdate');
const quantity = document.querySelector('#quantity');
const inputs = [first, last, email, birthdate, quantity];
const radios = reserve.location;
const locations = [
  'New York',
  'San Francisco',
  'Seattle',
  'Chicago',
  'Boston',
  'Portland'
];
const checkboxes = reserve.checkbox;

const firstErrMsg = 'Prénom doit contenir au moins 2 caractères alphabétiques';
const lastErrMsg = 'Nom doit contenir au moins 2 caractères alphabétiques';
const emailErrMsg = 'Email doit être un email au format X@X.X';
const birthdateErrMsg = 'Birthdate doit être une date valide, avant 2013';
const quantityErrMsg = 'Vous devez saisir un nombre entier';
const radiosErrMsg = 'Vous devez choisir une ville';

const firstRegExp = /^[-a-zA-Z']{2,20}$/i;
const lastRegExp = /^[-a-zA-Z']{2,20}$/i;
const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.[a-z]{2,3})+$/i;
const birthdateRegExp = /^(190[0-9]|19[1-9][0-9]|200[0-9]|201[0-2])/;
const quantityRegExp = /^\d+$/;

function setErrMsg(elt, message) {
  // test présence d'un message d'erreur
  if (elt.parentElement.lastChild.nodeName === 'SMALL') {
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
  // test présence d'un message d'erreur
  if (elt.parentElement.lastChild.nodeName === 'SMALL') {
    // suppression du message d'erreur
    elt.parentElement.lastChild.remove();
    // remplacement de la classe invalid par la classe valid sur le parent
    elt.parentElement.classList.remove('invalid');
    elt.parentElement.classList.add('valid');
  }
}

function testRegExp(value, regExp) {
  if (regExp.test(value)) {
    return true;
  }
  return false;
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
    elt.focus();
    return false;
  }
  return false;
}

function firstValid() {
  if (valid(first, firstErrMsg, firstRegExp)) {
    return true;
  }
  return false;
}

function lastValid() {
  if (valid(last, lastErrMsg, lastRegExp)) {
    return true;
  }
  return false;
}

function emailValid() {
  if (valid(email, emailErrMsg, emailRegExp)) {
    return true;
  }
  return false;
}

function birthdateValid() {
  if (valid(birthdate, birthdateErrMsg, birthdateRegExp)) {
    return true;
  }
  return false;
}

function quantityValid() {
  if (valid(quantity, quantityErrMsg, quantityRegExp)) {
    return true;
  }
  return false;
}

function isSelected() {
  if (Array.from(radios).filter((elt) => elt.checked).length) {
    if (reserve.children['6'].nodeName === 'SMALL') {
      reserve.children['6'].remove();
      return true;
    }
    return true;
  }
  if (reserve.children['6'].nodeName !== 'SMALL') {
    const errElt = document.createElement('small');
    errElt.textContent = radiosErrMsg;
    reserve.children['5'].insertAdjacentElement('afterend', errElt);
    reserve.children['6'].style.fontSize = '1rem';
    reserve.children['6'].style.color = 'red';
  }
  return false;
}

function radiosValid() {
  radios.forEach((radio) => radio.addEventListener('change', isSelected));
  return isSelected();
}

function validate() {
  if (
    firstValid() &&
    lastValid() &&
    emailValid &&
    birthdateValid() &&
    quantityValid() &&
    isSelected() &&
    radiosValid
  ) {
    return true;
  }
  return false;
}
reserve.addEventListener(
  'submit',
  (e) => {
    if (!validate()) {
      e.preventDefault();
    }
  },
  false
);
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

document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll('[aria-haspopup="dialog"]');
  const doc = document.querySelector('main');
  const focusableElementsArray = [
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ];

  // close modal
  const closeModal = (modal, trig) => {
    doc.setAttribute('aria-hidden', false);
    modalBg.style.display = 'none';
    modal.removeAttribute('aria-modal');
    modal.setAttribute('aria-hidden', true);

    // restoring focus
    trig.focus();
  };

  const openModal = (modal) => {
    const focusableElements = modal.querySelectorAll(focusableElementsArray);
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
      focusableElements[focusableElements.length - 1];

    doc.setAttribute('aria-hidden', true);
    modalBg.style.display = 'block';
    modal.setAttribute('aria-hidden', false);
    modal.setAttribute('aria-modal', true);

    // return if no focusable element
    if (!firstFocusableElement) {
      return;
    }

    window.setTimeout(() => {
      firstFocusableElement.focus();

      // trapping focus inside the dialog
      focusableElements.forEach((focusableElement) => {
        if (focusableElement.addEventListener) {
          focusableElement.addEventListener('keydown', (event) => {
            const tab = event.code === 'Tab';

            if (!tab) {
              return;
            }

            if (event.shiftKey) {
              if (event.target === firstFocusableElement) {
                // shift + tab
                event.preventDefault();

                lastFocusableElement.focus();
              }
            } else if (event.target === lastFocusableElement) {
              // tab
              event.preventDefault();

              firstFocusableElement.focus();
            }
          });
        }
      });
    }, 100);
  };

  triggers.forEach((trigger) => {
    const dialog = document.getElementById('dialog');
    const dismissTriggers = dialog.querySelectorAll('[data-dismiss]');

    // open modal
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

    // close modal
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

    window.addEventListener('click', (event) => {
      if (event.target === dialog) {
        closeModal(dialog);
      }
    });
  });
});
