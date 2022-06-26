const mainBody  = document.querySelector('body');
const successMessageElement = document.querySelector('#success').content.cloneNode(true);
const errorMessageElement = document.querySelector('#error').content.cloneNode(true);

const onPopupEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    removeModal();
  }
};

// export function createModal(target) {

//   return {
//     open() {

//     },
//     close() {

//     }
//   };
// }


// Сообщения об ошибке/успехе валидации

function removeModal() {
  if (mainBody.querySelector('.error') || mainBody.querySelector('.success')) {
    const target = mainBody.querySelector('.error') ? mainBody.querySelector('.error') : mainBody.querySelector('.success');
    document.removeEventListener('keydown', onPopupEscKeydown);
    mainBody.removeChild(target);
  }
}

function createModal(target) {
  const messageErrorButton = target.querySelector('.error__button');
  document.addEventListener('keydown', onPopupEscKeydown);
  if (messageErrorButton) {
    messageErrorButton.addEventListener('click', removeModal);
  }
  target.querySelector('div').addEventListener('click', removeModal);

  return mainBody.appendChild(target);
}

createModal(errorMessageElement);
