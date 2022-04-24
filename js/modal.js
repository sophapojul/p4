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

function setErrMsg(field, message) {
  // selection du champ d'affichage d'erreur
  const textControl = field.parentElement;
  const small = textControl.querySelector('small');
  // ajout du message d'erreur
  small.innerText = message;
  // ajout de la classe invalid
  textControl.className = 'formData invalid';
}

function firstValid(textLength, mini) {
  if (textLength === 0 || textLength < mini) {
    const errMsg =
      'Le champ Prénom ne peut être vide ou inférieur à 2 caractères';
    setErrMsg(first, errMsg);
    return false;
  }
  return true;
}

function validate(e) {
  const firstValue = first.value.trim();
  const firstLen = firstValue.length;
  // const lastValue = last.value.trim();
  // const emailValue = email.value.trim();
  // const birthdateValue = new Date(birthdate.value.trim());
  // const quantityValue = quantity.value.trim();

  if (firstValid(firstLen, 2)) {
    console.log('firstLen:', firstLen);
    return true;
  }
  console.log('firstLen:', firstLen);
  e.preventDefault();
  return false;
}

function submit(e) {
  const valid = validate();
  if (!validate()) {
    e.preventDefault();
    alert('valid:', valid);
    return false;
  }
  return true;
}

reserve.addEventListener('submit', validate);
first.addEventListener('blur', () => {
  firstValid(first.value.trim().length, 2);
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

// TODO tester si le champ texte (nom, prénom) a une longueur inférieure à 2
// récupérer le contenu du champ puis sa longueur
// const firstValue = first.value.trim();
// const firstLen = firstValue.length;
// console.log(firstValid(firstLen, 2), firstValue.length);
