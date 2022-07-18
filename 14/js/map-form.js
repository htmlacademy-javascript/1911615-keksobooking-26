import './ad.js';
import createMatcher from './map-form-matcher.js';
import {setFormDisabled} from './utilities.js';

/**
 * Инициализирует форму фильтрации объявлений
 * и вернет методы для дальнейшего взаимодействия.
 */
function initMapForm() {
  /**
   * Форма фильтрации.
   * @type {HTMLFormElement}
   */
  const formElement = document.querySelector('.map__filters');

  /**
   * Методы проверки совпадений.
   */
  const $ = createMatcher(formElement);

  return {
    /**
     * Заблокирует/разблокирует форму.
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
     * Сбросит поля формы до первоначальных значений.
     */
    reset() {
      formElement.reset();

      return this;
    },

    /**
     * Отправит событие.
     * @param {string} name
     */
    fire(name) {
      formElement.dispatchEvent(new Event(name));

      return this;
    },

    /**
     * Вернет объявления, которые подходят по всем критериям,
     * ограничивая список параметром `limit`.
     * @param {Ad[]} ads
     * @param {number} limit
     */
    filter(ads, limit = 10) {
      const filteredAds = [];

      ads.some((ad) => {
        const hasMatch = $.matchType(ad.offer.type)
          && $.matchPrice(ad.offer.price)
          && $.matchRooms(ad.offer.rooms)
          && $.matchGuests(ad.offer.guests)
          && $.matchFeatures(ad.offer.features);

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

