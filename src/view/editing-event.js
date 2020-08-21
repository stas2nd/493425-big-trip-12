import {formatDate} from "../utils/event.js";
import EditingEventOptionsView from "./editing-event-options.js";
import EditingEventDestinationItemView from "./editing-event-destination-item.js";
import EditingEventOffersView from "./editing-event-offers.js";
import EditingEventDestinationView from "./editing-event-destination.js";
import AbstractView from "./abstract.js";

export default class EditingEvent extends AbstractView {
  constructor(event, count) {
    super();
    this._event = event;
    this._count = count;
    this._opts = new EditingEventOptionsView(this._event.action, this._count).getTemplate();
    this._optText = this._event.action.name.charAt(0).toUpperCase() + this._event.action.name.slice(1);
    this._pretext = this._event.action.type === `transport` ? `to` : `in`;
    this._cities = this._makeTemplateFromArrayClass(EditingEventDestinationItemView, this._event.cities);
    this._start = this._event.start;
    this._end = this._event.end;

    this._offers = new EditingEventOffersView(this._event.offers, this._count).getTemplate();
    this._destination = new EditingEventDestinationView(this._event.description, this._event.images).getTemplate();

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formCloseHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    return (
      `<form class="trip-events__item  event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-${this._count}">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${this._event.action.name}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${this._count}" type="checkbox">
              ${this._opts}
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-${this._count}">
                ${this._optText} ${this._pretext}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-${this._count}" type="text" name="event-destination" value="${this._event.waypoint}" list="destination-list-1">
              <datalist id="destination-list-1">
                ${this._cities}
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-${this._count}">
                From
              </label>
              <input class="event__input  event__input--time" id="event-start-time-${this._count}" type="text" name="event-start-time" value="${formatDate(this._start)}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-${this._count}">
                To
              </label>
              <input class="event__input  event__input--time" id="event-end-time-${this._count}" type="text" name="event-end-time" value="${formatDate(this._end)}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-${this._count}">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-${this._count}" type="text" name="event-price" value="${this._event.price}">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>

            <input id="event-favorite-${this._count}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${this._event.isFavorite ? `checked` : ``}>
            <label class="event__favorite-btn" for="event-favorite-${this._count}">
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
            ${this._event.offers ? this._offers : ``}
            ${this._destination}
          </section>
        </form>`
    );
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  removeFormSubmitHandler() {
    if (this._callback.formSubmit) {
      this.getElement().removeEventListener(`submit`, this._formSubmitHandler);
      delete this._callback.formSubmit;
    }
  }

  _formCloseHandler(evt) {
    evt.preventDefault();
    this._callback.formClose();
  }

  setFormCloseHandler(callback) {
    this._callback.formClose = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._formCloseHandler);
  }

  removeFormCloseHandler() {
    if (this._callback.formClose) {
      this.getElement().querySelector(`.event__rollup-btn`).removeEventListener(`click`, this._formCloseHandler);
      delete this._callback.formClose;
    }
  }
}
