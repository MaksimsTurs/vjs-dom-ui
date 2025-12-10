const COMPONENT_INSTANCES = new Map();

export function setComponentInstance(domRef, instance) {
  COMPONENT_INSTANCES.set(domRef, instance);
};

export function getComponentInstance(domRef) {
  return COMPONENT_INSTANCES.get(domRef);
};

export function hasComponentInstance(domRef) {
  return COMPONENT_INSTANCES.has(domRef);
};

export function swapComponentInstanceKeys(oldDomRef, newDomRef, instance) {
  COMPONENT_INSTANCES.delete(oldDomRef);
  COMPONENT_INSTANCES.set(newDomRef, instance);
};