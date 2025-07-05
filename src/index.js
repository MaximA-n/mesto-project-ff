import './pages/index.css';

import {createCard} from './components/card.js';

import {openPopup, closePopup} from './components/modal.js';

import {getUserInfo, getInitialCards, editUserInfo, addNewCard, apiDeleteCard, likeCard, unlikeCard, updateAvatar} from './components/api.js';

import {clearValidation, enableValidation} from './components/validation.js';

const configValidation = {
  formSelector: ".popup__form",
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const placesList = document.querySelector(".places__list");

const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const deletePopup = document.querySelector(".popup_type_delete");
const deleteForm = deletePopup.querySelector('form[name="confirm-delete"]');

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");

const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");

const formProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image")

const formNewPlace = document.querySelector('form[name="new-place"]');
const inputCard = formNewPlace.querySelector('.popup__input_type_card-name');
const inputUrl = formNewPlace.querySelector('.popup__input_type_url');

const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = avatarPopup.querySelector('form[name="edit-avatar"]');
const avatarInput = avatarPopup.querySelector('.popup__input_type_avatar');

enableValidation(configValidation);

function renderLoading(isLoading, button, defaultText = 'Сохранить') {
  if (isLoading) {
    button.textContent = 'Сохранение...';
    button.disabled = true;
  } else {
    button.textContent = defaultText;
    button.disabled = false;
  }
}

let idCardForDelete;
let cardForDelete;

function handleDeleteClick(id, card) {
  idCardForDelete = id;
  cardForDelete = card;
  openPopup(deletePopup);
}

deleteForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  apiDeleteCard(idCardForDelete)
    .then(() => {
      cardForDelete.remove();
      cardForDelete = null;
      closePopup(deletePopup);
    })
    .catch(err => console.error('Ошибка удаления:', err));
});

editButton.addEventListener('click', () => {  
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formProfile, configValidation);
  openPopup(editPopup);
});

addButton.addEventListener('click', () => {
  formNewPlace.reset();
  clearValidation(formNewPlace, configValidation);  
  openPopup(addPopup);
});

function handleImageClick(link, name) {
  popupImage.src = link;
  popupCaption.textContent = name;
  popupImage.alt = `Здесь должен быть пейзаж: ${name}`;

  openPopup(imagePopup);
}

let userId = null;

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;

    cards.forEach(card => {
      const cardElement = createCard(card, userId, handleDeleteClick, handleImageClick, handleLikeClick);
      placesList.append(cardElement);
    });
  })
  .catch(err => {
    console.error('Ошибка при загрузке данных:', err);
  });

function handleProfileEdit(evt) {
  evt.preventDefault();

  const button = formProfile.querySelector('.popup__button');
  renderLoading(true, button);

  const name = nameInput.value;
  const about = jobInput.value;

  editUserInfo(name, about)
    .then(userData => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closePopup(editPopup);
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    })
    .finally(() => {
      renderLoading(false, button);
    });
}

function handleCardAdd(evt) {
  evt.preventDefault();

  const button = formNewPlace.querySelector('.popup__button');
  renderLoading(true, button);

  const name = inputCard.value;
  const link = inputUrl.value;

  addNewCard(name, link)
    .then(card => {
      placesList.prepend(createCard(card, userId, handleDeleteClick, handleImageClick, handleLikeClick));
      closePopup(addPopup);
      formNewPlace.reset();
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    })
    .finally(() => {
      renderLoading(false, button);
    });
}

function handleLikeClick(card, likeButton, likeCount) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const apiCall = isLiked ? unlikeCard : likeCard;

  apiCall(card._id)
    .then(updatedCard => {
      likeCount.textContent = updatedCard.likes.length;
      if (updatedCard.likes.some(like => like._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
      } else {
        likeButton.classList.remove('card__like-button_is-active');
      }
      card.likes = updatedCard.likes;
    })
    .catch(err => {
      console.error('Ошибка постановки/снятия лайка:', err);
    });
}

profileImage.addEventListener('click', () => {
  avatarForm.reset();
  clearValidation(avatarForm, configValidation);
  openPopup(avatarPopup);
});

profileImage.addEventListener('mouseenter', () => {
  profileImage.classList.add('profile__image_hover');
});

profileImage.addEventListener('mouseleave', () => {
  profileImage.classList.remove('profile__image_hover');
});

function handleAvatarEdit(evt) {
  evt.preventDefault();

  const avatarButton = avatarForm.querySelector('.popup__button');
  renderLoading(true, avatarButton);

  const avatarUrl = avatarInput.value;

  updateAvatar(avatarUrl)
    .then(userData => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(avatarPopup);
      avatarForm.reset();
    })
    .catch(err => {
      showInputError(avatarForm, avatarInput, 'Ошибка обновления аватара');
    })
    .finally(() => {
      renderLoading(false, avatarButton);
    });
}

avatarForm.addEventListener('submit', handleAvatarEdit);
formProfile.addEventListener('submit', handleProfileEdit);
formNewPlace.addEventListener('submit', handleCardAdd);