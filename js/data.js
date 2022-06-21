import './ad.js';
import {
  getNumberInRange,
  getIntegerInRange,
  getItemsFromArray,
  getItemFromArray
} from './util.js';

/**
 * Варианты заголовков.
 */
const TITLES = [
  'Aparthotel Stare Miasto',
  'Sugar Loft Apartments',
  'Luxury Apartments Klara',
  'Hyde Park Residence',
  'Habana Mia',
  'Casa Hostal Yudi Tvc',
  'La Siguaraya',
  'Casa de Dora',
  'Isabella Casa',
  'Villa Marlen',
];

/**
 * Варианты видов жилья.
 */
const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

/**
 * Часы заезда и выезда.
 */
const CHECK_HOURS = [
  '12:00',
  '13:00',
  '14:00',
];

/**
 * Варианты удобств.
 */
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

/**
 * Варианты описаний.
 */
const DESCRIPTIONS = [
  'Апарт-отель расположен в самом центре Старого города Кракова, всего в 1 минуте ходьбы от Главной Рыночной площади.',
  'Наше красивое здание, построенное в 30-х годах, сегодня является культурным наследием города Рио-де-Жанейро. Полностью отремонтирован с помощью модернизации.',
  'Роскошные апартаменты - это семейный комплекс. мы стараемся сделать все возможное, чтобы наши гости могли насладиться отличным сервисом.',
  'Отель с видом на сад и бесплатным Wi-Fi расположен в Лондоне, в 1,1 км от Музея Мадам Тюссо и в 1,6 км от крикетного поля Лорда. ',
  'Отель является официальным "особенным домом" для туристов. Он расположен в центре Гавана-Вьеха; всего в 10 метрах от улицы Обиспо и в 200 метрах от "Флоридита".',
  'Впечатляющий дом в центре Гаваны, где ваш комфорт будет гарантирован.',
  'Это дом в стиле арт-деко, построенный в 1929 году из высоких стоек, с потолки высотой 4,80 метра, с красивым входом с оригинальной рельефной мозаикой и мраморной лестницей, ведущей на верхний этаж.',
  'Небольшой семейный туристический коттедж, расположенный в 2 км от центра Сантьяго-де-Компостела, в тихом и легкодоступном районе. Удобные и приятные удобства. ',
  'Дом расположен в красивом районе Ведадо, недалеко от культурных центров, магазинов и проспекта 23, что облегчает транспорт.',
  'Мы предлагаем трехместные, двухместные и двухместные номера в нашем доме, красивом 200-метровом полностью отреставрированном колониальном доме 1883 года постройки.Наш дом представляет собой аутентичный дом в колониальном стиле, построенный в 1883 году, с деревянными потолками высотой более 5 метров.',
];

/**
 * Варианты фотографий.
 */
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

/**
 * Диапазон широты
 */
const LAT_RANGE = [35.65000, 35.70000];

/**
 * Диапазон долготы
 */
const LNG_RANGE = [139.70000, 139.80000];

/**
 * Диапазон цен
 */
const PRICE_RANGE = [1000, 100000];

/**
 * Диапазон количества комнат
 */
const ROOMS_RANGE = [1, 10];

/**
 * Диапазон количества гостей
 */
const GUESTS_RANGE = [1, 10];

/**
 * Сгенерирует объявление
 * @param {number} id Число от 1 до 10
 * @return {Ad}
 */
export const generateAd = (id) => {
  /**
   * @type {AdLocation}
   */
  const location = {
    lat: getNumberInRange(...LAT_RANGE),
    lng: getNumberInRange(...LNG_RANGE),
  };

  /**
   * @type {AdAuthor}
   */
  const author = {
    avatar: `img/avatars/user${`${id}`.padStart(2, '0')}.png`
  };

  /**
   * @type {AdOffer}
   */
  const offer = {
    title: getItemFromArray(TITLES),
    address: `${location.lat}, ${location.lng}`,
    price: getIntegerInRange(...PRICE_RANGE),
    type: getItemsFromArray(OFFER_TYPES),
    rooms: getIntegerInRange(...ROOMS_RANGE),
    guests: getIntegerInRange(...GUESTS_RANGE),
    checkin: getItemFromArray(CHECK_HOURS),
    checkout: getItemFromArray(CHECK_HOURS),
    features: getItemsFromArray(FEATURES),
    description: getItemFromArray(DESCRIPTIONS),
    photos: getItemsFromArray(PHOTOS),
  };

  return {
    author,
    offer,
    location
  };
};

/**
 * Сгенерирует список объявлений
 * @param {number} length Длина списка
 */
export const generateAds = (length = 10) =>
  Array.from({length}, (item, index) => generateAd(index + 1));
