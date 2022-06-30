import createCardNode from './card-popup.js';
import generateAds from './data.js';
import createConstraints from './ad-constraints.js';
// import createSlider from'./slider.js';

// import {toggleDisabled} from './util.js';

const adForm = document.querySelector('.ad-form');


// Добавляем ограничения на ввод данных

createConstraints(adForm, {
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error',
})
  .setTitleMinLength(30)
  .setTitleMaxLength(100)
  .setPriceMinValue({palace: 10000, flat: 1000, house: 5000, bungalow: 0, hotel: 3000})
  .setPriceMaxValue(100000)
  .setCapacity()
  .setAddressToReadOnly()
  .syncCheckHours();

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(createCardNode(generateAds()[0]));

// createSlider();

// toggleDisabled('ad-form', true);


