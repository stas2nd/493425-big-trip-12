export const createEditingEventOfferItemTemplate = ({id, text, price, state = ``}) => {
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" ${state}>
      <label class="event__offer-label" for="event-offer-${id}-1">
        <span class="event__offer-title">${text}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};
