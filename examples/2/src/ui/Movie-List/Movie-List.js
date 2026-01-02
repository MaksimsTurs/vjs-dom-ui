import MovieCard from "../Movie-Card/Movie-Card.js";
import EmptyList from "../Empty-List/Empty-List.js";

import { defineComponent, el } from "../../../../../core/vjs-dom-ui.js";

export default defineComponent({
  name: "Movie-List",
  state: {},
  init: function(props) {
    props.movies.subscribe(this);
  },
  render: function(props) {
    return(
      el("ul")
        .attr({ class: props.movies.get().length ? "movie-list" : "movie-list_empty" })
        .children(
          props.movies.get().length ?
          props.movies.get().map(movie => MovieCard(movie)) :
          EmptyList()
        )
    );
  }
});