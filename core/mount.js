import { COMPONENTS, STATES } from "./component.js";
import { COMMANDS } from "./el.js";
import { isHTMLElement, isObject } from "./utils/is.js";

export default function mount(parent, component) {
  component.create();
  component.mount();

  COMPONENTS.push(component.instance());
  const el = component.render();
  component.instance().domTraversal.setRoot(el);
  COMPONENTS.pop();

  STATES.set(el, component.instance());
  parent.appendChild(el);
};

export function exec(commands) {
  const parent = COMPONENTS.at(-1);
  const domTraversal = parent.domTraversal;
  const dom = document.createElement(commands[0][1]);

  for(let index = 1; index < commands.length; index++) {
    const type = commands[index][0];

    switch(type) {
      case COMMANDS.ATTR: {
        for(let key in commands[index][1]) {
          dom.setAttribute(key, commands[index][1][key]);
        }
      } 
      break;
      case COMMANDS.EVENT:
        const eventType = commands[index][1];
        const eventCallback = commands[index][2];

        dom.addEventListener(eventType, eventCallback);
      break;
      case COMMANDS.TEXT:
        dom.textContent = commands[index][1];
      break;
      case COMMANDS.CHILDREN: {
        // debugger
        domTraversal.goDown();
        
        const childrens = commands[index][1];
        const fragment = document.createDocumentFragment();
        
        for(let index = 0; index < childrens.length; index++) {         
          const children = childrens[index];
          
          if(isHTMLElement(children)) {
            fragment.appendChild(children);
            domTraversal.incrementIndex();
          } else if("$$type" in children) {            
            const currentChildren = domTraversal.getChild();
            const instance = STATES.get(currentChildren);
            
            if(currentChildren?.getAttribute("vjs-type") !== children.$$type) {
              children.create();
              children.mount();
  
              const el = children.render();

              el.setAttribute("vjs-type", children.$$type);
              STATES.set(el, children.instance());
              children.instance().domTraversal.setRoot(el);
              
              fragment.appendChild(el);
              domTraversal.incrementIndex();
            } else {
              
              const prevProps = instance.props;
              const newProps = children.$$props;

              if(prevProps !== newProps) {
                children.create();
                children.mount();

                const el = children.render();

                STATES.delete(instance.dom);
                STATES.set(el, children.instance());

                children.instance().domTraversal.setRoot(el);
                
                fragment.appendChild(el);
                domTraversal.incrementIndex();
              } else {
                fragment.appendChild(instance.dom);
              }
            }
          } else if(isObject(children)) {
            const el = exec(children.dom());
            
            fragment.appendChild(el);
            domTraversal.incrementIndex();
          }
        }

        dom.appendChild(fragment);
        domTraversal.goUp();
      }
      break;
    }
  }

  return dom;
}