import {makeTemplateFromArrayClass, createElement} from "../utils.js";
import SortingItemView from "./sorting-item.js";

export default class Sorting {
  constructor(sortings) {
    this._element = null;
    this._sortings = makeTemplateFromArrayClass(SortingItemView, sortings);
  }

  getTemplate() {
    return (
      `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        ${this._sortings}
      </form>`
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
