import {createElement} from "../utils.js";

export default class FilterItem {
  constructor(filter) {
    this._element = null;
    this._filter = filter;
  }

  getTemplate() {
    return (
      `<div class="trip-filters__filter">
        <input id="filter-${this._filter.value}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${this._filter.value}" ${this._filter.state ? this._filter.state : ``}>
        <label class="trip-filters__filter-label" for="filter-${this._filter.value}">${this._filter.text}</label>
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
