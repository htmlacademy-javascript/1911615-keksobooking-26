import { offerNameByType } from './card-popup.js';
import { createModal, successMessageElement, errorMessageElement } from './modal.js';

const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.children;
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.children;


// Блокировка полей форм

/**
 * Проверяет на блокировку элементы формы.
 * @param {array} Elements Элементы формы.
 */
function toggleDisabledElements(Elements) {
  for (const element of Elements) {
    element.disabled = !element.disabled;
  }
}

/**
 * Переключает активность состояния формы.
 */
export function toggleReadOnly (){
  adForm.classList.toggle('ad-form--disabled');
  mapFilters.classList.toggle('map__filters--disabled');
  toggleDisabledElements(adFormElements);
  toggleDisabledElements(mapFiltersElements);
}

// Создание валидации формы
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
  errorTextTag: 'span',
});

const titleField = adForm.querySelector('#title');
const typeField = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');
const timeinField = adForm.querySelector('#timein');
const timeoutField = adForm.querySelector('#timeout');
const roomNumberField = adForm.querySelector('#room_number');
const capacityField = adForm.querySelector('#capacity');

const minPriceDictionary = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};

const SettlementOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const roomsNumberByCapacityOptions = {
  '1': 'от 1 до 3-х',
  '2': 'от 2-х до 3-х',
  '3': '3',
  '0': '100'
};


// Валидация заголовка
function validateTittle (value) {
  const regular = /(?!\b\s+\b)\s+/g;
  return value.length >= 30
  && value.length <= 100
  && value.trim().length > 0
  && value.replace(regular, ' ').length >=30;
}

pristine.addValidator(
  titleField,
  validateTittle,
  'От 30 до 100 символов, не более 2-х пробелов подряд.'
);


// Валидация цены
function validatePrice () {
  return minPriceDictionary[typeField.value] <= priceField.value;
}

function getPriceErrorMessage () {
  return `
  Для типа жилья "${offerNameByType[typeField.value]}" минимальная цена - ${minPriceDictionary[typeField.value].toLocaleString('ru')} руб.
  `;
}

function onTypeChange () {
  priceField.placeholder = minPriceDictionary[typeField.value];
  pristine.validate(priceField);
}

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);
typeField.addEventListener('change', onTypeChange);


// Валидация количества комнат и жильцов
function validateSettlement () {
  return SettlementOptions[roomNumberField.value].includes(capacityField.value);
}

function getCapacityErrorMessage () {
  return `Количество комнат ${roomNumberField.value} -
  ${roomNumberField.value === '100' ? 'не для гостей' : `для гостей, но не более ${roomNumberField.value}`}
  `;
}

function getRoomNumberErrorMessage () {
  return `Для числа гостей -
    ${capacityField.value === '0' ? 'не для гостей' : `${capacityField.value}`}
    доступно комнат - ${roomsNumberByCapacityOptions[capacityField.value]}
  `;
}

function onSettlementChange () {
  pristine.validate(capacityField);
  pristine.validate(roomNumberField);
}

pristine.addValidator(capacityField, validateSettlement, getCapacityErrorMessage);
pristine.addValidator(roomNumberField, validateSettlement, getRoomNumberErrorMessage);
capacityField.addEventListener('change', onSettlementChange);
roomNumberField.addEventListener('change', onSettlementChange);

// Валидация часов заселения
function validateTime () {
  return timeinField.value === timeoutField.value;
}

function onTimeinChange () {
  timeoutField.value = timeinField.value;
  pristine.validate(timeinField);
}

function onTimeoutChange () {
  timeinField.value = timeoutField.value;
  pristine.validate(timeoutField);
}

pristine.addValidator(timeinField, validateTime, 'Время заезда должно совпадать с временем выезда.');
pristine.addValidator(timeoutField, validateTime, 'Время заезда должно совпадать с временем выезда.');
timeinField.addEventListener('change', onTimeinChange);
timeoutField.addEventListener('change', onTimeoutChange);

// Валидация формы
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    createModal(successMessageElement);
  } else {
    createModal(errorMessageElement);
  }
});

