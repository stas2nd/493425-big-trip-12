import EditingEventView from "../view/editing-event.js";
import {remove, render, insertAfter} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";

export default class EventNew {
  constructor(eventsContainer, changeData) {
    this._eventsContainer = eventsContainer;
    this._changeData = changeData;

    this._eventEditComponent = null;
    this._destroyCallback = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;

    if (this._eventEditComponent !== null) {
      return;
    }

    this._eventEditComponent = new EditingEventView();
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._eventEditComponent.setFormCloseHandler(this._handleDeleteClick);

    const sortElement = this._eventsContainer.querySelector(`.trip-events__trip-sort`);
    if (sortElement) {
      insertAfter(sortElement, this._eventEditComponent);
    } else {
      render(this._eventsContainer, this._eventEditComponent);
    }

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._eventEditComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._eventEditComponent);
    this._eventEditComponent = null;
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(event) {
    this._changeData(
        UserAction.ADD_EVENT,
        UpdateType.MINOR,
        event
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
