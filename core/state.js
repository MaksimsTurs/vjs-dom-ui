import batcher from "./batcher.js";

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