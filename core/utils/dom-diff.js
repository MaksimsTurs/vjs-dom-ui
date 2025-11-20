import NUMBERS from "../const/NUMBERS.const.js";

import * as DOMTreeStack from "./dom-tree-stack.js";

import { isTextNode } from "./is.js";

import { 
  __DEV__printDOMTreeStackFrame, 
  __DEV__printDOMTreeStack, 
  __DEV__printDOMTreePatchState 
} from "./debug.js";

export default function domDiff(oldDOM, newDOM) {
  const DOM_TREE_STACK = [];

  DOMTreeStack.push(DOM_TREE_STACK, DOMTreeStack.createFrame(oldDOM, newDOM));

  let PATCH_STATE  = NUMBERS.PATCH_STATES.CHECK_NEXT_PATCH_STATE;
  let domTreeFrame = null;

  while(!isEndOfTree(DOM_TREE_STACK, domTreeFrame)) {
    domTreeFrame = DOMTreeStack.getFrame(DOM_TREE_STACK);

    switch(PATCH_STATE) {
      case NUMBERS.PATCH_STATES.CHECK_NEXT_PATCH_STATE: {
        if(isEndOfFrame(domTreeFrame)) {
          PATCH_STATE = NUMBERS.PATCH_STATES.POP_STACK;
        } else if(sholdNodeRemoved(domTreeFrame.oldNode, domTreeFrame.newNode)) {
          PATCH_STATE = NUMBERS.PATCH_STATES.REMOVE;
        } else if(shouldNodeReplaced(domTreeFrame.oldNode, domTreeFrame.newNode)) {
          PATCH_STATE = NUMBERS.PATCH_STATES.REPLACE;
        } else if(shouldAppendChildren(domTreeFrame.oldNode, domTreeFrame.newNode)) {
          PATCH_STATE = NUMBERS.PATCH_STATES.APPEND_CHILDREN;
        } else if(shouldAttributesChanged(domTreeFrame.oldNode, domTreeFrame.newNode)) {
          PATCH_STATE = NUMBERS.PATCH_STATES.CHANGE_ATTRIBUTES;
        } else if(shouldGoDeeper(domTreeFrame.oldNode, domTreeFrame.newNode)) {
          PATCH_STATE = NUMBERS.PATCH_STATES.GO_DEEPER;
        } else {
          PATCH_STATE = NUMBERS.PATCH_STATES.SKIP_ELEMENT;
        }

        // __DEV__printDOMTreePatchState(PATCH_STATE);
        // __DEV__printDOMTreeStack(DOM_TREE_STACK);
        // __DEV__printDOMTreeStackFrame(domTreeFrame);      
      }
      break;
      case NUMBERS.PATCH_STATES.POP_STACK: {
        DOMTreeStack.pop(DOM_TREE_STACK);

        PATCH_STATE = NUMBERS.PATCH_STATES.CHECK_NEXT_PATCH_STATE;
      }
      break;
      case NUMBERS.PATCH_STATES.REMOVE: {
        const { oldNode, newNode } = DOMTreeStack.getFrame(DOM_TREE_STACK);
        
        let count = oldNode.childNodes.length - newNode.childNodes.length;

        while(count--) {
          oldNode.firstChild.remove();
        }

        PATCH_STATE = NUMBERS.PATCH_STATES.CHECK_NEXT_PATCH_STATE;
      }
      break;
      case NUMBERS.PATCH_STATES.APPEND_CHILDREN: {
        const { 0: oldParent, 1: newParent } = DOMTreeStack.getParents(DOM_TREE_STACK);

        const start = (oldParent.childNodes.length - 1) < 0 ? 0 : oldParent.childNodes.length - 1;
        const fragment = document.createDocumentFragment();

        let newChild = null;

        while((newChild = newParent.childNodes[start])) {
          fragment.appendChild(newChild);
        }
        
        oldParent.appendChild(fragment);

        DOMTreeStack.incrementIndex(DOM_TREE_STACK, NUMBERS.INDEX_TYPES.OLD_NODES, oldParent.childNodes.length);
        DOMTreeStack.incrementIndex(DOM_TREE_STACK, NUMBERS.INDEX_TYPES.NEW_NODES, oldParent.childNodes.length);

        PATCH_STATE = NUMBERS.PATCH_STATES.CHECK_NEXT_PATCH_STATE;
      }
      break;
      case NUMBERS.PATCH_STATES.REPLACE: {
        const { oldNode, newNode } = DOMTreeStack.getFrame(DOM_TREE_STACK);

        oldNode.replaceWith(newNode);

        PATCH_STATE = NUMBERS.PATCH_STATES.CHECK_NEXT_PATCH_STATE;

        DOMTreeStack.incrementIndex(DOM_TREE_STACK, NUMBERS.INDEX_TYPES.OLD_NODES, 1);
        DOMTreeStack.incrementIndex(DOM_TREE_STACK, NUMBERS.INDEX_TYPES.NEW_NODES, 1);
      }
      break
      case NUMBERS.PATCH_STATES.CHANGE_ATTRIBUTES: {
        const { oldNode, newNode } = DOMTreeStack.getFrame(DOM_TREE_STACK);

        const oldAttributes      = oldNode.attributes;
        const newAttributes      = newNode.attributes;
        const existingAttributes = new Set();

        // Update and Append value.
        for(let index = 0; index < newAttributes.length; index++) {
          const { name, value } = newAttributes[index];

          if(oldAttributes[name]?.value !== value) {
            oldNode.setAttribute(name, value);
            existingAttributes.add(name);
          }
        }

        for(let index = 0; index < oldAttributes.length; index++) {
          const { name } = oldAttributes[index];

          if(!existingAttributes.has(name)) {
            oldNode.removeAttribute(name);
          }
        }

        // DOMTreeStack.incrementIndex(DOM_TREE_STACK, NUMBERS.INDEX_TYPES.OLD_NODES, 1);
        // DOMTreeStack.incrementIndex(DOM_TREE_STACK, NUMBERS.INDEX_TYPES.NEW_NODES, 1);

        PATCH_STATE = NUMBERS.PATCH_STATES.CHECK_NEXT_PATCH_STATE;
      }
      break;
      case NUMBERS.PATCH_STATES.GO_DEEPER: {
        const { oldNode, newNode } = DOMTreeStack.getFrame(DOM_TREE_STACK);
        
        DOMTreeStack.incrementIndex(DOM_TREE_STACK, NUMBERS.INDEX_TYPES.OLD_NODES, 1);
        DOMTreeStack.incrementIndex(DOM_TREE_STACK, NUMBERS.INDEX_TYPES.NEW_NODES, 1);        
        DOMTreeStack.push(DOM_TREE_STACK, DOMTreeStack.createFrame(oldNode.childNodes, newNode.childNodes));     
        
        PATCH_STATE = NUMBERS.PATCH_STATES.CHECK_NEXT_PATCH_STATE;
      }
      break;
      case NUMBERS.PATCH_STATES.SKIP_ELEMENT:
        DOMTreeStack.incrementIndex(DOM_TREE_STACK, NUMBERS.INDEX_TYPES.OLD_NODES, 1);
        DOMTreeStack.incrementIndex(DOM_TREE_STACK, NUMBERS.INDEX_TYPES.NEW_NODES, 1);

        PATCH_STATE = NUMBERS.PATCH_STATES.CHECK_NEXT_PATCH_STATE;
      break;
    }
  }
};

