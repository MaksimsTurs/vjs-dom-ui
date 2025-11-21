import STRINGS from "./const/STRINGS.const.js";
import NUMBERS from "./const/NUMBERS.const.js";

import cloneNodes from "./utils/clone-nodes.js";

function __DEV__try(callback) {
  try {
    callback();
  } catch(error) {
    console.log(error);
  }
};

function __DEV__printDOMTreeStackFrame(frame) {
  const { 
    oldNodes, 
    newNodes, 
    oldNode, 
    newNode, 
    oldNodeIndex, 
    newNodeIndex, 
    oldNodeLength, 
    newNodeLength 
  } = frame;

  console.log(STRINGS.DEBUG_PREFIX.DOM_TREE_STACK_FRAME, {
    oldNodes:     cloneNodes(oldNodes),
    newNodes:     cloneNodes(newNodes),

    oldNode:      cloneNodes([oldNode])[0],
    newNode:      cloneNodes([newNode])[0],
    
    oldNodeIndex,
    oldNodeLength,
    
    newNodeIndex,
    newNodeLength,
  });
};

function __DEV__printDOMTreeStack(stack) {
  for(let index = 0; index < stack.length; index++) {
    const {
      0: oldNodes, 
      1: newNodes, 
      2: oldNodeIndex, 
      3: newNodeIndex, 
      4: oldNodeLength, 
      5: newNodeLength 
    } = stack[index];

    console.log(STRINGS.DEBUG_PREFIX.DOM_TREE_STACK, `(${index})`, {
      oldNodes: cloneNodes(oldNodes),
      newNodes: cloneNodes(newNodes),

      oldNodeIndex,
      oldNodeLength,
      
      newNodeIndex,
      newNodeLength
    });
  };
};

function __DEV__printDOMTreePatchState(currState) {
  for(let name in NUMBERS.PATCH_STATES) {
    if(NUMBERS.PATCH_STATES[name] === currState) {
      console.log(`${STRINGS.DEBUG_PREFIX.PATCH_STATE} ${name}`);
      break;
    }
  }
};

function __DEV__measureFunctionExecution(name, callback) {
  const now = performance.now();
  const res = callback();
  const yet = performance.now();

  const diff = yet - now;

  console.log(`${STRINGS.MEASURE_PREFIX.FUNCTION_EXECUTION} ${name} execution time: ${diff.toFixed(20)}`);

  return res;
};

const RENDERING_COUNT = {};

function apply(name, target, thisArg, argArray) {
  const now = performance.now();
  const dom = Reflect.apply(target, thisArg, argArray);
  const yet = performance.now();

  const diff = yet - now;

  if(!(name in RENDERING_COUNT)) {
    RENDERING_COUNT[name] = 0;
  }

  RENDERING_COUNT[name]++;
  
  console.log(`${STRINGS.MEASURE_PREFIX.RENDER_EXECUTION} ${name} rendering time: ${diff.toFixed(20)}`);
  console.log(`${STRINGS.MEASURE_PREFIX.RENDER_EXECUTION} ${name} rendering count ${RENDERING_COUNT[name]}`);

  return dom;
};

function __DEV__measureRenderTime(name, render) {
  return new Proxy(render, { apply: (...args) => apply(name, ...args) });
};

const __DEBUG__ = {
  __DEV__try,
  __DEV__measureFunctionExecution,
  __DEV__printDOMTreePatchState,
  __DEV__measureRenderTime,
  __DEV__printDOMTreeStack,
  __DEV__printDOMTreeStackFrame
};

export default __DEBUG__;