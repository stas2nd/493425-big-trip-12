import {createElement} from "../utils.js";

const createEditingEventDestinationItemTemplate = (city) => {
  return (
    `<option value="${city}"></option>`
  );
};

export default class EditingEventDestinationItem {
  constructor(city) {
    this._element = null;
    this._city = city;
  }

  getTemplate() {
    return createEditingEventDestinationItemTemplate(this._city);
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
