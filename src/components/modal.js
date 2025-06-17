function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('click', handleBasicClose);
  document.addEventListener('keydown', handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('click', handleBasicClose);
  document.removeEventListener('keydown', handleEscClose);
}

function handleBasicClose(evt) { 
  const popupOpen = document.querySelector(".popup_is-opened"); 
  if ( 
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup") 
  ) { 
    closePopup(popupOpen); 
  } 
}

function handleEscClose(evt) {
  const popupOpen = document.querySelector(".popup_is-opened"); 
  if (evt.key === "Escape") { 
    closePopup(popupOpen); 
  } 
}

export {openPopup, closePopup};