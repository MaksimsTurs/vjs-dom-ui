import { defineComponent, el } from "../../../../../core/vjs-dom-ui.js";
import { PlayIcon, TrashIcon } from "../../ui/SVG-Icons/SVG-Icons.js";

import storage from "../../storage/storage.js";

export default defineComponent({
  name: "My-Movies-List-Item",
  render: function(_state, props) {
    const removeFromMyMovies = () => {
      storage.myMovies.remove(props.name);
    }

    const playMovie = () => {
      window.open(`./video-player?movie-name=${props.name}`, "_self");
    }

    return(
      el("li")
        .attr({ class: "mymovies-item_container" })
        .children(
          el("img")
            .attr({ 
              src: props.thumbnailUrl,
              class: "mymovies-item_thumbnail"
            }),
          el("div")
            .attr({ class: "mymovies-item_data" })
            .children(
              el("div")
                .children(
                  el("p").attr({ class: "mymovies-item_name" }).text(props.name),
                  el("p").attr({ class: "mymovies-item_description" }).text(props.description)
                ),
              el("div")
                .attr({ class: "mymovies-actions" })
                .children(
                  el("button")
                    .attr({ class: "mymovies-actions_add" })
                    .event("click", playMovie)
                    .children(PlayIcon({ width: 20, height: 20 })),
                  el("button")
                    .attr({ class: "mymovies-actions_remove" })
                    .event("click", removeFromMyMovies)
                    .children(TrashIcon({ width: 20, height: 20 }))
                )
            )
        )
    )
  }
})