import {FilterType} from "../const";
import {isFutureEvent, isPastEvent} from "../utils/event.js";

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isFutureEvent(event)),
  [FilterType.PAST]: (events) => events.filter((event) => isPastEvent(event))
};
