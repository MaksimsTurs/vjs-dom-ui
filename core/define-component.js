import NUMBERS from "./const/NUMBERS.const.js";

import { fail } from "./utils/assert.js";
import { isUndefined, isNull } from "./utils/is.js";
import componentDescriptors from "./utils/component-descriptors.js";

/**
 *  @typedef  {object}   ComponentDescriptor
 *  @property {string}   name
 *  @property {Function} render
 *  @property {Function} [init]
 */

/** 
 *  @param {ComponentDescriptor} componentDescriptor 
 */
export default function defineComponent(componentDescriptor) {
  fail(isUndefined(componentDescriptor.name) || isNull(componentDescriptor.name),     "Name of the component must be provided when defining new component!");
  fail(isUndefined(componentDescriptor.render) || isNull(componentDescriptor.render), "Render function must be provided when defining new component!");

  if(!componentDescriptors.has(componentDescriptor.name)) {
    componentDescriptors.set(componentDescriptor.name, {
      type:   NUMBERS.OBJECT_TYPES.COMPONENT_DESCRIPTOR,
      init:   componentDescriptor.init,
      render: componentDescriptor.render,
    });
  }

  // Funciton that give a information about the new instance of the component.
  return function(props) {
    return {
      type:     NUMBERS.OBJECT_TYPES.COMPONENT_INSTANCE_INFO,
      name:     componentDescriptor.name,
      props:    props,
    };
  };
};