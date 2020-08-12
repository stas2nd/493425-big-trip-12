import {makeTemplateFromArrayClass, formatDate, createElement} from "../utils.js";
import EditingEventOptionsView from "./editing-event-options.js";
import EditingEventDestinationItemView from "./editing-event-destination-item.js";
import EditingEventOffersView from "./editing-event-offers.js";
import EditingEventDestinationView from "./editing-event-destination.js";

const createEditingEventTemplate = (event) => {
  const opts = new EditingEventOptionsView(event.action).getTemplate();
  const optText = event.action.name.charAt(0).toUpperCase() + event.action.name.slice(1);
  const pretext = event.action.type === `transport` ? `to` : `in`;
  const cities = makeTemplateFromArrayClass(EditingEventDestinationItemView, event.cities);
  const start = event.start;
  const end = event.end;

  const offers = new EditingEventOffersView(event.offers).getTemplate();
  const destination = new EditingEventDestinationView(event.description, event.images).getTemplate();

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
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${event.isFavorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${event.offers ? offers : ``}
          ${destination}
        </section>
      </form>`
  );
};

export default class EditingEvent {
  constructor(event) {
    this._element = null;
    this._event = event;
  }

  getTemplate() {
    return createEditingEventTemplate(this._event);
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
