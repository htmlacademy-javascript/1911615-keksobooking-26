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
 * Ограничит частоту вызова `callback`.
 * @param {Function} callback
 * @param {number} interval
 */
export function debounce(callback, interval = 500) {
  let timeoutId = null;
  let lastCallTime = null;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...rest);
      lastCallTime = Date.now();

    }, interval - Math.min(interval, Date.now() - lastCallTime));
  };
}

/**
 * Ограничит `value` диапазоном `min` - `max`.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
