import {generateEvent} from "./mock/event.js";
import {render} from "./utils.js";
import {createHeadInfoTemplate} from "./view/head-info.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createListDaysTemplate} from "./view/list-days.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createEditingEventTemplate} from "./view/editing-event.js";
import {generateInfo} from "./mock/info.js";
// import {generateSorting} from "./mock/sorting.js";
// import {generateFilters} from "./mock/filters.js";

const EVENT_COUNT = 5;
const events = new Array(EVENT_COUNT).fill().map(generateEvent);
const headInfo = generateInfo(events);
// const filters = generateFilters(events);
// const sorting = generateSorting(events);


const TAB_ARRAY = [
  {
    text: `Table`,
    href: `#`,
    state: `trip-tabs__btn--active`
  },
  {
    text: `Stats`,
    href: `#`
  }
];
const FILTER_ARAY = [
  {
    value: `everything`,
    text: `Everything`,
    state: `checked`
  },
  {
    value: `future`,
    text: `Future`
  },
  {
    value: `past`,
    text: `Past`
  }
];
const SORT_ITEM_ARRAY = [
  {
    interactive: false,
    id: `day`,
    text: `Day`
  },
  {
    interactive: true,
    id: `event`,
    text: `Event`,
    icon: false,
    state: `checked`
  },
  {
    interactive: true,
    id: `time`,
    text: `Time`,
    icon: true
  },
  {
    interactive: true,
    id: `price`,
    text: `Price`,
    icon: true
  },
  {
    interactive: false,
    id: `offers`,
    text: `Offers`
  }
];

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);

const siteHeaderMainElement = siteHeaderElement.querySelector(`.trip-main`);

render(siteHeaderMainElement, createHeadInfoTemplate(headInfo), `afterbegin`);

const siteHeaderControlsElement = siteHeaderMainElement.querySelector(`.trip-controls`);
render(siteHeaderControlsElement, createMenuTemplate(TAB_ARRAY), `beforeend`);
render(siteHeaderControlsElement, createFilterTemplate(FILTER_ARAY), `beforeend`);

const siteContentElement = siteMainElement.querySelector(`.trip-events`);
render(siteContentElement, createSortingTemplate(SORT_ITEM_ARRAY), `beforeend`);

render(siteContentElement, createEditingEventTemplate(events[0]), `beforeend`);

render(siteContentElement, createListDaysTemplate(events), `beforeend`);
