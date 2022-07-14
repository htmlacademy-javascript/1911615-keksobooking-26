import renderMap from './map.js';
import initMapForm from './map-form.js';
import initAdForm from './ad-form.js';
import {getAds, postAd} from './gateway.js';
import showMessage from './message.js';
import {debounce} from './utilities.js';

const map = renderMap({
  center: [35.681729, 139.753927],
  zoom: 13
});

const mapForm = initMapForm().setDisabled(true);

const adForm = initAdForm().setDisabled(true);

map.whenReady(async () => {
  try {
    const ads = await getAds();
    const replacePins = debounce(() => map.replacePins(mapForm.filter(ads)));

    mapForm.setDisabled(false).on('change', replacePins).fire('change');

  } catch (exception) {
    showMessage('error',`Ошибка: ${exception.status || exception.message}`);
  }

  adForm.setDisabled(false);
  map.primaryPin.fire('move');
});

map.primaryPin.on('move', () => {
  adForm.setAddress(map.primaryPin.getLatLng());
});

adForm.on('formdata', async (event) => {
  adForm.setDisabled(true);

  try {
    await postAd(event.formData);
    adForm.reset();
    showMessage('success');

  } catch(response) {
    showMessage('error');
  }

  adForm.setDisabled(false);
});

adForm.on('reset', () => {
  requestAnimationFrame(() => map.reset());
  mapForm.reset().fire('change');
});

