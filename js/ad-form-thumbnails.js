/**
 * Инициализирует показ загружаемых изображений в виде миниатюр.
 * @param {HTMLFormElement} formElement
 */
function initThumbnails(formElement) {
  /**
   * Аватар автора.
   * @type {HTMLImageElement}
   */
  const authorAvatarElement = formElement.querySelector('.ad-form-header__preview img');

  /**
   * URL-адрес по умолчанию.
   */
  const DEFAULT_AVATAR_URL = authorAvatarElement.src;

  /**
   * Фотография жилья.
   * @type {HTMLDivElement}
   */
  const offerPhotoElement = formElement.querySelector('.ad-form__photo');

  /**
   * Обновит аватар автора.
   * @param {string} url
   */
  function updateAuthorAvatar(url) {
    authorAvatarElement.src = url;
    authorAvatarElement.style.objectFit = 'cover';
  }

  /**
   * Обновит фотографию жилья.
   * @param {string | null} url
   */
  function updateOfferPhoto(url) {
    Object.assign(offerPhotoElement.style, {
      backgroundImage: url,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    });
  }

  // Выбор аватара
  formElement.avatar.addEventListener('change', (event) => {
    updateAuthorAvatar(URL.createObjectURL(...event.target.files));
  });

  // Выбор фотографии жилья
  formElement.images.addEventListener('change', (event) => {
    updateOfferPhoto(`url(${URL.createObjectURL(...event.target.files)})`);
  });

  // Возврат в исходное состояние
  formElement.addEventListener('reset', () => {
    updateAuthorAvatar(DEFAULT_AVATAR_URL);
    updateOfferPhoto(null);
  });

  return formElement;
}

export default initThumbnails;
