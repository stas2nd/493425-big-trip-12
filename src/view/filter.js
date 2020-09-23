import AbstractView from "./abstract.js";
import FilterItemView from "./filter-item.js";

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = this._makeTemplateFromArrayClass(FilterItemView, filters, {type: currentFilterType});

    this._typeChangeHandler = this._typeChangeHandler.bind(this);
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

  setTypeChangeHandler(callback) {
    this._callback.typeChange = callback;
    this.getElement().addEventListener(`change`, this._typeChangeHandler);
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.typeChange(evt.target.value);
  }

}
