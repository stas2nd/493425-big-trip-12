import {createElement} from "../utils.js";

const createHeadInfoTemplate = ({route, dates, price}) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
    ${dates ?
      `<div class="trip-info__main">
        ${route ? `<h1 class="trip-info__title">${route}</h1>` : ``}
        <p class="trip-info__dates">${dates}</p>
      </div>` : ``}
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
      </p>
    </section>`
  );
};

export default class HeadInfo {
  constructor(info) {
    this._element = null;
    this._info = info;
  }

  getTemplate() {
    return createHeadInfoTemplate(this._info);
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
