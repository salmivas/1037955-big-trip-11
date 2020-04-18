import AbstractComponent from "./abstract-component";

const createTripDaysMarkup = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class TripDays extends AbstractComponent {
  getTemplate() {
    return createTripDaysMarkup();
  }
}
