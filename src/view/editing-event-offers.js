import EditingEventOfferItemView from "./editing-event-offer-item.js";
import AbstractView from "./abstract.js";

export default class EditingEventOffers extends AbstractView {
  constructor(offers, count) {
    super();
    this._offers = offers ? this._makeTemplateFromArrayClass(EditingEventOfferItemView, offers, {currentId: count}) : ``;
  }

  getTemplate() {
    return this._offers.length ?
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${this._offers}
        </div>
      </section>`
      : ``;
  }
}
