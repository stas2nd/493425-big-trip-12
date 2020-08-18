import {generateEvent} from "./mock/event.js";
import {generateInfo} from "./mock/info.js";
import {render, getDayEvents} from "./utils.js";
import HeadInfoView from "./view/head-info.js";
import SortingView from "./view/sorting.js";
import ListDaysView from "./view/list-days.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import EditingEventView from "./view/editing-event.js";
import NoEventsView from "./view/no-events.js";
import EventView from "./view/event.js";
import DayView from "./view/day.js";

// import {generateSorting} from "./mock/sorting.js";
// import {generateFilters} from "./mock/filters.js";

const EVENT_COUNT = 8;
let counter = 0;
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

const renderEvent = (dayComponent, event, count) => {
  const eventComponent = new EventView(event);
  let eventEditComponent;

  const closeEditForm = (evt) => {
    evt.preventDefault();
    eventEditComponent.getElement().querySelector(`.event__rollup-btn`).removeEventListener(`click`, closeEditForm);
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onSubmitForm = (evt) => {
    closeEditForm(evt);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      closeEditForm(evt);
    }
  };

  const replaceCardToForm = () => {
    eventEditComponent = new EditingEventView(event, count);
    eventEditComponent.getElement().addEventListener(`submit`, onSubmitForm);
    eventEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, closeEditForm);
    dayComponent.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const replaceFormToCard = () => {
    dayComponent.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
    eventEditComponent.getElement().removeEventListener(`submit`, onSubmitForm);
    eventEditComponent.getElement().remove();
    eventEditComponent.removeElement();
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
  });

  render(dayComponent, eventComponent.getElement());
};

const renderDay = (eventListElement, dayInfo, index) => {
  const dayComponent = new DayView(dayInfo.day, index);
  render(eventListElement, dayComponent.getElement());
  const dayListEvents = dayComponent.getElement().querySelector(`.trip-events__list`);
  dayInfo.events.forEach((dayEvent) => {
    renderEvent(dayListEvents, dayEvent, counter);
    counter += 1;
  });
};

const renderEvents = (daysEvents) => {
  daysEvents = getDayEvents(daysEvents);
  const siteContentElement = siteMainElement.querySelector(`.trip-events`);
  const listComponent = new ListDaysView();

  if (!daysEvents.length) {
    render(siteContentElement, new NoEventsView().getElement());
    return;
  }

  render(siteContentElement, new SortingView(SORT_ITEM_ARRAY).getElement());
  render(siteContentElement, listComponent.getElement());
  daysEvents.forEach((dayEvent, index) => renderDay(listComponent.getElement(), dayEvent, index));
};

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const siteHeaderMainElement = siteHeaderElement.querySelector(`.trip-main`);

render(siteHeaderMainElement, new HeadInfoView(headInfo).getElement(), true);
const siteHeaderControlsElement = siteHeaderMainElement.querySelector(`.trip-controls`);
render(siteHeaderControlsElement, new MenuView(TAB_ARRAY).getElement());
render(siteHeaderControlsElement, new FilterView(FILTER_ARAY).getElement());

renderEvents(events);
