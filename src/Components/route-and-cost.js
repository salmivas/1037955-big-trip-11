import AbstractComponent from "./abstract-component";
import {createRouteAndCostData} from "../utils/components/route-and-cost";

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

export default class RouteAndCost extends AbstractComponent {
  constructor() {
    super();

    this._routeAndCostData = null;
  }

  setData(data) {
    this._routeAndCostData = createRouteAndCostData(data);
  }

  getContainer() {
    return this._container;
  }

  getTemplate() {
    return createRouteAndCostMarkup(this._routeAndCostData);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);
  }
}
