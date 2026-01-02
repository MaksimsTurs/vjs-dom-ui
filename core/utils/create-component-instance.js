import DomTraversal from "./dom-traversal.js";

export default function createComponentInstance(componentInfo) {
  if(componentInfo) {
    const componentInstance = {
      _type:        componentInfo._type,
      name:         componentInfo.name,
      props:        componentInfo.props,
      domTraversal: new DomTraversal(),
      state:        {},
      dom:          null,
      init:         null,
      render:       null
    };
  
    componentInstance.init = componentInfo.init?.bind(componentInstance, componentInfo.props);;  
    componentInstance.render = componentInfo.render.bind(componentInstance, componentInfo.props);;
  
    return componentInstance;
  }

  return undefined;
};