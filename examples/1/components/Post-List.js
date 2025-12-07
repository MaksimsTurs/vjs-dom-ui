import { component, el, state } from "../../../core/vjs-dom-ui.js";

import PostListItem from "./Post-List-Item.js"
import PostListSkeleton from "./Post-List-Skeleton.js";

export default component({
  name: "Post-List",
  state: {},
  mount: function() {
    this.state.posts = state({ posts: [], isLoading: true, error: null });
    this.state.posts.subscribe(this);

    this.state.isClicked = state(false);
    this.state.isClicked.subscribe(this);

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(data => data.json())
      .then(data => this.state.posts.set({ posts: data.slice(0, 3), isLoading: false, error: null }))
      .catch(error => this.state.posts.set({ posts: [], isLoading: false, error }));
  },
  render: function() {
    const click = () => {
      this.state.isClicked.set(prev => !prev);
    };

    return(
      this.state.posts.get().isLoading ?
        PostListSkeleton() :
        el("ul")
          .attr({ class: "posts-list" })
          .children(
            el("div")
            .children(
                Item({ text: ~~(Math.random() * 10) }),
                ...this.state.posts.get().posts.map(post => PostListItem(post)),
                el("button").text(`Clicked? ${this.state.isClicked.get()}`).on("click", click)
              )
          )
    );
  }
});

const Item = component({
  name: "Item",
  state: {},
  mount: function (){
    this.state.isClicked = state(false);
    this.state.isClicked.subscribe(this);
  },
  render: (props) => el("li").text(props.text)
});