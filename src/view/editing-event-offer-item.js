import {createElement} from "../utils.js";

export default class EditingEventOffer {
  constructor(offer, rest) {
    this._element = null;
    this._offer = offer;
    this._id = rest.find((v) => v.currentId !== undefined).currentId;
  }

  getTemplate() {
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${this._offer.name}-${this._id}" type="checkbox" name="event-offer-${this._offer.name}" ${this._offer.choosed ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${this._offer.name}-${this._id}">
          <span class="event__offer-title">${this._offer.text}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${this._offer.price}</span>
        </label>
      </div>`
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
