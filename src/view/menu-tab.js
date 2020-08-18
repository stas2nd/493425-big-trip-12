import {createElement} from "../utils.js";

export default class MenuTab {
  constructor(tab) {
    this._element = null;
    this._tab = tab;
  }

  getTemplate() {
    return `<a class="trip-tabs__btn ${this._tab.state ? this._tab.state : ``}" href="${this._tab.href}">${this._tab.text}</a>`;
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
