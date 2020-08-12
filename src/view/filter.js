import {makeTemplateFromArrayClass, createElement} from "../utils.js";
import FilterItemView from "./filter-item.js";

const createFilterTemplate = (filters) => {
  filters = makeTemplateFromArrayClass(FilterItemView, filters);
  return (
    `<div>
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        ${filters}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>`
  );
};

export default class Filter {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
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
