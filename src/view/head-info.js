import AbstractView from "./abstract.js";

export default class HeadInfo extends AbstractView {
  constructor(info) {
    super();
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
}
