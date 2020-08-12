import {createElement, humanizeDate} from "../utils";

const createDayTemplate = (day, index) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${day}">${humanizeDate(day)}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};

export default class Day {
  constructor(day, index) {
    this._element = null;
    this._day = day;
    this._index = index;
  }

  getTemplate() {
    return createDayTemplate(this._day, this._index);
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
