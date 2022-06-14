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
  'Aparthotel is located in the very centre of Krakóws Old Town, just 1-minute walk from the Main Market Square. ',
  'Our beautiful building, in the 30s, today is cultural heritage of the city of Rio de Janeiro. Fully renovated through a retrofit.',
  'Luxury Apartments are family run complex. we try to give our best so our guests can experiance great service.',
  'Situated in London, hotel features garden views and free WiFi, 1.1 km from Madame Tussauds and 1.6 km from Lord\'s Cricket Ground. ',
  'The hotel is an official "casa particular" for tourists.  It\'s ubicated in the center of Habana Vieja; just 10 meters from Obispo street and 200 meters from the "Floridita".',
  'Spectacular home in downtown Havana, where your comfort will be guaranteed.',
  'It is an Art Deco house built in 1929 of high struts, with ceilings of 4.80 meters high, with a beautiful entrance with original relief mosaics and a marble staircase that leads to the upper floor.',
  'Small family tourist lodge located 2 km from the center of Santiago de Compostela, in a quiet and easily accessible neighborhood. Comfortable and nice facilities. ',
  'The house is located in the beautiful Vedado neighborhood, close to cultural centers, shops and Avenue 23, which facilitates the transport.',
  'We offer triples,doubles and twins rooms in our home, a beautiful 200 meter square completely restored Casa Colonial from 1883.Our House is an authentic colonial style house dating back from 1883 with more than 5 meter high wooden ceilings.',
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
