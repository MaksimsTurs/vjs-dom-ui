import NUMBERS from "../const/NUMBERS.const.js";

function push(stack, frame) {
  stack.push(frame);

};

function pop(stack) {
  stack.pop();
};

function createFrame(oldNdes, newNodes) {
  return [
    oldNdes, 
    newNodes,
    0,
    0,
    oldNdes.length,
    newNodes.length
  ];
};

function getParents(stack) {
  return [stack[stack.length - 2][0][0], stack[stack.length - 2][1][0]];
};

function getFrame(stack) {
  const stackFrame = stack[stack.length - 1];
  
  return { 
    oldNodes:      stackFrame?.[0],
    newNodes:      stackFrame?.[1],
    oldNode:       stackFrame?.[0][stackFrame?.[NUMBERS.INDEX_TYPES.OLD_NODES] || 0], 
    newNode:       stackFrame?.[1][stackFrame?.[NUMBERS.INDEX_TYPES.NEW_NODES] || 0], 
    oldNodeIndex:  stackFrame?.[2], 
    newNodeIndex:  stackFrame?.[3], 
    oldNodeLength: stackFrame?.[4], 
    newNodeLength: stackFrame?.[5] 
  }; 
}

function incrementIndex(stack, type, count) {
  stack[stack.length - 1][type] += count;
};

export {
  push,
  pop,
  incrementIndex,
  createFrame,
  getFrame,
  getParents
};