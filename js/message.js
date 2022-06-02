/**
 * It adds an error message to the form field if it doesn't already have one
 * @param {HTMLInputElement} el - the element that triggered the event
 * @param {String} message - the error message to display
 * @returns the value of the variable eltLastChild.
 */
export function setErrMsg(el, message) {
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
export function removeErrMsg(el) {
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
