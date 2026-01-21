import batcher from "./utils/batcher.js";
import { isFunction } from "./utils/is.js";
import component from "./utils/component.js";

/**
 *  @param {any} initState
 */
export default function state(initState) {
  const subscribers = new Map();

  let state = initState;

  return {
    subscribe: function(component) {
      const key = subscribers.size + 1;

      subscribers.set(key, component);

      return () => subscribers.delete(key);
    },
    notify: function() {
      subscribers.forEach(subscriber => subscriber.dom.replaceWith(component.render(subscriber, subscriber, null).dom));
    },
    set: function(newState) {
      batcher.initIfNotInitialized();      
      batcher.add(this);

      let tmp = null;

      if(newState !== state) {
        if(isFunction(newState)) {
          tmp = newState(state);
        } else {
          tmp = newState;
        }
      }
  
      state = tmp;
    },
    get: function() {
      return state;
    }
  };
};