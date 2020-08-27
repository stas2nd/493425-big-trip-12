import EditingEventDestinationImgView from "./editing-event-destination-img.js";
import AbstractView from "./abstract.js";

export default class EditingEventDestination extends AbstractView {
  constructor(text, images) {
    super();
    this._text = text || ``;
    this._images = this._makeTemplateFromArrayClass(EditingEventDestinationImgView, images);
  }

  getTemplate() {
    return (
      this._text || this._images ?
        `<section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${this._text}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${this._images}
            </div>
          </div>
        </section>`
        : ``
    );
  }
}
