"use strict";

const EVENT_COUNT = 3;
const TAB_ARRAY = [
  {
    text: `Table`,
    href: `#`,
    state: `trip-tabs__btn--active`
  },
  {
    text: `Stats`,
    href: `#`
  }
];
const FILTER_ARAY = [
  {
    value: `everything`,
    text: `Everything`,
    state: `checked`
  },
  {
    value: `future`,
    text: `Future`
  },
  {
    value: `past`,
    text: `Past`
  }
];
const SORT_ITEM_ARRAY = [
  {
    interactive: false,
    id: `day`,
    text: `Day`
  },
  {
    interactive: true,
    id: `event`,
    text: `Event`,
    icon: false,
    state: `checked`
  },
  {
    interactive: true,
    id: `time`,
    text: `Time`,
    icon: true
  },
  {
    interactive: true,
    id: `price`,
    text: `Price`,
    icon: true
  },
  {
    interactive: false,
    id: `offers`,
    text: `Offers`
  }
];
const EVENT_TRANSPORT_ARRAY = [
  {
    value: `taxi`,
    text: `Taxi`
  },
  {
    value: `bus`,
    text: `Bus`
  },
  {
    value: `train`,
    text: `Train`
  },
  {
    value: `ship`,
    text: `Ship`
  },
  {
    value: `transport`,
    text: `Transport`
  },
  {
    value: `drive`,
    text: `Drive`
  },
  {
    value: `flight`,
    text: `Flight`,
    state: `checked`
  },
];
const EVENT_ACTIVITY_ARRAY = [
  {
    value: `check-in`,
    text: `Check-in`
  },
  {
    value: `sightseeing`,
    text: `Sightseeing`
  },
  {
    value: `restaurant`,
    text: `Restaurant`
  },
];
const OFFER_ARAY = [
  {
    id: `luggage`,
    text: `Add luggage`,
    price: 30,
    state: `checked`
  },
  {
    id: `comfort`,
    text: `Switch to comfort class`,
    price: 100,
    state: `checked`
  },
  {
    id: `meal`,
    text: `Add meal`,
    price: 15
  },
  {
    id: `seats`,
    text: `Choose seats`,
    price: 5
  },
  {
    id: `train`,
    text: `Travel by train`,
    price: 40
  }
];

const makeTemplateFromArray = (array, func) => {
  return array ? array.reduce((accumulator, currentValue) => {
    return accumulator + func(currentValue);
  }, ``) : ``;
};

const createHeadInfoTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info">
    </section>`
  );
};

const createHeadRouteTemplate = () => {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>`
  );
};

const createHeadPriceTemplate = () => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>`
  );
};

const createMenuTabTemplate = ({text, href, state = ``}) => {
  return (
    `<a class="trip-tabs__btn ${state}" href="${href}">${text}</a>`
  );
};

const createMenuTemplate = (links) => {
  links = makeTemplateFromArray(links, createMenuTabTemplate);
  return (
    `<h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      ${links}
    </nav>`
  );
};

const createFilterItemTemplate = ({value, text, state = ``}) => {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${value}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${value}" ${state}>
      <label class="trip-filters__filter-label" for="filter-${value}">${text}</label>
    </div>`
  );
};

const createFilterTemplate = (filters) => {
  filters = makeTemplateFromArray(filters, createFilterItemTemplate);
  return (
    `<h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${filters}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

const createSortingItemTemplate = ({interactive, id, text, icon = false, state = ``}) => {
  const imgIcon = `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
    <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
  </svg>`;
  return (
    interactive ?
      `<div class="trip-sort__item  trip-sort__item--${id}">
        <input id="sort-${id}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${id}" ${state}>
        <label class="trip-sort__btn" for="sort-${id}">
          ${text}
          ${icon ? imgIcon : ``}
        </label>
      </div>`
      : `<span class="trip-sort__item  trip-sort__item--${id}">${text}</span>`
  );
};

const createSortingTemplate = (sortItems) => {
  sortItems = makeTemplateFromArray(sortItems, createSortingItemTemplate);
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItems}
    </form>`
  );
};

