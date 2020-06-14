const AUTHORIZATION = `Basic a2lJZdhjayoIKo1b=`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;
const NOT_ACTIVE_OPACITY = 0.6;
const NUMBER_OF_EVENTS_PER_DAY = 4;
const STORE_VER = `v1`;

const ACTIVITIES_BY_TYPE = {
  movements: [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`],
  places: [`check-in`, `sightseeing`, `restaurant`],
};

const TYPES_OF_ACTIVITY = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const NoEventsMessage = {
  LOADING: `Loading...`,
  NO_EVENTS: `Click New Event to create your first point`,
};

const StoreName = {
  EVENTS: `big-trip-events-localstorage-${STORE_VER}`,
  OFFERS: `big-trip-offers-localstorage-${STORE_VER}`,
  DESTINATIONS: `big-trip-destinations-localstorage-${STORE_VER}`,
};

const Url = {
  EVENTS: `points`,
  OFFERS: `offers`,
  DESTINATIONS: `destinations`,
  EVENTS_SYNC: `points/sync`,
};


export {
  ACTIVITIES_BY_TYPE,
  AUTHORIZATION,
  END_POINT,
  FilterType,
  Method,
  NoEventsMessage,
  NOT_ACTIVE_OPACITY,
  NUMBER_OF_EVENTS_PER_DAY,
  StoreName,
  TYPES_OF_ACTIVITY,
  Url,
};
