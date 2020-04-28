import AbstractComponent from "./abstract-component";

const createDayInfoMarkup = (day) => {
  const {dateTime, dayDate, dayNumber} = day;
  return (
    `<span class="day__counter">${dayNumber}</span>
     <time class="day__date" datetime="${dateTime}">${dayDate}</time>`
  );
};

const createTripDayMarkup = (day) => {
  const dayInfoMarkup = day ? createDayInfoMarkup(day) : ``;
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        ${dayInfoMarkup}
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
