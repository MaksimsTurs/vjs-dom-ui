import batcher from "./batcher.js";

import componentsIntances from "./utils/components-instances.js";
import componentsInProgress from "./utils/components-in-progress.js";
import { execDOMCommands } from "./utils/exec-dom-commands.js";

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
        componentsInProgress.push(subscriber);
        const commands = subscriber.render()._commands();
        const newDom = execDOMCommands(commands);
        
        newDom.setAttribute("vjs-type", subscriber.name);
        
        componentsIntances.swap(subscriber.dom, newDom, subscriber);
        
        subscriber.dom.replaceWith(newDom)
        subscriber.domTraversal.setRoot(newDom);
  
        subscriber.dom = newDom;
        componentsInProgress.pop();
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