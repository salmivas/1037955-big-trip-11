const TIME_IN_MS = {
  get SEC() {
    return 1e3;
  },
  get MIN() {
    return this.SEC * 60;
  },
  get HOUR() {
    return this.MIN * 60;
  },
  get DAY() {
    return this.HOUR * 24;
  },
};

const MONTHS = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`, `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];

const TYPES_OF_ACTIVITY = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];

const ACTIVITIES_BY_TYPE = {
  movements: [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`],
  places: [`check-in`, `sightseeing`, `restaurant`],
};

const NUMBER_OF_EVENTS_PER_DAY = 4;

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

export {TIME_IN_MS, TYPES_OF_ACTIVITY, ACTIVITIES_BY_TYPE, NUMBER_OF_EVENTS_PER_DAY, MONTHS, FilterType};
