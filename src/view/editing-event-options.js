import AbstractView from "./abstract.js";
import EditingEventOptionView from "./editing-event-option.js";
import {ACTIONS} from "../const.js";

export default class EditingEventOptions extends AbstractView {
  constructor(action, count) {
    super();
    this._transportOpts = ACTIONS.filter((act) => act.type === `transport`);
    this._arrivalOpts = ACTIONS.filter((act) => act.type === `arrival`);
    this._transportOptsTemplate = this._makeTemplateFromArrayClass(EditingEventOptionView, this._transportOpts, action, {currentId: count});
    this._arrivalOptsTemplate = this._makeTemplateFromArrayClass(EditingEventOptionView, this._arrivalOpts, action, {currentId: count});
  }

  getTemplate() {
    return (
      `<div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>
          ${this._transportOptsTemplate}
        </fieldset>

        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>
          ${this._arrivalOptsTemplate}
        </fieldset>
      </div>`
    );
  }
}
