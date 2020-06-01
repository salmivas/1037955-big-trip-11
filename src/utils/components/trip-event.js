import {capitalize} from "../common";
import moment from "moment";

const createEventTitle = (type, destination) => {
  return `${capitalize(type)} ${(type === `check-in`) || (type === `sightseeing`) || (type === `restaurant`) ? `in` : `to`}${destination ? ` ${destination}` : ``}`;
};

const castTimeFormat = (value) => value < 10 ? `0${value}` : String(value);

const createDateTimeFormat = (date) => date.toISOString();

const createTimeFormat = (date) => moment(date).format(`HH:mm`);

const createTimeInputFormat = (date) => moment(date).format(`DD/MM/YY HH:mm`);

const createTimeDurationFormat = (dateStart, dateEnd) => {
  const duration = moment.duration(moment(dateEnd).diff(moment(dateStart)));

  return `${duration.days() > 0 ? `${castTimeFormat(duration.days())}D` : ``}${duration.hours() > 0 ? ` ${castTimeFormat(duration.hours())}H` : ``}${duration.minutes() > 0 ? ` ${castTimeFormat(duration.minutes())}M` : ``}`;
};

const calculateOrder = (start, end) => {
  const momentStart = moment(start, `DD/MM/YY hh:mm`);
  const momentEnd = moment(end, `DD/MM/YY hh:mm`);
  return {
    isBefore: moment(momentStart).isBefore(momentEnd),
    isAfter: moment(momentStart).isAfter(momentEnd),
  };
};

export {
  createEventTitle,
  createDateTimeFormat,
  createTimeFormat,
  createTimeDurationFormat,
  createTimeInputFormat,
  calculateOrder,
};
