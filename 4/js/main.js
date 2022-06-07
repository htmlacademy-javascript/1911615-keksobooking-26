
/**
 * Функция, возвращающая случайное целое число из переданного диапазона включительно.
 * @param {number} a - Первое число
 * @param {number} b - Второе число
*/

function getRandomInteger(a, b) {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const RandomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
  return RandomInteger;
}

/**
 * Функция, возвращающая случайное число с указанной точностью из переданного диапазона включительно.
 * @param {number} a - Первое число
 * @param {number} b - Второе число
 * @param {number} [decimals] - Количество знаков после запятой. Необязательный, 0 по умолчанию.
*/

function getRandomNumber(a, b, decimals = 0) {
  const multiplier = Math.pow(10,decimals);
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  if (decimals === 0) {
    return getRandomInteger(min, max);
  }
  const RandomInteger = Math.floor(Math.random() * (Math.floor(max*multiplier) - Math.ceil(min*multiplier) + 1)) + Math.ceil(min*multiplier);
  const RandomFloat = Math.trunc(RandomInteger) / multiplier;
  return RandomFloat;
}

/**
 * Функция, перемешивающая элементы диапазона на основании алгоритма Фишера-Йетса.
 * @param {array} arr - Массив для перемешивания
 * @returns {array} Перемешанный массив
*/

function shuffle(arr){
  let j, temp;
  for(let i = arr.length - 1; i > 0; i--){
    j = Math.floor(Math.random()*(i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

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
 * Число с плавающей точкой — широта, минимальное значени.
 * @constant
 * @type {number}
*/

const MIN_LAT = 35.65000;

/**
  * Число с плавающей точкой — широта, максимальное значени.
  * @constant
  * @type {number}
*/

const MAX_LAT = 35.70000;

/**
  * Число с плавающей точкой — долгота, максимальное значени.
  * @constant
  * @type {number}
*/

const MIN_LNG = 139.70000;

/**
  * Число с плавающей точкой — долгота, максимальное значени.
  * @constant
  * @type {number}
*/

const MAX_LNG = 139.80000;

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
*/

const createObject = (index) => {

  /**
   * Адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 10. Перед однозначными числами ставится 0. Например, 01, 02...10. Адреса изображений не повторяются.
   * @type {string}
  */

  const randomAvatar = `img/avatars/user${(imageNumbers[index]+1) < 10 ? `0${(imageNumbers[index]+1)}` : (imageNumbers[index]+1)}.png`;

  /**
   * Заголовок предложения.
   * @type {string}
  */

  const randomTitle = randomTitles[index];

  /**
   * Cтоимость. Случайное целое положительное число.
   * @type {number}
  */

  const randomPrice= getRandomNumber(1000,10000, 0);

  /**
   * Одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel.
   * @type {string}
  */

  const randomType = shuffle(TYPES)[0];

  /**
   * Количество комнат. Случайное целое положительное число.
   * @type {number}
  */

  const randomRooms = getRandomNumber(0,5, 0);

  /**
   * Количество гостей, которое можно разместить. Случайное целое положительное число.
   * @type {number}
  */

  const randomGuests = getRandomNumber(1,10, 0);

  /**
   * Время заезда, одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
   * @type {string}
  */

  const randomCheckin = shuffle(CHECK_TIMES)[0];

  /**
   * Время выезда, одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
   * @type {string}
  */

  const randomCheckout = shuffle(CHECK_TIMES)[0];

  /**
   * Массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
   * @type {string[]}
  */

  const randomFeatures = shuffle(FEATURES_LIST).slice(0, getRandomNumber(1,FEATURES_LIST.length-1, 0));

  /**
   * Описание помещения.
   * @type {string}
  */

  const randomDescription = randomDescriptions[index];

  /**
   * Массив случайной длины из значений адресов изображений объекта.
   * @type {string[]}
  */

  const randomPhotos = shuffle(PHOTOS_LIST).slice(0, getRandomNumber(1,PHOTOS_LIST.length-1, 0));

  /**
   * Число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.
   * @type {number}
  */

  const randomLat = getRandomNumber(MIN_LAT, MAX_LAT, 5);

  /**
   * Число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000.
   * @type {number}
  */

  const randomLng = getRandomNumber(MIN_LNG, MAX_LNG, 5);

  return {
    author : { avatar : randomAvatar },
    offer: {
      title : randomTitle,
      address : `${randomLat}, ${randomLng}`,
      price : randomPrice,
      type : randomType,
      rooms : randomRooms,
      guests : randomGuests,
      checkin : randomCheckin,
      checkout : randomCheckout,
      features : randomFeatures,
      description : randomDescription,
      photos : randomPhotos,
    },
    location: {
      lat : randomLat,
      lng : randomLng,
    },
  };
};

/**
 * Создает список из объектов с храктеристиками объекта для сдачи.
 * @constructor
 * @param {number} objectsNumber количество создаваемых объектов.
*/

function generateObjects(objectsNumber) {
  /**
   * Массив  состоящий из объектов кексобукинга.
   * @type {array}
  */

  const objects = [];

  for (let i = 0; i < objectsNumber; i++) {
    objects[i]=createObject(i);
  }

  return objects;
}

// eslint-disable-next-line no-console
console.log(generateObjects(OBJECTS_COUNT));
