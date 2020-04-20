import SortComponent from "../Components/sort";
import TripDaysComponent from "../Components/trip-days";
import TripDayComponent from "../Components/trip-day";
import TripEventComponent from "../Components/trip-event";
import EventEditComponent from "../Components/event-edit";
import NoEventsComponent from "../Components/no-events";
import {render, RenderPosition, replace} from "../utils/render";
import {SortType} from "../utils/components/sort";
import {calculateDuration} from "../utils/components/trip-event";

const getSortedEvents = (events, sortType) => {
  let sortedEvents = [];
  const shownEvents = events.slice();

  switch (sortType) {
    case SortType.TIME_DOWN:
      sortedEvents = events.slice().sort((a, b) => calculateDuration(b.dateFrom, b.dateTo) - calculateDuration(a.dateFrom, a.dateTo));
      break;
    case SortType.PRICE_DOWN:
      sortedEvents = events.slice().sort((a, b) => b.basePrice - a.basePrice);
      break;
    case SortType.DEFAULT:
      sortedEvents = shownEvents;
      break;
  }

  return sortedEvents;
};

const renderEvent = (eventElement, event, cities) => {
  const replaceEventToEdit = () => {
    replace(eventEditComponent, tripEventComponent);
  };

  const replaceEditToEvent = () => {
    replace(tripEventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const tripEventComponent = new TripEventComponent(event);
  tripEventComponent.setRollupButtonClickHandler(() => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const eventEditComponent = new EventEditComponent(event, cities);
  eventEditComponent.setEditFormSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventElement, tripEventComponent, RenderPosition.BEFOREEND);
};

const renderEvents = (container, typeOfEvents, cities, currentDay) => {
  const tripDayComponent = new TripDayComponent(currentDay);
  const dayElement = tripDayComponent.getElement().querySelector(`.trip-events__list`);

  render(container, tripDayComponent, RenderPosition.BEFOREEND);
  typeOfEvents.forEach((event) => {
    renderEvent(dayElement, event, cities);
  });
};

const renderEventsPerDay = (container, days, events, cities) => {
  days.forEach((day) => {
    const currentDayEvents = events.filter((event) => event.dateFrom.toDateString() === new Date(day.date).toDateString());

    renderEvents(container, currentDayEvents, cities, day);
  });
};

class TripController {
  /**
   * Makes the trip component (route and sort) and adds it on the page
   * @param {Element} container An element that the controller will draw everything to
   */
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent();
    this._noEventsComponent = new NoEventsComponent();
    this._tripDaysComponent = new TripDaysComponent();
  }

  render(days, events, cities) {
    const tripDaysElement = this._tripDaysComponent.getElement();
    const tripSortElement = this._sortComponent.getElement();
    if (days.length > 0) {
      render(this._container, this._sortComponent, RenderPosition.AFTEREND);
      render(tripSortElement, this._tripDaysComponent, RenderPosition.AFTEREND);
    } else {
      render(this._container, this._noEventsComponent, RenderPosition.AFTEREND);
    }

    renderEventsPerDay(tripDaysElement, days, events, cities);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      const sortedEvents = getSortedEvents(events, sortType);
      tripDaysElement.innerHTML = ``;

      if (sortType === SortType.DEFAULT) {
        renderEventsPerDay(tripDaysElement, days, sortedEvents, cities);
        return;
      }
      renderEvents(tripDaysElement, sortedEvents, cities);
    });
  }
}

export default TripController;
