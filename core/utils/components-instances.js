const componentsIntances = {
  set: function(domRef, instance) {
    this.components.set(domRef, instance);
  },
  get: function(domRef) {
    return this.components.get(domRef);
  },
  swap: function(oldDomRef, newDomRef, instance) {
    this.components.delete(oldDomRef);
    this.components.set(newDomRef, instance);
  }
};

Object.defineProperty(componentsIntances, "components", {
  enumerable: false,
  writable: false,
  value: new Map()
});

export default componentsIntances;