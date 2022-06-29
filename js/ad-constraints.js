import '../pristine/pristine.min.js';

Pristine.addMessages('ru', {
  required: 'Обязательное поле'
});
Pristine.setLocale('ru');


/**
 * Подключит ограничения форме.
 * @param {Element} form Форма для наложения ограничений.
 * @param {object} pristineConfiguration Объект настроек конфигурации pristine.
 */
function createConstraints (form, pristineConfiguration) {
  const pristine = new Pristine(form, pristineConfiguration);
  const fields = form.elements;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!pristine.validate()) {
      const [invalid] = pristine.getErrors();
      invalid.input.focus();
    } else {
      new FormData(form);
    }
  });

  return {

    /**
     * Задать минимальную длину поля "Заголовок".
     * @param {number} minLength
     */
    setTitleMinLength: function(minLength) {
      fields.title.minLength = minLength;
      pristine.addValidator(
        fields.title,
        (titleValue) => titleValue.replace(/\s+/g, ' ').trim().length >= fields.title.minLength,
        `Не менее ${fields.title.minLength} символов, не более 2-х пробелов подряд`
      );

      return this;
    },

    /**
     * Задать максимальную длину поля "Заголовок".
     * @param {number} maxLength
     */
    setTitleMaxLength: function(maxLength) {
      fields.title.maxLength = maxLength;

      return this;
    },

    /**
     * Задать ограничения минимальной цены на основании объекта конфигурации
     * @param {object} priceConfiguration Объект настроек цен в зависимости от типа жилья.
     */
    setPriceMinValue: function(priceConfiguration) {

      pristine.addValidator(
        fields.price,
        (priceValue) => priceValue >= priceConfiguration[fields.type.value],
        () => `Не дешевле ${priceConfiguration[fields.type.value]}`
      );

      fields.type.addEventListener('change', (event) => {
        fields.price.min = fields.price.placeholder = priceConfiguration[fields.type.value];
        pristine.validate(fields.price, !event.isTrusted);
      });

      fields.type.dispatchEvent(new Event('change'));

      return this;
    },

    /**
     * Задать ограничение максимальной цены.
     * @param {number} maxPrice
     */
    setPriceMaxValue: function(maxPrice) {
      fields.price.max = maxPrice;

      return this;
    },

    /**
     * Задать ограничение числа гостей.
     */
    setCapacity: function() {
      const notForGuests = [...fields.rooms.options].pop().value;

      pristine.addValidator(fields.guests, (guestsValue) =>{
        if (fields.rooms.value === notForGuests) {
          return guestsValue === '0';
        }
        return true;
      }, 'Не для гостей', 1, true);

      pristine.addValidator(fields.guests, (guestsValue) =>{
        if (guestsValue === '0') {
          return fields.rooms.value === notForGuests;
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
     * Заблокировать поле адреса для ручного редактирования.
     */
    setAddressToReadOnly: function() {
      fields.address.readOnly = true;

      return this;
    },

    /**
     * Синхронизировать время заезда и выезда.
     */
    syncCheckHours: function() {
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
