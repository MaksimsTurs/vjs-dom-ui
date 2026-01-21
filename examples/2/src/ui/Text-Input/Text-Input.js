import { defineComponent, el } from "../../../../../core/vjs-dom-ui.js";

export default defineComponent({
  name: "Text-Input",
  render: function(props) {
    const { onInput, ...attrs } = props;
    
    return(
      el("div")
        .attr({ class: "text-input_container" })
        .children(
          el("input")
            .event("input", onInput)
            .attr({...attrs, type: "text" })
        )
    )
  }
})