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

const URL = {
  EVENTS: `https://11.ecmascript.pages.academy/big-trip/points`,
  OFFERS: `https://11.ecmascript.pages.academy/big-trip/offers`,
  DESTINATIONS: `https://11.ecmascript.pages.academy/big-trip/destinations`,
};

const NoEventsMessage = {
  LOADING: `Loading...`,
  NO_EVENTS: `Click New Event to create your first point`,
};

export {
  TYPES_OF_ACTIVITY,
  ACTIVITIES_BY_TYPE,
  NUMBER_OF_EVENTS_PER_DAY,
  FilterType,
  URL,
  NoEventsMessage
};
