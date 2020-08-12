import {ACTIONS, RENDER_POSITION} from "./const.js";

const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return currentDate;
};

export const render = (container, element, place) => {
  switch (place) {
    case RENDER_POSITION.AFTERBEGIN:
      container.prepend(element);
      break;
    case RENDER_POSITION.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const makeTemplateFromArray = (func, array, ...rest) => {
  return array ? array.reduce((accumulator, currentValue, index) => {
    return accumulator + func(currentValue, [...rest, {arrayIndex: index}]);
  }, ``) : ``;
};

export const makeTemplateFromArrayClass = (CL, array, ...rest) => {
  return array ? array.reduce((accumulator, currentValue, index) => {
    return accumulator + new CL(currentValue, [...rest, {arrayIndex: index}]).getTemplate();
  }, ``) : ``;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomAction = () => {
  return ACTIONS[getRandomInteger(0, ACTIONS.length - 1)];
};

export const isPastEvent = (date) => {
  return date && getCurrentDate().getTime() > date.getTime();
};

export const isFutureEvent = (date) => {
  return date && getCurrentDate().getTime() < date.getTime();
};

export const getOffersPrice = (event) => {
  if (event.offers) {
    return event.offers.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price;
    }, 0);
  }
  return 0;
};

export const humanizeDate = (dueDate) => {
  return dueDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`});
};

export const getHumanizeDiffTime = (time) => {
  const day = 60 * 60 * 1000 * 24;
  const hour = 60 * 60 * 1000;
  const minute = 60 * 1000;

  if ((time / day) >= 1) {
    const diffDays = Math.floor(time / day);
    time -= diffDays * day;
    const diffHours = Math.floor(time / hour);
    time -= diffHours * hour;
    const diffMinutes = Math.floor(time / minute);
    return `${(diffDays + ``).padStart(2, 0)}D ${(diffHours + ``).padStart(2, 0)}H ${(diffMinutes + ``).padStart(2, 0)}M`;
  } else if ((time / hour) > 1) {
    const diffHours = Math.floor(time / hour);
    time -= diffHours * hour;
    const diffMinutes = Math.floor(time / minute);
    return `${(diffHours + ``).padStart(2, 0)}H ${(diffMinutes + ``).padStart(2, 0)}M`;
  }
  const diffMinutes = Math.floor(time / minute);
  return `${(diffMinutes + ``).padStart(2, 0)}M`;
};

export const getDayEvents = (events) => {
  events = events.sort((a, b) => a.start - b.start);
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

export const formatDate = (date) => {
  return `${(date.getDate() + ``).padStart(2, 0)}/${(date.getMonth() + ``).padStart(2, 0)}/${(date.getFullYear() + ``).slice(2)} ${(date.toLocaleTimeString() + ``).slice(0, 5)}`;
};

export const formatHours = (date) => {
  return `${(date.getHours() + ``).padStart(2, 0)}:${(date.getMinutes() + ``).padStart(2, 0)}`;
};
