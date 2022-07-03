import {toggleFormDisabled} from './utilities.js';
import createCardNode from './ad-card.js';

/**
 * Местоположение центра города
 * @typedef cityCentre
 * @prop {number} lat Широта
 * @prop {number} lng Долгота
 */

/**
 * Создает карту
 * @param {string} idName id контейнера для карты.
 * @param {cityCentre} cityCentre
 */
function createMap(idName, cityCentre, form) {
  toggleFormDisabled('ad-form', true);
  toggleFormDisabled('map__filters', true);

  const fields = form.elements;
  const map = L.map(idName)
    .on('load', () => {
      toggleFormDisabled('ad-form', false);
      toggleFormDisabled('map__filters', false);
      form.addEventListener('reset', () => {
        map.setView(cityCentre, 13);
      });
    })
    .setView(cityCentre, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  function createAdPin(iconOptions, ad) {
    const adsGroup = L.layerGroup().addTo(map);
    const adPinIcon = L.icon(iconOptions);
    const adPin = L.marker(
      ad.location,
      {icon: adPinIcon},
    );
    adPin
      .addTo(adsGroup)
      .bindPopup(createCardNode(ad));

    form.addEventListener('reset', () => {
      if (adPin.isPopupOpen()) {
        adPin.closePopup();
      }
    });
  }

  return {
    createMainPin(iconOptions) {
      const mainPinIcon = L.icon(iconOptions);
      const mainPin = L.marker(
        cityCentre,
        {
          draggable: true,
          icon: mainPinIcon,
        },
      );
      mainPin.addTo(map);
      mainPin.on('moveend', (event) => {
        const location = event.target.getLatLng();
        fields.address.value = `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`;
      });
      form.addEventListener('reset', () => {
        mainPin.setLatLng(cityCentre);
      });

      return this;
    },

    createAdPins(iconOptions, ads) {
      ads.forEach((ad) => {
        createAdPin(iconOptions, ad);
      });

      return this;
    }
  };
}

export default createMap;

