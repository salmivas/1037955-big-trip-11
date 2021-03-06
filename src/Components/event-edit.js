import {
  createEventTitle,
  createTimeInputFormat,
  calculateOrder,
} from "../utils/components/trip-event";
import {ACTIVITIES_BY_TYPE} from "../const";
import {capitalize} from "../utils/common";
import AbstractSmartComponent from "./abstract-smart-component";
import flatpickr from "flatpickr";
import moment from "moment";

import "flatpickr/dist/flatpickr.min.css";

const DefaultData = {
  deleteButtonText: `Delete`,
  saveButtonText: `Save`,
};

const createEventEditOfferMarkup = (offer, isChecked, id) => {
  const offerId = `event-offer-${offer.title.split(` `).join(`-`).toLowerCase()}`;
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${offerId}-${id}" name="${offerId}" type="checkbox" ${isChecked ? `checked` : ``}>
      <label class="event__offer-label" for="${offerId}-${id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  );
};

const createEventTypeItemMarkup = (activityType, currentActivityType, id) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${activityType}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${activityType}" ${currentActivityType === activityType ? `checked` : ``}>
      <label class="event__type-label  event__type-label--${activityType}"
        for="event-type-${activityType}-${id}">${capitalize(activityType)}</label>
    </div>`
  );
};

const createDestinationListMarkup = (city) => {
  return (
    `<option value="${city}"></option>`
  );
};

const createOffersMarkup = (chekedOffers, allTypeOffers, id) => {
  const offersList = allTypeOffers.offers.length ? allTypeOffers.offers.map((offer) => {
    const isChecked = !!chekedOffers.filter((it) => it.title === offer.title).length;
    return createEventEditOfferMarkup(offer, isChecked, id);
  }).join(`\n`) : ``;

  return (
    allTypeOffers.offers.length ?
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offersList}
        </div>
      </section>` : ``
  );
};

const createDestinationDescriptionMarkup = (description, pictures) => {
  const picturesListMarkup = pictures.map((picture) => {
    return (
      `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`
    );
  }).join(`\n`);
  return (
    description.length > 0 ?
      `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${picturesListMarkup}
          </div>
        </div>
      </section>` : ``
  );
};

const createEventEditMarkup = (eventModel, offersModel, cities, isInAddingMode, externalData) => {
  const {basePrice, dateFrom, dateTo, destination, id = `new`, isFavorite, offers, type} = eventModel;

  const deleteButtonText = externalData.deleteButtonText;
  const saveButtonText = externalData.saveButtonText;
  const allTypeOffers = offersModel.getOffersByType(type);
  const offersMarkup = createOffersMarkup(offers, allTypeOffers, id);
  const destinationDescriptionMarkup = createDestinationDescriptionMarkup(destination.description, destination.pictures);
  const eventTypeMovementsMarkup = ACTIVITIES_BY_TYPE.movements.map((activity) => createEventTypeItemMarkup(activity, type, id)).join(`\n`);
  const eventTypePlacesMarkup = ACTIVITIES_BY_TYPE.places.map((activity) => createEventTypeItemMarkup(activity, type, id)).join(`\n`);
  const destinationList = cities.map((city) => createDestinationListMarkup(city)).join(`\n`);
  return (
    `<form class="${isInAddingMode ? `trip-events__item` : ``} event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              ${eventTypeMovementsMarkup}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              ${eventTypePlacesMarkup}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${id}">
            ${createEventTitle(type)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${id}" type="text"
            name="event-destination" value="${destination.name}" list="destination-list-${id}">
          <datalist id="destination-list-${id}">
            ${destinationList}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${id}">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-${id}" type="text"
            name="event-start-time" value="${createTimeInputFormat(dateFrom)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-${id}">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time"
            value="${createTimeInputFormat(dateTo)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${id}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price"
            value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${saveButtonText !== DefaultData.saveButtonText ? `disabled` : ``}>${saveButtonText}</button>
        <button class="event__reset-btn" type="reset" ${deleteButtonText !== DefaultData.deleteButtonText ? `disabled` : ``}>${isInAddingMode ? `Cancel` : deleteButtonText}</button>

        ${!isInAddingMode ?
      `<input id="event-favorite-${id}" class="event__favorite-checkbox  visually-hidden" type="checkbox"
        name="event-favorite" ${isFavorite ? `checked` : ``}>
      <label class="event__favorite-btn" for="event-favorite-${id}">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path
            d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />
        </svg>
      </label>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`
      : ``}
      </header>

      <section class="event__details">
        ${offersMarkup}
        ${destinationDescriptionMarkup}
      </section>
      </section>
    </form>`
  );
};

const createTripEventItemMarkup = (eventModel, offersModel, cities, isInAddingMode, externalData) => {
  const eventEditMarkup = createEventEditMarkup(eventModel, offersModel, cities, isInAddingMode, externalData);
  if (isInAddingMode) {
    return `${eventEditMarkup}`;
  }
  return (
    `<li class="trip-events__item">
      ${eventEditMarkup}
    </li>`
  );
};

const parseOffers = (form, offersType, receivedOffers) => {
  const formOffers = form.querySelectorAll(`.event__offer-checkbox`);
  const isChecked = [];

  formOffers.forEach((offer) => offer.checked && isChecked.push(offer.name.split(`event-offer-`).slice(1).toString()));

  const renewedOffers = receivedOffers.offers.filter((offer) => {
    const offerTitle = offer.title.split(` `).join(`-`).toLowerCase();
    return isChecked.includes(offerTitle) && offer;
  });

  return {
    type: offersType,
    offers: renewedOffers
  };
};

