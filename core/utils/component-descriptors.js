const g_COMPONENT_DESCRIPTORS = new Map();

const componentDescriptors = {
  set: function(name, descriptor) {
    g_COMPONENT_DESCRIPTORS.set(name, descriptor);
  },
  get: function(name) {
    return g_COMPONENT_DESCRIPTORS.get(name);
  },
  has: function(name) {
    return g_COMPONENT_DESCRIPTORS.has(name);
  },
  delete: function(name) {
    g_COMPONENT_DESCRIPTORS.delete(name);
  }
};

export default componentDescriptors;