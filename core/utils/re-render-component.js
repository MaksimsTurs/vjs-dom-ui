import { pushComponentInstance, popComponentInstance } from "./component-render-stack.js";
import { swapComponentInstanceKeys } from "./component-instances-map.js";
import getDom from "./get-dom.js";

export default function reRenderComponent(cachedComponent, newComponent, replaceDom) {
  if(newComponent) {
    cachedComponent.props = newComponent.props;
    cachedComponent.render = newComponent.render.bind(cachedComponent, cachedComponent.props);
  }

  pushComponentInstance(cachedComponent);

  const dom = getDom(cachedComponent.render());

  dom.setAttribute("vjs-type", cachedComponent.name);

  if(replaceDom) {
    cachedComponent.dom.replaceWith(dom);
  }

  cachedComponent.dom = dom;
  cachedComponent.domTraversal.setRoot(dom);
  swapComponentInstanceKeys(cachedComponent.dom, dom, cachedComponent);

  popComponentInstance();
}