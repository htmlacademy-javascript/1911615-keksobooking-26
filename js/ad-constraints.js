import '../pristine/pristine.min.js';

Pristine.addMessages('ru', {
  required: 'Обязательное поле'
});
Pristine.setLocale('ru');

/**
 * Вернет методы установки ограничений для формы размещения объявления.
 * @param {HTMLFormElement} form Форма размещения объявления.
 * @param {Object} options Настройки pristine.
 */
function createConstraints(form, options) {

  const pristine = new Pristine(form, {
    classTo: options.errorTextParent,
    ...options
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!pristine.validate()) {
      const [invalid] = pristine.getErrors();
      invalid.input.focus();
    } else {
      // Триггер события "formdata".
      new FormData(form);
    }
  });

  form.addEventListener('reset', () => {
    pristine.reset();
  });

  const fields = form.elements;

  return {
    /**
     * Установит ограничение минимальной длины заголовка.
     * @param {number} minLength
     */
    setTitleMinLength(minLength) {
      fields.title.minLength = minLength;

      pristine.addValidator(
        fields.title,
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
      fields.title.maxLength = maxLength;

      return this;
    },

    /**
     * Установит ограничение минимальной цены в зависимости от выбранного вида жилья.
     * @param {Object<string, number>} priceByType
     */
    setPriceMinValue(priceByType) {

      pristine.addValidator(
        fields.price,
        (priceValue) => priceValue >= priceByType[fields.type.value],
        () => `Не дешевле ${priceByType[fields.type.value]}`
      );

      fields.type.addEventListener('change', (event) => {
        fields.price.min = fields.price.placeholder = priceByType[fields.type.value];
        pristine.validate(fields.price, !event.isTrusted);
      });

      fields.type.dispatchEvent(new Event('change'));

      return this;
    },

    /**
     * Установит ограничение максимальной цены.
     * @param {number} maxPrice
     */
    setPriceMaxValue(maxPrice) {
      fields.price.max = maxPrice;

      pristine.addValidator(
        fields.price,
        (priceValue) => priceValue <= maxPrice,
        `Не дороже ${maxPrice}`
      );

      return this;
    },

    /**
     * Установит ограничение минимального и максимального
     * числа гостей в зависимости от количества комнат.
     */
    setCapacity() {
      const notForGuestsValue = [...fields.rooms.options].pop().value;

      pristine.addValidator(fields.guests, (guestsValue) =>{
        if (fields.rooms.value === notForGuestsValue) {
          return guestsValue === '0';
        }
        return true;
      }, 'Не для гостей', 1, true);

      pristine.addValidator(fields.guests, (guestsValue) =>{
        if (guestsValue === '0') {
          return fields.rooms.value === notForGuestsValue;
        }
        return true;
      }, 'Не менее 1');

      pristine.addValidator(
        fields.guests,
        (guestsValue) => guestsValue <= fields.rooms.value,
        () => `Не более ${fields.rooms.value}`
      );

      fields.rooms.addEventListener('change', () => {
        pristine.validate(fields.guests);
      });

      return this;
    },

    /**
     * Переведет поле адреса в состояние "Только для чтения".
     */
    setAddressToReadOnly() {
      fields.address.readOnly = true;

      return this;
    },

    /**
     * Синхронизирует время заезда и выезда.
     */
    syncCheckHours() {
      fields.checkin.addEventListener('change', () => {
        fields.checkout.value = fields.checkin.value;
      });

      fields.checkout.addEventListener('change', () => {
        fields.checkin.value = fields.checkout.value;
      });

      return this;
    }
  };
}

export default createConstraints;
