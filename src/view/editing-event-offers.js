import {makeTemplateFromArrayClass, createElement} from "../utils.js";
import EditingEventOfferView from "./editing-event-offer-item.js";

const createEditingEventOffersTemplate = (offers) => {
  offers = makeTemplateFromArrayClass(EditingEventOfferView, offers);

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offers}
      </div>
    </section>`
  );
};

export default class EditingEventOffers {
  constructor(offers) {
    this._element = null;
    this._offers = offers;
  }

  getTemplate() {
    return createEditingEventOffersTemplate(this._offers);
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
