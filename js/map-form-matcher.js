import {clamp} from './utilities.js';

const ANY = 'any';
const LOW = 'low';
const MIDDLE = 'middle';
const HIGH = 'high';

/**
 * Словарь ценовых диапазонов.
 */
const priceRangeByType = {
  [LOW]: [0, 9999],
  [MIDDLE]: [10000, 49999],
  [HIGH]: [50000, Infinity]
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
    testType(type) {
      const {value} = formElement['housing-type'];

      return value === ANY || value === type;
    },

    /**
     * Проверит соответствие стоимости жилья.
     * @param {number} price
     */
    testPrice(price) {
      const {value} = formElement['housing-price'];

      return value === ANY || price === clamp(price, ...priceRangeByType[value]);
    },

    /**
     * Проверит соответствие количества комнат.
     * @param {number} rooms
     */
    testRooms(rooms) {
      const {value} = formElement['housing-rooms'];

      return value === ANY || Number(value) === rooms;
    },

    /**
     * Проверит соответствие количества гостей.
     * @param {number} guests
     */
    testGuests(guests) {
      const {value} = formElement['housing-guests'];

      return value === ANY || Number(value) === guests;
    },

    /**
     * Проверит соответствие удобств.
     * @param {string[]} features
     */
    testFeatures(features = []) {
      const checkedElements = formElement['housing-features'].querySelectorAll(':checked');

      return [...checkedElements].every((element) => features.includes(element.value));
    }
  };
}

export default createMatcher;
