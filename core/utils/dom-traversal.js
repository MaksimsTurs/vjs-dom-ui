export default class DOMTraversal {
  #stack = null;

  constructor() {
    this.#stack = [];
  };

  setRoot(root) {
    this.#stack[0] = this.#createFrame([root]);
  };

  getCurrentChildren() {
    if(this.#stack.length) {
      const index = this.#stack.at(-1)[2];
      
      return this.#stack.at(-1)[0][index];
    }

    return null;
  };

  goDown() {
    if(this.#stack.length) {
      const nodes = this.#stack.at(-1)[0];
      const index = this.#stack.at(-1)[2];

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