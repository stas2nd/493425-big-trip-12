import {createElement} from "../utils.js";

const createFilterItemTemplate = ({value, text, state = ``}) => {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${value}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${value}" ${state}>
      <label class="trip-filters__filter-label" for="filter-${value}">${text}</label>
    </div>`
  );
};

export default class FilterItem {
  constructor(filter) {
    this._element = null;
    this._filter = filter;
  }

  getTemplate() {
    return createFilterItemTemplate(this._filter);
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
