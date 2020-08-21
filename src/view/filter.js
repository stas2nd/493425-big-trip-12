import AbstractView from "./abstract.js";
import FilterItemView from "./filter-item.js";

export default class Filter extends AbstractView {
  constructor(filters) {
    super();
    this._filters = this._makeTemplateFromArrayClass(FilterItemView, filters);
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
}
