import TripEventComponent from "../Components/trip-event";
import EventEditComponent from "../Components/event-edit";
import EventModel from "../models/event";
import {render, RenderPosition, replace, remove} from "../utils/render";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`,
};

const EmptyEvent = new EventModel({
  "base_price": 0,
  "date_from": new Date(),
  "date_to": new Date(),
  "destination": {
    name: ``,
    description: ``,
    pictures: []
  },
  "is_favorite": false,
  "offers": [],
  "type": `taxi`
});

const parseFormData = (data, destinationsModel) => {
  return new EventModel({
    "base_price": data.basePrice,
    "date_from": data.dateFrom,
    "date_to": data.dateTo,
    "destination": destinationsModel.getDestinationByName(data.destination),
    "id": data.id,
    "is_favorite": data.isFavorite,
    "offers": data.offers.offers,
    "type": data.type
  });
};

export default class EventController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._eventComponent = null;
    this._eventEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(eventModel, destinationsModel, offersModel, mode) {
    this._mode = mode;
    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;
    const isInAddingMode = this._mode === Mode.ADDING;

    this._eventComponent = new TripEventComponent(eventModel);
    this._eventEditComponent = new EventEditComponent(eventModel, destinationsModel, offersModel, isInAddingMode);

    this._eventComponent.setRollupButtonClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();

      const editFormData = this._eventEditComponent.getData();
      const data = parseFormData(editFormData, destinationsModel);
      this._onDataChange(this, eventModel, data);
      this._replaceEditToEvent();
    });

    this._eventEditComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, eventModel, null));

    this._eventEditComponent.setFavoriteButtonClickHandler(() => {
      const newEvent = EventModel.clone(eventModel);
      newEvent.isFavorite = !newEvent.isFavorite;

      this._onDataChange(this, eventModel, newEvent);
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventEditComponent && oldEventComponent) {
          replace(this._eventComponent, oldEventComponent);
          replace(this._eventEditComponent, oldEventEditComponent);
        } else {
          render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldEventEditComponent && oldEventComponent) {
          remove(this._eventComponent, oldEventComponent);
          remove(this._eventEditComponent, oldEventEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._eventEditComponent, RenderPosition.BEFOREBEGIN);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  destroy() {
    remove(this._eventEditComponent);
    remove(this._eventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._eventEditComponent, this._eventComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._eventEditComponent.reset();

    if (document.contains(this._eventEditComponent.getElement())) {
      replace(this._eventComponent, this._eventEditComponent);
    }

    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyEvent, null);
      }
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

export {Mode, EmptyEvent};
