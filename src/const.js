export const ACTIONS = [
  {
    name: `taxi`,
    type: `transport`
  },
  {
    name: `bus`,
    type: `transport`
  },
  {
    name: `train`,
    type: `transport`
  },
  {
    name: `ship`,
    type: `transport`
  },
  {
    name: `transport`,
    type: `transport`
  },
  {
    name: `drive`,
    type: `transport`
  },
  {
    name: `flight`,
    type: `transport`
  },
  {
    name: `check-in`,
    type: `arrival`
  },
  {
    name: `sightseeing`,
    type: `arrival`
  },
  {
    name: `restaurant`,
    type: `arrival`
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
  MAJOR: `MAJOR`
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
