import {MONTHS} from "../const";

const createDateFormat = (time) => time.toISOString().split(`T`).slice(0, -1).toString();

const createMonthDayFormat = (date) => {
  return `${MONTHS[Number(date.split(`-`)[1]) - 1]} ${Number(date.split(`-`)[2])}`;
};

const createDays = (eventsArray) => {
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

export {createDays};
