import './ad.js';

const pluralRules = new Intl.PluralRules('ru');

const pluralsForGuests = new Map ([
  ['one', 'гостя'],
  ['few', 'гостей'],
  ['many', 'гостей'],
  ['other', 'гостей']
]);

const roomsUnitByRule = new Map ([
  ['one', 'комната'],
  ['few', 'комнаты'],
  ['many', 'комнат'],
  ['other', 'комнат']
]);

export const offerNameByType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

/**
 * Форматирует стоимость объявления.
 * @param {number} value Стоимость аренды.
 */
function formatPrice(value) {
  return `${value.toLocaleString('ru')} <span> ₽/ночь</span>`;
}

/**
 * Форматирует количество комнат и гостей.
 * @param {number} rooms Количество комнат.
 * @param {number} guests Количество гостей.
 */
function formatCapacity(rooms, guests) {
  const roomsEnding = roomsUnitByRule.get(pluralRules.select(rooms));
  const guestsEnding = pluralsForGuests.get(pluralRules.select(guests));
  return `${rooms} ${roomsEnding} для ${guests} ${guestsEnding}`;
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
 * @type {HTMLTemplateElement}
 */
const cardTemplate = document.querySelector('#card');

/**
 * Создает DOM Элемент с характеристиками объекта для сдачи.
 * @param {Ad} ad Объявление.
 */
function createCardNode({offer, author}) {
  const root = cardTemplate.content.cloneNode(true);

  // Аватарка
  root.querySelector('.popup__avatar').src = author.avatar;

  // Текстовые элементы
  const textBySelector = {
    '.popup__title': offer.title,
    '.popup__text--address': offer.address,
    '.popup__text--price': formatPrice(offer.price),
    '.popup__type': offerNameByType[offer.type],
    '.popup__text--capacity': formatCapacity(offer.rooms, offer.guests),
    '.popup__text--time': formatCheckHours(offer.checkin, offer.checkout),
    '.popup__description': offer.description
  };

  Object.keys(textBySelector).forEach((key) => {
    const node = root.querySelector(key);
    if (textBySelector[key]) {
      const propertyName = key.endsWith('price') ? 'innerHTML' : 'textContent';
      node[propertyName] = textBySelector[key];
    } else {
      node.remove();
    }
  });

  //Иконки удобств
  const featuresRoot = root.querySelector('.popup__features');
  if (offer.features.length) {
    const selectors = offer.features.map((name) => `.popup__feature--${name}`);
    const featureNodes = featuresRoot.querySelectorAll(selectors.join(',') || null);
    featuresRoot.replaceChildren(...featureNodes);
  } else {
    featuresRoot.remove();
  }

  // Фотографии
  const photosRoot = root.querySelector('.popup__photos');
  if (offer.photos.length) {
    const placeholderNode = root.querySelector('.popup__photo');
    const photosNode = offer.photos.map((src) => {
      const node = placeholderNode.cloneNode();
      return Object.assign(node, {src});
    });
    photosRoot.replaceChildren(...photosNode);
  } else {
    photosRoot.remove();
  }

  return root;
}

export default createCardNode;

