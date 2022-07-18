import createPopupBuilder from './map-popup-builder.js';
import {
  formatPrice,
  formatOfferType,
  formatCapacity,
  formatCheckHours
} from './format.js';

/**
 * Методы для создания карточки объявления.
 */
const popupBuilder = createPopupBuilder(
  document.querySelector('#card').content
);

/**
 * Создаст DOM-узел карточки объявления.
 * @param {Ad} ad
 */
function createPopupElement({offer, author}) {
  return popupBuilder
    .setContainer('.popup')
    .setAvatar('.popup__avatar', author.avatar)
    .setText({
      '.popup__title': offer.title,
      '.popup__text--address': offer.address,
      '.popup__text--price span': formatPrice(offer.price),
      '.popup__type': formatOfferType(offer.type),
      '.popup__text--capacity': formatCapacity(offer.rooms, offer.guests),
      '.popup__text--time': formatCheckHours(offer.checkin, offer.checkout),
      '.popup__description': offer.description
    })
    .setFeatures('.popup__features', offer.features)
    .setPhotos('.popup__photos',offer.photos)
    .getContainer();
}

export default createPopupElement;

