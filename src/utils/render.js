import Abstract from "../view/abstract.js";

export const render = (container, child, isAfterBegin = false) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  if (isAfterBegin) {
    container.prepend(child);
  } else {
    container.append(child);
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

export const insertAfter = (first, second) => {
  if (first instanceof Abstract) {
    first = first.getElement();
  }

  if (second instanceof Abstract) {
    second = second.getElement();
  }

  if (first === null || second === null) {
    throw new Error(`Can't insert unexisting elements`);
  }

  first.after(second);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};
