import {createElement} from "../utils";

const createListDaysTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class ListDays {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createListDaysTemplate();
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
