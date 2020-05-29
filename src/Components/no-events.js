import AbstractComponent from "./abstract-component";

const createNoEventsMarkup = (message) => {
  return (
    `<p class="trip-events__msg">${message}</p>`
  );
};

export default class NoEvents extends AbstractComponent {
  constructor(message) {
    super();

    this._message = message;
  }

  getTemplate() {
    return createNoEventsMarkup(this._message);
  }

  remove() {
    this.getElement().remove();
    this.removeElement();
  }
}