const parseFormData = (formData) => {
  return {
    type: formData.get(`event-type`),
    dateFrom: moment(formData.get(`event-start-time`), `DD/MM/YY HH:mm`).toDate(),
    dateTo: moment(formData.get(`event-end-time`), `DD/MM/YY HH:mm`).toDate(),
    basePrice: +formData.get(`event-price`),
    destination: formData.get(`event-destination`),
    isFavorite: !!formData.get(`event-favorite`),
  };
};

export default class EventEdit extends AbstractSmartComponent {
  constructor(eventModel, destinationsModel, offersModel, isInAddingMode) {
    super();

    this._eventModel = eventModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._currentDestination = eventModel.destination;
    this._currentIsFavorite = eventModel.isFavorite;
    this._currnetOffers = eventModel.offers;
    this._currentType = eventModel.type;

    this._isInAddingMode = isInAddingMode;
    this._flatpickr = null;
    this._submitHandler = null;
    this._favoriteButtonClickHandler = null;
    this._deleteButtonClickHandler = null;
    this._externalData = DefaultData;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    const cities = this._destinationsModel.getCities();

    return createTripEventItemMarkup(this._eventModel, this._offersModel, cities, this._isInAddingMode, this._externalData);
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setFavoriteButtonClickHandler(this._favoriteButtonClickHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  reset() {
    this._eventModel.destination = this._currentDestination;
    this._eventModel.isFavorite = this._currentIsFavorite;
    this._eventModel.offers = this._currnetOffers;
    this._eventModel.type = this._currentType;

    this.rerender();
  }

  getData() {
    const form = this._isInAddingMode ? this.getElement() : this.getElement().querySelector(`.event`);
    const formData = new FormData(form);
    const parsedData = parseFormData(formData);
    const offersType = parsedData.type;
    const receivedOffers = this._offersModel.getOffersByType(offersType);
    const offers = parseOffers(form, offersType, receivedOffers);
    return Object.assign({}, parsedData, {offers});
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
    this.rerender();
  }

  setSubmitHandler(handler) {
    if (this._isInAddingMode) {
      this.getElement().addEventListener(`submit`, handler);
    } else {
      this.getElement().querySelector(`.event`).addEventListener(`submit`, handler);
    }

    this._submitHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    if (this._isInAddingMode) {
      return;
    }
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`change`, handler);

    this._favoriteButtonClickHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);
    this._deleteButtonClickHandler = handler;
  }

  removeElement() {
    this._removeFlatpickr();
    super.removeElement();
  }

  _applyFlatpickr() {
    this._removeFlatpickr();

    this._flatpickr = {
      startTime: this._setFlatpickr(this.getElement().querySelector(`[name = "event-start-time"]`)),
      endTime: this._setFlatpickr(this.getElement().querySelector(`[name = "event-end-time"]`)),
    };
  }

  _setFlatpickr(element) {
    const eventStartTime = this.getElement().querySelector(`[name = "event-start-time"]`);
    const eventEndTime = this.getElement().querySelector(`[name = "event-end-time"]`);

    return flatpickr(element, {
      enableTime: true,
      // eslint-disable-next-line camelcase
      time_24hr: true,
      allowInput: true,
      dateFormat: `d/m/y H:i`,
      maxDate: element.name === eventEndTime.name ? `` : eventEndTime.value,
      minDate: element.name === eventStartTime.name ? `` : eventStartTime.value,
    });
  }

  _removeFlatpickr() {
    if (this._flatpickr) {
      Object.values(this._flatpickr).forEach((value) => value.destroy());
      this._flatpickr = null;
    }
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    const eventsTypeInputList = element.querySelectorAll(`.event__type-input`);
    const eventInputDestination = element.querySelector(`.event__input--destination`);
    const eventInputPrice = element.querySelector(`.event__input--price`);
    const eventStartTime = element.querySelector(`[name = "event-start-time"]`);
    const eventEndTime = element.querySelector(`[name = "event-end-time"]`);

    for (const eventTypeInput of eventsTypeInputList) {
      eventTypeInput.addEventListener(`change`, (evt) => {
        this._eventModel.type = evt.target.value;

        this.rerender();
      });
    }

    eventInputDestination.addEventListener(`change`, (evt) => {
      const destination = this._destinationsModel.getDestinationByName(evt.target.value);
      if (destination) {
        this._eventModel.destination = destination;
        this.rerender();
      }
    });

    eventInputPrice.addEventListener(`keypress`, (evt) => {
      const char = String.fromCharCode(evt.which);

      if (!(/[0-9]/.test(char))) {
        evt.preventDefault();
      }
    });

    eventEndTime.addEventListener(`input`, (evt) => {
      eventEndTime.value = calculateOrder(evt.target.value, eventStartTime.value).isAfter ? evt.target.value : eventStartTime.value;
      this._flatpickr.startTime.set(`maxDate`, eventEndTime.value);
    });

    eventStartTime.addEventListener(`input`, (evt) => {
      eventStartTime.value = calculateOrder(evt.target.value, eventEndTime.value).isBefore ? evt.target.value : eventEndTime.value;
      this._flatpickr.endTime.set(`minDate`, eventStartTime.value);
    });
  }
}
