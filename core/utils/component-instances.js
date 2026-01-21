import NUMBERS from "../const/NUMBERS.const.js";

const g_COMPONENT_INSTANCE = new Map();

const componentInstances = {
  set: function(DOMRef, instance) {
    if(instance.type === NUMBERS.OBJECT_TYPES.COMPONENT_INSTANCE && !g_COMPONENT_INSTANCE.has(DOMRef)) {
      g_COMPONENT_INSTANCE.set(DOMRef, instance);
    }
  },
  get: function(DOMRef) {
    return g_COMPONENT_INSTANCE.get(DOMRef);
  },
  delete: function(DOMRef) {
    return g_COMPONENT_INSTANCE.delete(DOMRef);
  },
  swap: function(oldDOMRef, newDOMRef, instance) {
    g_COMPONENT_INSTANCE.delete(oldDOMRef);
    g_COMPONENT_INSTANCE.set(newDOMRef, instance);
  }  
};

export default componentInstances;