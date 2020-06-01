import TripDayComponent from "../Components/trip-day";
import {render, RenderPosition, remove} from "../utils/render";

export default class TripDay {
  constructor(container, day) {
    this._container = container;
    this._day = day;

    this._tripDayComponent = null;
  }

  render() {
    this._tripDayComponent = new TripDayComponent(this._day);
    render(this._container, this._tripDayComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._tripDayComponent);
  }

  getTripEventsList() {
    return this._tripDayComponent.getEventsList();
  }

  getDay() {
    return this._day;
  }
}
