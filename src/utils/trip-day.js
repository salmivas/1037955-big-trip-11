import {
  createMonthDayFormat,
  createDateFormat
} from "./common";

const createDaysData = (eventsArray) => {
  return Array.from(new Set(eventsArray
    .map(
        (event) => createDateFormat(event.dateFrom)
    )))
  .map((date, i) => {
    return {
      date,
      dayDate: createMonthDayFormat(date),
      dayNumber: ++i,
    };
  });
};

export {createDaysData};
