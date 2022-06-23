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
 * Вернет случайный элемент массива
 * @template Item
 * @param {Item[]} items
 */
export function getItemFromArray(items) {
  if (!Array.isArray(items)) {
    throw new TypeError(`Аргумент не является массивом: (${typeof items}: ${items}`);
  }
  const lastIndex = Math.max(0, items.length - 1);
  const index = getIntegerInRange(0, lastIndex);
  return items[index];
}

/**
 * Вернет случайное количество элементов массива
 * @template Item
 * @param {Item[]} items
 */
export function getItemsFromArray(items) {
  if (!Array.isArray(items)) {
    throw new TypeError(`Аргумент не является массивом: (${typeof items}: ${items}`);
  }
  const newItems = [...items];
  let {length} = items;
  while (length--) {
    newItems.splice(length, getIntegerInRange(0, 1));
  }
  return newItems;
}

// /**
//  * Вернет перемешанный массив на основании алгоритма Фишера-Йетса.
//  * @template Item
//  * @param {Item[]} items
//  */
// export function shuffle(items) {
//   if (!Array.isArray(items)) {
//     throw new TypeError(`Аргумент не является массивом: (${typeof items}: ${items}`);
//   }
//   const shuffledItems = items.slice();
//   let position;
//   for (let index = items.length - 1; index > 0; index--) {
//     position = Math.floor(Math.random() * (index + 1));
//     [shuffledItems[index], shuffledItems[position]] = [shuffledItems[position], shuffledItems[index]];
//   }
//   return shuffledItems;
// }

export function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

export function isEnterKey(evt) {
  return evt.key === 'Enter';
}

export const endingsForGuests = new Map ([
  ['one', 'я'],
  ['few', 'ей'],
  ['many', 'ей'],
]);

export const endingsForRooms = new Map ([
  ['one', 'а'],
  ['few', 'ы'],
  ['many', '']
]);

/**
 * Вернет префикс или окончание для слова сочетаемого с числительным `number`.
 * @param {number} value Число для склонения.
 * @param {Map <string, string>} endings Карта окончаний для слова.
 * @returns {string}
 */
export function getPluralEnding(value, endings) {
  const pluralRules = new Intl.PluralRules('ru');

  if (!(endings instanceof Map)) {
    throw new Error(`Переданные данные не являются картой окончаний (${typeof endings}: ${endings}`);
  }
  if (!Number.isInteger(value)) {
    throw new Error(`Аргумент не является целым числом (${typeof value}: ${value}`);
  }
  const rule = pluralRules.select(value);
  return endings.get(rule);
}
