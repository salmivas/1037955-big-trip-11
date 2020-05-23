import Event from "./models/event";

const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getEvents() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/big-trip`, {headers})
      .then((response) => response.json)
      .then(Event);
  }
};

export default API;
