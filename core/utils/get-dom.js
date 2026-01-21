import NUMBERS from "../const/NUMBERS.const.js";

import component from "./component.js";

export default function getDOM(something) {
  // Component can return either a dom commands or new component.
  if(something?._type === NUMBERS.OBJECT_TYPES.DOM_COMMANDS) {
    return something._toDOM();
  } else if(something?.type === NUMBERS.OBJECT_TYPES.COMPONENT_INSTANCE_INFO) {
    return component.create(something).init().render().dom;
  }
};