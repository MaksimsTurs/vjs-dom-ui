import { defineComponent, el } from "../../../core/vjs-dom-ui.js";

export default defineComponent({
  name: "Post-List-Skeleton-List",
  render: function() {
    return(
      el("ul")
        .attr({ class: "posts-list" })
        .children(...Array.from({ length: 10 }).map(() => PostListItemSkeleton()))
    )
  }
});

const PostListItemSkeleton = defineComponent({
  name: "Post-List-Skeleton-Item",
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