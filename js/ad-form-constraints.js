import '../pristine/pristine.min.js';
import {formatGuests} from './format.js';

Pristine.addMessages('ru', {required: 'Обязательное поле'});
Pristine.setLocale('ru');

/**
 * Вернет методы установки ограничений для формы размещения объявления.
 * @param {HTMLFormElement} formElement Форма размещения объявления.
 * @param {Object} options Настройки Pristine.
 */
function createConstraints(formElement, options) {
  const pristine = new Pristine(formElement, options);

  formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!pristine.validate()) {
      const [invalid] = pristine.getErrors();
      invalid.input.focus();
    } else {
      // Триггер события "formdata".
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
      formElement.title.minLength = minLength;

      pristine.addValidator(
        formElement.title,
        (titleValue) => titleValue.replace(/\s+/g, '').length >= minLength,
        `Не менее ${minLength} символов`
      );

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
      pristine.addValidator(
        formElement.price,
        (priceValue) => priceValue >= priceByType[formElement.type.value],
        () => `Не дешевле ${priceByType[formElement.type.value]}`
      );

      formElement.type.addEventListener('change', () => {
        updateMinValue();
        pristine.validate(formElement.price);
      });

      formElement.addEventListener('reset', () => {
        requestAnimationFrame(updateMinValue);
      });

      updateMinValue();

      function updateMinValue() {
        formElement.price.min = formElement.price.placeholder = priceByType[formElement.type.value];
      }

      return this;
    },

    /**
     * Установит ограничение максимальной цены.
     * @param {number} maxPrice
     */
    setPriceMaxValue(maxPrice) {
      formElement.price.max = maxPrice;

      pristine.addValidator(
        formElement.price,
        (priceValue) => priceValue <= maxPrice,
        `Не дороже ${maxPrice}`
      );

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
     */
    setCapacity() {
      const notForGuestsValue = [...formElement.rooms.options].pop().value;

      pristine.addValidator(formElement.guests, (guestsValue) =>{
        if (formElement.rooms.value === notForGuestsValue) {
          return guestsValue === '0';
        }
        return true;
      }, 'Не для гостей', 1, true);

      pristine.addValidator(formElement.guests, (guestsValue) =>{
        if (guestsValue === '0') {
          return formElement.rooms.value === notForGuestsValue;
        }
        return true;
      }, `Не менее ${formatGuests(1)}`);

      pristine.addValidator(
        formElement.guests,
        (guestsValue) => guestsValue <= formElement.rooms.value,
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

export default createConstraints;
