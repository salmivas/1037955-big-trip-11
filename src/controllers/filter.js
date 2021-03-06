import FilterComponent from "../Components/filters";
import {FilterType} from "../const";
import {render, replace, RenderPosition} from "../utils/render";
import {getEventsByFilter} from "../utils/components/filters";

export default class Filter {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._activeFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._eventsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const filters = Object.values(FilterType).map((filterType) => {
      const events = this._eventsModel.getEvents();
      const filteredEvents = getEventsByFilter(events, filterType);

      return {
        name: filterType,
        checked: filterType === this._activeFilterType,
        isActive: filteredEvents.length > 0
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.AFTEREND);
    }
  }

  _onFilterChange(filterType) {
    this._eventsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }

  setFilterToDefault() {
    if (this._activeFilterType === FilterType.EVERYTHING) {
      return;
    }

    this._activeFilterType = FilterType.EVERYTHING;
    this._eventsModel.setFilter(this._activeFilterType);
    this.render();
  }
}
