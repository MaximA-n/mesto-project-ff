function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

function handleBasicClose(modal) {
  modal.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')|| evt.target.classList.contains('popup')) {
      closePopup(evt.currentTarget);
    }
  });
}

function handleEscClose(modal) {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(modal);
    }
  });
}

export {openPopup, closePopup, handleBasicClose, handleEscClose};