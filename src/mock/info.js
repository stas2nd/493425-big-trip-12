import {formatEventDate, getOffersPrice} from "../utils/event.js";

const getRoute = (events) => {
  let cities = events.map((city) => city.waypoint);
  const firstCity = cities[0];
  const lastCity = cities[cities.length - 1];
  const medianaCity = cities.length > 2 ? `...` : cities[Math.floor(cities.length / 2)];
  return `${firstCity} — ${medianaCity} — ${lastCity}`;
};

const getDates = (events) => {
  if (events[0].start.getMonth() === events[events.length - 1].end.getMonth()) {
    return `${events[0].start.getDate()} — ${formatEventDate(events[events.length - 1].end)}`;
  }
  return `${formatEventDate(events[0].start)} — ${formatEventDate(events[events.length - 1].end)}`;
};

const getPrice = (events) => {
  return events.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price + getOffersPrice(currentValue);
  }, 0);
};

export const generateInfo = (events) => {
  if (events.length) {
    events = [...events].sort((a, b) => a.start - b.start);
    const route = getRoute(events);
    const dates = getDates(events);
    const price = getPrice(events);
    return {
      route,
      dates,
      price
    };
  }
  return {
    route: null,
    dates: null,
    price: 0
  };
};

