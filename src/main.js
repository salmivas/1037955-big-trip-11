import RouteAndCostComponent from "../src/Components/route-and-cost";
import SwitchTripViewComponent from "../src/Components/switch-tirp-view";
import FiltersComponent from "../src/Components/filters";
import TripController from "./controllers/trip";
import {events as mockedEvents, cities} from "./mock/event";
import {createDaysData} from "./utils/components/trip-day";
import {createRouteAndCostData} from "./utils/components/route-and-cost";
import {render, RenderPosition} from "./utils/render";
import Events from "./models/events";

const events = new Events();
events.setEvents(mockedEvents);
events._events; /*?*/

const days = createDaysData(mockedEvents);
const routeAndCostList = createRouteAndCostData(mockedEvents);

const tripMain = document.querySelector(`.trip-main`);
const tripViewSwitcher = document.querySelector(`.trip-controls h2:first-child`);
const tripFilters = document.querySelector(`.trip-controls h2:last-child`);
const tripEventsHeader = document.querySelector(`.trip-events h2`);

render(tripMain, new RouteAndCostComponent(routeAndCostList), RenderPosition.AFTERBEGIN);
render(tripViewSwitcher, new SwitchTripViewComponent(), RenderPosition.AFTEREND);
render(tripFilters, new FiltersComponent(), RenderPosition.AFTEREND);

const tripComponent = new TripController(tripEventsHeader);
tripComponent.render(days, mockedEvents, cities);
