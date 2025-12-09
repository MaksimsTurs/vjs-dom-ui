import NUMBERS from "./const/NUMBERS.const.js";

import { execDOMCommands } from "./utils/exec-dom-commands.js";
import { isFunction, isString } from "./utils/is.js";
import DOMTraversal from "./utils/dom-traversal.js";

import componentsInProgress from "./utils/components-in-progress.js";

export default function defineComponent(baseComponent) {
  if(!isString(baseComponent.name)) {
    throw new Error(`baseComponent.name(${baseComponent.name}) is not of type \"string\"!`);
  }

  if(!isFunction(baseComponent.render)) {
    throw new Error(`baseComponent.render(${baseComponent.render}) is not of type \"function\"!`);
  }

  return function(props) {
    let instance = null;

    return {
      props: props,
      name:  baseComponent.name,
      type:  NUMBERS.OBJECT_TYPES.COMPONENT,
      instance: function() {
        return instance;
      },
      create: function() {
        instance = {
          name:       baseComponent.name,
          renderBase: baseComponent.render,
          render:     baseComponent.render,
          init:       baseComponent?.init,
          state:      {},
          props:      props,
          dom:        null
        }

        instance.domTraversal = new DOMTraversal();
        
        instance.init   = instance.init?.bind(instance, props);
        instance.render = instance.render.bind(instance, props);
      },
      init: function() {
        instance.init?.(props);
      },
      render: function() {
        let el = instance.render(props);
        
        if(el?._type === NUMBERS.OBJECT_TYPES.DOM_COMMANDS) {
          // Create new element from DOM commands.
          // TODO: Maybe extract this in to the function.
          const commands = el._commands();
          const newElement = execDOMCommands(commands);
          
          el._clear();
          el = newElement;
        } else if(el?.type === NUMBERS.OBJECT_TYPES.COMPONENT) {
          // Create new component.
          // TODO: Maybe extract this in to the function.

          const component = el;

          component.create();
          component.init();

          componentsInProgress.push(component.instance());
          el = component.render();
          component.instance().domTraversal.setRoot(el);
          componentsInProgress.pop();
        }
        
        el.setAttribute("vjs-type", baseComponent.name);
        
        instance.dom = el;

        return el;
      },
    }
  };
};