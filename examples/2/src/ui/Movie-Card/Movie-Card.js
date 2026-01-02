import { defineComponent, el } from "../../../../../core/vjs-dom-ui.js";

import storage from "../../storage/storage.js";

export default defineComponent({
  name: "Movie-Card",
  init: function() {
    storage.myMovies.state.subscribe(this);
  },
  render: function(props) {
    const myMovies = storage.myMovies.state.get();
    const inMyMovies = myMovies.find(movie => movie.name === props.name);

    const addButtonLabel = inMyMovies ? "Remove from my movies" : "Add to my movies";

    const myMoviesAction = () => {
      if(!inMyMovies) {
        storage.myMovies.add(props);
      } else {
        storage.myMovies.remove(props.name);
      }
    };

    const playMovie = () => {
      window.open(`./video-player?movie-name=${props.name}`, "_self");
    }

    return(
      el("li")
        .attr({ class: "movie-card_container" })
        .children(
          el("img").attr({ class: "movie-card_thumbnail",  src: props.thumbnailUrl }),
          el("div")
            .attr({ class: "movie-card_data" })
            .children(
              el("div")
                .children(
                  el("p").text(props.name),
                  el("p").text(props.description),
                ),
              el("div")
                .attr({ class: "movie-card_actions" })
                .children(
                  el("button").event("click", myMoviesAction).attr({ class: "movie-card_add-button" }).text(addButtonLabel),
                  el("button").event("click", playMovie).attr({ class: "movie-card_add-button" }).text("Play"),
                )
            ),
        )
    )
  }
})