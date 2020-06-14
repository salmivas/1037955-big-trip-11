import Event from "../models/event";
import Store from "../api/store.js";
import {nanoid} from "nanoid";
import {StoreName} from "../const";

const isOnline = () => {
  return window.navigator.onLine;
};

const getSyncedEvents = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
};

const createEventsStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api) {

    this._api = api;
    this._eventsStore = null;
    this._offersStore = null;
    this._destinaitonsStore = null;
  }

  getEvents() {
    this._eventsStore = new Store(StoreName.EVENTS, window.localStorage);

    if (isOnline()) {
      return this._api.getEvents()
        .then((events) => {
          this._eventsStore.setItems(events.map((event) => event.toRaw()));

          return events;
        });
    }

    const storeEvents = Object.values(this._eventsStore.getItems());

    return Promise.resolve(Event.parseEvents(storeEvents));
  }

  getOffers() {
    this._offersStore = new Store(StoreName.OFFERS, window.localStorage);

    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          this._offersStore.setItems(offers);

          return offers;
        });
    }

    return Promise.resolve(this._offersStore.getItems());
  }

  getDestinations() {
    this._destinaitonsStore = new Store(StoreName.DESTINATIONS, window.localStorage);

    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          this._destinaitonsStore.setItems(destinations);

          return destinations;
        });
    }

    return Promise.resolve(this._destinaitonsStore.getItems());
  }

  updateEvent(id, data) {
    if (isOnline()) {
      return this._api.updateEvent(id, data)
        .then((newEvent) => {
          this._eventsStore.setItem(newEvent.id, newEvent.toRaw());

          return newEvent;
        });
    }

    const localEvent = Event.clone(Object.assign(data, {id}));

    this._eventsStore.setItem(id, localEvent.toRaw());

    return Promise.resolve(localEvent);
  }

  createEvent(event) {
    if (isOnline()) {
      return this._api.createEvent(event)
        .then((newEvent) => {
          this._eventsStore.setItem(newEvent.id, newEvent.toRaw());

          return newEvent;
        });
    }

    const localNewEventId = nanoid();
    const localNewEvent = Event.clone(Object.assign(event, {id: localNewEventId}));

    this._eventsStore.setItem(localNewEvent.id, localNewEvent.toRaw());

    return Promise.resolve(localNewEvent);
  }

  deleteEvent(id) {
    if (isOnline()) {
      return this._api.deleteEvent(id)
        .then(() => this._eventsStore.removeItem(id));
    }

    this._eventsStore.removeItem(id);

    return Promise.resolve();
  }

  sync() {
    if (isOnline()) {
      const storeEvents = Object.values(this._eventsStore.getItems());

      return this._api.sync(storeEvents)
        .then((response) => {
          const createdEvents = getSyncedEvents(response.created);
          const updatedEvents = getSyncedEvents(response.updated);
          const items = createEventsStoreStructure([...createdEvents, ...updatedEvents]);

          this._eventsStore.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}
