import TripDaysComponent from "../Components/trip-days";
import NoEventsComponent from "../Components/no-events";
import RouteAndCostComponent from "../Components/route-and-cost";
import {NoEventsMessage} from "../const";
import {render, RenderPosition, remove} from "../utils/render";
import {SortType} from "../utils/components/sort";
import {sortEventsByDate} from "../utils/components/route-and-cost";
import EventController, {Mode as EventControllerMode, EmptyEvent} from "./event";
import TripDayController from "./day";
import SortController from "./sort";

const renderSort = (container, onSortTypeChange) => {
  const sortController = new SortController(container, onSortTypeChange);
  sortController.render();

  return sortController;
};

const calculateDuration = (timeStart, timeEnd) => timeEnd.getTime() - timeStart.getTime();

const getSortedEvents = (events, sortType) => {
  const sortByTime = (a, b) => calculateDuration(b.dateFrom, b.dateTo) - calculateDuration(a.dateFrom, a.dateTo);
  const sortByPrice = (a, b) => b.basePrice - a.basePrice;
  const sortByDefault = (a, b) => a.dateFrom.getTime() - b.dateFrom.getTime();

  const eventsBySortType = {
    [SortType.TIME_DOWN]: [...events].sort(sortByTime),
    [SortType.PRICE_DOWN]: [...events].sort(sortByPrice),
    [SortType.DEFAULT]: [...events].sort(sortByDefault),
  };

  return eventsBySortType[sortType];
};

const renderTripDays = (container, days) => {
  if (!days) {
    const tripDayController = new TripDayController(container);
    tripDayController.render();
    return [tripDayController];
  }

  return days.map((day) => {
    const tripDayController = new TripDayController(container, day);
    tripDayController.render();

    return tripDayController;
  });
};

const renderEvents = (events, destinationsModel, offersModel, tripDayControllers, onDataChange, onViewChange) => {
  return events.map((event) => {
    const eventController = new EventController(tripDayControllers[0].getTripEventsList(), onDataChange, onViewChange);
    eventController.render(event, destinationsModel, offersModel, EventControllerMode.DEFAULT);

    return eventController;
  });
};

const renderEventsPerDay = (events, destinationsModel, offersModel, dayControllers, onDataChange, onViewChange) => {
  const eventControllers = [];
  dayControllers.forEach((controller) => {
    const currentDayEvents = events.filter((event) => {
      return event.dateFrom.toDateString() === new Date(controller.getDay().date).toDateString();
    });

    if (currentDayEvents.length === 0) {
      return;
    }

    sortEventsByDate(currentDayEvents).forEach((event) => {
      const eventController = new EventController(controller.getTripEventsList(), onDataChange, onViewChange);
      eventController.render(event, destinationsModel, offersModel, EventControllerMode.DEFAULT);
      eventControllers.push(eventController);
    });
  });
  return eventControllers;
};

export default class Trip {
  constructor(container, eventsModel, destinationsModel, offersModel, api) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._api = api;

    this._eventControllers = [];
    this._tripDayControllers = [];
    this._creatingEventController = null;
    this._sortController = null;

