import { formatPlurals, endingsForGuests, endingsForRooms } from './util.js';

export const typesDictionary = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

/**
  * Создает DOM Элемент с характеристиками объекта для сдачи.
  * @constructor
  * @param {Object} объект объявления.
  * @return {HTMLElement} — карточка объявления на основе объекта.
*/
const createCard = (cardData) => {
  const cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');
  const cardElement = cardTemplate.cloneNode(true);
  const popupTitle = cardElement.querySelector('.popup__title');
  const popupTextAddress = cardElement.querySelector('.popup__text--address');
  const popupTextPrice = cardElement.querySelector('.popup__text--price');
  const popupType = cardElement.querySelector('.popup__type');
  const popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
  const popupTextTime = cardElement.querySelector('.popup__text--time');
  const popupAvatar = cardElement.querySelector('.popup__avatar');
  const popupDescription = cardElement.querySelector('.popup__description');
  const popupFeatures = cardElement.querySelectorAll('.popup__feature');
  const popupPhotos = cardElement.querySelector('.popup__photos');
  const popupPhoto = cardElement.querySelector('.popup__photo');

  // Обязательные поля
  popupTitle.textContent = cardData.offer.title;
  popupTextAddress.textContent = cardData.offer.address;
  popupTextPrice.textContent =`${cardData.offer.price} ₽/ночь`;
  popupType.textContent = typesDictionary[cardData.offer.type];
  popupTextCapacity.textContent = `${cardData.offer.rooms} комнат${formatPlurals(cardData.offer.rooms, endingsForRooms)} для ${cardData.offer.guests} гост${formatPlurals(cardData.offer.guests, endingsForGuests)}`;
  popupTextTime.textContent = `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkout}`;
  popupAvatar.src = cardData.author.avatar;

  // Необязательные поля
  popupDescription.textContent = cardData.offer.description ? cardData.offer.description : popupDescription.classList.add('hidden');

  const featureModifiers = cardData.offer.features.map((objectFeature) =>`popup__feature--${objectFeature}`);
  popupFeatures.forEach((feature) => {
    const modifier = feature.classList[1];

    if (!featureModifiers.includes(modifier)) {
      feature.remove();
    }
  });

  const photosList = cardData.offer.photos;
  if (photosList.length === 1) {
    popupPhoto.src = photosList[0];
  }
  else if (photosList.length > 1){
    popupPhoto.src = photosList[0];
    for (let i = 0; i < photosList.length-1;i++) {
      const newPhoto = popupPhoto.cloneNode();
      newPhoto.src = photosList[i+1];
      popupPhotos.append(newPhoto);
    }
  }
  else {
    popupPhotos.classList.add('hidden');
  }

  return cardElement;
};

export {createCard};
