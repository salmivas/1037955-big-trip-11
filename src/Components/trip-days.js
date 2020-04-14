import createTripDayMarkup from "./trip-day";
import {createElement} from "../utils/common";
import {createDaysData} from "../utils/trip-day";

const createTripDaysMarkup = (events) => {
  const days = createDaysData(events);
  const daysMarkup = days.map((day) => {
    const dayEvents = events.filter((event) => event.dateFrom.toDateString() === new Date(day.date).toDateString());
    return createTripDayMarkup(day, dayEvents);
  }).join(`\n`);
  return (
    `<ul class="trip-days">
      ${daysMarkup}
    </ul>`
  );
};

export default class TripDays {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createTripDaysMarkup(this._events);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
