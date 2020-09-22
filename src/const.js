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
export const SORT_ITEMS = [
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
export const TABS = [
  {
    name: `table`,
    text: `Table`
  },
  {
    name: `stats`,
    text: `Stats`
  }
];
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
export const AUTHORIZATION = `Basic kljadfh87434093hfou4w867h439g`;
export const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;
export const SHAKE_ANIMATION_TIMEOUT = 600;
export const STORE_PREFIX = `trip-localstorage`;
export const STORE_VER = `v12`;
export const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;
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

export const MenuItem = {
  TABLE: `table`,
  STATS: `stats`
};

export const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};
export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};

