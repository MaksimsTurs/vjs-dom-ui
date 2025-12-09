import componentsInstances from "./utils/components-instances.js";
import componentsInProgress from "./utils/components-in-progress.js";

export default function mount(parent, component) {
  component.create();
  component.init();

  componentsInProgress.push(component.instance());

  const el = component.render();
  component.instance().domTraversal.setRoot(el);

  componentsInProgress.pop();

  componentsInstances.set(el, component.instance());
  parent.appendChild(el);
};