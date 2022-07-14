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
  const formElement = document.querySelector('.map__filters');

  return {
    /**
     * Заблокирует/разблокирует форму
     * @param {boolean} flag
     */
    setDisabled(flag) {
      setFormDisabled(formElement, flag).classList.toggle('.map__filters--disabled', flag);

      return this;
    },

    /**
     * Добавит обработчик события.
     */
    on() {
      formElement.addEventListener(...arguments);

      return this;
    },

    /**
     * Сбросит форму до значения по умолчанию.
     */
    reset() {
      formElement.reset();

      return this;
    },

    /**
     * Сбросит форму до значения по умолчанию.
     */
    fire(name) {
      formElement.dispatchEvent(new Event(name));

      return this;
    },

    /**
     * Проверит соответствие вида жилья.
     * @param {string} type
     */
    testType(type) {
      const {value} = formElement['housing-type'];

      return value === 'any' || value === type;
    },

    /**
     * Проверит соответствие стоимости жилья.
     * @param {number} price
     */
    testPrice(price) {
      const {value} = formElement['housing-price'];

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
      const {value} = formElement['housing-rooms'];

      return value === 'any' || Number(value) === rooms;
    },

    /**
     * Проверит соответствие количества гостей.
     * @param {number} guests
     */
    testGuests(guests) {
      const {value} = formElement['housing-guests'];

      return value === 'any' || Number(value) === guests;
    },

    /**
     * Проверит соответствие удобств.
     * @param {string[]} features
     */
    testFeatures(features = []) {
      const checkedElements = formElement.querySelectorAll('.map__checkbox:checked');

      return [...checkedElements].every((element) => features.includes(element.value));
    },

    /**
     * Вернет объявления, которые соответствуют текущим критериям.
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

