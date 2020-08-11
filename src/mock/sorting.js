import {getDayEvents, getOffersPrice} from "../utils.js";

const eventsToSortingMap = {
  event: (events) => getDayEvents(events),
  time: (events) => events.sort((a, b) => {
    return (a.end - a.start) - (b.end - b.start);
  }),
  price: (events) => events.sort((a, b) => {
    return (a.price + getOffersPrice(a)) - (b.price + getOffersPrice(b));
  }),
};

export const generateSorting = (tasks) => {
  return Object.entries(eventsToSortingMap).map(([filterName, sortEvents]) => {
    return {
      name: filterName,
      count: sortEvents(tasks),
    };
  });
};
