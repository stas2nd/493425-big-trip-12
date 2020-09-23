import FilterView from "../view/filter.js";
import {render, replace, remove} from "../utils/render.js";
import {filter} from "../utils/filters.js";
import {FilterType, UpdateType} from "../const.js";

export default class Filter {
  constructor(container, model, eventsModel) {
    this._container = container;
    this._model = model;
    this._eventsModel = eventsModel;
    this._current = null;

    this._component = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleTypeChange = this._handleTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
    this._model.addObserver(this._handleModelEvent);
  }

  init() {
    this._current = this._model.get();

    const filters = this._get();
    const prevComponent = this._component;

    this._component = new FilterView(filters, this._current);
    this._component.setTypeChangeHandler(this._handleTypeChange);

    if (prevComponent === null) {
      render(this._container, this._component);
      return;
    }

    replace(this._component, prevComponent);
    remove(prevComponent);
  }

  _get() {
    return [
      {
        value: FilterType.EVERYTHING,
        text: `Everything`,
        disabled: !filter[FilterType.EVERYTHING](this._eventsModel.get()).length
      },
      {
        value: FilterType.FUTURE,
        text: `Future`,
        disabled: !filter[FilterType.FUTURE](this._eventsModel.get()).length
      },
      {
        value: FilterType.PAST,
        text: `Past`,
        disabled: !filter[FilterType.PAST](this._eventsModel.get()).length
      }
    ];
  }

  _handleModelEvent() {
    this.init();
  }

  _handleTypeChange(type) {
    if (this._current === type) {
      return;
    }

    this._model.set(UpdateType.MAJOR, type);
  }
}
