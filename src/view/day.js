import {makeTemplateFromArray} from "../utils";
import {humanizeDate} from "../utils";
import {createEventTemplate} from "./event.js";

export const createDayTemplate = ({day, events}, rest) => {
  const index = rest.find((v) => v.arrayIndex !== undefined).arrayIndex + 1;
  events = makeTemplateFromArray(createEventTemplate, events);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index}</span>
        <time class="day__date" datetime="${day}">${humanizeDate(day)}</time>
      </div>
      <ul class="trip-events__list">
      ${events}
      </ul>
    </li>`
  );
};
