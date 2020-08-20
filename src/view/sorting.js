import AbstractView from "./abstract.js";
import SortingItemView from "./sorting-item.js";
import {SORT_ITEM_ARRAY} from "../const.js";

export default class Sorting extends AbstractView {
  constructor() {
    super();
    this._sortings = this._makeTemplateFromArrayClass(SortingItemView, SORT_ITEM_ARRAY);

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return (
      `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        ${this._sortings}
      </form>`
    );
  }

  _sortTypeChangeHandler() {
    const type = Array.from(this.getElement().querySelectorAll(`.trip-sort__input`)).find((input) => input.checked).value.slice(5);
    this._callback.sortTypeChange(type);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
