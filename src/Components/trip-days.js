import createTripDayMarkup from "./trip-day";

const createTripDaysMarkup = (days, events) => {
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

export default createTripDaysMarkup;
