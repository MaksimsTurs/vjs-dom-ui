import { MOVIES } from "./src/DATA.js";

import MovieList from "./src/ui/Movie-List/Movie-List.js";
import Navigation from "./src/ui/Navigation/Navigation.js";

import { mount, state } from "../../core/vjs-dom-ui.js";

const movies = state(MOVIES);

mount(document.querySelector(".header-nav_container"), Navigation());
mount(document.getElementById("main"), MovieList({ movies }));