const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.children;
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.children;

const toggleDisabledElements = (arrayOfElements) => {
  for (const element of arrayOfElements) {
    element.disabled = element.disabled !== false;
  }
};

function toggleReadOnly (){
  adForm.classList.toggle('ad-form--disabled');
  mapFilters.classList.toggle('map__filters--disabled');
  toggleDisabledElements(adFormElements);
  toggleDisabledElements(mapFiltersElements);
}

export {toggleReadOnly};
