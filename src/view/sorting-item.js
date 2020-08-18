import {createElement} from "../utils.js";

export default class SortingItem {
  constructor(sorting) {
    this._element = null;
    this._sorting = sorting;
    this._imgIcon = `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
      <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
    </svg>`;
  }

  getTemplate() {
    return (
      this._sorting.interactive ?
        `<div class="trip-sort__item  trip-sort__item--${this._sorting.id}">
          <input id="sort-${this._sorting.id}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${this._sorting.id}" ${this._sorting.state ? this._sorting.state : ``}>
          <label class="trip-sort__btn" for="sort-${this._sorting.id}">
            ${this._sorting.text}
            ${this._sorting.icon ? this._imgIcon : ``}
          </label>
        </div>`
        : `<span class="trip-sort__item  trip-sort__item--${this._sorting.id}">${this._sorting.text}</span>`
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
