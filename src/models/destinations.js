export default class Destinations {
  constructor() {
    this._destinations = [];
  }

  getDestinationsAll() {
    return this._destinations;
  }

  setDestinations(destinations) {
    // this._destinations = Array.from(destinations);
    this._destinations = Object.values(destinations);
  }

  getDestinationByName(name) {
    return this._destinations.find((destination) => destination.name === name);
  }

  getCities() {
    return this._destinations.map((it) => it.name);
  }
}
