// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const addButton = document.querySelector(".profile__add-button");
const placesList = document.querySelector(".places__list");

initialCards.forEach(card => {
  placesList.append(createCard(card, deleteCard));
});

function deleteCard(card) {
  card.remove()
}

function createCard(card, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__description");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener('click', () => deleteCard(cardElement))

  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  cardImage.alt = "Здесь должен быть пейзаж";

  return cardElement;
}