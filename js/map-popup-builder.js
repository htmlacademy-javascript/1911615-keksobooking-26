/**
 * Вернет методы для создания карточки объявления.
 * @param {DocumentFragment} templateContent
 */
function createPopupBuilder(templateContent) {
  return {
    /**
     * @type {HTMLElement | null}
     */
    element: null,

    /**
     * @param {string} selector
     */
    setContainer(selector){
      this.element = templateContent.querySelector(selector).cloneNode(true);

      return this;
    },

    getContainer() {
      return this.element;
    },

    /**
     * @param {string} selector
     * @param {string} avatar
     */
    setAvatar(selector, avatar) {
      this.element.querySelector(selector).src = avatar;

      return this;
    },

    /**
     * @param {Object<string, string>} textBySelector
     */
    setText(textBySelector) {
      Object.keys(textBySelector).forEach((key) => {
        const element = this.element.querySelector(key);

        if (textBySelector[key]) {
          element.textContent = textBySelector[key];
        } else {
          element.remove();
        }
      });

      return this;
    },

    /**
     * @param {string} selector
     * @param {string[]} features
     */
    setFeatures(selector, features = []) {
      const element = this.element.querySelector(selector);

      if (features.length) {
        const selectors = features.map((name) => `${selector.slice(0, -1)}--${name}`);
        element.replaceChildren(...element.querySelectorAll(selectors));
      } else {
        element.remove();
      }

      return this;
    },

    /**
     * @param {string} selector
     * @param {string[]} photos
     */
    setPhotos(selector, photos = []) {
      const element = this.element.querySelector(selector);

      if (photos.length) {
        const placeholderNode = element.querySelector(selector.slice(0, -1));
        element.replaceChildren(
          ...photos.map((src) => Object.assign(placeholderNode.cloneNode(), {src}))
        );
      } else {
        element.remove();
      }

      return this;
    }
  };
}

export default createPopupBuilder;
