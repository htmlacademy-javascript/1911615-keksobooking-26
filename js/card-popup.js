import {getRandomNumber} from './util.js';
import {generateObjects} from './data.js';

const TYPES_DICTIONARY = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const mapCanvas = document.querySelector('#map-canvas');
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

const randomObjects = generateObjects();

const createCard = (index) => {
  const currentObject = randomObjects[index];

  // Обязательные поля
  popupTitle.textContent = currentObject.offer.title;
  popupTextAddress.textContent = currentObject.offer.address;
  popupTextPrice.textContent =`${currentObject.offer.price} ₽/ночь`;
  popupType.textContent = TYPES_DICTIONARY[currentObject.offer.type];
  popupTextCapacity.textContent = `${currentObject.offer.rooms} комнаты для ${currentObject.offer.guests} гостей`;
  popupTextTime.textContent = `Заезд после ${currentObject.offer.checkin}, выезд до ${currentObject.offer.checkout}`;
  popupAvatar.src = currentObject.author.avatar;

  // Необязательные поля
  popupDescription.textContent = currentObject.offer.description ? currentObject.offer.description : popupDescription.classList.add('hidden');

  const featureModifiers = currentObject.offer.features.map((objectFeature) =>`popup__feature--${objectFeature}`);
  popupFeatures.forEach((feature) => {
    const modifier = feature.classList[1];

    if (!featureModifiers.includes(modifier)) {
      feature.remove();
    }
  });

  const photosList = currentObject.offer.photos;
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

mapCanvas.appendChild(createCard(getRandomNumber(0,randomObjects.length-1)));
