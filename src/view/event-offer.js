import AbstractView from "./abstract.js";

export default class EventOffer extends AbstractView {
  constructor(offer) {
    super();
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
}
