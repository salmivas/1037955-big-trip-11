import Event from "../models/event";

const isOnline = () => {
  return window.navigator.onLine;
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
          const items = events.reduce((acc, current) => {
            return Object.assign({}, acc, {
              [current.id]: current,
            });
          }, {});

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
}
