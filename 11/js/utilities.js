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

/**
 * Заблокирует/разблокирует элементы формы.
 * @param {HTMLFormElement} formElement
 * @param {boolean} isDisabled
 */
export function setFormDisabled(formElement, isDisabled) {
  [...formElement].forEach((element) => (element.disabled = isDisabled));

  return formElement;
}

/**
 * Ограничит частоту вызова `callback`
 * @param {Function} callback
 * @param {number} delay
 */
export function debounce(callback, delay = 500) {
  let id;
  return (...rest) => {
    clearTimeout(id);
    id = setTimeout(() => callback(...rest), delay);
  };
}
