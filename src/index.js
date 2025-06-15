import './pages/index.css';

import {initialCards} from './components/cards.js';

import {deleteCard, createCard} from './components/card.js';

import {openPopup, closePopup} from './components/modal.js';

const placesList = document.querySelector(".places__list");

const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");

const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");

const modals = document.querySelectorAll(".popup");

const formProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const formNewPlace = document.querySelector('form[name="new-place"]');
const inputCard = formNewPlace.querySelector('.popup__input_type_card-name');
const inputUrl = formNewPlace.querySelector('.popup__input_type_url');

initialCards.forEach(card => {
  placesList.append(createCard(card, deleteCard, handleImageClick));
});

modals.forEach((modal) => {
  modal.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')|| evt.target.classList.contains('popup')) {
      closePopup(modal);
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(modal);
    }
  });
})

editButton.addEventListener('click', () => {  
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editPopup);
});

addButton.addEventListener('click', () => openPopup(addPopup));

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(editPopup);
}

formProfile.addEventListener('submit', handleFormSubmit);

function handleCardAdd(evt) {
  evt.preventDefault();

  const newCard = {
    name: inputCard.value, 
    link: inputUrl.value
  };
  
  const createNewCard = createCard(newCard, deleteCard, handleImageClick);
  
  placesList.prepend(createNewCard);

  closePopup(addPopup);

  formNewPlace.reset();
}

formNewPlace.addEventListener('submit', handleCardAdd);

function handleImageClick(link, name) {
  popupImage.src = link;
  popupCaption.textContent = name;
  popupImage.alt = `Здесь должен быть пейзаж: ${name}`;

  openPopup(imagePopup);
}