import moment from "moment";

export default class Event {
  constructor(data) {
    this.basePrice = data[`base_price`];
    this.dateFrom = new Date(data[`date_from`]);
    this.dateTo = new Date(data[`date_to`]);
    this.destination = data[`destination`];
    this.id = data[`id`];
    this.isFavorite = data[`is_favorite`];
    this.offers = data[`offers`];
    this.type = data[`type`];
  }

  toRaw() {
    return {
      "base_price": this.basePrice,
      "date_from": moment(this.dateFrom).utc().format(`YYYY-MM-DDTHH:mm:ss.SSS[Z]`),
      "date_to": moment(this.dateTo).utc().format(`YYYY-MM-DDTHH:mm:ss.SSS[Z]`),
      "destination": this.destination,
      "id": this.id,
      "is_favorite": this.isFavorite,
      "offers": this.offers,
      "type": this.type
    };
  }

  static parseEvent(data) {
    return new Event(data);
  }

  static parseEvents(data) {
    return data.map(Event.parseEvent);
  }

  static clone(data) {
    return new Event(data.toRaw());
  }
}
