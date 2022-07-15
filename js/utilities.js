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
  let timeoutId;
  let lastCallTime = Date.now();

  return (...rest) => {
    const elapsedSinceLastCall = Date.now() - lastCallTime;
    const remainingDelay = delay - Math.min(delay, elapsedSinceLastCall);

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...rest);
      lastCallTime = Date.now();
    }, remainingDelay);
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
