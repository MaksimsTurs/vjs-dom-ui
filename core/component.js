export default function component(component) { 
  return function(props) {
    const _component = {...component };

    _component.state  = {};
    _component.render = _component.render.bind(_component, props);
        
    _component.init?.(props);
    
    return function() {
      let el = _component.render(props);
      
      if(typeof el === "function") {
        el = el();
      } else if(typeof el === "object") {
        el = el.dom();
      }
      
      _component.$DOM = el;

      return _component.$DOM;
    };
  };
};