import defineComponent from "./define-component.js";
import el              from "./el.js";
import state           from "./state.js";
import mount           from "./mount.js";

// TODO: Better error handling.
// TODO: Use stack based approach (execDomCommands      [exec-dom-commands.js]).
// TODO: Use stack based approach (appendChildren       [exec-dom-commands.js]).
// TODO: Check performance of execDomCommands           [exec-dom-commands.js].
// TODO: Check performance of appendChildren            [exec-dom-commands.js].
// TODO: Check performance of getDom                    [get-dom.js].
// TODO: Check performance of renderComponentInstance   [render-component-instance.js].
// TODO: Check performance of reRenderComponentInstance [re-render-component-instance.js].

export {
  defineComponent,
  el,
  state,
  mount,
};