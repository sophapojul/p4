/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable import/extensions */
import { displaySuccessModal, closeModal } from './modal.js';
import { valid, validate } from './validation.js';
/**
 * The above code is selecting the element with the id of reserve.
 *
 * @const  {HTMLFormElement}  reserve  inscription form
 */
const reserve = document.querySelector('#reserve');

/* The above code is adding an event listener to each of the radio buttons. When the user presses the
enter or space key, the radio button is checked. */
[...document.querySelectorAll('span[role="radio"]')].forEach((element) => {
  // [].slice.call() works in old browsers including IE6+
  element.addEventListener('keydown', (ev) => {
    // @ts-ignore
    if (ev.code === 'Enter' || ev.code === 'Space') {
      document.querySelector(
        `input[value="${document.activeElement.getAttribute('aria-label')}"]`
        // @ts-ignore
      ).checked = true;
      document
        .querySelector(
          `input[value="${document.activeElement.getAttribute('aria-label')}"]`
        )
        .nextElementSibling.firstElementChild.setAttribute(
          'aria-checked',
          'true'
        );
    }
  });
});
/* The above code is adding an event listener to each span element with the role of checkbox. The event
listener is listening for the enter or space key to be pressed. If the enter or space key is
pressed, the code will check the checkbox that is associated with the span element. */
Array.from(document.querySelectorAll('span[role="checkbox"]')).forEach(
  // ES6 the spread operator only works in newer browsers
  (element) => {
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
  }
);
/* Adding an event listener to each input element with the form attribute of "reserve" and calling the
valid function on each change. */
/**
 *
 * @param   {HTMLInputElement}  el
 *
 */
document.querySelectorAll('input[form="reserve"]').forEach((el) => {
  // NodeList is an Array-like object
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
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty('first') && data.hasOwnProperty('last')) {
      // @ts-ignore
      displaySuccessModal(data.first, data.last);
    }
  }
});
