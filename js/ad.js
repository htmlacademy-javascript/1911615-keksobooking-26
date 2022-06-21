/**
 * Объявление
 * @typedef Ad
 * @prop {AdAuthor} author
 * @prop {AdOffer} offer
 * @prop {AdLocation} location
 */

/**
 * Автор объявления
 * @typedef AdAuthor
 * @prop {string} avatar URL-адрес аватарки
 */

/**
 * Местоположение объявления
 * @typedef AdLocation
 * @prop {number} lat Широта
 * @prop {number} lng Долгота
 */

/**
 * Детали объявления
 * @typedef AdOffer
 * @prop {string} title Заголовок
 * @prop {string} address Адрес жилья
 * @prop {number} price Цена за ночь, руб.
 * @prop {string} type Вид жилья, один из: `palace`, `flat`, `house`, `bungalow`, `hotel`
 * @prop {number} rooms Количество комнат
 * @prop {number} guests Количество гостей
 * @prop {string} checkin Время заезда `HH:MM`
 * @prop {string} checkout Время выезда `HH:MM`
 * @prop {string[]} features Список удобств, может содержать: `wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`.
 * @prop {string} description Описание жилья
 * @prop {string[]} photos Фотографии в виде URL-адресов
 */


