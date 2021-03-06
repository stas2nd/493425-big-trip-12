import {State as EventPresenterViewState} from "../const.js";
import {render, remove} from "../utils/render.js";
import {filter} from "../utils/filters.js";
import {getDayEvents, getOffersPrice} from "../utils/event.js";
import NoEventsView from "../view/no-events.js";
import SortingView from "../view/sorting.js";
import ListDaysView from "../view/list-days.js";
import DayView from "../view/day.js";
import LoadingView from "../view/loading.js";
import {SortType, UpdateType, UserAction, FilterType} from "../const.js";
import EventPresenter from "./event.js";
import EventNewPresenter from "./event-new.js";

export default class Trip {
  constructor(container, eventsModel, filterModel, api) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._currentSortType = SortType.EVENT;
    this._eventPresenter = {};
    this._isLoading = true;
    this._api = api;

    this._sortingComponent = null;

    this._listDaysComponent = new ListDaysView();
    this._noEventsComponent = new NoEventsView();
    this._loadingComponent = new LoadingView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._eventNewPresenter = new EventNewPresenter(this._container, this._handleViewAction, this._eventsModel);
  }

  init() {
    this._eventsModel.addObserver(this._handleModelEvent);
    // 4. Фильтры влияют на список событий
    this._filterModel.addObserver(this._handleModelEvent);

    this._render();
  }

  destroy() {
    // 5. При уничтожении списка путешествий сбрасывается выбранная сортировка
    this._clear({resetSortType: true});

    remove(this._listDaysComponent);

    this._eventsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createEvent(callback) {
    this._currentSortType = SortType.EVENT;
    this._filterModel.set(UpdateType.MAJOR, FilterType.EVERYTHING);
    remove(this._noEventsComponent);
    this._eventNewPresenter.init(callback);
  }

  _getEvents() {
    const filterType = this._filterModel.get();
    const filtredTasks = filter[filterType](this._eventsModel.get());

    // 5. Получаемые события фильтруются согласно выбранной сортировки
    const eventsToSortingMap = {
      event: (events) => getDayEvents(events),
      time: (events) => [{
        // 5. В режиме сортировки точки маршрута не разбиваются по дням
        day: null,
        events: [...events].sort((a, b) => {
          return (b.end - b.start) - (a.end - a.start);
        })
      }],
      price: (events) => [{
        // 5. В режиме сортировки точки маршрута не разбиваются по дням
        day: null,
        events: [...events].sort((a, b) => {
          return (b.price + getOffersPrice(b)) - (a.price + getOffersPrice(a));
        })
      }],
    };
    return eventsToSortingMap[this._currentSortType](filtredTasks);
  }

  // 2. Создание и отрисовка компонента Сортировки
  _renderSorting() {
    this._sortingComponent = new SortingView(this._currentSortType);
    render(this._container, this._sortingComponent);
    // 3. Установка колбэка на изменение активного типа сортировки
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderListDays() {
    render(this._container, this._listDaysComponent);
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
    const eventPresenter = new EventPresenter(dayContainer, this._handleViewAction, this._handleModeChange, this._eventsModel);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEvents() {
    this._days = [];
    this._getEvents().forEach((dayEvent, index) => this._renderDay(dayEvent, index));
  }

  _renderLoading() {
    render(this._container, this._loadingComponent);
  }

  _renderNoEvents() {
    render(this._container, this._noEventsComponent);
  }

  _clear({resetSortType = false} = {}) {
    this._eventNewPresenter.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._days.forEach((day) => remove(day));
    this._eventPresenter = {};

    remove(this._sortingComponent);
    remove(this._noEventsComponent);
    remove(this._loadingComponent);

    if (resetSortType) {
      this._currentSortType = SortType.EVENT;
    }
  }

  _render() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    // 2. Приглашение добавить первую точку маршрута, если таковые отсутствуют
    if (!this._eventsModel.get().length) {
      this._renderNoEvents();
      return;
    }

    this._renderSorting();
    this._renderListDays();
    this._renderEvents();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventPresenter[update.id].setViewState(EventPresenterViewState.SAVING);
        this._api.updateEvent(update)
          .then((response) => {
            this._eventsModel.update(updateType, response);
          })
          .catch(() => {
            this._eventPresenter[update.id].setViewState(EventPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_EVENT:
        this._eventNewPresenter.setSaving();
        this._api.addEvent(update)
          .then((response) => {
            this._eventsModel.add(updateType, response);
          })
          .catch(() => {
            this._eventNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_EVENT:
        this._eventPresenter[update.id].setViewState(EventPresenterViewState.DELETING);
        this._api.deleteEvent(update)
          .then(() => {
            this._eventsModel.delete(updateType, update);
          })
          .catch(() => {
            this._eventPresenter[update.id].setViewState(EventPresenterViewState.ABORTING);
          });
        break;
    }
  }

  _handleModelEvent(updateType, event) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter[event.id].init(event);
        break;
      case UpdateType.MINOR:
        this._clear();
        this._render();
        break;
      case UpdateType.MAJOR:
        this._clear({resetSortType: true});
        this._render();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._render();
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
      // 4. Список перерисовывается только в случае,
      // если выбранная пользователем сортировка отличается от текущей
      return;
    }

    this._currentSortType = sortType;
    this._clear();
    this._render();
  }
}
