import AbstractView from "./abstract.js";

export default class SortingItem extends AbstractView {
  constructor(sorting, rest) {
    super();
    this._sorting = sorting;
    this._id = this._sorting.text.toLowerCase().replace(/ /g, ``);
    this._imgIcon = `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
      <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
    </svg>`;
    this._currentSortType = rest.find((v) => v.type !== undefined).type;
  }

  getTemplate() {
    return (
      this._sorting.interactive ?
        `<div class="trip-sort__item  trip-sort__item--${this._id}">
          <input id="sort-${this._id}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${this._id}" ${this._currentSortType === this._id ? `checked` : ``}>
          <label class="trip-sort__btn" for="sort-${this._id}">
            ${this._sorting.text}
            ${this._sorting.icon ? this._imgIcon : ``}
          </label>
        </div>`
        : `<span class="trip-sort__item  trip-sort__item--${this._id}">${this._sorting.text}</span>`
    );
  }
}
