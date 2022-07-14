import createConstraints from './ad-form-constraints.js';
import renderRangeSlider from './range-slider.js';
import {setFormDisabled} from './utilities.js';

/**
 * Инициализирует форму объявления
 * и вернет методы для дальнейшего взаимодействия.
 */
function initAdForm() {
  /**
   * Форма объявления.
   */
  const formElement = document.querySelector('.ad-form');

  /**
   * Ограничения на ввод данных.
   */
  createConstraints(formElement, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorTextClass: 'ad-form__error'
  })
    .setTitleMinLength(30)
    .setTitleMaxLength(100)
    .setPriceMinValue({bungalow: 0, flat: 1000, hotel: 3000, house: 5000, palace: 10000})
    .setPriceMaxValue(100000)
    .setPriceStep(1000)
    .setCapacity()
    .setAddressToReadOnly()
    .syncCheckHours();

  /**
   * Слайдер диапазона для поля цены.
   */
  const priceSlider = renderRangeSlider(document.querySelector('.ad-form__slider'),{
    syncWith: formElement.price,
  });

  formElement.addEventListener('reset', () => {
    priceSlider.reset();
  });

  return {
    /**
     * Заблокирует/разблокирует форму
     * @param {boolean} flag
     */
    setDisabled(flag) {
      setFormDisabled(formElement, flag).classList.toggle('ad-form--disabled', flag);

      priceSlider.target.toggleAttribute('disabled', flag);
      priceSlider.target.querySelector('[tabindex]').tabIndex = flag ? -1 : 0;

      return this;
    },

    /**
     * Добавит обработчик события.
     */
    on() {
      formElement.addEventListener(...arguments);

      return this;
    },

    /**
     * Сбросит форму до значения по умолчанию.
     */
    reset() {
      formElement.reset();

      return this;
    },

    /**
     * Запишет координаты местоположения в поле адреса.
     * @param {AdLocation} location
     */
    setAddress({lat, lng}) {
      formElement.address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;

      return this;
    }
  };
}

export default initAdForm;
