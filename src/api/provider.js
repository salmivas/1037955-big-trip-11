const isOnline = () => {
  return window.navigator.onLine;
};

export default class Provider {
  constructor(api) {
    this._api = api;
  }

  getEvents() {
    if (isOnline()) {
      return this._api.getEvents();
    }

    return Promise.reject(`offline logic in not implemented`);
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
      return this._api.updateEvent(id, data);
    }

    return Promise.reject(`offline logic in not implemented`);
  }

  createEvent(event) {
    if (isOnline()) {
      return this._api.createEvent(event);
    }

    return Promise.reject(`offline logic in not implemented`);
  }

  deleteEvent(id) {
    if (isOnline) {
      return this._api.deleteEvent(id);
    }

    return Promise.reject(`offline logic in not implemented`);
  }
}
