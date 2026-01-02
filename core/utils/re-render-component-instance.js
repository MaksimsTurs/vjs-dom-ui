import { pushComponentInstance, popComponentInstance } from "./component-render-stack.js";
import { swapComponentInstanceKeys } from "./component-instances-map.js";
import getDom from "./get-dom.js";

export default function reRenderComponentInstance(cachedComponent, newComponent, replaceDom) {
  if(newComponent) {
    cachedComponent.props = newComponent.props;
    cachedComponent.render = newComponent.render.bind(cachedComponent, cachedComponent.props);
  }

  pushComponentInstance(cachedComponent);

  const dom = getDom(cachedComponent.render());

  if(dom.nodeType === document.DOCUMENT_FRAGMENT_NODE) {
    throw new Error(`Component ${newComponent.name} returns a fragment but must return a HTML Element!`);
  }

  dom.setAttribute("vjs-type", cachedComponent.name);
  
  swapComponentInstanceKeys(cachedComponent.dom, dom, cachedComponent);

  if(replaceDom) {
    cachedComponent.dom.replaceWith(dom);
  }

  cachedComponent.dom = dom;
  cachedComponent.domTraversal.setRoot(dom);

  popComponentInstance();

  return dom;
};