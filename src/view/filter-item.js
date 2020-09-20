import AbstractView from "./abstract.js";

export default class FilterItem extends AbstractView {
  constructor(filter, rest) {
    super();
    this._filter = filter;
    this._currentFilterType = rest.find((v) => v.type !== undefined).type;
  }

  getTemplate() {
    return (
      `<div class="trip-filters__filter">
        <input id="filter-${this._filter.value}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${this._filter.value}" ${this._currentFilterType === this._filter.value ? `checked` : ``}>
        <label class="trip-filters__filter-label ${this._filter.disabled ? `trip-filters__filter-label--disabled` : ``}" for="filter-${this._filter.value}">${this._filter.text}</label>
      </div>`
    );
  }
}
