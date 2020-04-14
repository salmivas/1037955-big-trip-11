import createRouteAndCostMarkup from "../src/components/route-and-cost";
import createSwitchTripViewMarkup from "../src/components/switch-tirp-view";
import createFiltersMarkup from "../src/components/filters";
import createSortMarkup from "../src/components/sort";
import createTripDaysMarkup from "../src/components/trip-days";
import createEventEditMarkup from "./components/event-edit";
import {events, cities} from "./mock/event";
import {createDaysData} from "./utils/trip-day";
import {createRouteAndCostData} from "./utils/route-and-cost";

const dayList = createDaysData(events);
const routeAndCostList = createRouteAndCostData(events);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector(`.trip-main`);
const tripViewSwitcher = document.querySelector(`.trip-controls h2:first-child`);
const tripFilters = document.querySelector(`.trip-controls h2:last-child`);
const tripEvents = document.querySelector(`.trip-events`);
const tripEventsHeader = document.querySelector(`.trip-events h2`);

render(tripMain, createRouteAndCostMarkup(routeAndCostList), `afterbegin`);
render(tripViewSwitcher, createSwitchTripViewMarkup(), `afterend`);
render(tripFilters, createFiltersMarkup(), `afterend`);
render(tripEventsHeader, createSortMarkup(), `afterend`);

// Only to complete task 9. Do not use ".slice(1)" or "[0]" afterward.
render(tripEvents, createTripDaysMarkup(dayList, events.slice(1)), `beforeend`);
const firstTripDay = document.querySelector(`.trip-days__item:first-child .trip-events__list`);
render(firstTripDay, createEventEditMarkup(events[0], cities), `afterbegin`);

