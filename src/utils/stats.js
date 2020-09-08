import {ACTIONS} from "../const.js";
import {getDiffTimeHours} from "./event.js";

export const getMoneyInfo = (events) => {
  let actions = [];
  for (let event of [...events]) {
    const match = ACTIONS.find((action) => action.name === event.action.name);
    const existIndex = match ? actions.findIndex((label) => label.name === match.label.name) : -1;
    if (match && existIndex !== -1) {
      actions[existIndex].money += event.price;
    } else if (match) {
      actions.push(Object.assign({}, match.label, {money: event.price}));
    }
  }
  actions.sort((a, b) => b.money - a.money);
  return {
    labels: actions.map((label) => label.icon + label.name),
    moneys: actions.map((label) => label.money),
    length: actions.length
  };
};

export const getTransportInfo = (events) => {
  let actions = [];
  for (let event of [...events]) {
    const match = ACTIONS.find((action) => action.name === event.action.name);
    const existIndex = match ? actions.findIndex((label) => label.name === match.label.name) : -1;
    if (match && existIndex !== -1) {
      actions[existIndex].count += 1;
    } else if (match) {
      actions.push(Object.assign({}, match.label, {count: 1}));
    }
  }
  actions.sort((a, b) => b.count - a.count);
  return {
    labels: actions.map((label) => label.icon + label.name),
    counts: actions.map((label) => label.count),
    length: actions.length
  };
};

export const getTimeInfo = (events) => {
  let actions = [];
  for (let event of [...events]) {
    const match = ACTIONS.find((action) => action.name === event.action.name);
    const textObject = match && match.type === `transport` ? {text: match.label.icon + ` TO ` + event.waypoint.toUpperCase()} : {text: match.label.icon + ` ` + match.label.alternative};
    const existIndex = match ? actions.findIndex((act) => act.text === textObject.text) : -1;
    if (match && existIndex !== -1) {
      actions[existIndex].time += getDiffTimeHours(event.start, event.end);
    } else if (match) {
      actions.push(Object.assign({}, textObject, {time: getDiffTimeHours(event.start, event.end)}));
    }
  }
  actions.sort((a, b) => b.time - a.time);
  return {
    labels: actions.map((act) => act.text),
    times: actions.map((act) => (Math.round(act.time * 10)) / 10),
    length: actions.length
  };
};
