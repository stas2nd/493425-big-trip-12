import {END_POINT, AUTHORIZATION, UpdateType} from "./const.js";
import {generateEvent} from "./mock/event.js";
import {generateInfo} from "./mock/info.js";
import {render} from "./utils/render.js";
import HeadInfoView from "./view/head-info.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import EventsModel from "./model/events.js";
import FilterModel from "./model/filters.js";
import TabsPresenter from "./presenter/tabs.js";
import Api from "./api.js";

const EVENT_COUNT = 8;
const events = new Array(EVENT_COUNT).fill().map(generateEvent);
const api = new Api(END_POINT, AUTHORIZATION);

const headInfo = generateInfo(events);

const eventsModel = new EventsModel();

Promise.all([api.getEvents(), api.getOffers()])
  .then(([evs, offers]) => {
    // evs.forEach((event) => {
    //   event.offers = [...new Set(event.offers, offers.find((offer) => offer.type === event.action.name).offers.map(EventsModel.adaptOfferToClient))];
    // });
    eventsModel.setEvents(UpdateType.INIT, evs);
  })
  .catch(() => {
    eventsModel.setEvents(UpdateType.INIT, []);
  });

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const siteHeaderMainElement = siteHeaderElement.querySelector(`.trip-main`);
const siteEventsElement = siteMainElement.querySelector(`.trip-events`);

render(siteHeaderMainElement, new HeadInfoView(headInfo), true);
const siteHeaderControlsElement = siteHeaderMainElement.querySelector(`.trip-controls`);

const tripPresenter = new TripPresenter(siteEventsElement, eventsModel, filterModel, api);
const filterPresenter = new FilterPresenter(siteHeaderControlsElement, filterModel, eventsModel);
const tabsPresenter = new TabsPresenter(siteEventsElement, tripPresenter, eventsModel, filterModel);

tripPresenter.init();
filterPresenter.init();
tabsPresenter.init();
