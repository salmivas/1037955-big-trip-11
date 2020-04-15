import RouteAndCostComponent from "../src/Components/route-and-cost";
import SwitchTripViewComponent from "../src/Components/switch-tirp-view";
import FiltersComponent from "../src/Components/filters";
import SortComponent from "../src/Components/sort";
import TripDaysComponent from "../src/Components/trip-days";
import TripDayComponent from "../src/Components/trip-day";
import TripEventComponent from "./Components/trip-event";
import EventEditComponent from "./Components/event-edit";
import {events, cities} from "./mock/event";
import {createDaysData} from "./utils/trip-day";
import {createRouteAndCostData} from "./utils/route-and-cost";
import {render, RenderPosition} from "./utils/common";

const dayList = createDaysData(events);
const routeAndCostList = createRouteAndCostData(events);

const renderEvent = (eventElement, event) => {
  const onRollupButtonClick = () => {
    eventElement.replaceChild(eventEditComponent.getElement(), tripEventComponent.getElement());
  };

  const onSaveFormSubmit = (evt) => {
    evt.preventDefault();
    eventElement.replaceChild(tripEventComponent.getElement(), eventEditComponent.getElement());
  };

  const tripEventComponent = new TripEventComponent(event);
  const rollupButton = tripEventComponent.getElement().querySelector(`.event__rollup-btn`);
  rollupButton.addEventListener(`click`, onRollupButtonClick);

  const eventEditComponent = new EventEditComponent(event, cities);
  const eventEditElement = eventEditComponent.getElement();
  const editForm = eventEditElement.querySelector(`form`);
  editForm.addEventListener(`submit`, onSaveFormSubmit);

  render(eventElement, tripEventComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderTripDays = (days) => {
  const tripDaysElement = document.querySelector(`.trip-days`);

  days.forEach((day) => {
    const dayEvents = events.filter((event) => event.dateFrom.toDateString() === new Date(day.date).toDateString());
    const tripDayElement = new TripDayComponent(day).getElement();
    const dayElement = tripDayElement.querySelector(`.trip-events__list`);

    render(tripDaysElement, tripDayElement, RenderPosition.BEFOREEND);
    dayEvents.forEach((event) => {
      renderEvent(dayElement, event);
    });
  });
};


const tripMain = document.querySelector(`.trip-main`);
const tripViewSwitcher = document.querySelector(`.trip-controls h2:first-child`);
const tripFilters = document.querySelector(`.trip-controls h2:last-child`);
const tripEventsHeader = document.querySelector(`.trip-events h2`);

render(tripMain, new RouteAndCostComponent(routeAndCostList).getElement(), RenderPosition.AFTERBEGIN);
render(tripViewSwitcher, new SwitchTripViewComponent().getElement(), RenderPosition.AFTEREND);
render(tripFilters, new FiltersComponent().getElement(), RenderPosition.AFTEREND);
render(tripEventsHeader, new SortComponent().getElement(), RenderPosition.AFTEREND);

const tripSort = document.querySelector(`.trip-sort`);
render(tripSort, new TripDaysComponent().getElement(), RenderPosition.AFTEREND);

renderTripDays(dayList);

