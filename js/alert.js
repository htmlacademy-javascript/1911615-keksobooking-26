function showAlert(message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1000';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 'calc((1vw - 1200px)';
  alertContainer.style.top = '0';
  alertContainer.style.right = 'calc((1vw - 1200px) - 750px)';
  alertContainer.style.padding = '10px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#f0f0ea';
  alertContainer.style.width = '450px';
  alertContainer.style.margin = '10px auto 0';
  alertContainer.style.borderRadius = '5px';
  alertContainer.style.boxShadow = '0 0 15px 5px #ccc';
  alertContainer.style.borderLeft = '5px solid #80805b';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
}

export default showAlert;
