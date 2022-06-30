import './ad.js';

/**
 * Правило множественности.
 */
const pluralRules = new Intl.PluralRules('ru');

/**
 * Формат чисел.
 */
const numberFormat = new Intl.NumberFormat('ru');

/**
 * Словарь количества гостей.
 */
const guestsUnitByRule = {
  one: 'гостя',
  few: 'гостей',
  many: 'гостей',
  other: 'гостей'
};

/**
 * Словарь количества комнат.
 */
const roomsUnitByRule = {
  one: 'комната',
  few: 'комнаты',
  many: 'комнат',
};

/**
 * Словарь видов жилья.
 */
const offerNameByType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

/**
 * Вернет строку вида жилья.
 * @param {string} type
 */
function formatOfferType(type) {
  return offerNameByType[type] || '';
}

/**
 * Вернет строку стоимости жилья.
 * @param {number} price
 */
function formatPrice(price) {
  return numberFormat.format(price);
}

/**
 * Вернет строку количества комнат.
 * @param {number} rooms
 */
function formatRooms(rooms) {
  return `${rooms} ${roomsUnitByRule[pluralRules.select(rooms)]}`;
}

/**
 * Вернет строку количества гостей.
 * @param {number} guests
 */
function formatGuests(guests) {
  return `${guests} ${guestsUnitByRule[pluralRules.select(guests)]}`;
}

/**
 * Вернет строку вместительности жилья.
 * @param {number} rooms
 * @param {number} guests
 */
function formatCapacity(rooms, guests) {
  return `${formatRooms(rooms)} для ${formatGuests(guests)}`;
}

/**
 * Форматирует время заезда и выезда.
 * @param {string} checkin Время заезда.
 * @param {string} checkout Время выезда.
 */
function formatCheckHours(checkin, checkout) {
  return `Заезд после ${checkin}, выезд до ${checkout}`;
}

/**
 * @type {DocumentFragment}
 */
const cardTemplateNode = document.querySelector('#card').content;

/**
 * Создаст DOM-узел карточки объявления.
 * @param {Ad} ad
 */
function createCardNode({offer, author}) {
  const rootNode = cardTemplateNode.querySelector('.popup').cloneNode(true);

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
  if (offer.features.length) {
    const selectors = offer.features.map((name) => `.popup__feature--${name}`);
    featuresRootNode.replaceChildren(...featuresRootNode.querySelectorAll(selectors));
  } else {
    featuresRootNode.remove();
  }

  // Фотографии
  const photosRootNode = rootNode.querySelector('.popup__photos');
  if (offer.photos.length) {
    const placeholderNode = rootNode.querySelector('.popup__photo');
    const photosNode = offer.photos.map((src) => {
      const node = placeholderNode.cloneNode();
      return Object.assign(node, {src});
    });
    photosRootNode.replaceChildren(...photosNode);
  } else {
    photosRootNode.remove();
  }

  return rootNode;
}

export default createCardNode;

