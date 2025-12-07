import { exec } from "./mount.js";

export const COMPONENTS = [];
export const STATES = new Map();

class DOMTraversal {
  #stack    = null;

  constructor() {
    this.#stack = [];
  };

  setRoot(root) {
    this.#stack[0] = this.#createFrame([root]);
  };

  getChild() {
    if(this.#stack.length) {
      const index = this.#stack.at(-1)[2];
      
      return this.#stack.at(-1)[0][index];
    }

    return null;
  };

  goDown() {
    if(this.#stack.length) {
      const nodes = this.#stack.at(-1)[0];
      const index = this.#stack.at()[2];

      if(nodes.length) {
        this.#stack.push(this.#createFrame(nodes[index].childNodes));
      }  
    }
  };

  goUp() {
    this.#stack.pop();
  };

  incrementIndex() {
    if(this.#stack.length) {
      this.#stack.at(-1)[2]++;
    }
  };

  decrementIndex() {
    if(this.#stack.length) {
      this.#stack.at(-1)[2]--;
    }
  }

  #createFrame(nodes) {
    return [
      nodes,
      nodes.length,
      0
    ];
  }
};

export default function component(baseComponent) {
  return function(props) {
    let instance = null;

    return {
      $$props: props,
      $$type: baseComponent.name,
      instance: function() {
        return instance;
      },
      create: function() {
        instance = {
          name:       baseComponent.name,
          render:     baseComponent.render,
          mount:      baseComponent.mount,
          state:      {},
          props:      props,
          dom:        null
        }

        instance.domTraversal = new DOMTraversal(instance);
        
        instance.mount  = instance.mount?.bind(instance, props);
        instance.render = instance.render.bind(instance, props);

        return instance;
      },
      mount: function() {
        instance.mount?.(props);
      },
      render: function() {
        let el = instance.render(props);
        
        if(typeof el.dom === "function") {
          el = exec(el.dom());
        } else if("$$type" in el) {
          const component = el;

          component.create();
          component.mount();

          COMPONENTS.push(component.instance());
          el = component.render();
          component.instance().domTraversal.setRoot(el);
          COMPONENTS.pop();

          console.log(el)
        }
        
        el.setAttribute("vjs-type", baseComponent.name);
        
        instance.dom = el;

        return el;
      },
      unmount: function() {

      }
    }
  };
};