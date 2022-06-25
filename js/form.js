import { offerNameByType } from './card-popup.js';

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

// Валидация формы
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
  errorTextTag: 'span',
});

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
  Для типа жилья "${offerNameByType[typeField.value]}" минимальная цена - ${minPriceDictionary[typeField.value].toLocaleString('ru')} руб.
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

