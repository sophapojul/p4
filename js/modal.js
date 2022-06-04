/* eslint-disable no-param-reassign */
let modal = null;
let previousActiveElement = null;
/**
 * It traps the focus inside the dialog box
 * @param  {HTMLElement} el - The element that will be focused on when the dialog is opened.
 */
export function trapFocus(el) {
  /**
   *
   * @const focusableElts
   * @type {Array.<HTMLElement>}
   */
  const focusableElts = Array.from(
    el.querySelectorAll(
      'input,span[role=radio],span[role=checkbox],button[type=submit],button[data-dismiss=dialog],span[data-dismiss="dialog"]'
    )
  );
  /**
   *
   * @const firstFocusableElt
   * @type {HTMLElement}
   */
  const firstFocusableElt = focusableElts[0];
  /**
   *
   * @const lastFocusableElt
   * @type {HTMLElement}
   */
  const lastFocusableElt = focusableElts[focusableElts.length - 1];
  el.addEventListener('keydown', (ev) => {
    const isTabPressed = ev.key === 'Tab' || ev.code === '9';
    if (!isTabPressed) {
      return;
    }
    if (ev.shiftKey) {
      if (document.activeElement === firstFocusableElt) {
        /* shift + tab */
        lastFocusableElt.focus();
        ev.preventDefault();
      }
    } else if (document.activeElement === lastFocusableElt) {
      /* tab */
      firstFocusableElt.focus();
      ev.preventDefault();
    }
  });
}
/**
 * It closes the modal
 * @param  {Event}  ev - the event object
 */
export function closeModal(ev) {
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
  if (document.querySelector('#successModal')) {
    document.querySelector('#successModal').remove();
  }
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
export function setToOpenModal(el) {
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
 * @param   {KeyboardEvent | PointerEvent}  ev - the event object
 */
function openModal(ev) {
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
}
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
  // @ts-ignore
  trigger.addEventListener('click', openModal);
  /**
   *
   * @param {String} keydown
   * @param {KeyboardEvent} ev
   *
   */
  trigger.addEventListener('keydown', (ev) => {
    // @ts-ignore
    if (ev.key === 'Enter') {
      // @ts-ignore
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
 * It creates a modal window with a success message and displays it
 * @param   {String} firstname - the first name of the user
 * @param   {String} lastname - the last name of the user
 */
export function displaySuccessModal(firstname, lastname) {
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
        <h3><span>${firstname} ${lastname}</span> Merci pour votre inscription ! </h3>
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
