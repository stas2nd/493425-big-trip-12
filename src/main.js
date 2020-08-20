import {generateEvent} from "./mock/event.js";
import {generateInfo} from "./mock/info.js";
import {render} from "./utils/render.js";
import HeadInfoView from "./view/head-info.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import TripPresenter from "./presenter/trip.js";

// import {generateSorting} from "./mock/sorting.js";
// import {generateFilters} from "./mock/filters.js";

const EVENT_COUNT = 8;
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

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const siteHeaderMainElement = siteHeaderElement.querySelector(`.trip-main`);
const siteEventsElement = siteMainElement.querySelector(`.trip-events`);

render(siteHeaderMainElement, new HeadInfoView(headInfo), true);
const siteHeaderControlsElement = siteHeaderMainElement.querySelector(`.trip-controls`);
render(siteHeaderControlsElement, new MenuView(TAB_ARRAY));
render(siteHeaderControlsElement, new FilterView(FILTER_ARAY));
const tripPresenter = new TripPresenter(siteEventsElement);

tripPresenter.init(events);
