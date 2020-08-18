import EventOfferView from "./event-offer.js";
import {getHumanizeDiffTime, formatHours, makeTemplateFromArrayClass, createElement} from "../utils";

export default class Event {
  constructor(event) {
    this._element = null;
    this._event = event;
    this._optText = this._event.action.name.charAt(0).toUpperCase() + this._event.action.name.slice(1);
    this._pretext = this._event.action.type === `transport` ? `to` : `in`;
    this._offers = this._event.offers ? makeTemplateFromArrayClass(EventOfferView, this._event.offers.filter((offer) => offer.choosed).slice(0, 3)) : ``;
  }

  getTemplate() {
    return (
      `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${this._event.action.name}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${this._optText} ${this._pretext} ${this._event.waypoint}</h3>

          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${this._event.start}">${formatHours(this._event.start)}</time>
              &mdash;
              <time class="event__end-time" datetime="${this._event.end}">${formatHours(this._event.end)}</time>
            </p>
            <p class="event__duration">${getHumanizeDiffTime(this._event.end - this._event.start)}</p>
          </div>

          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${this._event.price}</span>
          </p>
          ${this._event.offers ?
        `<h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${this._offers}
        </ul>`
        : ``}

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
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