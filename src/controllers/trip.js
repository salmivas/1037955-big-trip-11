import SortComponent from "../Components/sort";
import TripDaysComponent from "../Components/trip-days";
import NoEventsComponent from "../Components/no-events";
import {render, RenderPosition} from "../utils/render";
import {SortType} from "../utils/components/sort";
import {calculateDuration} from "../utils/components/trip-event";
import EventController from "./event";
import TripDayController from "./day";

const getSortedEvents = (events, sortType) => {
  const sortByTime = (a, b) => calculateDuration(b.dateFrom, b.dateTo) - calculateDuration(a.dateFrom, a.dateTo);
  const sortByPrice = (a, b) => b.basePrice - a.basePrice;

  const eventsBySortType = {
    [SortType.TIME_DOWN]: [...events].sort(sortByTime),
    [SortType.PRICE_DOWN]: [...events].sort(sortByPrice),
    [SortType.DEFAULT]: events,
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

const renderEvents = (events, cities, tripDayControllers, onDataChange, onViewChange) => {
  return events.map((event) => {
    const eventController = new EventController(tripDayControllers[0].getTripEventsList(), onDataChange, onViewChange);
    eventController.render(event, cities);

    return eventController;
  });
};

const renderEventsPerDay = (events, cities, dayControllers, onDataChange, onViewChange) => {
  const eventControllers = [];
  dayControllers.forEach((controller) => {
    const currentDayEvents = events.filter((event) => {
      return event.dateFrom.toDateString() === new Date(controller.getDay().date).toDateString();
    });

    if (currentDayEvents.length === 0) {
      return;
    }

    currentDayEvents.forEach((event) => {
      const eventController = new EventController(controller.getTripEventsList(), onDataChange, onViewChange);
      eventController.render(event, cities);
      eventControllers.push(eventController);
    });
  });
  return eventControllers;
};

export default class TripController {
  /**
   * Makes the trip component (route and sort) and adds it on the page
   * @param {Element} container An element that the controller will draw everything to
   * @param {Events} eventsModel An instance of the Events class
   */
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._eventControllers = [];
    this._tripDayControllers = [];
    this._sortComponent = new SortComponent();
    this._noEventsComponent = new NoEventsComponent();
    this._tripDaysComponent = new TripDaysComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._eventsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const events = this._eventsModel.getEvents();

    if (events.length > 0) {
      render(this._container, this._sortComponent, RenderPosition.AFTEREND);
      render(this._sortComponent.getElement(), this._tripDaysComponent, RenderPosition.AFTEREND);
    } else {
      render(this._container, this._noEventsComponent, RenderPosition.AFTEREND);
    }

    this._renderEventsPerDay(events);
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
    const cities = this._eventsModel.getCities();
    const days = this._eventsModel.getDays();

    this._renderTripDays(days);
    this._eventControllers = renderEventsPerDay(events, cities, this._tripDayControllers, this._onDataChange, this._onViewChange);
  }

  _renderEvents(events) {
    const cities = this._eventsModel.getCities();

    this._renderTripDays();
    this._eventControllers = renderEvents(events, cities, this._tripDayControllers, this._onDataChange, this._onViewChange);
  }

  _rerenderEvents(events, perDay = true) {
    this._removeEvents();
    if (!perDay) {
      this._renderEvents(events);
      return;
    }
    this._renderEventsPerDay(events);
  }

  _onSortTypeChange(sortType) {
    const events = this._eventsModel.getEvents();
    const sortedEvents = getSortedEvents(events, sortType);

    if (sortType === SortType.DEFAULT) {
      this._rerenderEvents(sortedEvents);
      return;
    }

    this._rerenderEvents(sortedEvents, false);
  }

  _updateEvents() {
    const events = this._eventsModel.getEvents();

    this._rerenderEvents(events);
  }

  _onDataChange(eventController, oldData, newData) {
    const isSuccess = this._eventsModel.updateEvent(oldData.id, newData);

    if (isSuccess && eventController !== null) {
      eventController.render(newData);
      return;
    }
  }

  _onViewChange() {
    this._eventControllers.forEach((eventController) => eventController.setDefaultView());
  }

  _onFilterChange() {
    this._eventsModel.setDays();
    this._updateEvents();
  }
}
