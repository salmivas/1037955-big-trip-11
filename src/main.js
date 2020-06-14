import API from "./api/index";
import Provider from "./api/provider";
import {NoEventsMessage, END_POINT, AUTHORIZATION} from "./const";
import TripController from "./controllers/trip";
import DestinationsModel from "./models/destinations";
import EventsModel from "./models/events";
import OffersModel from "./models/offers";
import NoEventsComponent from "../src/Components/no-events";
import StatisticsComponent from "../src/Components/statistics";
import SwitchTripViewComponent, {MenuItem} from "../src/Components/switch-tirp-view";
import FilterController from "../src/controllers/filter";
import {render, RenderPosition} from "./utils/render";

const api = new API(END_POINT, AUTHORIZATION);
const apiWithProvider = new Provider(api);
const destinationsModel = new DestinationsModel();
const eventsModel = new EventsModel();
const offersModel = new OffersModel();

const mainPageBody = document.querySelector(`main .page-body__container`);
const newEventButton = document.querySelector(`.trip-main__event-add-btn`);
const tripEvents = document.querySelector(`.trip-events`);
const tripEventsHeader = document.querySelector(`.trip-events h2`);
const tripFilters = document.querySelector(`.trip-controls h2:last-child`);
const tripMain = document.querySelector(`.trip-main`);
const tripViewSwitcher = document.querySelector(`.trip-controls h2:first-child`);

const tripEventsContainer = {
  tripMain,
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

const switchTripViewComponent = new SwitchTripViewComponent();
render(tripViewSwitcher, switchTripViewComponent, RenderPosition.AFTEREND);
const statisticsComponent = new StatisticsComponent(eventsModel);
render(mainPageBody, statisticsComponent, RenderPosition.BEFOREEND);
const noEventsComponent = new NoEventsComponent(NoEventsMessage.LOADING);
render(tripEventsContainer.tripEventsHeader, noEventsComponent, RenderPosition.AFTEREND);
newEventButton.disabled = true;

const filterController = new FilterController(tripFilters, eventsModel);
const tripController = new TripController(tripEventsContainer, eventsModel, destinationsModel, offersModel, apiWithProvider);

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

apiWithProvider.getOffers()
  .then((offers) => {
    offersModel.setOffers(offers);
  })
  .then(() => {
    apiWithProvider.getEvents()
        .then((events) => {
          eventsModel.setEvents(events);
          eventsModel.setDays();
          noEventsComponent.remove();
          filterController.render();
          tripController.render();
          newEventButton.disabled = false;
        });
  })
.catch();

apiWithProvider.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(destinations);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
      .then(() => {})
      .catch(() => {});
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
