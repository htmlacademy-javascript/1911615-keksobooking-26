/**
 * Спрячет сообщение при нажатии клавиши `esc`.
 * @param {KeyboardEvent} event
 */
function handleKeydown(event) {
  if (event.key === 'Escape') {
    document.querySelector('.message').click();
  }
}

/**
 * Спрячет сообщение по клику в любой области.
 * @param {MouseEvent} event
 */
function handleMessageClick(event) {
  event.currentTarget.remove();
  document.removeEventListener('keydown', handleKeydown);
}

/**
 * Покажет сообщение.
 * @param {string} type Вид, один из: `success`, `error`.
 * @param {string} message Текст сообщения.
 */
function showMessage(type, message) {
  const {content} = document.querySelector(`#${type}`);
  const element = content.querySelector('.message').cloneNode(true);

  if (message) {
    element.querySelector('p').textContent = message;
  }
  element.addEventListener('click', handleMessageClick);
  document.addEventListener('keydown', handleKeydown);

  document.body.append(element);
}

export default showMessage;
