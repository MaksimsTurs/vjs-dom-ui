import { defineComponent, el } from "../../../../../core/vjs-dom-ui.js";

import MyMoviesListItem from "../My-Movies-List-Item/My-Movies-List-Item.js";
import EmptyList from "../../ui/Empty-List/Empty-List.js";

import storage from "../../storage/storage.js";

export default defineComponent({
  name: "My-Movies-List",
  init: function() {
    storage.myMovies.state.subscribe(this);
  },
  render: function() {
    const myMovies = storage.myMovies.state.get();

    return(
      el("ul")
        .attr({ class: "mymovies_list" })
        .children(
          myMovies.length ? 
          myMovies.map(movie => MyMoviesListItem(movie)) :
          EmptyList()
        )
    )
  }
});