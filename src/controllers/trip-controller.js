import SortComponent from "../Components/sort";
import TripDaysComponent from "../Components/trip-days";
import TripDayComponent from "../Components/trip-day";
import TripEventComponent from "../Components/trip-event";
import EventEditComponent from "../Components/event-edit";
import NoEventsComponent from "../Components/no-events";
import {render, RenderPosition, replace} from "../utils/render";

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

const renderTripDays = (days, events, cities) => {
  const tripEventsHeader = document.querySelector(`.trip-events h2`);
  if (days.length > 0) {
    render(tripEventsHeader, new SortComponent(), RenderPosition.AFTEREND);
    const tripSort = document.querySelector(`.trip-sort`);
    render(tripSort, new TripDaysComponent(), RenderPosition.AFTEREND);
  } else {
    render(tripEventsHeader, new NoEventsComponent(), RenderPosition.AFTEREND);
  }

  days.forEach((day) => {
    const dayEvents = events.filter((event) => event.dateFrom.toDateString() === new Date(day.date).toDateString());
    const tripDayComponent = new TripDayComponent(day);
    const dayElement = tripDayComponent.getElement().querySelector(`.trip-events__list`);
    const tripDaysElement = document.querySelector(`.trip-days`);

    render(tripDaysElement, tripDayComponent, RenderPosition.BEFOREEND);
    dayEvents.forEach((event) => {
      renderEvent(dayElement, event, cities);
    });
  });
};

class TripController {
  /**
   * Makes a trip component (route and sort) and adds it on the page
   * @param {Element} container An element that the controller will draw everything to
   */
  constructor(container) {
    this._container = container;
  }

  render(days, events, cities) {
    renderTripDays(days, events, cities);
  }
}

export default TripController;
