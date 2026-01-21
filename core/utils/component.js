import NUMBERS from "../const/NUMBERS.const.js";

import DOMTraversal from "./dom-traversal.js";
import getDOM from "./get-dom.js";
import componentDescriptors from "./component-descriptors.js";
import componentInstances from "./component-instances.js";
import renderStack from "./component-render-stack.js";
import { fail } from "./assert.js";

function create(instanceInfo) {
  fail(instanceInfo.type !== NUMBERS.OBJECT_TYPES.COMPONENT_INSTANCE_INFO, "The argument \"instanceInfo\" of \"create\" function is not of type \"COMPONENT_INSTANCE_INFO\"!");

  let instance = {
    ...instanceInfo,
    type:         NUMBERS.OBJECT_TYPES.COMPONENT_INSTANCE,
    state:        {},
    domTraversal: new DOMTraversal(),
    dom:          null,
  };
    
  return { 
    init: () => init(instance),
  };
};

function init(instance) {
  fail(instance.type !== NUMBERS.OBJECT_TYPES.COMPONENT_INSTANCE, "The argument \"instance\" of \"create\" function is not of type \"COMPONENT_INSTANCE\"!");

  const descriptor = componentDescriptors.get(instance.name);
  
  if(descriptor?.init) {
    descriptor.init.call(instance, instance.props);
  }
  
  return { 
    render: (oldDOM) => render(instance, null, oldDOM) 
  };
};

function render(oldComponent, newComponent, oldDOM) {
  fail(!oldComponent, "\"oldComponent\" must be provided!");

  renderStack.push(oldComponent);

  const componentDescriptor = componentDescriptors.get(oldComponent.name);
  let dom = null;

  if(!newComponent) {
    dom = getDOM(componentDescriptor.render.call(oldComponent, oldComponent.props));
  } else {
    dom = getDOM(componentDescriptor.render.call(newComponent, newComponent.props));    
    oldComponent.props = newComponent.props;
  }
  
  fail(!dom, `The render function of component "${oldComponent.name}" give a value of "${typeof dom}"!`);
  
  componentInstances.swap((oldDOM && oldDOM.hasAttribute("vjs-type")) ? oldDOM : oldComponent.dom, dom, oldComponent);
  oldComponent.domTraversal.setRoot(dom);
  oldComponent.dom = dom;
  dom.setAttribute("vjs-type", oldComponent.name);
  
  renderStack.pop();

  return { dom, instance: oldComponent };
}

export default {
  create,
  render
};