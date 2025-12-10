import { pushComponentInstance, popComponentInstance } from "./component-render-stack.js";
import { setComponentInstance } from "./component-instances-map.js";

import getDom from "./get-dom.js";

export default function renderComponent(componentInfo) {
  pushComponentInstance(componentInfo);

  const dom = getDom(componentInfo.render());

  dom.setAttribute("vjs-type", componentInfo.name);

  componentInfo.dom = dom;
  componentInfo.domTraversal.setRoot(dom);
  setComponentInstance(dom, componentInfo);

  popComponentInstance();
};