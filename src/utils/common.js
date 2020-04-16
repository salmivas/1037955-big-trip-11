import {MONTHS} from "../const";

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREBEGIN: `beforebegin`,
  BEFOREEND: `beforeend`,
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const shuffleArray = (anyArray) => {
  for (let i = anyArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = anyArray[i];
    anyArray[i] = anyArray[j];
    anyArray[j] = temp;
  }
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  shuffleArray(array);
  return array[randomIndex];
};

const setFirstLetterInUppercase = (anyString) => {
  return anyString.replace(/^./, (str) => str.toUpperCase());
};

const createDateFormat = (time) => time.toISOString().split(`T`).slice(0, -1).toString();

const createMonthDayFormat = (date) => {
  const regExToMatchValidFormat = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  return regExToMatchValidFormat.test(date) ?
    `${MONTHS[Number(date.split(`-`)[1]) - 1]} ${Number(date.split(`-`)[2])}` :
    `${MONTHS[Number(createDateFormat(date).split(`-`)[1]) - 1]} ${Number(createDateFormat(date).split(`-`)[2])}`;
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.BEFOREGEGIN:
      container.before(element);
      break;
  }
};

export {
  getRandomIntegerNumber,
  getRandomArrayItem,
  setFirstLetterInUppercase,
  shuffleArray,
  createDateFormat,
  createMonthDayFormat,
  createElement,
  RenderPosition,
  render,
};
