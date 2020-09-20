import AbstractView from "./abstract.js";
import FilterItemView from "./filter-item.js";

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = this._makeTemplateFromArrayClass(FilterItemView, filters, {type: currentFilterType});

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return (
      `<div>
        <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">
          ${this._filters}
          <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
      </div>`
    );
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

}
