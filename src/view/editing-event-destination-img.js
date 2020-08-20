import AbstractView from "./abstract.js";

export default class EditingEventDestinationImg extends AbstractView {
  constructor(img) {
    super();
    this._img = img;
  }

  getTemplate() {
    return (
      `<img class="event__photo" src="${this._img}" alt="Event photo">`
    );
  }
}
