import createPopupElement from './map-popup.js';

/**
 * Нарисует карту, главную метку и вернет методы для дальнейшего взаимодействия.
 * @param {Object} options Настройки Leaflet.
 */
function renderMap(options) {
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
    zIndexOffset: 1000
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
  const map = L.map('map-canvas', {
    layers: [tileLayer, primaryPin, secondaryPinGroup],
    attributionControl: false,
    scrollWheelZoom: false,
    ...options
  });

  return {
    whenReady: map.whenReady.bind(map),
    primaryPin,
    primaryPinIcon,
    secondaryPinIcon,
    tileLayer,

    /**
     * Добавит метку объявления на карту.
     * @param {Ad} ad
     */
    appendPin(ad) {
      const pin = L.marker(ad.location, {
        icon: secondaryPinIcon
      });
      pin.bindPopup(createPopupElement(ad));

      secondaryPinGroup.addLayer(pin);
    },

    /**
     * Заменит существующие метки объявлений на карте.
     * @param {Ad[]} ads
     */
    replacePins(ads) {
      secondaryPinGroup.clearLayers();

      ads.forEach(this.appendPin);
    },

    /**
     * Вернет местоположение и масштаб в исходное состояние.
     */
    reset() {
      const {center, zoom} = map.options;
      map.setView(center, zoom).closePopup();
      primaryPin.setLatLng(center);
    }
  };
}

export default renderMap;

