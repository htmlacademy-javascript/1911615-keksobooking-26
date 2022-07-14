import './ad.js';
import {setFormDisabled} from './utilities.js';

/**
 * Инициализирует форму фильтрации объявлений
 * и вернет методы для дальнейшего взаимодействия.
 */
function initMapForm() {
  /**
   * Форма объявления.
   */
  const mapFormElement = document.querySelector('.map__filters');

  return {
    /**
     * Заблокирует/разблокирует форму
     * @param {boolean} flag
     */
    setDisabled(flag) {
      setFormDisabled(mapFormElement, flag).classList.toggle('.map__filters--disabled', flag);

      return this;
    },

    /**
     * Добавит обработчик события.
     */
    on() {
      mapFormElement.addEventListener(...arguments);

      return this;
    },

    /**
     * Сбросит форму до значения по умолчанию.
     */
    reset() {
      mapFormElement.reset();

      return this;
    },

    /**
     * Сбросит форму до значения по умолчанию.
     */
    fire(name) {
      mapFormElement.dispatchEvent(new Event(name));

      return this;
    },

    /**
     * Проверит соответствие вида жилья.
     * @param {string} type
     */
    testType(type) {
      const {value} = mapFormElement['housing-type'];

      return value === 'any' || value === type;
    },

    /**
     * Проверит соответствие стоимости жилья.
     * @param {number} price
     */
    testPrice(price) {
      const {value} = mapFormElement['housing-price'];

      if (value === 'low') {
        return price < 10000;
      }
      if (value === 'middle') {
        return price >= 10000 && price < 50000;
      }
      if (value === 'high')  {
        return price >= 50000;
      }
      return true;
    },

    /**
     * Проверит соответствие количества комнат.
     * @param {number} rooms
     */
    testRooms(rooms) {
      const {value} = mapFormElement['housing-rooms'];

      return value === 'any' || Number(value) === rooms;
    },

    /**
     * Проверит соответствие количества гостей.
     * @param {number} guests
     */
    testGuests(guests) {
      const {value} = mapFormElement['housing-guests'];

      return value === 'any' || Number(value) === guests;
    },

    /**
     * Проверит соответствие удобств.
     * @param {string[]} features
     */
    testFeatures(features = []) {
      const checkedElements = mapFormElement.querySelectorAll('.map__checkbox:checked');

      return [...checkedElements].every((element) => features.includes(element.value));
    },

    /**
     * Вернет объявления которые соответствуют текущим критериям.
     * @param {Ad[]} ads
     * @param {number} limit
     */
    filter(ads, limit = 10) {
      const filteredAds =[];

      ads.some((ad) => {
        const hasMatch = this.testType(ad.offer.type)
          && this.testPrice(ad.offer.price)
          && this.testRooms(ad.offer.rooms)
          && this.testGuests(ad.offer.guests)
          && this.testFeatures(ad.offer.features);

        if (hasMatch) {
          filteredAds.push(ad);
        }

        return filteredAds.length === limit;
      });

      return filteredAds;
    }
  };
}

export default initMapForm;

