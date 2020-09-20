import he from "he";
import EditingEventOptionsView from "./editing-event-options.js";
import EditingEventDestinationItemView from "./editing-event-destination-item.js";
import EditingEventOffersView from "./editing-event-offers.js";
import EditingEventDestinationView from "./editing-event-destination.js";
import SmartView from "./smart.js";
import {ACTIONS, BLANK_EVENT} from "../const.js";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

export default class EditingEvent extends SmartView {
  constructor(destinations, event = BLANK_EVENT) {
    super();
    this._data = EditingEvent.parseEventToData(event);
    this._destinations = destinations;

    this._startDatepicker = null;
    this._endDatepicker = null;

    this._validatedPrice = this._data.price !== undefined && this._data.price !== null ? true : false;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._formCloseHandler = this._formCloseHandler.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._priceBlurHandler = this._priceBlurHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
  }

  getTemplate() {
    this._opts = new EditingEventOptionsView(this._data.action, this._data.id).getTemplate();
    this._optText = this._data.action.name.charAt(0).toUpperCase() + this._data.action.name.slice(1);
    this._pretext = this._data.action.type === `transport` ? `to` : `in`;
    this._cities = this._makeTemplateFromArrayClass(EditingEventDestinationItemView, this._destinations);
    this._start = this._data.start;
    this._end = this._data.end;

    this._offersTemplate = new EditingEventOffersView(this._data.offers, this._data.id).getTemplate();
    this._destination = new EditingEventDestinationView(this._data.description, this._data.images).getTemplate();

    const isSubmitDisabled = !this._destinations.includes(this._data.waypoint) || !this._validatedPrice;
    const deleteText = this._data.isDeleting ? `Deleting...` : `Delete`;

    return (
      `<form class="trip-events__item  event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-${this._data.id}">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${this._data.action.name}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${this._data.id}" ${this._data.isDisabled ? `disabled` : ``} type="checkbox">
              ${this._opts}
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-${this._data.id}">
                ${this._optText} ${this._pretext}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-${this._data.id}" ${this._data.isDisabled ? `disabled` : ``} type="text" name="event-destination" value="${this._data.waypoint ? he.encode(this._data.waypoint) : ``}" list="destination-list-${this._data.id}">
              <datalist id="destination-list-${this._data.id}">
                ${this._cities}
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-${this._data.id}">
                From
              </label>
              <input class="event__input  event__input--time" id="event-start-time-${this._data.id}" ${this._data.isDisabled ? `disabled` : ``} type="text" name="event-start-time" value="${this._start ? this._start : ``}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-${this._data.id}">
                To
              </label>
              <input class="event__input  event__input--time" id="event-end-time-${this._data.id}" ${this._data.isDisabled ? `disabled` : ``} type="text" name="event-end-time" value="${this._end ? this._end : ``}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-${this._data.id}">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-${this._data.id}" ${this._data.isDisabled ? `disabled` : ``} type="text" name="event-price" value="${this._data.price !== undefined && this._data.price !== null ? he.encode(this._data.price.toString()) : ``}">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled || this._data.isDisabled ? `disabled` : ``}>
              ${this._data.isSaving ? `Saving...` : `Save`}
            </button>
            <button class="event__reset-btn" type="reset">
              ${this._data.id === `new` ? `Cancel` : deleteText}
            </button>

            <input id="event-favorite-${this._data.id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${this._data.isFavorite ? `checked` : ``}>
            <label class="event__favorite-btn" for="event-favorite-${this._data.id}">
              <span class="visually-hidden">Add to favorite</span>
              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
              </svg>
            </label>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </header>
          ${this._data.offers || this._destination ?
        `<section class="event__details">
          ${this._data.offers ? this._offersTemplate : ``}
          ${this._destination}
        </section>` : ``}
        </form>`
    );
  }

  removeElement() {
    super.removeElement();

    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormCloseHandler(this._callback.formClose);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setChangeDestinationHandler(this._callback.destinationChange);
    this.setChangeActionHandler(this._callback.actionChange);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
  }

