import batcher from "./batcher.js";

import reRenderComponent from "./utils/re-render-component.js";

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
      subscribers.forEach(subscriber => {
        reRenderComponent(subscriber, null, true);
      });
    },
    set: function(newState) {
      batcher.initWhenNotInitialized();      
      batcher.addState(this);

      let tmp = null;

      if(newState !== state) {
        if(typeof newState === "function") {
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