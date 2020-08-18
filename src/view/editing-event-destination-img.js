import {createElement} from "../utils";

export default class EditingEventDestinationImg {
  constructor(img) {
    this._element = null;
    this._img = img;
  }

  getTemplate() {
    return (
      `<img class="event__photo" src="${this._img}" alt="Event photo">`
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
