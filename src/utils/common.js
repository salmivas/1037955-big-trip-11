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

export {
  getRandomIntegerNumber,
  getRandomArrayItem,
  setFirstLetterInUppercase,
  shuffleArray,
};
