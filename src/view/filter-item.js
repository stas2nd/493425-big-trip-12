export const createFilterItemTemplate = ({value, text, state = ``}) => {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${value}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${value}" ${state}>
      <label class="trip-filters__filter-label" for="filter-${value}">${text}</label>
    </div>`
  );
};
