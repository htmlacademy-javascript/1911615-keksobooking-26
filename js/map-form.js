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
     * @param {string} price
     */
    testPrice(price) {
      const {value} = mapFormElement['housing-price'];

      if (value === 'any') {
        return true;
      } else if(value === 'high' && price >50000) {
        return true;
      } else if(value === 'middle' && price >=10000 && 50000 > price) {
        return true;
      }
      else if(value === 'low' && price <10000) {
        return true;
      }
      return false;
    },

    /**
     * Проверит соответствие количества комнат.
     * @param {string} rooms
     */
    testRooms(rooms) {
      const {value} = mapFormElement['housing-rooms'];

      return value === 'any' || value === rooms.toString();
    },

    /**
     * Проверит соответствие количества гостей.
     * @param {string} guests
     */
    testGuests(guests) {
      const {value} = mapFormElement['housing-guests'];

      return value === 'any' || value === guests.toString();
    },

    /**
     * Проверит соответствие удобств.
     * @param {string} features
     */
    testFeatures(features) {
      const selectedElements = mapFormElement['housing-features'].querySelectorAll('input:checked');
      const checkedValues = Array.prototype.map.call(selectedElements,(callback)=> callback.value);
      if (checkedValues.length) {
        if(features === undefined){
          return false;
        }
        for(let i=0; i<checkedValues.length; i++){
          if(!features.includes(checkedValues[i])){
            return false;
          }
        }
        return true;
      }
      return true;
    },

    /**
     * Вернет объявления которые соответствуют текущим критериям.
     * @param {Ad[]} ads
     * @param {number} limit
     */
    filter(ads, limit = 10) {
      return ads.filter((ad) => this.testType(ad.offer.type))
        .filter((ad) => this.testPrice(ad.offer.price))
        .filter((ad) => this.testRooms(ad.offer.rooms))
        .filter((ad) => this.testGuests(ad.offer.guests))
        .filter((ad) => this.testFeatures(ad.offer.features))
        .slice(0, limit);
    }
  };
}

export default initMapForm;