  _setStartDatepicker() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    const inputName = `event-start-time`;
    // 4. Выбор даты в форме редактирования осуществляется с помощью flatpickr
    this._startDatepicker = flatpickr(
        this.getElement().querySelector(`[name=${inputName}]`),
        {
          enableTime: true,
          // 4. Формат даты
          dateFormat: `d/m/y H:i`,
          onChange: this._startDateChangeHandler
        }
    );
    if (this._data.start) {
      this._startDatepicker.setDate(this._data.start);
    }
  }

  _setEndDatepicker() {
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }

    const inputName = `event-end-time`;

    this._endDatepicker = flatpickr(
    // 4. Выбор даты в форме редактирования осуществляется с помощью flatpickr
        this.getElement().querySelector(`[name=${inputName}]`),
        {
          enableTime: true,
          // 4. Формат даты
          dateFormat: `d/m/y H:i`,
          onChange: this._endDateChangeHandler
        }
    );

    if (this._data.end) {
      this._endDatepicker.setDate(this._data.end);
      this._endDatepicker.set(`minDate`, this._data.start);
      this._startDatepicker.set(`maxDate`, this._data.end);
    }
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`click`, this._eventTypeChangeHandler);
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._destinationChangeHandler);
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`input`, this._destinationInputHandler);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._priceInputHandler);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`blur`, this._priceBlurHandler);
    if (this._data.offers && this._data.offers.length) {
      this.getElement()
        .querySelector(`.event__available-offers`)
        .addEventListener(`click`, this._offersChangeHandler);
    }
  }

  _startDateChangeHandler([userDate]) {
    this.updateData({
      start: userDate
    });
    this._endDatepicker.set(`minDate`, userDate);
  }

  _endDateChangeHandler([userDate]) {
    this.updateData({
      end: userDate
    });
    this._startDatepicker.set(`maxDate`, userDate);
  }

  _eventTypeChangeHandler() {
    const typeName = Array.from(this.getElement().querySelectorAll(`.event__type-input`)).find((input) => input.checked).value;
    if (this._data.action.name === typeName) {
      return;
    }
    const newType = ACTIONS.find((action) => action.name === typeName);
    this._callback.actionChange(newType);
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    if (this._data.waypoint !== evt.target.value && this._destinations.includes(evt.target.value)) {
      this._callback.destinationChange(evt.target.value);
    }
  }

  _destinationInputHandler(evt) {
    this.getElement().querySelector(`.event__save-btn`).disabled = !this._destinations.includes(evt.target.value);
  }

  _priceInputHandler(evt) {
    this._validatedPrice = /^[0-9]\d*$/.test(evt.target.value);
    this.getElement().querySelector(`.event__save-btn`).disabled = !this._validatedPrice;
  }

  _priceBlurHandler(evt) {
    evt.preventDefault();
    if (this._data.price !== evt.target.value) {
      this.updateData({
        price: evt.target.value
      }, true);
    }
  }

  _offersChangeHandler() {
    const choosenOffers = Array.from(this.getElement().querySelectorAll(`.event__offer-checkbox`))
      .filter((input) => input.checked).map((input) => input.name.slice(12));
    if (this._data.offers.filter((offer) => offer.choosed).length !== choosenOffers.length) {
      this.updateData({
        offers: this._data.offers.map((offer) => {
          offer.choosed = choosenOffers.includes(offer.name);
          return offer;
        })
      }, true);
    }
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EditingEvent.parseDataToEvent(this._data));
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

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EditingEvent.parseDataToEvent(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  removeDeleteClickHandler() {
    if (this._callback.deleteClick) {
      this.getElement().querySelector(`.event__reset-btn`).removeEventListener(`click`, this._formDeleteClickHandler);
      delete this._callback.deleteClick;
    }
  }

  // 1. Обработчик на закрытие формы
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

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isFavorite: !this._data.isFavorite
    });
    this._callback.favoriteClick(EditingEvent.parseDataToEvent(this._data));
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement()
      .querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, this._favoriteClickHandler);
  }

  setChangeDestinationHandler(callback) {
    this._callback.destinationChange = callback;
  }

  setChangeActionHandler(callback) {
    this._callback.actionChange = callback;
  }

  static parseEventToData(event) {
    return Object.assign(
        {},
        event,
        {
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }

}
