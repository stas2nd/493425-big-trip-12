import {createElement} from "../utils.js";

const createEventOfferTemplate = (offer) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.text}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </li>`
  );
};

export default class EventOffer {
  constructor(offer) {
    this._element = null;
    this._offer = offer;
  }

  getTemplate() {
    return createEventOfferTemplate(this._offer);
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
