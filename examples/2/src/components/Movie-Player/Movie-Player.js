import { defineComponent, el, state } from "../../../../../core/vjs-dom-ui.js";

export default defineComponent({
  name: "Movie-Player-Controlls",
  state: {},
  init: function() {
    this.state.isPlaying = state(false);
  },
  render: function() {
    const setPlayingState = () => {
      this.state.
    }

    return(
      el("section")
        .attr({ class: "video-player_controlls" })
        .children(
          this.state.isPlaying.get() ?
          el("button").text("Pause") :
          el("button").text("Play")
        )
    )
  }
})