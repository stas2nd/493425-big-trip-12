
import {render, replace, remove} from "../utils/render.js";
import EditingEventView from "../view/editing-event.js";
import EventView from "../view/event.js";
import {UserAction, UpdateType} from "../const.js";
import {isDatesEqual, isArraysEqual} from "../utils/event.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Event {
  constructor(dayContainer, changeData, changeMode) {
    this._dayContainer = dayContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._replaceFormToCard = this._replaceFormToCard.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventView(event);
    this._eventComponent.setEditClickHandler(this._handleEditClick);

    if (prevEventComponent === null) {
      render(this._dayContainer, this._eventComponent);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      this._eventEditComponent = new EditingEventView(this._event);
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    if (prevEventEditComponent) {
      remove(prevEventEditComponent);
    }
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    this._eventEditComponent = new EditingEventView(this._event);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setFormCloseHandler(this._replaceFormToCard);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._eventComponent, this._eventEditComponent);
    this._eventEditComponent.removeFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.removeFormCloseHandler(this._replaceFormToCard);
    remove(this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit(update) {
    const isMinorUpdate =
      !isDatesEqual(this._event.start, update.start) ||
      !isDatesEqual(this._event.end, update.end) ||
      this._event.price !== update.price ||
      !isArraysEqual(this._event.offers, update.offers);

    this._changeData(
        UserAction.UPDATE_EVENT,
        isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
        update
    );
    this._replaceFormToCard();
  }

  _handleDeleteClick(event) {
    this._changeData(
        UserAction.DELETE_EVENT,
        UpdateType.MINOR,
        event
    );
  }

  destroy() {
    remove(this._eventComponent);
    if (this._eventEditComponent) {
      remove(this._eventEditComponent);
    }
  }
}
