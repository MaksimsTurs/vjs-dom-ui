import domDiff from "./utils/dom-diff.js";

import { __DEV__measureFunctionExecution, __DEV__try } from "./utils/debug.js";

export default function state(initState) {
  const subscribers = [];

  let state = initState;

  return {
    subscribe: function(component) {
      subscribers.push(component);
    },
    notify: function() {
      for(let index = 0; index < subscribers.length; index++) {
        let newDOM = subscribers[index].render().dom();

        subscribers[index].$DOM.replaceWith(newDOM);

        subscribers[index].$DOM = newDOM;
      } 
    },
    set: function(newState) {
      if(newState !== state) {
        if(typeof newState === "function") {
          state = newState(state);
        } else {
          state = newState;
        }

        this.notify();
      }
    },
    get: function() {
      return state;
    }
  };
};