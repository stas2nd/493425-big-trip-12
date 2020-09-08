import AbstractView from "./abstract.js";

export default class MenuTab extends AbstractView {
  constructor(tab, rest) {
    super();
    this._tab = tab;
    this._active = rest.find((v) => v.active !== undefined).active;
  }

  getTemplate() {
    return `<a class="trip-tabs__btn ${this._active === this._tab.name ? `trip-tabs__btn--active` : ``}" data-tab="${this._tab.name}" href="#">${this._tab.text}</a>`;
  }
}
