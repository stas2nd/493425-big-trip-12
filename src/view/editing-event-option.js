import AbstractView from "./abstract.js";

export default class EditingEventOption extends AbstractView {
  constructor(option, rest) {
    super();
    this._option = option;
    this._active = rest.find((v) => v.name !== undefined).name;
    this._id = rest.find((v) => v.currentId !== undefined).currentId;
    this._text = this._option.name.charAt(0).toUpperCase() + this._option.name.slice(1);
  }

  getTemplate() {
    return (
      `<div class="event__type-item">
        <input id="event-type-${this._option.name}-${this._id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${this._option.name}" ${this._option.name === this._active ? `checked` : ``}>
        <label class="event__type-label  event__type-label--${this._option.name}" for="event-type-${this._option.name}-${this._id}">${this._text}</label>
      </div>`
    );
  }
}
