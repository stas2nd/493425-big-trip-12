import {END_POINT, AUTHORIZATION, STORE_NAME, UpdateType} from "./const.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import InfoPresenter from "./presenter/info.js";
import EventsModel from "./model/events.js";
import FilterModel from "./model/filters.js";
import TabsPresenter from "./presenter/tabs.js";
import Api from "./api/index.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const siteHeaderMainElement = siteHeaderElement.querySelector(`.trip-main`);
const siteEventsElement = siteMainElement.querySelector(`.trip-events`);
const siteHeaderControlsElement = siteHeaderMainElement.querySelector(`.trip-controls`);

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

Promise.all([apiWithProvider.getEvents(), apiWithProvider.getOffers(), apiWithProvider.getDestinations()])
  .then(([evs, offers, destinations]) => {
    eventsModel.setData(UpdateType.INIT, evs, offers, destinations);
  });

const infoPresenter = new InfoPresenter(siteHeaderMainElement, eventsModel);
const tripPresenter = new TripPresenter(siteEventsElement, eventsModel, filterModel, apiWithProvider);
const filterPresenter = new FilterPresenter(siteHeaderControlsElement, filterModel, eventsModel);
const tabsPresenter = new TabsPresenter(siteEventsElement, tripPresenter, eventsModel, filterModel);

infoPresenter.init();
tabsPresenter.init();
filterPresenter.init();
tripPresenter.init();

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      // Действие, в случае успешной регистрации ServiceWorker
      console.log(`ServiceWorker available`); // eslint-disable-line
    }).catch(() => {
      // Действие, в случае ошибки при регистрации ServiceWorker
      console.error(`ServiceWorker isn't available`); // eslint-disable-line
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  if (apiWithProvider.isExistOfflineChange) {
    apiWithProvider.sync();
  }
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
