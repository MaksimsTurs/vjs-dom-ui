import DomTraversal from "./dom-traversal.js";

export default function initComponent(componentInfo) {
  componentInfo.domTraversal = new DomTraversal();

  componentInfo.init = componentInfo.init?.bind(componentInfo, componentInfo.props);
  componentInfo.render = componentInfo.render.bind(componentInfo, componentInfo.props);

  componentInfo.init?.();
};
