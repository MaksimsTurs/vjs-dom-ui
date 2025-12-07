# VJS DOM UI

<div align="center">
  <img width="150px" border-radius="10px" src="./readme/vanilla-js-icon.jpeg">
  <p align="left">
    VJS DOM UI is a vanilla, lightweight and zero dependencies Javascript UI library with custom reactivity for dynamic UI.
  </p>
</div>

## [To be done:](#to-be-done)
+ 🟥 Implement DOM diffing function (yet we simple replacing old dom tree with new dom tree).
+ 🟥 Implement `memo` (for calculation memoization) and `effect` (for side effects) functions.
+ 🟥 Implement lifecycle functions like `onMount`, `onUnmount` and maybe `onUpdate`.
+ 🟩 Persist state of child components.
+ 🟥 Perform code refactoring.
+ 🟥 Write unit tests.
+ 🟥 Write JSDoc.

## [Documentation:](#documentation)
First import the `component` and `el` functions, with the `component` function you will be able to create new component, and with a `el` function you can create a very deep and very complex DOM trees.
```js
import { component, el } from "vjs-dom-ui.js";
```
Every component must have a `render` function, who you describe the DOM tree.
```js
const listItem = component({
  render: function(props) {
    const click = () => {
      // Do some stuff by clicking...
    }

    return(
      el("li")
        .attr("class", "container")
        .children(
          el("div")
            .attr("class", "container-head")
            .children(
              el("p").text("Some head text")
              el("button").on("click", click).text("X")
            ),
          el("div")
            .attr("class", "container-content")
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
    .attr("class", "container")
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
You component can have a some state, wich you can change to trigger new `render` function execution. Add `state` to you'r imports. It's important that state must be initialised in `init` function.
```js
const listItem = component({
  mount: function(props) {
    this.state = state({ isExpanded: props.isExpanded });

    this.state.subscribe(this);
  },
  render: function(props) {
    const contentClassName = `container-content ${this.state.get().isExpanded ? "container-content-expanded" : ""}`

    const click = () => {
      this.state.set(prev => ({ isExpanded: !prev.isExpanded }));
    }

    return(
      el("li")
        .attr("class", "container")
        .children(
          el("div")
            .attr("class", "container-head")
            .children(
              el("p").text("Some head text")
              el("button").on("click", click).text("X")
            ),
          el("div")
            .attr("class", contentClassName)
            .children(
              el("p").text(props.text)
            )
        )
    )
  }
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

## [Exampels:](#examples)
All exampels you can find in the `examples` folder.