    this._noEventsComponent = null;
    this._tripDaysComponent = new TripDaysComponent();
    this._routeAndCostComponent = null;
    this._newEventButton = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._eventsModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._container.tripEvents.hide();
  }

  show() {
    this._container.tripEvents.show();
    this._sortController.setSortToDefault();
  }

  render() {
    const events = this._eventsModel.getEvents();

    if (events.length > 0) {
      render(this._container.tripEventsHeader, this._tripDaysComponent, RenderPosition.AFTEREND);
      this._sortController = renderSort(this._container.tripEventsHeader, this._onSortTypeChange);
      this._rerenderRouteAndCost(events);
    } else {
      this._noEventsComponent = new NoEventsComponent(NoEventsMessage.NO_EVENTS);
      render(this._container.tripEventsHeader, this._noEventsComponent, RenderPosition.AFTEREND);
    }

    this._renderEventsPerDay(events);
  }

  createEvent(newEventButton) {
    this._onViewChange();
    this._sortController.setSortToDefault();
    this._newEventButton = newEventButton;

    const eventsListElement = this._tripDaysComponent.getElement();
    this._creatingEventController = new EventController(eventsListElement, this._onDataChange, this._onViewChange);

    this._creatingEventController.render(EmptyEvent, this._destinationsModel, this._offersModel, EventControllerMode.ADDING);
  }

  _removeEvents() {
    this._eventControllers.forEach((eventController) => eventController.destroy());
    this._eventControllers = [];
    this._tripDayControllers.forEach((tripDayController) => tripDayController.destroy());
    this._tripDayControllers = [];
  }

  _renderTripDays(days) {
    this._tripDayControllers = renderTripDays(this._tripDaysComponent.getElement(), days);
  }

  _renderEventsPerDay(events) {
    const days = this._eventsModel.getDays();

    this._renderTripDays(days);
    this._eventControllers = renderEventsPerDay(events, this._destinationsModel, this._offersModel, this._tripDayControllers, this._onDataChange, this._onViewChange);
  }

  _renderEvents(events) {
    this._renderTripDays();
    this._eventControllers = renderEvents(events, this._destinationsModel, this._offersModel, this._tripDayControllers, this._onDataChange, this._onViewChange);
  }

  _rerenderEvents(events, sortType) {
    this._removeEvents();

    switch (sortType) {
      case SortType.DEFAULT:
        this._eventsModel.setDays();
        this._renderEventsPerDay(getSortedEvents(events, SortType.DEFAULT));
        break;
      case SortType.TIME_DOWN:
        this._renderEvents(getSortedEvents(events, SortType.TIME_DOWN));
        break;
      case SortType.PRICE_DOWN:
        this._renderEvents(getSortedEvents(events, SortType.PRICE_DOWN));
        break;
    }
  }

  _rerenderRouteAndCost(events) {
    if (this._routeAndCostComponent) {
      remove(this._routeAndCostComponent);
      this._routeAndCostComponent = null;
    }

    this._routeAndCostComponent = new RouteAndCostComponent();
    this._routeAndCostComponent.setData(events);
    render(this._container.tripMain, this._routeAndCostComponent, RenderPosition.AFTERBEGIN);
  }

  _onSortTypeChange(sortType) {
    const events = this._eventsModel.getEvents();

    switch (sortType) {
      case SortType.DEFAULT:
        this._rerenderEvents(events, SortType.DEFAULT);
        break;
      case SortType.TIME_DOWN:
        this._rerenderEvents(events, SortType.TIME_DOWN);
        break;
      case SortType.PRICE_DOWN:
        this._rerenderEvents(events, SortType.PRICE_DOWN);
        break;
    }
  }

  _updateEvents() {
    const events = this._eventsModel.getEvents();
    const currentSortType = this._sortController.getActiveSortType();

    this._rerenderEvents(events, currentSortType);
    this._rerenderRouteAndCost(events);
  }

  _onDataChange(eventController, oldData, newData) {
    if (oldData === EmptyEvent) {
      if (newData === null) {
        eventController.destroy();
        this._newEventButton.disabled = false;
        this._updateEvents();
      } else {
        delete newData.id;
        this._api.createEvent(newData)
          .then((eventModel) => {
            this._eventsModel.addEvent(eventModel);
            this._removeCreatingEvent();
            this._updateEvents();
          })
          .catch(() => {
            eventController.shake();
          });
      }
    } else if (newData === null) {
      this._api.deleteEvent(oldData.id)
        .then(() => {
          this._eventsModel.removeEvent(oldData.id);
          this._updateEvents();
        })
        .catch(() => {
          eventController.shake();
        });
    } else {
      this._api.updateEvent(oldData.id, newData)
        .then((eventsModel) => {
          const isSuccess = this._eventsModel.updateEvent(oldData.id, eventsModel);

          if (isSuccess && eventController !== null) {
            eventController.render(eventsModel, this._destinationsModel, this._offersModel, EventControllerMode.DEFAULT);
            this._updateEvents();
          }
        })
        .catch(() => {
          eventController.shake();
        });
    }
  }

  _onViewChange() {
    if (this._creatingEventController) {
      this._removeCreatingEvent();
    }

    this._eventControllers.forEach((eventController) => eventController.setDefaultView());
  }

  _onFilterChange() {
    this._eventsModel.setDays();
    this._updateEvents();
    this._sortController.setSortToDefault();
  }

  _removeCreatingEvent() {
    this._creatingEventController.destroy();
    this._creatingEventController = null;
    this._newEventButton.disabled = false;
  }
}
