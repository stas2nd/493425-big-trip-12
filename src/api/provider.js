import {nanoid} from "nanoid";
import EventsModel from "../model/events.js";

const getSyncedEvents = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

const createOfferStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.type]: current,
    });
  }, {});
};

const createDestinationStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.name]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
    this._isExistOfflineChange = false;
  }

  get isExistOfflineChange() {
    return this._isExistOfflineChange;
  }

  getEvents() {
    if (this._isOnline()) {
      return this._api.getEvents()
        .then((events) => {
          const items = createStoreStructure([...events].map(EventsModel.adaptEventToServer));
          const offers = this._store.getItems().offers ? {offers: this._store.getItems().offers} : {};
          const destinations = this._store.getItems().destinations ? {destinations: this._store.getItems().destinations} : {};
          this._store.setItems(Object.assign({}, items, offers, destinations));
          return events;
        });
    }

    const storeEvents = Object.values(this._store.getItems()).filter((event) => event.id !== undefined);

    return Promise.resolve(storeEvents.map(EventsModel.adaptEventToClient));
  }

  getOffers() {
    if (this._isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          const newOffers = offers.map((type) => {
            return Object.assign({}, type, {offers: type.offers.map(EventsModel.adaptOfferToServer)});
          });

          this._store.setItem(`offers`, createOfferStoreStructure(newOffers));
          return offers;
        });
    }

    const storeOffers = Object.values(this._store.getItems().offers).map((type) => {
      return Object.assign({}, type, {offers: type.offers.map((offer, index) => EventsModel.adaptOfferToClient(offer, false, index))});
    });

    return Promise.resolve(storeOffers);
  }

  getDestinations() {
    if (this._isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          const items = createDestinationStoreStructure(destinations);
          this._store.setItem(`destinations`, items);
          return destinations;
        });
    }

    const storeDestinations = Object.values(this._store.getItems().destinations);

    return Promise.resolve(storeDestinations);
  }

  updateEvent(event) {
    if (this._isOnline()) {
      return this._api.updateEvent(event)
        .then((updatedEvent) => {
          this._store.setItem(updatedEvent.id, EventsModel.adaptEventToServer(updatedEvent));
          return updatedEvent;
        });
    }

    this._isExistOfflineChange = true;
    this._store.setItem(event.id, EventsModel.adaptEventToServer(Object.assign({}, event)));
    return Promise.resolve(event);
  }

  addEvent(event) {
    if (this._isOnline()) {
      return this._api.addEvent(event)
        .then((newEvent) => {
          this._store.setItem(newEvent.id, EventsModel.adaptEventToServer(newEvent));
          return newEvent;
        });
    }

    this._isExistOfflineChange = true;
    // На случай локального создания данных мы должны сами создать `id`.
    // Иначе наша модель будет не полной, и это может привнести баги
    const localNewEventId = nanoid();
    const localNewEvent = Object.assign({}, event, {id: localNewEventId});
    this._store.setItem(localNewEvent.id, EventsModel.adaptEventToServer(localNewEvent));

    return Promise.resolve(localNewEvent);
  }

  deleteEvent(event) {
    if (this._isOnline()) {
      return this._api.deleteEvent(event)
        .then(() => this._store.removeItem(event.id));
    }

    this._isExistOfflineChange = true;
    this._store.removeItem(event.id);

    return Promise.resolve();
  }

  sync() {
    if (this._isOnline()) {
      const storeEvents = Object.values(this._store.getItems()).filter((event) => event.id !== undefined);

      return this._api.sync(storeEvents)
        .then((response) => {
          // Забираем из ответа синхронизированные задачи
          const createdEvents = getSyncedEvents(response.created);
          const updatedEvents = getSyncedEvents(response.updated);
          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент.
          const items = createStoreStructure([...createdEvents, ...updatedEvents]);
          const offers = this._store.getItems().offers ? {offers: this._store.getItems().offers} : {};
          const destinations = this._store.getItems().destinations ? {destinations: this._store.getItems().destinations} : {};
          this._store.setItems(Object.assign({}, items, offers, destinations));
          this._isExistOfflineChange = false;
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}
