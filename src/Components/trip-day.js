import AbstractComponent from "./abstract-component";

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

export default class TripDay extends AbstractComponent {
  constructor(day) {
    super();

    this._day = day;
  }

  getTemplate() {
    return createTripDayMarkup(this._day);
  }
}
