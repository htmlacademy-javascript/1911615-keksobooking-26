/**
 * Рисует карту и главную метку.
 * @param {string} containerId
 * @param {cityCentre} options
 */
function renderMap(containerId, options) {
  /**
   * Изображение главной метки.
   */
  const primaryPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52]
  });

  /**
   * Главная метка.
   */
  const primaryPin = L.marker(options.center, {
    icon: primaryPinIcon,
    draggable: true,
    autoPan: true,
    zIndexOffset: 1000,
  });

  /**
   * Изображение второстепенной метки.
   */
  const secondaryPinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  });

  /**
   * Группа второстепенных меток.
   */
  const secondaryPinGroup = L.layerGroup();

  /**
   * Картографический слой.
   */
  const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

  /**
   * Карта.
   */
  const map = L.map(containerId, {
    layers: [tileLayer, primaryPin, secondaryPinGroup],
    zoom: 13,
    attributionControl: false,
    scrollWheelZoom: false,
    ...options
  });

  return {
    primaryPin,
    tileLayer,

    /**
     * Добавит второстепенную метку.
     * @param {Object} location
     * @param {HTMLElement} popup
     */
    addSecondaryPin(location, popup) {
      const secondaryPin = L.marker(location, {
        icon: secondaryPinIcon
      });
      secondaryPin.bindPopup(popup);
      secondaryPinGroup.addLayer(secondaryPin);
    },

    /**
     * Сбросит местоположение и масштаб до первоначальных значений.
     */
    resetView() {
      const {center, zoom} = map.options;
      map.setView(center, zoom);
      primaryPin.setLatLng(center);
      secondaryPinGroup.eachLayer((pin) => pin.closePopup());
    },
  };
}

export default renderMap;

