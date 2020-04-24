import {
  createMonthDayFormat,
  createDateFormat
} from "../common";

const createDaysData = (events) => {
  return Array.from(new Set(events.map((event) => event.dateFrom.toDateString()))).map((date, i) => {
    return {
      date,
      dateTime: createDateFormat(new Date(date)),
      dayDate: createMonthDayFormat(new Date(date)),
      dayNumber: ++i,
    };
  });
};

export {createDaysData};
