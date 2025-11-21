import { isFunction, isObject, isHTMLElement } from "./utils/is.js";

export default function component(component) { 
  return function(props) {
    const _component = {...component };
    
    _component.state  = {};
    _component.render = _component.render.bind(_component, props);
    
    _component.init?.(props);
    
    return function() {
      let el = _component.render(props);
      
      if(isFunction(el)) {
        el = el();
      } else if(isObject(el)) {
        el = el.dom();
      }
      
      _component.$DOM = el;

      return _component.$DOM;
    };
  };
};