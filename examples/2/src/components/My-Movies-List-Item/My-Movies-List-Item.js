import { defineComponent, el } from "../../../../../core/vjs-dom-ui.js";

import storage from "../../storage/storage.js";

export default defineComponent({
  name: "My-Movies-List-Item",
  render: function(props) {
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
            .attr({ src: props.thumbnailUrl }),
          el("div")
            .children(
              el("div")
                .children(
                  el("p").text(props.name),
                  el("p").text(props.description)
                ),
              el("div")
                .attr({ class: "mymovies-actions_list" })
                .children(
                  el("button").event("click", removeFromMyMovies).text("Remove"),
                  el("button").event("click", playMovie).text("Play")
                )
            )
        )
    )
  }
})