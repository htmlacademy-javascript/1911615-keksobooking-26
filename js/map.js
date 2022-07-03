
const adForm = document.querySelector('.ad-form');
const fields = adForm.elements;

/**
 * Создает карту
 * @param {string} idName id контейнера для карты.
 * @param {boolean} cityCentre Координаты центра города.
 */
function createMap(idName, cityCentre) {
  const map = L.map(idName)
    .setView(cityCentre, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);


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
      adForm.addEventListener('reset', () => {
        mainPin.setLatLng(cityCentre);
        map.setView(cityCentre, 10);
      });

      return this;
    }
  };
}

export default createMap;

