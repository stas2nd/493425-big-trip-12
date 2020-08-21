import AbstractView from "./abstract.js";

export default class MenuTab extends AbstractView {
  constructor(tab) {
    super();
    this._tab = tab;
  }

  getTemplate() {
    return `<a class="trip-tabs__btn ${this._tab.state ? this._tab.state : ``}" href="${this._tab.href}">${this._tab.text}</a>`;
  }
}
