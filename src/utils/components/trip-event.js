import {capitalize} from "../common";
import {TIME_IN_MS} from "../../const";

const createEventTitle = (type, destination) => {
  return `${capitalize(type)} ${(type === `check-in`) || (type === `sightseeing`) || (type === `restaurant`) ? `in` : `to`}${destination ? ` ${destination}` : ``}`;
};

const createDateTimeFormat = (time) => time.toISOString().split(`.`).slice(0, -1).toString();

const castTimeFormat = (value) => value < 10 ? `0${value}` : String(value);

const createTimeFormat = (time) => `${castTimeFormat(time.getHours())}:${castTimeFormat(time.getMinutes())}`;

const createTimeInputFormat = (time) => {
  const dd = castTimeFormat(time.getDate());
  const mm = castTimeFormat(time.getMonth());
  const yy = castTimeFormat(time.getFullYear()).slice(2);

  return `${dd}/${mm}/${yy} ${createTimeFormat(time)}`;
};


const calculateDuration = (timeStart, timeEnd) => {
  return timeEnd.getTime() - timeStart.getTime();
};

const createTimeDurationFormat = (durationInMs) => {
  const ms = Math.abs(durationInMs);
  const d = ms / TIME_IN_MS.DAY | 0;
  const h = ms % TIME_IN_MS.DAY / TIME_IN_MS.HOUR | 0;
  const m = ms % TIME_IN_MS.HOUR / TIME_IN_MS.MIN | 0;
  return `${d > 0 ? `${castTimeFormat(d)}D` : ``}${h > 0 ? ` ${castTimeFormat(h)}H` : ``}${m > 0 ? ` ${castTimeFormat(m)}M` : ``}`;
};


export {
  createEventTitle,
  createDateTimeFormat,
  createTimeFormat,
  calculateDuration,
  createTimeDurationFormat,
  createTimeInputFormat,
};
