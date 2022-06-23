import {isEscapeKey, isEnterKey} from './util.js';
import { offerNameByType } from './card-popup.js';

const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.children;
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.children;
const mainBody  = document.querySelector('body');

// Блокировка полей форм
const toggleDisabledElements = (arrayOfElements) => {
  for (const element of arrayOfElements) {
    element.disabled = !element.disabled;
  }
};

function toggleReadOnly (){
  adForm.classList.toggle('ad-form--disabled');
  mapFilters.classList.toggle('map__filters--disabled');
  toggleDisabledElements(adFormElements);
  toggleDisabledElements(mapFiltersElements);
}


// Сообщения об ошибке/успехе валидации
const FormSuccess = 'success';
const FormError = 'error';

const removeValidationMessage = (message) => {
  const messageElement = document.querySelector(`.${message}`);
  mainBody.removeChild(messageElement);
};

const createValidationMessage = (message) => {
  const messageTemplate = document.querySelector(`#${message}`)
    .content
    .querySelector(`.${message}`);
  const messageElement = messageTemplate.cloneNode(true);

  if (message === FormError) {
    const messageErrorButton = messageElement.querySelector('.error__button');
    messageErrorButton.addEventListener('click', () => {
      removeValidationMessage(message);
    });
    messageErrorButton.addEventListener('keydown', (evt) => {
      if (isEnterKey(evt)) {
        removeValidationMessage(message);
      }
    });
  }
  messageElement.addEventListener('click', () => {
    removeValidationMessage(message);
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeValidationMessage(message);
    }
  });
  mainBody.appendChild(messageElement);
};

createValidationMessage(FormError);

// Валидация формы
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
  errorTextTag: 'span',
});

function validateTittle (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(adForm.querySelector('#title'), validateTittle,'От 2 до 50 символов');

const priceField = adForm.querySelector('#price');
const typeField = adForm.querySelector('[name="type"]');
const minPriceDictionary = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};

function validatePrice () {
  return minPriceDictionary[typeField.value] <= priceField.value;
}

function getPriceErrorMessage () {
  return `
  Для типа жилья "${offerNameByType[typeField.value]}" минимальная цена - ${minPriceDictionary[typeField.value]} руб.
  `;
}
pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

function onTypeChange () {
  priceField.placeholder = minPriceDictionary[typeField.value];
  pristine.validate(priceField,);
}

typeField.addEventListener('change', onTypeChange);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {toggleReadOnly};
