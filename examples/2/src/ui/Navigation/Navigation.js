import { defineComponent, el } from "../../../../../core/vjs-dom-ui.js";

import { YoutubeIcon } from "../SVG-Icons/SVG-Icons.js";

import storage from "../../storage/storage.js";

export default defineComponent({
  name: "Navigation",
  init: function() {
    storage.myMovies.state.subscribe(this);
  },
  render: function() {
    const currPath = location.pathname;

    let effectPosition = 0;

    switch(currPath) {
      case "/examples/2/":
        effectPosition = 0;
      break;
      case "/examples/2/search.html":
        effectPosition = 5;
      break;
      case "/examples/2/my-movies.html":
        effectPosition = 10;
      break;
    }
        
    return(
      el("ul")
        .attr({ class: "header-nav_list" })
        .children(
          el("li")
            .children(
              el("a")
                .attr({ 
                  href: "./",
                })
                .text("Home")
            ),
          el("li")
            .children(
              el("a")
                .attr({ 
                  href: "./search.html",
                })
                .text("Search")
            ),
          el("li")
            .children(
              el("a")
                .attr({ 
                  href: "./my-movies.html",
                })
                .children(
                  YoutubeIcon(),
                  el("p").text(storage.myMovies.state.get().length)
                )
            ),
          el("div").style({ left: `${effectPosition}rem` }).attr({ class: "header-nav_hover-effect" })
        )
    )
  }
});