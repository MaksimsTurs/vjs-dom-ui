import { defineComponent, el, state } from "../../../core/vjs-dom-ui.js";

import PostListItem from "./Post-List-Item.js"
import PostListSkeleton from "./Post-List-Skeleton.js";

export default defineComponent({
  name: "Post-List",
  state: {},
  init: function() {
    this.state.posts = state({ posts: [], isLoading: true, error: null });
    this.state.posts.subscribe(this)

    this.state.isClicked = state(false);
    this.state.isClicked.subscribe(this);

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(data => data.json())
      .then(data => this.state.posts.set({ posts: data.slice(0, 10), isLoading: false, error: null }))
      .catch(error => this.state.posts.set({ posts: [], isLoading: false, error }));
  },
  render: function() {
    return(
      this.state.posts.get().isLoading ?
        PostListSkeleton() :
        el("ul")
          .attr({ class: "posts-list" })
          .children(...this.state.posts.get().posts.map(post => PostListItem(post)))
    );
  }
});