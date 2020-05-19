import AbstractComponent from "./abstract-component";

const MenuItem = {
  TABLE: `Table`,
  STATS: `Stats`
};

const ACTIVE_CLASS = `trip-tabs__btn--active`;

const createSwitchTripViewMarkup = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${MenuItem.TABLE}</a>
      <a class="trip-tabs__btn" href="#">${MenuItem.STATS}</a>
    </nav>`
  );
};

export default class SwitchTripView extends AbstractComponent {
  constructor() {
    super();

    this._currentMenuItem = null;
    this._oldMenuItem = null;
  }

  getTemplate() {
    return createSwitchTripViewMarkup();
  }

  setOnChange(handler) {
    this.getElement().querySelectorAll(`.trip-tabs__btn`).forEach((el) => {
      if (el.classList.contains(ACTIVE_CLASS)) {
        this._currentMenuItem = el;
      }

      el.addEventListener(`click`, (evt) => {
        if (evt.target.classList.contains(ACTIVE_CLASS)) {
          return;
        }

        const menuItem = evt.target.innerText;
        this._currentMenuItem.classList.remove(ACTIVE_CLASS);
        this._oldMenuItem = this._currentMenuItem;
        this._currentMenuItem = evt.target;
        this._currentMenuItem.classList.add(ACTIVE_CLASS);

        handler(menuItem);
      });
    });
  }
}

export {MenuItem};
