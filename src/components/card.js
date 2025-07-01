function createCard(card, userId, handleDeleteClick, handleImageClick, handleLikeClick) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector('.card__like-count');
  likeCount.textContent = card.likes.length;

  if (card.likes.some(like => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener('click', () => handleLikeClick(card, likeButton, likeCount));

  if (card.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => handleDeleteClick(card._id, cardElement));
  }

  cardImage.addEventListener('click', () => handleImageClick(card.link, card.name));

  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  cardImage.alt = `Здесь должен быть пейзаж: ${card.name}`;

  return cardElement;
}

export {createCard};