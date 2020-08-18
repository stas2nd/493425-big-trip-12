import {makeTemplateFromArrayClass, createElement} from "../utils.js";
import FilterItemView from "./filter-item.js";

export default class Filter {
  constructor(filters) {
    this._element = null;
    this._filters = makeTemplateFromArrayClass(FilterItemView, filters);
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

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
