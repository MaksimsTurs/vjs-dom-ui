import NUMBERS from "../const/NUMBERS.const.js";

import { isHTMLElement, isObject } from "./is.js";
import { getComponentInstance } from "./component-instances-map.js";
import { getCurrentComponentInstance } from "./component-render-stack.js";
import createComponentInstance from "./create-component-instance.js";
import renderComponentInstance from "./render-component-instance.js";
import reRenderComponentInstance from "./re-render-component-instance.js";

export default function execDomCommands(commands) {
  const parent = getCurrentComponentInstance();
  const domTraversal = parent.domTraversal;

  const newNode = document.createElement(commands[0][1]);

  for(let index = 1; index < commands.length; index++) {
    const type = commands[index][0];

    switch(type) {
      case NUMBERS.DOM_COMMANDS.SET_ATTR:
        setAttributes(newNode, commands[index][1]);
      break;
      case NUMBERS.DOM_COMMANDS.SET_TEXT:
        setText(newNode, commands[index][1]);
      break;
      case NUMBERS.DOM_COMMANDS.ADD_EVENT:
        setEventListener(newNode, commands[index]);
      break;
      case NUMBERS.DOM_COMMANDS.APPEND_CHILD: {
        // debugger
        domTraversal.goDown();
        
        const childrens = commands[index][1];
        const fragment = document.createDocumentFragment();
        
        for(let index = 0; index < childrens.length; index++) {         
          const children = childrens[index];
          
          if(isHTMLElement(children)) {
            fragment.appendChild(children);
          } else if(children?._type === NUMBERS.OBJECT_TYPES.COMPONENT) {  
            const currentChildren = domTraversal.getCurrentChildren();
            const cachedComponent = getComponentInstance(currentChildren);

            if(currentChildren?.getAttribute("vjs-type") !== children.name) {
              // Create new component
              const newComponentInstance = createComponentInstance(children);
              const newComponentInstanceDom = renderComponentInstance(newComponentInstance);

              fragment.appendChild(newComponentInstanceDom);
              domTraversal.incrementIndex();
            } else {
              // Re bind the render function and re render the component or
              // use cached dom.
              const prevProps = cachedComponent.props;
              const newProps = children.props;

              if(prevProps !== newProps) {
                const componentInstanceNewDom = reRenderComponentInstance(cachedComponent, children, false);
                
                fragment.appendChild(componentInstanceNewDom);
                domTraversal.incrementIndex();
              } else {
                fragment.appendChild(cachedComponent.dom);
              }
            }
          } else if(isObject(children)) {
            const el = execDomCommands(children._commands());
            
            fragment.appendChild(el);
            domTraversal.incrementIndex();
          }
        }

        newNode.appendChild(fragment);
        domTraversal.goUp();
      }
      break;
    }
  }

  return newNode;
}

function setAttributes(node, attrs) {
  for(let key in attrs) {
    node.setAttribute(key, attrs[key]);
  }
};

function setText(node, text) {
  node.textContent = text;
};

function setEventListener(node, eventData) {
  const eventType = eventData[1];
  const eventCallback = eventData[2];

  node.addEventListener(eventType, eventCallback);
};