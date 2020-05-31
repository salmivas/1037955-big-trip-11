const TYPES_OF_ACTIVITY = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];

const ACTIVITIES_BY_TYPE = {
  movements: [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`],
  places: [`check-in`, `sightseeing`, `restaurant`],
};

const NUMBER_OF_EVENTS_PER_DAY = 4;

const AUTHORIZATION = `Basic LXlakdj7ad9f8jasQ=`;

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;

const Url = {
  EVENTS: `points`,
  OFFERS: `offers`,
  DESTINATIONS: `destinations`,
};

const NoEventsMessage = {
  LOADING: `Loading...`,
  NO_EVENTS: `Click New Event to create your first point`,
};

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export {
  TYPES_OF_ACTIVITY,
  ACTIVITIES_BY_TYPE,
  NUMBER_OF_EVENTS_PER_DAY,
  FilterType,
  END_POINT,
  Url,
  NoEventsMessage,
  AUTHORIZATION,
  Method,
};
