export function createModal(target) {

  return {
    open() {

    },
    close() {

    }
  };
}

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

function isEnterKey(evt) {
  return evt.key === 'Enter';
}

// Сообщения об ошибке/успехе валидации
const mainBody  = document.querySelector('body');
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
