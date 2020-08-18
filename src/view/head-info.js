import {createElement} from "../utils.js";

export default class HeadInfo {
  constructor(info) {
    this._element = null;
    this._info = info;
  }

  getTemplate() {
    return (
      `<section class="trip-main__trip-info  trip-info">
      ${this._info.dates ?
        `<div class="trip-info__main">
          ${this._info.route ? `<h1 class="trip-info__title">${this._info.route}</h1>` : ``}
          <p class="trip-info__dates">${this._info.dates}</p>
        </div>` : ``}
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${this._info.price}</span>
        </p>
      </section>`
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
