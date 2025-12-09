import NUMBERS from "../const/NUMBERS.const.js";

import componentsInProgress from "./components-in-progress.js";
import { execDOMCommands } from "./exec-dom-commands.js";

export default function readNewNode(newNode) {
  if(newNode?._type === NUMBERS.OBJECT_TYPES.DOM_COMMANDS) {
    // Create new element from DOM commands.
    // TODO: Maybe extract this in to the function.
    const _newNode = newNode;

    newNode = execDOMCommands(newNode._commands());
    _newNode._clear();
  } else if(newNode?.type === NUMBERS.OBJECT_TYPES.COMPONENT) {
    // Create new component.
    // TODO: Maybe extract this in to the function.
    const component = newNode;

    component.create();
    component.init();
    
    componentsInProgress.push(component.instance());
    
    newNode = component.render();
    
    component.instance().domTraversal.setRoot(newNode);
    componentsInProgress.pop();
  }

  return newNode;
};