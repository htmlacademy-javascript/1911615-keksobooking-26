
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
  let j;
  for(let i = arr.length - 1; i > 0; i--){
    j = Math.floor(Math.random()*(i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
  * Функция, выдающая массив из случайного числа случайных неповторяющихся элементов массива.
  * @param {array} arr - Исходный массив
  * @returns {array} Случайный массив
*/
function getRandomArray(arr) {
  return shuffle(arr).slice(0, getRandomNumber(1,arr.length));
}

const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';

export {getRandomNumber, shuffle, getRandomArray, isEnterKey, isEscapeKey};
