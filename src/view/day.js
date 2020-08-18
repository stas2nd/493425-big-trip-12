import {createElement, humanizeDate} from "../utils";

export default class Day {
  constructor(day, index) {
    this._element = null;
    this._day = day;
    this._index = day ? index += 1 : ``;
  }

  getTemplate() {
    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${this._index}</span>
          <time class="day__date" datetime="${this._day}">${humanizeDate(this._day)}</time>
        </div>
        <ul class="trip-events__list">
        </ul>
      </li>`
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
