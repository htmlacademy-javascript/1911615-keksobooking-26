import generateAds from './ad-generator.js';
import createConstraints from './ad-constraints.js';
import createMap from './map.js';
// import createSlider from'./slider.js';

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

// Добавляем карту

createMap('map-canvas', {lat: 35.681729, lng: 139.753927,}, adForm)
  .createMainPin({iconUrl: './img/main-pin.svg', iconSize: [52, 52], iconAnchor: [26, 52],})
  .createAdPins({iconUrl: './img/pin.svg', iconSize: [40, 40], iconAnchor: [20, 40],}, generateAds());

// createSlider();


