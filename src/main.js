import RouteAndCostComponent from "../src/Components/route-and-cost";
import SwitchTripViewComponent from "../src/Components/switch-tirp-view";
import FiltersComponent from "../src/Components/filters";
import TripController from "./controllers/trip";
import {events, cities} from "./mock/event";
import {createDaysData} from "./utils/components/trip-day";
import {createRouteAndCostData} from "./utils/components/route-and-cost";
import {render, RenderPosition} from "./utils/render";

const days = createDaysData(events);
const routeAndCostList = createRouteAndCostData(events);

const tripMain = document.querySelector(`.trip-main`);
const tripViewSwitcher = document.querySelector(`.trip-controls h2:first-child`);
const tripFilters = document.querySelector(`.trip-controls h2:last-child`);
const tripEventsHeader = document.querySelector(`.trip-events h2`);

render(tripMain, new RouteAndCostComponent(routeAndCostList), RenderPosition.AFTERBEGIN);
render(tripViewSwitcher, new SwitchTripViewComponent(), RenderPosition.AFTEREND);
render(tripFilters, new FiltersComponent(), RenderPosition.AFTEREND);

const tripComponent = new TripController(tripEventsHeader);
tripComponent.render(days, events, cities);
