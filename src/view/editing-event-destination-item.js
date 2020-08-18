import {createElement} from "../utils.js";

export default class EditingEventDestinationItem {
  constructor(city) {
    this._element = null;
    this._city = city;
  }

  getTemplate() {
    return (
      `<option value="${this._city}"></option>`
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
