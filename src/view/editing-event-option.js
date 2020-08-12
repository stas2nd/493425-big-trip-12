import {createElement} from "../utils.js";

const createEditingEventOptionTemplate = ({name}, rest) => {
  const active = rest.find((v) => v.name !== undefined).name;
  const text = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    `<div class="event__type-item">
      <input id="event-type-${name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${name}" ${name === active ? `checked` : ``}>
      <label class="event__type-label  event__type-label--${name}" for="event-type-${name}-1">${text}</label>
    </div>`
  );
};

export default class EditingEventOption {
  constructor(option, rest) {
    this._element = null;
    this._option = option;
    this._rest = rest;
  }

  getTemplate() {
    return createEditingEventOptionTemplate(this._option, this._rest);
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
