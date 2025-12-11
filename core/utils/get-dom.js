import NUMBERS from "../const/NUMBERS.const.js";

import execDomCommands from "./exec-dom-commands.js";
import renderComponentInstance from "./render-component-instance.js";
import createComponentInstance from "./create-component-instance.js";

export default function getDom(newDom) {
  if(newDom?._type === NUMBERS.OBJECT_TYPES.DOM_COMMANDS) {
    const _newDom = newDom;

    newDom = execDomCommands(newDom._commands());
    _newDom._clear();

    return newDom;
  } else if(newDom?._type === NUMBERS.OBJECT_TYPES.COMPONENT) {
    return renderComponentInstance(createComponentInstance(newDom));
  }
};