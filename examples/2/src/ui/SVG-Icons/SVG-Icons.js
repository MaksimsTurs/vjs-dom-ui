import { defineComponent, el, mount } from "../../../../../core/vjs-dom-ui.js";

export const YoutubeIcon = defineComponent({
  name: "Youtube-Icon",
  render: function(props) {
    return(
      el("svg")
        .attr({
          width: "24",
          height: "24",
          "stroke-width": 2,
          ...(props?.attr || {}),
          xmlns: "http://www.w3.org/2000/svg" ,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        })
        .children(
          el("path")
            .attr({
              d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"
            }),
          el("path")
            .attr({
              d: "m10 15 5-3-5-3z"
            })
        )
    )
  }
});

export const PackageOpenIcon = defineComponent({
  name: "Package-Open-Icon",
  render: function(props) {
    return(
      el("svg")
        .attr({
          width: "24",
          height: "24",
          "stroke-width": 2,
          ...(props?.attr || {}),
          xmlns: "http://www.w3.org/2000/svg" ,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        })
        .children(
          el("path")
            .attr({
              d: "M12 22v-9"
            }),
          el("path")
            .attr({
              d: "M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z"
            }),
          el("path")
            .attr({
              d: "M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13"
            }),
          el("path")
            .attr({
              d: "M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z"
            })
        )
    )
  }
});

export const PauseIcon = defineComponent({
  name: "Pause-Icon",
  render: function(props) {
    return(
      el("svg")
        .attr({
          width: "24",
          height: "24",
          "stroke-width": 2,
          ...(props?.attr || {}),
          xmlns: "http://www.w3.org/2000/svg" ,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        })
        .children(
          el("rect")
            .attr({
              x: 14,
              y: 3,
              width: 5,
              height: 18,
              rx: 1              
            }),
          el("rect")
            .attr({
              x: 5,
              y: 3,
              width: 5,
              height: 18,
              rx: 1
            })
        )
    )
  }
});

export const PlayIcon = defineComponent({
  name: "Play-Icon",
  render: function(props) {
    return(
      el("svg")
        .attr({
          width: "24",
          height: "24",
          "stroke-width": 2,
          ...(props?.attr || {}),
          xmlns: "http://www.w3.org/2000/svg" ,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        })
        .children(
          el("path")
            .attr({
              d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
            })
        )
    )
  }
});

export const MinimizeIcon = defineComponent({
  name: "Minimize-Icon",
  render: function(props) {
      el("svg")
        .attr({
          width: "24",
          height: "24",
          "stroke-width": 2,
          ...(props?.attr || {}),
          xmlns: "http://www.w3.org/2000/svg" ,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        })
      .children(
        el("path")
          .attr({
            d: "m14 10 7-7"
          }),
        el("path")
          .attr({
            d: "M20 10h-6V4"
          }),
        el("path")
          .attr({
            d: "m3 21 7-7"
          }),
        el("path")
          .attr({
            d: "M4 14h6v6"
          })
      )   
  }
});

export const MaximizeIcon = defineComponent({
  name: "Maximize-Icon",
  render: function(props) {
    return(
      el("svg")
        .attr({
          width: "24",
          height: "24",
          "stroke-width": 2,
          ...(props?.attr || {}),
          xmlns: "http://www.w3.org/2000/svg" ,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        })
      .children(
        el("path")
          .attr({
            d: "m15 15 6 6"
          }),
        el("path")
          .attr({
            d: "m15 9 6-6"
          }),
        el("path")
          .attr({
            d: "M21 16v5h-5"
          }),
        el("path")
          .attr({
            d: "M21 8V3h-5"
          }),
        el("path")
          .attr({
            d: "M3 16v5h5"
          }),
        el("path")
          .attr({
            d: "m3 21 6-6"
          }),
        el("path")
          .attr({
            d: "M3 8V3h5"
          }),
        el("path")
          .attr({
            d: "M9 9 3 3"
          })
      )
    )
  }
});

export const VolumeIcon = defineComponent({
  name: "Volume-Icon",
  render: function(props) {
    return(
      el("svg")
        .attr({
          width: "24",
          height: "24",
          "stroke-width": 2,
          ...(props?.attr || {}),
          xmlns: "http://www.w3.org/2000/svg" ,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        })
      .children(
        el("path")
          .attr({
            d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
          }),
        el("path")
          .attr({
            d: "M16 9a5 5 0 0 1 0 6"
          }),
        el("path")
          .attr({
            d: "M19.364 18.364a9 9 0 0 0 0-12.728"
          })
      )    
    )
  }
});

export const MutedIcon = defineComponent({
  name: "Muted-Icon",
  render: function(props) {
    el("svg")
      .attr({
        width: "24",
        height: "24",
        "stroke-width": 2,
        ...(props?.attr || {}),
        xmlns: "http://www.w3.org/2000/svg" ,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      })
    .children(
      el("path")
        .attr({
          d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
        }),
      el("line")
        .attr({
          x1: 22,
          x2: 16,
          y1: 9,
          y2: 15
        }),
      el("line")
        .attr({
          x1: 16,
          x2: 22,
          y1: 9,
          y2: 15
        }),
    )
  }
})