export default function el(tag) {
  let dom = document.createElement(tag);
  
  const events = {};

  return {
    text: function(text) {
      dom.textContent = text;

      return this;
    },
    attr: function(attrs) {
      for(let key in attrs) {
        if(attrs[key] !== undefined && attrs[key] !== null) {
          dom.setAttribute(key, attrs[key]);
        }
      }

      return this;
    },
    children: function(...children) {
      const fragment = document.createDocumentFragment()

      for(let index = 0; index < children.length; index++) {
        if(children[index]) {
          if(typeof children[index] === "function") {
            fragment.appendChild(children[index]());
          } else {
            fragment.appendChild(children[index].dom());
          }
        }
      }

      dom.appendChild(fragment);

      return this;
    },
    on: function(event, callback) {
      events[event] = callback;
      dom.addEventListener(event, callback);

      return this;
    },
    dom: function() {
      return dom;
    },
    destroy: function() {
      dom.parentElement.removeChild(dom);
      dom = null;
    },
  };
};