import '../nouislider/nouislider.js';

function createSlider(){
  const adForm = document.querySelector('.ad-form');
  const sliderElement = document.querySelector('.ad-form__slider');
  const fields = adForm.elements;
  noUiSlider.create(sliderElement, {
    range: {
      min: Number(fields.price.min),
      max: Number(fields.price.max),
    },
    start: Number(fields.price.min),
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    fields.price.value = sliderElement.noUiSlider.get();
  });

  fields.type.addEventListener('change', () => {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: Number(fields.price.min),
        max: Number(fields.price.max),
      },
      start: Number(fields.price.min),
      step: 1,
      connect: 'lower',
    });
  });
}

export default createSlider;
