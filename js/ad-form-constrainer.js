import '../pristine/pristine.min.js';
import {formatGuests} from './format.js';

Pristine.addMessages('ru', {required: 'Обязательное поле'});
Pristine.setLocale('ru');

/**
 * Вернет методы установки ограничений для формы объявления.
 * @param {HTMLFormElement} formElement Форма объявления.
 * @param {Object} options Настройки Pristine.
 */
function createConstrainer(formElement, options) {
  const pristine = new Pristine(formElement, options);

  formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!pristine.validate()) {
      const [invalid] = pristine.getErrors();
      invalid.input.focus();

    } else {
      // Триггер события "formdata"
      new FormData(formElement);
    }
  });

  formElement.addEventListener('reset', () => {
    pristine.reset();
  });

  return {
    /**
     * Установит ограничение минимальной длины заголовка.
     * @param {number} minLength
     */
    setTitleMinLength(minLength) {
      const message = `Не менее ${minLength} символов`;
      const isValid = (value) => value.replace(/\s+/g, '').length >= minLength;

      pristine.addValidator(formElement.title, isValid, message);
      formElement.title.minLength = minLength;

      return this;
    },

    /**
     * Установит ограничение максимальной длины заголовка.
     * @param {number} maxLength
     */
    setTitleMaxLength(maxLength) {
      formElement.title.maxLength = maxLength;

      return this;
    },

    /**
     * Установит ограничение минимальной цены в зависимости от выбранного вида жилья.
     * @param {Object<string, number>} priceByType
     */
    setPriceMinValue(priceByType) {
      const getMessage = () => `Не дешевле ${priceByType[formElement.type.value]}`;
      const isValid = (value) => value >= priceByType[formElement.type.value];

      pristine.addValidator(formElement.price, isValid, getMessage);

      const updateMinValue = () => {
        const value = priceByType[formElement.type.value];
        formElement.price.min = formElement.price.placeholder = value;
      };

      updateMinValue();

      formElement.type.addEventListener('change', () => {
        updateMinValue();
        pristine.validate(formElement.price);
      });

      formElement.addEventListener('reset', () => {
        requestAnimationFrame(updateMinValue);
      });

      return this;
    },

    /**
     * Установит ограничение максимальной цены.
     * @param {number} maxPrice
     */
    setPriceMaxValue(maxPrice) {
      const message = `Не дороже ${maxPrice}`;
      const isValid = (value) => value <= maxPrice;

      pristine.addValidator(formElement.price, isValid, message);
      formElement.price.max = maxPrice;

      return this;
    },

    /**
     * Установит шаг цены.
     * @param {number} step
     */
    setPriceStep(step) {
      formElement.price.step = step;

      return this;
    },

    /**
     * Установит ограничение минимального и максимального
     * числа гостей в зависимости от количества комнат.
     * @param {Object} options
     */
    setCapacity({roomsNotForGuests = '100'} = {}) {

      pristine.addValidator(formElement.guests, (value) => {
        if (formElement.rooms.value === roomsNotForGuests) {
          return value === '0';
        }
        return true;
      }, 'Не для гостей', 1, true);

      pristine.addValidator(formElement.guests, (value) => {
        if (value === '0') {
          return formElement.rooms.value === roomsNotForGuests;
        }
        return true;
      }, `Не менее ${formatGuests(1)}`);

      pristine.addValidator(
        formElement.guests,
        (value) => value <= formElement.rooms.value,
        () => `Не более ${formatGuests(formElement.rooms.value)}`
      );

      formElement.rooms.addEventListener('change', () => {
        pristine.validate(formElement.guests);
      });

      return this;
    },

    /**
     * Переведет поле адреса в состояние "Только для чтения".
     */
    setAddressToReadOnly() {
      formElement.address.readOnly = true;

      return this;
    },

    /**
     * Синхронизирует время заезда и выезда.
     */
    syncCheckHours() {
      formElement.checkin.addEventListener('change', () => {
        formElement.checkout.value = formElement.checkin.value;
      });

      formElement.checkout.addEventListener('change', () => {
        formElement.checkin.value = formElement.checkout.value;
      });

      return this;
    }
  };
}

export default createConstrainer;
