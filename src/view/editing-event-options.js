import {makeTemplateFromArray} from "../utils.js";
import {createEditingEventOptionTemplate} from "./editing-event-option.js";

export const createEditingEventOptionsTemplate = (actions, active) => {
  const transportOpts = actions.filter((action) => action.type === `transport`);
  const arrivalOpts = actions.filter((action) => action.type === `arrival`);
  const transportOptsTemplate = makeTemplateFromArray(createEditingEventOptionTemplate, transportOpts, active);
  const arrivalOptsTemplate = makeTemplateFromArray(createEditingEventOptionTemplate, arrivalOpts, active);
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
