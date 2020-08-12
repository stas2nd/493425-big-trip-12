import {createElement} from "../utils";

const createEditingEventDestinationImgTemplate = (src) => {
  return (
    `<img class="event__photo" src="${src}" alt="Event photo">`
  );
};

export default class EditingEventDestinationImg {
  constructor(img) {
    this._element = null;
    this._img = img;
  }

  getTemplate() {
    return createEditingEventDestinationImgTemplate(this._img);
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
