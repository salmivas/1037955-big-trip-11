import AbstractComponent from "./abstract-component";
import {capitalize} from "../utils/common";
import {NOT_ACTIVE_OPACITY} from "../../src/const";

const createFilterMarkup = (filter) => {
  const {name, checked, isActive} = filter;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
        value="${name}" ${checked ? `checked` : ``} ${isActive ? `` : `disabled`}>
      <label class="trip-filters__filter-label" for="filter-${name}" ${isActive ? `` : `style="opacity: ${NOT_ACTIVE_OPACITY}"`}>${capitalize(name)}</label>
    </div>`
  );
};

const createFiltersMarkup = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it)).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersMarkup}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filters extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFiltersMarkup(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterType = evt.target.value;
      handler(filterType);
    });
  }
}
