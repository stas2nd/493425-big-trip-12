import {ACTIONS} from "../const.js";
import Observer from "../utils/observer.js";

export default class Events extends Observer {
  constructor() {
    super();
    this._events = [];
  }

  setData(updateType, events = [], offers = [], destinations = []) {
    this._events = [...events];
    this._offers = [...offers];
    this._destinations = [...destinations];
    this._notify(updateType);
  }

  getEvents() {
    return this._events;
  }

  getOffers(type) {
    return [...this._offers].find((offer) => offer.type === type).offers;
  }

  getDestinations() {
    return [...this._destinations].map((city) => city.name);
  }

  getDestinationInfo(destination) {
    return [...this._destinations].find((city) => city.name === destination);
  }

  updateEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting event`);
    }

    this._events = [
      ...this._events.slice(0, index),
      update,
      ...this._events.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this._events = [
      Object.assign(update, {id: this._events.length}),
      ...this._events
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting event`);
    }

    this._events = [
      ...this._events.slice(0, index),
      ...this._events.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptOfferToClient(offer, choosed, index) {
    return {
      name: offer.title.split(` `).pop() + `-${index ? index : offer.price}`,
      text: offer.title,
      price: offer.price,
      choosed
    };
  }

  static adaptEventToClient(event) {
    event = Object.assign({}, event);
    return {
      action: ACTIONS.find((action) => action.name === event.type),
      cities: [],
      waypoint: event.destination ? event.destination.name : null,
      start: event.date_from !== null ? new Date(event.date_from) : event.date_from,
      end: event.date_to !== null ? new Date(event.date_to) : event.date_to,
      price: event.base_price,
      offers: event.offers.map((offer, index) => (Events.adaptOfferToClient(offer, true, index))),
      description: event.destination ? event.destination.description : null,
      images: event.destination ? event.destination.pictures : null,
      isFavorite: event.is_favorite,
      id: event.id
    };
  }

  static adaptOfferToServer(offer) {
    return {
      "title": offer.text,
      "price": offer.price
    };
  }

  static adaptEventToServer(event) {
    event = Object.assign({}, event);
    const offers = event.offers ? event.offers.filter((offer) => offer.choosed) : null;
    return {
      "base_price": +event.price,
      "date_from": event.start instanceof Date ? event.start.toISOString() : null,
      "date_to": event.end instanceof Date ? event.end.toISOString() : null,
      "destination": {
        "description": event.description,
        "name": event.waypoint,
        "pictures": event.images
      },
      "id": event.id,
      "is_favorite": event.isFavorite,
      "offers": offers ? offers.map((offer) => Events.adaptOfferToServer(offer)) : [],
      "type": event.action.name
    };
  }
}
