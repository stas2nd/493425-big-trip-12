import AbstractView from "./abstract.js";
import SortingItemView from "./sorting-item.js";
import {SORT_ITEMS} from "../const.js";

// 1. Компонент сортировки
export default class Sorting extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._sortings = this._makeTemplateFromArrayClass(SortingItemView, SORT_ITEMS, {type: this._currentSortType});

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
    // 3. С помощью свойства checked узнаем выбранный тип сортировки
    const type = Array.from(this.getElement().querySelectorAll(`.trip-sort__input`)).find((input) => input.checked).value.slice(5);
    this._callback.sortTypeChange(type);
  }

  // 3. Установка колбэка на клик (изменение типа сортировки)
  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
