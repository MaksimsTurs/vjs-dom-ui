const COMPONENTS_STACK = [];

export function pushComponentInstance(instance) {
  COMPONENTS_STACK.push(instance);
};

export function popComponentInstance(instance) {
  COMPONENTS_STACK.pop();
};

export function getCurrentComponentInstance() {
  return COMPONENTS_STACK.at(-1);
};