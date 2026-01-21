export default class DOMTraversal {
  #stack = null;

  constructor() {
    this.#stack = [];
  };

  setRoot(root) {
    this.#stack[0] = this.#createFrame([root]);
  };

  getChildren() {
    if(this.#stack.length) {
      const index = this.#stack.at(-1)[2];
      const nodes = this.#stack.at(-1)[0];
      
      return nodes[index];
    }

    return null;
  };

  goDown() {
    if(this.#stack.length) {
      const nodes = this.#stack.at(-1)[0];
      const index = this.#stack.at(-1)[2];

      if(nodes[index]) {
        this.#stack.push(this.#createFrame(nodes[index].childNodes));
      }  
    }
  };

  goUp() {
    this.#stack.pop();
  };

  goNext() {
    if(this.#stack.length) {
      this.#stack.at(-1)[2]++;
    }
  };

  #createFrame(nodes) {
    return [nodes, nodes.length, 0];
  };
};