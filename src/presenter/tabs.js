import {MenuItem, FilterType} from "../const.js";
import {render, remove} from "../utils/render.js";
import {UpdateType} from "../const.js";
import MenuView from "../view/menu.js";
import StatsView from "../view/stats.js";

export default class Tabs {
  constructor(eventsContainer, tripPresenter, eventsModel, filterModel) {
    this._eventsContainer = eventsContainer;
    this._headerContainer = document.querySelector(`.trip-controls`);

    this._tripPresenter = tripPresenter;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;

    this._statsComponent = null;
    this._currentState = null;

    this._menuComponent = new MenuView();
    this._handleChangeView = this._handleChangeView.bind(this);
    this._menuComponent.setMenuClickHandler(this._handleChangeView);

    this._handleEventNewFormClose = this._handleEventNewFormClose.bind(this);
  }

  init() {
    render(this._headerContainer, this._menuComponent);
    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._handleChangeView(`ADD_NEW_EVENT`);
    });
  }

  _handleChangeView(targetClick) {
    if (this._currentState === targetClick) {
      return;
    }
    switch (targetClick) {
      case `ADD_NEW_EVENT`:
        this._menuComponent.setMenuItem(MenuItem.TABLE);
        remove(this._statsComponent);
        this._tripPresenter.destroy();
        this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
        this._tripPresenter.init();
        this._tripPresenter.createEvent(this._handleEventNewFormClose);
        document.querySelector(`.trip-main__event-add-btn`).disabled = true;
        break;
      case MenuItem.TABLE:
        this._tripPresenter.init();
        remove(this._statsComponent);
        break;
      case MenuItem.STATS:
        this._tripPresenter.destroy();
        this._statsComponent = new StatsView(this._eventsModel.getEvents());
        render(this._eventsContainer, this._statsComponent);
        break;
    }
    this._currentState = targetClick;
  }

  _handleEventNewFormClose() {
    document.querySelector(`.trip-main__event-add-btn`).disabled = false;
  }
}
