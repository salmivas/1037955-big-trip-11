import {capitalize} from "../common";
import moment from "moment";

const createEventTitle = (type, destination) => {
  return `${capitalize(type)} ${(type === `check-in`) || (type === `sightseeing`) || (type === `restaurant`) ? `in` : `to`}${destination ? ` ${destination}` : ``}`;
};

const castTimeFormat = (value) => value < 10 ? `0${value}` : String(value);

const createDateTimeFormat = (date) => date.toISOString();

const createTimeFormat = (date) => moment(date).format(`HH:mm`);

const createTimeInputFormat = (date) => moment(date).format(`DD/MM/YY HH:mm`);

const createTimeDurationFormat = (timeStart, timeEnd) => {
  const duration = moment.duration(moment(timeEnd).diff(moment(timeStart)));

  return `${duration.days() > 0 ? `${castTimeFormat(duration.days())}D` : ``}${duration.hours() > 0 ? ` ${castTimeFormat(duration.hours())}H` : ``}${duration.minutes() > 0 ? ` ${castTimeFormat(duration.minutes())}M` : ``}`;
};

export {
  createEventTitle,
  createDateTimeFormat,
  createTimeFormat,
  createTimeDurationFormat,
  createTimeInputFormat,
};
