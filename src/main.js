import {END_POINT, AUTHORIZATION, UpdateType} from "./const.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import InfoPresenter from "./presenter/info.js";
import EventsModel from "./model/events.js";
import FilterModel from "./model/filters.js";
import TabsPresenter from "./presenter/tabs.js";
import Api from "./api.js";

const api = new Api(END_POINT, AUTHORIZATION);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

Promise.all([api.getEvents(), api.getOffers(), api.getDestinations()])
  .then(([evs, offers, destinations]) => {
    eventsModel.setData(UpdateType.INIT, evs, offers, destinations);
  })
  .catch(() => {
    eventsModel.setData(UpdateType.INIT);
  });

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const siteHeaderMainElement = siteHeaderElement.querySelector(`.trip-main`);
const siteEventsElement = siteMainElement.querySelector(`.trip-events`);
const siteHeaderControlsElement = siteHeaderMainElement.querySelector(`.trip-controls`);

const infoPresenter = new InfoPresenter(siteHeaderMainElement, eventsModel);
const tripPresenter = new TripPresenter(siteEventsElement, eventsModel, filterModel, api);
const filterPresenter = new FilterPresenter(siteHeaderControlsElement, filterModel, eventsModel);
const tabsPresenter = new TabsPresenter(siteEventsElement, tripPresenter, eventsModel, filterModel);

infoPresenter.init();
tabsPresenter.init();
filterPresenter.init();
tripPresenter.init();
