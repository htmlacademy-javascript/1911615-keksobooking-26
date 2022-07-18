import {clamp} from './utilities.js';

/**
 * Значение не заданного критерия.
 */
const ANY = 'any';

/**
 * Словарь ценовых диапазонов.
 */
const priceRangeByLevel = {
  low: [0, 9999],
  middle: [10000, 49999],
  high: [50000, Infinity]
};

/**
 * Вернет методы проверки совпадений с критериями, заданными формой фильтрации.
 * @param {HTMLFormElement} formElement
 */
function createMatcher(formElement) {
  return {
    /**
     * Проверит соответствие вида жилья.
     * @param {string} type
     */
    matchType(type) {
      const {value} = formElement['housing-type'];

      return value === ANY || value === type;
    },

    /**
     * Проверит соответствие стоимости жилья.
     * @param {number} price
     */
    matchPrice(price) {
      const {value} = formElement['housing-price'];

      return value === ANY || clamp(price, ...priceRangeByLevel[value]) === price;
    },

    /**
     * Проверит соответствие количества комнат.
     * @param {number} rooms
     */
    matchRooms(rooms) {
      const {value} = formElement['housing-rooms'];

      return value === ANY || Number(value) === rooms;
    },

    /**
     * Проверит соответствие количества гостей.
     * @param {number} guests
     */
    matchGuests(guests) {
      const {value} = formElement['housing-guests'];

      return value === ANY || Number(value) === guests;
    },

    /**
     * Проверит соответствие удобств.
     * @param {string[]} features
     */
    matchFeatures(features = []) {
      const checkedElements = formElement['housing-features'].querySelectorAll(':checked');

      return [...checkedElements].every((element) => features.includes(element.value));
    }
  };
}

export default createMatcher;
