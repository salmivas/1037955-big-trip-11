import {
  getRandomIntegerNumber,
  getRandomArrayItem,
  shuffleArray,
} from "../utils/common";
import {TYPES_OF_ACTIVITY} from "../const";

const cities = [`Melbourne`, `Tokio`, `Amsterdam`, `Geneva`, `Rome`];

const destinationDescription = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
];

const offers = {
  "taxi": {
    type: `taxi`,
    offers: [
      {
        "title": `Upgrade to business class`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Choose a radio station`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Order Uber`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Talk to driver`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }
    ]
  },
  "bus": {
    type: `bus`,
    offers: [
      {
        "title": `Book tickets`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Switch to comfort seats`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Air conditioner`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Include TV`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }
    ]
  },
  "train": {
    type: `train`,
    offers: [
      {
        "title": `Book tickets`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Comfort class`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Include meals`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Include TV`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Include shower`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }
    ]
  },
  "ship": {
    type: `ship`,
    offers: [
      {
        "title": `Book tickets`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `First class`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Free alcohol`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Сaptain's cabin visit`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `One time honk`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }
    ]
  },
  "transport": {
    type: `transport`,
    offers: [
      {
        "title": `Book tickets`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Porter service`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Taxi to station`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Include meals`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      },
    ]
  },
  "drive": {
    type: `drive`,
    offers: [
      {
        "title": `Fuel`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Toll highway`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Meals`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Rent a car`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      },
    ]
  },
  "flight": {
    type: `flight`,
    offers: [
      {
        "title": `Add luggage`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Switch to comfort class`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Add meal`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Choose seats`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Travel by train`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      },
    ]
  },
  "check-in": {
    type: `check-in`,
    offers: [
      {
        "title": `Add breakfast`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `King bed`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Add meal`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Switch to lux`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Bar`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      },
    ]
  },
  "sightseeing": {
    type: `sightseeing`,
    offers: [
      {
        "title": `Book tickets`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Lunch in a city`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Photosession`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Guide services`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      },
    ]
  },
  "restaurant": {
    type: `restaurant`,
    offers: [
      {
        "title": `Smorgasbord`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Fish menu`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Meat menu`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      }, {
        "title": `Vegetarian menu`,
        "price": getRandomIntegerNumber(10, 300),
        "isChecked": Math.random() > 0.5 ? true : false,
      },
    ]
  },

};

const getRandomDate = () => {
  const HOURS_IN_WEEK = 24 * 7;
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, HOURS_IN_WEEK);

  targetDate.setHours(targetDate.getHours() + diffValue);

  return targetDate;
};

const getRandomPhotoArray = (destinationName) => {
  let photoURLs = new Set();
  for (let i = 0; i < getRandomIntegerNumber(1, 5); i++) {
    photoURLs.add(
        {
          src: `http://picsum.photos/300/150?r=${Math.random()}`,
          description: `${destinationName} any description`,
        }
    );
  }
  return Array.from(photoURLs);
};

const generateDestination = (destinationName) => {
  const generatedDescription = destinationDescription.slice(getRandomIntegerNumber(0, destinationDescription.length - 1), destinationDescription.length);
  shuffleArray(generatedDescription);
  return {
    description: generatedDescription.join(` `),
    name: destinationName,
    pictures: getRandomPhotoArray(destinationName),
  };
};

const generateEvent = (time = getRandomDate()) => {
  const startTime = time;
  const endTime = new Date(
      startTime.getFullYear(),
      startTime.getMonth(),
      startTime.getDate(),
      startTime.getHours() + getRandomIntegerNumber(1, 3),
      getRandomIntegerNumber(0, 59)
  );
  const typeOfEvent = getRandomArrayItem(TYPES_OF_ACTIVITY);
  return {
    basePrice: getRandomIntegerNumber(100, 1000),
    dateFrom: startTime,
    dateTo: endTime,
    destination: generateDestination(getRandomArrayItem(cities)),
    id: getRandomIntegerNumber(0, Number.MAX_SAFE_INTEGER),
    isFavorite: Math.random() > 0.8 ? true : false,
    offers: offers[typeOfEvent],
    type: typeOfEvent,
  };
};

const generateEvents = (count) => {
  return new Array(count)
  .fill(``)
  .map(() => generateEvent())
  .sort((a, b) => a.dateFrom - b.dateFrom);
};

const events = generateEvents(20);

export {events, cities};


