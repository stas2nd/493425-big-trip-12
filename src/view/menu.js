import AbstractView from "./abstract.js";
import MenuTabView from "./menu-tab.js";

export default class Menu extends AbstractView {
  constructor(links) {
    super();
    this._links = this._makeTemplateFromArrayClass(MenuTabView, links);
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
}
