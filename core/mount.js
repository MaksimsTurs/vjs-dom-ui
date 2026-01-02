import createComponentInstance from "./utils/create-component-instance.js";
import renderComponentInstance from "./utils/render-component-instance.js";

export default function mount(parent, componentInfo) {
  if(componentInfo) {
    parent.appendChild(renderComponentInstance(createComponentInstance(componentInfo)));
  }
};