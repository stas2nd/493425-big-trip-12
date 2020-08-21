import {humanizeDate} from "../utils/event";
import AbstractView from "./abstract.js";

export default class Day extends AbstractView {
  constructor(day, index) {
    super();
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
}
