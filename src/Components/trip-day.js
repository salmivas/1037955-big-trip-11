import {createElement} from "../utils/common";

const createTripDayMarkup = (day) => {
  const {date, dayDate, dayNumber} = day;

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime="${date}">${dayDate}</time>
      </div>

      <ul class="trip-events__list"></ul>
    </li>`
  );
};

export default class TripDay {
  constructor(day) {
    this._day = day;
    this._element = null;
  }

  getTemplate() {
    return createTripDayMarkup(this._day);
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
