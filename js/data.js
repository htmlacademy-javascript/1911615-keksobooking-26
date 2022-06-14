import {getRandomNumber, shuffle, getRandomArray} from './util.js';

/**
  * Список заголовков предложения.
  * @constant
  * @type {string[]}
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
  * Список типов жилья.
  * @constant
  * @type {string[]}
*/
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

/**
  * Список доступных часов заселения и выселения.
  * @constant
  * @type {string[]}
*/
const CHECK_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

/**
  * Список удобств жилья.
  * @constant
  * @type {string[]}
*/
const FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

/**
  * Список описаний жилья.
  * @constant
  * @type {string[]}
*/
const DESCRIPTIONS = [
  'Апарт-отель расположен в самом центре Старого города Кракова, всего в 1 минуте ходьбы от Главной Рыночной площади.',
  'Наше красивое здание, построенное в 30-х годах, сегодня является культурным наследием города Рио-де-Жанейро. Полностью отремонтирован с помощью модернизации.',
  'Роскошные апартаменты - это семейный комплекс. мы стараемся сделать все возможное, чтобы наши гости могли насладиться отличным сервисом.',
  'Отель с видом на сад и бесплатным Wi-Fi расположен в Лондоне, в 1,1 км от Музея Мадам Тюссо и в 1,6 км от крикетного поля Лорда. ',
  'Отель является официальным "особенным домом" для туристов. Он расположен в центре Гавана-Вьеха; всего в 10 метрах от улицы Обиспо и в 200 метрах от "Флоридита".',
  'Впечатляющий дом в центре Гаваны, где ваш комфорт будет гарантирован.',
  'Это дом в стиле ар-деко, построенный в 1929 году из высоких стоек, с потолки высотой 4,80 метра, с красивым входом с оригинальной рельефной мозаикой и мраморной лестницей, ведущей на верхний этаж.',
  'Небольшой семейный туристический коттедж, расположенный в 2 км от центра Сантьяго-де-Компостела, в тихом и легкодоступном районе. Удобные и приятные удобства. ',
  'Дом расположен в красивом районе Ведадо, недалеко от культурных центров, магазинов и проспекта 23, что облегчает транспорт.',
  'Мы предлагаем трехместные, двухместные и двухместные номера в нашем доме, красивом 200-метровом полностью отреставрированном колониальном доме 1883 года постройки.Наш дом представляет собой аутентичный дом в колониальном стиле, построенный в 1883 году, с деревянными потолками высотой более 5 метров.',
];

/**
  * Список ссылок на фотографии жилья.
  * @constant
  * @type {string[]}
*/
const PHOTOS_LIST = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

/**
  * Число генерируемых номеров изображений аватаров пользователя.
  * @constant
  * @type {number}
*/
const IMAGE_COUNT = 10;

/**
  * Число генерируемых объектов.
  * @constant
  * @type {number}
*/
const OBJECTS_COUNT= 10;

/**
  * Список перемешанных неповторяющихся номеров изображений аватаров пользователя.
  * @constant
  * @type {number}
*/
const Coords = {
  MIN_LAT: 35.65000,
  MAX_LAT: 35.70000,
  MIN_LNG: 139.70000,
  MAX_LNG: 139.80000,
  DECIMALS: 5,
};

const imageNumbers = shuffle(Array.from(Array(IMAGE_COUNT).keys()));

/**
  * Список перемешанных заголовков предложения.
  * @type {string[]}
*/
const randomTitles = shuffle(TITLES);

/**
  * Список перемешанных описаний жилья.
  * @type {string[]}
*/
const randomDescriptions = shuffle(DESCRIPTIONS);

/**
  * Создает объект с храктеристиками объекта для сдачи.
  * @constructor
  * @param {number} index номер создаваемого объекта.
  * @return {Object} — готовый объект объявления
*/
const createObject = (index) => {
  const location = {
    lat: getRandomNumber(Coords.MIN_LAT, Coords.MAX_LAT, Coords.DECIMALS),
    lng: getRandomNumber(Coords.MIN_LNG, Coords.MAX_LNG, Coords.DECIMALS),
  };

  return {
    author : {
      avatar : `img/avatars/user${String(imageNumbers[index]+1).padStart(2, '0')}.png`
    },
    offer: {
      title : randomTitles[index],
      address : `${location.lat}, ${location.lng}`,
      price : getRandomNumber(1000,10000),
      type : shuffle(TYPES)[0],
      rooms : getRandomNumber(1,5),
      guests : getRandomNumber(1,10),
      checkin : shuffle(CHECK_TIMES)[0],
      checkout : shuffle(CHECK_TIMES)[0],
      features : getRandomArray(FEATURES_LIST),
      description : randomDescriptions[index],
      photos : getRandomArray(PHOTOS_LIST),
    },
    location
  };
};

/**
  * Создает список из объектов с храктеристиками объекта для сдачи.
  * @constructor
  * @return {Array} — массив сгенерированных объявлений
*/
const generateObjects = () => Array.from({length: OBJECTS_COUNT}, (x, i) => createObject(i));

export {generateObjects};
