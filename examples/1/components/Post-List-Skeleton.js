import { component, el } from "../../../core/vjs-dom-ui.js";

export default component({
  render: function() {
    return(
      el("ul")
        .attr({ class: "posts-list" })
        .children(...Array.from({ length: 10 }).map(() => PostListItemSkeleton()))
    )
  }
});

const PostListItemSkeleton = component({
  render: function() {
    return(
      el("li")
        .attr({ class: "posts-list-item posts-list-item-skeleton" })
        .children(
          el("p"),
          el("p"),
          el("button")
        )
    )
  }
})