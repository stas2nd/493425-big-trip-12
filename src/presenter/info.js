import HeadInfoView from "../view/head-info.js";
import {render, replace, remove} from "../utils/render.js";
import {getRoute, getDates, getPrice} from "../utils/info.js";

export default class Info {
  constructor(headerContainer, eventsModel) {
    this._headerContainer = headerContainer;
    this._eventsModel = eventsModel;

    this._infoComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._eventsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const prevInfoComponent = this._infoComponent;
    this._infoComponent = new HeadInfoView(this._getInfo(this._eventsModel.get()));

    if (prevInfoComponent === null) {
      render(this._headerContainer, this._infoComponent, true);
      return;
    }

    replace(this._infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  }

  _getInfo(events) {
    if (events.length) {
      events = [...events].sort((a, b) => a.start - b.start);
      const route = getRoute(events);
      const dates = getDates(events);
      const price = getPrice(events);
      return {
        route,
        dates,
        price
      };
    }
    return {
      route: null,
      dates: null,
      price: 0
    };
  }

  _handleModelEvent() {
    this.init();
  }
}
