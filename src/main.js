import RouteAndCostComponent from "../src/Components/route-and-cost";
import SwitchTripViewComponent, {MenuItem} from "../src/Components/switch-tirp-view";
import StatisticsComponent from "../src/Components/statistics";
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
const tripEvents = document.querySelector(`.trip-events`);
const tripEventsHeader = document.querySelector(`.trip-events h2`);
const newEventButton = document.querySelector(`.trip-main__event-add-btn`);
const mainPageBody = document.querySelector(`main .page-body__container`);

render(tripMain, new RouteAndCostComponent(routeAndCostList), RenderPosition.AFTERBEGIN);

const switchTripViewComponent = new SwitchTripViewComponent();
render(tripViewSwitcher, switchTripViewComponent, RenderPosition.AFTEREND);

const filterController = new FilterController(tripFilters, eventsModel);
filterController.render();

const tripEventsContainer = {
  tripEvents: {
    getHiddenClassName() {
      return tripEvents.classList[0].concat(`--hidden`);
    },

    hide() {
      tripEvents.classList.add(this.getHiddenClassName());
    },

    show() {
      if (tripEvents.classList.contains(this.getHiddenClassName())) {
        tripEvents.classList.remove(this.getHiddenClassName());
      }
    }
  },

  tripEventsHeader
};

const tripController = new TripController(tripEventsContainer, eventsModel);
tripController.render();

const statisticsComponent = new StatisticsComponent();
render(mainPageBody, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

newEventButton.addEventListener(`click`, (evt) => {
  evt.target.disabled = !evt.target.disabled;

  tripController.createEvent(evt.target);
  filterController.setFilterToDefault();
});

switchTripViewComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      statisticsComponent.hide();
      tripController.show();
      break;
    case MenuItem.STATS:
      tripController.hide();
      statisticsComponent.show();
      break;
  }
});
