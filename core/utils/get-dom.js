import NUMBERS from "../const/NUMBERS.const.js";

import execDOMCommands from "./exec-dom-commands.js";
import initComponent from "./init-component.js";
import renderComponent from "./render-component.js";

export default function getDom(newDom) {
  if(newDom?._type === NUMBERS.OBJECT_TYPES.DOM_COMMANDS) {
    const _newDom = newDom;

    newDom = execDOMCommands(newDom._commands());
    _newDom._clear();

    return newDom;
  } else if(newDom?._type === NUMBERS.OBJECT_TYPES.COMPONENT) {
    initComponent(newDom);
    renderComponent(newDom);

    return newDom.dom;
  }
};