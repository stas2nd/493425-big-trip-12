export const ACTIONS_MAP = {
  RIDE: {
    name: `RIDE`,
    icon: `🚕`
  },
  TRAIN: {
    name: `TRAIN`,
    icon: `🚆`
  },
  SAIL: {
    name: `SAIL`,
    icon: `🚢`
  },
  DRIVE: {
    name: `DRIVE`,
    icon: `🚗`
  },
  FLY: {
    name: `FLY`,
    icon: `✈️`
  },
  STAY: {
    name: `STAY`,
    alternative: `HOTEL`,
    icon: `🏨`
  },
  LOOK: {
    name: `LOOK`,
    alternative: `SIGHTSEEING`,
    icon: `🏛️`
  },
  EAT: {
    name: `EAT`,
    alternative: `RESTAURANT`,
    icon: `🍽️`
  }
};
export const ACTIONS = [
  {
    name: `taxi`,
    type: `transport`,
    label: ACTIONS_MAP.RIDE
  },
  {
    name: `bus`,
    type: `transport`,
    label: ACTIONS_MAP.RIDE
  },
  {
    name: `train`,
    type: `transport`,
    label: ACTIONS_MAP.TRAIN
  },
  {
    name: `ship`,
    type: `transport`,
    label: ACTIONS_MAP.SAIL
  },
  {
    name: `transport`,
    type: `transport`,
    label: ACTIONS_MAP.RIDE
  },
  {
    name: `drive`,
    type: `transport`,
    label: ACTIONS_MAP.DRIVE
  },
  {
    name: `flight`,
    type: `transport`,
    label: ACTIONS_MAP.FLY
  },
  {
    name: `check-in`,
    type: `arrival`,
    label: ACTIONS_MAP.STAY
  },
  {
    name: `sightseeing`,
    type: `arrival`,
    label: ACTIONS_MAP.LOOK
  },
  {
    name: `restaurant`,
    type: `arrival`,
    label: ACTIONS_MAP.EAT
  },
];
export const WAY_POINTS = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `Saint Petersburg`
];
export const OFFERS = [
  {
    name: `luggage`,
    text: `Add luggage`,
  },
  {
    name: `comfort`,
    text: `Switch to comfort`,
  },
  {
    name: `meal`,
    text: `Add meal`,
  },
  {
    name: `seats`,
    text: `Choose seats`,
  },
  {
    name: `train`,
    text: `Travel by train`,
  },
];
export const KIND_OFFER = {
  flight: [`luggage`, `comfort`, `meal`, `seats`, `train`],
  taxi: [`comfort`],
  train: [`meal`],
  ship: [`comfort`, `meal`],
  transport: [`comfort`, `meal`, `train`],
};
export const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
export const SORT_ITEM_ARRAY = [
  {
    interactive: false,
    text: `Day`
  },
  {
    interactive: true,
    text: `Event`,
    icon: false
  },
  {
    interactive: true,
    text: `Time`,
    icon: true
  },
  {
    interactive: true,
    text: `Price`,
    icon: true
  },
  {
    interactive: false,
    text: `Offers`
  }
];
export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};
export const UserAction = {
  UPDATE_EVENT: `UPDATE_EVENT`,
  ADD_EVENT: `ADD_EVENT`,
  DELETE_EVENT: `DELETE_EVENT`
};
export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};
export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};
export const BLANK_EVENT = {
  action: ACTIONS[0],
  cities: WAY_POINTS,
  waypoint: null,
  start: null,
  end: null,
  price: null,
  offers: null,
  description: null,
  images: null,
  isFavorite: false,
  id: `new`
};
export const MenuItem = {
  TABLE: `table`,
  STATS: `stats`
};
export const TAB_ARRAY = [
  {
    name: `table`,
    text: `Table`
  },
  {
    name: `stats`,
    text: `Stats`
  }
];
export const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};
export const AUTHORIZATION = `Basic kljadfh87434093hfou4w867h439g`;
export const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;
export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};
export const SHAKE_ANIMATION_TIMEOUT = 600;
export const STORE_PREFIX = `trip-localstorage`;
export const STORE_VER = `v12`;
export const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;
