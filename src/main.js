import RouteAndCostComponent from "../src/components/route-and-cost";
import SwitchTripViewComponent from "../src/components/switch-tirp-view";
import FiltersComponent from "../src/components/filters";
import SortComponent from "../src/components/sort";
import TripDaysComponent from "../src/components/trip-days";
import createEventEditMarkup from "./components/event-edit";
import {events, cities} from "./mock/event";
import {createDaysData} from "./utils/trip-day";
import {createRouteAndCostData} from "./utils/route-and-cost";
import {render, RenderPosition} from "./utils/common";

const dayList = createDaysData(events);
const routeAndCostList = createRouteAndCostData(events);

// const render = (container, template, place) => {
//   container.insertAdjacentHTML(place, template);
// };

const tripMain = document.querySelector(`.trip-main`);
const tripViewSwitcher = document.querySelector(`.trip-controls h2:first-child`);
const tripFilters = document.querySelector(`.trip-controls h2:last-child`);
const tripEvents = document.querySelector(`.trip-events`);
const tripEventsHeader = document.querySelector(`.trip-events h2`);

render(tripMain, new RouteAndCostComponent(routeAndCostList).getElement(), RenderPosition.AFTERBEGIN);
render(tripViewSwitcher, new SwitchTripViewComponent().getElement(), RenderPosition.AFTEREND);
render(tripFilters, new FiltersComponent().getElement(), RenderPosition.AFTEREND);
render(tripEventsHeader, new SortComponent().getElement(), RenderPosition.AFTEREND);

render(tripEvents, new TripDaysComponent(events).getElement(), RenderPosition.BEFOREEND);
// Only to complete task 9. Do not use ".slice(1)" or "[0]" afterward.
// const firstTripDay = document.querySelector(`.trip-days__item:first-child .trip-events__list`);
// render(firstTripDay, createEventEditMarkup(events[0], cities), `afterbegin`);

