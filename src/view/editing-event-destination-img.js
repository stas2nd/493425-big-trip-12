import AbstractView from "./abstract.js";

export default class EditingEventDestinationImg extends AbstractView {
  constructor({src, description}) {
    super();
    this._src = src;
    this._alt = description;
  }

  getTemplate() {
    return (
      this._src ? `<img class="event__photo" src="${this._src}" alt="${this._alt}">` : ``
    );
  }
}
