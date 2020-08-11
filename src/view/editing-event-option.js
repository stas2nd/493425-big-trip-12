export const createEditingEventOptionTemplate = ({name}, rest) => {
  const active = rest.find((v) => v.name !== undefined).name;
  const text = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    `<div class="event__type-item">
      <input id="event-type-${name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${name}" ${name === active ? `checked` : ``}>
      <label class="event__type-label  event__type-label--${name}" for="event-type-${name}-1">${text}</label>
    </div>`
  );
};
