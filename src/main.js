import RouteAndCostComponent from "../src/Components/route-and-cost";
import SwitchTripViewComponent from "../src/Components/switch-tirp-view";
import FilterController from "../src/controllers/filter";
import TripController from "./controllers/trip";
import {events as mockedEvents, cities} from "./mock/event";
import {createRouteAndCostData} from "./utils/components/route-and-cost";
import {render, RenderPosition} from "./utils/render";
import EventsModel from "./models/events";

const eventsModel = new EventsModel();
eventsModel.setEvents(mockedEvents);
eventsModel.setDays();
eventsModel.setCities(cities);

const routeAndCostList = createRouteAndCostData(mockedEvents);

const tripMain = document.querySelector(`.trip-main`);
const tripViewSwitcher = document.querySelector(`.trip-controls h2:first-child`);
const tripFilters = document.querySelector(`.trip-controls h2:last-child`);
const tripEventsHeader = document.querySelector(`.trip-events h2`);

render(tripMain, new RouteAndCostComponent(routeAndCostList), RenderPosition.AFTERBEGIN);
render(tripViewSwitcher, new SwitchTripViewComponent(), RenderPosition.AFTEREND);
const filterController = new FilterController(tripFilters, eventsModel);
filterController.render();

const tripController = new TripController(tripEventsHeader, eventsModel);
tripController.render();
