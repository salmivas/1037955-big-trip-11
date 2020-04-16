import {createElement} from "../utils/common";

const createTripInfoMainMarkup = (pointsString, travelDatesString) => {
  return pointsString && travelDatesString && (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${pointsString}</h1>

      <p class="trip-info__dates">${travelDatesString}</p>
    </div>`
  );
};

const createRouteAndCostMarkup = (routeAndCostData) => {
  const {cost, pointsString, travelDatesString} = routeAndCostData;
  const trinInfoMarkup = routeAndCostData && createTripInfoMainMarkup(pointsString, travelDatesString);
  const totalSum = routeAndCostData && cost.sumTotal;
  return (
    `<section class="trip-main__trip-info  trip-info">
      ${trinInfoMarkup}

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalSum}</span>
      </p>
    </section>`
  );
};

export default class RouteAndCost {
  constructor(routeAndCostData) {
    this._routeAndCostData = routeAndCostData;
    this._element = null;
  }

  getTemplate() {
    return createRouteAndCostMarkup(this._routeAndCostData);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
