import { MOVIES } from "./src/DATA.js";

import Navigation from "./src/ui/Navigation/Navigation.js";
import MovieList from "./src/ui/Movie-List/Movie-List.js";

import { mount, state } from "../../core/vjs-dom-ui.js";

const movieNameInput = document.getElementById("movie-name");
const movies = state(MOVIES);

mount(document.querySelector(".header-nav_container"), Navigation());
mount(document.getElementById("main"), MovieList({ movies }));

movieNameInput.addEventListener("input", function(event) {
  if(!event.target.value) {
    movies.set(MOVIES);
  } else {
    const filteredMovies = movies.get().filter(movie => movie.name.search(event.target.value) != -1);
    movies.set(filteredMovies);
  }
});