import {createHeadInfoTemplate} from "./view/head-info.js";
import {createHeadRouteTemplate} from "./view/head-route.js";
import {createHeadPriceTemplate} from "./view/head-price.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createListDaysTemplate} from "./view/list-days.js";
import {createDayTemplate} from "./view/day.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createEditingEventTemplate} from "./view/editing-event.js";
import {createEditingEventDetailsTemplate} from "./view/editing-event-details.js";
import {createEditingEventOffersTemplate} from "./view/editing-event-offers.js";
import {createEditingEventDestinationTemplate} from "./view/editing-event-destination.js";
import {createEventTemplate} from "./view/event.js";

const EVENT_COUNT = 3;
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
const EVENT_TRANSPORT_ARRAY = [
  {
    value: `taxi`,
    text: `Taxi`
  },
  {
    value: `bus`,
    text: `Bus`
  },
  {
    value: `train`,
    text: `Train`
  },
  {
    value: `ship`,
    text: `Ship`
  },
  {
    value: `transport`,
    text: `Transport`
  },
  {
    value: `drive`,
    text: `Drive`
  },
  {
    value: `flight`,
    text: `Flight`,
    state: `checked`
  },
];
const EVENT_ACTIVITY_ARRAY = [
  {
    value: `check-in`,
    text: `Check-in`
  },
  {
    value: `sightseeing`,
    text: `Sightseeing`
  },
  {
    value: `restaurant`,
    text: `Restaurant`
  },
];
const OFFER_ARAY = [
  {
    id: `luggage`,
    text: `Add luggage`,
    price: 30,
    state: `checked`
  },
  {
    id: `comfort`,
    text: `Switch to comfort class`,
    price: 100,
    state: `checked`
  },
  {
    id: `meal`,
    text: `Add meal`,
    price: 15
  },
  {
    id: `seats`,
    text: `Choose seats`,
    price: 5
  },
  {
    id: `train`,
    text: `Travel by train`,
    price: 40
  }
];

export const makeTemplateFromArray = (array, func) => {
  return array ? array.reduce((accumulator, currentValue) => {
    return accumulator + func(currentValue);
  }, ``) : ``;
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);

const siteHeaderMainElement = siteHeaderElement.querySelector(`.trip-main`);

render(siteHeaderMainElement, createHeadInfoTemplate(), `afterbegin`);
const siteHeaderInfoElement = siteHeaderMainElement.querySelector(`.trip-info`);
render(siteHeaderInfoElement, createHeadRouteTemplate(), `beforeend`);
render(siteHeaderInfoElement, createHeadPriceTemplate(), `beforeend`);

const siteHeaderControlsElement = siteHeaderMainElement.querySelector(`.trip-controls`);
render(siteHeaderControlsElement, createMenuTemplate(TAB_ARRAY), `beforeend`);
render(siteHeaderControlsElement, createFilterTemplate(FILTER_ARAY), `beforeend`);

const siteContentElement = siteMainElement.querySelector(`.trip-events`);
render(siteContentElement, createSortingTemplate(SORT_ITEM_ARRAY), `beforeend`);

render(siteContentElement, createEditingEventTemplate(EVENT_TRANSPORT_ARRAY, EVENT_ACTIVITY_ARRAY), `beforeend`);
const siteEditingFormElement = siteContentElement.querySelector(`.event--edit`);
render(siteEditingFormElement, createEditingEventDetailsTemplate(), `beforeend`);
const siteEditingFormDetailsElement = siteEditingFormElement.querySelector(`.event__details`);
render(siteEditingFormDetailsElement, createEditingEventOffersTemplate(OFFER_ARAY), `beforeend`);
render(siteEditingFormDetailsElement, createEditingEventDestinationTemplate(), `beforeend`);

render(siteContentElement, createListDaysTemplate(), `beforeend`);
const siteDaysListElement = siteContentElement.querySelector(`.trip-days`);
render(siteDaysListElement, createDayTemplate(), `beforeend`);
const siteDayEventsElement = siteContentElement.querySelector(`.day .trip-events__list`);
for (let i = 0; i < EVENT_COUNT; i++) {
  render(siteDayEventsElement, createEventTemplate(), `beforeend`);
}
