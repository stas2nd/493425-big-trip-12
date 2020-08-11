import {makeTemplateFromArray} from "../utils.js";
import {createEditingEventOfferItemTemplate} from "./editing-event-offer-item.js";

export const createEditingEventOffersTemplate = (offers) => {
  offers = makeTemplateFromArray(createEditingEventOfferItemTemplate, offers);

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offers}
      </div>
    </section>`
  );
};
