import TripEventComponent from "../Components/trip-event";
import EventEditComponent from "../Components/event-edit";
import {render, RenderPosition, replace} from "../utils/render";

class EventController {
  constructor(container) {
    this._container = container;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._onEscDown = this._onEscDown.bind(this);
  }

  render(event, cities) {
    this._eventComponent = new TripEventComponent(event);
    this._eventEditComponent = new EventEditComponent(event, cities);

    this._eventComponent.setRollupButtonClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setEditFormSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    render(this._container, this.eventComponent, RenderPosition.BEFOREEND);
  }

  _replaceEventToEdit() {
    replace(this._eventEditComponent, this._eventComponent);
  }

  _replaceEditToEvent() {
    replace(this._eventComponent, this._eventEditComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

export default EventController;