const createListDaysTemplate = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

const createDayTemplate = () => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">1</span>
        <time class="day__date" datetime="2019-03-18">MAR 18</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};

const createEditingEventOptionTemplate = ({value, text, state = ``}) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${value}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${value}" ${state}>
      <label class="event__type-label  event__type-label--${value}" for="event-type-${value}-1">${text}</label>
    </div>`
  );
};

const createEditingEventTemplate = (transportOpts, activityOpts) => {
  transportOpts = makeTemplateFromArray(transportOpts, createEditingEventOptionTemplate);
  activityOpts = makeTemplateFromArray(activityOpts, createEditingEventOptionTemplate);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                ${transportOpts}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${activityOpts}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              Flight to
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
              <option value="Saint Petersburg"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 00:00">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 00:00">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
      </form>`
  );
};

const createEditingEventDetailsTemplate = () => {
  return (
    `<section class="event__details">
      </section>`
  );
};

const createEditingEventOfferItemTemplate = ({id, text, price, state = ``}) => {
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" ${state}>
      <label class="event__offer-label" for="event-offer-${id}-1">
        <span class="event__offer-title">${text}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const createEditingEventOffersTemplate = (offers) => {
  offers = makeTemplateFromArray(offers, createEditingEventOfferItemTemplate);

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offers}
      </div>
    </section>`
  );
};

const createEditingEventDestinationTemplate = () => {
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
        </div>
      </div>
    </section>`
  );
};

const createEventTemplate = () => {
  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
        </div>
        <h3 class="event__title">Taxi to Amsterdam</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
          </p>
          <p class="event__duration">30M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">20</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">Order Uber</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">20</span>
          </li>
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);

const siteHeaderMainElement = siteHeaderElement.querySelector(`.trip-main`);

render(siteHeaderMainElement, createHeadInfoTemplate(), `afterbegin`);
const siteHeaderInfoElement = siteHeaderMainElement.querySelector(`.trip-info`);
render(siteHeaderInfoElement, createHeadRouteTemplate(), `beforeend`);
render(siteHeaderInfoElement, createHeadPriceTemplate(), `beforeend`);

const siteHeaderControlsElement = siteHeaderMainElement.querySelector(`.trip-controls`);
render(siteHeaderControlsElement, createMenuTemplate(TAB_ARRAY), `beforeend`);
render(siteHeaderControlsElement, createFilterTemplate(FILTER_ARAY), `beforeend`);

const siteContentElement = siteMainElement.querySelector(`.trip-events`);
render(siteContentElement, createSortingTemplate(SORT_ITEM_ARRAY), `beforeend`);

render(siteContentElement, createEditingEventTemplate(EVENT_TRANSPORT_ARRAY, EVENT_ACTIVITY_ARRAY), `beforeend`);
const siteEditingFormElement = siteContentElement.querySelector(`.event--edit`);
render(siteEditingFormElement, createEditingEventDetailsTemplate(), `beforeend`);
const siteEditingFormDetailsElement = siteEditingFormElement.querySelector(`.event__details`);
render(siteEditingFormDetailsElement, createEditingEventOffersTemplate(OFFER_ARAY), `beforeend`);
render(siteEditingFormDetailsElement, createEditingEventDestinationTemplate(), `beforeend`);

render(siteContentElement, createListDaysTemplate(), `beforeend`);
const siteDaysListElement = siteContentElement.querySelector(`.trip-days`);
render(siteDaysListElement, createDayTemplate(), `beforeend`);
const siteDayEventsElement = siteContentElement.querySelector(`.day .trip-events__list`);
for (let i = 0; i < EVENT_COUNT; i++) {
  render(siteDayEventsElement, createEventTemplate(), `beforeend`);
}
