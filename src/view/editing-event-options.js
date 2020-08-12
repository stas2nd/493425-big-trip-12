import {makeTemplateFromArrayClass, createElement} from "../utils.js";
import EditingEventOptionView from "./editing-event-option.js";
import {ACTIONS} from "../const.js";

const createEditingEventOptionsTemplate = (action) => {
  const transportOpts = ACTIONS.filter((act) => act.type === `transport`);
  const arrivalOpts = ACTIONS.filter((act) => act.type === `arrival`);
  const transportOptsTemplate = makeTemplateFromArrayClass(EditingEventOptionView, transportOpts, action);
  const arrivalOptsTemplate = makeTemplateFromArrayClass(EditingEventOptionView, arrivalOpts, action);
  return (
    `<div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Transfer</legend>
        ${transportOptsTemplate}
      </fieldset>

      <fieldset class="event__type-group">
        <legend class="visually-hidden">Activity</legend>
        ${arrivalOptsTemplate}
      </fieldset>
    </div>`
  );
};

export default class EditingEventOptions {
  constructor(action) {
    this._element = null;
    this._action = action;
  }

  getTemplate() {
    return createEditingEventOptionsTemplate(this._action);
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
