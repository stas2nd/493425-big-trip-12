import {createElement} from "../utils.js";

const createSortingItemTemplate = ({interactive, id, text, icon = false, state = ``}) => {
  const imgIcon = `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
    <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
  </svg>`;
  return (
    interactive ?
      `<div class="trip-sort__item  trip-sort__item--${id}">
        <input id="sort-${id}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${id}" ${state}>
        <label class="trip-sort__btn" for="sort-${id}">
          ${text}
          ${icon ? imgIcon : ``}
        </label>
      </div>`
      : `<span class="trip-sort__item  trip-sort__item--${id}">${text}</span>`
  );
};

export default class SortingItem {
  constructor(sorting) {
    this._element = null;
    this._sorting = sorting;
  }

  getTemplate() {
    return createSortingItemTemplate(this._sorting);
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
