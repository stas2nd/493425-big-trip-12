import {render, replace, remove} from "../utils/render.js";
import {getDayEvents, getOffersPrice} from "../utils/event.js";
import NoEventsView from "../view/no-events.js";
import SortingView from "../view/sorting.js";
import ListDaysView from "../view/list-days.js";
import EventView from "../view/event.js";
import DayView from "../view/day.js";
import EditingEventView from "../view/editing-event.js";
import {SortType} from "../const.js";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._currentSortType = SortType.EVENT;

    this._sortingComponent = new SortingView();
    this._listDaysComponent = new ListDaysView();
    this._noEventsComponent = new NoEventsView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripEvents) {
    this._sourcedTripEvents = [...tripEvents];

    this._renderTrip();
  }

  _sortEvents(sortType) {
    const eventsToSortingMap = {
      event: (events) => getDayEvents(events),
      time: (events) => [{
        day: null,
        events: [...events].sort((a, b) => {
          return (b.end - b.start) - (a.end - a.start);
        })
      }],
      price: (events) => [{
        day: null,
        events: [...events].sort((a, b) => {
          return (b.price + getOffersPrice(b)) - (a.price + getOffersPrice(a));
        })
      }],
    };

    this._tripEvents = eventsToSortingMap[sortType](this._sourcedTripEvents);
    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearDaysList();
    this._renderEvents();
  }

  _renderSorting() {
    render(this._tripContainer, this._sortingComponent);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderListDays() {
    render(this._tripContainer, this._listDaysComponent);
  }

  _renderDay(dayInfo, index) {
    const dayComponent = new DayView(dayInfo.day, index);
    render(this._listDaysComponent, dayComponent);

    const dayListEvents = dayComponent.getElement().querySelector(`.trip-events__list`);
    dayInfo.events.forEach((dayEvent) => {
      this._renderEvent(dayListEvents, dayEvent, this._counter);
      this._counter += 1;
    });
  }

  _renderEvent(dayComponent, event, count) {
    const eventComponent = new EventView(event);
    let eventEditComponent;

    const onCloseEditForm = () => {
      replaceFormToCard();
    };

    const onSubmitForm = () => {
      onCloseEditForm();
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        onCloseEditForm();
      }
    };

    const replaceCardToForm = () => {
      eventEditComponent = new EditingEventView(event, count);
      eventEditComponent.setFormSubmitHandler(onSubmitForm);
      eventEditComponent.setFormCloseHandler(onCloseEditForm);
      replace(eventEditComponent, eventComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const replaceFormToCard = () => {
      replace(eventComponent, eventEditComponent);
      eventEditComponent.removeFormSubmitHandler(onSubmitForm);
      eventEditComponent.removeFormCloseHandler(onCloseEditForm);
      remove(eventEditComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    eventComponent.setEditClickHandler(replaceCardToForm);

    render(dayComponent, eventComponent);
  }

  _renderEvents() {
    this._counter = 0;
    this._tripEvents.forEach((dayEvent, index) => this._renderDay(dayEvent, index));
  }

  _renderNoEvents() {
    render(this._tripContainer, this._noEventsComponent);
  }

  _renderTrip() {
    this._tripEvents = getDayEvents(this._sourcedTripEvents);
    if (!this._tripEvents.length) {
      this._renderNoEvents();
      return;
    }

    this._renderSorting();
    this._renderListDays();
    this._renderEvents();
  }

  _clearDaysList() {
    this._listDaysComponent.getElement().innerHTML = ``;
  }
}
