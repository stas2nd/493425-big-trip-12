import {makeTemplateFromArrayClass, createElement} from "../utils.js";
import MenuTabView from "./menu-tab.js";

export default class Menu {
  constructor(links) {
    this._element = null;
    this._links = makeTemplateFromArrayClass(MenuTabView, links);
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

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
