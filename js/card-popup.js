import {getRandomNumber} from './util.js';
import {randomObjects} from './data.js';

const typesDictionary = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALOW: 'Бунгало',
  HOTEL: 'Отель',
};

const mapCanvas = document.querySelector('#map-canvas');
const currentObject = randomObjects[getRandomNumber(0,randomObjects.length-1)];

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
  popupType.textContent = typesDictionary[cardData.offer.type.toLocaleUpperCase()];
  popupTextCapacity.textContent = `${cardData.offer.rooms} комнаты для ${cardData.offer.guests} гостей`;
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

mapCanvas.appendChild(createCard(currentObject));
