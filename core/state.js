import batcher from "./batcher.js";
import { COMPONENTS, STATES } from "./component.js";
import { exec } from "./mount.js";

export default function state(initState) {
  const subscribers = new Map();

  let state = initState;

  return {
    $$subscribers: function() {
      return subscribers;
    },
    subscribe: function(component) {
      const key = subscribers.size + 1;

      subscribers.set(key, component);

      return () => subscribers.delete(key);
    },
    notify: function() {
      subscribers.forEach(subscriber => {
        COMPONENTS.push(subscriber);
        const commands = subscriber.render().dom();
        const newDom = exec(commands);
        
        newDom.setAttribute("vjs-type", subscriber.name);
        
        STATES.delete(subscriber.dom);
        STATES.set(newDom, subscriber);
        
        subscriber.dom.replaceWith(newDom)
        subscriber.domTraversal.setRoot(newDom);
  
        subscriber.dom = newDom;
        COMPONENTS.pop();
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