const mainBody  = document.querySelector('body');
export const successMessageElement = document.querySelector('#success');
export const errorMessageElement = document.querySelector('#error');

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

export function createModal(target) {
  const fragment= target.content.cloneNode(true);
  const messageErrorButton = fragment.querySelector('.error__button');
  document.addEventListener('keydown', onPopupEscKeydown);
  if (messageErrorButton) {
    messageErrorButton.addEventListener('click', removeModal);
  }
  fragment.querySelector('div').addEventListener('click', removeModal);

  return mainBody.appendChild(fragment);
}


