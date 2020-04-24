import SortComponent from "../Components/sort";
import TripDaysComponent from "../Components/trip-days";
import TripDayComponent from "../Components/trip-day";
import NoEventsComponent from "../Components/no-events";
import {render, RenderPosition} from "../utils/render";
import {SortType} from "../utils/components/sort";
import {calculateDuration} from "../utils/components/trip-event";
import EventController from "./event";

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

const renderTripDay = (container, day) => {
  const tripDayComponent = new TripDayComponent(day);
  const currentDayEventsContainer = tripDayComponent.getElement().querySelector(`.trip-events__list`);
  render(container, tripDayComponent, RenderPosition.BEFOREEND);
  return currentDayEventsContainer;
};

const renderEvents = (container, events, cities) => {
  return events.map((event) => {
    const eventController = new EventController(renderTripDay(container));

    eventController.render(event, cities);

    return eventController;
  });
};

const renderEventsPerDay = (container, events, cities, days) => {
  const newEvents = [];
  days.forEach((day) => {
    const currentDayEvents = events.filter((event) => event.dateFrom.toDateString() === new Date(day.date).toDateString());
    const currentDayEventsContainer = renderTripDay(container, day);

    currentDayEvents.forEach((event) => {
      const eventController = new EventController(currentDayEventsContainer);

      eventController.render(event, cities);

      newEvents.push(eventController);
    });
  });
  return newEvents;
};

export default class TripController {
  /**
   * Makes the trip component (route and sort) and adds it on the page
   * @param {Element} container An element that the controller will draw everything to
   */
  constructor(container) {
    this._container = container;

    this._events = [];
    this._days = [];
    this._cities = [];
    this._eventControllers = [];
    this._sortComponent = new SortComponent();
    this._noEventsComponent = new NoEventsComponent();
    this._tripDaysComponent = new TripDaysComponent();

    // TODO. Mentor. Ask about whether it would be useful
    this._tripDaysContainer = this._tripDaysComponent.getElement();
    this._tripSortContainer = this._sortComponent.getElement();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(days, events, cities) {
    this._events = events;
    this._days = days;
    this._cities = cities;

    if (days.length > 0) {
      render(this._container, this._sortComponent, RenderPosition.AFTEREND);
      render(this._tripSortContainer, this._tripDaysComponent, RenderPosition.AFTEREND);
    } else {
      render(this._container, this._noEventsComponent, RenderPosition.AFTEREND);
    }

    const newEvents = renderEventsPerDay(this._tripDaysContainer, this._events, this._cities, this._days);
    this._eventControllers = newEvents;
  }

  _onSortTypeChange(sortType) {
    const sortedEvents = getSortedEvents(this._events, sortType);
    this._tripDaysContainer.innerHTML = ``;

    if (sortType === SortType.DEFAULT) {
      const newEvents = renderEventsPerDay(this._tripDaysContainer, sortedEvents, this._cities, this._days);
      this._eventControllers = newEvents;
      return;
    }
    const newEvents = renderEvents(this._tripDaysContainer, sortedEvents, this._cities);
    this._eventControllers = newEvents;
  }
}
