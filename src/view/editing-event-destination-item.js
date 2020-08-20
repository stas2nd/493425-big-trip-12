import AbstractView from "./abstract.js";

export default class EditingEventDestinationItem extends AbstractView {
  constructor(city) {
    super();
    this._city = city;
  }

  getTemplate() {
    return (
      `<option value="${this._city}"></option>`
    );
  }
}
