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

