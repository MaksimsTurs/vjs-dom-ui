import { defineComponent, el } from "../../../../../core/vjs-dom-ui.js";

import { PlayIcon, PlusIcon, TrashIcon } from "../SVG-Icons/SVG-Icons.js";

import storage from "../../storage/storage.js";

export default defineComponent({
  name: "Movie-Card",
  init: function() {
    storage.myMovies.state.subscribe(this);
  },
  render: function(props) {
    const myMovies = storage.myMovies.state.get();
    const inMyMovies = myMovies.find(movie => movie.name === props.name);

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
            .attr({ class: "movie-card_actions" })
            .children(
              el("button")
                .event("click", playMovie)
                .children(PlayIcon({ width: 20, height: 20 })),
              !inMyMovies ?
              el("button")
                .attr({ class: "movie-card_actions-add" })
                .event("click", myMoviesAction)
                .children(PlusIcon({ width: 20, height: 20 })) :
              el("button")
                .attr({ class: "movie-card_actions-remove" })
                .event("click", myMoviesAction)
                .children(TrashIcon({ width: 20, height: 20 }))
            ),
          el("div")
            .attr({ class: "movie-card_data" })
            .children(
              el("div")
                .children(
                  el("p").attr({ class: "movie-card_data-name" }).text(props.name),
                  el("p").attr({ class: "movie-card_data-description" }).text(props.description),
                ),
            ),
        )
    )
  }
})