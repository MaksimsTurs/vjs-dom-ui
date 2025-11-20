export default function mount(parent, component) {
  parent.appendChild(component());
}