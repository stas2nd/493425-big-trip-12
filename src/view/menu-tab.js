export const createMenuTabTemplate = ({text, href, state = ``}) => {
  return (
    `<a class="trip-tabs__btn ${state}" href="${href}">${text}</a>`
  );
};
