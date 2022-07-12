/**
 * Базовый адрес для отправки запросов.
 */
const BASE_URL = 'https://26.javascript.pages.academy/keksobooking';

/**
 * Отправит запрос на сервер
 * @param {string} path Относительный путь запроса
 * @param {Object} options
 */
function request(path, options) {
  return fetch(BASE_URL + path, options).then((response) => {
    if (!response.ok) {
      throw response;
    }
    return response.json();
  });
}

/**
 * Получит список объявлений
 * @returns {Promise<Ad[]>}
 */
export function getAds() {
  return request('/data', {
    method: 'get',
    cache: 'force-cache'
  });
}

/**
 * Передаст объявление
 * @param {FormData} data
 */
export function postAd(data) {
  return request('/', {
    method: 'POST',
    body: data
  });
}

