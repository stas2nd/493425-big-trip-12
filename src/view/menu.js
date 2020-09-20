import AbstractView from "./abstract.js";
import MenuTabView from "./menu-tab.js";
import {TABS, MenuItem} from "../const.js";

export default class Menu extends AbstractView {
  constructor() {
    super();
    this._links = this._makeTemplateFromArrayClass(MenuTabView, TABS, {active: MenuItem.TABLE});
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return (
      `<div>
        <h2 class="visually-hidden">Switch trip view</h2>
        <nav class="trip-controls__trip-tabs  trip-tabs">
          ${this._links}
        </nav>
      </div>`
    );
  }

  _menuClickHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    this.setMenuItem(evt.target.dataset.tab);
    this._callback.menuClick(evt.target.dataset.tab);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const items = this.getElement().querySelectorAll(`.trip-tabs__btn`);
    for (let item of items) {
      item.classList.remove(`trip-tabs__btn--active`);
    }
    const targetItem = this.getElement().querySelector(`[data-tab=${menuItem}]`);
    if (targetItem !== null) {
      targetItem.classList.add(`trip-tabs__btn--active`);
    }
  }
}
