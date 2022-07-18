import '../nouislider/nouislider.js';

/**
 * Нарисует слайдер диапазона, синхронизируя с числовым полем,
 * указанном в `options.syncWith`
 * @param {HTMLElement} targetElement
 * @param {Object} options
 */
function renderRangeSlider(targetElement, options) {
  const sourceElement = options.syncWith;

  const range = {
    min: 0,
    max: Number(sourceElement.max),
  };

  const rangeSlider = noUiSlider.create(targetElement, {
    start: sourceElement.value,
    range,
    step: Number(sourceElement.step),
    behaviour: 'snap',
    connect: 'lower',
    animate: false,
    ...options
  });

  rangeSlider.on('slide', (values) => {
    sourceElement.value = Number(...values);
    sourceElement.dispatchEvent(new Event('input'));
  });

  sourceElement.addEventListener('input', (event) => {
    if (event.isTrusted) {
      rangeSlider.set(sourceElement.value);
    }
  });

  return rangeSlider;
}

export default renderRangeSlider;
