import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
momentDurationFormatSetup(moment);
import {ACTIONS} from "../const.js";
import {getRandomInteger} from "./common.js";

const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return currentDate;
};

const isObjectsEqual = (a, b) => {
  return Object.keys(a).length === Object.keys(b).length && Object.keys(a).every((prop) => a[prop] === b[prop]);
};

const sortObjectsFunction = (a, b) => {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
};

export const getRandomAction = () => {
  return ACTIONS[getRandomInteger(0, ACTIONS.length - 1)];
};

export const isPastEvent = (date) => {
  return date.end && moment(getCurrentDate()).isAfter(date.end, `day`);
};

export const isFutureEvent = (date) => {
  return date.start && moment(getCurrentDate()).isBefore(date.start, `day`);
};

export const getOffersPrice = (event) => {
  if (event.offers) {
    return event.offers.filter((offer) => offer.checked).reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price;
    }, 0);
  }
  return 0;
};

export const formatEventDate = (date) => {
  return date instanceof Date ? moment(date).format(`D MMMM`) : ``;
};

export const getDiffTime = (start, end) => {
  return moment.duration((end - start), `milliseconds`).format(`DD[D] HH[H] mm[M]`);
};

export const formatHours = (date) => {
  return date instanceof Date ? moment(date).format(`HH:mm`) : ``;
};

export const getDayEvents = (events) => {
  events = [...events].sort((a, b) => a.start - b.start);
  let eventDays = [];
  events.forEach((event) => {
    const date = new Date(event.start).setHours(0, 0, 0, 0);
    if (!eventDays.length || date - eventDays[eventDays.length - 1].day !== 0) {
      const newDay = {
        day: new Date(date),
        events: [event]
      };
      eventDays[eventDays.length] = newDay;
    } else {
      eventDays[eventDays.length - 1].events.push(event);
    }
  });
  return eventDays;
};

export const isDatesEqual = (dateA, dateB) => {
  return (dateA === null && dateB === null) || moment(dateA).isSame(dateB, `day`);
};

export const isArraysEqual = (arrayA, arrayB) => {
  [arrayA, arrayB] = [arrayA ? [...arrayA] : [], arrayB ? [...arrayB] : []];
  return arrayA.length === arrayB.length && arrayA.sort(sortObjectsFunction).every((value, index) => {
    return isObjectsEqual(value, arrayB.sort(sortObjectsFunction)[index]);
  });
};
