import {isFutureEvent, isPastEvent} from "../utils/event.js";

const taskToFilterMap = {
  everything: (events) => events,
  future: (events) => events
    .filter((event) => isFutureEvent(event)),
  past: (events) => events
    .filter((event) => isPastEvent(event)),
};

export const generateFilters = (events) => {
  return Object.entries(taskToFilterMap).map(([filterName, filterEvents]) => (
    {
      name: filterName,
      events: filterEvents(events),
    }));
};
