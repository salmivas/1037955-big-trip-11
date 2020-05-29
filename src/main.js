// import RouteAndCostComponent from "../src/Components/route-and-cost";
import SwitchTripViewComponent, {MenuItem} from "../src/Components/switch-tirp-view";
import StatisticsComponent from "../src/Components/statistics";
import NoEventsComponent from "../src/Components/no-events";
import FilterController from "../src/controllers/filter";
import TripController from "./controllers/trip";
// import {createRouteAndCostData} from "./utils/components/route-and-cost";
import {render, RenderPosition} from "./utils/render";
import {NoEventsMessage, AUTHORIZATION} from "./const";
import EventsModel from "./models/events";
import DestinationsModel from "./models/destinations";
import OffersModel from "./models/offers";
import API from "./api";

const api = new API(AUTHORIZATION);
const eventsModel = new EventsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

// const tripMain = document.querySelector(`.trip-main`);
const tripViewSwitcher = document.querySelector(`.trip-controls h2:first-child`);
const tripFilters = document.querySelector(`.trip-controls h2:last-child`);
const tripEvents = document.querySelector(`.trip-events`);
const tripEventsHeader = document.querySelector(`.trip-events h2`);
const newEventButton = document.querySelector(`.trip-main__event-add-btn`);
const mainPageBody = document.querySelector(`main .page-body__container`);

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

// const routeAndCostComponent = new RouteAndCostComponent(createRouteAndCostData(mockedEvents));
// render(tripMain, routeAndCostComponent, RenderPosition.AFTERBEGIN);
const switchTripViewComponent = new SwitchTripViewComponent();
render(tripViewSwitcher, switchTripViewComponent, RenderPosition.AFTEREND);
const statisticsComponent = new StatisticsComponent(eventsModel);
render(mainPageBody, statisticsComponent, RenderPosition.BEFOREEND);
const noEventsComponent = new NoEventsComponent(NoEventsMessage.LOADING);
render(tripEventsContainer.tripEventsHeader, noEventsComponent, RenderPosition.AFTEREND);
newEventButton.disabled = true;

const filterController = new FilterController(tripFilters, eventsModel);
filterController.render();
const tripController = new TripController(tripEventsContainer, eventsModel, destinationsModel, offersModel, api);


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

api.getOffers()
  .then((offers) => {
    offersModel.setOffers(offers);
  })
  .then(() => {
    api.getEvents()
        .then((events) => {
          eventsModel.setEvents(events);
          eventsModel.setDays();
          noEventsComponent.remove();
          tripController.render();
          newEventButton.disabled = false;
        });
  })
.catch();


api.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(destinations);
  });
