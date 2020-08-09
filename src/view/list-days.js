import {makeTemplateFromArray, getDayEvents} from "../utils";
import {createDayTemplate} from "./day.js";

export const createListDaysTemplate = (events) => {
  events = getDayEvents(events);

  const days = makeTemplateFromArray(createDayTemplate, events);
  return (
    `<ul class="trip-days">
      ${days}
    </ul>`
  );
};
