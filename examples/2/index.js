import { MOVIES } from "./src/DATA.js";

import TextInput from "./src/ui/Text-Input/Text-Input.js";
import MovieList from "./src/ui/Movie-List/Movie-List.js";
import Navigation from "./src/ui/Navigation/Navigation.js";

import { mount, state } from "../../core/vjs-dom-ui.js";

const movies = state(MOVIES);

mount(document.querySelector(".header-nav_container"), Navigation());
mount(document.getElementById("main"), TextInput({
  placeholder: "Name",
  autocomplete: "off",
  autocorrect: "off",
  onInput: (event) => {
    if(!event.target.value) {
      movies.set(MOVIES);
    } else {
      const filteredMovies = movies.get().filter(movie => movie.name.search(event.target.value) != -1);
      movies.set(filteredMovies);
    }
  }
}));
mount(document.getElementById("main"), MovieList({ movies }));