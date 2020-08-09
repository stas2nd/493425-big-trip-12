import {makeTemplateFromArray} from "../utils.js";
import {createMenuTabTemplate} from "./menu-tab.js";

export const createMenuTemplate = (links) => {
  links = makeTemplateFromArray(createMenuTabTemplate, links);
  return (
    `<h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      ${links}
    </nav>`
  );
};
