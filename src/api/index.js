import Event from "../models/event";
import {Url, Method} from "../const";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getEvents() {
    return this._load({url: Url.EVENTS})
      .then((response) => response.json())
      .then(Event.parseEvents);
  }

  getOffers() {
    return this._load({url: Url.OFFERS}).then((response) => response.json());
  }

  getDestinations() {
    return this._load({url: Url.DESTINATIONS}).then((response) => response.json());
  }

  updateEvent(id, data) {
    return this._load({
      url: `${Url.EVENTS}/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRaw()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(Event.parseEvent);
  }

  createEvent(event) {
    return this._load({
      url: Url.EVENTS,
      method: Method.POST,
      body: JSON.stringify(event.toRaw()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(Event.parseEvent);
  }

  deleteEvent(id) {
    return this._load({url: `${Url.EVENTS}/${id}`, method: Method.DELETE});
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export default API;
