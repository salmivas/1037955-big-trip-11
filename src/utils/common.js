import moment from "moment";

const capitalize = (anyString) => anyString.replace(/^./, (str) => str.toUpperCase());

const createDateFormat = (date) => moment(date).format(`YYYY-MM-DD`);

const createMonthDayFormat = (date) => moment(date).format(`MMM D`).toUpperCase();

export {
  capitalize,
  createDateFormat,
  createMonthDayFormat,
};
