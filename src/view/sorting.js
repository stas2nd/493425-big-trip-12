import {makeTemplateFromArrayClass, createElement} from "../utils.js";
import SortingItemView from "./sorting-item.js";

const createSortingTemplate = (sortItems) => {
  sortItems = makeTemplateFromArrayClass(SortingItemView, sortItems);
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItems}
    </form>`
  );
};

export default class Sorting {
  constructor(sortings) {
    this._element = null;
    this._sortings = sortings;
  }

  getTemplate() {
    return createSortingTemplate(this._sortings);
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
