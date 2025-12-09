import NUMBERS from "../const/NUMBERS.const.js";

import { isHTMLElement, isObject } from "./is.js";
import componentsInProgress from "./components-in-progress.js";
import componentsInstances from "./components-instances.js";
import readNewNode from "./read-new-node.js";

export function execDOMCommands(commands) {
  const parent = componentsInProgress.last();
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
          } else if(children?.type === NUMBERS.OBJECT_TYPES.COMPONENT) {  
            const currentChildren = domTraversal.getCurrentChildren();
            const componentInstance = componentsInstances.get(currentChildren);
            
            if(currentChildren?.getAttribute("vjs-type") !== children.name) {
              // Create new componet
              children.create();
              children.init();
  
              componentsInProgress.push(children.instance());
              const el = children.render();
              el.setAttribute("vjs-type", children.name);
              componentsInstances.set(el, children.instance());
              children.instance().domTraversal.setRoot(el);
              componentsInProgress.pop();

              fragment.appendChild(el);
              domTraversal.incrementIndex();
            } else {
              const prevProps = componentInstance.props;
              const newProps = children.props;

              if(prevProps !== newProps) {
                componentsInProgress.push(componentInstance);
                componentInstance.props = children.props;
                componentInstance.render = componentInstance.renderBase.bind(componentInstance, children.props);
                
                const el = readNewNode(componentInstance.render());
                
                el.setAttribute("vjs-type", children.name);
                componentsInstances.swap(componentInstance.dom, el, componentInstance);
                componentInstance.domTraversal.setRoot(el);
                componentsInProgress.pop();
                
                fragment.appendChild(el);
                domTraversal.incrementIndex();
              } else {
                fragment.appendChild(componentInstance.dom);
              }
            }
          } else if(isObject(children)) {
            const el = execDOMCommands(children._commands());
            
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