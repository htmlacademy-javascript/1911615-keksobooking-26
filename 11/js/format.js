/**
 * Правила множественности.
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
  many: 'гостей'
};

/**
  * Словарь количества комнат.
  */
const roomsUnitByRule = {
  one: 'комната',
  few: 'комнаты',
  many: 'комнат'
};

/**
  * Словарь видов жилья.
  */
const offerNameByType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

/**
  * Вернет строку вида жилья.
  * @param {string} type
  */
export function formatOfferType(type) {
  return offerNameByType[type] || '';
}

/**
  * Вернет строку стоимости жилья.
  * @param {number} price
  */
export function formatPrice(price) {
  return numberFormat.format(price);
}

/**
  * Вернет строку количества комнат.
  * @param {number} rooms
  */
export function formatRooms(rooms) {
  return `${rooms} ${roomsUnitByRule[pluralRules.select(rooms)]}`;
}

/**
  * Вернет строку количества гостей.
  * @param {number} guests
  */
export function formatGuests(guests) {
  return `${guests} ${guestsUnitByRule[pluralRules.select(guests)]}`;
}

/**
  * Вернет строку вместительности жилья.
  * @param {number} rooms
  * @param {number} guests
  */
export function formatCapacity(rooms, guests) {
  return `${formatRooms(rooms)} для ${formatGuests(guests)}`;
}

/**
  * Вернет строку времени заезда и выезда.
  * @param {string} checkin
  * @param {string} checkout
  */
export function formatCheckHours(checkin, checkout) {
  return `Заезд после ${checkin}, выезд до ${checkout}`;
}
