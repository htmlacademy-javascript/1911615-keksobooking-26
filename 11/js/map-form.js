import {setFormDisabled} from './utilities.js';

/**
 * Инициализирует форму фильтрации объявлений
 * и вернет методы для дальнейшего взаимодействия.
 */
function initMapForm() {
  /**
   * Форма объявления.
   */
  const mapFormElement = document.querySelector('.map__filters');

  return {
    /**
     * Заблокирует/разблокирует форму
     * @param {boolean} flag
     */
    setDisabled(flag) {
      setFormDisabled(mapFormElement, flag).classList.toggle('.map__filters--disabled', flag);

      return this;
    },

    /**
     * Добавит обработчик события.
     */
    on() {
      mapFormElement.addEventListener(...arguments);

      return this;
    },

    /**
     * Сбросит форму до значения по умолчанию.
     */
    reset() {
      mapFormElement.reset();

      return this;
    },

    /**
     * Сбросит форму до значения по умолчанию.
     */
    fire(name) {
      mapFormElement.dispatchEvent(new Event(name));

      return this;
    }
  };
}

export default initMapForm;
