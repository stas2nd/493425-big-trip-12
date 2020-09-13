import {Mode, State} from "../const.js";
import {render, replace, remove} from "../utils/render.js";
import EditingEventView from "../view/editing-event.js";
import EventView from "../view/event.js";
import {UserAction, UpdateType} from "../const.js";
import {isDatesEqual, isArraysEqual} from "../utils/event.js";
import EventsModel from "../model/events.js";

export default class Event {
  constructor(dayContainer, changeData, changeMode, api, cities, offers) {
    this._dayContainer = dayContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._api = api;
    this._cities = cities;
    this._offers = offers;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._replaceFormToCard = this._replaceFormToCard.bind(this);
    this._handleChangeDestination = this._handleChangeDestination.bind(this);
    this._handleChangeAction = this._handleChangeAction.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._offers = [...this._offers].find((offer) => offer.type === event.action.name).offers.map((offer, index) => EventsModel.adaptOfferToClient(offer, false, index)).map((offer) => {
      if (event.offers.map((of) => of.text).includes(offer.text)) {
        offer.choosed = true;
      }
      return offer;
    });

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
      // replace(this._eventComponent, prevEventEditComponent);
      // this._mode = Mode.DEFAULT;
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

  setViewState(state) {
    const resetFormState = () => {
      this._eventEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._eventEditComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._eventEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._eventComponent.shake(resetFormState);
        this._eventEditComponent.shake(resetFormState);
        break;
    }
  }

  _replaceCardToForm() {
    this._eventEditComponent = new EditingEventView(this._cities, this._offers, this._event);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setFormCloseHandler(this._replaceFormToCard);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._eventEditComponent.setChangeDestinationHandler(this._handleChangeDestination);
    this._eventEditComponent.setChangeActionHandler(this._handleChangeAction);
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
  }

  _handleDeleteClick(event) {
    this._changeData(
        UserAction.DELETE_EVENT,
        UpdateType.MINOR,
        event
    );
  }

  _handleChangeDestination(destination) {
    this._api.getDestinationByName(destination)
      .then((city) => {
        this._eventEditComponent.updateData({
          waypoint: city.name,
          description: city.description,
          images: city.pictures
        });
      });
  }

  _handleChangeAction(action) {
    this._api.getOffersByType(action.name)
      .then((offers) => {
        this._eventEditComponent.updateData({
          action,
          offers
        });
      });
  }

  destroy() {
    remove(this._eventComponent);
    if (this._eventEditComponent) {
      remove(this._eventEditComponent);
    }
  }
}
