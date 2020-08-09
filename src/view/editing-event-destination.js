import {makeTemplateFromArray} from "../utils";
import {createEditingEventDestinationImgTemplate} from "./editing-event-destination-img.js";

export const createEditingEventDestinationTemplate = (text, images) => {
  images = makeTemplateFromArray(createEditingEventDestinationImgTemplate, images);
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${text}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${images}
        </div>
      </div>
    </section>`
  );
};
