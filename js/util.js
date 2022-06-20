/**
 * Вернет случайное число в диапазоне `min`, `max`.
 * @param {number} min Положительное число.
 * @param {number} max Положительное число, большее или равное `min`.
 * @param {number} decimals Максимальное количество знаков после запятой.
 */
export function getNumberInRange(min, max, decimals = 5) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    throw new RangeError(`Диапазон не является числовым (${typeof min}: ${min}, ${typeof max}: ${max}) `);
  }
  if (min < 0 || max < 0 || min > max) {
    throw new RangeError(`Неподдерживаемый диапазон: ${min}, ${max}`);
  }
  const value = (max - min) * Math.random() + min;
  return Number(value.toFixed(decimals));
}

/**
 * Вернет случайное целое число в диапазоне `min`, `max`.
 * @param {number} min Целое положительное число.
 * @param {number} max Целое положительное число, большее или равное `min`.
 */
export function getIntegerInRange(min, max) {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new RangeError(`Диапазон не является целочисленным (${typeof min}: ${min}, ${typeof max}: ${max}) `);
  }
  return getNumberInRange(min, max, 0);
}

/**
 * Вернет случайный элемент массива `array`.
 * @param {array} array Массив элементов.
 */
export function getElementInArray(array) {
  if (!Array.isArray(array) || !array.length) {
    throw new TypeError(`Аргумент не является массивом: (${typeof array}: ${array}`);
  }
  return array[getIntegerInRange(0, array.length-1)];
}

// console.log(getElementInArray(1));
// console.log(getElementInArray([]));
// console.log(getElementInArray([1]));
// console.log(getElementInArray([1, 2]));

/**
 * Функция, перемешивающая элементы диапазона на основании алгоритма Фишера-Йетса.
 * @param {array} arr - Массив для перемешивания
 * @returns {array} Перемешанный массив
 */
export function shuffle(arr) {
  let j;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Функция, выдающая массив из случайного числа случайных неповторяющихся элементов массива.
 * @param {array} arr - Исходный массив
 * @returns {array} Случайный массив
 */
export function getRandomArray(arr) {
  return shuffle(arr).slice(0, getNumberInRange(1, arr.length));
}

export function isEscapeKey (evt) {
  return evt.key === 'Escape';
}

export function isEnterKey(evt) {
  return evt.key === 'Enter';
}

