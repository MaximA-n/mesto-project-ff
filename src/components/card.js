function deleteCard(card) {
  card.remove()
}

function createCard(card, deleteCard, handleImageClick) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  
  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  cardImage.addEventListener('click', () => handleImageClick(card.link, card.name));

  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  cardImage.alt = `Здесь должен быть пейзаж: ${card.name}`;

  return cardElement;
}

export {deleteCard, createCard};