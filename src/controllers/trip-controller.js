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
    if (days.length > 0) {
      render(this._container, this._sortComponent, RenderPosition.AFTEREND);
      const tripSort = document.querySelector(`.trip-sort`);
      render(tripSort, this._tripDaysComponent, RenderPosition.AFTEREND);
    } else {
      render(this._container, this._noEventsComponent, RenderPosition.AFTEREND);
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
  }
}

export default TripController;
