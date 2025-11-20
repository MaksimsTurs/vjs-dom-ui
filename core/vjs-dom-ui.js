import component from "./component.js";
import el        from "./el.js";
import state     from "./state.js";
import mount     from "./mount.js";

import { 
  __DEV__measureFunctionExecution,
  __DEV__measureRenderTime,
  __DEV__printDOMTreePatchState,
  __DEV__printDOMTreeStack,
  __DEV__printDOMTreeStackFrame,
  __DEV__try
} from "./utils/debug.js";

export {
  component,
  el,
  state,
  mount,
};

export const __DEBUG__ = {
  __DEV__measureFunctionExecution,
  __DEV__measureRenderTime,
  __DEV__printDOMTreePatchState,
  __DEV__printDOMTreeStack,
  __DEV__printDOMTreeStackFrame,
  __DEV__try
};