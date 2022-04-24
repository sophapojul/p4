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
  console.log(e.key);
  if (e.key === 'Escape' || e.key === 'Esc') {
    closeModal();
  }
});
