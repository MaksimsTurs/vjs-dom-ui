import { defineComponent, el } from "../../../../../core/vjs-dom-ui.js";

export default defineComponent({
  name: "Empty-List",
  render: function() {
    return(
      el("div")
        .attr({ class: "empty-list_container" })
        .children(
          el("div")
            .attr({ class: "empty-list_card" }),
          el("div")
            .attr({ class: "empty-list_card" }),
          el("div")
            .attr({ class: "empty-list_card" }),
          el("a")
            .attr({ 
              class: "empty-list_card-link",
              href: "./" 
            })
            .text("Go Home?")
        )
    )
  }
});