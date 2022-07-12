import {
  formatPrice,
  formatOfferType,
  formatCapacity,
  formatCheckHours
} from './format.js';

/**
 * @type {DocumentFragment}
 */
const mapPopupTemplateContent = document.querySelector('#card').content;

/**
 * Создаст DOM-узел карточки объявления.
 * @param {Ad} ad
 */
function createMapPopupElement({offer, author}) {
  const rootNode = mapPopupTemplateContent.querySelector('.popup').cloneNode(true);

  // Аватарка
  rootNode.querySelector('.popup__avatar').src = author.avatar;

  // Текстовые элементы
  const textBySelector = {
    '.popup__title': offer.title,
    '.popup__text--address': offer.address,
    '.popup__text--price span': formatPrice(offer.price),
    '.popup__type': formatOfferType(offer.type),
    '.popup__text--capacity': formatCapacity(offer.rooms, offer.guests),
    '.popup__text--time': formatCheckHours(offer.checkin, offer.checkout),
    '.popup__description': offer.description
  };

  Object.keys(textBySelector).forEach((key) => {
    const node = rootNode.querySelector(key);
    if (textBySelector[key]) {
      node.textContent = textBySelector[key];
    } else {
      node.remove();
    }
  });

  // Иконки удобств
  const featuresRootNode = rootNode.querySelector('.popup__features');
  if (offer.features === undefined || !offer.features.length) {
    featuresRootNode.remove();
  }
  else {
    const selectors = offer.features.map((name) => `.popup__feature--${name}`);
    featuresRootNode.replaceChildren(...featuresRootNode.querySelectorAll(selectors));
  }

  // Фотографии
  const photosRootNode = rootNode.querySelector('.popup__photos');
  if (offer.photos === undefined || !offer.photos.length) {
    photosRootNode.remove();
  }
  else {
    const placeholderNode = rootNode.querySelector('.popup__photo');
    const photosNode = offer.photos.map((src) => {
      const node = placeholderNode.cloneNode();
      return Object.assign(node, {src});
    });
    photosRootNode.replaceChildren(...photosNode);
  }

  return rootNode;
}

export default createMapPopupElement;

