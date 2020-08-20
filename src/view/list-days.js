import AbstractView from "./abstract.js";

export default class ListDays extends AbstractView {
  getTemplate() {
    return `<ul class="trip-days"></ul>`;
  }
}
