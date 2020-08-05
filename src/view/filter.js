import {makeTemplateFromArray} from "../main.js";
import {createFilterItemTemplate} from "./filter-item.js";

export const createFilterTemplate = (filters) => {
  filters = makeTemplateFromArray(filters, createFilterItemTemplate);
  return (
    `<h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${filters}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};
