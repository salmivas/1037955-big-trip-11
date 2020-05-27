import Event from "./models/event";
import {URL} from "./const";


const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  _getFetch(url) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(url, {headers})
      .then((response) => response.json());
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
};

export default API;
