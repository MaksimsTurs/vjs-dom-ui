import { component, el, state } from "../../../core/vjs-dom-ui.js";

export default component({
  init: function() {
    this.state.isExpanded = state(false);
    this.state.isExpanded.subscribe(this);
  },
  render: function(props) {
    const isExpanded = this.state.isExpanded.get();
    const postsListItemClass = 
    `
      posts-list-item
      ${isExpanded ? "posts-list-item-expanded" : ""}
    `;
    const buttonLabel = isExpanded ? "Hidde" : "Expand"

    const hiddeContent = () => {
      this.state.isExpanded.set(prev => !prev);
    }

    return(
      el("li")
        .attr({ class: postsListItemClass })
        .children(
          el("p")
            .attr({ class: "posts-list-item-title" })
            .text(props.title),
          el("div")
            .attr({ class: "posts-list-item-content-container" })
            .children(
              el("p")
                .attr({ class: "posts-list-item-content" })
                .text(props.body),
              el("button")
                .attr({ class: "posts-list-item-expander" })
                .text(buttonLabel)
                .on("click", hiddeContent),
            )
        )   
    );
  }
})