import EditingEventView from "../view/editing-event.js";
import {remove, render, insertAfter} from "../utils/render.js";
import {UserAction, UpdateType, BLANK_EVENT} from "../const.js";

export default class EventNew {
  constructor(eventsContainer, changeData, eventsModel) {
    this._eventsContainer = eventsContainer;
    this._changeData = changeData;
    this._eventsModel = eventsModel;

    this._eventEditComponent = null;
    this._destroyCallback = null;
    this._cities = null;
    this._offers = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleChangeDestination = this._handleChangeDestination.bind(this);
    this._handleChangeAction = this._handleChangeAction.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;
    this._cities = this._eventsModel.getDestinations();
    this._offers = this._eventsModel.getOffers(BLANK_EVENT.action.name).concat();

    if (this._eventEditComponent !== null) {
      return;
    }

    this._eventEditComponent = new EditingEventView(this._cities, Object.assign({}, BLANK_EVENT, {offers: this._offers}));
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._eventEditComponent.setFormCloseHandler(this._handleDeleteClick);
    this._eventEditComponent.setChangeDestinationHandler(this._handleChangeDestination);
    this._eventEditComponent.setChangeActionHandler(this._handleChangeAction);

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

  setSaving() {
    this._eventEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._eventEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._eventEditComponent.shake(resetFormState);
  }

  _handleFormSubmit(event) {
    delete event.id;
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

  _handleChangeDestination(destination) {
    const newCity = this._eventsModel.getDestinationInfo(destination);
    this._eventEditComponent.updateData({
      waypoint: newCity.name,
      description: newCity.description,
      images: newCity.pictures
    });
  }

  _handleChangeAction(action) {
    this._eventEditComponent.updateData({
      action,
      offers: this._eventsModel.getOffers(action.name)
    });
  }
}
