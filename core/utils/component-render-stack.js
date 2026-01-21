import NUMBERS from "../const/NUMBERS.const.js";

const g_COMPONENT_RENDER_STACK = [];

const renderStack = {
  push: function(component) {
    if(component.type === NUMBERS.OBJECT_TYPES.COMPONENT_INSTANCE) {
      g_COMPONENT_RENDER_STACK.push(component);
    }
  },
  pop: function() {
    return g_COMPONENT_RENDER_STACK.pop();
  },
  getCurrent: function() {
    return g_COMPONENT_RENDER_STACK.at(-1);
  }
};


export default renderStack;