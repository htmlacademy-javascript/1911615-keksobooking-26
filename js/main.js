// import createCardNode from './ad-card.js';
// import generateAds from './ad-generator.js';
import createConstraints from './ad-constraints.js';
// import createSlider from'./slider.js';

// import {toggleFormDisabled} from './util.js';
import createMap from './map.js';

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

// const mapCanvas = document.querySelector('#map-canvas');
// mapCanvas.appendChild(createCardNode(generateAds()[0]));

createMap('map-canvas', {lat: 35.681729, lng: 139.753927,})
  .createMainPin({iconUrl: './img/main-pin.svg', iconSize: [52, 52], iconAnchor: [26, 52],});

// createSlider();

// toggleFormDisabled('ad-form', true);


