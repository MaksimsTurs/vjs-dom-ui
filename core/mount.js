import initComponent from "./utils/init-component.js";
import renderComponent from "./utils/render-component.js";

export default function mount(parent, component) {
  initComponent(component);
  renderComponent(component);
  
  parent.appendChild(component.dom);
};