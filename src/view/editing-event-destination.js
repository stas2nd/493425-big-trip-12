import {makeTemplateFromArrayClass, createElement} from "../utils";
import EditingEventDestinationImgView from "./editing-event-destination-img.js";

export default class EditingEventDestination {
  constructor(text, images) {
    this._element = null;
    this._text = text;
    this._images = makeTemplateFromArrayClass(EditingEventDestinationImgView, images);
  }

  getTemplate() {
    return (
      `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${this._text}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${this._images}
          </div>
        </div>
      </section>`
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
