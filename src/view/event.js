import EventOfferView from "./event-offer.js";
import {getHumanizeDiffTime, formatHours, makeTemplateFromArrayClass, createElement} from "../utils";

const createEventTemplate = (event) => {
  const optText = event.action.name.charAt(0).toUpperCase() + event.action.name.slice(1);
  const pretext = event.action.type === `transport` ? `to` : `in`;
  const offers = event.offers ? makeTemplateFromArrayClass(EventOfferView, event.offers.slice(0, 3)) : ``;
  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${event.action.name}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${optText} ${pretext} ${event.waypoint}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${event.start}">${formatHours(event.start)}</time>
            &mdash;
            <time class="event__end-time" datetime="${event.end}">${formatHours(event.end)}</time>
          </p>
          <p class="event__duration">${getHumanizeDiffTime(event.end - event.start)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${event.price}</span>
        </p>
        ${event.offers ?
      `<h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offers}
      </ul>`
      : ``}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Event {
  constructor(event) {
    this._element = null;
    this._event = event;
  }

  getTemplate() {
    return createEventTemplate(this._event);
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
