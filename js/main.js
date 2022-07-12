import {toggleFormDisabled, toggleButtonDisabled} from './utilities.js';
import createConstraints from './ad-constraints.js';
import { setDropZone, setPhotosPreview } from './photos.js';
import renderMap from './map.js';
import createCardNode from './ad-card.js';
import renderRangeSlider from'./range-slider.js';
import {getAds, postAd} from './requests.js';
import showMessage from './modal.js';

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

// Установка предпросмотра изображений
setDropZone(
  document.querySelector('.ad-form-header__drop-zone'),
  document.querySelector('#avatar')
);

setPhotosPreview(
  document.querySelector('#avatar'),
  document.querySelector('.ad-form-avatar')
);

setDropZone(
  document.querySelector('.ad-form__drop-zone'),
  document.querySelector('#images')
);

setPhotosPreview(
  document.querySelector('#images'),
  document.querySelector('.ad-form-photo')
);

// Альтернативный способ указать цену.

renderRangeSlider(document.querySelector('.ad-form__slider'),{
  inputElement: adForm.price,
});

// Карта и метки.

const map = renderMap('map-canvas', {
  center: [35.681729, 139.753927],
});

const MAX_ADS_AT_TIME = 10;

(async function() {
  try {
    const ads = await getAds();
    ads.slice(0, MAX_ADS_AT_TIME).forEach((ad) => {
      map.addSecondaryPin(ad.location, createCardNode(ad));
    });
    toggleFormDisabled('map__filters', false);
  } catch (exception) {
    showMessage('error',`Ошибка: ${exception.status || exception.message}`);
  }
})();

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
});

// Отправка данных

adForm.addEventListener('formdata', async (event) => {
  toggleButtonDisabled(adForm.submit, true);
  try {
    await postAd(event.formData);
    showMessage('success');
    adForm.reset();
  } catch(response) {
    showMessage('error');
  }
  toggleButtonDisabled(adForm.submit, false);
});


