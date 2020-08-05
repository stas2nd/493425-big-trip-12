import {makeTemplateFromArray} from "../main.js";
import {createMenuTabTemplate} from "./menu-tab.js";

export const createMenuTemplate = (links) => {
  links = makeTemplateFromArray(links, createMenuTabTemplate);
  return (
    `<h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      ${links}
    </nav>`
  );
};
