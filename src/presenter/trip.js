import {render, remove} from "../utils/render.js";
import {updateItem} from "../utils/common.js";
import {getDayEvents, getOffersPrice} from "../utils/event.js";
import NoEventsView from "../view/no-events.js";
import SortingView from "../view/sorting.js";
import ListDaysView from "../view/list-days.js";

import DayView from "../view/day.js";
import {SortType} from "../const.js";
import EventPresenter from "./event.js";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._currentSortType = SortType.EVENT;
    this._eventPresenter = {};

    this._sortingComponent = new SortingView();
    this._listDaysComponent = new ListDaysView();
    this._noEventsComponent = new NoEventsView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(tripEvents) {
    this._sourcedTripEvents = [...tripEvents];
    this._setIdEvents();
    this._renderTrip();
  }

  _setIdEvents() {
    this._sourcedTripEvents.forEach((event, index) => (event.id = index));
  }

  _handleEventChange(updatedEvent) {
    this._sourcedTripEvents = updateItem(this._sourcedTripEvents, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
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
    this._days.push(dayComponent);
    render(this._listDaysComponent, dayComponent);

    const dayListEvents = dayComponent.getElement().querySelector(`.trip-events__list`);
    dayInfo.events.forEach((dayEvent) => {
      this._renderEvent(dayListEvents, dayEvent);
    });
  }

  _renderEvent(dayContainer, event) {
    const eventPresenter = new EventPresenter(dayContainer, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEvents() {
    this._days = [];
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
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._days.forEach((day) => remove(day));
    this._eventPresenter = {};
  }
}
