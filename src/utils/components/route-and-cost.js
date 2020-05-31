import {createMonthDayFormat} from "../common";

const getCost = (events) => {
  const totalByBasePrice = events.reduce((acc, cur) => acc + cur.basePrice, 0);
  const totalByAdditionalOffersPrice = events.reduce((acc, cur) => acc + cur.offers.reduce((accO, curO) => accO + curO.price, 0), 0);
  return {
    totalByBasePrice: events.length > 0 ? totalByBasePrice : 0,
    totalByAdditionalOffersPrice: events.length > 0 ? totalByAdditionalOffersPrice : 0,
    sumTotal: events.length > 0 ? totalByBasePrice + totalByAdditionalOffersPrice : 0,
  };
};

const sortEventsByDate = (events) => events.slice().sort((a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime());

const getRouteString = (events) => {
  const sortedEvents = sortEventsByDate(events);
  return events.length > 3 ?
    `${sortedEvents[0].destination.name} &mdash; ... &mdash; ${sortedEvents[sortedEvents.length - 1].destination.name}` :
    `${sortedEvents[0].destination.name} &mdash; ${sortedEvents[Math.floor(sortedEvents.length / 2)].destination.name} &mdash; ${sortedEvents[sortedEvents.length - 1].destination.name}`;
};

const getTravelDatesString = (events) => {
  const sortedEvents = sortEventsByDate(events);
  return `${createMonthDayFormat(sortedEvents[0].dateFrom)}&nbsp;&mdash;&nbsp;${createMonthDayFormat(sortedEvents[sortedEvents.length - 1].dateTo)}`;
};

const createRouteAndCostData = (events) => {
  return {
    cost: getCost(events),
    pointsString: events.length > 0 ? getRouteString(events) : ``,
    travelDatesString: events.length > 0 ? getTravelDatesString(events) : ``,
  };
};

export {createRouteAndCostData};
