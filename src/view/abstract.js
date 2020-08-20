import {createElement} from "../utils/render.js";

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
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

  _makeTemplateFromArrayClass(CL, array, ...rest) {
    return array ? array.reduce((accumulator, currentValue, index) => {
      return accumulator + new CL(currentValue, [...rest, {arrayIndex: index}]).getTemplate();
    }, ``) : ``;
  }

}
