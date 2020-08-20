import {getDayEvents, getOffersPrice} from "../utils/event.js";

const eventsToSortingMap = {
  event: (events) => getDayEvents(events),
  time: (events) => [{
    day: null,
    events: events.sort((a, b) => {
      return (a.end - a.start) - (b.end - b.start);
    })
  }],
  price: (events) => [{
    day: null,
    events: events.sort((a, b) => {
      return (a.price + getOffersPrice(a)) - (b.price + getOffersPrice(b));
    })
  }],
};

export const generateSorting = (tasks) => {
  return Object.entries(eventsToSortingMap).map(([sortingName, sortEvents]) => {
    return {
      name: sortingName,
      events: sortEvents(tasks),
    };
  });
};
