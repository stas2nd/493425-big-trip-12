import {createElement} from "../utils.js";

export default class EventOffer {
  constructor(offer) {
    this._element = null;
    this._offer = offer;
  }

  getTemplate() {
    return (
      `<li class="event__offer">
        <span class="event__offer-title">${this._offer.text}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${this._offer.price}</span>
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
