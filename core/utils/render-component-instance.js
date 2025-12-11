import { pushComponentInstance, popComponentInstance } from "./component-render-stack.js";
import { setComponentInstance } from "./component-instances-map.js";

import getDom from "./get-dom.js";

export default function renderComponentInstance(componentInstance) {
  componentInstance.init?.();

  pushComponentInstance(componentInstance);

  const dom = getDom(componentInstance.render());

  dom.setAttribute("vjs-type", componentInstance.name);

  componentInstance.dom = dom;
  componentInstance.domTraversal.setRoot(dom);
  setComponentInstance(dom, componentInstance);

  popComponentInstance();

  return dom;
};