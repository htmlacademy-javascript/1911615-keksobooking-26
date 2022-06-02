// Функция, возвращающая случайное целое число из переданного диапазона включительно.

function getRandomInteger(min, max) {
  const integersCount = Math.floor(max) - Math.floor(min);
  const RandomInteger = Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
  if (min >= max) {
    return 'Ошибка ввода';
  }
  return (integersCount > 0) ? RandomInteger : 'Целых чисел нет';
}

// Временная роверка работы через консоль

// eslint-disable-next-line no-console
console.log(getRandomInteger(1, 1));
// eslint-disable-next-line no-console
console.log(getRandomInteger(3, 2));
// eslint-disable-next-line no-console
console.log(getRandomInteger(0.9, 1.1));
// eslint-disable-next-line no-console
console.log(getRandomInteger(1, 8));

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.

function getRandomFloat(min, max, decimals = 0) {
  const multiplier = Math.pow(10,decimals);
  if (decimals === 0) {
    return getRandomInteger(min, max);
  }
  if (Math.trunc(min*multiplier) >= Math.trunc(max*multiplier)) {
    return 'Ошибка ввода';
  }
  const RandomInteger = Math.floor(Math.random() * (Math.floor(max*multiplier) - Math.ceil(min*multiplier) + 1)) + Math.ceil(min*multiplier);
  const RandomFloat = Math.trunc(RandomInteger) / multiplier;
  return RandomFloat;
}

// Временная роверка работы через консоль

// eslint-disable-next-line no-console
console.log(getRandomFloat(0.9, 1.1, 0));
// eslint-disable-next-line no-console
console.log(getRandomFloat(1, 2, 0));
// eslint-disable-next-line no-console
console.log(getRandomFloat(1.111, 1.113, 3));
// eslint-disable-next-line no-console
console.log(getRandomFloat(1.1111, 1.1112, 3));

// В дальнейшем в проекте "ошибка ввода" и "Целых чисел нет" могут быть заменены на валидацию формы или иной способ сообщить пользователю о некорректном значении заполнения.
