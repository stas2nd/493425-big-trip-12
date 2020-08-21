import {getRandomInteger} from "../utils/common.js";
import {OFFERS, KIND_OFFER, ACTIONS, WAY_POINTS, DESCRIPTION} from "../const.js";

const generatePoint = () => {
  return WAY_POINTS[getRandomInteger(0, WAY_POINTS.length - 1)];
};

const generateOffers = (kind) => {
  if (kind.type === `transport` && Object.keys(KIND_OFFER).includes(kind.name)) {
    return KIND_OFFER[kind.name].map((offer) => {
      const offerItem = OFFERS.find((item) => item.name === offer);
      offerItem.price = getRandomInteger(5, 100);
      offerItem.choosed = !!getRandomInteger(0, 1);
      return offerItem;
    });
  }
  return null;
};

const generateDescription = () => {
  return DESCRIPTION.repeat(getRandomInteger(1, 5));
};

const getImages = () => {
  return new Array(getRandomInteger(1, 5)).fill().map(() => `http://picsum.photos/248/152?r=${Math.random()}`);
};

const generateDate = (first) => {
  const maxDaysGap = 7;
  const maxHoursGap = 23;
  const maxMinutesGap = 59;
  const daysGap = getRandomInteger(first ? 0 : -maxDaysGap, first ? 0.5 : maxDaysGap);
  const currentDate = first ? new Date(first) : new Date();
  const hours = getRandomInteger(first ? first.getHours() : 0, maxHoursGap);
  const minutes = getRandomInteger(first ? first.getMinutes() : 0, maxMinutesGap);
  currentDate.setHours(hours, minutes, 0, 0);

  currentDate.setDate(currentDate.getDate() + daysGap);
  return currentDate;
};

export const generateEvent = () => {
  const action = ACTIONS[getRandomInteger(0, ACTIONS.length - 1)];
  const start = generateDate();
  const end = generateDate(start);
  const offers = generateOffers(action);

  return {
    action,
    cities: WAY_POINTS,
    waypoint: generatePoint(),
    start,
    end,
    price: getRandomInteger(0, 400),
    offers,
    description: generateDescription(),
    images: getImages(),
    isFavorite: !!getRandomInteger(0, 1)
  };
};
