import {makeTemplateFromArray} from "../main.js";
import {createSortingItemTemplate} from "./sorting-item.js";

export const createSortingTemplate = (sortItems) => {
  sortItems = makeTemplateFromArray(sortItems, createSortingItemTemplate);
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItems}
    </form>`
  );
};
