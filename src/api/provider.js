import Event from "../models/event";

const isOnline = () => {
  return window.navigator.onLine;
};

const getSyncedEvents = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.event);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getEvents() {
    if (isOnline()) {
      return this._api.getEvents()
        .then((events) => {
          const items = createStoreStructure(events.map((event) => event.toRaw()));

          this._store.setItems(items);

          return events;
        });
    }

    const storeEvents = Object.values(this._store.getItems());

    return Promise.resolve(Event.parseEvents(storeEvents));
  }

  getOffers() {
    if (isOnline) {
      return this._api.getOffers();
    }

    return Promise.reject(`offline logic in not implemented`);
  }

  getDestinations() {
    if (isOnline) {
      return this._api.getDestinations();
    }

    return Promise.reject(`offline logic in not implemented`);
  }

  updateEvent(id, data) {
    if (isOnline()) {
      return this._api.updateEvent(id, data)
        .then((newEvent) => {
          this._store.setItem(newEvent.id, newEvent.toRaw());

          return newEvent;
        });
    }

    const localEvent = Event.clone(Object.assign(data, {id}));

    this._store.setItem(id, localEvent.toRaw());

    return Promise.resolve(localEvent);
  }

  createEvent(event) {
    if (isOnline()) {
      return this._api.createEvent(event);
    }

    return Promise.reject(`offline logic in not implemented`);
  }

  deleteEvent(id) {
    if (isOnline) {
      return this._api.deleteEvent(id)
        .then(() => this._store.removeItem(id));
    }

    this._store.removeItem(id);

    return Promise.resolve();
  }

  sync() {
    if (isOnline()) {
      const storeEvents = Object.values(this._store.getItems());

      return this._api.sync(storeEvents)
        .then((response) => {
          const createdEvents = getSyncedEvents(response.created);
          const updatedEvents = getSyncedEvents(response.updated);
          const items = createStoreStructure([...createdEvents, ...updatedEvents]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}
