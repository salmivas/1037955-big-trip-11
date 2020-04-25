import {
  createEventTitle,
  createTimeInputFormat,
} from "../utils/components/trip-event";
import {ACTIVITIES_BY_TYPE} from "../const";
import {capitalize} from "../utils/common";
import AbstractComponent from "./abstract-component";

const createEventEditOfferMarkup = (offersType, offer, id) => {
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offersType}-${id}" name="event-offer-${offersType}" type="checkbox" ${offer.isChecked ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${offersType}-${id}">
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

const createOffersMarkup = (offers, id) => {
  const offersList = offers.offers.map((offer) => createEventEditOfferMarkup(offers.type, offer, id)).join(`\n`);
  return (
    offers.offers.length > 0 ?
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

const createEventEditMarkup = (event, cities) => {
  const {basePrice, dateFrom, dateTo, destination, id, isFavorite, offers, type} = event;

  const offersMarkup = createOffersMarkup(offers, id);
  const destinationDescriptionMarkup = createDestinationDescriptionMarkup(destination.description, destination.pictures);
  const eventTypeMovementsMarkup = ACTIVITIES_BY_TYPE.movements.map((activity) => createEventTypeItemMarkup(activity, type, id)).join(`\n`);
  const eventTypePlacesMarkup = ACTIVITIES_BY_TYPE.places.map((activity) => createEventTypeItemMarkup(activity, type, id)).join(`\n`);
  const destinationList = cities.map((city) => createDestinationListMarkup(city)).join(`\n`);
  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
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

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-${id}" class="event__favorite-checkbox  visually-hidden" type="checkbox"
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
          </button>
        </header>

        <section class="event__details">
          ${offersMarkup}
          ${destinationDescriptionMarkup}
        </section>
        </section>
      </form>
    </li>`
  );
};

export default class EventEdit extends AbstractComponent {
  constructor(event, cities) {
    super();

    this._event = event;
    this._cities = cities;
  }

  getTemplate() {
    return createEventEditMarkup(this._event, this._cities);
  }

  setEditFormSubmitHandler(handler) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`change`, handler);
  }
}
