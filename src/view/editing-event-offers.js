import {makeTemplateFromArrayClass, createElement} from "../utils.js";
import EditingEventOfferView from "./editing-event-offer-item.js";

export default class EditingEventOffers {
  constructor(offers, count) {
    this._element = null;
    this._offers = makeTemplateFromArrayClass(EditingEventOfferView, offers, {currentId: count});
  }

  getTemplate() {
    return (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${this._offers}
        </div>
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
