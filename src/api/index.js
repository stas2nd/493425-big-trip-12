import {SuccessHTTPStatusRange} from "../const.js";
import EventsModel from "../model/events.js";

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getEvents() {
    return this._load({url: `points`})
      .then(Api.toJSON)
      .then((events) => events.map(EventsModel.adaptEventToClient));
  }

  getOffers() {
    return this._load({url: `offers`})
      .then(Api.toJSON)
      .then((offers) => offers.map((type) => {
        type.offers = type.offers.map((offer, index) => EventsModel.adaptOfferToClient(offer, false, index));
        return type;
      }));
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then(Api.toJSON);
  }

  updateEvent(event) {
    return this._load({
      url: `points/${event.id}`,
      method: `PUT`,
      body: JSON.stringify(EventsModel.adaptEventToServer(event)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(EventsModel.adaptEventToClient);
  }

  addEvent(event) {
    return this._load({
      url: `points`,
      method: `POST`,
      body: JSON.stringify(EventsModel.adaptEventToServer(event)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(EventsModel.adaptEventToClient);
  }

  deleteEvent(event) {
    return this._load({
      url: `points/${event.id}`,
      method: `DELETE`
    });
  }

  sync(events) {
    return this._load({
      url: `points/sync`,
      method: `POST`,
      body: JSON.stringify(events),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON);
  }

  _load({
    url,
    method = `GET`,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
