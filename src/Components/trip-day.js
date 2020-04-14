import createTripEventMarkup from "./trip-event";

const createTripDayMarkup = (day, dayEvents) => {
  const {date, dayDate, dayNumber} = day;
  const eventsMarkup = dayEvents.map((event) => {
    return createTripEventMarkup(event);
  }).join(`\n`);
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime="${date}">${dayDate}</time>
      </div>

      <ul class="trip-events__list">
        ${eventsMarkup}
      </ul>
    </li>`
  );
};

export default createTripDayMarkup;
