import '../pristine/pristine.min.js';

//TODO Передавать "adForm" из main.js
const adForm = document.querySelector('.ad-form');

// Создание валидации формы
Pristine.addMessages('ru', {
  required: 'Обязательное поле'
});

Pristine.setLocale('ru');

const pristine = new Pristine(adForm, {
  //TODO Передавать настройки pristine из main.js
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error',
});

// Валидация формы
adForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!pristine.validate()) {
    const [invalid] = pristine.getErrors();
    invalid.input.focus();
  } else {
    new FormData(adForm);
  }
});

const fields = adForm.elements;

//TODO Возвращать объект с методами установки ограничений

// Валидация заголовка
fields.title.minLength = 30;
fields.title.maxLength = 100;

pristine.addValidator(
  fields.title,
  (titleValue) => titleValue.replace(/\s+/g, ' ').trim().length >= fields.title.minLength,
  `Не менее ${fields.title.minLength} символов, не более 2-х пробелов подряд`
);

// Валидация цены
fields.price.max = 100000;

const priceByType = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};

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


// Валидация количества комнат и жильцов
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

// Синхронизация часов заселения
fields.checkin.addEventListener('change', () => {
  fields.checkout.value = fields.checkin.value;
});

fields.checkout.addEventListener('change', () => {
  fields.checkin.value = fields.checkout.value;
});

