import {makeTemplateFromArray} from "../utils.js";
import {createSortingItemTemplate} from "./sorting-item.js";

export const createSortingTemplate = (sortItems) => {
  sortItems = makeTemplateFromArray(createSortingItemTemplate, sortItems);
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItems}
    </form>`
  );
};
