import {makeTemplateFromArrayClass, createElement} from "../utils";
import EditingEventDestinationImgView from "./editing-event-destination-img.js";

const createEditingEventDestinationTemplate = (text, images) => {
  images = makeTemplateFromArrayClass(EditingEventDestinationImgView, images);
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${text}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${images}
        </div>
      </div>
    </section>`
  );
};

export default class EditingEventDestination {
  constructor(text, images) {
    this._element = null;
    this._text = text;
    this._images = images;
  }

  getTemplate() {
    return createEditingEventDestinationTemplate(this._text, this._images);
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
