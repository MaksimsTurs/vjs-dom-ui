# VJS DOM UI

<div align="center">
  <img width="150px" border-radius="10px" src="./readme/vanilla-js-icon.jpeg">
  <p align="left">
    VJS DOM UI is a vanilla, lightweight and zero dependencies Javascript UI library with custom reactivity for dynamic UI.
  </p>
</div>

## [Table of Contents](#table-of-contents)
  + [Documentation](#documentation)
  + [Features](#features)
  + [Examples](#exampels)

## [Documentation:](#documentation)
First import the `defineComponent` and `el` functions, with the `defineComponent` function you will be able to create new components, and with a `el` function you can create a very deep and very complex DOM commands tree wich later will be used to create new DOM.
```js
import { defineComponent, el } from "vjs-dom-ui.js";
```
Every component must have a `render` function, who you describe the DOM tree and `name` attribute, this will be used to preserve the state of child components.
```js
const listItem = defineComponent({
  name: "list-item",
  render: function(props) {
    const click = () => {
      // Do some stuff by clicking...
    }

    return(
      el("li")
        .attr({ class: "container" })
        .children(
          el("div")
            .attr({ class: "container-head" })
            .children(
              el("p").text("Some head text"),
              el("button").event("click", click).text("X")
            ),
          el("div")
            .attr({ class: "container-content" })
            .children(
              el("p").text(props.text)
            )
        )
    )
  }
});
```
Other components can be used as parameters for `children` function.
```js
return(
  el("li")
    .style({ padding: "0.5rem" })
    .attr({ class: "container" })
    .children(
      listHead(),
      listContent(props.text)
    )
)
```
To mount the element in to the DOM whe need update our imports, add `mount` to you'r import. Then you can create a new instance of `listItem` and mount them in to the DOM.
```js
mount(document.body, listItem({ text: "Some very very long text..." }));
```
You component can have a some state, wich you can change to trigger new `render` function execution. Add `state` to you'r imports.
```js
const listItem = defineComponent({
  name: "list-item",
  init: function(props) {
    this.state = state({ isExpanded: props.isExpanded });

    this.state.subscribe(this);
  },
  render: function(props) {
    const contentClassName = 
      `container-content ${this.state.get().isExpanded ? "container-content-expanded" : ""}`

    const click = () => {
      this.state.set(prev => ({ isExpanded: !prev.isExpanded }));
    }

    return(
      el("li")
        .attr({ class: "container" })
        .children(
          el("div")
            .attr({ class: "container-head" })
            .children(
              el("p").text("Some head text"),
              el("button").event("click", click).text("X")
            ),
          el("div")
            .attr({ class: contentClassName })
            .children(
              el("p").text(props.text)
            )
        )
    )
  }
});
```
Wich `state` function whe can create global state too.
```js
const globalStorage = {
  counter: {
    state: state(0),
    increment: function(payload) {
      this.state.set(prev => prev + payload);
    },
    decrement: function(payload) {
      this.state.set(prev => prev - payload);
    }
  },
}
const counter = defineComponent({
  name: "counter",
  render: function() {
    const { counter } = globalStorage;

   const increment = () => {
     counter.increment(1);
   };

   const decrement = () => {
     counter.decrement(1);
   };

    return(
      el("div")
        .children(
          el("p").text(counter.state.get())
          el("button")
            .text("Increment")
            .event("click", increment);
          el("button")
            .text("Decrement")
            .event("click", drecrement);
        )
    )
  };
});
```

By every state change the component that have subscribed and all there children will be re renderd, the new created DOM tree will than replace old DOM tree.

## [Features:](#features)
**since v0.0.1:**
+ `component` Function, which you can use to create custom components, which you can use to create complex DOM trees.
+ `el` Function, which you can use to create a tree of DOM commands that will be executed.
+ `state` Function, which you can subscribe from components to add reactivity to subscribed components.

**since v0.0.2:**
+ `batcher` Object that implements auto rendering batching.

**since v0.0.3:**
+ Child components persist their states when parent component are re - rendered.
+ `el` Function does not create a DOM nodes anymore, yet she create a DOM commands that will be executed 
  in exec function that will create the DOM tree.

**since v0.0.7**
+ Added support for `svg`, `path`, `line`, etc.
+ Added support for document `fragment`, but component can not return a fragment!

## [Exampels:](#examples)
[Example Nr. 1](./examples/1/) Simple example of list of items, with loader and local states.\
[Example Nr. 2](./examples/2/) Simple example of a Website with movies, with some search functionality and reusable components.