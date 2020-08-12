import {createElement} from "../utils.js";

const createMenuTabTemplate = ({text, href, state = ``}) => {
  return (
    `<a class="trip-tabs__btn ${state}" href="${href}">${text}</a>`
  );
};

export default class MenuTab {
  constructor(tab) {
    this._element = null;
    this._tab = tab;
  }

  getTemplate() {
    return createMenuTabTemplate(this._tab);
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
