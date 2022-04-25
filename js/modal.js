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

const errMsgFirst = 'Prénom doit contenir au moins 2 lettres';
const errMsgLast = 'Nom doit contenir au moins 2 lettres';
const errMsgEmail = 'Email doit être un email au format X@X.X';
const errMsgBirthdate = 'Birthdate ne  doit être un email au format X@X.X';

const minFirst = 2;
const minLast = 2;

function test() {
  [...reserve].map((formItem) => formItem.getAttribute('id'));
}

function setErrMsg(elt, message) {
  // test présence d'un message d'erreur
  if (elt.parentElement.lastChild.textContent.trim()) {
    return;
  } // sinon création du message d'erreur :
  // création de l'élément contenant le message
  const errDiv = document.createElement('div');
  // ajout du message à l'élément créé
  errDiv.textContent = message; // 'Votre prénom doit contenir au moins 2 lettres';
  // add div to DOM
  // first.after(errDiv, errMsgFirst);
  elt.parentElement.insertAdjacentElement('beforeend', errDiv);
  // ajout de la classe invalid au parent
  elt.parentElement.classList.add('invalid');
}

function removeErrMsg(elt) {
  // test présence d'un message d'erreur
  if (elt.nextSibling) {
    // suppression du message d'erreur
    elt.nextSibling.remove();
    // remplacement de la classe invalid par la classe valid sur le parent
    elt.parentElement.classList.remove('invalid');
    elt.parentElement.classList.add('valid');
  }
}

function miniLength(elt, min) {
  const value = elt.value.trim();
  // test longueur de la valeur de l'élément
  if (value.length >= min && value.length !== 0) {
    return true;
  }
  return false;
}

function firstValid(elt, min) {
  if (!miniLength(elt, min)) {
    setErrMsg(elt, errMsgFirst);
    return false;
  }
  removeErrMsg(elt);
  return true;
}

function lastValid(elt, min) {
  const id = last;
  if (!miniLength(elt, min)) {
    setErrMsg(id, errMsgLast);
    return false;
  }
  removeErrMsg(id);
  return true;
}

function validate() {
  if (firstValid(first, minFirst)) {
    return true;
  }
  if (lastValid(last, minLast)) {
    return true;
  }
  return false;
}

function submit(e) {
  if (!validate()) {
    e.preventDefault();
    return false;
  }
  return true;
}

reserve.addEventListener('submit', validate);
first.addEventListener('keyup', () => {
  firstValid(first, minFirst);
});
last.addEventListener('keyup', () => {
  lastValid(last, minLast);
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
