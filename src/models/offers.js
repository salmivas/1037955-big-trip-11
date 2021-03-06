export default class Offers {
  constructor() {
    this._offers = [];
  }

  getOffersAll() {
    return this._offers;
  }

  setOffers(offers) {
    this._offers = Array.from(offers);
  }

  getOffersByType(type) {
    return this._offers.find((offer) => offer.type === type);
  }
}
