import {makeTemplateFromArrayClass, createElement} from "../utils.js";
import MenuTabView from "./menu-tab.js";

const createMenuTemplate = (links) => {
  links = makeTemplateFromArrayClass(MenuTabView, links);
  return (
    `<div>
      <h2 class="visually-hidden">Switch trip view</h2>
      <nav class="trip-controls__trip-tabs  trip-tabs">
        ${links}
      </nav>
    </div>`
  );
};

export default class Menu {
  constructor(links) {
    this._element = null;
    this._links = links;
  }

  getTemplate() {
    return createMenuTemplate(this._links);
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
