import {makeTemplateFromArray, formatDate} from "../utils.js";
import {createEditingEventOptionsTemplate} from "./editing-event-options.js";
import {createEditingEventDestinationItemTemplate} from "./editing-event-destination-item.js";
import {createEditingEventOffersTemplate} from "./editing-event-offers.js";
import {createEditingEventDestinationTemplate} from "./editing-event-destination.js";
import {ACTIONS} from "../const.js";

export const createEditingEventTemplate = (event) => {
  const opts = createEditingEventOptionsTemplate(ACTIONS, event.action);
  const optText = event.action.name.charAt(0).toUpperCase() + event.action.name.slice(1);
  const pretext = event.action.type === `transport` ? `to` : `in`;
  const cities = makeTemplateFromArray(createEditingEventDestinationItemTemplate, event.cities);
  const start = event.start;
  const end = event.end;

  const offers = createEditingEventOffersTemplate(event.offers);
  const destination = createEditingEventDestinationTemplate(event.description, event.images);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${event.action.name}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            ${opts}
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${optText} ${pretext}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${event.waypoint}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${cities}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(start)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(end)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${event.price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          ${event.offers ? offers : ``}
          ${destination}
        </section>
      </form>`
  );
};