function isEndOfTree(stack, frame) {
  return !stack.length && (!frame?.newNode && !frame?.oldNode);
};

function isEndOfFrame(frame) {
  return !frame.newNode && !frame.oldNode;
};

function shouldAppendChildren(oldNode, newNode) {
  return !oldNode && newNode;
};

function shouldNodeReplaced(oldNode, newNode) {
  return(
    oldNode && newNode &&
    ((isTextNode(oldNode) && isTextNode(newNode) && oldNode !== newNode) ||
    (oldNode.tagName !== newNode.tagName))
  );
};

function shouldGoDeeper(oldNode, newNode) {
  return oldNode && newNode && !oldNode.isEqualNode(newNode);
};

function sholdNodeRemoved(oldNode, newNode) {
  return oldNode && newNode && oldNode.childNodes.length > newNode.childNodes.length;
};

function shouldAttributesChanged(oldNode, newNode) {
  if(!oldNode || !newNode || isTextNode(oldNode) || isTextNode(newNode)) {
    return false;
  }

  const oldAttributes = oldNode.attributes;
  const newAttributes = newNode.attributes;
  
  if(oldAttributes.length !== newAttributes.length) {
    return true;
  }

  for(let { name, value } of oldAttributes) {
    const newValue = newAttributes[name]?.value;

    if(value !== newValue) {
      return true;
    }
  }

  return false;
};