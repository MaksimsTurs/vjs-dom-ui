import Navigation from "./src/ui/Navigation/Navigation.js";
import MyMoviesList from "./src/components/My-Movies-List/My-Movies-List.js";

import { mount } from "../../core/vjs-dom-ui.js";

mount(document.querySelector(".header-nav_container"), Navigation());
mount(document.getElementById("main"), MyMoviesList());