import NUMBERS from "../const/NUMBERS.const.js";

import { isArray, isObject } from "./is.js";
import component from "./component.js";
import componentInstances from "./component-instances.js";
import renderStack from "./component-render-stack.js";

export default function execDomCommands(commands) {
  const parent = renderStack.getCurrent();
  const domTraversal = parent.domTraversal;

  let newNode = null;
  
  for(let index = 0; index < commands.length; index++) {
    const type = commands[index][0];

    switch(type) {
      case NUMBERS.DOM_COMMANDS.CREATE_NODE:
        newNode = createNode(commands[0][1]);
      break;
      case NUMBERS.DOM_COMMANDS.SET_STYLE:
        setStyles(newNode, commands[index][1]);
      break;
      case NUMBERS.DOM_COMMANDS.SET_ATTR:
        setAttributes(newNode, commands[index][1]);
      break;
      case NUMBERS.DOM_COMMANDS.SET_TEXT:
        setText(newNode, commands[index][1]);
      break;
      case NUMBERS.DOM_COMMANDS.ADD_EVENT:
        setEventListener(newNode, commands[index]);
      break;
      case NUMBERS.DOM_COMMANDS.APPEND_CHILD:
        appendChildren(domTraversal, newNode, commands[index][1]);
      break;
    }
  }
  
  return newNode;
}

function appendChildren(domTraversal, newNode, childrens) {
  domTraversal.goDown();
  
  const fragment = document.createDocumentFragment();
  
  for(let index = 0; index < childrens.length; index++) {
    const children = childrens[index];

    if(isArray(children)) {
      appendChildren(domTraversal, fragment, children);
    } else if(children?.type === NUMBERS.OBJECT_TYPES.COMPONENT_INSTANCE_INFO) {  
      const currentChildren = domTraversal.getChildren();
      const cachedComponent = componentInstances.get(currentChildren);
  
      if(currentChildren?.getAttribute("vjs-type") !== children.name) {
        // Create new component
        const newComponent = component.create(children).init().render(currentChildren);
        fragment.appendChild(newComponent.dom);
      } else {
        // Re bind the render function and re render the component or
        // use cached dom.
        const prevProps = cachedComponent?.props;
        const newProps = children?.props;
  
        if(prevProps !== newProps) {
          const reRenderedComponentDOM = component.render(cachedComponent, children, null).dom;
          fragment.appendChild(reRenderedComponentDOM);
        } else {
          fragment.appendChild(currentChildren);
        }
      }
    } else if(isObject(children)) {
      fragment.appendChild(children._toDOM());
    }

    domTraversal.goNext();
  }
  
  newNode.appendChild(fragment);
  domTraversal.goUp();
}

function createNode(tag) {
  switch(tag) {
    case "fragment":
      return document.createDocumentFragment();
    case "path":
    case "svg":
    case "rect":
    case "line":
      return document.createElementNS("http://www.w3.org/2000/svg", tag);
    default:
      return document.createElement(tag);
  }
}

function setAttributes(node, attrs) {
  for(let key in attrs) {
    if(attrs[key]) {
      if(key == "xmlns") {
        node.setAttribute(key, (attrs[key]).toString());
      } else {
        node.setAttributeNS(null, key, (attrs[key]).toString());
      }
    }
  }
};

function setStyles(node, styles) {
  for(let name in styles) {
    node.style[name] = styles[name];
  }
};

function setText(node, text) {
  node.textContent = text;
};

function setEventListener(node, eventDescriptor) {
  node.addEventListener(eventDescriptor.at(1), eventDescriptor.at(2));
};