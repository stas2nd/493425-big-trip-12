import {render, remove} from "../utils/render.js";
import {filter} from "../utils/filters.js";
import {getDayEvents, getOffersPrice} from "../utils/event.js";
import NoEventsView from "../view/no-events.js";
import SortingView from "../view/sorting.js";
import ListDaysView from "../view/list-days.js";
import DayView from "../view/day.js";
import {SortType, UpdateType, UserAction, FilterType} from "../const.js";
import EventPresenter from "./event.js";
import EventNewPresenter from "./event-new.js";

export default class Trip {
  constructor(tripContainer, eventsModel, filterModel) {
    this._tripContainer = tripContainer;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._currentSortType = SortType.EVENT;
    this._eventPresenter = {};

    this._sortingComponent = null;

    this._listDaysComponent = new ListDaysView();
    this._noEventsComponent = new NoEventsView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._eventNewPresenter = new EventNewPresenter(this._tripContainer, this._handleViewAction);
  }

  init() {
    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderTrip();
  }

  destroy() {
    this._clearTrip({resetSortType: true});

    remove(this._listDaysComponent);

    this._eventsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createEvent(callback) {
    this._currentSortType = SortType.EVENT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._eventNewPresenter.init(callback);
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const filtredTasks = filter[filterType](this._eventsModel.getEvents());

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
    return eventsToSortingMap[this._currentSortType](filtredTasks);
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
    }
  }

  _handleModeChange() {
    this._eventNewPresenter.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }

  _renderSorting() {
    this._sortingComponent = new SortingView(this._currentSortType);
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
    const eventPresenter = new EventPresenter(dayContainer, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEvents() {
    this._days = [];
    this._getEvents().forEach((dayEvent, index) => this._renderDay(dayEvent, index));
  }

  _renderNoEvents() {
    render(this._tripContainer, this._noEventsComponent);
  }

  _clearTrip({resetSortType = false} = {}) {
    this._eventNewPresenter.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._days.forEach((day) => remove(day));
    this._eventPresenter = {};

    remove(this._sortingComponent);
    remove(this._noEventsComponent);

    if (resetSortType) {
      this._currentSortType = SortType.EVENT;
    }
  }

  _renderTrip() {
    if (!this._eventsModel.getEvents().length) {
      this._renderNoEvents();
      return;
    }

    this._renderSorting();
    this._renderListDays();
    this._renderEvents();
  }

}
