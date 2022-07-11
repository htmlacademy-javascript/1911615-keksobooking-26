export function getData(url, onSuccess, onError) {
  fetch(
    url,
    {
      method: 'GET',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError('Не удалось получить данные с сервера');
    });
}

export function sendData(url, body, onSuccess, onError) {
  fetch(
    url,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onError();
    });
}
