import generateAds from './ad-generator.js';
import createConstraints from './ad-constraints.js';
import renderMap from './map.js';
import createCardNode from './ad-card.js';
import {toggleFormDisabled} from './utilities.js';
import createRangeSlider from'./range-slider.js';

// Деактивация форм.

const adForm = document.querySelector('.ad-form');

toggleFormDisabled('ad-form', true);
toggleFormDisabled('map__filters', true);

// Ограничения на ввод данных.

createConstraints(adForm, {
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error',
})
  .setTitleMinLength(30)
  .setTitleMaxLength(100)
  .setPriceMinValue({bungalow: 0, flat: 1000, hotel: 3000, house: 5000, palace: 10000})
  .setPriceMaxValue(100000)
  .setPriceStep(1000)
  .setCapacity()
  .setAddressToReadOnly()
  .syncCheckHours();

// Альтернативный способ указать цену.

createRangeSlider(document.querySelector('.ad-form__slider'),{
  inputElement: adForm.price,
});

// Карта и метки.

const map = renderMap('map-canvas', {
  center: [35.681729, 139.753927],
});

generateAds().forEach((ad) => {
  map.addSecondaryPin(ad.location, createCardNode(ad));
});

// Запись координат главной метки в поле адреса.

map.primaryPin.on('move', () => {
  const {lat, lng} = map.primaryPin.getLatLng();
  adForm.address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});
map.primaryPin.fire('move');

adForm.addEventListener('reset', () => {
  requestAnimationFrame(() => map.resetView());
});

// Активация форм.

map.tileLayer.on('load', () => {
  toggleFormDisabled('ad-form', false);
  toggleFormDisabled('map__filters', false);
});

