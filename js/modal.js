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
const modalbg = document.querySelector('.bground');
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

const firstErrMsg = 'Prénom doit contenir au moins 2 caractères alphabétiques';
const lastErrMsg = 'Nom doit contenir au moins 2 caractères alphabétiques';
const emailErrMsg = 'Email doit être un email au format X@X.X';
const birthdateErrMsg = 'Birthdate doit être une date valide, avant 2013';
const quantityErrMsg = 'Vous devez saisir un nombre entier';
const radiosErrMsg = 'Vous devez choisir une ville';

const firstRegExp = /^[-a-zA-Z']{2,20}$/;
const lastRegExp = /^[-a-zA-Z']{2,20}$/;
const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.[a-z]{2,3})+$/;
const birthdateRegExp =
  /^(190[0-9]|19[1-9][0-9]|200[0-9]|201[0-2])-(0[1-9]|1[0-2])-(3[01]|[12][0-9]|[1-9])$/;
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
  // add div to DOM
  // first.after(errDiv, errMsgFirst);
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
  const { value } = elt;
  if (testRegExp(value, regExp)) {
    removeErrMsg(elt);
    return true;
  }
  setErrMsg(elt, errMsg);
  elt.focus();
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
      // return true;
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
  Array.from(radios).forEach((radio) =>
    radio.addEventListener('change', isSelected)
  );
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

// close modal form
function closeModal() {
  modalbg.style.display = 'none';
  modalbg.removeAttribute('aria-modal');
  modalbg.setAttribute('aria-hidden', 'true');
  modalClose.removeEventListener('click', closeModal);
}

// launch modal form
function launchModal() {
  modalbg.style.display = 'block';
  modalbg.removeAttribute('aria-hidden');
  modalbg.setAttribute('aria-modal', 'true');
  modalClose.addEventListener('click', closeModal);
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' || e.key === 'Esc') {
    closeModal();
  }
});
