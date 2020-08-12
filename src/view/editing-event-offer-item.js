import {createElement} from "../utils.js";

const createEditingEventOfferItemTemplate = ({name, text, price, choosed}) => {
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${name}-1" type="checkbox" name="event-offer-${name}" ${choosed ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${name}-1">
        <span class="event__offer-title">${text}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

export default class EditingEventOffer {
  constructor(offer) {
    this._element = null;
    this._offer = offer;
  }

  getTemplate() {
    return createEditingEventOfferItemTemplate(this._offer);
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
