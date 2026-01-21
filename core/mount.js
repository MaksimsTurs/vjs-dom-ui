import component from "./utils/component.js";

/**
 *  @param   {HTMLElement}        parent
 *  @param   {object | undefined} componentInfo 
 *  @returns {void}
 */
export default function mount(parent, instanceInfo) {
  if(instanceInfo) {
    parent.appendChild(component.create(instanceInfo).init().render(null).dom);
  }
};