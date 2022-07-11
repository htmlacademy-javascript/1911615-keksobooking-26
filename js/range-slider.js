import '../nouislider/nouislider.js';

/**
 * Создаст ползунок на DOM-элементе `element` и синхронизирует его с `options.inputElement`
 * @param {HTMLElement} element
 * @param {Object} options
 */
function renderRangeSlider(element, options) {
  const {inputElement} = options;

  const rangeSlider = noUiSlider.create(element, {
    start: inputElement.value,
    range: {
      min: 0,
      max: Number(inputElement.max),
    },
    step: Number(inputElement.step),
    behaviour: 'snap',
    connect: 'lower',
    animate: false,
    ...options
  });

  rangeSlider.on('slide', (values) => {
    inputElement.value = Number(...values);
    inputElement.dispatchEvent(new Event('input'));
  });

  inputElement.addEventListener('input', () => {
    rangeSlider.set(inputElement.value);
  });

  return rangeSlider;
}

export default renderRangeSlider;
