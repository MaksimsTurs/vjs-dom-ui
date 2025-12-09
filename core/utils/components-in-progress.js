const componentsInProgress = {
  push: function(instance) {
    this.components.push(instance);
  },
  pop: function() {
    this.components.pop();
  },
  last: function() {
    return this.components.at(-1);
  }
};

Object.defineProperty(componentsInProgress, "components", {
  enumerable: false,
  writable: false,
  value: []
});

export default componentsInProgress