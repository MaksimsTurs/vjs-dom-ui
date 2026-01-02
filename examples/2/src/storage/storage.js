import { state } from "../../../../core/vjs-dom-ui.js";

export default {
  myMovies: {
    state: state(JSON.parse(localStorage.getItem("my-movies") || "[]")),
    add: function(payload) {
      const isMovieInList = this.state.get().find(movie => movie.name === payload.name);

      if(!isMovieInList) {
        this.state.set(prev => [...prev, payload]);
        localStorage.setItem("my-movies", JSON.stringify(this.state.get()));
      }
    },
    remove: function(payload) {
      this.state.set(this.state.get().filter(movie => movie.name !== payload));
      localStorage.setItem("my-movies", JSON.stringify(this.state.get()));
    }
  }
};