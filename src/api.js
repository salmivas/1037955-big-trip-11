import Event from "./models/event";
import {URL} from "./const";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getEvents() {
    return this._getFetch(URL.EVENTS).then(Event.parseEvents);
  }

  getOffers() {
    return this._getFetch(URL.OFFERS);
  }

  getDestinations() {
    return this._getFetch(URL.DESTINATIONS);
  }

  updateEvent(id, data) {
    const headers = this._createAuthorizationHeaders();
    headers.append(`Content-Type`, `application/json`);

    return fetch(`${URL.EVENTS}${id}`, {
      method: `PUT`,
      body: JSON.stringify(data.toRaw()),
      headers,
    })
      .then(checkStatus)
      .then((response) => response.json())
      .then(Event.parseEvent);
  }

  _createAuthorizationHeaders() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    return headers;
  }

  _getFetch(url) {
    const headers = this._createAuthorizationHeaders();

    return fetch(url, {headers})
      .then(checkStatus)
      .then((response) => response.json());
  }
};

export default API;
