import NUMBERS from "./const/NUMBERS.const.js";

import { isFunction, isString } from "./utils/is.js";

/**
 *  @typedef  {object}   BaseComponent
 *  @property {string}   name
 *  @property {Function} render
 *  @property {object}   [state]
 *  @property {Function} [init]
 */

/** 
 *  @param {BaseComponent} baseComponent 
 */
export default function defineComponent(baseComponent) {
  if(!isString(baseComponent.name)) {
    throw new Error(`baseComponent.name(${baseComponent.name}) is not of type \"string\"!`);
  }

  if(!isFunction(baseComponent.render)) {
    throw new Error(`baseComponent.render(${baseComponent.render}) is not of type \"function\"!`);
  }

  return function(props) {
    return {
      _type:  NUMBERS.OBJECT_TYPES.COMPONENT,
      name:   baseComponent.name,
      render: baseComponent.render,
      init:   baseComponent.init,
      state:  baseComponent.state,
      props:  props,
    };
  };
};